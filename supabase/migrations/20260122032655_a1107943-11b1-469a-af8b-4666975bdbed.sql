-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Allow public read access to blog images
CREATE POLICY "Blog images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog-images');

-- Only admins can upload blog images
CREATE POLICY "Admins can upload blog images" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

-- Only admins can update blog images
CREATE POLICY "Admins can update blog images" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

-- Only admins can delete blog images
CREATE POLICY "Admins can delete blog images" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));