#!/usr/bin/env node
// Prints the connected Postiz channels + their integration ids.
// Use it once after connecting channels to fill in `integrationId` in channels.json.
//   node marketing/autopilot/scripts/list-channels.mjs
import { listIntegrations, config } from './lib/postiz.mjs';

const rows = await listIntegrations();
console.log(`Postiz: ${config.BASE}\n`);
if (!Array.isArray(rows) || rows.length === 0) {
  console.log('No channels connected yet. Add channels in the Postiz UI first.');
  process.exit(0);
}
console.log('integrationId'.padEnd(38), 'provider'.padEnd(14), 'name');
console.log('-'.repeat(70));
for (const r of rows) {
  console.log(String(r.id).padEnd(38), String(r.identifier || r.provider || '?').padEnd(14), r.name || '');
}
console.log('\nPaste the ids into marketing/autopilot/channels.json');
