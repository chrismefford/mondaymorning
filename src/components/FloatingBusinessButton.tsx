import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingBusinessButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after a slight delay for smooth entrance
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
      to="/services"
      className={cn(
        "fixed z-50 flex items-center gap-2 bg-forest text-cream",
        "rounded-full shadow-lg transition-all duration-300 ease-out",
        "hover:bg-gold hover:text-forest hover:shadow-xl",
        "focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2",
        // Position: top center
        "top-20 left-1/2 -translate-x-1/2",
        // Sizing and padding
        "px-5 py-3",
        // Animation
        isVisible 
          ? "translate-y-0 opacity-100" 
          : "-translate-y-full opacity-0"
      )}
      aria-label="For Businesses - Request wholesale pricing"
    >
      <Building2 className="h-5 w-5 flex-shrink-0" />
      <span className="font-sans text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
        For Businesses
      </span>
    </Link>
  );
};

export default FloatingBusinessButton;
