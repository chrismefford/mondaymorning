/**
 * Post-build script: Generates static HTML files for every route
 * with unique <title>, <meta description>, <link canonical>, OG tags,
 * and JSON-LD structured data baked into the raw HTML.
 *
 * Dynamically fetches all products from Shopify and blog posts from
 * Supabase so every page gets proper SEO tags for crawlers.
 *
 * Usage: node scripts/generate-static-pages.mjs
 * Runs automatically after `vite build` via the build command.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const DIST = join(process.cwd(), "dist");
const SITE_NAME = "Monday Morning Bottle Shop";
const SITE_URL = "https://mondaymorning-af.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

// ── Environment ─────────────────────────────────────────────────────
// Vite exposes VITE_ vars during build; for the post-build Node script
// we read them from .env or process.env (Vercel sets them automatically).

function loadEnv() {
  // Try reading .env file
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

      // Check for pagination info
      hasNextPage = data.pageInfo?.hasNextPage || false;
      if (hasNextPage && products.length > 0) {
        // Use the cursor from pageInfo or derive from last product
        cursor = data.pageInfo?.endCursor || data.endCursor || null;
        if (!cursor) {
          // Fallback: if no cursor in response, stop paginating
          hasNextPage = false;
        }
      } else {
        hasNextPage = false;
      }

      console.log(`  📦 Page ${page}: fetched ${products.length} products (total so far: ${allProducts.length})`);
      page++;

      // Safety: prevent infinite loops
      if (page > 20) {
        console.warn("⚠️  Reached max pagination limit (20 pages / ~5000 products)");
        break;
      }
    }

    // Filter to active products (at least one variant available)
    const activeProducts = allProducts.filter((p) =>
      p.variants?.edges?.some((e) => e.node.availableForSale)
    );
    console.log(`  📦 Total: ${allProducts.length} products fetched, ${activeProducts.length} active (in stock)`);
    return activeProducts;
  } catch (err) {
    console.warn(`⚠️  Failed to fetch products: ${err.message}`);
    // Return whatever we've collected so far
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

// ── Static Route Definitions ────────────────────────────────────────

const staticRoutes = [
  // Main pages
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
    description: "Visit Monday Morning's NA bottle shops in Pacific Beach & Ocean Beach, San Diego. Try 500+ non-alcoholic drinks before you buy. Plus find us at 17+ partner bars and restaurants.",
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

  // Shopify-mapped collection pages
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

  // Vibe-based collection pages
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
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── HTML Generation ─────────────────────────────────────────────────

function generateHTML(route, templateHTML) {
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
  // Remove existing JSON-LD scripts
  html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, "");

  // Insert new meta tags after <meta charset="UTF-8" />
  html = html.replace(
    /(<meta\s+charset="UTF-8"\s*\/?>)/,
    `$1\n${metaTags}\n${jsonLd}`
  );

  return html;
}

// ── Sitemap Generation ──────────────────────────────────────────────

function generateSitemap(allRoutes) {
  const now = new Date().toISOString();
  const indexableRoutes = allRoutes.filter((r) => !r.noIndex);

  // Priority mapping
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

  // Fetch dynamic data in parallel
  const [products, blogPosts] = await Promise.all([
    fetchAllProducts(),
    fetchAllBlogPosts(),
  ]);

  // Build all routes
  const productRoutes = buildProductRoutes(products);
  const blogRoutes = buildBlogRoutes(blogPosts);
  const allRoutes = [...staticRoutes, ...productRoutes, ...blogRoutes];

  console.log(`\n📄 Generating ${allRoutes.length} static HTML pages...\n`);

  const templateHTML = readFileSync(templatePath, "utf-8");
  let count = 0;

  for (const route of allRoutes) {
    const html = generateHTML(route, templateHTML);

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

  // Generate 404.html as SPA fallback for unknown routes
  // Vercel serves 404.html automatically for routes without a static file
  const notFoundRoute = {
    path: "/404",
    title: "Page Not Found | Monday Morning Bottle Shop",
    description: "The page you are looking for does not exist. Browse our collection of 500+ non-alcoholic drinks at Monday Morning Bottle Shop.",
    noIndex: true,
    schema: [],
  };
  const notFoundHTML = generateHTML(notFoundRoute, templateHTML);
  writeFileSync(join(DIST, "404.html"), notFoundHTML, "utf-8");
  console.log(`\n  Generated 404.html (SPA fallback for unknown routes)`);

  // Generate comprehensive sitemap
  const sitemap = generateSitemap(allRoutes);
  writeFileSync(join(DIST, "sitemap.xml"), sitemap, "utf-8");
  console.log(`\n🗺️  Generated sitemap.xml with ${allRoutes.filter((r) => !r.noIndex).length} URLs`);

  console.log(`\n🎉 Generated ${count} static HTML pages with unique meta tags.`);
  console.log(`   📦 ${productRoutes.length} product pages`);
  console.log(`   📝 ${blogRoutes.length} blog pages`);
  console.log(`   📂 ${staticRoutes.filter((r) => r.path.startsWith("/collections/")).length} collection pages`);
  console.log(`   📄 ${staticRoutes.filter((r) => !r.path.startsWith("/collections/")).length} static pages`);

  // ── Build Output API ─────────────────────────────────────────────
  // Create .vercel/output/ directory structure so Vercel uses our
  // routing config instead of auto-generating SPA fallback routes.
  // This is the critical fix: without this, Vercel's Vite adapter
  // adds a catch-all rewrite to /index.html that overrides our
  // per-route static HTML files.

  const VERCEL_OUTPUT = join(process.cwd(), ".vercel", "output");
  const VERCEL_STATIC = join(VERCEL_OUTPUT, "static");

  console.log(`\n🏗️  Creating Vercel Build Output API structure...`);

  // Copy dist/ → .vercel/output/static/
  mkdirSync(VERCEL_STATIC, { recursive: true });
  cpSync(DIST, VERCEL_STATIC, { recursive: true });
  console.log(`  📁 Copied dist/ → .vercel/output/static/`);

  // Write config.json with NO SPA fallback.
  // The "handle": "filesystem" route tells Vercel to serve matching
  // static files from .vercel/output/static/.
  // 
  // IMPORTANT: cleanUrls, trailingSlash, redirects, and headers are
  // configured in vercel.json (which Vercel merges with this config).
  // The config.json only needs routes for the filesystem handler and
  // 404 fallback. This is the critical difference from Vercel's
  // auto-generated config which includes a catch-all SPA rewrite.
  const vercelConfig = {
    version: 3,
    routes: [
      // Handle static assets with long-term caching
      {
        src: "/assets/(.*)",
        headers: { "Cache-Control": "public, max-age=31536000, immutable" },
        continue: true,
      },
      // Serve static files from the filesystem
      // This checks .vercel/output/static/ for matching files
      // With cleanUrls from vercel.json, /blog/slug resolves to
      // /blog/slug/index.html automatically
      { handle: "filesystem" },
      // For any route that doesn't match a static file,
      // serve 404.html (which contains the SPA bootstrap code).
      // This preserves client-side navigation for unknown routes
      // while ensuring crawlers get proper 404 status codes.
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
