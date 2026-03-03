import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { UNITS, BOOKING_EMAIL } from "@/data/units";

export const metadata: Metadata = {
  title: "Compare Units | Kiahuna Condos",
  description:
    "Compare all five Kiahuna Plantation condos side by side — bedrooms, bathrooms, views, amenities, and rates.",
};

const ALL_AMENITIES = [
  "Ocean-view lanai",
  "Pool-view lanai",
  "Private lanai / patio",
  "Full kitchen",
  "King bed (primary)",
  "Pool access",
  "Washer / dryer",
  "Air conditioning",
  "Free Wi-Fi",
  "Beach gear",
  "BBQ grill access",
  "Sleeper sofa",
  "Covered parking (2 spaces)",
];

function check(unit: { amenities: string[] }, amenity: string) {
  return unit.amenities.some((a) =>
    a.toLowerCase().includes(amenity.toLowerCase().split(" ")[0].toLowerCase())
  );
}

export default function ComparePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-800 mb-2">Compare units</h1>
        <p className="text-stone-500">
          All five condos at Kiahuna Plantation, Poipu, Kauai — side by side.
        </p>
      </div>

      {/* Mobile: stacked cards */}
      <div className="lg:hidden space-y-6 mb-10">
        {UNITS.map((unit) => (
          <div key={unit.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
            <div className="relative h-44">
              <Image src={unit.photos[0]} alt={unit.name} fill className="object-cover" unoptimized />
            </div>
            <div className="p-5">
              <h2 className="font-semibold text-stone-800">{unit.name}</h2>
              <p className="text-xs text-stone-400 mb-3">{unit.view}</p>
              <dl className="grid grid-cols-2 gap-y-1.5 text-sm text-stone-600 mb-4">
                <dt className="text-stone-400">Bedrooms</dt><dd>{unit.bedrooms}</dd>
                <dt className="text-stone-400">Bathrooms</dt><dd>{unit.bathrooms}</dd>
                <dt className="text-stone-400">Max guests</dt><dd>{unit.maxGuests}</dd>
                <dt className="text-stone-400">Size</dt><dd>{unit.sqft} sq ft</dd>
                <dt className="text-stone-400">From</dt>
                <dd className="font-semibold text-teal-700">${unit.nightlyFrom}/night</dd>
              </dl>
              <div className="flex gap-2">
                <Link href={`/units/${unit.id}`} className="flex-1 text-center border border-stone-200 hover:bg-stone-50 text-stone-600 text-sm font-medium py-2 rounded-lg transition-colors">
                  Details
                </Link>
                <a
                  href={`mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(`Booking Request – ${unit.name}`)}`}
                  className="flex-1 text-center bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                >
                  Book Direct
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: comparison table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="text-left font-semibold text-stone-500 pb-4 pr-4 w-44"></th>
              {UNITS.map((unit) => (
                <th key={unit.id} className="pb-4 px-3 text-center min-w-[160px]">
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2">
                    <Image src={unit.photos[0]} alt={unit.name} fill className="object-cover" unoptimized />
                  </div>
                  <p className="font-semibold text-stone-800">{unit.name}</p>
                  <p className="text-xs text-stone-400">{unit.view}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Stats */}
            {[
              { label: "Bedrooms", key: (u: typeof UNITS[0]) => u.bedrooms },
              { label: "Bathrooms", key: (u: typeof UNITS[0]) => u.bathrooms },
              { label: "Max guests", key: (u: typeof UNITS[0]) => u.maxGuests },
              { label: "Size", key: (u: typeof UNITS[0]) => `${u.sqft} sq ft` },
              { label: "From", key: (u: typeof UNITS[0]) => `$${u.nightlyFrom}/night` },
            ].map(({ label, key }) => (
              <tr key={label} className="even:bg-stone-50">
                <td className="py-3 pr-4 font-medium text-stone-500 rounded-l-lg pl-2">{label}</td>
                {UNITS.map((unit) => (
                  <td key={unit.id} className={`py-3 px-3 text-center rounded-r-lg ${label === "From" ? "font-semibold text-teal-700" : "text-stone-700"}`}>
                    {key(unit)}
                  </td>
                ))}
              </tr>
            ))}

            {/* Amenity divider */}
            <tr>
              <td colSpan={UNITS.length + 1} className="pt-6 pb-2">
                <p className="text-xs font-semibold tracking-widest uppercase text-stone-400">Amenities</p>
              </td>
            </tr>

            {ALL_AMENITIES.map((amenity) => (
              <tr key={amenity} className="even:bg-stone-50">
                <td className="py-2.5 pr-4 text-stone-500 pl-2 rounded-l-lg">{amenity}</td>
                {UNITS.map((unit) => (
                  <td key={unit.id} className="py-2.5 px-3 text-center rounded-r-lg">
                    {check(unit, amenity) ? (
                      <span className="text-teal-500 font-bold">✓</span>
                    ) : (
                      <span className="text-stone-200">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* CTA row */}
            <tr>
              <td className="pt-6" />
              {UNITS.map((unit) => (
                <td key={unit.id} className="pt-6 px-3">
                  <div className="flex flex-col gap-2">
                    <a
                      href={`mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(`Booking Request – ${unit.name}`)}`}
                      className="block text-center bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                    >
                      Book Direct
                    </a>
                    <Link
                      href={`/units/${unit.id}`}
                      className="block text-center border border-stone-200 hover:bg-stone-50 text-stone-600 text-sm py-2 rounded-lg transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
