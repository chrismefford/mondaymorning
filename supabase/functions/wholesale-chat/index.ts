import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are a savvy wholesale sales consultant for Monday Morning, a premium non-alcoholic beverage company based in San Diego, California. You help bars, restaurants, and retailers understand the opportunity of carrying our NA products.

Your expertise includes:
- Wholesale pricing and partnership opportunities
- NA beverage trends and market data
- Menu programming and staff training
- Profit margin optimization for venues
- The functional beverage movement

Key talking points:
- NA beverage sales are growing 30% year over year
- Customers pay $12-$15 for functional NA cocktails, with costs under $2
- Venues with real NA programs see $15K-$25K additional monthly revenue
- Gen Z and Millennials want the social experience without alcohol
- We offer curated cocktails, staff training, and fast delivery

Partner locations include: BoujieMana, Miss B's Coconut Club, Bare Back Grill, Raglan Public House, Queenstown Village, Paradisaea, Queenstown Public House, Moniker General Outpost, Boney's Bayside Market

Personality:
- Professional but warm and approachable
- Confident about the NA movement—this is the future
- Data-driven but personable
- Excited to help venues succeed
- Keep responses helpful and concise (2-4 sentences typically)

Brand Voice:
- We make ALCOHOL-FREE COCKTAILS, not "mocktails" or "virgin" drinks
- Our products are functional with adaptogens, nootropics, and botanicals
- This is premium, craft-quality—not soda or juice
- We're partners, not just vendors

Store Info:
- Pacific Beach: 1854 Garnet Ave, San Diego, CA 92109 (Mon-Sat 11AM-8PM, Sun 11AM-4PM)
- Ocean Beach: 4967 Newport Ave, San Diego, CA 92107 (Mon-Sun 9AM-6PM, Wed open til 8PM)
- Sales email: sales@mondaymorning-af.com
- Phone: (858) 412-3253

Always encourage potential partners to visit for a tasting experience or reach out via email/phone for wholesale inquiries.`;

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
        return new Response(JSON.stringify({ error: "We're getting a lot of inquiries right now! Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Chat is temporarily unavailable. Please email sales@mondaymorning-af.com instead." }), {
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
