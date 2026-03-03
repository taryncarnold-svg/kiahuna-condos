import { vrboPulled } from "./vrboPulled.generated";
import { vrboManual } from "./vrboManual";

export type Review = {
  author: string;
  rating: number; // 1–5
  text: string;
  date: string; // YYYY-MM
};

export type Unit = {
  id: string;
  name: string;
  tagline: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  sqft: number;
  view: string;
  description: string;
  amenities: string[];
  photos: string[]; // placeholder URLs — swap for real /photos/*.jpg when ready
  reviews: Review[];
  vrboUrl: string;
  nightlyFrom: number; // approximate starting nightly rate (USD)
};

// ---------------------------------------------------------------------------
// Merge helper — wires real VRBO-scraped data over placeholder values.
//
// Override policy:
//   vrboUrl   → always from pulled (the real listing URLs are the main win)
//   photos    → from pulled.images when non-empty; else keep placeholder
//   amenities → from pulled.amenities when it has > 1 item; a single "tv"
//               entry is treated as an incomplete scrape, so we keep the
//               richer placeholder list until the scraper returns full data
// ---------------------------------------------------------------------------
type PulledUnit = { unitId: string; vrboUrl: string; images: string[]; amenities: string[] };

const pulledMap = Object.fromEntries(
  (vrboPulled as unknown as PulledUnit[]).map((p) => [p.unitId, p])
) as Record<string, PulledUnit>;

function withPulled(base: Unit): Unit {
  const p = pulledMap[base.id];
  if (!p) return base;
  return {
    ...base,
    vrboUrl: p.vrboUrl,
    ...(p.images.length > 0    && { photos:    p.images }),
    ...(p.amenities.length > 1 && { amenities: p.amenities }),
  };
}

// Merge hand-curated vrboManual data over a unit.
// title → name, description, highlights → amenities, images → photos,
// reviews mapped from /10 rating to /5.
function withManual(base: Unit): Unit {
  const m = vrboManual[base.id];
  if (!m) return base;
  return {
    ...base,
    name: m.title,
    description: m.description,
    amenities: m.highlights,
    photos: m.images,
    reviews: m.reviews.map((r) => ({
      author: r.name,
      date: r.date,
      rating: Math.round(r.rating / 2),
      text: r.quote,
    })),
  };
}

// ---------------------------------------------------------------------------

export const UNITS: Unit[] = [
  withPulled({
    id: "35",
    name: "Unit 35",
    tagline: "Peaceful garden retreat steps from the pool",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    sqft: 650,
    view: "Garden View",
    description:
      "Unit 35 is a beautifully appointed one-bedroom condo tucked into the lush tropical gardens of Kiahuna Plantation. Enjoy your morning coffee on the lanai surrounded by birds of paradise and plumeria, then stroll just a few steps to the pool. Inside, you'll find a fully equipped kitchen, a king bed, and everything you need for a relaxing Kauai getaway.",
    amenities: [
      "Private lanai",
      "Full kitchen",
      "King bed",
      "Pool access",
      "Free Wi-Fi",
      "Air conditioning",
      "Ceiling fans",
      "Washer / dryer",
      "Smart TV",
      "Beach gear (chairs, towels, cooler)",
      "Covered parking",
      "Tropical garden views",
    ],
    photos: [
      "https://picsum.photos/seed/unit35a/900/600",
      "https://picsum.photos/seed/unit35b/900/600",
      "https://picsum.photos/seed/unit35c/900/600",
    ],
    reviews: [
      {
        author: "Jamie L.",
        rating: 5,
        text: "Absolutely perfect for our anniversary trip. The garden is stunning and we loved how quiet and private it felt.",
        date: "2024-11",
      },
      {
        author: "Marcus T.",
        rating: 5,
        text: "Everything was spotless and the host was incredibly responsive. We'll definitely be back!",
        date: "2024-09",
      },
      {
        author: "Priya K.",
        rating: 4,
        text: "Lovely condo in a beautiful setting. The kitchen had everything we needed. Parking was easy.",
        date: "2024-07",
      },
    ],
    vrboUrl: "https://www.vrbo.com/",
    nightlyFrom: 185,
  }),
  withManual(withPulled({
    id: "87",
    name: "Unit 87",
    tagline: "Sweeping ocean views with a front-row seat to Poipu sunsets",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    sqft: 1050,
    view: "Ocean View",
    description:
      "Unit 87 offers breathtaking panoramic ocean views from its generous lanai — the perfect spot to watch humpback whales in winter or sip a mai tai as the sun dips below the horizon. This spacious two-bedroom, two-bathroom condo sleeps up to four and features a thoughtfully updated interior with beach-casual style. Poipu Beach is a short walk away.",
    amenities: [
      "Ocean-view lanai",
      "Full kitchen",
      "King bed (primary)",
      "Queen bed (guest room)",
      "Pool access",
      "Free Wi-Fi",
      "Air conditioning",
      "Ceiling fans",
      "Washer / dryer",
      "Smart TV (both rooms)",
      "Beach gear (chairs, towels, snorkel set)",
      "Covered parking",
      "BBQ grill access",
    ],
    photos: [
      "https://picsum.photos/seed/unit87a/900/600",
      "https://picsum.photos/seed/unit87b/900/600",
      "https://picsum.photos/seed/unit87c/900/600",
    ],
    reviews: [
      {
        author: "Chen & Fiona W.",
        rating: 5,
        text: "The view from the lanai is absolutely unreal. We saw whales every morning. Worth every penny.",
        date: "2025-01",
      },
      {
        author: "Sandra R.",
        rating: 5,
        text: "Spacious, clean, and well-stocked. The snorkel gear saved us a rental. Highly recommend.",
        date: "2024-12",
      },
      {
        author: "Derek M.",
        rating: 5,
        text: "Our family of four fit perfectly. Bedrooms are well-separated — great for privacy.",
        date: "2024-08",
      },
    ],
    vrboUrl: "https://www.vrbo.com/",
    nightlyFrom: 295,
  })),
  withPulled({
    id: "56",
    name: "Unit 56",
    tagline: "Bright poolside escape with a tropical island vibe",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    sqft: 680,
    view: "Pool View",
    description:
      "Unit 56 puts you right in the heart of the resort action — just steps from the sparkling pool, with a breezy lanai that looks out over the water and swaying palms. This one-bedroom condo has been freshly updated with cheerful coastal décor, a comfortable king bed, and a full kitchen stocked with everything you need to cook a fresh Kauai catch.",
    amenities: [
      "Pool-view lanai",
      "Full kitchen",
      "King bed",
      "Pool access (steps away)",
      "Free Wi-Fi",
      "Air conditioning",
      "Ceiling fans",
      "Washer / dryer",
      "Smart TV",
      "Beach gear (chairs, umbrella, towels)",
      "Covered parking",
    ],
    photos: [
      "https://picsum.photos/seed/unit56a/900/600",
      "https://picsum.photos/seed/unit56b/900/600",
      "https://picsum.photos/seed/unit56c/900/600",
    ],
    reviews: [
      {
        author: "Alicia B.",
        rating: 5,
        text: "We loved waking up and jumping straight in the pool. The condo is adorable and so well-equipped.",
        date: "2025-02",
      },
      {
        author: "Tom & Rachel N.",
        rating: 4,
        text: "Perfect for a couple. Cozy but has everything you need. Great location on the property.",
        date: "2024-10",
      },
    ],
    vrboUrl: "https://www.vrbo.com/",
    nightlyFrom: 195,
  }),
  withPulled({
    id: "128",
    name: "Unit 128",
    tagline: "Spacious two-bedroom haven with garden and partial ocean views",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 5,
    sqft: 1100,
    view: "Garden & Partial Ocean View",
    description:
      "Unit 128 is one of the larger units in the complex, offering plenty of space for families or two couples traveling together. The wraparound lanai catches both garden breezes and peeks of blue Pacific horizon. Inside, you'll find two full bathrooms, a well-equipped kitchen with island seating, and a sleeper sofa in the living room for an extra guest.",
    amenities: [
      "Wraparound lanai",
      "Full kitchen with island seating",
      "King bed (primary)",
      "Two twin beds (guest room)",
      "Sleeper sofa",
      "Pool access",
      "Free Wi-Fi",
      "Air conditioning",
      "Ceiling fans",
      "Washer / dryer",
      "Smart TV (living room + primary)",
      "Beach gear (chairs, boogie boards, towels)",
      "Covered parking (2 spaces)",
      "BBQ grill access",
    ],
    photos: [
      "https://picsum.photos/seed/unit128a/900/600",
      "https://picsum.photos/seed/unit128b/900/600",
      "https://picsum.photos/seed/unit128c/900/600",
    ],
    reviews: [
      {
        author: "The Hernandez Family",
        rating: 5,
        text: "We had 5 people and there was still so much room. The kitchen is fantastic — we cooked most nights.",
        date: "2024-12",
      },
      {
        author: "Grace & Ben O.",
        rating: 5,
        text: "Loved the wraparound lanai. Coffees in the morning with garden views is something we'll miss.",
        date: "2024-06",
      },
      {
        author: "Kevin P.",
        rating: 4,
        text: "Great value for a larger group. Two bathrooms are a must with 5 people. Would stay again.",
        date: "2024-04",
      },
    ],
    vrboUrl: "https://www.vrbo.com/",
    nightlyFrom: 320,
  }),
  withPulled({
    id: "151",
    name: "Unit 151",
    tagline: "Romantic ground-floor garden villa with direct outdoor access",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    sqft: 720,
    view: "Tropical Garden View",
    description:
      "Unit 151 is a ground-floor one-bedroom villa that opens directly onto the resort's fragrant tropical gardens. Step outside your sliding glass door and you're immediately in paradise — with birdsong, plumeria blossoms, and the smell of sea air. The condo has been lovingly furnished with a romantic island aesthetic and is ideal for couples seeking quiet seclusion.",
    amenities: [
      "Direct garden access (ground floor)",
      "Private patio",
      "Full kitchen",
      "King bed",
      "Pool access",
      "Free Wi-Fi",
      "Air conditioning",
      "Ceiling fans",
      "Washer / dryer",
      "Smart TV",
      "Beach gear (chairs, towels, snorkel set)",
      "Covered parking",
      "Outdoor dining set on patio",
    ],
    photos: [
      "https://picsum.photos/seed/unit151a/900/600",
      "https://picsum.photos/seed/unit151b/900/600",
      "https://picsum.photos/seed/unit151c/900/600",
    ],
    reviews: [
      {
        author: "Nadia & Omar S.",
        rating: 5,
        text: "We got engaged here. The patio at sunset was just magical. Truly romantic.",
        date: "2025-01",
      },
      {
        author: "Claire W.",
        rating: 5,
        text: "Perfect hideaway. Ground floor felt so private and the garden access is a huge plus.",
        date: "2024-11",
      },
    ],
    vrboUrl: "https://www.vrbo.com/",
    nightlyFrom: 210,
  }),
];

export const UNITS_BY_ID: Record<string, Unit> = Object.fromEntries(
  UNITS.map((u) => [u.id, u])
);

/** Email address for direct booking requests */
export const BOOKING_EMAIL = "owner@kiahunacondos.com";
