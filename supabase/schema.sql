-- Run this in Supabase SQL Editor to enable shared tracking.
create table if not exists public.trackers (
  id text primary key,
  name text not null,
  lat double precision not null,
  lng double precision not null,
  updated_at timestamptz not null default now(),
  status text default 'Sharing location'
);

alter table public.trackers enable row level security;

-- Demo policy: allows anonymous browser clients to read/write tracker rows.
-- For production, replace these broad policies with authenticated, per-user access.
create policy "demo read trackers" on public.trackers for select to anon, authenticated using (true);
create policy "demo insert trackers" on public.trackers for insert to anon, authenticated with check (true);
create policy "demo update trackers" on public.trackers for update to anon, authenticated using (true) with check (true);
