import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Info, AlertTriangle, HelpCircle, Percent, Wine, Beer, Martini, Leaf } from "lucide-react";
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
import beachSunsetCocktails from "@/assets/lifestyle/beach-sunset-cocktails.jpg";
import upscaleBarToast from "@/assets/lifestyle/upscale-bar-toast.jpg";
import functionalWellness from "@/assets/lifestyle/functional-wellness-morning.jpg";
import poolsideFriends from "@/assets/lifestyle/poolside-friends-drinks.jpg";
import gardenPartyToast from "@/assets/lifestyle/garden-party-toast.jpg";
import naWineCheers from "@/assets/lifestyle/na-wine-cheers.jpg";

// FAQs
const faqs = [
  {
    question: "What percentage of alcohol is in a Cutwater?",
    answer: "Cutwater canned cocktails typically range from 5% to 12.5% ABV depending on the variety. Their margaritas and tequila-based drinks run around 12.5%, while lighter options like the Rum Mint Mojito sit around 5.9%. Most of their popular cocktails fall in the 7% to 10% range."
  },
  {
    question: "How many shots are in a Cutwater can?",
    answer: "A standard 12 oz Cutwater can at 7% ABV contains roughly the equivalent of 1 to 1.5 standard shots of liquor. Their stronger varieties at 12.5% ABV can contain the equivalent of about 2 shots. This is significantly more alcohol than a standard beer."
  },
  {
    question: "Are Cutwater drinks stronger than beer?",
    answer: "Yes, most Cutwater cocktails are stronger than a standard beer. Regular beer averages 5% ABV, while most Cutwater varieties range from 7% to 12.5% ABV. Even their lighter options are comparable to a strong craft beer."
  },
  {
    question: "Are Cutwater cocktails gluten free?",
    answer: "Not all Cutwater products are gluten free. Their vodka-based and tequila-based cocktails are generally gluten free, but their whiskey-based drinks and any malt-based products contain gluten. Always check individual product labels if you have a gluten sensitivity or celiac disease."
  },
  {
    question: "Are Lime Cutwaters strong?",
    answer: "Cutwater's lime-flavored varieties, like the Lime Margarita, are among their stronger options at around 12.5% ABV, which is more than double a standard beer. If you are looking for a lighter alternative, non-alcoholic margarita options deliver the same lime-forward flavor without any alcohol."
  },
  {
    question: "What is a good non-alcoholic alternative to Cutwater?",
    answer: "Several excellent zero proof canned cocktails replicate the convenience and flavor of Cutwater without the alcohol. Brands like Curious Elixirs, Ghia, and Free Spirits offer ready-to-drink options. Monday Morning Bottle Shop carries a wide selection of NA canned cocktails in our San Diego tasting rooms and online shop."
  },
  {
    question: "Can you buy non-alcoholic canned cocktails that taste like Cutwater?",
    answer: "Yes. The non-alcoholic ready-to-drink category has grown significantly, with options that replicate margaritas, mojitos, gin and tonics, and more. Many are designed to match the flavor complexity of alcoholic canned cocktails while containing 0.0% ABV."
  },
  {
    question: "Is it healthier to drink non-alcoholic cocktails instead of Cutwater?",
    answer: "From a health standpoint, non-alcoholic cocktails eliminate the risks associated with ethanol, which is classified as a Group 1 carcinogen. They are typically lower in calories, do not disrupt sleep, and cause no liver stress. A single Cutwater can at 12.5% ABV contains roughly 250 to 300 calories, while most NA alternatives contain under 100."
  },
  {
    question: "Where can I find non-alcoholic alternatives to canned cocktails in San Diego?",
    answer: "Monday Morning Bottle Shop has the largest curated selection of non-alcoholic drinks in San Diego, including NA canned cocktails, zero proof spirits, NA beer, and more. Visit our tasting rooms in Pacific Beach (1854 Garnet Ave) or Ocean Beach (4967 Newport Ave) to sample before you buy."
  },
  {
    question: "Do non-alcoholic cocktails have any alcohol in them?",
    answer: "Products labeled 0.0% ABV contain no alcohol whatsoever. Products labeled 'non-alcoholic' may contain up to 0.5% ABV, which is comparable to the trace alcohol found in ripe bananas or orange juice. Always check the label if complete alcohol absence is important to you."
  }
];

const faqSchema = generateFAQSchema(faqs);

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Percentage Are Cutwaters? Alcohol Content Guide and Non-Alcoholic Alternatives",
  "description": "Complete guide to Cutwater alcohol percentages by variety, how they compare to other drinks, and the best zero proof alternatives for every Cutwater cocktail.",
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
    "@id": `${SITE_URL}/cutwater-alcohol-content`
  }
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Cutwater Alcohol Content", url: `${SITE_URL}/cutwater-alcohol-content` }
]);

// Cutwater ABV data
const cutwaterVarieties = [
  { name: "Lime Margarita", abv: "12.5%", calories: "~290", strength: "high" },
  { name: "Tequila Paloma", abv: "12.5%", calories: "~280", strength: "high" },
  { name: "Tequila Margarita", abv: "12.5%", calories: "~290", strength: "high" },
  { name: "Vodka Mule", abv: "7.0%", calories: "~170", strength: "medium" },
  { name: "Vodka Soda", abv: "5.9%", calories: "~100", strength: "low" },
  { name: "Gin & Tonic", abv: "6.6%", calories: "~150", strength: "medium" },
  { name: "Rum Mint Mojito", abv: "5.9%", calories: "~150", strength: "low" },
  { name: "Whiskey Mule", abv: "7.0%", calories: "~170", strength: "medium" },
  { name: "Long Island Iced Tea", abv: "13.2%", calories: "~310", strength: "high" },
  { name: "Rum & Cola", abv: "7.0%", calories: "~180", strength: "medium" },
];

// Comparison data: Cutwater vs alternatives
const comparisonData = [
  { category: "Avg. ABV", cutwater: "5.9% to 12.5%", standardCocktail: "15% to 25%", naCocktail: "0.0%" },
  { category: "Calories per Serving", cutwater: "100 to 310", standardCocktail: "200 to 400+", naCocktail: "20 to 90" },
  { category: "Convenience", cutwater: "Ready to drink", standardCocktail: "Requires mixing", naCocktail: "Ready to drink" },
  { category: "Next-Day Impact", cutwater: "Possible hangover", standardCocktail: "Likely hangover", naCocktail: "None" },
  { category: "Sleep Disruption", cutwater: "Moderate to high", standardCocktail: "High", naCocktail: "None" },
  { category: "Gluten Free Options", cutwater: "Some varieties", standardCocktail: "Depends on spirit", naCocktail: "Most options" },
];

// Table of contents
const tocItems = [
  { id: "cutwater-overview", label: "Overview" },
  { id: "alcohol-percentages", label: "ABV by Variety" },
  { id: "lime-cutwaters", label: "Lime Cutwaters" },
  { id: "shots-per-can", label: "Shots per Can" },
  { id: "comparison", label: "Cutwater vs Alternatives" },
  { id: "gluten-free", label: "Gluten Free?" },
  { id: "why-switch", label: "Why Go Zero Proof" },
  { id: "na-alternatives", label: "NA Alternatives" },
  { id: "how-to-start", label: "Getting Started" },
  { id: "faq", label: "FAQs" },
];

const CutwaterAlcoholContent = () => {
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
        title="What Percentage Are Cutwaters? Alcohol Content Guide"
        description="Complete Cutwater alcohol percentage guide by variety. Compare ABV levels, calories, and discover the best non-alcoholic canned cocktail alternatives."
        path="/cutwater-alcohol-content"
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
              src={upscaleBarToast}
              alt="Premium cocktails and canned drinks at a bar setting"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 block">
                Alcohol Content Guide
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight">
                What Percentage Are Cutwaters?
              </h1>
              <p className="font-sans text-lg text-cream/80 max-w-2xl mb-4 leading-relaxed">
                Cutwater canned cocktails range from 5% to over 12% ABV, making some of them stronger than you might expect. Here is a complete breakdown of every variety, plus the best zero proof alternatives if you want the flavor without the alcohol.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/shop">
                  <Button size="lg" className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 bg-gold text-forest-deep hover:bg-gold/90">
                    Shop Non-Alcoholic Cocktails
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

        {/* Section 1: Overview */}
        <section id="cutwater-overview" className="py-16 lg:py-24 bg-cream scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-3">
                <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                  Understanding Cutwater Canned Cocktails
                </h2>
                <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                  <p>
                    Cutwater Spirits, based in San Diego, has become one of the most popular canned cocktail brands in the country. Their ready-to-drink lineup includes margaritas, vodka sodas, gin and tonics, whiskey mules, and more, all pre-mixed and sold in cans for convenience.
                  </p>
                  <p>
                    What many people do not realize is how much alcohol is actually in these cans. Unlike a standard beer at 5% ABV, several Cutwater varieties clock in at 10% to 12.5% ABV or higher. That means a single can can contain the equivalent of two or more standard drinks.
                  </p>
                  <p>
                    Understanding the actual alcohol content matters. It affects how quickly you feel the effects, how many calories you are consuming, and how you will feel the next morning. It also helps frame why non-alcoholic canned cocktails have become such a compelling alternative.
                  </p>

                  {/* Callout */}
                  <div className="flex gap-4 bg-gold/10 border-l-4 border-gold p-5 my-6">
                    <AlertTriangle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans text-sm font-semibold text-forest mb-1">Important to Know</p>
                      <p className="font-sans text-sm text-foreground/70">
                        A 12 oz Cutwater Lime Margarita at 12.5% ABV contains roughly the same alcohol as 2.5 standard light beers. Always check the ABV on the can before assuming it is a "light" drink.
                      </p>
                    </div>
                  </div>

                  <p>
                    This guide breaks down the alcohol content of every popular Cutwater variety, explains how to calculate what you are actually drinking, and introduces the zero proof alternatives that deliver the same convenience and flavor without any alcohol.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2 relative hidden lg:block">
                <img
                  src={beachSunsetCocktails}
                  alt="Canned cocktails enjoyed at sunset on a San Diego beach"
                  className="w-full h-[420px] object-cover border-2 border-forest/10"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Alcohol Percentages by Variety */}
        <section id="alcohol-percentages" className="py-16 lg:py-24 bg-background scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Percent className="h-5 w-5 text-gold" />
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold">ABV Breakdown</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
                Cutwater Alcohol Percentage by Variety
              </h2>
              <p className="font-sans text-base text-foreground/70 mb-10 leading-relaxed">
                Here is a complete breakdown of the alcohol content across Cutwater's most popular varieties. ABV (alcohol by volume) tells you what percentage of the liquid is pure ethanol.
              </p>

              {/* ABV Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-forest text-cream">
                      <th className="font-sans text-xs font-bold uppercase tracking-wider text-left p-4 border border-forest/20">Variety</th>
                      <th className="font-sans text-xs font-bold uppercase tracking-wider text-center p-4 border border-forest/20">ABV</th>
                      <th className="font-sans text-xs font-bold uppercase tracking-wider text-center p-4 border border-forest/20">Calories (12 oz)</th>
                      <th className="font-sans text-xs font-bold uppercase tracking-wider text-center p-4 border border-forest/20">Strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cutwaterVarieties.map((v, i) => (
                      <tr key={v.name} className={i % 2 === 0 ? "bg-cream" : "bg-background"}>
                        <td className="font-sans text-sm font-semibold text-forest p-4 border border-forest/10">{v.name}</td>
                        <td className="font-sans text-sm text-foreground/70 text-center p-4 border border-forest/10">{v.abv}</td>
                        <td className="font-sans text-sm text-foreground/70 text-center p-4 border border-forest/10">{v.calories}</td>
                        <td className="font-sans text-sm text-center p-4 border border-forest/10">
                          <span className={`inline-block px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full ${
                            v.strength === "high" ? "bg-red-100 text-red-700" :
                            v.strength === "medium" ? "bg-amber-100 text-amber-700" :
                            "bg-green-100 text-green-700"
                          }`}>
                            {v.strength}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="font-sans text-xs text-foreground/50 mt-4 italic">
                *Calorie counts are approximate. Actual values may vary by production batch. ABV data sourced from Cutwater product labels.
              </p>

              <div className="mt-8 space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  The range is significant. A Cutwater Vodka Soda at 5.9% ABV is comparable to a strong craft beer. A Cutwater Long Island Iced Tea at 13.2% ABV is closer to drinking wine, with the added issue that the sweet flavor profile can mask how much alcohol you are actually consuming.
                </p>
                <p>
                  For context, a standard drink in the United States is defined as 14 grams of pure alcohol, roughly equivalent to one 12 oz beer at 5% ABV. A 12 oz Cutwater Margarita at 12.5% ABV contains approximately 2.5 standard drinks in a single can.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Lime Cutwaters */}
        <section id="lime-cutwaters" className="py-16 lg:py-24 bg-cream scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-2 relative hidden lg:block">
                <img
                  src={naTropicalMocktails}
                  alt="Refreshing lime drinks and tropical mocktails"
                  className="w-full h-[400px] object-cover border-2 border-forest/10"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-gold/30 -z-10" />
              </div>
              <div className="lg:col-span-3">
                <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                  Are Lime Cutwaters Strong?
                </h2>
                <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                  <p>
                    Cutwater's lime-flavored cocktails, particularly the Lime Margarita, are among their most popular products and also among their strongest. At 12.5% ABV, the Lime Margarita packs more than double the alcohol of a standard beer.
                  </p>
                  <p>
                    The lime flavor profile makes these drinks dangerously easy to drink quickly. The citrus acidity and sweetness mask the alcohol content, which means you can consume the equivalent of 2.5 beers worth of alcohol without feeling like you are drinking something particularly strong.
                  </p>
                  <p>
                    This is one of the main reasons non-alcoholic margaritas have become so popular. You get the same bright, lime-forward, salt-rimmed experience without the hidden alcohol load. Several NA brands have specifically developed zero proof margarita recipes that nail the flavor profile.
                  </p>

                  <blockquote className="border-l-4 border-gold pl-6 py-2 my-8">
                    <p className="font-serif text-xl text-forest italic leading-relaxed">
                      "The best non-alcoholic margarita should taste exactly like a margarita. No compromise on the lime, the salt, or the ritual."
                    </p>
                  </blockquote>

                  <p>
                    If you love the convenience of a canned lime cocktail but want to skip the alcohol, our shop carries several NA options that deliver the same portable, ready-to-drink experience at 0.0% ABV.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Shots per Can */}
        <section id="shots-per-can" className="py-16 lg:py-24 bg-forest text-cream scroll-mt-28 relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-8">
                How Many Shots Are in a Cutwater?
              </h2>
              <div className="space-y-5 font-sans text-base text-cream/80 leading-relaxed">
                <p>
                  A standard shot of liquor is 1.5 oz at 40% ABV (80 proof), containing about 14 grams of pure alcohol. To figure out how many "shots" are in a Cutwater can, you compare the total alcohol content.
                </p>
              </div>

              {/* Shot equivalents */}
              <div className="grid sm:grid-cols-3 gap-5 my-10">
                {[
                  { variety: "Vodka Soda (5.9%)", shots: "~1 shot", detail: "Comparable to a standard beer. The lightest Cutwater option." },
                  { variety: "Vodka Mule (7.0%)", shots: "~1.2 shots", detail: "Slightly stronger than a beer. The alcohol adds up quickly with multiple cans." },
                  { variety: "Lime Margarita (12.5%)", shots: "~2.1 shots", detail: "More than two full shots in a single can. Treat these with respect." },
                ].map((item) => (
                  <div key={item.variety} className="bg-cream/5 border border-cream/15 p-5">
                    <p className="font-sans text-xs font-bold text-gold uppercase tracking-widest mb-2">{item.variety}</p>
                    <p className="font-serif text-3xl text-cream mb-2">{item.shots}</p>
                    <p className="font-sans text-sm text-cream/60 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-5 font-sans text-base text-cream/80 leading-relaxed">
                <p>
                  The math matters because the can format creates a psychological illusion. When you pour a cocktail at a bar, you can see the liquor going in. With a canned cocktail, the alcohol is invisible. You are drinking from a can that looks and feels like a beer or a soda, but some Cutwater varieties contain the equivalent of a strong mixed drink.
                </p>
                <p>
                  This is not an argument against canned cocktails. It is an argument for knowing what you are drinking. And if the alcohol content gives you pause, non-alcoholic canned cocktails offer the exact same convenience at 0.0% ABV.
                </p>
              </div>

              <div className="mt-10">
                <Link to="/shop">
                  <Button className="font-sans text-sm font-bold uppercase tracking-widest bg-gold text-forest-deep hover:bg-gold/90 px-8 py-6">
                    Shop Zero Proof Alternatives
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Comparison */}
        <section id="comparison" className="py-16 lg:py-24 bg-cream scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
                Cutwater vs Bar Cocktails vs Non-Alcoholic Cocktails
              </h2>
              <p className="font-sans text-base text-foreground/70 mb-10 leading-relaxed">
                How do Cutwater canned cocktails stack up against traditional bar-made cocktails and the growing category of non-alcoholic canned drinks?
              </p>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-forest text-cream">
                      <th className="font-sans text-xs font-bold uppercase tracking-wider text-left p-4 border border-forest/20"> </th>
                      <th className="font-sans text-xs font-bold uppercase tracking-wider text-center p-4 border border-forest/20">Cutwater</th>
                      <th className="font-sans text-xs font-bold uppercase tracking-wider text-center p-4 border border-forest/20">Bar Cocktail</th>
                      <th className="font-sans text-xs font-bold uppercase tracking-wider text-center p-4 border border-forest/20">NA Cocktail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={row.category} className={i % 2 === 0 ? "bg-background" : "bg-cream"}>
                        <td className="font-sans text-sm font-semibold text-forest p-4 border border-forest/10">{row.category}</td>
                        <td className="font-sans text-sm text-foreground/70 text-center p-4 border border-forest/10">{row.cutwater}</td>
                        <td className="font-sans text-sm text-foreground/70 text-center p-4 border border-forest/10">{row.standardCocktail}</td>
                        <td className="font-sans text-sm text-foreground/70 text-center p-4 border border-forest/10">{row.naCocktail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  The comparison reveals an interesting picture. Cutwater sits in a middle ground: lower ABV than a bar cocktail but significantly higher than most people assume. The calorie differences are substantial, with non-alcoholic options often containing 70% to 80% fewer calories.
                </p>
                <p>
                  The real differentiator is the morning after. Cutwater at 12.5% ABV can absolutely cause a hangover, especially if you have two or three cans at a barbecue or beach day. Non-alcoholic alternatives eliminate that possibility entirely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Gluten Free */}
        <section id="gluten-free" className="py-16 lg:py-24 bg-background scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-3">
                <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                  Are Cutwaters Gluten Free?
                </h2>
                <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                  <p>
                    The answer depends on which Cutwater product you are drinking. The base spirit determines whether gluten is present.
                  </p>

                  <div className="space-y-4 my-6">
                    {[
                      { label: "Generally Gluten Free", items: "Tequila-based drinks (Margaritas, Paloma), Vodka-based drinks (if made from potatoes or grapes), Rum-based drinks (Mojito, Rum & Cola)" },
                      { label: "May Contain Gluten", items: "Whiskey-based drinks (Whiskey Mule, Whiskey Lemonade), any malt-based products" },
                    ].map((group) => (
                      <div key={group.label} className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-sans text-sm font-semibold text-forest block">{group.label}</span>
                          <span className="font-sans text-sm text-foreground/70">{group.items}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p>
                    If you have celiac disease or a serious gluten sensitivity, check each specific product's ingredients. Cutwater does not universally label their products as gluten free.
                  </p>
                  <p>
                    Most non-alcoholic canned cocktails are naturally gluten free because they are not produced from grain-based spirits. This makes them a safer option for anyone with gluten concerns, in addition to being alcohol free.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2 relative hidden lg:block">
                <img
                  src={gardenPartyToast}
                  alt="Friends enjoying drinks at a garden party"
                  className="w-full h-[400px] object-cover border-2 border-forest/10"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Why Go Zero Proof */}
        <section id="why-switch" className="py-16 lg:py-24 bg-forest text-cream scroll-mt-28 relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-8">
                Why More People Are Choosing Zero Proof Over Canned Cocktails
              </h2>

              <div className="space-y-5 font-sans text-base text-cream/80 leading-relaxed">
                <p>
                  The appeal of Cutwater is obvious: great flavors, total convenience, no bartender required. But the growing non-alcoholic canned cocktail category delivers those same benefits without any of the downsides.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 my-10">
                {[
                  { icon: "calories", title: "Fewer Calories", desc: "A Cutwater Margarita has roughly 290 calories. Most NA cocktails sit under 80. Over a weekend, that difference compounds significantly." },
                  { icon: "sleep", title: "Better Sleep", desc: "Alcohol, even at moderate levels, disrupts REM sleep and reduces sleep quality. Zero proof drinks have no impact on your sleep cycle." },
                  { icon: "morning", title: "No Hangover", desc: "Two Cutwater Lime Margaritas contain more than 4 standard drinks. That is hangover territory for most people. Zero proof eliminates the risk entirely." },
                  { icon: "clarity", title: "Full Mental Clarity", desc: "Enjoy the social ritual of cocktails at a barbecue, beach day, or party without compromising your ability to drive, think clearly, or be present." },
                ].map((item) => (
                  <div key={item.title} className="bg-cream/5 border border-cream/10 p-6">
                    <p className="font-sans text-sm font-bold text-gold uppercase tracking-wider mb-2">{item.title}</p>
                    <p className="font-sans text-sm text-cream/80 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-5 font-sans text-base text-cream/80 leading-relaxed">
                <p>
                  This is not about judgment. If you enjoy Cutwater cocktails, that is your choice. But if you are reading this article because you are curious about the alcohol content, you might also be curious about what it would feel like to have the same experience without it. The non-alcoholic options are better than you think.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: NA Alternatives */}
        <section id="na-alternatives" className="py-16 lg:py-24 bg-cream scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
                Best Non-Alcoholic Alternatives to Cutwater
              </h2>
              <p className="font-sans text-base text-foreground/70 mb-12 leading-relaxed max-w-3xl">
                For every Cutwater flavor, there is a zero proof alternative that delivers the same convenience and similar flavor at 0.0% ABV. Here are the categories to explore.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Non-Alcoholic Canned Cocktails",
                    desc: "Pre-mixed, ready-to-drink cocktails at 0.0% ABV. These are the most direct replacement for Cutwater, offering the same grab-and-go convenience with flavors like margarita, paloma, gin and tonic, and mojito. Brands have invested heavily in making these taste authentic.",
                    cta: "Shop Ready-to-Drink",
                    link: "/collections/ready-to-drink",
                    image: poolsideFriends
                  },
                  {
                    title: "Zero Proof Spirits for DIY Cocktails",
                    desc: "If you prefer to mix your own, zero proof spirits let you build any cocktail from scratch without alcohol. Keep a bottle of NA tequila, NA gin, or NA whiskey at home, and you can recreate any Cutwater flavor with fresh ingredients and full control over the recipe.",
                    cta: "Shop Non-Alcoholic Spirits",
                    link: "/collections/spirits",
                    image: naSpiritCocktail
                  },
                  {
                    title: "Functional Drinks with Benefits",
                    desc: "Go beyond flavor replication. Functional drinks use adaptogens, kava, and botanicals to create actual effects like relaxation or focus. If you drink Cutwater to unwind, these offer a similar vibe without the alcohol, hangover, or calorie load.",
                    cta: "Shop Functional Drinks",
                    link: "/collections/functional",
                    image: functionalWellness
                  },
                  {
                    title: "Non-Alcoholic Beer and Wine",
                    desc: "If your Cutwater habit is really about having something to drink at a social gathering, NA beer and wine are the simplest swap. Hundreds of excellent options now exist, from crisp lagers to bold IPAs to sparkling rosés.",
                    cta: "Shop All Non-Alcoholic",
                    link: "/shop",
                    image: naWineCheers
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

        {/* Section 9: Getting Started */}
        <section id="how-to-start" className="py-16 lg:py-24 bg-background scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                How to Start Exploring Non-Alcoholic Cocktails
              </h2>
              <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  You do not need to make a dramatic lifestyle change. Start with a single swap. The next time you would reach for a Cutwater at a barbecue or beach day, grab a non-alcoholic canned cocktail instead. See how it feels to enjoy the same ritual without the alcohol.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-5 my-10">
                {[
                  { step: "01", action: "Match the flavor", detail: "Love Cutwater Margaritas? Start with an NA margarita. Love the Gin & Tonic? Try a zero proof G&T. Begin with what you already know." },
                  { step: "02", action: "Sample first", detail: "Visit our San Diego tasting rooms to try non-alcoholic cocktails before buying a full pack. Taste is personal, and sampling eliminates guesswork." },
                  { step: "03", action: "Stock your cooler", detail: "Keep NA canned cocktails in your fridge alongside your regular options. Having a choice available makes it easy to alternate or switch entirely." },
                ].map((s) => (
                  <div key={s.step} className="border-2 border-forest/10 bg-cream p-5">
                    <p className="font-sans text-xs font-bold text-gold uppercase tracking-widest mb-2">{s.step}</p>
                    <p className="font-sans text-sm font-semibold text-forest mb-2">{s.action}</p>
                    <p className="font-sans text-sm text-foreground/70 leading-relaxed">{s.detail}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  The most surprising thing about switching to non-alcoholic cocktails is how little you miss the alcohol. The flavor is there. The can is there. The social experience is there. What is missing is the headache, the lost sleep, and the wasted next morning.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/shop">
                  <Button className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6">
                    Shop Non-Alcoholic Cocktails
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

        {/* FAQ Section */}
        <section id="faq" className="py-16 lg:py-24 bg-cream scroll-mt-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="h-5 w-5 text-gold" />
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold">FAQs</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10">
                Cutwater and Non-Alcoholic Cocktails: Frequently Asked Questions
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
              Ready to Try Non-Alcoholic Cocktails?
            </h2>
            <p className="font-sans text-forest/70 mb-8 max-w-lg mx-auto">
              Explore 500+ non-alcoholic drinks at Monday Morning Bottle Shop. Same convenience as Cutwater, zero alcohol, zero compromise.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shop">
                <Button size="lg" className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-10 py-6">
                  Shop Non-Alcoholic Drinks
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

export default CutwaterAlcoholContent;
