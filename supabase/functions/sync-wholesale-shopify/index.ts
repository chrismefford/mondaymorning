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

    // GraphQL mutation to create a company WITHOUT a contact.
    // IMPORTANT:
    // - We create the company first WITHOUT companyContact to prevent Shopify from auto-assigning
    //   the contact a role (like "Ordering only") to the default location.
    // - Then we create a company location via companyLocationCreate WITH buyerExperienceConfiguration.checkoutToDraft=true.
    // - Then we create the contact separately WITHOUT assigning them to a location.
    // - This ensures the company shows as "Ordering NOT approved" until admin manually assigns a catalog and role.
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
        // NOTE: We intentionally do NOT include companyContact here.
        // Including it causes Shopify to auto-assign the contact a role to the default location,
        // which triggers "Ordering approved" status. We create the contact separately below.
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

    // Create the CompanyContact separately WITHOUT assigning to a location.
    // This prevents Shopify from auto-assigning a role (like "Ordering only") which triggers "Ordering approved".
    let createdContactId: string | null = null;
    if (companyId) {
      try {
        const createContactMutation = `
          mutation companyContactCreate($companyId: ID!, $input: CompanyContactInput!) {
            companyContactCreate(companyId: $companyId, input: $input) {
              companyContact {
                id
                customer {
                  email
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `;

        const contactVariablesBase = {
          companyId,
          input: {
            firstName: firstName,
            lastName: lastName,
            email: app.email,
            // Only include phone if we have a valid E.164 formatted number
            ...(formattedPhone ? { phone: formattedPhone } : {}),
          },
        };

        console.log(
          "companyContactCreate variables:",
          JSON.stringify(contactVariablesBase, null, 2)
        );

        const contactResp = await fetch(
          `https://${cleanDomain}/admin/api/2024-10/graphql.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Access-Token": shopifyAdminToken,
            },
            body: JSON.stringify({
              query: createContactMutation,
              variables: contactVariablesBase,
            }),
          }
        );

        const contactJson = await contactResp.json();
        console.log("companyContactCreate response:", JSON.stringify(contactJson, null, 2));
        
        const contactUserErrors = contactJson?.data?.companyContactCreate?.userErrors ?? [];
        const topLevelErrors = contactJson?.errors ?? [];

        if (contactUserErrors.length > 0) {
          const msgIncludes = (needle: string) =>
            contactUserErrors.some((e: any) =>
              (e.message ?? "").toLowerCase().includes(needle)
            );

          const fieldIsPhone = () =>
            contactUserErrors.some((e: any) =>
              Array.isArray(e.field) && e.field.join(".") === "input.phone"
            );

          // 1) If the ONLY problem is phone being taken, retry WITHOUT phone (keeps email/name and avoids silent failure)
          if (fieldIsPhone() && msgIncludes("phone number") && msgIncludes("already been taken")) {
            console.log(
              "companyContactCreate failed due to phone conflict; retrying without phone"
            );

            const retryVariables = {
              companyId,
              input: {
                firstName,
                lastName,
                email: app.email,
              },
            };
            console.log(
              "companyContactCreate retry variables:",
              JSON.stringify(retryVariables, null, 2)
            );

            const retryResp = await fetch(
              `https://${cleanDomain}/admin/api/2024-10/graphql.json`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Shopify-Access-Token": shopifyAdminToken,
                },
                body: JSON.stringify({
                  query: createContactMutation,
                  variables: retryVariables,
                }),
              }
            );

            const retryJson = await retryResp.json();
            console.log(
              "companyContactCreate retry response:",
              JSON.stringify(retryJson, null, 2)
            );

            const retryErrors = retryJson?.data?.companyContactCreate?.userErrors ?? [];
            const retryTopErrors = retryJson?.errors ?? [];
            if (retryErrors.length === 0 && retryTopErrors.length === 0) {
              createdContactId = retryJson?.data?.companyContactCreate?.companyContact?.id;
              console.log(
                `Created contact ${createdContactId} after retry (no phone)`
              );
            } else {
              console.warn("companyContactCreate retry userErrors:", retryErrors);
              if (retryTopErrors.length > 0) {
                console.warn("companyContactCreate retry GraphQL errors:", retryTopErrors);
              }
            }
          } else {
            // 2) Email/customer conflicts: try to attach an existing customer as a contact
            const alreadyExists = msgIncludes("already been taken");
            if (alreadyExists) {
              console.log(
                "Contact creation reported 'already been taken'; attempting existing customer lookup"
              );

              const findCustomerQuery = `
                query findCustomer($query: String!) {
                  customers(first: 1, query: $query) {
                    edges {
                      node {
                        id
                        email
                      }
                    }
                  }
                }
              `;

              const customerQueryString = `email:${app.email}`;
              console.log(
                "findCustomer query string:",
                JSON.stringify(customerQueryString)
              );

              const customerResp = await fetch(
                `https://${cleanDomain}/admin/api/2024-10/graphql.json`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": shopifyAdminToken,
                  },
                  body: JSON.stringify({
                    query: findCustomerQuery,
                    variables: { query: customerQueryString },
                  }),
                }
              );

              const customerJson = await customerResp.json();
              console.log(
                "findCustomer response:",
                JSON.stringify(customerJson, null, 2)
              );

              const existingCustomerId = customerJson?.data?.customers?.edges?.[0]?.node?.id;

              if (existingCustomerId) {
                console.log(`Found existing customer: ${existingCustomerId}`);

                const assignCustomerMutation = `
                  mutation companyAssignCustomerAsContact($companyId: ID!, $customerId: ID!) {
                    companyAssignCustomerAsContact(companyId: $companyId, customerId: $customerId) {
                      companyContact {
                        id
                        customer {
                          id
                          email
                        }
                      }
                      userErrors {
                        field
                        message
                      }
                    }
                  }
                `;

                const assignCustomerResp = await fetch(
                  `https://${cleanDomain}/admin/api/2024-10/graphql.json`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "X-Shopify-Access-Token": shopifyAdminToken,
                    },
                    body: JSON.stringify({
                      query: assignCustomerMutation,
                      variables: {
                        companyId,
                        customerId: existingCustomerId,
                      },
                    }),
                  }
                );

                const assignCustomerJson = await assignCustomerResp.json();
                console.log(
                  "companyAssignCustomerAsContact response:",
                  JSON.stringify(assignCustomerJson, null, 2)
                );

                const assignErrors =
                  assignCustomerJson?.data?.companyAssignCustomerAsContact?.userErrors ?? [];
                const assignTopErrors = assignCustomerJson?.errors ?? [];

                if (assignErrors.length === 0 && assignTopErrors.length === 0) {
                  createdContactId =
                    assignCustomerJson?.data?.companyAssignCustomerAsContact?.companyContact?.id;
                  console.log(
                    `Assigned existing customer as contact ${createdContactId} (Ordering NOT approved)`
                  );
                } else {
                  console.warn(
                    "companyAssignCustomerAsContact userErrors:",
                    assignErrors
                  );
                  if (assignTopErrors.length > 0) {
                    console.warn(
                      "companyAssignCustomerAsContact GraphQL errors:",
                      assignTopErrors
                    );
                  }
                }
              } else {
                console.warn("Could not find existing customer by email:", app.email);
              }
            } else {
              console.warn("companyContactCreate userErrors:", contactUserErrors);
            }
          }
        } else if (topLevelErrors.length > 0) {
          console.warn("companyContactCreate GraphQL errors:", topLevelErrors);
        } else {
          createdContactId = contactJson?.data?.companyContactCreate?.companyContact?.id;
          console.log(`Created contact ${createdContactId} WITHOUT role assignment (Ordering NOT approved)`);
        }
      } catch (e) {
        console.error("companyContactCreate failed:", e);
      }
    }

    // Set the created contact as the company's MAIN CONTACT so they appear in the "Main contact" column.
    if (companyId && createdContactId) {
      try {
        const assignMainContactMutation = `
          mutation companyAssignMainContact($companyId: ID!, $companyContactId: ID!) {
            companyAssignMainContact(companyId: $companyId, companyContactId: $companyContactId) {
              company {
                id
                mainContact {
                  id
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `;

        const mainContactResp = await fetch(
          `https://${cleanDomain}/admin/api/2024-10/graphql.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Access-Token": shopifyAdminToken,
            },
            body: JSON.stringify({
              query: assignMainContactMutation,
              variables: {
                companyId,
                companyContactId: createdContactId,
              },
            }),
          }
        );

        const mainContactJson = await mainContactResp.json();
        const mainContactUserErrors = mainContactJson?.data?.companyAssignMainContact?.userErrors ?? [];
        const mainContactTopErrors = mainContactJson?.errors ?? [];

        if (mainContactUserErrors.length > 0) {
          console.warn("companyAssignMainContact userErrors:", mainContactUserErrors);
        } else if (mainContactTopErrors.length > 0) {
          console.warn("companyAssignMainContact GraphQL errors:", mainContactTopErrors);
        } else {
          const mainContactId = mainContactJson?.data?.companyAssignMainContact?.company?.mainContact?.id;
          console.log(`Set ${mainContactId} as main contact for company`);
        }
      } catch (e) {
        console.warn("companyAssignMainContact failed (non-fatal):", e);
      }
    }

    // Create an initial location via companyLocationCreate so checkoutToDraft is applied at creation time.
    // IMPORTANT: Including a shippingAddress is required for buyerExperienceConfiguration to be respected.
    if (companyId) {
      try {
        const createLocationMutation = `
          mutation companyLocationCreate($companyId: ID!, $input: CompanyLocationCreateInput!) {
            companyLocationCreate(companyId: $companyId, input: $input) {
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

        const createLocationResp = await fetch(
          `https://${cleanDomain}/admin/api/2024-10/graphql.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Access-Token": shopifyAdminToken,
            },
            body: JSON.stringify({
              query: createLocationMutation,
              variables: {
                companyId,
                input: {
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
            }),
          }
        );

        const createLocationJson = await createLocationResp.json();
        const topLevelErrors = createLocationJson?.errors ?? [];
        const userErrors = createLocationJson?.data?.companyLocationCreate?.userErrors ?? [];

        if (userErrors.length > 0) {
          console.warn("companyLocationCreate userErrors:", userErrors);
        } else if (topLevelErrors.length > 0) {
          console.warn("companyLocationCreate GraphQL errors:", topLevelErrors);
        } else {
          const locationId = createLocationJson?.data?.companyLocationCreate?.companyLocation?.id;
          const checkoutToDraft = createLocationJson?.data?.companyLocationCreate?.companyLocation?.buyerExperienceConfiguration?.checkoutToDraft;
          console.log(`Created location ${locationId} with checkoutToDraft=${checkoutToDraft}`);
        }
      } catch (e) {
        console.warn("companyLocationCreate failed (non-fatal):", e);
      }
    }

    // Shopify B2B "Ordering approved" is controlled primarily by whether a CATALOG is assigned
    // to the company location. We MUST ensure NO catalogs are assigned on creation.
    // Shopify may auto-create additional/default locations and even auto-attach catalogs depending
    // on store configuration. We proactively remove any catalogs we detect.
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

            // Hard guarantee: if Shopify still shows catalogs on any location, the company will appear
            // "Ordering approved". Fail the sync so we don't mistakenly mark the application as ready.
            const stillHasCatalogs = verifyNodes.some((n) => (n.catalogIds?.length ?? 0) > 0);
            if (stillHasCatalogs) {
              throw new Error(
                "Shopify still has catalogs assigned to the new company location(s). " +
                  "Remove catalogs or disable auto-assignment rules in Shopify, then retry the sync."
              );
            }
          } catch (e) {
            // Treat verification failures as fatal: we cannot guarantee "Ordering NOT approved".
            throw e;
          }
        } else {
          console.log("No company locations found; leaving as-is (should be ordering not approved).")
        }
      } catch (e) {
        // Fatal: if we cannot guarantee catalogs are removed, do not silently succeed.
        throw e;
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
