import { useState } from "react";
import { Instagram, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import ContactFormDialog from "@/components/ContactFormDialog";
import logoSecondaryGreen from "@/assets/logo-mm-stacked-green.png";
import daybreakerIcon from "@/assets/brand/daybreaker-app-icon.png";
import stampWhite from "@/assets/stamp-white.svg";
import textureGreen from "@/assets/texture-green.webp";

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
    <footer className="brand-type bg-gold-warm text-forest py-8 lg:py-9 relative overflow-hidden">
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

      <div className="mx-auto max-w-[1700px] px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <img
              src={logoSecondaryGreen}
              alt="Monday Morning"
              className="h-12 w-auto mb-3"
            />
            <p className="font-sans text-sm text-forest leading-relaxed mb-4 max-w-xs">
              Born on the coast, made for every moment. San Diego, California.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com/mondaymorning.af" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-forest/50 flex items-center justify-center text-forest hover:text-forest-deep hover:border-forest-deep hover:bg-forest/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <ContactFormDialog />
            </div>

            {/* Get the Daybreaker app (PWA) */}
            <a
              href="https://daybreaker.life"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-3 group"
            >
              <img
                src={daybreakerIcon}
                alt="Daybreaker app icon"
                className="w-11 h-11 rounded-xl border border-forest/15 shadow-sm"
              />
              <span className="leading-tight">
                <span className="block font-sans text-[10px] uppercase tracking-[0.15em] text-forest/55">
                  Get the app
                </span>
                <span className="block font-sans text-sm font-bold text-forest group-hover:text-forest-deep transition-colors">
                  Monday Morning
                </span>
              </span>
            </a>
          </div>

          {/* Pacific Beach Location */}
          <div className="lg:col-span-2">
            <h4 className="font-script text-2xl text-forest-deep mb-1">Pacific Beach</h4>
            <div className="mt-3 space-y-1.5">
              <p className="font-sans text-sm text-forest/90 uppercase tracking-wide">
                1854 Garnet Ave.<br />
                San Diego, CA 92109
              </p>
              <div className="space-y-1">
                <p className="font-sans text-sm text-forest uppercase tracking-wide">
                  Tue - Sun  11 AM - 8 PM
                </p>
                <p className="font-sans text-sm text-forest-deep font-bold uppercase tracking-wide">
                  *Monday Closed
                </p>
              </div>
            </div>
          </div>

          {/* Ocean Beach Location */}
          <div className="lg:col-span-2">
            <h4 className="font-script text-2xl text-forest-deep mb-1">Ocean Beach</h4>
            <div className="mt-3 space-y-1.5">
              <p className="font-sans text-sm text-forest/90 uppercase tracking-wide">
                4967 Newport Ave<br />
                San Diego, CA 92107
              </p>
              <div className="space-y-1">
                <p className="font-sans text-sm text-forest uppercase tracking-wide">
                  Tue - Sun  11 AM - 8 PM
                </p>
                <p className="font-sans text-sm text-forest-deep font-bold uppercase tracking-wide">
                  *Monday Closed
                </p>
              </div>
            </div>
          </div>

          {/* The Lab Location */}
          <div className="lg:col-span-2">
            <h4 className="font-script text-2xl text-forest-deep mb-1">The Lab</h4>
            <div className="mt-3 space-y-1.5">
              <p className="font-sans text-sm text-forest/90 uppercase tracking-wide">
                1784 La Costa Meadows Dr, Ste 103<br />
                San Marcos, CA 92078
              </p>
              <p className="font-sans text-sm text-forest uppercase tracking-wide">
                By appointment
              </p>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider mb-4 text-forest-deep">
              Stay Connected
            </h4>
            <p className="font-sans text-sm text-forest mb-4">
              Join The Sunrise Club for local events, new flavors, and good vibes.
            </p>
            <form className="flex gap-2" onSubmit={handleSubmit}>
              <Input
                type="email"
                aria-label="Email address"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="bg-white border-white text-forest placeholder:text-forest/40 focus:border-forest-deep"
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
        <div className="mt-6 pt-5 border-t border-forest/30 flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {[
              { label: "Privacy", path: "/privacy" },
              { label: "Terms", path: "/terms" },
              { label: "Shipping", path: "/shipping" },
              { label: "Returns", path: "/returns" },
              { label: "California Privacy", path: "/ccpa" },
              { label: "Accessibility", path: "/accessibility" },
              { label: "Work With Us", path: "/services" },
              { label: "Press", path: "/press" },
            ].map((item) => (
              <Link 
                key={item.label}
                to={item.path}
                onClick={() => window.scrollTo(0, 0)}
                className="font-sans text-xs text-forest/70 hover:text-forest-deep transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link 
              to="/admin"
              className="font-sans text-xs text-forest/70 hover:text-forest-deep transition-colors flex items-center gap-1"
            >
              <Settings className="w-3 h-3" />
              Admin
            </Link>
          </div>
          <p className="font-sans text-xs text-forest/70 text-center">
            © {new Date().getFullYear()} Monday Morning. Made with ☀️ in San Diego.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
