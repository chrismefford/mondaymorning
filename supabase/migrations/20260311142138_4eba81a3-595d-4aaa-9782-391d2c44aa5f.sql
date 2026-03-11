CREATE OR REPLACE FUNCTION public.enqueue_transactional_email(
  p_to text,
  p_subject text,
  p_html text,
  p_template_name text
)
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
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