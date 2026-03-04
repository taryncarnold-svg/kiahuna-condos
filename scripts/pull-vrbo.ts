console.log("pull-vrbo: started");
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";
import pLimit from "p-limit";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const UNITS = [
  { id: "35", url: "https://www.vrbo.com/en-ca/cottage-rental/p2160974vb?dateless=true" },
  { id: "87", url: "https://www.vrbo.com/en-ca/cottage-rental/p3511146vb?dateless=true" },
  { id: "128", url: "https://www.vrbo.com/en-ca/cottage-rental/p1300156vb?dateless=true" },
  { id: "151", url: "https://www.vrbo.com/en-ca/cottage-rental/p1587209vb?dateless=true" },
  { id: "56", url: "https://www.vrbo.com/en-ca/cottage-rental/p3925710vb?dateless=true" },
] as const;

type UnitId = (typeof UNITS)[number]["id"];

const ListingSchema = z.object({
  unitId: z.string(),
  vrboUrl: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  heroImage: z.string().optional(),
  images: z.array(z.string()).default([]),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  sleeps: z.number().optional(),
  amenities: z.array(z.string()).default([]),
  address: z.string().optional(),
});

type Listing = z.infer<typeof ListingSchema>;

function cleanText(s: string) {
  return s
    .replace(/\s+/g, " ")
    .replace(/\\n/g, " ")
    .replace(/\u00a0/g, " ")
    .trim();
}

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url: string) {
  // retry 429s with backoff (vrbo rate limiting)
  const maxAttempts = 6;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    // small spacing between ANY requests so we don't trip rate limits
    if (attempt === 1) {
      await sleep(1500);
    }

    const res = await fetch(url, {
      headers: {
        // look like a real browser
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "pragma": "no-cache",
      },
    });

    if (res.status === 429) {
      const waitMs = 4000 * attempt; // 4s, 8s, 12s, 16s...
      console.log(`⚠️  429 from VRBO. waiting ${waitMs / 1000}s then retrying (attempt ${attempt}/${maxAttempts})`);
      await sleep(waitMs);
      continue;
    }

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} for ${url}`);
    }

    return await res.text();
  }

  throw new Error(`HTTP 429 for ${url} (gave up after retries)`);
}

function parseJsonLd($: cheerio.CheerioAPI) {
  const items: any[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).text();
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) items.push(...parsed);
      else items.push(parsed);
    } catch {
      // ignore
    }
  });
  return items;
}

function pickBestJsonLd(jsonLd: any[]) {
  // prefer “LodgingBusiness” / “Hotel” / “Accommodation” style objects
  const preferredTypes = new Set([
    "LodgingBusiness",
    "Hotel",
    "Accommodation",
    "VacationRental",
    "Apartment",
    "House",
  ]);

  for (const obj of jsonLd) {
    const t = obj?.["@type"];
    if (typeof t === "string" && preferredTypes.has(t)) return obj;
    if (Array.isArray(t) && t.some((x) => preferredTypes.has(x))) return obj;
  }
  // fallback: something with images + name
  return jsonLd.find((o) => o?.name && (o?.image || o?.images)) ?? undefined;
}

function extractNumbersFromHtml(html: string) {
  // best-effort fallbacks (VRBO often embeds these somewhere in page JSON)
  const grab = (re: RegExp) => {
    const m = html.match(re);
    if (!m) return undefined;
    const n = Number(m[1]);
    return Number.isFinite(n) ? n : undefined;
  };

  return {
    bedrooms: grab(/"bedrooms"\s*:\s*(\d+)/),
    bathrooms: grab(/"bathrooms"\s*:\s*(\d+)/),
    sleeps: grab(/"sleeps"\s*:\s*(\d+)/),
  };
}

function extractAmenitiesLoose($: cheerio.CheerioAPI) {
  // “loose” capture: looks for obvious amenity words in the page
  // (kept conservative so we don’t pull junk)
  const pageText = cleanText($("body").text()).toLowerCase();

  const candidates = [
    "air conditioning",
    "wifi",
    "washer",
    "dryer",
    "kitchen",
    "bbq",
    "grill",
    "pool",
    "lanai",
    "parking",
    "beach gear",
    "snorkel",
    "towels",
    "smart tv",
    "tv",
    "dishwasher",
    "microwave",
  ];

  return candidates.filter((c) => pageText.includes(c));
}

function extractFromMeta($: cheerio.CheerioAPI) {
  const ogTitle = $('meta[property="og:title"]').attr("content");
  const ogDesc = $('meta[property="og:description"]').attr("content");
  const ogImage = $('meta[property="og:image"]').attr("content");

  return {
    name: ogTitle ? cleanText(ogTitle) : undefined,
    description: ogDesc ? cleanText(ogDesc) : undefined,
    heroImage: ogImage,
  };
}

async function downloadImages(unitId: UnitId, urls: string[], max = 8) {
  const outDir = path.join(repoRoot, "public", "photos", `unit-${unitId}`);
  fs.mkdirSync(outDir, { recursive: true });

  const limited = urls.slice(0, max);
  const limit = pLimit(4);

  const saved: string[] = [];

  await Promise.all(
    limited.map((u, idx) =>
      limit(async () => {
        try {
          const res = await fetch(u);
          if (!res.ok) return;
          const buf = Buffer.from(await res.arrayBuffer());
          const extGuess =
            res.headers.get("content-type")?.includes("png") ? "png" : "jpg";
          const filename = `_${String(idx + 1).padStart(2, "0")}.${extGuess}`;
          fs.writeFileSync(path.join(outDir, filename), buf);
          saved.push(`/photos/unit-${unitId}/${filename}`);
        } catch {
          // ignore single failures
        }
      })
    )
  );

  return saved;
}

async function pullOne(unitId: UnitId, url: string): Promise<Listing> {
    const html = fs.readFileSync(
        path.join(repoRoot, "scripts", "vrbo_html", `${unitId}.html`),
        "utf8"
      );
  const $ = cheerio.load(html);

  const jsonLd = parseJsonLd($);
  const best = pickBestJsonLd(jsonLd);

  const meta = extractFromMeta($);
  const nums = extractNumbersFromHtml(html);

  // images from JSON-LD
  const imagesRaw = (() => {
    const img = best?.image ?? best?.images;
    if (!img) return [];
    if (Array.isArray(img)) return img;
    if (typeof img === "string") return [img];
    // sometimes { url: "..." }
    if (img?.url) return [img.url];
    return [];
  })();

  const address =
    typeof best?.address === "string"
      ? best.address
      : best?.address
      ? [best.address.streetAddress, best.address.addressLocality, best.address.addressRegion]
          .filter(Boolean)
          .join(", ")
      : undefined;

  const amenities =
    (Array.isArray(best?.amenityFeature)
      ? best.amenityFeature
          .map((a: any) => a?.name)
          .filter((x: any) => typeof x === "string")
      : []) as string[];

  const listing: Listing = ListingSchema.parse({
    unitId,
    vrboUrl: url.split("?")[0],
    name: best?.name ? cleanText(String(best.name)) : meta.name,
    description: best?.description
      ? cleanText(String(best.description))
      : meta.description,
    heroImage: meta.heroImage ?? imagesRaw[0],
    images: uniq(imagesRaw).filter(Boolean),
    bedrooms: nums.bedrooms,
    bathrooms: nums.bathrooms,
    sleeps: nums.sleeps,
    amenities: uniq([...(amenities ?? []), ...extractAmenitiesLoose($)]).map(cleanText),
    address: address ? cleanText(address) : undefined,
  });

  return listing;
}

function toUnitsTs(listings: Listing[]) {
  // tailor this shape to match your existing src/data/units.ts structure
  // (this is a clean “generated base” you can copy/paste into units.ts)
  return `/* eslint-disable */
/**
 * AUTO-GENERATED by scripts/pull-vrbo.ts
 * Edit src/data/units.ts if you want to override copy.
 */
export const vrboPulled = ${JSON.stringify(listings, null, 2)} as const;
`;
}

async function main() {
  const limit = pLimit(2);

  const pulled = await Promise.all(
    UNITS.map((u) => limit(() => pullOne(u.id, u.url)))
  );

  // Optional: download a few images for each unit so your UI is instantly “real”
  // Comment this out if you’d rather keep hotlinking for now.
  for (const listing of pulled) {
    if (!listing.images.length) continue;
    const localPaths = await downloadImages(listing.unitId as UnitId, listing.images, 10);
    if (localPaths.length) {
      listing.images = localPaths;
      listing.heroImage = localPaths[0];
    }
  }

  const outPath = path.join(repoRoot, "src", "data", "vrboPulled.generated.ts");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, toUnitsTs(pulled), "utf8");

  console.log(`✅ wrote ${outPath}`);
  console.log(`Next: import { vrboPulled } from "./vrboPulled.generated" and map into units.ts`);
}

console.log("pull-vrbo: about to run main");
main().catch((e) => {
  console.error("❌ pull failed:", e);
  process.exit(1);
});