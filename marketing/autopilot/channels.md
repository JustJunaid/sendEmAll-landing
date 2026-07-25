# Channel map

Machine-readable config is `channels.json`; this is the human rationale.

| Channel key | Account | Provider | Voice | Cadence/wk | Status |
|---|---|---|---|---|---|
| `junaid-x` | @JustJunaidHere | X | `voice-junaid` (founder) | 5 | live — reconnect in Postiz |
| `sendemall-x` | @SendEmAll (company) | X | `voice-brand` (category POV) | 5 | **create account** |
| `sadiya-li` | Sadiya Junaid | LinkedIn | `voice-sadiya` (operator) | 3 | connect (personal "LinkedIn") |
| `sadiya-x` | Sadiya (new) | X | `voice-sadiya` | 3 | **create account** |

**Planned next:** Reddit, Facebook (add a row + `channels.json` entry + a voice note when live).
**Dropped:** Kamran LinkedIn (no account) — voice archived at `../social/playbook/archive/voice-kamran.md`.

## Notes
- **X is paid** (per-post pricing since Feb 2026; ~$0.20 if a post has a link). Keep links out of X
  post bodies — drive via the account bio. Fund the X API before connecting the X channels.
- **LinkedIn:** connect via the personal **"LinkedIn"** option, not "LinkedIn Page" (Page needs the
  Community Management API the app doesn't have). See `../HANDOFF.md`.
- The brand account amplifies the personal ones (quote-posts), never in lockstep — vary angle + timing.
- `integrationId` for each is blank until connected; run `scripts/list-channels.mjs` to fill.
