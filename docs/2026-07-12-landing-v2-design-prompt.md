# SendEmAll Landing Page v2 — Design Brief

> **How to use this document:** Paste this entire brief into a fresh Claude session (claude.ai or Claude Code) and ask it to design a complete landing page variant. It is self-contained — no other context needed. The output should be a working HTML/CSS mockup (single file or small set) we can compare against our current Astro site.

---

## 1. Mission

Design a landing page for **SendEmAll** — a three-product cold outbound suite. The current landing page sells an outdated single-product story and is disjointed from what we actually sell. Your job: design a landing page that

1. Makes a first-time visitor understand the suite in **5 seconds**
2. Routes three different buyer intents to three different apps
3. Feels premium, technical, and trustworthy — **zero AI-slop marketing speak**
4. Converts: every section earns its place or gets cut

We will compare your variant against our existing page and take the best of both.

---

## 2. What SendEmAll Actually Is

SendEmAll is an outbound pipeline in three products. One login (SSO), one credit wallet, products purchasable independently. The pipeline:

```
FIND buyers          →   BUILD sending power   →   SEND & manage replies
app.sendemall.com        infra.sendemall.com       sequencer.sendemall.com
(LeadGen — paid)         (Infra — paid)            (Sequencer — FREE)
```

### Product 1: LeadGen — `app.sendemall.com` (THE flagship app)

**What it does:**
- Scrapes B2B prospect data from Apollo and LinkedIn Sales Navigator (customers connect their own accounts) plus custom scraping for any source
- Finds and verifies email addresses with multi-step verification — **under 3% bounce guarantee**
- ICP-based targeting: describe your ideal customer, get matched prospects
- Export as CSV **or push leads directly into a sequencer** — SendEmAll's own, Instantly, PlusVibe, or Smartlead

**Who buys it:** Founders, agencies, recruiters, and sales teams who already pay for Apollo/Sales Navigator but want clean exported lists without per-reveal credit fees and without bounce-riddled data.

**Pricing model:** Credit packages — entry around $30 and $59 tiers (VERIFY exact numbers and volumes with founder before publishing; use "$X for Y verified leads" placeholder structure).

**Key proof points:** verified-not-scraped (every email verified before delivery), sub-3% bounce, bring-your-own Apollo/SalesNav (we don't resell stale databases), export anywhere.

### Product 2: Infrastructure — `infra.sendemall.com`

**What it does:**
- Sells cold-email sending infrastructure: domains + mailboxes, done-for-you
- Mailbox types: Google Workspace, Microsoft 365, and SMTP mailboxes
- Domains purchased fresh at registrar cost, or pre-warmed domains from inventory
- Every mailbox ships with SPF, DKIM, DMARC pre-configured — zero DNS work for the customer
- Blacklist monitoring and deliverability health checks included
- ICP-driven domain name suggestions (describe your company, get brandable sister-domain ideas)
- Built-in calculator: "I need to send X emails/month" → recommended mailbox setup
- **Auto-connects mailboxes into any sequencer** — SendEmAll, Instantly, PlusVibe, Smartlead

**Who buys it:** Outbound teams who have leads and a sequencer but need deliverable sending capacity without doing DNS/Google Admin/Microsoft 365 setup themselves. Works even if they never use any other SendEmAll product.

**Pricing model:** Per-mailbox monthly — Google Workspace ~$3.50/mo, SMTP from ~$1.50–2/mo, domains at cost (~$10–12/yr) (VERIFY final numbers with founder; the live page today says "from $1.50/mo"). Compare against Google Workspace direct at $7.20/mo + DIY DNS → ~50% savings, setup included.

**Key proof points:** 30 cold emails/day safely per GW/M365 mailbox, 50/day per SMTP mailbox, DNS pre-configured, no minimum purchase, works with any sequencer.

**CONFIDENTIALITY GUARDRAIL:** Never mention that domains are shared across customers or any mailbox-per-domain ratios. Copy stays at the "done-for-you mailboxes with deliverability built in" altitude.

### Product 3: Sequencer — `sequencer.sendemall.com` (FREE)

**What it does:**
- Full cold-email sequencer: multi-step campaigns, A/B testing, rich editor, sending schedules
- Unified inbox ("Unibox") for replies across all connected mailboxes
- Email warmup included
- **Free / complementary.** This is deliberate: we make money on leads and infrastructure, and we're happy for you to use ANY sequencer — ours just happens to be free.

**Strategic role in the design:** The sequencer is the trust/no-lock-in play. The message: "We're not trying to trap you in our tool. Push your leads and mailboxes to Instantly, PlusVibe, or Smartlead if you prefer — or use ours, free." This disarms the biggest objection in this market (vendor lock-in) and is a genuine differentiator. Give it a visible but supporting role — it's the free dessert, not the entrée.

### The suite glue (mention, don't over-engineer)

- One login across all three apps (SSO)
- One credit wallet — pay once, spend across products
- Auto-handoffs: leads flow from LeadGen into the sequencer; mailboxes flow from Infra into the sequencer — or into competitors' sequencers

---

## 3. Audiences and Entry Intents

Three visitor intents, each needing a distinct path within 5 seconds of landing:

| Intent | They're thinking | Route to |
|--------|-----------------|----------|
| **"I need leads"** | "My Apollo exports bounce. I need verified emails for my ICP." | LeadGen — app.sendemall.com |
| **"I need mailboxes"** | "I need 20 sending mailboxes with DNS done right, and I don't want to touch Google Admin." | Infra — infra.sendemall.com |
| **"I need to send"** | "I need a sequencer that doesn't cost $97/mo" | Sequencer (free) — sequencer.sendemall.com |

Personas across all three: B2B SaaS founders, lead-gen agencies (power users, highest LTV), recruiters, consultants, sales teams.

---

## 4. Positioning and Messaging

**Umbrella story:** The outbound pipeline. Find buyers → build sending power → send and close. Three products, one login. Buy what you need — no bundles forced on you, no lock-in.

**Core brand values to convey:**
1. **Transparency** — real pricing on every page, no "book a demo to see pricing"
2. **No lock-in** — free sequencer + first-class support for competitor sequencers
3. **Verified, not scraped** — quality of data over volume
4. **Done-for-you infrastructure** — we handle the DNS/deliverability plumbing

**Hero direction (design 2–3 options):**
- Option 1 (pipeline): "Everything you need to cold email. Nothing you don't." + subhead naming the three products
- Option 2 (outcome): "Verified buyers. Bulletproof inboxes. Sequences that land." 
- Option 3 (anti-lock-in angle): "The outbound stack that doesn't hold you hostage." + free sequencer + works-with-competitors proof
- Feel free to propose your own — but it must pass the 5-second test: visitor knows we sell leads + mailboxes + a free sequencer.

**Immediately under the hero: a 3-card fork.** "What do you need today?" → Leads / Mailboxes / A sequencer (free). Each card: one-line value prop, starting price (or "Free"), CTA into the respective app or product page. This fork is the single most important conversion element on the page.

---

## 5. Brand and Visual System

- **Dark theme.** Deep dark-purple/near-black backgrounds (#0a0a1a range). Premium, technical feel — think Linear/Vercel/Resend, not corporate SaaS.
- **Primary accent: Lavender `#D2B3F3`** with dark text on buttons. This is the brand color.
- **Extended palette:** teal `#14B8A6`, coral, amber `#F59E0B`, blue `#3B82F6` for per-product accents. Suggestion: assign each product a consistent accent (e.g., LeadGen teal, Infra amber, Sequencer blue) used across cards, badges, and product sections for instant visual product identity.
- **Font: Sora** (Google Font), weights 300–800.
- **Effects:** subtle glass-morphism, glows, and depth are on-brand. Don't strip them; don't overdo them.
- **Visuals to design:** 
  - A pipeline diagram (find → fuel → send) — the suite in one glance
  - Product dashboard mockups per vertical (stylized SVG/CSS mockups fine — LeadGen: a lead table with verification badges; Infra: mailbox/domain provisioning view with DNS checkmarks; Sequencer: campaign sequence builder + unified inbox)
  - A "works with" band: Instantly, PlusVibe, Smartlead, Woodpecker, Lemlist, EmailBison logos/names
- Fully responsive; mobile nav must handle three product groups cleanly.

---

## 6. Copy Rules (hard requirements)

- **Banned words:** "AI-powered", "revolutionize", "cutting-edge", "game-changing", "supercharge", "unleash", "10x your…"
- **Numbers everywhere:** under 3% bounce, 30 emails/day per mailbox, ~50% cheaper than Google direct, $X/mo, 5-minute setup. Specific beats vague, always.
- Short sentences. Active voice. "You", not "users".
- Specific pain beats vague benefit: "Your Apollo exports bounce 15% of the time" beats "struggling with data quality?"
- On general marketing surfaces prefer "potential buyers" / "verified contacts"; on the LeadGen product surfaces, "leads" is fine and correct for SEO (people search "lead scraper", not "potential buyer scraper").
- Pricing visible on every product surface. Transparency is a core differentiator.
- "warmup" is the public keyword (SEO). Never write "Smart Ramp-Up" (internal name).

---

## 7. Homepage Architecture (section by section)

1. **Nav:** Logo | Products ▾ (LeadGen / Infrastructure / Sequencer — with one-line descriptions + per-product accent) | Pricing | Resources ▾ (Blog, Free Tools, Compare) | **Login** | Primary CTA button
2. **Hero:** headline + subhead + primary CTA + the works-with logo band beneath
3. **The Fork:** 3 product cards ("What do you need today?") — the core routing element
4. **Pipeline section:** the find → fuel → send diagram with one short paragraph per stage, each linking to its product page
5. **Product deep-dive sections** (one per product, alternating layout, with dashboard mockup): LeadGen first (flagship), Infra second, Sequencer third (framed around "free + no lock-in")
6. **Interoperability band:** "Push everything to the sequencer you already use" — competitor sequencer names as first-class integrations, not hidden
7. **Pricing preview:** three honest surfaces side by side — Leads (from $X), Mailboxes (from $X/mo), Sequencer (Free). NO bundled $149–599 platform tiers — that model is retired. Link to full pricing page.
8. **Social proof:** testimonials section (design the slots; we will supply real quotes — do NOT fabricate named customers)
9. **FAQ:** 6–8 questions (why is the sequencer free? / do I need all three? / can I use Instantly instead? / how do you verify emails? / how fast do I get mailboxes? / what happens to my domains if I cancel?)
10. **Final CTA:** one strong close, restating the fork (choose your entry point)
11. **Footer:** three product columns + resources + legal + social

---

## 8. SEO Constraints (non-negotiable)

The current site has indexed pages with live traffic. The design must slot into this reality:

- **These URL paths keep existing** (redesign their content, keep the routes): `/pricing`, `/blog/*`, `/compare/instantly|apollo|clay|lemlist`, `/products/cold-email|email-warmup|email-verification|email-finder`, `/services/apollo-scraper|sales-navigator-scraper|custom-scraping|cold-email-infrastructure|free-leads`, `/tools/email-deliverability-test`, `/use-cases/*`
- Any restructure must come with a 301 redirect map (we'll handle implementation; just don't design a structure that orphans these)
- **Keyword targets per product:** LeadGen → "apollo scraper", "sales navigator export", "verified b2b leads", "email finder"; Infra → "buy mailboxes for cold email", "cold email infrastructure", "email warmup", "google workspace mailboxes cold email"; Sequencer → "free cold email software", "instantly alternative free"
- Structured data slots: Product JSON-LD on product sections, FAQPage on the FAQ
- The free deliverability test tool (`/tools/email-deliverability-test`) is a proven traffic magnet — keep it linked in nav/footer (Resources → Free Tools)

---

## 9. CTAs and Routing Rules

- Primary CTA per product goes to its app: `app.sendemall.com` (LeadGen), `infra.sendemall.com` (Infra), `sequencer.sendemall.com` (Sequencer)
- Global nav gets a **Login** link (design a simple chooser or default to app.sendemall.com — propose UX)
- Keep one lead-magnet path alive for not-ready-yet visitors: "Get 100 free verified potential buyers" (form-based, feeds our nurture) — but it is a SECONDARY path now, not the destination of every button on the site
- Every CTA labeled with what happens next ("Start scraping", "Get mailboxes", "Open sequencer — free") — no generic "Get Started" everywhere

---

## 10. Deliverables

1. A complete homepage mockup (single-file HTML/CSS preferred, dark theme, responsive)
2. Optional: one product-page template showing how a vertical page (e.g., Infra) would look
3. Short rationale: 5–10 bullets on the key layout/messaging decisions you made and why
4. List any places you need real data from us (final pricing, testimonials, screenshots)

## 11. Open items you should design around (flagged, not blockers)

- Final pricing numbers need founder verification — use clearly-marked placeholders
- The old "50+ replies in 90 days" guarantee was tied to retired bundle pricing — OMIT it unless told otherwise
- Testimonials: design slots, leave content as obvious placeholders
