# Postiz self-host — deploy runbook

Self-hosted [Postiz](https://github.com/gitroomhq/postiz-app) that schedules our social posts
(X @JustJunaidHere, LinkedIn). Fronts `https://social.sendemall.com`.

## Current deployment (2026-07-25)

| Thing | Value |
|---|---|
| Host | DigitalOcean droplet `postiz-social`, blr1, `s-2vcpu-4gb` ($24/mo) |
| Public IP | `159.65.151.206` |
| Droplet ID | `587368189` |
| SSH | `ssh -i ~/.ssh/id_ed25519 root@159.65.151.206` |
| App dir | `/opt/postiz` (clone of gitroomhq/postiz-docker-compose + our overrides) |
| Firewall | `postiz-social-fw` — inbound 22/80/443 only; app port 4007 bound to 127.0.0.1 |
| TLS | Caddy (auto Let's Encrypt) once DNS points here |

Stack: Postiz app + Postgres 17 + Redis 7.2 + Temporal (auto-setup) + Temporal-Postgres +
Elasticsearch 7.17 (heap capped 256m) + Temporal UI/admin + Caddy. ~3.1 GB RAM steady (4 GB + 2 GB swap).

## Reproduce from scratch

```bash
# 1. Provision (doctl already authed)
doctl compute droplet create postiz-social --region blr1 --size s-2vcpu-4gb \
  --image ubuntu-24-04-x64 --ssh-keys 55432938 \
  --user-data-file cloud-init.yaml --tag-names postiz,social --wait \
  --format ID,Name,PublicIPv4,Status
# cloud-init installs Docker + 2G swap + clones /opt/postiz

# 2. Push our overrides (this dir) to the box
scp Caddyfile docker-compose.override.yaml .env root@<IP>:/opt/postiz/

# 3. Keep the app port private, bring the stack up
ssh root@<IP> 'cd /opt/postiz && sed -i "s|- \"4007:5000\"|- \"127.0.0.1:4007:5000\"|" docker-compose.yaml && docker compose up -d'

# 4. Cloud firewall (22/80/443 in, all out)
doctl compute firewall create --name postiz-social-fw \
  --inbound-rules "protocol:tcp,ports:22,address:0.0.0.0/0,address:::/0 protocol:tcp,ports:80,address:0.0.0.0/0,address:::/0 protocol:tcp,ports:443,address:0.0.0.0/0,address:::/0" \
  --outbound-rules "protocol:tcp,ports:all,address:0.0.0.0/0,address:::/0 protocol:udp,ports:all,address:0.0.0.0/0,address:::/0 protocol:icmp,address:0.0.0.0/0,address:::/0" \
  --droplet-ids <ID>
```

## Go-live (manual, one-time)

1. **DNS** (Cloudflare): point `social.sendemall.com` A record → `159.65.151.206`, **DNS only (grey cloud)** so Caddy's Let's Encrypt HTTP-01 challenge can reach the box. Caddy issues the cert within ~1-2 min.
2. **Admin account**: open `https://social.sendemall.com`, register the first account. Then set `DISABLE_REGISTRATION=true` in `.env` and `docker compose up -d` so the public URL can't be signed up on by others.
3. **Reconnect channels** (tokens were in the old dead DB): Add channel → X → authorize @JustJunaidHere; Add channel → LinkedIn → authorize. Reuses the existing dev apps + `.env` keys; no app re-creation. Redirect URIs `https://social.sendemall.com/integrations/social/{x,linkedin}` already match.

## 2026 gotchas
- **X API is no longer free** (pay-per-use since 6 Feb 2026; ~$0.20/post if it contains a link). A reconnected X channel needs paid API credits to publish. Consider posting X natively and using Postiz for LinkedIn.
- **LinkedIn**: `latest` image is fine for personal posting (openid/profile/w_member_social). App needs "Share on LinkedIn" + "Sign In with LinkedIn using OpenID Connect" products.

## Ops
```bash
cd /opt/postiz
docker compose ps                 # health
docker compose logs -f postiz     # app logs (pm2: backend/orchestrator/frontend)
docker compose pull && docker compose up -d   # update
# Back up the DB so channel tokens survive next time:
docker exec postiz-postgres pg_dump -U postiz-user postiz-db-local | gzip > backup-$(date +%F).sql.gz
```
**Resize if memory-pressured:** `doctl compute droplet-action resize 587368189 --size s-4vcpu-8gb --resize-disk=false --wait` (reboot).
