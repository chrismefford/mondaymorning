-- Weekly-refreshed cache of each store's Google opening hours.
-- Only the location-hours edge function (service role) reads/writes this;
-- no public RLS policies, so the table stays private.
create table if not exists public.location_hours (
  slug text primary key,
  weekday_text jsonb not null default '[]'::jsonb,
  maps_uri text,
  fetched_at timestamptz not null default now()
);

alter table public.location_hours enable row level security;
