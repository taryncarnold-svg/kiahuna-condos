import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meet the Host · Kiahuna Condos",
  description:
    "Deena Arnold is a VRBO Premier Host with five privately owned condos at Kiahuna Plantation, Poipu, Kauai. Learn about her family's love for the island.",
};

const stats = [
  { label: "Communication", value: "10 / 10" },
  { label: "Ease of check-in", value: "10 / 10" },
  { label: "Cancellation rate", value: "0%" },
];

export default function HostPage() {
  return (
    <main>

      {/* ── Page header ──────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 pt-12 pb-8">
        <p className="text-[11px] tracking-[0.2em] uppercase text-stone-500 mb-5">
          Meet the Host
        </p>
        <h1 className="text-4xl sm:text-5xl font-light text-stone-900 leading-snug mb-3">
          Deena Arnold
        </h1>
        <p className="text-xs text-stone-400 tracking-wide mb-5">
          VRBO Premier Host &nbsp;·&nbsp; Top 10% of properties based on guest reviews
        </p>
        <p className="text-base text-stone-500 font-light leading-relaxed">
          We love sharing our home in Kauai with guests and hope you feel the same
          sense of relaxation and joy our family has found here.
        </p>
      </section>

      {/* ── Hero photo ───────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 pb-10">
        <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden">
          <Image
            src="/deena-1.jpg.JPG"
            alt="Deena Arnold, host"
            fill
            className="object-cover object-[center_35%]"
            unoptimized
          />
        </div>
      </section>

      {/* ── Our family's love for Kauai ───────────────────────────────── */}
      <section className="border-t border-stone-100 py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] tracking-[0.2em] uppercase text-stone-500 mb-5">
            Our family's love for Kauai
          </p>
          <div className="space-y-4 text-stone-500 text-base font-light leading-relaxed">
            <p>
              Our family has been traveling to Kauai for many years, and Kiahuna
              Plantation has long been our favorite place on the island.
            </p>
            <p>
              What started as childhood trips to Poipu eventually became a tradition
              we now share with our own children and grandchild. Over time, this
              place has truly become our home away from home.
            </p>
            <p>
              We love welcoming guests here and hope you experience the same calm,
              beauty, and joy that our family has found in this special place.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why we keep coming back ───────────────────────────────────── */}
      <section className="border-t border-stone-100 py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] tracking-[0.2em] uppercase text-stone-500 mb-5">
            Why we keep coming back
          </p>
          <div className="space-y-4 text-stone-500 text-base font-light leading-relaxed">
            <p>
              Kiahuna Plantation has always held a special place in our hearts.
              Located on the sunny side of Kauai, the property offers peaceful
              tropical gardens, open lawns, and easy access to Poipu Beach —
              one of the island's most beloved beaches.
            </p>
            <p>
              Some of our favorite moments here are the simplest ones: morning
              coffee on the lanai, long walks through the gardens, and watching
              the sunset at the beach.
            </p>
          </div>
        </div>
      </section>

      {/* ── Photo pair ───────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="https://media.vrbo.com/lodging/63000000/62960000/62954900/62954874/c37a7cc9.jpg?impolicy=resizecrop&rw=1200&ra=fit"
              alt="The Great Lawn at Kiahuna Plantation"
              fill
              className="object-cover object-center"
              unoptimized
            />
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="https://media.vrbo.com/lodging/34000000/33500000/33492900/33492811/763a3ce5.jpg?impolicy=resizecrop&rw=1200&ra=fit"
              alt="Pool at Kiahuna Plantation"
              fill
              className="object-cover object-center"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* ── What makes these condos special ──────────────────────────── */}
      <section className="border-t border-stone-100 py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] tracking-[0.2em] uppercase text-stone-500 mb-5">
            What makes these condos special
          </p>
          <div className="space-y-4 text-stone-500 text-base font-light leading-relaxed">
            <p>
              We chose these condos because of their location on the property
              and the incredible natural beauty surrounding them.
            </p>
            <p>
              Many of the units offer ocean or garden views, and all are just
              a short walk to Poipu Beach. The lush landscaping throughout
              Kiahuna Plantation is beautifully maintained and creates a peaceful
              setting from the moment you arrive.
            </p>
            <p>
              Guests often tell us their favorite moments are the simplest ones —
              enjoying coffee on the lanai in the morning, taking a short walk to
              the beach, or watching the sunset over the water at the end of the day.
            </p>
          </div>
        </div>
      </section>

      {/* ── Trusted by guests ────────────────────────────────────────── */}
      <section className="border-t border-stone-100 py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] tracking-[0.2em] uppercase text-stone-500 mb-4">
            Trusted by guests
          </p>
          <p className="text-sm text-stone-400 leading-relaxed mb-8">
            Our guests consistently highlight a few things they appreciate most
            about staying here:
          </p>
          <div className="grid grid-cols-3 gap-6 mb-8">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <p className="text-2xl font-light text-stone-900 mb-1">{value}</p>
                <p className="text-xs text-stone-400">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-stone-400 leading-relaxed">
            Every unit is privately owned and personally managed. Guests
            consistently highlight cleanliness, communication, and location
            as standout parts of their stay.
          </p>
        </div>
      </section>

      {/* ── Second photo ─────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 py-8">
        <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden">
          <Image
            src="/deena-2.jpg.JPG"
            alt="Deena Arnold in Kauai"
            fill
            className="object-cover object-center"
            unoptimized
          />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="border-t border-stone-100 py-12 px-6">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-medium text-stone-800 mb-1">Ready to plan your stay?</p>
            <p className="text-sm text-stone-400">
              You're welcome to reach out directly — we'd love to host you.
            </p>
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
