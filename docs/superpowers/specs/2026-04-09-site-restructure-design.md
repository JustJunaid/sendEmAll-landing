# SendEmAll Site Restructure: Signal-Based Positioning

**Date:** 2026-04-09
**Updated:** 2026-04-14
**Status:** Fully implemented and deployed. All tasks complete. Only Task 13 (exit intent popups) deferred.

---

## Context

SendEmAll is pivoting from "cheaper tool consolidation" ($37 tool costs $600+) to "signal-based outbound platform" (find buyers who are already looking to buy). The current product (cold email sequencer) is live but the full vision (signal-based lead discovery integrated with sending) is not yet built. The landing site needs to sell the vision, capture demand via forms (Airtable), and monetize immediately through infrastructure sales and concierge services.

### What exists today
- **SendEmAll app** (live): campaigns, senders, warmup, inbox, analytics, domains, inbox placement testing, deliverability
- **LeadGen API** (semi-complete): Apollo scraper, signal providers (hiring, funding, tech stack, ads, authority), email enrichment/verification, AI personalization
- **Integration between them** (not built): push leads from LeadGen into SendEmAll campaigns

### The strategy
- **Products** = platform capabilities (all CTAs go to Airtable form until platform is ready)
- **Services** = done-for-you offerings monetizable today (Stripe links for infrastructure, forms for scraping)
- **Lead magnets** = "100 Qualified Potential Buyers Free" (services/homepage) + "Free Email Deliverability Audit" (product pages)
- **No direct signup** to the current app from the landing page (it would disappoint visitors expecting the full vision)

---

## Navigation

```
Logo | Products v | Services v | Use Cases v | Pricing | [Get 100 Free Potential Buyers]
```

### Products dropdown
| Item | URL | One-liner | CTA |
|------|-----|-----------|-----|
| Cold Email Platform | /products/cold-email | Sequences, A/B tests, scheduling | Get Access |
| Email Warmup | /products/email-warmup | Protect sender reputation at scale | Get Access |
| Email Verification | /products/email-verification | Multi-layer validation, catch-all detection | Get Access |
| Email Finder | /products/email-finder | Domain to decision maker, verified emails | Get Access |
| Email Deliverability Test | /tools/email-deliverability-test | Free audit. See where your emails land. | Test Free |

### Services dropdown
| Item | URL | One-liner | CTA |
|------|-----|-----------|-----|
| Apollo Scraper | /services/apollo-scraper | Export and enrich Apollo leads at scale | Get 100 Free Leads |
| Sales Navigator Scraper | /services/sales-navigator-scraper | LinkedIn Sales Nav data, verified and enriched | Get 100 Free Leads |
| Custom Scraping | /services/custom-scraping | Any data source, we scrape it | Request a Quote |
| Cold Email Infrastructure | /services/cold-email-infrastructure | Mailboxes, domains, DNS, full setup with Stripe | Buy Mailboxes |
| Free Leads | /services/free-leads | 100 signal-qualified potential buyers | Get Free Leads |

### Use Cases dropdown
| Item | URL | One-liner |
|------|-----|-----------|
| For SaaS Companies | /use-cases/saas | Outbound for B2B SaaS at every stage |
| For Agencies | /use-cases/agencies | Scale client outbound without scaling headcount |
| For Recruiters | /use-cases/recruiters | Find and reach passive candidates |
| For Consultants | /use-cases/consultants | Fill your pipeline without cold calling |
| For Startups | /use-cases/startups | First 100 customers on a founder's budget |

### Compare pages (moved to footer, NOT in main nav)
- vs Instantly, vs Apollo, vs Clay, vs Lemlist
- URLs stay at /compare/* but content is rewritten (see Compare Pages section below)
- Linked from footer "Resources" section

### Other nav items
- Pricing (keep in main nav)
- Agencies page -> removed, replaced by /use-cases/agencies
- Developers -> move to footer quick links only
- Compare -> move to footer "Resources" section

### Nav CTA button
"Get 100 Free Potential Buyers" (lavender, links to /services/free-leads or opens form)

---

## Homepage: Section-by-Section

### Section 1: Hero

**Headline:** "What if you only emailed people who were already looking to buy?"

**Subheadline:** "Most outbound is a guessing game. We track real buying behaviour to find companies actively looking for what you sell, reach their decision makers, and hand you a pipeline ready to close."

**Primary CTA:** "Get 100 Qualified Potential Buyers -- Free" (links to Airtable form / /services/free-leads)

**Secondary CTA:** "See How It Works" (scrolls to How It Works section)

**Visual:** The existing dashboard-hero.svg showing campaign analytics, or a new visual showing signals flowing into a pipeline. Future: replace with product demo video when available (Plyr + HSOverlay modal already set up in the template).

**Social proof strip below hero:** Customer logos + "Trusted by X outbound teams" (keep existing marquee).

---

### Section 2: The Problem (Old Way vs New Way)

**Section title:** "Cold email is broken. Here's why."

**Format:** Two-column comparison table.

| The Old Way | The SendEmAll Way |
|---|---|
| Static lists. Buying names and titles from a database. | Live signals. Outreach triggered by hiring, funding, and research activity. |
| Blind outreach. Guessing who might need you. | Buying behaviour. Data showing they are actively evaluating solutions now. |
| Volume-first. Spray 1,000 emails hoping for 1 reply. | Precision-first. 50 emails to the 50 people most likely to buy today. |
| 5+ tools stitched together. Fragile, expensive. | One platform. Discovery to delivery in a single pipeline. |

**Closing stat:** "94% of B2B buyers lock their vendor list before you ever contact them. If you're not reaching them while they're still deciding, you're already too late."

**No CTA in this section.** It's pure problem articulation. The CTA lives in the next section.

---

### Section 3: How It Works

**Section title:** "From ICP to closed deal. Four steps."

**Format:** Numbered visual flow (cards or timeline).

**Step 1: You describe your buyer**
You tell us your ICP or business details. Our system builds a targeting profile: industry, company size, tech stack, job titles, geography.

**Step 2: We find who's ready to buy**
We monitor 18+ signal sources. Hiring surges, funding rounds, tech stack changes, competitor research, ad spend. When a company matches your ICP AND shows buying behaviour, they enter your pipeline.

**Step 3: We reach their decision makers**
Verified emails for the right people at those companies. AI-personalized copy trained on the best cold email practices. Managed infrastructure (domains, mailboxes, warmup) so your emails actually land.

**Step 4: You hit send, manage replies, and close**
Review the campaign, approve it, hit send. Replies land in your unified inbox. You focus on closing, not prospecting.

**CTA:** "Get 100 Qualified Potential Buyers -- Free"
**Subtext:** "See it work on your ICP. No commitment."

---

### Section 4: The Signal + Intent Explainer

**Section title:** "Why signals and buying intent change everything"

**Format:** Three cards with a visual connector.

**Card 1: Signals alone = Noise**
"A company hired a new CMO. So what? Thousands of companies hire CMOs. Without knowing if they need what you sell, it's just noise."

**Card 2: Intent alone = Anonymous**
"Someone from Company X is reading G2 reviews about cold email tools. But who? Which team? Are they serious or just browsing?"

**Card 3: Signals + Intent = Your highest-probability buyer**
"A company hired a new CMO (signal), AND they're actively comparing your top competitors on G2 (intent). They have budget, mandate, and urgency. That's who we put in your pipeline."

**Supporting stat:** "Multi-signal outreach converts at 45-65%. Single-signal converts at 5-15%. We combine both."

**No CTA here.** Educational section. The conversion happens in surrounding sections.

---

### Section 5: What We Monitor (Signals Showcase)

**Section title:** "18+ signal sources. One pipeline."

**Format:** Visual grid of signal types with icons and real examples.

| Signal | Example | What it means |
|--------|---------|---------------|
| Hiring surges | "Company X posted 5 SDR roles this month" | They're scaling outbound. Need tools. |
| Funding rounds | "Series B, $20M raised last week" | Fresh budget, new priorities. |
| Tech stack changes | "Just added HubSpot, removed Salesforce" | In transition. Open to new vendors. |
| Ad spend signals | "Started running Google Ads for 'cold email tool'" | Actively investing in outreach. |
| Competitor research | "Visited Instantly and Smartlead pricing pages" | Comparing options right now. (Future: requires third-party intent data integration) |
| Authority signals | "CEO featured on 3 podcasts this quarter" | Growing brand, scaling operations. |

**CTA:** "Get 100 Qualified Potential Buyers -- Free"

---

### Section 6: The Platform (Products Preview)

**Section title:** "Everything you need. Nothing you don't."

**Format:** Four feature cards linking to full product pages.

**Card 1: Cold Email Platform**
Sequences, A/B testing, smart scheduling, lead management. Send campaigns that feel 1-to-1 at scale.
Link: /products/cold-email

**Card 2: Email Warmup**
Protect your sender reputation. Gradual volume ramp-up, automated engagement, deliverability monitoring. Included in every plan.
Link: /products/email-warmup

**Card 3: Email Verification**
Multi-layer validation. Catch-all detection. Bounce protection. Never waste a send on a dead address.
Link: /products/email-verification

**Card 4: Email Finder**
Domain to decision maker. Name + company to verified email. 8 pattern permutations, SMTP validation, waterfall enrichment.
Link: /products/email-finder

**CTA:** "Get Access" (links to Airtable form)

---

### Section 7: Pricing

**Section title:** "Transparent pricing. No hidden costs."

**IMPORTANT: Profitability review.**

The current pricing bundles everything (signals, enrichment, verification, sending, infrastructure) into credit-based plans. The visitor is NOT paying for "200 leads delivered." They're paying for a platform that helps them find, verify, personalize, and send to ~200 potential buyers per month. The value isn't "200 leads" (Apollo gives you 1,000 for $49). The value is that these 200 are SIGNAL-QUALIFIED (they're actually looking to buy) with VERIFIED EMAILS and AI-PERSONALIZED COPY and MANAGED INFRASTRUCTURE. That's 4-5 tools replaced.

Reframe the tier descriptions to emphasize the full pipeline value, not just "buyers reached":

| | Pro | Business | Scale |
|---|---|---|---|
| Price | $149/mo | $349/mo | $599/mo |
| Managed mailboxes | 15 | 45 | 105 |
| Credits/mo | 1,500 | 5,000 | 15,000 |
| Signal-qualified buyers | ~200/mo | ~650/mo | ~2,000/mo |
| AI-personalized campaigns | Included | Included | Included |
| Email verification | Included | Included | Included |
| Managed domains + DNS | Included | Included | Included |
| Warmup | Included | Included | Included |
| Reply guarantee | -- | 50+ in 90 days | 50+ in 90 days |
| Dedicated CSM | -- | -- | Yes |

**Value framing below the table:**
"What you'd pay to do this separately:"
- Apollo/Clay for lead discovery: $99-$495/mo
- Hunter/Snov.io for email finding: $49-$199/mo
- ZeroBounce for verification: $39-$159/mo
- Warmbox for warmup: $15-$49/inbox/mo (x15 inboxes = $225-$735)
- Instantly/Smartlead for sending: $47-$358/mo
- Google Workspace mailboxes: $126-$882/mo (at $8.40 direct)
- **Total: $600-$2,800+/mo**
- **SendEmAll: $149-$599/mo. Everything included.**

This is NOT a race-to-the-bottom price comparison. It's showing the VALUE of consolidation with signal intelligence that none of those tools provide individually.

**CTA:** "Get Access" (Airtable form)
**Note below CTA:** "Platform launching soon. Reserve your spot."

---

### Section 8: Reply Guarantee (MOVED here, right after pricing)

**Keep existing content.** "50+ replies in 90 days. Or we double your credits." This is powerful risk reversal and belongs IMMEDIATELY after the price reveal. The visitor just saw the cost. Now they need reassurance.

---

### Section 9: Works With Your Stack

**Section title:** "Already using a sequencer? We integrate."

**Copy:** "Use Instantly, Smartlead, Lemlist, or Woodpecker? No problem. We source your buyers, you send from your platform. Or use ours. Your choice."

**Platform pills:** Instantly, Smartlead, Lemlist, Woodpecker, Plusvibe, EmailBison

**CTA:** "See all integrations" (link to /integration)

**Purpose:** Addresses the objection "I already have a sending tool." SendEmAll isn't just a sequencer competitor; it's a lead intelligence layer that works WITH existing tools. This positions the service pages (infrastructure, scraping) as add-ons to their current stack.

---

### Section 10: Testimonials

**Keep existing 10 testimonials.** Update any that reference the old positioning ("replaced Apollo, Instantly, Clay" messaging). Reframe around outcomes: reply rates, meetings booked, pipeline generated. Specific numbers always.

---

### Section 11: Developer Teaser

**Keep existing.** REST API, MCP Server, Webhooks, CSV Import. Good for the developer audience. CTA stays "Explore the API" linking to /developers.

---

### Section 12: FAQ (Expanded for SEO)

**Section title:** "Frequently Asked Questions"

Comprehensive FAQ targeting common search queries. Each answer should be 2-4 sentences. Structured for FAQ schema (JSON-LD) for rich snippet eligibility.

**About the platform:**
1. "What is SendEmAll?" — Signal-based outbound platform. We find companies showing buying signals, reach their decision makers with personalized outreach, and manage the infrastructure so your emails land.
2. "What are buying signals?" — Observable company events that indicate a company may need your product: hiring surges, funding rounds, tech stack changes, ad spend, competitor research activity.
3. "What is buying intent?" — Evidence a company is actively researching or evaluating solutions in your category. When combined with signals, it identifies your highest-probability buyers.
4. "How do you find potential buyers?" — We monitor 18+ data sources for signals and buying behaviour. When a company matches your ICP and shows relevant signals, we find their decision makers, verify contact info, and add them to your pipeline.
5. "How is this different from buying a lead list?" — Lead lists give you names and titles. We give you companies actively showing buying behaviour, with verified decision maker contacts and AI-personalized outreach copy. Not random. Signal-qualified.

**About existing tools:**
6. "What if I already use Instantly/Smartlead/Lemlist?" — We integrate with existing sequencers. Use SendEmAll for signal-based lead discovery and your current platform for sending. Or switch to our built-in cold email engine. Your choice.
7. "How is SendEmAll different from Apollo?" — Apollo is a contact database. You search by title and industry. SendEmAll monitors real-time buying signals to find companies actively looking to buy. We use Apollo as one of our 18+ data sources.
8. "How is this different from 6sense or ZoomInfo?" — They're enterprise intent platforms at $15K-$150K/year. We provide similar signal-based intelligence at $149-$599/mo with full execution (we don't just tell you who's in-market, we reach them for you).
9. "Do I need to replace my current tools?" — No. SendEmAll works alongside your existing stack. But most customers end up consolidating because we cover discovery, verification, sending, and infrastructure in one platform.

**About the free offer:**
10. "What's included in the free 100 potential buyers?" — 100 companies matched to your ICP that are showing real buying signals. Each comes with verified decision maker contact info. Delivered as a CSV within 48 hours.
11. "Is the free offer really free? What's the catch?" — No catch. We want you to see the quality difference between signal-qualified leads and generic Apollo exports. If you want more, we'll talk pricing.
12. "How long does delivery take?" — 48 hours for the free 100 potential buyers. Larger orders vary based on volume and complexity.

**About pricing and services:**
13. "Why is SendEmAll cheaper than using 5+ separate tools?" — We built the entire pipeline in-house. No middleman markup. No per-seat licensing. One subscription covers everything from discovery to delivery.
14. "Can I just buy mailboxes without the platform?" — Yes. Visit our Cold Email Infrastructure page to buy Google Workspace, Microsoft 365, or custom SMTP mailboxes with full DNS setup. Stripe checkout, no subscription required.
15. "Do you sell pre-warmed mailboxes?" — Yes. Ready-to-send mailboxes with 2-3 weeks of warmup already completed. Premium pricing, instant deliverability.
16. "What's the managed setup add-on?" — For $0.50 per account, we configure your new mailboxes inside your existing sequencer (Instantly, Smartlead, Lemlist, Woodpecker, etc.). Domains, DNS, SPF/DKIM/DMARC, everything.

**About deliverability and warmup:**
17. "How does your email warmup work?" — Automated engagement through a network of real inboxes. Gradual volume increase, spam folder rescue, read/reply simulation. Protects sender reputation from day one.
18. "What's included in the email deliverability test?" — Free audit of your sending domain. We check DNS configuration, blacklist status, inbox placement across Gmail, Outlook, Yahoo, and more. Results delivered to your email.
19. "Do you support SPF, DKIM, and DMARC?" — Yes. All mailboxes come with SPF, DKIM, and DMARC pre-configured. We also monitor for DNS issues and alert you if anything breaks.

**About data and compliance:**
20. "Is my data safe?" — Yes. We're GDPR-compliant, encrypt data in transit and at rest, and never share your lead data with other customers.
21. "Where does the data come from?" — We aggregate from 18+ sources including Apollo, LinkedIn Sales Navigator, hiring boards, funding databases, tech detection services, and ad transparency APIs. All publicly available data.
22. "Can I export my leads?" — Yes. CSV export at any time. Your data, your leads.

---

### Section 13: Final CTA

**Headline:** "Stop emailing strangers. Start closing buyers."

**Subtext:** "Get 100 signal-qualified potential buyers matched to your ICP. Free. No commitment."

**Primary CTA:** "Get My Free Potential Buyers" (Airtable form)

**Secondary CTA:** "Or talk to us" (link to /contact)

---

## Product Pages

All product pages follow the same template. Each competes with standalone tools in search (e.g., /products/email-warmup competes with Warmbox, MailReach, lemwarm).

### Template structure
1. **Hero:** Headline + subheadline + CTA ("Get Access")
2. **The Problem:** What's broken about the current way
3. **How We Solve It:** 3-4 feature blocks with visuals
4. **Social Proof:** Testimonial or stat relevant to this feature
5. **FAQ:** 4-6 questions specific to this product
6. **CTA:** "Get Access" (Airtable form)

### /products/cold-email
- Competes with: Instantly, Smartlead, Lemlist, Woodpecker
- Hero: "Cold email that doesn't feel cold."
- Problem: Generic sequences, no personalization, no signal context
- Features: Multi-step sequences, A/B testing, smart scheduling, lead management, unified inbox, campaign analytics
- Differentiator: Signal-qualified leads feed directly into campaigns (when integration is built)

### /products/email-warmup
- Competes with: Warmbox ($15-$159/mo), lemwarm ($29-$49/mo), MailReach, WarmupInbox
- Hero: "Send from day one. Land in the inbox from day one."
- Problem: New domains/mailboxes land in spam. Manual warmup takes weeks.
- Features: Gradual volume ramp-up, automated engagement network, deliverability monitoring, DNS/blacklist alerts, reputation scoring
- Differentiator: Included free in every plan (competitors charge $15-$49 per inbox per month separately)
- SEO targets: "email warmup tool", "email warmup service", "sender reputation tool"

### /products/email-verification
- Competes with: ZeroBounce, NeverBounce, DeBounce, EmailListVerify
- Hero: "Never send to a dead address again."
- Problem: Bounces destroy sender reputation. Catch-all domains waste credits.
- Features: Multi-layer SMTP validation, catch-all detection, disposable email filtering, bulk list cleaning, real-time API
- Differentiator: Built into the pipeline (verify before you send, automatically), not a separate tool you export/import CSVs into
- SEO targets: "email verification tool", "email verification API", "bulk email verifier"

### /products/email-finder
- Competes with: Hunter.io, Snov.io, VoilaNorbert, RocketReach, Anymailfinder
- Hero: "Company name in. Decision maker's verified email out."
- Problem: You know the company but not who to email. Or you have a name but can't find a verified address.
- Features: Domain to decision maker discovery, name + domain to verified email, 8 email pattern permutations, waterfall enrichment (Clearbit + MX + SMTP), bulk processing
- Differentiator: Not just finding emails but finding the RIGHT person based on signals (when the person is a decision maker showing buying intent)
- SEO targets: "email finder tool", "find email by company", "B2B email finder"

---

## Service Pages

### /services/apollo-scraper
**What:** Dedicated Apollo.io scraping and enrichment service. Own page for SEO ("apollo scraper" is a high-volume keyword) and link sharing.

**Hero:** "The Apollo Scraper That Actually Delivers Clean Data."

**Content:**
- What we extract: Contacts, companies, emails, phone numbers, job titles, company data from Apollo
- What makes us different: Not just raw exports. We enrich with buying signals, verify emails, match to your ICP.
- How it works: Share your Apollo search criteria or saved lists. We scrape, enrich, verify, deliver CSV within 48 hours.
- Volume: From 100 to 100,000+ contacts per batch.

**CTA:** "Get 100 Free Leads" (links to /services/free-leads form)
**Secondary:** "Need ongoing scraping? Talk to us." (Form B)

**SEO targets:** "apollo scraper", "apollo lead scraper", "scrape apollo leads", "apollo data export", "apollo.io scraper"

### /services/sales-navigator-scraper
**What:** Dedicated LinkedIn Sales Navigator scraping service. Own page for SEO ("linkedin sales navigator scraper" is high-volume).

**Hero:** "LinkedIn Sales Navigator Data. Extracted, Verified, Delivered."

**Content:**
- What we extract: Decision maker profiles, company data, verified emails from Sales Nav searches
- What makes us different: Not just profile scraping. We find verified emails, enrich with company signals, and deliver ready-to-use lead lists.
- How it works: Share your Sales Nav search URL or describe your targeting. We extract, enrich, verify, deliver within 48 hours.
- Compliance note: We respect LinkedIn's terms. Data is processed ethically and GDPR-compliantly.

**CTA:** "Get 100 Free Leads" (links to /services/free-leads form)
**Secondary:** "Need ongoing extraction? Talk to us." (Form B)

**SEO targets:** "linkedin sales navigator scraper", "sales navigator scraper", "scrape sales navigator", "sales nav lead extraction"

### /services/custom-scraping
**What:** "Tell us your data source. We scrape it." Separate page for custom/niche data requirements.

(Content unchanged from previous spec)

### /services/cold-email-infrastructure
**What:** Mailbox sales (GW, Microsoft, Azure, SMTP) + domain setup + DNS config + warmup + add-to-sequencer service.

**Hero:** "Cold Email Infrastructure That Actually Lands in the Inbox."
**Sub:** "Mailboxes, domains, DNS, warmup. Fully managed. Ready to send."

**Content:**

**Tier 1: Self-serve mailboxes**
Buy mailboxes, get credentials, add to your sequencer yourself.

| Provider | Price/mailbox/mo | What's included |
|----------|-----------------|-----------------|
| Google Workspace | $X/mo | Full GWS account, SPF/DKIM/DMARC pre-configured |
| Microsoft 365 | $X/mo | Exchange Online, authentication configured |
| Custom SMTP | $X/mo | Dedicated SMTP, IP rotation support |

Stripe checkout links for common packages (10, 25, 50, 100 mailboxes).

**Tier 2: Pre-warmed mailboxes**
Same as above but already warmed (2-3 weeks of automated engagement completed). Premium price. Ready to send from day one.

Stripe checkout links.

**Tier 3: Managed setup**
We buy domains, configure DNS (SPF, DKIM, DMARC), create mailbox accounts, warm them up, AND add them to your existing sequencer (Instantly, Smartlead, Lemlist, Woodpecker, etc.).

+$0.50 per account add-on for sequencer integration.

**CTA:** "Buy Mailboxes" (Stripe) + "Need custom setup? Talk to us" (Airtable form)

**Note:** Show actual pricing on this page. Transparency is the brand. Compare with market prices: "Google Workspace direct: $8.40/mailbox/mo. Through us: $X/mo. Full setup included."

### /services/custom-scraping
**What:** "Tell us your data source. We scrape it."

**Hero:** "Any data source. Any format. We handle it."

**Content:**
- Examples of past scraping projects (or potential examples)
- How it works: Describe your data source and requirements. We quote within 24 hours. Deliver within the agreed timeline.
- Use cases: Conference attendee lists, industry directories, niche databases, government records, job boards

**CTA:** Airtable form (Form B: Work Email, Company, What do you need?, Website)

**No pricing.** Each project is custom-quoted.

### /services/free-leads (Lead Magnet Landing Page)
**What:** Dedicated landing page for the "100 Qualified Potential Buyers" lead magnet.

**Hero:** "Get 100 qualified potential buyers. Free. Matched to your ICP."

**Content:**
- What you get: 100 companies showing real buying signals, matched to your ICP, with verified decision maker contacts
- How it works: Tell us your ICP. We run our signal engine. You get a CSV within 48 hours.
- What makes these different from Apollo exports: Signal-qualified (not random), ICP-matched (not just title/industry filtered), verified (not catch-all junk)

**Form (4 fields):**
1. Work Email *
2. Company Name *
3. Describe your ideal customer * (textarea, placeholder: "e.g. B2B SaaS companies, 50-200 employees, using HubSpot, actively hiring SDRs")
4. How many potential buyers do you need per month? * (dropdown: Just testing (100) / 500-1,000 / 1,000-5,000 / 5,000+)

**Airtable backend pipeline:**
1. Form submitted -> new row in "Lead Magnet Requests" base
2. Automation fires -> email notification to team + confirmation email to lead
3. Fulfill -> run LeadGen scrapers with their ICP, attach CSV to Airtable row
4. Deliver -> email the lead their 100 potential buyers + SendEmAll pitch
5. Track -> update status: New -> Scraping -> Delivered -> Converted / Nurture

**Budget qualifier logic:**
- "Just testing (100)" = deliver free batch, add to nurture sequence
- "500-1,000" = real prospect, personal follow-up call
- "1,000-5,000" = high-value, prioritize fulfillment, discuss pricing
- "5,000+" = enterprise/agency, immediate outreach, custom quote

### /services/inbox-placement (Future, Wave 3)
**What:** Free inbox placement test. Uses existing IPQualityScore integration.

**Hero:** "Know where your emails land. Before you hit send."

**Content:** Submit your domain, we test placement across Gmail, Outlook, Yahoo, etc. Free report.

**CTA:** Airtable form (email + domain to test). Deliver results, upsell monitoring.

---

## Free Tool Page

### /tools/email-deliverability-test
**What:** Free email deliverability audit tool. Already exists as a public tool in the SendEmAll app (no login required). This page wraps it with marketing content for SEO.

**Hero:** "Free Email Deliverability Test. See Where Your Emails Actually Land."

**Content:**
- Embedded tool or link to the existing public deliverability test
- What we check: DNS configuration (SPF, DKIM, DMARC), blacklist status, inbox placement across Gmail, Outlook, Yahoo, authentication issues
- How it works: Enter your sending domain or email address. We run a comprehensive check. Results delivered instantly (or to your email).
- Why it matters: "If your emails land in spam, nothing else matters. Not your copy, not your list, not your sequencer."

**CTA:** "Test My Deliverability" (runs the free tool)
**Secondary CTA:** "Fix your deliverability issues. Get Access to SendEmAll." (Form C)

**SEO targets:** "email deliverability test", "email deliverability checker", "inbox placement test", "free deliverability audit", "check email deliverability"

**Lead capture:** Gate the full report behind email. Show a summary ungated (pass/fail on major checks), require email for the detailed breakdown + recommendations.

---

## Compare Pages (Rewritten)

Compare pages stay at /compare/* but content is completely rewritten. They are NOT in the main nav (footer only).

**New positioning:** "[Brand] Alternative" instead of "compare X vs Y." Research confirms "[brand] alternative" has 5-10x more search volume than comparison queries.

### Template for all compare pages
1. **H1/Title tag:** "Best [Competitor] Alternative for Cold Email (2026)"
2. **Opening:** Why people look for alternatives (their pain with the competitor)
3. **Comparison table:** Feature-by-feature, but framed around signal-based value, not just pricing
4. **What [Competitor] does well:** Honest acknowledgment (builds trust)
5. **Where SendEmAll is different:** Signal-based discovery, full infrastructure, transparent pricing
6. **Integration note:** "We use [Competitor] as one of our 18+ data sources" (where applicable for Apollo)
7. **CTA:** "Get 100 Qualified Potential Buyers" (not just "sign up")

### Content pivot from current pages
- Current: Price fight ("they charge X, we charge Y") and stack unification ("5 tools into 1")
- New: Signal intelligence ("they give you a database, we give you buyers showing intent") and outcome focus ("they help you send more, we help you close more")

---

## Use Cases Pages

5 industry-specific pages, each targeting "cold email for [industry]" keywords. Each page speaks directly to that audience's specific pain points and use cases.

### Template for all use case pages
1. **Hero:** Industry-specific headline addressing their primary pain
2. **The Problem:** What outbound looks like in this industry (specific examples)
3. **How SendEmAll Solves It:** Signal types most relevant to this industry
4. **Example Pipeline:** Concrete example of ICP -> signals -> buyers for this industry
5. **Testimonial:** Industry-relevant (if available, otherwise generic)
6. **CTA:** "Get 100 Qualified Potential Buyers" (with ICP pre-filled for this industry)

### /use-cases/saas
- Hero: "Outbound for B2B SaaS. Find companies already evaluating your category."
- Signals: Tech stack changes, competitor research, hiring SDRs/AEs, Series A-C funding
- Example: "SaaS company selling CRM software -> find companies that just removed Salesforce and are hiring a RevOps lead"

### /use-cases/agencies
- Hero: "Scale Client Outbound Without Scaling Your Team."
- Replaces the current /agencies page
- Content: How agencies use SendEmAll to serve multiple clients from one platform. Infrastructure services (buy mailboxes for clients). White-label potential.
- CTA: "Get 100 Free Leads for Your Next Client"

### /use-cases/recruiters
- Hero: "Find Passive Candidates Who Are Actually Open to Moving."
- Signals: Company layoffs, leadership changes, glassdoor sentiment, hiring freezes at competitors
- Example: "Recruiting firm -> find senior engineers at companies with recent layoffs or hiring freezes"

### /use-cases/consultants
- Hero: "Fill Your Pipeline Without Cold Calling."
- Signals: Companies hiring for the problem you solve, funding rounds (budget available), tech changes
- Example: "Marketing consultant -> find companies that just hired a CMO but don't have an agency yet"

### /use-cases/startups
- Hero: "Your First 100 Customers. On a Founder's Budget."
- Content: How startups use signal-based outreach to punch above their weight. No big team needed.
- Emphasis on the free 100 leads offer as zero-risk starting point.

---

## Lead Magnets

### Lead Magnet 1: "100 Qualified Potential Buyers"
- **Placement:** Homepage hero CTA, all service pages, nav button, exit intent on homepage, blog posts about lead gen
- **Form:** 4-field Airtable form (see /services/free-leads above)
- **Fulfillment:** Manual via LeadGen scrapers, delivered within 48 hours

### Lead Magnet 2: "Free Email Deliverability Audit"
- **Placement:** /products/email-warmup, /products/cold-email, blog posts about deliverability, exit intent on product pages
- **Implementation:** Already exists as public tool in SendEmAll app (email deliverability test, no login required). Link directly or embed.
- **Purpose:** Captures people who already send cold email (high-intent for the SaaS product)

### Placement rules
- Lead magnets NEVER compete with each other on the same page
- Lead Magnet 1 (100 buyers) = services world, homepage, top-of-funnel
- Lead Magnet 2 (deliverability audit) = products world, mid-funnel, technical audience
- Neither appears on the pricing page (pricing visitors are high-intent, don't distract)

---

## CTA Strategy

| Page | Primary CTA | Destination |
|------|------------|-------------|
| Nav button | Get 100 Free Potential Buyers | /services/free-leads |
| Homepage hero | Get 100 Qualified Potential Buyers. Free. | /services/free-leads |
| Homepage secondary | See How It Works | Scroll anchor |
| Homepage How It Works | Get 100 Qualified Potential Buyers. Free. | /services/free-leads |
| Homepage pricing | Get Access | Airtable Form C |
| Homepage final CTA | Get My Free Potential Buyers | /services/free-leads |
| Product pages | Get Access | Airtable Form C |
| Deliverability test | Test My Deliverability | Embedded tool / public tool link |
| Service: apollo scraper | Get 100 Free Leads | /services/free-leads |
| Service: sales nav scraper | Get 100 Free Leads | /services/free-leads |
| Service: infrastructure | Buy Mailboxes | Stripe checkout |
| Service: custom scraping | Request a Quote | Airtable Form B |
| Service: free leads | Get My Free Potential Buyers | Airtable Form A (inline) |
| Use case pages | Get 100 Free Potential Buyers | /services/free-leads (ICP pre-filled) |
| Compare pages | Get 100 Qualified Potential Buyers | /services/free-leads |
| Pricing page | Get Access | Airtable Form C |
| Blog: lead gen topics | Get 100 Free Potential Buyers | /services/free-leads |
| Blog: deliverability topics | Free Deliverability Test | /tools/email-deliverability-test |
| Blog: tool comparisons | Get Access | Airtable Form C |
| Developers | Get API Access | Airtable Form C |

---

## URL Structure

### New pages
```
Products:
/products/cold-email              NEW
/products/email-warmup            NEW
/products/email-verification      NEW
/products/email-finder            NEW

Services:
/services/apollo-scraper          NEW (dedicated page for SEO: "apollo scraper")
/services/sales-navigator-scraper NEW (dedicated page for SEO: "linkedin sales navigator scraper")
/services/custom-scraping         NEW
/services/cold-email-infrastructure NEW (SEO: "cold email infrastructure")
/services/free-leads              NEW (lead magnet landing page)

Tools:
/tools/email-deliverability-test  NEW (free tool, lead magnet 2, SEO: "email deliverability test")

Use Cases:
/use-cases/saas                   NEW
/use-cases/agencies               NEW (replaces /agencies)
/use-cases/recruiters             NEW
/use-cases/consultants            NEW
/use-cases/startups               NEW
```

### Deleted pages (fresh rewrite, no redirects needed)
```
/solutions/lead-generation        DELETED
/solutions/email-infrastructure   DELETED
/solutions/ai-personalization     DELETED (features folded into /products/cold-email)
/solutions/email-verification     DELETED
/agencies                         DELETED (replaced by /use-cases/agencies)
```

### Updated pages (same URL, rewritten content)
```
/compare/instantly    Rewritten: "Best Instantly Alternative" positioning (see Compare Pages section)
/compare/apollo       Rewritten: "Best Apollo Alternative" positioning
/compare/clay         Rewritten: "Best Clay Alternative" positioning
/compare/lemlist      Rewritten: "Best Lemlist Alternative" positioning
/pricing              Updated CTAs and framing
/developers           Updated CTA only
```

### Unchanged
```
/about, /contact, /terms, /privacy, /cookies, /changelog
/blog/*, /integration/*
```

---

## Forms (Airtable)

### Form A: "Get Free Leads" (lead magnet + lead scraping)
**Fields:**
1. Work Email * (email)
2. Company Name * (text)
3. Describe your ideal customer * (long text, placeholder: "e.g. B2B SaaS companies, 50-200 employees, using HubSpot, actively hiring SDRs")
4. How many potential buyers do you need per month? * (single select: Just testing (100) / 500-1,000 / 1,000-5,000 / 5,000+)

**Used on:** /services/free-leads, /services/lead-scraping, homepage CTAs, nav button, exit intent

### Form B: "Service Request" (custom scraping, infrastructure setup, general inquiries)
**Fields:**
1. Work Email * (email)
2. Company Name * (text)
3. What do you need? * (long text)
4. Website (URL, optional)

**Used on:** /services/custom-scraping, /services/email-infrastructure (for managed setup), /agencies

### Form C: "Get Access" (product interest / waitlist)
**Fields:**
1. Work Email * (email)
2. Company Name * (text)
3. Which products interest you? * (multi-select: Cold Email Platform / Email Warmup / Email Verification / Email Finder / Everything)
4. Current outbound tool (text, optional, helps understand migration path)

**Used on:** Product pages (/products/*), pricing page, compare pages

### Airtable base structure
Three tables in one base:
- **Lead Magnet Requests** (Form A submissions) - status pipeline: New -> Scraping -> Delivered -> Converted / Nurture
- **Service Requests** (Form B submissions) - status pipeline: New -> Quoted -> In Progress -> Delivered
- **Product Interest** (Form C submissions) - status pipeline: New -> Contacted -> Demo'd -> Waiting for Launch

Additional fields on every table (auto-populated by custom forms):
- `utm_source` (text)
- `utm_medium` (text)
- `utm_campaign` (text)
- `utm_content` (text)
- `utm_term` (text)
- `referrer` (URL)
- `landing_page` (URL)

Automations:
- New submission in any table -> email notification to team
- New submission -> confirmation email to the lead
- Daily digest of all new submissions

### Form implementation: Custom HTML forms (NOT Airtable iframe embeds)

**Why not iframes:** Airtable's embed iframes break GTM/GA attribution tracking. UTM parameters, referrer data, and session information cannot be passed into a cross-origin iframe. This means every form submission loses its attribution source, making it impossible to tell which channel, campaign, or page drove the conversion.

**Implementation approach:**
1. **Custom Astro components** for each form type (LeadMagnetForm, ServiceRequestForm, ProductInterestForm)
2. **Vercel Serverless Function** as API proxy (`/api/form-submit`) that receives form data and POSTs to Airtable API. The Airtable API key stays server-side, never exposed to the browser.
3. **UTM capture script** that reads URL params on page load, stores them in `sessionStorage` (persists across page navigations), and populates hidden form fields on render.

**Environment variables (Vercel):**
- `AIRTABLE_API_KEY` — Personal Access Token
- `AIRTABLE_BASE_ID` — Base ID
- `AIRTABLE_TABLE_LEAD_MAGNET` — Table ID for Form A
- `AIRTABLE_TABLE_SERVICE_REQUEST` — Table ID for Form B
- `AIRTABLE_TABLE_PRODUCT_INTEREST` — Table ID for Form C

**Form UX requirements:**
- Match site dark theme (rounded-2xl, border-border-light, bg-theme-dark, Tailwind classes)
- Client-side validation before submit (required fields, email format)
- Loading state on submit button (disable + spinner)
- Success message inline (don't redirect)
- Error message inline with retry option
- Noscript fallback: link to Airtable form directly

**Current state (as of 2026-04-14):** Custom HTML forms are live. AirtableForm.astro iframe component deleted. LeadMagnetForm, ServiceRequestForm, and ProductInterestForm post to `/api/form-submit` (Astro SSR route) which writes to Airtable. UTM tracking working. All forms tested on production.

**Pages to update:**
- `/services/free-leads` — Form A (lead magnet)
- `/services/custom-scraping` — Form B (service request)
- `/services/cold-email-infrastructure` — Form B (service request, for managed setup tier)

---

## Exit Intent Popups

| Page context | Popup offer | Form |
|---|---|---|
| Homepage | "Before you go: get 100 qualified potential buyers, free." | Form A (inline in popup) |
| Product pages | "Free email deliverability audit. See where your emails land." | Link to existing public tool |
| Service pages | "Get 100 free potential buyers. No strings." | Form A (inline in popup) |
| Blog posts | Content upgrade related to the post topic | Email capture only |
| Pricing page | No popup (high-intent visitors, don't interrupt) | -- |
| Compare pages | "Still comparing? Get 100 free leads and see for yourself." | Form A |

---

## Transition Plan

### Phase 1 (Complete as of 2026-04-14)
- All product page CTAs -> Custom Form C ("Get Access")
- All service page CTAs -> Custom Form A/B or Stripe links
- Homepage hero CTA -> Custom Form A ("Get 100 Potential Buyers")
- Fulfill lead requests manually using LeadGen scrapers
- Infrastructure sales via Stripe (7 payment links live: GW, MS, SMTP, Azure + pre-warmed variants)
- Custom HTML forms replaced Airtable iframes, UTM attribution working
- Cookie consent geo-targeted via Vercel middleware (banner only in GDPR regions)
- Visual QA passed (12 desktop pages, 5 mobile, 30 internal links)

### Phase 2 (When LeadGen stabilizes)
- "Get 100 Free Leads" becomes semi-automated: form triggers LeadGen API, results delivered automatically
- Product interest forms start converting to beta invites

### Phase 3 (When integration C is built)
- Full platform launch
- Product pages swap CTAs from "Get Access" form to actual signup
- "100 Free Leads" becomes the free trial (100 credits)
- Service pages remain as done-for-you upsell for customers who want hands-off
- URL structure stays the same, only CTAs change

---

## What Changes from Current Site

### Removed or replaced
- Old hero ("Your $37/mo cold email tool actually costs $600+") -> new signal-based hero
- Old problem section ("The outbound stack is broken" / tool consolidation) -> new "Old Way vs New Way" signal framing
- /solutions/* pages (4 pages) -> redirected to /products/* or /services/*
- "Start Free" / "Get 100 Free Credits" CTAs -> "Get 100 Qualified Potential Buyers" / "Get Access"
- Current signup flow (app.sendemall.com/signup) -> Custom HTML forms posting to Airtable API (temporary until platform is ready). Initially deployed as Airtable iframe embeds, being replaced with custom forms for UTM attribution tracking.

### Kept as-is
- Dark theme, Upstart template design language, animations, glass effects
- Sora font
- Blog (50 posts, unchanged)
- Compare pages (4 pages, update CTAs only)
- Integration page (18 providers, unchanged)
- Developer page (update CTA only)
- Footer structure
- Cookie consent
- SEO schemas (FAQ, Product/Offer, BlogPosting)
- Testimonials (update messaging if needed)
- Reply guarantee section

### New additions
- 4 product pages (/products/*)
- 4 service pages (/services/*) with dedicated Apollo and Sales Nav scraper pages
- 5 use case pages (/use-cases/*)
- 1 free tool page (/tools/email-deliverability-test)
- Custom HTML forms posting to Airtable API via Vercel Serverless Function (3 form types, with UTM attribution tracking). Replaces initial Airtable iframe approach.
- Stripe integration on infrastructure page (7 live payment links: GW, MS365, SMTP, Azure + pre-warmed)
- Exit intent popups (deferred)
- Updated navigation (Products + Services + Use Cases dropdowns)
- Signal/Intent explainer sections on homepage
- "What We Monitor" signals showcase section
- Expanded 22-question FAQ for SEO
- Rewritten compare pages with "[Brand] Alternative" positioning

### Rewritten
- All compare pages (new positioning, same URLs)
- Pricing section (signal-based value framing, profitability review)
- All existing page CTAs (no more app.sendemall.com/signup links)
- Testimonials (update to outcome-based messaging where needed)

---

## Copy Rules (Updated)

All existing CLAUDE.md rules apply, plus:
- Use "warmup" on landing page (not "Smart Ramp-Up") for SEO. Smart Ramp-Up is internal nomenclature only.
- Use "Get Access" not "Get Early Access" for pre-launch CTAs.
- No em dashes anywhere in copy. Use periods, commas, or line breaks instead.
- Signal/intent terminology: use plain English in hero and above-fold copy. Use technical terms (signals, buying intent) only in dedicated explainer sections below the fold.
- The visitor is the hero (StoryBrand). Copy addresses "you" and "your." SendEmAll is the guide, not the protagonist.
- Lead with outcomes, not features. "Find buyers who are ready" not "18+ signal integrations."
- Numbers and specificity everywhere. "100 qualified potential buyers" not "free leads." "$149/mo" not "affordable pricing."
- No em dashes in any content. This includes blog posts, page copy, meta descriptions. Use periods, commas, or restructure the sentence.

## Blog CTA Updates

The 50 existing blog posts have old CTAs pointing to app.sendemall.com/signup. These need updating:
- Blog posts about lead gen, outbound strategy, ICP -> CTA: "Get 100 Free Potential Buyers" linking to /services/free-leads
- Blog posts about deliverability, warmup, infrastructure -> CTA: "Free Deliverability Audit" linking to the public tool
- Blog posts about tool comparisons -> CTA: "Get Access" linking to Airtable Form C
- Implementation: Update the blog template's CTA component, not individual posts
