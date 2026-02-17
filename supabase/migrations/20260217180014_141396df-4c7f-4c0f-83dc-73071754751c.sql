DROP TRIGGER IF EXISTS vercel_deploy_on_blog_change ON public.blog_posts;
DROP FUNCTION IF EXISTS public.notify_vercel_deploy() CASCADE;