import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getCategoryLifestyleImage } from "@/data/lifestyleImages";

export interface ShopifyProduct {
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

export interface ShopifyCollection {
  id: string;
  title: string;
  description: string;
  handle: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
}

async function fetchFromShopify<T>(action: string, params: Record<string, string> = {}): Promise<T> {
  const queryParams = new URLSearchParams({ action, ...params });

  // Use fetch directly since our function expects query params.
  // IMPORTANT: send the project publishable key as `apikey` and prefer a user access token
  // when available (so this works for both logged-in and logged-out visitors).
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
  const { data: authData } = await supabase.auth.getSession();
  const accessToken = authData.session?.access_token;

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/shopify-storefront?${queryParams}`,
    {
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${accessToken ?? publishableKey}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch from Shopify: ${response.status}`);
  }

  return response.json();
}

export type ShopifyProductSortKey =
  | "BEST_SELLING"
  | "CREATED_AT"
  | "ID"
  | "PRICE"
  | "PRODUCT_TYPE"
  | "RELEVANCE"
  | "TITLE"
  | "UPDATED_AT"
  | "VENDOR";

export function useShopifyProducts(
  first = 50,
  options?: {
    sortKey?: ShopifyProductSortKey;
    reverse?: boolean;
  }
) {
  return useQuery({
    queryKey: ["shopify-products", first, options?.sortKey, options?.reverse],
    queryFn: async () => {
      const data = await fetchFromShopify<{ products: ShopifyProduct[] }>("products", { 
        first: first.toString(),
        ...(options?.sortKey ? { sortKey: options.sortKey } : {}),
        ...(typeof options?.reverse === "boolean" ? { reverse: String(options.reverse) } : {}),
      });
      return data.products;
    },
  });
}

export function useShopifyCollections(first = 20) {
  return useQuery({
    queryKey: ["shopify-collections", first],
    queryFn: async () => {
      const data = await fetchFromShopify<{ collections: ShopifyCollection[] }>("collections", { 
        first: first.toString() 
      });
      return data.collections;
    },
  });
}

export function useShopifyCollectionProducts(handle: string, first = 50) {
  return useQuery({
    queryKey: ["shopify-collection-products", handle, first],
    queryFn: async () => {
      const data = await fetchFromShopify<{ 
        collection: ShopifyCollection; 
        products: ShopifyProduct[] 
      }>("collection-products", { 
        collection: handle,
        first: first.toString() 
      });
      return data;
    },
    enabled: !!handle,
  });
}

// Helper to format price
export function formatShopifyPrice(amount: string, currencyCode = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

// Helper to convert Shopify product to local Product format
export function shopifyToLocalProduct(product: ShopifyProduct) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtPrice = parseFloat(product.compareAtPriceRange.minVariantPrice.amount);
  const category = product.productType || "Beverages";
  
  // Generate a tagline from description or use a fallback
  const tagline = product.description
    ? product.description.split('.')[0].slice(0, 50) + (product.description.length > 50 ? '...' : '')
    : "Crafted for moments that matter";
  
  return {
    id: product.id,
    name: product.title,
    tagline,
    price,
    compareAtPrice: compareAtPrice > price ? compareAtPrice : undefined,
    image: product.featuredImage?.url || "/placeholder.svg",
    lifestyleImage: getCategoryLifestyleImage(product.id, product.title, category), // Category-appropriate image
    description: product.description,
    category,
    badge: product.tags.includes("new") ? "New" : product.tags.includes("bestseller") ? "Best Seller" : undefined,
    handle: product.handle,
    variants: product.variants.edges.map(e => e.node),
  };
}
