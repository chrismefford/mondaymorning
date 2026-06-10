import { lazy, Suspense } from "react";
import { Helmet } from "@/lib/helmet-compat";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";

// Below-the-fold sections lazy load to keep initial paint fast
const Collections = lazy(() => import("@/components/home/Collections"));
const Story = lazy(() => import("@/components/home/Story"));
const WhyWeDontDrink = lazy(() => import("@/components/home/WhyWeDontDrink"));
const Recipes = lazy(() => import("@/components/home/Recipes"));
const Testimonials = lazy(() => import("@/components/home/Testimonials"));
const Newsletter = lazy(() => import("@/components/home/Newsletter"));
const Instagram = lazy(() => import("@/components/home/Instagram"));

import { 
  SITE_NAME, 
  SITE_URL, 
  DEFAULT_OG_IMAGE, 
  TWITTER_HANDLE,
  localBusinessSchema,
  websiteSchema 
} from "@/lib/seo";

const Index = () => {
  const pageTitle = "Non-Alcoholic Drinks: 500+ NA Beer, Wine & Spirits | Monday Morning";
  const pageDescription = "Shop 500+ non-alcoholic beers, wines, spirits and mocktails. Fast local delivery in San Diego, taste before you buy at our PB and OB tasting rooms.";
  const canonicalUrl = SITE_URL;

  return (
    <div className="min-h-screen bg-background brand-type">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        
        {/* Additional SEO */}
        <meta name="keywords" content="non-alcoholic drinks, NA beer, NA wine, NA spirits, alcohol-free, San Diego, Pacific Beach, Ocean Beach, sober-curious, mindful drinking, mocktails" />
        <meta name="author" content={SITE_NAME} />
        <meta name="robots" content="index, follow" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <Header />
      
      <main>
        <Hero />
        <FeaturedProducts />
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <Collections />
          <Story />
          <WhyWeDontDrink />
          <Recipes />
          <Testimonials />
          <Newsletter />
          <Instagram />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
