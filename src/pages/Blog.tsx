import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "@/lib/helmet-compat";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import textureCream from "@/assets/texture-cream.webp";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  created_at: string;
}

const FALLBACK_BLOG_IMAGE = "/images/beach-lifestyle.jpg";

const Blog = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, featured_image, published_at, created_at")
        .order("published_at", { ascending: false, nullsFirst: false });

      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const pageTitle = "Non-Alcoholic Drinks Blog: Reviews, Recipes & Guides | Monday Morning";
  const pageDescription = "Honest NA beer reviews, zero-proof cocktail recipes, buyer guides and sober-curious stories from San Diego's biggest non-alcoholic bottle shop.";
  const ogImage = "/og-image.png";

  return (
    <div className="min-h-screen bg-background brand-type">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://mondaymorning-af.com/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mondaymorning-af.com/blog" />
        <meta property="og:image" content={ogImage} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-cream py-16 md:py-24 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <span className="font-sans text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 block">
              Stories & Insights
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-forest mb-4">
              The <span className="font-script text-gold text-[1.2em] leading-none">Blog</span>
            </h1>
            <p className="font-sans text-forest/60 text-lg md:text-xl max-w-2xl mx-auto">
              Stories, recipes, and insights from the alcohol-free lifestyle movement
            </p>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="pt-12 md:pt-16">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/blog/curious-af-dictionary"
              className="group block border border-forest/20 bg-forest text-cream rounded-lg p-8 md:p-10 hover:border-gold transition-colors"
            >
              <span className="font-sans text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-3 block">
                Featured Resource
              </span>
              <h2 className="font-serif text-3xl md:text-4xl mb-3">
                The Curious <span className="italic text-gold">AF</span> Dictionary
              </h2>
              <p className="font-sans text-cream/75 text-base md:text-lg mb-4">
                The vocabulary of drinking less, defined. From sober-curious to zero-proof, updated quarterly.
              </p>
              <span className="font-sans text-sm uppercase tracking-widest text-gold group-hover:underline">
                Read the dictionary &rarr;
              </span>
            </Link>
            <Link
              to="/blog/ultimate-non-alcoholic-beer-guide-2026"
              className="group block border border-forest/20 bg-forest text-cream rounded-lg p-8 md:p-10 hover:border-gold transition-colors"
            >
              <span className="font-sans text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-3 block">
                Featured Guide
              </span>
              <h2 className="font-serif text-3xl md:text-4xl mb-3">
                The Ultimate <span className="italic text-gold">NA Beer</span> Guide for 2026
              </h2>
              <p className="font-sans text-cream/75 text-base md:text-lg mb-4">
                Every brand worth drinking, side by side. 80+ alcohol-free beers from our shelf, organized by style.
              </p>
              <span className="font-sans text-sm uppercase tracking-widest text-gold group-hover:underline">
                Read the guide &rarr;
              </span>
            </Link>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted aspect-[16/10] rounded-lg mb-4" />
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Unable to load blog posts. Please try again later.</p>
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <article className="h-full">
                      {post.featured_image ? (
                        <div className="aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-muted">
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              // If the image URL is dead (common with imported/hotlinked images),
                              // fall back to a local stock image so the card never renders blank.
                              const img = e.currentTarget;
                              if (img.src !== window.location.origin + FALLBACK_BLOG_IMAGE) {
                                img.src = FALLBACK_BLOG_IMAGE;
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] rounded-lg mb-4 bg-forest/10 flex items-center justify-center">
                          <span className="font-serif text-4xl text-forest/30">MM</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        <time>
                          {format(
                            new Date(post.published_at || post.created_at),
                            "MMMM d, yyyy"
                          )}
                        </time>
                      </div>
                      <h2 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-gold transition-colors mb-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">No blog posts yet.</p>
                <p className="text-sm text-muted-foreground">
                  Check back soon for stories and updates!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
