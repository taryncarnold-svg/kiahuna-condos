"use client";
import { useState } from "react";
import Link from "next/link";
import { UNITS, BOOKING_EMAIL } from "@/data/units";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [message, setMessage] = useState("");

  const today = new Date().toISOString().slice(0, 10);

  function buildMailto() {
    const unitLabel = unit ? `Unit ${unit}` : "a condo";
    const subject = encodeURIComponent(
      unit ? `Booking Request – Unit ${unit}` : "Inquiry – Kiahuna Condos"
    );
    const lines = [
      name ? `Hi, my name is ${name}.` : "Hi,",
      "",
      unit && checkIn && checkOut
        ? `I'd like to request a booking for Unit ${unit}.\n\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}`
        : unit
        ? `I'm interested in ${unitLabel} at Kiahuna Plantation.`
        : "I'm interested in one of your Kiahuna Plantation condos.",
      message ? `\n${message}` : "",
      "",
      "Please let me know about availability and next steps. Thank you!",
    ];
    const body = encodeURIComponent(lines.join("\n").trim());
    return `mailto:${BOOKING_EMAIL}?subject=${subject}&body=${body}`;
  }

  const inputClass =
    "w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-stone-400";

  return (
    <main className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-light text-stone-800 mb-2">Get in touch</h1>
        <p className="text-sm text-stone-500">
          Fill in as much or as little as you like, then hit Send — your email
          client will open with everything pre-filled.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">
            Your name
          </label>
          <input
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Unit */}
        <div>
          <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">
            Unit of interest{" "}
            <span className="font-normal normal-case">(optional)</span>
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className={`${inputClass} bg-white`}
          >
            <option value="">— Not sure yet —</option>
            {UNITS.map((u) => (
              <option key={u.id} value={u.id}>
                Unit {u.id} – {u.view} ({u.bedrooms}BR)
              </option>
            ))}
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">
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
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">
              Check-out
            </label>
            <input
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">
            Message{" "}
            <span className="font-normal normal-case">(optional)</span>
          </label>
          <textarea
            rows={4}
            placeholder="Questions, special requests, number of guests…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>

        <a
          href={buildMailto()}
          className="block text-center bg-stone-900 hover:bg-stone-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors"
        >
          Open in Email Client →
        </a>

        <p className="text-xs text-stone-400 text-center">
          Opens your default email app. No data is stored on this site.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-stone-500">
        <span>
          📧{" "}
          <a href={`mailto:${BOOKING_EMAIL}`} className="text-stone-600 hover:underline">
            {BOOKING_EMAIL}
          </a>
        </span>
        <span>
          ❓{" "}
          <Link href="/faq" className="text-stone-600 hover:underline">
            See our FAQ
          </Link>
        </span>
      </div>
    </main>
  );
}
