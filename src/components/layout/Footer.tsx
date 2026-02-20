import { useState } from "react";
import { Instagram, MapPin, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import ContactFormDialog from "@/components/ContactFormDialog";
import logoSecondaryGreen from "@/assets/logo-secondary-green.svg";
import stampWhite from "@/assets/stamp-white.svg";
import textureGreen from "@/assets/texture-green.svg";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { subscribe, isLoading } = useNewsletterSubscribe();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await subscribe(email);
    if (success) {
      setEmail("");
    }
  };
  return (
    <footer className="bg-gold text-forest py-16 lg:py-24 relative overflow-hidden">
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
                src={logoSecondaryGreen} 
                alt="Monday Morning" 
                className="h-24 w-auto"
              />
            </div>
            <div className="flex items-center gap-2 text-forest/70 mb-4">
              <MapPin className="h-4 w-4" />
              <span className="font-sans text-sm">San Diego, California</span>
            </div>
            <p className="font-sans text-sm text-forest/70 leading-relaxed mb-6">
              Premium non-alcoholic beverages for those who choose sunrise over hangover. Born on the coast, made for every moment.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com/mondaymorning.af" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-forest/30 flex items-center justify-center text-forest/70 hover:text-forest hover:border-forest hover:bg-forest/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <ContactFormDialog />
            </div>
          </div>

          {/* Pacific Beach Location */}
          <div>
            <h4 className="font-serif text-xl italic text-forest mb-2 relative inline-block">
              Pacific Beach
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-forest-deep"></span>
            </h4>
            <div className="mt-4 space-y-3">
              <p className="font-sans text-sm text-forest/90 uppercase tracking-wide">
                1854 Garnet Ave.<br />
                San Diego, CA 92109
              </p>
              <div className="space-y-1">
                <p className="font-sans text-sm text-forest/70 uppercase tracking-wide">
                  Mon - Sat  11 AM - 8 PM
                </p>
                <p className="font-sans text-sm text-forest-deep font-semibold uppercase tracking-wide">
                  *Sunday 11 AM - 4 PM
                </p>
              </div>
            </div>
          </div>

          {/* Ocean Beach Location */}
          <div>
            <h4 className="font-serif text-xl italic text-forest mb-2 relative inline-block">
              Ocean Beach
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-forest-deep"></span>
            </h4>
            <div className="mt-4 space-y-3">
              <p className="font-sans text-sm text-forest/90 uppercase tracking-wide">
                4967 Newport Ave<br />
                San Diego, CA 92107
              </p>
              <div className="space-y-1">
                <p className="font-sans text-sm text-forest/70 uppercase tracking-wide">
                  Mon - Sunday 9 AM - 6 PM
                </p>
                <p className="font-sans text-sm text-forest-deep font-semibold uppercase tracking-wide">
                  *Wednesday Open 8 PM
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider mb-4 text-forest-deep">
              Stay Connected
            </h4>
            <p className="font-sans text-sm text-forest/70 mb-4">
              Join the sunrise crew for local events, new flavors, and good vibes.
            </p>
            <form className="flex gap-2" onSubmit={handleSubmit}>
              <Input 
                type="email" 
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="bg-forest/10 border-forest/20 text-forest placeholder:text-forest/40 focus:border-forest-deep"
              />
              <Button 
                type="submit"
                disabled={isLoading}
                className="shrink-0 bg-forest hover:bg-forest-deep text-cream font-semibold"
              >
                {isLoading ? "..." : "Join"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-forest/20 flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {[
              { label: "Privacy", path: "/privacy" },
              { label: "Terms", path: "/terms" },
              { label: "Shipping", path: "/shipping" },
              { label: "Returns", path: "/returns" },
              { label: "Services", path: "/services" },
            ].map((item) => (
              <Link 
                key={item.label}
                to={item.path}
                onClick={() => window.scrollTo(0, 0)}
                className="font-sans text-xs text-forest/50 hover:text-forest-deep transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link 
              to="/admin"
              className="font-sans text-xs text-forest/50 hover:text-forest-deep transition-colors flex items-center gap-1"
            >
              <Settings className="w-3 h-3" />
              Admin
            </Link>
          </div>
          <p className="font-sans text-xs text-forest/50 text-center">
            © {new Date().getFullYear()} Monday Morning. Made with ☀️ in San Diego.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
