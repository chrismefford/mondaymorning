import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
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

  const navLinks = [
    { name: "Shop", href: "#shop" },
    { name: "Collections", href: "#collections" },
    { name: "Story", href: "#story" },
    { name: "Journal", href: "#journal" },
  ];

  return (
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
          <a href="/" className="group flex items-center">
            <span className="font-serif text-xl lg:text-2xl font-bold tracking-tight text-foreground">
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
          <div className="lg:hidden flex items-center gap-3">
            <button className="relative w-10 h-10 border-2 border-foreground flex items-center justify-center">
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                0
              </span>
            </button>
            <button
              className="w-10 h-10 border-2 border-foreground flex items-center justify-center"
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

      {/* Mobile Menu - Full screen overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-in">
          <nav className="container mx-auto px-4 py-12 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="font-serif text-4xl font-bold text-foreground py-4 border-b-2 border-border hover:text-primary hover:border-primary transition-colors flex items-center justify-between group"
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
                <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground group-hover:text-primary">
                  0{index + 1}
                </span>
              </a>
            ))}
            <div className="mt-8">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full font-sans text-sm font-semibold uppercase tracking-wider border-2 border-foreground py-6"
              >
                Account
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
