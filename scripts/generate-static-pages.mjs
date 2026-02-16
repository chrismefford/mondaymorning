/**
 * Post-build script: Generates static HTML files for every route
 * with unique <title>, <meta description>, <link canonical>, OG tags,
 * JSON-LD structured data, AND pre-rendered body content baked into
 * the raw HTML so crawlers see real page content without JavaScript.
 *
 * Dynamically fetches all products from Shopify and blog posts from
 * Supabase so every page gets proper SEO tags AND visible content.
 *
 * The pre-rendered content inside <div id="root"> is replaced by React
 * when the JavaScript bundle loads, providing full interactivity.
 *
 * Usage: node scripts/generate-static-pages.mjs
 * Runs automatically after `vite build` via the build command.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync, readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const DIST = join(process.cwd(), "dist");
const SITE_NAME = "Monday Morning Bottle Shop";
const SITE_URL = "https://www.mondaymorning-af.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

// ── Asset Resolver ──────────────────────────────────────────────────
// Vite hashes filenames during build (e.g., friends-drinking.jpg → friends-drinking-Cg7gA0oM.jpg).
// This resolver finds the hashed filename so pre-rendered images use correct paths.

let _assetFiles = null;
function getAssetFiles() {
  if (!_assetFiles) {
    const assetsDir = join(DIST, "assets");
    _assetFiles = existsSync(assetsDir) ? readdirSync(assetsDir) : [];
  }
  return _assetFiles;
}

function resolveAsset(baseName) {
  // baseName like "friends-drinking" → finds "friends-drinking-Cg7gA0oM.jpg"
  const files = getAssetFiles();
  const match = files.find(f => f.startsWith(baseName + "-") || f.startsWith(baseName + "."));
  return match ? `/assets/${match}` : null;
}

// img() helper is defined after escapeHTML below

// ── Environment ─────────────────────────────────────────────────────

function loadEnv() {
  const envPath = join(process.cwd(), ".env");
  const env = {};
  if (existsSync(envPath)) {
    const lines = readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const match = line.match(/^([^=]+)=["']?([^"'\n]*)["']?$/);
      if (match) env[match[1].trim()] = match[2].trim();
    }
  }
  return {
    supabaseUrl: process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL || "",
    supabaseKey: process.env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY || "",
  };
}

const { supabaseUrl, supabaseKey } = loadEnv();

// ── API Fetchers ────────────────────────────────────────────────────

async function fetchAllProducts() {
  if (!supabaseUrl || !supabaseKey) {
    console.warn("⚠️  Supabase env vars not found – skipping dynamic product pages.");
    return [];
  }

  const allProducts = [];
  let cursor = null;
  let hasNextPage = true;
  let page = 1;

  try {
    while (hasNextPage) {
      let url = `${supabaseUrl}/functions/v1/shopify-storefront?action=products&first=250&sortKey=BEST_SELLING`;
      if (cursor) {
        url += `&after=${encodeURIComponent(cursor)}`;
      }

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${supabaseKey}` },
      });
      if (!res.ok) throw new Error(`Shopify API ${res.status}`);
      const data = await res.json();

      const products = data.products || [];
      allProducts.push(...products);

      hasNextPage = data.pageInfo?.hasNextPage || false;
      if (hasNextPage && products.length > 0) {
        cursor = data.pageInfo?.endCursor || data.endCursor || null;
        if (!cursor) hasNextPage = false;
      } else {
        hasNextPage = false;
      }

      console.log(`  📦 Page ${page}: fetched ${products.length} products (total so far: ${allProducts.length})`);
      page++;

      if (page > 20) {
        console.warn("⚠️  Reached max pagination limit (20 pages / ~5000 products)");
        break;
      }
    }

    const activeProducts = allProducts.filter((p) =>
      p.variants?.edges?.some((e) => e.node.availableForSale)
    );
    console.log(`  📦 Total: ${allProducts.length} products fetched, ${activeProducts.length} active (in stock)`);
    return activeProducts;
  } catch (err) {
    console.warn(`⚠️  Failed to fetch products: ${err.message}`);
    if (allProducts.length > 0) {
      const activeProducts = allProducts.filter((p) =>
        p.variants?.edges?.some((e) => e.node.availableForSale)
      );
      console.log(`  ⚠️  Returning ${activeProducts.length} products collected before error`);
      return activeProducts;
    }
    return [];
  }
}

async function fetchAllBlogPosts() {
  if (!supabaseUrl || !supabaseKey) {
    console.warn("⚠️  Supabase env vars not found – skipping dynamic blog pages.");
    return [];
  }

  try {
    const url = `${supabaseUrl}/rest/v1/blog_posts?select=id,title,slug,excerpt,featured_image,published_at,created_at&order=published_at.desc.nullslast,created_at.desc`;
    const res = await fetch(url, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });
    if (!res.ok) throw new Error(`Supabase API ${res.status}`);
    const posts = await res.json();
    console.log(`  📝 Fetched ${posts.length} published blog posts from Supabase`);
    return posts;
  } catch (err) {
    console.warn(`⚠️  Failed to fetch blog posts: ${err.message}`);
    return [];
  }
}

// ── Structured Data Schemas ─────────────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  sameAs: [
    "https://www.instagram.com/mondaymorningsd",
    "https://www.facebook.com/mondaymorningsd",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "1854 Garnet Ave",
    addressLocality: "San Diego",
    addressRegion: "CA",
    postalCode: "92109",
    addressCountry: "US",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "Monday Morning",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/shop?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LiquorStore",
  name: SITE_NAME,
  description:
    "San Diego's premier non-alcoholic bottle shop with 500+ flavors. Try before you buy at our Pacific Beach and Ocean Beach locations.",
  url: SITE_URL,
  telephone: "+1-619-555-0101",
  priceRange: "$$",
  image: DEFAULT_OG_IMAGE,
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "1854 Garnet Ave",
      addressLocality: "San Diego",
      addressRegion: "CA",
      postalCode: "92109",
      addressCountry: "US",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "4967 Newport Ave",
      addressLocality: "San Diego",
      addressRegion: "CA",
      postalCode: "92107",
      addressCountry: "US",
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "11:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "11:00",
      closes: "16:00",
    },
  ],
};

function collectionPageSchema(name, description, slug) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${name} | ${SITE_NAME}`,
    description,
    url: `${SITE_URL}/collections/${slug}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
}

function productSchema(product) {
  const price = product.priceRange?.minVariantPrice?.amount || "0";
  const image = product.featuredImage?.url || DEFAULT_OG_IMAGE;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: truncate(product.description, 200),
    image,
    url: `${SITE_URL}/product/${product.handle}`,
    brand: {
      "@type": "Brand",
      name: product.vendor || SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.handle}`,
      priceCurrency: "USD",
      price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };
}

function blogPostSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: truncate(post.excerpt || "", 160),
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.published_at,
    image: post.featured_image || DEFAULT_OG_IMAGE,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: DEFAULT_OG_IMAGE },
    },
  };
}

// ── Pre-rendered Body Content Generators ────────────────────────────
// These functions generate semantic HTML that crawlers can read.
// React will replace this content when JS loads (hydration).

function generateNavHTML() {
  return `<nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/shop">Shop by Vibe</a>
    <a href="/collections/all">All Products</a>
    <a href="/collections/best-sellers">Best Sellers</a>
    <a href="/collections/na-beer">NA Beer</a>
    <a href="/collections/wine-alternatives">Wine Alternatives</a>
    <a href="/collections/spirit-alternatives">Spirit Alternatives</a>
    <a href="/collections/functional">Functional Drinks</a>
    <a href="/about">About</a>
    <a href="/recipes">Recipes</a>
    <a href="/locations">Locations</a>
    <a href="/blog">Blog</a>
    <a href="/services">Wholesale</a>
  </nav>`;
}

function generateFooterHTML() {
  return `<footer>
    <p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
    <nav aria-label="Footer navigation">
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
      <a href="/shipping">Shipping Policy</a>
      <a href="/returns">Returns &amp; Refunds</a>
      <a href="/locations">Store Locations</a>
      <a href="/about">About Us</a>
    </nav>
    <p>Monday Morning Bottle Shop — 1854 Garnet Ave, San Diego, CA 92109 | 4967 Newport Ave, San Diego, CA 92107</p>
  </footer>`;
}

function generateHomepageBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      ${img("logo-primary-gold", "Monday Morning Bottle Shop logo", 'width="200" height="80" ')}
      <h1>America's #1 Non-Alcoholic Bottle Shop &amp; Tasting Room</h1>
      <h2>500+ Zero Proof Wines, Beers &amp; Spirits</h2>
      <p>Think non-alcoholic drinks can't taste good? We love skeptics. Come in, try something, and we'll make you a believer. Shop over 500 alcohol-free wines, craft NA beers, zero-proof spirits, and functional drinks online or at our San Diego locations in Pacific Beach and Ocean Beach.</p>
      <p>Monday Morning is San Diego's premier non-alcoholic bottle shop with 500+ flavors. Try before you buy at our Pacific Beach and Ocean Beach tasting rooms.</p>
      ${img("kava-haven", "Kava Haven non-alcoholic kava drink at Monday Morning Bottle Shop", 'width="300" height="400" ')}
      ${img("sentia-gold", "Sentia Gold non-alcoholic spirit with botanical ingredients", 'width="300" height="400" ')}
      ${img("bolle-rose", "Bollé Rosé non-alcoholic sparkling wine", 'width="300" height="400" ')}
      <ul>
        <li>500+ Flavors &amp; Styles</li>
        <li>2 San Diego Locations — Pacific Beach &amp; Ocean Beach</li>
        <li>#1 NA Bottle Shop in America</li>
      </ul>
      <a href="/locations">Come Try Something</a>
      <a href="/collections/all">Start Shopping</a>
    </section>
    <section>
      <h2>Featured Products</h2>
      <p>Discover our curated selection of the best non-alcoholic beverages. From craft NA beers to dealcoholized wines and zero-proof spirits, find your new favorite drink.</p>
    </section>
    <section>
      <h2>Shop by Vibe</h2>
      <p>Whether it's a beach day, date night, golden hour, or cozy evening — we have the perfect alcohol-free drink for every moment.</p>
      ${img("aperitif-golden-hour", "Best-selling non-alcoholic aperitifs at golden hour — Monday Morning Bottle Shop", 'width="600" height="400" ')}
      <a href="/collections/best-sellers">Best Sellers</a>
      ${img("beach-sunset-1", "Beach bonfire vibes with non-alcoholic drinks at sunset in San Diego", 'width="600" height="400" ')}
      <a href="/collections/beach-bonfire">Beach Bonfire Vibes</a>
      ${img("functional-wellness-morning", "Functional wellness drinks with adaptogens and nootropics", 'width="600" height="400" ')}
      <a href="/collections/functional">Functional Drinks</a>
      ${img("wine-dinner-toast", "Non-alcoholic wine alternatives for dinner and date night", 'width="600" height="400" ')}
      <a href="/collections/wine-alternatives">Wine Alternatives</a>
      ${img("beer-patio-friends", "Friends enjoying non-alcoholic craft beer on a patio in San Diego", 'width="600" height="400" ')}
      <a href="/collections/na-beer">NA Beer</a>
      ${img("sparkling-celebration", "Non-alcoholic sparkling wine for weddings and celebrations", 'width="600" height="400" ')}
      <a href="/collections/weddings">Weddings &amp; Events</a>
      <a href="/collections/spirit-alternatives">Spirit Alternatives</a>
      <a href="/collections/aperitifs">Aperitifs &amp; Digestifs</a>
    </section>
    <section>
      <h2>Our Story</h2>
      ${img("friends-drinking", "Friends enjoying non-alcoholic drinks together at Monday Morning Bottle Shop San Diego", 'width="600" height="400" ')}
      <p>Monday Morning was born from a simple realization: the best mornings start without a hangover. Founded by Zane in San Diego, we curate the world's finest non-alcoholic beverages so you can drink differently — without sacrificing taste or social experiences.</p>
      <a href="/about">Read Our Story</a>
    </section>
    <section>
      <h2>Why We Don't Drink</h2>
      <p>Join the growing movement of mindful drinkers. 61% of Gen Z and 49% of Millennials are choosing to drink less. At Monday Morning, we make that choice delicious.</p>
    </section>
    <section>
      <h2>NA Mocktail Recipes</h2>
      <p>Discover delicious non-alcoholic cocktail recipes. Easy mocktails for breakfast, dinner, beach days, and celebrations — made with premium NA spirits, wine, and beer.</p>
      ${img("botanical-mocktail", "Botanical non-alcoholic mocktail recipe from Monday Morning", 'width="400" height="300" ')}
      ${img("aperitif-spritz", "Non-alcoholic aperitif spritz recipe for golden hour", 'width="400" height="300" ')}
      <a href="/recipes">View All Recipes</a>
    </section>
    <section>
      <h2>What Our Customers Say</h2>
      <p>"Zane's knowledge of alcohol-free beverages is unmatched. He helped me find drinks I actually enjoy." — Jeff L., San Diego</p>
      <p>"This place changed my relationship with drinking. I never thought I'd look forward to a night out sober." — Michael S., Pacific Beach</p>
      <p>"Finally, a place that gets it. No judgment, incredible selection, and staff who actually care." — Sarah M., Ocean Beach</p>
    </section>
    <section>
      <h2>Follow Us on Instagram</h2>
      ${img("ig-storefront", "Monday Morning Bottle Shop storefront in Pacific Beach San Diego", 'width="300" height="300" ')}
      ${img("ig-shop-interior", "Inside Monday Morning Bottle Shop — 500+ non-alcoholic drinks on display", 'width="300" height="300" ')}
      ${img("ig-friends-cheers", "Friends cheering with non-alcoholic drinks at Monday Morning", 'width="300" height="300" ')}
      ${img("ig-beer-shelf", "Non-alcoholic craft beer selection at Monday Morning Bottle Shop", 'width="300" height="300" ')}
      ${img("ig-amethyst", "Amethyst non-alcoholic drink at Monday Morning Bottle Shop", 'width="300" height="300" ')}
      ${img("ig-news", "Monday Morning Bottle Shop featured in the news", 'width="300" height="300" ')}
    </section>
    <section>
      <h2>Stay Connected</h2>
      ${img("friends-cocktails", "Friends making non-alcoholic cocktails together — join the Monday Morning community", 'width="600" height="400" ')}
      <p>Join our newsletter for exclusive deals, new product drops, and NA drink recipes delivered to your inbox.</p>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateShopBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>Shop by Vibe — Non-Alcoholic Drinks for Every Moment</h1>
      <p>Explore 500+ non-alcoholic drinks organized by vibe. Beach Day, Date Night, Golden Hour, and more. Find the perfect NA beer, wine, or spirit for any moment at Monday Morning Bottle Shop.</p>
    </section>
    <section>
      <h2>Beach Day</h2>
      ${img("friends-beach-toast", "Friends toasting with non-alcoholic drinks on the beach in San Diego", 'width="600" height="400" ')}
      <p>Sun, sand, and good sips. Shop refreshing non-alcoholic drinks perfect for a day by the water.</p>
      <a href="/collections/beach-day">Shop Beach Day</a>
    </section>
    <section>
      <h2>Date Night</h2>
      ${img("dinner-party-toast", "Couple enjoying non-alcoholic wine at a romantic dinner date night", 'width="600" height="400" ')}
      <p>Intimate moments, elevated. Shop sophisticated non-alcoholic wines, spirits, and cocktails for romantic evenings.</p>
      <a href="/collections/date-night">Shop Date Night</a>
    </section>
    <section>
      <h2>Golden Hour</h2>
      ${img("rooftop-cheers", "Rooftop cheers with non-alcoholic aperitifs during golden hour", 'width="600" height="400" ')}
      <p>When the light hits just right. Shop non-alcoholic aperitifs and spritzes for sunset sipping.</p>
      <a href="/collections/golden-hour">Shop Golden Hour</a>
    </section>
    <section>
      <h2>Cozy Evening</h2>
      ${img("patio-couple-beers", "Couple relaxing with non-alcoholic beers on a cozy patio evening", 'width="600" height="400" ')}
      <p>Unwind in your own way. Shop warming non-alcoholic spirits and botanical drinks for nights in.</p>
      <a href="/collections/cozy-evening">Shop Cozy Evening</a>
    </section>
    <section>
      <h2>Party Mode</h2>
      ${img("sparkling-celebration", "Non-alcoholic sparkling wine toast at a party celebration", 'width="600" height="400" ')}
      <p>Toast without the hangover. Shop sparkling non-alcoholic wines and champagne alternatives for celebrations.</p>
      <a href="/collections/party-mode">Shop Party Mode</a>
    </section>
    <section>
      <h2>Morning Ritual</h2>
      ${img("functional-wellness-morning", "Functional wellness elixir for a mindful morning ritual", 'width="600" height="400" ')}
      <p>Start with intention. Shop energizing non-alcoholic drinks and wellness elixirs for a mindful morning.</p>
      <a href="/collections/morning-ritual">Shop Morning Ritual</a>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateAboutBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>Where You Can Drink Differently — Without Judgment or Sacrificing Taste</h1>
      <p>About Monday Morning Bottle Shop &amp; Tasting Room</p>
      ${img("cheers-drinks", "Friends cheering with non-alcoholic drinks at Monday Morning Bottle Shop", 'width="800" height="500" ')}
    </section>
    <section>
      <h2>Why Monday Morning?</h2>
      ${img("zane-founder", "Zane, founder of Monday Morning Bottle Shop, San Diego's premier non-alcoholic bottle shop", 'width="400" height="500" ')}
      <p>"I loved Monday mornings again." That's what our founder, Zane, realized after choosing to go alcohol-free. No more foggy Sundays. No more dreading the week ahead. Just clarity, energy, and a weird sense of excitement for Monday.</p>
      <p>But there was a problem. Finding AF drinks that actually tasted good? Nearly impossible. Everything was either watery, packed with sugar, or tasted like an afterthought.</p>
      <p>So Zane went on a mission. He traveled the world — tasting, testing, and curating the best alcohol-free beverages on the planet. The result? Monday Morning.</p>
      <p>We opened our doors in San Diego to share what we discovered: that you don't have to sacrifice taste to live differently. That "alcohol-free" can mean sophisticated, complex, and genuinely delicious.</p>
    </section>
    <section>
      <h2>Did You Know?</h2>
      <p>61% of Gen Z and 49% of Millennials are trying to drink less. You're not alone. A massive cultural shift is underway, and we're here to make it delicious.</p>
    </section>
    <section>
      <h2>Killer AF Brands</h2>
      <p>We carry over 50 premium non-alcoholic brands including Atmos, Buzzkill, Pentire, Tenneyson, Three Spirit, Bauhaus, Pathfinder, Go Brewing, Dromme, Abstinence, and many more.</p>
    </section>
    <section>
      <h2>Sip, Sit, Shop</h2>
      ${img("ig-shop-interior", "Inside Monday Morning Bottle Shop — browse and sample 500+ non-alcoholic drinks", 'width="600" height="400" ')}
      <p><strong>Sip:</strong> Sample AF options until you find your favorite. Every bottle is available to try — no purchase necessary.</p>
      <p><strong>Sit:</strong> Grab a seat at our tasting bar. Enjoy craft NA cocktails in a space built for connection.</p>
      <p><strong>Shop:</strong> Take your favorites home. We ship nationwide or pick up in-store at OB or PB.</p>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateRecipesBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>NA Mocktail Recipes — Non-Alcoholic Cocktail Ideas</h1>
      <p>Discover delicious non-alcoholic cocktail recipes. Easy mocktails for breakfast, dinner, beach days, and celebrations. Made with premium NA spirits, wine, and beer from Monday Morning Bottle Shop.</p>
      ${img("tropical-mocktail", "Tropical non-alcoholic mocktail recipe with fresh fruit garnish", 'width="600" height="400" ')}
    </section>
    <section>
      <h2>Browse Recipes by Occasion</h2>
      <p>Whether you're hosting brunch, planning a dinner party, or relaxing at home, we have the perfect NA cocktail recipe for you. All recipes use ingredients available at Monday Morning.</p>
      ${img("na-old-fashioned-cocktail", "Non-alcoholic Old Fashioned cocktail recipe", 'width="400" height="300" ')}
      ${img("rose-spritzer", "Non-alcoholic rosé spritzer recipe for brunch", 'width="400" height="300" ')}
      ${img("na-ipa-beer", "Non-alcoholic IPA craft beer for beer cocktail recipes", 'width="400" height="300" ')}
      ${img("botanical-mocktail", "Botanical non-alcoholic mocktail with herbs and citrus", 'width="400" height="300" ')}
      <a href="/recipes?occasion=breakfast">Breakfast &amp; Brunch</a>
      <a href="/recipes?occasion=cocktails">Classic Cocktails</a>
      <a href="/recipes?occasion=dinner">Dinner Party</a>
      <a href="/recipes?occasion=celebration">Celebrations</a>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateLocationsBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>Monday Morning Store Locations — San Diego NA Bottle Shop</h1>
      <p>Visit our two San Diego locations to try before you buy. Sample from 500+ non-alcoholic beverages at our Pacific Beach and Ocean Beach tasting rooms.</p>
      ${img("ig-storefront", "Monday Morning Bottle Shop storefront in Pacific Beach, San Diego", 'width="600" height="400" ')}
    </section>
    <section>
      <h2>Pacific Beach Location</h2>
      ${img("ig-shop-interior", "Inside Monday Morning Pacific Beach — non-alcoholic bottle shop and tasting room", 'width="600" height="400" ')}
      <p><strong>Address:</strong> 1854 Garnet Ave, San Diego, CA 92109</p>
      <p><strong>Hours:</strong> Monday–Saturday 11 AM – 8 PM, Sunday 11 AM – 4 PM</p>
      <a href="https://maps.google.com/?q=1854+Garnet+Ave+San+Diego+CA+92109">Get Directions</a>
    </section>
    <section>
      <h2>Ocean Beach Location</h2>
      <p><strong>Address:</strong> 4967 Newport Ave, San Diego, CA 92107</p>
      <p><strong>Hours:</strong> Monday–Sunday 9 AM – 6 PM, Wednesday open until 8 PM</p>
      <a href="https://maps.google.com/?q=4967+Newport+Ave+San+Diego+CA+92107">Get Directions</a>
    </section>
    <section>
      <h2>Find Us at Partner Locations</h2>
      <p>Monday Morning products are also available at select San Diego restaurants, bars, and cafes including Fall Brewing Company (North Park) and Selva Coffee House (Mission Valley).</p>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateBlogIndexBody(blogPosts) {
  let postsHTML = "";
  for (const post of blogPosts.slice(0, 20)) {
    const excerpt = post.excerpt ? escapeHTML(truncate(post.excerpt, 200)) : "";
    postsHTML += `<article>
      <h2><a href="/blog/${escapeHTML(post.slug)}">${escapeHTML(post.title)}</a></h2>
      ${post.featured_image ? `<img src="${escapeHTML(post.featured_image)}" alt="${escapeHTML(post.title)}" loading="lazy" />` : ""}
      ${excerpt ? `<p>${excerpt}</p>` : ""}
      ${post.published_at ? `<time datetime="${post.published_at}">${new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>` : ""}
      <a href="/blog/${escapeHTML(post.slug)}">Read More</a>
    </article>`;
  }

  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>Monday Morning Blog — Stories from the Alcohol-Free Lifestyle</h1>
      <p>Stories, recipes, and insights from the alcohol-free lifestyle movement. Discover the joy of mindful drinking with Monday Morning.</p>
    </section>
    <section>
      ${postsHTML || "<p>Check back soon for new blog posts about the alcohol-free lifestyle.</p>"}
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateServicesBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>Wholesale &amp; B2B Services — Non-Alcoholic Beverages for Bars &amp; Restaurants</h1>
      <p>Partner with Monday Morning for wholesale non-alcoholic beverages. Premium NA beer, wine, spirits, and mocktails for bars, restaurants, hotels, and retailers in San Diego and beyond.</p>
      ${img("ig-beer-shelf", "Non-alcoholic beverage selection for wholesale — 500+ products available at Monday Morning", 'width="600" height="400" ')}
    </section>
    <section>
      <h2>Why Partner with Monday Morning?</h2>
      <p>The non-alcoholic beverage market is booming. 61% of Gen Z and 49% of Millennials are drinking less. Adding premium NA options to your menu captures this growing demand and increases revenue per guest.</p>
      <ul>
        <li>Curated selection of 500+ premium NA beverages</li>
        <li>Staff training and menu development</li>
        <li>Competitive wholesale pricing</li>
        <li>Local San Diego delivery</li>
        <li>Expert guidance on NA beverage programs</li>
      </ul>
    </section>
    <section>
      <h2>Contact Us</h2>
      <p>Ready to elevate your beverage program? Contact Monday Morning for wholesale pricing and partnership opportunities.</p>
      <p>Email: hello@mondaymorning-af.com</p>
      <p>Phone: (619) 555-0101</p>
      <p>Address: 1854 Garnet Ave, San Diego, CA 92109</p>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateValentinesBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>Sips &amp; Sweethearts — Valentine's Date Night at Monday Morning</h1>
      <p>Join us February 12th for an unforgettable Valentine's date night featuring handcrafted NA cocktails, chocolate pairings, charcuterie, and a cozy movie screening at Monday Morning Pacific Beach.</p>
    </section>
    <section>
      <h2>What's Included</h2>
      <ul>
        <li>NA Cocktail Experience — Create two of our most loved cocktails with bartender DY</li>
        <li>Chocolate Truffle Pairing — Artisan chocolates by Maya Moon paired with your drinks</li>
        <li>Couples Love Portraits — Take home a custom couples caricature keepsake</li>
        <li>Charcuterie for Two — A beautifully curated board to share</li>
        <li>Cozy Movie Screening — End the night with a romantic film together</li>
      </ul>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generatePrivacyBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>Privacy Policy — Monday Morning Bottle Shop</h1>
      <p>Last updated: January 2026</p>
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly to us, such as when you create an account, make a purchase, sign up for our newsletter, or contact us for support. This may include your name, email address, shipping address, phone number, and payment information.</p>
      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to process orders, communicate with you, improve our services, and send marketing communications with your consent.</p>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateTermsBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>Terms of Service — Monday Morning Bottle Shop</h1>
      <p>Last updated: January 2026</p>
      <h2>Acceptance of Terms</h2>
      <p>By accessing and using the Monday Morning website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
      <h2>Age Requirement</h2>
      <p>While our products are non-alcoholic, you must be at least 18 years of age to make purchases on our website.</p>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateShippingBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>Shipping Policy — Monday Morning Bottle Shop</h1>
      <h2>Shipping Locations</h2>
      <p>We currently ship to all 50 U.S. states. For local customers in San Diego, in-store pickup is available at both our Ocean Beach and Pacific Beach locations.</p>
      <h2>Shipping Methods &amp; Timing</h2>
      <ul>
        <li>Standard Shipping: 5–7 business days — $8.99</li>
        <li>Expedited Shipping: 2–3 business days — $14.99</li>
        <li>Overnight Shipping: 1 business day — $24.99</li>
        <li>Free Shipping: Orders over $75 qualify for free standard shipping</li>
      </ul>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateReturnsBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>Returns &amp; Refunds — Monday Morning Bottle Shop</h1>
      <p><strong>Our Promise:</strong> We want you to love what you drink. If you're not satisfied with your purchase, we'll make it right.</p>
      <h2>Return Policy</h2>
      <p>We accept returns within 30 days of purchase for unopened products in their original packaging. Due to the nature of consumable products, we cannot accept returns on opened items unless they are defective.</p>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateCollectionBody(route) {
  // Extract collection name from title (before the |)
  const collectionName = route.title.split("|")[0].trim();
  // Map collection slugs to lifestyle images
  const collectionImages = {
    "best-sellers": ["aperitif-golden-hour", "Best-selling non-alcoholic drinks at Monday Morning Bottle Shop"],
    "na-beer": ["beer-patio-friends", "Non-alcoholic craft beer collection at Monday Morning"],
    "wine-alternatives": ["wine-dinner-toast", "Non-alcoholic wine alternatives — red, white, rosé and sparkling"],
    "spirit-alternatives": ["na-botanical-dark", "Non-alcoholic spirit alternatives for craft cocktails"],
    "functional": ["functional-wellness-morning", "Functional wellness drinks with adaptogens and nootropics"],
    "beach-bonfire": ["beach-sunset-1", "Beach bonfire vibes with non-alcoholic drinks at sunset"],
    "weddings": ["sparkling-celebration", "Non-alcoholic sparkling wine for weddings and celebrations"],
    "aperitifs": ["aperitif-golden-hour", "Non-alcoholic aperitifs and digestifs for golden hour"],
    "all": ["ig-shop-interior", "Browse all 500+ non-alcoholic drinks at Monday Morning Bottle Shop"],
    "beach-day": ["friends-beach-toast", "Non-alcoholic drinks for a perfect beach day in San Diego"],
    "date-night": ["dinner-party-toast", "Sophisticated non-alcoholic drinks for date night"],
    "golden-hour": ["rooftop-cheers", "Non-alcoholic aperitifs and spritzes for golden hour"],
    "cozy-evening": ["patio-couple-beers", "Warming non-alcoholic drinks for a cozy evening"],
    "party-mode": ["sparkling-celebration", "Non-alcoholic sparkling drinks for parties and celebrations"],
    "morning-ritual": ["functional-wellness-morning", "Energizing non-alcoholic wellness drinks for morning rituals"],
  };
  const slug = route.path.replace("/collections/", "");
  const imgData = collectionImages[slug];
  const collectionImg = imgData ? img(imgData[0], imgData[1], 'width="600" height="400" ') : "";

  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>${escapeHTML(collectionName)} — ${SITE_NAME}</h1>
      <p>${escapeHTML(route.description)}</p>
      ${collectionImg}
    </section>
    <section>
      <h2>Browse ${escapeHTML(collectionName)}</h2>
      <p>Explore our curated selection of ${escapeHTML(collectionName.toLowerCase())} at Monday Morning. All products are available for nationwide shipping or in-store pickup at our Pacific Beach and Ocean Beach locations.</p>
      <a href="/collections/all">View All Products</a>
      <a href="/shop">Shop by Vibe</a>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateProductBody(product) {
  const price = product.priceRange?.minVariantPrice?.amount || "0";
  const image = product.featuredImage?.url || "";
  const vendor = product.vendor || "";
  const category = product.productType || "Beverages";
  const desc = truncate(product.description || "", 500);

  return `<header>${generateNavHTML()}</header>
  <main>
    <nav aria-label="Breadcrumb">
      <a href="/">Home</a> &gt; <a href="/shop">Shop</a> &gt; <span>${escapeHTML(product.title)}</span>
    </nav>
    <article>
      <h1>${escapeHTML(product.title)}</h1>
      ${image ? `<img src="${escapeHTML(image)}" alt="${escapeHTML(product.title)} — non-alcoholic ${escapeHTML(category.toLowerCase())} at ${SITE_NAME}" width="600" height="600" loading="lazy" />` : ""}
      <p><strong>Category:</strong> ${escapeHTML(category)}</p>
      ${vendor ? `<p><strong>Brand:</strong> ${escapeHTML(vendor)}</p>` : ""}
      <p><strong>Price:</strong> $${parseFloat(price).toFixed(2)}</p>
      <p>${escapeHTML(desc)}</p>
      <p>Shop ${escapeHTML(product.title)} — premium non-alcoholic ${escapeHTML(category.toLowerCase())} at ${SITE_NAME}. ${vendor ? `By ${escapeHTML(vendor)}. ` : ""}Free shipping on orders over $75.</p>
    </article>
    <section>
      <h2>More Non-Alcoholic Drinks to Explore</h2>
      <p>Discover more premium non-alcoholic beverages at Monday Morning. Browse our full collection of 500+ NA beers, wines, spirits, and functional drinks.</p>
      <a href="/collections/all">View All Products</a>
      <a href="/shop">Shop by Vibe</a>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateBlogPostBody(post) {
  const excerpt = post.excerpt ? escapeHTML(truncate(post.excerpt, 300)) : "";
  return `<header>${generateNavHTML()}</header>
  <main>
    <nav aria-label="Breadcrumb">
      <a href="/">Home</a> &gt; <a href="/blog">Blog</a> &gt; <span>${escapeHTML(post.title)}</span>
    </nav>
    <article>
      <h1>${escapeHTML(post.title)}</h1>
      ${post.featured_image ? `<img src="${escapeHTML(post.featured_image)}" alt="${escapeHTML(post.title)}" width="1200" height="630" loading="lazy" />` : ""}
      ${post.published_at ? `<time datetime="${post.published_at}">Published: ${new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>` : ""}
      ${excerpt ? `<p>${excerpt}</p>` : ""}
      <p>Read the full article on the Monday Morning blog. Stories and insights from the alcohol-free lifestyle movement.</p>
    </article>
    <section>
      <h2>More from the Monday Morning Blog</h2>
      <a href="/blog">View All Blog Posts</a>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateNoIndexBody(route) {
  // Minimal content for noindex pages (cart, checkout, auth)
  return `<header>${generateNavHTML()}</header>
  <main>
    <h1>${escapeHTML(route.title.split("|")[0].trim())}</h1>
    <p>${escapeHTML(route.description)}</p>
  </main>
  ${generateFooterHTML()}`;
}

// Map route paths to body content generators
function getBodyContent(route, allProducts, allBlogPosts) {
  const path = route.path;

  if (path === "/") return generateHomepageBody();
  if (path === "/shop") return generateShopBody();
  if (path === "/about") return generateAboutBody();
  if (path === "/recipes") return generateRecipesBody();
  if (path === "/locations") return generateLocationsBody();
  if (path === "/blog") return generateBlogIndexBody(allBlogPosts);
  if (path === "/services") return generateServicesBody();
  if (path === "/valentines") return generateValentinesBody();
  if (path === "/privacy") return generatePrivacyBody();
  if (path === "/terms") return generateTermsBody();
  if (path === "/shipping") return generateShippingBody();
  if (path === "/returns") return generateReturnsBody();

  if (path.startsWith("/collections/")) return generateCollectionBody(route);

  if (path.startsWith("/product/")) {
    const handle = path.replace("/product/", "");
    const product = allProducts.find((p) => p.handle === handle);
    if (product) return generateProductBody(product);
  }

  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    const post = allBlogPosts.find((p) => p.slug === slug);
    if (post) return generateBlogPostBody(post);
  }

  if (route.noIndex) return generateNoIndexBody(route);

  // Fallback: minimal content
  return `<header>${generateNavHTML()}</header>
  <main>
    <h1>${escapeHTML(route.title.split("|")[0].trim())}</h1>
    <p>${escapeHTML(route.description)}</p>
  </main>
  ${generateFooterHTML()}`;
}

// ── Static Route Definitions ────────────────────────────────────────

const staticRoutes = [
  {
    path: "/",
    title: "Monday Morning | America's #1 NA Bottle Shop & Tasting Room",
    description: "San Diego's premier non-alcoholic bottle shop with 500+ flavors. Shop NA beer, wine, spirits & mocktails. Try before you buy at our Pacific Beach & Ocean Beach locations.",
    schema: [organizationSchema, websiteSchema, localBusinessSchema],
  },
  {
    path: "/shop",
    title: "Shop by Vibe | Monday Morning Bottle Shop",
    description: "Explore 500+ non-alcoholic drinks organized by vibe. Beach Day, Date Night, Golden Hour & more. Find the perfect NA beer, wine, or spirit for any moment.",
    schema: [organizationSchema, websiteSchema],
  },
  {
    path: "/about",
    title: "About Us | Monday Morning Bottle Shop",
    description: "Meet Zane, the founder of Monday Morning. Discover why we created San Diego's premier non-alcoholic bottle shop with 500+ flavors to help you drink differently.",
    schema: [organizationSchema],
  },
  {
    path: "/recipes",
    title: "NA Mocktail Recipes | Monday Morning Bottle Shop",
    description: "Discover delicious non-alcoholic cocktail recipes. Easy mocktails for breakfast, dinner, beach days & celebrations. Made with premium NA spirits, wine & beer.",
    schema: [organizationSchema, websiteSchema],
  },
  {
    path: "/locations",
    title: "Store Locations | Monday Morning Bottle Shop",
    description: "Visit Monday Morning's two San Diego locations. Pacific Beach (1854 Garnet Ave) and Ocean Beach (4967 Newport Ave). Try before you buy — sample 500+ NA drinks.",
    schema: [organizationSchema, localBusinessSchema],
  },
  {
    path: "/blog",
    title: "Blog | Monday Morning Bottle Shop",
    description: "Stories, recipes, and insights from the alcohol-free lifestyle movement. Discover the joy of mindful drinking with Monday Morning.",
    schema: [organizationSchema, websiteSchema],
  },
  {
    path: "/services",
    title: "Wholesale & B2B Services | Monday Morning Bottle Shop",
    description: "Partner with Monday Morning for wholesale non-alcoholic beverages. Premium NA beer, wine, spirits & mocktails for bars, restaurants, and retailers in San Diego.",
    schema: [organizationSchema],
  },
  {
    path: "/valentines",
    title: "Sips & Sweethearts | Valentine's Date Night | Monday Morning Bottle Shop",
    description: "Join us February 12th for an unforgettable Valentine's date night featuring handcrafted NA cocktails, chocolate pairings, charcuterie, and a cozy movie screening.",
    schema: [organizationSchema],
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Monday Morning Bottle Shop",
    description: "Read Monday Morning Bottle Shop's privacy policy. Learn how we collect, use, and protect your personal information.",
    schema: [organizationSchema],
  },
  {
    path: "/terms",
    title: "Terms of Service | Monday Morning Bottle Shop",
    description: "Read Monday Morning Bottle Shop's terms of service for using our website and purchasing products.",
    schema: [organizationSchema],
  },
  {
    path: "/shipping",
    title: "Shipping Policy | Monday Morning Bottle Shop",
    description: "Learn about Monday Morning's shipping options, delivery times, and free shipping thresholds for non-alcoholic beverages.",
    schema: [organizationSchema],
  },
  {
    path: "/returns",
    title: "Returns & Refunds | Monday Morning Bottle Shop",
    description: "Monday Morning's return and refund policy for non-alcoholic beverages. Learn about our satisfaction guarantee.",
    schema: [organizationSchema],
  },

  // Cart & checkout (SPA-only, noIndex)
  {
    path: "/cart",
    title: "Shopping Cart | Monday Morning Bottle Shop",
    description: "Review your cart and checkout. Shop 500+ non-alcoholic drinks at Monday Morning Bottle Shop.",
    noIndex: true,
    schema: [],
  },
  {
    path: "/checkout",
    title: "Checkout | Monday Morning Bottle Shop",
    description: "Complete your order for premium non-alcoholic beverages from Monday Morning Bottle Shop.",
    noIndex: true,
    schema: [],
  },
  {
    path: "/order-confirmation",
    title: "Order Confirmed | Monday Morning Bottle Shop",
    description: "Thank you for your order from Monday Morning Bottle Shop.",
    noIndex: true,
    schema: [],
  },

  // NoIndex pages
  {
    path: "/auth",
    title: "Sign In | Monday Morning Bottle Shop",
    description: "Sign in to your Monday Morning account to track orders, save favorites, and access exclusive deals on non-alcoholic beverages.",
    noIndex: true,
    schema: [],
  },
  {
    path: "/wholesale-login",
    title: "B2B Login | Monday Morning Bottle Shop",
    description: "Login to your Monday Morning wholesale account to access B2B pricing and ordering.",
    noIndex: true,
    schema: [],
  },
  {
    path: "/wholesale-catalog",
    title: "Wholesale Catalog | Monday Morning Bottle Shop",
    description: "Browse Monday Morning's wholesale catalog of non-alcoholic beverages for bars, restaurants, and retailers.",
    noIndex: true,
    schema: [],
  },

  // Collection pages
  {
    path: "/collections/best-sellers",
    title: "Best Sellers | Non-Alcoholic Drinks | Monday Morning Bottle Shop",
    description: "Our community favorites. Shop the most popular non-alcoholic beers, wines, spirits & mocktails at Monday Morning. The drinks that keep people coming back.",
    schema: [organizationSchema, collectionPageSchema("Best Sellers", "Our community favorites. The drinks that keep people coming back.", "best-sellers")],
  },
  {
    path: "/collections/na-beer",
    title: "NA Beer | Non-Alcoholic Craft Beer | Monday Morning Bottle Shop",
    description: "Craft taste, zero proof. Shop the best non-alcoholic beers from around the world. IPAs, lagers, stouts & more at Monday Morning Bottle Shop in San Diego.",
    schema: [organizationSchema, collectionPageSchema("NA Beer", "Craft taste, zero proof. The best non-alcoholic beers from around the world.", "na-beer")],
  },
  {
    path: "/collections/wine-alternatives",
    title: "Wine Alternatives | Non-Alcoholic Wine | Monday Morning Bottle Shop",
    description: "All the ritual, reimagined. Shop dealcoholized wines that don't compromise on flavor. Red, white, rosé & sparkling NA wines at Monday Morning.",
    schema: [organizationSchema, collectionPageSchema("Wine Alternatives", "All the ritual, reimagined. Dealcoholized wines that don't compromise on flavor.", "wine-alternatives")],
  },
  {
    path: "/collections/spirit-alternatives",
    title: "Spirit Alternatives | Non-Alcoholic Spirits | Monday Morning Bottle Shop",
    description: "Complex and bold. Shop alcohol-free spirits for craft cocktails. NA gin, whiskey, rum, tequila & more at Monday Morning Bottle Shop.",
    schema: [organizationSchema, collectionPageSchema("Spirit Alternatives", "Complex and bold. Alcohol-free spirits for craft cocktails.", "spirit-alternatives")],
  },
  {
    path: "/collections/functional",
    title: "Functional Drinks | Adaptogens & Nootropics | Monday Morning Bottle Shop",
    description: "Beverages with benefits. Shop functional drinks with adaptogens, nootropics, and feel-good ingredients. Wellness elixirs at Monday Morning.",
    schema: [organizationSchema, collectionPageSchema("Functional Drinks", "Beverages with benefits. Adaptogens, nootropics, and feel-good ingredients.", "functional")],
  },
  {
    path: "/collections/beach-bonfire",
    title: "Beach Bonfire Vibes | Ready to Drink NA | Monday Morning Bottle Shop",
    description: "Sip under the stars. Shop easy-drinking non-alcoholic options for outdoor moments. RTD cocktails, NA seltzers & more at Monday Morning.",
    schema: [organizationSchema, collectionPageSchema("Beach Bonfire Vibes", "Sip under the stars. Easy-drinking options for outdoor moments.", "beach-bonfire")],
  },
  {
    path: "/collections/weddings",
    title: "Weddings & Events | NA Drinks for Celebrations | Monday Morning Bottle Shop",
    description: "Toast-worthy moments. Shop elegant non-alcoholic wines, sparkling & champagne alternatives for weddings, parties & celebrations at Monday Morning.",
    schema: [organizationSchema, collectionPageSchema("Weddings & Events", "Toast-worthy moments. Elegant options for celebrations.", "weddings")],
  },
  {
    path: "/collections/aperitifs",
    title: "Aperitifs & Digestifs | Non-Alcoholic | Monday Morning Bottle Shop",
    description: "Golden hour essentials. Shop non-alcoholic aperitifs, digestifs & liqueurs. Light, bitter, and perfect for pre-dinner sipping at Monday Morning.",
    schema: [organizationSchema, collectionPageSchema("Aperitifs & Digestifs", "Golden hour essentials. Light, bitter, and perfect for pre-dinner sipping.", "aperitifs")],
  },
  {
    path: "/collections/all",
    title: "All Products | 500+ Non-Alcoholic Drinks | Monday Morning Bottle Shop",
    description: "Browse our complete collection of 500+ non-alcoholic drinks. NA beer, wine, spirits, mocktails, functional elixirs & more at Monday Morning Bottle Shop.",
    schema: [organizationSchema, collectionPageSchema("All Products", "Browse our complete collection of 500+ non-alcoholic drinks.", "all")],
  },
  {
    path: "/collections/beach-day",
    title: "Beach Day | Refreshing NA Drinks | Monday Morning Bottle Shop",
    description: "Sun, sand, and good sips. Shop refreshing non-alcoholic drinks perfect for a day by the water. Tropical, citrus & crisp NA beverages at Monday Morning.",
    schema: [organizationSchema, collectionPageSchema("Beach Day", "Sun, sand, and good sips. Refreshing drinks perfect for a day by the water.", "beach-day")],
  },
  {
    path: "/collections/date-night",
    title: "Date Night | Sophisticated NA Drinks | Monday Morning Bottle Shop",
    description: "Intimate moments, elevated. Shop sophisticated non-alcoholic wines, spirits & cocktails for romantic evenings. Premium NA drinks at Monday Morning.",
    schema: [organizationSchema, collectionPageSchema("Date Night", "Intimate moments, elevated. Sophisticated sips for romantic evenings.", "date-night")],
  },
  {
    path: "/collections/golden-hour",
    title: "Golden Hour | NA Aperitifs & Spritzes | Monday Morning Bottle Shop",
    description: "When the light hits just right. Shop non-alcoholic aperitifs and spritzes for sunset sipping. Botanical, bitter & refreshing NA drinks at Monday Morning.",
    schema: [organizationSchema, collectionPageSchema("Golden Hour", "When the light hits just right. Aperitifs and spritzes for sunset sipping.", "golden-hour")],
  },
  {
    path: "/collections/cozy-evening",
    title: "Cozy Evening | Warming NA Drinks | Monday Morning Bottle Shop",
    description: "Unwind in your own way. Shop warming non-alcoholic spirits, functional elixirs & botanical drinks for nights in. Cozy NA sips at Monday Morning.",
    schema: [organizationSchema, collectionPageSchema("Cozy Evening", "Unwind in your own way. Warming sips for nights in.", "cozy-evening")],
  },
  {
    path: "/collections/party-mode",
    title: "Party Mode | Celebratory NA Drinks | Monday Morning Bottle Shop",
    description: "Toast without the hangover. Shop sparkling non-alcoholic wines, champagne alternatives & bubbly drinks for celebrations at Monday Morning.",
    schema: [organizationSchema, collectionPageSchema("Party Mode", "Toast without the hangover. Celebratory drinks that keep the energy going.", "party-mode")],
  },
  {
    path: "/collections/morning-ritual",
    title: "Morning Ritual | Wellness Elixirs & NA Coffee | Monday Morning Bottle Shop",
    description: "Start with intention. Shop energizing non-alcoholic drinks, wellness elixirs, adaptogens & NA coffee for a mindful morning at Monday Morning.",
    schema: [organizationSchema, collectionPageSchema("Morning Ritual", "Start with intention. Energizing drinks and wellness elixirs for a mindful morning.", "morning-ritual")],
  },
];

// ── Dynamic Route Builders ──────────────────────────────────────────

function buildProductRoutes(products) {
  return products.map((p) => {
    const category = p.productType || "Beverages";
    const vendor = p.vendor || "";
    const title = `${truncate(p.title, 50)} | ${SITE_NAME}`;
    const description = `Shop ${p.title} - premium non-alcoholic ${category.toLowerCase()} at ${SITE_NAME}. ${vendor ? `By ${vendor}. ` : ""}Free shipping on orders over $75.`;
    const ogImage = p.featuredImage?.url || DEFAULT_OG_IMAGE;

    return {
      path: `/product/${p.handle}`,
      title,
      description: truncate(description, 160),
      ogImage,
      schema: [organizationSchema, productSchema(p)],
    };
  });
}

function buildBlogRoutes(posts) {
  return posts.map((post) => {
    const title = `${truncate(post.title, 55)} | ${SITE_NAME}`;
    const description = truncate(
      post.excerpt || `Read "${post.title}" on the Monday Morning blog. Stories and insights from the alcohol-free lifestyle movement.`,
      160
    );
    const ogImage = post.featured_image || DEFAULT_OG_IMAGE;

    return {
      path: `/blog/${post.slug}`,
      title,
      description,
      ogImage,
      schema: [organizationSchema, blogPostSchema(post)],
    };
  });
}

// ── Utilities ───────────────────────────────────────────────────────

function truncate(str, maxLen) {
  if (!str) return "";
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3).replace(/\s+\S*$/, "") + "...";
}

function escapeHTML(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function img(baseName, alt, extra = "") {
  const src = resolveAsset(baseName);
  if (!src) return "";
  return `<img src="${src}" alt="${escapeHTML(alt)}" loading="lazy" ${extra}/>`;
}

// ── HTML Generation ─────────────────────────────────────────────────

function generateHTML(route, templateHTML, allProducts, allBlogPosts) {
  const canonicalUrl = `${SITE_URL}${route.path === "/" ? "" : route.path}`;
  const ogImage = route.ogImage || DEFAULT_OG_IMAGE;

  const metaTags = `
    <title>${escapeHTML(route.title)}</title>
    <meta name="description" content="${escapeHTML(route.description)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    ${route.noIndex ? '<meta name="robots" content="noindex, nofollow" />' : ""}
    
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHTML(route.title)}" />
    <meta property="og:description" content="${escapeHTML(route.description)}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="en_US" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHTML(route.title)}" />
    <meta name="twitter:description" content="${escapeHTML(route.description)}" />
    <meta name="twitter:image" content="${ogImage}" />`;

  let jsonLd = "";
  if (route.schema && route.schema.length > 0) {
    for (const s of route.schema) {
      jsonLd += `\n    <script type="application/ld+json">${JSON.stringify(s)}</script>`;
    }
  }

  let html = templateHTML;

  // Remove existing tags
  html = html.replace(/<title>[^<]*<\/title>\s*/g, "");
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>\s*/g, "");
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>\s*/g, "");
  html = html.replace(/<meta\s+property="og:[^"]*"\s+content="[^"]*"\s*\/?>\s*/g, "");
  html = html.replace(/<meta\s+name="twitter:[^"]*"\s+content="[^"]*"\s*\/?>\s*/g, "");
  html = html.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>\s*/g, "");
  html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, "");

  // Insert new meta tags after <meta charset="UTF-8" />
  html = html.replace(
    /(<meta\s+charset="UTF-8"\s*\/?>)/,
    `$1\n${metaTags}\n${jsonLd}`
  );

  // ── Inject pre-rendered body content into <div id="root"> ──────
  const bodyContent = getBodyContent(route, allProducts, allBlogPosts);
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${bodyContent}</div>`
  );

  return html;
}

// ── Sitemap Generation ──────────────────────────────────────────────

function generateSitemap(allRoutes) {
  const now = new Date().toISOString();
  const indexableRoutes = allRoutes.filter((r) => !r.noIndex);

  function getPriority(path) {
    if (path === "/") return "1.0";
    if (["/shop", "/about", "/locations", "/recipes", "/blog", "/services"].includes(path)) return "0.9";
    if (path.startsWith("/collections/")) return "0.8";
    if (path.startsWith("/product/")) return "0.7";
    if (path.startsWith("/blog/")) return "0.6";
    return "0.5";
  }

  function getChangefreq(path) {
    if (path === "/" || path === "/shop" || path === "/blog") return "daily";
    if (path.startsWith("/collections/") || path.startsWith("/product/")) return "weekly";
    if (path.startsWith("/blog/")) return "monthly";
    return "weekly";
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const route of indexableRoutes) {
    const loc = `${SITE_URL}${route.path === "/" ? "" : route.path}`;
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${getChangefreq(route.path)}</changefreq>\n`;
    xml += `    <priority>${getPriority(route.path)}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  const templatePath = join(DIST, "index.html");

  if (!existsSync(templatePath)) {
    console.error("❌ dist/index.html not found. Run `vite build` first.");
    process.exit(1);
  }

  console.log("\n🔍 Fetching dynamic content for SEO pages...\n");

  const [products, blogPosts] = await Promise.all([
    fetchAllProducts(),
    fetchAllBlogPosts(),
  ]);

  const productRoutes = buildProductRoutes(products);
  const blogRoutes = buildBlogRoutes(blogPosts);
  const allRoutes = [...staticRoutes, ...productRoutes, ...blogRoutes];

  console.log(`\n📄 Generating ${allRoutes.length} static HTML pages with pre-rendered content...\n`);

  const templateHTML = readFileSync(templatePath, "utf-8");
  let count = 0;

  for (const route of allRoutes) {
    const html = generateHTML(route, templateHTML, products, blogPosts);

    if (route.path === "/") {
      writeFileSync(templatePath, html, "utf-8");
    } else {
      const dir = join(DIST, route.path);
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, "index.html"), html, "utf-8");
    }

    count++;
    const icon = route.path.startsWith("/product/")
      ? "🛒"
      : route.path.startsWith("/blog/")
      ? "📝"
      : route.path.startsWith("/collections/")
      ? "📂"
      : "✅";
    console.log(`  ${icon} ${route.path} → ${route.title.substring(0, 60)}...`);
  }

  // Generate 404.html
  const notFoundRoute = {
    path: "/404",
    title: "Page Not Found | Monday Morning Bottle Shop",
    description: "The page you are looking for does not exist. Browse our collection of 500+ non-alcoholic drinks at Monday Morning Bottle Shop.",
    noIndex: true,
    schema: [],
  };
  const notFoundHTML = generateHTML(notFoundRoute, templateHTML, products, blogPosts);
  writeFileSync(join(DIST, "404.html"), notFoundHTML, "utf-8");
  console.log(`\n  Generated 404.html (SPA fallback for unknown routes)`);

  // Generate sitemap
  const sitemap = generateSitemap(allRoutes);
  writeFileSync(join(DIST, "sitemap.xml"), sitemap, "utf-8");
  console.log(`\n🗺️  Generated sitemap.xml with ${allRoutes.filter((r) => !r.noIndex).length} URLs`);

  console.log(`\n🎉 Generated ${count} static HTML pages with unique meta tags AND pre-rendered body content.`);
  console.log(`   📦 ${productRoutes.length} product pages (with name, price, description, image)`);
  console.log(`   📝 ${blogRoutes.length} blog pages (with title, excerpt, featured image)`);
  console.log(`   📂 ${staticRoutes.filter((r) => r.path.startsWith("/collections/")).length} collection pages`);
  console.log(`   📄 ${staticRoutes.filter((r) => !r.path.startsWith("/collections/")).length} static pages`);
  console.log(`   🔍 All pages now have visible content for crawlers that don't execute JavaScript`);

  // ── Build Output API ─────────────────────────────────────────────
  const VERCEL_OUTPUT = join(process.cwd(), ".vercel", "output");
  const VERCEL_STATIC = join(VERCEL_OUTPUT, "static");

  console.log(`\n🏗️  Creating Vercel Build Output API structure...`);

  mkdirSync(VERCEL_STATIC, { recursive: true });
  cpSync(DIST, VERCEL_STATIC, { recursive: true });
  console.log(`  📁 Copied dist/ → .vercel/output/static/`);

  const vercelConfig = {
    version: 3,
    routes: [
      {
        src: "/assets/(.*)",
        headers: { "Cache-Control": "public, max-age=31536000, immutable" },
        continue: true,
      },
      { handle: "filesystem" },
      {
        src: "/(.*)",
        status: 404,
        dest: "/404.html",
      },
    ],
  };

  writeFileSync(
    join(VERCEL_OUTPUT, "config.json"),
    JSON.stringify(vercelConfig, null, 2),
    "utf-8"
  );
  console.log(`  ⚙️  Created .vercel/output/config.json (no SPA fallback)`);
  console.log(`\n✅ Build Output API structure ready for deployment.`);
}

main();
