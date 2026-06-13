# Note for Chris — serving per-route HTML so social/link previews and crawlers get per-page SEO

**TL;DR:** The site's per-page SEO (title, canonical, OG image, JSON-LD) isn't reaching the live domain for anything that doesn't run JavaScript. The build already produces correct per-route HTML; Lovable just isn't serving it. The cleanest fix is to serve the production domain from **Vercel** (the repo is already configured for it). This is your call since you own the Lovable project, the GitHub repo, and the domain.

---

## What's happening now

- `mondaymorning-af.com` is served by **Lovable**, which returns the SPA shell (`dist/index.html`) for **every** route.
- That shell has one hardcoded `<title>` and one OG image (the homepage's). So a crawler or scraper that reads raw HTML sees the **homepage title + homepage OG image on every page** — products, collections, blog, everything.
- Two separate layers were affected:
  1. **Client-side head (JS crawlers like Google):** the app used `react-helmet-async@2.0.5`, which updates the head in dev but is **inert in the production build**. Already fixed in code by pinning to `1.3.0` (verified in a headless prod build). Once that's published, Googlebot (which renders JS) will get correct per-page head.
  2. **Static head (non-JS scrapers):** Facebook, iMessage, Slack, LinkedIn, X/Twitter link previews, and some crawlers **don't run JS** — they only read the raw HTML. For them, the client-side fix does nothing. They need the correct head in the initial HTML response. That's what this note is about.

## Why it matters

- Every shared link (product, blog post, collection) currently previews as the generic homepage card instead of the actual page.
- Duplicate `<title>` tags sitewide is a real on-page SEO weakness for a site whose whole strategy is per-page ranking.

## The good news

The build already solves this. `npm run build` runs `vite build && node scripts/generate-static-pages.mjs`, which generates a correct static file per route, e.g.:

```
dist/product/dromme-calm-founder-edition/index.html
  <title>Drømme - Calm Founder Edition | Monday Morning Bottle Shop</title>
  <link rel="canonical" href="https://mondaymorning-af.com/product/dromme-calm-founder-edition">
  + full Product JSON-LD, per-page OG tags, pre-rendered body content
```

…and the repo already ships a Vercel config (`vercel.json` + a `.vercel/output` Build Output API structure) that serves those per-route files **filesystem-first, with no SPA fallback**. Lovable just doesn't use any of it.

## The fix: serve the domain from Vercel

If there's already a Vercel project for this repo, this is mostly a domain + settings check. If not, it's a standard Vercel import. Checklist:

1. **Vercel project** connected to `github.com/chrismefford/mondaymorning`, deploying from `main`.
2. **Build command must be the full build**, not Vercel's default `vite build`:
   ```
   npm run build
   ```
   (The default `vite build` skips the SSG, which is the whole point. The SSG also emits the `.vercel/output` Build Output API structure that gives filesystem-first serving + the redirects in `vercel.json`.)
3. **Environment variables** set in the Vercel project (Production), copied from the current `.env` / Lovable — both are client-side public keys, already baked into the bundle:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   Without these the build bakes empty values and product/data fetches break.
4. **Domain:** point `mondaymorning-af.com` (and `www`, as a 301 → bare) at the Vercel project.
5. **Verify** after deploy — raw HTML should now be per-page (no JS needed):
   ```
   curl -s https://mondaymorning-af.com/product/dromme-calm-founder-edition | grep -i "<title>"
   # expect: Drømme - Calm Founder Edition | Monday Morning Bottle Shop
   ```

## What changes about the workflow

- **Deploys become automatic on `git push` to `main`** (Vercel auto-builds). The manual "Publish in Lovable" step is no longer what ships the live site.
- **Lovable still works as the editor + backend** (Supabase). The two-way GitHub sync is unchanged — Lovable keeps owning `supabase/**` and pushing backend changes. Only the *serving of the live domain* moves to Vercel.

## What NOT to break

- Don't move the Supabase backend — it stays with Lovable. This change is frontend-serving only.
- Keep `vercel.json`'s redirects (legacy Squarespace URLs, /account → /auth, etc.) — they're already there.

## If you'd rather not repoint the domain

Then we stay on Lovable and accept the tradeoff: the client-side Helmet fix (already coded) gives **Google** correct per-page SEO, but **social/link previews stay generic**. That's the only piece this Vercel switch buys that the code fix can't.

---

*Prepared 2026-06-12. The client-side Helmet fix is a 1-line dependency pin already committed and waiting to publish; this note is only about the static/serving layer.*
