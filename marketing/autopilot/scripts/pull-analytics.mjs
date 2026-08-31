#!/usr/bin/env node
// Pull what actually happened — per channel AND per post — into marketing/analytics/<stamp>.json
//   node marketing/autopilot/scripts/pull-analytics.mjs 2026-08-28 [days]
// The date is explicit so runs are reproducible.
//
// Two design decisions worth keeping:
//
// 1. We join on POSTIZ'S post list, not on the postId we stored at publish time. Our stored ids were
//    wrong for the first 17 posts (a `?? true` fallback masked the response shape) and would have
//    made those posts permanently unmeasurable. Postiz already knows what it published; ask it.
// 2. A channel with no analytics API is reported as UNSUPPORTED, never as zero. Charting "0
//    impressions" for LinkedIn would be a fabricated number, and it would drag every average down.
import { readFileSync, writeFileSync } from 'node:fs';
import { getAnalytics, getPostAnalytics, listPosts, ANALYTICS_SUPPORTED } from './lib/postiz.mjs';

const stamp = process.argv[2];
const days = Number(process.argv[3] || 7);
if (!stamp || !/^\d{4}-\d{2}-\d{2}$/.test(stamp)) {
  console.error('usage: pull-analytics.mjs <YYYY-MM-DD> [days]');
  process.exit(1);
}

const channels = JSON.parse(readFileSync(new URL('../channels.json', import.meta.url))).channels;
const byIntegration = new Map(
  Object.entries(channels).filter(([, c]) => c.integrationId).map(([name, c]) => [c.integrationId, name]),
);

// The two endpoints label the SAME metric differently — aggregate says "REPLY", per-post says
// "Replies" — so labels get mapped explicitly rather than massaged. The first version lowercased and
// stripped a trailing "s", which turned "Replies" into "replie" and left the reply column reading a
// key that never existed: it printed 0 for every post, forever, including posts that got replies.
// Replies are the metric OPERATIONS says actually predicts anything, so it was the worst one to
// silently lose. An unknown label now throws instead of quietly coining a new key nothing reads.
const LABELS = {
  impression: 'impression', impressions: 'impression',
  like: 'like', likes: 'like',
  reply: 'reply', replies: 'reply',
  retweet: 'retweet', retweets: 'retweet',
  quote: 'quote', quotes: 'quote',
  bookmark: 'bookmark', bookmarks: 'bookmark',
};
// Each `data` array is a series — the LAST point is the current value.
const norm = (rows) => Object.fromEntries(
  (rows ?? []).map((r) => {
    const key = LABELS[String(r.label).toLowerCase().trim()];
    if (!key) throw new Error(`unmapped Postiz metric label "${r.label}" — add it to LABELS`);
    return [key, Number(r.data?.at(-1)?.total ?? 0)];
  }),
);

const end = new Date(`${stamp}T23:59:59.999Z`);
const start = new Date(end.getTime() - days * 864e5);

const out = { pulledFor: stamp, windowDays: days, channels: {}, posts: [] };

for (const [name, ch] of Object.entries(channels)) {
  if (!ch.integrationId) { out.channels[name] = { connected: false }; continue; }
  if (!ANALYTICS_SUPPORTED.has(ch.provider)) {
    out.channels[name] = { connected: true, supported: false, provider: ch.provider,
      reason: 'Postiz has no analytics() for this provider (upstream gitroomhq/postiz-app#1680)' };
    console.log(`- ${name.padEnd(14)} no analytics API for ${ch.provider}`);
    continue;
  }
  try {
    const m = norm(await getAnalytics(ch.integrationId, days));
    out.channels[name] = { connected: true, supported: true, provider: ch.provider, metrics: m };
    console.log(`✓ ${name.padEnd(14)} ${JSON.stringify(m)}`);
  } catch (e) {
    out.channels[name] = { connected: true, supported: true, error: e.message };
    console.error(`✗ ${name.padEnd(14)} ${e.message}`);
  }
}

const posts = await listPosts(start.toISOString(), end.toISOString());
for (const p of posts.filter((x) => x.state === 'PUBLISHED')) {
  const name = byIntegration.get(p.integration?.id) ?? p.integration?.name ?? 'unknown';
  const provider = p.integration?.providerIdentifier;
  const row = { channel: name, provider, date: p.publishDate, url: p.releaseURL ?? null,
    postizId: p.id, preview: String(p.content).replace(/\s+/g, ' ').slice(0, 70) };
  if (ANALYTICS_SUPPORTED.has(provider)) {
    try { row.metrics = norm(await getPostAnalytics(p.id, days)); }
    catch (e) { row.error = e.message; }
  } else row.metrics = null;   // null = unknowable, NOT zero
  out.posts.push(row);
}

writeFileSync(new URL(`../../analytics/${stamp}.json`, import.meta.url), JSON.stringify(out, null, 2) + '\n');

console.log(`\n${'DATE (UTC)'.padEnd(18)}${'CHANNEL'.padEnd(14)}${'IMPR'.padStart(6)}${'LIKE'.padStart(6)}${'REPLY'.padStart(7)}  URL`);
for (const r of out.posts.sort((a, b) => a.date.localeCompare(b.date))) {
  const m = r.metrics;
  const cell = (v) => (m ? String(v ?? 0) : 'n/a');
  console.log(
    `${r.date.slice(0, 16).replace('T', ' ').padEnd(18)}${r.channel.padEnd(14)}` +
    `${cell(m?.impression).padStart(6)}${cell(m?.like).padStart(6)}${cell(m?.reply).padStart(7)}  ${r.url ?? ''}`,
  );
}
const measurable = out.posts.filter((p) => p.metrics).length;
console.log(`\n${out.posts.length} published, ${measurable} measurable, ${out.posts.length - measurable} on channels with no analytics API.`);
console.log(`wrote marketing/analytics/${stamp}.json`);
