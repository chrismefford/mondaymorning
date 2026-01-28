import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingBusinessButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    // Show button after a slight delay for smooth entrance
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show button only when near the top of the page (within 200px)
      setIsAtTop(window.scrollY < 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldShow = isVisible && isAtTop;

  return (
    <Link
      to="/services"
      className={cn(
        "fixed z-50 flex items-center gap-2 bg-forest text-cream",
        "rounded-full shadow-lg transition-all duration-300 ease-out",
        "hover:bg-gold hover:text-forest hover:shadow-xl",
        "focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2",
        // Position: top right, below the spinning badge
        "top-[340px] lg:top-80 right-4 lg:right-8",
        // Sizing and padding
        "px-5 py-3",
        // Animation - hide when scrolling down
        shouldShow 
          ? "translate-x-0 opacity-100" 
          : "translate-x-full opacity-0 pointer-events-none"
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
