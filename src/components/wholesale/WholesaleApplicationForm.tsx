import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

interface WholesaleApplicationFormProps {
  trigger?: React.ReactNode;
}

const SHOPIFY_FORM_URL = "https://www.mondaymorning-af.shop/pages/f-b-signup";

export default function WholesaleApplicationForm({ trigger }: WholesaleApplicationFormProps) {
  const handleClick = () => {
    window.open(SHOPIFY_FORM_URL, "_blank", "noopener,noreferrer");
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
