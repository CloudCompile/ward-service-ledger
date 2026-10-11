# The Common Thread

A service-hours ledger for a ward, built with Next.js, Supabase, and Vercel.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and add your Supabase project values.
3. Run `supabase/schema.sql` in the Supabase SQL editor.
4. Create an admin user in Supabase Auth, then add their id to `public.profiles` with role `admin`.
5. Start the app with `npm run dev`.

## Analytics and daily activity

Website performance/analytics telemetry is stored in Supabase so the database
never goes a day without activity.

- Page views: `components/telemetry-tracker.tsx` posts an anonymous event to
  `/api/telemetry`, which writes to `public.page_telemetry` through the
  `record_telemetry` RPC.
- Daily heartbeat: `vercel.json` registers a Vercel cron that calls
  `/api/cron/daily` once a day, writing one `cron_ping` row.
- Vercel Web Analytics (`@vercel/analytics`) is also enabled in `app/layout.tsx`.

Set `CRON_SECRET` in your Vercel project to require a bearer token on the cron
route (Vercel sends this automatically for cron requests). A clear analytics
notice is shown at the bottom of the home page.

