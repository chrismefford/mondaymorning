alter table public.wholesale_applications enable row level security;

drop policy if exists "Public can submit wholesale applications" on public.wholesale_applications;

create policy "Public can submit wholesale applications"
  on public.wholesale_applications for insert to anon, authenticated with check (true);

alter table public.inquiries enable row level security;

drop policy if exists "Public can submit inquiries" on public.inquiries;

create policy "Public can submit inquiries"
  on public.inquiries for insert to anon, authenticated with check (true);

alter table public.story_submissions enable row level security;

drop policy if exists "Public can submit stories" on public.story_submissions;

create policy "Public can submit stories"
  on public.story_submissions for insert to anon, authenticated with check (true);

alter table public.social_club_applications enable row level security;

drop policy if exists "Public can submit social club applications" on public.social_club_applications;

create policy "Public can submit social club applications"
  on public.social_club_applications for insert to anon, authenticated with check (true);