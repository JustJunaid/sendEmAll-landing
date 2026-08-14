# Landing Overhaul + Theme System — Design Spec

**Date:** 2026-07-23
**Status:** Awaiting founder review
**Supersedes positioning in:** `docs/2026-07-12-landing-v2-design-prompt.md` (architecture still valid; pricing/CTA assumptions updated now that apps are live)

---

## 1. Why this work exists

The landing page sells a product that does not exist, at prices nobody can pay, with a call-to-action that leads to a form instead of the working software.

Three things changed underneath it:

1. **The apps shipped.** `app.sendemall.com`, `infra.sendemall.com`, and `sequencer.sendemall.com` all serve live software with working registration.
2. **Pricing was rebuilt.** The `$149/$349/$599` bundles were deliberately retired — the plan seed now deactivates them on every boot.
3. **The product estate is light-themed.** The landing page is dark. The login screen a visitor hits one click later is light.

This spec covers two separable workstreams: a **content/IA overhaul** and a **theme system**. They ship independently.

---

## 2. Ground truth (verified in code, 2026-07-23)

Everything in this section was read from source. Where a document and the code disagreed, the code won. File references are to sibling repos unless noted.

### 2.1 Architecture

The three "products" are **one Next.js application** (`sendEmAll/apps/web`) routed by hostname to a path prefix. Per `apps/web/src/lib/surface.ts:32-56`:

| Surface | Hostname | Path prefix |
|---|---|---|
| scrape (LeadGen) | `app.sendemall.com` | `/scrape` |
| outbound (Sequencer) | `sequencer.sendemall.com` | `` (root) |
| infra (Infrastructure) | `infra.sendemall.com` | `/infra` |

One Keycloak SSO across all three. `/register` and `/login` return HTTP 200 on all three hostnames — **self-serve signup is live**.

`sendemall-infra` (standalone repo) is the **internal, non-customer-facing** ops console. Its pricing files are byte-identical to `sendEmAll/services/infra/`; the monorepo copy is the deployed one.

### 2.2 LeadGen pricing — LIVE

Source of truth: `sendEmAll/services/core/src/modules/billing/catalog/catalog.service.ts:107-124`. This constant *is* the DB seed (upserted on every boot via `catalog-init.service.ts:17`).

| Plan | Price | Credits/month | $/credit |
|---|---|---|---|
| Starter | **$59/mo** | 25,000 | $0.00236 |
| Growth | **$79/mo** | 50,000 | $0.00158 |

Lines 146-149 deactivate every other plan on boot — these two are the entire live catalog.

**Confidence this is live:** `billing/stripe/stripe.service.ts:89-93` aborts backend boot if the Stripe price's `unit_amount` differs from `plan.priceInCents`. A running production backend is therefore proof Stripe charges 5900/7900.

### 2.3 Credit model — the strongest story we have

`sendEmAll/services/core/src/modules/billing/wallet/credit.constants.ts:27-33`:

| Operation | Cost | Billing basis |
|---|---|---|
| `VERIFIED_LEAD` | 1 credit | **per verified-VALID email delivered** |
| `OPEN_PROFILE` | 3 credits | per profile checked |
| `GOOGLE_ADS` | 1 credit | per domain answered |
| `META_ADS` | 1 credit | per domain answered |
| `TECH_STACK` | 1 credit | per domain detected |

Two facts worth building copy around:

- **You pay per valid result.** Invalid emails are not billed. The anchor comment reads "1 credit = 1 verified-VALID email delivered."
- **Scraping, email-finding, and verification are bundled at zero credits.** Only the five operations above meter.

Ads-detection and tech-stack enrichment are live capabilities the current site never mentions.

### 2.4 Infrastructure pricing — founder-set, NOT yet matching code

**Founder-specified pricing (2026-07-23) — this is what the site will publish:**

Fresh mailboxes, plus a **5% platform fee** (covers Stripe processing):

| Item | Price | Unit |
|---|---|---|
| Google Workspace / Microsoft 365 (official) | **$3.50** | per mailbox / month |
| MS Azure | **$30** | per **tenant/domain** / month |
| SMTP | **$1.50** | per mailbox / month |
| Domains | **at cost** | no margin |

Pre-warmed mailbox pricing is **TBD** — same per-unit figures proposed, not confirmed. Do not publish pre-warmed pricing until confirmed.

**⚠ The code does not implement these numbers.** `services/infra/src/services/mailboxRecommender/index.ts:3-13` currently has:

| Mailbox type | Code today | Founder intent | Delta |
|---|---|---|---|
| Google Workspace | $3.00/mailbox | $3.50/mailbox | price |
| Microsoft 365 (licensed) | $3.00/mailbox | $3.50/mailbox | price |
| MS Azure (`MS_SHARED`) | $2.00 **per mailbox** | $30 **per tenant/domain** | **billing unit** |
| Postal SMTP | $2.00/mailbox | $1.50/mailbox | price |
| Platform fee | none | +5% | **missing entirely** |

The Azure row is not a price change — it is a different billing unit. The code meters `MS_SHARED` per mailbox; the founder prices per tenant. A frontend mirror at `apps/web/src/app/containers/BuyMailboxes/index.tsx:227` hardcodes the same stale values.

**Consequence:** publishing the founder numbers today means the marketing page and Stripe checkout disagree. See §7.1a.

Domains (`services/infra/src/services/pricingQuote.ts`):

- **New domain:** live registrar price, **no markup** — pure cost pass-through (lines 119-137)
- **Pre-warmed domain reuse:** flat **$10**/domain (line 28)
- **Bring your own domain:** **free** (lines 89, 108)
- Pre-warmed mailboxes: **$5**/mailbox + **$10**/domain, one-time (`buy-mailboxes.service.ts:1044-1045`)

Infra **is** self-serve purchasable — the buy flow lives at `apps/web/src/app/containers/BuyMailboxes/` backed by real Stripe checkout.

> **BLOCKER — see §7.1.** Mailbox checkout uses `mode: 'payment'` (one-time) in all three paths. No code creates a recurring subscription for mailboxes. Publishing "/mo" advertises a charge the system does not currently make.

### 2.5 Sequencer — free, definitively

`services/core/src/modules/ai-campaigns/jobs/send-step.processor.ts:2108-2109` carries an explicit comment that cold-email sends are free and unmetered. There is no `EMAIL_SEND` credit operation, and the only paywall (`ScrapeBillingGate`) is mounted solely on the scrape surface. Campaigns, senders, inbox, and warmup have no gate.

### 2.6 What does NOT exist — do not publish

Each of these appears on the current site or in stale docs and is **false in code**:

| Claim on site | Reality |
|---|---|
| "100 free credits to start" | Both wallet balances `@default(0)`; no signup grant exists |
| "No credit card required" | Product is subscription-only; `ScrapeBillingGate`: "no plan → paywall" |
| Annual pricing toggle (`$112/$262/$449`) | `BillingInterval.MONTHLY` hardcoded; no annual interval exists |
| "PAYG overage: $0.05/credit" | `grantPurchased()` defined but never called — no packs, no PAYG |
| `$149 / $349 / $599` tiers | Deactivated on every boot |
| "50+ replies in 90 days" guarantee | No backing code; tied to retired bundles |
| Free trial | No `trial_period_days` anywhere in the tree |

Also absent: enterprise/custom tier (the over-quota path is an Intercom "contact us" prefill), and any domain markup.

### 2.7 Confidentiality guardrails

- **Mailbox-per-domain counts (3–5, or 50–100 for Azure) — OK to show (founder override 2026-07-24).** Presenting the per-domain mailbox count as setup/deliverability guidance is a value prop, not a leak. The `CLAUDE.md` "never expose the ratio" line is superseded for the *count*. What stays confidential: that **domains are shared across different customers** — never state or imply that.
- `porkbunPricing/index.ts:28-35` TLD prices are **deliberately inflated placeholders** for the suggest UI, recomputed live at purchase. Never publish them as a price list.
- Public keyword is **"warmup"**. "Smart Ramp-Up" is internal only.

---

## 3. Theme system

### 3.1 The problem, measured

The product estate is light. The landing is dark. A visitor crosses that seam at the moment of highest intent.

| Surface | Background | Source |
|---|---|---|
| Keycloak login | `#FAFAFB` page / `#FFFFFF` card | `packages/keycloak-theme/src/login/main.css:55-57` |
| scrape app | `#FAFAFB` (`sea-ink-50`) | `app/scrape/(app)/layout.tsx:39` |
| infra app | `gray-50` | `app/infra/(app)/layout.tsx:29` |
| sequencer app | `gray-50` | `components/Layout/AppLayout.tsx:225` |
| **landing (this repo)** | **`#0e0c0c`** | `src/styles/theme.css` |

No app has a theme toggle. `apps/web/tailwind.config.js:3` sets `darkMode: ['class']` and `globals.css:44-69` defines a `.dark` block, but **nothing ever applies the class** and there are zero `dark:` utilities in the tree — it is unreachable code.

### 3.2 The brand colors are a light/dark pair, not a conflict

The logo (`src/assets/images/sendemall-logo-dark.svg`) contains **both** purples: 8× `#D2B3F3` and 1× `#7D3CC2` — the app's brand violet. Measured WCAG contrast:

| Color | on `#FAFAFB` (light) | on `#0e0c0c` (dark) |
|---|---|---|
| Lavender `#D2B3F3` | **1.75:1** — unusable | 10.67:1 — excellent |
| Violet `#7D3CC2` | **6.11:1** — passes AA | 3.06:1 — fails AA body |

They are the same brand hue at two lightnesses. This resolves cleanly into one token:

```
--color-primary:  #7D3CC2   (light theme — matches the app exactly)
--color-primary:  #D2B3F3   (dark theme  — matches the logo and current site)
```

Every other accent (`#14B8A6` teal 2.49:1, `#F59E0B` amber 2.15:1, `#C8C1D4` body text 1.74:1) also fails on white and needs a light-theme counterpart. This is a palette design task, not a mechanical inversion.

### 3.3 Scope, honestly

This is not a config flag. Blockers found:

- **~250 hardcoded dark hex values** across components: `#C8C1D4` ×109, `#2A2433` ×64, `#1A191C` ×24, `#0e0c0c` ×24, plus `#D2B3F3` ×71
- **`src/styles/base.css` forces `text-white`** on every `h1`–`h6`, `b`, and `strong` — invisible on light
- **`src/styles/theme.css` uses a static `@theme inline` block** — values cannot swap per theme
- **Scrollbars hardcoded** `bg-white/5`
- **Logo has white fills** — needs a light variant, or `currentColor` conversion
- Tailwind 4 has no `darkMode` config here; it needs an explicit `@custom-variant`

### 3.4 Chosen approach: full token migration

**Decision: Option A — approved by founder 2026-07-23.** Light is the canonical brand (it matches the product and the login screen); dark is a fully-supported equal partner, honoring system preference with light as the default when no preference is expressed.

Resolution order for the active theme:

```
localStorage.theme ("light" | "dark")   →  wins if set
prefers-color-scheme: dark               →  dark
otherwise                                →  light   (default)
```

Rejected alternatives:

- **Light-only rebuild** — cheaper, but discards a dark design already paid for and forecloses the requested toggle.
- **Toggle on new sections only** — fastest, but yields a site that is half-dark and half-light depending on where you click. Worse than either pure option.

Implementation shape:

1. **Semantic tokens.** Replace raw palette values with intent-named CSS variables — `--surface-page`, `--surface-card`, `--text-primary`, `--text-muted`, `--border`, `--color-primary`. Define both themes; components reference only semantic names.
2. **Switching mechanism.** `data-theme="light|dark"` on `<html>`, with Tailwind 4 `@custom-variant dark (&:where([data-theme=dark] *))`. A `data-attribute` beats a class here because it expresses three states cleanly (`light`, `dark`, unset→system).
3. **Pre-paint script.** A tiny blocking inline script in `Head.astro` reads `localStorage.theme`, falls back to `matchMedia('(prefers-color-scheme: dark)')`, and stamps `data-theme` before first paint. This must be inline and synchronous — a deferred module would flash.
4. **Persistence.** `localStorage.theme` = `light` | `dark` | absent (follow system). Toggle cycles explicitly; absent means system.
5. **Toggle UI.** In `Header.astro`, beside the new Login link. Needs `aria-label` and `aria-pressed`.
6. **Logo.** Convert white fills to `currentColor` so a single asset works in both themes; keep the two brand purples fixed.
7. **Migration order.** Tokens and switching first, then global styles (`base.css`), then sections in traffic order (home → pricing → compare → products → services → blog).

Acceptance: every page renders correctly in both themes; no FOUC on hard reload in either; all text meets WCAG AA (4.5:1 body, 3:1 large); system-preference change with no stored choice updates live.

---

## 4. Landing overhaul

> **PIVOT — founder-confirmed 2026-07-25.** The earlier "three co-equal products / choose-your-path fork" model is **retired**. The landing leads with **one hero product: SendEmAll (`app.sendemall.com`)** — the end-to-end outbound product (find verified buyers → build campaigns → send). **"LeadGen" is not a product name and never appears in user-facing copy** (the code calls that surface "scrape" internally; users only ever see SendEmAll). Infrastructure (`infra.sendemall.com`) is a **strong secondary product** — some buyers want only mailboxes, so it earns a nav slot and its own page, but not hero billing. The free Sequencer (`sequencer.sendemall.com`) is a **trust/no-lock-in hook woven into the story** (sending included, free; or push to competitors), **not** a third menu item. The feature product pages (`email-finder`, `email-verification`, `email-warmup`, `cold-email`) **collapse into homepage sections** and their URLs redirect. This is the single source of truth; §4.1–4.3 below reflect it.

### 4.1 Core diagnosis

The nav is organized by **feature** (Email Finder, Email Warmup, Email Verification, Cold Email Platform) while the business sells one hero product plus an infrastructure add-on. Nothing on the page names SendEmAll as the product, no page links to the live app, and there is no Login link anywhere.

### 4.2 Information architecture

```
Logo | Product ▾ | Infrastructure | Pricing | Resources ▾ | [theme toggle] | Log in | [Create account →]
         └─ Product ▾ = how SendEmAll works: Find buyers · Verify emails · Build & send campaigns · Unified inbox
```

- **Product ▾** describes the SendEmAll app (`app.sendemall.com`) — its capabilities as sections/anchors, not separate product pages. Primary CTA everywhere → `app.sendemall.com/register`.
- **Infrastructure** → the revamped mailboxes/domains page → `infra.sendemall.com`. The one standalone secondary product page.
- **Resources ▾** absorbs Blog, Free Tools (deliverability test), Compare pages, Changelog, FAQ.
- **Log in** → `app.sendemall.com/login` (SSO routes the user to whichever surface they belong to).

The Sequencer is not a nav item — it appears inside the product story ("campaigns & sending, free") and the no-lock-in band.

### 4.3 Homepage sections

1. **Hero** — one-product 5-second test: *SendEmAll finds companies ready to buy, gets you verified contacts, and runs the campaign.* Primary CTA `Create your account` → `app.sendemall.com/register`; secondary `See pricing`. Keep the integrations marquee.
2. **The pipeline in one product** — find → build → send, framed as *one* SendEmAll flow (not three products to assemble). Each stage is a capability of the app.
3. **Find verified buyers** — scrape Apollo/SalesNav in-app, ICP targeting. Anchor claim: **you pay per verified-VALID email, not per reveal**; scraping/finding/verification bundled at zero credits.
4. **Build & send campaigns** — sequences, unified inbox, warmup — **included, free**. This is the sequencer, presented as part of the product.
5. **No lock-in band** — push leads and mailboxes to Instantly, Smartlead, PlusVibe, Lemlist, Woodpecker, EmailBison — or use ours free. The trust play.
6. **Need sending infrastructure? (secondary)** — mailboxes + domains, DNS done-for-you, warmup, from $1.50/mailbox → links to the Infrastructure page / `infra.sendemall.com`. Clearly the "and you'll need inboxes — we do that too" supporting act, not co-equal.
7. **Pricing preview** — SendEmAll $59/$79 + Infrastructure from $1.50 + Sequencer free; link to `/pricing`.
8. **Social proof** — real quotes only; slots stay empty until supplied. Never fabricate.
9. **FAQ** — 6-8 questions, `FAQPage` JSON-LD (already in `index.astro`; keep).
10. **Final CTA** — one strong close → `app.sendemall.com/register`.

### 4.4 Pricing page

Three independent surfaces, not one blended ladder:

- **LeadGen** — Starter $59/mo (25,000 credits), Growth $79/mo (50,000). Show the credit table so buyers can model spend. Over-quota → contact.
- **Infrastructure** — per-mailbox table ($2-$3), domains at cost, pre-warmed options. Pending §7.1 resolution on `/mo` phrasing.
- **Sequencer** — Free.

Remove: annual toggle, PAYG overage, free-credits claim, reply guarantee.

### 4.5 CTA and tracking rules

- Primary CTAs → `https://app.sendemall.com/register` (and per-product equivalents), labeled with the outcome, never generic "Get Started".

**CTA wording must not reinvent the free-tier claim.** There is no free trial and no signup credits (§2.6); the scrape product is subscription-only. What *is* genuinely free: creating an account, and the sequencer itself. Permitted labels:

| Surface | Label | Why it is true |
|---|---|---|
| Global / hero | `Create your account` | Registration is free; it does not promise product access |
| LeadGen | `See LeadGen pricing` / `Start scraping` | Routes to a paid product without implying free use |
| Infrastructure | `Buy mailboxes` | Accurate — it is a purchase |
| Sequencer | `Open sequencer — free` | Verified free and unmetered (§2.5) |

Banned: "Start free", "Free trial", "No credit card required", "Get started free" on any LeadGen or Infrastructure surface.
- **UTM propagation across the domain boundary.** `GlobalScripts.astro` already persists UTMs to `sessionStorage`, but `sessionStorage` does not cross to `app.sendemall.com`. Outbound app CTAs must append stored UTMs as query params so attribution survives the hop. Without this, every signup attributes to direct.
- Keep the free-leads lead magnet as a **secondary** path for not-ready visitors.
- Existing GA4 events (`cta_click`, `trackPageIntent`) continue to fire; add a `signup_click` event distinguishing app-bound CTAs from form CTAs.

---

## 5. SEO reality and route policy

### 5.0 ROOT CAUSE — a canonical loop is hiding ~100 pages from Google

**This is the highest-leverage finding in the audit.** The site is not losing a ranking contest; roughly 100 of its pages were never entered into one.

Verified chain, 2026-07-23:

```
sitemap-0.xml lists   https://sendemall.com/blog/apollo-alternatives-2026     (non-www)
that URL returns      307  →  https://www.sendemall.com/blog/apollo-...        (temporary!)
the www page returns  200
the www page declares <link rel="canonical" href="https://sendemall.com/blog/apollo-..."> (non-www)
                                    └── which redirects away again ──┘
```

Every one of the **105 URLs** in the sitemap behaves this way. Three compounding faults:

1. **The canonical tag points at a URL that redirects.** The declared canonical is never a 200 — it always bounces to the www host. Google receives a self-contradicting instruction about which URL is real.
2. **The redirect is 307 (temporary), not 301.** A temporary redirect explicitly tells Google *not* to consolidate signals onto the target.
3. **No sitemap is submitted in Search Console** — `list_sitemaps` returns empty.

Measured consequence: `https://sendemall.com/blog/apollo-alternatives-2026` and its www twin both report **"URL is unknown to Google."** Not deindexed. Never discovered. That matches the traffic data exactly — 49 of 50 blog posts have zero impressions in 90 days.

**Root cause in code:** `vercel.sh` builds with `--site "https://${VERCEL_PROJECT_PRODUCTION_URL}"`, which resolves to the apex `sendemall.com`, while Vercel serves and redirects to `www.sendemall.com`. Astro then stamps every canonical and sitemap entry with the apex host.

**Fix (Phase 0, before any content work):**

1. Build against the host that actually serves 200. Either pin the Astro `site` to `https://www.sendemall.com`, or flip Vercel so the apex serves directly and www redirects to it. Pick one host and make sitemap, canonical, and the 200-response all agree.
2. Change the host redirect from **307 to 301**.
3. Submit `sitemap-index.xml` in Search Console.
4. Re-inspect a sample of URLs after deploy to confirm discovery.

Nothing else in this spec will move organic traffic while this is broken. It is also cheap — a build-config change, a redirect status, and a sitemap submission.

### 5.1 Measured position (Search Console, 2026-04-23 → 2026-07-22)

**There is almost no organic equity to protect.** Ninety days of data:

- **47 total clicks sitewide.** 34 of them come from the single query `sendemall` — the brand name, at position 1, 60.7% CTR.
- **Zero non-brand commercial traffic.** Every other query is a brand typo (`send all`, `seamall`, `sinemall`, `sendall`) or unrelated noise (`sumall pricing`, `msgdeal`, `dcmall`).
- **No target keyword ranks at all** — nothing for "apollo scraper", "cold email infrastructure", "email finder", "sales navigator export", or "buy mailboxes".

Page-level, 90 days:

| Page | Impressions | Clicks | Avg position |
|---|---|---|---|
| `/` | 679 | 42 | 6.3 |
| `/faq` | 278 | 1 | 3.9 |
| `/pricing` | 202 | **0** | 4.2 |
| `/contact` | 194 | 0 | 13.7 |
| `/use-cases/consultants` | 138 | 0 | 8.2 |
| `/products/email-finder` | 38 | 0 | **1.3** |
| `/services/free-leads` | 38 | 0 | **1.3** |
| `/use-cases/startups` | 38 | 0 | **1.3** |

**Zero impressions in 90 days:** all four `/compare/*` pages, `/services/apollo-scraper`, `/services/sales-navigator-scraper`, `/services/custom-scraping`, `/services/cold-email-infrastructure`, `/tools/email-deliverability-test`.

Two readings worth acting on. `/pricing` holding position 4.2 across 202 impressions with **zero** clicks points at a title/meta problem or an intent mismatch, not a ranking problem. And pages sitting at position 1.3 with zero clicks are ranking for terms nobody wants.

**Strategic consequence:** organic is not an independent acquisition channel — it is a Reddit echo. People hear the name, then search it. Earlier framing of organic as "our durable channel" measured brand-navigational sessions in GA4, not discovery. The redesign should therefore optimize for **conversion of known-name visitors**, and treat non-brand SEO as a greenfield to be built, not an asset to be preserved.

### 5.2 Live 404s — fix in Phase 1

Google indexes and ranks four URLs that return 404. Verified by direct request 2026-07-23:

| Indexed URL | Status | Correct target | Impressions |
|---|---|---|---|
| `/privacy-policy` | **404** | `/privacy` | 5 |
| `/cookie-policy` | **404** | `/cookies` | 3 |
| `/terms-of-service` | **404** | `/terms` | 5 |
| `/contact-us` | **404** | `/contact` | (GA4 traffic) |

`vercel.json` currently contains exactly one redirect (`/sitemap.xml`). Add all four as 301s.

### 5.3 Duplicate content

`/tools/email-deliverability-test` and `/deliverability-test` **both return 200** and serve the same tool. Pick one canonical URL and 301 the other. Neither currently earns impressions, so choose on structure rather than equity — `/tools/email-deliverability-test` fits the Resources → Free Tools IA.

### 5.4 Route policy

Because equity is negligible, routes may be restructured. Redirects are still mandatory — they cost one line each and prevent regressions — but they no longer constrain the design.

**Routes that keep working** (redirect if moved, never silently drop):

```
/pricing  /blog/*  /faq  /about  /contact  /changelog  /developers
/compare/{instantly,apollo,clay,lemlist}
/products/{cold-email,email-warmup,email-verification,email-finder}
/services/{apollo-scraper,sales-navigator-scraper,custom-scraping,
           cold-email-infrastructure,free-leads}
/tools/email-deliverability-test
/use-cases/{saas,agencies,recruiters,consultants,startups}
```

Any restructure ships with a 301 map. Keep the deliverability test in nav under Resources → Free Tools — not because it earns search traffic (it earns none), but because it is a genuine no-signup value offer for referral and social traffic.

---

## 6. Out of scope

- PostHog integration (separate workstream)
- Ship Digest automation (separate workstream)
- Stripe Checkout Sessions migration for the calculator (tracked separately)
- Any change to the product apps themselves

---

## 7. Founder decisions required

### 7.1 BLOCKER — mailbox billing is one-time, advertised as monthly

All three mailbox checkout paths use Stripe `mode: 'payment'` (`buy-mailboxes.service.ts:168, :877, :1069`). The line item says *"First month — recurring billing starts next cycle"* (lines 860, 1006), but no code creates a subscription or recurring price for mailboxes — `stripeSubscriptionId` is only ever written by the scrape-plan webhook.

Publishing "$3/mailbox/month" promises a recurring charge the system does not make. Three ways out:

1. Implement recurring billing for mailboxes, then publish "/mo" truthfully.
2. Publish as one-time with explicit renewal language ("$3 per mailbox for the first month; renewal invoiced manually").
3. Publish a starting-price range and move exact terms behind the buy flow.

**Until this is resolved, the Infra pricing surface ships with option 2's phrasing.** This is a trust and chargeback risk, not a copy preference.

### 7.1a BLOCKER — published Infra prices will not match checkout

Founder pricing (§2.4) differs from `mailboxRecommender/index.ts` on every line, and on the Azure row it differs in *billing unit* (per-tenant vs per-mailbox). The 5% platform fee does not exist in code at all.

A visitor who reads "$3.50/mailbox + 5%" and is then charged $3.00 with no fee has caught us being wrong about our own prices — in the direction that looks like a bait-and-switch even though it favors them. The Azure mismatch is worse: someone buying 10 Azure mailboxes reads $30 and is charged $20, or reads per-tenant and is billed per-mailbox.

Resolution options, in order of preference:

1. **Update the code to match founder pricing** (`mailboxRecommender/index.ts` + the `BuyMailboxes/index.tsx:227` mirror + add the 5% fee), then publish exact numbers. Requires an `MS_SHARED` billing-unit change from per-mailbox to per-tenant.
2. **Publish "starting at" ranges** with exact totals shown only in the buy flow, until code catches up.
3. **Delay the Infra pricing surface**, shipping LeadGen and Sequencer pricing first.

**Default until resolved: option 2.** The Infra card shows "from $1.50/mailbox/month" and links to the calculator, which quotes real, code-derived totals.

### 7.2 Verify the paywall kill-switch before publishing paid prices

`NEXT_PUBLIC_SCRAPE_PAYWALL=off` (`ScrapeBillingGate.tsx:23`) makes the entire scrape product free fleet-wide. It is set nowhere in the repo and absent from `.env.example`. **Confirm the production Vercel env** before a page announces $59/$79.

### 7.3 Testimonials

Design slots exist; content stays placeholder until real quotes are supplied. Named customers will not be fabricated.

### 7.4 Stale docs worth correcting (not blocking)

- `leadgen/server/src/leadgen/core/billing.py:15` — docstring says "$39/25k or $59/50k". Code says $59/25k and $79/50k. Comment only, but it is the most likely thing to get copied by mistake.
- `sendEmAll/docs/specs/2026-06-10-billing-architecture.md` — superseded ($30/25k, $59/50k).
- `leadgen/server/tests/unit/test_credit_cost_parity.py:19-22` — points at a moved path, so its `skipif` always fires. The displayed-vs-charged credit-cost guard is silently dead. Costs happen to still match.

---

## 8. Risk register — fix before anything cosmetic

Ordered by exposure, not by effort. Items 1-3 are legal or confidentiality issues.

### 8.1 CONFIDENTIALITY LEAK — mailbox-per-domain ratio is public

`CLAUDE.md` states this must never be exposed. It is currently exposed in **six** places on `src/pages/[...lang]/services/cold-email-infrastructure.astro`, including inside the shipped client JS:

| Line | Exposure |
|---|---|
| 27, 39, 51 | `note: "3-5 mailboxes per domain"` — rendered as visible card copy at line 245 |
| 63 | `note: "100 mailboxes on 1 domain"` (Azure) |
| 91 | FAQ: *"Microsoft Azure gives you 100 mailboxes on a single domain for $70/month."* |
| 633 | `const MBX_PER_DOMAIN = 4` — **in the shipped bundle**, and surfaced in calculator output ("X mailboxes across Y domains", lines 734/742/750/759) |

Domain *sharing across customers* is not stated, but line 71 ("Domain rotation guidance") sits close enough to make the inference easy.

**Action:** strip all `note:` ratio strings, remove `MBX_PER_DOMAIN` from calculator output (show mailbox counts only, not domain counts), rewrite the Azure FAQ. Do this first — it is a live disclosure, not a copy preference.

### 8.2 LEGAL — competitor claims that are wrong or contractually exposed

Compare pages assert specific competitor pricing and features. Several look demonstrably false, and one creates vendor exposure:

| Location | Claim | Problem |
|---|---|---|
| `compare/apollo.astro:30, :48` | *"We use Apollo as one of our 18+ data sources"* | Publicly asserts redistribution of Apollo data. Apollo's ToS restricts this. **Vendor-agreement review required.** |
| `compare/lemlist.astro:29` | *"$29-49 per inbox for lemwarm… that is $435-735/mo just for warmup"* | Derived attack math built on a competitor price that may be stale (lemlist bundles lemwarm into plans). Highest-liability sentence on the site. |
| `compare/clay.astro:16, :42` | `$185/mo`, `$185-$800/mo` | Matches no published Clay tier. Rendered as a large red headline number opposite our own price. |
| `compare/instantly.astro:13, :16` | *"Email finder: No"*, *"BYO domains"* | Instantly ships a B2B Lead Finder and sells done-for-you domains. Reads as false, not merely stale. |
| `compare/apollo.astro:23` | *"Free tier with 50 credits/mo"* | Understates Apollo's free plan by roughly an order of magnitude. |
| `compare/apollo.astro:42` | `$49-$119/mo` | Omits that Apollo pricing is per-seat and annual-billed. |

**Action:** every competitor price and feature row must be re-verified against the vendor's live pricing page, dated, and cited — or deleted. Pull `lemlist.astro:29` and the Apollo resale claim immediately.

Also unsourced and likely invented, on use-case pages: *"Funded companies are 3x more likely to purchase"* (`saas.astro:60`, reused with a swapped noun at `consultants.astro:58`), *"2x more likely to explore options"* (`recruiters.astro:58`), *"respond 40% more"* (`recruiters.astro:60`). `recruiters.astro:87` also implies a live Glassdoor data feed. Source or cut.

### 8.3 Three shared components carry the same false claim to 13 pages

The identical string `"Start with 100 free credits. No credit card required."` — both halves false — lives in:

- `src/layouts/components/sections/ComparePage.astro:217` → 4 compare pages
- `src/layouts/components/sections/ProductPage.astro:196` → 4 product pages
- `src/layouts/components/sections/ServicePage.astro:182` → 5 service pages

`ComparePage.astro:102` additionally claims *"Everything included… for a single price"* — now three separately-billed products. All four compare pages hardcode `sendemallPrice="$149/mo"` and a `Reply guarantee` row citing the dead `Business`/`Scale` tiers.

**Three edits clear the false-credits claim from thirteen pages.** Highest leverage change in the content layer.

### 8.4 Wrong credit definition on a product page

`products/email-verification.astro:37` states *"1 credit = 1 verification"*. The real model bills **1 credit per verified-VALID email**. As written it says customers pay for invalid results — it makes the product sound worse than it is while also being false.

---

## 9. Page-by-page disposition

Twenty-five pages audited. Traffic column is Search Console impressions, 90 days.

### 9.1 Products → consolidate 4 into 2

| Page | Impressions | Real product | Disposition |
|---|---|---|---|
| `products/email-finder` | 38 | LeadGen | **MERGE TARGET** — becomes the LeadGen product page |
| `products/email-verification` | 0 | LeadGen | **MERGE** into email-finder, 301. Its one unique fact (line 37) is wrong |
| `products/cold-email` | 0 | Sequencer | **REWRITE** — page never says it is free, the strongest fact about it |
| `products/email-warmup` | 0 | ambiguous | **REWRITE** — warmup ships in both Infra and Sequencer; page never resolves which to buy. Three dead plan names |

Finder and verification describe one product and one credit; keeping them apart forces a distinction customers do not experience.

### 9.2 Services → one keeper, two rewrites, two decisions

| Page | Impressions | Disposition |
|---|---|---|
| `services/cold-email-infrastructure` | 0 | **REWRITE IN PLACE** — the only page describing a still-real product. 792 lines, working calculator, Product + FAQPage schema. Fix confidentiality leak, centralize the prices currently duplicated across 6 surfaces, add `infra.sendemall.com` CTA |
| `services/apollo-scraper` | 0 | **REWRITE** — keep URL for the head term; convert from "we deliver a CSV in 48h" agency framing to the self-serve app |
| `services/sales-navigator-scraper` | 0 | **REWRITE** — currently ~85% a find-and-replace of the Apollo page (duplicate-content risk). Legal-review line 166 ("we respect LinkedIn's terms", "we do not store your data beyond delivery" — likely false now) |
| `services/custom-scraping` | 0 | **FOUNDER DECISION** — bespoke agency offer outside the 3-product suite. Keep only if still sold; otherwise 301 to `/contact` |
| `services/free-leads` | 38 | **FOUNDER DECISION, HIGHEST URGENCY** — the "100 free" offer appears 9+ times and carries "No credit card required" (lines 38, 56). It is the CTA target of the homepage banner plus 4 service-page CTAs and 5 content sections. If the manual offer still runs, minimum fix is removing the card claim; if not, it must be redirected *and* all 9+ inbound links updated in the same change |

### 9.3 Use cases → 5 thin near-duplicates

No shared component; five copy-pasted files, 312-393 words each, 18-33% unique. `saas`, `recruiters`, and `consultants` share one skeleton and recycled SVG icons.

| Page | Impressions | Disposition |
|---|---|---|
| `use-cases/agencies` | 0 | **REWRITE → Infrastructure use case.** Highest commercial value; bulk mailboxes are a real agency wedge. Remove unverified white-label and volume-pricing claims |
| `use-cases/saas` | 0 | **REWRITE** — keep the signal taxonomy, drop the free-lead offer |
| `use-cases/startups` | 38 | **REWRITE — do not ship as-is.** Every number in "The Math" derives from the dead $149 price |
| `use-cases/consultants` | 138 | **MERGE/REDIRECT** — near-duplicate of saas with a swapped noun |
| `use-cases/recruiters` | 0 | **REWRITE or MERGE** — off-ICP; two invented stats and a Glassdoor dependency |

### 9.4 Compare → 4 prop bundles, all rewrite

All four are 40-line prop files for `ComparePage.astro`, ~500 rendered words. All carry `$149/mo`, the dead reply guarantee, and the false free-credits CTA. See §8.2 for per-page legal issues. **Keep all four URLs** — they target real head terms and are the cheapest future SEO wins once §5.0 is fixed.

### 9.5 Deliverability tool → consolidate onto the working page

The two routes are **not** duplicates of each other's content, but they are keyword cannibals: identical `<title>`, both self-canonical, neither `noindex`.

- `deliverability-test.astro` (1,720 lines) is a **fully working API-backed tool** — seed inboxes across 12+ providers, token-gated progressive disclosure, email-capture gate, and an AI email-rewrite feature no competitor free tool offers. **KEEP.** Fix only the CTA block (lines 486-518); line 517 packs three banned claims into one sentence.
- `tools/email-deliverability-test.astro` (189 lines) is a thin marketing wrapper that holds all the internal links and the genuinely good explainer prose at lines 163-166.

**Disposition:** move the wrapper's explainer content beneath the working tool, 301 `/tools/email-deliverability-test` → `/deliverability-test`, and update `menu.en.json:13` and `faq/english/-index.md:173`.

### 9.6 Blog and integrations

50 posts, 18 integration pages, **essentially all unknown to Google** (§5.0). No content action needed — fix the canonical loop and let them get discovered before judging them on performance. Re-measure 30 days after the fix.

---

## 10. Sequencing

**Phase 0 — Unblock indexing and stop live harm.** Fix the canonical loop (§5.0): pin one host, 301 instead of 307, submit the sitemap. Strip the confidentiality leak (§8.1). Pull the two liability claims (§8.2 — lemlist derived math, Apollo resale). Add the four 404 redirects (§5.2).

*Rationale: §5.0 is the only change that can move organic traffic at all, and it is cheap. §8.1 and §8.2 are live exposure. None of this depends on design.*

**Phase 1 — Truth.** Three shared-component edits (§8.3), correct LeadGen pricing to $59/$79, fix the credit definition (§8.4), remove every claim in §2.6, add the Login link, repoint CTAs at `/register`, add cross-domain UTM propagation.

**Phase 2 — Theme system.** Tokens, switching, pre-paint script, toggle, logo variant, then page migration in traffic order.

**Phase 3 — IA and content.** Nav restructure, homepage sections, pricing page, then the page dispositions in §9.

Phases 0 and 1 are small, high-value, and independent of the redesign. Phases 2 and 3 may run in either order or in parallel.

---

## 11. Analytics, experimentation & measurement (PostHog)

> **Founder directive 2026-07-25:** $50k PostHog credits secured. Make PostHog the measurement brain for the sprint so we can answer "why is the page not converting / what are people doing" as everything changes. Consolidate tools where redundant.

### 11.1 Tool decision

| Tool | Decision | Rationale |
|---|---|---|
| **PostHog** | **Primary.** Product analytics, session replay, funnels, heatmaps, feature flags, A/B experiments, web analytics. The tool we look at daily. | One platform for behavior + experiments + replay. Cross-domain identity landing→app is its sweet spot. Credits make it free for us. |
| **Microsoft Clarity** | **Retire** (once PostHog replay verified live). | PostHog session replay + heatmaps fully replace it. Removes a redundant third-party script and a second replay tool. |
| **GA4** | **Keep, frozen.** No new instrumentation. Sunset review ~2026-08-15 once PostHog is proven. | Free, gives the Google/acquisition view + GSC context; ripping it out on launch day adds risk for no gain. Drop on founder's word. |
| **Intercom** | Keep. | Support + identify, not analytics. Not in scope here. |

Net effect after this sprint: **PostHog + GA4 (frozen) + Intercom.** One fewer tool than today (Clarity gone), one clear primary.

### 11.2 The funnel we must see (the whole point)

The founder's question is "why isn't the landing converting." Answer requires one stitched funnel across the domain boundary:

```
land (www.sendemall.com)
  → view pricing / product sections
    → click "Create account"  (signup_click — the money event on the landing)
      → app.sendemall.com/register  (app-side PostHog, same project)
        → account created  (app identify → Keycloak id)
          → activated (first scrape / first campaign)
```

The landing owns the first three steps. Steps 4-6 are app-side. **Stitching requires the app and the landing to send to the SAME PostHog project with a cross-subdomain cookie.** See §11.5.

### 11.3 Event taxonomy (clean, funnel-first — no vanity events)

Auto: `$pageview`, `$pageleave`, autocapture (clicks/inputs). Custom high-signal events only:

| Event | Props | Fires when |
|---|---|---|
| `cta_click` | `location`, `label`, `destination` | any primary CTA clicked |
| `signup_click` | `location`, `plan?` | CTA to `app.sendemall.com/register` — **primary conversion** |
| `login_click` | `location` | CTA to `/login` |
| `pricing_viewed` | — | `/pricing` reached |
| `plan_selected` | `plan`, `price` | pricing plan CTA clicked |
| `infra_calculator_used` | `volume`, `recommendation`, `monthly_cost` | infra calculator produces a quote |
| `infra_order_click` | `provider`, `mailboxes`, `monthly_cost` | infra "order" CTA → infra app |
| `compare_viewed` | `competitor` | a `/compare/*` page reached |
| `deliverability_test_started` / `_completed` | — | free tool used (top-of-funnel magnet) |
| `deliverability_email_captured` | `email` (→ identify) | report email gate submitted |
| `faq_opened` | `question` | FAQ accordion opened |

The old GA4 event names (`generate_lead`, `form_submission`, etc.) are **not** carried over verbatim — this is a clean taxonomy. GA4 keeps firing its own legacy events untouched (frozen); PostHog is the new clean layer.

### 11.4 Consent (GDPR) — reuse existing geo gate

The site already computes a consent-required region via `cc_geo` (middleware `x-vercel-ip-country` + timezone fallback) driving `CookieConsent.astro`. PostHog plugs into the same flow:

- Init with `opt_out_capturing_by_default: true` in consent-required regions; capture only after `posthog.opt_in_capturing()` on consent grant.
- Non-consent regions: opt in on load.
- Exact pre-consent strategy (no-load vs `persistence: 'memory'` cookieless) chosen from the PostHog best-practices research; must mirror the existing GA4 Consent-Mode posture so the two tools behave consistently.
- Retiring Clarity also removes its consent branch — simpler CookieConsent.

### 11.5 Cross-subdomain identity (landing → app as one person)

- Landing PostHog init: `cross_subdomain_cookie: true` → cookie on `.sendemall.com`, so the anonymous `distinct_id` persists across `www.` → `app.`/`infra.`.
- App (same PostHog project) calls `posthog.identify(<keycloakId>)` on signup, aliasing the anonymous id → the real user. Funnel stitches automatically.
- **Verified 2026-07-25: the app has NO PostHog yet** — the landing is the first integration in the whole ecosystem. So cross-domain stitching is a **fast-follow**, not available today; the landing is fully instrumented standalone now and stitches automatically once the app adds PostHog on the same project with `cross_subdomain_cookie`.
- `distinct_id` contract (for the fast-follow): the app identifies users by **`profile.id` (user UUID)** — that's what it feeds Intercom (`IntercomProvider.tsx:65-82`), not the Keycloak `sub` and not email. The eventual app-side `posthog.identify()` must use `profile.id`. The landing stays anonymous pre-signup and never guesses an id; email captured at the deliverability gate is the practical pre-signup join key.
- **Clarity note:** the app *also* runs Microsoft Clarity (one project across all three surfaces, anonymous, no identify). True consolidation retires Clarity on both sides — **landing now, app as fast-follow.** Until then the app keeps Clarity; that's fine short-term.
- Landing↔`www` is a *separate domain* from the app's host-routed subdomains, so the shared `.sendemall.com` cookie must be set deliberately on both sides when the app integration lands.

### 11.6 A/B experiments (feature flags)

- Use PostHog experiments/feature flags. **First test: hero headline** (2 variants) once the new homepage is live and traffic returns.
- **Anti-flicker is mandatory on a landing page:** bootstrap flag values at init (server/inline) so the hero doesn't flash variant A then swap to B. Pattern from research; if bootstrap isn't clean for a static build, gate the varied element with a tiny `visibility:hidden` until `onFeatureFlags` resolves (kept to the single element under test, never the whole hero).
- Experiments are defined in the PostHog UI by the founder; the landing ships the flag-reading code + a documented list of flag keys.

### 11.7 Implementation shape

- `posthog-js` via npm, initialized in a small client script (loaded from `Base.astro`, after consent wiring). Key/host from `PUBLIC_POSTHOG_KEY` / `PUBLIC_POSTHOG_HOST` env — never hardcoded.
- A typed `src/lib/analytics/posthog.ts` wrapper (guards missing global, exposes `track(event, props)`, `identify`, `optIn/optOut`, `getFlag`) — mirrors the existing `tracking.ts` pattern so callers are trivial.
- Astro is MPA (full navigations) — confirm `$pageview` capture handles per-navigation correctly (research item 7); add manual capture if needed.
- **Session replay on**, with input masking for any email/PII fields.

---

## 12. Testing & verification plan (no claim ships unproven)

Founder directive: test critical parts for real — Playwright/browser, subagents, live probes — not by reasoning. Every item below produces evidence.

### 12.1 Build & static checks (every batch)

- `npm run build` clean (Node 22.20 path) — zero errors, note warnings.
- Grep built `dist/` for: banned words (`AI-powered`, `revolutionize`, `supercharge`, …), dead prices (`$149`, `$349`, `$599`), false claims (`100 free credits`, `no credit card`, `reply guarantee`, `50+ replies`), and the retired `LeadGen` product name in user-facing copy. **Zero hits required.**
- Link audit: no internal link to a redirected/deleted route without a 301; every `app.sendemall.com` CTA resolves; no `mailto`/`#` dead CTAs.

### 12.2 Playwright (critical interactive paths)

- **Theme:** toggle flips light↔dark, persists across reload (localStorage), no FOUC on hard reload in either theme, system-preference respected when unset. Screenshot both themes on home + pricing.
- **PostHog:** with a test key — `$pageview` fires on load; `signup_click` fires with correct props on the hero CTA; autocapture records a click. Confirm **no capture before consent** in a simulated `cc_geo` region, and capture **after** opt-in.
- **CTAs/routing:** every primary CTA navigates to the correct `app.sendemall.com/register|login` or internal page; the four legacy 301s resolve (post-deploy live probe).
- **Forms:** deliverability tool runs end-to-end (seed inboxes → result), email gate captures + fires `deliverability_email_captured` + identify.
- **Responsive:** mobile nav opens, three-group structure usable, no horizontal scroll on the body.

### 12.3 Third-party smoke (real, not assumed)

- PostHog: events land in the project (founder confirms in PostHog UI post-deploy, or verify via network panel that requests to the api_host return 200).
- GA4 (frozen): still fires (no regression from the theme/nav changes).
- Clarity: confirmed **removed** (no `clarity.ms` request in the network trace).

### 12.4 Post-deploy live probes

- `curl` canonical host + the 5 redirects → expect 200 on www pages, 301 on legacy paths.
- GSC: submit `sitemap-index.xml`; re-inspect 3 sample URLs → expect discovery status to change from "unknown."
- Lighthouse/LCP spot check on home + a heavy page (the deliverability tool) — flag regressions.

### 12.5 Content correctness (subagent adversarial pass)

- A subagent re-reads the shipped homepage, pricing, infra, and compare pages against §2 ground truth and §8 risk register — hunting for any surviving false claim, wrong price, banned word, or unverified competitor figure. Findings block the merge.

---

## 13. Sprint execution log & decisions (2026-07-24 → 25)

### 13.1 Cookie consent for PostHog — DECISION: keep geo-gating

Founder asked whether PostHog can load "nakedly" without the consent banner. Answer + decision:

- **For most traffic (US — where our traffic actually is), PostHog already loads with no banner.** The consent flow (`CookieConsent.astro`) only shows a banner in consent-required regions (`cc_geo`: EU/EEA/UK/CH/BR). Everyone else gets PostHog immediately.
- **For EU/UK, consent is legally required and we keep it.** The ePrivacy Directive requires opt-in for non-essential cookies; GDPR requires a lawful basis for processing personal data. **Session replay records user interactions and is explicitly high-risk personal data** — loading it in the EU without consent invites DPA complaints/fines. Removing EU gating is real legal exposure for little upside.
- **The only way to drop the EU banner** would be cookieless mode (`persistence: 'memory'`) **and disabling session replay** in the EU — still legally gray, and it forfeits replay (which we just adopted to replace Clarity). Not worth it.
- **Net:** the current geo-gated setup is optimal — nude PostHog worldwide, banner only where the law demands it. No change.

### 13.2 A/B experiments — capability shipped

- `src/lib/analytics/experiment.ts` reads PostHog feature flags and swaps `[data-ab="<key>"][data-ab-variant="…"]` elements; control renders by default (no flash). Initialized right after PostHog loads.
- To run a test: create an experiment in the PostHog UI with flag key = the `data-ab` value, variants = the `data-ab-variant` values, goal = a captured event (`signup_click` is the primary conversion). Then add the variant markup to the element under test.
- **Traffic caveat (honest):** at ~6 visitors/day, experiments won't reach significance for a long time. This is a *ready capability*, not an urgent lever — distribution (Reddit/social reactivation) has to come first for A/B testing to produce signal. Wire specific tests once traffic recovers.

### 13.3 Legal pages updated for accuracy (compliance)

The Terms and Privacy Policy described products we don't sell — a real compliance problem (binding terms for phantom plans/guarantees). Fixed:
- **Terms §3:** dead plans ($0/$149/$349/$599/Enterprise + PAYG overage) → **Starter $59/25k, Growth $79/50k**, infra from $1.50/mailbox, free sequencer; credit definition corrected to "1 credit = 1 verified-valid email; discovery/finding/verification included; sending free."
- **Terms §6:** "Reply Guarantee (Business/Scale)" → replaced with a true **"Free Sequencer & No Lock-In"** clause (keeps section numbering).
- **Terms §7 + changelog:** internal name **"Smart Ramp-Up" leaked → "warmup"** (public keyword).
- **Privacy:** removed Reply-Guarantee/dead-plan references; named actual subprocessors (Stripe, Google Analytics, PostHog, Intercom); cookie policy already updated (Clarity → PostHog).

### 13.4 Visual verification (Playwright, both themes + mobile) — 3 bugs found & fixed

Founder directive: verify substantial work flawlessly. Drove headless Chromium; found and fixed what grep/build could not:
1. Hero headline was `text-white` → washed out on light. Fixed → `text-heading` (near-black light / white dark). Verified `rgb(20,16,27)`.
2. **Nav links were hardcoded `text-white` in `navigation.css` → invisible on the light header.** Fixed → `text-heading`; badge → `text-on-primary`. Verified all nav links `rgb(20,16,27)` on light.
3. `$149/mo` false price baked into `dashboard-hero.svg` → "Growth plan · 50,000 credits/mo".
Theme toggle flips + persists, mobile clean, **0 console errors** both themes.

### 13.5 MCP-first / CLI positioning (for the copy phase)

Founder is shipping **MCP server + CLI** alongside the app (GTM-native, developer-first is a real trend). Fold into copy as a differentiator, not slop:
- A developer-facing section on the homepage and/or the Developers page: "GTM-native — drive SendEmAll from your terminal or your agent," with a real `curl`/CLI/MCP snippet.
- Keep it truthful about availability (mark "MCP + CLI" as shipping/soon per founder), and route to the Developers page.
- This strengthens the "one product, API-first" story and differentiates from click-only competitors.

### 13.6 Content source-of-truth rule

When writing/verifying any page's product claims (pricing, features, guarantees, competitor comparisons), **the `sendEmAll` monorepo is the source of truth** — verify against code, not marketing docs. Ask the founder when a claim can't be resolved from code (e.g., final infra pricing, testimonials, availability dates). Already applied to pricing ($59/$79), credit model, sequencer-free, infra pricing gap (§7.1a).

### 13.7 Premium components — remaining design pass

Founder flagged that the rebuild hand-built some sections instead of using the purchased Upstart section components (glass, animation, richer card treatments). Next design pass: re-express the homepage product story through the premium section components where they fit, keeping copy correct and load fast. The custom sections proved the content/IA; the polish pass upgrades the design vehicle.
