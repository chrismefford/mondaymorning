
-- Restrict processed-images bucket writes to admins only
CREATE POLICY "Admins can upload processed images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'processed-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update processed images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'processed-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete processed images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'processed-images' AND has_role(auth.uid(), 'admin'::app_role));

-- Internal helper, only the server (service_role) should call it
REVOKE EXECUTE ON FUNCTION public.enqueue_transactional_email(text, text, text, text) FROM anon, authenticated, PUBLIC;
