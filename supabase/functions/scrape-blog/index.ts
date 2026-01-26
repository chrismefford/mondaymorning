import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  published_at: string | null;
}

async function verifyAdmin(req: Request): Promise<{ isAdmin: boolean; error?: string }> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { isAdmin: false, error: 'Authorization header required' };
  }

  const token = authHeader.replace('Bearer ', '');
  
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } }
  });

  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
  if (claimsError || !claimsData?.claims) {
    return { isAdmin: false, error: 'Invalid or expired token' };
  }

  const userId = claimsData.claims.sub;

  // Check if user has admin role
  const { data: roleData, error: roleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', 'admin')
    .maybeSingle();

  if (roleError || !roleData) {
    return { isAdmin: false, error: 'Admin access required' };
  }

  return { isAdmin: true };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Verify admin access
  const { isAdmin, error: authError } = await verifyAdmin(req);
  if (!isAdmin) {
    console.log('Admin verification failed:', authError);
    return new Response(
      JSON.stringify({ success: false, error: authError || 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { blogUrl } = await req.json();

    if (!blogUrl) {
      return new Response(
        JSON.stringify({ success: false, error: 'Blog URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl connector not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Step 1: Mapping blog to find all post URLs...');
    
    // First, map the blog to find all post URLs
    const mapResponse = await fetch('https://api.firecrawl.dev/v1/map', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: blogUrl,
        limit: 100,
        includeSubdomains: false,
      }),
    });

    const mapData = await mapResponse.json();
    
    if (!mapResponse.ok) {
      console.error('Map API error:', mapData);
      return new Response(
        JSON.stringify({ success: false, error: mapData.error || 'Failed to map blog' }),
        { status: mapResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Filter for blog post URLs (Squarespace typically uses /blog/post-slug pattern)
    const blogPostUrls = (mapData.links || []).filter((url: string) => {
      // Match blog post URLs but exclude the main blog page and category/tag pages
      const isBlogPost = url.includes('/blog/') && 
                         !url.endsWith('/blog') && 
                         !url.endsWith('/blog/') &&
                         !url.includes('/category/') &&
                         !url.includes('/tag/');
      return isBlogPost;
    });

    console.log(`Found ${blogPostUrls.length} blog post URLs`);

    if (blogPostUrls.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          posts: [],
          message: 'No blog posts found. The blog might be empty or use a different URL structure.'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Scrape each blog post (limit to first 50 to avoid timeout)
    const postsToScrape = blogPostUrls.slice(0, 50);
    const scrapedPosts: BlogPost[] = [];

    console.log(`Step 2: Scraping ${postsToScrape.length} blog posts...`);

    for (const postUrl of postsToScrape) {
      try {
        console.log(`Scraping: ${postUrl}`);
        
        const scrapeResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: postUrl,
            formats: ['markdown', 'html'],
            onlyMainContent: true,
          }),
        });

        const scrapeData = await scrapeResponse.json();
        
        if (scrapeResponse.ok && scrapeData.success) {
          const data = scrapeData.data || scrapeData;
          const metadata = data.metadata || {};
          
          // Extract slug from URL
          const urlParts = postUrl.split('/blog/');
          let slug = urlParts[1] || '';
          slug = slug.replace(/\/$/, '').toLowerCase().replace(/[^a-z0-9-]/g, '-');
          
          // Extract title from metadata or first h1
          let title = metadata.title || '';
          if (!title && data.markdown) {
            const h1Match = data.markdown.match(/^#\s+(.+)$/m);
            if (h1Match) {
              title = h1Match[1];
            }
          }
          
          // Clean up title (remove site name suffix if present)
          title = title.replace(/\s*[|—-]\s*Monday Morning.*$/i, '').trim();
          
          // Extract excerpt (first paragraph or description)
          let excerpt = metadata.description || '';
          if (!excerpt && data.markdown) {
            const paragraphs = data.markdown.split('\n\n').filter((p: string) => 
              p.trim() && !p.startsWith('#') && !p.startsWith('!')
            );
            if (paragraphs.length > 0) {
              excerpt = paragraphs[0].substring(0, 300).replace(/\n/g, ' ').trim();
              if (excerpt.length === 300) excerpt += '...';
            }
          }
          
          // Extract featured image
          let featuredImage = metadata.ogImage || null;
          if (!featuredImage && data.markdown) {
            const imgMatch = data.markdown.match(/!\[.*?\]\((https?:\/\/[^\)]+)\)/);
            if (imgMatch) {
              featuredImage = imgMatch[1];
            }
          }

          if (title && slug) {
            scrapedPosts.push({
              title,
              slug,
              content: data.markdown || '',
              excerpt,
              featured_image: featuredImage,
              published_at: metadata.publishedTime || null,
            });
          }
        }
      } catch (err) {
        console.error(`Error scraping ${postUrl}:`, err);
        // Continue with other posts
      }
    }

    console.log(`Successfully scraped ${scrapedPosts.length} posts`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        posts: scrapedPosts,
        totalFound: blogPostUrls.length,
        scraped: scrapedPosts.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in scrape-blog function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to scrape blog';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
