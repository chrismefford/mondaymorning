import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface WholesalePrice {
  id: string;
  product_handle: string;
  variant_id: string | null;
  wholesale_price: number;
  retail_price: number | null;
}

export function useWholesalePrices() {
  return useQuery({
    queryKey: ["wholesale-prices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wholesale_prices")
        .select("*");

      if (error) {
        console.error("Error fetching wholesale prices:", error);
        throw error;
      }

      // Create a map for quick lookup by product handle
      const priceMap = new Map<string, WholesalePrice>();
      data?.forEach((price) => {
        // Use product_handle as the key (variant-specific lookup can be added later)
        priceMap.set(price.product_handle, price);
      });

      return { prices: data as WholesalePrice[], priceMap };
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

export function getWholesalePrice(
  priceMap: Map<string, WholesalePrice> | undefined,
  productHandle: string
): WholesalePrice | undefined {
  if (!priceMap) return undefined;
  return priceMap.get(productHandle);
}
