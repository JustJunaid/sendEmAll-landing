# marketing/

Everything for the SendEmAll social vertical. **Start here, go one level deep, stop.**

## The four files that matter

| File | The one question it answers |
|---|---|
| **[OPERATIONS.md](OPERATIONS.md)** | What do we do this week, and how do we know it worked? |
| **[content/standard.md](content/standard.md)** | Is this post good enough to publish? |
| **[content/voices.md](content/voices.md)** | Who writes what, and in whose voice? |
| **[STATE.md](STATE.md)** | What is live right now, and what is broken? |

Everything else is either the machine that schedules posts, the content itself, or history.

## Layout

```
OPERATIONS.md    cadence · weekly loop · measurement · decision rules
STATE.md         live ops state — connected channels, blockers, corrections log
CALENDAR.md      GENERATED. Never hand-edit. Rebuild from posts.json.

content/
  standard.md    every copy rule, including openings. The linter enforces it.
  voices.md      personas, territories, channel doctrine
  claims.md      claim ledger (30-day cooldown) + the NEVER PUBLISH list
  moments.md     two ugly lines a day. Story posts may only be written from this.
  funnel.md      UTM scheme + what is and is not measurable

autopilot/       the machine
  channels.json  which accounts exist, their voice and cadence
  generate.md    the drafting brief
  scripts/       lint · publish · build-calendar · list-channels · pull-analytics
  output/        posts.json per week — THE SOURCE OF TRUTH for post text

infra/           the self-hosted Postiz droplet (deploy, compose, patches)
analytics/       weekly pulls, written by pull-analytics.mjs
```

## The three commands

```bash
# 1. Check a batch against the standard. Run before anyone reads it.
node autopilot/scripts/lint-posts.mjs autopilot/output/week-2026-08-31 autopilot/output/week-2026-09-07

# 2. Prove the linter still works (20 cases incl. negative controls).
node autopilot/scripts/lint-posts.mjs --self-test

# 3. Schedule approved posts. Runs the linter itself and refuses to publish on any error.
node autopilot/scripts/publish.mjs autopilot/output/week-2026-08-31
```

Read what actually happened (published state + per-post impressions):

```bash
node autopilot/scripts/pull-analytics.mjs 2026-08-28 7
```

Regenerate the human-readable calendar after any edit to `posts.json`:

```bash
node autopilot/scripts/build-calendar.mjs CALENDAR.md autopilot/output/week-*
```

## Two rules that are not negotiable

**`posts.json` is the source of truth.** `CALENDAR.md` is generated from it. Edit the JSON and
re-run the builder — never hand-edit post text in the calendar. The two drifted twice before the
generator existed.

**Nothing publishes that the linter rejects.** The gate is in `publish.mjs`, not in someone's
memory. `SKIP_LINT=1` overrides it, prints a loud warning, and should be rare enough that using it
feels wrong.
