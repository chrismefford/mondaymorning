import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Info, Wine, Beer, Martini, Leaf, MapPin, Search, Star, Heart, ShoppingCart, Clock, Sparkles, GlassWater } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateFAQSchema, generateBreadcrumbSchema, websiteSchema, SITE_URL, localBusinessSchema } from "@/lib/seo";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { useCart } from "@/hooks/useCart";

// Lifestyle images
import naTropicalMocktails from "@/assets/lifestyle/na-tropical-mocktails.jpg";
import spiritBarCraft from "@/assets/lifestyle/spirit-bar-craft.jpg";
import beachSunsetCocktails from "@/assets/lifestyle/beach-sunset-cocktails.jpg";
import gardenPartyToast from "@/assets/lifestyle/garden-party-toast.jpg";
import naWineCheers from "@/assets/lifestyle/na-wine-cheers.jpg";
import rooftopCheers from "@/assets/lifestyle/rooftop-cheers.jpg";
import upscaleBarToast from "@/assets/lifestyle/upscale-bar-toast.jpg";
import naBotanicalDark from "@/assets/lifestyle/na-botanical-dark.jpg";
import functionalWellness from "@/assets/lifestyle/functional-wellness-morning.jpg";
import naSpiritCocktail from "@/assets/lifestyle/na-spirit-cocktail.jpg";
import poolsideFriends from "@/assets/lifestyle/poolside-friends-drinks.jpg";

// --- Inline Product Card ---
const ProductCard = ({ handle }: { handle: string }) => {
  const { data: product, isLoading } = useShopifyProduct(handle);
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-xl border border-border bg-card p-4">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 rounded-lg bg-muted shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const imageUrl = product.raw?.featuredImage?.url || product.image;
  const price = product.raw?.priceRange?.minVariantPrice?.amount
    ? `$${parseFloat(product.raw.priceRange.minVariantPrice.amount).toFixed(2)}`
    : product.price;
  const variantId = product.raw?.variants?.edges?.[0]?.node?.id;
  const available = product.raw?.variants?.edges?.some((e: any) => e.node.availableForSale) !== false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (variantId && available) {
      addToCart(variantId, 1);
    }
  };

  return (
    <Link
      to={`/product/${handle}`}
      className="flex gap-4 items-center rounded-xl border border-border bg-card p-4 hover:shadow-md hover:border-primary/30 transition-all group no-underline"
    >
      {imageUrl && (
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
          <img src={imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-0.5">Shop Now</p>
        <p className="font-serif text-base text-foreground leading-tight truncate">{product.name}</p>
        <p className="text-sm font-semibold text-foreground/70">{price}</p>
      </div>
      <Button size="sm" onClick={handleAddToCart} disabled={!available} className="bg-ocean hover:bg-ocean/90 text-white shrink-0">
        <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
        {available ? "Add" : "Sold Out"}
      </Button>
    </Link>
  );
};

// FAQs
const faqs = [
  {
    question: "Where can I find zero proof alcohol nearby?",
    answer: "Monday Morning Bottle Shop has two locations in San Diego: Pacific Beach (1854 Garnet Ave) and Ocean Beach (4967 Newport Ave). We carry over 500 zero proof options including NA beer, wine, spirits, and functional drinks. You can also shop online with nationwide shipping at mondaymorning-af.com."
  },
  {
    question: "What is zero proof alcohol?",
    answer: "Zero proof alcohol refers to beverages with 0.0% ABV that are designed to replicate the flavor, complexity, and ritual of traditional alcoholic drinks. This includes non-alcoholic spirits, NA wine, craft NA beer, and ready-to-drink mocktails. The term 'zero proof' specifically means no measurable alcohol content."
  },
  {
    question: "Do liquor stores sell zero proof drinks?",
    answer: "Some liquor stores carry a limited selection, but dedicated non-alcoholic bottle shops like Monday Morning offer a far wider and more curated range. We specialize exclusively in zero proof and non-alcoholic beverages, with expert staff who can guide your selections and a tasting room where you can try before you buy."
  },
  {
    question: "Are zero proof spirits worth buying?",
    answer: "Yes, the category has improved dramatically. Brands like Abstinence, Almave, Seedlip, and Lyre's produce complex, cocktail-ready spirits that deliver genuine flavor depth. The key is finding the right product for your palate, which is why tasting before buying matters. Our staff can match you with the right zero proof spirit for any cocktail."
  },
  {
    question: "What are the best zero proof cocktails to order at a bar?",
    answer: "Ask for a zero proof Negroni, an NA Espresso Martini, a virgin Aperol Spritz, or a zero proof Old Fashioned. Many craft bars now have dedicated mocktail menus. If they do not, asking the bartender to make something with non-alcoholic spirits is becoming increasingly common and accepted."
  },
  {
    question: "Can I buy zero proof alcohol online?",
    answer: "Yes. Monday Morning Bottle Shop ships nationwide through our online store. We carry the largest curated selection of zero proof drinks in San Diego, and our entire catalog is available online. Many other specialty retailers also ship NA beverages, but we pride ourselves on curation over volume."
  },
  {
    question: "What is the difference between zero proof and non-alcoholic?",
    answer: "Zero proof means 0.0% ABV, containing absolutely no alcohol. Non-alcoholic can legally contain up to 0.5% ABV in the United States, which is a trace amount comparable to ripe bananas or kombucha. Both fall under the alcohol-free umbrella, but zero proof is the stricter standard."
  },
  {
    question: "Are there sober bars near me?",
    answer: "Sober bars and alcohol-free bars are growing rapidly in major cities. In San Diego, Monday Morning Bottle Shop operates as both a retail store and a tasting room where you can sample zero proof drinks in a bar-like environment. Check local directories and apps like the Zero Proof Nation map for sober bars in your area."
  },
  {
    question: "Are zero proof drinks gluten free?",
    answer: "Many zero proof drinks are naturally gluten free, but not all. Most NA spirits, wines, and functional drinks are gluten free. Some NA beers are brewed with barley or wheat and contain gluten, though gluten-free NA beer options exist. Always check individual product labels if you have celiac disease or gluten sensitivity."
  },
  {
    question: "How do zero proof spirits taste compared to regular spirits?",
    answer: "The best zero proof spirits are designed to replicate the botanical complexity, mouthfeel, and finish of traditional spirits. They will not taste identical, but high-quality options like Abstinence Cape Spice (whiskey-style) or Almave Blanco (agave-based) deliver genuine cocktail-worthy depth. The category has moved far beyond flavored water."
  },
];

const faqSchema = generateFAQSchema(faqs);

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Discover the Best Places for Zero Proof Alcohol Nearby",
  "description": "Discover the best places for zero proof alcohol nearby and enjoy refreshing non-alcoholic drinks. Learn more about sober bars and creative mocktails!",
  "author": { "@type": "Organization", "name": "Monday Morning Bottle Shop" },
  "publisher": {
    "@type": "Organization",
    "name": "Monday Morning Bottle Shop",
    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/og-image.png` },
  },
  "datePublished": "2025-06-01",
  "dateModified": "2026-02-23",
  "mainEntityOfPage": `${SITE_URL}/zero-proof-alcohol-nearby`,
  "image": `${SITE_URL}/og-image.png`,
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Zero Proof Alcohol Nearby", url: `${SITE_URL}/zero-proof-alcohol-nearby` },
]);

const tocSections = [
  { id: "what-is-zero-proof", label: "What Is It?" },
  { id: "types", label: "Types" },
  { id: "find-nearby", label: "Find Nearby" },
  { id: "mocktails", label: "Mocktails" },
  { id: "healthy-alternatives", label: "Healthy Options" },
  { id: "brands", label: "Top Brands" },
  { id: "faqs", label: "FAQs" },
];

const ZeroProofNearby = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    tocSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SEO
        title="Discover the Best Places for Zero Proof Alcohol Nearby"
        description="Discover the best places for zero proof alcohol nearby and enjoy refreshing non-alcoholic drinks. Learn more about sober bars and creative mocktails!"
        path="/zero-proof-alcohol-nearby"
        type="article"
        schema={[articleSchema, faqSchema, breadcrumbSchema, websiteSchema, localBusinessSchema]}
      />

      {/* Hero */}
      <div className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={upscaleBarToast} alt="Friends enjoying zero proof cocktails at a bar" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
        <Header />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/60">
              <li><Link to="/" className="hover:text-white/80 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-white/90">Zero Proof Alcohol Nearby</li>
            </ol>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Discover the Best Places for Zero Proof Alcohol Nearby
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Your complete guide to finding zero proof spirits, craft NA beer, alcohol-free wine, and sober bars near you, plus how to shop the best selection online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-ocean hover:bg-ocean/90 text-white rounded-full px-8">
              <Link to="/shop">Shop Zero Proof Online <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8">
              <Link to="/locations">Visit Our Tasting Room</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Sticky TOC */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {tocSections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  activeSection === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="bg-background">

        {/* What Is Zero Proof */}
        <section id="what-is-zero-proof" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">What Is Zero Proof Alcohol?</h2>
                <p className="text-muted-foreground mb-4">
                  Zero proof alcohol refers to beverages crafted to deliver the flavor, ritual, and social experience of drinking without any measurable alcohol content. The term "proof" is a historical unit of alcohol measurement, and "zero proof" means exactly that: 0.0% ABV, no ethanol, no buzz, no hangover.
                </p>
                <p className="text-muted-foreground mb-4">
                  Unlike simply grabbing a soda or sparkling water, zero proof drinks are engineered with the same attention to complexity, mouthfeel, and finish that goes into traditional spirits, wines, and beers. They use distilled botanicals, dealcoholization technology, and functional ingredients to create beverages that stand on their own.
                </p>
                <p className="text-muted-foreground mb-6">
                  The zero proof category has exploded since 2020, driven by a cultural shift toward mindful drinking. More than half of US adults are actively reducing their alcohol intake, and the market for alcohol alternative drinks is projected to exceed $13 billion globally by 2025.
                </p>

                <div className="bg-muted/50 rounded-xl p-6 border border-border">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Zero Proof vs Non-Alcoholic</p>
                      <p className="text-sm text-muted-foreground">
                        "Zero proof" = 0.0% ABV, no alcohol whatsoever. "Non-alcoholic" can contain up to 0.5% ABV (trace amounts found in bananas and bread). Both are part of the alcohol-free movement, but zero proof is the stricter standard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img src={spiritBarCraft} alt="Bartender crafting a zero proof cocktail" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>

            {/* Rise stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {[
                { value: "$13B+", label: "Global NA Market" },
                { value: "52%", label: "Adults Reducing Alcohol" },
                { value: "315%", label: "NA Spirit Growth (2020-25)" },
                { value: "500+", label: "Products We Carry" },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-card border border-border rounded-2xl p-6">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Types of Zero Proof */}
        <section id="types" className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Types of Zero Proof Alcohol</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The zero proof world spans every category you would find in a traditional liquor store, plus entirely new categories that did not exist five years ago.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Zero Proof Spirits */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <Martini className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-serif text-2xl text-foreground mb-3">Zero Proof Spirits</h3>
                <p className="text-muted-foreground mb-4">
                  The backbone of the zero proof cocktail movement. These are distilled or macerated botanical blends designed to replace gin, whiskey, tequila, rum, and vodka in your favorite cocktails. The best zero proof spirits deliver genuine complexity: juniper-forward gin alternatives, smoky whiskey substitutes, and agave-based tequila replicas.
                </p>
                <p className="text-muted-foreground mb-5">
                  Leading brands include Abstinence Spirits, Almave (from the makers of Clase Azul), Seedlip, Lyre's, and Ritual Zero Proof. Each takes a different approach to flavor construction, and the results vary widely, which is why tasting before buying matters.
                </p>
                <div className="space-y-3">
                  <ProductCard handle="abstinence-spirits-cape-spice" />
                  <ProductCard handle="almave-blanco" />
                </div>
              </div>

              {/* Non-Alcoholic Wine */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <Wine className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-serif text-2xl text-foreground mb-3">Non-Alcoholic Wine</h3>
                <p className="text-muted-foreground mb-4">
                  Non-alcoholic wines are made from real wine grapes that undergo traditional fermentation before the alcohol is gently removed through vacuum distillation or reverse osmosis. The result preserves the tannin structure, acidity, and varietal character of the original wine.
                </p>
                <p className="text-muted-foreground mb-5">
                  Look for brands like Leitz, Proxies, Surely, and Giesen. The category has moved far beyond the sugary grape juice of a decade ago. Today's best NA wines pair beautifully with food and hold their own at dinner parties.
                </p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/collections/wine-alternatives">Browse Non-Alcoholic Wines <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>

              {/* Craft NA Beer */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <Beer className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-serif text-2xl text-foreground mb-3">Craft Non-Alcoholic Beer</h3>
                <p className="text-muted-foreground mb-4">
                  Craft NA beer is the most mature segment of the zero proof market, and it is where most people start their alcohol-free journey. Athletic Brewing, Bravus, Gruvi, and Partake produce IPAs, lagers, stouts, and wheat beers that are nearly indistinguishable from their alcoholic counterparts.
                </p>
                <p className="text-muted-foreground mb-5">
                  The technology behind NA beer has advanced dramatically: vacuum distillation, arrested fermentation, and lazy yeast strains all contribute to better flavor retention at 0.0% to 0.5% ABV.
                </p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/collections/na-beer">Browse Craft NA Beers <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>

              {/* Functional Drinks */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <Leaf className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-serif text-2xl text-foreground mb-3">Functional and Adaptogenic Drinks</h3>
                <p className="text-muted-foreground mb-4">
                  An entirely new category that goes beyond replicating alcohol. Functional beverages use adaptogens (ashwagandha, reishi, lion's mane), nootropics (L-theanine, GABA), and plant compounds (kava, hemp) to deliver mood-altering effects: relaxation, social ease, focus, or calm.
                </p>
                <p className="text-muted-foreground mb-5">
                  Brands like Kin Euphorics, Hiyo, Curious Elixirs, and De Soi lead this space. These are not trying to taste like alcohol; they are creating something entirely new.
                </p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/collections/functional">Browse Functional Drinks <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Finding Nearby */}
        <section id="find-nearby" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img src={naBotanicalDark} alt="Monday Morning Bottle Shop interior with zero proof products" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Finding Zero Proof Alcohol Nearby</h2>
                <p className="text-muted-foreground mb-4">
                  If you are searching for "zero proof alcohol nearby," you have a few options depending on where you live. The landscape is changing fast, but dedicated non-alcoholic retail is still concentrated in major metro areas.
                </p>

                <div className="space-y-6 mt-6">
                  <div className="border-l-2 border-primary/40 pl-5">
                    <h3 className="font-medium text-foreground mb-1 flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Dedicated NA Bottle Shops</h3>
                    <p className="text-sm text-muted-foreground">The best option. Shops like Monday Morning Bottle Shop in San Diego specialize exclusively in zero proof beverages, with expert staff and tasting rooms. You get curation, guidance, and the ability to try before you buy.</p>
                  </div>
                  <div className="border-l-2 border-primary/40 pl-5">
                    <h3 className="font-medium text-foreground mb-1 flex items-center gap-2"><Search className="h-4 w-4 text-primary" /> Major Retailers</h3>
                    <p className="text-sm text-muted-foreground">Total Wine, BevMo, and some Whole Foods locations carry growing NA sections. Selection varies widely by location, and staff expertise on zero proof products is typically limited.</p>
                  </div>
                  <div className="border-l-2 border-primary/40 pl-5">
                    <h3 className="font-medium text-foreground mb-1 flex items-center gap-2"><GlassWater className="h-4 w-4 text-primary" /> Sober Bars and Alcohol-Free Events</h3>
                    <p className="text-sm text-muted-foreground">A growing number of cities now have sober bars or bars with dedicated zero proof menus. Alcohol-free events, tastings, and pop-ups are becoming more common. Check the Zero Proof Nation map for venues near you.</p>
                  </div>
                  <div className="border-l-2 border-primary/40 pl-5">
                    <h3 className="font-medium text-foreground mb-1 flex items-center gap-2"><ShoppingCart className="h-4 w-4 text-primary" /> Online Retailers</h3>
                    <p className="text-sm text-muted-foreground">If you cannot find zero proof alcohol nearby, online is your best bet. Monday Morning ships nationwide, and sites like The Zero Proof, Boisson, and Dry Atlas offer extensive online selections.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Store locations CTA */}
            <div className="mt-16 bg-card border border-border rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <p className="text-xs uppercase tracking-widest text-primary font-medium mb-3">San Diego's Zero Proof Destination</p>
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">Monday Morning Bottle Shop</h3>
                  <p className="text-muted-foreground mb-6">
                    Two tasting rooms in Pacific Beach and Ocean Beach with over 500 zero proof products. Try before you buy, get expert recommendations, and discover your new favorite alcohol-free drink.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Pacific Beach</p>
                        <p className="text-sm text-muted-foreground">1854 Garnet Ave, San Diego, CA 92109</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Ocean Beach</p>
                        <p className="text-sm text-muted-foreground">4967 Newport Ave, San Diego, CA 92107</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Mon-Sat 11am-8pm, Sun 11am-4pm</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="bg-ocean hover:bg-ocean/90 text-white rounded-full px-8">
                      <Link to="/locations">Get Directions <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                      <Link to="/shop">Shop Online</Link>
                    </Button>
                  </div>
                </div>
                <div className="relative min-h-[300px] md:min-h-0">
                  <img src={rooftopCheers} alt="Friends enjoying drinks at Monday Morning Bottle Shop" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mocktails and Dry Cocktails */}
        <section id="mocktails" className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Mocktails and Dry Cocktails</h2>
                <p className="text-muted-foreground mb-4">
                  The word "mocktail" is being replaced by "zero proof cocktail" or "dry cocktail" in many circles, and for good reason. Today's alcohol-free mixed drinks are not watered-down imitations. They are crafted with the same technique, balance, and presentation as their boozy counterparts.
                </p>
                <p className="text-muted-foreground mb-4">
                  Whether you are ordering at a sober bar, requesting something special at a craft cocktail lounge, or mixing at home, zero proof cocktails have arrived. The key is using quality zero proof spirits as your base instead of relying on juice and soda alone.
                </p>

                <h3 className="font-medium text-foreground mt-8 mb-4">Three Zero Proof Cocktails to Make at Home</h3>
                <div className="space-y-4">
                  <div className="bg-background rounded-xl p-5 border border-border">
                    <p className="font-serif text-lg text-foreground mb-2">Zero Proof Old Fashioned</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />2.5 oz Almave Ambar</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />0.25 oz simple syrup</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />3 dashes All The Bitter Aromatic Bitters</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />Orange peel, luxardo cherry</li>
                    </ul>
                    <ProductCard handle="almave-ambar" />
                  </div>

                  <div className="bg-background rounded-xl p-5 border border-border">
                    <p className="font-serif text-lg text-foreground mb-2">Zero Proof Gin and Tonic</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />2 oz Abstinence Cape Floral</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />4 oz premium tonic water</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />Cucumber, juniper berries, lime</li>
                    </ul>
                    <ProductCard handle="abstinence-spirits-cape-floral" />
                  </div>

                  <div className="bg-background rounded-xl p-5 border border-border">
                    <p className="font-serif text-lg text-foreground mb-2">Zero Proof Margarita</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />2 oz Almave Blanco</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />1 oz fresh lime juice</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />0.75 oz agave syrup, Tajin rim</li>
                    </ul>
                    <ProductCard handle="almave-blanco" />
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img src={naSpiritCocktail} alt="Zero proof cocktail being crafted at a bar" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Healthy Drink Alternatives */}
        <section id="healthy-alternatives" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] md:order-1">
                <img src={functionalWellness} alt="Healthy zero proof functional drinks" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="md:order-2">
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Healthy Drink Alternatives</h2>
                <p className="text-muted-foreground mb-4">
                  Choosing zero proof is not just about avoiding alcohol. It is about what you gain: better sleep, clearer skin, improved athletic performance, reduced anxiety, and sharper mental clarity. The health benefits of cutting alcohol are well documented, and zero proof drinks make the transition effortless.
                </p>

                <div className="space-y-6 mt-8">
                  <div className="bg-muted/50 rounded-xl p-5 border border-border">
                    <h3 className="font-medium text-foreground mb-2">Gluten-Free Beverages</h3>
                    <p className="text-sm text-muted-foreground">
                      Most zero proof spirits and wines are naturally gluten free. For beer lovers with gluten sensitivity, brands like Gruvi and Ground Breaker produce dedicated gluten-free NA beers. Functional drinks and seltzers are almost universally gluten free. We label gluten-free products clearly in our shop.
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-5 border border-border">
                    <h3 className="font-medium text-foreground mb-2">Low-Calorie Options</h3>
                    <p className="text-sm text-muted-foreground">
                      A standard cocktail contains 200-400 calories. Most zero proof alternatives contain under 100 calories, and many functional drinks clock in at 15-50 calories. If calorie reduction is a priority, switching to zero proof is one of the easiest wins available.
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-5 border border-border">
                    <h3 className="font-medium text-foreground mb-2">Non-Alcoholic Mixers</h3>
                    <p className="text-sm text-muted-foreground">
                      Premium non-alcoholic mixers from Portland Syrups, All The Bitter, and Fever-Tree elevate any zero proof drink. Quality bitters, syrups, and tonics are the secret to making zero proof cocktails that taste as complex as the originals.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <ProductCard handle="all-the-bitter-new-orleans-bitters" />
                  <ProductCard handle="portland-syrups-ginger" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Brands */}
        <section id="brands" className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Zero Alcohol Brands Worth Knowing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Not all zero proof brands are created equal. These are the ones we stock, recommend, and pour at our tasting rooms.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Abstinence Spirits", category: "Zero Proof Spirits", description: "South African botanical spirits using indigenous ingredients like African Wormwood and Cape Rose Geranium. Six distinct expressions covering gin, whiskey, and aperitif territory.", link: "/shop?search=abstinence" },
                { name: "Almave", category: "Agave Spirits", description: "Made from true Blue Agave in Jalisco, Mexico. Blanco and Ambar expressions deliver authentic tequila and reposado character without alcohol.", link: "/shop?search=almave" },
                { name: "Athletic Brewing", category: "Craft NA Beer", description: "The category leader in non-alcoholic craft beer. Their Run Wild IPA and Free Wave Hazy IPA are consistently rated among the best beers, period.", link: "/collections/na-beer" },
                { name: "All The Bitter", category: "NA Bitters", description: "Organic, functional bitters that work in zero proof cocktails. Their Aromatic, New Orleans, and Cherry Coffee Blast expressions are essential for any home bar.", link: "/shop?search=bitter" },
                { name: "Portland Syrups", category: "Premium Mixers", description: "Small-batch cocktail syrups made with whole ingredients in Oregon. Lavender, Ginger, Margarita, and more, each one designed for serious mixing.", link: "/shop?search=portland" },
                { name: "Kin Euphorics", category: "Functional", description: "Adaptogen and nootropic-infused beverages that create a mood shift without alcohol. Their Dream Light and Spritz expressions are designed for evening and social occasions.", link: "/collections/functional" },
              ].map((brand) => (
                <Link key={brand.name} to={brand.link} className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:border-primary/30">
                  <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">{brand.category}</p>
                  <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors">{brand.name}</h3>
                  <p className="text-sm text-muted-foreground">{brand.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pull quote */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative rounded-2xl overflow-hidden">
              <img src={gardenPartyToast} alt="Friends enjoying zero proof drinks at a social gathering" className="w-full h-64 md:h-80 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <p className="text-white text-lg md:text-xl font-serif max-w-2xl">
                  "The zero proof movement is not about giving something up. It is about choosing something better: better mornings, better health, better drinks."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Ready to Find Zero Proof Near You?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you visit our San Diego tasting rooms or shop our full catalog online, Monday Morning Bottle Shop is your destination for the best zero proof alcohol available. Over 500 products, expert curation, and a try-before-you-buy experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-ocean hover:bg-ocean/90 text-white rounded-full px-8">
                <Link to="/shop">Shop Zero Proof Online <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/locations">Visit Our Tasting Room</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ZeroProofNearby;
