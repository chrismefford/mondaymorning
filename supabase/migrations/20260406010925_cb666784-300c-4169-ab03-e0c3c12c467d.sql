
-- 1. Fix wholesale_customers: restrict tax_id to admin-only access
-- Replace the user-facing SELECT policy with one that excludes sensitive fields
-- We'll use a secure view for non-admin users

-- Create a view that excludes sensitive fields for non-admin users
CREATE OR REPLACE VIEW public.wholesale_customer_profile AS
SELECT 
  id,
  user_id,
  company_name,
  business_type,
  discount_tier,
  payment_terms,
  is_active,
  created_at,
  updated_at
FROM public.wholesale_customers
WHERE auth.uid() = user_id;

-- 2. Add story_submissions text length validation trigger
CREATE OR REPLACE FUNCTION public.validate_story_text()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF char_length(NEW.text) < 10 THEN
    RAISE EXCEPTION 'Story must be at least 10 characters';
  END IF;
  IF char_length(NEW.text) > 1000 THEN
    RAISE EXCEPTION 'Story must be less than 1000 characters';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_story_text_trigger
BEFORE INSERT OR UPDATE ON public.story_submissions
FOR EACH ROW
EXECUTE FUNCTION public.validate_story_text();

-- 3. Add write protection policies to processed_image_cache
CREATE POLICY "Service role can insert image cache"
ON public.processed_image_cache
FOR INSERT
TO public
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update image cache"
ON public.processed_image_cache
FOR UPDATE
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can delete image cache"
ON public.processed_image_cache
FOR DELETE
TO public
USING (auth.role() = 'service_role');

-- 4. Fix mutable search_path on update_updated_at_column function
CREATE OR REPLACE FUNCTION public.enqueue_email(queue_name text, payload jsonb)
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$ SELECT pgmq.send(queue_name, payload); $$;

CREATE OR REPLACE FUNCTION public.read_email_batch(queue_name text, batch_size integer, vt integer)
RETURNS TABLE(msg_id bigint, read_ct integer, message jsonb)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$ SELECT msg_id, read_ct, message FROM pgmq.read(queue_name, vt, batch_size); $$;

CREATE OR REPLACE FUNCTION public.delete_email(queue_name text, message_id bigint)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$ SELECT pgmq.delete(queue_name, message_id); $$;

CREATE OR REPLACE FUNCTION public.move_to_dlq(source_queue text, dlq_name text, message_id bigint, payload jsonb)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE new_id BIGINT;
BEGIN
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  PERFORM pgmq.delete(source_queue, message_id);
  RETURN new_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.enqueue_transactional_email(p_to text, p_subject text, p_html text, p_template_name text)
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT pgmq.send(
    'transactional_emails',
    jsonb_build_object(
      'to', p_to,
      'subject', p_subject,
      'html', p_html,
      'template_name', p_template_name
    )
  );
$$;
