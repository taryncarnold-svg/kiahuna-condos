import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { UNITS_BY_ID, BOOKING_EMAIL } from "@/data/units";

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

  const bookingSubject = encodeURIComponent(`Booking Request – ${unit.name}`);
  const bookingBody = encodeURIComponent(
    `Hi,\n\nI'm interested in booking ${unit.name} at Kiahuna Plantation.\n\nCheck-in: \nCheck-out: \nNumber of guests: \n\nPlease let me know about availability and pricing. Thank you!`
  );
  const bookingHref = `mailto:${BOOKING_EMAIL}?subject=${bookingSubject}&body=${bookingBody}`;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Back */}
      <Link href="/" className="text-sm text-teal-600 hover:underline mb-6 block">
        ← Back to all units
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs text-stone-400 mb-1 tracking-wide">Unit {unit.id}</p>
          <h1 className="text-3xl font-bold text-stone-800">{unit.name}</h1>
          <p className="text-stone-500 mt-1">{unit.tagline}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-teal-700">
            from ${unit.nightlyFrom}
            <span className="text-base font-normal text-stone-400"> / night</span>
          </p>
          <p className="text-xs text-stone-400 mt-0.5">{unit.view}</p>
        </div>
      </div>

      {/* Photos */}
      <div className="grid grid-cols-3 gap-2 mb-8 rounded-2xl overflow-hidden">
        {unit.photos.map((src, i) => (
          <div
            key={i}
            className={`relative bg-stone-100 ${i === 0 ? "col-span-2 row-span-2 h-72" : "h-[138px]"}`}
          >
            <Image
              src={src}
              alt={`${unit.name} photo ${i + 1}`}
              fill
              className="object-cover"
              unoptimized
              priority={i === 0}
            />
          </div>
        ))}
      </div>

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

        {/* Right: booking sidebar */}
        <aside className="space-y-4">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm sticky top-20">
            <p className="text-xl font-bold text-stone-800 mb-1">
              from <span className="text-teal-700">${unit.nightlyFrom}</span>
              <span className="text-sm font-normal text-stone-400"> / night</span>
            </p>
            <p className="text-xs text-stone-400 mb-5">
              Book direct — no platform fees
            </p>

            <a
              href={bookingHref}
              className="block text-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors mb-3"
            >
              Request Booking
            </a>

            <a
              href={unit.vrboUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center border border-stone-200 hover:bg-stone-50 text-stone-600 font-medium py-3 px-4 rounded-xl transition-colors text-sm"
            >
              View on VRBO ↗
            </a>

            <p className="text-xs text-stone-400 mt-4 leading-relaxed">
              Clicking "Request Booking" opens your email client with your
              dates and unit details prefilled. The owner typically responds
              within a few hours.
            </p>
          </div>

          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 text-sm text-teal-800">
            <p className="font-semibold mb-1">Compare units</p>
            <p className="text-teal-600 text-xs mb-3">
              Not sure this is the right fit? See all units side by side.
            </p>
            <Link
              href="/compare"
              className="text-teal-700 font-medium hover:underline text-xs"
            >
              Compare all units →
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
