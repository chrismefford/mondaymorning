import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Info, Wine, Beer, Martini, Leaf, MapPin, Search, Star, Heart, ShoppingCart, Clock, Sparkles, GlassWater, Flame, Sun, Users } from "lucide-react";
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
import wellnessRetreat from "@/assets/lifestyle/wellness-retreat-drinks.jpg";
import dinnerCheers from "@/assets/lifestyle/dinner-cheers-intimate.jpg";
import breweryPatio from "@/assets/lifestyle/brewery-patio-friends.jpg";
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
    question: "What are the best alcohol alternatives?",
    answer: "The best alcohol alternatives depend on what you enjoy. For cocktail lovers, non-alcoholic spirits from brands like Abstinence, Almave, and Seedlip make excellent substitutes. For beer drinkers, Athletic Brewing and Bravus produce craft NA beers that rival their alcoholic counterparts. For wine drinkers, dealcoholized wines from Leitz and Proxies retain varietal character. Functional drinks with adaptogens offer a completely new category with mood-enhancing effects."
  },
  {
    question: "Do alcohol alternatives give you a buzz?",
    answer: "Traditional NA beer, wine, and spirits do not produce a buzz since they contain little to no ethanol. However, functional alcohol alternatives use ingredients like kava, adaptogens (ashwagandha, reishi), and nootropics (L-theanine, GABA) to create relaxation, social ease, or mild euphoria without alcohol. Brands like Kin Euphorics, Curious Elixirs, and Hiyo are designed specifically for this purpose."
  },
  {
    question: "Are alcohol alternatives healthier than drinking?",
    answer: "Generally yes. Most alcohol alternatives are significantly lower in calories, contain no ethanol (which the WHO classifies as a Group 1 carcinogen), and many include functional ingredients like vitamins, adaptogens, and probiotics. Removing alcohol eliminates hangover effects, sleep disruption, and long-term liver impact. However, some NA drinks still contain sugar, so reading labels matters."
  },
  {
    question: "What is the mindful drinking movement?",
    answer: "Mindful drinking is a growing cultural shift where people make intentional, conscious choices about their alcohol consumption. It is not about total abstinence, it is about awareness. People who practice mindful drinking may reduce how often or how much they drink, choose alcohol alternatives for certain occasions, or simply pay more attention to how alcohol affects their body and mind."
  },
  {
    question: "What are alternatives to Alcoholics Anonymous?",
    answer: "Several evidence-based alternatives to AA exist, including SMART Recovery (cognitive behavioral approach), Moderation Management (for those who want to reduce rather than eliminate drinking), LifeRing Secular Recovery, Women for Sobriety, and Refuge Recovery (Buddhist-inspired). Many people also find success with individual therapy, medication-assisted treatment, and online communities like r/stopdrinking."
  },
  {
    question: "Where can I buy alcohol alternatives?",
    answer: "Dedicated non-alcoholic bottle shops like Monday Morning Bottle Shop in San Diego offer the widest, most curated selection with expert guidance and tasting rooms. Major retailers like Total Wine, Whole Foods, and some liquor stores carry growing NA sections. You can also shop online at mondaymorning-af.com for nationwide shipping."
  },
  {
    question: "What are the best non-alcoholic spirits brands?",
    answer: "Leading non-alcoholic spirit brands include Abstinence Spirits (South African botanicals with whiskey and gin alternatives), Almave (agave-based, from the creators of Clase Azul), Seedlip (the original NA spirit pioneer), Lyre's (broad range of spirit replicas), and Ritual Zero Proof (tequila and whiskey alternatives). Each brand takes a unique approach to flavor, so tasting multiple options is recommended."
  },
  {
    question: "Can you make good cocktails without alcohol?",
    answer: "Absolutely. Zero proof cocktails use non-alcoholic spirits, bitters, syrups, and fresh ingredients to create drinks with genuine complexity and depth. A well-made NA Negroni, zero proof Old Fashioned, or virgin Espresso Martini can be genuinely impressive. The key is using quality NA spirits rather than simply omitting alcohol from a traditional recipe."
  },
  {
    question: "What are natural relaxation drinks?",
    answer: "Natural relaxation drinks use plant-based compounds to promote calm without alcohol or pharmaceuticals. Common ingredients include kava (Pacific Island root that promotes relaxation), ashwagandha (adaptogenic herb for stress reduction), L-theanine (amino acid from green tea for calm focus), passionflower, chamomile, and CBD. These functional beverages represent one of the fastest-growing segments of the alcohol alternatives market."
  },
  {
    question: "Are non-alcoholic beers and wines really 0% alcohol?",
    answer: "Not always. In the US, 'non-alcoholic' legally means under 0.5% ABV, a trace amount comparable to ripe bananas or kombucha. Some products are labeled '0.0%' or 'alcohol-free,' which means no measurable alcohol. If complete abstinence is important to you, look for the 0.0% designation on the label. Most NA wines and beers fall in the 0.0% to 0.5% range."
  },
];

const faqSchema = generateFAQSchema(faqs);

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Explore the World of Alcohol Alternatives: 10 Creative Choices for Every Occasion",
  "description": "Discover the world of alcohol alternatives! Explore creative options and learn about non-alcoholic beers, wines, and mocktail recipes for every occasion.",
  "author": { "@type": "Organization", "name": "Monday Morning Bottle Shop" },
  "publisher": {
    "@type": "Organization",
    "name": "Monday Morning Bottle Shop",
    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/og-image.png` },
  },
  "datePublished": "2025-06-01",
  "dateModified": "2026-02-23",
  "mainEntityOfPage": `${SITE_URL}/alcohol-alternatives`,
  "image": `${SITE_URL}/og-image.png`,
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Alcohol Alternatives", url: `${SITE_URL}/alcohol-alternatives` },
]);

const tocSections = [
  { id: "understanding", label: "What Are They?" },
  { id: "beer-wine", label: "Beer & Wine" },
  { id: "mocktails", label: "Mocktails" },
  { id: "zero-proof-cocktails", label: "Zero Proof" },
  { id: "herbal-relaxation", label: "Herbal Drinks" },
  { id: "wellness", label: "Wellness" },
  { id: "celebrating", label: "Celebrating" },
  { id: "faqs", label: "FAQs" },
];

const AlcoholAlternatives = () => {
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
        title="Alcohol Alternatives: 10 Creative Choices for Every Occasion"
        description="Discover the world of alcohol alternatives! Explore creative options and learn about non-alcoholic beers, wines, and mocktail recipes for every occasion."
        path="/alcohol-alternatives"
        type="article"
        schema={[articleSchema, faqSchema, breadcrumbSchema, websiteSchema, localBusinessSchema]}
      />

      {/* Hero */}
      <div className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={gardenPartyToast} alt="Friends toasting with alcohol alternative drinks at a garden party" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
        <Header />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/60">
              <li><Link to="/" className="hover:text-white/80 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-white/90">Alcohol Alternatives</li>
            </ol>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Explore the World of Alcohol Alternatives
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            10 creative choices for every occasion, from zero proof cocktails and craft NA beer to functional wellness drinks and herbal relaxation beverages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-ocean hover:bg-ocean/90 text-white rounded-full px-8">
              <Link to="/shop">Shop Alcohol Alternatives <ArrowRight className="ml-2 h-4 w-4" /></Link>
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

        {/* Understanding Alcohol Alternatives */}
        <section id="understanding" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">What Are Alcohol Alternatives?</h2>
                <p className="text-muted-foreground mb-4">
                  Alcohol alternatives are beverages designed to replace traditional alcoholic drinks in flavor, ritual, and social context. They range from dealcoholized versions of beer, wine, and spirits to entirely new categories of functional drinks that use adaptogens, nootropics, and plant compounds to create relaxation or social ease without ethanol.
                </p>
                <p className="text-muted-foreground mb-4">
                  The category has grown from a niche curiosity into a mainstream movement. Sober curiosity, the practice of questioning your relationship with alcohol without committing to total abstinence, has become one of the defining wellness trends of the decade. More than half of US adults under 45 are actively moderating their alcohol intake, and the global market for alcohol alternatives is projected to exceed $13 billion.
                </p>
                <p className="text-muted-foreground mb-6">
                  The benefits of mindful drinking extend beyond health. Better sleep, sharper mornings, lower calorie intake, reduced anxiety, and more present social connections are consistently reported by people who switch to alcohol alternatives, even part-time.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img src={spiritBarCraft} alt="Bartender crafting an alcohol alternative cocktail" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>

            {/* The rise / sober curiosity callout */}
            <div className="mt-16 bg-muted/50 rounded-2xl p-8 md:p-12 border border-border">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary font-medium mb-3">The Sober Curiosity Movement</p>
                  <h3 className="font-serif text-2xl text-foreground mb-4">Why People Are Choosing Alcohol Alternatives</h3>
                  <p className="text-muted-foreground mb-4">
                    Sober curiosity is not about labeling yourself as sober or non-sober. It is about questioning the default role alcohol plays in socializing, celebrating, and unwinding. People are discovering that the best parts of a night out, connection, conversation, celebration, do not actually require ethanol.
                  </p>
                  <p className="text-muted-foreground">
                    The alcohol-free lifestyle is also driven by data. Studies consistently show that even moderate drinking disrupts sleep architecture, increases anxiety the following day (sometimes called "hangxiety"), and contributes to long-term health risks. Alcohol alternatives let you keep the ritual while removing the downside.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "52%", label: "Adults Reducing Intake" },
                    { value: "$13B+", label: "Global NA Market" },
                    { value: "315%", label: "NA Spirit Growth" },
                    { value: "500+", label: "Products We Carry" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center bg-card border border-border rounded-xl p-5">
                      <p className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Non-Alcoholic Beers and Wines */}
        <section id="beer-wine" className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Non-Alcoholic Beers and Wines</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The most accessible entry point into alcohol alternatives. Craft NA beer and dealcoholized wine have reached a quality level that surprises even skeptics.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* NA Beer */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <Beer className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-serif text-2xl text-foreground mb-3">Best Non-Alcoholic Beers</h3>
                <p className="text-muted-foreground mb-4">
                  Craft NA beer is the most mature segment of the alcohol alternatives market. Athletic Brewing, Bravus, Gruvi, and Partake produce IPAs, lagers, stouts, and wheat beers that are nearly indistinguishable from their alcoholic counterparts.
                </p>
                <p className="text-muted-foreground mb-5">
                  The technology behind NA beer has advanced dramatically: vacuum distillation, arrested fermentation, and lazy yeast strains all contribute to better flavor retention at 0.0% to 0.5% ABV. Most NA beers clock in under 100 calories per can, making them a compelling low-calorie drink alternative.
                </p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/collections/na-beer">Browse Non-Alcoholic Beers <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>

              {/* NA Wine */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <Wine className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-serif text-2xl text-foreground mb-3">Non-Alcoholic Wine Options</h3>
                <p className="text-muted-foreground mb-4">
                  Non-alcoholic wines are made from real wine grapes that undergo traditional fermentation before the alcohol is gently removed through vacuum distillation or reverse osmosis. The result preserves the tannin structure, acidity, and varietal character of the original wine.
                </p>
                <p className="text-muted-foreground mb-5">
                  Brands like Leitz, Proxies, Surely, and Giesen lead the category. Choosing your favorite comes down to the same principles as traditional wine: do you prefer reds or whites, dry or fruity, bold or delicate? Our staff can guide you through a tasting to find your match.
                </p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/collections/wine-alternatives">Browse Non-Alcoholic Wines <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Creative Mocktail Recipes */}
        <section id="mocktails" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img src={naTropicalMocktails} alt="Colorful mocktail recipes using alcohol alternatives" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Creative Mocktail Recipes</h2>
                <p className="text-muted-foreground mb-4">
                  Mocktails have evolved far beyond the Shirley Temple. Today's best mocktail recipes use non-alcoholic spirits, artisanal syrups, fresh herbs, and house-made bitters to create drinks with genuine depth and complexity. The key is treating the drink with the same intention and craft you would apply to any cocktail.
                </p>

                <h3 className="font-serif text-xl text-foreground mb-3 mt-6">Top 5 Mocktail Recipes to Try</h3>
                <div className="space-y-3 mb-6">
                  {[
                    { name: "Zero Proof Negroni", desc: "Equal parts NA gin alternative, NA aperitivo, and NA sweet vermouth over ice with an orange peel" },
                    { name: "Virgin Espresso Martini", desc: "NA coffee liqueur, cold brew, simple syrup, shaken hard with ice for a thick crema" },
                    { name: "Botanical Spritz", desc: "NA aperitivo, sparkling water, a splash of fresh grapefruit juice, served in a wine glass" },
                    { name: "Spiced Mule", desc: "NA spirit, fresh lime, ginger beer, and a dash of aromatic bitters in a copper mug" },
                    { name: "Garden Collins", desc: "NA gin, cucumber, elderflower syrup, lemon juice, topped with soda water" },
                  ].map((recipe) => (
                    <div key={recipe.name} className="bg-muted/50 rounded-xl p-4 border border-border">
                      <p className="font-medium text-foreground mb-1">{recipe.name}</p>
                      <p className="text-sm text-muted-foreground">{recipe.desc}</p>
                    </div>
                  ))}
                </div>

                <p className="text-muted-foreground mb-4">
                  Tips for crafting your own: start with a quality NA spirit as your base, always use fresh citrus, invest in good bitters and syrups, and do not skip the garnish. Presentation matters as much with mocktails as it does with cocktails.
                </p>

                <div className="space-y-3 mt-4">
                  <ProductCard handle="abstinence-spirits-cape-floral" />
                  <ProductCard handle="portland-syrups-rose-city" />
                </div>

                <Button asChild className="bg-ocean hover:bg-ocean/90 text-white rounded-full px-8 mt-6">
                  <Link to="/recipes">Browse All Recipes <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Zero Proof Cocktails */}
        <section id="zero-proof-cocktails" className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Exploring Zero Proof Cocktails</h2>
                <p className="text-muted-foreground mb-4">
                  Zero proof cocktails are drinks made entirely without alcohol that still deliver the complexity, ritual, and satisfaction of a well-crafted cocktail. Unlike a simple mocktail that might rely on juice and soda, a true zero proof cocktail uses alcohol-free spirits as its backbone.
                </p>

                <h3 className="font-serif text-xl text-foreground mb-3 mt-6">Best Alcohol-Free Spirits</h3>
                <p className="text-muted-foreground mb-5">
                  The non-alcoholic spirits market has exploded with options. Abstinence Spirits offers beautifully crafted South African botanicals in whiskey, gin, and aperitif styles. Almave, from the visionaries behind Clase Azul, delivers an authentic agave experience. Each brand takes a unique approach to flavor construction, from distilled botanicals to macerated herbs and spices.
                </p>

                <div className="space-y-3">
                  <ProductCard handle="abstinence-spirits-cape-spice" />
                  <ProductCard handle="almave-blanco" />
                  <ProductCard handle="abstinence-spirits-aperitif" />
                </div>

                <h3 className="font-serif text-xl text-foreground mb-3 mt-8">Popular Alcohol-Free Cocktails</h3>
                <div className="space-y-2">
                  {[
                    "Zero Proof Old Fashioned: NA whiskey alternative, bitters, orange peel, demerara syrup",
                    "NA Margarita: Agave-based NA spirit, fresh lime, agave nectar, tajin rim",
                    "Alcohol-Free Aperol Spritz: NA aperitivo, sparkling water, orange slice",
                    "Virgin Paloma: NA tequila alternative, grapefruit soda, lime, salt rim",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img src={naSpiritCocktail} alt="Zero proof cocktail made with alcohol-free spirits" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Herbal and Natural Relaxation Drinks */}
        <section id="herbal-relaxation" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img src={functionalWellness} alt="Natural relaxation drinks and herbal non-alcoholic beverages" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Herbal and Natural Relaxation Drinks</h2>
                <p className="text-muted-foreground mb-4">
                  For people searching for alcohol alternatives that actually help them relax, herbal and functional drinks represent the most exciting frontier. These beverages go beyond replicating the taste of alcohol, they aim to replicate (and improve upon) the feeling.
                </p>

                <h3 className="font-serif text-xl text-foreground mb-3 mt-6">What Are Herbal Non-Alcoholic Drinks?</h3>
                <p className="text-muted-foreground mb-4">
                  Herbal non-alcoholic drinks use plant-based compounds to promote specific states: calm, focus, social ease, or euphoria. Common ingredients include kava (a Pacific Island root used ceremonially for centuries), ashwagandha (an Ayurvedic adaptogen for stress reduction), L-theanine (the calming amino acid in green tea), and reishi mushroom (an adaptogen for immune support and relaxation).
                </p>

                <h3 className="font-serif text-xl text-foreground mb-3 mt-6">Popular Choices</h3>
                <div className="space-y-3 mb-6">
                  {[
                    { name: "Kava-Based Drinks", desc: "Genuine relaxation and social ease from the Pacific Island root. Look for noble kava varieties." },
                    { name: "Adaptogenic Tonics", desc: "Ashwagandha, reishi, and lion's mane blended into sparkling beverages for stress relief." },
                    { name: "CBD-Infused Beverages", desc: "Hemp-derived CBD in sparkling waters and tonics for calm without intoxication." },
                    { name: "Nootropic Elixirs", desc: "L-theanine and GABA combinations for focused calm and social confidence." },
                  ].map((item) => (
                    <div key={item.name} className="border-l-2 border-primary/40 pl-5">
                      <p className="font-medium text-foreground mb-1">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/collections/functional">Browse Functional Drinks <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Alternatives to Drinking + Community */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Alternatives to Drinking Alcohol</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Whether you are fully sober, sober-curious, or simply looking to drink less, a growing ecosystem of support, community, and experiences exists beyond the bottle.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-2xl p-8">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-serif text-xl text-foreground mb-3">Alternatives to Alcoholics Anonymous</h3>
                <p className="text-muted-foreground text-sm">
                  SMART Recovery uses cognitive-behavioral techniques. Moderation Management focuses on reducing intake rather than abstinence. LifeRing Secular Recovery and Refuge Recovery offer non-12-step paths. Online communities like r/stopdrinking and r/sobercurious provide anonymous peer support. The landscape of recovery has expanded far beyond a single approach.
                </p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-8">
                <Sparkles className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-serif text-xl text-foreground mb-3">Sober Social Events</h3>
                <p className="text-muted-foreground text-sm">
                  Alcohol-free events are no longer limited to recovery meetings. Sober raves, NA wine tastings, craft mocktail workshops, and dry happy hours are becoming mainstream in major cities. In San Diego, Monday Morning Bottle Shop hosts regular tasting events where you can sample the latest alcohol alternatives in a social, bar-like environment.
                </p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-8">
                <Heart className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-serif text-xl text-foreground mb-3">Mindful Alternatives to Traditional Drinking</h3>
                <p className="text-muted-foreground text-sm">
                  Mindful drinking does not require eliminating alcohol entirely. It might mean choosing an NA beer on weeknights, alternating drinks at a party, or replacing the after-work wind-down with a kava tonic or adaptogenic seltzer. The mindful drinking movement is about intentionality, not deprivation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Low-Calorie and Wellness Drinks */}
        <section id="wellness" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Low-Calorie and Wellness Drinks</h2>
                <p className="text-muted-foreground mb-4">
                  One of the most practical benefits of alcohol alternatives is the calorie reduction. A standard glass of wine contains 120-150 calories, a craft beer 180-250, and a cocktail can easily exceed 300. Most NA alternatives deliver the same experience at a fraction of the caloric cost.
                </p>

                <h3 className="font-serif text-xl text-foreground mb-3 mt-6">Top Low-Calorie Alcohol Alternatives</h3>
                <div className="space-y-2 mb-6">
                  {[
                    "NA Beer: typically 50-90 calories per can, versus 150-250 for regular craft beer",
                    "NA Wine: 20-50 calories per glass, versus 120-150 for traditional wine",
                    "Sparkling Water Cocktails: under 30 calories with bitters and citrus",
                    "Functional Seltzers: 15-40 calories with added adaptogens and botanicals",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-serif text-xl text-foreground mb-3 mt-6">Non-Alcoholic Mixers to Elevate Your Drinks</h3>
                <p className="text-muted-foreground mb-5">
                  Great mixers are the secret weapon of alcohol alternatives. Artisanal tonic waters, small-batch ginger beers, shrubs, and flavored syrups transform a simple NA spirit into a complex, satisfying drink. Investing in quality mixers makes the difference between a forgettable drink and one you genuinely crave.
                </p>

                <div className="space-y-3">
                  <ProductCard handle="portland-syrups-rose-city" />
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img src={wellnessRetreat} alt="Wellness drinks and low-calorie alcohol alternatives" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Celebrating With Alcohol Alternatives */}
        <section id="celebrating" className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img src={dinnerCheers} alt="Celebrating with alcohol-free beverages at dinner" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Celebrating With Alcohol Alternatives</h2>
                
                <h3 className="font-serif text-xl text-foreground mb-3">Pairing Food With Alcohol-Free Beverages</h3>
                <p className="text-muted-foreground mb-4">
                  Non-alcoholic wines pair with food using the same principles as traditional wine. A dealcoholized Sauvignon Blanc complements seafood and salads. An NA red with tannin structure stands up to grilled meats and aged cheeses. NA sparkling wine is the obvious choice for celebrations, toasts, and appetizer courses.
                </p>

                <h3 className="font-serif text-xl text-foreground mb-3 mt-6">Hosting a Mocktail Party</h3>
                <p className="text-muted-foreground mb-4">
                  Set up a build-your-own mocktail bar with 2-3 NA spirits, a selection of mixers (tonic, ginger beer, sparkling water), fresh citrus, herbs, and bitters. Pre-batch one signature mocktail for guests who want something ready-made. Presentation matters: use proper glassware, garnishes, and ice. Your guests will not miss the alcohol.
                </p>

                <h3 className="font-serif text-xl text-foreground mb-3 mt-6">Going Sober at Social Events</h3>
                <p className="text-muted-foreground mb-4">
                  Having a drink in your hand eliminates the "why aren't you drinking" conversation before it starts. Bring your own NA beer or pre-made mocktail, ask the bartender for a zero proof cocktail, or simply order a sparkling water with bitters and a lime. The alcohol-free lifestyle does not require announcing it.
                </p>

                <div className="space-y-3 mt-6">
                  <ProductCard handle="abstinence-spirits-epilogue-x" />
                  <ProductCard handle="almave-ambar" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Store CTA */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <p className="text-xs uppercase tracking-widest text-primary font-medium mb-3">San Diego's Alcohol Alternative Destination</p>
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">Monday Morning Bottle Shop</h3>
                  <p className="text-muted-foreground mb-6">
                    Two tasting rooms in Pacific Beach and Ocean Beach with over 500 alcohol alternatives. Try before you buy, get expert recommendations, and discover your new favorite drink.
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
                  <img src={poolsideFriends} alt="Friends enjoying alcohol alternatives at Monday Morning Bottle Shop" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Thoughts */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Embracing an Alcohol-Free Lifestyle</h2>
            <p className="text-muted-foreground mb-4">
              The world of alcohol alternatives is deeper, more creative, and more delicious than most people expect. Whether you are exploring sober curiosity for the first time, building a home bar stocked with zero proof spirits, or looking for natural relaxation drinks to replace your evening glass of wine, the options have never been better.
            </p>
            <p className="text-muted-foreground mb-8">
              The mindful drinking movement is not a trend. It is a permanent shift in how people think about alcohol, health, and socializing. Your journey with alcohol alternatives starts wherever you are, and every sip in a new direction counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-ocean hover:bg-ocean/90 text-white rounded-full px-8">
                <Link to="/shop">Explore Our Collection <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/new-to-non-alcoholic-drinks">New to Non-Alcoholic? Start Here</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faqs" className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-10 text-center">Frequently Asked Questions About Alcohol Alternatives</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default AlcoholAlternatives;
