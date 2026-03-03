import Link from "next/link";
import type { Metadata } from "next";
import { BOOKING_EMAIL } from "@/data/units";

export const metadata: Metadata = {
  title: "FAQ | Kiahuna Condos",
  description: "Frequently asked questions about booking, amenities, and staying at Kiahuna Plantation in Poipu, Kauai.",
};

const FAQS = [
  {
    q: "How do I book a condo directly?",
    a: `Click "Book Direct" or "Request Booking" on any unit page. This opens your email client with the unit details pre-filled. Send the email and the owner will respond — usually within a few hours — to confirm availability and arrange payment.`,
  },
  {
    q: "Is booking direct really cheaper than VRBO?",
    a: "Yes. VRBO charges guests a service fee of 10–15% on top of the nightly rate. When you book direct, that fee disappears entirely. The owner passes the savings on to you — same condo, lower price.",
  },
  {
    q: "What payment methods are accepted for direct bookings?",
    a: "The owner accepts Zelle, Venmo, bank transfer, and personal check. Payment details and terms will be confirmed when the owner replies to your booking request.",
  },
  {
    q: "Is there a minimum stay?",
    a: "Most weeks require a minimum of 5–7 nights, though shorter stays may be available for last-minute gaps. Mention your desired dates in your booking request and the owner will let you know.",
  },
  {
    q: "What is the cancellation policy for direct bookings?",
    a: "Cancellations made 60+ days before check-in receive a full refund. 30–59 days out: 50% refund. Under 30 days: no refund, but the owner will make every effort to rebook the unit and refund if successful. Full details are included in the rental agreement.",
  },
  {
    q: "Where exactly is Kiahuna Plantation?",
    a: "Kiahuna Plantation Resort is located at 2253 Poipu Rd, Koloa, HI 96756 — in the heart of Poipu on Kauai's sunny south shore. It's a short walk to Poipu Beach Park, one of America's best beaches, and minutes from shops, restaurants, and watersports.",
  },
  {
    q: "Is Poipu Beach within walking distance?",
    a: "Yes! Poipu Beach Park is a 5–10 minute walk from the resort gates. The beach gear provided with each unit (chairs, towels, snorkel set) makes it easy to head down whenever you like.",
  },
  {
    q: "Is there a pool on the property?",
    a: "Yes, Kiahuna Plantation has multiple swimming pools spread across the resort grounds. All guests of our units have full access.",
  },
  {
    q: "Are the condos air-conditioned?",
    a: "All five units have central air conditioning as well as ceiling fans. Kauai's trade winds are often enough to keep things comfortable, but the AC is there when you need it.",
  },
  {
    q: "Can I bring my pet?",
    a: "Unfortunately, pets are not permitted at any of our units per Kiahuna Plantation's resort policy.",
  },
  {
    q: "Is there parking at the resort?",
    a: "Yes, each unit comes with at least one covered parking space. Unit 128 includes two spaces.",
  },
  {
    q: "What if I have questions that aren't answered here?",
    a: `Reach out directly! Email ${BOOKING_EMAIL} or visit our Contact page and the owner will get back to you promptly.`,
  },
];

export default function FAQPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-stone-800 mb-2">Frequently asked questions</h1>
        <p className="text-stone-500">
          Everything you need to know about booking and staying at Kiahuna Condos.
        </p>
      </div>

      <div className="space-y-6">
        {FAQS.map(({ q, a }) => (
          <div key={q} className="border-b border-stone-100 pb-6">
            <h2 className="font-semibold text-stone-800 mb-2">{q}</h2>
            <p className="text-stone-600 text-sm leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-teal-50 border border-teal-100 rounded-2xl p-6">
        <p className="font-semibold text-stone-800 mb-1">Still have questions?</p>
        <p className="text-sm text-stone-500 mb-4">
          The owner is happy to help — reach out any time.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-2 px-5 rounded-lg transition-colors"
          >
            Contact us
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
