# The Common Thread

A service-hours ledger for a ward, built with Next.js, Supabase, and Vercel.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and add your Supabase project values.
3. Run `supabase/schema.sql` in the Supabase SQL editor.
4. Create an admin user in Supabase Auth, then add their id to `public.profiles` with role `admin`.
5. Start the app with `npm run dev`.
