console.log("availability route loaded");
import { NextResponse } from "next/server";
import ICAL from "ical.js";

type UnitKey = "35" | "87" | "56" | "128" | "151";

type BlockedRange = { start: string; end: string }; // YYYY-MM-DD, end exclusive

const UNITS: Record<UnitKey, string | undefined> = {
  "35": process.env.VRBO_ICAL_UNIT_35,
  "87": process.env.VRBO_ICAL_UNIT_87,
  "56": process.env.VRBO_ICAL_UNIT_56,
  "128": process.env.VRBO_ICAL_UNIT_128,
  "151": process.env.VRBO_ICAL_UNIT_151,
};

const CACHE_TTL_MS = 15 * 60 * 1000;

const cache = new Map<
  UnitKey,
  { fetchedAt: number; blocked: BlockedRange[]; error?: string }
>();

function isValidISODate(d: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(d);
}

function toISODate(icalDate: any): string {
  // ICAL.Time -> YYYY-MM-DD
  const y = String(icalDate.year).padStart(4, "0");
  const m = String(icalDate.month).padStart(2, "0");
  const d = String(icalDate.day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseBlockedRangesFromIcs(icsText: string): BlockedRange[] {
  const jcalData = ICAL.parse(icsText);
  const vcalendar = new ICAL.Component(jcalData);
  const vevents = vcalendar.getAllSubcomponents("vevent");

  const blocked: BlockedRange[] = [];

  for (const vevent of vevents) {
    const event = new ICAL.Event(vevent);

    const start = event.startDate;
    const end = event.endDate;

    if (!start || !end) continue;

    // Normalize to date-only strings.
    // For all-day reservations, DTSTART/DTEND are already date-ish.
    // For timed events, we still treat them as date ranges by day.
    const startISO = toISODate(start);
    const endISO = toISODate(end);

    // Guard against weird inverted events
    if (startISO >= endISO) continue;

    blocked.push({ start: startISO, end: endISO });
  }

  // Optional: merge overlapping/adjacent ranges (makes checks faster)
  blocked.sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));

  const merged: BlockedRange[] = [];
  for (const r of blocked) {
    const last = merged[merged.length - 1];
    if (!last) {
      merged.push(r);
      continue;
    }
    // overlap or adjacency (end == next.start)
    if (r.start <= last.end) {
      if (r.end > last.end) last.end = r.end;
    } else {
      merged.push(r);
    }
  }

  return merged;
}

function overlaps(
  checkIn: string,
  checkOut: string,
  blocked: BlockedRange
): boolean {
  // booking blocks nights from start up to but not including end
  // overlap condition: checkIn < blocked.end AND checkOut > blocked.start
  return checkIn < blocked.end && checkOut > blocked.start;
}

async function fetchWithTimeout(url: string, ms = 10_000): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      // Avoid Next caching surprises; we manage our own TTL.
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`fetch_failed_${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

async function getBlockedForUnit(unit: UnitKey) {
  const url = UNITS[unit];
  if (!url) {
    return { blocked: [] as BlockedRange[], error: "missing_ical_url" };
  }

  const cached = cache.get(unit);
  const now = Date.now();
  if (cached && now - cached.fetchedAt < CACHE_TTL_MS) {
    return { blocked: cached.blocked, error: cached.error };
  }

  try {
    const ics = await fetchWithTimeout(url);
    const blocked = parseBlockedRangesFromIcs(ics);
    cache.set(unit, { fetchedAt: now, blocked });
    return { blocked };
  } catch (e: any) {
    const error = e?.name === "AbortError" ? "timeout" : String(e?.message ?? e);
    cache.set(unit, { fetchedAt: now, blocked: [], error });
    return { blocked: [] as BlockedRange[], error };
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";

  if (!isValidISODate(checkIn) || !isValidISODate(checkOut)) {
    return NextResponse.json(
      { error: "Invalid checkIn/checkOut. Use YYYY-MM-DD." },
      { status: 400 }
    );
  }
  if (checkOut <= checkIn) {
    return NextResponse.json(
      { error: "checkOut must be after checkIn." },
      { status: 400 }
    );
  }

  const units = Object.keys(UNITS) as UnitKey[];

  const results = await Promise.all(
    units.map(async (unit) => {
      const { blocked, error } = await getBlockedForUnit(unit);

      if (error) {
        return { unit, available: null as null, error };
      }

      const isBlocked = blocked.some((b) => overlaps(checkIn, checkOut, b));
      return { unit, available: !isBlocked };
    })
  );

  return NextResponse.json({ checkIn, checkOut, results });
}
