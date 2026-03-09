"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UNITS, BOOKING_EMAIL } from "@/data/units";

// Formspree form ID — set NEXT_PUBLIC_FORMSPREE_ID in your .env.local
// Sign up at https://formspree.io, create a form, and paste the ID here.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";

const inputClass =
  "w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-stone-400 bg-white";

function ContactForm() {
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [unit, setUnit] = useState(searchParams.get("unit") ?? "");
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") ?? "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") ?? "");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().slice(0, 10);

  // Sync query params if they arrive after initial render (e.g. client nav)
  useEffect(() => {
    const u = searchParams.get("unit");
    const ci = searchParams.get("checkIn");
    const co = searchParams.get("checkOut");
    if (u) setUnit(u);
    if (ci) setCheckIn(ci);
    if (co) setCheckOut(co);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (!FORMSPREE_ID) {
      // Fallback: open email client if Formspree isn't configured yet
      const unitLabel = unit ? `Unit ${unit}` : "a condo";
      const subject = encodeURIComponent(
        unit ? `Inquiry – Unit ${unit}` : "Inquiry – Kiahuna Condos"
      );
      const lines = [
        `Hi, my name is ${name}.`,
        "",
        unit && checkIn && checkOut
          ? `I'm interested in ${unitLabel}.\n\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}`
          : unit
          ? `I'm interested in ${unitLabel} at Kiahuna Plantation.`
          : "I'm interested in one of your Kiahuna Plantation condos.",
        message ? `\n${message}` : "",
        "",
        "Please let me know about availability and next steps. Thank you!",
      ];
      const body = encodeURIComponent(lines.join("\n").trim());
      window.location.href = `mailto:${BOOKING_EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          unit: unit || "Not specified",
          checkIn: checkIn || "Not specified",
          checkOut: checkOut || "Not specified",
          message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.errors?.[0]?.message ?? "Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Could not send your message. Please email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm text-center space-y-3">
        <div className="text-3xl">✉️</div>
        <h2 className="text-lg font-semibold text-stone-800">Message sent!</h2>
        <p className="text-sm text-stone-500">
          Thanks, {name.split(" ")[0]}. The owner typically responds within a few hours.
          You'll hear back at <span className="text-stone-700">{email}</span>.
        </p>
        <Link
          href="/"
          className="inline-block mt-2 text-sm text-teal-600 hover:underline"
        >
          ← Back to condos
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Name + Email side by side on larger screens */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">
            Your name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">
            Email address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
          />
        </div>
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
          className={inputClass}
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
            Check-in{" "}
            <span className="font-normal normal-case">(optional)</span>
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
            Check-out{" "}
            <span className="font-normal normal-case">(optional)</span>
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
          placeholder="Questions, number of guests, special requests…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting || !name.trim() || !email.trim()}
        className="w-full bg-stone-900 hover:bg-stone-700 disabled:bg-stone-200 disabled:text-stone-400 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-light text-stone-800 mb-2">Get in touch</h1>
        <p className="text-sm text-stone-500 leading-relaxed">
          Have a question or interested in a stay?
        </p>
      </div>

      {/* Email callout */}
      <div className="flex items-center gap-3 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 mb-6">
        <span className="text-teal-600 text-lg shrink-0">✉</span>
        <p className="text-sm text-stone-700 leading-snug">
          Email the owner directly at{" "}
          <a
            href={`mailto:${BOOKING_EMAIL}`}
            className="font-semibold text-teal-700 hover:underline break-all"
          >
            {BOOKING_EMAIL}
          </a>
          , or use the form below.
        </p>
      </div>

      {/* Form */}
      <Suspense fallback={<div className="h-64 rounded-2xl bg-stone-50 animate-pulse" />}>
        <ContactForm />
      </Suspense>

      {/* Footer links */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-stone-500">
        <span>
          ❓{" "}
          <Link href="/faq" className="text-stone-600 hover:underline">
            See our FAQ
          </Link>
        </span>
        <span>
          🏠{" "}
          <Link href="/" className="text-stone-600 hover:underline">
            Browse all units
          </Link>
        </span>
      </div>
    </main>
  );
}
