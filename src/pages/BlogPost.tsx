import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "@/lib/helmet-compat";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlogProductCard from "@/components/blog/BlogProductCard";
import AdaptogenChart from "@/components/blog/AdaptogenChart";
import NABeerCalorieChart from "@/components/blog/NABeerCalorieChart";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data as BlogPost | null;
    },
    enabled: !!slug,
  });

  // SEO meta values - optimized for search engines
  // Title: Keep under 60 chars for best display in SERPs
  const truncateTitle = (title: string, maxLen: number) => {
    if (title.length <= maxLen) return title;
    return title.substring(0, maxLen - 3).trim() + "...";
  };
  
  // Description: Ideal 120-160 chars, clean up any import artifacts
  const cleanExcerpt = (excerpt: string | null): string => {
    if (!excerpt) return "Discover alcohol-free drinks, mocktail recipes, and mindful drinking tips from Monday Morning Bottle Shop in San Diego.";
    // Remove any leftover import artifacts
    let cleaned = excerpt
      .replace(/\[\d*\]\([^)]+\)/g, '') // Remove [0](url) patterns
      .replace(/\[\]\([^)]+\)/g, '')     // Remove [](url) patterns
      .replace(/\n+/g, ' ')              // Replace newlines with spaces
      .trim();
    // Truncate to ~155 chars at word boundary
    if (cleaned.length > 155) {
      cleaned = cleaned.substring(0, 155).replace(/\s+\S*$/, '') + "...";
    }
    return cleaned || "Discover alcohol-free drinks, mocktail recipes, and mindful drinking tips from Monday Morning Bottle Shop in San Diego.";
  };
  
  const baseTitle = post?.title || "Blog Post";
  const seoTitle = truncateTitle(baseTitle, 50);
  const pageTitle = post ? `${seoTitle} | Monday Morning` : "Blog Post | Monday Morning";
  const pageDescription = cleanExcerpt(post?.excerpt);
  const ogImage = post?.featured_image || "/og-image.png";
  const canonicalUrl = `https://mondaymorning.lovable.app/blog/${slug}`;
  const publishedDate = post?.published_at || post?.created_at;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-muted rounded w-1/4 mb-4" />
                <div className="h-12 bg-muted rounded w-3/4 mb-6" />
                <div className="aspect-[16/9] bg-muted rounded-lg mb-8" />
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="font-serif text-4xl mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-brand-green hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Monday Morning Bottle Shop" />
        {publishedDate && (
          <meta property="article:published_time" content={publishedDate} />
        )}
        <meta property="article:section" content="Non-Alcoholic Drinks" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content="@mondaymorningsd" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "alternativeHeadline": seoTitle,
            "description": pageDescription,
            "image": ogImage,
            "datePublished": publishedDate,
            "dateModified": post.created_at,
            "author": {
              "@type": "Organization",
              "name": "Monday Morning Bottle Shop",
              "url": "https://mondaymorning.lovable.app"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Monday Morning Bottle Shop",
              "url": "https://mondaymorning.lovable.app",
              "logo": {
                "@type": "ImageObject",
                "url": "https://mondaymorning.lovable.app/og-image.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            },
            "keywords": "non-alcoholic drinks, NA beverages, mocktails, alcohol-free, San Diego, mindful drinking, sober curious"
          })}
        </script>
      </Helmet>

      <Header />
      <main>
        <article>
          {/* Hero Image */}
          <div className="relative h-[65vh] min-h-[520px] overflow-hidden">
            <img
              src={post.featured_image || "/images/blog/na-red-wines-guide.jpg"}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean via-ocean/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="container mx-auto max-w-3xl">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors text-sm font-sans"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-3">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="text-white/80 text-lg md:text-xl font-sans leading-relaxed mb-4 max-w-2xl">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Calendar className="w-4 h-4" />
                  <time>
                    {format(
                      new Date(post.published_at || post.created_at),
                      "MMMM d, yyyy"
                    )}
                  </time>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gradient-to-b from-cream via-cream to-sand/40">
            {/* Decorative top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-gold via-gold-light to-gold-warm" />

            <div className="container mx-auto px-4 py-14 md:py-24">
              <div className="max-w-3xl mx-auto">
                {(() => {
                  // Strip the first H1 since it's in the hero
                  const contentWithoutH1 = post.content.replace(/^#\s+[^\n]+\n+/, '');
                  // Also strip the bold subtitle line right after
                  const cleanContent = contentWithoutH1.replace(/^\*\*[^*]+\*\*\n+/, '');
                  // Split on both PRODUCT and special chart placeholders
                  const parts = cleanContent.split(/(\{\{PRODUCT:[^}]+\}\}|\{\{ADAPTO_CHART\}\}|\{\{CALORIE_CHART\}\})/);
                  return parts.map((part, i) => {
                    const productMatch = part.match(/^\{\{PRODUCT:([^}]+)\}\}$/);
                    if (productMatch) {
                      return <BlogProductCard key={`product-${i}`} handle={productMatch[1].trim()} />;
                    }
                    if (part === '{{ADAPTO_CHART}}') {
                      return <AdaptogenChart key={`chart-${i}`} />;
                    }
                    if (part === '{{CALORIE_CHART}}') {
                      return <NABeerCalorieChart key={`calorie-chart-${i}`} />;
                    }
                    return (
                      <div
                        key={`content-${i}`}
                        className="prose prose-lg max-w-none
                          prose-headings:font-serif
                          prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:text-forest prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4
                          prose-h2:border-b-2 prose-h2:border-gold/40
                          prose-h3:text-xl prose-h3:md:text-2xl prose-h3:text-ocean prose-h3:mt-2 prose-h3:mb-4
                          prose-p:text-forest/80 prose-p:leading-[1.9] prose-p:text-[17px]
                          prose-strong:text-forest prose-strong:font-semibold
                          prose-a:text-ocean prose-a:font-semibold prose-a:no-underline prose-a:border-b prose-a:border-ocean/40 hover:prose-a:border-ocean hover:prose-a:text-ocean-deep
                          prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:border-gold
                          prose-blockquote:bg-gold/8 prose-blockquote:px-6 prose-blockquote:py-5 prose-blockquote:rounded-r-xl
                          prose-blockquote:text-forest/90 prose-blockquote:text-lg
                          prose-img:rounded-xl prose-img:shadow-elevated prose-img:my-10
                          prose-ul:text-forest/80 prose-ol:text-forest/80
                          prose-li:marker:text-gold
                          prose-table:border prose-table:border-border
                          prose-th:bg-forest prose-th:text-cream prose-th:font-sans prose-th:text-sm prose-th:px-3 prose-th:py-2
                          prose-td:px-3 prose-td:py-2 prose-td:text-sm prose-td:border-b prose-td:border-border
                          prose-hr:border-gold/30 prose-hr:my-14"
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          disallowedElements={['script', 'iframe', 'object', 'embed']}
                          unwrapDisallowed={true}
                          urlTransform={(url) => {
                            if (url.startsWith('javascript:') || url.startsWith('data:')) {
                              return '#blocked';
                            }
                            return url;
                          }}
                          components={{
                            a: ({ href, children, ...props }) => {
                              if (href?.startsWith('/product/')) {
                                return (
                                  <Link
                                    to={href}
                                    className="text-ocean hover:text-ocean-deep font-semibold border-b border-ocean/40 hover:border-ocean transition-colors no-underline"
                                    {...props}
                                  >
                                    {children}
                                  </Link>
                                );
                              }
                              return <a href={href} {...props}>{children}</a>;
                            },
                          }}
                        >
                          {part}
                        </ReactMarkdown>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Bottom accent */}
            <div className="h-1 w-full bg-gradient-to-r from-gold-warm via-gold to-gold-light" />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
