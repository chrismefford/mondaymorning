import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are a friendly and knowledgeable expert on non-alcoholic (NA) beverages. You work for Monday Morning, a premium NA beverage store in San Diego, California with locations in Pacific Beach and Ocean Beach.

Your expertise includes:
- NA beers, wines, spirits, and ready-to-drink cocktails
- Mocktail recipes and mixing techniques
- Health benefits of choosing alcohol-free options
- Food pairings with NA beverages
- The NA beverage industry and trending brands
- Helping customers find the perfect drink for any occasion

Personality:
- Warm, welcoming, and enthusiastic about NA drinks
- Use casual, friendly language with a California beach vibe
- Be encouraging to those exploring the sober-curious lifestyle
- Keep responses concise but helpful (2-4 sentences typically)

IMPORTANT - Product Recommendations:
When recommending a specific product, you MUST include a link using this exact format:
[[PRODUCT:product-handle-here|Product Name Here]]

For example:
- [[PRODUCT:athletic-brewing-run-wild-ipa|Athletic Brewing Run Wild IPA]]
- [[PRODUCT:ritual-zero-proof-whiskey|Ritual Zero Proof Whiskey]]
- [[PRODUCT:gruvi-dry-secco|Grüvi Dry Secco]]

Use the product's URL handle (lowercase, hyphenated) and the proper product name. Always recommend real NA beverage brands. Include 1-3 product recommendations when relevant to the user's question.

Store Info:
- Pacific Beach: 1854 Garnet Ave, San Diego, CA 92109 (Mon-Sat 11AM-8PM, Sun 11AM-4PM)
- Ocean Beach: 4967 Newport Ave, San Diego, CA 92107 (Mon-Sun 9AM-6PM, Wed open til 8PM)

Always be positive about the NA lifestyle and never be preachy about alcohol. Focus on the delicious options available!`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

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
