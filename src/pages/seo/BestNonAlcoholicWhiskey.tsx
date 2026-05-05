import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const BestNonAlcoholicWhiskey = () => (
  <AuthorityPage
    title="The Best Non Alcoholic Whiskey of 2026 | Monday Morning"
    description="The best non alcoholic whiskey in 2026. Glen Dochus, how to use it in old fashioneds and highballs, and why NA whiskey is the hardest spirit to fake."
    path="/best-non-alcoholic-whiskey"
    ogImage={`${SITE_URL}/og-best-non-alcoholic-whiskey.jpg`}
    eyebrow="Spirits Cluster"
    h1="The best non alcoholic whiskey, ranked and explained"
    subhead="Whiskey is the hardest spirit to fake. The oak, the heat, the long finish. A small handful of brands are getting it right. Here is what to buy, what to skip, and how to actually use it."
    tldr="Non alcoholic whiskey is the hardest category in the zero proof world. The flavor of whiskey, oak, vanilla, smoke, leather, is half alcohol heat. Without alcohol, you have to rebuild it from extracts and botanicals. Glen Dochus is the standard bearer: a Scottish style NA whiskey with peat smoke, oak, and a real long finish. Use 2 oz in an old fashioned, a highball with ginger beer, or a hot toddy. Expect to pay $35 to $50 per bottle. Mix it, do not sip it neat."
    heroImage={`${SITE_URL}/og-best-non-alcoholic-whiskey.jpg`}
    ctaPrimary={{ label: "Shop NA whiskey", href: "/collections/spirit-alternatives" }}
    ctaSecondary={{ label: "Visit a tasting room", href: "/locations" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "Non Alcoholic Drinks", url: `${SITE_URL}/non-alcoholic-drinks` },
      { name: "Non Alcoholic Spirits", url: `${SITE_URL}/non-alcoholic-spirits` },
      { name: "Best NA Whiskey", url: `${SITE_URL}/best-non-alcoholic-whiskey` },
    ]}
    sections={[
      {
        heading: "Why non alcoholic whiskey is the hardest category",
        body: (
          <>
            <p>
              Whiskey is half alcohol. The heat, the warming finish, the way it coats your throat, all of that is ethanol. Take it out and you have to rebuild the experience from extracts: oak char, vanilla, smoke, leather, dark fruit, a hint of sweetness, and most importantly, a long finish.
            </p>
            <p>
              For a long time, no one could pull it off. Most NA whiskeys tasted like watery iced tea with a smoke bomb in it. The category turned a corner when a few small distilleries started using real charred oak, peat smoke, and slow extraction to build a believable spirit.
            </p>
            <p>
              The benchmark is now Glen Dochus, a Scottish style NA whiskey that gets remarkably close to the real thing. It is not a clone. It is a parallel flavor profile that performs in the same recipes.
            </p>
          </>
        ),
      },
      {
        heading: "Glen Dochus: the bottle to buy",
        body: (
          <>
            <p>
              Glen Dochus is built from real charred oak, peat smoke, and a base of grain distillate that has had the alcohol removed. The result is a complex, peat forward, slightly sweet liquid with a genuinely long finish. You taste smoke first, then oak, then a hint of dried fruit, then a warm tingle that lingers.
            </p>
            <p>It works in:</p>
            <ul>
              <li>Old fashioneds with a sugar cube and bitters</li>
              <li>Highballs with ginger beer or soda</li>
              <li>Hot toddies with lemon, honey, and clove</li>
              <li>A neat pour over a single big ice cube</li>
            </ul>
            <p>
              The "neat" pour is the surprising one. Most NA spirits fall apart without a mixer. Glen Dochus has enough body and finish to stand alone for a few minutes of slow sipping. It is not as warming as actual whiskey, but the flavor is there.
            </p>
          </>
        ),
      },
      {
        heading: "Three cocktails to make tonight",
        body: (
          <>
            <h3>The Zero Proof Old Fashioned</h3>
            <p>
              2 oz Glen Dochus, 1 sugar cube or 0.25 oz simple syrup, 3 dashes aromatic bitters, 1 dash orange bitters. Stir with ice for 20 seconds, strain over a single big rock, express an orange peel and drop it in. The most satisfying NA cocktail in existence.
            </p>
            <h3>The Smoke and Ginger Highball</h3>
            <p>
              2 oz Glen Dochus, 0.5 oz fresh lemon juice, 4 oz spicy ginger beer. Build in a tall glass over ice, garnish with a lemon twist and a piece of crystallized ginger. Bright, smoky, dangerously easy to drink.
            </p>
            <h3>The NA Hot Toddy</h3>
            <p>
              2 oz Glen Dochus, 0.5 oz fresh lemon juice, 0.5 oz honey, 4 oz hot water, 2 cloves and a cinnamon stick. Stir until the honey dissolves. Drink before bed when you have a cold or just feel like it.
            </p>
          </>
        ),
      },
      {
        heading: "How to drink NA whiskey like you mean it",
        body: (
          <>
            <p>
              <strong>Use big ice.</strong> A single large rock dilutes slowly and keeps the drink cold without watering it out. Crushed ice is for juleps. Pebble ice is for highballs.
            </p>
            <p>
              <strong>Bitters are non negotiable.</strong> The bitter and aromatic compounds in Angostura, Peychaud's, and orange bitters add complexity that NA whiskey alone cannot reach. Most cocktail bitters contain alcohol but the dose is so small (a few dashes per drink) that the final ABV remains effectively zero. If you need true 0.0%, use an alcohol free bitters substitute.
            </p>
            <p>
              <strong>Garnish hard.</strong> Express an orange peel. Drop a Luxardo cherry. Use a smoking gun if you own one. The garnish carries part of the experience when alcohol is not doing the heavy lifting.
            </p>
            <p>
              <strong>Sip slowly.</strong> NA whiskey rewards patience. The finish builds. Crush it in two seconds and you will miss what is interesting about it.
            </p>
          </>
        ),
      },
      {
        heading: "Where to buy non alcoholic whiskey in San Diego",
        body: (
          <>
            <p>
              Monday Morning stocks Glen Dochus at our Pacific Beach and Ocean Beach tasting rooms. We will pour you a half ounce neat or build you an old fashioned at the bar before you commit to a bottle. The staff knows the spirit cold, ask them.
            </p>
            <p>
              We also ship Glen Dochus and the rest of our NA whiskey lineup nationally. <a href="/collections/spirit-alternatives">Shop the NA spirits collection</a>, or read our <a href="/non-alcoholic-spirits">non alcoholic spirits buyer's guide</a> for the full category context.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      {
        question: "What is the best non alcoholic whiskey?",
        answer:
          "Glen Dochus is the best non alcoholic whiskey on the market in 2026. It is a Scottish style NA whiskey with real peat smoke, oak char, and a long finish. It performs in old fashioneds, highballs, and hot toddies, and it is one of the few NA spirits that holds up neat for short slow sipping.",
      },
      {
        question: "Does non alcoholic whiskey taste like real whiskey?",
        answer:
          "The best ones get close. Glen Dochus delivers the smoke, oak, and dried fruit notes of a Scottish whiskey, plus a real long finish. What is missing is the alcoholic warmth, which is why most NA whiskey is best in a cocktail rather than neat. In an old fashioned with bitters and a single big ice cube, the difference is hard to clock.",
      },
      {
        question: "Can you make an old fashioned with non alcoholic whiskey?",
        answer:
          "Yes, and it is one of the most satisfying NA cocktails you can make. Use 2 oz Glen Dochus, a sugar cube, 3 dashes aromatic bitters, and a dash of orange bitters. Stir with ice, strain over a big rock, express an orange peel. The bitters and the long finish of the whiskey carry it.",
      },
      {
        question: "Why is non alcoholic whiskey so expensive?",
        answer:
          "Real charred oak, peat smoke, and slow extraction are expensive processes, and NA whiskey is made in small batches by independent distilleries. Expect to pay $35 to $50 per bottle. A bottle yields roughly twelve 2 oz cocktails, which makes the per drink cost reasonable for a craft cocktail experience.",
      },
      {
        question: "Is non alcoholic whiskey actually 0.0% alcohol?",
        answer:
          "Most NA whiskey is labeled at less than 0.5% ABV, the standard non alcoholic threshold in the United States and the UK. Some, like Glen Dochus, hit closer to 0.0% to 0.1%. If you need certified 0.0% for medical, religious, or recovery reasons, check the label or ask us at the tasting bar.",
      },
      {
        question: "What about non alcoholic bourbon?",
        answer:
          "True NA bourbon is harder to find than NA Scotch. The American oak, vanilla, and corn sweetness profile is tricky to rebuild without alcohol. A few brands are getting closer, but for now the best advice is to use a Scottish style NA whiskey like Glen Dochus and lean into the smoke and oak rather than chasing a bourbon clone.",
      },
    ]}
    relatedLinks={[
      { label: "Non Alcoholic Spirits Buyer's Guide", href: "/non-alcoholic-spirits", description: "The full spirits cluster: gin, whiskey, tequila, aperitifs." },
      { label: "Zero Proof Home Bar", href: "/zero-proof-home-bar", description: "The five bottle starter kit and how to use it." },
      { label: "Best Non Alcoholic Tequila", href: "/best-non-alcoholic-tequila", description: "Almave Blanco and Ámbar, ranked and explained." },
      { label: "Best Non Alcoholic Gin", href: "/best-non-alcoholic-gin", description: "Botanical bottles for tonics, sours, and martinis." },
      { label: "Non Alcoholic Drinks Pillar", href: "/non-alcoholic-drinks", description: "Every category, every use case, all in one place." },
      { label: "Dry January Guide", href: "/dry-january-guide", description: "How to do the month without white-knuckling it." },
    ]}
  />
);

export default BestNonAlcoholicWhiskey;
