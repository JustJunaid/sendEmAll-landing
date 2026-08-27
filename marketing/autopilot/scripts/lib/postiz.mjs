// Minimal Postiz public-API client. Node 22+ (global fetch). No dependencies.
// Payload shape verified against gitroomhq/postiz-app CreatePostDto (create.post.dto.ts):
//   { type, shortLink, date, tags[], posts:[{ integration:{id}, value:[{content, image[]}], settings }] }
// Auth: the raw API key goes in the `Authorization` header (NO "Bearer" prefix).
// External base = <POSTIZ_URL>/api/public/v1  (nginx strips /api -> backend /public/v1)

// Load marketing/autopilot/.env here rather than in each caller: this module reads the key, and
// ES imports are hoisted, so a caller calling loadEnvFile() would always run too late.
try { process.loadEnvFile(new URL('../../.env', import.meta.url)); } catch { /* optional */ }

const BASE = (process.env.POSTIZ_URL || 'https://social.sendemall.com').replace(/\/$/, '');
const key = () => process.env.POSTIZ_API_KEY;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Postiz throttles POST /posts. A whole week of posts fired back-to-back trips it (429, verified
// 2026-08-27), so back off and retry rather than dropping the post on the floor.
async function api(path, { method = 'GET', body, attempt = 0 } = {}) {
  if (!key()) throw new Error('POSTIZ_API_KEY not set (see marketing/autopilot/.env.example)');
  const res = await fetch(`${BASE}/api/public/v1${path}`, {
    method,
    headers: { Authorization: key(), 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (res.status === 429 && attempt < 4) {
    const hinted = Number(res.headers.get('retry-after'));
    const wait = Number.isFinite(hinted) && hinted > 0 ? (hinted + 5) * 1000 : 2000 * 2 ** attempt;
    const mins = Math.round(wait / 60000);
    console.warn(`  … throttled, waiting ${mins >= 1 ? mins + 'm' : Math.round(wait / 1000) + 's'} (server said retry-after=${hinted || 'n/a'})`);
    await sleep(wait);
    return api(path, { method, body, attempt: attempt + 1 });
  }
  if (!res.ok) throw new Error(`Postiz ${method} ${path} -> ${res.status}: ${text.slice(0, 500)}`);
  return text ? JSON.parse(text) : null;
}

/** GET connected channels -> [{ id, name, identifier(provider), ... }] */
export const listIntegrations = () => api('/integrations');

/**
 * Create a post. type: 'draft' | 'schedule' | 'now'.
 * date: ISO string (required even for draft — use the intended slot).
 */
export function createPost({ integrationId, content, date, provider, type = 'schedule' }) {
  const post = {
    integration: { id: integrationId },
    value: [{ content, image: [] }],
  };
  // `settings` is required unless it's a draft, and it is PROVIDER-SHAPED — an empty object is not
  // universally valid. X rejects a post without `who_can_reply_post` (400, 2026-08-27); LinkedIn
  // and LinkedIn Page accept defaults. Add a case here rather than sending {} and hoping.
  if (type !== 'draft') {
    post.settings = provider === 'x' ? { who_can_reply_post: 'everyone' } : {};
  }
  return api('/posts', {
    method: 'POST',
    body: { type, shortLink: false, date, tags: [], posts: [post] },
  });
}

/** GET analytics for one integration (last N days per Postiz default). */
export const getAnalytics = (integrationId) => api(`/analytics/${integrationId}`);

export const config = { BASE, get hasKey() { return Boolean(key()); } };
