import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ShopifyProduct {
  handle: string;
  name: string;
  category: string;
  description?: string;
}

interface GeneratedRecipe {
  title: string;
  slug: string;
  description: string;
  tagline: string;
  occasion: string;
  prep_time: string;
  servings: number;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  featured_product_handle: string;
  featured_product_name: string;
  product_handles: string[];
}

const SYSTEM_PROMPT = `You are a professional mixologist and recipe developer specializing in non-alcoholic (NA) beverages. You create delicious, creative mocktail and drink recipes that feature specific NA products.

Your recipes should:
- Be realistic and actually tasty
- Feature the NA product prominently as the main ingredient
- Include common mixers and garnishes available at home or grocery stores
- Have creative, catchy names that reflect the drink's character
- Include clear, easy-to-follow instructions
- Be appropriate for the occasion specified

CRITICAL: Every recipe MUST use the featured product as the base or main ingredient. The recipe should highlight how to use that specific product in a delicious way.

For each recipe, provide:
1. A creative title (not just the product name)
2. A short tagline (one catchy sentence)
3. A description (2-3 sentences about the drink)
4. Prep time (e.g., "5 mins")
5. Servings (usually 1-2)
6. Difficulty (Easy, Medium, or Advanced)
7. Ingredients list (include exact measurements, always list the featured product first)
8. Step-by-step instructions (3-6 steps)

Respond ONLY with valid JSON matching the schema provided.`;

async function generateRecipeForProduct(
  product: ShopifyProduct,
  occasion: string,
  apiKey: string
): Promise<GeneratedRecipe | null> {
  console.log(`Generating recipe for ${product.name} (${occasion})`);
  
  const prompt = `Create a ${occasion} drink recipe featuring this NA product:

Product: ${product.name}
Category: ${product.category}
${product.description ? `Description: ${product.description}` : ""}

The recipe should be perfect for a ${occasion} setting. Make it creative and delicious!

Respond with JSON in this exact format:
{
  "title": "Creative Recipe Name",
  "tagline": "One catchy sentence about the drink",
  "description": "2-3 sentences describing the drink and its appeal",
  "prep_time": "5 mins",
  "servings": 1,
  "difficulty": "Easy",
  "ingredients": ["4 oz ${product.name}", "2 oz lime juice", "...more ingredients"],
  "instructions": ["Step 1...", "Step 2...", "..."]
}`;

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      console.error(`AI API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      console.error("No content in AI response");
      return null;
    }

    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const parsed = JSON.parse(jsonStr);
    
    // Create slug from title
    const slug = parsed.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    return {
      title: parsed.title,
      slug: `${slug}-${product.handle}`,
      description: parsed.description,
      tagline: parsed.tagline,
      occasion: occasion,
      prep_time: parsed.prep_time || "5 mins",
      servings: parsed.servings || 1,
      difficulty: parsed.difficulty || "Easy",
      ingredients: parsed.ingredients,
      instructions: parsed.instructions,
      featured_product_handle: product.handle,
      featured_product_name: product.name,
      product_handles: [product.handle],
    };
  } catch (error) {
    console.error(`Error generating recipe for ${product.name}:`, error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Verify admin access
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get user from token
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if user is admin
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { products, occasion = "celebration" } = await req.json();

    if (!products || !Array.isArray(products) || products.length === 0) {
      return new Response(JSON.stringify({ error: "Products array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Generating recipes for ${products.length} products, occasion: ${occasion}`);

    const results = {
      success: [] as string[],
      failed: [] as string[],
      skipped: [] as string[],
    };

    for (const product of products) {
      // Check if recipe already exists for this product
      const { data: existing } = await supabase
        .from("generated_recipes")
        .select("id")
        .eq("featured_product_handle", product.handle)
        .eq("occasion", occasion)
        .maybeSingle();

      if (existing) {
        console.log(`Recipe already exists for ${product.name} (${occasion}), skipping`);
        results.skipped.push(product.name);
        continue;
      }

      const recipe = await generateRecipeForProduct(product, occasion, lovableApiKey);
      
      if (recipe) {
        const { error: insertError } = await supabase
          .from("generated_recipes")
          .insert(recipe);

        if (insertError) {
          console.error(`Failed to insert recipe for ${product.name}:`, insertError);
          results.failed.push(product.name);
        } else {
          console.log(`Successfully created recipe: ${recipe.title}`);
          results.success.push(product.name);
        }
      } else {
        results.failed.push(product.name);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return new Response(JSON.stringify({ 
      message: "Recipe generation complete",
      results 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Generate recipes error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
