import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const NonAlcoholicDrinks = () => (
  <AuthorityPage
    title="Non-Alcoholic Drinks: The Complete 2026 Guide to NA Beer, Wine & Spirits | Monday Morning"
    description="Everything to know about non-alcoholic drinks in 2026. Best NA beer, wine, spirits and functional drinks, plus where to buy. Curated by Monday Morning Bottle Shop."
    path="/non-alcoholic-drinks"
    ogImage={`${SITE_URL}/og-non-alcoholic-drinks.jpg`}
    eyebrow="The Pillar Guide"
    h1="Non-alcoholic drinks, properly explained"
    subhead="Beer, wine, spirits, and functional drinks that deliver the ritual of a great drink without the alcohol. This is the complete map. Use it, share it, drink from it."
    tldr="Non-alcoholic drinks are beverages under 0.5% ABV designed to replace alcohol without sacrificing taste. The category now spans craft NA beer, dealcoholized wine, complex zero-proof spirits, and functional drinks made with adaptogens or kava. The best place to start is with whatever you already drink: NA versions of beer, wine, and cocktails are now genuinely good. Skip the supermarket basics and try the small craft makers, that is where the category got serious."
    heroImage={`${SITE_URL}/og-non-alcoholic-drinks.jpg`}
    ctaPrimary={{ label: "Shop 500+ NA drinks", href: "/shop" }}
    ctaSecondary={{ label: "Visit a tasting room", href: "/locations" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "Non-Alcoholic Drinks", url: `${SITE_URL}/non-alcoholic-drinks` },
    ]}
    sections={[
      {
        heading: "What counts as a non-alcoholic drink?",
        body: (
          <>
            <p>
              In the United States, a non-alcoholic drink is any beverage at or below 0.5% ABV. That covers two distinct experiences. True 0.0% ABV products contain no alcohol at all, made by brewing, fermenting, or formulating without producing any. Sub 0.5% ABV products are typically dealcoholized: brewed or fermented normally, then run through a process that strips out the alcohol while preserving aroma and flavor.
            </p>
            <p>
              For context, a ripe banana, kombucha, and many fruit juices contain trace alcohol that hovers in the same range. The 0.5% line is regulatory, not biological.
            </p>
            <p>
              The category breaks down into four meaningful sub categories: <Link to="/non-alcoholic-beer-guide">non-alcoholic beer</Link>, non-alcoholic wine, non-alcoholic spirits, and functional drinks. Each one solves a different drinking moment. We will walk through all four.
            </p>
          </>
        ),
      },
      {
        heading: "The four categories of non-alcoholic drinks",
        body: (
          <>
            <h3>Non-alcoholic beer</h3>
            <p>
              The most mature category. Modern NA beer is genuinely indistinguishable from craft beer for many drinkers, especially in IPA, hazy, and lager styles. Brands like Beaglepuss, Below Brew Co., FLVR! (Untitled Art), Mash Gang, Capacity, and Go Brewing led the craft revolution. If you drink beer, this is where you start. See our <Link to="/blog/ultimate-non-alcoholic-beer-guide-2026">ultimate non-alcoholic beer guide for 2026</Link> for an exhaustive breakdown by style.
            </p>
            <h3>Non-alcoholic wine</h3>
            <p>
              The fastest improving category. Older NA wines were thin and grape juicy. The new generation, including Bolle, Sovi, and small dealcoholized producers, ferment a real wine first and then remove alcohol via spinning cone or vacuum distillation. The result keeps tannin structure, oak, and acidity. Sparkling NA wines are the easiest entry point because bubbles do most of the heavy lifting. Read more in our <Link to="/non-alcoholic-wine">non-alcoholic wine hub</Link>.
            </p>
            <h3>Non-alcoholic spirits</h3>
            <p>
              The most interesting category. Brands like Sentia, Almave, Glen Dochus, Ceybon, and Abstinence Spirits build flavor profiles from botanicals, peppers, and adaptogens rather than trying to clone gin or whiskey directly. Mix them like you would the alcoholic equivalent. A great NA negroni or NA paloma is a real drink, not a sad approximation. See our <Link to="/non-alcoholic-spirits">non-alcoholic spirits hub</Link>.
            </p>
            <h3>Functional drinks</h3>
            <p>
              The wildcard. Functional drinks include kava (Kava Haven, Leilo, Kavaly), adaptogenic blends (Trip, Curious Elixirs, Soul Hum), and nootropic beverages (Higher Ground, Alice Mushrooms). They are not trying to mimic alcohol. They deliver their own effect, calming, focusing, mood lifting, while replacing the social ritual of holding a drink.
            </p>
          </>
        ),
      },
      {
        heading: "How to choose your first non-alcoholic drink",
        body: (
          <>
            <p>
              The biggest mistake first time drinkers make is reaching for whichever NA product is most heavily marketed. The category is too good now to settle. Here is the real heuristic: <strong>start with the category you already drink.</strong>
            </p>
            <ul>
              <li>If you drink IPAs, try a craft hazy or West Coast NA IPA.</li>
              <li>If you drink wine at dinner, try a dealcoholized red or sparkling rosé.</li>
              <li>If you drink cocktails, buy one NA spirit and one tonic, that is your first three drinks.</li>
              <li>If you drink to relax, try a kava shot or an ashwagandha based functional drink.</li>
            </ul>
            <p>
              Avoid two traps: the first generation supermarket NA beer (the watery stuff your dad drank in 1995), and any product whose entire pitch is what it does not contain. The good NA brands lead with what they put in, not what they took out.
            </p>
          </>
        ),
      },
      {
        heading: "Where to buy non-alcoholic drinks",
        body: (
          <>
            <p>
              You have three options, in roughly increasing order of selection.
            </p>
            <p>
              <strong>Grocery and big box.</strong> Convenient, narrow. Expect three to five brands at most, mostly the big names. Fine for a quick grab.
            </p>
            <p>
              <strong>Online specialty retailers.</strong> Wide selection, ships nationally. The downside is shipping cost on heavy bottles and not being able to try before you buy.
            </p>
            <p>
              <strong>Dedicated NA bottle shops.</strong> Best of both worlds, especially with an in store tasting bar. Monday Morning carries 500+ drinks across both <Link to="/locations">San Diego locations</Link> in Pacific Beach and Ocean Beach, and ships everything online. If you are in San Diego, see <Link to="/non-alcoholic-drinks-san-diego">our local guide</Link>.
            </p>
          </>
        ),
      },
      {
        heading: "Why people are drinking less in 2026",
        body: (
          <>
            <p>
              The shift is generational and structural, not a fad. Roughly 61% of Gen Z and 49% of Millennials report drinking less than the previous generation at the same age, according to multiple 2024 to 2025 industry surveys. The reasons stack:
            </p>
            <ul>
              <li>Sleep tracking made the cost of alcohol visible.</li>
              <li>Wearables made next day performance measurable.</li>
              <li>Cannabis legalization gave people an alternative for relaxation.</li>
              <li>The 2023 WHO statement that no level of alcohol consumption is safe for health changed the cultural baseline.</li>
              <li>And critically, the alternatives finally got good.</li>
            </ul>
            <p>
              For a deeper read on the lifestyle side, see our guide to <Link to="/alcohol-free-lifestyle-benefits">the benefits of an alcohol-free lifestyle</Link>.
            </p>
          </>
        ),
      },
      {
        heading: "The vocabulary of drinking less",
        body: (
          <>
            <p>
              The category invented its own language faster than the dictionary could keep up. Sober-curious. Damp. California sober. Zero-proof. NA. Mindful drinking. Each term means something specific. We wrote a full glossary so you can navigate any conversation: <Link to="/blog/curious-af-dictionary">the Curious AF Dictionary</Link>.
            </p>
          </>
        ),
      },
      {
        heading: "Related guides",
        body: (
          <>
            <p>Pick the cluster that matches what you actually want to drink.</p>
            <ul>
              <li><Link to="/non-alcoholic-beer-guide">Non-alcoholic beer guide</Link>: every style, every brand worth drinking.</li>
              <li><Link to="/non-alcoholic-spirits">Non-alcoholic spirits hub</Link>: how to build a zero-proof bar.</li>
              <li><Link to="/non-alcoholic-wine">Non-alcoholic wine hub</Link>: dealcoholized red, white, rosé, and sparkling.</li>
              <li><Link to="/sober-curious-guide">Sober-curious guide</Link>: how to actually drink less without isolating yourself.</li>
              <li><Link to="/best-non-alcoholic-drinks">The best non-alcoholic drinks of 2026</Link>: our editorial picks across every category.</li>
            </ul>
          </>
        ),
      },
    ]}
    faqs={[
      { question: "Are non-alcoholic drinks actually alcohol-free?", answer: "Most are below 0.5% ABV, the legal threshold, and many are 0.0% ABV. The trace amount in a 0.5% drink is comparable to a ripe banana or a glass of orange juice. If you need fully zero, look for products labeled 0.0%." },
      { question: "Do non-alcoholic drinks taste like the real thing?", answer: "The best ones do, in the same way good decaf tastes like coffee: same category, slightly different experience. Modern craft NA beer, dealcoholized wine, and well made NA spirits compete directly with their alcoholic counterparts on flavor and complexity." },
      { question: "Will I feel anything when I drink non-alcoholic drinks?", answer: "Not from the alcohol, because there essentially is none. But functional drinks made with kava, adaptogens, or nootropics are designed to deliver an actual physical effect, ranging from calming to mildly euphoric." },
      { question: "Can I drink non-alcoholic drinks if I am pregnant?", answer: "Talk to your doctor. Most non-alcoholic beer contains trace alcohol below 0.5% ABV, similar to fruit juice. Many providers consider this acceptable, but some recommend avoiding any product that contains any alcohol at all. We have a dedicated guide on non-alcoholic beer and pregnancy." },
      { question: "Are non-alcoholic drinks safe for people in recovery?", answer: "It depends entirely on the individual and their program. Some recovery communities welcome NA drinks. Others avoid anything that mimics alcohol because the ritual itself can be triggering. Talk to your sponsor or therapist before incorporating them." },
      { question: "How much do non-alcoholic drinks cost?", answer: "Roughly the same as the alcoholic equivalent. A craft NA beer runs four to six dollars per can. NA wine runs eighteen to thirty per bottle. NA spirits run twenty five to fifty per bottle. The price reflects the production cost of making something that tastes good without alcohol, which is harder, not easier." },
      { question: "Why does some non-alcoholic beer cost more than regular beer?", answer: "Dealcoholization is an extra production step, and small craft NA brewers do not have the volume of legacy beer companies. You are paying for craft, not for the absence of alcohol." },
      { question: "What is the difference between non-alcoholic and alcohol-free?", answer: "In US labeling, both terms typically refer to products under 0.5% ABV. In some markets and on some labels, alcohol-free specifically means 0.0% ABV. When in doubt, check the label." },
    ]}
    relatedLinks={[
      { label: "Non-alcoholic beer guide", href: "/non-alcoholic-beer-guide", description: "Every style, every brand worth drinking, ranked." },
      { label: "Non-alcoholic spirits hub", href: "/non-alcoholic-spirits", description: "Build a zero-proof bar that actually works." },
      { label: "Non-alcoholic wine hub", href: "/non-alcoholic-wine", description: "Dealcoholized red, white, rosé, and sparkling." },
      { label: "Sober-curious guide", href: "/sober-curious-guide", description: "How to drink less without missing out." },
      { label: "Best non-alcoholic drinks 2026", href: "/best-non-alcoholic-drinks", description: "Editorial picks across every category." },
      { label: "Curious AF Dictionary", href: "/blog/curious-af-dictionary", description: "The vocabulary of drinking less." },
    ]}
  />
);

export default NonAlcoholicDrinks;
