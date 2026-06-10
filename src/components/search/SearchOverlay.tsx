import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";
import { useShopifyAllProducts, shopifyToLocalProduct } from "@/hooks/useShopifyProducts";
import { useNavigate } from "react-router-dom";
import textureCream from "@/assets/texture-cream.webp";
import stampGold from "@/assets/stamp-gold.svg";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Fetch full catalog sorted by best-selling for relevant search results
  const { data: products, isLoading } = useShopifyAllProducts({ 
    enabled: isOpen,
    sortKey: "BEST_SELLING"
  });

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Compound search terms - these match specific tag patterns
  const compoundSearches: Record<string, { requiredTag?: string; requiredType?: string; titleKeywords?: string[] }> = {
    "red wine": { requiredTag: "redwine", requiredType: "wine" },
    "red wines": { requiredTag: "redwine", requiredType: "wine" },
    "white wine": { requiredTag: "whitewine", requiredType: "wine" },
    "white wines": { requiredTag: "whitewine", requiredType: "wine" },
    "rose wine": { requiredTag: "rosewine", requiredType: "wine" },
    "rosé wine": { requiredTag: "rosewine", requiredType: "wine" },
    "sparkling wine": { requiredTag: "sparklingwine", requiredType: "wine" },
    "sparkling wines": { requiredTag: "sparklingwine", requiredType: "wine" },
  };

  // Search aliases - map search terms to additional terms to look for
  const searchAliases: Record<string, string[]> = {
    "red": ["redwine", "cabernet", "merlot", "pinot noir", "rouge", "tempranillo", "shiraz", "syrah", "red blend"],
    "white": ["whitewine", "chardonnay", "sauvignon blanc", "pinot grigio", "riesling", "moscato"],
    "rose": ["rosé", "roséwine", "rosewine", "pink"],
    "rosé": ["rose", "roséwine", "rosewine", "pink"],
    "sparkling": ["sparklingwine", "bubbly", "champagne", "prosecco", "cava", "fizz", "brut"],
    "beer": ["lager", "ale", "ipa", "pilsner", "stout", "porter", "wheat", "helles", "kolsch"],
    "light": ["lite", "lager", "pilsner", "session", "helles", "kolsch"],
    "ipa": ["india pale ale", "pale ale"],
    "spirit": ["whiskey", "bourbon", "gin", "rum", "vodka", "tequila", "aperitif"],
    "spirits": ["whiskey", "bourbon", "gin", "rum", "vodka", "tequila", "aperitif"],
    "functional": ["adaptogen", "nootropic", "wellness", "elixir", "kava"],
    "cocktail": ["mixer", "ready to drink", "rtd"],
    "canned": ["cannedwine", "rtd"],
    "wine": ["wine", "vino"],
    "dromme": ["drømme"],
    "dromme beer": ["drømme"],
  };

  // Filter products based on search query
  const filteredProducts = products
    ?.map((product) => {
      const local = shopifyToLocalProduct(product);
      return { 
        ...local, 
        tags: product.tags, 
        vendor: product.vendor, 
        title: product.title,
        productType: product.productType 
      };
    })
    .filter((product) => {
      if (!debouncedQuery.trim()) return false;
      const searchLower = debouncedQuery.toLowerCase().trim();
      
      // Build tag string for matching (lowercase, no spaces for camelCase tags)
      const tagsLower = (product.tags || []).map(t => t.toLowerCase().replace(/\s+/g, '')).join(" ");
      const productTypeLower = (product.productType || "").toLowerCase();
      const titleLower = (product.title || product.name || "").toLowerCase();
      
      // Check for compound search matches first (e.g., "red wine" -> must have RedWine tag)
      const compoundMatch = compoundSearches[searchLower];
      if (compoundMatch) {
        // Must match the required tag or have required type + color in title
        if (compoundMatch.requiredTag && tagsLower.includes(compoundMatch.requiredTag)) {
          return true;
        }
        // Fallback: check type + title contains color word
        if (compoundMatch.requiredType && productTypeLower.includes(compoundMatch.requiredType)) {
          const colorWord = searchLower.split(" ")[0]; // "red", "white", etc.
          if (titleLower.includes(colorWord)) {
            return true;
          }
        }
        return false;
      }
      
      // For general searches, use term-by-term matching
      const searchTerms = searchLower.split(/\s+/).filter(t => t.length > 0);
      
      // Build searchable text - but be more restrictive (exclude descriptions to avoid false matches)
      const searchableText = [
        product.title,
        product.name,
        product.vendor,
        product.productType,
        ...(product.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      // Helper to check if product matches a single term
      const termMatchesProduct = (term: string): boolean => {
        if (searchableText.includes(term)) return true;
        const aliases = searchAliases[term];
        if (aliases) {
          return aliases.some(alias => searchableText.includes(alias));
        }
        return false;
      };

      // ALL search terms must match
      return searchTerms.every(term => termMatchesProduct(term));
    })
    .slice(0, 24);

  const handleProductClick = (handle: string) => {
    navigate(`/product/${handle}`);
    onClose();
    setQuery("");
  };

  const popularSearches = [
    { label: "NA Wine", search: "wine" },
    { label: "Beer", search: "beer" },
    { label: "Spirits", search: "spirit" },
    { label: "Functionals", search: "functional" },
    { label: "Best Sellers", path: "/collections/best-sellers" },
  ];

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-cream/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Decorative brand layers */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ backgroundImage: `url(${textureCream})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="grain absolute inset-0 pointer-events-none opacity-40" />
      <div className="absolute -top-24 -right-24 w-72 lg:w-[30rem] opacity-[0.06] pointer-events-none rotate-12">
        <img src={stampGold} alt="" className="w-full h-full" />
      </div>
      <div className="absolute -bottom-28 -left-24 w-72 lg:w-[26rem] opacity-[0.05] pointer-events-none -rotate-12">
        <img src={stampGold} alt="" className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="brand-type relative z-10 h-full flex flex-col items-center justify-start pt-24 lg:pt-32 px-6 overflow-y-auto pb-24">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 border-2 border-forest/30 text-forest flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
          aria-label="Close search"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Search input */}
        <div
          className={`w-full max-w-2xl transition-all duration-700 ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          {/* Headline moment (only on the empty / browse state) */}
          {!debouncedQuery && (
            <div className="text-center mb-6 lg:mb-8">
              <span className="font-sans text-[11px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-3 block">
                500+ zero-proof drinks
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl text-forest leading-[1.02]">
                Find your <span className="font-script text-gold text-[1.2em] leading-none">Vibation.</span>
              </h2>
            </div>
          )}

          <div className="relative group">
            <div className="relative flex items-center bg-white border-2 border-forest/15 group-focus-within:border-gold transition-colors duration-300 shadow-sm">
              <Search className="absolute left-4 h-5 w-5 text-forest/40 group-focus-within:text-gold transition-colors duration-300" />
              <input
                ref={inputRef}
                type="text"
                aria-label="Search products"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 500+ drinks..."
                className="w-full bg-transparent py-5 pl-14 pr-4 font-serif text-xl lg:text-2xl text-forest placeholder:text-forest/40 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 text-forest/40 hover:text-forest transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Popular searches */}
          {!debouncedQuery && (
            <div
              className={`mt-8 transition-all duration-500 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-forest/50 mb-4">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.path) {
                        navigate(item.path);
                        onClose();
                        setQuery("");
                      } else if (item.search) {
                        setQuery(item.search);
                        setDebouncedQuery(item.search);
                      }
                    }}
                    className="px-4 py-2 border-2 border-forest/20 text-forest/80 font-sans text-sm font-semibold uppercase tracking-wide hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search results */}
        {debouncedQuery && (
          <div
            className={`w-full max-w-2xl mt-8 transition-all duration-500 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-gold animate-spin" />
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="space-y-2">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-forest/50 mb-4">
                  {filteredProducts.length} Result{filteredProducts.length !== 1 ? "s" : ""}
                </p>
                {filteredProducts.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.handle)}
                    className="w-full group flex items-center gap-4 p-3 border border-forest/10 hover:border-gold bg-white hover:bg-sand transition-all duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Product image with sold out overlay */}
                    <div className="relative w-16 h-16 bg-white border border-forest/10 flex-shrink-0 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 ${product.soldOut ? 'opacity-50' : ''}`}
                      />
                      {product.soldOut && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="bg-forest/90 text-cream text-[8px] font-sans uppercase tracking-wider px-1.5 py-0.5">
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product info */}
                    <div className="flex-1 text-left">
                      <h3 className={`font-serif text-lg transition-colors ${product.soldOut ? 'text-forest/40' : 'text-forest group-hover:text-gold'}`}>
                        {product.name}
                      </h3>
                      <p className="font-sans text-sm text-forest/55">
                        {product.category} • ${product.price.toFixed(2)}
                        {product.soldOut && <span className="ml-2 text-forest/35">• Sold Out</span>}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className={`h-5 w-5 transition-all duration-300 ${product.soldOut ? 'text-forest/20' : 'text-forest/30 group-hover:text-gold group-hover:translate-x-1'}`} />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-serif text-xl text-forest/50">No products found</p>
                <p className="font-sans text-sm text-forest/40 mt-2">
                  Try searching for "wine", "beer", or "spirits"
                </p>
              </div>
            )}
          </div>
        )}

        {/* Keyboard hint */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-500 ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <p className="font-sans text-xs text-forest/40">
            Press <kbd className="px-2 py-1 bg-forest/10 text-forest/60 mx-1">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
