import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Shop", href: "#shop", number: "01" },
    { name: "Collections", href: "#collections", number: "02" },
    { name: "Story", href: "#story", number: "03" },
    { name: "Journal", href: "#journal", number: "04" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-md border-b-2 border-foreground" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="/" className="group flex items-center relative z-50">
              <span className={`font-serif text-xl lg:text-2xl font-bold tracking-tight transition-colors ${isMenuOpen ? 'text-background' : 'text-foreground'}`}>
                MONDAY
                <span className="text-primary">.</span>
              </span>
            </a>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-foreground px-5 py-2 hover:text-primary transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary scale-0 group-hover:scale-100 transition-transform duration-200" />
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="font-sans text-xs font-semibold uppercase tracking-wider"
              >
                Account
              </Button>
              <button className="relative w-10 h-10 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors group">
                <ShoppingBag className="h-4 w-4" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  0
                </span>
              </button>
            </div>

            {/* Mobile: Cart + Menu */}
            <div className="lg:hidden flex items-center gap-3 relative z-50">
              <button className={`relative w-10 h-10 border-2 flex items-center justify-center transition-colors ${isMenuOpen ? 'border-background/30 text-background' : 'border-foreground'}`}>
                <ShoppingBag className="h-4 w-4" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  0
                </span>
              </button>
              <button
                className={`w-10 h-10 border-2 flex items-center justify-center transition-colors ${isMenuOpen ? 'border-background/30 text-background' : 'border-foreground'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Full screen dramatic overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background with beach image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
            alt=""
            className={`w-full h-full object-cover transition-transform duration-700 ${isMenuOpen ? 'scale-100' : 'scale-110'}`}
          />
          <div className="absolute inset-0 bg-foreground/90" />
        </div>

        {/* Menu content */}
        <nav className="relative z-10 h-full flex flex-col justify-center px-6">
          {/* Navigation links */}
          <div className="space-y-2">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={`group flex items-center justify-between py-4 border-b border-background/10 transition-all duration-500 ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-sans text-xs text-primary tracking-widest">{link.number}</span>
                  <span className="font-serif text-4xl text-background group-hover:text-primary transition-colors">
                    {link.name}
                  </span>
                </div>
                <ArrowUpRight className="h-5 w-5 text-background/40 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </a>
            ))}
          </div>

          {/* Bottom section */}
          <div 
            className={`mt-12 pt-8 border-t border-background/10 transition-all duration-500 ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full font-sans text-sm font-bold uppercase tracking-widest py-6 border-2 border-background/30 text-background bg-transparent hover:bg-background/10"
            >
              Account
            </Button>
            
            {/* Social / tagline */}
            <div className="mt-8 text-center">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-background/40">
                San Diego • California
              </p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
