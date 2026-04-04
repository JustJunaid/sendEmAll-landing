# SendEmAll Marketing Site — Design Spec

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current React SPA with an Astro-based, SEO-optimized, multi-page marketing site that positions SendEmAll as the all-in-one outbound platform with true cost transparency.

**Tech Stack:** Astro 5/6, Tailwind CSS 4, TypeScript, Sora font, zero-JS-by-default (islands only where needed)

---

## 1. Positioning & Copy Strategy

### Core Message (5-second test)
"Your $37/mo cold email tool actually costs $600+/mo. We fixed that."

Visitor understands immediately: (a) there's a hidden cost problem, (b) SendEmAll solves it.

### Market Positioning
Blue ocean: the gap between cheap DIY tools ($25-99/mo — Apollo, Instantly, Lemlist) and expensive AI SDRs ($900-10K/mo — 11x, AiSDR, Artisan). Nobody does guided self-serve in the middle with managed infrastructure included.

**"The Cursor of Outbound"** — AI plans it, human approves, platform executes. This is the product vision that the landing page should convey through the 3-step plan and the onboarding narrative.

### Unit Economics (for copy accuracy)
- Cost per enriched lead: ~$0.07 blended
- Cost per email send: ~$0.003 (GW) to ~$0.004 (Postal)
- 1 contacted buyer = ~7.5 credits (discover 5 + signal 2 + enrich 5 + verify 1 + personalize 2 + send ~0.5 = ~15.5, but not every lead converts to contact, so ~7.5 effective)
- GW reseller cost: $2.50-3.00/mailbox/month (already set up)
- $149/mo plan = ~60% margin after infra costs

### StoryBrand Framework
1. **Character** — Founder/SDR/agency running outbound
2. **Problem** — External: 5+ tools costing $600+. Internal: feeling overwhelmed, wasting money. Philosophical: outbound shouldn't require an engineering degree.
3. **Guide** — SendEmAll (empathy: "we built what we wished existed"; authority: 18 providers, signal-qualified leads, managed infra)
4. **Plan** — 3 steps: Describe buyer → We build pipeline → Launch & watch replies
5. **Call to Action** — "Start Free — 100 Credits" (direct), "See the Math" (transitional)
6. **Success** — 50+ replies in 90 days, one tool replaces five, infra you don't maintain
7. **Failure** — Keep paying $600+/mo for a Frankenstein stack with <1% reply rates

### Copy Rules
- No "AI-powered", "revolutionize", "cutting-edge", "game-changing"
- Numbers everywhere: $600+, 50+ replies, 90 days, 18 providers, $0.07/lead, 74% savings
- Specific pain > vague "challenges"
- Short sentences. Active voice. Second person ("you", not "users").

---

## 2. Design System

### Mode
Dark theme — using the purchased Upstart Astro template as the design foundation. Lavender (#D2B3F3) pops naturally on dark backgrounds and matches the existing logo (lavender circle on dark). Keep the natural feel of the Upstart theme — don't fight against it. Adapt our palette to work within the dark context. Architecture should support palette swapping via CSS custom properties for potential light mode later.

### Colors

**Primary: Lavender**
| Token | Hex | Usage |
|-------|-----|-------|
| lavender-50 | #FAF5FF | Tinted backgrounds |
| lavender-100 | #F3EAFC | Badge backgrounds, icon backgrounds |
| lavender-200 | #E8D5FA | Light borders, subtle fills |
| lavender-300 | #D2B3F3 | **Primary buttons, nav CTA, featured borders** |
| lavender-400 | #B896E8 | Button hover states |
| lavender-500 | #9B6DD4 | Section labels, icon colors |
| lavender-600 | #7C3AED | Stronger accents, headings |
| lavender-700 | #6D28D9 | Deep accents |

**Secondary: Teal**
| Token | Hex | Usage |
|-------|-----|-------|
| teal-100 | #CCFBF1 | Success badge backgrounds |
| teal-300 | #94E9E6 | Secondary accents |
| teal-500 | #14B8A6 | Outcome text ("~200 buyers reached"), guarantee badges |
| teal-600 | #0D9488 | Deeper success states |

**Accent: Coral** (urgency/problems)
| Token | Hex | Usage |
|-------|-----|-------|
| coral-100 | #FFE4DE | Problem card icon background |
| coral-400 | #F97066 | Problem indicators |
| coral-500 | #EF4444 | "Stack Tax" total, price anchoring |

**Accent: Amber** (attention/stars)
| Token | Hex | Usage |
|-------|-----|-------|
| amber-100 | #FEF3C7 | Star badge backgrounds |
| amber-400 | #FBBF24 | Star ratings, highlights |

**Accent: Blue** (info/developer)
| Token | Hex | Usage |
|-------|-----|-------|
| blue-100 | #DBEAFE | Developer section icon bg |
| blue-500 | #3B82F6 | Links, code accents |

**Neutrals**
| Token | Hex | Usage |
|-------|-----|-------|
| gray-50 | #FAFAFA | Subtle backgrounds, card fills |
| gray-100 | #F5F5F5 | Section alternation |
| gray-200 | #E5E5E5 | Borders, dividers |
| gray-400 | #A3A3A3 | Muted text, placeholders |
| gray-500 | #737373 | Secondary body text |
| gray-600 | #525252 | Body text |
| gray-900 | #171717 | Headings, primary text |

### Gradients & Visual Effects
Follow Upstart's natural design language. If the template uses subtle gradients, glows, or depth effects that look good — keep them. Don't artificially strip effects that make the theme look premium. The rule is: no cheap/gaudy gradients (rainbow buttons, neon backgrounds), but sophisticated dark-theme effects (subtle glows, ambient orbs, glass-morphism) are fine if they're what makes Upstart look good.

### Typography
- **Font:** Sora (Google Fonts, weights 300-800)
- **Hero headline:** 56-64px, weight 800, letter-spacing -2.5px, line-height 1.06
- **Section headlines:** 40-44px, weight 700, letter-spacing -1.5px, line-height 1.12
- **Card titles:** 18-20px, weight 700, letter-spacing -0.5px
- **Body:** 15-16px, weight 400, line-height 1.65
- **Small/labels:** 12-13px, weight 600-700, uppercase, letter-spacing 1.5px

### Spacing
- Between sections: 100-120px padding top/bottom
- Cards gap: 20-24px
- Card internal padding: 32-36px
- Max content width: 1100-1200px
- Horizontal padding: 48-64px (responsive)

### Buttons
- **Primary:** `bg-lavender-300 text-gray-900` — solid lavender, dark text, 12px border-radius, subtle shadow
- **Secondary:** transparent, 2px border `gray-200`, dark text, hover → border turns lavender
- **Both:** Sora font, 600 weight, 14-16px, padding 14-16px 28-36px
- **Hover:** translateY(-2px) + shadow deepen, NO gradient, NO color shift

### Cards
Follow Upstart's card treatment — whatever the template does naturally (glass-morphism, subtle borders on dark, glow on hover). Adapt with our color accents (lavender, teal, coral). Don't override the template's card system with a completely different one.

### Navigation
Follow Upstart's nav pattern — sticky, glass blur, dark theme treatment. Adapt with:
- Our logo SVG (lavender circle + white paper plane + text)
- "Send" in lavender-300, "EmAll" in white/light text (dark background context)
- Links: light gray, hover with lavender accent
- CTA button: lavender-300 bg with dark text (this pops on dark nav)

### Animations (Upstart-inspired)
- **Scroll reveal:** IntersectionObserver, elements fade in + translateY(24px → 0) with 0.6s ease
- **Staggered children:** Cards/steps animate in sequence with 100ms delay between siblings
- **Hover micro-interactions:** Cards lift 4px, shadow deepens. Buttons lift 2px.
- **Nav underline:** scaleX(0 → 1) on hover, 0.25s ease
- **No parallax, no background animations, no auto-playing anything**

---

## 3. Sitemap & Page Structure

### Core Pages
| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Primary conversion page, StoryBrand flow |
| Pricing | `/pricing` | Full pricing with credit calculator, PAYG, FAQ |
| Blog | `/blog` | Content collection, SEO traffic driver |
| Blog Post | `/blog/[slug]` | Individual articles |

### Service Pages (each with own pricing)
| Page | URL | Purpose |
|------|-----|---------|
| Lead Generation | `/solutions/lead-generation` | Discovery + signal providers |
| Email Infrastructure | `/solutions/email-infrastructure` | Managed domains + mailboxes |
| AI Personalization | `/solutions/ai-personalization` | Copy gen, research, ICP matching |
| Email Verification | `/solutions/email-verification` | Verification provider |

### Comparison Pages
| Page | URL | Purpose |
|------|-----|---------|
| vs Instantly | `/compare/instantly` | Cost breakdown + integration fallback |
| vs Apollo | `/compare/apollo` | Data quality + completeness |
| vs Clay | `/compare/clay` | Simplicity + managed infra |
| vs Lemlist | `/compare/lemlist` | All-in-one vs multi-tool |

### Other Pages
| Page | URL | Purpose |
|------|-----|---------|
| For Agencies | `/agencies` | White-label, multi-client |
| Developers | `/developers` | REST API, MCP server, webhooks |
| About | `/about` | Story, team |
| Contact | `/contact` | Form |
| Privacy Policy | `/privacy` | Legal |
| Terms of Service | `/terms` | Legal |
| Cookie Policy | `/cookies` | Legal |
| Changelog | `/changelog` | Product updates |

**Total: 20+ pages** (plus blog posts via content collection)

---

## 4. Homepage Sections (in order)

### Section 1: Navigation (sticky)
- Logo + links (Solutions dropdown, Pricing, Compare dropdown, Developers, Blog) + CTA button
- Glass effect on scroll

### Section 2: Hero
- Follow Upstart's hero treatment (dark background with their glow/ambient effects)
- Trust badge: "Trusted by 200+ outbound teams" with star rating
- Headline: "Your $37/mo cold email tool actually costs $600+"
- Subheadline: one platform, one price, reply guarantee
- CTA: "Start Free — 100 Credits" (primary) + "See the Math" (secondary)
- Cost comparison visual: Stack Tax ($575+) vs SendEmAll ($149) — side by side, no chart/graph, just clean numbers in cards
- "Save 74%" badge on our price

### Section 3: Logo Bar
- "Teams shipping outbound with SendEmAll"
- Scrolling marquee, grayscale logos, subtle
- (Use placeholder logos until real ones available)

### Section 4: The Problem (StoryBrand: External + Internal)
- Section label: "The Problem" (coral colored)
- Headline: "The outbound stack is broken"
- 3 bento cards with colored icon backgrounds:
  - Card 1 (lavender icon): 5+ tools, $600+/mo
  - Card 2 (coral icon): Generic leads, <1% reply
  - Card 3 (teal icon): Zero infrastructure control

### Section 5: The Solution (StoryBrand: Guide)
- Section label: "The Solution" (lavender colored)
- Headline: "18 providers. 4 stages. 1 pipeline."
- 4-stage pipeline visual: Discover → Qualify → Enrich → Personalize
- Each stage is a card with numbered badge, title, and provider list
- Connecting line between stages (CSS border, not SVG)

### Section 6: How It Works (StoryBrand: Plan)
- Section label: "How It Works" (teal colored)
- Headline: "Three steps. That's it."
- 3 centered cards with large numbered circles:
  1. Describe your buyer
  2. We build your pipeline
  3. Launch & watch replies
- CTA button below: "Start Free — 100 Credits, No Card Required"

### Section 7: Pricing Preview
- Section label: "Pricing" (lavender colored)
- Headline: "Everything you need. Nothing you don't."
- 4 pricing cards: Trial / Pro / Business (featured) / Scale
- Each card shows: plan name, price, outcome ("~X buyers reached"), feature list, CTA button
- "MOST POPULAR" badge on Business
- Link: "See Full Pricing →" to /pricing page

### Section 8: Integration Bar
- Single line: "Already using Instantly, Smartlead, Woodpecker, or Lemlist? Use our leads + their sending."
- Subtle, not a full section — just a trust signal

### Section 9: Reply Guarantee
- "Reply Guarantee" teal badge
- Headline: "50+ replies in 90 days. Or we double your credits."
- Explanation text
- Two chips: Business +5,000 credits / Scale +15,000 credits

### Section 10: Testimonials
- 2-3 testimonial cards (placeholder content until real ones available)
- Name, title, company, quote
- Star rating on each

### Section 11: Developer Teaser
- Headline: "Built for GTM engineers"
- 4 pills: REST API, MCP Server, Webhooks, CSV Import
- Code snippet (curl example with real-looking API response)
- CTA: "Explore the API →"

### Section 12: FAQ
- Expandable accordion, 7-8 questions
- Questions: managed infrastructure, credits, own platform, lead quality, reply guarantee, API, overage

### Section 13: Final CTA
- Headline: "Stop paying $600/mo for a Frankenstein stack."
- Subtext: "100 free credits. No card required."
- Two buttons: "Start Free" + "Book a Demo"

### Section 14: Footer
- Logo + tagline
- 4 columns: Product, Compare, Resources, Company
- Social links: Twitter, LinkedIn, GitHub
- Copyright

---

## 5. Pricing Page (`/pricing`)

### Credit System Explanation
- "1 credit = 1 action" with breakdown table:
  - Lead discovery: 5 credits
  - Signal check: 2 credits
  - Email enrichment: 5 credits
  - Email verification: 1 credit
  - AI personalization: 2 credits
  - Email send: 0.1 credit

### Plan Comparison Table
- Same 4 plans as homepage but with expanded feature comparison grid
- Monthly/Annual toggle (annual = 2 months free)
- PAYG overage rates: $0.05/$0.04/$0.03 per credit by tier

### Interactive Credit Calculator
- Slider: "How many buyers do you want to reach per month?"
- Shows credits needed, recommended plan, cost per contacted buyer
- CTA: direct to signup with plan pre-selected

### Enterprise Section
- Custom pricing, dedicated domains, 150+ mailboxes, SLA
- "Talk to Sales" CTA

### FAQ (pricing-specific)

---

## 6. Service Pages (`/solutions/*`)

Each service page follows the same template:
1. Hero with service-specific headline and value prop
2. What's included (feature list with icons)
3. How it works (3-step visual)
4. Providers used (for that specific stage)
5. Standalone pricing (credits-based, for users who only want this service)
6. CTA to full platform or standalone signup

### Lead Generation (`/solutions/lead-generation`)
- Discovery + signal-based qualification
- Providers: Apollo, Ocean.io, Sales Nav, Google Ads checker, Tech detector, Hiring signals, Funding signals, Authority signals
- Standalone: pay-per-lead pricing

### Email Infrastructure (`/solutions/email-infrastructure`)
- Managed domains + Google Workspace mailboxes
- Smart Ramp-Up (not "warmup")
- 30-40 emails/day hard limit per mailbox
- Deliverability monitoring

### AI Personalization (`/solutions/ai-personalization`)
- Website scraping, ICP matching, pain point research, copy generation
- Powered by DeepSeek-V3.2 on Azure
- Per-lead personalization examples

### Email Verification (`/solutions/email-verification`)
- MailTester.ninja integration
- Catch-all detection, disposable email filtering
- Standalone verification API

---

## 7. Comparison Pages (`/compare/*`)

Each comparison page follows the same template:
1. Hero: "SendEmAll vs [Competitor]"
2. Side-by-side feature comparison table
3. Cost breakdown: their actual total vs our all-in price
4. What they do better (be honest — builds trust)
5. What we do better
6. Integration fallback: "Still want to use [Competitor]? We integrate with them."
7. CTA

### vs Instantly (`/compare/instantly`)
- Their pricing: $47-$358/mo outreach + $47-$197/mo credits (separate!)
- No leads included, no enrichment, no personalization
- We integrate: use our leads + Instantly for sending

### vs Apollo (`/compare/apollo`)
- Their pricing: $49-$119/mo for data, sending limited
- Generic database vs signal-qualified leads
- We use Apollo as one of our 18 providers

### vs Clay (`/compare/clay`)
- Their pricing: $149-$800/mo for enrichment only
- No sending, no infrastructure, no verification
- Powerful but requires technical setup — we're guided self-serve

### vs Lemlist (`/compare/lemlist`)
- Their pricing: $69-$99/mo per seat
- Multi-channel but no managed infrastructure
- We handle the entire stack

---

## 8. Other Pages

### For Agencies (`/agencies`)
- Multi-client management
- White-label capabilities
- Volume pricing
- Agency-specific testimonials/case studies

### Developers (`/developers`)
- REST API documentation (key endpoints)
- MCP server for AI agent integration
- Webhooks for real-time events
- CSV import/export
- Code examples in Python, JavaScript, curl
- Authentication (API keys via x-user-context)

### Blog (`/blog`)
- Content collections (Astro)
- Categories: outbound strategy, deliverability, product updates, case studies
- SEO-optimized: meta tags, OG images, structured data
- RSS feed

### Legal Pages
- Privacy Policy, Terms of Service, Cookie Policy
- Standard legal content, styled consistently

---

## 9. SEO & Analytics

### Technical SEO
- Sitemap.xml (auto-generated by Astro)
- robots.txt
- Canonical URLs
- JSON-LD structured data (Organization, Product, FAQ, BreadcrumbList)
- OG tags + Twitter cards on every page
- Meta descriptions on every page

### Analytics (carry over from current site)
- Google Analytics: G-4WT843MDLE
- Microsoft Clarity: v4wj62uut2
- Remove Tawk.to (replace with Intercom later)

### Performance Targets
- Lighthouse: 95+ on all metrics
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Zero JS by default (Astro islands only where needed: accordion, mobile menu, credit calculator)

---

## 10. Assets to Preserve

- Logo SVG: `/public/img/sendemall-logo-new.svg` (lavender circle + white paper plane + text)
- Favicon: carry over from current `/favicon/`
- GA/Clarity tracking IDs
- Existing legal page content (privacy, terms, cookies)

---

## 11. What's NOT in V1

- Dark mode toggle (architecture supports it, ship later)
- Blog content (just the structure/template)
- Real testimonials (use placeholders, swap later)
- Real logo wall (use placeholder company names)
- ~~Intercom widget (add later)~~ — DONE, added to config.toml (needs app ID)
- A/B testing
- Internationalization

---

## 12. Findings & Roadmap (Post-V1)

Research completed April 2026 for blog infrastructure, newsletter, and chat tooling.

### Blog CMS (for 10-15 posts/week)

Current: Astro content collections with MDX files in `src/content/blog/`. Works for developers, not for non-technical writers.

**Recommended: Keystatic** (evaluate first)
- File-based, Git-backed CMS that adds a visual admin UI at `/keystatic`
- Works directly with existing Astro content collections — zero migration
- Non-technical writers get a real editor (rich text, image uploads, structured fields)
- Free, open-source, no infrastructure to host
- No build time impact (content stays as local MDX files)
- Install: `npx astro add @keystatic/astro`
- Limitation: No role-based permissions or editorial workflows. Fine for 1-3 writers.

**Upgrade path: Sanity** (when team grows)
- Cloud-hosted structured content platform with real-time collaborative editing
- First-class Astro integration: `@sanity/astro` package
- Free tier: 20 users, 10K documents, 100K API CDN requests/mo (handles years of content)
- Growth plan: $15/user/mo
- Best-in-class editorial experience for larger teams
- Media pipeline with automatic transforms, CDN delivery

**Evaluated and skipped:**
- Payload CMS — optimized for Next.js, loses its superpowers with Astro (Local API, embedded admin)
- Strapi — adds server ops burden, Sanity's free tier is better value
- Contentful — overpriced for our scale ($300+/mo for teams)
- Decap CMS — effectively unmaintained (Sveltia CMS is its successor but less mature)
- Ghost — would add a second CMS alongside Astro, unnecessary complexity
- TinaCMS — visual editing advantage is neutered on Astro static sites
- Hashnode Headless — rigid content model, less SEO control

### Newsletter

**Use Intercom for:** Product updates, onboarding sequences, targeted broadcasts to customer base (<1,000 recipients). It's already paid for.

**Recommended for content newsletter: Beehiiv** (evaluate)
- Free up to 2,500 subscribers, Scale at $49/mo (10K), Max at $99/mo (100K)
- RSS-to-email: auto-pulls from blog, curate into weekly digest
- Built-in referral program, recommendation network, growth analytics
- SEO-optimized web archive for newsletter issues
- Integration: embed signup forms via HTML snippets, REST API for custom flows

**Alternative: Buttondown** ($29/mo)
- Developer-friendly, Markdown-native, clean API, RSS ingestion
- Simpler/cheaper but fewer growth features (no referral program)
- Good if audience is primarily technical

**Why not Intercom for newsletter:**
- No RSS-to-email or digest features
- "People Reached" billing model makes large list sends expensive
- Email editor designed for lifecycle messaging, not content newsletters
- Deliverability optimized for transactional, not bulk marketing

### Live Chat

**Current: Intercom** (already subscribed)
- Live chat widget, support inbox, Fin AI chatbot
- Visitor tracking, in-app messages, product tours
- Add to site: script in config.toml `[head]` block (DONE — needs app ID)
- JavaScript API for event tracking: `Intercom('trackEvent', 'viewed-pricing')`

### Cost Trajectory

| Stage | Newsletter | Chat/Support | Total |
|-------|-----------|-------------|-------|
| Launch (0-2,500 subs) | $0 (Beehiiv Free) | Intercom (existing) | Intercom only |
| Growing (2,500-10K) | $49 (Beehiiv Scale) | Intercom (existing) | +$49/mo |
| Scaling (10K-50K) | $99 (Beehiiv Max) | Intercom (existing) | +$99/mo |
