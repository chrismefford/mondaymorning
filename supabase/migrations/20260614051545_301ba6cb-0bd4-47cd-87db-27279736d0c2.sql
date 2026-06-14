ALTER TABLE public.wholesale_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_club_applications ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.wholesale_applications, public.inquiries, public.story_submissions, public.social_club_applications TO anon, authenticated;
GRANT ALL ON public.wholesale_applications, public.inquiries, public.story_submissions, public.social_club_applications TO service_role;

DROP POLICY IF EXISTS "Public can submit wholesale applications" ON public.wholesale_applications;
CREATE POLICY "Public can submit wholesale applications"
  ON public.wholesale_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can submit inquiries" ON public.inquiries;
CREATE POLICY "Public can submit inquiries"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can submit stories" ON public.story_submissions;
CREATE POLICY "Public can submit stories"
  ON public.story_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can submit social club applications" ON public.social_club_applications;
CREATE POLICY "Public can submit social club applications"
  ON public.social_club_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);