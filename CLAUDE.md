# CLAUDE.md

Guidance for Claude Code working in this repo — the **SendEmAll marketing site**.

> **Refreshed 2026-07-27 for the world-class overhaul sprint.** The pre-overhaul rules (old $149/$349/$599 pricing tiers, "never say 'leads'", the reply guarantee, the products/services/use-cases sitemap) are **retired**. Where anything older conflicts with this file, **this file wins.**

---

## North Star
**A visitor understands what we do, what they get, and why we're different within 5 seconds** — then the page earns the scroll. Copy, design, and performance all serve that. Quality bar: a **top-0.1% GTM / sales-copywriter / product-designer** marketing site — not a regular-startup page.

## What This Is
Marketing site for **SendEmAll — the all-in-one B2B outbound platform**. Astro 5/6 + Tailwind CSS v4, built on the purchased **Upstart** Astro template. Full rewrite of the old React SPA.

---

## How We Work (working agreement — read this first)
- **Copy is the main event and requires Opus judgment + explicit user approval.** Opus (me) drafts specific before/after; the user signs off **page by page**. NEVER delegate copy to weaker models, and never sweep copy edits across many files unreviewed. Structural / UX / analytics / SEO-plumbing changes may proceed with a walkthrough, but still get shown.
- **Prove every change.** Trace the real producer→consumer flow, build, screenshot both themes, run the contrast + perf checks. Never call something "done" without verification. **Build needs Node ≥ 22.12** — use nvm `v22.20.0`; the default shell can resolve to 22.11 and the build fails *silently* if the exit code is masked.
- **One capable context.** Do the work in-session. Reserve subagents for genuine parallel *research/audit* — and treat any copy they produce as raw input for Opus review, never as final.
- **Commit only when the user asks.** Prefer a few small logical commits.

---

## Positioning (blue ocean)
**Own both halves — the right buyers AND real deliverability — as one system, so bad data can't burn the domain you warmed.** Incentive-aligned: you pay per *valid* result, not per attempt. No lock-in (push to any sequencer).
- **Villain:** the rigged, fragmented stack (a finder + a verifier + a sender that barely talk) that burns your domain and hides *why* you land in spam.
- **Risk reversal (DECIDED):** a **bounce guarantee scoped to OUR data** — email the verified buyers we provide and stay under 3% bounce, or your first month is refunded. It only covers leads we provided (a user's own uploaded list is out of scope), so it can't be gamed.
- **Do NOT lead on price** — that commoditizes us. Price transparency supports the story; it is not the headline.
- **Do NOT signal cheapness (psychology).** Too many "free"s or leading on "cheap/low price" reads as *low quality*. Present on **value and confidence** (unlimited seats, verified data, guarantee), never on being the cheap option. This is *why* the sequencer is paid, not free.
- **Hero copy is A/B-tested** via PostHog (`hero_headline` harness in `HomeBanner.astro`) — control is the current headline; variants are added only after approval.

## Copy Principles
- **Voice:** top-0.1% GTM + sales copywriter. About the customer and their outcome; less about us (details go lower). Simple, self-explanatory, scannable. Short sentences, active voice, "you".
- **Use prevalent, search-aligned industry vocabulary** — "leads", "cold email", "email warmup", "scraper", "email finder/verifier". Don't invent terminology or sanitize keywords; it hurts clarity *and* SEO. ("warmup" on-page, never "Smart Ramp-Up" — that's an internal name only.)
- **No AI slop:** avoid "AI-powered", "revolutionize", "cutting-edge", "game-changing", "unlock", "supercharge", "seamless/effortless", emoji-as-decoration, and em-dash overuse.
- **Numbers where they earn trust** (66M contacts, 0.20% false-positive, $59, 1 credit = 1 valid email) — but don't force a number into every line.
- **Problem-Agitate-Solution / StoryBrand** spine where it fits; agitate the specific pain on its dedicated page.
- **No fabricated proof** — no invented testimonials, logos, or metrics.
- **Zero-cognitive-load rule (ALL user-facing copy, every page).** Every line must be compelling, instantly clear, and resonant — the visitor gets it with near-zero mental effort. NO AI-slop, NO clever-but-confusing phrases (e.g. "credit-card gymnastics", "fixes the seam"), NO hand-waving, and nothing that could read as untrustworthy or dent the brand. If a reader has to pause to decode a line, cut or rewrite it. This is non-negotiable and applies wherever we write user-facing content.

---

## Product Ground Truth (advertise only what's real)
- **Leads — `/leads`** (app.sendemall.com). Sources: (a) **66M+ contact data lake** (licensed PDL + public + uploads); (b) **BYO scraping** of the user's *own* Apollo / Sales Navigator account — their encrypted session, a **dedicated per-user residential IP**, backend never sees their password/2FA (framed as safety, not evasion); (c) **Google Maps** public listings. ICP-in-English → live preview. **Verification** (SMTP + platform-level, ~0.20% false-positive, catch-alls labeled free). **Email finder** (learned per-domain patterns, finding is free). **Decision-maker-from-domain.** **Buying signals** (hiring/funding/news free; ads/tech-stack 1 credit). **LinkedIn Open-Profile *detection*** (not sending). Push to Instantly / Smartlead / PlusVibe / SendEmAll.
- **Mailboxes — `/mailboxes`** (infra.sendemall.com). **Self-serve autonomous platform, NOT an agency.** Order → auto-provision → dashboard (My Mailboxes / Domains / Pre-warmed / Sequencers). 4 types: Google Workspace, Microsoft 365, MS-shared, SMTP. Pre-warmed catalog. Domains: buy / pre-aged / BYO. Auto Cloudflare + DNS (SPF/DKIM/DMARC). Warmup built in.
- **Sequencer — `/sequencer`** — **PAID, $99/mo, fully unlimited** (seats, workspaces, sending, warmup, reply management). Standalone, or a top-up on a Leads plan for the end-to-end experience. **Agency wedge:** unlimited seats/workspaces vs competitors' per-seat tax — position on that, never on price. **Backend soft cap ~250–500k emails/mo for stability — NEVER surfaced to users; publicly it's "unlimited".** **Free no-lock-in export:** pushing your buyers and/or mailboxes OUT to Instantly / Smartlead / your own sequencer costs nothing — lead with that as the "free" appeal. The old "sequencer is free" line is **retired**.
- **Non-affiliation:** not affiliated with Apollo / LinkedIn / Google / Microsoft. We automate the user's own *authorized* access only — never our accounts, never circumventing a platform. (See Terms §4 + Privacy provenance clauses.)

## Pricing — the landing page is the source of truth
**Landing = truth; the app will be updated to match. Do NOT change landing pricing to match current app code.**
- **Starter — $59/mo** — 25,000 verified-email credits
- **Growth — $79/mo** — 50,000 verified-email credits
- **Sequencer — $99/mo** — fully unlimited (seats, workspaces, sending, warmup, reply management); standalone or top-up. NOT free — positioned against per-seat competitors. Backend soft cap ~250–500k/mo, never surfaced. Pushing your data/mailboxes OUT to your own sequencer is free (no lock-in).
- **Mailboxes / infra — priced separately, from ~$1.50/mo per mailbox** (GW/M365 higher; Azure/SMTP tiers as shown on `/mailboxes` and `/pricing`)
- 1 credit = 1 verified, valid email; you never pay for bounces or catch-alls.

## Sitemap / IA (current)
- **Home**, **Pricing**
- **Platform ▾** pillars: `/leads`, `/mailboxes`, `/sequencer`
- **Free tools** (Resources ▾ + footer): `/tools` hub + `/tools/{apollo-scraper, sales-navigator-scraper, google-maps-scraper, email-verifier, email-finder, decision-maker-finder}` (keyword-unique SEO pages, each with a non-affiliation note) + `/deliverability-test`
- **Compare** (footer): `/compare/{instantly, apollo, clay, lemlist}`
- **Developers**, **About**, **Contact**, **Blog** (+ posts), **Changelog**
- **Legal:** `/privacy`, `/terms`, `/cookies`
- **Retired** (301'd in `vercel.json`): `/infrastructure`, `/products/*`, `/services/*`, `/use-cases/*`, legacy `.html` URLs.

---

## Design Decisions
- Built on **Upstart** — keep its design language (animations, glass, depth, card treatments, spacing). Don't fight it; adapt content into it. **Use its premium components** rather than flat AI-slop cards.
- **Full light + dark theme** via semantic `--se-*` tokens (`:root` = light default, `:root[data-theme="dark"]`). Every surface must pass contrast in **both** themes — run `scratchpad/contrast.mjs` (WCAG walk-up sweep). Use theme-adaptive utilities only: `text-heading`, `text-text-default`, `text-muted`, `text-primary`, `bg-body`, `bg-theme-dark`, `bg-accent`, `border-border-light`, `bg-primary`. **Avoid** `text-white/-light/-dark`, `text-[#hex]`, `bg-white/x` (theme-blind → invisibility bugs).
- **Lavender #D2B3F3** primary (dark text `#0E0C0C`), matching the logo; **violet-ink #7D3CC2** for primary text in light theme.
- **Sora** font throughout.
- **Secondary button matches the monorepo `packages/ui`** (`--sea-*` ≈ landing `--se-*`): `btn-outline-primary` = `text-heading border-border-light bg-theme-dark hover:bg-accent`.
- **Theme toggle** sits in a utility group separated from the primary CTA (see `Header.astro`).

## Tech Stack
- **Astro 5/6** — zero-JS-by-default, islands for interactivity
- **Tailwind CSS v4** — utility-first via `@tailwindcss/vite` (no `tailwind.config.js`); `@theme inline` + `@custom-variant dark`
- **TypeScript** — strict
- **Sora** — Google Font, 300–800
- **Content Collections** — blog (MDX) + structured TOML/MD content
- **PostHog** — primary analytics (product analytics, session replay, funnels, A/B via feature flags). GA4 (`G-4WT843MDLE`) is a frozen legacy layer; Intercom for support.

## Commands
```bash
# Ensure Node ≥ 22.12 first, e.g.:  nvm use 22.20.0
npm run dev          # TOML watcher + Astro dev
npm run build        # TOML watch → Astro build → strip drafts from sitemap  (needs Node ≥ 22.12)
npm run preview      # Preview built output
npm run astro-check  # TypeScript type checking
npm run format       # Prettier on src/
npm run test         # Jest (watch)
```

## Architecture
- **Routing:** all pages under `src/pages/[...lang]/` (i18n catch-all via `generatePaths()`; default `en`).
- **Path aliases:** `@/components/* → src/layouts/components/*`, `@/shortcodes/* → src/layouts/shortcodes/*`, `@/helpers/* → src/layouts/helpers/*`, `@/* → src/*`.
- **Layouts:** `src/layouts/Base.astro` wires Head, Header, Footer, GlobalScripts, CookieConsent. Section components in `src/layouts/components/sections/`. Shortcodes in `src/layouts/shortcodes/` (auto-imported into MDX).
- **Content:** `src/content.config.ts` glob loaders (blog, pages, homepage, pricing, faq, sections, changelog). Global config generated at build into `.astro/config.generated.json` from `src/config/*.toml`.
- **Styling:** Tailwind v4 via Vite; custom CSS in `src/styles/` (theme.css, buttons.css, navigation.css, animation.css). Font plugin: `fontTailwindPlugin.js`.
- **Analytics/consent:** `CookieConsent.astro` geo-gates (GDPR → banner + load-on-consent; non-GDPR → auto-grant, load at idle). Event helpers in `src/lib/utils/tracking.ts`; A/B harness in `src/lib/analytics/experiment.ts` (`[data-ab]` / `[data-ab-variant]`).
- **Deployment:** Vercel (`vercel.json` redirects + headers, `vercel.sh` per-env site URL); Cloudflare (`wrangler.toml` → `./dist`).

## Assets to Preserve
- Logo: `src/assets/images/sendemall-logo-dark.svg` (+ light variant `sendemall-logo-light.svg`)
- Favicons: `public/images/favicons/`
- Product screenshots: `public/images/product/*.svg` (hand-authored — light, lavender, green "Valid" badges)
- Integration logos: `src/assets/images/integration/*.png`

## What NOT to Do
- Don't fight Upstart's design language; don't strip its premium effects (glows/glass/depth).
- Don't change copy without Opus review + user approval; don't cite old CLAUDE.md copy rules as authority.
- Don't lead on price (commoditizing); don't hide pricing either.
- Don't write generic SaaS / AI-slop copy or fabricate proof.
- Don't imply we scrape from *our* third-party accounts or circumvent a platform — it's the user's own authorized access.
- Don't sanitize industry keywords out of copy ("leads", "scraper", "warmup", "cold email" are deliberate).
- Don't introduce any text that fails contrast in either theme.
- Don't use Upstart's default font — always Sora.

## Git Conventions
- Commit only when the user asks; imperative mood ("Add pricing page").
- Don't commit `node_modules/`, `.env`, or build artifacts.

---

## Known Gaps & Roadmap (from the 2026-07-27 buyer-roast review)
- **Social proof / testimonials — known gap; NEVER fake it.** No real testimonials yet (placeholder fakes were deliberately removed — do not reintroduce fabricated quotes/logos/metrics). Real proof comes **post-launch** via a feedback-for-discount program (multi-week). Design a premium, ready-to-fill trust slot; until it's real, lead trust with *true numbers we own* (66M contacts, 0.20% false-positive, 18 sources, $59) rather than invented quotes.
- **Risk reversal (DECIDED): bounce guarantee scoped to OUR data.** Email the verified buyers we provide and stay under 3% bounce, or the first month is refunded — covers only leads we provided, so it can't be gamed by someone mailing their own junk list. Place near the hero CTA and again by pricing. Refund unit = the **full first month's subscription** (confirmed).
- **Media incoming (~days): a video product tour + real product screenshots.** When they land: the **video** goes near the hero (a "See how it works" modal or a below-hero band); **real screenshots** replace the hand-authored SVGs in the Find / Send / Deliverability / Mailboxes sections. Keep the Upstart premium framing (device frames, glass, glow, subtle motion). This CLAUDE.md note exists so a future session knows exactly where/how to slot them.
- **Visual richness:** several sections are text-only and look plain next to the ones with product shots. Add a product shot / vector / short GIF to every major section (some assets may come from a designer). Track as an ongoing todo.
- **Copy nits flagged in the roast (pending Opus rewrites + user approval):** "SendEmAll fixes the seam" reads as AI-slop; hero doesn't punch the differentiator in 5s; free sequencer is underplayed; no risk-reversal at the hero CTA.

---

## Review Lenses (how we pressure-test the site)
Run these in order, each as a **standalone deliverable the user reacts to** (findings first; edits only after approval):
1. **Potential customer / roast** — read it cold: what's confusing, what makes me bounce, what makes me jaw-drop, would I actually sign up?
2. **0.1% GTM strategist + sales copywriter** — conversion, positioning, and copy gaps.
3. **Top product designer / UI-UX** — which premium Upstart components are we *not* using that would make it classier and stand out?
4. **SEO / performance specialist** — fast load, optimized bundles, drop heavy/stale assets, technical SEO.
