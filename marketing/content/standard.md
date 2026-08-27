# Content standard

**The single bar every post clears before it publishes.** If a draft fails any hard rule here, it
does not go out — no exceptions, no "it's close enough". This doc is the reason we don't need a
separate "is this AI slop?" review step: the standard is enforced at writing time, and approval is
the moment someone confirms it was.

---

## North star

> A stranger reads the post, gets something genuinely useful, and thinks *"who wrote this?"*

That's it. Not a click. Not a lead. The click comes from curiosity about the person, and the signup
comes from the site. **The post's only job is to be worth the 15 seconds.**

Funnel, in order — each stage has exactly one job:

| Stage | Job | We measure |
|---|---|---|
| Post | Be worth reading | impressions, saves, comments |
| Profile | Explain who we are in 5s | profile views → link clicks |
| Website | Convert interest to signup | `signup_click` (already instrumented) |

**We never sell in a post.** Not softly, not at the end, not "just a quick mention". The product
appears only when it is the honest answer to something the post already established — and even then,
as evidence, not an offer.

---

## The four hard rules

**1. Every factual claim traces to something real.**
A number comes from our own systems (the monorepo, the DB, a real run) or from a named public source
we link internally. If neither exists, the claim is cut — not softened, not hedged into vagueness.
Nothing is invented. Not a benchmark, not a client, not a "we've seen teams…".

**2. Every post teaches one thing a practitioner didn't already know.**
The test: could a competent outbound operator read this and learn something they'd repeat to a
colleague? "Signal beats spray" is not that. "DMARC passes if *either* SPF or DKIM passes and aligns —
the policy only fires when both fail" is. If the post only restates a position we hold, it's marketing.

**3. It must survive an expert reading it.**
Assume the smartest person in the niche reads every post. Any protocol detail, benchmark or
competitor claim gets verified before publishing. **A technical error on our own account costs more
credibility than the post could ever earn** — we sell deliverability; being wrong about SPF is fatal.

**4. It must not be reconstructable from a template.**
See the structural rules below. If you could swap the topic and reuse the skeleton verbatim, rewrite.

---

## Anti-slop rules (measured against our own drafts)

We audited our own 38-post batch. These are our real rates, not hypotheticals:

| Pattern | Our rate | Cap |
|---|---|---|
| Opens `Statement:` then a list | **36% (14/38)** | **max 1 in 5** — our most visible fingerprint |
| Closes with a question | 21% overall, **83% on one account** | **max 1 in 3 per account**, never twice running |
| `→` bullet arrays | 23% | fine, but never two consecutive posts on one account |

Also banned outright:
- **The same closer twice in a row on one account.** Rotate: question · flat statement · concrete
  rule · a number · no closer at all. A post is allowed to just end.
- **Colon-labels** ("The honest summary:", "Our position:", "Here's the thing:") — max one per post,
  max twice across any six-post run per account.
- **Engagement bait.** "Agree?" / "Thoughts?" / "Drop a 🙌" / "Save this ♻️". If the post earns a
  comment it earns it on substance.
- **Emoji as decoration or as bullet points.** A ✅ list is a tell.
- **Fake vulnerability.** "I'll be honest…" / "Unpopular opinion:" attached to a consensus take.
  If it isn't actually unpopular, don't claim it is.
- **The AI-slop lexicon** (also in CLAUDE.md): AI-powered, revolutionize, cutting-edge, game-changing,
  unlock, supercharge, seamless, effortless, leverage, empower, synergy, best-in-class, next-gen.
- **Em-dash overuse.** One per post, maximum.

### Structural variety — enforced per account, per fortnight
Across any six posts on one account, no more than **two** may share a skeleton. The skeletons:
1. Story → turn → lesson
2. Numbered protocol / checklist
3. Single argument, no list, one idea carried the whole way
4. Data drop → what it means
5. Definition / taxonomy (this thing means four different things)
6. Teardown (here's a claim, here's why it's wrong)

### Openings
The first two lines are the whole post — everything after "see more" is optional. An opening must do
one of: state a specific number, name a concrete moment, or contradict something the reader believes.
It must never be a throat-clear ("In today's competitive landscape…", "Let's talk about…").

---

## Grounded in the product

Every post ties to something real in the monorepo. That's what makes them impossible for a
competitor to copy and impossible to mistake for generic content:

| Pillar | Source of truth | Posts draw from |
|---|---|---|
| Leads | leadgen repo | signal scoring, ICP→preview, the 66M lake, provenance, freshness |
| Verification | `bulk_verify.py`, billing | 0.20% false-positive, catch-all handling, 30-day re-verify cycle, 1 credit = 1 valid |
| Mailboxes / infra | infra repo | auto-DNS, pre-warmed catalog, warmup engine (engagement network + real-send ramp) |
| Sequencer | sequencer repo | unlimited seats/workspaces, reply handling, free export |

**Before claiming a capability, check the code.** We have already been caught by this twice: a draft
claimed "verified at the point you export" when `bulk_verify.py` uses a 30-day cache, and another
claimed catch-alls inflate bounce rate when by definition they accept mail. Both would have been
publicly wrong on our core competency.

---

---

## The craft: four shapes, and why not the famous ones

**First, the honest state of the evidence.** There is no rigorous comparative study showing any
classic framework outperforms another on organic social. Every "best copywriting frameworks" article
is vendor SEO with nothing behind it. PAS, AIDA, BAB and FAB were built for *paid direct response* —
sales letters and ads — which have three things we don't: a purchase ask, paid distribution, and a
reader who already opted in. **Transplanting them wholesale is the cargo cult.**

What we take from them is shape, not doctrine.

### What we deliberately don't use

- **AIDA** — built around a terminal purchase *Action*, which is exactly what "never sell in a post"
  forbids. Strip the Action and AIDA is just "a post". Its classic Attention device is the question
  opener, the worst-performing style measured.
- **FAB** — a product-sheet framework. Pure selling, no informational payload. Fails our rule that
  every post must teach something. (It has a legitimate home on `/leads` and `/mailboxes`. Not here.)
- **StoryBrand** — a *positioning* framework for one artefact done once, not a per-post shape. We've
  already done that work (the "own both halves" story in CLAUDE.md). Applied per-post it produces
  visible sameness, which is what the classifier demotes.
- **PAS's "Agitate" step** — keep Problem→Solution, delete the agitation. Our readers are agency
  owners and SDR leads who *live* this pain daily; agitating it reads as condescension to the exact
  expert reader rule #3 says must be survivable. And agitation's natural landing is
  "Solution = our product", which pushes straight into selling. **State the problem once, factually,
  then go to mechanism.** If a draft spends more than two lines making the problem feel worse, it
  has become a pitch.

### The four shapes we do use

**1. Concrete Cold Open** — the universal hook rule, applies to all four.
≤140 characters. Story or contrarian. A specific number, moment or claim. No label.
See `standard.md` for the full rules and the evidence.

**2. Moment → Turn → Rule** *(BAB, re-specified)*
A real, named moment — never a generic pain state. Something turns. You leave with a rule.
The "before" must be an actual Tuesday, not "many teams struggle with…".
*Natural owners: the n=1 practitioner voice.*

**3. Teardown: Claim → Evidence → Correction**
Take a claim — a vendor's, an industry truism, or one of our own — and dissect it with evidence.
Contrarian openers rank second-best, and this shape fuses that with the must-survive-an-expert rule.
**This is our genuine moat.** It requires being technically right about deliverability, which a
competitor can't fake and a model can't generate without the monorepo.
*Natural owners: the infrastructure voice and the founder.*

**4. Data Drop: Number → Method → What it means → What it does NOT mean**
That last step is doing two jobs. It's the trust differentiator — almost nobody publishes the limits
of their own number — and it's the anti-slop vaccine, because an unprompted limitations section is
the single hardest thing for generated content to produce.
*Natural owner: whoever holds the number.*

### The two principles underneath all four

**Specificity creates belief.** And right now it's the winning bet for a specific, time-bound reason:
concreteness has an inverted-U, moderated by what competitors are doing. Where rivals are vague,
more concreteness lifts response ~5.5%; where rivals are already concrete, more *costs* ~9.9%. The
2026 feed is saturated with vague generated hooks, which puts us on the winning side. This is a
current-conditions bet, not a law — if the feed over-corrects, the optimum moves.

**Every line earns the next.** Justified by dwell time, not by Sugarman's authority: LinkedIn ranks
on read/scroll behaviour across 1,000+ historical interactions, and dwell is the dominant signal. No
line should be skippable without loss. This does **not** license padding — length must be an output
of having something to say, never a target.

### Two pieces of received wisdom that are dead

- **Question closers do nothing.** Measured difference between posts ending in a question and posts
  not: **0.07 percentage points** — indistinguishable from noise. The entire "end with a question to
  drive comments" doctrine is cargo cult. A post is allowed to just end.
- **What actually drives comments is replying**, not closing: +30% engagement on LinkedIn when the
  author replies in-thread. That's a *staffing* decision, not a copywriting one. Budget 30–45 minutes
  in-thread in the first 60–90 minutes after a post. It's worth more than every closing line in this
  playbook combined.

### Three tics we only found by counting

Measured across our own batches by `scripts/lint-posts.mjs`. Each was invisible post-by-post and
obvious in aggregate — which is the whole argument for a linter over a review gate.

- **The aphoristic kicker.** A standalone short final paragraph landing an epigram. Our first
  batch ran it **25 times out of 25**. Two independent cold reads said the same thing: *"real people
  are inconsistent; 25 for 25 is a machine."* Cap: **3 in any 5-post run per account.** A post is
  allowed to end inside its own argument.
- **The "nobody tells you" cold open.** "Nobody prices X." / "Everyone writes about A, almost nobody
  writes B." / "Most teams get this wrong." Seven of 25 posts across five accounts opened on it.
  It also builds a stupid reader to talk down to, which the agency-owner read named directly.
  Cap: **1 in 5 batch-wide.**
- **The hidden-taxonomy template.** "The thing you treat as one is secretly N things." Five long
  posts on four different accounts were structurally the same post. Cap: **no skeleton above 30%
  of a batch**, on top of the per-account rule below.

### Additions to the banned list

- **"It's not X, it's Y."** LinkedIn *specifically named* this contrast-reframe as an example of the
  formulaic content it demotes. It appears naturally in contrarian and teardown posts — the two
  shapes we use most — so audit for it deliberately. (Our own first batch shipped 6 of 38.)
- **Question openers.** See `standard.md`.
- **Uniform one-line paragraphs ("broetry").** Whitespace is good; *uniformity* is the tell. Mix
  paragraph sizes deliberately, 1–3 lines.
- **"Signal" as an abstract intensifier** ("high-signal", "signal-qualified" as filler). "Buying
  signals" is genuine industry vocabulary naming a real capability — keep that. The test is function,
  not the word.

### Link rules differ by platform

- **LinkedIn:** the penalty attaches to the **preview card**, not the link. Attached card ≈ 414
  median impressions; URL typed in the post body ≈ 858; no link ≈ 786. **Never attach a preview
  card.** A URL in the body performs on par with no link at all.
- **X:** no reach penalty (`OpenLinkWeight` +0.2, verified in the open-sourced ranker). The
  constraint is cost: $0.20 per post with a URL vs $0.015 without.

### Format worth exploiting

Document/carousel posts lead all LinkedIn formats — **1.39x reach, 1.30x engagement** — while making
up only 4.88% of content, and they drive 12.92% of all saves. Our technical checklists (SPF/DKIM/DMARC
alignment, the DNS setup order, the warmup ramp schedule) are ideal carousel material and inherently
save-worthy without any bait. This is the biggest untapped format in our plan. Caption ≤100 characters.

**Cadence:** 4–5 posts/week is the measured optimum, with diminishing returns past 7.

---

## The linter is the enforcement, this doc is the reasoning

`node marketing/autopilot/scripts/lint-posts.mjs marketing/autopilot/output/week-*`

Every hard rule above is a check. `--self-test` proves each one still fires (14 cases, including
negative controls so a rule can't pass by never firing). It found **165 violations in our first
batch and 45 in the first draft of its replacement** — written by the same person who wrote these
rules, days apart. That is the case for mechanical enforcement in one number.

It also caught a bug worth remembering: a malformed date made every timestamp unparseable, which
silently disabled the claim-cooldown and ordering rules. They passed by never running. There is now
a `bad-date` check, because a rule that can't fail isn't a rule.

**Probe it, don't trust it.** Before relying on a run, inject a violation and confirm it goes red —
a duplicate claim inside the cooldown, a reframe buried mid-post, a broken date. All three currently
fail correctly.

## Pre-publish checklist

Run this on every post. It takes 60 seconds.

- [ ] Would a practitioner learn something repeatable here?
- [ ] Does every number trace to a real source I can point at?
- [ ] Have I verified any protocol/technical claim first-hand?
- [ ] Is there anything only *we* could have written? (If it'd work for any competitor, rewrite.)
- [ ] Is the hook ≤140 characters, and not a question?
- [ ] Claim above the fold, mechanism below it?
- [ ] Different skeleton and different closer from this account's last post?
- [ ] Zero banned words, zero engagement bait, ≤1 em-dash, ≤1 colon-label?
- [ ] No "it's not X, it's Y"? No uniform one-line paragraphs?
- [ ] LinkedIn: no preview card attached?
- [ ] Am I selling? (If the product appears, is it evidence — or an offer?)
- [ ] X only: does this need a link? (No penalty, but $0.20 vs $0.015 — is the click the point?)

---

## Why this replaces a review gate

LinkedIn's classifier (live since 20 May 2026) does not detect "written by AI" — it detects
**generic**, and it demotes silently: the post stays visible to your own followers while being cut
from out-of-network recommendation, so analytics look normal while reach goes to zero.

A human approving generic content doesn't help. **The standard is the control, not the signature.**
The `proposed → approved` step in the pipeline is where someone confirms this checklist was actually
run — that's the gate, and it's the one we already have.


---

# Openings (merged from content/standard.md, 2026-08-27)


**This file is an input to the autopilot.** Anything in here gets written into drafts, so it must
comply with `content-standard.md` exactly. It previously contained "Hot take:" and "Unpopular
opinion:" openers that the standard bans — those were actively injecting slop into drafts and have
been removed.

## The hook rules (evidence-led)

**1. ≤140 characters. Hard cap, not a target.**
Engagement declines monotonically with hook length (2.61% at 0–40 chars → 2.08% at 200+ across
309,614 posts). That spread is *larger* than the gap between the best and worst hook style. Mobile
truncates around 140 characters, so 140 is the binding constraint. **A short mediocre hook beats a
long clever one.** Document/carousel posts tighten further — 0–100 characters.

**2. Never open with a question.**
Question openers finish **last** of five styles (2.16% vs 2.60% for story) despite being the most
commonly taught advice. A question invites the reader to answer it internally, which closes the
curiosity gap and removes the reason to read on. Convert every question opener into the specific
claim or moment that prompted it:
- ❌ "Is your warmup actually working?"
- ✅ "Our warmup pool sends 2.5 emails per mailbox on day one. Most vendors start at 20."

**3. Story and contrarian openers win. Labels lose.**
Ranked by median engagement: Story 2.60% · Contrarian 2.31% · Statement 2.27% · Results 2.19% ·
Question 2.16%. The contrarian *move* works — the **label** is what's burned. Delete "Hot take:",
"Unpopular opinion:", "I'll be honest". State the unpopular thing flatly and let the reader decide
whether it's unpopular. That also reclaims ~20 characters of a 140-character budget.

**4. Put the claim above the fold, the mechanism below it.**
The reader should know *what* you're claiming within 140 characters, and *why it's true* only by
reading on. Withholding both is clickbait shape and produces dwell-then-bounce, which LinkedIn counts
as a hard negative.

**5. Open loops must name what's missing.**
Curiosity needs a *bounded* gap, not general mystery. "I ran 4,000 sends" is not a loop.
"We ran the same 4,000-contact list through two verifiers and they disagreed on 11%" is — only the
post can close it. Close every loop in the same post; never in a comment or behind a link.

---

## Angles — candidates, not proven

> Nothing below has been measured. The April 2026 calendar was almost entirely unpublished before
> social went dormant. Treat every line as a candidate; promote to "Measured" only with numbers.

### Cost that hasn't been counted
- Your "$37/mo" cold email tool bills you $600+ once the stack is added up.
- Six subscriptions, five dashboards, and you are the integration layer between them.
- An SDR's Monday morning: export, clean, verify, upload, check warmup. First email goes out at 11.

### Targeting over volume
- A 10,000-row export filtered by job title is a spreadsheet of strangers, not a pipeline.
- Same copy, same mailboxes, different list: 0.9% → 3.4% reply rate.
- A company that just raised, posted three sales roles and added a CRM is a different email entirely.

### Deliverability reality
- A "clean" purchased list bounced 7% and cost a 14-month-old domain in nine days.
- DMARC passes if *either* SPF or DKIM passes and aligns. The policy only fires when both fail.
- Catch-alls accept everything. The email "delivers" and nobody reads it.

### Data honesty
- Database size is the easiest number to advertise and the weakest predictor of a campaign working.
- People change roles every 18–24 months. Verification is an event with a timestamp, not a label.
- 1 bad address per 500 marked valid — that's a 0.20% false-positive rate.

### Incentives
- We charge per valid email, so bounces and catch-alls cost us, not you.
- A verifier paid per record has no reason to be strict. One paid per valid email has no choice.
- Exporting your data out of our platform is free.

---

## Measured — lines that actually worked

_Empty. Populate from the Friday review (`funnel.md`). Each entry needs the line, account, date and
the number that justifies it. A line earns a place here only with evidence attached._

| Line | Account | Date | Result |
|---|---|---|---|
| _(none yet)_ | | | |
