create table if not exists public.inquiries (
  id          uuid primary key default gen_random_uuid(),
  offering    text not null,
  name        text not null,
  email       text not null,
  company     text,
  phone       text,
  message     text,
  detail      jsonb,
  status      text not null default 'new'
              check (status in ('new', 'contacted', 'qualified', 'won', 'lost')),
  source      text not null default 'website',
  crm_synced  boolean not null default false,
  created_at  timestamptz not null default now()
);

GRANT INSERT ON public.inquiries TO anon;
GRANT SELECT, INSERT, UPDATE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;

alter table public.inquiries enable row level security;

create index if not exists inquiries_created_idx on public.inquiries (created_at desc);
create index if not exists inquiries_offering_idx on public.inquiries (offering);
create index if not exists inquiries_status_idx on public.inquiries (status);

drop policy if exists "Anyone can submit an inquiry" on public.inquiries;
create policy "Anyone can submit an inquiry"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can read inquiries" on public.inquiries;
create policy "Admins can read inquiries"
  on public.inquiries for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins can update inquiries" on public.inquiries;
create policy "Admins can update inquiries"
  on public.inquiries for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));