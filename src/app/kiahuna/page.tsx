import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kiahuna Guide · Poipu, Kauai | Kiahuna Condos",
  description:
    "Stay close to the sand, great coffee, and the kind of restaurants you'll talk about long after the trip. A guide to Kiahuna Plantation and Poipu's south shore.",
};

const favorites = [
  {
    name: "Little Fish Coffee",
    blurb:
      "Our go-to morning stop. Great coffee, better breakfast sandwiches, and the kind of place you end up visiting twice.",
  },
  {
    name: "Red Salt at Koa Kea",
    blurb:
      "A beautiful sunset dinner spot just down the beach. Thoughtful plates, strong wine list, and one of the best 'last night of vacation' tables on the south shore.",
  },
  {
    name: "Poipu Shopping Village",
    blurb:
      "Easy groceries, casual bites, and everything you forgot to pack — all a short walk away.",
  },
  {
    name: "Brennecke's Beach",
    blurb:
      "Morning turtle sightings and one of the best stretches of sand on the south shore.",
  },
];

const amenityTiles = [
  {
    title: "Poipu Beach Athletic Club",
    body: "Complimentary access for all guests.",
    image:
      "https://media.vrbo.com/lodging/104000000/103640000/103636400/103636320/248c7d8f.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  },
  {
    title: "Pool + Waterslide",
    body: "Family-friendly and just across the street.",
    image:
      "https://media.vrbo.com/lodging/34000000/33500000/33492900/33492811/763a3ce5.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  },
  {
    title: "Fitness Center",
    body: "Full gym + classes available.",
    image:
      "https://media.vrbo.com/lodging/34000000/33500000/33492900/33492811/w1919h1124x5y0-2adf76ae.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  },
  {
    title: "Tennis, Pickleball + Basketball",
    body: "Courts on-site.",
    image:
      "https://media.vrbo.com/lodging/36000000/35380000/35379600/35379574/16fdcd25.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  },
  {
    title: "The Great Lawn",
    body: "Oceanfront lounging at golden hour.",
    image:
      "https://media.vrbo.com/lodging/63000000/62960000/62954900/62954874/c37a7cc9.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  },
  {
    title: "Kauai Surf School",
    body: "Daily surf lessons available to book right from the lawn.",
    image:
      "https://kauaisurfschool.com/wp-content/uploads/2022/03/kauai-surf-school-poipu-lessons.jpg",
  },
];

export default function KiahunaGuidePage() {
  return (
    <main>

      {/* ── Hero image ───────────────────────────────────────────────── */}
      <div className="relative w-full h-[260px] sm:h-[380px] overflow-hidden">
        <Image
          src="https://media.vrbo.com/lodging/97000000/96110000/96104400/96104334/1fd0109e.jpg?impolicy=resizecrop&rw=1200&ra=fit"
          alt="Kiahuna Plantation, Poipu, Kauai"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
      </div>

      {/* ── Hero text ────────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 pt-8 pb-8">
        <h1 className="text-4xl sm:text-5xl font-light text-stone-900 leading-snug mb-4">
          Stay where the lawn meets the ocean.
        </h1>
        <p className="text-stone-400 text-base leading-relaxed">
          Kiahuna Plantation sits on one of Kauai&apos;s most walkable stretches of
          beach. Stay close to the sand, great coffee, and the kind of
          restaurants you&apos;ll talk about long after the trip.
        </p>
      </section>

      {/* ── Map ──────────────────────────────────────────────────────── */}
      <section className="px-6 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-100 h-52 sm:h-[300px]">
            <iframe
              title="Kiahuna Plantation Resort map"
              src="https://maps.google.com/maps?q=Kiahuna+Plantation+Resort,+2253+Poipu+Rd,+Koloa,+HI+96756&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-3 text-xs text-stone-300 text-center">
            Five privately owned condos within Kiahuna Plantation — all a short walk to Poipu Beach.
          </p>
        </div>
      </section>

      {/* ── Walkable favorites ───────────────────────────────────────── */}
      <section className="border-t border-stone-100 py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] tracking-[0.2em] uppercase text-stone-400 mb-6">
            Walkable favorites
          </p>
          <div className="space-y-7">
            {favorites.map(({ name, blurb }) => (
              <div key={name} className="grid sm:grid-cols-[160px_1fr] gap-1.5 sm:gap-10">
                <p className="font-semibold text-stone-800 text-sm">{name}</p>
                <p className="text-stone-400 text-sm font-light leading-relaxed">{blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Amenity tile grid ────────────────────────────────────────── */}
      <section className="border-t border-stone-100 py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.2em] uppercase text-stone-400 mb-6">
            What you get at Kiahuna Plantation
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenityTiles.map(({ title, body, image }) => (
              <div key={title} className="group">
                <div className="relative aspect-[3/2] rounded-xl overflow-hidden bg-stone-100 mb-3">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    unoptimized
                  />
                </div>
                <p className="font-semibold text-stone-800 text-sm">{title}</p>
                <p className="text-stone-400 text-sm font-light mt-0.5">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="border-t border-stone-100 py-10 px-6">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-medium text-stone-800 mb-1">Ready to book your stay?</p>
          </div>
          <Link
            href="/"
            className="shrink-0 bg-stone-950 hover:bg-stone-800 text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors"
          >
            Check availability
          </Link>
        </div>
      </section>

    </main>
  );
}
