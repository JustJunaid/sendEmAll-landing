// Minimal Postiz public-API client. Node 22+ (global fetch). No dependencies.
// Payload shape verified against gitroomhq/postiz-app CreatePostDto (create.post.dto.ts):
//   { type, shortLink, date, tags[], posts:[{ integration:{id}, value:[{content, image[]}], settings }] }
// Auth: the raw API key goes in the `Authorization` header (NO "Bearer" prefix).
// External base = <POSTIZ_URL>/api/public/v1  (nginx strips /api -> backend /public/v1)

const BASE = (process.env.POSTIZ_URL || 'https://social.sendemall.com').replace(/\/$/, '');
const KEY = process.env.POSTIZ_API_KEY;

async function api(path, { method = 'GET', body } = {}) {
  if (!KEY) throw new Error('POSTIZ_API_KEY not set (see marketing/autopilot/.env.example)');
  const res = await fetch(`${BASE}/api/public/v1${path}`, {
    method,
    headers: { Authorization: KEY, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Postiz ${method} ${path} -> ${res.status}: ${text.slice(0, 500)}`);
  return text ? JSON.parse(text) : null;
}

/** GET connected channels -> [{ id, name, identifier(provider), ... }] */
export const listIntegrations = () => api('/integrations');

/**
 * Create a post. type: 'draft' | 'schedule' | 'now'.
 * date: ISO string (required even for draft — use the intended slot).
 */
export function createPost({ integrationId, content, date, type = 'schedule' }) {
  const post = {
    integration: { id: integrationId },
    value: [{ content, image: [] }],
  };
  // settings is required unless it's a draft; empty object = provider defaults
  if (type !== 'draft') post.settings = {};
  return api('/posts', {
    method: 'POST',
    body: { type, shortLink: false, date, tags: [], posts: [post] },
  });
}

/** GET analytics for one integration (last N days per Postiz default). */
export const getAnalytics = (integrationId) => api(`/analytics/${integrationId}`);

export const config = { BASE, hasKey: Boolean(KEY) };
