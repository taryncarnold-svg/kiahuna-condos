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
  const subject = encodeURIComponent(`Booking Request – Unit ${unitId}`);
  const body = encodeURIComponent(
    `Hi,\n\nI'd like to request a booking for Unit ${unitId} at Kiahuna Plantation.\n\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\n\nPlease let me know about availability and pricing. Thank you!`
  );
  return `mailto:${BOOKING_EMAIL}?subject=${subject}&body=${body}`;
}

function AvailabilityBadge({ status }: { status: boolean | null }) {
  if (status === true)
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Available
      </span>
    );
  if (status === false)
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        Booked
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-500">
      <span className="h-2 w-2 rounded-full bg-stone-300" />
      Select dates to check
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
      setError("Could not reach the availability service. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-teal-900 text-white py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-teal-300 text-sm font-semibold tracking-widest uppercase mb-3">
            Poipu · Kauai · Hawaii
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Your home away from home in paradise
          </h1>
          <p className="text-teal-100 text-lg mb-8">
            Five privately owned condos at Kiahuna Plantation. Book direct — no
            platform fees, personal service, the best rates.
          </p>

          {/* Search form */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row gap-3 items-end text-stone-800"
          >
            <div className="flex-1 text-left">
              <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wide">
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
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div className="flex-1 text-left">
              <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wide">
                Check-out
              </label>
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !checkIn || !checkOut}
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-lg transition-colors text-sm"
            >
              {loading ? "Checking…" : "Check Availability"}
            </button>
          </form>

          {error && (
            <p className="mt-3 text-red-300 text-sm">{error}</p>
          )}
        </div>
      </section>

      {/* Unit cards */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {searched && (
          <p className="text-stone-500 text-sm mb-6">
            Showing availability for{" "}
            <strong>
              {checkIn} → {checkOut}
            </strong>
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {UNITS.map((unit) => {
            const result = results[unit.id];
            const available = result?.available ?? null;
            const datesSelected = !!(checkIn && checkOut);

            return (
              <div
                key={unit.id}
                className={`bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col transition-shadow hover:shadow-md ${
                  available === false ? "opacity-60" : ""
                }`}
              >
                {/* Photo */}
                <div className="relative h-48 bg-stone-100">
                  <Image
                    src={unit.photos[0]}
                    alt={unit.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="p-5 flex flex-col flex-1 gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-semibold text-stone-800">{unit.name}</h2>
                      <p className="text-xs text-stone-400 mt-0.5">{unit.view}</p>
                    </div>
                    <AvailabilityBadge status={datesSelected ? available : null} />
                  </div>

                  <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">
                    {unit.tagline}
                  </p>

                  <ul className="flex flex-wrap gap-2 text-xs text-stone-500">
                    <li className="flex items-center gap-1">
                      <span>🛏</span> {unit.bedrooms} BR
                    </li>
                    <li className="flex items-center gap-1">
                      <span>🚿</span> {unit.bathrooms} BA
                    </li>
                    <li className="flex items-center gap-1">
                      <span>👥</span> Up to {unit.maxGuests}
                    </li>
                  </ul>

                  <p className="text-sm font-semibold text-stone-700">
                    From <span className="text-teal-700">${unit.nightlyFrom}</span>
                    <span className="font-normal text-stone-400"> / night</span>
                  </p>

                  <div className="mt-auto flex flex-col gap-2">
                    {available !== false && datesSelected ? (
                      <a
                        href={bookingMailto(unit.id, checkIn, checkOut)}
                        className="block text-center bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Book Direct (No Fees)
                      </a>
                    ) : !datesSelected ? (
                      <button
                        disabled
                        className="block w-full text-center bg-stone-100 text-stone-400 text-sm font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
                      >
                        Select dates to book
                      </button>
                    ) : null}

                    <div className="flex gap-2">
                      <Link
                        href={`/units/${unit.id}`}
                        className="flex-1 text-center border border-stone-200 hover:bg-stone-50 text-stone-600 text-sm font-medium py-2 px-3 rounded-lg transition-colors"
                      >
                        View Details
                      </Link>
                      <a
                        href={unit.vrboUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center border border-stone-200 hover:bg-stone-50 text-stone-600 text-sm font-medium py-2 px-3 rounded-lg transition-colors"
                      >
                        VRBO ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why book direct */}
      <section className="bg-teal-50 border-t border-teal-100 py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-8">
            Why book direct?
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 text-sm">
            {[
              {
                icon: "💰",
                title: "No platform fees",
                body: "Save 10–15% compared to booking through VRBO or Airbnb.",
              },
              {
                icon: "🤝",
                title: "Owner-direct service",
                body: "Communicate straight with the owner — fast replies, flexible terms.",
              },
              {
                icon: "🌺",
                title: "Local expertise",
                body: "Get insider tips on beaches, restaurants, and hidden gems.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title}>
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-stone-700 mb-1">{title}</h3>
                <p className="text-stone-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
