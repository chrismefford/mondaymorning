import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";
import { getLocation, locationSchema } from "@/data/locations";

// Local-intent SEO page: capture "Ocean Beach Farmers Market" searches (a high
// volume Wednesday query) and connect them to Monday Morning OB, which sits
// right on Newport Ave and is open during the market. The extra schema is the
// OB store itself, so search engines tie the market query to the real
// storefront + its Wednesday hours.
const obStoreSchema = locationSchema(getLocation("ocean-beach")!);

const obImage = `${SITE_URL}/images/ocean-beach-location.jpg`;

const OceanBeachFarmersMarket = () => (
  <AuthorityPage
    title="Ocean Beach Farmers Market: Wednesday Guide + NA Drinks on Newport Ave | Monday Morning"
    description="The Ocean Beach Farmers Market runs every Wednesday on Newport Ave. Monday Morning's non-alcoholic bottle shop is right there and open Wednesdays, grab a kava slushie or NA drink while you stroll."
    path="/ocean-beach-farmers-market"
    ogImage={obImage}
    heroImage={obImage}
    eyebrow="Ocean Beach Local"
    h1="The Ocean Beach Farmers Market"
    subhead="Every Wednesday, Newport Ave becomes the Ocean Beach Farmers Market. Monday Morning's non-alcoholic bottle shop is right on that block and open through it, so there is an easy, sober-friendly stop built into your stroll."
    tldr="The Ocean Beach Farmers Market takes over Newport Ave every Wednesday, afternoon into the evening. Monday Morning's Ocean Beach bottle shop sits right on Newport Ave (4967) and is open every Wednesday (currently 3pm to 8pm), so it is a natural stop: kava slushies, Vibations, and 300+ non-alcoholic beers, wines, and spirits, with a tasting bar. Even when Newport closes to cars for the market, we are a quick walk in."
    ctaPrimary={{ label: "Visit our OB shop", href: "/locations/ocean-beach" }}
    ctaSecondary={{ label: "Shop non-alcoholic drinks", href: "/shop" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "Ocean Beach", url: `${SITE_URL}/locations/ocean-beach` },
      { name: "OB Farmers Market", url: `${SITE_URL}/ocean-beach-farmers-market` },
    ]}
    extraSchema={obStoreSchema}
    sections={[
      {
        heading: "When is the Ocean Beach Farmers Market?",
        body: (
          <>
            <p>
              The <strong>Ocean Beach Farmers Market</strong> runs <strong>every Wednesday</strong> along <strong>Newport Avenue</strong>, the main strip in OB, from the afternoon into the evening. The street closes to cars and fills with local produce, food vendors, makers, flowers, and live music, a few blocks from the pier.
            </p>
            <p>
              Because Newport goes car-free, people sometimes assume the shops along it are closed for the day. They are not, and neither are we, you just walk in.
            </p>
          </>
        ),
      },
      {
        heading: "Monday Morning is open during the market",
        body: (
          <>
            <p>
              Our <strong>Ocean Beach</strong> shop is at <strong>4967 Newport Ave</strong>, right in the middle of the market, and we are open <strong>every Wednesday</strong> (currently 3pm to 8pm) so you can post up before, during, or after your walk through the stalls.
            </p>
            <p>
              It is the alcohol-free corner of the market: a place to grab something genuinely good to sip while you browse, with none of the next-morning cost. Kids, drivers, sober folks, pregnant friends, anyone can drink along.
            </p>
          </>
        ),
      },
      {
        heading: "What to grab while you stroll",
        body: (
          <>
            <p>
              Everything we pour is non-alcoholic, so pick your vibe and keep walking:
            </p>
            <ul>
              <li>
                <strong>Sunset kava slushie:</strong> our OB signature, a frozen, calming, feel-good pour for a warm Wednesday evening.
              </li>
              <li>
                <strong>Vibations:</strong> our craft alcohol-free cocktails (vibe plus libations), made to order.
              </li>
              <li>
                <strong>Beach-day cans to go:</strong> grab a few non-alcoholic beers or sparkling drinks for the walk down to the sand.
              </li>
              <li>
                <strong>Tasting bar:</strong> not sure what you like yet? Sample your way across 300+ NA beers, wines, spirits, and functional drinks before you buy.
              </li>
            </ul>
          </>
        ),
      },
      {
        heading: "Make it your Wednesday ritual",
        body: (
          <>
            <p>
              The OB Farmers Market is one of the best weeknight things to do on the coast, and it pairs perfectly with drinking differently. Do your market loop, then land at Monday Morning to cool off with a kava slushie and a bag of finds, no hangover attached.
            </p>
            <p>
              Planning a visit? See our <Link to="/locations/ocean-beach">Ocean Beach location page</Link> for current hours, directions, and what is on the shelf, or browse <Link to="/locations">all Monday Morning locations</Link>.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      {
        question: "What day is the Ocean Beach Farmers Market?",
        answer:
          "The Ocean Beach Farmers Market is held every Wednesday along Newport Avenue in Ocean Beach, San Diego, running from the afternoon into the evening. Newport Ave closes to cars for the market.",
      },
      {
        question: "Is Monday Morning open during the OB Farmers Market?",
        answer:
          "Yes. Monday Morning's Ocean Beach non-alcoholic bottle shop is at 4967 Newport Ave, right in the market, and is open every Wednesday (currently 3pm to 8pm). Even with Newport closed to cars, the shop is a short walk in.",
      },
      {
        question: "Where is Monday Morning in Ocean Beach?",
        answer:
          "Monday Morning Ocean Beach is at 4967 Newport Ave, San Diego, CA 92107, one block from the beach and right on the Wednesday farmers market strip.",
      },
      {
        question: "Is there a non-alcoholic option at the Ocean Beach Farmers Market?",
        answer:
          "Yes. Monday Morning on Newport Ave is a dedicated non-alcoholic bottle shop and tasting bar. During the Wednesday market you can grab a sunset kava slushie, a Vibations alcohol-free cocktail, or non-alcoholic beers and cans to go, all zero-proof.",
      },
      {
        question: "Can I still get to the shops when Newport Ave closes for the market?",
        answer:
          "Yes. The Ocean Beach Farmers Market closes Newport Ave to cars, but the shops along it, including Monday Morning at 4967 Newport Ave, stay open and are easy to reach on foot.",
      },
    ]}
    relatedLinks={[
      { label: "Monday Morning Ocean Beach", href: "/locations/ocean-beach", description: "Hours, directions, what's in stock" },
      { label: "All our locations", href: "/locations", description: "PB, OB, and The Lab" },
      { label: "Shop non-alcoholic drinks", href: "/shop", description: "300+ NA beers, wines, and spirits" },
      { label: "Non-alcoholic beer guide", href: "/non-alcoholic-beer-guide", description: "Every NA beer worth drinking" },
    ]}
  />
);

export default OceanBeachFarmersMarket;
