# Go-Live Checklist — Brand Refresh Deploy

Run this after Chris grants push access and the 3 commits are pushed.
Commits being shipped: `Brand refresh` · `Standardize spelling` · `SEO canonical fixes`.

## 1. Push access
- [ ] Chris adds GitHub user **`mondaymorningaf-daybreak`** as a collaborator on **`chrismefford/mondaymorning`** (repo → Settings → Collaborators → Add people).

## 2. Push & deploy
- [ ] From this Mac, push the 3 commits on `main` (GitHub Desktop → "Push origin", or hand Claude a token).
- [ ] Vercel → Deployments: latest build = **Ready** (not Error).

## 3. Live smoke test (https://mondaymorning-af.com)
- [ ] Home: bigger logo, cream hero, "America's #1 Non-Alcoholic Bottle Shop".
- [ ] Shop, a Product page, Recipes (bottle cards), Visit, Story, Work With Us all load.
- [ ] Cart opens above the green banner; add-to-cart → Shopify checkout works.
- [ ] Newsletter signup → success toast → new customer in Shopify (tag `Newsletter`).
- [ ] Mobile view looks right.

## 4. Domain & SEO config (Vercel)
- [ ] Set **`mondaymorning-af.com` as Primary Domain**; add `www` and **301-redirect www → non-www** (the `_redirects` file is Netlify-style and Vercel ignores it).
- [ ] `/sitemap.xml` and `/robots.txt` load on the live domain.
- [ ] View-source 2–3 pages: `<link rel="canonical">` = `https://mondaymorning-af.com/...` (non-www, no `lovable.app`).

## 5. Google Search Console
- [ ] Property `mondaymorning-af.com` verified.
- [ ] Submit / resubmit `sitemap.xml` (525 URLs).
- [ ] Request indexing: homepage + `/blog` (canonical was just corrected).
- [ ] Next 2–4 weeks: watch Pages/Canonical report (lovable.app → production consolidation) and "non-alcoholic …" query performance.

## 6. Cleanup
- [ ] Delete test subscriber **`mm-site-test@mondaymorning-af.com`** in Shopify → Customers.

## 7. Analytics
- [ ] Confirm GTM containers fire live (`GTM-W262W22W`, `GTM-P2MJD79V`) via Tag Assistant / GA Realtime.

## 8. Follow-ups (not blocking launch)
- [ ] Ownership transfer: GitHub repo + Lovable project + Vercel project → Monday Morning accounts.
- [ ] Brand-consistency pass on ~18 SEO/guide landing pages (task chip `task_9e80fd6f`).
- [ ] Optional: darken gold for small-text contrast (WCAG AA).
- [ ] Confirm the `info@mondaymorning-af.com` inbox is monitored (now the published contact).
