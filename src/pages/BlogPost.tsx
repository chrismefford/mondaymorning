import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlogProductCard from "@/components/blog/BlogProductCard";

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
      <main className="pt-24">
        <article className="pb-16 md:pb-24">
          {/* Content */}
          <div className="bg-blog-gold">
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-3xl mx-auto">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
                {/* Split content on {{PRODUCT:handle}} markers */}
                {(() => {
                  const parts = post.content.split(/\{\{PRODUCT:([^}]+)\}\}/);
                  return parts.map((part, i) => {
                    if (i % 2 === 1) {
                      // Odd indices are product handles
                      return <BlogProductCard key={`product-${i}`} handle={part.trim()} />;
                    }
                    // Even indices are markdown content
                    return (
                      <div key={`content-${i}`} className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg">
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
                        >
                          {part}
                        </ReactMarkdown>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
