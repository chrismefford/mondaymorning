
-- Fix old mondaymorning-af.shop product links → relative /product/ paths
-- Strip query parameters from shop URLs
UPDATE public.blog_posts
SET content = regexp_replace(
  content,
  'https?://(?:www\.)?mondaymorning-af\.shop/products/([a-zA-Z0-9_-]+)[^)\s"]*',
  '/product/\1',
  'gi'
),
updated_at = now()
WHERE content ILIKE '%mondaymorning-af.shop%';

-- Fix old mondaymorning-af.com/blog/ links → relative /blog/ paths
UPDATE public.blog_posts
SET content = regexp_replace(
  content,
  'https?://(?:www\.)?mondaymorning-af\.com/blog/',
  '/blog/',
  'gi'
),
updated_at = now()
WHERE content ILIKE '%mondaymorning-af.com/blog/%';

-- Fix old mondaymorning-af.com links for other pages (recipes, locations, etc.)
-- but NOT blog links (already fixed above) and NOT image/storage URLs
UPDATE public.blog_posts
SET content = regexp_replace(
  content,
  'https?://(?:www\.)?mondaymorning-af\.com/((?!blog/)[a-zA-Z0-9_/-]+)',
  '/\1',
  'gi'
),
updated_at = now()
WHERE content ILIKE '%mondaymorning-af.com%'
  AND content NOT ILIKE '%mondaymorning-af.com/blog/%';
