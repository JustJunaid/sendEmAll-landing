#!/usr/bin/env node
// Pull per-channel analytics from Postiz into marketing/analytics/<YYYY-MM-DD>.json
//   node marketing/autopilot/scripts/pull-analytics.mjs 2026-08-08
// Pass the date explicitly (keeps runs reproducible / cache-friendly).
import { readFileSync, writeFileSync } from 'node:fs';
import { getAnalytics } from './lib/postiz.mjs';

const stamp = process.argv[2];
if (!stamp || !/^\d{4}-\d{2}-\d{2}$/.test(stamp)) {
  console.error('usage: pull-analytics.mjs <YYYY-MM-DD>');
  process.exit(1);
}
const channels = JSON.parse(readFileSync(new URL('../channels.json', import.meta.url))).channels;
const out = {};
for (const [name, ch] of Object.entries(channels)) {
  if (!ch.integrationId) continue;
  try { out[name] = await getAnalytics(ch.integrationId); console.log(`✓ ${name}`); }
  catch (e) { out[name] = { error: e.message }; console.error(`✗ ${name}: ${e.message}`); }
}
writeFileSync(new URL(`../../analytics/${stamp}.json`, import.meta.url), JSON.stringify(out, null, 2) + '\n');
console.log(`\nwrote marketing/analytics/${stamp}.json — feeds next week's generate.md`);
