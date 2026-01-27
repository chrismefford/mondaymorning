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

    // Format phone to E.164 format for Shopify (e.g., +16157726641)
    // Shopify is strict here; if we can't confidently normalize, omit the phone field.
    const normalizePhoneE164 = (raw: string | null): string | undefined => {
      if (!raw) return undefined;
      const trimmed = raw.trim();

      // If it already looks like E.164, keep it (after stripping spaces/dashes)
      if (trimmed.startsWith("+")) {
        const digits = trimmed.replace(/[^\d]/g, "");
        // E.164 max 15 digits; practical minimum with country code is usually 11
        if (digits.length >= 11 && digits.length <= 15) return `+${digits}`;
        return undefined;
      }

      // Otherwise, strip to digits and infer US if 10 digits
      const digitsOnly = trimmed.replace(/\D/g, "");
      if (digitsOnly.length === 10) return `+1${digitsOnly}`;
      if (digitsOnly.length === 11 && digitsOnly.startsWith("1")) return `+${digitsOnly}`;

      // We won't guess other country codes.
      return undefined;
    };

    const formattedPhone = normalizePhoneE164(app.phone);
    if (app.phone && !formattedPhone) {
      console.log(`Skipping invalid/ambiguous phone for Shopify: ${app.phone}`);
    }

    // Build the note with application details
    const noteLines = [
      `Application ID: ${app.id}`,
      app.tax_id ? `Tax ID: ${app.tax_id}` : null,
      `Submitted: ${app.created_at}`,
    ].filter(Boolean).join("\n");

    // GraphQL mutation to create a company.
    // IMPORTANT:
    // - We set buyerExperienceConfiguration.checkoutToDraft=true at the LOCATION level so all orders are submitted as drafts.
    // - We do NOT assign any catalogs here. A company without catalogs should remain "Ordering not approved"
    //   until you manually assign a catalog in Shopify.
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
          phone: formattedPhone,
        },
        // Create an initial location so we can control checkout behavior immediately.
        // IMPORTANT: Including a shippingAddress is required for buyerExperienceConfiguration to be respected.
        companyLocation: {
          name: "Main Location",
          phone: formattedPhone,
          shippingAddress: {
            address1: "TBD",
            city: "San Diego",
            countryCode: "US",
            zoneCode: "CA",
            zip: "92101",
          },
          buyerExperienceConfiguration: {
            checkoutToDraft: true,
          },
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
      
      // Check if error is "already taken" (email or phone) - treat as success (already synced)
      const alreadyExistsError = errors.some((e: any) => 
        e.message?.toLowerCase().includes("already been taken")
      );
      
      if (alreadyExistsError) {
        console.log("Contact already exists in Shopify - treating as already synced");
        
        // Update status to pending_approval since it's already in Shopify
        await supabase
          .from("wholesale_applications")
          .update({ status: "pending_approval" })
          .eq("id", applicationId);
        
        return new Response(
          JSON.stringify({
            success: true,
            message: "Application already exists in Shopify",
            alreadyExists: true,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }
      
      console.error("Shopify user errors:", errors);
      throw new Error(`Shopify error: ${errors.map((e: any) => e.message).join(", ")}`);
    }

    const companyId = shopifyResult.data?.companyCreate?.company?.id;
    console.log("Company created:", companyId);

    // Shopify may auto-create a default location. To ensure the company shows up as
    // "Ordering not approved", explicitly BLOCK checkout at the location level.
    // (Shopify's UI uses ordering access on locations to determine the approved/not approved badge.)
    if (companyId) {
      try {
        const getLocationsQuery = `
          query companyLocations($id: ID!) {
            company(id: $id) {
              id
              locations(first: 10) {
                edges {
                  node {
                    id
                    buyerExperienceConfiguration {
                      checkoutToDraft
                    }
                    catalogs(first: 10) {
                      edges {
                        node {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `;

        const locationsResp = await fetch(
          `https://${cleanDomain}/admin/api/2024-10/graphql.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Access-Token": shopifyAdminToken,
            },
            body: JSON.stringify({
              query: getLocationsQuery,
              variables: { id: companyId },
            }),
          }
        );

        const locationsJson = await locationsResp.json();
        const locationNodes: Array<{ id: string; checkoutToDraft?: boolean | null; catalogIds: string[] }> =
          locationsJson?.data?.company?.locations?.edges
            ?.map((e: any) => ({
              id: e?.node?.id,
              checkoutToDraft: e?.node?.buyerExperienceConfiguration?.checkoutToDraft ?? null,
              catalogIds: e?.node?.catalogs?.edges?.map((ce: any) => ce?.node?.id).filter(Boolean) ?? [],
            }))
            .filter((n: any) => !!n?.id) ?? [];

        const locationIds: string[] = locationNodes.map((n) => n.id);

        if (locationIds.length > 0) {
          console.log(
            "Found company locations (pre-update):",
            locationNodes
              .map((n) => `${n.id}(checkoutToDraft=${n.checkoutToDraft}, catalogs=${n.catalogIds.length})`)
              .join(", ")
          );

          // Remove any catalogs that Shopify auto-assigned so the company remains "Ordering NOT approved"
          // until you manually assign a catalog in Shopify.
          // We do this safely per catalog: read its current companyLocationIds, remove ours, then write back.
          const allCatalogIds = Array.from(new Set(locationNodes.flatMap((n) => n.catalogIds)));
          if (allCatalogIds.length > 0) {
            console.log(`Catalogs were auto-assigned (${allCatalogIds.length}); attempting to unassign from new company locations.`);

            const catalogLocationsQuery = `
              query catalogLocations($id: ID!) {
                catalog(id: $id) {
                  id
                  context {
                    companyLocations(first: 100) {
                      edges {
                        node {
                          id
                        }
                      }
                    }
                  }
                }
              }
            `;

            const catalogContextUpdateMutation = `
              mutation catalogContextUpdate($catalogId: ID!, $input: CatalogContextInput!) {
                catalogContextUpdate(catalogId: $catalogId, input: $input) {
                  catalog {
                    id
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }
            `;

            for (const catalogId of allCatalogIds) {
              try {
                const catalogResp = await fetch(
                  `https://${cleanDomain}/admin/api/2024-10/graphql.json`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "X-Shopify-Access-Token": shopifyAdminToken,
                    },
                    body: JSON.stringify({
                      query: catalogLocationsQuery,
                      variables: { id: catalogId },
                    }),
                  }
                );

                const catalogJson = await catalogResp.json();
                const existingIds: string[] =
                  catalogJson?.data?.catalog?.context?.companyLocations?.edges
                    ?.map((e: any) => e?.node?.id)
                    .filter(Boolean) ?? [];

                const remainingIds = existingIds.filter((id) => !locationIds.includes(id));

                // Only write if our location is actually present.
                if (remainingIds.length === existingIds.length) continue;

                const updateResp = await fetch(
                  `https://${cleanDomain}/admin/api/2024-10/graphql.json`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "X-Shopify-Access-Token": shopifyAdminToken,
                    },
                    body: JSON.stringify({
                      query: catalogContextUpdateMutation,
                      variables: {
                        catalogId,
                        input: { companyLocationIds: remainingIds },
                      },
                    }),
                  }
                );

                const updateJson = await updateResp.json();
                const userErrors = updateJson?.data?.catalogContextUpdate?.userErrors ?? [];
                if (userErrors.length > 0) {
                  console.warn(`catalogContextUpdate userErrors for catalog ${catalogId}:`, userErrors);
                } else {
                  console.log(`Unassigned catalogs for new locations on catalog ${catalogId} (removed=${existingIds.length - remainingIds.length}).`);
                }
              } catch (e) {
                console.warn(`Catalog unassignment failed for ${catalogId} (non-fatal):`, e);
              }
            }
          }

          // Use the documented signature: companyLocationUpdate(companyLocationId, input)
          // Set checkoutToDraft: true so all orders require manual approval
          const blockCheckoutMutation = `
            mutation companyLocationUpdate($companyLocationId: ID!, $input: CompanyLocationUpdateInput!) {
              companyLocationUpdate(companyLocationId: $companyLocationId, input: $input) {
                companyLocation {
                  id
                  buyerExperienceConfiguration {
                    checkoutToDraft
                  }
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `;

          for (const locationId of locationIds) {
            const blockResp = await fetch(
              `https://${cleanDomain}/admin/api/2024-10/graphql.json`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Shopify-Access-Token": shopifyAdminToken,
                },
                  body: JSON.stringify({
                    query: blockCheckoutMutation,
                    variables: {
                      companyLocationId: locationId,
                      input: {
                        buyerExperienceConfiguration: {
                          checkoutToDraft: true,
                        },
                      }
                    },
                  }),
              }
            );

            const blockJson = await blockResp.json();
            const topLevelErrors = blockJson?.errors ?? [];
            const blockErrors = blockJson?.data?.companyLocationUpdate?.userErrors ?? [];
            if (blockErrors.length > 0) {
              console.warn("Could not set checkoutToDraft:", blockErrors);
            } else if (topLevelErrors.length > 0) {
              console.warn("companyLocationUpdate GraphQL errors:", topLevelErrors);
            } else {
              const checkoutToDraft = blockJson?.data?.companyLocationUpdate?.companyLocation?.buyerExperienceConfiguration?.checkoutToDraft;
              console.log(`Set checkoutToDraft=${checkoutToDraft} for location: ${locationId}`);
            }
          }

          // Verify persisted values after update (what Shopify will actually display)
          try {
            const verifyResp = await fetch(
              `https://${cleanDomain}/admin/api/2024-10/graphql.json`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Shopify-Access-Token": shopifyAdminToken,
                },
                body: JSON.stringify({
                  query: getLocationsQuery,
                  variables: { id: companyId },
                }),
              }
            );

            const verifyJson = await verifyResp.json();
            const verifyNodes: Array<{ id: string; checkoutToDraft?: boolean | null; catalogIds: string[] }> =
              verifyJson?.data?.company?.locations?.edges
                ?.map((e: any) => ({
                  id: e?.node?.id,
                  checkoutToDraft: e?.node?.buyerExperienceConfiguration?.checkoutToDraft ?? null,
                  catalogIds: e?.node?.catalogs?.edges?.map((ce: any) => ce?.node?.id).filter(Boolean) ?? [],
                }))
                .filter((n: any) => !!n?.id) ?? [];

            console.log(
              "Company locations (post-update):",
              verifyNodes
                .map((n) => `${n.id}(checkoutToDraft=${n.checkoutToDraft}, catalogs=${n.catalogIds.length})`)
                .join(", ")
            );
          } catch (e) {
            console.warn("CheckoutToDraft verification failed (non-fatal):", e);
          }
        } else {
          console.log("No company locations found; leaving as-is (should be ordering not approved).")
        }
      } catch (e) {
        console.warn("Post-create ordering lock failed (non-fatal):", e);
      }
    }

    // Update the application status to pending approval - company is created but not yet activated
    await supabase
      .from("wholesale_applications")
      .update({ status: "pending_approval" })
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
