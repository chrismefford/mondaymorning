import { Helmet } from "@/lib/helmet-compat";
import { SITE_NAME, SITE_URL, truncateForSEO, cleanMetaDescription } from "@/lib/seo";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "product";
  schema?: object | object[];
  noIndex?: boolean;
}

/**
 * Reusable SEO component for all pages.
 * Automatically handles meta tags, Open Graph, Twitter Cards, and JSON-LD schemas.
 * 
 * Usage:
 * <SEO 
 *   title="Page Title" 
 *   description="Page description for search engines"
 *   path="/page-path"
 *   schema={yourJsonLdSchema} // optional
 * />
 */
const SEO = ({ 
  title, 
  description, 
  path, 
  image = "/og-image.png",
  type = "website",
  schema,
  noIndex = false
}: SEOProps) => {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const cleanDescription = truncateForSEO(cleanMetaDescription(description), 155);
  const canonicalUrl = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={cleanDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={cleanDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={cleanDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(schema) ? schema : [schema])}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
