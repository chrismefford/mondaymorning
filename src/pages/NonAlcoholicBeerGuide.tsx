import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateFAQSchema, websiteSchema, SITE_URL } from "@/lib/seo";
import beachBonfire from "@/assets/lifestyle/beach-bonfire-beers.jpg";
import naWineCheers from "@/assets/lifestyle/na-wine-cheers.jpg";
import patioBeer from "@/assets/lifestyle/patio-beer-6.jpg";

const faqs = [
  {
    question: "What is non-alcoholic beer?",
    answer:
      "Non-alcoholic beer is brewed just like regular beer, then either has the alcohol removed or is fermented in a way that produces minimal alcohol. Most non-alcoholic beers contain less than 0.5% ABV. The best examples are virtually indistinguishable from their full-strength counterparts in aroma, flavor, and appearance.",
  },
  {
    question: "Does non-alcoholic beer taste like real beer?",
    answer:
      "The best non-alcoholic beers absolutely taste like beer. The craft NA beer category has advanced dramatically since 2020. Brands like Athletic Brewing, Bravus, Partake, Mash Gang, and Beaglepuss produce IPAs, lagers, stouts, and sours that rival top craft breweries. The gap between alcoholic and non-alcoholic beer has never been smaller.",
  },
  {
    question: "What styles of non-alcoholic beer are available?",
    answer:
      "Every major beer style now has a non-alcoholic version. Lagers, pilsners, IPAs, pale ales, wheat beers, stouts, porters, sours, hefeweizens, and even barrel-aged styles. If you love a specific beer style, there is almost certainly a great non-alcoholic version of it available.",
  },
  {
    question: "How many calories are in non-alcoholic beer?",
    answer:
      "Most non-alcoholic beers have significantly fewer calories than their alcoholic equivalents. Many range from 25 to 80 calories per can, compared to 150+ for a standard beer. Since alcohol is calorie-dense, removing it naturally lowers the calorie count. Light non-alcoholic options can go as low as 15 calories.",
  },
  {
    question: "Can I drink non-alcoholic beer if I'm pregnant or in recovery?",
    answer:
      "Non-alcoholic beer with 0.5% ABV or less is generally considered safe for most people avoiding alcohol. However, if you are pregnant, in recovery, or have medical reasons for complete abstinence, consult your doctor. We carry several 0.0% ABV options that contain zero alcohol whatsoever if you need certainty.",
  },
  {
    question: "What's the best non-alcoholic beer for beginners?",
    answer:
      "For beginners, we recommend starting with a crisp lager or a light golden ale. These styles are approachable and familiar. Athletic Brewing's Run Wild IPA and Free Wave Hazy IPA are popular starting points. If you prefer something lighter, a non-alcoholic pilsner is always a safe first choice.",
  },
  {
    question: "Where can I buy non-alcoholic beer in San Diego?",
    answer:
      "Monday Morning carries the largest selection of non-alcoholic beer in San Diego. Visit us at 1854 Garnet Ave in Pacific Beach or 4967 Newport Ave in Ocean Beach. You can sample anything at our tasting bar before buying. We also ship our full catalog online across the US.",
  },
  {
    question: "How should I store non-alcoholic beer?",
    answer:
      "Store non-alcoholic beer the same way you store regular beer: refrigerated or in a cool, dark place. Because NA beer has no alcohol preservative, it can sometimes have a shorter shelf life than alcoholic beer. Check the best-by date and try to consume within a few months of purchase for best flavor.",
  },
];

const faqSchema = generateFAQSchema(faqs);

const beerStyles = [
  {
    style: "Lagers & Pilsners",
    desc: "Clean, crisp, and refreshing. The most approachable non-alcoholic style. Perfect for hot days and casual drinking.",
    perfect: "Everyday drinking, beach days, sporting events",
  },
  {
    style: "IPAs & Pale Ales",
    desc: "Hop-forward with citrus, pine, and tropical notes. The most popular craft beer style now fully available in non-alcoholic versions.",
    perfect: "Craft beer lovers, food pairing, evening drinks",
  },
  {
    style: "Wheat Beers & Hefeweizens",
    desc: "Soft, hazy, and slightly sweet with notes of banana and clove. Smooth and easy to drink.",
    perfect: "Brunch, lighter meals, summer gatherings",
  },
  {
    style: "Stouts & Porters",
    desc: "Rich, roasty, and full-bodied with chocolate and coffee notes. A satisfying sipper that stands alone.",
    perfect: "Cold weather, dessert pairing, winding down",
  },
  {
    style: "Sours & Wild Ales",
    desc: "Tart, funky, and complex. The adventurous choice for beer drinkers who want something different.",
    perfect: "Adventurous palates, pairing with rich foods",
  },
];

const NonAlcoholicBeerGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Non-Alcoholic Beer Guide | Styles, Brands & How to Choose"
        description="The complete guide to non-alcoholic beer in 2026. Explore every style, top brands, flavor profiles, and how to choose the right NA beer for any occasion."
        path="/non-alcoholic-beer-guide"
        schema={[faqSchema, websiteSchema]}
      />

      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-forest py-20 lg:py-28 overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div className="absolute inset-0">
            <img
              src={patioBeer}
              alt="Non-alcoholic beer enjoyed on a sunny patio"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight">
                The Non-Alcoholic Beer Guide
              </h1>
              <p className="font-sans text-lg text-cream/80 max-w-2xl mb-4 leading-relaxed">
                Non-alcoholic beer is no longer a compromise. In 2026, craft NA beer rivals the best full-strength breweries in the world. This guide covers every style, what to expect, and how to find the right beer for you.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/collections/na-beer">
                  <Button size="lg" className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 bg-gold text-forest-deep hover:bg-gold/90">
                    Shop Non-Alcoholic Beer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/collections/all">
                  <Button variant="outline" size="lg" className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 border-2 border-cream/30 text-cream bg-transparent hover:bg-cream/10">
                    Browse All Categories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Intro */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                What Is Non-Alcoholic Beer?
              </h2>
              <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  Non-alcoholic beer is brewed using the same ingredients and processes as regular beer — malted barley, hops, yeast, and water. The difference is in what happens after fermentation. Alcohol is either removed through vacuum distillation or arrested dealcoholization, or the beer is brewed using a process that limits alcohol production from the start.
                </p>
                <p>
                  In the United States, any beverage with less than 0.5% ABV is legally classified as non-alcoholic. The best NA beers today clock in at 0.0% to 0.3% ABV. That is a trace amount — less than what occurs naturally in fermented fruit juice.
                </p>
                <p>
                  The sober-curious movement has transformed the category. What was once limited to watery, flat-tasting options is now a thriving craft segment. Athletes, health-conscious drinkers, designated drivers, pregnant individuals, and anyone who wants great flavor without the effects of alcohol are fueling the fastest-growing segment in the beverage industry.
                </p>
                <p>
                  In 2026, the non-alcoholic beer market is projected to exceed $40 billion globally. Independent craft breweries dedicated exclusively to NA beer are opening across the US. The quality bar is higher than it has ever been.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Beer Styles */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
                Non-Alcoholic Beer Styles Explained
              </h2>
              <p className="font-sans text-base text-foreground/70 mb-12 leading-relaxed">
                Every major beer style exists in non-alcoholic form. Here is what to expect from each category.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {beerStyles.map((item) => (
                  <div key={item.style} className="border-2 border-forest/10 p-6 bg-cream">
                    <h3 className="font-serif text-xl text-forest mb-2">{item.style}</h3>
                    <p className="font-sans text-sm text-foreground/70 mb-3 leading-relaxed">{item.desc}</p>
                    <p className="font-sans text-xs text-gold font-semibold uppercase tracking-wide">
                      Perfect for: {item.perfect}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link to="/collections/na-beer">
                  <Button className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6">
                    Shop All Non-Alcoholic Beer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How to Choose */}
        <section className="py-16 lg:py-24 bg-forest text-cream">
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-8">
                How to Choose the Right Non-Alcoholic Beer
              </h2>
              <div className="space-y-5 font-sans text-base text-cream/80 leading-relaxed">
                <p>
                  Start with what you already like. If you drink light lagers, begin with a non-alcoholic pilsner. If you are a craft IPA drinker, hop-forward NA IPAs will feel immediately familiar. The styles translate.
                </p>
                <p>
                  Consider the occasion. For sports, barbecues, and casual afternoons, a crisp lager works best. For dinner and food pairing, a darker ale or a sour offers more complexity. For cold evenings and slow sipping, a stout or porter is the move.
                </p>
                <p>
                  Pay attention to ABV. Most NA beers are 0.5% or under. If you need 0.0% exactly for medical, religious, or personal reasons, filter specifically for that. We always label 0.0% products clearly.
                </p>
                <p>
                  When in doubt, come taste. Both our San Diego locations have a full tasting bar. Sample before you commit. Our staff will guide you through the options without any pressure or judgment.
                </p>
              </div>

              <div className="mt-10 grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Beginner Pick", rec: "Crisp lager or golden pilsner", link: "/collections/na-beer" },
                  { label: "Craft Beer Lover", rec: "West Coast IPA or hazy pale ale", link: "/collections/na-beer" },
                  { label: "Dark Beer Fan", rec: "Non-alcoholic stout or porter", link: "/collections/na-beer" },
                ].map((pick) => (
                  <Link to={pick.link} key={pick.label} className="block bg-cream/10 border border-cream/20 p-5 hover:bg-cream/20 transition-colors">
                    <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold mb-2">{pick.label}</p>
                    <p className="font-sans text-sm text-cream/80">{pick.rec}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                  Who Non-Alcoholic Beer Is Perfect For
                </h2>
                <ul className="space-y-4">
                  {[
                    { group: "Athletes & Active People", why: "Hydration and recovery without alcohol's performance penalties." },
                    { group: "Sober-Curious Drinkers", why: "Explore the flavor experience of beer without the commitment to alcohol." },
                    { group: "Pregnant Individuals", why: "Enjoy a cold beer without worrying about alcohol content." },
                    { group: "Designated Drivers", why: "Never feel left out. Hold a great beer and enjoy the evening." },
                    { group: "Anyone In Recovery", why: "The ritual and flavor of beer without any risk of relapse." },
                    { group: "Health-Conscious Drinkers", why: "Fewer calories, no hangover, and real flavor. All upside." },
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
                  src={beachBonfire}
                  alt="Friends enjoying non-alcoholic beer at a beach bonfire"
                  className="w-full h-[480px] object-cover border-2 border-forest/10"
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Common Myths */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10">
                Common Myths About Non-Alcoholic Beer
              </h2>
              <div className="space-y-6">
                {[
                  {
                    myth: "Myth: Non-alcoholic beer tastes flat and watery.",
                    truth: "Modern craft NA beers are full-bodied, aromatic, and complex. The brewing technology has advanced dramatically in the last five years.",
                  },
                  {
                    myth: "Myth: Non-alcoholic beer is only for people who can't drink.",
                    truth: "Most NA beer drinkers can drink alcohol. They choose not to for health, performance, or lifestyle reasons. It is a preference, not a restriction.",
                  },
                  {
                    myth: "Myth: All NA beers are the same.",
                    truth: "The category spans hundreds of brands, dozens of styles, and wildly different flavor profiles. There is as much variety in NA beer as in regular craft beer.",
                  },
                  {
                    myth: "Myth: Non-alcoholic beer is just for health fanatics.",
                    truth: "Non-alcoholic beer is for anyone who wants to drink something great. Athletes, parents, professionals, and casual drinkers all buy it for different reasons.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border-l-4 border-gold pl-6">
                    <p className="font-sans text-sm font-semibold text-forest mb-1">{item.myth}</p>
                    <p className="font-sans text-sm text-foreground/70 leading-relaxed">{item.truth}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* San Diego context */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                Non-Alcoholic Beer in San Diego
              </h2>
              <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  San Diego has one of the most active craft beer cultures in America. It also has one of the most health-conscious populations. Those two facts make it the perfect city for non-alcoholic beer to thrive.
                </p>
                <p>
                  Monday Morning Bottle Shop in Pacific Beach and Ocean Beach carries the largest non-alcoholic beer selection in San Diego. Walk in, hit the tasting bar, and let our staff guide you to your next favorite beer.
                </p>
                <p>
                  Whether you are heading to the beach, hosting a backyard gathering, or just want a cold beer after a long workout, we have the right non-alcoholic option for you.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/locations">
                  <Button className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6">
                    Find Our Locations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10 text-center">
                Non-Alcoholic Beer: Frequently Asked Questions
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
              Ready to Find Your Beer?
            </h2>
            <p className="font-sans text-forest/70 mb-8 max-w-lg mx-auto">
              Shop our full non-alcoholic beer collection online or visit us in San Diego to taste before you buy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/collections/na-beer">
                <Button size="lg" className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-10 py-6">
                  Shop Non-Alcoholic Beer
                </Button>
              </Link>
              <Link to="/locations">
                <Button variant="outline" size="lg" className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-forest text-forest hover:bg-forest hover:text-cream px-10 py-6">
                  Visit a Location
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

export default NonAlcoholicBeerGuide;
