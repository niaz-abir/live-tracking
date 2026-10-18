# Live-Track

A simple Next.js + Tailwind CSS live-location demo with two pages:
- `/start` — enter a person's name and capture the device's current GPS coordinates.
- `/track` — map dashboard with current marker and a trail of GPS updates.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. GPS requires browser permission and works on `localhost` or HTTPS (Vercel).

## Important: demo mode vs shared live tracking

Without Supabase configuration, the project works in **single-browser demo mode**. It stores the latest point in that browser's local storage. That does not sync between different phones/computers.

To sync location updates across devices:
1. Create a project at https://supabase.com.
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. In Supabase project settings, copy the Project URL and anon/public key.
4. Copy `.env.example` to `.env.local`, then fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Restart the dev server. Add the same two environment variables in Vercel Project → Settings → Environment Variables, then redeploy.

**Security note:** The included SQL policies are intentionally permissive for a quick demo. Anyone who knows the table can read or modify demo tracker rows. Do not use this policy for sensitive or production tracking; add authentication and row-level authorization before real deployment.

## How to test

1. Open `/start`, enter a name, and click **Use GPS**.
2. Allow browser location permission.
3. Click **Open tracking dashboard**.
4. On the device whose movement you want to share, open the dashboard and click **Share this device's GPS**.
5. With Supabase configured, open the same dashboard/session on another device/browser to see the saved point update. This demo polls the shared row every 5 seconds.

## Current limitations

- The map uses OpenStreetMap tiles and follows GPS coordinates; it does not yet calculate bus-specific routes, transit arrival times, or turn-by-turn directions.
- The destination is not set in this starter. The route line shows received GPS points, not a predicted road route.
- GPS sharing stops when the browser page is closed or suspended. The person being tracked must knowingly grant permission.
