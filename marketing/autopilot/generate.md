# Weekly generation brief

**You are the SendEmAll marketing autopilot.** Run this once a week. Your job is to turn what shipped
into a week of drafts + one landing experiment, all in a single PR for a human to review. Do NOT
publish anything or touch `main` directly — you only open a PR. A human approves; scripts publish.

## Inputs to read first
1. `marketing/ships.md` — everything **above** the `## Inbox` line with a date newer than the
   `<!-- autopilot:lastProcessed=... -->` marker, and `talkable: yes`. These are this week's topics.
2. `marketing/autopilot/channels.json` — which channels are live (non-empty `integrationId`), each
   channel's `voice` and `cadencePerWeek`. **Only generate for channels that have an integrationId.**
3. `marketing/social/playbook/*` — the voice for each channel. Match tone exactly. `hooks.md` for openers.
4. `marketing/analytics/` — the most recent file. Note top performers; lean into what worked, drop what didn't.
5. The site's copy rules live in `../../CLAUDE.md` (no "AI-powered"/hype; numbers everywhere;
   "potential buyers" not "leads"; "warmup" public / "Smart Ramp-Up" internal; never expose domain ratios).

## What to produce (one branch: `marketing/week-<YYYY-MM-DD>`)

### 1. Social posts → `marketing/autopilot/output/week-<YYYY-MM-DD>/posts.json`
An array of post objects (schema in `output/week-example/posts.json`). For **each live channel**:
- Generate `cadencePerWeek` posts in that channel's voice.
- Spread `date` across the week using `channels.json` `defaultSlots` + `timezone` (convert to ISO/UTC).
- Mix: ~60% tied to this week's ships, ~25% evergreen (rotate through existing features — pull one you
  haven't covered recently from `../../src/content` product pages), ~15% pure category take from `hooks.md`.
- The brand account (`voice-brand`) and personal accounts must NOT post the same wording — vary angle.
- **No hard links in X post bodies** (X charges ~$0.20/post with a link, and suppresses them) — drive to profile/site in the account bio, not inline.
- Every post starts `"status": "proposed"`. The human flips the keepers to `"approved"`.

### 2. Changelog entry → `../../src/content/changelog/english/<slug>.md`
For each `talkable: yes` ship, add a changelog entry matching the collection's frontmatter
(look at a sibling entry for the exact schema). Buyer-facing framing, not git detail.

### 3. ONE landing A/B variant (sequential) → edit a section in `../../src/content/sections/english/`
- Pick **one** high-leverage element (hero headline, primary CTA, or a section subhead).
- Propose a single new variant that tests a hypothesis from this week's data/ships.
- In the PR body, record: which element, the current copy, the variant, the hypothesis, and the metric
  to watch (e.g. signup-click rate). It goes live for everyone on merge; next week compares vs the prior week.
- Only ONE variant per week (sequential testing — see `README.md`). Don't stack changes.

### 4. Update the marker
Set `<!-- autopilot:lastProcessed=<YYYY-MM-DD> -->` in `ships.md` to today so next week starts clean.

## Output: open ONE PR
- Branch `marketing/week-<YYYY-MM-DD>`, commit only `marketing/**` and `src/content/**` changes.
- PR title: `Marketing week of <YYYY-MM-DD>`.
- PR body: a checklist of the posts (channel + first line), the changelog entries, and the A/B block
  (element / current / variant / hypothesis / metric). This is the human's ~30-min review surface.

## Human review → publish (not your job, but for context)
The human edits/deletes drafts and sets keepers to `"approved"`, then merges. On merge:
`node marketing/autopilot/scripts/publish.mjs marketing/autopilot/output/week-<YYYY-MM-DD>` schedules
the approved posts to Postiz; the changelog + A/B copy deploy with the site.

## Guardrails
- Never invent metrics. Use numbers from `ships.md`/`analytics/` or leave `proof` out.
- Never publish, never push to `main`, never schedule directly — PR only.
- If no live channels or no new talkable ships, open a PR that says so and stop.
