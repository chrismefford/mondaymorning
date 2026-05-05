import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const BestNonAlcoholicIPAs = () => (
  <AuthorityPage
    title="The Best Non Alcoholic IPAs of 2026, Tasted and Ranked"
    description="The best non alcoholic IPAs in 2026. West Coast, hazy, double, session, and tropical NA IPAs ranked by our tasting room staff."
    path="/best-non-alcoholic-ipas"
    ogImage={`${SITE_URL}/og-best-non-alcoholic-ipas.jpg`}
    eyebrow="NA Beer Cluster"
    h1="The best non alcoholic IPAs of 2026"
    subhead="We pour every NA IPA on the market across our two San Diego tasting rooms. These are the ones that hold up against actual craft IPA, ranked by style."
    tldr="The best non alcoholic IPAs of 2026 come from craft makers who treat NA brewing as its own discipline. Top picks: Beaglepuss Inverse IPA (West Coast), FLVR! Citra Haze (hazy), Go Brewing Sunshine State (tropical), Below Brew Co. Wild Juice Chase (lower bitterness), and Mash Gang Journey Juice (UK indie hazy). Skip the supermarket NA IPAs from legacy brewers, the craft category is where the flavor is. Expect to pay $4 to $6 per can."
    heroImage={`${SITE_URL}/og-best-non-alcoholic-ipas.jpg`}
    ctaPrimary={{ label: "Shop NA IPAs", href: "/collections/na-beer" }}
    ctaSecondary={{ label: "Read the full beer guide", href: "/blog/ultimate-non-alcoholic-beer-guide-2026" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "NA Beer Guide", url: `${SITE_URL}/non-alcoholic-beer-guide` },
      { name: "Best NA IPAs", url: `${SITE_URL}/best-non-alcoholic-ipas` },
    ]}
    sections={[
      {
        heading: "Why NA IPA is the easiest NA category to nail",
        body: (
          <>
            <p>
              IPA is the most translatable style for non alcoholic brewing because the dominant flavors, hops, citrus, pine, tropical fruit, do not depend on alcohol to express themselves. A great hop bill is great regardless of ABV. The challenge in NA brewing is body and mouthfeel, which alcohol provides. Modern craft NA brewers solve this with adjuncts (oats, wheat), specialty malts, and careful water chemistry.
            </p>
            <p>
              The result: NA IPAs from real craft brewers are often genuinely indistinguishable from the alcoholic versions in a blind taste. The supermarket NA IPAs from legacy brewers usually are not. Buy from the craft side of the aisle.
            </p>
          </>
        ),
      },
      {
        heading: "Best West Coast NA IPA",
        body: (
          <>
            <h3>Winner: Beaglepuss Inverse IPA</h3>
            <p>
              The classic San Diego West Coast profile. Pine, grapefruit, dry finish, real bitterness. If you grew up on Stone IPA or Ballast Point Sculpin and have not tried an NA equivalent yet, start here. Beaglepuss is a craft NA brewery and it shows.
            </p>
            <h3>Runner up: Go Brewing Burn It Down IPA</h3>
            <p>
              Slightly maltier and more balanced than Beaglepuss. A great everyday West Coast IPA pour.
            </p>
          </>
        ),
      },
      {
        heading: "Best hazy and NEIPA",
        body: (
          <>
            <h3>Winner: FLVR! Citra Haze</h3>
            <p>
              Pillowy mouthfeel, citrus forward, finishes soft. The Untitled Art collaboration. As good as any sub 6% hazy from a non NA brewer.
            </p>
            <h3>Runner up: Mash Gang Journey Juice</h3>
            <p>
              UK indie. Slightly drier, more aromatic. Worth trying side by side with Citra Haze to find your preference.
            </p>
            <h3>Honorable mention: Below Brew Co. The Cosmic Turtle</h3>
            <p>
              Indie, hazy, and a great gateway IPA for someone moving from hazy alcoholic IPAs.
            </p>
          </>
        ),
      },
      {
        heading: "Best tropical and fruit forward NA IPA",
        body: (
          <>
            <h3>Winner: Go Brewing Sunshine State Tropical IPA</h3>
            <p>
              Mango, pineapple, papaya. Ridiculously easy drinking. The default beach pour.
            </p>
            <h3>Runner up: Go Brewing Jab Jab Grapefruit IPA</h3>
            <p>
              Real grapefruit, not artificial. Bitter and bright.
            </p>
          </>
        ),
      },
      {
        heading: "Best double and high impact NA IPA",
        body: (
          <>
            <h3>Winner: Go Brewing The Story Double IPA</h3>
            <p>
              Big, hop forward, and the closest you get to drinking an actual DIPA without the alcohol. The most impressive NA brewing achievement on the shelf.
            </p>
          </>
        ),
      },
      {
        heading: "Best lower bitterness IPA for non IPA drinkers",
        body: (
          <>
            <h3>Winner: Below Brew Co. Wild Juice Chase Pale</h3>
            <p>
              Hazy pale ale, soft, juicy, almost no bitter bite. The IPA for people who normally do not drink IPAs.
            </p>
          </>
        ),
      },
      {
        heading: "How we ranked these",
        body: (
          <>
            <p>
              Our two San Diego tasting rooms pour every NA beer that comes through the door. Customers and staff taste blind. We rank on three criteria: flavor accuracy to the alcoholic style, drinkability across a full pint, and how often customers come back to buy a second time.
            </p>
            <p>
              For the full breakdown across every NA beer style, see our <Link to="/blog/ultimate-non-alcoholic-beer-guide-2026">ultimate NA beer guide for 2026</Link>.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      { question: "What is the best non alcoholic IPA overall?", answer: "If we had to pick one bottle for someone who has never tried an NA IPA, FLVR! Citra Haze. Approachable, juicy, and immediately convincing. For West Coast purists, Beaglepuss Inverse." },
      { question: "Do non alcoholic IPAs taste like real IPAs?", answer: "The good ones do. Hops translate well to NA brewing because they do not need alcohol to express. Body and mouthfeel are the harder problem, and craft NA brewers have largely solved it through specialty malts and adjuncts." },
      { question: "Why does NA IPA cost as much as regular IPA?", answer: "Because dealcoholization or specialty fermentation is an extra production step, and NA breweries operate at much lower volumes than legacy brewers. You are paying for craft, not the absence of alcohol." },
      { question: "Are non alcoholic IPAs healthier than regular IPAs?", answer: "Lower in calories, no alcohol, no hangover. Hop content and any health benefits or risks attached to hops are roughly the same." },
      { question: "How many calories in a non alcoholic IPA?", answer: "Most run 50 to 90 calories per 12oz can, compared to 180 to 250 for a typical alcoholic IPA. Some NA IPAs (especially hazy) run higher because of residual sugars." },
      { question: "What is the difference between West Coast and hazy NA IPA?", answer: "West Coast is bitter, dry, and pine forward. Hazy is soft, juicy, and tropical fruit forward. The same distinction applies in NA brewing as in regular craft beer." },
      { question: "Can I order NA IPA online?", answer: "Yes. Monday Morning ships our full NA beer catalog across the US. Local San Diego customers can shop in store." },
    ]}
    relatedLinks={[
      { label: "NA Beer Guide", href: "/non-alcoholic-beer-guide", description: "Every NA beer style explained." },
      { label: "Ultimate NA Beer Guide 2026", href: "/blog/ultimate-non-alcoholic-beer-guide-2026", description: "80+ beers, side by side." },
      { label: "Pillar: Non alcoholic drinks", href: "/non-alcoholic-drinks", description: "The complete category." },
      { label: "Best non alcoholic drinks 2026", href: "/best-non-alcoholic-drinks", description: "Top picks across all categories." },
    ]}
  />
);

export default BestNonAlcoholicIPAs;
