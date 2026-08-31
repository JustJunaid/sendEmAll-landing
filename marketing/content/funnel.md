# Funnel, tracking & the weekly loop

**The honest version.** Social attribution is genuinely lossy and anyone who tells you otherwise is
selling something. This doc says what we *can* measure, what we *can't*, and how we make decisions
anyway.

---

## The funnel

```
post  →  profile visit  →  website  →  signup
```

Each stage has one job and one number. **Do not optimise a stage for the next stage's metric** — a
post written to drive clicks stops being worth reading, and then it drives no clicks either.

| Stage | Job | Primary metric | Where it lives |
|---|---|---|---|
| **1. Post** | Be worth 15 seconds | comments + saves (not likes) | X: `pull-analytics.mjs`. **LinkedIn: native UI by hand** — no API (see OPERATIONS §6) |
| **2. Profile** | Explain who we are in 5s | profile views → bio link clicks | native platform analytics |
| **3. Website** | Earn the signup | `signup_click` event | PostHog (already instrumented) |
| **4. Signup** | — | registrations | app.sendemall.com |

**Likes are not a metric.** They correlate with nothing downstream. Comments and saves indicate the
post was worth someone's reputation or their bookmark bar. Those are the ones that predict stage 2.

---

## What already exists (verified in the codebase)

We are not starting from zero:

- **UTM capture + persistence** — `GlobalScripts.astro` reads `utm_source/medium/campaign/content/term`
  and persists them to `sessionStorage`, so a UTM landing on a blog post survives navigation to the
  form. `form-submit.ts` reads them back on submit.
- **Event helpers** — `src/lib/utils/tracking.ts`: `trackCTAClick`, `trackFormSubmission`,
  `trackFormStart`, `trackPageIntent`, `trackScrollDepth`, `trackSectionView`. Each fires to **both**
  GA4 and PostHog.
- **Signup intent is already captured** — `trackCTAClick` fires a dedicated `signup_click` PostHog
  event whenever the destination matches `app.sendemall.com/register|/register|/signup`.
- **A/B harness** — `src/lib/analytics/experiment.ts` with `[data-ab]` / `[data-ab-variant]`,
  driven by PostHog feature flags.

**The gap is not instrumentation. It's that no social traffic is tagged yet.** Fix that first.

---

## UTM convention (adopt exactly, no improvisation)

Ambiguity here destroys the dataset. One scheme, used everywhere:

```
utm_source   = linkedin | x | reddit | youtube        (the platform)
utm_medium   = social                                 (always, for organic social)
utm_campaign = <account-key>                          (junaid-x, sadiya-li, kamran-li, sendemall-x, …)
utm_content  = <YYYY-MM-DD>                           (the post's publish date)
```

Example bio link:
`https://www.sendemall.com/?utm_source=linkedin&utm_medium=social&utm_campaign=sadiya-li&utm_content=2026-08-24`

**Why campaign = the account, not the theme:** the decision we most need to make is *which voice is
working*. Theme is already recoverable from `utm_content` + the calendar.

Where UTMs go:
- **Bio / profile links** — always tagged. This is our main measurable path.
- **X post links** — tagged when we use one (rare; $0.20 vs $0.015).
- **Reddit** — tagged, but expect Reddit to strip/mask referrers.
- **LinkedIn post body links** — we mostly don't use them; tag if we do.

---

## What we cannot measure — say it out loud

Being honest about this prevents chasing ghosts:

1. **Dark social is the majority path.** Someone reads a post, remembers the name, googles it three
   days later on a different device. That lands as *organic search* or *direct*, not social. Our
   social attribution will always **understate** reality.
2. **LinkedIn referrer data is unreliable** — in-app browser, `lnkd.in` wrapping, and mobile app
   behaviour all mangle it. UTM'd bio links are far more trustworthy than referrer headers.
3. **Reddit strips referrers** on many paths and its API is closed to us commercially, so no
   programmatic post analytics — Reddit numbers are read manually.
4. **Impressions are platform-defined and not comparable across platforms.** Never put LinkedIn
   impressions and X impressions in the same column and draw a conclusion.

**Consequence:** treat directional movement over 4+ weeks as signal. Treat single-post spikes as noise.

---

## The weekly loop

**Friday, 30 minutes. Non-negotiable, because a measurement plan nobody runs is worse than none.**

1. **Pull the numbers** — `node marketing/autopilot/scripts/pull-analytics.mjs` for connected
   channels; manual for Reddit. Log to `marketing/analytics/YYYY-WW.md`.
2. **Per account, record:** posts published, impressions, comments, saves, profile views, bio clicks.
3. **Per site:** sessions with `utm_medium=social`, and `signup_click` count from those sessions.
4. **Answer three questions in writing:**
   - Which single post did best, and what was structurally different about it?
   - Which account is trending up over the last 4 weeks?
   - What's the one change for next week?
5. **Update `content/standard.md`** with anything that worked, so it compounds.

### Monthly (first Friday)
- Kill or fix the worst-performing account/format. **One change at a time** — see below.
- Re-run the anti-slop audit from `content-standard.md` against the last month's posts.

---

## Test protocol

Sequential, not parallel. With our volume, parallel tests are uninterpretable.

- **One variable per fortnight.** Post length, or opening style, or format — never two.
- **Minimum 6 posts per arm** before concluding anything. Below that you're reading noise.
- **Write the hypothesis and the success metric down before starting.** In the weekly log. A test
  without a pre-declared metric becomes whatever result you hoped for.
- **The landing page A/B is separate and also sequential** — one variant per week via the PostHog
  harness (see `autopilot/generate.md`). Don't run a copy test and a social test that touch the same
  claim in the same week; you won't be able to attribute either.

---

## Realistic expectations

Set these now so nobody panics in week three:

- **Weeks 1-4:** near-zero traffic. The job is publishing consistently and finding the voice that
  gets comments. Judge on comments, nothing else.
- **Weeks 5-12:** profile views and bio clicks should become non-zero and trend. First signups
  attributable to social are plausible here, in single digits.
- **A follower count is not a goal.** 200 people in outbound who read every post beat 5,000 who don't.
  On X specifically the code rewards this: mutual follows carry a 15x reply-weight boost, and the
  sub-1,000-follower cold-start subsidy means posting volume matters more now than later.

If after 12 consistent weeks a channel has produced no profile views and no comments, kill it. That
is a real decision this doc exists to make possible.
