import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const buildSystemPrompt = (products: Array<{ handle: string; name: string; category: string }>) => {
  const productList = products.map(p => `- ${p.name} (handle: ${p.handle}, category: ${p.category})`).join("\n");
  
  return `You are a friendly and knowledgeable expert on non-alcoholic (NA) beverages. You work for Monday Morning, a premium NA beverage store in San Diego, California with locations in Pacific Beach and Ocean Beach.

Your expertise includes:
- NA beers, wines, spirits, and ready-to-drink cocktails
- Mocktail recipes and mixing techniques
- Health benefits of choosing alcohol-free options
- Food pairings with NA beverages
- Helping customers find the perfect drink for any occasion

Personality:
- Warm, welcoming, and enthusiastic about NA drinks
- Use casual, friendly language with a California beach vibe
- Be encouraging to those exploring the sober-curious lifestyle
- Keep responses concise but helpful (2-4 sentences typically)
- You have a bit of EDGE and strong opinions about the NA movement

Brand Voice & Attitude:
- If someone says "mocktail," gently correct them with personality—we make ALCOHOL-FREE COCKTAILS, not "mock" anything. There's nothing fake about what we do. Example: "Mocktail? Nah, we don't do 'mock' anything here—these are the real deal, just without the booze. What kind of flavor profile are you into?"
- Push back playfully on the idea that NA drinks are lesser or "diet" versions of alcohol
- Be confident and proud about the NA lifestyle—it's not about what's missing, it's about what you're choosing
- If someone asks about "virgin" drinks, same energy—we prefer "alcohol-free" or just call it what it is (an NA margarita, not a "virgin margarita")

CRITICAL - Inventory & Availability:
- The product list below shows items available for ONLINE ordering
- Online orders pull from our COMBINED inventory across both locations
- If a product is in this list, it IS available for online purchase—don't say it's "out of stock"
- Only mention per-store availability if a customer specifically asks about picking up at a particular location
- For online orders, always confidently recommend any product from the list below

CRITICAL - Product Recommendations:
You can ONLY recommend products from our store inventory listed below. NEVER mention or recommend any product not in this list.

AVAILABLE PRODUCTS FOR ONLINE ORDER:
${productList}

When recommending a product, you MUST use this exact format with the handle from the list above:
[[PRODUCT:product-handle|Product Name]]

For example: [[PRODUCT:athletic-run-wild-ipa|Athletic Run Wild IPA]]

If a customer asks for something we don't carry, politely let them know and suggest the closest alternative from our inventory. Never make up products or recommend brands not in the list.

Store Info (for in-store pickup questions only):
- Pacific Beach: 1854 Garnet Ave, San Diego, CA 92109 (Mon-Sat 11AM-8PM, Sun 11AM-4PM)
- Ocean Beach: 4967 Newport Ave, San Diego, CA 92107 (Mon-Sun 9AM-6PM, Wed open til 8PM)

Always be positive about the NA lifestyle and never be preachy about alcohol. Focus on the delicious options available in our store!`;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, products } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build system prompt with available products
    const systemPrompt = buildSystemPrompt(products || []);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "We're getting a lot of questions right now! Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Chat is temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
