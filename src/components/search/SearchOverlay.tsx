import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";
import { useShopifyAllProducts, shopifyToLocalProduct } from "@/hooks/useShopifyProducts";
import { useNavigate } from "react-router-dom";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Fetch full catalog for reliable search (store has 400+ products)
  const { data: products, isLoading } = useShopifyAllProducts({ enabled: isOpen });

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

  // Filter products based on search query
  const filteredProducts = products
    ?.map((product) => {
      const local = shopifyToLocalProduct(product);
      // Include raw product data for better search matching
      return { ...local, tags: product.tags, vendor: product.vendor, title: product.title };
    })
    .filter((product) => {
      if (!debouncedQuery.trim()) return false;
      const searchLower = debouncedQuery.toLowerCase();
      // Search product title, name, category, description, vendor, and tags
      return (
        product.title?.toLowerCase().includes(searchLower) ||
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.vendor?.toLowerCase().includes(searchLower) ||
        product.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower))
      );
    })
    .slice(0, 12);

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
        className="absolute inset-0 bg-forest/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-start pt-24 lg:pt-32 px-6 overflow-y-auto pb-24">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 border-2 border-cream/30 text-cream flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
          aria-label="Close search"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Search input with golden glow */}
        <div
          className={`w-full max-w-2xl transition-all duration-700 ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="relative group">
            {/* Golden glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/40 via-gold/60 to-gold/40 rounded-sm blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-center bg-forest border-2 border-cream/20 group-focus-within:border-gold transition-colors duration-300">
              <Search className="absolute left-4 h-5 w-5 text-cream/50 group-focus-within:text-gold transition-colors duration-300" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent py-5 pl-14 pr-4 font-serif text-xl lg:text-2xl text-cream placeholder:text-cream/40 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 text-cream/50 hover:text-cream transition-colors"
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
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-cream/50 mb-4">
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
                    className="px-4 py-2 border border-cream/20 text-cream/70 font-sans text-sm hover:border-gold hover:text-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300"
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
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-cream/50 mb-4">
                  {filteredProducts.length} Result{filteredProducts.length !== 1 ? "s" : ""}
                </p>
                {filteredProducts.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.handle)}
                    className="w-full group flex items-center gap-4 p-4 border border-cream/10 hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] bg-cream/5 hover:bg-cream/10 transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Product image */}
                    <div className="w-16 h-16 bg-sand/10 border border-cream/10 flex-shrink-0 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Product info */}
                    <div className="flex-1 text-left">
                      <h3 className="font-serif text-lg text-cream group-hover:text-gold transition-colors">
                        {product.name}
                      </h3>
                      <p className="font-sans text-sm text-cream/50">
                        {product.category} • ${product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="h-5 w-5 text-cream/30 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-serif text-xl text-cream/50">No products found</p>
                <p className="font-sans text-sm text-cream/30 mt-2">
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
          <p className="font-sans text-xs text-cream/30">
            Press <kbd className="px-2 py-1 bg-cream/10 text-cream/50 mx-1">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
