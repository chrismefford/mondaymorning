import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface WholesaleCustomer {
  id: string;
  company_name: string;
  discount_tier: string;
  payment_terms: string;
  is_active: boolean;
}

export function useWholesaleCustomer() {
  const [customer, setCustomer] = useState<WholesaleCustomer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWholesale, setIsWholesale] = useState(false);

  useEffect(() => {
    const checkWholesaleStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        setIsLoading(false);
        return;
      }

      const { data } = await supabase
        .from("wholesale_customers")
        .select("id, company_name, discount_tier, payment_terms, is_active")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (data?.is_active) {
        setCustomer(data);
        setIsWholesale(true);
      }

      setIsLoading(false);
    };

    checkWholesaleStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkWholesaleStatus();
    });

    return () => subscription.unsubscribe();
  }, []);

  return { customer, isLoading, isWholesale };
}
