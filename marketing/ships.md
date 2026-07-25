# Ships — what we shipped

**Single source of truth for "what shipped."** Feeds both the social generator and the landing changelog.

**How this gets filled (hybrid):**
1. A helper auto-drafts entries from merged PR titles across the product repos into the `## Inbox` section below.
2. You edit the inbox: keep what's worth talking about, delete noise, sharpen the one-liner + "why it matters."
3. The weekly autopilot reads everything **above** the `## Inbox` line that it hasn't processed yet (tracked by `lastProcessed` date).

**Entry format** — newest first. Keep the user-facing angle, not the git detail:

```
### YYYY-MM-DD — <short title>
- what: <one line, what changed for the user>
- why: <why a buyer cares — the pain it removes / outcome>
- proof: <number, before/after, or "" >
- repo: <SendEmAll | leadgen | sendemall-infra | landing>
- talkable: <yes|no>   # no = internal/plumbing, skip in social
```

<!-- autopilot:lastProcessed=none -->

---

### 2026-07-25 — Signal-qualified lead scoring
- what: leads now come ranked by buying-signal strength, not just ICP match
- why: reps stop spraying cold lists — they work the 3-4x-likelier-to-reply accounts first
- proof: early cohort saw 3.4% vs 0.9% reply rate on signal-qualified vs generic
- repo: leadgen
- talkable: yes

### 2026-07-20 — True-cost pricing calculator on pricing page
- what: interactive calculator showing your real stack cost ($37/mo tool → $600+/mo all-in)
- why: makes the "stack tax" concrete — our core positioning, now self-serve
- proof: ""
- repo: landing
- talkable: yes

## Inbox
<!-- Auto-drafted from PR titles land here for you to curate. Nothing below this line is processed until you move it above. -->
