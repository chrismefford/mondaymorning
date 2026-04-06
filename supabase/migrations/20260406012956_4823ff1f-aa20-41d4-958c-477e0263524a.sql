
-- Fix shop collection links
UPDATE public.blog_posts
SET content = regexp_replace(
  content,
  'https?://(?:www\.)?mondaymorning-af\.shop/collections/([a-zA-Z0-9_-]+)',
  '/collections/\1',
  'gi'
),
updated_at = now()
WHERE content ILIKE '%mondaymorning-af.shop/collections/%';

-- Fix shop search links → /shop
UPDATE public.blog_posts
SET content = regexp_replace(
  content,
  'https?://(?:www\.)?mondaymorning-af\.shop/search[^)\s"]*',
  '/shop',
  'gi'
),
updated_at = now()
WHERE content ILIKE '%mondaymorning-af.shop/search%';

-- Fix bare shop domain links (root only)
UPDATE public.blog_posts
SET content = regexp_replace(
  content,
  'https?://(?:www\.)?mondaymorning-af\.shop/?(?=[)\s"])',
  '/shop',
  'gi'
),
updated_at = now()
WHERE content ILIKE '%mondaymorning-af.shop%';

-- Fix shop.mondaymorning-af.com
UPDATE public.blog_posts
SET content = regexp_replace(
  content,
  'https?://shop\.mondaymorning-af\.com/?',
  '/shop',
  'gi'
),
updated_at = now()
WHERE content ILIKE '%shop.mondaymorning-af.com%';

-- Fix bare www.mondaymorning-af.com/ or mondaymorning-af.com/ links
UPDATE public.blog_posts
SET content = regexp_replace(
  content,
  'https?://(?:www\.)?mondaymorning-af\.com/?(?=[)\s"])',
  '/',
  'gi'
),
updated_at = now()
WHERE content ILIKE '%mondaymorning-af.com%';
