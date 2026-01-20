import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ShopifyProduct, shopifyToLocalProduct } from "./useShopifyProducts";

async function fetchProductByHandle(handle: string): Promise<ShopifyProduct> {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/shopify-storefront?action=product&handle=${handle}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.status}`);
  }

  const data = await response.json();
  return data.product;
}

export function useShopifyProduct(handle: string) {
  return useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      const product = await fetchProductByHandle(handle);
      return {
        raw: product,
        ...shopifyToLocalProduct(product),
      };
    },
    enabled: !!handle,
  });
}
