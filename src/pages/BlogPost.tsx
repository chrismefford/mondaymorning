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

  // SEO meta values
  const pageTitle = post ? `${post.title} | Monday Morning Blog` : "Blog Post | Monday Morning";
  const pageDescription = post?.excerpt || "Read this article from Monday Morning Bottle Shop.";
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
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        {publishedDate && (
          <meta property="article:published_time" content={publishedDate} />
        )}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": pageDescription,
            "image": ogImage,
            "datePublished": publishedDate,
            "dateModified": post.created_at,
            "author": {
              "@type": "Organization",
              "name": "Monday Morning Bottle Shop"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Monday Morning Bottle Shop",
              "logo": {
                "@type": "ImageObject",
                "url": "https://mondaymorning.lovable.app/og-image.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            }
          })}
        </script>
      </Helmet>

      <Header />
      <main className="pt-24">
        <article className="pb-16 md:pb-24">
          {/* Hero */}
          <header className="bg-brand-green py-12 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
                <h1 className="font-serif text-3xl md:text-5xl text-white mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center justify-center gap-2 text-white/80">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={publishedDate || undefined}>
                    {format(
                      new Date(post.published_at || post.created_at),
                      "MMMM d, yyyy"
                    )}
                  </time>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="container mx-auto px-4 -mt-8">
              <div className="max-w-4xl mx-auto">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full aspect-[16/9] object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-brand-green prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
