# Channel strategy — what to run, what to skip, and what Postiz can't do

> ⚠️ **PARTIALLY SUPERSEDED 2026-08-25 by `personas.md`.** Primary-source research corrected two
> claims below: (1) the Reddit section understated how hostile the rooms are AND Reddit's API is not
> available to us commercially — Reddit is manual-only; (2) the X "links suppress reach" reasoning is
> wrong (X's open-sourced ranker gives `OpenLinkWeight` **+0.2**, no penalty) — avoid links on X for
> **cost** ($0.20 vs $0.015/post), not reach. Read `personas.md` first.

**Decided 2026-08-25.** Every capability claim below was verified first-hand against the Postiz
provider source running on our droplet, not from docs or assumption.

## What Postiz actually is (verified)

`ISocialMediaIntegration` exposes exactly one content method: `post()`. Its payload
(`PostDetails`) is `{ message, settings, media, poll }` — **no target-post field, no recipient field.**

- **Commenting on other people's posts: NOT possible.** The "comments" feature is self-threading.
  In `x.provider.js`: `const replyToId = lastCommentId || postId` — the reply target is always the
  post Postiz just created, or the previous item in the same chain. LinkedIn is the same shape
  (`createCommentPost(..., postId, ...)`). No provider accepts an arbitrary post URL.
- **DMs: NOT possible on any of the 34 providers.** (Telegram's `sendMessage` is the Bot API method
  for posting into a channel the bot belongs to — not outbound DMs to people.)

**Postiz is a publish-and-measure tool. Engagement is a human job.** That is also the correct
answer strategically: automated DMs/comments on LinkedIn or X violate platform terms and are the
fastest route to a restricted account. It would also contradict the non-affiliation position we
sell ("we automate the user's own authorized access, never circumventing a platform").

## Cost reality: X is not expensive for us

X is pay-per-use since 2026 (Basic $200/mo retired, force-migrated 1 Jun 2026):
**$0.015 per post, $0.20 per post containing a URL.**

Our planned 13 X posts/week ≈ 56/month:
- Links kept out of bodies (current playbook rule): **~$0.84/month**
- If we put links in: **~$11.20/month**

The no-links rule is already in the playbook for reach reasons; it also happens to be a 13x cost
difference. Keep it. **X being "paid now" is not a reason to avoid it.**

## Verdicts

| Channel | Verdict | Why |
|---|---|---|
| **LinkedIn** (Sadiya personal, company page pending) | **Primary** | Our buyers (founders, agency owners, SDR/growth leads) evaluate tooling here. Long-form works. |
| **X** | **Primary** | Founder / build-in-public / GTM audience. ~$1/mo at our volume. |
| **Reddit** | **Add — but manual** | Highest-intent communities we have (r/sales, r/coldemail, r/SaaS, r/Emailmarketing) *and* historically our only verified traffic source. See the warning below. |
| **YouTube** | **Add as asset host, not a cadence** | The incoming product-tour video needs a home; deliverability tutorials have compounding search value. Not a posting rotation. |
| **Facebook Page** | **Skip** | Organic page reach is ~0 and the audience is wrong for cold-email infrastructure. |
| **Instagram** | **Skip for now** | Requires real visual production; our buyers don't evaluate outbound tooling here. Revisit only if we commit to founder video. |
| **Discord / Slack** | **Skip until we have a community** | See below — these broadcast into a community you already own. We don't have one. |
| **Dev.to / Hashnode / Medium** | **Maybe later, cheap** | Syndicate the existing 37+ blog posts with `rel=canonical` back to the site. Low effort, modest return. |

## Discord and Slack — what they actually do (verified)

- **Discord**: OAuth with `scope=bot` + `permissions=377957124096`, then pick a guild and channel.
  You invite a **bot into a server you control**; Postiz posts into a channel as that bot.
- **Slack**: `scope=channels:read,chat:write,conversations.join`, posts via `chat.postMessage`
  into channels in **your own workspace**.

Neither reaches new people. They are internal/community broadcast surfaces. You cannot use them to
post into other people's communities — that would require being invited as an admin, and would be
spam. **Value to us today: zero.** Revisit if we ever run a user community.

## Reddit — the one that needs discipline

Reddit has our highest-intent audience and is the one channel with a track record of sending us
traffic. It is also the fastest place to get banned.

Postiz's Reddit provider requires per-post `subreddit`, `title`, `type` (self/link) and `flair`
(it checks `flair_required` per subreddit), and it accepts an **array** of subreddits. That array is
the trap: the same scheduled post fired into several subreddits is exactly the pattern moderators
and Reddit's spam filter act on.

Rules for us:
1. **One subreddit per post, tailored to it.** Never fan one body out across an array.
2. **Value-first, no product mention** until there's an account history. Read each subreddit's
   self-promotion rule first — several ban links outright.
3. **Build karma with genuine comments before posting.** A new account dropping a marketing post is
   removed within the hour.
4. Use Postiz for *timing* a post you already tailored — not as a broadcast pipe.

## The uncomfortable part

The constraint is not how many channels we can connect. It is that we have two real humans and a
38-post fortnight already in flight. Adding Facebook, Instagram and YouTube cadences would dilute
what's working before we know what's working.

And the biggest lever isn't a channel at all: **posting without engaging gets close to nothing on
LinkedIn.** Reach comes from commenting on other people's posts and replying to your own comments —
which no tool can do for us safely. Budget ~15-20 minutes a day of real human engagement per active
voice. That will outperform any additional channel we could add.

**Decision: LinkedIn + X + Reddit as active channels. YouTube as a video host. Everything else waits.**
