import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Check, AlertCircle } from "lucide-react";

interface ScrapedPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  published_at: string | null;
}

const BlogImport = () => {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [blogUrl, setBlogUrl] = useState("https://www.mondaymorning-af.com/blog");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [scrapedPosts, setScrapedPosts] = useState<ScrapedPost[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState("");

  const handleScrape = async () => {
    setIsLoading(true);
    setProgress("Discovering blog posts...");
    setScrapedPosts([]);
    setSelectedPosts(new Set());

    try {
      const { data, error } = await supabase.functions.invoke("scrape-blog", {
        body: { blogUrl },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.error || "Failed to scrape blog");
      }

      setScrapedPosts(data.posts || []);
      // Select all posts by default
      setSelectedPosts(new Set(data.posts.map((_: ScrapedPost, i: number) => i)));
      
      toast({
        title: "Blog scraped successfully!",
        description: `Found ${data.posts.length} posts out of ${data.totalFound} discovered.`,
      });
    } catch (err) {
      console.error("Scrape error:", err);
      toast({
        title: "Failed to scrape blog",
        description: err instanceof Error ? err.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setProgress("");
    }
  };

  const togglePost = (index: number) => {
    const newSelected = new Set(selectedPosts);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedPosts(newSelected);
  };

  const handleImport = async () => {
    if (selectedPosts.size === 0) {
      toast({
        title: "No posts selected",
        description: "Please select at least one post to import.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    let imported = 0;
    let failed = 0;

    const postsToImport = scrapedPosts.filter((_, i) => selectedPosts.has(i));

    for (const post of postsToImport) {
      try {
        const { error } = await supabase.from("blog_posts").insert({
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt || null,
          featured_image: post.featured_image,
          published_at: post.published_at,
        });

        if (error) {
          // Check if it's a duplicate slug error
          if (error.code === "23505") {
            console.log(`Skipping duplicate: ${post.slug}`);
          } else {
            throw error;
          }
        } else {
          imported++;
        }
      } catch (err) {
        console.error(`Failed to import ${post.title}:`, err);
        failed++;
      }
    }

    setIsSaving(false);

    toast({
      title: "Import complete!",
      description: `Imported ${imported} posts${failed > 0 ? `, ${failed} failed` : ""}.`,
    });

    if (imported > 0) {
      navigate("/blog");
    }
  };

  // Auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
        </main>
        <Footer />
      </div>
    );
  }

  // Not authenticated or not admin
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container mx-auto px-4 py-16 text-center">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="font-serif text-3xl mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-8">
              You need admin access to import blog posts.
            </p>
            <Button onClick={() => navigate("/auth")}>Sign In</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl mb-2">Import Blog Posts</h1>
            <p className="text-muted-foreground mb-8">
              Scrape and import blog posts from your Squarespace site
            </p>

            {/* URL Input */}
            <div className="flex gap-4 mb-8">
              <Input
                type="url"
                value={blogUrl}
                onChange={(e) => setBlogUrl(e.target.value)}
                placeholder="https://yoursite.com/blog"
                className="flex-1"
                disabled={isLoading}
              />
              <Button onClick={handleScrape} disabled={isLoading || !blogUrl}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scraping...
                  </>
                ) : (
                  "Scrape Blog"
                )}
              </Button>
            </div>

            {progress && (
              <p className="text-muted-foreground mb-4">{progress}</p>
            )}

            {/* Scraped Posts */}
            {scrapedPosts.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl">
                    Found {scrapedPosts.length} Posts
                  </h2>
                  <Button
                    onClick={handleImport}
                    disabled={isSaving || selectedPosts.size === 0}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      `Import ${selectedPosts.size} Posts`
                    )}
                  </Button>
                </div>

                <div className="border rounded-lg divide-y">
                  {scrapedPosts.map((post, index) => (
                    <div
                      key={index}
                      className={`p-4 flex gap-4 cursor-pointer transition-colors ${
                        selectedPosts.has(index)
                          ? "bg-brand-green/5"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => togglePost(index)}
                    >
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                          selectedPosts.has(index)
                            ? "bg-brand-green border-brand-green"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {selectedPosts.has(index) && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-lg truncate">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          /{post.slug}
                        </p>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                      {post.featured_image && (
                        <img
                          src={post.featured_image}
                          alt=""
                          className="w-20 h-14 object-cover rounded flex-shrink-0"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogImport;
