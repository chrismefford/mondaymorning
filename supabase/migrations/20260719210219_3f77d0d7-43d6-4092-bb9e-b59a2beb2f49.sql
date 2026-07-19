create table if not exists public.location_hours (
  slug text primary key,
  weekday_text jsonb not null default '[]'::jsonb,
  maps_uri text,
  fetched_at timestamptz not null default now()
);

grant all on public.location_hours to service_role;

alter table public.location_hours enable row level security;