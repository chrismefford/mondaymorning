import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, slug } = await req.json();

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ success: false, error: 'Image URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Downloading image:', imageUrl);

    // Download the image
    const imageResponse = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BlogImageDownloader/1.0)',
      },
    });

    if (!imageResponse.ok) {
      console.error('Failed to download image:', imageResponse.status);
      return new Response(
        JSON.stringify({ success: false, error: `Failed to download image: ${imageResponse.status}` }),
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
