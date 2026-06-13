import { useEffect } from "react";

/**
 * Judge.me reviews — client-side widgets.
 *
 * The preloader is injected in index.html (jdgm.SHOP_DOMAIN / PUBLIC_TOKEN).
 * Judge.me scans the DOM for `.jdgm-widget` elements and replaces their
 * contents. Because this is a React SPA, navigating between products does NOT
 * reload the page, so we call `jdgm.batchRefresh()` whenever the product
 * (externalId) changes to re-render the widgets for the new product.
 *
 * We render the widget <div>s with no React children so React only manages
 * their attributes — Judge.me owns the injected content and React leaves it
 * alone on re-render (the attributes are stable per product).
 *
 * externalId = the numeric Shopify product id (Judge.me's external_id).
 */

declare global {
  interface Window {
    jdgm?: { batchRefresh?: () => void };
  }
}

function injectPreloader() {
  const s = document.createElement("script");
  s.async = true;
  s.setAttribute("data-cfasync", "false");
  s.src = "https://cdn.judge.me/widget_preloader.js";
  document.head.appendChild(s);
}

function useJudgeMeRefresh(externalId: string) {
  useEffect(() => {
    if (!externalId) return;
    let tries = 0;
    let refreshed = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      // Once the interactive bundle is loaded, re-render the widgets for this
      // product. Nudge a few times in case a widget div mounted a beat after the
      // bundle finished loading, then stop.
      if (window.jdgm && typeof window.jdgm.batchRefresh === "function") {
        window.jdgm.batchRefresh();
        refreshed += 1;
        if (refreshed >= 3) {
          window.clearInterval(timer);
        }
        return;
      }
      // The index.html preloader runs a one-shot DOM scan that usually fires
      // before these SPA widgets mount, so the interactive bundle never loads
      // and batchRefresh never appears. Re-inject the preloader periodically
      // until it finds the now-present widgets and hydrates them (instead of a
      // single ~2s retry, which loses the race intermittently).
      if (tries % 5 === 0 && tries <= 30) {
        injectPreloader();
      }
      if (tries > 60) window.clearInterval(timer); // ~18s: give up quietly
    }, 300);
    return () => window.clearInterval(timer);
  }, [externalId]);
}

/** Compact star rating shown under the product title. Links down to #reviews. */
export const ProductReviewBadge = ({ externalId }: { externalId: string }) => {
  if (!externalId) return null;
  return (
    <a href="#reviews" className="block mb-3" aria-label="See customer reviews">
      <div className="jdgm-widget jdgm-preview-badge" data-id={externalId} />
    </a>
  );
};

/** Full reviews list + "write a review" form. Owns the SPA re-init. */
export const ProductReviews = ({
  externalId,
  productTitle,
}: {
  externalId: string;
  productTitle?: string;
}) => {
  useJudgeMeRefresh(externalId);
  if (!externalId) return null;
  return (
    <section id="reviews" className="border-t-2 border-forest/10 pt-12 lg:pt-20 mb-16 lg:mb-24 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 lg:mb-10">
          <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-3 block">
            From our community
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-forest">Reviews</h2>
        </div>
        <div
          className="jdgm-widget jdgm-review-widget"
          data-id={externalId}
          data-product-title={productTitle}
        />
      </div>
    </section>
  );
};
