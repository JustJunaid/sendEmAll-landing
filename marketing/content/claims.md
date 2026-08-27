# Claim ledger

**One row per proof point, one owner, 30-day cooldown.**

Topic overlap between voices is fine and unavoidable — two people who run campaigns will both write
about reply rates. What reads as coordinated is **two accounts asserting the same proof point in the
same week**. This ledger is the dedup mechanism; topic assignment never worked (an audit found 10 of
19 topics already duplicated across accounts in the first batch).

**Rule:** before a post uses a claim below, check the ledger. If it was used inside 30 days by another
account, either pick a different angle or wait. The linter enforces this.

| Claim | Owner | Last used | Cooldown until |
|---|---|---|---|
| 0.20% verification false-positive rate | kamran-li | — | — |
| 3% bounce guarantee, first month refunded | junaid-x | — | — |
| 1 credit = 1 valid email; bounces free | sendemall-x | — | — |
| 66M contact data lake | sadiya-li | — | — |
| 30-day rolling re-verification | kamran-li | — | — |
| $99/mo flat, unlimited seats + workspaces | sendemall-x | — | — |
| 0.9% → 3.4% signal-qualified reply rate (early cohort) | junaid-x | — | — |
| ~$600/mo typical stack cost | junaid-x | — | — |
| Free export / no lock-in | sendemall-x | — | — |
| Pre-warmed mailbox catalog | kamran-li | — | — |

## Never publish

- The backend send cap (~250–500k/mo). Publicly the sequencer is "unlimited". This has already leaked
  once, onto the Cal.com booking page — check any new surface for it.
- Mailbox-per-domain ratios.
- Any customer volume claim ("agencies send 500K+/month") — we have no customer proof yet.
