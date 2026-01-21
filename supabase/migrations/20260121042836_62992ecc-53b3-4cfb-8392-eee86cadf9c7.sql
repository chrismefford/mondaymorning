-- Remove overly permissive RLS policies for INSERT and UPDATE on processed_image_cache
-- Edge functions use service role key which bypasses RLS, so these policies are not needed
-- and they create a security vulnerability allowing any user to manipulate cache entries

DROP POLICY IF EXISTS "Service can insert cache entries" ON public.processed_image_cache;
DROP POLICY IF EXISTS "Service can update cache entries" ON public.processed_image_cache;