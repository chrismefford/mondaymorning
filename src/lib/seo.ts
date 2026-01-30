// SEO utility constants and helpers for Monday Morning Bottle Shop

export const SITE_NAME = "Monday Morning Bottle Shop";
export const SITE_URL = "https://mondaymorning-af.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const TWITTER_HANDLE = "@mondaymorningsd";

// Default SEO keywords for the site
export const DEFAULT_KEYWORDS = [
  "non-alcoholic drinks",
  "NA beer",
  "NA wine",
  "NA spirits",
  "alcohol-free beverages",
  "mocktails",
  "San Diego",
  "Pacific Beach",
  "Ocean Beach",
  "sober curious",
  "mindful drinking",
  "zero proof"
].join(", ");

// Helper to truncate text for SEO (titles should be ~60 chars, descriptions ~155 chars)
export function truncateForSEO(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  
  // Try to cut at a word boundary
  const truncated = text.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(" ");
  
  if (lastSpace > maxLength * 0.7) {
    return truncated.substring(0, lastSpace) + "...";
  }
  return truncated + "...";
}

// Clean text for meta descriptions (remove markdown artifacts, extra whitespace)
export function cleanMetaDescription(text: string | null | undefined): string {
  if (!text) return "";
  
  return text
    .replace(/\[.*?\]\(.*?\)/g, "") // Remove markdown links
    .replace(/[#*_`]/g, "") // Remove markdown formatting
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .replace(/\s+/g, " ") // Collapse multiple spaces
    .trim();
}

// Generate canonical URL
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

// Organization structured data (shared across pages)
export const organizationSchema = {
  "@type": "Organization",
  "name": SITE_NAME,
  "url": SITE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${SITE_URL}/og-image.png`
  },
  "sameAs": [
    "https://www.instagram.com/mondaymorningsd",
    "https://www.facebook.com/mondaymorningsd"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1854 Garnet Ave",
    "addressLocality": "San Diego",
    "addressRegion": "CA",
    "postalCode": "92109",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-619-555-0101",
    "contactType": "customer service"
  }
};

// Local Business structured data for store pages
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LiquorStore",
  "name": SITE_NAME,
  "description": "San Diego's premier non-alcoholic bottle shop with 425+ flavors. Try before you buy at our Pacific Beach and Ocean Beach locations.",
  "url": SITE_URL,
  "telephone": "+1-619-555-0101",
  "priceRange": "$$",
  "image": DEFAULT_OG_IMAGE,
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "1854 Garnet Ave",
      "addressLocality": "San Diego",
      "addressRegion": "CA",
      "postalCode": "92109",
      "addressCountry": "US"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "4967 Newport Ave",
      "addressLocality": "San Diego",
      "addressRegion": "CA",
      "postalCode": "92107",
      "addressCountry": "US"
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 32.7833,
    "longitude": -117.2500
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "11:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "11:00",
      "closes": "16:00"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Non-Alcoholic Beverages",
    "itemListElement": [
      { "@type": "OfferCatalog", "name": "NA Beer" },
      { "@type": "OfferCatalog", "name": "NA Wine" },
      { "@type": "OfferCatalog", "name": "NA Spirits" },
      { "@type": "OfferCatalog", "name": "Functional Drinks" }
    ]
  }
};

// Website structured data
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_NAME,
  "alternateName": "Monday Morning",
  "url": SITE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/shop?search={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

// Generate Product schema for product pages
export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  category?: string;
  handle: string;
  available?: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": truncateForSEO(cleanMetaDescription(product.description), 300),
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": SITE_NAME
    },
    "category": product.category || "Non-Alcoholic Beverage",
    "offers": {
      "@type": "Offer",
      "url": getCanonicalUrl(`/product/${product.handle}`),
      "priceCurrency": "USD",
      "price": product.price.toFixed(2),
      "availability": product.available !== false 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": SITE_NAME
      }
    }
  };
}

// Generate BreadcrumbList schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Generate ItemList schema for collection pages
export function generateCollectionSchema(collection: {
  name: string;
  description: string;
  url: string;
  products: { name: string; url: string; image: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": collection.name,
    "description": collection.description,
    "url": collection.url,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": collection.products.length,
      "itemListElement": collection.products.slice(0, 10).map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": product.name,
        "url": product.url,
        "image": product.image
      }))
    }
  };
}

// Generate FAQPage schema
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
