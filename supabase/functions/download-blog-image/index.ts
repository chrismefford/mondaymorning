import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    const { imageUrl, slug } = await req.json();

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ success: false, error: 'Image URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Normalize URL: convert http to https
    let normalizedUrl = imageUrl.trim();
    if (normalizedUrl.startsWith('http://')) {
      normalizedUrl = normalizedUrl.replace('http://', 'https://');
    }
    
    console.log('Downloading image:', normalizedUrl);

    // Download the image with retries
    let imageResponse: Response | null = null;
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        imageResponse = await fetch(normalizedUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.squarespace.com/',
          },
        });
        
        if (imageResponse.ok) break;
        
        console.log(`Attempt ${attempt + 1} failed with status ${imageResponse.status}`);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        console.log(`Attempt ${attempt + 1} error:`, lastError.message);
      }
      
      // Wait before retry
      if (attempt < 2) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }

    if (!imageResponse || !imageResponse.ok) {
      const status = imageResponse?.status || 'unknown';
      console.error('Failed to download image after retries:', status);
      return new Response(
        JSON.stringify({ success: false, error: `Failed to download image: ${status}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
    const imageBuffer = await imageResponse.arrayBuffer();

    // Generate filename from URL
    const urlParts = imageUrl.split('/');
    let filename = urlParts[urlParts.length - 1].split('?')[0];
    
    // If filename doesn't have extension, add one based on content type
    if (!filename.includes('.')) {
      const ext = contentType.includes('png') ? 'png' : 
                  contentType.includes('gif') ? 'gif' : 
                  contentType.includes('webp') ? 'webp' : 'jpg';
      filename = `${filename}.${ext}`;
    }

    // Create unique path with slug prefix
    const filePath = `${slug}/${Date.now()}-${filename}`;

    console.log('Uploading to storage:', filePath);

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Upload to storage
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filePath, imageBuffer, {
        contentType,
        upsert: false,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    console.log('Upload successful:', publicUrlData.publicUrl);

    return new Response(
      JSON.stringify({ 
        success: true, 
        originalUrl: imageUrl,
        newUrl: publicUrlData.publicUrl,
        path: filePath,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error downloading image:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to download image';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
