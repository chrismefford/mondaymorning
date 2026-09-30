// Blog posts that are no longer shown on the site. The rows stay in the database
// (nothing is deleted); the blog index, sitemap, and prerender skip them, and a
// visit to the old URL redirects to `redirectTo`.
//
// The Lab (San Marcos brewery) closed in September 2026, so the two posts that
// were entirely about it are retired.
export const RETIRED_BLOG_POSTS: Record<string, string> = {
  "the-lab-opening-non-alcoholic-contract-brewing-san-marcos": "/locations",
  "non-alcoholic-brewery-taproom-san-marcos": "/locations",
};

export const isRetiredBlogPost = (slug?: string | null) =>
  !!slug && Object.prototype.hasOwnProperty.call(RETIRED_BLOG_POSTS, slug);
