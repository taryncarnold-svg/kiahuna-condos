# arnold family condos website (mvp)

## goal
a simple modern-minimal site that shows availability across 5 vrbo properties, plus individual property pages with photos, reviews, and a contact flow for repeat guests (no payments).

## audiences
1) first-time guests -> book on vrbo
2) repeat guests -> email to request direct booking (option a checkbox)

## current setup
- next.js app router + tailwind
- api route exists: /api/availability (pulls from vrbo ical links)
- vrbo ical urls are available via env vars

## units
unit 35
unit 56
unit 87
unit 128
unit 151

## required pages
1) homepage
- hero + brief “5 condos in kauai”
- availability checker (date range) that returns availability across all units
- featured reviews on homepage
- CTA buttons:
  - “book on vrbo” (for first timers)
  - “request direct booking” (repeat guests -> email)

2) /units/[id]
- photos + description (can be placeholder for now)
- compare-at-a-glance module that shows key attributes vs other units
- reviews section (manual curated list for now)
- availability module for that unit
- CTA: book on vrbo + request direct booking

3) /compare
- compare-at-a-glance table for all 5 units
- filters (basic: sleeps, view type, AC, etc. can be static for now)

4) /faq + /contact
- contact form (sends email OR mailto link with prefilled subject/body)
- add “repeat guest?” checkbox

## direct booking flow
no payments. direct booking = guest submits dates + unit preference + guests count + phone/email.
submit should either:
- open a prefilled mailto: link OR
- post to an api route that sends an email (use Resend if simple)

## design
- modern minimal (apple-ish) but with subtle kauai vibe (small accents, photography, calm palette)
- keep it fast + clean

## data approach for mvp
- availability: live via vrbo ical feeds (already working)
- property details + photos + reviews: use a local data file for now (src/data/units.ts)
  later we can pull dynamically.

## deliverables (claude code should implement)
- polish homepage UI (date picker + results cards)
- build dynamic unit pages + compare page using local data
- add reviews on homepage + per-unit
- implement contact flow (mailto prefill first; optional Resend later)
- add basic nav + footer