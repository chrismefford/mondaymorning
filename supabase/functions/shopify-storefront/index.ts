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

// F&B Price List ID from Shopify Markets
const FB_PRICE_LIST_ID = "gid://shopify/PriceList/31714738476";

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

// Admin API query to get products with price list prices
const ADMIN_PRODUCTS_QUERY = `
  query GetAdminProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        description
        handle
        featuredImage {
          url
          altText
        }
        status
        productType
        vendor
        tags
        variants(first: 10) {
          nodes {
            id
            title
            inventoryQuantity
            price
            compareAtPrice
          }
        }
      }
    }
  }
`;

// Admin API query to get price list prices
const PRICE_LIST_PRICES_QUERY = `
  query GetPriceListPrices($priceListId: ID!, $first: Int!, $after: String) {
    priceList(id: $priceListId) {
      id
      name
      currency
      prices(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          variant {
            id
            product {
              id
              handle
            }
          }
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

// Admin API fetch for catalog pricing
async function shopifyAdminFetch(query: string, variables: Record<string, unknown> = {}) {
  const adminToken = Deno.env.get("SHOPIFY_ADMIN_ACCESS_TOKEN");
  const adminDomain = Deno.env.get("SHOPIFY_ADMIN_DOMAIN") || Deno.env.get("SHOPIFY_STORE_DOMAIN");

  if (!adminToken || !adminDomain) {
    throw new Error("Shopify Admin credentials not configured");
  }

  const cleanDomain = adminDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");

  console.log(`Making Shopify Admin API request to ${cleanDomain}`);
  console.log("Query:", query.slice(0, 100) + "...");
  console.log("Variables:", JSON.stringify(variables));

  const response = await fetch(`https://${cleanDomain}/admin/api/2024-01/graphql.json`, {
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

      // Catalog products with F&B pricing from Admin API
      case "catalog-products": {
        console.log("Fetching catalog products with F&B pricing");
        
        // Step 1: Fetch products from Admin API
        const productsData = await shopifyAdminFetch(ADMIN_PRODUCTS_QUERY, { 
          first, 
          after
        });
        
        // Step 2: Fetch all price list prices (paginated)
        const priceMap = new Map<string, { price: string; compareAtPrice: string | null }>();
        let priceAfter: string | null = null;
        
        for (let page = 0; page < 25; page++) {
          const priceData = await shopifyAdminFetch(PRICE_LIST_PRICES_QUERY, {
            priceListId: FB_PRICE_LIST_ID,
            first: 250,
            after: priceAfter
          }) as {
            priceList: {
              prices: {
                pageInfo: { hasNextPage: boolean; endCursor: string | null };
                nodes: Array<{
                  variant: { id: string; product: { id: string; handle: string } };
                  price: { amount: string; currencyCode: string };
                  compareAtPrice: { amount: string; currencyCode: string } | null;
                }>;
              };
            };
          };
          
          if (!priceData.priceList?.prices?.nodes) break;
          
          for (const node of priceData.priceList.prices.nodes) {
            if (node.variant?.id) {
              priceMap.set(node.variant.id, {
                price: node.price?.amount || "0",
                compareAtPrice: node.compareAtPrice?.amount || null
              });
            }
          }
          
          if (!priceData.priceList.prices.pageInfo.hasNextPage) break;
          priceAfter = priceData.priceList.prices.pageInfo.endCursor;
          if (!priceAfter) break;
        }
        
        console.log(`Loaded ${priceMap.size} price list entries`);
        
        // Step 3: Transform and merge products with prices
        // IMPORTANT: Only return products that are actually in the F&B price list.
        // (Previously we returned all ACTIVE products and simply fell back to retail pricing,
        // which makes the wholesale catalog show everything.)
        const transformedProducts = productsData.products.nodes
          .filter((p: { status: string }) => p.status === "ACTIVE")
          .map((product: {
            id: string;
            title: string;
            description: string;
            handle: string;
            featuredImage: { url: string; altText: string | null } | null;
            productType: string;
            vendor: string;
            tags: string[];
            variants: {
              nodes: Array<{
                id: string;
                title: string;
                price: string;
                compareAtPrice: string | null;
                inventoryQuantity: number;
              }>;
            };
          }) => {
            // Prefer the first variant that has catalog pricing (fallback to first variant)
            const preferredVariant =
              product.variants.nodes.find((v) => priceMap.has(v.id)) ?? product.variants.nodes[0];
            const retailPrice = preferredVariant?.price || "0";
            const catalogPriceEntry = preferredVariant ? priceMap.get(preferredVariant.id) : undefined;
            
            // IMPORTANT: Only consider it "catalog priced" if the price is DIFFERENT from retail
            // This means pricing rules have been APPLIED, not just that the product is in the catalog
            const catalogPrice = catalogPriceEntry?.price || null;
            const hasCatalogPricing = catalogPrice !== null && catalogPrice !== retailPrice;
            
            return {
              id: product.id,
              title: product.title,
              description: product.description,
              handle: product.handle,
              featuredImage: product.featuredImage,
              productType: product.productType,
              vendor: product.vendor,
              tags: product.tags,
               // Use catalog pricing (this endpoint only returns catalog-priced products)
              priceRange: {
                minVariantPrice: {
                  amount: catalogPriceEntry?.price || retailPrice,
                  currencyCode: "USD"
                }
              },
              // Use retail price as compareAt to show discount
              compareAtPriceRange: {
                minVariantPrice: {
                  amount: retailPrice,
                  currencyCode: "USD"
                }
              },
              // Flag to indicate F&B pricing is being used
              hasCatalogPricing,
              variants: {
                edges: product.variants.nodes.map((v) => {
                  const variantPriceEntry = priceMap.get(v.id);
                  return {
                    node: {
                      id: v.id,
                      title: v.title,
                      availableForSale: (v.inventoryQuantity ?? 0) > 0,
                      price: {
                        amount: variantPriceEntry?.price || v.price,
                        currencyCode: "USD"
                      },
                      compareAtPrice: {
                        amount: v.price,
                        currencyCode: "USD"
                      },
                      retailPrice: v.price,
                      catalogPrice: variantPriceEntry?.price || null
                    }
                  };
                })
              }
            };
           })
          .filter((p: { hasCatalogPricing: boolean }) => p.hasCatalogPricing);
          
        return new Response(
          JSON.stringify({
            products: transformedProducts,
            pageInfo: productsData.products.pageInfo,
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
