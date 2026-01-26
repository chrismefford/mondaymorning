import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, ArrowUpRight, Sparkles, Beer, Wine, Martini, Star, Leaf, Package, ChevronDown, Sunrise, UtensilsCrossed, Sofa, Umbrella, PartyPopper, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import logoGold from "@/assets/logo-primary-gold.svg";
import logoWhite from "@/assets/logo-primary-white.svg";
import SearchOverlay from "@/components/search/SearchOverlay";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categoryItems = [
  { name: "Best Sellers", icon: Sparkles, href: "/collections/best-sellers" },
  { name: "NA Beer", icon: Beer, href: "/collections/na-beer" },
  { name: "NA Wine", icon: Wine, href: "/collections/wine-alternatives" },
  { name: "NA Spirits", icon: Martini, href: "/collections/spirit-alternatives" },
  { name: "Functionals", icon: Leaf, href: "/collections/functional" },
  { name: "Beach Vibes", icon: Umbrella, href: "/collections/beach-bonfire" },
  { name: "Weddings & Events", icon: PartyPopper, href: "/collections/weddings" },
];

const recipeItems = [
  { name: "Breakfast", icon: Sunrise, href: "/recipes?occasion=breakfast" },
  { name: "Dinner", icon: UtensilsCrossed, href: "/recipes?occasion=dinner" },
  { name: "Relaxing", icon: Sofa, href: "/recipes?occasion=relaxing" },
  { name: "Beach", icon: Umbrella, href: "/recipes?occasion=beach" },
  { name: "Celebration", icon: PartyPopper, href: "/recipes?occasion=celebration" },
  { name: "Blog", icon: BookOpen, href: "/blog", isBlog: true },
];

// Shopify customer account URL
const SHOPIFY_ACCOUNT_URL = "https://mondaymorning-af.myshopify.com/account";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isRecipesOpen, setIsRecipesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, openCart } = useCart();

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
    { name: "Shop", href: "/shop", number: "01" },
    { name: "Collections", href: "#collections", number: "02", hasDropdown: true, dropdownType: "collections" },
    { name: "Story", href: "/about", number: "03" },
    { name: "Recipes", href: "/recipes", number: "04", hasDropdown: true, dropdownType: "recipes" },
    { name: "Find Us", href: "/locations", number: "05" },
  ];

  // Determine if we're on a dark hero page
  const isDarkHeroPage = typeof window !== 'undefined' && 
    (window.location.pathname === '/services' || 
     window.location.pathname === '/locations');

  const showLightText = !isScrolled && isDarkHeroPage;

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
              <img 
                src={isMenuOpen || showLightText ? logoWhite : logoGold} 
                alt="Monday Morning" 
                className="h-8 lg:h-10 w-auto transition-all"
              />
            </a>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const dropdownItems = link.dropdownType === "recipes" ? recipeItems : categoryItems;
                return link.hasDropdown ? (
                  <DropdownMenu key={link.name} modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`font-sans text-xs font-semibold uppercase tracking-[0.15em] px-5 py-2 hover:text-primary transition-colors duration-200 relative group flex items-center gap-1 ${
                          showLightText ? 'text-cream' : 'text-foreground'
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary scale-0 group-hover:scale-100 transition-transform duration-200" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      className="w-64 bg-forest border-2 border-gold/30 p-2 mt-2"
                      sideOffset={8}
                      align="center"
                    >
                      {dropdownItems.map((item) => {
                        const IconComponent = item.icon;
                        const itemHref = 'href' in item ? (item as { href: string }).href : undefined;
                        const isBlog = 'isBlog' in item && item.isBlog;
                        return (
                          <DropdownMenuItem 
                            key={item.name}
                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-none border-b border-cream/10 last:border-b-0 transition-all duration-200 ${
                              isBlog 
                                ? 'text-ocean hover:text-forest hover:bg-ocean focus:bg-ocean focus:text-forest border-t border-cream/20 mt-1' 
                                : 'text-cream hover:text-forest hover:bg-gold focus:bg-gold focus:text-forest'
                            }`}
                            asChild={!!itemHref}
                          >
                            {itemHref ? (
                              <a href={itemHref}>
                                <IconComponent className={`h-5 w-5 ${isBlog ? 'text-ocean' : 'text-gold'}`} />
                                <span className="font-sans text-sm font-medium tracking-wide">{item.name}</span>
                              </a>
                            ) : (
                              <>
                                <IconComponent className={`h-5 w-5 ${isBlog ? 'text-ocean' : 'text-gold'}`} />
                                <span className="font-sans text-sm font-medium tracking-wide">{item.name}</span>
                              </>
                            )}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`font-sans text-xs font-semibold uppercase tracking-[0.15em] px-5 py-2 hover:text-primary transition-colors duration-200 relative group ${
                      showLightText ? 'text-cream' : 'text-foreground'
                    }`}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary scale-0 group-hover:scale-100 transition-transform duration-200" />
                  </a>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`flex items-center gap-2 px-3 py-2 font-sans text-xs font-semibold uppercase tracking-wider transition-colors ${
                  showLightText 
                    ? 'text-cream hover:text-gold' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <Search className="h-4 w-4" />
              </button>
              <a href={SHOPIFY_ACCOUNT_URL} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`font-sans text-xs font-semibold uppercase tracking-wider ${
                    showLightText ? 'text-cream hover:text-gold' : ''
                  }`}
                >
                  Account
                </Button>
              </a>
              <button 
                onClick={openCart}
                className={`relative w-10 h-10 border-2 flex items-center justify-center transition-colors group ${
                  showLightText 
                    ? 'border-cream/50 text-cream hover:bg-cream hover:text-forest' 
                    : 'border-foreground hover:bg-foreground hover:text-background'
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-3 relative z-50">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`w-10 h-10 border-2 flex items-center justify-center transition-colors ${
                  isMenuOpen 
                    ? 'border-background/30 text-background' 
                    : showLightText 
                      ? 'border-cream/50 text-cream' 
                      : 'border-foreground'
                }`}
                aria-label="Search products"
              >
                <Search className="h-4 w-4" />
              </button>
              <button 
                onClick={openCart}
                className={`relative w-10 h-10 border-2 flex items-center justify-center transition-colors ${
                  isMenuOpen 
                    ? 'border-background/30 text-background' 
                    : showLightText 
                      ? 'border-cream/50 text-cream' 
                      : 'border-foreground'
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className={`w-10 h-10 border-2 flex items-center justify-center transition-colors ${
                  isMenuOpen 
                    ? 'border-background/30 text-background' 
                    : showLightText 
                      ? 'border-cream/50 text-cream' 
                      : 'border-foreground'
                }`}
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
            {navLinks.map((link, index) => {
              const isOpen = link.dropdownType === "collections" ? isCollectionsOpen : isRecipesOpen;
              const setIsOpen = link.dropdownType === "collections" ? setIsCollectionsOpen : setIsRecipesOpen;
              const dropdownItems = link.dropdownType === "recipes" ? recipeItems : categoryItems;
              
              return link.hasDropdown ? (
                <div key={link.name}>
                  <button
                    className={`group w-full flex items-center justify-between py-4 border-b border-background/10 transition-all duration-500 ${
                      isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-sans text-xs text-primary tracking-widest">{link.number}</span>
                      <span className="font-serif text-4xl text-background group-hover:text-primary transition-colors">
                        {link.name}
                      </span>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-background/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {/* Submenu */}
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-8 py-2 space-y-1">
                      {dropdownItems.map((item) => {
                        const IconComponent = item.icon;
                        const itemHref = 'href' in item ? (item as { href: string }).href : link.href;
                        const isBlog = 'isBlog' in item && item.isBlog;
                        return (
                          <a
                            key={item.name}
                            href={itemHref}
                            className={`flex items-center gap-3 py-3 transition-colors ${
                              isBlog ? 'text-ocean hover:text-ocean-light mt-2 pt-3 border-t border-background/20' : 'text-background/70 hover:text-primary'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <IconComponent className={`h-4 w-4 ${isBlog ? 'text-ocean' : 'text-primary'}`} />
                            <span className="font-sans text-sm tracking-wide">{item.name}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
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
              );
            })}
          </div>

          {/* Bottom section */}
          <div 
            className={`mt-12 pt-8 border-t border-background/10 transition-all duration-500 ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <a href={SHOPIFY_ACCOUNT_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full font-sans text-sm font-bold uppercase tracking-widest py-6 border-2 border-background/30 text-background bg-transparent hover:bg-background/10"
              >
                Account
              </Button>
            </a>
            
            {/* Social / tagline */}
            <div className="mt-8 text-center">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-background/40">
                San Diego • California
              </p>
            </div>
          </div>
        </nav>
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
