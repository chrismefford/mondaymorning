import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { SITE_URL, generateFAQSchema } from "@/lib/seo";

interface Beer {
  handle: string;
  brand: string;
  name: string;
  style: string;
  abv: string;
  bestFor: string;
}

// Curated from in-stock Monday Morning NA beer inventory.
const beers: Beer[] = [
  // IPA
  
  { handle: "untitled-art-juicy-ipa", brand: "FLVR! (Untitled Art)", name: "Juicy IPA", style: "Hazy IPA", abv: "<0.5%", bestFor: "Hop heads" },
  { handle: "untitled-art-citra-haze", brand: "FLVR! (Untitled Art)", name: "Citra Haze", style: "Hazy IPA", abv: "<0.5%", bestFor: "Citrus-forward hops" },
  { handle: "untitled-art-west-coast-ipa", brand: "FLVR! (Untitled Art)", name: "West Coast IPA", style: "West Coast IPA", abv: "<0.5%", bestFor: "Bitter & dry finish" },
  { handle: "go-brewing-not-just-another-story-double-ipa", brand: "Go Brewing", name: "The Story Double IPA", style: "Double IPA", abv: "<0.5%", bestFor: "Big hop fans" },
  { handle: "go-brewing-sunshine-state-tropical-ipa", brand: "Go Brewing", name: "Sunshine State Tropical IPA", style: "Tropical IPA", abv: "<0.5%", bestFor: "Tropical fruit notes" },
  { handle: "go-brewing-jab-jab-grapefruit-ipa", brand: "Go Brewing", name: "Jab Jab Grapefruit IPA", style: "IPA", abv: "<0.5%", bestFor: "Grapefruit & citrus" },
  { handle: "go-brewing-burn-it-down-ipa", brand: "Go Brewing", name: "Burn It Down IPA", style: "West Coast IPA", abv: "<0.5%", bestFor: "Classic West Coast bite" },
  { handle: "go-brewing-disarm", brand: "Go Brewing", name: "Disarm", style: "Hazy IPA", abv: "<0.5%", bestFor: "Soft, juicy hazy" },
  { handle: "go-brewing-freedom-hazy-ipa", brand: "Go Brewing", name: "Freedom Hazy IPA", style: "Hazy IPA", abv: "<0.5%", bestFor: "Everyday hazy" },
  { handle: "go-brewing-nostalgic-ski-lodge", brand: "Go Brewing", name: "Nostalgic Ski Lodge", style: "Hazy IPA", abv: "<0.5%", bestFor: "Cold weather sippers" },
  { handle: "beaglepuss-inverse-ipa", brand: "Beaglepuss", name: "Inverse IPA", style: "West Coast IPA", abv: "<0.5%", bestFor: "Craft beer purists" },
  { handle: "fieldwork-headliner-ipa", brand: "Fieldwork", name: "Headliner IPA", style: "IPA", abv: "<0.5%", bestFor: "Craft beer fans" },
  { handle: "fieldwork-encore", brand: "Fieldwork", name: "Encore", style: "Hazy IPA", abv: "<0.5%", bestFor: "Juicy hazy IPA" },
  { handle: "mash-gang-journey-juice", brand: "Mash Gang", name: "Journey Juice", style: "Hazy IPA", abv: "<0.5%", bestFor: "UK indie hazy" },
  { handle: "mash-gang-chug-ipa", brand: "Mash Gang", name: "Chug IPA", style: "IPA", abv: "<0.5%", bestFor: "Sessionable IPA" },
  { handle: "lowtide-wild-juice-chase", brand: "Below Brew Co.", name: "Wild Juice Chase Pale", style: "Hazy Pale", abv: "<0.5%", bestFor: "Lower-bitterness hop fix" },
  { handle: "lowtide-the-cosmic-turtle", brand: "Below Brew Co.", name: "The Cosmic Turtle", style: "Hazy IPA", abv: "<0.5%", bestFor: "Indie hazy" },
  { handle: "below-brew-co-west-coast-hop-lock-copy", brand: "Below Brew Co.", name: "All Hopped Up", style: "West Coast IPA", abv: "<0.5%", bestFor: "Hop bitterness" },
  { handle: "kit-brewing-hazy-ipa", brand: "Kit Brewing", name: "Hazy IPA", style: "Hazy IPA", abv: "<0.5%", bestFor: "Clean, modern hazy" },
  { handle: "woodland-farms-west-ipa", brand: "Woodland Farms", name: "West IPA", style: "West Coast IPA", abv: "<0.5%", bestFor: "Northeast craft" },
  { handle: "woodland-farms-pointer-ipa", brand: "Woodland Farms", name: "Pointer IPA", style: "IPA", abv: "<0.5%", bestFor: "Balanced IPA" },
  { handle: "atmos-brewing-alturas", brand: "Atmos Brewing", name: "Alturas", style: "IPA", abv: "<0.5%", bestFor: "Crisp West Coast" },
  { handle: "vandestreek-funhouse-neipa", brand: "VandeStreek", name: "Funhouse NEIPA", style: "NEIPA", abv: "<0.5%", bestFor: "Dutch hazy fans" },
  { handle: "capacity-ipa", brand: "Capacity", name: "Session IPA", style: "Session IPA", abv: "<0.5%", bestFor: "Lower-cal IPA" },
  { handle: "heck-brewing", brand: "Heck Brewing", name: "Silver Lining IPA", style: "IPA", abv: "<0.5%", bestFor: "Local craft" },
  { handle: "unltd-ipa-can", brand: "UNLTD", name: "IPA", style: "IPA", abv: "<0.5%", bestFor: "Clean modern IPA" },
  { handle: "le-petit-beret-ipa-amber", brand: "Le Petit Beret", name: "IPA Amber", style: "Amber IPA", abv: "0.0%", bestFor: "True 0.0% IPA" },

  // Lager / Pilsner
  { handle: "capacity-mexican-lager", brand: "Capacity", name: "Mexican Lager", style: "Mexican Lager", abv: "<0.5%", bestFor: "Tacos & sun" },
  { handle: "fieldwork-light", brand: "Fieldwork", name: "Light", style: "Light Lager", abv: "<0.5%", bestFor: "Easy drinking" },
  { handle: "untitled-art-italian-style-pils", brand: "FLVR! (Untitled Art)", name: "Italian Style Pils", style: "Italian Pilsner", abv: "<0.5%", bestFor: "Crisp & dry" },
  { handle: "go-brewing-suspended-in-sunbeam-pils", brand: "Go Brewing", name: "Sunbeam Pils", style: "Pilsner", abv: "<0.5%", bestFor: "Classic pilsner" },
  { handle: "go-brewing-savage-lite", brand: "Go Brewing", name: "Savage Lite", style: "Light Lager", abv: "<0.5%", bestFor: "Calorie counters" },
  { handle: "le-petit-beret-latina", brand: "Le Petit Beret", name: "Latina", style: "Mexican-Style Lager", abv: "0.0%", bestFor: "True 0.0% lager" },
  { handle: "mash-gang-glug-cerveza", brand: "Mash Gang", name: "Glug Cerveza", style: "Cerveza", abv: "<0.5%", bestFor: "Lime & salt vibes" },
  { handle: "mash-gang-crystal-ammunition", brand: "Mash Gang", name: "Crystal Ammunition", style: "Czech Pilsner", abv: "<0.5%", bestFor: "Czech-style pils" },
  { handle: "unltd-lager-can", brand: "UNLTD", name: "Lager", style: "Lager", abv: "<0.5%", bestFor: "Default-pour lager" },
  { handle: "beaglepuss-west-coast-pilz-dry-curious", brand: "Beaglepuss", name: "West Coast Pilz - Dry Curious", style: "Pilsner", abv: "<0.5%", bestFor: "Hop-forward pils" },
  { handle: "beaglepuss-czech-style-bohmian-subterfuge", brand: "Beaglepuss", name: "Bohmian Subterfuge", style: "Czech Pilsner", abv: "<0.5%", bestFor: "Old-world pilsner" },
  { handle: "below-brew-co-heaven-and-helles", brand: "Below Brew Co.", name: "Heaven and Helles", style: "Helles Lager", abv: "<0.5%", bestFor: "Bavarian style" },
  { handle: "bauhaus-nah-hoppy-brew", brand: "Bauhaus", name: "Nah Hoppy Brew", style: "Hoppy Pilsner", abv: "<0.5%", bestFor: "Hoppy lager" },
  { handle: "best-day-galaxy-ripple", brand: "Best Day", name: "Galaxy Ripple", style: "Pilsner", abv: "<0.5%", bestFor: "California lager" },

  // Stout / Dark
  { handle: "lowtide-check-this-stout", brand: "Below Brew Co.", name: "Check This Stout", style: "Stout", abv: "<0.5%", bestFor: "Pub night" },
  { handle: "go-brewing-street-cred-after-hours-porter", brand: "Go Brewing", name: "Street Cred After Hours Porter", style: "Porter", abv: "<0.5%", bestFor: "Roasty & smooth" },
  { handle: "go-brewing-toasty-af", brand: "Go Brewing", name: "Toasty AF", style: "Brown / Dark", abv: "<0.5%", bestFor: "Cozy nights" },
  { handle: "untitled-art-smores-dark-brew-copy", brand: "FLVR! (Untitled Art)", name: "S'mores Dark Brew", style: "Pastry Stout", abv: "<0.5%", bestFor: "Dessert pairing" },
  { handle: "untitled-art-chocolate-dark-brew-copy", brand: "FLVR! (Untitled Art)", name: "Chocolate Dark Brew", style: "Chocolate Stout", abv: "<0.5%", bestFor: "Chocolate lovers" },
  { handle: "woodland-farms-peanut-butter", brand: "Woodland Farms", name: "Double Chocolate Peanut Butter", style: "Pastry Stout", abv: "<0.5%", bestFor: "Dessert in a can" },
  { handle: "woodland-farms-dark-brew", brand: "Woodland Farms", name: "Dark Brew", style: "Dark Lager", abv: "<0.5%", bestFor: "Easy-drinking dark" },
  { handle: "bauhaus-nah-helles-copy", brand: "Bauhaus", name: "Nah Dark Brew", style: "Dark Lager", abv: "<0.5%", bestFor: "Schwarzbier vibes" },
  { handle: "go-brewing-baller-melon-pale-wheat-copy", brand: "Go Brewing", name: "Chesters Fresh Dark Brew", style: "Dark Brew", abv: "<0.5%", bestFor: "Roasted notes" },

  // Amber / Red / Blonde / Belgian
  { handle: "go-brewing-freedom-amber", brand: "Go Brewing", name: "Freedom Amber", style: "Amber Ale", abv: "<0.5%", bestFor: "Burgers & BBQ" },
  { handle: "go-brewing-damn-good-octoberfest", brand: "Go Brewing", name: "Damn Good Oktoberfest", style: "Märzen", abv: "<0.5%", bestFor: "Fall pours" },
  { handle: "capacity-blond-ale", brand: "Capacity", name: "Blond Ale", style: "Blonde Ale", abv: "<0.5%", bestFor: "Crowd pleaser" },
  { handle: "capacity-pale-ale", brand: "Capacity", name: "Pale Ale", style: "Pale Ale", abv: "<0.5%", bestFor: "Balanced everyday" },
  { handle: "fieldwork-day-money", brand: "Fieldwork", name: "Day Money", style: "Pale Ale", abv: "<0.5%", bestFor: "Day drinking" },
  { handle: "kit-brewing-blonde", brand: "Kit Brewing", name: "Blonde", style: "Blonde Ale", abv: "<0.5%", bestFor: "Soft & smooth" },
  { handle: "kit-brewing-golden", brand: "Kit Brewing", name: "Golden", style: "Golden Ale", abv: "<0.5%", bestFor: "Easy session" },
  { handle: "force-majeure-traditional-blond", brand: "Force Majeure", name: "Traditional Blond", style: "Belgian Blond", abv: "0.0%", bestFor: "Belgian style, true zero" },
  { handle: "force-majeure-tripel", brand: "Force Majeure", name: "Tripel", style: "Belgian Tripel", abv: "0.0%", bestFor: "Belgian abbey style" },
  { handle: "force-majeure-tripel-hop", brand: "Force Majeure", name: "Tripel Hop", style: "Belgian Hoppy", abv: "0.0%", bestFor: "Hopped Belgian" },
  { handle: "force-majeure-bruin-belgian", brand: "Force Majeure", name: "Bruin", style: "Belgian Bruin", abv: "0.0%", bestFor: "Dark Belgian" },
  { handle: "force-majeure-bruin-copy", brand: "Force Majeure", name: "Winterbier", style: "Belgian Winter", abv: "0.0%", bestFor: "Winter sippers" },
  { handle: "force-majeure-kriek-belgian", brand: "Force Majeure", name: "Kriek", style: "Belgian Kriek", abv: "0.0%", bestFor: "Cherry sour" },

  // Wheat / Sour / Cider / Specialty
  { handle: "untitled-art-orange-peel-wit", brand: "FLVR! (Untitled Art)", name: "Orange Peel Wit", style: "Wheat / Witbier", abv: "<0.5%", bestFor: "Citrusy wheat" },
  { handle: "go-brewing-baller-melon-pale-wheat", brand: "Go Brewing", name: "Baller Melon Pale Wheat", style: "Pale Wheat", abv: "<0.5%", bestFor: "Light & fruity" },
  { handle: "go-brewing-new-school-sour-berry", brand: "Go Brewing", name: "New School Sour Berry", style: "Sour", abv: "<0.5%", bestFor: "Berry sours" },
  { handle: "go-brewing-new-school-sour-guava", brand: "Go Brewing", name: "New School Sour Guava", style: "Sour", abv: "<0.5%", bestFor: "Tropical sour" },
  { handle: "go-brewing-new-school-holiday-sour", brand: "Go Brewing", name: "New School Holiday Sour", style: "Sour", abv: "<0.5%", bestFor: "Spiced sour" },
  { handle: "go-brewing-framboise-sauvee", brand: "Go Brewing", name: "Framboise Sauvée", style: "Lambic-Style", abv: "<0.5%", bestFor: "Raspberry lambic" },
  { handle: "untitled-art-mango-dragonfruit-sour", brand: "FLVR! (Untitled Art)", name: "Mango Dragonfruit Sour", style: "Fruited Sour", abv: "<0.5%", bestFor: "Fruit-forward sour" },
  { handle: "mash-gang-lesser-evil", brand: "Mash Gang", name: "Lesser Evil", style: "Specialty", abv: "<0.5%", bestFor: "Indie experimental" },
  { handle: "mash-gang-hawg-1", brand: "Mash Gang", name: "Hawg", style: "Pale Ale", abv: "<0.5%", bestFor: "Punk-rock pale" },
  { handle: "beaglepuss-new-england-hopper-cider", brand: "Beaglepuss", name: "Them Apples - New England Hopped Cider", style: "Hopped Cider", abv: "<0.5%", bestFor: "Cider-curious" },
  { handle: "below-brew-co-electric-bear", brand: "Below Brew Co.", name: "Unruly AF", style: "Specialty Ale", abv: "<0.5%", bestFor: "Adventurous palates" },
  { handle: "below-brew-co-forgot-to-take-my-pils", brand: "Below Brew Co.", name: "Forgot to Take My Pils", style: "Pilsner", abv: "<0.5%", bestFor: "Crisp daily pour" },
  { handle: "lowtide-ohana", brand: "Below Brew Co.", name: "Ohana", style: "Tropical Ale", abv: "<0.5%", bestFor: "Beach days" },
  { handle: "atmos-brewing-alturas-copy", brand: "Atmos Brewing", name: "Amber", style: "Amber", abv: "<0.5%", bestFor: "Malty balance" },
  { handle: "untitled-art-american-gold", brand: "FLVR! (Untitled Art)", name: "American Gold", style: "Golden Ale", abv: "<0.5%", bestFor: "Easy session" },
  { handle: "flvr-chela-con-limon-copy", brand: "FLVR! (Untitled Art)", name: "Chela Con Limon", style: "Cerveza w/ Lime", abv: "<0.5%", bestFor: "Lime lager fans" },
  { handle: "flvr-super-kolsch-style", brand: "FLVR! (Untitled Art)", name: "Super Kolsch-Style", style: "Kölsch", abv: "<0.5%", bestFor: "Crossover crisp" },
  { handle: "go-brewing-bad-arse-irish-red-copy", brand: "Go Brewing", name: "Salty AF Lime Chelada", style: "Chelada", abv: "<0.5%", bestFor: "Salty lime fix" },
  { handle: "go-brewing-bright-side-shandy-copy", brand: "Go Brewing", name: "Into the Wilderness", style: "Specialty", abv: "<0.5%", bestFor: "Outdoors pour" },
  { handle: "go-brewing-freedom-west-coast-pale", brand: "Go Brewing", name: "Freedom West Coast Pale", style: "West Coast Pale", abv: "<0.5%", bestFor: "Crisp pale ale" },
  { handle: "new-york-darling-ipa", brand: "Monday Morning", name: "New York Darling IPA", style: "House IPA", abv: "<0.5%", bestFor: "House pick" },
  { handle: "delhi-darling-golden", brand: "Monday Morning", name: "Delhi Darling Golden", style: "House Golden", abv: "<0.5%", bestFor: "House pick" },
];

const styles: { name: string; intro: string; styleMatch: (s: string) => boolean }[] = [
  {
    name: "Non-Alcoholic IPA",
    intro:
      "The most competitive style in the category. NA IPAs are where breweries prove themselves, because hops are the hardest flavor to preserve through dealcoholization. Our IPA shelf is the deepest in San Diego.",
    styleMatch: (s) => /IPA|Pale|NEIPA/i.test(s) && !/Wheat/i.test(s),
  },
  {
    name: "Non-Alcoholic Lager & Pilsner",
    intro:
      "The default category. The one your in-laws will drink without complaint. From California-style light lagers to Czech and Italian pilsners, these are the no-arguments crowd-pleasers.",
    styleMatch: (s) => /Lager|Pilsner|Pils|Helles|Cerveza/i.test(s),
  },
  {
    name: "Non-Alcoholic Stout, Porter & Dark",
    intro:
      "Stouts and porters work surprisingly well alcohol-free because the roasted, chocolate, and coffee notes mask any alcohol-stripping artifacts. This is where pastry stouts live.",
    styleMatch: (s) => /Stout|Porter|Dark|Schwarz|Brown/i.test(s),
  },
  {
    name: "Non-Alcoholic Belgian & Specialty",
    intro:
      "True 0.0% Belgian abbey-style beers from Force Majeure, plus the experimental and seasonal pours we rotate through the shop. Small batches, big personality.",
    styleMatch: (s) => /Belgian|Tripel|Bruin|Kriek|Specialty|Winter|Märzen/i.test(s),
  },
  {
    name: "Non-Alcoholic Wheat, Sour & Cider",
    intro:
      "The fruit-forward end of the bar. Wheat beers, kettle sours, lambic-style fruit beers, and the occasional hopped cider. Bright, refreshing, low-bitterness.",
    styleMatch: (s) => /Wheat|Wit|Sour|Lambic|Cider|Kölsch|Chelada|Shandy|Golden|Blonde|Amber|Red/i.test(s),
  },
];

const faqs = [
  {
    question: "Is non-alcoholic beer actually alcohol-free?",
    answer:
      "Not always. In the US, non-alcoholic beer can legally contain up to 0.5% alcohol by volume, similar to ripe fruit, kombucha, or fresh-squeezed orange juice. Alcohol-free beer must contain 0.0%. If you need true zero, look for our Force Majeure and Le Petit Beret lines, which are produced at 0.0%.",
  },
  {
    question: "Can you get drunk on non-alcoholic beer?",
    answer:
      "No. To approach legal intoxication on 0.5% beer, an average adult would need to drink roughly ten cans within an hour, faster than the body metabolizes the trace alcohol. The math makes it physically impractical. On 0.0% beer, it is impossible.",
  },
  {
    question: "Is non-alcoholic beer safe during pregnancy?",
    answer:
      "The safest answer is to choose 0.0% products only and consult your doctor. Most medical organizations recommend avoiding all alcohol during pregnancy, and below 0.5% products contain trace amounts. Force Majeure and Le Petit Beret are confirmed 0.0% options on our shelf.",
  },
  {
    question: "Does non-alcoholic beer count as drinking?",
    answer:
      "It depends who is asking. Socially, no. You are not consuming meaningful alcohol. In recovery contexts, opinions vary. Some sponsors treat NA beer as a relapse risk because of the ritual association. Others view it as a legitimate harm-reduction tool. The honest answer: ask yourself why you are reaching for it.",
  },
  {
    question: "Is non-alcoholic beer healthier than regular beer?",
    answer:
      "Generally yes, with caveats. NA beer typically has 30 to 60 percent fewer calories, no alcohol-related liver impact, no hangover, and no interaction with medications or sleep. It is still a processed beverage with carbs and sugar. It is healthier than alcoholic beer. It is not health food.",
  },
  {
    question: "What is the best-tasting non-alcoholic beer?",
    answer:
      "It depends on what you usually drink. If you love hazy IPAs, try FLVR! Juicy IPA or Go Brewing Disarm. If you love lagers, Capacity Mexican Lager or UNLTD Lager. If you love stouts, Below Brew Co. Check This Stout or Woodland Farms Double Chocolate Peanut Butter. Match the style first.",
  },
  {
    question: "How long does non-alcoholic beer last?",
    answer:
      "Most NA beers have a shorter shelf life than alcoholic beer because alcohol acts as a preservative. Drink within four to six months of the canning date for best flavor. Stored cold, most NA beers stay drinkable for nine to twelve months but lose hop character over time.",
  },
];

const UltimateNABeerGuide2026 = () => {
  const path = "/blog/ultimate-non-alcoholic-beer-guide-2026";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Ultimate Non-Alcoholic Beer Guide for 2026",
    description: "Every brand worth drinking, side by side. Curated by Monday Morning Bottle Shop in San Diego.",
    author: { "@type": "Person", name: "Zane Curtis" },
    publisher: { "@type": "Organization", name: "Monday Morning Bottle Shop" },
    mainEntityOfPage: `${SITE_URL}${path}`,
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "The Ultimate Non-Alcoholic Beer Guide for 2026",
    itemListElement: beers.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/product/${b.handle}`,
      name: `${b.brand} ${b.name}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="The Ultimate Non Alcoholic Beer Guide 2026: 80+ NA Beers Ranked | Monday Morning"
        description="Every NA beer worth drinking, side by side. 80+ non alcoholic beers across IPA, lager, stout and Belgian styles, ranked by Monday Morning's tasting room staff."
        path={path}
        type="article"
        image="/og-ultimate-na-beer-guide-2026.jpg"
        schema={[articleSchema, itemListSchema, generateFAQSchema(faqs)]}
      />

      <Header />
      <main>
        {/* Hero */}
        <section className="bg-forest py-16 md:py-24 relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
            <span className="font-sans text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 block">
              The 2026 Guide, updated quarterly
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-cream mb-4">
              The Ultimate <span className="italic text-gold">Non-Alcoholic Beer</span> Guide for 2026
            </h1>
            <p className="font-sans text-cream/80 text-lg md:text-xl">
              Every brand worth drinking, side by side.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg max-w-none font-sans text-foreground/90 space-y-5">
              <p>
                The first time someone hands you a non alcoholic beer, you brace
                for disappointment. That bracing is a holdover from 2015. The
                category has changed.
              </p>
              <p>
                In 2018, there were maybe a dozen NA beers worth ordering. Today
                there are over four hundred. The good ones are genuinely good.
                The great ones win blind taste tests against their full-strength
                counterparts. The difference between the great ones and the rest
                is now measured in ingredients, brewing process, and a few extra
                cents per can, not in whether the drink is drinkable at all.
              </p>
              <p>
                This guide exists because the category got too big to navigate
                without help. We carry over 500 alcohol-free options at our
                Pacific Beach and Ocean Beach shops, and we taste new arrivals
                every week. What follows is the shortlist: every NA beer
                currently on our shelf, organized by style, with the brands and
                bottles we'd actually pour for a friend.
              </p>
              <p className="italic text-foreground/70">
                Tables first. Stories second. Pour something good while you read.
              </p>
            </div>
          </div>
        </section>

        {/* State of NA beer */}
        <section className="py-12 md:py-16 bg-cream/40 border-y border-foreground/10">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
              The state of NA beer in 2026
            </h2>
            <div className="space-y-6 font-sans text-foreground/85 leading-relaxed">
              <div>
                <h3 className="font-serif text-xl text-brand-green mb-2">
                  The taste gap closed.
                </h3>
                <p>
                  The dealcoholization technology that used to strip flavor along
                  with alcohol has been replaced by reverse osmosis, vacuum
                  distillation, and arrested fermentation. Top-shelf NA IPAs now
                  hit hop notes that 2019 NA beers couldn't touch.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-brand-green mb-2">
                  ABV labeling matters more than you think.
                </h3>
                <p>
                  A non alcoholic beer in the US can legally contain up to 0.5%
                  alcohol by volume. An alcohol free beer must contain 0.0%. For
                  most drinkers the difference is irrelevant. For people in
                  recovery, pregnant women, observant Muslims, and anyone on
                  medication that interacts with trace alcohol, it's everything.
                  Read the label.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-brand-green mb-2">
                  Calories vary widely across the category.
                </h3>
                <p>
                  A session IPA might come in around 50 calories. A full-bodied
                  pastry stout can clear 150. Both are non alcoholic. If you're
                  drinking NA beer for fitness reasons, that gap matters. Check
                  the can.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
              The comparison table
            </h2>
            <p className="font-sans text-foreground/70 mb-8">
              Every NA beer currently on the Monday Morning shelf. Click any
              beer to view it in the shop.
            </p>
            <div className="border border-foreground/10 rounded-lg overflow-x-auto bg-white">
              <table className="w-full text-sm">
                <thead className="bg-forest text-cream">
                  <tr>
                    <th className="text-left px-4 py-3 font-sans uppercase tracking-wider text-xs">Brand</th>
                    <th className="text-left px-4 py-3 font-sans uppercase tracking-wider text-xs">Beer</th>
                    <th className="text-left px-4 py-3 font-sans uppercase tracking-wider text-xs">Style</th>
                    <th className="text-left px-4 py-3 font-sans uppercase tracking-wider text-xs">ABV</th>
                    <th className="text-left px-4 py-3 font-sans uppercase tracking-wider text-xs">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {beers.map((b, i) => (
                    <tr
                      key={b.handle}
                      className={i % 2 === 0 ? "bg-white" : "bg-cream/30"}
                    >
                      <td className="px-4 py-3 font-sans text-foreground/85 whitespace-nowrap">
                        {b.brand}
                      </td>
                      <td className="px-4 py-3 font-sans">
                        <Link
                          to={`/product/${b.handle}`}
                          className="text-brand-green hover:text-gold underline underline-offset-2"
                        >
                          {b.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-sans text-foreground/75 whitespace-nowrap">{b.style}</td>
                      <td className="px-4 py-3 font-sans text-foreground/75 whitespace-nowrap">{b.abv}</td>
                      <td className="px-4 py-3 font-sans text-foreground/75">{b.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-sans text-xs text-foreground/60 mt-4">
              Inventory rotates. If something here is sold out, ask us in the
              shop and we'll point you to the closest match.
            </p>
          </div>
        </section>

        {/* By style */}
        <section className="py-12 md:py-16 bg-cream/40 border-y border-foreground/10">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
              NA beer by style
            </h2>
            <p className="font-sans text-foreground/70 mb-12">
              Pick the style first. Then pick the brand.
            </p>

            {styles.map((group) => {
              const matches = beers.filter((b) => group.styleMatch(b.style));
              if (matches.length === 0) return null;
              return (
                <div key={group.name} className="mb-14">
                  <h3 className="font-serif text-2xl md:text-3xl text-brand-green mb-3">
                    {group.name}
                  </h3>
                  <p className="font-sans text-foreground/85 leading-relaxed mb-6">
                    {group.intro}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 font-sans text-foreground/85">
                    {matches.map((b) => (
                      <li key={b.handle} className="leading-relaxed">
                        <Link
                          to={`/product/${b.handle}`}
                          className="text-brand-green hover:text-gold underline underline-offset-2"
                        >
                          {b.brand} {b.name}
                        </Link>
                        <span className="text-foreground/60">, {b.style}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Best NA beer for... */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
              Best NA beer for...
            </h2>
            <p className="font-sans text-foreground/70 mb-10">
              Question-led shopping. The way most people actually buy.
            </p>

            <div className="space-y-8 font-sans text-foreground/85 leading-relaxed">
              <div>
                <h3 className="font-serif text-xl text-brand-green mb-2">Best NA beer for craft beer fans</h3>
                <p>
                  Palates trained on craft beer want flavor density.{" "}
                  <Link to="/product/untitled-art-juicy-ipa" className="text-brand-green underline">FLVR! Juicy IPA</Link>,{" "}
                  <Link to="/product/go-brewing-not-just-another-story-double-ipa" className="text-brand-green underline">Go Brewing The Story DIPA</Link>,{" "}
                  <Link to="/product/woodland-farms-peanut-butter" className="text-brand-green underline">Woodland Farms Double Chocolate Peanut Butter</Link>, and{" "}
                  <Link to="/product/fieldwork-headliner-ipa" className="text-brand-green underline">Fieldwork Headliner</Link> won't taste like a let-down.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl text-brand-green mb-2">Best NA beer for someone who doesn't usually like beer</h3>
                <p>
                  Light, clean, no aggressive bitterness. Try{" "}
                  <Link to="/product/best-day-galaxy-ripple" className="text-brand-green underline">Best Day Galaxy Ripple</Link>,{" "}
                  <Link to="/product/unltd-lager-can" className="text-brand-green underline">UNLTD Lager</Link>, or{" "}
                  <Link to="/product/le-petit-beret-latina" className="text-brand-green underline">Le Petit Beret Latina</Link> as easy entry points.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl text-brand-green mb-2">Best NA beer for a true 0.0%</h3>
                <p>
                  If you need zero, choose Force Majeure or Le Petit Beret.{" "}
                  <Link to="/product/force-majeure-tripel" className="text-brand-green underline">Force Majeure Tripel</Link>,{" "}
                  <Link to="/product/force-majeure-traditional-blond" className="text-brand-green underline">Traditional Blond</Link>,{" "}
                  <Link to="/product/le-petit-beret-ipa-amber" className="text-brand-green underline">Le Petit Beret IPA Amber</Link>, and{" "}
                  <Link to="/product/le-petit-beret-latina" className="text-brand-green underline">Latina</Link> are confirmed 0.0% on our shelf.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl text-brand-green mb-2">Best NA beer for hop heads</h3>
                <p>
                  Stack the IPA shelf:{" "}
                  <Link to="/product/go-brewing-burn-it-down-ipa" className="text-brand-green underline">Go Brewing Burn It Down</Link>,{" "}
                  <Link to="/product/untitled-art-west-coast-ipa" className="text-brand-green underline">FLVR! West Coast IPA</Link>,{" "}
                  <Link to="/product/beaglepuss-inverse-ipa" className="text-brand-green underline">Beaglepuss Inverse IPA</Link>, and{" "}
                  <Link to="/product/woodland-farms-pointer-ipa" className="text-brand-green underline">Woodland Farms Pointer</Link>.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl text-brand-green mb-2">Best NA beer for cold weather</h3>
                <p>
                  Roast and malt forward.{" "}
                  <Link to="/product/lowtide-check-this-stout" className="text-brand-green underline">Below Brew Co. Check This Stout</Link>,{" "}
                  <Link to="/product/go-brewing-street-cred-after-hours-porter" className="text-brand-green underline">Go Brewing After Hours Porter</Link>,{" "}
                  <Link to="/product/untitled-art-smores-dark-brew-copy" className="text-brand-green underline">FLVR! S'mores Dark Brew</Link>, and{" "}
                  <Link to="/product/force-majeure-bruin-copy" className="text-brand-green underline">Force Majeure Winterbier</Link>.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl text-brand-green mb-2">Best NA beer for tacos and the beach</h3>
                <p>
                  <Link to="/product/capacity-mexican-lager" className="text-brand-green underline">Capacity Mexican Lager</Link>,{" "}
                  <Link to="/product/mash-gang-glug-cerveza" className="text-brand-green underline">Mash Gang Glug Cerveza</Link>,{" "}
                  <Link to="/product/flvr-chela-con-limon-copy" className="text-brand-green underline">FLVR! Chela Con Limon</Link>, and{" "}
                  <Link to="/product/go-brewing-bad-arse-irish-red-copy" className="text-brand-green underline">Go Brewing Salty AF Lime Chelada</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How NA beer is made */}
        <section className="py-12 md:py-16 bg-cream/40 border-y border-foreground/10">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
              How non-alcoholic beer is actually made
            </h2>
            <p className="font-sans text-foreground/70 mb-8">
              Four production methods. The method affects the taste.
            </p>
            <div className="space-y-6 font-sans text-foreground/85 leading-relaxed">
              <div>
                <h3 className="font-serif text-xl text-brand-green mb-2">Reverse osmosis</h3>
                <p>
                  Beer is brewed normally, then forced through a membrane that
                  separates alcohol and water from the rest. Alcohol is removed.
                  The remaining concentrate is recombined with water. This method
                  preserves the most flavor and is used by most premium NA
                  brewers.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-brand-green mb-2">Vacuum distillation</h3>
                <p>
                  The beer is heated under low pressure, which lets alcohol
                  evaporate at much lower temperatures than the 173°F it
                  normally requires. Lower heat means less flavor damage.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-brand-green mb-2">Arrested fermentation</h3>
                <p>
                  Brewing is stopped before yeast converts sugar into alcohol.
                  The result is sweeter and lower in calories, often thinner in
                  body.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-brand-green mb-2">Brewed without alcohol from the start</h3>
                <p>
                  A handful of breweries develop entirely separate processes
                  that never produce alcohol at any stage. The result is true
                  0.0% with no risk of trace alcohol remaining. Force Majeure
                  and Le Petit Beret on our shelf use this approach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-10 text-center">
              Frequently Asked <span className="italic text-brand-green">Questions</span>
            </h2>
            <div className="space-y-8">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="font-sans text-foreground/85 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About + CTA */}
        <section className="py-16 md:py-24 bg-cream/40 border-t border-foreground/10">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              About this guide
            </h2>
            <div className="font-sans text-foreground/85 leading-relaxed space-y-4">
              <p>
                The Ultimate Non-Alcoholic Beer Guide is curated by Zane Curtis,
                founder of Monday Morning Bottle Shop in San Diego. Monday
                Morning carries over 500 alcohol-free beverages and was San
                Diego's first dedicated NA bottle shop. We taste every beer we
                sell. We update this guide quarterly as new brands launch and
                existing brands reformulate.
              </p>
              <p>
                Want to try anything in this guide before you commit to a
                six-pack? Visit our{" "}
                <Link to="/locations" className="text-brand-green underline hover:text-gold">
                  Pacific Beach or Ocean Beach tasting rooms
                </Link>
                . Sample anything on the shelf. Walk out with what you actually
                like.
              </p>
              <p>
                New to alcohol-free? Start with our{" "}
                <Link to="/new-to-non-alcoholic-drinks" className="text-brand-green underline hover:text-gold">
                  beginner's guide
                </Link>{" "}
                or look up the language of the space in{" "}
                <Link to="/blog/curious-af-dictionary" className="text-brand-green underline hover:text-gold">
                  The Curious AF Dictionary
                </Link>
                .
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/collections/non-alcoholic-beer"
                className="inline-block bg-brand-green text-cream px-6 py-3 font-sans uppercase tracking-widest text-sm hover:bg-gold hover:text-forest transition-colors"
              >
                Shop NA Beer
              </Link>
              <Link
                to="/blog"
                className="inline-block border border-brand-green text-brand-green px-6 py-3 font-sans uppercase tracking-widest text-sm hover:bg-brand-green hover:text-cream transition-colors"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UltimateNABeerGuide2026;
