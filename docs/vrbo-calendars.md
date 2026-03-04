# VRBO iCal Feeds

These are the iCal export URLs for each unit's VRBO listing.
They are configured as environment variables in Vercel and documented here for reference.

> **Note:** These URLs expose booking availability (occupied/free dates) but not guest details.
> Do not share them publicly. If a feed URL ever changes, update both Vercel and this file.

| Variable              | Unit | iCal URL                                                                          |
|-----------------------|------|-----------------------------------------------------------------------------------|
| `VRBO_ICAL_UNIT_35`   | 35   | http://www.vrbo.com/icalendar/82392a9bf6424a7693e9477b0db274b3.ics               |
| `VRBO_ICAL_UNIT_87`   | 87   | http://www.vrbo.com/icalendar/69d8bb0d7812401a8dee87788f6e22ef.ics               |
| `VRBO_ICAL_UNIT_56`   | 56   | http://www.vrbo.com/icalendar/9e28dbd9898843ed9d9992d7dc624c50.ics               |
| `VRBO_ICAL_UNIT_128`  | 128  | http://www.vrbo.com/icalendar/051e28c7f5e74b0fa5b1e26018a1f446.ics               |
| `VRBO_ICAL_UNIT_151`  | 151  | http://www.vrbo.com/icalendar/2fb62b95f923421fa7dc77ba0b25b726.ics               |

## How to update in Vercel

1. Go to your Vercel project → **Settings → Environment Variables**
2. Find the relevant `VRBO_ICAL_UNIT_*` variable and update the value
3. Redeploy (or Vercel will pick it up on the next push)

## How the feeds are used

The API route at `src/app/api/availability/route.ts` fetches these feeds on demand,
parses blocked date ranges from the iCal events, and returns `available: true/false`
for a given check-in/check-out window. Results are cached in memory for 15 minutes.
