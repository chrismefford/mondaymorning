import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Returns the products currently IN STOCK at one Monday Morning store, so each
// /locations/:slug page can show "shop what's on the shelf here". Read-only,
// live per request. Uses the Shopify Admin API (inventory levels are per
// location and not exposed by the Storefront API). Products are shaped to match
// the storefront's ShopifyProduct type so the existing ProductCard renders them.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Slug -> Shopify Location gid. These ids are stable (from the shop's Locations).
const LOCATION_GIDS: Record<string, string> = {
  "pacific-beach": "gid://shopify/Location/101802115372",
  "ocean-beach": "gid://shopify/Location/107088445740",
  "the-lab": "gid://shopify/Location/109790200108",
};

const EXCLUDE_TITLE = /gift card|membership|subscription/i;

const LOCATION_PRODUCTS_QUERY = `
  query LocationProducts($id: ID!, $first: Int!, $after: String) {
    location(id: $id) {
      inventoryLevels(first: $first, after: $after) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            quantities(names: ["available"]) { quantity }
            item {
              variant {
                id
                title
                product {
                  id
                  title
                  description
                  handle
                  status
                  onlineStoreUrl
                  productType
                  vendor
                  tags
                  featuredImage { url altText }
                  priceRangeV2 { minVariantPrice { amount currencyCode } }
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function shopifyAdminFetch(query: string, variables: Record<string, unknown> = {}) {
  const adminToken = Deno.env.get("SHOPIFY_ADMIN_ACCESS_TOKEN");
  const adminDomain = Deno.env.get("SHOPIFY_ADMIN_DOMAIN") || Deno.env.get("SHOPIFY_STORE_DOMAIN");

  if (!adminToken || !adminDomain) {
    throw new Error("Shopify Admin credentials not configured");
  }

  const cleanDomain = adminDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const response = await fetch(`https://${cleanDomain}/admin/api/2024-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Shopify Admin API error:", errorText);
    throw new Error(`Shopify Admin API error: ${response.status}`);
  }

  const json = await response.json();
  if (json.errors) {
    console.error("Shopify Admin GraphQL errors:", json.errors);
    throw new Error(json.errors[0]?.message || "GraphQL error");
  }
  return json.data;
}

// Shape an Admin product (+ the in-stock variant) into the storefront's
// ShopifyProduct type, so the existing ProductCard / shopifyToLocalProduct work.
function toStorefrontProduct(product: any, variantId: string, variantTitle: string) {
  const price = product?.priceRangeV2?.minVariantPrice ?? { amount: "0", currencyCode: "USD" };
  return {
    id: product.id,
    title: product.title,
    description: product.description ?? "",
    handle: product.handle,
    featuredImage: product.featuredImage ?? null,
    priceRange: { minVariantPrice: price },
    compareAtPriceRange: { minVariantPrice: price },
    tags: Array.isArray(product.tags) ? product.tags : [],
    productType: product.productType ?? "",
    vendor: product.vendor ?? "",
    variants: {
      edges: [
        {
          node: {
            id: variantId,
            title: variantTitle ?? "",
            availableForSale: true,
            price,
          },
        },
      ],
    },
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const slug = (url.searchParams.get("location") || "").toLowerCase();
    const locationId = LOCATION_GIDS[slug];

    if (!locationId) {
      return new Response(
        JSON.stringify({ error: "Unknown location", products: [] }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const seen = new Set<string>();
    const products: unknown[] = [];
    let after: string | undefined = undefined;

    // Page through this location's inventory. 100/page keeps the Admin API
    // query cost well under the single-query limit (nested product objects add
    // cost per node); cap at 20 pages (2,000 items) as a safety backstop.
    for (let page = 0; page < 20; page++) {
      const data = await shopifyAdminFetch(LOCATION_PRODUCTS_QUERY, {
        id: locationId,
        first: 100,
        after,
      }) as any;

      const conn = data?.location?.inventoryLevels;
      const edges = conn?.edges ?? [];

      for (const edge of edges) {
        const node = edge?.node;
        const available = node?.quantities?.[0]?.quantity ?? 0;
        if (available <= 0) continue;

        const variant = node?.item?.variant;
        const product = variant?.product;
        if (!product || !variant) continue;

        // Only in-stock, active, online-published, real products.
        if (product.status !== "ACTIVE") continue;
        if (!product.onlineStoreUrl) continue;
        if (EXCLUDE_TITLE.test(product.title || "")) continue;
        if (seen.has(product.id)) continue;

        seen.add(product.id);
        products.push(toStorefrontProduct(product, variant.id, variant.title));
      }

      if (!conn?.pageInfo?.hasNextPage) break;
      after = conn.pageInfo.endCursor ?? undefined;
      if (!after) break;
    }

    return new Response(
      JSON.stringify({ location: slug, count: products.length, products }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          // Let the browser/CDN cache briefly; stock does not change second to second.
          "Cache-Control": "public, max-age=300",
        },
      },
    );
  } catch (err) {
    console.error("location-products error:", err);
    return new Response(
      JSON.stringify({ error: String(err), products: [] }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
