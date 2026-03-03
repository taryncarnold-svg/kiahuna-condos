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
  if (status === true)
    return (
      <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-medium text-emerald-700 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Available
      </span>
    );
  if (status === false)
    return (
      <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-medium text-stone-500 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
        Booked
      </span>
    );
  return null;
}

export default function Home() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, AvailabilityResult>>({});
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

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
      {/* Full-bleed hero */}
      <section className="relative h-[82vh] overflow-hidden">
        <Image
          src="https://picsum.photos/seed/poipu-shore/1920/1080"
          alt="Poipu, Kauai"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
        {/* Gentle bottom fade into white */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Headline + search */}
      <section className="max-w-2xl mx-auto px-6 pt-10 pb-20 text-center">
        <p className="text-xs tracking-[0.18em] uppercase text-stone-400 mb-5">
          Kiahuna Plantation · Poipu, Kauai
        </p>
        <h1 className="text-4xl sm:text-5xl font-light text-stone-900 leading-snug mb-5">
          The south shore,<br />at your own pace.
        </h1>
        <p className="text-stone-400 text-base leading-relaxed mb-10">
          Five privately owned condos, steps from one of Hawaii's great beaches.
          <br className="hidden sm:block" />
          Reach the owner directly.
        </p>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row border border-stone-200 rounded-2xl overflow-hidden bg-white"
        >
          <div className="flex-1 px-5 py-4 text-left border-b sm:border-b-0 sm:border-r border-stone-200">
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
          <div className="flex-1 px-5 py-4 text-left border-b sm:border-b-0 sm:border-r border-stone-200">
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
          <p className="mt-4 text-sm text-red-400">{error}</p>
        )}
      </section>

      {/* Units */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
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
                className={`flex flex-col transition-opacity ${isUnavailable ? "opacity-40" : ""}`}
              >
                {/* Photo */}
                <div className="relative h-56 rounded-xl overflow-hidden bg-stone-100 mb-4">
                  <Image
                    src={unit.photos[0]}
                    alt={unit.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {datesSelected && <AvailabilityDot status={available} />}
                </div>

                {/* Meta */}
                <div className="flex items-baseline justify-between mb-1">
                  <h2 className="text-sm font-medium text-stone-800">{unit.name}</h2>
                  <span className="text-xs text-stone-400">{unit.view}</span>
                </div>

                <p className="text-sm text-stone-400 leading-relaxed mb-3 line-clamp-2">
                  {unit.tagline}
                </p>

                <p className="text-xs text-stone-400 mb-4">
                  {unit.bedrooms} BR · {unit.bathrooms} BA · up to {unit.maxGuests} guests
                  <span className="ml-3 text-stone-600 font-medium">
                    from ${unit.nightlyFrom}
                    <span className="font-normal text-stone-400">/night</span>
                  </span>
                </p>

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
                      className="flex-1 text-center border border-stone-200 hover:border-stone-300 text-stone-400 text-xs font-medium py-2 rounded-lg transition-colors"
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

      {/* About the place */}
      <section className="border-t border-stone-100 py-20 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-12 text-sm">
          <div>
            <p className="font-medium text-stone-700 mb-3">The south shore</p>
            <p className="text-stone-400 leading-relaxed">
              Poipu sits in Kauai's rain shadow — more than 300 sunny days a
              year, warm water, and a pace of life that makes it hard to leave.
              It's the quieter, sunnier side of the island.
            </p>
          </div>
          <div>
            <p className="font-medium text-stone-700 mb-3">Poipu Beach</p>
            <p className="text-stone-400 leading-relaxed">
              A five-minute walk from your door. Named one of America's best
              beaches. Calm water for swimming and snorkeling in the morning,
              sea turtles hauled out by afternoon.
            </p>
          </div>
          <div>
            <p className="font-medium text-stone-700 mb-3">Kiahuna Plantation</p>
            <p className="text-stone-400 leading-relaxed">
              Fifteen acres of tropical gardens, pools woven through the
              grounds, and the unhurried feeling of a place designed for
              staying — not passing through.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
