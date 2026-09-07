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

/** GET all posts in a window. `state` is QUEUE | PUBLISHED — this is the ONLY reliable proof a
 *  post reached the network; our own posts.json `status` records only that the API accepted it.
 *  Both dates are REQUIRED (no params -> 400). */
export async function listPosts(startDate, endDate) {
  const q = new URLSearchParams({ startDate, endDate, customer: '' });
  const j = await api(`/posts?${q}`);
  return Array.isArray(j) ? j : (j?.posts ?? j?.data ?? []);
}

/**
 * GET aggregate analytics for one integration over the last `days` days.
 *
 * `days` is REQUIRED and was the bug: the backend does `dayjs().subtract(days, 'day')`, so omitting
 * it makes an Invalid Date, X rejects `start_time` with a 400, the provider swallows it in a
 * try/catch and returns []. Every channel read as "zero impressions" for a whole day when the real
 * answer was "we asked the question wrong". A silent [] is why this took a log dive to find.
 */
export const getAnalytics = (integrationId, days = 7) =>
  api(`/analytics/${integrationId}?date=${Number(days)}`);

/** GET analytics for ONE post, keyed by the POSTIZ post id (not the platform's release id). */
export const getPostAnalytics = (postizPostId, days = 7) =>
  api(`/analytics/post/${postizPostId}?date=${Number(days)}`);

/** Providers Postiz can actually return analytics for. LinkedIn personal has no `analytics()` method
 *  in the provider at all (verified against the upstream image, not just our patched copy — upstream
 *  issue gitroomhq/postiz-app#1680 tracks adding it). Treat those channels as UNSUPPORTED, never as
 *  zero: an empty array here means "no data source", and charting it as 0 would be a lie. */
export const ANALYTICS_SUPPORTED = new Set(['x']);

export const config = { BASE, get hasKey() { return Boolean(key()); } };
