import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const NonAlcoholicSpirits = () => (
  <AuthorityPage
    title="Non-Alcoholic Spirits: Best NA Gin, Whiskey & Tequila 2026 | Monday Morning"
    description="The 2026 buyer's guide to non-alcoholic spirits. Best NA gin, whiskey, tequila, agave and aperitifs, ranked by Monday Morning's San Diego tasting room staff."
    path="/non-alcoholic-spirits"
    ogImage={`${SITE_URL}/og-non-alcoholic-spirits.jpg`}
    eyebrow="Cluster Hub"
    h1="Non-alcoholic spirits, the complete buyer's guide"
    subhead="The most exciting corner of the zero-proof world. Real botanicals, real complexity, mixed exactly like the alcoholic version. Here is what to buy and how to use it."
    tldr="Non-alcoholic spirits are botanical or distillate based liquids designed to replace gin, whiskey, tequila, agave, and aperitifs in cocktails. The good ones (Sentia, Almave, Glen Dochus, Ceybon, Abstinence) are not trying to clone alcohol, they are building parallel flavor profiles that work in the same recipes. Build your zero-proof bar with one base spirit, one aperitif, one citrus, and one tonic. That covers ten cocktails. Expect to pay $25 to $50 per bottle."
    heroImage={`${SITE_URL}/og-non-alcoholic-spirits.jpg`}
    ctaPrimary={{ label: "Shop NA spirits", href: "/collections/spirit-alternatives" }}
    ctaSecondary={{ label: "Visit a tasting room", href: "/locations" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "Non-Alcoholic Drinks", url: `${SITE_URL}/non-alcoholic-drinks` },
      { name: "Non-Alcoholic Spirits", url: `${SITE_URL}/non-alcoholic-spirits` },
    ]}
    sections={[
      {
        heading: "What is a non-alcoholic spirit, really?",
        body: (
          <>
            <p>
              A non-alcoholic spirit is a concentrated, savory or aromatic liquid built from botanicals, distillates, salts, peppers, and bitter compounds, designed to behave like its alcoholic counterpart in a cocktail. The category includes NA gin, NA whiskey, NA tequila and agave, NA rum, and a growing list of aperitifs and amari.
            </p>
            <p>
              The best NA spirits are not trying to taste exactly like the alcoholic version. They are building a parallel flavor profile that performs the same role in a recipe. Think of it like decaf espresso: not identical to caffeinated, but it does the job in a latte.
            </p>
            <p>
              You drink them mixed, never neat. Alcohol carries weight and warmth that water and botanicals do not. A great NA spirit shines in a tonic, a sour, a stirred drink, or a highball. Pour it over ice without a mixer and it will feel thin. That is not a defect, it is the medium.
            </p>
          </>
        ),
      },
      {
        heading: "The categories of non-alcoholic spirits",
        body: (
          <>
            <h3>NA gin and botanical spirits</h3>
            <p>
              The most developed category. The gin format, juniper, citrus, herbs, translates beautifully without alcohol because the flavor was never about the booze in the first place. Look at Abstinence Spirits' Cape Citrus and Cape Spice. These are real cocktail bases.
            </p>
            <h3>NA agave and tequila alternatives</h3>
            <p>
              The breakout category of 2025 to 2026. <strong>Almave</strong>, the Lewis Hamilton backed brand, makes a Blanco and an Ámbar that hold up in a paloma or margarita the way an actual tequila would. Smoky, peppery, citrus forward. If you only buy one NA spirit, this is the one.
            </p>
            <h3>NA whiskey and dark spirits</h3>
            <p>
              The hardest category to nail because whiskey is so much about the burn. <strong>Glen Dochus</strong> is the leader here. Worth the price for a serious old fashioned or whiskey sour.
            </p>
            <h3>NA aperitifs and amari</h3>
            <p>
              The sleeper hit. <strong>Sentia</strong> (Gold and Black) is built on GABA active botanicals and gives you the bittersweet, slightly buzzy experience of an amaro. Pour it on rocks with soda and a twist. Real drink, real moment.
            </p>
            <h3>Botanical and adaptogenic spirits</h3>
            <p>
              <strong>Ceybon</strong>, <strong>Force Majeure</strong>, and <strong>Curious Elixirs</strong> blur the line between spirit and functional drink. They mix like a spirit but have a designed effect, calming, mood lifting, focusing.
            </p>
          </>
        ),
      },
      {
        heading: "Our top NA spirits to buy first",
        body: (
          <>
            <p>
              We carry every brand worth carrying. These are the bottles we hand customers who walk into the shop and say "I have never tried any of this, where do I start."
            </p>
            <ol>
              <li><strong>Almave Blanco</strong>, for anyone who likes tequila, mezcal, or paloma cocktails.</li>
              <li><strong>Sentia Gold</strong>, for anyone who likes amaro, vermouth, or bittersweet aperitifs.</li>
              <li><strong>Glen Dochus</strong>, for whiskey drinkers, in an old fashioned or neat with a single ice cube.</li>
              <li><strong>Abstinence Cape Citrus</strong>, for gin drinkers, in a tonic with grapefruit.</li>
              <li><strong>Ceybon</strong>, for the curious, neat with soda or as a base for a fancier cocktail.</li>
              <li><strong>Bravus distillate</strong>, for the home bartender who wants a budget conscious base.</li>
            </ol>
          </>
        ),
      },
      {
        heading: "How to build a zero-proof bar",
        body: (
          <>
            <p>
              You do not need ten bottles. You need four. With those four you can make ten genuinely good cocktails for years. Here is the formula:
            </p>
            <ul>
              <li><strong>One base spirit.</strong> Almave Blanco or Abstinence Cape Citrus.</li>
              <li><strong>One aperitif.</strong> Sentia Gold.</li>
              <li><strong>One whiskey style.</strong> Glen Dochus.</li>
              <li><strong>One mixer arsenal.</strong> Quality tonic (Fever Tree), soda water, fresh citrus, simple syrup, bitters (most have negligible alcohol but check labels).</li>
            </ul>
            <p>
              That is the entire bar. With it you can make: a paloma, a margarita, a negroni, an old fashioned, a whiskey sour, a gin and tonic, a Sentia spritz, a highball, and a daiquiri variant. For deeper recipes see our <Link to="/recipes">recipe library</Link> or the dedicated <Link to="/zero-proof-home-bar">zero-proof home bar guide</Link>.
            </p>
          </>
        ),
      },
      {
        heading: "What about Seedlip and Athletic?",
        body: (
          <>
            <p>
              We do not carry Seedlip. The category has matured beyond it. The newer NA spirits, especially Almave, Sentia, and Glen Dochus, perform better in cocktails for less or comparable money. Same goes for big box NA beer brands. We curate to what holds up against alcohol on the back bar, not what has the largest marketing budget.
            </p>
          </>
        ),
      },
      {
        heading: "Cost, quality, and what you are paying for",
        body: (
          <>
            <p>
              Expect to pay $25 to $50 per 750ml bottle of premium NA spirit. That is comparable to a mid range bottle of gin or tequila. The price reflects:
            </p>
            <ul>
              <li>Real botanical sourcing and distillation.</li>
              <li>Small batch production at low volumes.</li>
              <li>The complexity of building flavor without alcohol's natural carrier.</li>
            </ul>
            <p>
              You are not paying a "non-alcoholic premium." You are paying for craft. The cheap NA spirits taste cheap. Skip them.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      { question: "Do you drink non-alcoholic spirits neat?", answer: "Generally no. NA spirits are built to be mixed. Without the warmth alcohol provides, they feel thin neat. Mix them in tonics, sours, stirred cocktails, or highballs." },
      { question: "Will an NA spirit get me anywhere close to a buzz?", answer: "Not from alcohol. Some, like Sentia and Ceybon, contain functional botanicals that produce a mild calming or mood lifting effect. It is real but subtle, not equivalent to alcohol." },
      { question: "How long does an open bottle of NA spirit last?", answer: "Most last 4 to 6 months refrigerated after opening. Without alcohol as a preservative, oxidation matters. Keep them in the fridge once opened." },
      { question: "Can I substitute NA spirits 1 to 1 in a recipe?", answer: "Yes for most recipes. The proportions translate directly because you are replacing the spirit's flavor role, not its ABV. Some stirred drinks taste better with slightly less NA spirit than alcoholic, because there is no alcoholic burn to balance." },
      { question: "What is the best NA spirit for a margarita?", answer: "Almave Blanco. It has the agave forward profile, salinity, and mild peppery bite that make a margarita work. Pair with fresh lime, agave syrup, and a salt rim." },
      { question: "Do NA spirits expire?", answer: "Unopened, most last 12 to 24 months. Once opened, refrigerate and use within 4 to 6 months. Check the label for specifics." },
      { question: "Are NA spirits gluten free or vegan?", answer: "Most are gluten free and vegan, but check individual labels. Anything with honey or dairy components will be flagged." },
      { question: "Can I order NA spirits online?", answer: "Yes. Monday Morning ships our full catalog of NA spirits across the US. Local San Diego customers can shop in store at our Pacific Beach or Ocean Beach locations." },
    ]}
    relatedLinks={[
      { label: "Best Non-Alcoholic Tequila", href: "/best-non-alcoholic-tequila", description: "Almave Blanco and Ámbar, ranked and explained." },
      { label: "Best Non-Alcoholic Whiskey", href: "/best-non-alcoholic-whiskey", description: "Glen Dochus, old fashioneds, and slow sipping." },
      { label: "Best Non-Alcoholic Gin", href: "/best-non-alcoholic-gin", description: "Abstinence Cape Citrus and Cape Spice for tonics and sours." },
      { label: "Pillar: Non-alcoholic drinks", href: "/non-alcoholic-drinks", description: "The complete category overview." },
      { label: "Zero-proof home bar", href: "/zero-proof-home-bar", description: "Four bottles, ten cocktails, full setup." },
      { label: "Cutwater alcohol content", href: "/cutwater-alcohol-content", description: "What Cutwater actually contains, vs the NA alternatives." },
    ]}
  />
);

export default NonAlcoholicSpirits;
