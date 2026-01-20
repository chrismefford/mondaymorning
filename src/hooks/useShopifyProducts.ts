import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getLifestyleImage } from "@/data/products";

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
  
  const { data, error } = await supabase.functions.invoke("shopify-storefront", {
    body: null,
    method: "GET",
  });

  // Use fetch directly since supabase.functions.invoke doesn't support GET params well
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/shopify-storefront?${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch from Shopify: ${response.status}`);
  }

  return response.json();
}

export function useShopifyProducts(first = 50) {
  return useQuery({
    queryKey: ["shopify-products", first],
    queryFn: async () => {
      const data = await fetchFromShopify<{ products: ShopifyProduct[] }>("products", { 
        first: first.toString() 
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
  
  return {
    id: product.id,
    name: product.title,
    price,
    compareAtPrice: compareAtPrice > price ? compareAtPrice : undefined,
    image: product.featuredImage?.url || "/placeholder.svg",
    lifestyleImage: getLifestyleImage(category), // Add lifestyle image based on category
    description: product.description,
    category,
    badge: product.tags.includes("new") ? "New" : product.tags.includes("bestseller") ? "Best Seller" : undefined,
    handle: product.handle,
    variants: product.variants.edges.map(e => e.node),
  };
}
