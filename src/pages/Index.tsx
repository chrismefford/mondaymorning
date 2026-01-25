import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Collections from "@/components/home/Collections";
import Story from "@/components/home/Story";
import WhyWeDontDrink from "@/components/home/WhyWeDontDrink";
import Recipes from "@/components/home/Recipes";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import Instagram from "@/components/home/Instagram";
import { 
  SITE_NAME, 
  SITE_URL, 
  DEFAULT_OG_IMAGE, 
  TWITTER_HANDLE,
  localBusinessSchema,
  websiteSchema 
} from "@/lib/seo";

const Index = () => {
  const pageTitle = "Monday Morning | America's #1 NA Bottle Shop & Tasting Room";
  const pageDescription = "San Diego's premier non-alcoholic bottle shop with 425+ flavors. Shop NA beer, wine, spirits & mocktails. Try before you buy at our Pacific Beach & Ocean Beach locations.";
  const canonicalUrl = SITE_URL;

  return (
    <div className="min-h-screen bg-background">
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
        <meta name="keywords" content="non-alcoholic drinks, NA beer, NA wine, NA spirits, alcohol-free, San Diego, Pacific Beach, Ocean Beach, sober curious, mindful drinking, mocktails" />
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
        <Collections />
        <Story />
        <WhyWeDontDrink />
        <Recipes />
        <Testimonials />
        <Newsletter />
        <Instagram />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
