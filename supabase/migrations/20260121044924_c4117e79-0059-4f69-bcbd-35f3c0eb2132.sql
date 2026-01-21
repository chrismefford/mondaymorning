-- Add database constraints to enforce input validation on story_submissions
-- This ensures server-side validation that cannot be bypassed by direct API calls

ALTER TABLE public.story_submissions 
ADD CONSTRAINT check_text_length 
CHECK (char_length(text) >= 10 AND char_length(text) <= 200);

ALTER TABLE public.story_submissions 
ADD CONSTRAINT check_author_name_length 
CHECK (char_length(author_name) >= 2 AND char_length(author_name) <= 50);

ALTER TABLE public.story_submissions 
ADD CONSTRAINT check_author_location_length 
CHECK (author_location IS NULL OR char_length(author_location) <= 50);

-- Remove the permissive INSERT policy on storage.objects for processed-images bucket
-- The edge function uses service role which bypasses RLS anyway
-- This prevents unauthorized users from uploading to this bucket
DROP POLICY IF EXISTS "Service role can insert processed images" ON storage.objects;