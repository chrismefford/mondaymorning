import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const ZeroProofHomeBar = () => (
  <AuthorityPage
    title="The Zero Proof Home Bar: A 2026 Setup Guide"
    description="Build a non alcoholic home bar with four bottles, ten cocktails, and zero compromise. The complete setup guide from Monday Morning Bottle Shop."
    path="/zero-proof-home-bar"
    ogImage={`${SITE_URL}/og-zero-proof-home-bar.jpg`}
    eyebrow="Spirits Cluster"
    h1="The zero proof home bar"
    subhead="Four bottles. Ten cocktails. One night to set up. Here is the smartest way to build a non alcoholic bar that actually gets used."
    tldr="A great zero proof home bar needs four bottles: one base spirit (Almave Blanco), one aperitif (Sentia Gold), one whiskey style (Glen Dochus), and one botanical or gin style (Abstinence Cape Citrus). Add quality tonic, fresh citrus, simple syrup, and ice. With this setup you can make a paloma, margarita, negroni, old fashioned, whiskey sour, gin and tonic, spritz, highball, and daiquiri variant. Total cost: $120 to $200. Total cocktails: ten genuinely good drinks for years."
    heroImage={`${SITE_URL}/og-zero-proof-home-bar.jpg`}
    ctaPrimary={{ label: "Shop NA spirits", href: "/collections/spirit-alternatives" }}
    ctaSecondary={{ label: "Visit a tasting room", href: "/locations" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "Non Alcoholic Spirits", url: `${SITE_URL}/non-alcoholic-spirits` },
      { name: "Zero Proof Home Bar", url: `${SITE_URL}/zero-proof-home-bar` },
    ]}
    sections={[
      {
        heading: "Why most zero proof home bars fail",
        body: (
          <>
            <p>
              The mistake is buying ten bottles because the marketing is exciting and then never using any of them. NA spirits are not collectibles. They are working tools. A great home bar has the smallest set of bottles that covers the largest set of cocktails.
            </p>
            <p>
              The trick is choosing bottles that overlap usefully. Almave Blanco can stand in for tequila, mezcal, or even vodka in many recipes. Sentia Gold replaces vermouth, Campari, or amaro depending on how you use it. Four bottles, picked correctly, do the work of ten.
            </p>
          </>
        ),
      },
      {
        heading: "The four bottle setup",
        body: (
          <>
            <h3>Bottle 1: Almave Blanco (or Ámbar)</h3>
            <p>
              Your agave and tequila replacement. Smoky, peppery, citrus forward. Drives the paloma, margarita, and any tequila highball. The Ámbar swaps in for reposado or añejo style drinks.
            </p>
            <h3>Bottle 2: Sentia Gold</h3>
            <p>
              Your aperitif. Bittersweet, complex, slightly buzzy from GABA active botanicals. Drives the negroni stand in, spritz, and any drink that wants vermouth or amaro. Pour on rocks with soda for an instant cocktail.
            </p>
            <h3>Bottle 3: Glen Dochus</h3>
            <p>
              Your whiskey. Drives the old fashioned, the whiskey sour, the highball. The hardest NA spirit category to nail and Glen Dochus nails it.
            </p>
            <h3>Bottle 4: Abstinence Cape Citrus</h3>
            <p>
              Your botanical and gin replacement. Drives the gin and tonic, the gimlet, and any herb forward cocktail. Pair with Fever Tree tonic and grapefruit.
            </p>
          </>
        ),
      },
      {
        heading: "The ten cocktails this setup makes",
        body: (
          <>
            <ol>
              <li><strong>Paloma.</strong> Almave Blanco, fresh grapefruit, lime, soda, salt rim.</li>
              <li><strong>Margarita.</strong> Almave Blanco, lime, agave syrup, salt rim.</li>
              <li><strong>NA Negroni.</strong> Equal parts Almave, Sentia Gold, and a citrus tonic. Stir, orange peel.</li>
              <li><strong>Old Fashioned.</strong> Glen Dochus, simple syrup, bitters, orange peel, big ice cube.</li>
              <li><strong>Whiskey Sour.</strong> Glen Dochus, lemon, simple syrup, optional egg white.</li>
              <li><strong>Gin and Tonic.</strong> Abstinence Cape Citrus, Fever Tree tonic, grapefruit wedge.</li>
              <li><strong>Sentia Spritz.</strong> Sentia Gold over ice with soda, lemon twist.</li>
              <li><strong>Highball.</strong> Glen Dochus, soda, lemon. Tall glass, lots of ice.</li>
              <li><strong>NA Daiquiri.</strong> Almave Blanco, lime, simple syrup. Shake, fine strain.</li>
              <li><strong>Gimlet.</strong> Abstinence Cape Citrus, lime cordial, on ice.</li>
            </ol>
          </>
        ),
      },
      {
        heading: "Your mixer arsenal",
        body: (
          <>
            <ul>
              <li><strong>Fever Tree tonics.</strong> Indian, Mediterranean, Refreshingly Light. The best cocktail tonics on the market.</li>
              <li><strong>Topo Chico or Mexican soda water.</strong> Better mineral content than club soda.</li>
              <li><strong>Fresh citrus.</strong> Lime, lemon, grapefruit, orange. No bottled juice.</li>
              <li><strong>Simple syrup.</strong> Equal parts sugar and water, simmer briefly.</li>
              <li><strong>Lime cordial.</strong> Rose's works, fresh is better.</li>
              <li><strong>Bitters.</strong> Most have negligible alcohol but check labels if 0.0% matters to you.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "Your tools",
        body: (
          <>
            <p>
              Same as any home bar.
            </p>
            <ul>
              <li>Boston shaker tin and pint glass.</li>
              <li>Hawthorne strainer and fine mesh strainer.</li>
              <li>Jigger with 1oz and 2oz sides.</li>
              <li>Bar spoon.</li>
              <li>Y peeler for citrus twists.</li>
              <li>Big ice mold for old fashioneds.</li>
              <li>Coupe glasses, rocks glasses, highball glasses, white wine glasses for spritzes.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "What to skip",
        body: (
          <>
            <p>
              We do not recommend Seedlip for a starter bar. The newer NA spirits, Almave, Sentia, Glen Dochus, perform better in cocktails for similar money. Skip kits that bundle ten products you will never finish. And skip anything sold as a "non alcoholic vodka." The category exists but the use case is narrow.
            </p>
            <p>
              For more on the spirit category, see our <Link to="/non-alcoholic-spirits">non alcoholic spirits hub</Link>.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      { question: "How much does a zero proof home bar cost to set up?", answer: "$120 to $200 for the four core bottles. Another $40 to $80 for tonics, mixers, and tools if starting from scratch. Roughly the same as a competent alcoholic home bar of the same size." },
      { question: "How long do open NA spirit bottles last?", answer: "4 to 6 months refrigerated after opening. Without alcohol as a preservative, oxidation matters more. Keep bottles in the fridge once opened." },
      { question: "Can I substitute NA spirits 1 to 1 in regular cocktail recipes?", answer: "Yes for most recipes. Pour the same volume the recipe calls for. Some stirred drinks taste better with slightly less NA spirit because there is no alcoholic burn to balance." },
      { question: "What is the best NA cocktail to make first?", answer: "A Paloma. Almave Blanco, fresh grapefruit juice, lime, a little salt, top with soda. Salt rim. Two minutes to make and immediately convincing." },
      { question: "Do I need bitters in a non alcoholic cocktail?", answer: "Bitters help the same way they do in regular cocktails: they add complexity. The alcohol content per dash is negligible. If you are strict about 0.0%, skip them or use an alcohol free bitter substitute." },
      { question: "Can I use these recipes for hosting parties?", answer: "Yes. The Paloma, Negroni, and Spritz scale well. Batch the spirits, citrus, and syrup ahead, top with bubbles to order." },
      { question: "Where can I buy these NA spirits?", answer: "Monday Morning carries Almave, Sentia, Glen Dochus, and Abstinence Spirits in store at our San Diego locations and online with US shipping." },
    ]}
    relatedLinks={[
      { label: "Non alcoholic spirits hub", href: "/non-alcoholic-spirits", description: "The complete spirits guide." },
      { label: "Pillar: Non alcoholic drinks", href: "/non-alcoholic-drinks", description: "The complete category overview." },
      { label: "Best non alcoholic drinks 2026", href: "/best-non-alcoholic-drinks", description: "Editorial picks across categories." },
      { label: "Cutwater alcohol content", href: "/cutwater-alcohol-content", description: "Compare with the alcoholic version." },
    ]}
  />
);

export default ZeroProofHomeBar;
