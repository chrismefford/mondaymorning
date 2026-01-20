-- Create a storage bucket for processed product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('processed-images', 'processed-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to processed images
CREATE POLICY "Public read access for processed images"
ON storage.objects FOR SELECT
USING (bucket_id = 'processed-images');

-- Allow service role to insert processed images (edge functions)
CREATE POLICY "Service role can insert processed images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'processed-images');

-- Create a table to track which images have been processed
CREATE TABLE IF NOT EXISTS public.processed_image_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  original_url TEXT NOT NULL UNIQUE,
  processed_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Allow public read access to cache (so frontend can check status)
ALTER TABLE public.processed_image_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for image cache"
ON public.processed_image_cache FOR SELECT
USING (true);

-- Allow inserts from edge functions (service role)
CREATE POLICY "Service can insert cache entries"
ON public.processed_image_cache FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service can update cache entries"
ON public.processed_image_cache FOR UPDATE
USING (true);