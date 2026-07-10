import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { useCart } from "@/hooks/useCart";
import { SITE_URL } from "@/lib/seo";
import { Gift, Mail, Store, ShoppingBag, Loader2 } from "lucide-react";

const GIFT_CARD_HANDLE = "monday-morning-gift-card";
// Fallback purchase link if the live product feed is unavailable.
const SHOPIFY_FALLBACK = "https://www.mondaymorning-af.shop/products/monday-morning-gift-card";

const dollars = (amount: string) => `$${Math.round(parseFloat(amount))}`;

const giftCardSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Monday Morning Gift Card",
  description:
    "A Monday Morning gift card, the easiest way to introduce someone to drinking differently. Redeemable online and at both San Diego tasting rooms.",
  image: `${SITE_URL}/og-monday-morning.png`,
  brand: { "@type": "Brand", name: "Monday Morning" },
  category: "Gift Card",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "25",
    highPrice: "500",
    offerCount: 10,
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/gift-cards`,
  },
};

const steps = [
  { icon: Gift, title: "Pick an amount", body: "Choose any value from $25 to $500." },
  { icon: Mail, title: "We email the card", body: "It arrives with a code to redeem, and it never expires." },
  { icon: Store, title: "They drink differently", body: "Redeemable online and in store at Pacific Beach and Ocean Beach." },
];

const GiftCards = () => {
  const { data: product, isLoading, error } = useShopifyProduct(GIFT_CARD_HANDLE);
  const { addToCart, isLoading: isAddingToCart } = useCart();
  const [selectedId, setSelectedId] = useState<string>("");

  const variants = (product?.variants ?? []).filter(
    (v: { availableForSale: boolean }) => v.availableForSale
  );

  // Default to the first available denomination once the product loads.
  useEffect(() => {
    if (!selectedId && variants.length > 0) {
      setSelectedId(variants[0].id);
    }
  }, [variants, selectedId]);

  const handleAddToCart = async () => {
    if (selectedId) await addToCart(selectedId);
  };

  return (
    <div className="min-h-screen bg-cream brand-type">
      <SEO
        title="Gift Cards"
        description="Give the gift of drinking differently. A Monday Morning gift card unlocks 500+ non-alcoholic beers, wines, spirits and Vibations, redeemable online and at our two San Diego tasting rooms."
        path="/gift-cards"
        type="product"
        schema={giftCardSchema}
      />
      <Header />

      {/* Hero */}
      <section className="relative bg-forest overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 pt-32 lg:pt-40 pb-16 lg:pb-20 relative z-10">
          <div className="max-w-3xl">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-6">
              Give the good stuff
            </p>
            <h1 className="font-serif text-5xl md:text-7xl text-cream leading-[0.95] mb-8">
              Monday Morning
              <br />
              <span className="text-gold">Gift Cards</span>
            </h1>
            <p className="font-sans text-lg text-cream/70 max-w-xl leading-relaxed">
              The easiest way to introduce someone to drinking differently. One card, 500+
              non-alcoholic beers, wines, spirits and Vibations to explore. Redeem online or at
              either San Diego tasting room.
            </p>
          </div>
        </div>
      </section>

      {/* Buy */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
            {/* Card image */}
            <div className="relative max-w-md mx-auto lg:mx-0 w-full">
              <div className="aspect-[4/3] bg-white border-2 border-forest overflow-hidden shadow-card flex items-center justify-center">
                {product?.image ? (
                  <img
                    src={product.image}
                    alt="Monday Morning gift card"
                    className="w-full h-full object-contain p-6"
                  />
                ) : (
                  <Gift className="h-20 w-20 text-forest/30" aria-hidden="true" />
                )}
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-gold/20 -z-10" />
            </div>

            {/* Selector */}
            <div className="flex flex-col">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-3">
                Digital gift card
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-forest mb-6 leading-tight">
                Choose an amount
              </h2>

              {isLoading ? (
                <div className="flex items-center gap-3 text-forest/60 font-sans py-6">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading amounts...
                </div>
              ) : error || variants.length === 0 ? (
                <div className="font-sans text-forest/70">
                  <p className="mb-4">Our gift cards are ready to buy on our shop.</p>
                  <a href={SHOPIFY_FALLBACK} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-forest text-cream hover:bg-forest-light font-sans text-sm font-semibold uppercase tracking-wider px-10 py-5 gap-2">
                      <ShoppingBag className="h-5 w-5" />
                      Buy a gift card
                    </Button>
                  </a>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
                    {variants.map((v: { id: string; price: { amount: string } }) => {
                      const active = v.id === selectedId;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedId(v.id)}
                          className={`font-sans font-semibold border-2 border-forest py-3 transition-colors ${
                            active
                              ? "bg-forest text-cream"
                              : "bg-cream text-forest hover:bg-forest/5"
                          }`}
                          aria-pressed={active}
                        >
                          {dollars(v.price.amount)}
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || !selectedId}
                    className="w-full sm:w-auto bg-gold text-forest hover:bg-gold-light font-sans text-sm font-semibold uppercase tracking-wider px-10 py-5 gap-2 border-0"
                  >
                    {isAddingToCart ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <ShoppingBag className="h-5 w-5" />
                        Add to cart
                      </>
                    )}
                  </Button>

                  <p className="font-sans text-sm text-forest/60 mt-5 max-w-md leading-relaxed">
                    Delivered by email with a code to redeem. Never expires. Good online and in
                    store at both our Pacific Beach and Ocean Beach tasting rooms.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-forest py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {steps.map((s) => (
              <div key={s.title} className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-gold text-gold mb-5">
                  <s.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-2xl text-cream mb-2">{s.title}</h3>
                <p className="font-sans text-cream/70 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GiftCards;
