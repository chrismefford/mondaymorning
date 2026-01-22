-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create blog_posts table for migrated content
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published blog posts
CREATE POLICY "Anyone can read blog posts" 
ON public.blog_posts 
FOR SELECT 
USING (true);

-- Only admins can create blog posts
CREATE POLICY "Admins can create blog posts" 
ON public.blog_posts 
FOR INSERT 
TO authenticated 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update blog posts
CREATE POLICY "Admins can update blog posts" 
ON public.blog_posts 
FOR UPDATE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete blog posts
CREATE POLICY "Admins can delete blog posts" 
ON public.blog_posts 
FOR DELETE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));

-- Create index for slug lookups
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);

-- Create index for published_at ordering
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- Add trigger for updating timestamps
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();