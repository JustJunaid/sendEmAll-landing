# SendEmAll GTM autopilot

One place where **what we ship** turns into **social posts + landing copy**, on a weekly cadence,
with a human review gate. The goal: ~30 min/week to keep social, the site, and the product in sync.

```
ships.md ──► weekly Claude agent ──► ONE PR ──► you review ~30min ──► merge ──┬─► Postiz API (schedules social)
(what        reads ships + voices    · social posts / channel                 └─► changelog + A/B copy (site deploy)
 shipped)    + last week's analytics  · changelog entries                          │
    ▲                                  · ONE A/B copy variant (sequential)          │
    │                                  · 1 evergreen post (rotates old features)    │
    └──────────────── analytics loop: Postiz engagement + A/B result feeds next week ◄┘
```

## Folder map

| Path | What |
|---|---|
| `ships.md` | **Source of truth** — what shipped. Auto-drafted from PR titles, you edit. Feeds both social + the site changelog. |
| `social/` | Voice playbooks (per persona) + hooks bank + calendar. Colocated from the old `~/Desktop/sendemall/social`. |
| `postiz/` | Self-hosted Postiz deploy config (the scheduler). See `postiz/DEPLOY.md`. |
| `autopilot/` | The weekly pipeline: the generation brief, channel config, and the publish/analytics scripts. |
| `analytics/` | Weekly engagement + A/B results pulled back from Postiz (closes the loop). |
| `HANDOFF.md` | Open items + setup steps to go fully live. |

## The loop in one paragraph

Every week a Claude agent (scheduled via `/schedule`, or run by hand) follows
[`autopilot/generate.md`](autopilot/generate.md): it reads the new `ships.md` entries, the voice
playbooks, and last week's `analytics/`, then drafts the week's posts (one file per week under
`autopilot/output/`), plus a changelog entry and **one** landing A/B copy variant — all in a single
branch/PR. You review the PR, edit or delete drafts, and merge. On merge,
`autopilot/scripts/publish.mjs` schedules the **approved** posts into Postiz, and the changelog/copy
changes deploy with the site. Mid-week, `pull-analytics.mjs` writes results into `analytics/` so next
week's drafts learn from what worked.

Excluded from the Astro build automatically — Astro only builds `src/`, so this whole folder ships nowhere.

See [`autopilot/README.md`](autopilot/README.md) to run it, and [`HANDOFF.md`](HANDOFF.md) for what's left to wire.
