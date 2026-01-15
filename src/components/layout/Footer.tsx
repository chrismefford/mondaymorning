import { Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-semibold mb-4">
              Monday Morning
            </h3>
            <p className="font-sans text-sm text-background/70 leading-relaxed mb-6">
              Premium non-alcoholic beverages for those who choose presence over proof.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider mb-4 text-background/50">
              Shop
            </h4>
            <ul className="space-y-3">
              {["All Products", "Best Sellers", "New Arrivals", "Collections", "Gift Sets"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-sm text-background/70 hover:text-background transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider mb-4 text-background/50">
              Company
            </h4>
            <ul className="space-y-3">
              {["Our Story", "Journal", "Stockists", "Wholesale", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-sm text-background/70 hover:text-background transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider mb-4 text-background/50">
              Stay Connected
            </h4>
            <p className="font-sans text-sm text-background/70 mb-4">
              Join our community for recipes, rituals, and exclusive offers.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-background/40"
              />
              <Button 
                type="submit"
                variant="secondary"
                className="shrink-0"
              >
                Join
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-background/50">
            © {new Date().getFullYear()} Monday Morning. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Shipping", "Returns"].map((item) => (
              <a 
                key={item}
                href="#" 
                className="font-sans text-xs text-background/50 hover:text-background/70 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
