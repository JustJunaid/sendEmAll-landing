# Personas & channel doctrine

**Written 2026-08-25**, after primary-source research (X's open-sourced ranker, LinkedIn's published
Feed SR paper, Reddit's Responsible Builder Policy, subreddit rules read verbatim). Supersedes any
earlier channel guidance where they conflict.

---

## The three rules that override everything else

**1. Never auto-publish an unedited draft to LinkedIn.**
Since 20 May 2026 LinkedIn demotes generic-AI posts and automated comments *silently*: the post stays
visible to your own followers while being cut from out-of-network recommendation. Your dashboard looks
normal; growth goes to zero and nothing tells you. Every post must carry something only the author
knows — a real number, a real client moment, a real decision from the monorepo. The autopilot drafts;
a human edits and publishes. This is not optional.

**2. Personal profiles beat company pages, decisively.**
Sub-2K-follower company pages average ~160 impressions/post and fell 27.5% YoY. Personal profiles win
on impressions, comments and engagement at every size below 10K followers. Junaid's face is the
distribution channel. The blocked SendEmAll LinkedIn page is therefore a minor loss, not a blocker.

**3. Reddit is manual. Always.**
Reddit closed self-serve OAuth registration in late 2025, and its terms require prior permission plus
a contract for any commercial use — which is us. Do not route Reddit through Postiz. Post by hand,
from real accounts, or not at all.

---

## LinkedIn: use Collab Posts, not four near-duplicates

LinkedIn shipped Collab Posts globally on 23 July 2026: up to five co-authors on one native post,
published to every co-author's audience, with a single shared comment thread.

For anything substantial (a data drop, a launch, a teardown) **one collab post beats four staggered
posts saying the same thing.** Four near-duplicates split the audience four ways, fragment the comment
thread, and look exactly like the coordinated pattern LinkedIn's classifiers are built to catch.

Use separate posts when the voices genuinely differ. Use collab when the message is one message.

---

## X: two mechanics worth building around

Both read directly from X's open-sourced ranker (`xai-org/x-algorithm`, `home-mixer/params/param.rs`):

- **Cold-start subsidy, expiring.** `author_cold_start.rs` lifts ONE original post per feed request to
  the rank-15 slot when the author has **≤1,000 followers**, the post has <1,000 views and is <24h old.
  It excludes replies and reposts. **Front-load original posting now** — this subsidy disappears the
  moment an account crosses 1,000 followers.
- **Mutual follows are the highest-leverage action in the codebase.** `BidirectionalFollowReplyWeightBoost = 15.0`
  takes reply weight from 5.0 to 20.0 when viewer and author follow each other. **Fifty real mutuals in
  the outbound niche beat five thousand one-way followers.** Follow back deliberately.
- **Replies do not buy distribution.** `OONRetweetReplyFilter` drops your replies from the For You feed
  of anyone who doesn't follow you. Replies earn thread readers and profile clicks — never reach.
  Budget them as relationship-building, not growth.

**Correction to our old rule:** X has no link penalty. `OpenLinkWeight` is **+0.2** (positive). The
"links suppress reach on X" belief is stale. Links are still worth avoiding *by default* for a
different reason — **$0.20/post with a URL vs $0.015 without, a 13x cost difference** — so use a link
when the click is the point, not as a habit.

---

## The territory — we sell into GTM, not just deliverability

An audit of our first 38 posts found **71% touched deliverability/infra and 0% touched LinkedIn
outreach** — while we sell LinkedIn follow-up and Naved runs it daily. That's a writer's bias toward
what's easiest to prove, not what the audience needs. The real territory is eight areas wide:

| # | Territory | What lives here |
|---|---|---|
| 1 | **Targeting & data** | ICP definition, buying signals, list building, enrichment, segmentation |
| 2 | **Copy & messaging** | Subject lines, first lines, sequence structure, follow-ups, offers, objection handling |
| 3 | **Multichannel** | Email + LinkedIn + calling orchestration, timing, channel sequencing |
| 4 | **Deliverability & infra** | Domains, DNS, warmup, mailboxes, sending reputation |
| 5 | **Data quality** | Verification, catch-alls, decay, provenance, list hygiene |
| 6 | **Metrics & economics** | Reply/meeting rates, cost per meeting, CAC, benchmarks, forecasting |
| 7 | **Team & ops** | SDR workflow, ramp, coaching, AI-SDR debate, agency operations |
| 8 | **Strategy & market** | Outbound vs inbound, ABM, build vs buy, where the category is going |

**Deliverability is one eighth of this, not two thirds.** Each voice owns two territories below, so no
single area dominates and no two voices compete for the same material.

---

## The personas

Four weekly cadences (decided 2026-08-27 — volume and regularity first; consolidate to two later
if feeding four proves unsustainable).

Each persona is defined by three things, in this order:
- **Desk** — what they are literally looking at when they write. Self-replenishing, un-fakeable.
- **Territory** — the two areas above they own.
- **Altitude** — `n=1` (this campaign, this week, named specifics) or `n=many` (across everything we
  run, the pattern). This is what lets two people with the same job write about the same topic on the
  same day and sound like different people.

Plus one **recurring artefact** each — a named, repeatable thing a reader can mentally subscribe to.
Everything else is filler between instalments.

> Voice detail here is the single source. The old `voice-*.md` files in `../archive/` are superseded.

### Junaid — founder
- **Desk:** the decisions and what they actually cost. Pricing, architecture, what we refused to build.
- **Territory:** Strategy & market · Metrics & economics
- **Altitude:** n=many — the business-level view.
- **Recurring artefact: "What it cost."** One decision, one number, including the unflattering version.
- **Voice:** first person, verdict-led, numbers as receipts. Confident about decisions, honest about
  what didn't work. Specific numbers · "the math" · "we tested" · "here's what actually happened".
- **Never:** motivational founder content; predictions that crown us without a falsifiable marker.

### Naved — GTM operator
- **Desk:** the matched pair on a list — he is the only person who sees the raw pull *and* the reply
  data for the same list. Plus he's running LinkedIn outreach from zero right now.
- **Territory:** Copy & messaging · Multichannel
- **Altitude:** n=many — across every campaign we run.
- **Recurring artefact: "The variant that lost."** Two versions, the numbers, why the loser lost.
- **Time-limited well, spend it now:** "the first 30 days of a new channel from zero." He just
  launched LI outreach; this expires in a month and nobody else can write it.
- **Voice:** analytical about persuasion. Shows the artefact — the actual line, the actual number.
- **Never:** copy advice with no example attached. If there's no artefact, it's an opinion.

### Sadiya — outbound practitioner
- **Desk:** the reply inbox, verbatim. Real prospect language, real objections, the shape of a "not now".
- **Territory:** Targeting & data · the conversation half of Copy & messaging
- **Altitude:** n=1 — this week, this client, this reply.
- **Recurring artefact: "What they actually said."** One real reply (anonymised), what it revealed.
- **Voice:** the journey, not the verdict. "I tested" · "here's what changed" · "I used to think".
- **The test:** if her post could run under Naved's name unchanged, the altitude is wrong.
- **Never:** more than one question-closer per week per platform.

### Kamran — infrastructure operator
- **Desk:** DNS records and bounce logs across many domains and tenants. A single-company operator
  sees a domain burn twice in a career; he sees the failure modes repeatedly.
- **Territory:** Deliverability & infra · Team & ops at agency scale
- **Altitude:** n=many — patterns across tenants.
- **Recurring artefact: "Domain postmortem."** What burned, the actual records, what would have caught it.
- **Voice:** procedural. Exact settings, record types, thresholds, "the order I run it in".
- **Format note:** his checklists are the best carousel material we have — document posts lead all
  LinkedIn formats (1.39x reach) and drive 12.92% of saves.
- **Never:** simplifying a protocol for a cleaner post. A DMARC error here costs more than the post earns.

### SendEmAll — X (company)
- **Desk:** the aggregate — what we see across all users and data.
- **Voice:** category POV, crisp, teaches before it mentions product.
- **Never:** originating a claim a human already made this week. It amplifies; it doesn't compete.

### SendEmAll — LinkedIn page *(blocked pending Community Management API)*
- Long-form education, six posts drafted and waiting. At <2K followers this is a ~160-impression
  channel — a credibility surface people check after meeting a person, not a growth channel.

---

## Making four cadences survive

Four voices is ~12 LinkedIn posts a week plus daily commenting, from people whose real job is revenue.
Three mechanisms decide whether it holds:

**1. Capture, don't generate.** 4 of Sadiya's 6 staged posts are blocked on `needsConfirmation`
because they invent client stories she must verify. That's the cadence's biggest failure risk. Fix:
`marketing/content/moments.md` — each person drops **two raw ugly lines a day**, no writing, just what
happened. The generator may write story posts *only* from that file. No moment logged, no story slot
that week — it falls back to a non-story skeleton automatically. "Log a thing" is the only version
anyone sustains.

**2. A claim ledger, not topic assignment.** Topic overlap is fine and unavoidable; two accounts
asserting the *same proof point* in the same week is what reads as coordinated. `marketing/content/claims.md`:
one row per claim, an owner, a 30-day cooldown. Enforced by the linter, not by goodwill.

**3. A missed slot is a normal event.** If someone misses, the slot goes empty — it is never
backfilled with generic filler. One missed post costs nothing; one generic post trains the classifier
that this account is generic, and that's silent and lasting.
