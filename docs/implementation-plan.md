# SendEmAll Marketing Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace React SPA with Astro + Tailwind 4 marketing site in `/Users/junaid/Desktop/sendemall/sendemall-landing/`

**Architecture:** Astro 5/6 static site, Tailwind CSS 4, TypeScript, Sora font, content collections for blog, zero-JS by default with islands for interactive components (accordion, mobile menu, credit calculator).

**Tech Stack:** Astro, Tailwind CSS 4, TypeScript

**Spec:** `docs/design-spec.md`

---

### Task 1: Project Scaffolding

**Files:**
- Delete: All existing React/Vite files (src/, vite.config.js, postcss.config.js, tailwind.config.js, eslint.config.js, package.json, package-lock.json)
- Preserve: `public/img/`, `public/favicon/`, `robots.txt`, `sitemap.xml`, `docs/`, `mockup-theme-preview.html`
- Create: New Astro project in same directory

- [ ] **Step 1: Back up assets worth keeping**

```bash
cd /Users/junaid/Desktop/sendemall/sendemall-landing
mkdir -p _backup
cp -r public/img _backup/img
cp -r public/favicon _backup/favicon 2>/dev/null || true
cp robots.txt _backup/ 2>/dev/null || true
cp docs/ _backup/ -r 2>/dev/null || true
cp mockup-theme-preview.html _backup/ 2>/dev/null || true
```

- [ ] **Step 2: Remove old React project files**

Remove everything except `_backup/`, `docs/`, `dist/`, `node_modules/`, `.git/`, `README.md`, `mockup-theme-preview.html`.

```bash
cd /Users/junaid/Desktop/sendemall/sendemall-landing
rm -rf src/ public/ favicon/ img/
rm -f vite.config.js postcss.config.js tailwind.config.js eslint.config.js
rm -f package.json package-lock.json index.html sitemap.xml robots.txt
rm -rf node_modules/
```

- [ ] **Step 3: Create new Astro project**

```bash
cd /Users/junaid/Desktop/sendemall/sendemall-landing
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

- [ ] **Step 4: Install dependencies**

```bash
npm install
npm install @astrojs/tailwind @astrojs/sitemap @astrojs/mdx
npm install tailwindcss @tailwindcss/typography
```

- [ ] **Step 5: Configure Astro**

Update `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://sendemall.com',
  integrations: [tailwind(), sitemap(), mdx()],
});
```

- [ ] **Step 6: Set up Tailwind CSS 4 config**

Create `src/styles/global.css` with full design token system from spec (colors, typography, spacing — all as Tailwind config, NO CSS custom properties for colors, use Tailwind's built-in system).

- [ ] **Step 7: Restore preserved assets**

```bash
cp -r _backup/img public/img
cp -r _backup/favicon public/favicon 2>/dev/null || true
cp _backup/mockup-theme-preview.html . 2>/dev/null || true
rm -rf _backup
```

- [ ] **Step 8: Add Sora font**

Add Google Fonts preconnect + stylesheet link in base layout head. Use `font-display: swap`.

- [ ] **Step 9: Verify build**

```bash
npm run dev
# Should show empty Astro site at localhost:4321
npm run build
# Should build successfully
```

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro + Tailwind 4 project, replace React SPA"
```

---

### Task 2: Base Layout + Navigation

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/MobileMenu.astro` (island)

- [ ] **Step 1: Create BaseLayout.astro**

Full HTML document with:
- `<!DOCTYPE html>`, lang="en"
- Head: charset, viewport, title (slot), meta description (slot), Sora font, global CSS, OG tags, GA/Clarity scripts, favicon
- Body: `<Nav />`, `<slot />`, `<Footer />`
- JSON-LD Organization structured data

- [ ] **Step 2: Create Nav.astro**

Sticky navigation:
- Logo SVG (inline or img from /public/img/)
- Desktop links: Solutions (dropdown), Pricing, Compare (dropdown), Developers, Blog
- CTA button: "Start Free" — lavender bg, dark text
- Glass effect: `backdrop-filter: blur(20px)` + white bg with opacity
- Dropdowns: simple CSS hover-triggered (no JS needed)
- Underline animation on hover: `transform: scaleX(0 → 1)`

- [ ] **Step 3: Create MobileMenu component**

Astro island (`client:load`) for hamburger menu:
- Hamburger icon → slide-in menu
- Same links as desktop
- Close on outside click

- [ ] **Step 4: Create Footer.astro**

4 columns: Product, Compare, Resources, Company
- Logo + tagline: "The complete outbound platform"
- Social links: Twitter, LinkedIn, GitHub (icon links)
- Copyright: "2026 SendEmAll"

- [ ] **Step 5: Create placeholder index page**

`src/pages/index.astro` — just BaseLayout with `<h1>SendEmAll</h1>` to verify layout works.

- [ ] **Step 6: Verify in browser and commit**

```bash
npm run dev
# Check nav, footer, layout at localhost:4321
git add -A
git commit -m "feat: add base layout with nav and footer"
```

---

### Task 3: Homepage — Hero + Cost Comparison

**Files:**
- Create: `src/components/home/Hero.astro`
- Create: `src/components/home/CostCompare.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Build Hero section**

- Trust badge: star rating + "Trusted by 200+ outbound teams"
- Headline: "Your $37/mo cold email tool **actually costs $600+**"
- Subtitle: one platform, one price, guarantee
- Two buttons: primary "Start Free — 100 Credits" + secondary "See the Math →"
- Animations: fadeInDown on badge, fadeInUp staggered on h1, subtitle, buttons

- [ ] **Step 2: Build CostCompare component**

Side-by-side: Stack Tax (6 items totaling $575+) vs SendEmAll ($149)
- Left: stacked items in gray-50 cards with names + prices
- Total in coral bg
- Right: large $149 with "Save 74%" teal badge
- Divider between columns
- NO gradients — solid colors only

- [ ] **Step 3: Wire into index.astro and verify**

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add hero section with cost comparison"
```

---

### Task 4: Homepage — Logo Bar + Problem Section

**Files:**
- Create: `src/components/home/LogoBar.astro`
- Create: `src/components/home/Problem.astro`
- Create: `src/components/ui/SectionHeader.astro`
- Create: `src/components/ui/BentoCard.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create SectionHeader reusable component**

Props: `label`, `labelColor` (lavender/teal/coral), `title`, `subtitle`
- Dot + uppercase label
- Large title
- Subtitle in gray-500

- [ ] **Step 2: Create BentoCard reusable component**

Props: `icon`, `iconColorClass`, `title`, `description`, `accentColor`
- Colored icon background
- Top accent bar on hover (3px, color varies)
- Shadow lift on hover

- [ ] **Step 3: Build LogoBar**

- Marquee scroll (CSS animation, no JS)
- Placeholder company names (6-8)
- Grayscale, subtle

- [ ] **Step 4: Build Problem section**

- SectionHeader: "The Problem" (coral), "The outbound stack is broken"
- 3 BentoCards in grid

- [ ] **Step 5: Verify and commit**

```bash
git add -A
git commit -m "feat: add logo bar and problem section with bento cards"
```

---

### Task 5: Homepage — Solution Pipeline + How It Works

**Files:**
- Create: `src/components/home/Pipeline.astro`
- Create: `src/components/home/HowItWorks.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Build Pipeline section**

- SectionHeader: "The Solution" (lavender), "18 providers. 4 stages. 1 pipeline."
- 4-stage grid: Discover → Qualify → Enrich → Personalize
- Each stage: colored number badge, title, provider list
- Connecting line (CSS border-top on parent ::before)
- Subtle bg (gray-50)

- [ ] **Step 2: Build HowItWorks section**

- SectionHeader: "How It Works" (teal), "Three steps. That's it."
- 3 centered step cards with large numbered circles
- Staggered scroll-in animation

- [ ] **Step 3: Add scroll animation utility**

Create `src/scripts/scroll-reveal.ts` — IntersectionObserver that adds `.visible` class.
Load as `<script>` in BaseLayout (not an island — vanilla JS, tiny).

- [ ] **Step 4: Verify and commit**

```bash
git add -A
git commit -m "feat: add pipeline visualization and how-it-works steps"
```

---

### Task 6: Homepage — Pricing Preview + Integration Bar

**Files:**
- Create: `src/components/home/PricingPreview.astro`
- Create: `src/components/ui/PricingCard.astro`
- Create: `src/components/home/IntegrationBar.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create PricingCard reusable component**

Props: `name`, `price`, `period`, `outcome`, `features[]`, `featured`, `cta`, `ctaHref`
- Plan name (uppercase label)
- Price (large)
- Outcome text in teal
- Feature list with lavender checkmarks
- Button (featured → lavender bg, others → subtle)
- "MOST POPULAR" badge on featured

- [ ] **Step 2: Build PricingPreview section**

- SectionHeader: "Pricing" (lavender), "Everything you need. Nothing you don't."
- 4 PricingCards: Trial / Pro / Business (featured) / Scale
- Link below: "See Full Pricing →" to /pricing

- [ ] **Step 3: Build IntegrationBar**

- Single-line section: "Already using Instantly, Smartlead, Woodpecker, or Lemlist?"
- Platform names in lavender
- Subtle, border-top/bottom

- [ ] **Step 4: Verify and commit**

```bash
git add -A
git commit -m "feat: add pricing preview cards and integration bar"
```

---

### Task 7: Homepage — Guarantee + Testimonials + Dev Teaser + FAQ + Final CTA

**Files:**
- Create: `src/components/home/Guarantee.astro`
- Create: `src/components/home/Testimonials.astro`
- Create: `src/components/home/DevTeaser.astro`
- Create: `src/components/home/FAQ.astro` (island for accordion)
- Create: `src/components/home/FinalCTA.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Build Guarantee section**

- Teal badge: "Reply Guarantee"
- Headline: "50+ replies in 90 days. Or we double your credits."
- Explanation text
- Two chips: Business +5,000 / Scale +15,000

- [ ] **Step 2: Build Testimonials section**

- 2-3 placeholder testimonial cards
- Name, title, company, quote, star rating
- Grid layout (2 or 3 columns)

- [ ] **Step 3: Build DevTeaser section**

- Headline: "Built for GTM engineers"
- 4 pills: REST API, MCP Server, Webhooks, CSV Import
- Styled code block (curl example)
- CTA: "Explore the API →"

- [ ] **Step 4: Build FAQ accordion (Astro island)**

Use `client:visible` for lazy loading.
7-8 questions about: managed infrastructure, credits, own platform, lead quality, reply guarantee, API, overage.
Accordion: click to expand/collapse, CSS transitions, chevron rotation.

- [ ] **Step 5: Build FinalCTA section**

- Headline: "Stop paying $600/mo for a Frankenstein stack."
- "100 free credits. No card required."
- Two buttons: "Start Free" + "Book a Demo"

- [ ] **Step 6: Wire all into index.astro, verify full homepage, commit**

```bash
git add -A
git commit -m "feat: complete homepage with all sections"
```

---

### Task 8: Pricing Page

**Files:**
- Create: `src/pages/pricing.astro`
- Create: `src/components/pricing/CreditTable.astro`
- Create: `src/components/pricing/PlanComparison.astro`
- Create: `src/components/pricing/CreditCalculator.astro` (island)
- Create: `src/components/pricing/PricingFAQ.astro` (island)

- [ ] **Step 1: Build credit system explanation**

Table: action → credits per action (discovery 5, signal 2, enrichment 5, verification 1, AI personalization 2, email send 0.1)

- [ ] **Step 2: Build expanded plan comparison**

Full feature comparison grid (all 4 plans) with expanded details vs homepage preview.
Monthly/Annual toggle (annual = 2 months free).
PAYG overage rates.

- [ ] **Step 3: Build credit calculator (island)**

Slider: "How many buyers per month?"
Dynamic calculation showing credits needed, recommended plan, cost per buyer.
`client:visible` island.

- [ ] **Step 4: Build enterprise section + pricing FAQ**

- [ ] **Step 5: Verify and commit**

```bash
git add -A
git commit -m "feat: add full pricing page with calculator"
```

---

### Task 9: Service Pages (4 pages)

**Files:**
- Create: `src/layouts/ServiceLayout.astro` (shared template)
- Create: `src/pages/solutions/lead-generation.astro`
- Create: `src/pages/solutions/email-infrastructure.astro`
- Create: `src/pages/solutions/ai-personalization.astro`
- Create: `src/pages/solutions/email-verification.astro`

- [ ] **Step 1: Create ServiceLayout template**

Shared structure: Hero → What's Included → How It Works → Providers → Pricing → CTA
Props: title, subtitle, features, steps, providers, pricing

- [ ] **Step 2: Build all 4 service pages**

Each with service-specific content from spec section 6.

- [ ] **Step 3: Verify and commit**

```bash
git add -A
git commit -m "feat: add 4 service pages with individual pricing"
```

---

### Task 10: Comparison Pages (4 pages)

**Files:**
- Create: `src/layouts/CompareLayout.astro` (shared template)
- Create: `src/pages/compare/instantly.astro`
- Create: `src/pages/compare/apollo.astro`
- Create: `src/pages/compare/clay.astro`
- Create: `src/pages/compare/lemlist.astro`

- [ ] **Step 1: Create CompareLayout template**

Shared structure: Hero → Feature Table → Cost Breakdown → Honest Assessment → Integration Fallback → CTA

- [ ] **Step 2: Build all 4 comparison pages**

Each with competitor-specific data from spec section 7.

- [ ] **Step 3: Verify and commit**

```bash
git add -A
git commit -m "feat: add 4 comparison pages (vs Instantly, Apollo, Clay, Lemlist)"
```

---

### Task 11: Remaining Pages

**Files:**
- Create: `src/pages/agencies.astro`
- Create: `src/pages/developers.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/contact.astro`
- Create: `src/pages/privacy.astro`
- Create: `src/pages/terms.astro`
- Create: `src/pages/cookies.astro`
- Create: `src/pages/changelog.astro`

- [ ] **Step 1: Build For Agencies page**
- [ ] **Step 2: Build Developers page** (API docs, MCP, webhooks, code examples)
- [ ] **Step 3: Build About + Contact pages**
- [ ] **Step 4: Build legal pages** (port existing content from current React app)
- [ ] **Step 5: Build Changelog page**
- [ ] **Step 6: Verify and commit**

```bash
git add -A
git commit -m "feat: add agencies, developers, about, contact, legal, changelog pages"
```

---

### Task 12: Blog Infrastructure

**Files:**
- Create: `src/content/config.ts` (content collection schema)
- Create: `src/content/blog/` (directory for .mdx posts)
- Create: `src/pages/blog/index.astro` (blog listing)
- Create: `src/pages/blog/[...slug].astro` (blog post template)
- Create: `src/layouts/BlogLayout.astro`
- Create: `src/content/blog/hello-world.mdx` (placeholder post)

- [ ] **Step 1: Define blog content collection schema**

Frontmatter: title, description, publishDate, author, image, tags, draft

- [ ] **Step 2: Build blog listing page**

Grid of post cards with title, excerpt, date, tags.

- [ ] **Step 3: Build blog post template**

Clean reading experience, @tailwindcss/typography prose, table of contents, social share links.

- [ ] **Step 4: Add placeholder post**

- [ ] **Step 5: Verify and commit**

```bash
git add -A
git commit -m "feat: add blog infrastructure with content collections"
```

---

### Task 13: SEO + Performance + Polish

**Files:**
- Create: `src/components/SEO.astro`
- Modify: All pages (add SEO component)
- Create: `public/robots.txt`
- Verify: `sitemap.xml` auto-generation

- [ ] **Step 1: Create SEO component**

Props: title, description, image, type, url
Outputs: meta tags, OG tags, Twitter cards, JSON-LD

- [ ] **Step 2: Add SEO to all pages**

- [ ] **Step 3: Add structured data**

Organization, Product, FAQ (on pricing + homepage), BreadcrumbList

- [ ] **Step 4: Add robots.txt**

- [ ] **Step 5: Verify sitemap generation**

- [ ] **Step 6: Add analytics scripts**

GA: G-4WT843MDLE, Clarity: v4wj62uut2 (in BaseLayout head)

- [ ] **Step 7: Run Lighthouse audit, fix any issues**

Target: 95+ on all metrics.

- [ ] **Step 8: Final commit**

```bash
git add -A
git commit -m "feat: add SEO, structured data, analytics, performance optimization"
```

---

## Implementation Order

Tasks 1-7 are the homepage (most critical). Tasks 8-13 build outward.

**Critical path:** 1 → 2 → 3 → 4 → 5 → 6 → 7 (working homepage)
**Then:** 8 (pricing) → 9 (services) → 10 (comparisons) → 11 (other pages) → 12 (blog) → 13 (SEO/polish)

Each task produces a working, committed increment. No task depends on a later task.
