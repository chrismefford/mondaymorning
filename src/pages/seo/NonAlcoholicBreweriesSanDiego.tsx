import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

// Entity schema for The Lab so search engines read it as a real, distinct
// non-alcoholic brewery (not just a page). Answers "is there an NA brewery in SD".
const labBrewerySchema = {
  "@context": "https://schema.org",
  "@type": "Brewery",
  name: "The Lab by Monday Morning",
  description:
    "California's first non-alcoholic brewery and tasting room, born in San Diego and now open with a taproom in San Marcos. Contract brewing, canning, and white-label alcohol-free beer and functional drinks.",
  url: `${SITE_URL}/services`,
  image: `${SITE_URL}/og-the-lab-opening-san-marcos.jpg`,
  parentOrganization: { "@type": "Organization", name: "Monday Morning Bottle Shop", url: SITE_URL },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1784 La Costa Meadows Dr, Ste 103",
    addressLocality: "San Marcos",
    addressRegion: "CA",
    postalCode: "92078",
    addressCountry: "US",
  },
  areaServed: "Southern California",
  knowsAbout: [
    "non-alcoholic beer",
    "alcohol-free brewing",
    "contract brewing",
    "co-packing",
    "white-label non-alcoholic production",
  ],
};

const NonAlcoholicBreweriesSanDiego = () => (
  <AuthorityPage
    title="Non-Alcoholic Breweries in San Diego (2026): The Lab Taproom & NA Beer | Monday Morning"
    description="Does San Diego have a non-alcoholic brewery? Yes. The Lab by Monday Morning is California's first NA brewery and tasting room, born in San Diego and now open with a taproom in San Marcos. Plus where to buy 500+ alcohol-free brews."
    path="/non-alcoholic-breweries-san-diego"
    ogImage={`${SITE_URL}/og-the-lab-opening-san-marcos.jpg`}
    eyebrow="San Diego Local"
    h1="Non-alcoholic breweries in San Diego"
    subhead="San Diego is a craft beer capital, so the alcohol-free question comes up a lot: is anyone actually brewing NA beer here? Yes, and California's first non-alcoholic brewery and tasting room, born right here in San Diego, is now open. Here is the honest landscape and where to find it."
    tldr="San Diego has one dedicated non-alcoholic brewery: The Lab by Monday Morning in San Marcos, an NA-focused space that brews, cans, and white-labels alcohol-free beer (home of Haymaker NA IPA). It is now home to California's first non-alcoholic brewery and tasting room, born in San Diego (hours are being finalized, so check ahead before visiting). A few big local breweries, like Pure Project and AleSmith, also make their own NA lines alongside their regular beer. For the widest selection, Monday Morning's two bottle shops (Pacific Beach and Ocean Beach) carry 500+ non-alcoholic beers with tasting bars at both."
    heroImage={`${SITE_URL}/og-the-lab-opening-san-marcos.jpg`}
    ctaPrimary={{ label: "Brew with The Lab", href: "/services" }}
    ctaSecondary={{ label: "Shop 500+ NA beers", href: "/shop" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "San Diego NA Drinks", url: `${SITE_URL}/non-alcoholic-drinks-san-diego` },
      { name: "NA Breweries San Diego", url: `${SITE_URL}/non-alcoholic-breweries-san-diego` },
    ]}
    extraSchema={labBrewerySchema}
    sections={[
      {
        heading: "Does San Diego have a non-alcoholic brewery?",
        body: (
          <>
            <p>
              Short answer: yes, one dedicated to it. Most of San Diego's famous breweries make full-strength beer and treat non-alcoholic as an occasional side project, if they touch it at all. The exception is <strong>The Lab by Monday Morning</strong> in San Marcos, which is built specifically around alcohol-free brewing and production.
            </p>
            <p>
              Searches used to say San Diego had "no dedicated alcohol-free brewery," meaning no NA-only taproom you could walk into for a pint. Not anymore: <strong>The Lab is now open</strong> as California's first non-alcoholic brewery and tasting room, born in San Diego, now in San Marcos.
            </p>
          </>
        ),
      },
      {
        heading: "The Lab: San Diego's non-alcoholic brewery",
        body: (
          <>
            <p>
              <strong>The Lab</strong> is our non-alcoholic brewing and innovation space in San Marcos, one of the only NA-focused production partners in Southern California. It is where we brew, can, and white-label alcohol-free beer, functional drinks, and ready-to-drink products, including our first house brew, <strong>Haymaker NA IPA</strong>.
            </p>
            <p>
              In July 2026, the <strong>San Diego Union-Tribune</strong> put The Lab on the front page of its Business section, picturing founder Zane Curtis at the San Marcos production facility as San Diego bets big on alcohol-free beer. See the <Link to="/press">press coverage</Link>.
            </p>
            <p>
              The Lab is <strong>now open</strong> as California's first non-alcoholic brewery and tasting room, born in San Diego, right at the San Marcos facility (1784 La Costa Meadows Dr, Ste 103), with <strong>Haymaker NA IPA</strong> on tap. Regular taproom hours are being finalized, so check ahead for current days and times before you visit.
            </p>
            <p>
              The Lab is also a contract-brewing and co-packing partner. If you are a brand that wants to make an alcohol-free product of your own, that is exactly what it is for. See <Link to="/services">contract brewing at The Lab</Link>.
            </p>
          </>
        ),
      },
      {
        heading: "San Diego breweries that make non-alcoholic beer",
        body: (
          <>
            <p>
              A handful of established San Diego breweries have added NA lines to their regular lineup. It is a different model from a dedicated NA brewery: alcohol-free is one product among many, not the whole focus.
            </p>
            <ul>
              <li>
                <strong>Pure Project</strong> brews its own alcohol-free beers alongside its regular craft lineup, available at its local taprooms.
              </li>
              <li>
                <strong>AleSmith Brewing</strong> makes an NA craft brew based on its West Coast recipes, sold in packs at its Miramar tasting room.
              </li>
            </ul>
            <p>
              These are worth trying, and we stock the best of them. The difference with The Lab is focus: NA is not a footnote to a bigger beer program, it is the entire point.
            </p>
          </>
        ),
      },
      {
        heading: "Where to actually buy non-alcoholic beer in San Diego",
        body: (
          <>
            <p>
              For the widest selection to taste and take home, come to a bottle shop. <strong>Monday Morning</strong> runs the two dedicated non-alcoholic bottle shops in San Diego, with a full tasting bar at each so you can try before you buy.
            </p>
            <ul>
              <li>
                <strong>Pacific Beach:</strong> 1854 Garnet Ave. Tue to Sat 11am to 8pm, Sun 11am to 6pm. Closed Monday.
              </li>
              <li>
                <strong>Ocean Beach:</strong> 4967 Newport Ave. Tue and Thu 11am to 8pm, Wed 3pm to 8pm, Fri to Sun 11am to 6pm. Closed Monday.
              </li>
            </ul>
            <p>
              Between them we carry 500+ non-alcoholic beers, wines, spirits, and functional drinks, including local NA beer from The Lab and other San Diego breweries. For a bar-first night out, Good News Bar in Hillcrest is San Diego's dedicated alcohol-free bar. See all <Link to="/locations">our locations and hours</Link>, or browse the <Link to="/non-alcoholic-beer-guide">non-alcoholic beer guide</Link>.
            </p>
          </>
        ),
      },
      {
        heading: "Want to make your own non-alcoholic beer?",
        body: (
          <>
            <p>
              This is the part most "breweries near me" searches miss. If you are a brand, a bar group, or an entrepreneur who wants an alcohol-free product of your own, The Lab does contract brewing, co-packing, and white-label production, from a first small-batch trial to a full canning run.
            </p>
            <p>
              We built our own AF program from the floor up, so we can help with recipe development, production, and getting to shelf. <Link to="/services">Talk to us about brewing at The Lab</Link>.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      {
        question: "Does San Diego have a non-alcoholic brewery?",
        answer:
          "Yes. The Lab by Monday Morning in San Marcos is San Diego's dedicated non-alcoholic focused brewery, brewing, canning, and white-labeling alcohol-free beer and functional drinks (home of Haymaker NA IPA). A few large local breweries such as Pure Project and AleSmith also make their own NA lines alongside their regular beer.",
      },
      {
        question: "Is The Lab taproom open?",
        answer:
          "Yes. The Lab is open as California's first non-alcoholic brewery and tasting room, born in San Diego, at its San Marcos facility (1784 La Costa Meadows Dr, Ste 103), with Haymaker NA IPA on tap. Regular taproom hours are being finalized, so check ahead for current days and times before you visit.",
      },
      {
        question: "Can you visit The Lab?",
        answer:
          "Yes. The Lab is open as California's first non-alcoholic brewery and tasting room, born in San Diego, now in San Marcos (hours being finalized, so check ahead). For the widest selection, Monday Morning's Pacific Beach and Ocean Beach bottle shops also have tasting bars and carry 500+ NA drinks.",
      },
      {
        question: "Where can I buy non-alcoholic beer in San Diego?",
        answer:
          "Monday Morning Bottle Shop is San Diego's dedicated non-alcoholic bottle shop, with two locations: 1854 Garnet Ave in Pacific Beach and 4967 Newport Ave in Ocean Beach. Both have tasting bars and carry 500+ non-alcoholic beers, wines, spirits, and functional drinks, including local NA beer.",
      },
      {
        question: "Which San Diego breweries make non-alcoholic beer?",
        answer:
          "The Lab by Monday Morning is the county's dedicated NA-focused brewery. Among traditional breweries, Pure Project and AleSmith Brewing make their own alcohol-free beers alongside their standard lineups. Monday Morning stocks the best local and national NA beer at both bottle shops.",
      },
      {
        question: "How can my brand make its own non-alcoholic beer?",
        answer:
          "The Lab by Monday Morning offers non-alcoholic contract brewing, co-packing, and white-label production in San Marcos, from small-batch recipe trials to full canning runs. It is one of the only NA-focused production partners in Southern California. Reach out through the Monday Morning services page.",
      },
    ]}
    relatedLinks={[
      { label: "Contract brewing at The Lab", href: "/services", description: "White-label and co-pack NA beer" },
      { label: "Non-alcoholic beer guide", href: "/non-alcoholic-beer-guide", description: "Every NA beer worth drinking" },
      { label: "Best non-alcoholic bars in San Diego", href: "/best-non-alcoholic-bars-san-diego", description: "Where to drink zero-proof" },
      { label: "Our locations", href: "/locations", description: "PB and OB tasting rooms" },
    ]}
  />
);

export default NonAlcoholicBreweriesSanDiego;
