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
  query GetProducts($first: Int!, $after: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
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

// B2B Products query with @inContext for catalog pricing
const B2B_PRODUCTS_QUERY = `
  query GetB2BProducts($first: Int!, $after: String, $sortKey: ProductSortKeys, $reverse: Boolean, $companyLocationId: ID!) @inContext(companyLocationId: $companyLocationId) {
    products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
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
                compareAtPrice {
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

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
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
`;

// Cart mutations
const CREATE_CART_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const ADD_TO_CART_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const UPDATE_CART_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const REMOVE_FROM_CART_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_CART_QUERY = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                  handle
                  featuredImage {
                    url
                    altText
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

  const cleanDomain = storeDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");

  console.log(`Making Shopify request to ${cleanDomain}`);
  console.log("Query:", query.slice(0, 100) + "...");
  console.log("Variables:", JSON.stringify(variables));

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
    const productHandle = url.searchParams.get("handle");
    const first = parseInt(url.searchParams.get("first") || "50");
    const after = url.searchParams.get("after") || undefined;
    const sortKey = url.searchParams.get("sortKey") || undefined;
    const reverse = url.searchParams.get("reverse") === "true";

    let data;
    let body: Record<string, unknown> = {};

    // Parse body for POST requests
    if (req.method === "POST") {
      try {
        body = await req.json();
      } catch {
        body = {};
      }
    }

    switch (action) {
      case "products":
        data = await shopifyFetch(PRODUCTS_QUERY, { first, after, sortKey, reverse });
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

      case "b2b-products": {
        const companyLocationId = url.searchParams.get("companyLocationId");
        if (!companyLocationId) {
          throw new Error("companyLocationId required for B2B pricing");
        }
        console.log("Fetching B2B products with companyLocationId:", companyLocationId);
        data = await shopifyFetch(B2B_PRODUCTS_QUERY, { 
          first, 
          after, 
          sortKey, 
          reverse,
          companyLocationId 
        });
        return new Response(
          JSON.stringify({
            products: data.products.edges.map((edge: { node: ShopifyProduct }) => edge.node),
            pageInfo: data.products.pageInfo,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "product":
        if (!productHandle) {
          throw new Error("Product handle required");
        }
        data = await shopifyFetch(PRODUCT_BY_HANDLE_QUERY, { handle: productHandle });
        return new Response(
          JSON.stringify({
            product: data.productByHandle,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      // Cart operations
      case "cart-create": {
        const lines = body.lines as Array<{ merchandiseId: string; quantity: number }> || [];
        console.log("Creating cart with lines:", lines);
        data = await shopifyFetch(CREATE_CART_MUTATION, { 
          input: { lines } 
        });
        if (data.cartCreate.userErrors?.length > 0) {
          throw new Error(data.cartCreate.userErrors[0].message);
        }
        return new Response(
          JSON.stringify({ cart: data.cartCreate.cart }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "cart-add": {
        const cartId = body.cartId as string;
        const lines = body.lines as Array<{ merchandiseId: string; quantity: number }>;
        if (!cartId || !lines) {
          throw new Error("cartId and lines required");
        }
        console.log("Adding to cart:", cartId, lines);
        data = await shopifyFetch(ADD_TO_CART_MUTATION, { cartId, lines });
        if (data.cartLinesAdd.userErrors?.length > 0) {
          throw new Error(data.cartLinesAdd.userErrors[0].message);
        }
        return new Response(
          JSON.stringify({ cart: data.cartLinesAdd.cart }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "cart-update": {
        const cartId = body.cartId as string;
        const lines = body.lines as Array<{ id: string; quantity: number }>;
        if (!cartId || !lines) {
          throw new Error("cartId and lines required");
        }
        console.log("Updating cart:", cartId, lines);
        data = await shopifyFetch(UPDATE_CART_MUTATION, { cartId, lines });
        if (data.cartLinesUpdate.userErrors?.length > 0) {
          throw new Error(data.cartLinesUpdate.userErrors[0].message);
        }
        return new Response(
          JSON.stringify({ cart: data.cartLinesUpdate.cart }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "cart-remove": {
        const cartId = body.cartId as string;
        const lineIds = body.lineIds as string[];
        if (!cartId || !lineIds) {
          throw new Error("cartId and lineIds required");
        }
        console.log("Removing from cart:", cartId, lineIds);
        data = await shopifyFetch(REMOVE_FROM_CART_MUTATION, { cartId, lineIds });
        if (data.cartLinesRemove.userErrors?.length > 0) {
          throw new Error(data.cartLinesRemove.userErrors[0].message);
        }
        return new Response(
          JSON.stringify({ cart: data.cartLinesRemove.cart }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "cart-get": {
        const cartId = url.searchParams.get("cartId");
        if (!cartId) {
          throw new Error("cartId required");
        }
        console.log("Getting cart:", cartId);
        data = await shopifyFetch(GET_CART_QUERY, { cartId });
        return new Response(
          JSON.stringify({ cart: data.cart }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

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
