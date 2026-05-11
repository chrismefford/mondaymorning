import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const FunctionalMocktailsAdaptogens = () => (
  <AuthorityPage
    title="Functional Mocktails & Adaptogens: Drinks That Do Something | Monday Morning"
    description="Mocktails built with kava, ashwagandha, reishi, and lion's mane. Five recipes, the brands we carry, and how adaptogen drinks actually work."
    path="/functional-mocktails-adaptogens"
    ogImage={`${SITE_URL}/og-functional-mocktails.jpg`}
    eyebrow="Cluster Hub"
    h1="Functional mocktails and adaptogen drinks"
    subhead="Drinks that taste like cocktails and do something more. The science behind adaptogens, the brands worth buying, and five recipes you can make tonight."
    tldr="A functional mocktail is a non alcoholic cocktail built around an active ingredient: kava for calm, lion's mane for focus, reishi or ashwagandha for stress, magnesium for sleep. The format matters because dose, timing, and ritual all change the effect. Top brands we stock: Leilo and Kavaly (kava), Alice Mushrooms (reishi and lion's mane), Soul Hum Elixirs (adaptogen elixirs), Sentia (botanical mood), Trip (CBD), and Curious Elixirs (full ready-to-pour). Recipes below use these as base spirits. Expect onset in 15 to 40 minutes depending on the active ingredient."
    heroImage={`${SITE_URL}/og-functional-mocktails.jpg`}
    ctaPrimary={{ label: "Shop functional drinks", href: "/collections/functional" }}
    ctaSecondary={{ label: "Visit a tasting room", href: "/locations" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "Non Alcoholic Drinks", url: `${SITE_URL}/non-alcoholic-drinks` },
      { name: "Functional Mocktails", url: `${SITE_URL}/functional-mocktails-adaptogens` },
    ]}
    sections={[
      {
        heading: "What makes a mocktail 'functional'",
        body: (
          <>
            <p>
              A regular mocktail tastes like a cocktail. A functional mocktail does something. The difference is one or two ingredients: an adaptogen, a nootropic, a calming root, or a botanical blend that interacts with your nervous system in a measurable way.
            </p>
            <p>
              The four most useful actives in 2026:
            </p>
            <ul>
              <li><strong>Kava</strong>, for calm and social ease. Acts on GABA receptors. Onset 15 to 30 minutes.</li>
              <li><strong>Ashwagandha</strong>, for stress and cortisol balance. Builds with daily use.</li>
              <li><strong>Reishi and lion's mane</strong>, mushrooms for evening calm and morning focus respectively.</li>
              <li><strong>Magnesium and L-theanine</strong>, for sleep and steady focus.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "Five functional mocktails to make tonight",
        body: (
          <>
            <h3>1. The Coastal Calm (kava base)</h3>
            <ul>
              <li>2 oz Leilo Original Kava</li>
              <li>3 oz coconut water</li>
              <li>0.5 oz fresh lime juice</li>
              <li>Crushed ice, mint sprig</li>
            </ul>
            <p>Build over crushed ice. Stir gently. Garnish with mint. Drinks like a beach cocktail, calms like a glass of wine.</p>
            <h3>2. The Sentia Spritz (botanical mood)</h3>
            <ul>
              <li>2 oz Sentia Red</li>
              <li>3 oz dry sparkling water</li>
              <li>Orange peel</li>
            </ul>
            <p>Pour Sentia over ice, top with sparkling water, express orange oil. Drinks like a Negroni spritz.</p>
            <h3>3. The Morning Mushroom (lion's mane focus)</h3>
            <ul>
              <li>1 sachet Alice Mushrooms Brainstorm or equivalent lion's mane elixir</li>
              <li>4 oz cold brew coffee</li>
              <li>1 oz oat milk</li>
              <li>Pinch of cinnamon</li>
            </ul>
            <p>Build over ice, stir. Tastes like a clean latte, sharpens focus over 30 minutes.</p>
            <h3>4. The Reishi Nightcap</h3>
            <ul>
              <li>1 oz Soul Hum Elixirs Sleep or equivalent reishi tincture</li>
              <li>4 oz tart cherry juice</li>
              <li>Splash of lemon</li>
              <li>Rosemary sprig</li>
            </ul>
            <p>Stir, serve in a coupe. Drinks like a sour, helps you wind down.</p>
            <h3>5. The Curious Old Fashioned</h3>
            <ul>
              <li>3 oz Curious Elixirs No. 1</li>
              <li>Large ice cube</li>
              <li>Orange peel</li>
            </ul>
            <p>Pour over ice. Express orange oil, drop in. This is the closest functional drink to a real Old Fashioned we have served.</p>
          </>
        ),
      },
      {
        heading: "How long until you feel it",
        body: (
          <>
            <p>
              Timing matters. Plan your drink around when you want the effect to peak.
            </p>
            <ul>
              <li><strong>Kava</strong>: 15 to 30 minutes to onset, peaks at 60 to 90 minutes, lingers 2 to 3 hours.</li>
              <li><strong>L-theanine</strong> (in matcha, some blends): 20 to 40 minutes, peaks at 1 to 2 hours.</li>
              <li><strong>Reishi and ashwagandha</strong>: subtle on a single dose, real effects build with daily use over 1 to 2 weeks.</li>
              <li><strong>Lion's mane</strong>: noticeable focus shift in 30 to 60 minutes for most people.</li>
              <li><strong>CBD</strong>: 30 to 60 minutes, depending on dose and format.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "What to buy first",
        body: (
          <>
            <ol>
              <li><strong>Leilo Original Kava.</strong> The cleanest, easiest entry into kava.</li>
              <li><strong>Sentia Red.</strong> Botanical mood drink that holds its own in a coupe.</li>
              <li><strong>Alice Mushrooms Brainstorm.</strong> Mushroom chocolate built for focus.</li>
              <li><strong>Soul Hum Elixirs.</strong> Adaptogen-forward, mixable.</li>
              <li><strong>Curious Elixirs No. 1 or No. 2.</strong> Ready-to-pour, no recipe needed.</li>
              <li><strong>Trip CBD.</strong> Subtle, sparkling, sessionable.</li>
            </ol>
            <p>
              All six are on the shelf today. Sample any of them at our <Link to="/locations">tasting rooms</Link> before you commit.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      { question: "What is a functional mocktail?", answer: "A non alcoholic cocktail built around an active ingredient like kava, an adaptogen, or a nootropic that produces a real, measurable effect on mood, focus, or relaxation. The format matters: dose, timing, and ritual all influence the outcome." },
      { question: "Do adaptogen drinks actually work?", answer: "Yes, with two caveats. Kava and lion's mane produce noticeable effects from a single dose. Reishi and ashwagandha require consistent use over days or weeks. Real effects come from real ingredients at real doses, check labels and avoid sugar bombs that hide tiny amounts of active." },
      { question: "Can I mix functional drinks with alcohol?", answer: "No. Kava interacts with alcohol and amplifies sedation. Most adaptogens are gentle but mixing with alcohol defeats the purpose. If you want a buzz, choose one or the other." },
      { question: "Is kava legal in California?", answer: "Yes. Kava is legal in all 50 states and is widely sold in functional drinks, supplements, and tea." },
      { question: "What's the best functional drink for sleep?", answer: "A reishi-based drink (Soul Hum Sleep, Alice Mushrooms Nightcap) or a magnesium-and-L-theanine blend taken 30 to 60 minutes before bed. Tart cherry juice as a mixer adds natural melatonin." },
      { question: "How much do functional drinks cost?", answer: "Single-serve bottles run $5 to $9. Larger format bottles like Curious Elixirs or Sentia are $25 to $35 and stretch over multiple servings. Kava tinctures and adaptogen powders are the most cost-efficient long term." },
      { question: "Can I drink them every day?", answer: "Most adaptogens are designed for daily use. Kava is best 3 to 5 nights a week. CBD can be daily. Read individual product labeling, and rotate ingredients if you want to avoid building tolerance to any single one." },
      { question: "Where can I sample functional drinks in San Diego?", answer: "Monday Morning carries 30 plus functional brands at our North Park and Ocean Beach tasting rooms. Walk in, tell the team what you want (calm, focus, sleep, energy) and they'll pour samples." },
    ]}
    relatedLinks={[
      { label: "NA Drinks for Relaxation", href: "/na-drinks-for-relaxation", description: "Deep dive on kava and the bottles that calm you down." },
      { label: "Beginner's Guide to Non Alcoholic Drinks", href: "/beginners-guide-non-alcoholic-drinks", description: "Where to start across all four NA categories." },
      { label: "Zero Proof Home Bar", href: "/zero-proof-home-bar", description: "Build a functional home bar from scratch." },
      { label: "Non Alcoholic Spirits Hub", href: "/non-alcoholic-spirits", description: "The mixable bottles that make every cocktail." },
    ]}
  />
);

export default FunctionalMocktailsAdaptogens;
