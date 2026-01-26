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
    const shopifyAdminDomain = Deno.env.get("SHOPIFY_ADMIN_DOMAIN")!;
    const shopifyAdminToken = Deno.env.get("SHOPIFY_ADMIN_ACCESS_TOKEN")!;

    if (!shopifyAdminToken) {
      throw new Error("SHOPIFY_ADMIN_ACCESS_TOKEN is not configured");
    }

    if (!shopifyAdminDomain) {
      throw new Error("SHOPIFY_ADMIN_DOMAIN is not configured");
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

    console.log(`Syncing application ${app.id} for ${app.company_name} to Shopify Companies`);

    // Parse contact name into first and last name
    const nameParts = app.contact_name.trim().split(" ");
    const firstName = nameParts[0] || "Unknown";
    const lastName = nameParts.slice(1).join(" ") || "Contact";

    // Build the note with application details
    const noteLines = [
      `Application ID: ${app.id}`,
      `Business Type: ${app.business_type}`,
      app.website_url ? `Website: ${app.website_url}` : null,
      app.locations_count ? `Locations: ${app.locations_count}` : null,
      app.estimated_monthly_volume ? `Est. Monthly Volume: ${app.estimated_monthly_volume}` : null,
      app.product_interests?.length ? `Product Interests: ${app.product_interests.join(", ")}` : null,
      app.tax_id ? `Tax ID: ${app.tax_id}` : null,
      app.additional_notes ? `Notes: ${app.additional_notes}` : null,
      `Submitted: ${app.created_at}`,
    ].filter(Boolean).join("\n");

    // GraphQL mutation to create a company with contact and location
    const mutation = `
      mutation companyCreate($input: CompanyCreateInput!) {
        companyCreate(input: $input) {
          company {
            id
            name
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        company: {
          name: app.company_name,
          note: noteLines,
          externalId: app.id,
        },
        companyContact: {
          firstName: firstName,
          lastName: lastName,
          email: app.email,
          phone: app.phone || undefined,
        },
        companyLocation: {
          name: "Main Location",
          phone: app.phone || undefined,
          billingSameAsShipping: true,
        },
      },
    };

    // Clean the domain (remove protocol if present)
    const cleanDomain = shopifyAdminDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");
    
    const shopifyResponse = await fetch(
      `https://${cleanDomain}/admin/api/2024-10/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": shopifyAdminToken,
        },
        body: JSON.stringify({
          query: mutation,
          variables: variables,
        }),
      }
    );

    if (!shopifyResponse.ok) {
      const errorText = await shopifyResponse.text();
      console.error("Shopify API error:", errorText);
      throw new Error(`Shopify API error: ${shopifyResponse.status} - ${errorText}`);
    }

    const shopifyResult = await shopifyResponse.json();
    
    // Check for GraphQL user errors
    if (shopifyResult.data?.companyCreate?.userErrors?.length > 0) {
      const errors = shopifyResult.data.companyCreate.userErrors;
      console.error("Shopify user errors:", errors);
      throw new Error(`Shopify error: ${errors.map((e: any) => e.message).join(", ")}`);
    }

    const companyId = shopifyResult.data?.companyCreate?.company?.id;
    console.log("Company created:", companyId);

    // Update the application status to indicate it was synced
    await supabase
      .from("wholesale_applications")
      .update({ status: "synced_to_shopify" })
      .eq("id", applicationId);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Application synced to Shopify as Company",
        companyId: companyId,
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
