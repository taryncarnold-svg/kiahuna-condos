"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UNITS, BOOKING_EMAIL } from "@/data/units";

type AvailabilityResult = {
  unit: string;
  available: boolean | null;
  error?: string;
};

function bookingMailto(unitId: string, checkIn: string, checkOut: string) {
  const subject = encodeURIComponent(`Booking request — Unit ${unitId}`);
  const body = encodeURIComponent(
    `Hi,\n\nI'd like to enquire about Unit ${unitId} at Kiahuna Plantation.\n\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\n\nPlease let me know about availability and next steps. Thank you.`
  );
  return `mailto:${BOOKING_EMAIL}?subject=${subject}&body=${body}`;
}

function AvailabilityPill({ status }: { status: boolean | null }) {
  if (status === true) {
    return (
      <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2.5 py-1 text-xs font-semibold shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
        Available
      </span>
    );
  }
  if (status === false) {
    return (
      <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/90 text-stone-400 ring-1 ring-stone-200 px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-stone-300 flex-shrink-0" />
        Booked
      </span>
    );
  }
  // null = iCal feed unavailable — still render so users can see the check ran
  return (
    <span className="absolute top-3 right-3 flex items-center rounded-full bg-white/80 text-stone-400 ring-1 ring-stone-200 px-2.5 py-1 text-xs shadow-sm backdrop-blur">
      —
    </span>
  );
}

export default function Home() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, AvailabilityResult>>({});
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!checkIn || !checkOut) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/availability?checkIn=${checkIn}&checkOut=${checkOut}`
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        const map: Record<string, AvailabilityResult> = {};
        for (const r of data.results) map[r.unit] = r;
        setResults(map);
        setSearched(true);
      }
    } catch {
      setError("Could not check availability right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="hero-section relative overflow-hidden min-h-[38vh] sm:min-h-[55vh]"
      >
        <Image
          src="https://media.vrbo.com/lodging/104000000/103640000/103636400/103636320/648485f6.jpg?impolicy=resizecrop&rw=1200&ra=fit"
          alt="Poipu, Kauai"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />

        {/* Gradient overlay: light at top, heavier at bottom for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.97) 100%)",
          }}
        />

        {/* Headline — lower third */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 sm:pb-28 px-6 text-center">
          <p className="text-[11px] sm:text-[13px] tracking-[0.22em] uppercase text-white/90 mb-2">
            Kiahuna Plantation · Poipu, Kauai
          </p>
          <h1 className="text-3xl sm:text-5xl font-light text-white leading-snug mb-2 drop-shadow-sm">
            Steps from the beach.<br />Miles from stress.
          </h1>
          <p className="hidden sm:block text-white/90 text-base max-w-md leading-relaxed">
            Five privately owned condos at Kiahuna Plantation — book direct with the owner.
          </p>
        </div>
      </section>

      {/* ── Booking card — overlaps hero ─────────────────────────────────── */}
      <div className="relative z-10 -mt-10 sm:-mt-14 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-stone-200"
          >
            <div className="flex-1 px-5 py-4 text-left">
              <label className="block text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-1">
                Check-in
              </label>
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (checkOut && e.target.value >= checkOut) setCheckOut("");
                }}
                required
                className="w-full text-sm text-stone-800 focus:outline-none bg-transparent"
              />
            </div>
            <div className="flex-1 px-5 py-4 text-left">
              <label className="block text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-1">
                Check-out
              </label>
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className="w-full text-sm text-stone-800 focus:outline-none bg-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !checkIn || !checkOut}
              className="px-7 py-4 bg-stone-900 hover:bg-stone-700 disabled:bg-stone-200 disabled:text-stone-400 text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              {loading ? "Checking…" : "Check availability"}
            </button>
          </form>
          {error && (
            <p className="px-5 pb-3 text-sm text-red-400">{error}</p>
          )}
        </div>
      </div>

      {/* ── Units ────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16 sm:pb-24">
        {searched && (
          <p className="text-xs text-stone-400 mb-8 tracking-wide">
            Showing availability for{" "}
            <span className="text-stone-600">{checkIn}</span>
            {" → "}
            <span className="text-stone-600">{checkOut}</span>
          </p>
        )}

        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {UNITS.map((unit) => {
            const result = results[unit.id];
            const available = result?.available ?? null;
            const datesSelected = !!(checkIn && checkOut);
            const isUnavailable = datesSelected && available === false;

            return (
              <div
                key={unit.id}
                onMouseEnter={() => setHoveredUnit(unit.id)}
                onMouseLeave={() => setHoveredUnit(null)}
                className={`flex flex-col transition-all duration-300 ${hoveredUnit && hoveredUnit !== unit.id ? "grayscale-[0.6] opacity-70" : ""}`}
              >
                {/* Photo */}
                <div className="relative h-56 rounded-xl overflow-hidden bg-stone-100 mb-4">
                  <Image
                    src={unit.photos[0]}
                    alt={unit.name}
                    fill
                    className={`object-cover motion-safe:transition-all motion-safe:duration-200 ${isUnavailable ? "brightness-90 saturate-[0.55]" : ""}`}
                    unoptimized
                  />
                  <div className={`absolute inset-0 bg-stone-100/30 motion-safe:transition-opacity motion-safe:duration-200 ${isUnavailable ? "opacity-100" : "opacity-0"}`} />
                  {searched && <AvailabilityPill status={available} />}
                </div>

                {/* Row 1: Title · Price */}
                <div className="flex items-baseline justify-between mb-1">
                  <h2 className="text-sm font-medium text-stone-800">{unit.name}</h2>
                  <span className="text-sm font-medium text-stone-700 shrink-0 ml-2">From ${unit.nightlyFrom} <span className="text-xs font-normal text-stone-400">/ night</span></span>
                </div>

                {/* Row 2: Specs · Unit number */}
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs text-stone-400">{unit.bedrooms} BR · {unit.bathrooms} BA · Sleeps {unit.maxGuests}</span>
                  <span className="text-xs text-stone-400 shrink-0 ml-2">Unit {unit.id}</span>
                </div>

                {/* CTAs */}
                <div className="mt-auto flex gap-2">
                  <Link
                    href={`/units/${unit.id}`}
                    className="flex-1 text-center border border-stone-200 hover:border-stone-300 text-stone-600 text-xs font-medium py-2 rounded-lg transition-colors"
                  >
                    View
                  </Link>
                  {datesSelected && available !== false ? (
                    <a
                      href={bookingMailto(unit.id, checkIn, checkOut)}
                      className="flex-1 text-center bg-stone-900 hover:bg-stone-700 text-white text-xs font-medium py-2 rounded-lg transition-colors"
                    >
                      Request booking
                    </a>
                  ) : (
                    <a
                      href={unit.vrboUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 text-center border border-stone-200 text-stone-300 text-xs font-medium py-2 rounded-lg transition-colors ${isUnavailable ? "opacity-40 pointer-events-none" : "hover:border-stone-300 text-stone-400"}`}
                    >
                      VRBO ↗
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust section */}
      <section className="border-t border-stone-100 bg-stone-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">

          {/* VRBO credential card + summary copy */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
            <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-sm shrink-0" style={{ border: "1.5px solid #1B6FEE" }}>
              <div className="relative w-12 h-12 shrink-0">
                <Image src="/vrbo-logo.png" alt="VRBO" fill className="object-contain" unoptimized />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-800">VRBO Premier Host</p>
                <p className="text-xs text-stone-400">Top 10% of properties based on guest reviews</p>
              </div>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed">
              Across all five condos, guests consistently mention the same things: spotless spaces, thoughtful hosting, and an easy walk to Poipu Beach. Here are a few recent notes from stays in our units.
            </p>
          </div>

          {/* Review cards */}
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { quote: "Deena is a terrific host — quick to respond and thoughtful with details. Clean, comfy, quiet. Highly recommend.", name: "Patricia", unit: "Unit 35", date: "September 2025" },
              { quote: "Updated, immaculate, and comfortable. Check-in was smooth and checkout was effortless. Now that's a vacation.", name: "Denise M.", unit: "Unit 128", date: "July 2025" },
              { quote: "Outstanding stay — supplies, decor, comfort, and location were all perfect. We highly recommend this unit.", name: "Carol P.", unit: "Unit 151", date: "June 2024" },
            ].map(({ quote, name, unit, date }) => (
              <div key={name} className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm flex flex-col gap-3">
                <p className="text-sm text-stone-700 leading-relaxed">"{quote}"</p>
                <p className="text-xs text-stone-400">{name} &nbsp;·&nbsp; {unit} &nbsp;·&nbsp; {date}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
