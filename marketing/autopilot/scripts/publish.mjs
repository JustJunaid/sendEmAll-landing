#!/usr/bin/env node
// Schedule APPROVED posts from a week's posts.json into Postiz.
//   node marketing/autopilot/scripts/publish.mjs marketing/autopilot/output/<week-dir>
//   DRY_RUN=1 node ... publish.mjs <week-dir>   # print, don't send
// Only posts with "status":"approved" are sent. After sending, status becomes "scheduled".
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createPost } from './lib/postiz.mjs';

const dir = process.argv[2];
if (!dir) { console.error('usage: publish.mjs <output/week-dir>'); process.exit(1); }

const channels = JSON.parse(readFileSync(new URL('../channels.json', import.meta.url))).channels;
const postsPath = resolve(dir, 'posts.json');
const posts = JSON.parse(readFileSync(postsPath, 'utf8'));
const dry = process.env.DRY_RUN === '1';

let scheduled = 0, skipped = 0, failed = 0;
for (const p of posts) {
  if (p.status !== 'approved') { skipped++; continue; }
  const ch = channels[p.channel];
  if (!ch?.integrationId) { console.error(`! ${p.channel}: no integrationId — fill channels.json (run list-channels.mjs)`); failed++; continue; }
  try {
    if (dry) {
      console.log(`[dry] ${p.channel} @ ${p.date}: ${p.content.slice(0, 70).replace(/\n/g, ' ')}...`);
    } else {
      const res = await createPost({ integrationId: ch.integrationId, content: p.content, date: p.date, type: 'schedule' });
      p.status = 'scheduled';
      p.postId = res?.[0]?.id ?? res?.id ?? true;
      console.log(`✓ ${p.channel} @ ${p.date}`);
    }
    scheduled++;
  } catch (e) {
    console.error(`✗ ${p.channel}: ${e.message}`);
    p.status = 'error'; p.error = e.message; failed++;
  }
}
if (!dry) writeFileSync(postsPath, JSON.stringify(posts, null, 2) + '\n');
console.log(`\n${dry ? '[dry] ' : ''}scheduled=${scheduled} skipped(not-approved)=${skipped} failed=${failed}`);
process.exit(failed ? 1 : 0);
