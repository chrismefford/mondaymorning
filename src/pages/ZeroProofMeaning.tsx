import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Info, BookOpen, TrendingUp, Beaker, Users, ShieldCheck, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateFAQSchema, generateBreadcrumbSchema, websiteSchema, SITE_URL } from "@/lib/seo";

// Lifestyle images
import spiritBarCraft from "@/assets/lifestyle/spirit-bar-craft.jpg";
import naSpiritCocktail from "@/assets/lifestyle/na-spirit-cocktail.jpg";
import naTropicalMocktails from "@/assets/lifestyle/na-tropical-mocktails.jpg";
import rooftopCheers from "@/assets/lifestyle/rooftop-cheers.jpg";
import dinnerCheersIntimate from "@/assets/lifestyle/dinner-cheers-intimate.jpg";
import functionalWellness from "@/assets/lifestyle/functional-wellness-morning.jpg";
import breweryPatio from "@/assets/lifestyle/brewery-patio-friends.jpg";
import naWineCheers from "@/assets/lifestyle/na-wine-cheers.jpg";
import gardenPartyToast from "@/assets/lifestyle/garden-party-toast.jpg";
import beachSunsetCocktails from "@/assets/lifestyle/beach-sunset-cocktails.jpg";

// FAQs
const faqs = [
  {
    question: "What does zero proof mean?",
    answer: "Zero proof means a beverage contains no alcohol. The term refers to the alcohol proof scale, where zero proof equals 0% alcohol by volume. Zero proof drinks are crafted to replicate the complexity, flavor, and ritual of alcoholic beverages without any ethanol content."
  },
  {
    question: "Is zero proof the same as non-alcoholic?",
    answer: "They overlap but are not identical. Non-alcoholic beverages can legally contain up to 0.5% ABV in the United States. Zero proof typically implies 0.0% ABV, meaning absolutely no alcohol. Some brands use the terms interchangeably, so always check the label if total alcohol absence matters to you."
  },
  {
    question: "Can you get drunk from zero proof drinks?",
    answer: "No. Zero proof drinks contain no alcohol and cannot produce intoxication. Even non-alcoholic drinks at 0.5% ABV contain so little alcohol that it is metabolized faster than it can accumulate. For reference, ripe bananas and orange juice contain comparable trace alcohol levels."
  },
  {
    question: "Are zero proof drinks safe during pregnancy?",
    answer: "Drinks labeled 0.0% ABV contain no alcohol and are generally considered safe. However, drinks labeled non-alcoholic (up to 0.5% ABV) contain trace amounts. Consult your healthcare provider for personalized guidance."
  },
  {
    question: "Do zero proof drinks taste like alcohol?",
    answer: "The best ones absolutely do. Modern zero proof spirits, wines, and beers use advanced techniques like vacuum distillation, reverse osmosis, and botanical extraction to replicate familiar flavors. The category has improved dramatically since 2020, and many options are genuinely impressive."
  },
  {
    question: "Are zero proof drinks healthier than alcohol?",
    answer: "Yes, from a direct comparison standpoint. They contain no ethanol, which is classified as a Group 1 carcinogen. They typically have fewer calories, cause no liver stress, do not disrupt sleep architecture, and carry none of the addiction risks associated with alcohol."
  },
  {
    question: "Where can I buy zero proof drinks in San Diego?",
    answer: "Monday Morning Bottle Shop has the largest curated selection of zero proof drinks in San Diego. Visit our tasting rooms in Pacific Beach (1854 Garnet Ave) or Ocean Beach (4967 Newport Ave) to sample before you buy. We also ship online across most US states."
  },
  {
    question: "What is the best zero proof drink for beginners?",
    answer: "Start with what you already enjoy. If you love beer, try a non-alcoholic IPA or lager. If cocktails are your thing, a zero proof gin and tonic or old fashioned is a great entry point. If you want something entirely new, functional drinks with adaptogens or botanicals are an exciting place to start."
  },
  {
    question: "How are zero proof spirits made?",
    answer: "Zero proof spirits use several methods: botanical distillation (distilling herbs and spices without fermentation), reverse osmosis (removing alcohol from a finished spirit), vacuum distillation (evaporating alcohol at low temperatures to preserve flavor), and direct extraction (infusing botanicals into a non-alcoholic base)."
  },
  {
    question: "Are zero proof drinks expensive?",
    answer: "Prices vary, but most zero proof options are comparable to or slightly less expensive than their alcoholic equivalents. A bottle of zero proof gin typically runs $25 to $35. Non-alcoholic beer ranges from $8 to $15 per six-pack. When you factor in the health savings and eliminated hangover costs, the value equation is strong."
  }
];

const faqSchema = generateFAQSchema(faqs);

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Does Zero Proof Mean? The Complete Guide to Alcohol-Free & Non-Alcoholic Drinks",
  "description": "Learn what zero proof means, how it differs from non-alcoholic and alcohol-free, and explore the growing world of zero proof drinks. Complete 2026 guide.",
  "author": {
    "@type": "Organization",
    "name": "Monday Morning Bottle Shop",
    "url": SITE_URL
  },
  "publisher": {
    "@type": "Organization",
    "name": "Monday Morning Bottle Shop",
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/og-image.png`
    }
  },
  "datePublished": "2026-02-23",
  "dateModified": "2026-02-23",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${SITE_URL}/zero-proof-meaning`
  }
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Zero Proof Meaning", url: `${SITE_URL}/zero-proof-meaning` }
]);

// Comparison data
const comparisonData = [
  { label: "Legal ABV Limit", zeroProof: "0.0%", nonAlcoholic: "< 0.5%", alcoholFree: "0.0% (varies by region)" },
  { label: "Contains Any Alcohol", zeroProof: "No", nonAlcoholic: "Possibly trace amounts", alcoholFree: "No (in most markets)" },
  { label: "FDA Regulated Term", zeroProof: "No (industry term)", nonAlcoholic: "Yes", alcoholFree: "Varies by country" },
  { label: "Safe for Recovery", zeroProof: "Generally yes", nonAlcoholic: "Consult provider", alcoholFree: "Generally yes" },
  { label: "Common Usage", zeroProof: "Spirits, cocktails", nonAlcoholic: "Beer, wine", alcoholFree: "Wine, beer (EU/UK)" },
];

// Growth stats
const growthStats = [
  { stat: "$13B+", label: "Global NA Market Size (2026)" },
  { stat: "7x", label: "Category Growth Since 2018" },
  { stat: "41%", label: "US Adults Reducing Alcohol" },
  { stat: "500+", label: "NA Brands Launched Since 2020" },
];

// Proof scale data
const proofScale = [
  { proof: "0", abv: "0%", example: "Zero proof spirits, 0.0% beer", color: "bg-gold" },
  { proof: "1", abv: "0.5%", example: "Non-alcoholic beer (legal limit)", color: "bg-gold/70" },
  { proof: "10", abv: "5%", example: "Standard beer", color: "bg-forest/30" },
  { proof: "24-30", abv: "12-15%", example: "Wine", color: "bg-forest/50" },
  { proof: "80", abv: "40%", example: "Vodka, whiskey, gin", color: "bg-forest/70" },
  { proof: "151", abv: "75.5%", example: "Overproof rum", color: "bg-forest" },
];

// Table of contents
const tocItems = [
  { id: "what-zero-proof-means", label: "What It Means" },
  { id: "origin-of-proof", label: "Origin of Proof" },
  { id: "comparison", label: "Zero Proof vs NA vs AF" },
  { id: "growth", label: "Why It's Growing" },
  { id: "types", label: "Types of Drinks" },
  { id: "who-its-for", label: "Who It's For" },
  { id: "how-theyre-made", label: "How They're Made" },
  { id: "ordering", label: "How to Order" },
  { id: "myths", label: "Common Myths" },
  { id: "getting-started", label: "Getting Started" },
  { id: "best-to-try", label: "Best to Try" },
  { id: "faq", label: "FAQs" },
];

const ZeroProofMeaning = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="What Does Zero Proof Mean? Complete Guide to Alcohol-Free Drinks"
        description="Learn what zero proof means, how it differs from non-alcoholic and alcohol-free, types of zero proof drinks, and how to start. The definitive 2026 guide."
        path="/zero-proof-meaning"
        type="article"
        schema={[faqSchema, articleSchema, breadcrumbSchema, websiteSchema]}
      />

      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-forest py-20 lg:py-28 overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div className="absolute inset-0">
            <img
              src={spiritBarCraft}
              alt="Zero proof cocktails crafted at a premium bar"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 block">
                The Definitive Guide
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight">
                What Does Zero Proof Mean?
              </h1>
              <p className="font-sans text-lg text-cream/80 max-w-2xl mb-4 leading-relaxed">
                Zero proof has become one of the most talked-about terms in the beverage world. Whether you are sober-curious, health-focused, or simply want a better drink without the consequences, this guide covers everything you need to know about zero proof drinks in 2026.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/shop">
                  <Button size="lg" className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 bg-gold text-forest-deep hover:bg-gold/90">
                    Shop Zero Proof Drinks
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/locations">
                  <Button variant="outline" size="lg" className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 border-2 border-cream/30 text-cream bg-transparent hover:bg-cream/10">
                    Visit Our Tasting Room
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents - Sticky */}
        <nav className="sticky top-16 z-30 bg-cream border-b border-forest/10 shadow-sm" aria-label="Table of contents">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`font-sans text-[11px] font-medium uppercase tracking-wider whitespace-nowrap px-3 py-1.5 rounded-full transition-colors ${
                    activeSection === item.id
                      ? "bg-forest text-cream"
                      : "text-forest/60 hover:text-forest hover:bg-forest/5"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Section 1: What Zero Proof Actually Means */}
        <section id="what-zero-proof-means" className="py-16 lg:py-24 bg-cream scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-3">
                <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                  What "Zero Proof" Actually Means
                </h2>
                <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                  <p>
                    Zero proof means a drink contains absolutely no alcohol. The term comes directly from the alcohol proof system, where "proof" is a measurement of ethanol content. A drink at zero proof has zero ethanol. No alcohol at all.
                  </p>
                  <p>
                    The phrase gained traction as the non-alcoholic beverage category evolved beyond simple sodas and juices. As brands began creating sophisticated spirits, wines, and cocktails without alcohol, they needed language that communicated the same complexity and intentionality as their alcoholic counterparts. "Zero proof" became that language.
                  </p>
                  <p>
                    Unlike "mocktail," which can feel dismissive, or "virgin," which defines a drink by what it lacks, "zero proof" defines a drink by what it is: a full-flavored, thoughtfully crafted beverage at zero proof on the alcohol scale.
                  </p>

                  {/* Callout */}
                  <div className="flex gap-4 bg-gold/10 border-l-4 border-gold p-5 my-6">
                    <Info className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans text-sm font-semibold text-forest mb-1">Key Definition</p>
                      <p className="font-sans text-sm text-foreground/70">
                        Zero proof = 0.0% ABV. No ethanol whatsoever. This distinguishes it from "non-alcoholic," which can legally contain up to 0.5% ABV in the US.
                      </p>
                    </div>
                  </div>

                  <p>
                    The distinction matters. For people in recovery, during pregnancy, or with certain medical conditions, the difference between 0.0% and 0.5% can be significant. Zero proof removes any ambiguity.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2 relative hidden lg:block">
                <img
                  src={naSpiritCocktail}
                  alt="Elegantly crafted zero proof cocktail in a coupe glass"
                  className="w-full h-[420px] object-cover border-2 border-forest/10"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Origin of Proof */}
        <section id="origin-of-proof" className="py-16 lg:py-24 bg-background scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-5 w-5 text-gold" />
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold">History</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                The Origin of "Proof" in Alcohol
              </h2>
              <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  The concept of "proof" dates back to 16th-century England, where sailors and soldiers were paid partially in rum. To verify they were not being cheated with watered-down spirits, they would soak gunpowder in the liquor and attempt to ignite it. If it burned, the spirit was "proven" to contain sufficient alcohol. If it did not, the spirit was "under proof."
                </p>
                <p>
                  This crude test roughly corresponded to about 57% alcohol by volume. The British set this as 100 degrees proof. The American system simplified it: proof equals twice the ABV percentage. So 80 proof equals 40% ABV, 100 proof equals 50% ABV, and zero proof equals 0% ABV.
                </p>
                <p>
                  Understanding this history makes the term "zero proof" more intuitive. It is not marketing jargon. It is a precise position on a centuries-old measurement scale, one that happens to sit at the very bottom: no alcohol, full stop.
                </p>
              </div>

              {/* Proof Scale Infographic */}
              <div className="mt-12 bg-cream border-2 border-forest/10 p-6 lg:p-8">
                <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-forest mb-6">The Alcohol Proof Scale</h3>
                <div className="space-y-3">
                  {proofScale.map((item) => (
                    <div key={item.proof} className="flex items-center gap-4">
                      <div className={`w-16 text-center py-2 ${item.color} text-cream font-sans text-xs font-bold`}>
                        {item.proof}°
                      </div>
                      <div className="flex-1">
                        <span className="font-sans text-sm font-semibold text-forest">{item.abv} ABV</span>
                        <span className="font-sans text-sm text-foreground/60 ml-3">{item.example}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="font-sans text-xs text-foreground/50 mt-4 italic">
                  US proof system: proof = 2x ABV percentage
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Comparison */}
        <section id="comparison" className="py-16 lg:py-24 bg-cream scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
                Zero Proof vs Non-Alcoholic vs Alcohol-Free
              </h2>
              <p className="font-sans text-base text-foreground/70 mb-10 leading-relaxed">
                These three terms are often used interchangeably, but they have distinct meanings depending on the market, the regulatory framework, and the specific product.
              </p>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-forest text-cream">
                      <th className="font-sans text-xs font-bold uppercase tracking-wider text-left p-4 border border-forest/20"> </th>
                      <th className="font-sans text-xs font-bold uppercase tracking-wider text-center p-4 border border-forest/20">Zero Proof</th>
                      <th className="font-sans text-xs font-bold uppercase tracking-wider text-center p-4 border border-forest/20">Non-Alcoholic</th>
                      <th className="font-sans text-xs font-bold uppercase tracking-wider text-center p-4 border border-forest/20">Alcohol-Free</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? "bg-background" : "bg-cream"}>
                        <td className="font-sans text-sm font-semibold text-forest p-4 border border-forest/10">{row.label}</td>
                        <td className="font-sans text-sm text-foreground/70 text-center p-4 border border-forest/10">{row.zeroProof}</td>
                        <td className="font-sans text-sm text-foreground/70 text-center p-4 border border-forest/10">{row.nonAlcoholic}</td>
                        <td className="font-sans text-sm text-foreground/70 text-center p-4 border border-forest/10">{row.alcoholFree}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  In the United States, the FDA defines "non-alcoholic" as containing less than 0.5% ABV. This is a legal threshold, not a marketing term. Products like non-alcoholic beer or non-alcoholic wine can contain trace amounts of alcohol and still be labeled non-alcoholic.
                </p>
                <p>
                  "Alcohol-free" is used more commonly in Europe and the UK, where it generally means 0.0% ABV. In the US, the term is less regulated and is sometimes used interchangeably with non-alcoholic.
                </p>
                <p>
                  "Zero proof" is an industry and consumer term, not a legal classification. It has become the preferred descriptor for sophisticated non-alcoholic spirits and cocktails, carrying a connotation of craftsmanship and intentionality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Growth */}
        <section id="growth" className="py-16 lg:py-24 bg-forest text-cream scroll-mt-28 relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-5 w-5 text-gold" />
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold">Industry Trends</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-8">
                Why Zero Proof Drinks Are Growing So Fast
              </h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {growthStats.map((item) => (
                  <div key={item.label} className="bg-cream/5 border border-cream/15 p-5 text-center">
                    <p className="font-serif text-3xl lg:text-4xl text-gold mb-2">{item.stat}</p>
                    <p className="font-sans text-xs text-cream/70 uppercase tracking-wider">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-5 font-sans text-base text-cream/80 leading-relaxed">
                <p>
                  The non-alcoholic beverage market has grown from a niche curiosity to a multi-billion dollar global category. The growth is driven by converging cultural, health, and generational shifts that show no signs of reversing.
                </p>
                <p>
                  Gen Z drinks significantly less alcohol than any generation before them. Millennials are actively moderating their consumption. The "sober curious" movement has gone mainstream. Social media has amplified awareness of alcohol's health impacts, and the World Health Organization's 2023 declaration that no level of alcohol consumption is safe accelerated the conversation.
                </p>
                <p>
                  On the supply side, innovation has caught up with demand. Brands like Athletic Brewing, Lyre's, Seedlip, Monday, and Ritual Zero Proof have proven that alcohol-free drinks can be genuinely excellent. The quality gap that once defined the category has largely closed.
                </p>
                <p>
                  Dry January, which started as a novelty, has become a global movement. Sober October follows it. "Damp drinking," the practice of intentionally reducing alcohol consumption without eliminating it entirely, has become its own recognized lifestyle. All of these trends feed the demand for zero proof options.
                </p>
              </div>

              <div className="mt-10">
                <Link to="/shop">
                  <Button className="font-sans text-sm font-bold uppercase tracking-widest bg-gold text-forest-deep hover:bg-gold/90 px-8 py-6">
                    Explore Our Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Types of Zero Proof Drinks */}
        <section id="types" className="py-16 lg:py-24 bg-cream scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
                Types of Zero Proof Drinks
              </h2>
              <p className="font-sans text-base text-foreground/70 mb-12 leading-relaxed max-w-3xl">
                The zero proof category now spans every major beverage type. Each has its own production methods, flavor profiles, and best uses.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Non-Alcoholic Beer",
                    desc: "Brewed like traditional beer, then dealcoholized or fermented to minimal alcohol. The most mature category in the zero proof space, with hundreds of options spanning lagers, IPAs, stouts, wheat beers, sours, and more. Athletic Brewing proved that NA beer could compete directly with craft beer on flavor.",
                    cta: "Shop NA Beer",
                    link: "/collections/na-beer",
                    image: breweryPatio
                  },
                  {
                    title: "Non-Alcoholic Wine",
                    desc: "Made from real wine grapes, vinified traditionally, then dealcoholized through vacuum distillation or reverse osmosis. The best NA wines preserve varietal character, acidity, and mouthfeel. Reds, whites, rosés, and sparkling options are all available. The category is improving rapidly.",
                    cta: "Shop NA Wine",
                    link: "/collections/na-wine",
                    image: naWineCheers
                  },
                  {
                    title: "Zero Proof Spirits",
                    desc: "Designed to replace gin, whiskey, rum, tequila, and other spirits in cocktails. Made through botanical distillation, extraction, or blending. These are the backbone of zero proof mixology, allowing bartenders and home enthusiasts to make familiar cocktails without alcohol.",
                    cta: "Shop NA Spirits",
                    link: "/collections/spirits",
                    image: naSpiritCocktail
                  },
                  {
                    title: "Functional & Adaptogenic Drinks",
                    desc: "A newer category that goes beyond flavor replication. These drinks use ingredients like kava, ashwagandha, L-theanine, CBD, reishi, and other adaptogens to create actual physiological effects: relaxation, focus, mood elevation, or stress reduction, without alcohol.",
                    cta: "Shop Functional Drinks",
                    link: "/collections/functional",
                    image: functionalWellness
                  },
                ].map((type) => (
                  <div key={type.title} className="border-2 border-forest/10 bg-background overflow-hidden group">
                    <div className="h-52 overflow-hidden">
                      <img
                        src={type.image}
                        alt={type.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl text-forest mb-3">{type.title}</h3>
                      <p className="font-sans text-sm text-foreground/70 leading-relaxed mb-4">{type.desc}</p>
                      <Link to={type.link}>
                        <Button variant="outline" size="sm" className="font-sans text-xs font-bold uppercase tracking-widest border-forest text-forest hover:bg-forest hover:text-cream">
                          {type.cta}
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Who Zero Proof Is For */}
        <section id="who-its-for" className="py-16 lg:py-24 bg-background scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-5 w-5 text-gold" />
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold">For Everyone</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                  Who Zero Proof Drinks Are For
                </h2>
                <p className="font-sans text-base text-foreground/80 mb-6 leading-relaxed">
                  The short answer: everyone. Zero proof is not a niche for people who "can't" drink. It is a choice category for people who prefer not to, whether permanently, temporarily, or situationally.
                </p>
                <ul className="space-y-4">
                  {[
                    { group: "The Sober Curious", why: "Exploring what life looks and feels like with less or no alcohol, without labeling it." },
                    { group: "Athletes & Fitness-Focused", why: "Alcohol impairs recovery, sleep quality, and performance. Zero proof eliminates all of it." },
                    { group: "Health-Conscious Drinkers", why: "Fewer calories, no carcinogen exposure, no liver stress, better sleep architecture." },
                    { group: "Designated Drivers", why: "Full participation in the social ritual without compromise on safety." },
                    { group: "Pregnant & Nursing Parents", why: "0.0% options provide absolute certainty. No ambiguity, no risk." },
                    { group: "People in Recovery", why: "Familiar flavors and rituals without triggering relapse. A powerful tool for social integration." },
                    { group: "Professionals Who Need Clarity", why: "Mornings matter. Zero proof means never sacrificing tomorrow for tonight." },
                  ].map((item) => (
                    <li key={item.group} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-sans text-sm font-semibold text-forest block">{item.group}</span>
                        <span className="font-sans text-sm text-foreground/70">{item.why}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative hidden lg:block">
                <img
                  src={rooftopCheers}
                  alt="Friends toasting with zero proof drinks on a rooftop"
                  className="w-full h-[540px] object-cover border-2 border-forest/10"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: How They're Made */}
        <section id="how-theyre-made" className="py-16 lg:py-24 bg-cream scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Beaker className="h-5 w-5 text-gold" />
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold">Production</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                How Zero Proof Drinks Are Made
              </h2>
              <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  There is no single method for creating zero proof drinks. Different product types use different techniques, and the choice of method significantly affects the final flavor profile.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mt-10">
                {[
                  { method: "Vacuum Distillation", desc: "Alcohol evaporates at a lower temperature under vacuum pressure. This preserves delicate flavor compounds that would be destroyed at higher temperatures. Used primarily for wines and spirits." },
                  { method: "Reverse Osmosis", desc: "The liquid is forced through a membrane that separates alcohol from water and flavor compounds. The alcohol is discarded, and the flavor-concentrated water is recombined. Common in wine dealcoholization." },
                  { method: "Arrested Fermentation", desc: "Fermentation is stopped before significant alcohol develops. Used in some beers and ciders. Produces a sweeter profile since less sugar has been converted." },
                  { method: "Botanical Distillation", desc: "Herbs, spices, and botanicals are distilled or extracted without any fermentation step. No alcohol is ever created. This is how most zero proof spirits (like Seedlip) are made." },
                  { method: "Simulated Fermentation", desc: "Uses enzymes and controlled processes to create fermentation-like flavors without producing alcohol. A newer technique that is producing increasingly convincing results." },
                  { method: "Direct Blending", desc: "Botanical extracts, natural flavors, and functional ingredients are blended to create a desired flavor profile from scratch. Used in functional drinks, adaptogens, and some RTD cocktails." },
                ].map((item) => (
                  <div key={item.method} className="border-2 border-forest/10 bg-background p-6">
                    <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-gold mb-2">{item.method}</h3>
                    <p className="font-sans text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: How to Order */}
        <section id="ordering" className="py-16 lg:py-24 bg-background scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-2 relative hidden lg:block">
                <img
                  src={dinnerCheersIntimate}
                  alt="Couple enjoying zero proof drinks at a restaurant"
                  className="w-full h-[420px] object-cover border-2 border-forest/10"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-gold/30 -z-10" />
              </div>
              <div className="lg:col-span-3">
                <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                  How to Order Zero Proof at Bars and Restaurants
                </h2>
                <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                  <p>
                    Ordering zero proof drinks in public has gotten dramatically easier, but it still helps to know what to say. Here is a practical approach that works in any setting.
                  </p>
                  <p>
                    Ask directly: "Do you have a non-alcoholic menu?" or "What zero proof options do you carry?" Most decent bars now have at least a few NA beers and can make a mocktail. Better establishments have full zero proof cocktail programs.
                  </p>
                  <p>
                    If there is no dedicated menu, ask the bartender to make a specific drink without alcohol. A gin and tonic becomes a tonic with lime and bitters. An old fashioned becomes a bitters-forward zero proof old fashioned. Most experienced bartenders can adapt.
                  </p>
                  <p>
                    Do not apologize for ordering zero proof. Do not over-explain. A confident "I will have the non-alcoholic IPA" is all you need. The culture has shifted enough that most servers will not blink.
                  </p>

                  {/* Pull Quote */}
                  <blockquote className="border-l-4 border-gold pl-6 py-2 my-8">
                    <p className="font-serif text-xl text-forest italic leading-relaxed">
                      "The best zero proof experience feels exactly like ordering a craft cocktail. Same attention, same glassware, same respect."
                    </p>
                  </blockquote>

                  <p>
                    If you are in San Diego, Monday Morning is the easiest place to explore zero proof. Our tasting rooms let you sample anything before committing, and our staff can guide you based on your flavor preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Common Myths */}
        <section id="myths" className="py-16 lg:py-24 bg-forest text-cream scroll-mt-28 relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="h-5 w-5 text-gold" />
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold">Myth Busting</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-10">
                Common Myths About Zero Proof Drinks
              </h2>

              <div className="space-y-6">
                {[
                  {
                    myth: "Zero proof drinks taste bad",
                    reality: "This was true a decade ago. It is not true in 2026. The best zero proof beers, wines, and spirits are genuinely impressive. Blind tastings regularly demonstrate that experienced drinkers cannot reliably distinguish top NA products from their alcoholic counterparts."
                  },
                  {
                    myth: "Zero proof is just for people who can't drink",
                    reality: "The majority of zero proof consumers also drink alcohol. They choose zero proof situationally: weeknight dinners, workday lunches, fitness-focused periods, pregnancy, medication interactions, or simply because they want a lighter evening. It is a choice, not a limitation."
                  },
                  {
                    myth: "Non-alcoholic beer still gets you drunk",
                    reality: "Impossible. Even at 0.5% ABV, you would need to drink roughly 10 non-alcoholic beers in under an hour to approach the alcohol content of a single regular beer. Your body metabolizes trace alcohol faster than you can consume it at that concentration."
                  },
                  {
                    myth: "Zero proof drinks are just expensive juice",
                    reality: "Zero proof spirits are made through distillation, extraction, and careful blending. NA beer is brewed and then dealcoholized. NA wine starts as real wine. These are not fruit drinks in fancy bottles. They are technically complex products that require significant expertise to produce."
                  },
                  {
                    myth: "Ordering zero proof is awkward",
                    reality: "The culture has shifted. In 2026, ordering a non-alcoholic drink is no more remarkable than ordering a decaf coffee. If anyone makes it awkward, that says more about them than about your choice."
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-cream/5 border border-cream/10 p-6">
                    <p className="font-sans text-sm font-bold text-gold uppercase tracking-wider mb-2">Myth: {item.myth}</p>
                    <p className="font-sans text-sm text-cream/80 leading-relaxed">{item.reality}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Getting Started */}
        <section id="getting-started" className="py-16 lg:py-24 bg-cream scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                How to Start Drinking Zero Proof
              </h2>
              <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  You do not need to overhaul your life. Start with one simple swap. The next time you would normally reach for a beer, try a non-alcoholic IPA. The next time you would order a cocktail, ask for a zero proof version. See how it feels. That is all the starting you need.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-5 my-10">
                {[
                  { step: "01", action: "Match your taste", detail: "Love IPAs? Start with NA IPAs. Love gin and tonics? Start with a zero proof gin. Start with what is familiar." },
                  { step: "02", action: "Stock your fridge", detail: "Having great options at home makes the swap effortless. You will not reach for alcohol if something better is already cold." },
                  { step: "03", action: "Sample before buying", detail: "Visit our San Diego tasting rooms to try anything before committing. Taste is personal, and exploration is part of the fun." },
                ].map((step) => (
                  <div key={step.step} className="border-2 border-forest/10 bg-background p-5">
                    <p className="font-sans text-xs font-bold text-gold uppercase tracking-widest mb-2">{step.step}</p>
                    <p className="font-sans text-sm font-semibold text-forest mb-2">{step.action}</p>
                    <p className="font-sans text-sm text-foreground/70 leading-relaxed">{step.detail}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  A few practical tips: drink zero proof drinks from proper glassware. Presentation matters, and your brain registers the experience differently when you are drinking from a wine glass versus a plastic cup. Chill everything properly. Garnish as you would any cocktail. The ritual matters as much as the liquid.
                </p>
                <p>
                  Do not announce it unless you want to. You are not required to explain your choices to anyone. If someone asks, "I am trying something new" is a complete answer.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/shop">
                  <Button className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6">
                    Shop Zero Proof Drinks
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/new-to-non-alcoholic-drinks">
                  <Button variant="outline" className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-forest text-forest hover:bg-forest hover:text-cream px-8 py-6">
                    Beginner's Guide
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Best to Try */}
        <section id="best-to-try" className="py-16 lg:py-24 bg-background scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
                Best Zero Proof Drinks to Try First
              </h2>
              <p className="font-sans text-base text-foreground/70 mb-10 leading-relaxed max-w-3xl">
                If you are new to zero proof, these categories offer the most accessible and rewarding starting points. Each one delivers a genuine drinking experience without compromise.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Start with NA Beer",
                    desc: "The most approachable entry point. Athletic Brewing's Run Wild IPA or Upside Dawn Golden Ale are universally liked. If you enjoy beer at all, you will enjoy these.",
                    link: "/collections/na-beer",
                    image: breweryPatio
                  },
                  {
                    title: "Try a Zero Proof Cocktail",
                    desc: "Pick your favorite cocktail and make it zero proof. A Ritual Zero Proof Whiskey in an old fashioned. A Lyre's Dry London in a G&T. The experience translates beautifully.",
                    link: "/collections/spirits",
                    image: naSpiritCocktail
                  },
                  {
                    title: "Explore Functional Drinks",
                    desc: "If you want an actual effect, try a kava drink for relaxation or an adaptogenic tonic for focus. This is where zero proof gets genuinely innovative.",
                    link: "/collections/functional",
                    image: functionalWellness
                  },
                  {
                    title: "Sample NA Wine",
                    desc: "Sparkling NA wines are often the easiest entry point in this category. The effervescence and acidity make them immediately satisfying. Still reds and whites are improving rapidly.",
                    link: "/collections/na-wine",
                    image: naWineCheers
                  },
                  {
                    title: "Ready-to-Drink Options",
                    desc: "Pre-mixed NA cocktails and canned mocktails are perfect for convenience. Grab a few cans, chill them, and you have an instant zero proof bar.",
                    link: "/collections/ready-to-drink",
                    image: beachSunsetCocktails
                  },
                  {
                    title: "Visit Our Tasting Room",
                    desc: "The best way to start is to taste. Come to Monday Morning in Pacific Beach or Ocean Beach and sample anything that interests you. Our team will guide your selections.",
                    link: "/locations",
                    image: gardenPartyToast
                  },
                ].map((item) => (
                  <Link to={item.link} key={item.title} className="group">
                    <div className="border-2 border-forest/10 bg-cream overflow-hidden h-full transition-shadow hover:shadow-lg">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-sans text-sm font-bold text-forest mb-2">{item.title}</h3>
                        <p className="font-sans text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 lg:py-24 bg-cream scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="h-5 w-5 text-gold" />
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold">FAQs</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10">
                Zero Proof Drinks: Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-background border-2 border-forest/10 px-6">
                    <AccordionTrigger className="font-sans text-sm font-semibold text-forest text-left hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-sm text-foreground/70 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-20 bg-gold">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
              Ready to Go Zero Proof?
            </h2>
            <p className="font-sans text-forest/70 mb-8 max-w-lg mx-auto">
              Explore 500+ non-alcoholic drinks at Monday Morning Bottle Shop. Shop online or visit our San Diego tasting rooms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shop">
                <Button size="lg" className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-10 py-6">
                  Shop Zero Proof Drinks
                </Button>
              </Link>
              <Link to="/locations">
                <Button variant="outline" size="lg" className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-forest text-forest hover:bg-forest hover:text-cream px-10 py-6">
                  Visit Our Tasting Room
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ZeroProofMeaning;
