UPDATE public.blog_posts
SET content = replace(
  replace(
    content,
    E'> "This isn''t just about making drinks. It''s about building products that actually compete. The non-alcoholic category deserves the same level of quality, intention, and execution as traditional alcohol. We built this facility to deliver exactly that."\n\n>\n\n**Zane Curtis, Founder, Monday Morning**',
    E'> This isn''t just about making drinks. It''s about building products that actually compete. The non-alcoholic category deserves the same level of quality, intention, and execution as traditional alcohol. We built this facility to deliver exactly that.\n\n**Zane Curtis, Founder, Monday Morning**'
  ),
  '', ''
),
updated_at = now()
WHERE slug = 'the-lab-opening-non-alcoholic-contract-brewing-san-marcos';