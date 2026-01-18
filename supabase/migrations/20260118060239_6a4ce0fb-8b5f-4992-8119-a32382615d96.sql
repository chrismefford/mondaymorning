-- Create a table for story submissions
CREATE TABLE public.story_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_location TEXT,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.story_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (submit) a story
CREATE POLICY "Anyone can submit a story" 
ON public.story_submissions 
FOR INSERT 
WITH CHECK (true);

-- Only approved stories can be read publicly
CREATE POLICY "Anyone can read approved stories" 
ON public.story_submissions 
FOR SELECT 
USING (is_approved = true);

-- Add index for faster queries on approved stories
CREATE INDEX idx_story_submissions_approved ON public.story_submissions(is_approved) WHERE is_approved = true;