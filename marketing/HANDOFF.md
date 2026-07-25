# Handoff — open items

State as of 2026-07-25. Everything code/scaffold-wise is committed; the rest is accounts, keys, and one reconnect.

## Postiz (the scheduler)
- **Live:** https://social.sendemall.com (valid TLS). DO droplet `postiz-social` blr1 4 GB, IP `159.65.151.206`.
  SSH `ssh -i ~/.ssh/id_ed25519 root@159.65.151.206`. Deploy config + runbook in `postiz/DEPLOY.md`.
- **Admin account created; registration locked** (`DISABLE_REGISTRATION=true`).
- ⚠️ **Resize recommended:** 4 GB runs at ~87% memory and the backend stalled once on a container
  recreate. Bump to 8 GB (reversible): `doctl compute droplet-action resize 587368189 --size s-4vcpu-8gb --resize-disk=false --wait`.
- **Back up the DB** so channel tokens survive next time:
  `docker exec postiz-postgres pg_dump -U postiz-user postiz-db-local | gzip > backup-<date>.sql.gz`

## Channels to connect
| Channel | Action |
|---|---|
| Junaid X (@JustJunaidHere) | reconnect in Postiz (Add channel → X). X API is paid now — fund it. |
| Sadiya LinkedIn | connect via personal **"LinkedIn"** (see below). |
| SendEmAll company X | **create the account**, then connect. |
| Sadiya X | **create the account**, then connect. |

### LinkedIn connect — the fix (was failing)
Root cause was **proven** by probing LinkedIn's authorize endpoint directly:
- The app `86a24jldju1ap2` has our redirect URI whitelisted and the **personal** scopes
  (`openid profile email w_member_social`) authorized → personal connect works.
- The **org** scopes (`rw_organization_admin`, `r/w_organization_social`) are **not** authorized →
  `unauthorized_scope_error`. Those are what the **"LinkedIn Page"** button requests.
- **So: use the "LinkedIn" (personal) option, not "LinkedIn Page."** Your first attempt also
  overlapped a backend 502 (memory stall, now fixed) — retry cleanly.
- If personal still fails at the callback: `ssh` in and `docker logs -f postiz | grep -i linkedin`
  while clicking, to catch the token-exchange error server-side.
- Company-Page posting (future) needs the **Community Management API** product added to the LinkedIn
  app (LinkedIn review) + Page admin. Not needed for personal voices.

## Autopilot wiring (to go live)
1. Postiz → Settings → Public API → generate key → `autopilot/.env` (`POSTIZ_API_KEY`).
2. `node marketing/autopilot/scripts/list-channels.mjs` → paste ids into `channels.json`.
3. Seed `ships.md` from real recent PRs (replace the 2 example entries).
4. Set up the weekly run: `/schedule` a Claude agent → "Follow marketing/autopilot/generate.md…"
   (or enable `autopilot/github-action.example.yml`).
5. First manual dry run: `DRY_RUN=1 node marketing/autopilot/scripts/publish.mjs marketing/autopilot/output/week-example`.

## Repo housekeeping
- `social/` was **copied** into `marketing/social/` (version-controlled now). The original
  `~/Desktop/sendemall/social/` is redundant — safe to delete once you've confirmed this commit.
- Committed on branch `claude/landing-suite-overhaul`, scoped to `marketing/**` only — your landing
  redesign WIP was left untouched.

## Decisions locked (this session)
ships.md = hybrid (auto-draft PRs + edit) · A/B = sequential to start · X = automate (funded) ·
channels = Junaid X + SendEmAll X + Sadiya LI + Sadiya X (+ Reddit/Facebook soon), no Kamran.
