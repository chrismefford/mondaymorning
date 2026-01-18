import { Instagram, Mail, MapPin, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoSecondaryWhite from "@/assets/logo-secondary-white.svg";
import stampWhite from "@/assets/stamp-white.svg";
import textureGreen from "@/assets/texture-green.svg";

const Footer = () => {
  return (
    <footer className="bg-forest text-cream py-16 lg:py-24 relative overflow-hidden">
      {/* Organic texture background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: `url(${textureGreen})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      
      {/* Grain texture */}
      <div className="grain absolute inset-0 pointer-events-none opacity-30" />
      
      {/* Decorative stamp */}
      <div className="absolute -bottom-32 -right-32 w-80 lg:w-[28rem] opacity-[0.03] pointer-events-none">
        <img src={stampWhite} alt="" className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src={logoSecondaryWhite} 
                alt="Monday Morning" 
                className="h-24 w-auto"
              />
            </div>
            <div className="flex items-center gap-2 text-cream/70 mb-4">
              <MapPin className="h-4 w-4" />
              <span className="font-sans text-sm">San Diego, California</span>
            </div>
            <p className="font-sans text-sm text-cream/70 leading-relaxed mb-6">
              Premium non-alcoholic beverages for those who choose sunrise over hangover. Born on the coast, made for every moment.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 border-2 border-cream/30 flex items-center justify-center text-cream/70 hover:text-cream hover:border-gold hover:bg-gold/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border-2 border-cream/30 flex items-center justify-center text-cream/70 hover:text-cream hover:border-gold hover:bg-gold/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider mb-4 text-gold">
              Shop
            </h4>
            <ul className="space-y-3">
              {["All Products", "Best Sellers", "New Arrivals", "Collections", "Gift Sets"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-sm text-cream/70 hover:text-gold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider mb-4 text-gold">
              Company
            </h4>
            <ul className="space-y-3">
              {["Our Story", "Journal", "San Diego Stockists", "Wholesale", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-sm text-cream/70 hover:text-gold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider mb-4 text-gold">
              Stay Connected
            </h4>
            <p className="font-sans text-sm text-cream/70 mb-4">
              Join the sunrise crew for local events, new flavors, and good vibes.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Your email"
                className="bg-cream/10 border-cream/20 text-cream placeholder:text-cream/40 focus:border-gold"
              />
              <Button 
                type="submit"
                className="shrink-0 bg-gold hover:bg-gold/90 text-forest-deep font-semibold"
              >
                Join
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-cream/50">
            © {new Date().getFullYear()} Monday Morning. Made with ☀️ in San Diego.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Shipping", "Returns"].map((item) => (
              <a 
                key={item}
                href="#" 
                className="font-sans text-xs text-cream/50 hover:text-gold transition-colors"
              >
                {item}
              </a>
            ))}
            <Link 
              to="/admin"
              className="font-sans text-xs text-cream/50 hover:text-gold transition-colors flex items-center gap-1"
            >
              <Settings className="w-3 h-3" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
