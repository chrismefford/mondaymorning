import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "@/lib/helmet-compat";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

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

  const pageTitle = "Blog | Monday Morning Bottle Shop";
  const pageDescription = "Stories, recipes, and insights from the alcohol-free lifestyle movement. Discover the joy of mindful drinking with Monday Morning.";
  const ogImage = "/og-image.png";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://mondaymorning.lovable.app/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mondaymorning.lovable.app/blog" />
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
        <section className="bg-cream py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-6xl text-ocean mb-4">
              The Blog
            </h1>
            <p className="text-ocean/70 text-lg md:text-xl max-w-2xl mx-auto">
              Stories, recipes, and insights from the alcohol-free lifestyle movement
            </p>
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
                        <div className="aspect-[16/10] rounded-lg mb-4 bg-brand-green/10 flex items-center justify-center">
                          <span className="font-serif text-4xl text-brand-green/30">MM</span>
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
                      <h2 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-brand-green transition-colors mb-2">
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
