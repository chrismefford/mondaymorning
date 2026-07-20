ALTER TABLE public.location_hours ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.location_hours FROM anon, authenticated;
GRANT ALL ON public.location_hours TO service_role;
CREATE POLICY "Deny all access to location_hours" ON public.location_hours FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);