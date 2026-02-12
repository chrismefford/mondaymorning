/**
 * Post-build script: Generates static HTML files for each route
 * with unique <title>, <meta description>, <link canonical>, OG tags,
 * and JSON-LD structured data baked into the raw HTML.
 *
 * This ensures Google and social-media crawlers see fully-formed pages
 * even though the app is a client-side SPA.
 *
 * Usage: node scripts/generate-static-pages.mjs
 * Runs automatically after `vite build` via the "postbuild" npm script.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";

const DIST = join(process.cwd(), "dist");
const SITE_NAME = "Monday Morning Bottle Shop";
const SITE_URL = "https://mondaymorning-af.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

// ── Structured Data Schemas ──────────────────────────────────────────

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
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
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

// ── Route Definitions ────────────────────────────────────────────────

const routes = [
  {
    path: "/",
    title: "Monday Morning | America's #1 NA Bottle Shop & Tasting Room",
    description:
      "San Diego's premier non-alcoholic bottle shop with 500+ flavors. Shop NA beer, wine, spirits & mocktails. Try before you buy at our Pacific Beach & Ocean Beach locations.",
    schema: [organizationSchema, websiteSchema, localBusinessSchema],
  },
  {
    path: "/shop",
    title: "Shop by Vibe | Monday Morning Bottle Shop",
    description:
      "Explore 500+ non-alcoholic drinks organized by vibe. Beach Day, Date Night, Golden Hour & more. Find the perfect NA beer, wine, or spirit for any moment.",
    schema: [organizationSchema, websiteSchema],
  },
  {
    path: "/about",
    title: "About Us | Monday Morning Bottle Shop",
    description:
      "Meet Zane, the founder of Monday Morning. Discover why we created San Diego's premier non-alcoholic bottle shop with 500+ flavors to help you drink differently.",
    schema: [organizationSchema],
  },
  {
    path: "/recipes",
    title: "NA Mocktail Recipes | Monday Morning Bottle Shop",
    description:
      "Discover delicious non-alcoholic cocktail recipes. Easy mocktails for breakfast, dinner, beach days & celebrations. Made with premium NA spirits, wine & beer.",
    schema: [organizationSchema, websiteSchema],
  },
  {
    path: "/locations",
    title: "Store Locations | Monday Morning Bottle Shop",
    description:
      "Visit Monday Morning's NA bottle shops in Pacific Beach & Ocean Beach, San Diego. Try 500+ non-alcoholic drinks before you buy. Plus find us at 17+ partner bars and restaurants.",
    schema: [organizationSchema, localBusinessSchema],
  },
  {
    path: "/blog",
    title: "Blog | Monday Morning Bottle Shop",
    description:
      "Stories, recipes, and insights from the alcohol-free lifestyle movement. Discover the joy of mindful drinking with Monday Morning.",
    schema: [organizationSchema, websiteSchema],
  },
  {
    path: "/services",
    title: "Wholesale & B2B Services | Monday Morning Bottle Shop",
    description:
      "Partner with Monday Morning for wholesale non-alcoholic beverages. Premium NA beer, wine, spirits & mocktails for bars, restaurants, and retailers in San Diego.",
    schema: [organizationSchema],
  },
  {
    path: "/valentines",
    title: "Sips & Sweethearts | Valentine's Date Night | Monday Morning Bottle Shop",
    description:
      "Join us February 12th for an unforgettable Valentine's date night featuring handcrafted NA cocktails, chocolate pairings, charcuterie, and a cozy movie screening.",
    schema: [organizationSchema],
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Monday Morning Bottle Shop",
    description:
      "Read Monday Morning Bottle Shop's privacy policy. Learn how we collect, use, and protect your personal information.",
    schema: [organizationSchema],
  },
  {
    path: "/terms",
    title: "Terms of Service | Monday Morning Bottle Shop",
    description:
      "Read Monday Morning Bottle Shop's terms of service for using our website and purchasing products.",
    schema: [organizationSchema],
  },
  {
    path: "/shipping",
    title: "Shipping Policy | Monday Morning Bottle Shop",
    description:
      "Learn about Monday Morning's shipping options, delivery times, and free shipping thresholds for non-alcoholic beverages.",
    schema: [organizationSchema],
  },
  {
    path: "/returns",
    title: "Returns & Refunds | Monday Morning Bottle Shop",
    description:
      "Monday Morning's return and refund policy for non-alcoholic beverages. Learn about our satisfaction guarantee.",
    schema: [organizationSchema],
  },
  {
    path: "/auth",
    title: "Sign In | Monday Morning Bottle Shop",
    description:
      "Sign in to your Monday Morning account to track orders, save favorites, and access exclusive deals on non-alcoholic beverages.",
    noIndex: true,
    schema: [],
  },
  {
    path: "/wholesale-login",
    title: "B2B Login | Monday Morning Bottle Shop",
    description:
      "Login to your Monday Morning wholesale account to access B2B pricing and ordering.",
    noIndex: true,
    schema: [],
  },
  {
    path: "/wholesale-catalog",
    title: "Wholesale Catalog | Monday Morning Bottle Shop",
    description:
      "Browse Monday Morning's wholesale catalog of non-alcoholic beverages for bars, restaurants, and retailers.",
    noIndex: true,
    schema: [],
  },
];

// ── HTML Generation ──────────────────────────────────────────────────

function generateHTML(route, templateHTML) {
  const canonicalUrl = `${SITE_URL}${route.path === "/" ? "" : route.path}`;
  const ogImage = route.ogImage || DEFAULT_OG_IMAGE;

  // Build the meta tags block
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

  // Build JSON-LD block
  let jsonLd = "";
  if (route.schema && route.schema.length > 0) {
    for (const s of route.schema) {
      jsonLd += `\n    <script type="application/ld+json">${JSON.stringify(s)}</script>`;
    }
  }

  // Replace the existing meta tags in the template
  let html = templateHTML;

  // Remove existing title
  html = html.replace(/<title>[^<]*<\/title>\s*/g, "");

  // Remove existing meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>\s*/g,
    ""
  );

  // Remove existing canonical
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>\s*/g, "");

  // Remove existing OG tags
  html = html.replace(
    /<meta\s+property="og:[^"]*"\s+content="[^"]*"\s*\/?>\s*/g,
    ""
  );

  // Remove existing Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:[^"]*"\s+content="[^"]*"\s*\/?>\s*/g,
    ""
  );

  // Insert new meta tags after <meta charset="UTF-8" />
  html = html.replace(
    /(<meta\s+charset="UTF-8"\s*\/?>)/,
    `$1\n${metaTags}\n${jsonLd}`
  );

  return html;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
  const templatePath = join(DIST, "index.html");

  if (!existsSync(templatePath)) {
    console.error("❌ dist/index.html not found. Run `vite build` first.");
    process.exit(1);
  }

  const templateHTML = readFileSync(templatePath, "utf-8");
  let count = 0;

  for (const route of routes) {
    const html = generateHTML(route, templateHTML);

    if (route.path === "/") {
      // Overwrite the root index.html
      writeFileSync(templatePath, html, "utf-8");
    } else {
      // Create directory and index.html for the route
      const dir = join(DIST, route.path);
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, "index.html"), html, "utf-8");
    }

    count++;
    console.log(`  ✅ ${route.path} → ${route.title.substring(0, 60)}...`);
  }

  console.log(`\n🎉 Generated ${count} static HTML pages with unique meta tags.`);
}

main();

