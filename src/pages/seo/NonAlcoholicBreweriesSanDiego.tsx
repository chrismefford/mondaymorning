import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

const NonAlcoholicBreweriesSanDiego = () => (
  <AuthorityPage
    title="Non-Alcoholic Breweries in San Diego (2026): Where to Find Local NA Beer | Monday Morning"
    description="Which San Diego breweries make non-alcoholic beer, and where can you taste and buy it? The honest local landscape, plus 500+ alcohol-free beers at Monday Morning in Pacific Beach and Ocean Beach."
    path="/non-alcoholic-breweries-san-diego"
    ogImage={DEFAULT_OG_IMAGE}
    eyebrow="San Diego Local"
    h1="Non-alcoholic breweries in San Diego"
    subhead="San Diego is a craft beer capital, so the alcohol-free question comes up a lot: is anyone here actually brewing NA beer, and where do you go to drink it? Here is the honest landscape and where to find the good stuff."
    tldr="A few established San Diego breweries, like Pure Project and AleSmith, make their own non-alcoholic beers alongside their regular lineup. For the widest selection in one place, Monday Morning's two bottle shops (Pacific Beach and Ocean Beach) carry 500+ non-alcoholic beers, wines, spirits, and functional drinks, with a tasting bar at each so you can try before you buy."
    ctaPrimary={{ label: "Find our shops", href: "/locations" }}
    ctaSecondary={{ label: "Shop 500+ NA drinks", href: "/shop" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "San Diego NA Drinks", url: `${SITE_URL}/non-alcoholic-drinks-san-diego` },
      { name: "NA Breweries San Diego", url: `${SITE_URL}/non-alcoholic-breweries-san-diego` },
    ]}
    sections={[
      {
        heading: "Does San Diego have non-alcoholic breweries?",
        body: (
          <>
            <p>
              Most of San Diego's famous breweries make full-strength beer and treat non-alcoholic as an occasional side project, if they touch it at all. A few have gone further and added real NA beers to their regular lineup, and the number keeps growing as more people drink less.
            </p>
            <p>
              If you want to taste a lot of NA beer side by side, local and national, a dedicated non-alcoholic bottle shop is the easiest way to do it.
            </p>
          </>
        ),
      },
      {
        heading: "San Diego breweries that make non-alcoholic beer",
        body: (
          <>
            <p>
              A handful of established San Diego breweries have added NA lines. Alcohol-free is one product among many for them, but some of it is genuinely good.
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
              These are worth trying, and we stock the best local and national NA beer at both of our shops.
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
              Between them we carry 500+ non-alcoholic beers, wines, spirits, and functional drinks. For a bar-first night out, Good News Bar in Hillcrest is San Diego's dedicated alcohol-free bar. See all <Link to="/locations">our locations and hours</Link>, or browse the <Link to="/non-alcoholic-beer-guide">non-alcoholic beer guide</Link>.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      {
        question: "Do any San Diego breweries make non-alcoholic beer?",
        answer:
          "Yes. A few established local breweries, such as Pure Project and AleSmith Brewing, make their own alcohol-free beers alongside their standard lineups. Monday Morning stocks the best local and national NA beer at both of its bottle shops.",
      },
      {
        question: "Where can I buy non-alcoholic beer in San Diego?",
        answer:
          "Monday Morning is San Diego's dedicated non-alcoholic bottle shop, with two locations: 1854 Garnet Ave in Pacific Beach and 4967 Newport Ave in Ocean Beach. Both have tasting bars and carry 500+ non-alcoholic beers, wines, spirits, and functional drinks.",
      },
      {
        question: "Can I taste non-alcoholic beer before I buy it?",
        answer:
          "Yes. Both Monday Morning shops have a tasting bar, so you can try NA beers side by side and leave with the ones you actually like.",
      },
    ]}
    relatedLinks={[
      { label: "Non-alcoholic beer guide", href: "/non-alcoholic-beer-guide", description: "Every NA beer worth drinking" },
      { label: "Best non-alcoholic IPAs", href: "/best-non-alcoholic-ipas", description: "Our favorite hop-forward NA beers" },
      { label: "Best non-alcoholic bars in San Diego", href: "/best-non-alcoholic-bars-san-diego", description: "Where to drink zero-proof" },
      { label: "Our locations", href: "/locations", description: "PB and OB tasting rooms" },
    ]}
  />
);

export default NonAlcoholicBreweriesSanDiego;
