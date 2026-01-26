import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

interface WholesaleApplicationFormProps {
  trigger?: React.ReactNode;
}

const SHOPIFY_FORM_ID = "shopify-forms-844352";

export default function WholesaleApplicationForm({ trigger }: WholesaleApplicationFormProps) {
  useEffect(() => {
    // Load Shopify Forms script if not already loaded
    if (!document.getElementById("shopify-forms-script")) {
      const script = document.createElement("script");
      script.id = "shopify-forms-script";
      script.src = "https://mondaymorning-af.myshopify.com/apps/forms/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleClick = () => {
    // Try to open the Shopify form
    if (typeof window !== "undefined" && (window as any).ShopifyForms) {
      (window as any).ShopifyForms.show(SHOPIFY_FORM_ID);
    } else {
      // Fallback: open the form page directly
      window.open(
        `https://www.mondaymorning-af.shop/pages/f-b-signup#${SHOPIFY_FORM_ID}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  if (trigger) {
    return (
      <span onClick={handleClick} className="cursor-pointer">
        {trigger}
      </span>
    );
  }

  return (
    <Button 
      onClick={handleClick}
      className="bg-gold hover:bg-gold/90 text-forest-deep font-semibold"
    >
      <Building2 className="w-4 h-4 mr-2" />
      Apply for Wholesale
    </Button>
  );
}
