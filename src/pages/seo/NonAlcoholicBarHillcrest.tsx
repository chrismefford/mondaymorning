import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const NonAlcoholicBarHillcrest = () => (
  <AuthorityPage
    title="Non-Alcoholic Bar Hillcrest San Diego (2026 Guide) | Monday Morning"
    description="The full guide to non-alcoholic drinking in Hillcrest, San Diego. Bars, bottle shops, mocktail menus, and the closest dedicated NA bottle shop minutes away in Pacific Beach."
    path="/non-alcoholic-bar-hillcrest"
    ogImage={`${SITE_URL}/og-non-alcoholic-bars-hillcrest.jpg`}
    eyebrow="Hillcrest Local"
    h1="Non-alcoholic bar Hillcrest: where to drink zero-proof on Park Blvd and beyond"
    subhead="Hillcrest sits at the center of San Diego's non-alcoholic scene. Here is where to drink, where to shop, and how to plan an alcohol-free night out in the neighborhood."
    tldr="Hillcrest is the natural home of dedicated non-alcoholic drinking in San Diego thanks to a tight Park Blvd corridor of inclusive bars, cafes, and shops. For a sit down alcohol-free bar in Hillcrest, Good News Bar on Park is the dedicated option. For the deepest selection in the city, Monday Morning Bottle Shop is a 10 minute drive west in Pacific Beach, with a tasting bar pouring 500+ NA beers, wines, spirits, and functional drinks. Most thoughtful Hillcrest restaurants now have a real NA cocktail menu, ask the bartender."
    heroImage={`${SITE_URL}/og-non-alcoholic-bars-hillcrest.jpg`}
    ctaPrimary={{ label: "Visit our Pacific Beach tasting room", href: "/locations" }}
    ctaSecondary={{ label: "See all SD non-alcoholic bars", href: "/best-non-alcoholic-bars-san-diego" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "San Diego NA Drinks", url: `${SITE_URL}/non-alcoholic-drinks-san-diego` },
      { name: "Non-Alcoholic Bar Hillcrest", url: `${SITE_URL}/non-alcoholic-bar-hillcrest` },
    ]}
    sections={[
      {
        heading: "Why Hillcrest leads San Diego for alcohol-free nights out",
        body: (
          <>
            <p>
              Hillcrest has always been a neighborhood built around community, inclusivity, and walkability. Those three things turn out to be exactly what a strong non-alcoholic scene needs. People walk between bars, restaurants, and cafes on Park Blvd and University Ave instead of driving, which makes ordering a non-alcoholic drink the default for plenty of people rather than the exception.
            </p>
            <p>
              The neighborhood also has a high concentration of sober-curious residents, a vibrant cafe culture, and a queer community that has long treated bars as community spaces first and drinking spaces second. That cultural posture is why Hillcrest got San Diego's first fully dedicated alcohol-free bar before most US neighborhoods of its size.
            </p>
          </>
        ),
      },
      {
        heading: "The dedicated non-alcoholic bar in Hillcrest",
        body: (
          <>
            <p>
              <strong>Good News Bar</strong> on Park Blvd is the dedicated alcohol-free bar in Hillcrest. The room runs zero-proof cocktails, kava, and a rotating menu of functional drinks. It is a community first space, hosts regular events, and is the easy default for a sober-curious night out inside the neighborhood. Inspired by the Mac Miller song of the same name, it carries a real mission around mental health and recovery alongside the drinks program.
            </p>
            <p>
              Pair a stop at Good News with dinner at one of the nearby Hillcrest restaurants running serious NA cocktail menus, and you have a full night that never touches alcohol.
            </p>
          </>
        ),
      },
      {
        heading: "Monday Morning Bottle Shop: the deepest selection a short drive from Hillcrest",
        body: (
          <>
            <p>
              For the widest non-alcoholic selection in San Diego, Hillcrest locals drive to one of our two flagship locations. <Link to="/locations">Monday Morning Bottle Shop</Link> carries 500+ non-alcoholic drinks across beer, wine, spirits, and functional categories, with a full tasting bar at both stores that pours every craft NA beer, NA spirit, and functional drink on the shelf. Wine tastings happen any time a bottle is already open that day.
            </p>
            <h3>Pacific Beach, 1854 Garnet Ave</h3>
            <p>
              About 10 minutes west of Hillcrest. The flagship room with the busiest tasting bar in the city. Easy to combine with a beach walk, brunch on Garnet, or a stop on the way to or from the airport. Open Tuesday to Sunday, 11am to 8pm.
            </p>
            <h3>Ocean Beach, 4967 Newport Ave</h3>
            <p>
              Same selection, same tasting program, more local crowd, easier parking. The OB room has its own personality and is worth the slightly longer drive when you want a quieter visit. Open Tuesday to Sunday, 11am to 8pm.
            </p>
            <p>
              Both stores are the only places in San Diego where you can sample brands like Almave, Sentia, Glen Dochus, Abstinence, and Ceybon side by side in one room, then take home whatever you fall in love with. Most Hillcrest locals build their home bar with us, then use Good News and the Hillcrest restaurant programs for nights out.
            </p>
          </>
        ),
      },
      {
        heading: "Hillcrest restaurants with non-alcoholic cocktail menus",
        body: (
          <>
            <p>
              The pattern in Hillcrest: ask the bartender, not the server. The neighborhood's chef driven kitchens almost always have a non-alcoholic cocktail option that does not appear on the printed menu. Tequila and agave forward kitchens are the most reliable because of Almave specifically. Wine focused rooms increasingly carry a real dealcoholized bottle or two.
            </p>
            <p>
              Three phrases that work better than "do you have mocktails":
            </p>
            <ul>
              <li>Do you have a non-alcoholic cocktail menu</li>
              <li>What can your bartender make me without alcohol</li>
              <li>Do you carry any non-alcoholic spirits I can build a drink with</li>
            </ul>
            <p>
              Each one signals to a real bartender that you want a serious drink, not sugar water.
            </p>
          </>
        ),
      },
      {
        heading: "How to plan a non-alcoholic night out in Hillcrest",
        body: (
          <>
            <h3>Stock the home bar first</h3>
            <p>
              Build a small <Link to="/zero-proof-home-bar">zero-proof home bar</Link> with one NA spirit, one dealcoholized wine, fresh citrus, and a quality tonic. Five minutes of pre game at home sets the tone.
            </p>
            <h3>Stop by Monday Morning earlier in the week</h3>
            <p>
              Drop into Pacific Beach on the way home from work for a tasting. Pick up a few new bottles to try later. The tasting bar is the part Hillcrest visitors miss most.
            </p>
            <h3>Dinner in Hillcrest at a kitchen that takes NA seriously</h3>
            <p>
              Ask for the NA cocktail menu, not just a mocktail. The vocabulary matters.
            </p>
            <h3>Night cap at Good News Bar</h3>
            <p>
              End the night somewhere built for this style of drinking. Park Blvd is walkable from most of the neighborhood.
            </p>
          </>
        ),
      },
      {
        heading: "What to look for in a real non-alcoholic bar in Hillcrest",
        body: (
          <>
            <p>
              The signs that a Hillcrest bar takes non-alcoholic drinks seriously:
            </p>
            <ul>
              <li>NA cocktails on the printed menu, not just on request.</li>
              <li>Real NA spirits on the back bar like Almave, Sentia, Glen Dochus, Abstinence, Ceybon.</li>
              <li>Fresh citrus and proper ice. NA drinks live or die on technique.</li>
              <li>NA beer in cans or bottles, not just one tap of legacy supermarket NA.</li>
              <li>Pricing comparable to alcoholic drinks. If the NA cocktail costs $4 less, the bar does not respect it.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "Shop the bottles Hillcrest locals stock at home",
        body: (
          <>
            <p>
              The Hillcrest crowd that lives alcohol-free does most of the actual drinking at home, then uses Good News and the neighborhood restaurants for nights out. Here is the short list of categories worth stocking, with the curated picks we keep in store and ship anywhere in California.
            </p>
            <ul>
              <li><Link to="/collections/best-sellers">Best sellers</Link>: the safest starting point if you do not know where to begin. The drinks our regulars buy on repeat.</li>
              <li><Link to="/collections/spirit-alternatives">Non-alcoholic spirits</Link>: Almave, Sentia, Glen Dochus, Abstinence, Ceybon. The base for any real NA cocktail at home.</li>
              <li><Link to="/collections/na-beer">Non-alcoholic beer</Link>: craft IPAs, lagers, stouts, and pilsners that hold up next to the alcoholic version.</li>
              <li><Link to="/collections/wine-alternatives">Non-alcoholic wine</Link>: dealcoholized still and sparkling bottles built for dinner, not for show.</li>
              <li><Link to="/collections/functional">Functional and adaptogen drinks</Link>: the kava, nootropic, and adaptogen end of the spectrum. Pairs well with the Good News vibe.</li>
              <li><Link to="/collections/beach-bonfire">Beach bonfire pack</Link>: our curated mix for an alcohol-free night with friends, designed for sharing.</li>
            </ul>
            <p>
              Not sure where to start? Browse the full <Link to="/shop">Monday Morning shop</Link>, or visit one of our <Link to="/locations">tasting rooms</Link> in Pacific Beach or Ocean Beach and we will pour you whatever you want to try.
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
      { question: "Is there a non-alcoholic bar in Hillcrest, San Diego?", answer: "Yes. Good News Bar on Park Blvd is Hillcrest's dedicated alcohol-free bar, with a zero-proof cocktail menu, kava program, and rotating events. For the deepest selection in the city, Monday Morning Bottle Shop is a 10 minute drive west in Pacific Beach with a tasting bar pouring 500+ non-alcoholic drinks." },
      { question: "Where can I buy non-alcoholic drinks near Hillcrest?", answer: "Monday Morning Bottle Shop at 1854 Garnet Ave in Pacific Beach is the closest dedicated non-alcoholic bottle shop. We carry 500+ NA beers, wines, spirits, and functional drinks and run a tasting bar. About a 10 minute drive from Hillcrest." },
      { question: "Do Hillcrest restaurants have non-alcoholic cocktail menus?", answer: "Most chef driven kitchens do, even when the menu does not list them. Ask for the non-alcoholic cocktail menu or ask what the bartender can build without alcohol. Tequila forward and wine focused rooms are the most reliable." },
      { question: "Can I taste non-alcoholic drinks before buying near Hillcrest?", answer: "Yes at Monday Morning Bottle Shop in Pacific Beach. Both Pacific Beach and Ocean Beach locations have tasting bars that pour any beer, spirit, or functional drink on the shelf during business hours. Wine tastings happen when a bottle is already open that day." },
      { question: "Is Hillcrest a good neighborhood for sober-curious nights out?", answer: "Excellent. The walkable Park Blvd corridor, the dedicated alcohol-free bar at Good News, and a critical mass of restaurants with serious NA cocktail programs make Hillcrest one of the easiest neighborhoods in San Diego for an alcohol-free night out." },
      { question: "What is the difference between a mocktail and a non-alcoholic cocktail?", answer: "Mocktail historically meant a sweet, juice based drink built for kids or non drinkers. Non-alcoholic cocktail signals a real bar drink built with non-alcoholic spirits, proper technique, and balanced flavors. The vocabulary matters when ordering." },
    ]}
    relatedLinks={[
      { label: "Best non-alcoholic bars in San Diego", href: "/best-non-alcoholic-bars-san-diego", description: "The full citywide guide." },
      { label: "Good News Bar alternatives", href: "/good-news-bar-alternatives-san-diego", description: "The conquesting comparison guide." },
      { label: "San Diego non-alcoholic drinks", href: "/non-alcoholic-drinks-san-diego", description: "The local pillar guide." },
      { label: "Monday Morning locations", href: "/locations", description: "Pacific Beach and Ocean Beach details." },
      { label: "Zero-proof home bar", href: "/zero-proof-home-bar", description: "Build the bar at home first." },
      { label: "Best non-alcoholic spirits", href: "/non-alcoholic-spirits", description: "Cluster page on NA spirits." },
      { label: "Best non-alcoholic beer", href: "/non-alcoholic-beer-guide", description: "The full NA beer guide." },
      { label: "Best non-alcoholic wine", href: "/non-alcoholic-wine", description: "Cluster page on NA wine." },
      { label: "Shop best sellers", href: "/collections/best-sellers", description: "The drinks our regulars reorder." },
    ]}
  />
);

export default NonAlcoholicBarHillcrest;
