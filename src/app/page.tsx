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

function AvailabilityDot({ status }: { status: boolean | null }) {
  return (
    <span
      className={`absolute top-3 right-3 flex items-center justify-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-medium shadow-sm min-w-[88px] motion-safe:transition-opacity motion-safe:duration-150 motion-safe:ease-out ${
        status === null ? "opacity-0 pointer-events-none" : "opacity-100"
      } ${status === true ? "text-stone-600" : "text-stone-400"}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
          status === true ? "bg-emerald-700/60" : "bg-stone-300"
        }`}
      />
      {status === true ? "Available" : "Booked"}
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
        className="hero-section relative overflow-hidden"
        style={{ minHeight: "55vh" }}
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
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-28 px-6 text-center">
          <p className="text-[11px] tracking-[0.22em] uppercase text-white/90 mb-4">
            Kiahuna Plantation · Poipu, Kauai
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-white leading-snug mb-4 drop-shadow-sm">
            Steps from the beach.<br />Miles from stress.
          </h1>
          <p className="text-white/90 text-base max-w-md leading-relaxed">
            Five privately owned condos at Kiahuna Plantation — book direct with the owner.
          </p>
        </div>
      </section>

      {/* ── Booking card — overlaps hero ─────────────────────────────────── */}
      <div className="relative z-10 -mt-14 px-6">
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
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-24">
        {searched && (
          <p className="text-xs text-stone-400 mb-8 tracking-wide">
            Showing availability for{" "}
            <span className="text-stone-600">{checkIn}</span>
            {" → "}
            <span className="text-stone-600">{checkOut}</span>
          </p>
        )}

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
                  {datesSelected && <AvailabilityDot status={available} />}
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
      <section className="border-t border-stone-100 py-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Host credentials */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-16 mb-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-stone-900 shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-stone-800">VRBO Premier Host</p>
                <p className="text-xs text-stone-400">Top 10% of properties based on guest reviews</p>
              </div>
            </div>
            <div className="h-px sm:h-8 sm:w-px bg-stone-100" />
            <p className="text-sm text-stone-400 leading-relaxed max-w-md">
              Every unit is privately owned and personally managed. Guests consistently rate cleanliness,
              communication, and location as top strengths across all five condos.
            </p>
          </div>

          {/* Review quotes */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { quote: "Deena is a terrific host — quick to respond and thoughtful with details. Clean, comfy, quiet. Highly recommend.", attr: "Patricia · Unit 35 · September 2025" },
              { quote: "Updated, immaculate, and comfortable. Check-in was smooth and checkout was effortless. Now that's a vacation.", attr: "Denise M. · Unit 128 · July 2025" },
              { quote: "Outstanding stay — supplies, decor, comfort, and location were all perfect. We highly recommend this unit.", attr: "Carol P. · Unit 151 · June 2024" },
            ].map(({ quote, attr }) => (
              <div key={attr} className="rounded-xl border border-stone-200 bg-stone-50 p-6 flex flex-col gap-4">
                <p className="text-[15px] text-stone-600 leading-relaxed">"{quote}"</p>
                <p className="text-xs text-stone-400">{attr}</p>
              </div>
            ))}</div>

        </div>
      </section>
    </>
  );
}
