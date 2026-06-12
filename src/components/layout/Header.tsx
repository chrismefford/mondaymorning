import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, ArrowUpRight, Sparkles, Beer, Wine, Martini, Star, Leaf, Package, ChevronDown, Search, BookOpen, Newspaper, Truck, GraduationCap, Store, FlaskConical, MapPin } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import logoGold from "@/assets/logo-mm-gold.png";
import logoWhite from "@/assets/logo-mm-white.png";
import menuBg from "@/assets/brand/ig-shop.jpg";
import SearchOverlay from "@/components/search/SearchOverlay";

const categoryItems = [
  { name: "Best Sellers", icon: Sparkles, href: "/collections/best-sellers" },
  { name: "NA Beer", icon: Beer, href: "/collections/na-beer" },
  { name: "NA Wine", icon: Wine, href: "/collections/wine-alternatives" },
  { name: "NA Spirits", icon: Martini, href: "/collections/spirit-alternatives" },
  { name: "Functionals", icon: Leaf, href: "/collections/functional" },
  { name: "Shop All", icon: Search, href: "/shop", isShopAll: true },
];

const recipeItems = [
  { name: "All Recipes", icon: Martini, href: "/recipes" },
  { name: "Blog", icon: BookOpen, href: "/blog", isBlog: true },
];

const visitItems = [
  { name: "Our Shops", icon: Store, href: "/locations" },
  { name: "Stockists", icon: MapPin, href: "/stockists" },
];

const hireUsItems = [
  { name: "B2B & Distribution", icon: Truck, href: "/services#b2b" },
  { name: "Consulting", icon: GraduationCap, href: "/services#consulting" },
  { name: "Retail Pop-Ups", icon: Store, href: "/services#popups" },
  { name: "Contract Brewing", icon: FlaskConical, href: "/services#brewing" },
  { name: "Events & Vibations", icon: Martini, href: "/services#events" },
  { name: "Press", icon: Newspaper, href: "/press", isPress: true },
];

interface HeaderProps {
  forceSolid?: boolean;
}

// Desktop nav item with a hover dropdown: clicking the label navigates to the
// page, hovering reveals the category shortcuts. (The menu is a child of the
// hover wrapper, not a portal, so moving onto it keeps it open.)
const NavDropdown = ({
  link,
  items,
  showLightText,
}: {
  link: { name: string; href: string };
  items: { name: string; href?: string; icon: any; isBlog?: boolean; isShopAll?: boolean }[];
  showLightText: boolean;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={link.href}
        className={`font-sans text-xs font-semibold uppercase tracking-[0.15em] px-5 py-2 hover:text-primary transition-colors duration-200 relative group flex items-center gap-1 ${
          showLightText ? "text-cream" : "text-foreground"
        }`}
      >
        {link.name}
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary scale-0 group-hover:scale-100 transition-transform duration-200" />
      </a>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-[100]">
          <div className="w-64 bg-cream border-2 border-forest/15 p-2 shadow-xl">
            {items.map((item) => {
              const IconComponent = item.icon;
              const isAccent = !!item.isBlog || !!item.isShopAll;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 text-forest hover:bg-forest hover:text-cream ${
                    isAccent
                      ? "border-t-2 border-forest/15 mt-1 font-semibold"
                      : "border-b border-forest/10 last:border-b-0"
                  }`}
                >
                  <IconComponent className="h-5 w-5 text-gold shrink-0" />
                  <span className="font-sans text-sm font-medium tracking-wide">{item.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Header = ({ forceSolid = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isRecipesOpen, setIsRecipesOpen] = useState(false);
  const [isVisitOpen, setIsVisitOpen] = useState(false);
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
    { name: "Shop", href: "/shop", number: "01", hasDropdown: true, dropdownType: "collections" },
    { name: "Visit", href: "/locations", number: "02", hasDropdown: true, dropdownType: "visit" },
    { name: "Behind The Bar", href: "/recipes", number: "03", hasDropdown: true, dropdownType: "recipes" },
    { name: "Story", href: "/about", number: "04" },
    { name: "Partner With Us", href: "/services", number: "05" },
  ];

  // Determine if we're on a dark hero page
  const isDarkHeroPage = typeof window !== 'undefined' &&
    (window.location.pathname === '/valentines' ||
     window.location.pathname === '/non-alcoholic-drinks-san-diego' ||
     window.location.pathname === '/non-alcoholic-beer-guide' ||
     window.location.pathname === '/best-non-alcoholic-drinks' ||
     window.location.pathname === '/new-to-non-alcoholic-drinks' ||
     window.location.pathname === '/alcohol-free-lifestyle-benefits' ||
     window.location.pathname === '/zero-proof-meaning' ||
     window.location.pathname === '/cutwater-alcohol-content' ||
     window.location.pathname === '/non-alc-drinks' ||
     window.location.pathname === '/zero-proof-alcohol-nearby' ||
     window.location.pathname === '/alcohol-alternatives' ||
     window.location.pathname === '/social-club' ||
     window.location.pathname === '/consulting' ||
     window.location.pathname === '/join' ||
     window.location.pathname.startsWith('/blog/') ||
     window.location.pathname.startsWith('/kava-haven/'));

  // Wholesale catalog needs solid header background always
  const isWholesaleCatalog = typeof window !== 'undefined' && 
    window.location.pathname === '/wholesale-catalog';

  const showLightText = !forceSolid && !isScrolled && isDarkHeroPage;

  return (
    <>
      {/* Skip to main content (keyboard / screen-reader users) */}
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const m = document.querySelector("main");
          if (m) {
            m.setAttribute("tabindex", "-1");
            (m as HTMLElement).focus();
            m.scrollIntoView();
          }
        }}
      >
        Skip to main content
      </a>

      {/* Announcement bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-teal-dark text-cream">
        <div className="container mx-auto px-4 h-9 flex items-center justify-center">
          <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.15em] text-center truncate">
            Drink Differently. Live Free AF.
            <span className="text-gold mx-2">✦</span>
            <span className="hidden sm:inline">Pacific Beach · Ocean Beach · La Costa</span>
            <span className="sm:hidden">Pacific Beach · Ocean Beach</span>
          </p>
        </div>
      </div>

      <header
        className={`fixed top-9 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isWholesaleCatalog || forceSolid
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
                className="h-12 lg:h-16 w-auto transition-all"
              />
            </a>

            {/* Desktop Navigation - Center */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const dropdownItems = link.dropdownType === "recipes" ? recipeItems : link.dropdownType === "visit" ? visitItems : link.dropdownType === "hireus" ? hireUsItems : categoryItems;
                return link.hasDropdown ? (
                  <NavDropdown
                    key={link.name}
                    link={link}
                    items={dropdownItems}
                    showLightText={showLightText}
                  />
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
            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`flex items-center gap-2 px-3 py-2 font-sans text-xs font-semibold uppercase tracking-wider transition-colors ${
                  showLightText 
                    ? 'text-cream hover:text-gold' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <Search className="h-4 w-4" />
                Search
              </button>
              <button
                onClick={openCart}
                aria-label="Open cart"
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

            <div className="md:hidden flex items-center gap-3 relative z-50">
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
                aria-label="Open cart"
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
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background with beach image */}
        <div className="absolute inset-0">
          <img
            src={menuBg}
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
              const isOpen = link.dropdownType === "collections" ? isCollectionsOpen : link.dropdownType === "visit" ? isVisitOpen : isRecipesOpen;
              const setIsOpen = link.dropdownType === "collections" ? setIsCollectionsOpen : link.dropdownType === "visit" ? setIsVisitOpen : setIsRecipesOpen;
              const dropdownItems = link.dropdownType === "recipes" ? recipeItems : link.dropdownType === "visit" ? visitItems : link.dropdownType === "hireus" ? hireUsItems : categoryItems;
              
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
                        const isShopAll = 'isShopAll' in item && item.isShopAll;
                        return (
                          <a
                            key={item.name}
                            href={itemHref}
                            className={`flex items-center gap-3 py-3 transition-colors ${
                              isBlog 
                                ? 'text-ocean hover:text-ocean-light mt-2 pt-3 border-t border-background/20' 
                                : isShopAll
                                  ? 'text-gold hover:text-gold-light mt-2 pt-3 border-t border-background/20'
                                  : 'text-background/70 hover:text-primary'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <IconComponent className={`h-4 w-4 ${isBlog ? 'text-ocean' : isShopAll ? 'text-background' : 'text-primary'}`} />
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
