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
    question: "What are the best non alcoholic drinks in 2026?",
    answer:
      "The strongest bottles in 2026 span every category. In NA beer, Go Brewing, Mash Gang, Bravus, and Force Majeure lead the pack. For NA spirits, Almave (tequila), Abstinence (gin), and Glen Dochus (whiskey) are the standards. For NA wine, Bolle and Sovi have redefined what dealcoholized wine can be. For functional drinks, Leilo, Kavaly, Sentia, Soul Hum Elixirs, and Curious Elixirs offer real mood and relaxation effects.",
  },
  {
    question: "What non alcoholic drink tastes most like alcohol?",
    answer:
      "Non alcoholic spirits come closest to the cocktail experience. Almave for margaritas, Abstinence for gin and tonics, and Glen Dochus for whiskey-style sippers replicate the warmth and botanical complexity of the originals. Used in cocktails, they are nearly indistinguishable from the alcoholic versions.",
  },
  {
    question: "What are the best non alcoholic drinks for parties?",
    answer:
      "For parties, ready-to-pour bottles like Curious Elixirs and canned options from Trip or FLVR! are the most practical. Sparkling NA wines from Bolle work for toasts. NA beer covers casual gatherings. For a built bar setup, an NA spirit (Almave, Abstinence) plus quality mixers lets you serve cocktails all night.",
  },
  {
    question: "Are non alcoholic drinks healthy?",
    answer:
      "Many offer real benefits. Functional drinks from Leilo, Soul Hum Elixirs, and Alice Mushrooms contain adaptogens, kava, and botanicals that support sleep, focus, and stress balance. NA beer and wine have significantly fewer calories than alcoholic versions. Removing the alcohol removes the negative health impacts of regular drinking.",
  },
  {
    question: "What is the best non alcoholic drink for someone who doesn't like sweet drinks?",
    answer:
      "If you prefer dry or bitter flavors, NA spirits are ideal. A gin and tonic with Abstinence, a Negroni-style sipper with Curious Elixirs No. 1, or an NA Old Fashioned with Glen Dochus all deliver complexity without sweetness. Dry NA wines from Sovi and bitter botanical seltzers like Sentia are also excellent.",
  },
  {
    question: "What's the difference between non alcoholic and alcohol-free drinks?",
    answer:
      "Legally in the US, both terms refer to beverages under 0.5% ABV. In practice, some brands use 'alcohol-free' to signal 0.0% specifically, while 'non alcoholic' may include traces up to 0.5%. Always check the label if you need zero certainty.",
  },
  {
    question: "Can I mix non alcoholic spirits into cocktails?",
    answer:
      "Yes, and that is exactly what they are built for. Use Almave wherever you'd use tequila, Abstinence wherever you'd use gin, Glen Dochus for whiskey. The flavor profiles stand up to mixers, citrus, and bitters the same way regular spirits do.",
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
        title="Best Non Alcoholic Drinks of 2026: Top NA Beers, Wines & Spirits | Monday Morning"
        description="The best non alcoholic drinks of 2026, tasted and ranked. Top NA beers, wines, spirits and functional drinks from the bottle shop that carries 500+ flavors."
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
                The Best <span className="italic text-gold">Non-Alcoholic</span> Drinks
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
                    pick: "Non alcoholic beer with electrolytes, or functional drinks with adaptogens. Many NA beers from Go Brewing and Bravus now contain added B vitamins and minerals built for the post-workout window.",
                    link: "/collections/na-beer",
                  },
                  {
                    occasion: "Evening Wind-Down",
                    pick: "Functional drinks with calming botanicals, kava, or adaptogens. Leilo, Kavaly, Sentia, and Soul Hum Elixirs are built specifically to replicate the relaxing feeling of an evening drink.",
                    link: "/na-drinks-for-relaxation",
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

        {/* Comparison Table */}
        <section className="py-16 lg:py-24 bg-background border-t border-forest/10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4 text-center">
                Quick Comparison: NA Categories at a Glance
              </h2>
              <p className="font-sans text-base text-foreground/70 mb-10 text-center leading-relaxed max-w-2xl mx-auto">
                Use this table to pick the right category for the moment.
              </p>
              <div className="overflow-x-auto border-2 border-forest/15">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="bg-forest text-cream">
                      <th className="p-4 text-left">Category</th>
                      <th className="p-4 text-left">Best For</th>
                      <th className="p-4 text-left">Typical Price</th>
                      <th className="p-4 text-left">Top Brands We Stock</th>
                    </tr>
                  </thead>
                  <tbody className="bg-cream">
                    <tr className="border-b border-forest/10">
                      <td className="p-4 font-semibold text-forest">NA Beer</td>
                      <td className="p-4 text-foreground/80">Casual nights, sports, the grill</td>
                      <td className="p-4 text-foreground/80">$12 to $18 per 6-pack</td>
                      <td className="p-4 text-foreground/80">Go Brewing, Mash Gang, Bravus, Force Majeure</td>
                    </tr>
                    <tr className="border-b border-forest/10">
                      <td className="p-4 font-semibold text-forest">NA Wine</td>
                      <td className="p-4 text-foreground/80">Dinner, brunch, celebrations</td>
                      <td className="p-4 text-foreground/80">$18 to $30 per bottle</td>
                      <td className="p-4 text-foreground/80">Bolle, Sovi</td>
                    </tr>
                    <tr className="border-b border-forest/10">
                      <td className="p-4 font-semibold text-forest">NA Spirits</td>
                      <td className="p-4 text-foreground/80">Cocktails, the home bar</td>
                      <td className="p-4 text-foreground/80">$25 to $40 per bottle</td>
                      <td className="p-4 text-foreground/80">Almave, Abstinence, Glen Dochus</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-forest">Functional</td>
                      <td className="p-4 text-foreground/80">Wind-down, focus, sleep</td>
                      <td className="p-4 text-foreground/80">$5 to $9 per serving</td>
                      <td className="p-4 text-foreground/80">Leilo, Kavaly, Sentia, Soul Hum, Alice Mushrooms</td>
                    </tr>
                  </tbody>
                </table>
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
