CREATE OR REPLACE FUNCTION public.enqueue_transactional_email(
  p_to text, p_subject text, p_html text, p_template_name text
)
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT pgmq.send(
    'transactional_emails',
    jsonb_build_object(
      'to', p_to,
      'from', 'noreply@mondaymorning-af.com',
      'sender_domain', 'mondaymorning-af.com',
      'subject', p_subject,
      'html', p_html,
      'template_name', p_template_name,
      'label', p_template_name,
      'purpose', 'transactional',
      'idempotency_key', gen_random_uuid()::text,
      'message_id', gen_random_uuid()::text,
      'queued_at', now()
    )
  );
$$;

REVOKE EXECUTE ON FUNCTION public.enqueue_transactional_email(text, text, text, text) FROM anon, authenticated, PUBLIC;