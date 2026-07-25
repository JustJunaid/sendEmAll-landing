# Autopilot — run it

The weekly pipeline. Generation is a Claude agent following [`generate.md`](generate.md); publishing +
analytics are the scripts in `scripts/`. Review happens in a PR. Nothing auto-publishes.

## One-time setup
1. **Postiz up + channels connected** (see `../postiz/DEPLOY.md`). Create the new accounts first:
   SendEmAll company X, Sadiya X. Connect each in Postiz (X = paid API now — fund it).
2. **API key:** in Postiz → Settings → Public API, generate a key. Copy `.env.example` → `.env` and set
   `POSTIZ_API_KEY` (+ `POSTIZ_URL`). `.env` is gitignored.
3. **Fill integration ids:** `node scripts/list-channels.mjs` → paste each `id` into `channels.json`.
   Channels with a blank `integrationId` are simply skipped by generation + publish.

## Weekly cadence
```
# 1. GENERATE (agent) — opens a PR with the week's drafts + one A/B variant
#    Scheduled (recommended): see "Scheduling" below.
#    Or by hand in a Claude session at the repo root:
#      "Follow marketing/autopilot/generate.md for the week of <YYYY-MM-DD>."

# 2. REVIEW (you, ~30 min) — in the PR: edit/delete drafts, set keepers to "status":"approved".

# 3. PUBLISH (on merge) — schedule approved posts into Postiz:
DRY_RUN=1 node marketing/autopilot/scripts/publish.mjs marketing/autopilot/output/week-<YYYY-MM-DD>  # preview
node        marketing/autopilot/scripts/publish.mjs marketing/autopilot/output/week-<YYYY-MM-DD>       # send

# 4. LEARN (mid-week) — pull engagement so next week's drafts improve:
node marketing/autopilot/scripts/pull-analytics.mjs <YYYY-MM-DD>
```

## Scheduling (make step 1 autonomous)
Pick one:
- **Claude scheduled agent (recommended):** in a Claude session run `/schedule` → weekly →
  prompt: `Follow marketing/autopilot/generate.md for the upcoming week and open the PR.`
  It reasons about voice + opens the PR; best copy quality.
- **GitHub Action:** copy `github-action.example.yml` → `../../.github/workflows/marketing-autopilot.yml`,
  add repo secrets (`ANTHROPIC_API_KEY`, `POSTIZ_API_KEY`). Cron generates the PR; a `publish` job runs
  on merge. Lower copy quality than the agent unless it invokes Claude.

## Files
- `generate.md` — the weekly brief the agent follows (the actual logic).
- `channels.json` — live channels, voices, cadence, slots. **Fill `integrationId`.**
- `scripts/lib/postiz.mjs` — Postiz public-API client (payload verified vs source DTO).
- `scripts/list-channels.mjs` · `publish.mjs` · `pull-analytics.mjs`.
- `output/week-*/posts.json` — the drafts (one dir per week). `week-example/` shows the schema.
- `.env` (gitignored) — `POSTIZ_URL`, `POSTIZ_API_KEY`.

## Post status lifecycle
`proposed` (agent) → `approved` (you, in the PR) → `scheduled` (publish.mjs) → `error` (with `.error`).
Only `approved` posts are ever sent.
