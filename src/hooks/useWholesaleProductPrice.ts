import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useWholesaleCustomer } from "./useWholesaleCustomer";

interface WholesalePriceData {
  wholesalePrice: number;
  retailPrice: number;
  hasFBPricing: boolean;
  discountPercent: number;
}

/**
 * Fetches F&B catalog pricing for a single product handle
 * Only returns data if the current user is an active wholesale customer
 */
export function useWholesaleProductPrice(handle: string) {
  const { isWholesale, isLoading: isCustomerLoading } = useWholesaleCustomer();

  const query = useQuery({
    queryKey: ["wholesale-product-price", handle],
    enabled: !!handle && isWholesale && !isCustomerLoading,
    queryFn: async (): Promise<WholesalePriceData | null> => {
      // First check for local price override
      const { data: localPrice } = await supabase
        .from("wholesale_prices")
        .select("wholesale_price, retail_price")
        .eq("product_handle", handle)
        .maybeSingle();

      if (localPrice) {
        const wholesale = Number(localPrice.wholesale_price);
        const retail = Number(localPrice.retail_price) || 0;
        const discountPercent = retail > wholesale 
          ? Math.round(((retail - wholesale) / retail) * 100)
          : 0;

        return {
          wholesalePrice: wholesale,
          retailPrice: retail,
          hasFBPricing: true,
          discountPercent,
        };
      }

      // Fall back to Shopify Admin API catalog pricing
      const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
      const { data: authData } = await supabase.auth.getSession();
      const accessToken = authData.session?.access_token;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/shopify-storefront?action=catalog-product&handle=${handle}`,
        {
          headers: {
            apikey: publishableKey,
            Authorization: `Bearer ${accessToken ?? publishableKey}`,
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      
      if (!data.product?.hasCatalogPricing) {
        return null;
      }

      const catalogPrice = parseFloat(data.product.priceRange.minVariantPrice.amount);
      const retailPrice = parseFloat(data.product.compareAtPriceRange.minVariantPrice.amount);
      const hasDiscount = retailPrice > catalogPrice && catalogPrice > 0;
      const discountPercent = hasDiscount
        ? Math.round(((retailPrice - catalogPrice) / retailPrice) * 100)
        : 0;

      return {
        wholesalePrice: catalogPrice,
        retailPrice: hasDiscount ? retailPrice : 0,
        hasFBPricing: true,
        discountPercent,
      };
    },
  });

  return {
    ...query,
    isWholesale,
    isCustomerLoading,
  };
}
