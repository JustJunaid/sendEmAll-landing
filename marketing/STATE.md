# State — live ops

## 🚀 LAUNCHED 2026-08-27

**45 posts scheduled in Postiz, verified against the live API. 0 failures.**
First post published: https://twitter.com/send_em_all/status/2093037080121315499
Coverage: 27 Aug → 9 Sep, seven days a week. 6 page posts held (Community Management API).

Per account: junaid-x 10 · sendemall-x 10 · kamran-li 7 · naved-li 6 · sadiya-li 6 · sadiya-x 6.

### Three bugs the launch surfaced — all fixed, none findable from a dry run
1. **Postiz `settings` is provider-shaped.** We sent `{}` for every provider; X rejects a post
   without `who_can_reply_post` (400). All 13 X posts failed on the first attempt.
2. **`postId` was stored as `true`.** A `?? true` fallback masked the response shape, so the first
   17 published posts cannot be joined back to per-post analytics. Fixed for all future runs;
   those 17 need a manual backfill from `GET /posts` if we ever want their numbers.
3. **The public API throttles on a ONE-HOUR WINDOW, not a rate.** Pacing between requests does
   nothing. The response carries `retry-after` (observed 2103s) and the client now honours it —
   exponential backoff maxed out at 62s against a 35-minute wall and gave up every time.
   Practical limit: ~30 POSTs per hour. A 45-post batch needs two windows.


State as of **2026-08-21**. Code/scaffold is committed and content is staged; what's left is one
container restart, one API key, and the remaining channel connects. See the status block below.

## Status check 2026-08-21 (verified live)
- **Droplet healthy:** all 9 containers up, site ~200ms, TLS valid, registration locked.
  Memory: 2.4G used / 1.4G available, 1.5G swap in use — the 8 GB resize below is still recommended, not urgent.
- **Original root cause of "can't post": zero channels connected.** Nothing was broken; the July
  reconnects were never done.
- ✅ **Junaid X connected** (`cmt29cjz50001pk6syn1ltxew`).
- ✅ **Sadiya LinkedIn connected** (`cmt2tg0td0001o07qokm3h9xs`) — the scope patch was applied and the
  container recreated 2026-08-21; live scopes verified as the four-scope set.
- ✅ **`autopilot/.env` wired** — `scripts/list-channels.mjs` returns both channels over the public API.
- ⛔ **SendEmAll LinkedIn *page* cannot be connected yet.** The Page provider requires
  `rw_organization_admin` + `w/r_organization_social`; our app is authorized for none of them
  (probe-verified). **Not patchable** — page posting genuinely needs `w_organization_social`.
  Requires **Community Management API** approval on the LinkedIn app (review process). 6 posts drafted
  and waiting in `sendemall-li`.
- **2 weeks of content staged — REWRITTEN 2026-08-27.** 50 posts across 7 channels, all `proposed`:
  `autopilot/output/week-2026-08-31/` (Aug 31 - Sep 4) and `week-2026-09-07/` (Sep 7 - Sep 11).
  The previous 38-post batch is archived at `autopilot/output/archive/week-2026-08-24-superseded/`
  — it was never published and is kept only as the reference the audits were run against.
  **51 posts across 7 channels — 45 publishable now, 6 blocked on the Page API.** 0 carry `needsConfirmation` (every invented client anecdote was cut). 6 carry
  `blockedOnLinkedInPageApproval` (the company-page posts).
  Publish flow unchanged: flip keepers to `approved` -> `node scripts/publish.mjs <week-dir>`.
- **`scripts/lint-posts.mjs` now enforces the standard mechanically.** Run it before any approval:
  `node marketing/autopilot/scripts/lint-posts.mjs marketing/autopilot/output/week-*`
  `--self-test` proves each rule still fires (14 cases, incl. negative controls on clean copy).
  It caught 165 errors in the old batch and 45 in the first draft of the new one. Current: **0**.
  Rules cover the banned "it's not X, it's Y" reframe (shape, not phrasing), engagement bait,
  emoji, em-dash and colon-label caps, hook length, question openers, closer rotation, skeleton
  variety, territory concentration, cross-account phrase reuse, and a 30-day claim cooldown.
- **posts.json is the source of truth; the calendar is generated.** Never hand-edit post text in the
  calendar — edit the JSON and re-run:
  `node marketing/autopilot/scripts/build-calendar.mjs marketing/CALENDAR.md marketing/autopilot/output/week-2026-08-31 marketing/autopilot/output/week-2026-09-07`
- **The rewrite fixed real, publishable-error-grade mistakes.** Corrections made after an
  adversarial expert review, all verified against primary sources:
  - Catch-all addresses **do** bounce. Accept-then-reject topologies (M365 without Directory Based
    Edge Blocking, filtering gateways) accept at RCPT TO and issue the NDR asynchronously. The old
    batch said they "don't bounce" — dangerous next to a bounce-rate guarantee.
  - **SNDS and JMRP are IP-based.** On Google Workspace or M365 you don't control the sending IPs
    and cannot enrol. The standard "check SNDS" advice does not apply to most outbound setups.
  - **SURBL is a URI blocklist** (domains in message bodies — your link/tracking domain).
    Spamhaus DBL is the domain-level list that matters for the sending domain.
  - **Google Postmaster Tools needs DKIM alignment and real per-domain volume.** At a few mailboxes
    per sending domain the graphs never populate, and an empty dashboard is not a clean bill.
  - **Not all 4xx is benign.** A 4.7.x deferral citing unsolicited mail is a reputation warning;
    retrying into it accelerates the problem.
  - **Job tenure**: "people change jobs every 18-24 months" is false (BLS median tenure 3.9 years).
    The defensible figure is ~2%/month B2B contact decay, compounding to just over a fifth a year,
    and it traces to vendor research rather than an independent study — stated as such.
  - **No provider publishes a bounce-rate threshold.** Google publishes a 0.3% spam complaint rate
    (0.1% target). The old batch cited "3% bounce" as a standard four times and never mentioned
    complaint rate at all.
  - **Open Profile InMail** still requires the sender to hold Premium or Sales Navigator.
  - Verification is the *most* commoditized layer, not the least; coverage and recency are what stay scarce.
- **Second correction round, 2026-08-27 — 16-agent verification against primary sources.** An
  adversarial expert re-read flagged a dozen live issues; each contested fact was verified by an
  independent agent, and the five highest-impact ones by a second agent whose job was to refute the
  first. Four held, one was refuted. What changed:
  - **FATAL, fixed.** The bounce-code post said "5xx is permanent. Stop sending," then explained
    that one 5xx bucket is a *reputation* problem, and never withdrew the instruction. A reader
    following it would permanently suppress every recipient at a provider that blocked them during
    a bad week — good addresses, deleted forever. The post now reverses explicitly for the policy
    bucket: leave the recipients, pause the domain, reach them later from healthy infrastructure.
  - **InMail credits refund on response within 90 days** — accept, decline, or any reply, including
    LinkedIn's one-tap quick replies. Only ignored InMails cost anything. This was missing and it is
    the dominant variable; the post is rebuilt around it.
  - **You cannot waste an InMail credit on an opted-out member** — LinkedIn removes the send option
    rather than failing the send. The old post's entire payoff was a saving that does not exist.
  - **Open Profile: only the RECIPIENT needs Premium**, not the sender (we had it backwards). And
    LinkedIn has never offered a search filter for it, so the "sort your list by tier" instruction
    was not executable. Removed.
  - **InMail credits do not pool** across Premium / Sales Navigator / Recruiter.
  - **LinkedIn invitations are capped weekly, not daily, and no subscription raises the cap.**
    LinkedIn publishes no number; ~100/week is an observed ceiling and must be attributed that way.
    Our "20-25 a day depending on tier" was wrong twice over.
  - **SNDS and JMRP cover Microsoft's CONSUMER mailboxes only** (Outlook.com, Hotmail, Live), never
    Microsoft 365 business tenants. For an ordinary outbound setup there is no Microsoft-side
    reputation dashboard at all — only your own bounce text.
  - **DMARC is inherited by subdomains** (SPF and DKIM are not). "Configure all three per domain"
    is right for separately registered domains and wrong for subdomains. Now scoped.
  - **A/B sample sizes now stated, not gestured at**: at a 3% baseline and 80% power, ~800 sends per
    variant to detect a lift to 6%, ~5,500 to 4%, ~20,000 to 3.5%.
  - Also fixed on logic alone: "volume decides the damage" (complaint rate and trap hits decide,
    volume multiplies); the primary domain is exposed via *body* links to URI blocklists regardless
    of sending domain; the slice test claimed per-domain clustering a few hundred addresses cannot
    support; and "the only lever there is" routed a neutral post straight into a product line.
- **Territory mix fixed.** Deliverability was 71% of the old batch and is now 16%, with all eight
  territories covered and multichannel/LinkedIn outreach going from 0 posts to 4.
- **Story posts are gated on `marketing/content/moments.md`, which is empty.** That is the mechanism working:
  only 1 of 50 posts uses a story skeleton because nobody has logged a real moment yet. Log two
  ugly lines a day and the story slots refill on their own. Nothing gets invented to fill them.

## Postiz (the scheduler)
- **Live:** https://social.sendemall.com (valid TLS). DO droplet `postiz-social` blr1 4 GB, IP `159.65.151.206`.
  SSH `ssh -i ~/.ssh/id_ed25519 root@159.65.151.206`. Deploy config + runbook in `infra/DEPLOY.md`.
- **Admin account created; registration locked** (`DISABLE_REGISTRATION=true`).
- ⚠️ **Resize recommended:** 4 GB runs at ~87% memory and the backend stalled once on a container
  recreate. Bump to 8 GB (reversible): `doctl compute droplet-action resize 587368189 --size s-4vcpu-8gb --resize-disk=false --wait`.
- **Back up the DB** so channel tokens survive next time:
  `docker exec postiz-postgres pg_dump -U postiz-user postiz-db-local | gzip > backup-<date>.sql.gz`

## Channels to connect
| Channel | Status | Action |
|---|---|---|
| Junaid X (@JustJunaidHere) | ✅ **connected** 2026-08-21 | id in `channels.json`. X API is paid — keep it funded or publishes fail. |
| Sadiya LinkedIn | ⚠️ blocked | apply the scope patch (below), recreate the container, then Add channel → **"LinkedIn"** (not "LinkedIn Page"). |
| SendEmAll company X | ✅ **connected** | `cmt8f7xmf000jo07q8aolwq7d` |
| Sadiya X | ✅ **connected** | `cmtbqp8ws000lo07qbxtl1n3t` |
| Kamran LinkedIn | ✅ **connected** | `cmt36k7zw0003o07qwhtpaepi` |
| Naved LinkedIn | ✅ **connected** | `cmtbqun47000no07q7mrjoc75` |

### LinkedIn connect — root cause + fix (2026-08-21)
**The July advice ("just use personal, not Page") is no longer sufficient — upstream changed.**
The *personal* LinkedIn provider in the current `latest` image now requests org scopes too, so even
the plain "LinkedIn" button fails with `unauthorized_scope_error` (`w_organization_social`).

Verified first-hand by probing LinkedIn's authorize endpoint per-scope (303 = authorized, 200 = rejected):

| Scope | Result |
|---|---|
| `profile`, `email`, `w_member_social` | ✅ authorized |
| `r_basicprofile` | ❌ rejected |
| `rw_organization_admin`, `w_organization_social`, `r_organization_social` | ❌ rejected |
| **`openid profile email w_member_social`** (combined) | ✅ **303 → login page** |
| upstream's full 7-scope set | ❌ 200 → "Bummer, something went wrong" |

**Fix applied:** `postiz/patches/linkedin.provider.js` is the stock provider with `this.scopes`
reverted to the four we're authorized for. `docker-compose.override.yaml` bind-mounts it read-only
over **both** dist copies (`apps/backend` + `apps/orchestrator`) so it survives `docker compose pull`.

- Side effect (harmless): the provider calls `/v2/me` for `vanityName`, which needs the rejected
  `r_basicprofile` and will 403 → `profile` column stays NULL. Verified nullable in the DB; `name`
  and `internalId` come from `/v2/userinfo` (works with our scopes), so the connect + posting are
  unaffected. Only the vanity-URL display is missing.
- **Remove this patch** once the LinkedIn app is approved for the **Community Management API**
  (which authorizes the org scopes), or once upstream makes them optional.

### LinkedIn company **Page** posting — why it's blocked and the exact unblock (2026-08-25)
There is only **one** LinkedIn app: `sendemall`, client id `86a24jldju1ap2`, app id 231960380 — the
same one the droplet uses. No second app exists.

Confirmed by probe on 2026-08-25 (and matching LinkedIn's own OAuth-scopes UI):
- Granted scopes are exactly `openid`, `profile`, `email`, `w_member_social`. No org scopes.
- The `.../integrations/social/linkedin-page` redirect URI **is already whitelisted** — the redirect
  is NOT the blocker. Page redirect + our 4 scopes → 303 (accepted); page redirect + org scopes → 200 (rejected).
- So the only blocker is the **Community Management API** product, which grants the org scopes.

**Why "Request access" is greyed out** — per LinkedIn's own FAQ, it is not a bug and not a missing
prerequisite (our SendEmAll Page is already verified):
> "Only request Community Management API Development Tier access with **new developer applications
> that don't have access to other API products.**"

Our app already has *Share on LinkedIn* + *Sign In with LinkedIn*, so the button is permanently
disabled on it. LinkedIn's documented path (Community Management FAQ #1):
1. Clear the **pending business-email verification** on the app Settings tab first.
2. Create a **new** developer app on the **same SendEmAll Page**, adding **no other products**.
3. Request **Community Management API → Development Tier** on that new app.
4. On approval, submit the Standard Tier form + screencast of the use cases.
5. Once Standard is granted, request Community Management **Standard Tier on the existing app**,
   entering the new app's client id to skip most of the form. The throwaway app can then be discarded.

**Shortcut option:** Postiz's page provider reads the *same* `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET`
as the personal provider (verified in the image), so running two apps side by side needs a small patch
to `linkedin.page.provider.js` pointing it at new `LINKEDIN_PAGE_CLIENT_ID/SECRET` vars — same
bind-mount technique as the scope patch. That would let the page connect via the new Dev-Tier app as
soon as step 3 is approved, without waiting for steps 4-5. Personal LinkedIn stays on the current app.
- If a connect still fails: `docker logs -f postiz | grep -i linkedin` while clicking.

## Channel limits — there are none (verified 2026-08-25)
Postiz's paid tiers cap channels (FREE 0 / STANDARD 5 / TEAM 10 / PRO 30 / ULTIMATE 100), but that
gate never runs on this instance. In `permissions.service.js`:

```js
if (requestedPermission.length === 0 || !process.env.STRIPE_PUBLISHABLE_KEY) {
    for (const [action, section] of requestedPermission) can(action, section);
    return build(...);   // <- every permission granted, no limit check
}
```

`STRIPE_PUBLISHABLE_KEY` is unset, `NOT_SELF_HOSTED` is unset, and the `Subscription` table is empty.
**So "can't add a 4th channel" is never a quota problem — look for a real error instead.**

Debug order for a failed Add-channel:
1. `docker logs -f postiz | grep -iE "error|oauth|<provider>"` while clicking.
2. Check which adds actually succeeded: `docker logs postiz --since 96h | grep -oE "added=[a-z-]+" | sort | uniq -c`.
3. A `Failed to find Server Action` line in the frontend logs means the browser is running a stale
   bundle from before the last container recreate — hard-refresh (Cmd+Shift+R) or use a private window.

## Autopilot wiring — remaining steps
1. ⬜ **Apply the LinkedIn patch** (one command, then reconnect LinkedIn in the UI):
   `ssh -i ~/.ssh/id_ed25519 root@159.65.151.206 'cd /opt/postiz && docker compose up -d postiz'`
2. ⬜ **API key** → Postiz UI → Settings → Public API → copy → `marketing/autopilot/.env`.
3. ✅ ~~Channel ids~~ — `junaid-x` filled. Re-run `node marketing/autopilot/scripts/list-channels.mjs`
   after connecting LinkedIn to fill `sadiya-li` (needs the key from step 2).
4. ⬜ **Approve content** — flip keepers `proposed` → `approved` in
   `autopilot/output/week-2026-08-24/posts.json` (+ `week-2026-08-31/`).
   ⚠️ The 4 `needsConfirmation` posts need Sadiya's sign-off on the stories first.
5. ⬜ **Publish:** `node marketing/autopilot/scripts/publish.mjs marketing/autopilot/output/week-2026-08-24`
   (dry-run first with `DRY_RUN=1` — both weeks currently pass clean).
6. ⬜ Seed `ships.md` from real recent PRs (replace the 2 example entries).
7. ⬜ Weekly run: `/schedule` a Claude agent → "Follow marketing/autopilot/generate.md…"
   (or enable `autopilot/github-action.example.yml`).

## Repo housekeeping
- `social/` was **copied** into `marketing/social/` (version-controlled now). The original
  `~/Desktop/sendemall/social/` is redundant — safe to delete once you've confirmed this commit.
- Committed on branch `claude/landing-suite-overhaul`, scoped to `marketing/**` only — your landing
  redesign WIP was left untouched.

## Decisions locked (this session)
ships.md = hybrid (auto-draft PRs + edit) · A/B = sequential to start · X = automate (funded) ·
channels = Junaid X + SendEmAll X + Sadiya LI + Sadiya X (+ Reddit/Facebook soon), no Kamran.

---

## 2026-08-28 — first-24h check + the analytics bug

**Publishing works.** Three posts came due since launch; all three published, zero failures, across
both platforms and three different accounts.

| Due (UTC) | Account | State | URL |
|---|---|---|---|
| 27 Aug 18:05 | sendemall-x | PUBLISHED | `twitter.com/send_em_all/status/2093037080121315499` |
| 27 Aug 19:30 | sadiya-x | PUBLISHED | `twitter.com/sadiya_sea/status/2093058468450357515` |
| 27 Aug 21:00 | naved-li | PUBLISHED | `linkedin.com/feed/update/urn:li:share:7498846807985360896` |

42 remain queued through 9 Sep. Read from `GET /posts`, not from our own `status` field.

### The bug: every channel read "zero impressions" and the real answer was "we asked wrong"

`getAnalytics()` called `GET /analytics/:id` with no query string. The endpoint takes a **required
`date` param** (a day count). Without it the backend computes `dayjs().subtract(undefined,'day')` →
Invalid Date → X rejects `start_time` with a 400 → **the provider swallows it in a try/catch and
returns `[]`**. An empty array is indistinguishable from "no engagement", so the failure was
invisible from the client. Found by reading the container logs, not by reasoning about it.

Fixed in `lib/postiz.mjs`: `getAnalytics(id, days)` and a new `getPostAnalytics(postizId, days)`.
Verified green immediately after — sendemall-x returned real metrics on the same call that had been
returning `[]` five minutes earlier.

**`pull-analytics.mjs` rewritten** to join on Postiz's own post list rather than the `postId` we
store at publish time. That permanently sidesteps the 17 posts written with `postId: true` — no
backfill needed; Postiz already knows what it published, so we ask it.

### LinkedIn is structurally unmeasurable right now

The LinkedIn provider has **no `analytics()` method at all**. Checked against the *upstream image*,
not just our bind-mounted scope patch, so this is not something we broke. LinkedIn shipped
`memberCreatorPostAnalytics` in July 2025 but it needs `r_member_postAnalytics` (separate
application); upstream gitroomhq/postiz-app#1680 tracks it. Half our accounts, read by hand until
then. The puller reports them `n/a`, never `0`.

### Also fixed: the claim ledger was offering a banned number

`content/claims.md` listed **"0.20% verification false-positive rate"** as an ownable claim assigned
to kamran-li. CLAUDE.md retired that stat — the <3% bounce guarantee is our only accuracy claim. The
file built to be the guard was handing out the thing it exists to stop, and the linter did not block
it. Moved to NEVER PUBLISH, added `retired-fp-rate` to `lint-posts.mjs`, and probed it: a post
asserting a figure as ours goes red, a post discussing false-positive rates as an industry topic
stays green. No scheduled post used it.

**Unverified:** the X impression counts are small enough (3 and 0) to be worth one eyeball against
the native X UI before we trust the pipeline's numbers.

---

## 2026-08-31 — first 4 days of numbers, and what they say

13 posts published, 0 failures. Coverage runs to 9 Sep. Publishing is not the problem.

| Account | Posts | Impressions |
|---|---|---|
| junaid-x | 3 | **71** (52 / 7 / 12) |
| sendemall-x | 3 | 3 (3 / 0 / 0) |
| sadiya-x | 2 | 0 |
| kamran-li, sadiya-li, naved-li | 5 | no API — read by hand |

### The zeros are arithmetic, not a penalty

Two accounts sitting at zero impressions looked like a shadowban or the `llm_slop_user` classifier
OPERATIONS §5 warns about. It is neither. Follower counts, pulled live from the X API:

| Account | Followers | Following | Age |
|---|---|---|---|
| JustJunaidHere | **239** | 109 | since 2017 |
| send_em_all | **2** | 8 | since Sep 2025 |
| sadiya_sea | **0** | **0** | since 27 Aug 2026 |

An account that follows nobody and is followed by nobody has no distribution graph. X's ranker has
no feed to place it in. Zero impressions is the correct output, and no amount of posting changes it.

**96% of all measured reach came from the one account with an audience.** The other two are writing
into a void — and the content going into that void is not worse, it is arguably better.

This reorders the plan. OPERATIONS §5 already said the biggest lever in X's ranker is a reply-weight
boost that only fires between mutual follows, and §2 said comment duty outranks posting. Both are
now measured facts rather than research notes. Following ICP accounts and commenting is not a
nice-to-have next to the posting schedule — for sadiya-x and sendemall-x it is the *only* thing that
can move the number, and neither has started.

### Bug found while reviewing the analytics puller

The label normaliser lowercased and stripped a trailing "s", so the per-post endpoint's `"Replies"`
became `"replie"` while the table read `reply`. **The reply column printed 0 for every post
regardless of the truth** — and replies are the one metric funnel.md says predicts anything. Caught
by diffing the two endpoints' label sets, not by reading output, because the broken output is
indistinguishable from a quiet week. Labels are now an explicit map and an unknown label throws.
`analytics/2026-08-28.json` was written by the broken version and has been regenerated.
