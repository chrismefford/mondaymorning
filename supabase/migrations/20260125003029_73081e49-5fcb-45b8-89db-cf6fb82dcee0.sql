-- Create table for AI-generated recipes
CREATE TABLE public.generated_recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  tagline TEXT,
  occasion TEXT NOT NULL CHECK (occasion IN ('breakfast', 'dinner', 'relaxing', 'beach', 'celebration')),
  prep_time TEXT NOT NULL DEFAULT '5 mins',
  servings INTEGER NOT NULL DEFAULT 1,
  difficulty TEXT NOT NULL DEFAULT 'Easy' CHECK (difficulty IN ('Easy', 'Medium', 'Advanced')),
  ingredients JSONB NOT NULL DEFAULT '[]',
  instructions JSONB NOT NULL DEFAULT '[]',
  featured_product_handle TEXT NOT NULL,
  featured_product_name TEXT NOT NULL,
  product_handles JSONB NOT NULL DEFAULT '[]',
  image_url TEXT,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.generated_recipes ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved recipes
CREATE POLICY "Anyone can read approved recipes"
ON public.generated_recipes
FOR SELECT
USING (is_approved = true);

-- Admins can do everything
CREATE POLICY "Admins can manage recipes"
ON public.generated_recipes
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_generated_recipes_updated_at
BEFORE UPDATE ON public.generated_recipes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_generated_recipes_product_handle ON public.generated_recipes(featured_product_handle);
CREATE INDEX idx_generated_recipes_occasion ON public.generated_recipes(occasion);
CREATE INDEX idx_generated_recipes_approved ON public.generated_recipes(is_approved);