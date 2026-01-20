import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl } = await req.json();
    
    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: "imageUrl is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing image: ${imageUrl}`);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create Supabase client with service role for storage access
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Check if we already have this image processed
    const { data: cached } = await supabase
      .from("processed_image_cache")
      .select("processed_url, status")
      .eq("original_url", imageUrl)
      .single();

    if (cached?.status === "completed" && cached.processed_url) {
      console.log(`Cache hit for: ${imageUrl}`);
      return new Response(
        JSON.stringify({ processedUrl: cached.processed_url, cached: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (cached?.status === "processing") {
      console.log(`Already processing: ${imageUrl}`);
      return new Response(
        JSON.stringify({ status: "processing", message: "Image is being processed" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert or update cache entry as processing
    await supabase
      .from("processed_image_cache")
      .upsert({ 
        original_url: imageUrl, 
        status: "processing",
        updated_at: new Date().toISOString()
      }, { onConflict: "original_url" });

    // Call Lovable AI to remove background
    console.log("Calling AI to remove background...");
    
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "CRITICAL: Create a PNG image with a completely TRANSPARENT background (alpha channel = 0). Extract ONLY the product (bottle, can, or container) from this image. The output MUST have: 1) A fully transparent background with NO color, NO white, NO gray - just pure transparency. 2) Clean, precise edges around the product with no artifacts. 3) Only the product itself visible. Do NOT add any background color whatsoever - the background pixels must be fully transparent."
              },
              {
                type: "image_url",
                image_url: { url: imageUrl }
              }
            ]
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI response error:", aiResponse.status, errorText);
      
      // Update cache as failed
      await supabase
        .from("processed_image_cache")
        .update({ status: "failed", updated_at: new Date().toISOString() })
        .eq("original_url", imageUrl);

      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits required. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    console.log("AI response received");

    // Extract the generated image
    const generatedImage = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!generatedImage) {
      console.error("No image in AI response:", JSON.stringify(aiData).slice(0, 500));
      
      await supabase
        .from("processed_image_cache")
        .update({ status: "failed", updated_at: new Date().toISOString() })
        .eq("original_url", imageUrl);

      return new Response(
        JSON.stringify({ error: "Failed to generate processed image" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Convert base64 to buffer and upload to storage
    const base64Data = generatedImage.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    
    // Generate unique filename
    const urlHash = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(imageUrl)
    );
    const hashArray = Array.from(new Uint8Array(urlHash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    const fileName = `${hashHex.slice(0, 16)}.png`;

    console.log(`Uploading processed image as: ${fileName}`);

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("processed-images")
      .upload(fileName, imageBuffer, {
        contentType: "image/png",
        upsert: true
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("processed-images")
      .getPublicUrl(fileName);

    const processedUrl = urlData.publicUrl;
    console.log(`Processed image URL: ${processedUrl}`);

    // Update cache with completed status
    await supabase
      .from("processed_image_cache")
      .update({ 
        processed_url: processedUrl, 
        status: "completed",
        updated_at: new Date().toISOString()
      })
      .eq("original_url", imageUrl);

    return new Response(
      JSON.stringify({ processedUrl, cached: false }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error processing image:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});