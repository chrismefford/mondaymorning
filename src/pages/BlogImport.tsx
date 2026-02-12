import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "@/lib/helmet-compat";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Check, AlertCircle, Image } from "lucide-react";

interface ScrapedPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  published_at: string | null;
}

// Extract all image URLs from markdown content
function extractImageUrls(markdown: string): string[] {
  const imageRegex = /!\[.*?\]\((https?:\/\/[^\)]+)\)/g;
  const urls: string[] = [];
  let match;
  while ((match = imageRegex.exec(markdown)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

// Replace image URL in content
function replaceImageUrl(content: string, oldUrl: string, newUrl: string): string {
  return content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
}

// Clean up common Squarespace import artifacts
function sanitizeContent(content: string): string {
  let cleaned = content;
  
  // Remove [0](url) style artifacts (cart links, etc.)
  cleaned = cleaned.replace(/\[\d+\]\(https?:\/\/[^\)]+\)\s*/g, '');
  
  // Remove empty links like [](url)
  cleaned = cleaned.replace(/\[\]\(https?:\/\/[^\)]+\)\s*/g, '');
  
  // Remove standalone numbers at start of content
  cleaned = cleaned.replace(/^\d+\s*\n+/, '');
  
  // Clean up multiple consecutive newlines (more than 2)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  
  // Trim leading/trailing whitespace
  cleaned = cleaned.trim();
  
  return cleaned;
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
  const [importProgress, setImportProgress] = useState(0);

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

  // Download and re-host a single image with http→https normalization
  const downloadImage = async (imageUrl: string, slug: string): Promise<string | null> => {
    try {
      // Normalize URL: convert http to https before sending
      let normalizedUrl = imageUrl.trim();
      if (normalizedUrl.startsWith('http://')) {
        normalizedUrl = normalizedUrl.replace('http://', 'https://');
      }
      
      const { data, error } = await supabase.functions.invoke("download-blog-image", {
        body: { imageUrl: normalizedUrl, slug },
      });

      if (error || !data?.success) {
        console.error("Failed to download image:", normalizedUrl, error || data?.error);
        return null;
      }

      return data.newUrl;
    } catch (err) {
      console.error("Error downloading image:", err);
      return null;
    }
  };

  // Process a post: download all images, sanitize content, and update
  const processPostImages = async (post: ScrapedPost): Promise<ScrapedPost> => {
    // First, sanitize the content to remove import artifacts
    let updatedContent = sanitizeContent(post.content);
    let updatedFeaturedImage = post.featured_image;

    // Download featured image
    if (post.featured_image) {
      const newUrl = await downloadImage(post.featured_image, post.slug);
      if (newUrl) {
        updatedFeaturedImage = newUrl;
        updatedContent = replaceImageUrl(updatedContent, post.featured_image, newUrl);
      }
    }

    // Extract and download all images from content
    const contentImages = extractImageUrls(post.content);
    for (const imageUrl of contentImages) {
      // Skip if already processed (featured image)
      if (imageUrl === post.featured_image) continue;
      
      const newUrl = await downloadImage(imageUrl, post.slug);
      if (newUrl) {
        updatedContent = replaceImageUrl(updatedContent, imageUrl, newUrl);
      }
    }

    return {
      ...post,
      content: updatedContent,
      featured_image: updatedFeaturedImage,
    };
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
    setImportProgress(0);
    let imported = 0;
    let failed = 0;

    const postsToImport = scrapedPosts.filter((_, i) => selectedPosts.has(i));
    const totalPosts = postsToImport.length;

    for (let i = 0; i < postsToImport.length; i++) {
      const post = postsToImport[i];
      setProgress(`Processing ${i + 1}/${totalPosts}: ${post.title.substring(0, 30)}...`);
      setImportProgress(((i + 0.5) / totalPosts) * 100);

      try {
        // Download and re-host images
        const processedPost = await processPostImages(post);
        
        setImportProgress(((i + 0.8) / totalPosts) * 100);

        // Save to database
        const { error } = await supabase.from("blog_posts").insert({
          title: processedPost.title,
          slug: processedPost.slug,
          content: processedPost.content,
          excerpt: processedPost.excerpt || null,
          featured_image: processedPost.featured_image,
          published_at: processedPost.published_at,
        });

        if (error) {
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

      setImportProgress(((i + 1) / totalPosts) * 100);
    }

    setIsSaving(false);
    setProgress("");
    setImportProgress(0);

    toast({
      title: "Import complete!",
      description: `Imported ${imported} posts with images${failed > 0 ? `, ${failed} failed` : ""}.`,
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
        <Helmet>
          <title>Access Denied | Monday Morning</title>
        </Helmet>
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
      <Helmet>
        <title>Import Blog | Monday Morning</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl mb-2">Import Blog Posts</h1>
            <p className="text-muted-foreground mb-8">
              Scrape and import blog posts from your Squarespace site. Images will be automatically downloaded and re-hosted.
            </p>

            {/* URL Input */}
            <div className="flex gap-4 mb-8">
              <Input
                type="url"
                value={blogUrl}
                onChange={(e) => setBlogUrl(e.target.value)}
                placeholder="https://yoursite.com/blog"
                className="flex-1"
                disabled={isLoading || isSaving}
              />
              <Button onClick={handleScrape} disabled={isLoading || isSaving || !blogUrl}>
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

            {/* Progress */}
            {(progress || isSaving) && (
              <div className="mb-6 space-y-2">
                <p className="text-muted-foreground flex items-center gap-2">
                  {isSaving && <Image className="w-4 h-4" />}
                  {progress || "Processing..."}
                </p>
                {isSaving && <Progress value={importProgress} className="h-2" />}
              </div>
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

                <p className="text-sm text-muted-foreground">
                  All images will be downloaded and stored locally so they remain available after you cancel Squarespace.
                </p>

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
