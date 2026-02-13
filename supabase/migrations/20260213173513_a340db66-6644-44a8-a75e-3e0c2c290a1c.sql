
-- Enable pg_net extension for HTTP requests from database
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create function to call Vercel deploy hook
CREATE OR REPLACE FUNCTION public.notify_vercel_deploy()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  PERFORM extensions.http_post(
    url := 'https://api.vercel.com/v1/integrations/deploy/prj_Ch2Y541NIYa0HVwIpeJPqUZNnmwC/GBvFym4mKO',
    body := '{}'::jsonb
  );
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create trigger on blog_posts for INSERT, UPDATE, DELETE
CREATE TRIGGER vercel_deploy_on_blog_change
AFTER INSERT OR UPDATE OR DELETE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.notify_vercel_deploy();
