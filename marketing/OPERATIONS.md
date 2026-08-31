# Operations — how this runs, forever

**Written 2026-08-27** from an 11-agent research round (company-page mechanics, algorithm behaviour
on both platforms, cadence evidence, measurement design) plus three adversarial critiques of the
result. Every number here has a source. Where the evidence is weak, it says so.

This is the only file that answers **"what do we do this week, and how do we know it worked."**
Copy rules live in [`content/standard.md`](content/standard.md). Voices live in
[`content/voices.md`](content/voices.md). This file is cadence, loop, measurement, iteration.

---

## 1. What this vertical is actually for

The chain is **post → profile → website → signup**. Each stage has exactly one job, and the most
common way to wreck it is optimising a stage for the next stage's metric.

| Stage | Its only job | What we watch |
|---|---|---|
| Post | Be worth 15 seconds | impressions, comments, saves |
| Profile | Explain who we are in 5s | **profile views** ← the weekly number |
| Website | Convert interest to signup | attributed sessions, `signup_click` |

**We never sell in a post.** The product appears only as evidence for something the post already
established.

---

## 2. Cadence — the honest version

### The research killed the rule we were following

There is **no credible evidence of a LinkedIn frequency penalty.** The largest within-account
dataset (Buffer, 2M posts / 94k accounts) finds per-post reach *rises* with weekly volume all the
way to 11+/week. The widely-repeated "18–24h minimum gap" and "40% reach drop for two posts a day"
have no traceable dataset behind them. So cadence is set by **what we can sustain at quality**,
never by fear of a penalty that does not exist.

### The company page is not a channel

At **135 followers** the page returns roughly **15–45 impressions per post** (Socialinsider,
1.3M posts / 16,645 pages). Three posts a week buys ~300 impressions a month for several hours of
work. Benchmark organic growth would add **~33 followers in a year**.

A page at this size is a **credibility surface** — what someone checks after meeting a human — plus
an ad-serving requirement and a follower-invite machine. Treating it as distribution is the single
biggest waste in the current plan.

### The live schedule (applied 2026-08-27)

Seven days, because spreading the same volume over 7 days instead of 5 fixed a real pile-up:
Fridays were carrying 14 of 50 posts. Weekend slots go to X — cheap, and no professional-context
question on a Saturday. LinkedIn personal profiles stay Mon–Fri.

| Account | /wk | Mon | Tue | Wed | Thu | Fri | Sat | Sun |
|---|---|---|---|---|---|---|---|---|
| junaid-x | 5 | 9am | | 9am | | 9am | 10am | 10am |
| sendemall-x | 5 | 5pm | 12pm | | 12pm | | 2pm | 2pm |
| sadiya-x | 3 | | 5pm | | 5pm | | 12pm | |
| kamran-li | 3–4 | 10am | | 10am | | 10am | 11am | |
| naved-li | 3 | | 10am | | 10am | | | 11am |
| sadiya-li | 3 | 12pm | | 12pm | | 12pm | | |
| sendemall-li | 3 | | 11am | | 11am | | 9am | |
| **posts/day** | | **4** | **4** | **3** | **4** | **3** | **4** | **3** |

All times ET. No account posts daily; every human is on alternate days.

**On day-of-week: do not re-litigate this.** At ~25 posts/week any breakdown by weekday gives 2–3
posts per cell and a guaranteed fake winner. The measurement rules below ban post-hoc slicing for
exactly this reason. Pick once, commit, move on.

### The minimum viable week

Write this down as the floor, because **programmes die when the aspirational number becomes
unreachable and people stop entirely.**

> **1 founder post + 2 page posts (repurposed) + 15 comments.**

A crunch week that hits the floor is a success, not a failure. A missed slot is never backfilled
with filler — one missed post costs nothing, one generic post teaches the classifier this account
is generic, silently and lastingly.

### Comment duty is the load-bearing habit, not posting

The cheapest evidence-backed presence mechanism we have:

- Commenting within the first **30 minutes** on someone else's post earns **3.8x** the mean
  impressions of commenting a day later (261,137 comments).
- The author replying in-thread is worth **+30% lifetime engagement**, holding for 83% of
  individual profiles (Buffer, 72k posts / ~25k accounts). Budget **10–15 minutes immediately
  after each post**.

This is a staffing decision, not a copywriting one, and it is worth more than every closing line
in the playbook combined.

---

## 3. Two free wins we are currently getting backwards

**Links.** Put link-out posts on the **Page** (+51% impressions, +41% interactions) and keep links
**off personal profiles** (−27% impressions, −20% interactions). Blog posts, changelog and tool
links belong on the page. On LinkedIn, **never attach a preview card** — a body URL performs on par
with no link (858 vs 786 median); a card collapses it to 414.

**Formats.** At the 1–5K band, native **document/carousel** posts average **525** impressions
against 235 for link posts and 300 for text — and carry the highest engagement rate (7.00%). They
are under 5% of all content published. Kamran's technical checklists are ideal carousel material.
Cut video: views fell **36% YoY** across every page follower band while pages doubled video output.

---

## 4. The page's real jobs, in priority order

1. **Spend the invite credits.** 50/month, shared across admins, reset on the 1st, returned when
   accepted. At a 25% accept rate that is **~+150 followers/year** versus ~+33 from posting.
2. **Cross 150 followers**, which unlocks **Page newsletters** — the one surface that bypasses feed
   ranking entirely and pushes a notification + email to every subscriber.
3. **Fix the static surfaces.** Banner, tagline, About, Products tab, Featured section (3 posts,
   pin one). A buyer spends 15 seconds there and reads none of the posts.
4. **Comment as the page** on posts by Clay, Instantly, Smartlead, lemlist, Apollo and agency
   owners — with substance. A useful comment on someone else's audience beats a post to 135 people.
5. Only then: post. Four types only — monthly shipped-things roll-up, quarterly original-data drop,
   integration/partnership announcements, milestones.

---

## 5. X — where reach actually lives

X's open-sourced ranker contains **no brand/company penalty**. The real handicap is structural: the
biggest lever in the code is a **+15 reply-weight boost that only fires on original posts from
mutual follows**, and a company account accumulates mutuals far more slowly than a person.

- **Founder account is primary.** Build mutual follows with ICP deliberately — every mutual
  permanently multiplies the reply-weight term for that viewer.
- **Original and quote posts only.** Retweets carry weight 1.0 and are excluded from both the
  cold-start boost and the bidirectional boost. Quotes carry 5.0 and are eligible.
- **Under 1,000 followers** you get a cold-start floor on **one** post per feed request. Front-load
  original posting now; it disappears at 1,000.
- **Never use link shorteners or tracking-redirect domains on X.** Highest-severity finding for us
  specifically — we are a cold-email company and our stack is full of redirect domains.
- **Never post AI-generated content through the API on the company account.** `llm_slop_user` maps
  to a SpamHighRecall label with a **30-day TTL**, and the exemptions (high follower count,
  PageRank ≥50) are exactly what a small account lacks.

---

## 6. Measurement — and the rules that stop us fooling ourselves

### The weekly number is profile views, not sessions

At ~48 sessions/week, **any weekly conversion number is noise.** Profile views per person per week
is the leading indicator we can actually move and read.

Attributed sessions are a **monthly cohort** number — trailing 30 days, never weekly.

### What is actually machine-readable (verified 2026-08-28, against the live API)

| Channel | Per-post impressions | How we read them |
|---|---|---|
| X (3 accounts) | **yes** | `pull-analytics.mjs` — impressions, likes, replies, retweets, quotes, bookmarks |
| LinkedIn (3 accounts) | **no** | native UI only, by hand |

LinkedIn personal-profile posts have **no analytics method in Postiz at all** — verified against the
upstream image, so it is not our scope patch. LinkedIn itself shipped a member analytics API
(`memberCreatorPostAnalytics`, July 2025) but it needs the `r_member_postAnalytics` permission, which
is a separate application; upstream issue gitroomhq/postiz-app#1680 tracks wiring it up.

**This is half our accounts and the half carrying our best content.** Until that permission exists,
LinkedIn numbers get read by hand out of the native UI once a week and typed into the monthly sheet.
`pull-analytics.mjs` reports those channels as `n/a`, never as `0` — a zero would be a fabricated
number that quietly drags every average down.

### Known bias, written down so nobody re-derives it

`respect_dnt: true` plus geo-gated consent means observed traffic is roughly **60–75% of true**
(≈5–12% DNT among a technical audience, plus 10–40% consent decline in GDPR regions). That haircut
is larger than nearly every effect we would chase. **Never reconcile PostHog against GA4** — they
have different consent paths and will disagree by a margin nobody can decompose.

### The five decision rules

1. **The 2x floor.** If A/B < 2.0 at n<100, A and B are the same. Put it on the dashboard.
2. **No percentages below n=100.** Report counts with bands: *"31 (95% band 20–42), up from 8"* —
   never "up 288%".
3. **No channel kill/scale decision on n<30** in the decision window. X is exempt from click-based
   judgement entirely; judge it on impressions, mutual follows and replies.
4. **One pre-declared breakdown dimension per quarter.** Dashboards ship with breakdowns collapsed.
   Post-hoc slicing is banned, not discouraged — 12 posts/week across any dimension gives 2–3 posts
   per cell and a guaranteed fake winner.
5. **No person-level comparison** until n≥50 posts each *and* the ratio exceeds 2x (~17 weeks).

### Pre-register the decision, before the period

One card per decision, signed before any data is seen:

> *Period: 1–31 Oct. Metric: attributed social sessions, trailing 30d. Decision: <15 → stop linking,
> go pure-awareness. >40 → link on all posts. 15–40 → change nothing, re-read 30 Nov.*

Three cards a quarter. **If a decision wasn't pre-registered, it isn't made this quarter.**

For anything without a card: no action until the metric moves the same direction across **three
consecutive 30-day windows** and the total change exceeds 2x. Under pure noise, three same-direction
moves happen 25% of the time — the 2x floor is what makes the pair usable.

### The attribution trap

The most tempting wrong conclusion is *"social is working — direct traffic and branded search are
up."* In any month we also shipped features, published blog posts, ran cold email and posted on
Reddit. **Log every non-social input on the same monthly sheet.** If two inputs moved, attribute to
neither. In month 5, run one deliberate **4-week social blackout** — a self-imposed counterfactual
is the only causal instrument available at this volume.

### Kill the hero A/B test

It needs **27,828 sessions** for a 20% lift at a 3% base — about 11 years at current traffic — and
weekly peeking inflates the false-positive rate from 5% to roughly 25–40%. It *will* show a winner,
and the winner will be noise. Keep the harness; pick the headline by judgment, which CLAUDE.md
already mandates for copy.

---

## 7. The weekly loop

| When | What | Command |
|---|---|---|
| Mon | Draft the week | follow `autopilot/generate.md` |
| Mon | **Lint before anyone reads it** | `node autopilot/scripts/lint-posts.mjs autopilot/output/week-*` |
| Tue | Human edit + approve (`proposed` → `approved`) | edit `posts.json` |
| Tue | Schedule | `node autopilot/scripts/publish.mjs <week-dir>` — **runs the linter itself and refuses on error** |
| Daily | Comment duty, 15–20 min per active voice | — |
| Daily | Author replies, 10–15 min after each post | — |
| Daily | Two ugly lines each into `content/moments.md` | — |
| 1st of month | Spend the page's invite credits | LinkedIn UI |
| Monthly | Read the numbers, apply the decision rules | `node autopilot/scripts/pull-analytics.mjs` |

**Nothing publishes that the linter rejects.** `publish.mjs` shells out to `lint-posts.mjs` and
exits 1 on any error. `SKIP_LINT=1` exists for a genuine emergency and prints a loud warning.

---

## 8. How this survives scale

Three mechanisms, each fixing a specific failure we have already had:

**Capture, don't generate.** Story posts are written *only* from `content/moments.md`. No moment
logged, no story slot that week — it falls back to a non-story skeleton automatically. This is why
the current 50-post batch contains exactly one story post: the file is empty and the rule held.

**A claim ledger, not topic assignment.** Two accounts asserting the same proof point in one week is
what reads coordinated — not two accounts on the same topic. `content/claims.md` holds one row per
claim with an owner and a 30-day cooldown.

**The standard is mechanical.** `lint-posts.mjs` enforces 25+ rules and `--self-test` proves each
one still fires (20 cases, including negative controls so a rule cannot pass by never firing). It
found 165 violations in our first batch and 45 in the first draft of its replacement — written by
the same person who wrote the rules, days apart. That is the case for mechanical enforcement in one
number.

**Probe it, don't trust it.** Before relying on a run, inject a violation and confirm it goes red.
A rule that cannot fail is not a rule — we shipped one (a malformed date silently disabled the
cooldown checks) and only found it by probing.
