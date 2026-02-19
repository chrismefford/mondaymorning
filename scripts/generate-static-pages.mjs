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

function generateNADrinksSanDiegoBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>Non-Alcoholic Drinks in San Diego</h1>
      ${img("beach-bonfire-beers", "Friends enjoying non-alcoholic drinks at a San Diego beach bonfire", 'width="1200" height="600" ')}
      <p>Monday Morning is San Diego's dedicated non-alcoholic bottle shop. We stock over 500 zero-proof beers, wines, spirits, and functional drinks. Walk into our Pacific Beach or Ocean Beach locations and try anything on the shelf before you buy. Prefer to shop from home? Our full catalog is available online with fast shipping.</p>
      <a href="/collections/all">Shop Online</a>
      <a href="/locations">Visit Our San Diego Locations</a>
    </section>
    <section>
      <h2>Why San Diego Is Choosing Non-Alcoholic Drinks</h2>
      <p>San Diego has always been a city that values health and quality of life. That mindset is driving a major shift in how people drink. More San Diegans are choosing non-alcoholic options without sacrificing flavor or social connection.</p>
      <p>The sober-curious movement is not a trend. It is a lifestyle change. People want to wake up clear, train harder, and still enjoy a great drink at dinner. Non-alcoholic drinks make that possible.</p>
      <p>Functional beverages are part of this shift. Adaptogens, nootropics, and botanical blends offer real benefits beyond hydration. Drinks that support focus, relaxation, or gut health are replacing alcohol for many San Diego professionals and athletes.</p>
      <p>Social drinking no longer requires alcohol. Whether you are at a beach bonfire in Pacific Beach or dinner in Ocean Beach, non-alcoholic drinks let you participate fully without the hangover.</p>
    </section>
    <section>
      <h2>Largest Selection of Non-Alcoholic Drinks in San Diego</h2>
      ${img("na-wine-cheers", "Non-alcoholic wine tasting in San Diego at Monday Morning Bottle Shop", 'width="600" height="500" ')}
      <p>No other store in San Diego comes close to our range. Over 500 products across every category. Here is what you will find:</p>
      <ul>
        <li><strong>Non-Alcoholic Beer</strong> — IPAs, lagers, stouts, sours, and wheat beers from Athletic Brewing, Bravus, Partake, and dozens more.</li>
        <li><strong>Non-Alcoholic Wine</strong> — Reds, whites, ros\u00e9s, and sparkling wines that deliver real complexity. No compromise on taste.</li>
        <li><strong>Non-Alcoholic Spirits</strong> — Gin, whiskey, tequila, and rum alternatives built for cocktails. Mix them exactly like the originals.</li>
        <li><strong>Ready-to-Drink Mocktails</strong> — Grab-and-go options for picnics, parties, and weeknight dinners. Open and enjoy.</li>
        <li><strong>Functional Beverages</strong> — Adaptogens, nootropics, CBD, and botanical blends. Drinks that do more than taste good.</li>
      </ul>
      <a href="/collections/all">Browse All 500+ Products</a>
    </section>
    <section>
      <h2>Visit Our San Diego Bottle Shop</h2>
      <h3>Pacific Beach</h3>
      <p><strong>Address:</strong> 1854 Garnet Ave, San Diego, CA 92109</p>
      <p><strong>Hours:</strong> Mon\u2013Sat: 11 AM \u2013 8 PM, Sun: 11 AM \u2013 4 PM</p>
      <h3>Ocean Beach</h3>
      <p><strong>Address:</strong> 4967 Newport Ave, San Diego, CA 92107</p>
      <p><strong>Hours:</strong> Mon\u2013Sun: 9 AM \u2013 6 PM, Wed: Open until 8 PM</p>
      <p>Both locations feature a full tasting bar. Walk in and sample anything before you commit. Our staff knows every product on the shelf and will match you with something you love.</p>
      <p>We built these shops for anyone who wants better options. Athletes looking for post-workout drinks. Parents who want something special after bedtime. Professionals who refuse to sacrifice their mornings. And anyone who is simply curious about what non-alcoholic drinks can taste like in 2026.</p>
      <p>No judgment. No pressure. Just great drinks and people who care about what they are drinking.</p>
      <a href="/locations">Get Directions</a>
    </section>
    <section>
      <h2>Frequently Asked Questions About Non-Alcoholic Drinks in San Diego</h2>
      <h3>Where can I buy non-alcoholic drinks in San Diego?</h3>
      <p>Monday Morning has two dedicated non-alcoholic bottle shops in San Diego. Visit us at 1854 Garnet Ave in Pacific Beach or 4967 Newport Ave in Ocean Beach. We carry over 500 zero-proof beers, wines, spirits, and functional drinks. You can also shop our full catalog online with shipping available.</p>
      <h3>Do non-alcoholic drinks contain alcohol?</h3>
      <p>Most non-alcoholic drinks contain less than 0.5% ABV, which is the legal threshold. Many of our products are completely 0.0% ABV. For reference, a ripe banana contains roughly the same amount of alcohol as a 0.5% drink. Our staff can help you find options that match your preferences.</p>
      <h3>What are the best non-alcoholic beers in San Diego?</h3>
      <p>We carry top-rated brands like Athletic Brewing, Bravus, Partake, and Best Day. Popular styles include IPAs, lagers, stouts, and wheat beers. Stop by our tasting bar to sample before you buy. Our staff stays current on every new release.</p>
      <h3>Do you offer tastings?</h3>
      <p>Yes. Both of our San Diego locations have a tasting bar. Walk in any time during business hours and sample anything on the shelf. No appointment needed. We rotate featured tastings weekly so there is always something new to try.</p>
      <h3>Can I order non-alcoholic drinks online?</h3>
      <p>Absolutely. Shop our full catalog at mondaymorning-af.com and get non-alcoholic drinks shipped directly to your door. We offer fast shipping across the US. Local San Diego customers can also arrange in-store pickup.</p>
    </section>
    <section>
      <h2>Ready to Explore?</h2>
      <p>San Diego's largest selection of non-alcoholic drinks is waiting. Shop online or stop by our Pacific Beach and Ocean Beach locations today.</p>
      <a href="/collections/all">Shop Online</a>
      <a href="/locations">Visit a Location</a>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateNABeerGuideBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>The Complete Guide to Non-Alcoholic Beer</h1>
      ${img("beach-bonfire-beers", "Non-alcoholic beer guide — friends enjoying craft NA beers at a San Diego beach bonfire", 'width="1200" height="600" ')}
      <p>Non-alcoholic beer has undergone a revolution. The best non-alcoholic beers in 2026 are full-bodied, complex, and crafted with the same care as their alcoholic counterparts. This guide covers every style, the top brands, how to choose the right one, and where to find the best selection in San Diego.</p>
      <a href="/collections/na-beer">Shop Non-Alcoholic Beer</a>
      <a href="/locations">Visit Our Tasting Bar</a>
    </section>
    <section>
      <h2>What Makes Non-Alcoholic Beer Great in 2026</h2>
      <p>The technology behind non-alcoholic beer has advanced dramatically. Modern dealcoholization preserves the hop character, malt backbone, and aromatic complexity that define great beer. Vacuum distillation, arrested fermentation, and reverse osmosis have all improved to the point where the best NA beers are genuinely indistinguishable from their alcoholic equivalents in blind tastings.</p>
      <p>Dedicated non-alcoholic breweries like Athletic Brewing, Bravus, and Mash Gang are not adapting existing recipes. They are building beers from the ground up for the non-alcoholic format, optimizing for flavor without alcohol rather than trying to subtract it.</p>
      <p>The result is a category that has earned its place. Non-alcoholic beer is not a compromise. It is a legitimate choice for anyone who loves beer flavor and wants it without the alcohol.</p>
    </section>
    <section>
      <h2>Non-Alcoholic Beer Styles Explained</h2>
      <h3>IPA (India Pale Ale)</h3>
      <p>The most popular NA beer style. Hop-forward, aromatic, and available in West Coast, hazy, and session variants. Athletic Brewing's Run Wild and Free Wave are category leaders.</p>
      <h3>Lager &amp; Pilsner</h3>
      <p>Clean, crisp, and universally approachable. The easiest entry point for anyone new to non-alcoholic beer. Perfect for hot days, barbecues, and casual drinking.</p>
      <h3>Stout &amp; Porter</h3>
      <p>Rich, roasty, and full-bodied. Non-alcoholic stouts deliver chocolate, coffee, and caramel notes. Best for cold evenings and slow sipping.</p>
      <h3>Wheat Beer</h3>
      <p>Light, slightly sweet, and often brewed with citrus or coriander. A refreshing style that works year-round and pairs well with lighter foods.</p>
      <h3>Sour &amp; Wild Ale</h3>
      <p>Tart, fruity, and complex. The most adventurous NA beer style. Sours offer a completely different drinking experience and are growing rapidly in popularity.</p>
    </section>
    <section>
      <h2>How to Choose the Right Non-Alcoholic Beer</h2>
      <p>Start with what you already know. If you drink IPAs, try a non-alcoholic IPA. If you prefer lagers, start there. Familiarity is the fastest path to finding something you love.</p>
      <p>Consider the occasion. For sports, barbecues, and casual afternoons, a crisp lager works best. For dinner and food pairing, a darker ale or a sour offers more complexity. For cold evenings and slow sipping, a stout or porter is the move.</p>
      <p>Pay attention to ABV. Most NA beers are 0.5% or under. If you need 0.0% exactly for medical, religious, or personal reasons, filter specifically for that.</p>
      <p>When in doubt, come taste. Both our San Diego locations have a full tasting bar. Sample before you commit.</p>
    </section>
    <section>
      <h2>Who Non-Alcoholic Beer Is Perfect For</h2>
      ${img("beach-bonfire", "Friends enjoying non-alcoholic beer at a beach bonfire in San Diego", 'width="600" height="480" ')}
      <ul>
        <li><strong>Athletes &amp; Active People</strong> — Hydration and recovery without alcohol's performance penalties.</li>
        <li><strong>Sober-Curious Drinkers</strong> — Explore the flavor experience of beer without the commitment to alcohol.</li>
        <li><strong>Pregnant Individuals</strong> — Enjoy a cold beer without worrying about alcohol content.</li>
        <li><strong>Designated Drivers</strong> — Never feel left out. Hold a great beer and enjoy the evening.</li>
        <li><strong>Anyone In Recovery</strong> — The ritual and flavor of beer without any risk of relapse.</li>
        <li><strong>Health-Conscious Drinkers</strong> — Fewer calories, no hangover, and real flavor. All upside.</li>
      </ul>
    </section>
    <section>
      <h2>Common Myths About Non-Alcoholic Beer</h2>
      <p><strong>Myth: Non-alcoholic beer tastes flat and watery.</strong> Modern craft NA beers are full-bodied, aromatic, and complex. The brewing technology has advanced dramatically in the last five years.</p>
      <p><strong>Myth: Non-alcoholic beer is only for people who can't drink.</strong> Most NA beer drinkers can drink alcohol. They choose not to for health, performance, or lifestyle reasons.</p>
      <p><strong>Myth: All NA beers are the same.</strong> The category spans hundreds of brands, dozens of styles, and wildly different flavor profiles. There is as much variety in NA beer as in regular craft beer.</p>
      <p><strong>Myth: Non-alcoholic beer is just for health fanatics.</strong> Non-alcoholic beer is for anyone who wants to drink something great. Athletes, parents, professionals, and casual drinkers all buy it for different reasons.</p>
    </section>
    <section>
      <h2>Non-Alcoholic Beer in San Diego</h2>
      <p>San Diego has one of the most active craft beer cultures in America. It also has one of the most health-conscious populations. Those two facts make it the perfect city for non-alcoholic beer to thrive.</p>
      <p>Monday Morning Bottle Shop in Pacific Beach and Ocean Beach carries the largest non-alcoholic beer selection in San Diego. Walk in, hit the tasting bar, and let our staff guide you to your next favorite beer.</p>
      <p>Whether you are heading to the beach, hosting a backyard gathering, or just want a cold beer after a long workout, we have the right non-alcoholic option for you.</p>
      <a href="/locations">Find Our Locations</a>
    </section>
    <section>
      <h2>Non-Alcoholic Beer: Frequently Asked Questions</h2>
      <h3>What is the best non-alcoholic beer?</h3>
      <p>The best non-alcoholic beer depends on your style preference. Athletic Brewing leads in IPAs and golden ales. Bravus excels in stouts and amber ales. Mash Gang and Untitled Art push boundaries with sours and experimental styles. The best way to find your favorite is to taste several.</p>
      <h3>Does non-alcoholic beer have alcohol?</h3>
      <p>Most non-alcoholic beers contain less than 0.5% ABV. Some are 0.0%. For reference, a ripe banana contains roughly the same amount of alcohol as a 0.5% NA beer.</p>
      <h3>Is non-alcoholic beer good for you?</h3>
      <p>Non-alcoholic beer has significantly fewer calories than regular beer and eliminates the negative health effects of alcohol. Some NA beers contain B vitamins, electrolytes, and polyphenols. It is a genuinely healthier choice.</p>
      <h3>Can you drink non-alcoholic beer while pregnant?</h3>
      <p>Many pregnant individuals choose 0.0% ABV beers. Consult your healthcare provider for personal guidance. We carry a wide selection of 0.0% options and always label them clearly.</p>
      <h3>How many calories are in non-alcoholic beer?</h3>
      <p>Most non-alcoholic beers range from 50 to 100 calories per can, compared to 150 to 250 for regular beer. The reduction comes primarily from the absence of alcohol, which is calorie-dense.</p>
      <h3>Where can I buy non-alcoholic beer in San Diego?</h3>
      <p>Monday Morning Bottle Shop has the largest selection in San Diego. Visit our Pacific Beach location at 1854 Garnet Ave or Ocean Beach at 4967 Newport Ave. Both locations have a tasting bar.</p>
      <h3>What non-alcoholic beer tastes most like real beer?</h3>
      <p>Athletic Brewing's Run Wild IPA and Free Wave Hazy IPA are consistently rated as the closest to their alcoholic counterparts. For lagers, Heineken 0.0 and Clausthaler are excellent. For stouts, Bravus Oatmeal Stout is outstanding.</p>
    </section>
    <section>
      <h2>Ready to Find Your Beer?</h2>
      <p>Shop our full non-alcoholic beer collection online or visit us in San Diego to taste before you buy.</p>
      <a href="/collections/na-beer">Shop Non-Alcoholic Beer</a>
      <a href="/locations">Visit a Location</a>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateBestNADrinksBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>The Best Non-Alcoholic Drinks</h1>
      ${img("rooftop-cheers", "Friends enjoying the best non-alcoholic drinks at a rooftop celebration", 'width="1200" height="600" ')}
      <p>The best non-alcoholic drinks have arrived. Across every category — beer, wine, spirits, and functional beverages — the quality in 2026 is extraordinary. This guide covers what to drink, why it matters, and how to find your perfect match.</p>
      <a href="/shop">Shop All Drinks</a>
      <a href="/collections/best-sellers">See Best Sellers</a>
    </section>
    <section>
      <h2>Why Non-Alcoholic Drinks Have Changed Everything</h2>
      <p>Five years ago, choosing a non-alcoholic drink at a bar or restaurant meant sparkling water or a sugary mocktail. That era is over. The non-alcoholic beverage industry has undergone a complete transformation, driven by consumer demand, investment in brewing technology, and a cultural shift in how people think about drinking.</p>
      <p>The sober-curious movement is not fringe. According to industry data, over 40% of adults now actively reduce their alcohol consumption. The reasons vary: health, fitness, mental clarity, pregnancy, recovery, religion, or simply preference. What unites them is the demand for great-tasting alternatives.</p>
      <p>Non-alcoholic beer, wine, spirits, and functional beverages have answered that demand. The best options today compete directly with their alcoholic counterparts on flavor, complexity, and experience. The only thing missing is the alcohol.</p>
      <p>At Monday Morning Bottle Shop, we carry over 500 non-alcoholic products across every category. This guide is designed to help you navigate the best of what the category has to offer.</p>
    </section>
    <section>
      <h2>Best Non-Alcoholic Drinks by Category</h2>
      <p>Every major drink category now has outstanding non-alcoholic options. Here is what to know about each one.</p>
      <h3>Non-Alcoholic Beer</h3>
      <p>The largest and most developed NA category. IPAs, lagers, stouts, sours, and wheat beers from dedicated craft breweries. Best for anyone who loves beer flavor and wants nothing to change except the ABV.</p>
      <a href="/collections/na-beer">Shop NA Beer</a>
      <h3>Non-Alcoholic Wine</h3>
      <p>Reds, whites, ros\u00e9s, and sparkling wines that deliver real complexity. Modern dealcoholization technology has closed the gap with alcoholic wine significantly. The best bottles pair beautifully with food.</p>
      <a href="/collections/wine-alternatives">Shop NA Wine</a>
      <h3>Non-Alcoholic Spirits</h3>
      <p>Gin, whiskey, tequila, rum, and aperitif alternatives. Built for cocktails. Use them exactly like the originals in any recipe. The most versatile NA category for home bartenders.</p>
      <a href="/collections/spirit-alternatives">Shop NA Spirits</a>
      <h3>Functional Beverages</h3>
      <p>Adaptogens, nootropics, CBD, kava, and botanical blends that do more than taste good. These drinks offer mood, focus, and relaxation benefits. The fastest-growing segment in the NA category.</p>
      <a href="/collections/functional">Shop Functional Drinks</a>
    </section>
    <section>
      <h2>Best Non-Alcoholic Drinks for Every Occasion</h2>
      ${img("upscale-bar-toast", "Best non-alcoholic drinks for dinner parties and celebrations at an upscale bar", 'width="600" height="500" ')}
      <h3>Dinner Parties &amp; Celebrations</h3>
      <p>Non-alcoholic sparkling wine or a crafted NA cocktail using zero-proof spirits. Sparkling NA wines in particular create the right visual and sensory experience for toasts and special moments.</p>
      <h3>Beach Days &amp; Outdoor Events</h3>
      <p>Canned non-alcoholic beer or ready-to-drink mocktails. Easy to transport, cold and refreshing, and they fit perfectly into any outdoor social setting.</p>
      <h3>Post-Workout Recovery</h3>
      <p>Non-alcoholic beer with electrolytes, or functional drinks with adaptogens. Athletic Brewing was built specifically for this use case. Many NA beers now contain added B vitamins and minerals.</p>
      <h3>Evening Wind-Down</h3>
      <p>Functional beverages with calming botanicals, kava, or ashwagandha. Kin Euphorics, Apl\u00f3s, and similar brands create drinks specifically designed to replicate the relaxing effect of an evening drink.</p>
      <h3>Home Cocktail Hour</h3>
      <p>Non-alcoholic spirits paired with quality mixers. A zero-proof gin and tonic, NA Negroni, or a mocktail Old Fashioned give you the full cocktail-making experience without the alcohol.</p>
    </section>
    <section>
      <h2>Finding the Best Non-Alcoholic Drink for Your Taste</h2>
      <ul>
        <li><strong>You like something crisp and refreshing</strong> — Non-alcoholic lager, pilsner, or sparkling water with botanicals.</li>
        <li><strong>You like something complex and aromatic</strong> — Non-alcoholic gin, an amaro alternative, or a botanical spirit.</li>
        <li><strong>You like something rich and satisfying</strong> — Non-alcoholic stout, porter, or a bold red wine alternative.</li>
        <li><strong>You like something sweet and fruity</strong> — Ready-to-drink NA cocktails, sparkling ros\u00e9, or tropical mocktails.</li>
        <li><strong>You want something that does something</strong> — Functional drinks with kava, adaptogens, or CBD for real effects.</li>
        <li><strong>You want something easy to bring to a party</strong> — Canned NA beers or RTD non-alcoholic cocktails.</li>
      </ul>
    </section>
    <section>
      <h2>Frequently Asked Questions</h2>
      <h3>What are the best non-alcoholic drinks in 2026?</h3>
      <p>The best non-alcoholic drinks in 2026 span every category. In beer, Athletic Brewing, Bravus, and Mash Gang lead the pack. For spirits, Lyre's, Monday Distillery, and Seedlip are the standards. Non-alcoholic wines from Leitz, Giesen, and Luminara have redefined what zero-proof wine can be.</p>
      <h3>What non-alcoholic drink tastes most like alcohol?</h3>
      <p>Non-alcoholic spirits come closest to the experience of drinking alcohol. Brands like Monday Distillery, Lyre's, and Ritual Zero Proof create gin, whiskey, rum, and tequila alternatives that replicate the botanical complexity and warmth of the originals.</p>
      <h3>What are the best non-alcoholic drinks for parties?</h3>
      <p>For parties, ready-to-drink mocktails and canned non-alcoholic options are the most practical. Sparkling non-alcoholic wines are great for toasts. Non-alcoholic beer handles casual gatherings well.</p>
      <h3>Are non-alcoholic drinks healthy?</h3>
      <p>Many non-alcoholic drinks offer genuine health benefits. Functional beverages contain adaptogens, nootropics, CBD, and botanicals that support sleep, focus, and stress management. Non-alcoholic beer and wine have significantly fewer calories than alcoholic versions.</p>
      <h3>What is the best non-alcoholic drink for someone who doesn't like sweet drinks?</h3>
      <p>For those who prefer dry or bitter flavors, non-alcoholic spirits are ideal. A non-alcoholic gin and tonic, a zero-proof Negroni, or a NA Old Fashioned all deliver complexity without sweetness.</p>
      <h3>What's the difference between non-alcoholic and alcohol-free drinks?</h3>
      <p>Legally in the US, both terms refer to beverages under 0.5% ABV. In practice, some brands use 'alcohol-free' to specifically indicate 0.0% ABV products.</p>
      <h3>Can I mix non-alcoholic spirits into cocktails?</h3>
      <p>Absolutely. Non-alcoholic spirits are designed for mixing. Use them exactly as you would regular spirits in any cocktail recipe.</p>
    </section>
    <section>
      <h2>Explore 500+ Non-Alcoholic Drinks</h2>
      ${img("sparkling-celebration", "Sparkling non-alcoholic drinks for celebrations at Monday Morning Bottle Shop", 'width="600" height="500" ')}
      <p>Shop our full catalog online or visit Monday Morning Bottle Shop in San Diego. Every category. Every style. Something for everyone.</p>
      <a href="/shop">Shop All Drinks</a>
      <a href="/collections/best-sellers">See Best Sellers</a>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateNewToNABody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>New to Non-Alcoholic Drinks?</h1>
      ${img("friends-beach-toast", "Friends discovering non-alcoholic drinks together at the beach", 'width="1200" height="600" ')}
      <p>New to non-alcoholic drinks and not sure where to start? You are in the right place. This guide covers everything a beginner needs to know: what to expect, what to try first, and how to find drinks you will actually love.</p>
      <a href="/collections/best-sellers">Start Your Journey</a>
      <a href="/shop">Browse All Options</a>
    </section>
    <section>
      <h2>Why People Are Making the Switch</h2>
      <p>Most people arrive at non-alcoholic drinks from different directions. Some want to cut alcohol for health reasons. Others are pregnant, in recovery, or training seriously. Many are simply sober-curious, interested in what life with less alcohol looks and feels like without a full commitment to sobriety.</p>
      <p>Whatever brought you here, the good news is the same: the quality of non-alcoholic drinks in 2026 is extraordinary. You are not giving something up. You are gaining a new category of genuinely excellent drinks.</p>
      <p>The sober-curious movement has reshaped the entire beverage industry. Major breweries, spirit brands, and new dedicated NA companies have all invested heavily in this space. The result is a market full of options that meet you wherever you are.</p>
    </section>
    <section>
      <h2>What to Expect When You Start</h2>
      <p>Honest expectations make the transition easier. Here is what you need to know going in.</p>
      <h3>The first sip might surprise you</h3>
      <p>Non-alcoholic drinks often taste different from what you expect, sometimes better. Many people assume NA beer will be flat and thin. A great craft NA IPA tends to change that assumption immediately.</p>
      <h3>You will not feel the same</h3>
      <p>You will not feel alcohol's effects. That is the point. What you will feel depends on what you drink: refreshed, satisfied, and present.</p>
      <h3>Some categories are better than others</h3>
      <p>Non-alcoholic beer is the most advanced category. Wine is catching up fast. Spirits are very good in cocktails. Try a few before committing to a category.</p>
      <h3>Quality varies significantly by brand</h3>
      <p>Not all non-alcoholic drinks are created equal. The gap between a budget NA beer and a craft NA beer is noticeable. Start with well-reviewed brands.</p>
      <h3>Social situations work fine</h3>
      <p>A non-alcoholic beer looks like a beer. A sparkling wine in a glass looks like wine. You will rarely need to explain yourself.</p>
      <h3>Your tastes will evolve</h3>
      <p>Most people start with familiar styles and gradually explore more adventurous options. There is a lot to discover.</p>
    </section>
    <section>
      <h2>Where to Start: New to Non-Alcoholic Drinks</h2>
      <p>Match your current drinking preferences to the best non-alcoholic starting point.</p>
      <h3>The Beer Starter</h3>
      <p>A crisp non-alcoholic lager or pilsner. Familiar, refreshing, and instantly satisfying. A great first step for any beer drinker.</p>
      <a href="/collections/na-beer">Shop NA Beer</a>
      <h3>The Wine Starter</h3>
      <p>A non-alcoholic sparkling white or ros\u00e9. Beautiful in a glass, great for dinner, and immediately recognizable as a wine experience.</p>
      <a href="/collections/wine-alternatives">Shop NA Wine</a>
      <h3>The Cocktail Starter</h3>
      <p>A non-alcoholic gin or tequila alternative. Mix it exactly like the original spirit. Make a gin and tonic, a margarita, or whatever you love.</p>
      <a href="/collections/spirit-alternatives">Shop NA Spirits</a>
      <h3>The Functional Starter</h3>
      <p>A botanical or adaptogen drink that offers a real effect. If you drink to unwind, these are built to deliver that same feeling through different chemistry.</p>
      <a href="/collections/functional">Shop Functional</a>
    </section>
    <section>
      <h2>Types of Non-Alcoholic Drinks Explained</h2>
      <ul>
        <li><strong>Non-Alcoholic Beer</strong> — Brewed like regular beer, then dealcoholized. Every style exists: lagers, IPAs, stouts, sours, wheat beers. The most approachable and widely available category.</li>
        <li><strong>Non-Alcoholic Wine</strong> — Produced from real grapes, then dealcoholized through vacuum distillation. Reds, whites, ros\u00e9s, and sparkling wines.</li>
        <li><strong>Non-Alcoholic Spirits</strong> — Botanical distillates designed to replicate gin, whiskey, rum, tequila, and more. Built for cocktails.</li>
        <li><strong>Functional Beverages</strong> — Drinks that go beyond hydration. Adaptogens for stress, nootropics for focus, kava for relaxation, CBD for calm. The most innovative and fastest-growing segment.</li>
      </ul>
    </section>
    <section>
      <h2>Start with a Tasting in San Diego</h2>
      ${img("morning-patio-couple", "Couple enjoying non-alcoholic morning drinks on a patio in San Diego", 'width="600" height="480" ')}
      <p>The easiest way to start is to taste. At both of our San Diego locations, we have a full tasting bar where you can sample before you commit to anything. Walk in, tell us where you are in your non-alcoholic journey, and we will guide you.</p>
      <p>No pressure. No judgment. No need to justify your reasons. Everyone walks out with something they love.</p>
      <p>If you prefer to start online, our catalog is fully available with detailed product descriptions to help you choose. Every product we stock has been personally tasted and approved by our team.</p>
      <a href="/locations">Find Our Locations</a>
    </section>
    <section>
      <h2>Beginner Questions Answered</h2>
      <h3>Where do I even start with non-alcoholic drinks?</h3>
      <p>Start with what you already like. If you drink beer, try a non-alcoholic IPA or lager. If you prefer wine, start with a non-alcoholic sparkling wine. If you like cocktails, pick up a non-alcoholic spirit and mix it the same way.</p>
      <h3>Do non-alcoholic drinks actually taste good?</h3>
      <p>Yes. The quality has improved dramatically. The best non-alcoholic beers, wines, and spirits are genuinely excellent drinks that compete with alcoholic options on flavor, aroma, and complexity.</p>
      <h3>Will I feel anything drinking non-alcoholic drinks?</h3>
      <p>You will not feel the effects of alcohol. However, functional non-alcoholic beverages are designed to provide a real effect through adaptogens, kava, nootropics, or CBD.</p>
      <h3>How do I explain it at social events?</h3>
      <p>You do not need to explain anything. A great non-alcoholic beer in your hand looks identical to a regular beer. If someone asks, 'non-alcoholic' is a complete sentence.</p>
      <h3>What should I buy first?</h3>
      <p>For first-timers: start with a non-alcoholic lager or pilsner if you like beer, a sparkling non-alcoholic wine if you prefer wine, or a starter non-alcoholic spirit if you enjoy cocktails.</p>
      <h3>Is non-alcoholic the same as alcohol-free?</h3>
      <p>In the US, both terms apply to beverages under 0.5% ABV. 'Alcohol-free' sometimes specifically indicates 0.0% ABV products.</p>
      <h3>Can I drink non-alcoholic drinks every day?</h3>
      <p>Yes. Unlike alcoholic beverages, non-alcoholic drinks carry none of the health risks associated with regular drinking.</p>
      <h3>How much do non-alcoholic drinks cost compared to regular drinks?</h3>
      <p>Premium non-alcoholic drinks are priced comparably to their alcoholic equivalents. A great NA craft beer costs about what a craft beer costs. Non-alcoholic spirits range from $25 to $50 for a bottle.</p>
    </section>
    <section>
      <h2>Ready to Take the First Sip?</h2>
      <p>Shop our best-seller picks for beginners or visit us in San Diego and let our team guide your first tasting.</p>
      <a href="/collections/best-sellers">Start with Best Sellers</a>
      <a href="/locations">Visit a Location</a>
    </section>
  </main>
  ${generateFooterHTML()}`;
}

function generateAlcoholFreeLifestyleBody() {
  return `<header>${generateNavHTML()}</header>
  <main>
    <section>
      <h1>Alcohol-Free Lifestyle Benefits</h1>
      ${img("wellness-retreat-drinks", "Wellness-focused alcohol-free lifestyle with botanical drinks", 'width="1200" height="600" ')}
      <p>The alcohol-free lifestyle is one of the most impactful changes a person can make. Better sleep, sharper focus, improved physical performance, and a richer social life — all without giving up the ritual of a great drink. This is what the sober-curious movement has unlocked.</p>
      <a href="/collections/functional">Explore Zero Proof Drinks</a>
      <a href="/shop">Shop All Categories</a>
    </section>
    <section>
      <h2>The Sober-Curious Movement in 2026</h2>
      <p>The sober-curious movement is not about abstinence ideology. It is about intentionality. It is about questioning whether alcohol is serving you — your health, your mornings, your relationships, your performance — and having the freedom to choose differently.</p>
      <p>In 2026, the culture around alcohol has shifted. Major research has surfaced showing there is no safe level of alcohol consumption. Athletes at the highest levels are publicly alcohol-free. Social circles that once built everything around drinking are adapting to include everyone. The stigma around not drinking has largely evaporated.</p>
      <p>What has replaced it is a genuine appreciation for the alcohol-free lifestyle — not as a compromise, but as an upgrade. The people living it are not giving something up. They are getting more back than they expected.</p>
      <p>Non-alcoholic drinks are the bridge. They preserve the ritual, the flavor, and the social experience of drinking while eliminating the downsides entirely. At Monday Morning, we exist to make that bridge as good as possible.</p>
    </section>
    <section>
      <h2>Health Benefits of Going Alcohol-Free</h2>
      <p>The evidence is clear. Reducing or eliminating alcohol improves multiple dimensions of health simultaneously.</p>
      <h3>Sleep</h3>
      <p>Alcohol disrupts REM sleep. Without it, most people experience deeper, more restorative sleep within days.</p>
      <h3>Mental Clarity</h3>
      <p>Alcohol impairs cognition long after the effects wear off. Removing it sharpens focus, memory, and decision-making.</p>
      <h3>Physical Performance</h3>
      <p>Alcohol impairs protein synthesis and recovery. Athletes and active people see immediate performance gains.</p>
      <h3>Skin &amp; Appearance</h3>
      <p>Alcohol dehydrates and causes inflammation. Most people see visible skin improvement within three to four weeks.</p>
      <h3>Mood &amp; Mental Health</h3>
      <p>Alcohol is a depressant. Many people find their baseline mood improves significantly after reducing or eliminating it.</p>
      <h3>Weight &amp; Metabolism</h3>
      <p>Alcohol calories are empty and numerous. Eliminating them, without changing anything else, often leads to weight loss.</p>
    </section>
    <section>
      <h2>The Social Benefits of the Alcohol-Free Lifestyle</h2>
      <p>The most common concern about going alcohol-free is social. What do you do at parties? At dinners? At celebrations? The answer is the same thing everyone else is doing — just without the impairment.</p>
      <p>Non-alcoholic drinks have eliminated the visual distinction. A great non-alcoholic beer in your hand looks identical to a regular beer. A sparkling NA wine in a glass is indistinguishable at a toast. The social ritual is preserved completely.</p>
      <p>What changes is how you feel the next morning. And how you feel at 10 PM when the conversation is still good. And how you perform at 6 AM when you have not disrupted your sleep. The social experience stays. The downsides disappear.</p>
    </section>
    <section>
      <h2>Who the Alcohol-Free Lifestyle Is Perfect For</h2>
      ${img("functional-wellness-morning", "Functional wellness drinks as part of an alcohol-free morning routine", 'width="600" height="500" ')}
      <ul>
        <li><strong>Athletes &amp; Performance-Focused People</strong> — Alcohol impairs recovery, sleep, and performance. Going alcohol-free is one of the highest-leverage health decisions an active person can make.</li>
        <li><strong>Anyone Prioritizing Mental Health</strong> — Alcohol is a depressant. Many people with anxiety, depression, or mood issues find significant improvement when alcohol is removed.</li>
        <li><strong>The Sober-Curious</strong> — You do not need a reason beyond curiosity. Exploring life without alcohol is always worthwhile.</li>
        <li><strong>Parents &amp; Caregivers</strong> — Clarity, presence, and consistent energy are invaluable when you are responsible for others.</li>
        <li><strong>Professionals Who Need to Perform</strong> — Alcohol costs you mornings. Removing it gives them back, along with sharper thinking and better decision-making.</li>
        <li><strong>Anyone in Recovery</strong> — High-quality non-alcoholic drinks make social situations entirely manageable without compromise.</li>
      </ul>
    </section>
    <section>
      <h2>How to Start an Alcohol-Free Lifestyle</h2>
      <p>You do not need a dramatic announcement or a formal commitment. The most effective approach is simply to start replacing. The next time you reach for an alcoholic drink, reach for a non-alcoholic one instead. Do it for a week. Notice what changes.</p>
      <h3>Step 1: Pick a starting point</h3>
      <p>Choose one occasion or habit where you will swap alcohol for a non-alcoholic alternative.</p>
      <h3>Step 2: Stock good options</h3>
      <p>Having quality non-alcoholic drinks in your fridge makes the swap effortless. Start with what you already like.</p>
      <h3>Step 3: Let results speak</h3>
      <p>Notice your sleep, your mornings, your mood. The benefits create their own momentum.</p>
      <p>Monday Morning carries over 500 non-alcoholic drinks across every category. Whatever your starting point, we have something that will make the transition feel less like sacrifice and more like discovery.</p>
      <a href="/shop">Start Shopping</a>
      <a href="/recipes">Explore Recipes</a>
    </section>
    <section>
      <h2>Alcohol-Free Lifestyle: Frequently Asked Questions</h2>
      <h3>What are the health benefits of an alcohol-free lifestyle?</h3>
      <p>Eliminating or significantly reducing alcohol leads to measurable improvements across multiple areas: better sleep quality, improved liver function, clearer skin, reduced anxiety and depression, sharper mental focus, better physical performance, and lower risk of multiple cancers.</p>
      <h3>Is the sober-curious movement the same as sobriety?</h3>
      <p>No. Sober-curious describes a deliberate, investigative approach to alcohol — questioning your relationship with it without committing to complete abstinence. Many sober-curious people still drink occasionally but have significantly reduced their consumption.</p>
      <h3>How quickly will I see benefits from reducing alcohol?</h3>
      <p>Many people notice improved sleep within the first week. Skin changes are often visible within two to four weeks. Mental clarity and energy improvements typically appear within the first month.</p>
      <h3>Will I miss alcohol at social events?</h3>
      <p>Most people are surprised by how little they miss alcohol when they have great alternatives in hand. The ritual of holding a drink, sipping something complex, and participating in a toast is entirely preserved with non-alcoholic options.</p>
      <h3>What do I drink instead of alcohol?</h3>
      <p>The best alcohol-free alternatives depend on what you love about drinking. If you love the flavor of beer, non-alcoholic craft beer is the answer. If you prefer cocktails, non-alcoholic spirits mixed the same way deliver a nearly identical experience.</p>
      <h3>Can I maintain an alcohol-free lifestyle and still have a social life?</h3>
      <p>Absolutely. The social dimension of drinking is about presence, ritual, and shared experience — none of which require alcohol.</p>
      <h3>What are the best functional drinks for replacing alcohol's relaxing effect?</h3>
      <p>Kava-based drinks, ashwagandha formulations, and drinks containing L-theanine or calming adaptogens are the closest functional replacements for alcohol's relaxing effect. Brands like Kin Euphorics, Apl\u00f3s, and Daytrip are specifically designed for this use case.</p>
      <h3>Is it realistic to go alcohol-free long-term?</h3>
      <p>Yes, and an increasing number of people are doing it permanently. The availability of high-quality non-alcoholic alternatives has made long-term alcohol-free living genuinely enjoyable rather than a sacrifice.</p>
    </section>
    <section>
      <h2>Your Alcohol-Free Journey Starts Here</h2>
      ${img("garden-party-toast", "Garden party toast with non-alcoholic drinks celebrating the alcohol-free lifestyle", 'width="600" height="500" ')}
      <p>Explore 500+ non-alcoholic drinks that make the alcohol-free lifestyle easy, enjoyable, and genuinely satisfying.</p>
      <a href="/shop">Shop All Drinks</a>
      <a href="/blog">Read Our Blog</a>
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
  if (path === "/non-alcoholic-drinks-san-diego") return generateNADrinksSanDiegoBody();
  if (path === "/non-alcoholic-beer-guide") return generateNABeerGuideBody();
  if (path === "/best-non-alcoholic-drinks") return generateBestNADrinksBody();
  if (path === "/new-to-non-alcoholic-drinks") return generateNewToNABody();
  if (path === "/alcohol-free-lifestyle-benefits") return generateAlcoholFreeLifestyleBody();

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
  {
    path: "/non-alcoholic-drinks-san-diego",
    title: "Non-Alcoholic Drinks San Diego | 500+ Zero Proof Options",
    description: "San Diego's largest non-alcoholic bottle shop. 500+ zero-proof beers, wines, spirits and functional drinks. Visit our Pacific Beach and Ocean Beach locations or shop online.",
    schema: [
      organizationSchema,
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Where can I buy non-alcoholic drinks in San Diego?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Monday Morning has two dedicated non-alcoholic bottle shops in San Diego. Visit us at 1854 Garnet Ave in Pacific Beach or 4967 Newport Ave in Ocean Beach. We carry over 500 zero-proof beers, wines, spirits, and functional drinks. You can also shop our full catalog online with shipping available.",
            },
          },
          {
            "@type": "Question",
            name: "Do non-alcoholic drinks contain alcohol?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most non-alcoholic drinks contain less than 0.5% ABV, which is the legal threshold. Many of our products are completely 0.0% ABV. For reference, a ripe banana contains roughly the same amount of alcohol as a 0.5% drink.",
            },
          },
          {
            "@type": "Question",
            name: "What are the best non-alcoholic beers in San Diego?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We carry top-rated brands like Athletic Brewing, Bravus, Partake, and Best Day. Popular styles include IPAs, lagers, stouts, and wheat beers. Stop by our tasting bar to sample before you buy.",
            },
          },
          {
            "@type": "Question",
            name: "Do you offer tastings?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Both of our San Diego locations have a tasting bar. Walk in any time during business hours and sample anything on the shelf. No appointment needed.",
            },
          },
          {
            "@type": "Question",
            name: "Can I order non-alcoholic drinks online?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely. Shop our full catalog at mondaymorning-af.com and get non-alcoholic drinks shipped directly to your door. We offer fast shipping across the US. Local San Diego customers can also arrange in-store pickup.",
            },
          },
        ],
      },
    ],
  },

  // SEO Landing Pages
  {
    path: "/non-alcoholic-beer-guide",
    title: "Non-Alcoholic Beer Guide 2026 | Styles, Brands & How to Choose",
    description: "The complete guide to non-alcoholic beer in 2026. Every style explained, top brands reviewed, and how to choose the right NA beer. Visit Monday Morning in San Diego to taste before you buy.",
    schema: [
      organizationSchema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What is the best non-alcoholic beer?", acceptedAnswer: { "@type": "Answer", text: "The best non-alcoholic beer depends on your style preference. Athletic Brewing leads in IPAs and golden ales. Bravus excels in stouts and amber ales. Mash Gang and Untitled Art push boundaries with sours and experimental styles." } },
          { "@type": "Question", name: "Does non-alcoholic beer have alcohol?", acceptedAnswer: { "@type": "Answer", text: "Most non-alcoholic beers contain less than 0.5% ABV. Some are 0.0%. For reference, a ripe banana contains roughly the same amount of alcohol as a 0.5% NA beer." } },
          { "@type": "Question", name: "Is non-alcoholic beer good for you?", acceptedAnswer: { "@type": "Answer", text: "Non-alcoholic beer has significantly fewer calories than regular beer and eliminates the negative health effects of alcohol. Some NA beers contain B vitamins, electrolytes, and polyphenols." } },
          { "@type": "Question", name: "Can you drink non-alcoholic beer while pregnant?", acceptedAnswer: { "@type": "Answer", text: "Many pregnant individuals choose 0.0% ABV beers. Consult your healthcare provider for personal guidance. We carry a wide selection of 0.0% options." } },
          { "@type": "Question", name: "How many calories are in non-alcoholic beer?", acceptedAnswer: { "@type": "Answer", text: "Most non-alcoholic beers range from 50 to 100 calories per can, compared to 150 to 250 for regular beer." } },
          { "@type": "Question", name: "Where can I buy non-alcoholic beer in San Diego?", acceptedAnswer: { "@type": "Answer", text: "Monday Morning Bottle Shop has the largest selection in San Diego. Visit our Pacific Beach location at 1854 Garnet Ave or Ocean Beach at 4967 Newport Ave. Both locations have a tasting bar." } },
          { "@type": "Question", name: "What non-alcoholic beer tastes most like real beer?", acceptedAnswer: { "@type": "Answer", text: "Athletic Brewing's Run Wild IPA and Free Wave Hazy IPA are consistently rated as the closest to their alcoholic counterparts. For lagers, Heineken 0.0 and Clausthaler are excellent. For stouts, Bravus Oatmeal Stout is outstanding." } },
        ],
      },
    ],
  },
  {
    path: "/best-non-alcoholic-drinks",
    title: "Best Non-Alcoholic Drinks in 2026 | Complete Category Guide",
    description: "Discover the best non-alcoholic drinks across every category — beer, wine, spirits, and functional beverages. Expert picks, occasion guides, and 500+ options at Monday Morning.",
    schema: [
      organizationSchema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What are the best non-alcoholic drinks in 2026?", acceptedAnswer: { "@type": "Answer", text: "The best non-alcoholic drinks in 2026 span every category. In beer, Athletic Brewing, Bravus, and Mash Gang lead. For spirits, Lyre's, Monday Distillery, and Seedlip are the standards. Non-alcoholic wines from Leitz, Giesen, and Luminara have redefined what zero-proof wine can be." } },
          { "@type": "Question", name: "What non-alcoholic drink tastes most like alcohol?", acceptedAnswer: { "@type": "Answer", text: "Non-alcoholic spirits come closest. Brands like Monday Distillery, Lyre's, and Ritual Zero Proof create gin, whiskey, rum, and tequila alternatives that replicate the botanical complexity and warmth of the originals." } },
          { "@type": "Question", name: "What are the best non-alcoholic drinks for parties?", acceptedAnswer: { "@type": "Answer", text: "Ready-to-drink mocktails and canned non-alcoholic options are the most practical for parties. Sparkling non-alcoholic wines are great for toasts." } },
          { "@type": "Question", name: "Are non-alcoholic drinks healthy?", acceptedAnswer: { "@type": "Answer", text: "Many non-alcoholic drinks offer genuine health benefits. Functional beverages contain adaptogens, nootropics, CBD, and botanicals. Non-alcoholic beer and wine have significantly fewer calories than alcoholic versions." } },
          { "@type": "Question", name: "What is the best non-alcoholic drink for someone who doesn't like sweet drinks?", acceptedAnswer: { "@type": "Answer", text: "For dry or bitter flavors, non-alcoholic spirits are ideal. A non-alcoholic gin and tonic, a zero-proof Negroni, or a NA Old Fashioned all deliver complexity without sweetness." } },
          { "@type": "Question", name: "What's the difference between non-alcoholic and alcohol-free drinks?", acceptedAnswer: { "@type": "Answer", text: "Legally in the US, both terms refer to beverages under 0.5% ABV. In practice, some brands use 'alcohol-free' to specifically indicate 0.0% ABV products." } },
          { "@type": "Question", name: "Can I mix non-alcoholic spirits into cocktails?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. Non-alcoholic spirits are designed for mixing. Use them exactly as you would regular spirits in any cocktail recipe." } },
        ],
      },
    ],
  },
  {
    path: "/new-to-non-alcoholic-drinks",
    title: "New to Non-Alcoholic Drinks? Start Here | Beginner's Guide",
    description: "Just getting into non-alcoholic drinks? This beginner's guide covers what to expect, what to try first, and how to find drinks you'll love. Visit Monday Morning in San Diego.",
    schema: [
      organizationSchema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Where do I even start with non-alcoholic drinks?", acceptedAnswer: { "@type": "Answer", text: "Start with what you already like. If you drink beer, try a non-alcoholic IPA or lager. If you prefer wine, start with a non-alcoholic sparkling wine. If you like cocktails, pick up a non-alcoholic spirit and mix it the same way." } },
          { "@type": "Question", name: "Do non-alcoholic drinks actually taste good?", acceptedAnswer: { "@type": "Answer", text: "Yes. The quality has improved dramatically. The best non-alcoholic beers, wines, and spirits are genuinely excellent drinks that compete with alcoholic options on flavor, aroma, and complexity." } },
          { "@type": "Question", name: "Will I feel anything drinking non-alcoholic drinks?", acceptedAnswer: { "@type": "Answer", text: "You will not feel the effects of alcohol. However, functional non-alcoholic beverages are designed to provide a real effect through adaptogens, kava, nootropics, or CBD." } },
          { "@type": "Question", name: "How do I explain it at social events?", acceptedAnswer: { "@type": "Answer", text: "You do not need to explain anything. A great non-alcoholic beer in your hand looks identical to a regular beer. If someone asks, 'non-alcoholic' is a complete sentence." } },
          { "@type": "Question", name: "What should I buy first?", acceptedAnswer: { "@type": "Answer", text: "For first-timers: start with a non-alcoholic lager or pilsner if you like beer, a sparkling non-alcoholic wine if you prefer wine, or a starter non-alcoholic spirit if you enjoy cocktails." } },
          { "@type": "Question", name: "Is non-alcoholic the same as alcohol-free?", acceptedAnswer: { "@type": "Answer", text: "In the US, both terms apply to beverages under 0.5% ABV. 'Alcohol-free' sometimes specifically indicates 0.0% ABV products." } },
          { "@type": "Question", name: "Can I drink non-alcoholic drinks every day?", acceptedAnswer: { "@type": "Answer", text: "Yes. Unlike alcoholic beverages, non-alcoholic drinks carry none of the health risks associated with regular drinking." } },
          { "@type": "Question", name: "How much do non-alcoholic drinks cost compared to regular drinks?", acceptedAnswer: { "@type": "Answer", text: "Premium non-alcoholic drinks are priced comparably to their alcoholic equivalents. A great NA craft beer costs about what a craft beer costs. Non-alcoholic spirits range from $25 to $50 for a bottle." } },
        ],
      },
    ],
  },
  {
    path: "/alcohol-free-lifestyle-benefits",
    title: "Alcohol-Free Lifestyle Benefits | Health, Clarity & Balance",
    description: "Discover the real benefits of an alcohol-free lifestyle in 2026. Better sleep, sharper focus, improved fitness, and a richer social life. Start your journey at Monday Morning.",
    schema: [
      organizationSchema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What are the health benefits of an alcohol-free lifestyle?", acceptedAnswer: { "@type": "Answer", text: "Eliminating or significantly reducing alcohol leads to better sleep quality, improved liver function, clearer skin, reduced anxiety, sharper mental focus, better physical performance, and lower risk of multiple cancers." } },
          { "@type": "Question", name: "Is the sober-curious movement the same as sobriety?", acceptedAnswer: { "@type": "Answer", text: "No. Sober-curious describes a deliberate, investigative approach to alcohol — questioning your relationship with it without committing to complete abstinence." } },
          { "@type": "Question", name: "How quickly will I see benefits from reducing alcohol?", acceptedAnswer: { "@type": "Answer", text: "Many people notice improved sleep within the first week. Skin changes are often visible within two to four weeks. Mental clarity and energy improvements typically appear within the first month." } },
          { "@type": "Question", name: "Will I miss alcohol at social events?", acceptedAnswer: { "@type": "Answer", text: "Most people are surprised by how little they miss alcohol when they have great alternatives in hand. The ritual of holding a drink and participating in a toast is entirely preserved with non-alcoholic options." } },
          { "@type": "Question", name: "What do I drink instead of alcohol?", acceptedAnswer: { "@type": "Answer", text: "The best alcohol-free alternatives depend on what you love about drinking. Non-alcoholic craft beer, wine, spirits mixed the same way, and functional beverages all deliver excellent experiences." } },
          { "@type": "Question", name: "Can I maintain an alcohol-free lifestyle and still have a social life?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. The social dimension of drinking is about presence, ritual, and shared experience — none of which require alcohol." } },
          { "@type": "Question", name: "What are the best functional drinks for replacing alcohol's relaxing effect?", acceptedAnswer: { "@type": "Answer", text: "Kava-based drinks, ashwagandha formulations, and drinks containing L-theanine or calming adaptogens are the closest functional replacements. Brands like Kin Euphorics, Aplos, and Daytrip are specifically designed for this use case." } },
          { "@type": "Question", name: "Is it realistic to go alcohol-free long-term?", acceptedAnswer: { "@type": "Answer", text: "Yes. The availability of high-quality non-alcoholic alternatives has made long-term alcohol-free living genuinely enjoyable rather than a sacrifice." } },
        ],
      },
    ],
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
