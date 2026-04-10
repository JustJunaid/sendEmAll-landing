# SendEmAll Site Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the SendEmAll landing site from "cheaper tool consolidation" positioning to "signal-based outbound platform" with Products, Services, and Use Cases pages, Airtable form integration, and updated CTAs.

**Architecture:** This is a content-heavy rewrite of an existing Astro 6 + Tailwind CSS 4 site built on the Upstart template. Most work is creating new `.astro` page files and updating content markdown files. The site uses `getEntryCTM()` for content collections, `Base.astro` as the layout wrapper, and section components from `src/layouts/components/sections/`. Navigation is driven by `src/config/menu.en.json`. All new pages follow existing patterns: import Base, use getStaticPaths() for i18n, compose section components.

**Tech Stack:** Astro 6, Tailwind CSS 4, TypeScript, Content Collections (YAML frontmatter + markdown), Preline UI (dropdowns), AOS (animations)

**Key reference files:**
- Spec: `docs/superpowers/specs/2026-04-09-site-restructure-design.md`
- Existing page pattern: `src/pages/[...lang]/solutions/lead-generation.astro`
- Section components: `src/layouts/components/sections/`
- Content: `src/content/sections/english/`
- Nav config: `src/config/menu.en.json`
- Base layout: `src/layouts/Base.astro`
- Path aliases: `@/components/*` = `src/layouts/components/*`, `@/*` = `src/*`

**Important copy rules (from spec):**
- No em dashes anywhere. Use periods, commas, or line breaks.
- Use "warmup" not "Smart Ramp-Up" on landing page
- Use "Get Access" not "Get Early Access"
- Lead with outcomes, not features
- Numbers and specificity everywhere
- StoryBrand: visitor is the hero, SendEmAll is the guide

---

## Phase 1: Foundation (Navigation + Shared Components + Homepage)

### Task 1: Update Navigation Config

**Files:**
- Modify: `src/config/menu.en.json`

This task restructures the entire navigation from Solutions/Compare to Products/Services/Use Cases.

- [ ] **Step 1: Read the current menu config**

Read `src/config/menu.en.json` to understand the full current structure including footer menus.

- [ ] **Step 2: Rewrite the menu config**

Replace the entire `main` menu array with the new structure. Keep footer menus but update them. The nav structure must be:

```
Products v | Services v | Use Cases v | Pricing | [Get 100 Free Potential Buyers]
```

Products dropdown items:
- Cold Email Platform -> /products/cold-email
- Email Warmup -> /products/email-warmup
- Email Verification -> /products/email-verification
- Email Finder -> /products/email-finder
- Email Deliverability Test -> /tools/email-deliverability-test

Services dropdown items:
- Apollo Scraper -> /services/apollo-scraper
- Sales Navigator Scraper -> /services/sales-navigator-scraper
- Custom Scraping -> /services/custom-scraping
- Cold Email Infrastructure -> /services/cold-email-infrastructure
- Free Leads -> /services/free-leads

Use Cases dropdown items:
- For SaaS Companies -> /use-cases/saas
- For Agencies -> /use-cases/agencies
- For Recruiters -> /use-cases/recruiters
- For Consultants -> /use-cases/consultants
- For Startups -> /use-cases/startups

Footer updates:
- Remove Agencies from footerMenuQuickLink (replaced by /use-cases/agencies)
- Add Compare pages to footerMenuResources: vs Instantly, vs Apollo, vs Clay, vs Lemlist
- Keep Developers in footer quick links

- [ ] **Step 3: Update the nav CTA button**

Read `src/layouts/components/global/header/NavigationButton.astro` and update the button label from "Try It Free" to "Get 100 Free Potential Buyers" and URL to "/services/free-leads".

If the button text/URL comes from `config.toml`, update it there instead and regenerate config.generated.json via `node scripts/toml-watcher.mjs`.

- [ ] **Step 4: Build and verify navigation renders**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && npm run build
```

Verify no build errors. The new nav items will show as links to pages that don't exist yet (that's fine).

- [ ] **Step 5: Commit**

```bash
git add src/config/menu.en.json src/layouts/components/global/header/NavigationButton.astro
git commit -m "Restructure navigation: Products, Services, Use Cases dropdowns

Replace Solutions/Compare nav with Products/Services/Use Cases.
Move Compare pages to footer. Update nav CTA to lead magnet."
```

---

### Task 2: Create Airtable Form Component

**Files:**
- Create: `src/layouts/components/widgets/AirtableForm.astro`

A reusable component that embeds an Airtable form with dark theme styling. It accepts a form URL prop and renders in an iframe or as a link.

- [ ] **Step 1: Read the existing form component for patterns**

Read `src/layouts/components/sections/ContactSection.astro` to understand how existing forms are styled and structured in this codebase.

- [ ] **Step 2: Create the AirtableForm component**

Create `src/layouts/components/widgets/AirtableForm.astro`:

```astro
---
interface Props {
  formUrl: string;
  height?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
}

const { formUrl, height = "600px", title, description, ctaLabel } = Astro.props;
---

<div class="airtable-form-wrapper">
  {title && (
    <div class="text-center mb-8">
      <h3 class="text-2xl font-bold text-white mb-3" set:html={title} />
      {description && <p class="text-gray-400 max-w-xl mx-auto">{description}</p>}
    </div>
  )}
  <div class="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
    <iframe
      src={formUrl}
      width="100%"
      height={height}
      style="background: transparent; border: none;"
      loading="lazy"
      title={title || "Form"}
    />
  </div>
  <noscript>
    <p class="text-center text-gray-400 mt-4">
      JavaScript is required to load this form.
      <a href={formUrl} target="_blank" rel="noopener" class="text-primary underline">
        Open form directly
      </a>
    </p>
  </noscript>
</div>
```

Note: The actual Airtable form URLs will be provided by the user when they set up the Airtable base. Use placeholder URLs for now (e.g., `https://airtable.com/embed/FORM_A_ID`, `FORM_B_ID`, `FORM_C_ID`). These will be configured in `config.toml` later.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/components/widgets/AirtableForm.astro
git commit -m "Add reusable AirtableForm component for lead capture"
```

---

### Task 3: Rewrite Homepage Content

**Files:**
- Modify: `src/content/sections/english/home-banner.md`
- Modify: `src/content/sections/english/features-section.md`
- Modify: `src/content/sections/english/why-us.md`
- Modify: `src/content/sections/english/call-to-action.md`
- Modify: `src/content/faq/english/-index.md`
- Modify: `src/pages/[...lang]/index.astro`

- [ ] **Step 1: Read all current homepage content files**

Read these files to understand their exact frontmatter structure:
- `src/content/sections/english/home-banner.md`
- `src/content/sections/english/features-section.md`
- `src/content/sections/english/why-us.md`
- `src/content/sections/english/call-to-action.md`
- `src/content/faq/english/-index.md`
- `src/pages/[...lang]/index.astro`

- [ ] **Step 2: Rewrite home-banner.md**

Update the hero section with the new signal-based positioning:
- title: "What if you only emailed people who were already **looking to buy?**"
- description: "Most outbound is a guessing game. We track real buying behaviour to find companies actively looking for what you sell, reach their decision makers, and hand you a pipeline ready to close."
- Primary button: "Get 100 Qualified Potential Buyers. Free." -> /services/free-leads
- Secondary button: "See How It Works" -> #how-it-works
- Keep the existing dashboard-hero.svg image
- Keep the customer logos marquee

- [ ] **Step 3: Rewrite features-section.md (Old Way vs New Way)**

Update to the "Cold email is broken. Here's why." comparison:
- subtitle: "The Problem"
- title: "Cold email is **broken.** Here's why."
- 4 list items comparing Old Way vs SendEmAll Way (static lists vs live signals, blind outreach vs buying behaviour, volume-first vs precision-first, 5+ tools vs one platform)

- [ ] **Step 4: Rewrite why-us.md (How It Works)**

Update to the 4-step flow from the spec:
- subtitle: "How It Works"
- title: "From ICP to closed deal. **Four steps.**"
- Step 1: You describe your buyer
- Step 2: We find who's ready to buy
- Step 3: We reach their decision makers
- Step 4: You hit send, manage replies, and close
- CTA: "Get 100 Qualified Potential Buyers. Free." -> /services/free-leads

- [ ] **Step 5: Rewrite call-to-action.md (Final CTA)**

Update to:
- title: "Stop emailing strangers. Start **closing buyers.**"
- CTA label: "Get My Free Potential Buyers" -> /services/free-leads
- Features: "100 signal-qualified leads", "Matched to your ICP", "Delivered in 48 hours"

- [ ] **Step 6: Update the homepage index.astro**

Read the current `src/pages/[...lang]/index.astro` and update:
- metaTitle and metaDescription with new positioning
- Reorder sections: Hero -> Problem -> How It Works -> Signal Explainer -> Signals Showcase -> Platform Preview -> Pricing -> Reply Guarantee -> Works With Stack -> Testimonials -> Developer Teaser -> FAQ -> Final CTA
- Add new inline sections for: Signal+Intent Explainer (3 cards), What We Monitor (signal grid), Platform Preview (4 product cards)
- Move reply guarantee section right after pricing
- Update all CTA URLs from app.sendemall.com/signup to /services/free-leads or Airtable form

Note: Some new homepage sections (Signal Explainer, Signals Showcase, Platform Preview) will need to be coded inline in index.astro since they don't have corresponding section components. Follow the pattern used by the existing "How It Works" and "Developer Teaser" inline sections.

- [ ] **Step 7: Rewrite FAQ content**

Update `src/content/faq/english/-index.md` with all 22 questions from the spec. Organize into categories: "About the platform", "About existing tools", "About the free offer", "About pricing and services", "About deliverability and warmup", "About data and compliance".

- [ ] **Step 8: Update pricing section in index.astro**

Update the pricing section inline content in index.astro:
- Add "Signal-qualified buyers" row, "AI-personalized campaigns", "Email verification", "Managed domains + DNS", "Warmup" as "Included" in all tiers
- Add value framing below: "What you'd pay separately: $600-$2,800+/mo. SendEmAll: $149-$599/mo."
- Change CTA buttons from signup to "Get Access" (link to /services/free-leads or form)
- Add note: "Platform launching soon. Reserve your spot."

- [ ] **Step 9: Build and verify**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && npm run build
```

Fix any build errors (watch for MDX issues with `<` or `{}`).

- [ ] **Step 10: Commit**

```bash
git add src/content/sections/english/ src/content/faq/ src/pages/
git commit -m "Rewrite homepage: signal-based positioning

New hero, Old Way vs New Way problem section, 4-step How It Works,
signal explainer, pricing reframe, 22-question FAQ, updated CTAs."
```

---

## Phase 2: Product Pages

### Task 4: Create Product Page Template Component

**Files:**
- Create: `src/layouts/components/sections/ProductPage.astro`

A reusable component for all 4 product pages. Follows the template: Hero -> Problem -> Features -> Social Proof -> FAQ -> CTA.

- [ ] **Step 1: Read the existing ServicePage component**

Read `src/layouts/components/sections/ServicePage.astro` to understand the pattern for full-page section components.

- [ ] **Step 2: Create ProductPage.astro**

Create `src/layouts/components/sections/ProductPage.astro` that accepts props for:
- hero (headline, subheadline)
- problem (title, description)
- features (array of {title, description, icon?})
- socialProof (stat or testimonial)
- faq (array of {title, content})
- ctaLabel, ctaUrl
- differentiator (text explaining signal-based advantage)

Structure it using existing Tailwind classes and dark theme patterns from the site. Use AOS animations. Include two "Get Access" CTAs (hero and bottom).

- [ ] **Step 3: Commit**

```bash
git add src/layouts/components/sections/ProductPage.astro
git commit -m "Add ProductPage template component for product landing pages"
```

---

### Task 5: Create 4 Product Pages

**Files:**
- Create: `src/pages/[...lang]/products/cold-email.astro`
- Create: `src/pages/[...lang]/products/email-warmup.astro`
- Create: `src/pages/[...lang]/products/email-verification.astro`
- Create: `src/pages/[...lang]/products/email-finder.astro`

- [ ] **Step 1: Create the products directory**

```bash
mkdir -p /Users/junaid/Desktop/sendemall/sendEmAll-landing/src/pages/\[...lang\]/products
```

- [ ] **Step 2: Create cold-email.astro**

Follow the spec for /products/cold-email. Use the ProductPage component. Props:
- Hero: "Cold email that doesn't feel cold."
- Problem: Generic sequences, no personalization, no signal context
- Features: Multi-step sequences, A/B testing, smart scheduling, lead management, unified inbox, campaign analytics
- Differentiator: Signal-qualified leads feed directly into campaigns
- CTA: "Get Access" -> /services/free-leads
- metaTitle: "Cold Email Platform | SendEmAll"
- metaDescription from spec

- [ ] **Step 3: Create email-warmup.astro**

Props:
- Hero: "Send from day one. Land in the inbox from day one."
- Problem: New domains/mailboxes land in spam. Manual warmup takes weeks.
- Features: Gradual volume ramp-up, automated engagement network, deliverability monitoring, DNS/blacklist alerts, reputation scoring
- Differentiator: Included free in every plan (competitors charge $15-$49/inbox/mo)
- CTA: "Get Access" -> /services/free-leads
- metaTitle: "Email Warmup Tool | SendEmAll"

- [ ] **Step 4: Create email-verification.astro**

Props:
- Hero: "Never send to a dead address again."
- Problem: Bounces destroy sender reputation. Catch-all domains waste credits.
- Features: Multi-layer SMTP validation, catch-all detection, disposable email filtering, bulk list cleaning, real-time API
- Differentiator: Built into the pipeline, not a separate CSV import/export tool
- CTA: "Get Access" -> /services/free-leads
- metaTitle: "Email Verification Tool | SendEmAll"

- [ ] **Step 5: Create email-finder.astro**

Props:
- Hero: "Company name in. Decision maker's verified email out."
- Problem: You know the company but not who to email.
- Features: Domain to decision maker, name + domain to verified email, 8 pattern permutations, waterfall enrichment, bulk processing
- Differentiator: Find the RIGHT person based on buying signals
- CTA: "Get Access" -> /services/free-leads
- metaTitle: "Email Finder Tool | SendEmAll"

- [ ] **Step 6: Build and verify all 4 pages**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/pages/\[...lang\]/products/
git commit -m "Add 4 product pages: cold email, warmup, verification, finder

Each page targets standalone tool keywords for SEO.
All CTAs point to lead capture form (Get Access)."
```

---

## Phase 3: Service Pages

### Task 6: Create Service Page Components and Pages

**Files:**
- Create: `src/pages/[...lang]/services/apollo-scraper.astro`
- Create: `src/pages/[...lang]/services/sales-navigator-scraper.astro`
- Create: `src/pages/[...lang]/services/custom-scraping.astro`
- Create: `src/pages/[...lang]/services/cold-email-infrastructure.astro`
- Create: `src/pages/[...lang]/services/free-leads.astro`

- [ ] **Step 1: Create the services directory**

```bash
mkdir -p /Users/junaid/Desktop/sendemall/sendEmAll-landing/src/pages/\[...lang\]/services
```

- [ ] **Step 2: Create apollo-scraper.astro**

Full landing page per spec. Hero: "The Apollo Scraper That Actually Delivers Clean Data."
Content sections: What we extract, what makes us different, how it works, volume capabilities.
CTA: "Get 100 Free Leads" -> /services/free-leads
Secondary: "Need ongoing scraping? Talk to us." -> Airtable Form B
metaTitle: "Apollo Scraper | Export and Enrich Apollo Leads | SendEmAll"

- [ ] **Step 3: Create sales-navigator-scraper.astro**

Hero: "LinkedIn Sales Navigator Data. Extracted, Verified, Delivered."
Content per spec. Include compliance note.
CTA: "Get 100 Free Leads" -> /services/free-leads
metaTitle: "LinkedIn Sales Navigator Scraper | SendEmAll"

- [ ] **Step 4: Create custom-scraping.astro**

Hero: "Any data source. Any format. We handle it."
Content per spec. Use cases examples.
CTA: Airtable Form B inline or link
metaTitle: "Custom Data Scraping Service | SendEmAll"

- [ ] **Step 5: Create cold-email-infrastructure.astro**

Hero: "Cold Email Infrastructure That Actually Lands in the Inbox."
Three tiers: Self-serve mailboxes (Stripe links), Pre-warmed mailboxes (Stripe links), Managed setup (+$0.50/account).
Pricing table with GW, Microsoft, SMTP options. Use placeholder prices ($X/mo) that the user will fill in.
CTA: "Buy Mailboxes" (Stripe placeholder links) + "Need custom setup? Talk to us" (Form B)
metaTitle: "Cold Email Infrastructure | Mailboxes, Domains, DNS Setup | SendEmAll"

- [ ] **Step 6: Create free-leads.astro (Lead Magnet Landing Page)**

Hero: "Get 100 qualified potential buyers. Free. Matched to your ICP."
Content explaining what makes these different from Apollo exports.
Embed Airtable Form A (4 fields: Work Email, Company, ICP description, Volume dropdown).
Use the AirtableForm component created in Task 2.
metaTitle: "Get 100 Free Signal-Qualified Leads | SendEmAll"

- [ ] **Step 7: Build and verify all 5 pages**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && npm run build
```

- [ ] **Step 8: Commit**

```bash
git add src/pages/\[...lang\]/services/
git commit -m "Add 5 service pages: Apollo scraper, Sales Nav scraper, custom scraping, infrastructure, free leads

Dedicated SEO pages for high-volume keywords.
Infrastructure page has Stripe placeholder links.
Free leads page embeds Airtable lead magnet form."
```

---

## Phase 4: Use Cases + Tools + Compare Rewrites

### Task 7: Create Use Case Pages

**Files:**
- Create: `src/pages/[...lang]/use-cases/saas.astro`
- Create: `src/pages/[...lang]/use-cases/agencies.astro`
- Create: `src/pages/[...lang]/use-cases/recruiters.astro`
- Create: `src/pages/[...lang]/use-cases/consultants.astro`
- Create: `src/pages/[...lang]/use-cases/startups.astro`

- [ ] **Step 1: Create the use-cases directory**

```bash
mkdir -p /Users/junaid/Desktop/sendemall/sendEmAll-landing/src/pages/\[...lang\]/use-cases
```

- [ ] **Step 2: Create all 5 use case pages**

Each follows the template from the spec: Hero (industry-specific) -> Problem -> How SendEmAll Solves It -> Example Pipeline -> Testimonial -> CTA.

Use the same page structure as product pages but with industry-specific content. All CTAs: "Get 100 Free Potential Buyers" -> /services/free-leads.

Create each file per the spec:
- saas.astro: "Outbound for B2B SaaS. Find companies already evaluating your category."
- agencies.astro: "Scale Client Outbound Without Scaling Your Team." (replaces /agencies)
- recruiters.astro: "Find Passive Candidates Who Are Actually Open to Moving."
- consultants.astro: "Fill Your Pipeline Without Cold Calling."
- startups.astro: "Your First 100 Customers. On a Founder's Budget."

- [ ] **Step 3: Build and verify**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/\[...lang\]/use-cases/
git commit -m "Add 5 use case pages: SaaS, agencies, recruiters, consultants, startups

Industry-specific landing pages targeting cold email for [industry] keywords."
```

---

### Task 8: Create Email Deliverability Test Page

**Files:**
- Create: `src/pages/[...lang]/tools/email-deliverability-test.astro`

- [ ] **Step 1: Create the tools directory**

```bash
mkdir -p /Users/junaid/Desktop/sendemall/sendEmAll-landing/src/pages/\[...lang\]/tools
```

- [ ] **Step 2: Create email-deliverability-test.astro**

Hero: "Free Email Deliverability Test. See Where Your Emails Actually Land."
Content per spec: what we check, how it works, why it matters.
Primary CTA: Link to the existing public deliverability test tool in the SendEmAll app (the URL will need to be confirmed by the user).
Secondary CTA: "Fix your deliverability issues. Get Access to SendEmAll." -> Form C
metaTitle: "Free Email Deliverability Test | SendEmAll"

- [ ] **Step 3: Build and verify**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/\[...lang\]/tools/
git commit -m "Add free email deliverability test page

SEO target: email deliverability test. Links to existing public tool."
```

---

### Task 9: Rewrite Compare Pages

**Files:**
- Modify: `src/pages/[...lang]/compare/instantly.astro`
- Modify: `src/pages/[...lang]/compare/apollo.astro`
- Modify: `src/pages/[...lang]/compare/clay.astro`
- Modify: `src/pages/[...lang]/compare/lemlist.astro`

- [ ] **Step 1: Read one existing compare page**

Read `src/pages/[...lang]/compare/instantly.astro` to understand the current structure and ComparePage component props.

- [ ] **Step 2: Rewrite all 4 compare pages**

For each page:
- Change metaTitle to "Best [Competitor] Alternative for Cold Email (2026) | SendEmAll"
- Rewrite the opening from price-fight to signal-intelligence positioning
- Update features array to emphasize signal-based value, not just pricing
- Update theyDoBetter/weDoBetter arrays per spec
- Update CTA from signup to "Get 100 Qualified Potential Buyers" -> /services/free-leads
- Add integrationNote where applicable ("We use Apollo as one of our 18+ data sources")

- [ ] **Step 3: Build and verify**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/\[...lang\]/compare/
git commit -m "Rewrite compare pages: Best [Brand] Alternative positioning

Signal-intelligence framing instead of price-fight. Updated CTAs."
```

---

## Phase 5: Cleanup + Polish

### Task 10: Delete Old Pages and Update Remaining Pages

**Files:**
- Delete: `src/pages/[...lang]/solutions/lead-generation.astro`
- Delete: `src/pages/[...lang]/solutions/email-infrastructure.astro`
- Delete: `src/pages/[...lang]/solutions/ai-personalization.astro`
- Delete: `src/pages/[...lang]/solutions/email-verification.astro`
- Delete: `src/pages/[...lang]/agencies.astro`
- Modify: `src/pages/[...lang]/pricing.astro`
- Modify: `src/pages/[...lang]/developers.astro`

- [ ] **Step 1: Delete old solution pages and agencies page**

```bash
rm /Users/junaid/Desktop/sendemall/sendEmAll-landing/src/pages/\[...lang\]/solutions/lead-generation.astro
rm /Users/junaid/Desktop/sendemall/sendEmAll-landing/src/pages/\[...lang\]/solutions/email-infrastructure.astro
rm /Users/junaid/Desktop/sendemall/sendEmAll-landing/src/pages/\[...lang\]/solutions/ai-personalization.astro
rm /Users/junaid/Desktop/sendemall/sendEmAll-landing/src/pages/\[...lang\]/solutions/email-verification.astro
rm /Users/junaid/Desktop/sendemall/sendEmAll-landing/src/pages/\[...lang\]/agencies.astro
```

Also remove the solutions directory if empty:
```bash
rmdir /Users/junaid/Desktop/sendemall/sendEmAll-landing/src/pages/\[...lang\]/solutions/ 2>/dev/null
```

- [ ] **Step 2: Update pricing page CTAs**

Read and modify `src/pages/[...lang]/pricing.astro`:
- Change all CTA buttons from signup URL to "Get Access" linking to /services/free-leads
- Add "Platform launching soon. Reserve your spot." note
- Update metaTitle if needed

- [ ] **Step 3: Update developers page CTA**

Read and modify `src/pages/[...lang]/developers.astro`:
- Change CTA from signup to "Get API Access" -> /services/free-leads or Form C

- [ ] **Step 4: Build and verify**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && npm run build
```

Verify page count is correct (old pages removed, new pages added).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Delete old solutions/agencies pages, update pricing and developer CTAs

Removed 5 old pages. Updated remaining page CTAs to form-based capture."
```

---

### Task 11: Update Testimonials and Blog CTAs

**Files:**
- Modify: `src/content/sections/english/testimonial.md`
- Modify: Blog template CTA (find the component that renders CTAs in blog posts)

- [ ] **Step 1: Update testimonials**

Read `src/content/sections/english/testimonial.md`. Update any testimonials that reference old positioning ("replaced Apollo, Instantly, Clay" stack-consolidation messaging). Reframe around outcomes: reply rates, meetings booked, pipeline generated.

- [ ] **Step 2: Find and update blog CTA component**

Search for the component that renders CTAs in blog posts. This might be in the blog single template (`src/pages/[...lang]/blog/[single].astro`) or in a shared component. Update the default CTA from app.sendemall.com/signup to /services/free-leads with "Get 100 Free Potential Buyers" label.

- [ ] **Step 3: Build and verify**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/content/sections/english/testimonial.md src/pages/ src/layouts/
git commit -m "Update testimonials and blog CTAs to new positioning

Outcome-focused testimonials. Blog CTAs point to lead magnet."
```

---

### Task 12: Update config.toml and Regenerate

**Files:**
- Modify: `src/config/config.toml`

- [ ] **Step 1: Read current config.toml**

Read `src/config/config.toml` to find any references to old positioning, signup URLs, or taglines that need updating.

- [ ] **Step 2: Update config.toml**

Update:
- Site tagline/description if it references old positioning
- Any default CTA URLs
- Navigation button config if it's controlled from here

- [ ] **Step 3: Regenerate config.generated.json**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && node scripts/toml-watcher.mjs
```

- [ ] **Step 4: Final build**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && npm run build
```

Verify the total page count matches expectations. Expected: ~30+ pages (4 products + 5 services + 5 use cases + 1 tool + 4 compare + pricing + developers + about + contact + terms + privacy + cookies + changelog + blog index + blog posts + integration pages).

- [ ] **Step 5: Commit**

```bash
git add src/config/
git commit -m "Update site config for signal-based positioning"
```

---

## Phase 6: Exit Intent Popups (Future)

### Task 13: Add Exit Intent Popup Component

**Note:** This task is lower priority and can be deferred. Exit intent popups require JavaScript and should be added after the core pages are live and tested.

**Files:**
- Create: `src/layouts/components/widgets/ExitIntentPopup.astro`
- Modify: `src/layouts/Base.astro`

- [ ] **Step 1: Create ExitIntentPopup component**

A lightweight component that detects mouse leaving the viewport (desktop) or back-button intent (mobile). Shows different offers based on page context per the spec's exit intent table.

Props: `offer` (string), `formUrl` (string), `linkUrl` (string)

- [ ] **Step 2: Add to Base.astro**

Import and render ExitIntentPopup in Base.astro, passing page-context props.

- [ ] **Step 3: Build and verify**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/layouts/components/widgets/ExitIntentPopup.astro src/layouts/Base.astro
git commit -m "Add exit intent popup with context-aware offers"
```

---

## Phase 7: Validation + Airtable Setup

### Task 14: Airtable Base Setup

**Note:** This is done in Airtable's UI, not in code. Document the steps for the user.

- [ ] **Step 1: Create Airtable base "SendEmAll Leads"**

Create a new Airtable base with 3 tables:

**Table 1: Lead Magnet Requests (Form A)**
Fields:
- Work Email (email, primary)
- Company Name (single line text)
- Ideal Customer Description (long text)
- Monthly Volume (single select: "Just testing (100)", "500-1,000", "1,000-5,000", "5,000+")
- Status (single select: "New", "Scraping", "Delivered", "Converted", "Nurture")
- Submitted At (created time)
- CSV Attachment (attachment)
- Notes (long text)

**Table 2: Service Requests (Form B)**
Fields:
- Work Email (email, primary)
- Company Name (single line text)
- What Do You Need (long text)
- Website (URL)
- Status (single select: "New", "Quoted", "In Progress", "Delivered")
- Submitted At (created time)
- Notes (long text)

**Table 3: Product Interest (Form C)**
Fields:
- Work Email (email, primary)
- Company Name (single line text)
- Products Interested (multiple select: "Cold Email Platform", "Email Warmup", "Email Verification", "Email Finder", "Everything")
- Current Outbound Tool (single line text)
- Status (single select: "New", "Contacted", "Demo'd", "Waiting for Launch")
- Submitted At (created time)
- Notes (long text)

- [ ] **Step 2: Create 3 Airtable forms**

For each table, create a form view:
- Form A: Title "Get 100 Qualified Potential Buyers", submit button "Get My Free Potential Buyers"
- Form B: Title "Service Request", submit button "Submit Request"
- Form C: Title "Get Access to SendEmAll", submit button "Get Access"

Copy the embed URLs for each form.

- [ ] **Step 3: Set up automations**

For each table:
- When record created -> Send email to team (hello@sendemall.com)
- When record created -> Send confirmation email to the submitter
- Daily at 9am -> If any records with Status "New", send digest email

- [ ] **Step 4: Update Airtable form URLs in the codebase**

Replace all placeholder Airtable URLs (`https://airtable.com/embed/FORM_A_ID` etc.) in:
- `src/pages/[...lang]/services/free-leads.astro`
- `src/pages/[...lang]/services/custom-scraping.astro`
- `src/pages/[...lang]/services/cold-email-infrastructure.astro`
- Any other page using the AirtableForm component

- [ ] **Step 5: Commit**

```bash
git add src/pages/
git commit -m "Update Airtable form URLs with production embed links"
```

---

### Task 15: Content Audit and Validation

**Files:**
- All content files and page files

- [ ] **Step 1: Audit for em dashes**

Search entire codebase for em dashes (—) and en dashes (–) in content:

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && grep -rn '[—–]' src/content/ src/pages/ --include='*.md' --include='*.mdx' --include='*.astro' | head -50
```

Replace all instances with periods, commas, or restructured sentences.

- [ ] **Step 2: Audit for "Smart Ramp-Up" references**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && grep -rni 'smart.ramp' src/content/ src/pages/ --include='*.md' --include='*.mdx' --include='*.astro'
```

Replace all landing page instances with "warmup". Keep "Smart Ramp-Up" only if it appears in in-app UI references.

- [ ] **Step 3: Audit for old signup URLs**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && grep -rn 'app.sendemall.com/signup' src/ --include='*.md' --include='*.mdx' --include='*.astro'
```

Replace all with /services/free-leads or appropriate form destination.

- [ ] **Step 4: Verify FAQ schema**

Check that `src/pages/[...lang]/index.astro` still generates FAQPage JSON-LD schema from the updated 22-question FAQ. The existing schema generation in `src/lib/utils/JsonLdGenerator.ts` should still work since FAQ data structure hasn't changed, just the content.

- [ ] **Step 5: Build final validation**

```bash
cd /Users/junaid/Desktop/sendemall/sendEmAll-landing && npm run build
```

Count pages in output. Expected approximately:
- Homepage: 1
- Products: 4
- Services: 5
- Use Cases: 5
- Tools: 1
- Compare: 4
- Other: pricing, developers, about, contact, terms, privacy, cookies, changelog = 8
- Blog: index + 50 posts + pagination
- Integrations: index + 18 individual pages
- Total: ~95+ pages

- [ ] **Step 6: Commit any audit fixes**

```bash
git add -A
git commit -m "Content audit: remove em dashes, enforce warmup keyword, update old URLs"
```

---

## Summary

| Phase | Tasks | New Pages | Key Deliverable |
|-------|-------|-----------|-----------------|
| 1: Foundation | 1-3 | 0 | Nav restructure + homepage rewrite |
| 2: Products | 4-5 | 4 | Product landing pages |
| 3: Services | 6 | 5 | Service pages + lead magnet + Stripe |
| 4: Use Cases + Tools | 7-9 | 6 + 4 rewrites | Use cases + deliverability tool + compare rewrites |
| 5: Cleanup | 10-12 | -5 deleted | Old pages removed, CTAs updated, config synced |
| 6: Exit Intent | 13 | 0 | Popup component (deferrable) |
| 7: Validation | 14-15 | 0 | Airtable setup + content audit |

**Total new pages:** ~15 new + 4 rewritten + 5 deleted = net +14 pages
**Estimated commits:** 18
**Dependencies:** Task 14 (Airtable setup) requires user to create the Airtable base first. Task 6 (infrastructure page) requires user to provide actual Stripe product links and mailbox pricing. Task 8 (deliverability test) requires user to confirm the public tool URL. Task 16 requires Airtable API key and base/table IDs.

---

## Phase 8: Post-Launch (Forms, Placeholders, Visual QA)

> **Status:** NOT STARTED. All tasks below are the remaining work after the signal-based positioning rewrite shipped.

### Task 16: Replace Airtable Iframe with Custom HTML Forms

**Why:** Airtable iframes break GTM/GA attribution tracking. UTM parameters, referrer, and session data cannot be passed into an iframe. This means we lose all attribution on form submissions — we can't tell which channel, campaign, or page drove the conversion.

**Solution:** Replace the `AirtableForm.astro` iframe component with custom HTML forms that POST to Airtable's API via a lightweight serverless function (Cloudflare Worker or Astro API route). Hidden fields capture UTMs from the URL and pass them with the submission.

**Files:**
- Modify: `src/layouts/components/widgets/AirtableForm.astro` (replace iframe with custom form)
- Create: `src/layouts/components/widgets/LeadMagnetForm.astro` (Form A — 4 fields)
- Create: `src/layouts/components/widgets/ServiceRequestForm.astro` (Form B — 4 fields)
- Create: `src/layouts/components/widgets/ProductInterestForm.astro` (Form C — 4 fields)
- Create: API endpoint for form submission (Cloudflare Worker or `src/pages/api/form-submit.ts`)
- Modify: Pages that embed AirtableForm (swap to new components)

**Pages using forms:**
- `src/pages/[...lang]/services/free-leads.astro` — Form A (lead magnet)
- `src/pages/[...lang]/services/custom-scraping.astro` — Form B (service request)
- `src/pages/[...lang]/services/cold-email-infrastructure.astro` — Form B (service request)
- Any future pages using Form C (product interest/waitlist)

- [ ] **Step 1: Set up Airtable API access**

User action: Get the Airtable Personal Access Token and note the Base ID and Table IDs for all 3 tables created in Task 14. Store the token as an environment variable (`AIRTABLE_API_KEY`).

- [ ] **Step 2: Create the form submission API endpoint**

Create a serverless endpoint (Vercel Serverless Function recommended since the site deploys to Vercel, or an Astro SSR API route) that:
1. Accepts POST with JSON body (form fields + UTM params)
2. Validates required fields (work email, company name)
3. POSTs to Airtable API (`https://api.airtable.com/v0/{baseId}/{tableId}`)
4. Returns success/error JSON response
5. Handles CORS if the worker is on a different subdomain

Environment variables needed:
- `AIRTABLE_API_KEY` — Personal Access Token
- `AIRTABLE_BASE_ID` — Base ID from Airtable
- `AIRTABLE_TABLE_LEAD_MAGNET` — Table ID for Form A
- `AIRTABLE_TABLE_SERVICE_REQUEST` — Table ID for Form B
- `AIRTABLE_TABLE_PRODUCT_INTEREST` — Table ID for Form C

- [ ] **Step 3: Create LeadMagnetForm.astro (Form A)**

Custom HTML form with these fields:
- Work Email (email input, required)
- Company Name (text input, required)
- Describe Your Ideal Customer (textarea, required)
- Monthly Email Volume (select: "Just testing (100)", "500-1,000", "1,000-5,000", "5,000+")

Hidden fields (auto-populated via JS from URL params):
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `referrer` (document.referrer)
- `landing_page` (window.location.href)
- `submitted_at` (ISO timestamp)

Styling: Match existing dark theme (rounded-2xl, border-border-light, bg-theme-dark). Use Tailwind classes consistent with the rest of the site. Add client-side validation, loading state on submit button, success/error messages.

- [ ] **Step 4: Create ServiceRequestForm.astro (Form B)**

Fields:
- Work Email (email input, required)
- Company Name (text input, required)
- What Do You Need? (textarea, required)
- Website (URL input, optional)

Same hidden UTM fields and styling as Form A.

- [ ] **Step 5: Create ProductInterestForm.astro (Form C)**

Fields:
- Work Email (email input, required)
- Company Name (text input, required)
- Products Interested In (multi-select checkboxes: "Cold Email Platform", "Email Warmup", "Email Verification", "Email Finder", "Everything")
- Current Outbound Tool (text input, optional)

Same hidden UTM fields and styling as Form A.

- [ ] **Step 6: Replace AirtableForm embeds on all pages**

Update each page to import and use the new form components instead of AirtableForm:
- `free-leads.astro`: Replace `<AirtableForm formUrl="...FORM_A_ID" ...>` with `<LeadMagnetForm />`
- `custom-scraping.astro`: Replace with `<ServiceRequestForm />`
- `cold-email-infrastructure.astro`: Replace with `<ServiceRequestForm />`

- [ ] **Step 7: Add UTM capture script**

Create a small client-side script (can be inline in the form components or a shared `src/scripts/utm-capture.ts`) that:
1. On page load, reads UTM params from `window.location.search`
2. Stores them in `sessionStorage` (persists across page navigations within the session)
3. On form render, populates hidden fields from `sessionStorage`

This ensures UTMs are captured even if the user navigates to the form page from a different page.

- [ ] **Step 8: Test end-to-end**

1. Build the site: `npm run build`
2. Test form submission locally (use Airtable API with test base)
3. Verify UTM params flow through: visit `/?utm_source=test&utm_medium=email` -> navigate to /services/free-leads -> submit form -> check Airtable record has UTM fields
4. Verify success/error states render correctly
5. Verify the form works without JavaScript (noscript fallback: link to Airtable form directly)

- [ ] **Step 9: Commit**

```bash
git add src/layouts/components/widgets/ src/pages/ src/scripts/
git commit -m "Replace Airtable iframe forms with custom HTML forms

Custom forms POST to Airtable API via serverless endpoint.
Hidden UTM fields enable full GTM/GA attribution tracking.
Three form variants: lead magnet, service request, product interest."
```

---

### Task 17: Fill Placeholder Values

**Why:** Several pages shipped with placeholder values that need real data before going live.

**Files:**
- Modify: `src/pages/[...lang]/services/cold-email-infrastructure.astro`
- Modify: `src/pages/[...lang]/tools/email-deliverability-test.astro`

- [ ] **Step 1: Infrastructure page — Stripe links and pricing**

User action: Create Stripe products/checkout links for each mailbox tier:
- Google Workspace mailbox — `$X/mo` (replace placeholder)
- Microsoft 365 mailbox — `$X/mo`
- Custom SMTP mailbox — `$X/mo`
- Pre-warmed mailbox — `$X/mo`

Update `cold-email-infrastructure.astro`:
- Replace all `$X/mo` placeholders with actual prices
- Replace all `https://buy.stripe.com/PLACEHOLDER_*` URLs with real Stripe checkout links

- [ ] **Step 2: Deliverability test — confirm tool URL**

User action: Confirm the public URL for the email deliverability test tool. Currently set to `https://app.sendemall.com/deliverability-test`.

If the URL is different, update `email-deliverability-test.astro`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/
git commit -m "Fill placeholder prices, Stripe links, and tool URLs"
```

---

### Task 18: Visual QA on Deployed Site

**Why:** The site was built and pushed but never visually reviewed on the live URL. Responsive design, animations, form embeds, and navigation dropdowns need manual verification.

- [ ] **Step 1: Desktop QA (1440px+)**

Check every page in the navigation. Verify:
- Hero sections render correctly (headline, subheadline, CTA buttons)
- Feature grids are evenly spaced
- Pricing table aligns properly
- FAQ accordions open/close
- Navigation dropdowns (Products, Services, Use Cases) open on hover/click
- Footer links all resolve to correct pages
- All images load (check for broken image references)
- AOS animations fire on scroll

- [ ] **Step 2: Mobile QA (375px)**

Check the same pages on mobile width. Verify:
- Hamburger menu works
- Dropdown menus work inside mobile nav
- No horizontal scroll overflow
- Text doesn't overflow containers
- Buttons are tappable (min 44px height)
- Forms are usable on mobile

- [ ] **Step 3: Link audit**

Run a broken link checker on the deployed site:
```bash
npx broken-link-checker https://sendemall.com --ordered --recursive
```

Fix any broken internal links (especially old /solutions/* URLs that might still be referenced somewhere).

- [ ] **Step 4: Fix issues and commit**

```bash
git add -A
git commit -m "Fix visual QA issues from post-deploy review"
```

---

### Task 13 (Deferred): Exit Intent Popups

**Status:** Low priority. Implement after Tasks 16-18 are complete and the site is stable.

See the original Task 13 above for the implementation plan. The exit intent popup should show different offers based on page context:
- Homepage/Use Cases: "Get 100 free potential buyers" (Form A)
- Product pages: "Free deliverability test" (tool link)
- Service pages: "Talk to us about your project" (Form B)
- Pricing page: "Not sure which plan? Get 100 free leads first" (Form A)

---

## Updated Summary

| Phase | Tasks | Status | Key Deliverable |
|-------|-------|--------|-----------------|
| 1: Foundation | 1-3 | DONE | Nav restructure + homepage rewrite |
| 2: Products | 4-5 | DONE | Product landing pages |
| 3: Services | 6 | DONE | Service pages + lead magnet + Stripe |
| 4: Use Cases + Tools | 7-9 | DONE | Use cases + deliverability tool + compare rewrites |
| 5: Cleanup | 10-12 | DONE | Old pages removed, CTAs updated, config synced |
| 6: Exit Intent | 13 | DEFERRED | Popup component (low priority) |
| 7: Validation | 14-15 | PARTIAL | Airtable setup (user action) + content audit done |
| **8: Post-Launch** | **16-18** | **NOT STARTED** | **Custom forms, placeholders, visual QA** |

**Next up for developer:** Task 16 (custom forms) is the highest priority remaining task. It requires the Airtable base from Task 14 to be set up first.
