import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Info, Wine, Beer, Martini, Leaf, Sparkles, GlassWater, Cherry, Citrus, Coffee, Grape, Droplets, Heart } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateFAQSchema, generateBreadcrumbSchema, websiteSchema, SITE_URL } from "@/lib/seo";

// Lifestyle images
import naTropicalMocktails from "@/assets/lifestyle/na-tropical-mocktails.jpg";
import naSpiritCocktail from "@/assets/lifestyle/na-spirit-cocktail.jpg";
import spiritBarCraft from "@/assets/lifestyle/spirit-bar-craft.jpg";
import beachSunsetCocktails from "@/assets/lifestyle/beach-sunset-cocktails.jpg";
import gardenPartyToast from "@/assets/lifestyle/garden-party-toast.jpg";
import naWineCheers from "@/assets/lifestyle/na-wine-cheers.jpg";
import rooftopCheers from "@/assets/lifestyle/rooftop-cheers.jpg";
import functionalWellness from "@/assets/lifestyle/functional-wellness-morning.jpg";
import poolsideFriends from "@/assets/lifestyle/poolside-friends-drinks.jpg";
import upscaleBarToast from "@/assets/lifestyle/upscale-bar-toast.jpg";
import dinnerPartyToast from "@/assets/lifestyle/dinner-party-toast.jpg";
import brunchMimosas from "@/assets/lifestyle/brunch-mimosas-elegant.jpg";

// Recipe images
import virginMojito from "@/assets/recipes/virgin-mojito.jpg";
import virginMargarita from "@/assets/recipes/virgin-margarita.jpg";
import roseSpritzerImg from "@/assets/recipes/rose-spritzer.jpg";
import cucumberCooler from "@/assets/recipes/cucumber-cooler.jpg";
import espressoMocktail from "@/assets/recipes/espresso-mocktail.jpg";
import peachBellini from "@/assets/recipes/peach-bellini.jpg";
import lavenderLemonade from "@/assets/recipes/lavender-lemonade.jpg";
import darkStormy from "@/assets/recipes/dark-stormy.jpg";
import passionFruit from "@/assets/recipes/passion-fruit.jpg";
import aperitifSpritz from "@/assets/recipes/aperitif-spritz.jpg";

const recipes = [
  {
    id: 1,
    title: "Classic Non Alc Mojito",
    description: "Fresh mint, lime, and sparkling soda create the perfect zero proof riff on this Cuban classic. Use a non alc rum alternative for authentic depth.",
    image: virginMojito,
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 oz non alc rum (Lyre's or Ritual Zero Proof)", "6 fresh mint leaves", "1 oz fresh lime juice", "0.75 oz simple syrup", "Sparkling water", "Lime wheel and mint sprig"],
    keywords: ["non alc", "mocktail recipes", "NA cocktails"],
  },
  {
    id: 2,
    title: "Spicy Non Alc Margarita",
    description: "A jalape\u00f1o-spiked margarita using non alc tequila that brings the heat without the hangover. Perfect for taco night or backyard hangs.",
    image: virginMargarita,
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 oz non alc tequila (Ritual Zero Proof Tequila Alternative)", "1 oz fresh lime juice", "0.75 oz agave syrup", "2 jalape\u00f1o slices", "Tajin rim", "Lime wheel"],
    keywords: ["non alc tequila", "zero proof drinks", "non alc cocktails"],
  },
  {
    id: 3,
    title: "Non Alc Ros\u00e9 Spritz",
    description: "A breezy, effervescent spritz made with non alc ros\u00e9 wine and a splash of elderflower. Summer in a glass, no alcohol required.",
    image: roseSpritzerImg,
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz non alc ros\u00e9 wine", "1 oz elderflower tonic", "Sparkling water", "Fresh strawberry", "Rosemary sprig"],
    keywords: ["non alc rose", "non alc wine", "non alc sparkling wine"],
  },
  {
    id: 4,
    title: "Cucumber Gin Cooler",
    description: "Cool, botanical, and impossibly refreshing. Non alc gin meets muddled cucumber and a whisper of elderflower for the ultimate warm-weather sipper.",
    image: cucumberCooler,
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 oz non alc gin (Seedlip Garden 108 or Monday Zero)", "3 cucumber slices", "0.5 oz elderflower syrup", "0.75 oz fresh lime juice", "Tonic water", "Cucumber ribbon"],
    keywords: ["non alc gin", "alcohol-free spirits", "non alc drinks"],
  },
  {
    id: 5,
    title: "Non Alc Espresso Martini",
    description: "Rich espresso, vanilla, and a non alc coffee liqueur alternative shake up into the most photogenic zero proof cocktail you will ever make.",
    image: espressoMocktail,
    prepTime: "5 min",
    servings: 1,
    difficulty: "Medium",
    ingredients: ["2 oz non alc vodka (Ritual Zero Proof)", "1 oz fresh espresso (chilled)", "0.5 oz non alc coffee liqueur", "0.5 oz vanilla simple syrup", "3 espresso beans"],
    keywords: ["non alc vodka", "NA cocktails", "non alc spirits"],
  },
  {
    id: 6,
    title: "Peach Bellini Fizz",
    description: "Sweet white peach puree meets non alc sparkling wine for a brunch-worthy Bellini that is just as celebratory without the alcohol.",
    image: peachBellini,
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz non alc sparkling wine", "2 oz white peach puree", "Dash of peach bitters (non alc)", "Fresh peach slice"],
    keywords: ["non alc champagne", "non alc sparkling wine", "best non alcoholic"],
  },
  {
    id: 7,
    title: "Lavender Vodka Lemonade",
    description: "Floral, citrusy, and perfectly balanced. This non alc vodka cocktail is ideal for garden parties, patio sessions, or a quiet Tuesday evening.",
    image: lavenderLemonade,
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 oz non alc vodka", "1.5 oz fresh lemon juice", "0.75 oz lavender simple syrup", "Sparkling water", "Dried lavender sprig", "Lemon wheel"],
    keywords: ["non alc vodka", "alcohol-free beverages", "non alc drinks"],
  },
  {
    id: 8,
    title: "Dark and Stormy (Zero Proof)",
    description: "Spicy ginger beer and non alc dark rum create a bold, warming cocktail with serious depth. The lime cuts through for a perfectly balanced pour.",
    image: darkStormy,
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 oz non alc dark rum (Lyre's Dark Cane)", "4 oz quality ginger beer", "0.5 oz fresh lime juice", "Lime wedge", "Candied ginger"],
    keywords: ["non alc", "zero proof drinks", "non alcoholic spirits brands"],
  },
  {
    id: 9,
    title: "Passion Fruit Functional Spritz",
    description: "A vibrant, adaptogen-infused spritz combining passion fruit, sparkling water, and a functional tonic for a drink that looks incredible and supports your wellness goals.",
    image: passionFruit,
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["3 oz functional adaptogen tonic (Kin Euphorics or Hiyo)", "1 oz passion fruit puree", "Sparkling water", "Fresh passion fruit half", "Edible flower"],
    keywords: ["sober curious", "alcohol-free lifestyle", "best na beverages"],
  },
  {
    id: 10,
    title: "Non Alc Aperol Spritz",
    description: "The iconic Italian aperitivo, reimagined. A non alc bitter aperitif, sparkling wine alternative, and a splash of soda deliver the same golden-hour magic without the alcohol.",
    image: aperitifSpritz,
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 oz non alc bitter aperitif (Wilfred's or Apertif)", "3 oz non alc sparkling wine", "Splash of soda water", "Orange slice", "Green olive"],
    keywords: ["non alc spritz", "non alc cocktails", "alcohol-free spirits"],
  },
];

// Category data
const categories = [
  {
    icon: Beer,
    title: "Non Alc Beer",
    description: "Craft lagers, IPAs, stouts, and wheat beers brewed to 0.0% or under 0.5% ABV. Brands like Athletic Brewing and Bravus have redefined what NA beer can taste like.",
    link: "/collections/na-beer",
    keywords: "non alc beer, non alcoholic beer brands",
  },
  {
    icon: Wine,
    title: "Non Alc Wine",
    description: "Full-bodied reds, crisp whites, and sparkling ros\u00e9s made from real wine grapes with the alcohol gently removed. Perfect for dinner pairings and celebrations.",
    link: "/collections/wine-alternatives",
    keywords: "non alc wine, non alc rose, non alc sparkling wine, best non alc wine",
  },
  {
    icon: Martini,
    title: "Zero Proof Spirits",
    description: "Non alc gin, tequila, vodka, whiskey, and rum alternatives designed for cocktail making. These are the backbone of the non alc cocktail movement.",
    link: "/collections/spirit-alternatives",
    keywords: "non alc spirits, non alc gin, non alc tequila, non alc vodka, where to buy zero proof spirits",
  },
  {
    icon: Leaf,
    title: "Functional and Adaptogenic Drinks",
    description: "Beyond mimicking alcohol, functional beverages use adaptogens, nootropics, and botanicals to deliver a mood lift, calm, or focus without any alcohol.",
    link: "/collections/functional",
    keywords: "sober curious, best na beverages, non alcoholic drink companies",
  },
  {
    icon: GlassWater,
    title: "Non Alcoholic Seltzers",
    description: "Crisp, flavored sparkling waters and non alcoholic hard seltzers that deliver refreshment without the buzz. Think White Claw vibes, 0.0% ABV reality.",
    link: "/shop",
    keywords: "non alcoholic seltzer, non alcoholic seltzers, na seltzer, alcohol free seltzer, non alcoholic hard seltzer, na seltzer brands, zero alcohol seltzer",
  },
  {
    icon: Cherry,
    title: "Non Alc Cider and RTDs",
    description: "Ready-to-drink canned cocktails, non alc ciders, and grab-and-go options for when you want convenience without compromise.",
    link: "/shop",
    keywords: "non alc cider, non alcoholic drinks for sale, non alc",
  },
];

// FAQs
const faqs = [
  {
    question: "What does non alc mean?",
    answer: "Non alc is shorthand for non-alcoholic. It refers to any beverage that contains little to no alcohol, typically under 0.5% ABV. Many non alc drinks are brewed, fermented, or distilled using traditional methods and then have the alcohol removed, while others are crafted from scratch without any alcohol production."
  },
  {
    question: "Is non alc the same as zero proof?",
    answer: "They overlap but are not identical. Zero proof specifically means 0.0% ABV, containing absolutely no alcohol. Non alc (non-alcoholic) can legally contain up to 0.5% ABV in the US, which is a trace amount comparable to what you find in ripe bananas or kombucha. If complete alcohol absence matters to you, look for the 0.0% label."
  },
  {
    question: "Are non alcoholic seltzers actually alcohol free?",
    answer: "Most non alcoholic seltzers on the market are 0.0% ABV, making them completely alcohol free. However, some products labeled as 'non-alcoholic hard seltzer' may contain up to 0.5% ABV. Always check the label to confirm."
  },
  {
    question: "Where can I buy non alc drinks near me?",
    answer: "Monday Morning Bottle Shop has two locations in San Diego: Pacific Beach (1854 Garnet Ave) and Ocean Beach (4967 Newport Ave). We carry over 500 non alc options across beer, wine, spirits, seltzers, and functional drinks. You can also shop our full catalog online with nationwide shipping."
  },
  {
    question: "Do non alc drinks taste like the real thing?",
    answer: "The best ones do, and the category has improved dramatically since 2020. Non alc beers from Athletic Brewing and Gruvi are nearly indistinguishable from their alcoholic counterparts. Non alc spirits like Ritual Zero Proof and Seedlip are designed specifically for cocktail making and deliver real complexity. The key is finding the right brands, which is exactly what our tasting room is for."
  },
  {
    question: "Are non alc drinks healthier than alcoholic drinks?",
    answer: "In most cases, yes. Non alc drinks eliminate ethanol, which is classified as a Group 1 carcinogen. They typically contain fewer calories, no hangover risk, and do not disrupt sleep patterns. Functional non alc beverages can even include beneficial ingredients like adaptogens, vitamins, and nootropics."
  },
  {
    question: "Can you get a buzz from non alc drinks?",
    answer: "Traditional non alc drinks (beer, wine, spirits alternatives) will not give you a buzz. However, functional beverages containing adaptogens, kava, or nootropics can create a mild mood shift: relaxation, social ease, or heightened focus. These effects are not the same as alcohol intoxication and carry no hangover."
  },
  {
    question: "What are the best non alc cocktail recipes for beginners?",
    answer: "Start with recipes that use familiar flavors: a Non Alc Mojito, a Zero Proof Margarita, or a Non Alc Aperol Spritz. These use simple techniques (muddling, shaking, stirring) and widely available non alc spirits. The 10 recipes on this page are all beginner-friendly."
  },
  {
    question: "What is a non alcoholic hard seltzer?",
    answer: "A non alcoholic hard seltzer is a sparkling flavored water that mimics the taste and experience of hard seltzers like White Claw or Truly, but with 0.0% or near-zero alcohol content. Brands like Hoptea and various craft producers make excellent versions."
  },
  {
    question: "Is Pathfinder non alc?",
    answer: "Yes, Pathfinder is a non-alcoholic spirit made with hemp and botanical ingredients. It contains 0.0% ABV and is designed to be used as a base for non alc cocktails. It has an earthy, herbaceous flavor profile that works well in stirred drinks and spritzes."
  },
];

const faqSchema = generateFAQSchema(faqs);

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "10 Exciting Non Alc Drink Recipes to Delight Your Taste Buds",
  "description": "Discover 10 delicious non alc drink recipes that will tantalize your taste buds and elevate your gatherings without alcohol.",
  "author": {
    "@type": "Organization",
    "name": "Monday Morning Bottle Shop",
  },
  "publisher": {
    "@type": "Organization",
    "name": "Monday Morning Bottle Shop",
    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/og-image.png` },
  },
  "datePublished": "2025-06-01",
  "dateModified": "2026-02-23",
  "mainEntityOfPage": `${SITE_URL}/non-alc-drinks`,
  "image": `${SITE_URL}/og-image.png`,
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Non Alc Drinks", url: `${SITE_URL}/non-alc-drinks` },
]);

const sections = [
  { id: "what-is-non-alc", label: "What Is Non Alc?" },
  { id: "recipes", label: "10 Recipes" },
  { id: "categories", label: "Types of Non Alc" },
  { id: "seltzers", label: "Non Alc Seltzers" },
  { id: "how-theyre-made", label: "How They're Made" },
  { id: "who-drinks-non-alc", label: "Who It's For" },
  { id: "buying-guide", label: "Buying Guide" },
  { id: "faqs", label: "FAQs" },
];

const NonAlcDrinks = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach(({ id }) => {
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
        title="10 Exciting Non Alc Drink Recipes to Delight Your Taste Buds"
        description="Discover 10 delicious non alc drink recipes that will tantalize your taste buds and elevate your gatherings without alcohol. Learn more now!"
        path="/non-alc-drinks"
        type="article"
        schema={[articleSchema, faqSchema, breadcrumbSchema, websiteSchema]}
      />

      {/* Hero */}
      <div className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={naTropicalMocktails}
            alt="Colorful non alc cocktails arranged on a bar"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <Header />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/60">
              <li><Link to="/" className="hover:text-white/80 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-white/90">Non Alc Drinks</li>
            </ol>
          </nav>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            10 Exciting Non Alc Drink Recipes to Delight Your Taste Buds
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Everything you need to know about non alc drinks, from craft cocktail recipes to the best non alcoholic seltzers, spirits, and wines on the market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-ocean hover:bg-ocean/90 text-white rounded-full px-8"
            >
              <Link to="/shop">Shop Non Alc Drinks <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 rounded-full px-8"
            >
              <Link to="/recipes">Browse All Recipes</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Sticky TOC */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  activeSection === id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="bg-background">
        {/* What is Non Alc */}
        <section id="what-is-non-alc" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                  What Does "Non Alc" Actually Mean?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Non alc is the shorthand that has become the default way people search for, talk about, and order non-alcoholic beverages. It covers the entire spectrum: non alc beer, non alc wine, non alc spirits, non alcoholic seltzers, functional drinks, and everything in between.
                </p>
                <p className="text-muted-foreground mb-4">
                  In the United States, a beverage labeled "non-alcoholic" can contain up to 0.5% ABV, which is a trace amount found naturally in foods like ripe bananas, fermented bread, and kombucha. Products labeled "alcohol-free" or "0.0% ABV" contain no measurable alcohol whatsoever.
                </p>
                <p className="text-muted-foreground mb-6">
                  The non alc category is not just about removing alcohol. The best non alc drinks are engineered from the ground up to deliver complexity, flavor, and even functional benefits. From hop-forward NA IPAs to distilled botanical spirits and adaptogen-infused seltzers, this is a category defined by innovation, not limitation.
                </p>

                <div className="bg-muted/50 rounded-xl p-6 border border-border">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Quick Distinction</p>
                      <p className="text-sm text-muted-foreground">
                        "Non-alcoholic" = up to 0.5% ABV. "Alcohol-free" or "0.0%" = zero alcohol. "Zero proof" = 0.0% ABV. All fall under the "non alc" umbrella.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src={spiritBarCraft}
                  alt="Bartender crafting a non alc cocktail with premium spirits alternatives"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 10 Recipes */}
        <section id="recipes" className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                10 Non Alc Drink Recipes You Need to Try
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From classic cocktail remakes to original creations, these recipes prove that non alc drinks can be just as exciting, complex, and Instagram-worthy as their boozy counterparts.
              </p>
            </div>

            <div className="space-y-16">
              {recipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    index % 2 === 1 ? "md:[direction:rtl] md:*:[direction:ltr]" : ""
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 text-white text-sm font-medium px-3 py-1 rounded-full">
                      #{index + 1}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
                      {recipe.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {recipe.description}
                    </p>

                    <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                      <span>{recipe.prepTime}</span>
                      <span>Serves {recipe.servings}</span>
                      <span>{recipe.difficulty}</span>
                    </div>

                    <div className="bg-muted/50 rounded-xl p-5 border border-border">
                      <p className="font-medium text-foreground text-sm mb-3">Ingredients</p>
                      <ul className="space-y-1.5">
                        {recipe.ingredients.map((ingredient, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Button
                asChild
                size="lg"
                className="bg-ocean hover:bg-ocean/90 text-white rounded-full px-8"
              >
                <Link to="/recipes">Explore All Recipes <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Types of Non Alc */}
        <section id="categories" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Types of Non Alc Drinks
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The non alc world is massive and growing fast. Here is a breakdown of every major category, what to expect, and where to find the best options.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.title}
                  to={cat.link}
                  className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:border-primary/30"
                >
                  <cat.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {cat.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Non Alc Seltzers Deep Dive */}
        <section id="seltzers" className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src={beachSunsetCocktails}
                  alt="Friends enjoying non alcoholic seltzers at sunset on the beach"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                  Non Alcoholic Seltzers: The Full Guide
                </h2>
                <p className="text-muted-foreground mb-4">
                  Non alcoholic hard seltzers are one of the fastest-growing segments in the entire non alc category. They deliver the same crisp, flavored, sparkling experience as brands like White Claw and Truly, but with 0.0% alcohol content.
                </p>
                <p className="text-muted-foreground mb-4">
                  Unlike traditional sparkling water, NA seltzers are specifically designed to replicate the drinking experience of hard seltzers. Many use hop extracts, botanicals, or natural flavoring to create that slightly more complex flavor profile that separates a seltzer from a La Croix.
                </p>
                <p className="text-muted-foreground mb-6">
                  Popular NA seltzer brands include Hoptea, Lagunitas Hoppy Refresher, and Boulevard's Quirk Non-Alcohol line. These are perfect for outdoor events, beach days, BBQs, and any situation where you want something light and crushable without the alcohol.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Calories", value: "0-50 per can" },
                    { label: "ABV", value: "0.0%" },
                    { label: "Sugar", value: "0-5g typically" },
                    { label: "Best for", value: "Outdoor, social" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-background rounded-xl p-4 border border-border text-center">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="font-semibold text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How They're Made */}
        <section id="how-theyre-made" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                  How Non Alc Drinks Are Made
                </h2>
                <p className="text-muted-foreground mb-4">
                  There is no single method for making non alc beverages. The process depends entirely on the type of drink being produced, and each method has trade-offs in flavor, cost, and complexity.
                </p>

                <div className="space-y-6 mt-8">
                  {[
                    {
                      title: "Dealcoholization (Beer and Wine)",
                      text: "The beverage is brewed or fermented normally, then the alcohol is removed through vacuum distillation, reverse osmosis, or spinning cone technology. This preserves the original flavor profile while reducing ABV to under 0.5%.",
                    },
                    {
                      title: "Distillation Without Alcohol (Spirits)",
                      text: "Non alc spirits are typically made by distilling or macerating botanicals, spices, and other flavor compounds without ever producing ethanol. The result is a complex, aromatic liquid designed for cocktail mixing.",
                    },
                    {
                      title: "Functional Formulation (Adaptogens and Nootropics)",
                      text: "Functional non alc drinks are formulated from scratch using ingredients like ashwagandha, reishi mushroom, L-theanine, and kava. These are blended with natural flavors and sparkling water to create mood-enhancing beverages.",
                    },
                    {
                      title: "Arrested Fermentation (Seltzers and Ciders)",
                      text: "Some non alc seltzers and ciders use arrested fermentation, where the fermentation process is stopped before significant alcohol is produced. This creates natural carbonation and subtle flavor complexity.",
                    },
                  ].map((method) => (
                    <div key={method.title} className="border-l-2 border-primary/40 pl-5">
                      <h3 className="font-medium text-foreground mb-1">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src={naSpiritCocktail}
                  alt="Non alc spirit being poured into a cocktail glass"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Who Drinks Non Alc */}
        <section id="who-drinks-non-alc" className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Who Drinks Non Alc?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The non alc customer is not a single demographic. It is a cross-section of people who want great drinks without the downsides of alcohol.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Heart,
                  title: "Health-Conscious Drinkers",
                  text: "People cutting alcohol for better sleep, fitness, mental clarity, or long-term health. The fastest growing segment.",
                },
                {
                  icon: Sparkles,
                  title: "Sober Curious",
                  text: "Not necessarily sober, just questioning their relationship with alcohol and exploring what life looks like with less of it.",
                },
                {
                  icon: Droplets,
                  title: "Designated Drivers and Parents",
                  text: "People who still want a sophisticated drink at social events but need to stay sharp. Non alc gives them a real option beyond soda.",
                },
                {
                  icon: Coffee,
                  title: "Professionals and Athletes",
                  text: "Peak performers who treat their bodies like a competitive advantage. Eliminating alcohol is the easiest performance upgrade available.",
                },
              ].map((persona) => (
                <div key={persona.title} className="bg-card border border-border rounded-2xl p-6">
                  <persona.icon className="h-7 w-7 text-primary mb-4" />
                  <h3 className="font-medium text-foreground mb-2">{persona.title}</h3>
                  <p className="text-sm text-muted-foreground">{persona.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 relative rounded-2xl overflow-hidden">
              <img
                src={gardenPartyToast}
                alt="Friends toasting with non alc drinks at a garden party"
                className="w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <p className="text-white text-lg md:text-xl font-serif max-w-2xl">
                  "52% of US adults are actively trying to reduce their alcohol consumption. Non alc is not a niche. It is the new normal."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Buying Guide */}
        <section id="buying-guide" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src={upscaleBarToast}
                  alt="Curated non alc drink selection at Monday Morning Bottle Shop"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                  Where to Buy Non Alc Drinks
                </h2>
                <p className="text-muted-foreground mb-4">
                  Finding quality non alc drinks used to mean scouring grocery store aisles for a single dusty O'Doul's. That era is over. Dedicated non alc bottle shops, online retailers, and specialty bars have made it easier than ever to explore the category.
                </p>
                <p className="text-muted-foreground mb-4">
                  If you are in San Diego, Monday Morning Bottle Shop is your home base. We carry over 500 non alc options across every category, and our tasting rooms in Pacific Beach and Ocean Beach let you try before you buy. No guessing, no wasted money on products you might not like.
                </p>
                <p className="text-muted-foreground mb-6">
                  For those outside San Diego, we ship nationwide through our online shop. We also stock non alc wine, non alc champagne, non alc beer, non alc spirits, functional drinks, and non alcoholic seltzers from the best brands in the world.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-ocean hover:bg-ocean/90 text-white rounded-full px-8"
                  >
                    <Link to="/shop">Shop Online <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8"
                  >
                    <Link to="/locations">Visit Our Tasting Rooms</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Growth Stats */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                The Non Alc Market by the Numbers
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "$13B+", label: "Global NA Market (2025)" },
                { value: "7.5%", label: "Annual Growth Rate" },
                { value: "500+", label: "Products We Carry" },
                { value: "52%", label: "Adults Reducing Alcohol" },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-card border border-border rounded-2xl p-6">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Frequently Asked Questions About Non Alc Drinks
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-card border border-border rounded-xl px-6"
                >
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

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Ready to Explore Non Alc?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you are mixing your first non alc cocktail at home or building out a full zero proof bar, we have the products, the recipes, and the expertise to help you make the switch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-ocean hover:bg-ocean/90 text-white rounded-full px-8"
              >
                <Link to="/shop">Shop Non Alc Drinks <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8"
              >
                <Link to="/locations">Visit Our San Diego Tasting Room</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default NonAlcDrinks;
