import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { UNITS_BY_ID } from "@/data/units";
import UnitGallery from "@/components/UnitGallery";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return Object.keys(UNITS_BY_ID).map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const unit = UNITS_BY_ID[id];
  if (!unit) return {};
  return {
    title: `${unit.name} – ${unit.view} | Kiahuna Condos`,
    description: unit.tagline,
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400 text-sm">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </span>
  );
}

export default async function UnitPage({ params }: Props) {
  const { id } = await params;
  const unit = UNITS_BY_ID[id];
  if (!unit) notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Back */}
      <Link href="/" className="text-sm text-teal-600 hover:underline mb-6 block">
        ← Back to all units
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs text-stone-400 mb-1 tracking-wide">Unit {unit.id} · {unit.view}</p>
          <h1 className="text-3xl font-bold text-stone-800">{unit.name}</h1>
          <p className="text-stone-500 mt-1">{unit.tagline}</p>
        </div>
      </div>

      {/* Photos */}
      <UnitGallery photos={unit.photos} unitName={unit.name} />

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left: details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 text-sm text-stone-600 border-b border-stone-100 pb-6">
            <span>🛏 {unit.bedrooms} bedroom{unit.bedrooms !== 1 ? "s" : ""}</span>
            <span>🚿 {unit.bathrooms} bathroom{unit.bathrooms !== 1 ? "s" : ""}</span>
            <span>👥 Up to {unit.maxGuests} guests</span>

          </div>

          {/* Description */}
          <section>
            <h2 className="text-lg font-semibold text-stone-800 mb-3">About this unit</h2>
            <p className="text-stone-600 leading-relaxed">{unit.description}</p>
          </section>

          {/* Amenities */}
          <section>
            <h2 className="text-lg font-semibold text-stone-800 mb-3">Amenities</h2>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              {unit.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2 text-sm text-stone-600">
                  <span className="text-teal-500 font-bold">✓</span> {a}
                </li>
              ))}
            </ul>
          </section>

          {/* Reviews */}
          <section>
            <h2 className="text-lg font-semibold text-stone-800 mb-4">Guest reviews</h2>
            <div className="space-y-4">
              {unit.reviews.map((r, i) => (
                <div key={i} className="bg-white border border-stone-100 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-sm">
                      {r.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-700">{r.author}</p>
                      <p className="text-xs text-stone-400">{r.date}</p>
                    </div>
                    <div className="ml-auto">
                      <StarRating rating={r.rating} />
                    </div>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: inquiry sidebar */}
        <aside className="space-y-4">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm sticky top-20">
            <p className="text-sm text-stone-500 mb-4 leading-relaxed">
              Interested in this unit? Send the owner a message — no commitment required.
            </p>
            <Link
              href={`/contact?unit=${unit.id}`}
              className="block text-center bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3 px-4 rounded-xl transition-colors mb-3"
            >
              Message the owner
            </Link>

            <a
              href={unit.vrboUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center border border-stone-200 hover:border-stone-300 hover:bg-stone-50 active:bg-stone-100 text-stone-600 font-semibold py-3 px-4 rounded-xl transition-colors"
            >
              View on VRBO ↗
            </a>

            <p className="text-xs text-stone-400 mt-4 leading-relaxed">
              The owner typically responds within a few hours.
            </p>
          </div>

        </aside>
      </div>
    </main>
  );
}
