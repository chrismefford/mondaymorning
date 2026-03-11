DROP POLICY "Anyone can submit social club applications" ON public.social_club_applications;

CREATE POLICY "Anyone can submit social club applications"
ON public.social_club_applications
FOR INSERT
TO public
WITH CHECK (true);