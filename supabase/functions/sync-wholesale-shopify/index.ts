import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WholesaleApplication {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  business_type: string;
  website_url: string | null;
  locations_count: number | null;
  estimated_monthly_volume: string | null;
  product_interests: string[] | null;
  additional_notes: string | null;
  tax_id: string | null;
  status: string;
  created_at: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const shopifyDomain = Deno.env.get("SHOPIFY_STORE_DOMAIN")!;
    const shopifyAdminToken = Deno.env.get("SHOPIFY_ADMIN_ACCESS_TOKEN")!;

    if (!shopifyAdminToken) {
      throw new Error("SHOPIFY_ADMIN_ACCESS_TOKEN is not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { applicationId } = await req.json();
    
    if (!applicationId) {
      throw new Error("applicationId is required");
    }

    // Fetch the application from database
    const { data: application, error: appError } = await supabase
      .from("wholesale_applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (appError || !application) {
      throw new Error(`Application not found: ${appError?.message}`);
    }

    const app = application as WholesaleApplication;

    console.log(`Syncing application ${app.id} for ${app.company_name} to Shopify`);

    // Create a draft order in Shopify
    const draftOrderData = {
      draft_order: {
        note: `Wholesale Application from ${app.company_name}`,
        email: app.email,
        tags: "wholesale-application",
        note_attributes: [
          { name: "Application ID", value: app.id },
          { name: "Company Name", value: app.company_name },
          { name: "Contact Name", value: app.contact_name },
          { name: "Business Type", value: app.business_type },
          { name: "Phone", value: app.phone || "Not provided" },
          { name: "Website", value: app.website_url || "Not provided" },
          { name: "Locations", value: String(app.locations_count || "Not specified") },
          { name: "Monthly Volume", value: app.estimated_monthly_volume || "Not specified" },
          { name: "Product Interests", value: app.product_interests?.join(", ") || "Not specified" },
          { name: "Tax ID", value: app.tax_id || "Not provided" },
          { name: "Additional Notes", value: app.additional_notes || "None" },
          { name: "Submitted At", value: app.created_at },
        ],
        line_items: [
          {
            title: `Wholesale Application - ${app.company_name}`,
            quantity: 1,
            price: "0.00",
            taxable: false,
          }
        ],
      }
    };

    // Clean the domain (remove protocol if present)
    const cleanDomain = shopifyDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");
    
    const shopifyResponse = await fetch(
      `https://${cleanDomain}/admin/api/2024-01/draft_orders.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": shopifyAdminToken,
        },
        body: JSON.stringify(draftOrderData),
      }
    );

    if (!shopifyResponse.ok) {
      const errorText = await shopifyResponse.text();
      console.error("Shopify API error:", errorText);
      throw new Error(`Shopify API error: ${shopifyResponse.status} - ${errorText}`);
    }

    const shopifyResult = await shopifyResponse.json();
    console.log("Draft order created:", shopifyResult.draft_order?.id);

    // Update the application status to indicate it was synced
    await supabase
      .from("wholesale_applications")
      .update({ status: "synced_to_shopify" })
      .eq("id", applicationId);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Application synced to Shopify as draft order",
        draftOrderId: shopifyResult.draft_order?.id,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error syncing to Shopify:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
