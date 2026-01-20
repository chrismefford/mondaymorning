import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  tags: string[];
  productType: string;
  vendor: string;
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

interface ShopifyCollection {
  id: string;
  title: string;
  description: string;
  handle: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
}

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          handle
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          tags
          productType
          vendor
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

const COLLECTION_PRODUCTS_QUERY = `
  query GetCollectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      description
      products(first: $first) {
        edges {
          node {
            id
            title
            description
            handle
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            tags
            productType
            vendor
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function shopifyFetch(query: string, variables: Record<string, unknown> = {}) {
  const storefrontToken = Deno.env.get("SHOPIFY_STOREFRONT_TOKEN");
  const storeDomain = Deno.env.get("SHOPIFY_STORE_DOMAIN");

  if (!storefrontToken || !storeDomain) {
    throw new Error("Shopify credentials not configured");
  }

  // Clean up domain - remove protocol if present
  const cleanDomain = storeDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const response = await fetch(`https://${cleanDomain}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Shopify API error:", errorText);
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const json = await response.json();
  
  if (json.errors) {
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error(json.errors[0]?.message || "GraphQL error");
  }

  return json.data;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "products";
    const collectionHandle = url.searchParams.get("collection");
    const first = parseInt(url.searchParams.get("first") || "50");

    let data;

    switch (action) {
      case "products":
        data = await shopifyFetch(PRODUCTS_QUERY, { first });
        return new Response(
          JSON.stringify({
            products: data.products.edges.map((edge: { node: ShopifyProduct }) => edge.node),
            pageInfo: data.products.pageInfo,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      case "collections":
        data = await shopifyFetch(COLLECTIONS_QUERY, { first });
        return new Response(
          JSON.stringify({
            collections: data.collections.edges.map((edge: { node: ShopifyCollection }) => edge.node),
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      case "collection-products":
        if (!collectionHandle) {
          throw new Error("Collection handle required");
        }
        data = await shopifyFetch(COLLECTION_PRODUCTS_QUERY, { handle: collectionHandle, first });
        return new Response(
          JSON.stringify({
            collection: data.collection,
            products: data.collection?.products.edges.map((edge: { node: ShopifyProduct }) => edge.node) || [],
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      default:
        throw new Error("Invalid action");
    }
  } catch (error: unknown) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
