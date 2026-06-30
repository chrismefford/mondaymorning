import { useEffect, useState } from "react";

/**
 * Judge.me reviews, fetched directly from the public widget API and rendered
 * in React.
 *
 * We previously relied on Judge.me's client-side `widget_preloader.js` to inject
 * reviews into `.jdgm-widget` divs. On this SPA the preloader's one-shot DOM scan
 * fired before the React widgets mounted, so the interactive bundle never loaded
 * and published reviews never displayed (and the star-snippet rating that
 * Product.tsx scraped off the badge was always empty). Fetching the data
 * ourselves makes review display and the SEO aggregateRating deterministic.
 *
 * externalId = the numeric Shopify product id (Judge.me's external_id).
 */

const SHOP_DOMAIN = "1c3fe3-3b.myshopify.com";

interface JmReview {
  uuid: string;
  rating: number;
  title?: string;
  body_html?: string;
  reviewer_name?: string;
  created_at?: string;
  verified_buyer?: boolean;
}
export interface JmData {
  count: number;
  avg: number;
  reviews: JmReview[];
}

// One in-flight fetch per product id, shared by the badge, the list, and the
// Product page's schema so we never hit the endpoint more than once per product.
const cache: Record<string, Promise<JmData | null>> = {};

function loadReviews(externalId: string): Promise<JmData | null> {
  if (cache[externalId]) return cache[externalId];
  const url =
    `https://judge.me/reviews/reviews_for_widget?url=${SHOP_DOMAIN}` +
    `&shop_domain=${SHOP_DOMAIN}&platform=shopify&page=1&per_page=20` +
    `&product_id=${externalId}`;
  cache[externalId] = fetch(url)
    .then((r) => r.json())
    .then((d) => ({
      count: Number(d?.number_of_reviews) || 0,
      avg: parseFloat(d?.average_rating) || 0,
      reviews: Array.isArray(d?.reviews) ? (d.reviews as JmReview[]) : [],
    }))
    .catch(() => null);
  return cache[externalId];
}

/** Shared hook: returns the product's Judge.me reviews (null while loading). */
export function useJudgeMeReviews(externalId: string): JmData | null {
  const [data, setData] = useState<JmData | null>(null);
  useEffect(() => {
    if (!externalId) return;
    let alive = true;
    loadReviews(externalId).then((d) => {
      if (alive) setData(d);
    });
    return () => {
      alive = false;
    };
  }, [externalId]);
  return data;
}

const Stars = ({ rating }: { rating: number }) => {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span aria-label={`${rating} out of 5 stars`} className="whitespace-nowrap text-base leading-none">
      <span className="text-gold">{"★".repeat(full)}</span>
      <span className="text-forest/20">{"★".repeat(5 - full)}</span>
    </span>
  );
};

const fmtDate = (s?: string) => {
  if (!s) return "";
  try {
    return new Date(s).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return "";
  }
};

/** Compact star rating shown under the product title. Links down to #reviews. */
export const ProductReviewBadge = ({ externalId }: { externalId: string }) => {
  const data = useJudgeMeReviews(externalId);
  if (!externalId || !data || data.count === 0) return null;
  return (
    <a href="#reviews" className="inline-flex items-center gap-2 mb-3" aria-label="See customer reviews">
      <Stars rating={data.avg} />
      <span className="font-sans text-sm text-forest/70 underline underline-offset-2">
        {data.count} review{data.count === 1 ? "" : "s"}
      </span>
    </a>
  );
};

/** Full reviews list, fetched from Judge.me and rendered on-brand. */
export const ProductReviews = ({
  externalId,
  productTitle,
}: {
  externalId: string;
  productTitle?: string;
}) => {
  const data = useJudgeMeReviews(externalId);
  if (!externalId) return null;
  return (
    <section
      id="reviews"
      aria-label={productTitle ? `Reviews for ${productTitle}` : "Reviews"}
      className="border-t-2 border-forest/10 pt-12 lg:pt-20 mb-16 lg:mb-24 scroll-mt-24"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 lg:mb-10">
          <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-3 block">
            From our community
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-forest">Reviews</h2>
          {data && data.count > 0 && (
            <div className="mt-3 flex items-center justify-center gap-2">
              <Stars rating={data.avg} />
              <span className="font-sans text-sm text-forest/70">
                {data.avg.toFixed(1)} · {data.count} review{data.count === 1 ? "" : "s"}
              </span>
            </div>
          )}
        </div>

        {!data || data.count === 0 ? (
          <p className="text-center font-sans text-forest/50">
            {data ? "No reviews yet. Be the first to share your thoughts." : "Loading reviews…"}
          </p>
        ) : (
          <div className="space-y-8">
            {data.reviews.map((r) => (
              <article key={r.uuid} className="border-b border-forest/10 pb-8 last:border-0">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <Stars rating={r.rating} />
                    {r.verified_buyer && (
                      <span className="font-sans text-[11px] uppercase tracking-wide text-gold">
                        Verified buyer
                      </span>
                    )}
                  </div>
                  <time className="font-sans text-xs text-forest/50 flex-shrink-0">{fmtDate(r.created_at)}</time>
                </div>
                <p className="font-sans text-sm font-semibold text-forest mb-1">
                  {r.reviewer_name || "Anonymous"}
                </p>
                {r.title && <h3 className="font-serif text-lg text-forest mb-1">{r.title}</h3>}
                {r.body_html && (
                  <div
                    className="font-sans text-foreground/80 leading-relaxed text-[15px]"
                    dangerouslySetInnerHTML={{ __html: r.body_html }}
                  />
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
