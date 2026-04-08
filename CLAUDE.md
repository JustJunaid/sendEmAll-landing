# SendEmAll Marketing Site — Claude Code Instructions

## Start Here
Full design spec and implementation plan:
- **Spec:** `docs/design-spec.md` — positioning, colors, typography, all pages, all sections, copy strategy
- **Plan:** `docs/implementation-plan.md` — 13 tasks, step-by-step, ready for execution

Read both before doing anything.

---

## What This Is
Marketing site for SendEmAll — the all-in-one outbound platform. Replaces the current React SPA with Astro + Tailwind CSS 4. Full rewrite, not a migration.

## Tech Stack
- **Astro 5/6** — zero-JS-by-default, islands for interactivity
- **Tailwind CSS 4** — utility-first, custom color palette
- **TypeScript** — strict mode
- **Sora** — Google Font, weights 300-800
- **Content Collections** — for blog (MDX)

## Design Decisions (non-negotiable)
- **Dark theme** — using purchased Upstart Astro template as design foundation. Keep its natural look and feel.
- **Lavender #D2B3F3** — primary button color with dark text (brand color, matches logo). Pops beautifully on dark.
- **Extended palette** — teal, coral, amber, blue for different contexts (see spec). Adapt to dark backgrounds.
- **Sora font** — replace whatever Upstart uses with Sora. Keep Sora.
- **Keep Upstart's design language** — its animations, transitions, glass effects, card treatments, spacing, section patterns. Don't fight the template. Adapt content into it naturally.
- **StoryBrand copy** — Problem → Guide → Plan → CTA. No AI slop.
- **5-second test** — visitor understands what we do and what they get instantly
- **Content may need extending** — Upstart has 59 sections. If we have content gaps, fill with relevant content that serves our positioning (more detail on services, more comparison data, more developer examples). Don't leave sections feeling empty.

## Copy Rules
- No "AI-powered", "revolutionize", "cutting-edge", "game-changing"
- Numbers everywhere: $600+, 50+ replies, 90 days, 18 providers, $0.07/lead
- Specific pain > vague "challenges"
- Short sentences. Active voice. "You", not "users".
- Leads = "potential buyers" (signal-qualified), never "leads" alone

## Key Positioning
- **Primary:** "True Cost Transparency" — your $37/mo tool costs $600+, we fixed that
- **Secondary:** "Reply Guarantee" — 50+ replies in 90 days or bonus credits
- **Blue ocean:** Between cheap DIY ($25-99) and expensive AI SDRs ($900-10K)

## Pricing (reference for all pages)
| Plan | Price | Mailboxes | Credits | Buyers Reached |
|------|-------|-----------|---------|----------------|
| Trial | $0 | None | 100 (one-time) | ~13 |
| Pro | $149/mo | 15 | 1,500 | ~200 |
| Business | $349/mo | 45 | 5,000 | ~650 |
| Scale | $599/mo | 105 | 15,000 | ~2,000 |
| Enterprise | Custom | 150+ | Custom | Custom |

- 1 credit = 1 action
- Domains shared across customers (NEVER expose mailbox-per-domain ratio)
- Reply guarantee on Business + Scale: 50+ replies in 90 days → bonus credits
- PAYG overage: $0.05/$0.04/$0.03 per credit by tier
- "warmup" on landing page (industry keyword for SEO). "Smart Ramp-Up" is internal nomenclature only.

## Sitemap (30+ pages)
- Home, Pricing, Blog, Blog Posts
- 4 Product pages: `/products/cold-email`, `/products/email-warmup`, `/products/email-verification`, `/products/email-finder`
- 5 Service pages: `/services/apollo-scraper`, `/services/sales-navigator-scraper`, `/services/custom-scraping`, `/services/cold-email-infrastructure`, `/services/free-leads`
- 5 Use Case pages: `/use-cases/saas`, `/use-cases/agencies`, `/use-cases/recruiters`, `/use-cases/consultants`, `/use-cases/startups`
- 1 Tool page: `/tools/email-deliverability-test`
- 4 Comparison pages (footer only): `/compare/instantly`, `/compare/apollo`, `/compare/clay`, `/compare/lemlist`
- Developers, About, Contact, Privacy, Terms, Cookies, Changelog

## Assets to Preserve
- Logo SVG: `src/assets/images/sendemall-logo-dark.svg`
- Favicon: `public/images/favicons/`
- GA: G-4WT843MDLE
- Clarity: w7ehoee5jy

## What NOT to Do
- Don't fight the Upstart template's design language — work WITH it, not against it
- Don't strip visual effects that make the template look premium (glows, glass, depth)
- Don't write generic SaaS copy ("revolutionize your workflow")
- Don't hide pricing — transparency is our USP
- Don't mention warmup — it's "Smart Ramp-Up"
- Don't say "leads" alone — always "potential buyers" or "signal-qualified leads"
- Don't expose domain sharing details (15-20 mailboxes per domain)
- Don't leave sections feeling thin — if Upstart has a rich section pattern, fill it with relevant content
- Don't use Upstart's default font — always replace with Sora

## Git Conventions
- Commit after each task completes
- Imperative mood: "Add pricing page" not "Added pricing page"
- Don't commit node_modules/, .env, or build artifacts
