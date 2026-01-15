import { Instagram, Mail, MapPin, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-driftwood text-background py-16 lg:py-24 relative overflow-hidden">
      {/* Wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
        <svg className="absolute -top-1 w-full h-12 text-background" preserveAspectRatio="none" viewBox="0 0 1440 48">
          <path 
            fill="currentColor" 
            d="M0,24L60,28C120,32,240,40,360,40C480,40,600,32,720,28C840,24,960,24,1080,28C1200,32,1320,40,1380,44L1440,48L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-ocean/30 flex items-center justify-center">
                <Waves className="h-4 w-4 text-ocean-light" />
              </div>
              <h3 className="font-serif text-2xl font-semibold">
                Monday Morning
              </h3>
            </div>
            <div className="flex items-center gap-2 text-background/70 mb-4">
              <MapPin className="h-4 w-4" />
              <span className="font-sans text-sm">San Diego, California</span>
            </div>
            <p className="font-sans text-sm text-background/70 leading-relaxed mb-6">
              Premium non-alcoholic beverages for those who choose sunrise over hangover. Born on the coast, made for every moment.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background/70 hover:text-background hover:bg-background/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background/70 hover:text-background hover:bg-background/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider mb-4 text-ocean-light">
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
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider mb-4 text-ocean-light">
              Company
            </h4>
            <ul className="space-y-3">
              {["Our Story", "Journal", "San Diego Stockists", "Wholesale", "Contact"].map((item) => (
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
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider mb-4 text-ocean-light">
              Stay Connected
            </h4>
            <p className="font-sans text-sm text-background/70 mb-4">
              Join the sunrise crew for local events, new flavors, and good vibes.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-background/40"
              />
              <Button 
                type="submit"
                className="shrink-0 bg-sunset hover:bg-primary text-primary-foreground"
              >
                Join
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-background/50">
            © {new Date().getFullYear()} Monday Morning. Made with ☀️ in San Diego.
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
