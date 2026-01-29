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
  is_approved: boolean;
}

const OCCASIONS = ["breakfast", "dinner", "relaxing", "beach", "celebration"];

const SYSTEM_PROMPT = `You are a professional mixologist creating non-alcoholic drink recipes.

CRITICAL RULES - YOU MUST FOLLOW THESE EXACTLY:
1. The FEATURED PRODUCT NAME must be used EXACTLY as provided - do not modify, abbreviate, or add words like "Tropical Punch" or other flavor descriptors unless that is the EXACT product name given.
2. In the ingredients list, write the featured product EXACTLY as: "[measurement] [EXACT PRODUCT NAME AS PROVIDED]"
3. DO NOT invent product variants, flavors, or sub-products that were not explicitly provided.
4. Use only common mixers (club soda, lime juice, simple syrup, etc.) alongside the featured product.
5. The recipe should be realistic, tasty, and appropriate for the occasion.

Example: If the product is "Amethyst NA Spirits - Lemon Cucumber Serrano", you MUST write exactly that name in ingredients, NOT "Amethyst Tropical Punch" or any other made-up variant.

For each recipe provide:
1. Creative title (not just the product name)
2. Short tagline (one catchy sentence)
3. Description (2-3 sentences)
4. Prep time (e.g., "5 mins")
5. Servings (usually 1-2)
6. Difficulty (Easy, Medium, or Advanced)
7. Ingredients list (EXACT product name first with measurement, then common mixers)
8. Instructions (3-6 steps)

Respond ONLY with valid JSON.`;

async function generateRecipeForProduct(
  product: ShopifyProduct,
  occasion: string,
  apiKey: string
): Promise<GeneratedRecipe | null> {
  console.log(`Generating recipe for ${product.name} (${occasion})`);
  
  const prompt = `Create a ${occasion} drink recipe featuring this NA product:

FEATURED PRODUCT (use this EXACT name in ingredients): "${product.name}"
Category: ${product.category}
Product Handle: ${product.handle}
${product.description ? `Description: ${product.description}` : ""}

IMPORTANT: In the ingredients list, you MUST write the product name EXACTLY as "${product.name}" - do not change, abbreviate, or add any words to it.

The recipe should be perfect for a ${occasion} setting. Make it creative and delicious!

Respond with JSON in this exact format:
{
  "title": "Creative Recipe Name",
  "tagline": "One catchy sentence about the drink",
  "description": "2-3 sentences describing the drink and its appeal",
  "prep_time": "5 mins",
  "servings": 1,
  "difficulty": "Easy",
  "ingredients": ["4 oz ${product.name}", "2 oz fresh lime juice", "1 oz simple syrup", "Club soda to top", "Lime wheel for garnish"],
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
      is_approved: true, // Auto-approve for automatic generation
    };
  } catch (error) {
    console.error(`Error generating recipe for ${product.name}:`, error);
    return null;
  }
}

async function fetchShopifyProducts(): Promise<ShopifyProduct[]> {
  console.log("Fetching products from Shopify...");
  
  const storefrontToken = Deno.env.get("SHOPIFY_STOREFRONT_TOKEN");
  const storeDomain = Deno.env.get("SHOPIFY_STORE_DOMAIN");
  
  if (!storefrontToken || !storeDomain) {
    console.error("Shopify credentials not configured");
    return [];
  }
  
  const cleanDomain = storeDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");
  
  try {
    const response = await fetch(`https://${cleanDomain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontToken,
      },
      body: JSON.stringify({
        query: `{
          products(first: 100) {
            edges {
              node {
                handle
                title
                productType
                description
                variants(first: 1) {
                  edges {
                    node {
                      availableForSale
                    }
                  }
                }
              }
            }
          }
        }`,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Failed to fetch Shopify products:", response.status, text);
      return [];
    }

    const data = await response.json();
    console.log("Shopify response:", JSON.stringify(data).substring(0, 500));
    
    const products = data.data?.products?.edges || [];
    
    return products
      .filter((edge: any) => 
        edge.node.variants?.edges?.some((v: any) => v.node.availableForSale)
      )
      .map((edge: any) => ({
        handle: edge.node.handle,
        name: edge.node.title,
        category: edge.node.productType || "Beverage",
        description: edge.node.description?.substring(0, 200),
      }))
      .filter((p: ShopifyProduct) => 
        !p.name.toLowerCase().includes("gift") &&
        !p.name.toLowerCase().includes("membership") &&
        !p.name.toLowerCase().includes("subscription")
      );
  } catch (error) {
    console.error("Error fetching Shopify products:", error);
    return [];
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check if this is an automated/cron request, admin request, or on-demand generation
    const authHeader = req.headers.get("Authorization");
    let isAuthorized = false;
    let isAutoMode = false;
    let isOnDemand = false;
    let body: any = {};

    try {
      body = await req.json();
    } catch {
      body = {};
    }

    // Check for auto mode (cron job)
    if (body.auto === true) {
      isAutoMode = true;
      isAuthorized = true;
      console.log("Running in auto mode (scheduled job)");
    } 
    // Check for on-demand mode (single product recipe generation from product pages)
    else if (body.onDemand === true && body.products?.length === 1) {
      isOnDemand = true;
      isAuthorized = true;
      console.log("Running in on-demand mode for single product");
    }
    else if (authHeader) {
      // Verify admin access for manual batch requests
      const token = authHeader.replace("Bearer ", "");
      const { data: { user }, error: userError } = await supabase.auth.getUser(token);
      
      if (!userError && user) {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (roleData) {
          isAuthorized = true;
        }
      }
    }

    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let products: ShopifyProduct[];
    let occasions: string[];

    if (isAutoMode) {
      // Auto mode: fetch all products and generate for all occasions
      products = await fetchShopifyProducts();
      occasions = OCCASIONS;
      console.log(`Auto mode: Found ${products.length} products`);
    } else {
      // Manual mode: use provided products and occasion
      products = body.products || [];
      occasions = [body.occasion || "celebration"];
    }

    if (products.length === 0) {
      return new Response(JSON.stringify({ error: "No products found" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Generating recipes for ${products.length} products across ${occasions.length} occasions`);

    const results = {
      success: [] as string[],
      failed: [] as string[],
      skipped: [] as string[],
    };

    for (const product of products) {
      for (const occasion of occasions) {
        // Check if recipe already exists for this product/occasion combo
        const { data: existing } = await supabase
          .from("generated_recipes")
          .select("id")
          .eq("featured_product_handle", product.handle)
          .eq("occasion", occasion)
          .maybeSingle();

        if (existing) {
          results.skipped.push(`${product.name} (${occasion})`);
          continue;
        }

        const recipe = await generateRecipeForProduct(product, occasion, lovableApiKey);
        
        if (recipe) {
          const { error: insertError } = await supabase
            .from("generated_recipes")
            .insert(recipe);

          if (insertError) {
            console.error(`Failed to insert recipe for ${product.name}:`, insertError);
            results.failed.push(`${product.name} (${occasion})`);
          } else {
            console.log(`Successfully created recipe: ${recipe.title}`);
            results.success.push(`${product.name} (${occasion})`);
          }
        } else {
          results.failed.push(`${product.name} (${occasion})`);
        }

        // Delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log(`Generation complete: ${results.success.length} created, ${results.skipped.length} skipped, ${results.failed.length} failed`);

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
