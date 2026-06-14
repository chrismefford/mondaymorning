
GRANT INSERT ON public.wholesale_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.wholesale_applications TO authenticated;
GRANT ALL ON public.wholesale_applications TO service_role;

GRANT INSERT ON public.inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;

GRANT INSERT ON public.story_submissions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.story_submissions TO authenticated;
GRANT ALL ON public.story_submissions TO service_role;

GRANT INSERT ON public.social_club_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.social_club_applications TO authenticated;
GRANT ALL ON public.social_club_applications TO service_role;
