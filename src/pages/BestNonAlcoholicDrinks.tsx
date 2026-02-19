import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateFAQSchema, websiteSchema } from "@/lib/seo";
import rooftopCheers from "@/assets/lifestyle/rooftop-cheers.jpg";
import upscaleBar from "@/assets/lifestyle/upscale-bar-toast.jpg";
import sparkling from "@/assets/lifestyle/sparkling-celebration.jpg";

const faqs = [
  {
    question: "What are the best non-alcoholic drinks in 2026?",
    answer:
      "The best non-alcoholic drinks in 2026 span every category. In beer, Athletic Brewing, Bravus, and Mash Gang lead the pack. For spirits, Lyre's, Monday Distillery, and Seedlip are the standards. Non-alcoholic wines from Leitz, Giesen, and Luminara have redefined what zero-proof wine can be. Functional beverages from Kin Euphorics, Aplós, and Daytrip offer mood-shifting drinks without alcohol.",
  },
  {
    question: "What non-alcoholic drink tastes most like alcohol?",
    answer:
      "Non-alcoholic spirits come closest to the experience of drinking alcohol. Brands like Monday Distillery, Lyre's, and Ritual Zero Proof create gin, whiskey, rum, and tequila alternatives that replicate the botanical complexity and warmth of the originals. Used in cocktails, they are nearly indistinguishable from alcoholic versions.",
  },
  {
    question: "What are the best non-alcoholic drinks for parties?",
    answer:
      "For parties, ready-to-drink mocktails and canned non-alcoholic options are the most practical. Sparkling non-alcoholic wines are great for toasts. Non-alcoholic beer handles casual gatherings well. For a crafted bar setup, non-alcoholic spirits paired with good mixers let you serve sophisticated cocktails to every guest.",
  },
  {
    question: "Are non-alcoholic drinks healthy?",
    answer:
      "Many non-alcoholic drinks offer genuine health benefits. Functional beverages contain adaptogens, nootropics, CBD, and botanicals that support sleep, focus, and stress management. Non-alcoholic beer and wine have significantly fewer calories than alcoholic versions. The absence of alcohol itself removes the negative health impacts associated with regular drinking.",
  },
  {
    question: "What is the best non-alcoholic drink for someone who doesn't like sweet drinks?",
    answer:
      "For those who prefer dry or bitter flavors, non-alcoholic spirits are ideal. A non-alcoholic gin and tonic, a zero-proof Negroni, or a NA Old Fashioned all deliver complexity without sweetness. Dry-style non-alcoholic wines and bitter botanical seltzers are also excellent choices.",
  },
  {
    question: "What's the difference between non-alcoholic and alcohol-free drinks?",
    answer:
      "Legally in the US, both terms refer to beverages under 0.5% ABV. In practice, some brands use 'alcohol-free' to specifically indicate 0.0% ABV products, while 'non-alcoholic' may include traces up to 0.5%. Always check the product label if you need certainty about ABV content.",
  },
  {
    question: "Can I mix non-alcoholic spirits into cocktails?",
    answer:
      "Absolutely. Non-alcoholic spirits are designed for mixing. Use them exactly as you would regular spirits in any cocktail recipe. A NA gin and tonic, a zero-proof margarita, or a non-alcoholic whiskey sour all work the same way mechanically. The flavor profiles are built to stand up to mixers.",
  },
];

const faqSchema = generateFAQSchema(faqs);

const categories = [
  {
    title: "Non-Alcoholic Beer",
    description: "The largest and most developed NA category. IPAs, lagers, stouts, sours, and wheat beers from dedicated craft breweries. Best for anyone who loves beer flavor and wants nothing to change except the ABV.",
    link: "/collections/na-beer",
    cta: "Shop NA Beer",
  },
  {
    title: "Non-Alcoholic Wine",
    description: "Reds, whites, rosés, and sparkling wines that deliver real complexity. Modern dealcoholization technology has closed the gap with alcoholic wine significantly. The best bottles pair beautifully with food.",
    link: "/collections/wine-alternatives",
    cta: "Shop NA Wine",
  },
  {
    title: "Non-Alcoholic Spirits",
    description: "Gin, whiskey, tequila, rum, and aperitif alternatives. Built for cocktails. Use them exactly like the originals in any recipe. The most versatile NA category for home bartenders.",
    link: "/collections/spirit-alternatives",
    cta: "Shop NA Spirits",
  },
  {
    title: "Functional Beverages",
    description: "Adaptogens, nootropics, CBD, kava, and botanical blends that do more than taste good. These drinks offer mood, focus, and relaxation benefits. The fastest-growing segment in the NA category.",
    link: "/collections/functional",
    cta: "Shop Functional Drinks",
  },
];

const BestNonAlcoholicDrinks = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Best Non-Alcoholic Drinks in 2026 | Complete Category Guide"
        description="Discover the best non-alcoholic drinks across every category: beer, wine, spirits, and functional beverages. Expert picks, flavor guides, and buying advice for 2026."
        path="/best-non-alcoholic-drinks"
        schema={[faqSchema, websiteSchema]}
      />

      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-forest py-20 lg:py-28 overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div className="absolute inset-0">
            <img
              src={rooftopCheers}
              alt="Friends enjoying the best non-alcoholic drinks at a rooftop celebration"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight">
                The Best Non-Alcoholic Drinks
              </h1>
              <p className="font-sans text-lg text-cream/80 max-w-2xl mb-4 leading-relaxed">
                The best non-alcoholic drinks have arrived. Across every category, beer, wine, spirits, and functional beverages, the quality in 2026 is extraordinary. This guide covers what to drink, why it matters, and how to find your perfect match.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/shop">
                  <Button size="lg" className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 bg-gold text-forest-deep hover:bg-gold/90">
                    Shop All Drinks
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/collections/best-sellers">
                  <Button variant="outline" size="lg" className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 border-2 border-cream/30 text-cream bg-transparent hover:bg-cream/10">
                    See Best Sellers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                Why Non-Alcoholic Drinks Have Changed Everything
              </h2>
              <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  Five years ago, choosing a non-alcoholic drink at a bar or restaurant meant sparkling water or a sugary mocktail. That era is over. The non-alcoholic beverage industry has undergone a complete transformation, driven by consumer demand, investment in brewing technology, and a cultural shift in how people think about drinking.
                </p>
                <p>
                  The sober-curious movement is not fringe. According to industry data, over 40% of adults now actively reduce their alcohol consumption. The reasons vary: health, fitness, mental clarity, pregnancy, recovery, religion, or simply preference. What unites them is the demand for great-tasting alternatives.
                </p>
                <p>
                  Non-alcoholic beer, wine, spirits, and functional beverages have answered that demand. The best options today compete directly with their alcoholic counterparts on flavor, complexity, and experience. The only thing missing is the alcohol.
                </p>
                <p>
                  At Monday Morning Bottle Shop, we carry over 500 non-alcoholic products across every category. This guide is designed to help you navigate the best of what the category has to offer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4 text-center">
                Best Non-Alcoholic Drinks by Category
              </h2>
              <p className="font-sans text-base text-foreground/70 mb-12 text-center leading-relaxed max-w-2xl mx-auto">
                Every major drink category now has outstanding non-alcoholic options. Here is what to know about each one.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {categories.map((cat) => (
                  <div key={cat.title} className="border-2 border-forest/10 bg-cream p-8 flex flex-col">
                    <h3 className="font-serif text-2xl text-forest mb-3">{cat.title}</h3>
                    <p className="font-sans text-sm text-foreground/70 leading-relaxed flex-grow mb-6">{cat.description}</p>
                    <Link to={cat.link}>
                      <Button className="font-sans text-xs font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep w-full">
                        {cat.cta}
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Occasion Guide */}
        <section className="py-16 lg:py-24 bg-forest text-cream">
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-10">
                Best Non-Alcoholic Drinks for Every Occasion
              </h2>
              <div className="space-y-6">
                {[
                  {
                    occasion: "Dinner Parties & Celebrations",
                    pick: "Non-alcoholic sparkling wine or a crafted NA cocktail using zero-proof spirits. Sparkling NA wines in particular create the right visual and sensory experience for toasts and special moments.",
                    link: "/collections/wine-alternatives",
                  },
                  {
                    occasion: "Beach Days & Outdoor Events",
                    pick: "Canned non-alcoholic beer or ready-to-drink mocktails. Easy to transport, cold and refreshing, and they fit perfectly into any outdoor social setting.",
                    link: "/collections/beach-bonfire",
                  },
                  {
                    occasion: "Post-Workout Recovery",
                    pick: "Non-alcoholic beer with electrolytes, or functional drinks with adaptogens. Athletic Brewing was built specifically for this use case. Many NA beers now contain added B vitamins and minerals.",
                    link: "/collections/na-beer",
                  },
                  {
                    occasion: "Evening Wind-Down",
                    pick: "Functional beverages with calming botanicals, kava, or ashwagandha. Kin Euphorics, Aplós, and similar brands create drinks specifically designed to replicate the relaxing effect of an evening drink.",
                    link: "/collections/functional",
                  },
                  {
                    occasion: "Home Cocktail Hour",
                    pick: "Non-alcoholic spirits paired with quality mixers. A zero-proof gin and tonic, NA Negroni, or a mocktail Old Fashioned give you the full cocktail-making experience without the alcohol.",
                    link: "/collections/spirit-alternatives",
                  },
                ].map((item, i) => (
                  <div key={i} className="border-l-4 border-gold pl-6">
                    <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-gold mb-2">{item.occasion}</h3>
                    <p className="font-sans text-sm text-cream/80 leading-relaxed mb-3">{item.pick}</p>
                    <Link to={item.link} className="font-sans text-xs text-gold/70 hover:text-gold uppercase tracking-widest flex items-center gap-1">
                      Shop this category <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Flavor guide */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                Finding the Best Non-Alcoholic Drink for Your Taste
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { pref: "You like something crisp and refreshing", rec: "Non-alcoholic lager, pilsner, or sparkling water with botanicals", link: "/collections/na-beer" },
                  { pref: "You like something complex and aromatic", rec: "Non-alcoholic gin, an amaro alternative, or a botanical spirit", link: "/collections/spirit-alternatives" },
                  { pref: "You like something rich and satisfying", rec: "Non-alcoholic stout, porter, or a bold red wine alternative", link: "/collections/na-beer" },
                  { pref: "You like something sweet and fruity", rec: "Ready-to-drink NA cocktails, sparkling rosé, or tropical mocktails", link: "/collections/wine-alternatives" },
                  { pref: "You want something that does something", rec: "Functional drinks with kava, adaptogens, or CBD for real effects", link: "/collections/functional" },
                  { pref: "You want something easy to bring to a party", rec: "Canned NA beers or RTD non-alcoholic cocktails", link: "/shop" },
                ].map((item, i) => (
                  <Link to={item.link} key={i} className="block border-2 border-forest/10 bg-background p-5 hover:border-gold/50 transition-colors">
                    <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold mb-2">If...</p>
                    <p className="font-sans text-sm font-semibold text-forest mb-2">{item.pref}</p>
                    <p className="font-sans text-sm text-foreground/70">{item.rec}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10 text-center">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-cream border-2 border-forest/10 px-6">
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
              Explore 500+ Non-Alcoholic Drinks
            </h2>
            <p className="font-sans text-forest/70 mb-8 max-w-lg mx-auto">
              Shop our full catalog online or visit Monday Morning Bottle Shop in San Diego. Every category. Every style. Something for everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shop">
                <Button size="lg" className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-10 py-6">
                  Shop All Drinks
                </Button>
              </Link>
              <Link to="/collections/best-sellers">
                <Button variant="outline" size="lg" className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-forest text-forest hover:bg-forest hover:text-cream px-10 py-6">
                  See Best Sellers
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

export default BestNonAlcoholicDrinks;
