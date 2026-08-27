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
- **Numbers where they earn trust** (66M+ contacts, 10M+ companies, $59, 1 credit = 1 valid email) — but don't force a number into every line.
- **Problem-Agitate-Solution / StoryBrand** spine where it fits; agitate the specific pain on its dedicated page.
- **No fabricated proof** — no invented testimonials, logos, or metrics.
- **No comparative name-dropping on core pages (Junaid, 27 Aug):** don't praise or downgrade competitors ("Apollo is bigger", "cheaper than X") and don't self-deprecate for honesty points. Speak to the visitor's outcome and our value, simply. `/compare/*` pages are the exception — comparison is their purpose; keep them factual and respectful.
- **Zero-cognitive-load rule (ALL user-facing copy, every page).** Every line must be compelling, instantly clear, and resonant — the visitor gets it with near-zero mental effort. NO AI-slop, NO clever-but-confusing phrases (e.g. "credit-card gymnastics", "fixes the seam"), NO hand-waving, and nothing that could read as untrustworthy or dent the brand. If a reader has to pause to decode a line, cut or rewrite it. This is non-negotiable and applies wherever we write user-facing content.

---

## Product Ground Truth (advertise only what's real)
- **Leads — `/leads`** (app.sendemall.com). Sources: (a) **66M+ contact data lake** (licensed PDL + public + uploads); (b) **BYO scraping** of the user's *own* Apollo / Sales Navigator account — their encrypted session, a **dedicated per-user residential IP**, backend never sees their password/2FA (framed as safety, not evasion); (c) **Google Maps** public listings. ICP-in-English → live preview. **Verification** (SMTP + platform-level layered checks, catch-alls labeled free — the ONLY accuracy claim we publish is the <3% bounce guarantee; the 0.20% false-positive stat is RETIRED, do not reintroduce it). **Email finder** (learned per-domain patterns; the verified result consumes the credit — don't call finding "free"). **Decision-maker-from-domain.** **Buying signals & enrichments consume credits** (rates shown in-app) — never advertise individual signals or the email finder as "free"; the deliverable is a verified email and that is what a credit buys. Catch-alls labeled free. **LinkedIn Open-Profile detection AND free InMail sending to open profiles** (via the sequencer's LinkedIn channel). Push to Instantly / PlusVibe / SendEmAll — **Smartlead is NOT implemented** (adapter throws `sequencer_type_not_implemented`); never list it as a push target.
- **Mailboxes — `/mailboxes`** (infra.sendemall.com). **Self-serve autonomous platform, NOT an agency.** Order → auto-provision → dashboard (My Mailboxes / Domains / Pre-warmed / Sequencers). 4 types: Google Workspace, Microsoft 365, MS-shared, SMTP. Pre-warmed catalog. Domains: buy / pre-aged / BYO. Auto Cloudflare + DNS (SPF/DKIM/DMARC). Warmup built in.
- **Sequencer — `/sequencer`** — **PAID, $99/mo, fully unlimited** (seats, workspaces, sending, warmup, reply management). Standalone, or a top-up on a Leads plan for the end-to-end experience. **Agency wedge:** unlimited seats/workspaces vs competitors' per-seat tax — position on that, never on price. **Backend soft cap ~250–500k emails/mo for stability — NEVER surfaced to users; publicly it's "unlimited".** **Free no-lock-in export:** pushing your buyers and/or mailboxes OUT to Instantly / Smartlead / your own sequencer costs nothing — lead with that as the "free" appeal. The old "sequencer is free" line is **retired**.
- **Warmup mechanism (public story, verified in monorepo):** a managed **engagement network** (varied, business-like template threads with paired replies, per-mailbox reader personas) **plus a gradual ramp of real sends** (mailbox: 10/day start, +5/day, cap 40; domain: 30 start, +20/day, cap 250). Never claim we "skip fake conversations" or attack pool-based warmup wholesale — that contradicts our own product; the honest frame is "engagement + real-send ramp, both halves."
- **LinkedIn outreach (SHIPPED 2026-08-24, merged from `feat/linkedin-channel`):** a second channel *inside the same sequence* as email. ONE action: Sales Navigator message / InMail (no connection requests, follows, or profile views — `LINKEDIN_CONNECT` has no executor). Reply on either channel stops both. Cookie-session login in a streamed browser (we never see the password), dedicated residential IP per seat (64 countries, US state-level). **Requires the customer's own Sales Navigator seat — always state this.** Free reachability ladder: 1st-degree = free message, Open Profile = free InMail, otherwise 1 of the CUSTOMER'S OWN SN InMail credits (never ours; a per-step toggle restricts to free-only). Safety ramp 10→15→20→25→40/day, hard ceiling 50, 5-min spacing. Pricing: every plan includes 1 LinkedIn seat; extra seats $39/mo. **Copy rules (Junaid, 27 Aug):** (1) NEVER put "unlimited" and LinkedIn in one phrase — "unlimited" is the email side (seats/workspaces/sending); LinkedIn is "1 account included, more at $39/mo". (2) The Sales-Navigator requirement is CONTESTED: code (main, 27 Aug) requires an SN session for every LinkedIn send and `LINKEDIN_CONNECT` has no executor, but Junaid says free-LinkedIn connection-request/message is supported — VERIFY with him before writing any LinkedIn copy that states or omits the SN requirement.
- **AI personalization:** supported **through the leads product** (signal-based, per-lead email drafts from enrichment, pushed to the sequencer with the list) — NOT natively in the sequencer (which does variables + Spintax). Scope claims accordingly.
- **Product reality source of truth:** the `sendemall/sendEmAll` monorepo (all product codebases + docs/specs). When copy makes a capability claim, verify it there — not against older landing copy.
- **Non-affiliation:** not affiliated with Apollo / LinkedIn / Google / Microsoft. We automate the user's own *authorized* access only — never our accounts, never circumventing a platform. (See Terms §4 + Privacy provenance clauses.)

## Pricing — the landing page is the source of truth
**Landing = truth; the app will be updated to match. Do NOT change landing pricing to match current app code.**
- **Starter — $59/mo** — 25,000 verified-email credits
- **Growth — $79/mo** — 50,000 verified-email credits
- **Sequencer — $99/mo** — fully unlimited (seats, workspaces, sending, warmup, reply management); standalone or top-up. NOT free — positioned against per-seat competitors. Backend soft cap ~250–500k/mo, never surfaced. Pushing your data/mailboxes OUT to your own sequencer is free (no lock-in).
- **Mailboxes / infra — priced separately, from $1.50/mo per mailbox** (SMTP $1.50; Google Workspace & M365 $3.50; **Azure $40/tenant** = 100 mailboxes on one domain). **For infra pricing the LANDING is the truth — the monorepo `mailbox-recommender` is stale/wrong here (Junaid, 28 Aug); never "correct" landing prices from it.** Public safe sending limits (approved to show): GW/M365 up to 30 cold + 30 warmup emails/day per mailbox; SMTP 50 + 50; Azure tenant 500 + 500/day across its 100 mailboxes. Recommend up to 5 mailboxes per domain (industry-standard range is 2–5). /mailboxes has a fleet calculator built on these numbers (22 weekday sends/mo).
- **In-app chat support is real and may be advertised** — humans reply during working hours, on every plan (Intercom in the app).
- 1 credit = 1 verified, valid email; you never pay for bounces or catch-alls.

## Sitemap / IA (current)
- **Home**, **Pricing**
- **Platform ▾** pillars: `/leads`, `/mailboxes`, `/sequencer`, `/linkedin-outreach` (LinkedIn pillar, added 28 Aug — reachability ladder, safety ramp, 1-account-included pricing)
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
- **Social proof / testimonials — known gap; NEVER fake it.** No real testimonials yet (placeholder fakes were deliberately removed — do not reintroduce fabricated quotes/logos/metrics). Real proof comes **post-launch** via a feedback-for-discount program (multi-week). Design a premium, ready-to-fill trust slot; until it's real, lead trust with *true numbers we own* (66M+ contacts, 10M+ companies, 18 sources, $59) rather than invented quotes.
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
