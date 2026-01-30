# SEO Redirect Map: mondaymorning-af.com → mondaymorning.lovable.app

## Migration Summary

- **Old Domain**: mondaymorning-af.com (Squarespace)
- **New Domain**: mondaymorning-af.com (Lovable, after DNS update)
- **Date**: January 2026

---

## Core Pages (Priority 1: 301 Redirect)

| Old URL | New URL | Status | Notes |
|---------|---------|--------|-------|
| `/` | `/` | 301 | Homepage |
| `/home` | `/` | 301 | Squarespace duplicate homepage |
| `/about` | `/about` | ✅ Match | About page exists |
| `/contact` | `/locations` | 301 | Contact merged into Locations |
| `/contact#visit-us` | `/locations` | 301 | Anchor redirect |
| `/blog` | `/blog` | ✅ Match | Blog index exists |
| `/recipes` | `/recipes` | ✅ Match | Recipes index exists |
| `/newsletter-july` | `/` | 301 | Newsletter landing → Homepage with newsletter |
| `/services` | `/services` | ✅ Match | Wholesale/B2B page |
| `/wholesale` | `/services` | 301 | Redirect to services |
| `/careers` | `/about` | 301 | No separate careers, redirect to about |
| `/shipping-and-returns` | `/shipping` | 301 | Shipping page |
| `/terms-of-service` | `/terms` | 301 | Terms page |
| `/privacy-policy` | `/privacy` | 301 | Privacy page |

---

## Blog Posts (Priority 1: 301 Redirect)

Blog slugs mostly align. Redirect to existing blog or show 404 if not imported.

| Old URL | New URL | Status |
|---------|---------|--------|
| `/blog/the-rise-of-non-alcoholic-drinks-a-complete-guide-to-alcohol-free-living` | `/blog/the-rise-of-non-alcoholic-drinks-a-complete-guide-to-alcohol-free-living` | 301 |
| `/blog/americans-are-drinking-less-heres-what-that-meansand-why-monday-morning-is-san-diegos-na-pioneer` | `/blog/americans-are-drinking-less-heres-what-that-meansand-why-monday-morning-is-san-diegos-na-pioneer` | 301 |
| `/blog/complete-guide-to-finding-kava-near-you-in-2025` | `/blog/complete-guide-to-finding-kava-near-you-in-2025` | 301 |
| `/blog/where-to-go-for-killer-alcohol-free-drinks-in-san-diego` | `/blog/where-to-go-for-killer-alcohol-free-drinks-in-san-diego` | 301 |
| `/blog/kava-haven-nbspthe-exclusive-san-diego-kava-you-can-only-get-at-monday-morning-bottle-shop` | `/blog/kava-haven-nbspthe-exclusive-san-diego-kava-you-can-only-get-at-monday-morning-bottle-shop` | 301 |
| `/blog/where-to-get-kava-in-san-diego` | `/blog/where-to-get-kava-in-san-diego` | 301 |
| `/blog/the-sober-truth-how-i-learned-to-stop-worrying-and-love-fake-drinks` | `/blog/the-sober-truth-how-i-learned-to-stop-worrying-and-love-fake-drinks` | 301 |
| `/blog/san-diego-virgin-drinks-discover-top-non-alcoholic-spots` | `/blog/san-diego-virgin-drinks-discover-top-non-alcoholic-spots` | 301 |
| `/blog/mens-health-month-raise-a-glass-to-your-health-without-wrecking-it` | `/blog/mens-health-month-raise-a-glass-to-your-health-without-wrecking-it` | 301 |
| `/blog/lets-talk-about-why-we-drink` | `/blog/lets-talk-about-why-we-drink` | 301 |
| `/blog/health-benefits-of-quitting-drinking` | `/blog/health-benefits-of-quitting-drinking` | 301 |
| `/blog/rise-of-sober-curious-movement` | `/blog/rise-of-sober-curious-movement` | 301 |
| `/blog/dry-january-san-diego-news` | `/blog/dry-january-san-diego-news` | 301 |
| `/blog/*` | `/blog/:slug` | 301 | Fallback: match slug if imported |

---

## Blog Tag Pages (Priority 3: 410 Gone)

Blog tag pages don't exist in new site. Return 410 (content removed).

| Old URL | New URL | Status | Notes |
|---------|---------|--------|-------|
| `/blog/tag/*` | 410 | Gone | Tag archive pages removed |

---

## Recipe Pages (Priority 2: 301 Redirect)

Recipes have complex Squarespace slugs. Match to recipe system or 410.

| Old URL Pattern | New URL | Status | Notes |
|---------|---------|--------|-------|
| `/recipes` | `/recipes` | ✅ Match | Recipe index |
| `/recipes/category/Margarita` | `/recipes?occasion=cocktails` | 301 | Category filter |
| `/recipes/category/Old+Fashioned` | `/recipes?occasion=cocktails` | 301 | Category filter |
| `/recipes/category/Negroni` | `/recipes?occasion=cocktails` | 301 | Category filter |
| `/recipes/*` | `/recipes` | 301 | Individual recipes → recipes index (generated recipes in DB) |

---

## Community Events Calendar (Priority 3: 410 Gone)

Events are time-sensitive and expired. Return 410.

| Old URL | New URL | Status | Notes |
|---------|---------|--------|-------|
| `/community-events-calendar` | 410 | Gone | No events section in new site |
| `/community-events-calendar/*` | 410 | Gone | Past events removed |

---

## Shop Redirects (Priority 1: 301 Redirect)

Shop moved to separate Shopify domain previously, now integrated.

| Old URL | New URL | Status |
|---------|---------|--------|
| `https://shop.mondaymorning-af.com/*` | `/shop` | 301 |

---

## Catch-All Rules

| Pattern | Destination | Status | Reason |
|---------|-------------|--------|--------|
| Unmatched URLs | Custom 404 Page | 404 | Show helpful 404 with navigation |
| Removed content (events, tags) | 410 | 410 | Content intentionally removed |

---

## URL Mapping Summary

| Category | Count | Strategy |
|----------|-------|----------|
| Core Pages | 12 | 301 to new equivalents |
| Blog Posts | 40+ | 301 to same slug if imported |
| Blog Tags | 20+ | 410 Gone |
| Recipes | 40+ | 301 to /recipes index |
| Events | 70+ | 410 Gone |
| **Total** | **~150+** | Mixed |

