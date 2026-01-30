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
        compareAtPrice?: {
          amount: string;
          currencyCode: string;
        } | null;
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

export interface ShopifyPageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
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

async function fetchShopifyProductsPage(
  first: number,
  options?: {
    after?: string;
    sortKey?: ShopifyProductSortKey;
    reverse?: boolean;
  }
): Promise<{ products: ShopifyProduct[]; pageInfo: ShopifyPageInfo }> {
  return fetchFromShopify<{ products: ShopifyProduct[]; pageInfo: ShopifyPageInfo }>("products", {
    first: first.toString(),
    ...(options?.after ? { after: options.after } : {}),
    ...(options?.sortKey ? { sortKey: options.sortKey } : {}),
    ...(typeof options?.reverse === "boolean" ? { reverse: String(options.reverse) } : {}),
  });
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

/**
 * Checks if a product is active and available for sale.
 * The Storefront API only returns published products, but this also ensures
 * at least one variant is available for purchase.
 */
export function isActiveProduct(product: ShopifyProduct): boolean {
  // Product must have at least one variant available for sale
  const hasAvailableVariant = product.variants.edges.some(
    (edge) => edge.node.availableForSale
  );
  return hasAvailableVariant;
}

/**
 * Checks if a product is sold out (all variants unavailable).
 */
export function isSoldOut(product: ShopifyProduct): boolean {
  return !product.variants.edges.some((edge) => edge.node.availableForSale);
}

export function useShopifyProducts(
  first = 50,
  options?: {
    sortKey?: ShopifyProductSortKey;
    reverse?: boolean;
    includeSoldOut?: boolean;
  }
) {
  return useQuery({
    queryKey: ["shopify-products", first, options?.sortKey, options?.reverse, options?.includeSoldOut],
    queryFn: async () => {
      const data = await fetchShopifyProductsPage(first, options);
      // Include sold out products by default so they show with "Sold Out" badge
      // Only filter if explicitly excluding sold out
      if (options?.includeSoldOut === false) {
        return data.products.filter(isActiveProduct);
      }
      return data.products;
    },
  });
}

/**
 * Fetches the full product catalog by paging until the end.
 * Useful for client-side search (e.g. to ensure "Kava" is found even if it's not in the first page).
 */
export function useShopifyAllProducts(options?: {
  sortKey?: ShopifyProductSortKey;
  reverse?: boolean;
  enabled?: boolean;
  pageSize?: number;
  includeSoldOut?: boolean;
}) {
  const pageSize = Math.min(Math.max(options?.pageSize ?? 250, 1), 250);

  return useQuery({
    queryKey: ["shopify-products-all", pageSize, options?.sortKey, options?.reverse, options?.includeSoldOut],
    enabled: options?.enabled ?? true,
    queryFn: async () => {
      const all: ShopifyProduct[] = [];
      let after: string | undefined = undefined;

      // Safety cap in case of unexpected pagination behavior
      for (let page = 0; page < 25; page++) {
        const data = await fetchShopifyProductsPage(pageSize, {
          after,
          sortKey: options?.sortKey,
          reverse: options?.reverse,
        });

        all.push(...data.products);

        if (!data.pageInfo?.hasNextPage) break;
        after = data.pageInfo.endCursor ?? undefined;
        if (!after) break;
      }

      // Include sold out products by default so they show with "Sold Out" badge
      // Only filter if explicitly excluding sold out
      if (options?.includeSoldOut === false) {
        return all.filter(isActiveProduct);
      }
      return all;
    },
  });
}

/**
 * Fetches products with F&B catalog pricing from Admin API
 * Uses contextualPricing to get catalog-specific wholesale prices
 */
export function useShopifyCatalogProducts(options?: {
  enabled?: boolean;
  pageSize?: number;
}) {
  const pageSize = Math.min(Math.max(options?.pageSize ?? 250, 1), 250);

  return useQuery({
    queryKey: ["shopify-catalog-products", pageSize],
    enabled: options?.enabled ?? true,
    queryFn: async () => {
      const all: (ShopifyProduct & { hasCatalogPricing?: boolean })[] = [];
      let after: string | undefined = undefined;

      // Safety cap
      for (let page = 0; page < 25; page++) {
        const data = await fetchFromShopify<{ 
          products: (ShopifyProduct & { hasCatalogPricing?: boolean })[]; 
          pageInfo: ShopifyPageInfo 
        }>("catalog-products", {
          first: pageSize.toString(),
          ...(after ? { after } : {}),
        });

        all.push(...data.products);

        if (!data.pageInfo?.hasNextPage) break;
        after = data.pageInfo.endCursor ?? undefined;
        if (!after) break;
      }

      return all;
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
  const soldOut = isSoldOut(product);
  
  // Generate a tagline from description or use a fallback
  const tagline = product.description
    ? product.description.split('.')[0].slice(0, 50) + (product.description.length > 50 ? '...' : '')
    : "Crafted for moments that matter";
  
  // Determine badge - sold out takes priority
  let badge: string | undefined;
  if (soldOut) {
    badge = "Sold Out";
  } else if (product.tags.includes("new")) {
    badge = "New";
  } else if (product.tags.includes("bestseller")) {
    badge = "Best Seller";
  }
  
  return {
    id: product.id,
    name: product.title,
    tagline,
    price,
    compareAtPrice: compareAtPrice > price ? compareAtPrice : undefined,
    image: product.featuredImage?.url || "/placeholder.svg",
    lifestyleImage: getCategoryLifestyleImage(product.id, product.title, category),
    description: product.description,
    category,
    badge,
    handle: product.handle,
    variants: product.variants.edges.map(e => e.node),
    soldOut,
  };
}
