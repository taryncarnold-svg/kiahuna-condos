import Link from "next/link";
import type { Metadata } from "next";
import { BOOKING_EMAIL } from "@/data/units";

export const metadata: Metadata = {
  title: "FAQ | Kiahuna Condos",
  description: "Frequently asked questions about booking, check-in, amenities, and staying at Kiahuna Plantation in Poipu, Kauai.",
};

const SECTIONS = [
  {
    heading: "Booking & Availability",
    faqs: [
      {
        q: "What's the best way to check availability?",
        a: "You can check availability right here on the website by selecting your dates on the home page. If you're not sure which condo might be the best fit, feel free to reach out — Deena is happy to help you find the right one.",
      },
      {
        q: "Do you offer direct booking, or only through Vrbo?",
        a: "All first-time guests book through Vrbo. It keeps everything simple and secure for new stays.\n\nIf you've stayed with us before, you're welcome to either book again through Vrbo or reach out to Deena directly to arrange a repeat visit.",
      },
      {
        q: "How far in advance should we book?",
        a: "Kauai trips tend to get planned early — especially during the winter months and around holidays. If you see availability for your dates, it's usually a good idea to reserve sooner rather than later.",
      },
    ],
  },
  {
    heading: "Check-In & Stay Details",
    faqs: [
      {
        q: "What time is check-in and check-out?",
        a: "Check-in begins at 3:00 p.m. and check-out is at 10:00 a.m. This gives the cleaners enough time to make sure each condo is perfectly prepared for the next guests arriving.",
      },
      {
        q: "How do we access the condo?",
        a: "Guests receive detailed check-in instructions before arrival. The process is designed to be simple so you can arrive and settle in easily — even after a long travel day.",
      },
      {
        q: "How many guests can stay in each condo?",
        a: "Each condo comfortably accommodates up to four guests. The units are one-bedroom, but the living room includes a pull-out sofa bed, which works well for families or small groups.",
      },
    ],
  },
  {
    heading: "Location & Resort",
    faqs: [
      {
        q: "Where is Kiahuna Plantation located?",
        a: "Kiahuna Plantation is in Poipu, on Kauai's sunny south shore — one of the most popular areas on the island for beaches, restaurants, and easy exploring.",
      },
      {
        q: "How close is the beach?",
        a: "Very close — it's one of the best parts about staying here. You can walk straight from the condos across the lawn to the ocean. No driving, no parking, no hassle.",
      },
      {
        q: "Is there a pool on the property?",
        a: "Kiahuna Plantation guests have access to the Poipu Beach Athletic Club, which includes a pool and fitness facilities. It's just a short walk across the street from the resort.",
      },
      {
        q: "What else is nearby?",
        a: "Quite a bit, actually. Poipu has plenty of restaurants, coffee shops, and small shopping areas within easy walking distance, so you can explore without ever needing to get in the car.",
      },
    ],
  },
  {
    heading: "Amenities",
    faqs: [
      {
        q: "Do the condos have air conditioning?",
        a: "Yes — all of the condos have air conditioning, and some units include dual AC systems for extra comfort. Kauai's trade winds are often all you need, but it's nice to have options.",
      },
      {
        q: "Is beach gear provided?",
        a: "Yes! Each condo includes beach gear for guests to use — things like chairs and other essentials for enjoying the beach. No need to rent or pack bulky gear.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-light text-stone-800 mb-2">
          Frequently asked questions
        </h1>
        <p className="text-sm text-stone-500">
          Everything you need to know about booking and staying at Kiahuna Condos.
        </p>
      </div>

      <div className="space-y-12">
        {SECTIONS.map(({ heading, faqs }) => (
          <section key={heading}>
            <h2 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-stone-400 mb-5">
              {heading}
            </h2>
            <div className="space-y-0">
              {faqs.map(({ q, a }) => (
                <div key={q} className="border-t border-stone-100 py-5 last:border-b">
                  <h3 className="text-sm font-medium text-stone-800 mb-2">{q}</h3>
                  <div className="space-y-2">
                    {a.split("\n\n").map((para, i) => (
                      <p key={i} className="text-sm text-stone-500 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 bg-stone-50 border border-stone-200 rounded-2xl p-6">
        <p className="font-medium text-stone-800 mb-1">Still have questions?</p>
        <p className="text-sm text-stone-500 mb-4">
          Deena is happy to help — reach out any time.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="bg-stone-900 hover:bg-stone-700 text-white text-sm font-medium py-2 px-5 rounded-lg transition-colors"
          >
            Get in touch
          </Link>
          <a
            href={`mailto:${BOOKING_EMAIL}`}
            className="border border-stone-200 hover:bg-white text-stone-600 text-sm font-medium py-2 px-5 rounded-lg transition-colors"
          >
            Send an email
          </a>
        </div>
      </div>
    </main>
  );
}
