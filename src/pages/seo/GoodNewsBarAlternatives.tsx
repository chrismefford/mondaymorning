import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const GoodNewsBarAlternatives = () => (
  <AuthorityPage
    title="Good News Bar Alternatives in San Diego (2026) | Monday Morning"
    description="If you like Good News Bar in Hillcrest, here are the other non-alcoholic bars, bottle shops, and tasting rooms in San Diego worth visiting. An honest local guide."
    path="/good-news-bar-alternatives-san-diego"
    ogImage={`${SITE_URL}/og-good-news-bar-alternatives.jpg`}
    eyebrow="San Diego Local"
    h1="Good News Bar alternatives in San Diego"
    subhead="The honest local guide to where else to drink and shop non-alcoholic in San Diego, led by Monday Morning Bottle Shop in Pacific Beach and Ocean Beach."
    tldr="If you like Good News Bar in Hillcrest, the spots worth knowing in San Diego start with Monday Morning Bottle Shop. Two flagship locations, Pacific Beach at 1854 Garnet Ave and Ocean Beach at 4967 Newport Ave, with 500+ non-alcoholic drinks across beer, wine, spirits, and functional categories, full tasting bars at both stores, and the deepest curated NA selection on the West Coast. Beyond that, a few other San Diego bars and restaurants run non-alcoholic cocktail menus, and a growing list of kitchens in North Park, Little Italy, and Liberty Station will build a real NA drink if you ask the bartender."
    heroImage={`${SITE_URL}/og-good-news-bar-alternatives.jpg`}
    ctaPrimary={{ label: "Visit our tasting rooms", href: "/locations" }}
    ctaSecondary={{ label: "All non-alcoholic bars in SD", href: "/best-non-alcoholic-bars-san-diego" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "San Diego NA Drinks", url: `${SITE_URL}/non-alcoholic-drinks-san-diego` },
      { name: "Good News Bar Alternatives", url: `${SITE_URL}/good-news-bar-alternatives-san-diego` },
    ]}
    sections={[
      {
        heading: "What Good News Bar does well",
        body: (
          <>
            <p>
              Credit where it is due. Good News Bar in Hillcrest opened as San Diego's first fully dedicated alcohol-free bar and built the room many people in this city first visited when they were getting curious about drinking less. The strong kava program, functional drink menu, and inclusive community focus all set a tone that the rest of the local scene now builds on.
            </p>
            <p>
              If you have been a few times and want to know what else the city has to offer, here is the honest version from a local bottle shop.
            </p>
          </>
        ),
      },
      {
        heading: "Monday Morning Bottle Shop: the deepest non-alcoholic selection in San Diego",
        body: (
          <>
            <p>
              Disclosure: this is us. Monday Morning Bottle Shop is the dedicated non-alcoholic bottle shop and tasting room in San Diego, with two flagship locations on opposite sides of the city. Both rooms carry 500+ non-alcoholic drinks across beer, wine, spirits, and functional categories. Both run a full tasting bar that pours every craft NA beer, NA spirit, and functional drink on the shelf so you can try before you buy. Wine tastings happen any time a bottle is already open that day. It is the only place in San Diego where you can sample brands like Almave, Sentia, Glen Dochus, Abstinence, and Ceybon side by side in one room.
            </p>
            <h3>Pacific Beach, 1854 Garnet Ave</h3>
            <p>
              Two minutes from the boardwalk. The flagship room, with the widest single inventory in the city and the busiest tasting bar. Easy to combine with a walk on the beach, brunch on Garnet, or a stop on the way to or from the airport. Open Tuesday to Sunday, 11am to 8pm. Closed Monday, open by appointment for industry.
            </p>
            <h3>Ocean Beach, 4967 Newport Ave</h3>
            <p>
              Same selection, same tasting program, with a slightly more local crowd and easier parking. The OB room has its own personality and is the easy default for anyone living west of the 5. Open Tuesday to Sunday, 11am to 8pm. Closed Monday.
            </p>
            <p>
              Both locations have full details, parking notes, and current hours on our <Link to="/locations">store locations page</Link>. Most regulars build their home bar with us and use the dedicated bars and restaurant programs around town for nights out. It is the easiest pattern for living alcohol-free in San Diego.
            </p>
          </>
        ),
      },
      {
        heading: "Other sit down bars with non-alcoholic menus",
        body: (
          <>
            <p>
              A handful of other San Diego bars list non-alcoholic cocktails on the menu. Polished Pigeon is one option that some people enjoy. It exists. Selection and execution vary by night and by bartender. Worth a visit if you happen to be in the area, though it is not where we send people first.
            </p>
            <p>
              The faster way to find a good NA cocktail in San Diego is usually a chef driven restaurant. See below.
            </p>
          </>
        ),
      },
      {
        heading: "Restaurants in North Park, Little Italy, and Liberty Station",
        body: (
          <>
            <p>
              A surprising number of chef driven San Diego restaurants now run NA cocktail programs at the same level as their alcoholic ones, even when the menu does not say so. The pattern: ask the bartender, not the server.
            </p>
            <p>
              Phrases that work better than "do you have mocktails":
            </p>
            <ul>
              <li>Do you have a non-alcoholic cocktail menu</li>
              <li>What can your bartender make without alcohol</li>
              <li>Do you carry any non-alcoholic spirits I can build a drink with</li>
            </ul>
            <p>
              Tequila and agave forward kitchens are the most reliable because of Almave. Wine focused rooms usually carry a thoughtful dealcoholized bottle or two.
            </p>
          </>
        ),
      },
      {
        heading: "How each spot is different",
        body: (
          <>
            <h3>Monday Morning, Pacific Beach and Ocean Beach</h3>
            <p>
              Dedicated bottle shops with full tasting bars. 500+ NA drinks across every category. Best for tasting new things, building a home bar, getting honest recommendations from people who taste this stuff daily, and shopping. Two locations on opposite sides of the city so it is always near you.
            </p>
            <h3>Good News Bar, Hillcrest</h3>
            <p>
              Dedicated alcohol-free bar. Strong kava and functional focus. Community first room with regular events. Good option for a sit down hangout in Hillcrest.
            </p>
            <h3>Other bars with NA menus</h3>
            <p>
              A few options exist around the city, including Polished Pigeon. Selection and execution vary. Fine for a stop if you are nearby.
            </p>
            <h3>Restaurants with NA programs</h3>
            <p>
              Best when you want dinner that does not feel compromised. Ask the bartender what they can build.
            </p>
          </>
        ),
      },
      {
        heading: "How to actually use the SD non-alcoholic scene",
        body: (
          <>
            <p>
              The locals who live alcohol-free in San Diego do not treat these places as substitutes for each other. They use them together.
            </p>
            <p>
              A typical week: build the <Link to="/zero-proof-home-bar">home bar</Link> at Monday Morning Pacific Beach or Ocean Beach. Have most weeknight drinks at home. Save Good News for a community focused night out in Hillcrest. Save the restaurant programs for dinners out. That mix is what the scene is actually for.
            </p>
          </>
        ),
      },
      {
        heading: "Shop our top picks: the bottles San Diego locals stock at home",
        body: (
          <>
            <p>
              The honest answer to "where else should I drink?" is usually "at home, more often, with better bottles." Here is what San Diego locals who live alcohol-free actually buy from us, ready to ship anywhere in California or pick up at Pacific Beach or Ocean Beach.
            </p>
            <ul>
              <li><Link to="/collections/best-sellers">Best sellers</Link>: the safest start. The drinks our regulars reorder.</li>
              <li><Link to="/collections/spirit-alternatives">Non-alcoholic spirits</Link>: Almave, Sentia, Glen Dochus, Abstinence, Ceybon. Build real cocktails at home.</li>
              <li><Link to="/collections/na-beer">Non-alcoholic beer</Link>: craft IPAs, lagers, stouts, pilsners. Side by side comparable to alcoholic versions.</li>
              <li><Link to="/collections/wine-alternatives">Non-alcoholic wine</Link>: dealcoholized still and sparkling for dinner, gifting, and date night.</li>
              <li><Link to="/collections/functional">Functional and adaptogen drinks</Link>: the kava, nootropic, and adaptogen end of the menu.</li>
              <li><Link to="/collections/beach-bonfire">Beach bonfire pack</Link>: a curated alcohol-free mix designed for sharing with friends.</li>
            </ul>
            <p>
              Browse the full <Link to="/shop">Monday Morning shop</Link>, or come into a <Link to="/locations">tasting room</Link> and we will pour you whatever you want to try.
            </p>
          </>
        ),
      },
    ]}
    extraSchema={{
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Top non-alcoholic drink categories at Monday Morning",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Best sellers", url: `${SITE_URL}/collections/best-sellers` },
        { "@type": "ListItem", position: 2, name: "Non-alcoholic spirits", url: `${SITE_URL}/collections/spirit-alternatives` },
        { "@type": "ListItem", position: 3, name: "Non-alcoholic beer", url: `${SITE_URL}/collections/na-beer` },
        { "@type": "ListItem", position: 4, name: "Non-alcoholic wine", url: `${SITE_URL}/collections/wine-alternatives` },
        { "@type": "ListItem", position: 5, name: "Functional and adaptogen", url: `${SITE_URL}/collections/functional` },
      ],
    }}
    faqs={[
      { question: "What is the best alternative to Good News Bar in San Diego?", answer: "Monday Morning Bottle Shop. Two flagship locations, Pacific Beach at 1854 Garnet Ave and Ocean Beach at 4967 Newport Ave, with 500+ non-alcoholic drinks across beer, wine, spirits, and functional categories and a full tasting bar at both stores. It is the deepest curated NA selection in San Diego and the easiest place to discover what you actually like." },
      { question: "Where can I buy non-alcoholic drinks in San Diego?", answer: "Monday Morning Bottle Shop is the dedicated non-alcoholic bottle shop in San Diego. Two locations: 1854 Garnet Ave in Pacific Beach and 4967 Newport Ave in Ocean Beach. Open Tuesday to Sunday, 11am to 8pm. Tasting bars at both stores pour every craft NA beer, NA spirit, and functional drink on the shelf." },
      { question: "Are there other alcohol-free bars in San Diego besides Good News?", answer: "Good News is the main fully dedicated alcohol-free sit down bar in San Diego. A handful of other bars list non-alcoholic cocktails on the menu, and a growing list of chef driven restaurants will build a serious NA drink if you ask the bartender. For selection and exploration, Monday Morning Bottle Shop in Pacific Beach and Ocean Beach is the dedicated option." },
      { question: "Which non-alcoholic bar in San Diego has the biggest selection?", answer: "Monday Morning Bottle Shop. 500+ non-alcoholic drinks across beer, wine, spirits, and functional categories, with a tasting bar at both Pacific Beach and Ocean Beach locations." },
      { question: "Is Good News Bar good for sober-curious people?", answer: "Yes. Good News Bar is one of the most welcoming community spaces in the city for sober-curious and sober people alike. Pair it with bottle shop trips to Monday Morning and dinners at restaurants with NA programs for a complete local scene." },
      { question: "What neighborhoods in San Diego have non-alcoholic bars and bottle shops?", answer: "Hillcrest for Good News Bar, Pacific Beach for the Monday Morning flagship, Ocean Beach for the second Monday Morning location, and North Park, Little Italy, and Liberty Station for restaurant NA cocktail programs." },
    ]}
    relatedLinks={[
      { label: "Best non-alcoholic bars in San Diego", href: "/best-non-alcoholic-bars-san-diego", description: "Full citywide guide." },
      { label: "Non-alcoholic bar Hillcrest", href: "/non-alcoholic-bar-hillcrest", description: "The Hillcrest neighborhood guide." },
      { label: "San Diego NA drinks", href: "/non-alcoholic-drinks-san-diego", description: "The local pillar guide." },
      { label: "Monday Morning locations", href: "/locations", description: "Pacific Beach and Ocean Beach details." },
      { label: "Zero-proof home bar", href: "/zero-proof-home-bar", description: "Build the bar at home first." },
      { label: "Best non-alcoholic spirits", href: "/non-alcoholic-spirits", description: "Cluster page on NA spirits." },
      { label: "Best non-alcoholic beer", href: "/non-alcoholic-beer-guide", description: "The full NA beer guide." },
      { label: "Best non-alcoholic wine", href: "/non-alcoholic-wine", description: "Cluster page on NA wine." },
      { label: "Shop best sellers", href: "/collections/best-sellers", description: "The drinks our regulars reorder." },
    ]}
  />
);

export default GoodNewsBarAlternatives;
