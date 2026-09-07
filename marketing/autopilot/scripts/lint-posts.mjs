#!/usr/bin/env node
// Mechanically enforce marketing/content/standard.md against a batch of drafts.
//   node marketing/autopilot/scripts/lint-posts.mjs <week-dir>...
//   node marketing/autopilot/scripts/lint-posts.mjs --self-test
//
// Exists because the standard was violated 38/38 times while being written down in full.
// A rule nobody can run is a preference, not a standard.
//
// Exit 1 on any ERROR. WARNs are judgement calls a human resolves.
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

/* ── helpers ─────────────────────────────────────────────────────────────── */
const norm = (s) => s.replace(/’/g, "'").replace(/—/g, '--').toLowerCase();
const sentences = (s) => s.split(/(?<=[.!?])\s+|\n+/).map((x) => x.trim()).filter(Boolean);
const paras = (s) => s.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
const firstLine = (s) => s.split('\n').find((l) => l.trim()) || '';
const lastLine = (s) => s.trimEnd().split('\n').filter((l) => l.trim()).pop() || '';
const words = (s) => norm(s).replace(/https?:\/\/\S+|\b[a-z0-9-]+\.(?:com|io|co|net|org)\/\S*/g, ' ')
  .replace(/[^a-z0-9\s']/g, ' ').split(/\s+/).filter(Boolean);

/* ── rule definitions ────────────────────────────────────────────────────── */

// R1. The AI-slop lexicon + banned constructions (content-standard.md "Anti-slop rules").
const BANNED_PHRASES = [
  'ai-powered', 'ai powered', 'revolutionize', 'revolutionise', 'cutting-edge', 'game-changing',
  'game changer', 'supercharge', 'seamless', 'seamlessly', 'effortless', 'effortlessly',
  'best-in-class', 'next-gen', 'synergy', 'empower', 'unlock the', 'unlocks the',
  'in today\'s competitive', 'let\'s talk about', 'the truth is', 'here\'s the thing',
  'unpopular opinion', 'hot take', 'i\'ll be honest', 'let that sink in', 'read that again',
  'needle-moving', 'move the needle', 'double down', 'at the end of the day',
];

// R2. Engagement bait. If a post earns a comment it earns it on substance.
const BAIT = [
  'thoughts?', 'agree?', 'am i wrong', 'drop a', 'save this', 'repost if', 'follow for more',
  'genuinely curious', 'be honest', 'i\'ll trade stories', 'let me know in the comments',
  'what do you think', 'tag someone', 'comment below', 'sound off',
];

// R2b. NEVER PUBLISH — marketing/content/claims.md. The backend send cap already leaked once onto the
// Cal.com booking page while this was a bullet in a document nobody greps. These are the three
// facts that cost us if they ship, so they block the build rather than warn.
const NEVER_PUBLISH = [
  { id: 'send-cap', re: /\b(2[05]0|300|350|400|450|500)\s*[,.]?\s*(?:000|k)\b[^.\n]{0,40}(?:\/|\bper\b|\ba\b)\s*(?:mo\b|month)/i,
    why: 'the backend send cap is never surfaced — publicly the sequencer is "unlimited"' },
  { id: 'send-cap-bare', re: /\bsend(?:ing)?\s+cap\b|\bsoft\s+cap\b/i,
    why: 'never reference an internal sending cap in public copy' },
  { id: 'mailbox-ratio', re: /\b\d+\s*mailboxes?\s+per\s+domain\b|\bper\s+domain\b[^.\n]{0,25}\bmailboxes?\b|\bmailboxes?\b[^.\n]{0,25}\bper\s+(?:sending\s+)?domain\b/i,
    why: 'mailbox-per-domain ratios are never published' },
  { id: 'customer-volume', re: /\b(?:agencies|customers|clients|teams|users)\s+(?:who\s+)?(?:send|sending|push)\b[^.\n]{0,30}\d/i,
    why: 'no customer volume claim — we have no customer proof yet' },
  // RETIRED by CLAUDE.md: the only accuracy claim we publish is the <3% bounce guarantee. This one
  // sat in claims.md as an ownable claim with an owner until 2026-08-28 — the ledger that exists to
  // be the guard was itself offering a banned number. Matches our stat, not the general topic:
  // a post may discuss false-positive rates as a category, it may not assert a figure as ours.
  { id: 'retired-fp-rate', re: /\b0?\.\d+\s*%[^.\n]{0,40}\b(?:false[ -]positive|accuracy|accurate)\b|\b(?:false[ -]positive|accuracy)\s+rate[^.\n]{0,30}\b0?\.\d+\s*%/i,
    why: 'the 0.20% false-positive stat is RETIRED — the <3% bounce guarantee is our only accuracy claim' },
];

// R3. Colon-labels — a labelled summary line standing in for actually writing the sentence.
const COLON_LABEL = /^[^\n:]{2,42}:\s*$|^(the |our |here'?s |a |one )?[a-z' ]{2,38}(summary|position|point|takeaway|lesson|truth|reality|answer|rule|thing|caveat|honest [a-z]+|uncomfortable [a-z]+)\s*:/i;

// R4. THE CONTRAST REFRAME — "it's not X, it's Y".
// LinkedIn named this construction as an example of formulaic content it demotes, and it is the
// natural output shape of contrarian + teardown posts, which are the two shapes we use most.
// Detected as *shape*, not phrasing: a negated predicate followed by an affirmative substitution.
// Deliberately catches disguised variants; a false positive costs 10 seconds of human judgement,
// a false negative costs silent demotion nobody can see in the dashboard.
const REFRAME_PATTERNS = [
  // "That's not X. It's Y."  /  "That's not X — it's Y."
  { id: 'neg-then-copula', re: /\b(?:that'?s|this is|it'?s|these are|they'?re|you'?re|we'?re|there'?s)\s+not\b[^.!?\n]{0,90}[.!?\n—-]+\s*(?:it'?s|that'?s|this is|they'?re|you'?re|we'?re|it is)\b/gi },
  // "X isn't Y. It's Z."  /  "X isn't just Y. It's Z."
  { id: 'isnt-then-copula', re: /\b(?:isn'?t|aren'?t|wasn'?t|weren'?t)\s+(?:just\s+)?[^.!?\n]{0,90}[.!?\n—-]+\s*(?:it'?s|that'?s|this is|they'?re|it is)\b/gi },
  // "A B, not a C."  — trailing substitution ("a photo, not a feed")
  { id: 'trailing-not', re: /\b(?:is|are|was|were|feels?|looks?|reads?)\s+(?:a|an|the)?\s*[^,.!?\n]{2,40},\s*not\s+(?:a|an|the)?\s*[^,.!?\n]{2,40}[.!?\n]/gi },
  // "You didn't X. You Y." — negation then substituted action
  { id: 'didnt-then-did', re: /\b(?:didn'?t|don'?t|won'?t|can'?t|never)\b[^.!?\n]{0,80}[.!?\n]+\s*(?:you|we|they|it|that)\s+(?:just\s+)?[a-z]+(?:ed|s)?\b/gi },
  // "X is not a Y. <clause> — that's a Y." — restated-noun substitution across two sentences
  { id: 'noun-substitution', re: /\bis not (?:a|an)\s+([a-z ]{3,30})\.[^.]{0,180}\bthat'?s (?:a|an)\s+\1\b/gi },
  // "not A. A." bare
  { id: 'not-dash-affirm', re: /\bnot\s+[a-z][^.!?\n]{0,50}[.—-]\s*(?:just|simply|only)?\s*[a-z][^.!?\n]{0,50}[.!?]/gi },
];

// R5. Broetry — uniformity is the tell, not whitespace itself.
function isBroetry(content) {
  const p = paras(content);
  if (p.length < 4) return false;
  const oneLiners = p.filter((x) => !x.includes('\n') && x.length < 120).length;
  return oneLiners / p.length >= 0.85;
}

// R6. Closer taxonomy — rotation is enforced, so the closer must be classifiable.
function closerType(content) {
  const l = lastLine(content);
  if (/[?]\s*[\u{1F300}-\u{1FAFF}☀-➿]*\s*$/u.test(l)) return 'question';
  if (/^\s*[\u{1F300}-\u{1FAFF}☀-➿]/u.test(l)) return 'emoji';
  if (/\d/.test(l)) return 'number';
  if (/^(so|therefore|which is why|the rule|rule:|always|never)\b/i.test(l)) return 'rule';
  const w = words(l).length;
  if (w <= 8) return 'verdict';
  return 'statement';
}

const EMOJI = /[\u{1F300}-\u{1FAFF}\u{1F900}-\u{1F9FF}☀-➿⬀-⯿️]/u;

const SKELETONS = ['story-turn-lesson', 'protocol', 'single-argument', 'data-drop', 'taxonomy', 'teardown'];
const TERRITORIES = ['targeting-data', 'copy-messaging', 'multichannel', 'deliverability-infra',
  'data-quality', 'metrics-economics', 'team-ops', 'strategy-market'];

/* ── the checks ──────────────────────────────────────────────────────────── */
const findings = [];
const add = (level, rule, where, msg, quote) => findings.push({ level, rule, where, msg, quote });

function checkPost(p, where) {
  if (!p.date || isNaN(new Date(p.date))) {
    add('ERROR', 'bad-date', where, `unparseable date ${JSON.stringify(p.date)} — this silently disables the cooldown and ordering rules`, '');
  }
  const c = p.content;
  const n = norm(c);
  const isX = /-x$/.test(p.channel || '');

  for (const b of BANNED_PHRASES) if (n.includes(b)) add('ERROR', 'banned-phrase', where, `banned phrase "${b}"`, b);
  for (const b of BAIT) if (n.includes(b)) add('ERROR', 'engagement-bait', where, `engagement bait "${b}"`, b);

  for (const { id, re, why } of NEVER_PUBLISH) {
    const m = c.match(re);
    if (m) add('ERROR', 'never-publish', where, `${id}: ${why} (marketing/content/claims.md)`, m[0].slice(0, 80));
  }

  for (const { id, re } of REFRAME_PATTERNS) {
    for (const m of c.matchAll(re)) add('ERROR', 'contrast-reframe', where, `"it's not X, it's Y" reframe (${id}) — LinkedIn names this as demoted formulaic content`, m[0].replace(/\s+/g, ' ').slice(0, 110));
  }

  const emdash = (c.match(/—/g) || []).length;
  if (emdash > 1) add('ERROR', 'em-dash', where, `${emdash} em-dashes (max 1)`, '');

  const labels = c.split('\n').filter((l) => COLON_LABEL.test(l.trim()));
  if (labels.length > 1) add('ERROR', 'colon-label', where, `${labels.length} colon-labels (max 1)`, labels.join(' | ').slice(0, 110));

  const emo = (c.match(new RegExp(EMOJI, 'gu')) || []);
  if (emo.length) add('ERROR', 'emoji', where, `${emo.length} emoji — banned as decoration/bullets`, emo.join(''));

  const hook = firstLine(c);
  if (hook.length > 140) add('ERROR', 'hook-length', where, `hook is ${hook.length} chars (max 140)`, hook.slice(0, 110));
  if (/\?\s*$/.test(hook.trim())) add('ERROR', 'question-opener', where, 'question opener — the worst-measured opening style', hook.slice(0, 110));
  if (/^(in today|let'?s talk|have you ever|what if|imagine|picture this|ever wonder)/i.test(hook)) add('ERROR', 'throat-clear', where, 'throat-clearing opener', hook.slice(0, 110));

  if (isBroetry(c)) add('WARN', 'broetry', where, 'uniform one-line paragraphs — mix paragraph sizes 1-3 lines', '');

  // Metadata required for the account-level rotation rules to mean anything.
  if (!p.skeleton) add('ERROR', 'missing-skeleton', where, `no "skeleton" field (one of: ${SKELETONS.join(', ')})`, '');
  else if (!SKELETONS.includes(p.skeleton)) add('ERROR', 'bad-skeleton', where, `unknown skeleton "${p.skeleton}"`, '');
  if (!p.territory) add('ERROR', 'missing-territory', where, `no "territory" field (one of: ${TERRITORIES.join(', ')})`, '');
  else if (!TERRITORIES.includes(p.territory)) add('ERROR', 'bad-territory', where, `unknown territory "${p.territory}"`, '');

  if (isX && c.length > 280 && !p.thread) add('WARN', 'x-length', where, `${c.length} chars on X without "thread": true`, '');
  if (isX && /https?:\/\//.test(c) && !p.linkIsThePoint) add('WARN', 'x-link-cost', where, 'URL on X costs $0.20 vs $0.015 — set "linkIsThePoint": true if intended', '');
  if (!isX && /https?:\/\//.test(c)) add('WARN', 'li-link', where, 'URL in a LinkedIn post body is fine (858 vs 786 median) — but never attach a preview card', '');
}

function checkAccount(key, posts) {
  const seq = posts.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const where = `account:${key}`;

  // Question closers: max 1 in 3, never twice running.
  const closers = seq.map((p) => closerType(p.content));
  const q = closers.filter((x) => x === 'question').length;
  if (q / seq.length > 1 / 3) add('ERROR', 'question-closer-rate', where, `${q}/${seq.length} posts close with a question (max 1 in 3)`, '');
  for (let i = 1; i < closers.length; i++) {
    if (closers[i] === closers[i - 1]) add('ERROR', 'closer-repeat', where, `same closer type "${closers[i]}" twice running (${seq[i - 1].date.slice(0, 10)} then ${seq[i].date.slice(0, 10)})`, '');
  }

  // Skeleton variety: across any six-post run, no more than two share a skeleton.
  for (let i = 0; i + 6 <= seq.length; i++) {
    const win = seq.slice(i, i + 6).map((p) => p.skeleton);
    const counts = win.reduce((a, s) => ((a[s] = (a[s] || 0) + 1), a), {});
    for (const [s, n] of Object.entries(counts)) {
      if (n > 2) add('ERROR', 'skeleton-variety', where, `skeleton "${s}" used ${n}x in the six-post run starting ${seq[i].date.slice(0, 10)} (max 2)`, '');
    }
  }

  // Colon-labels across a six-post run: max 2 per account (content-standard.md).
  for (let i = 0; i + 6 <= seq.length || (i === 0 && seq.length < 6); i++) {
    const win = seq.slice(i, i + 6);
    const n = win.reduce((a, p) => a + p.content.split('\n').filter((l) => COLON_LABEL.test(l.trim())).length, 0);
    if (n > 2) add('ERROR', 'colon-label-run', where, `${n} colon-labels across the ${win.length}-post run from ${win[0].date.slice(0, 10)} (max 2)`, '');
    if (seq.length < 6) break;
  }

  // The aphoristic kicker: a standalone short final paragraph landing an epigram. Both cold
  // reads counted it at 25/25 — "real people are inconsistent; 25 for 25 is a machine."
  // A post is allowed to just end. Cap at 3 in any 5-post run.
  for (let i = 0; i + 5 <= seq.length || (i === 0 && seq.length < 5); i++) {
    const win = seq.slice(i, i + 5);
    const kick = win.filter((p) => { const ps = paras(p.content); const last = ps[ps.length - 1] || ''; return ps.length > 2 && !last.includes('\n') && words(last).length <= 12; });
    if (kick.length > 3) add('WARN', 'aphoristic-kicker', where, `${kick.length}/${win.length} posts from ${win[0].date.slice(0, 10)} end on a standalone one-line epigram (max 3 in 5)`, '');
    if (seq.length < 5) break;
  }

  // Arrow-bullet arrays: never two consecutive posts on one account.
  const arrows = seq.map((p) => (p.content.match(/^→/gm) || []).length > 0);
  for (let i = 1; i < arrows.length; i++) {
    if (arrows[i] && arrows[i - 1]) add('WARN', 'arrow-runs', where, `→ bullet arrays on consecutive posts (${seq[i - 1].date.slice(0, 10)}, ${seq[i].date.slice(0, 10)})`, '');
  }
}

function checkBatch(all) {
  // The "secret nobody tells you" cold open. Two independent cold reads found this on 7 of 25
  // posts across 5 accounts — one writer's hook, wearing different names. Cap 1 in 5.
  const SECRET_OPEN = /^(nobody|almost nobody|most (teams|people|of)|everyone (writes|in|else)|hardly anyone)\b|nobody (tells|writes|explains|mentions|prices)|never (explained|mentioned|written)|no ?one (tells|mentions)/i;
  const secret = all.filter((p) => SECRET_OPEN.test(firstLine(p.content)) || SECRET_OPEN.test(p.content.split('\n').slice(0, 2).join(' ')));
  if (secret.length / all.length > 0.2) {
    add('ERROR', 'secret-opener', 'batch', `${secret.length}/${all.length} posts open on "nobody tells you / most teams get this wrong" (max 1 in 5)`, secret.slice(0, 3).map((p) => p.channel).join(', '));
  }

  // Skeleton concentration across the whole batch, not just per account. The "this thing you
  // treat as one is secretly N things" post was running on four different accounts at once.
  const sk = all.reduce((a, p) => ((a[p.skeleton || '?'] = (a[p.skeleton || '?'] || 0) + 1), a), {});
  for (const [k, n] of Object.entries(sk)) {
    if (n / all.length > 0.3) add('ERROR', 'skeleton-concentration', 'batch', `skeleton "${k}" is ${n}/${all.length} (${Math.round(n / all.length * 100)}%) across the batch — max 30%`, '');
  }

  // "Statement: then a list" opener — our most visible fingerprint. Cap 1 in 5.
  const stmtList = all.filter((p) => {
    const l = p.content.split('\n').filter((x) => x.trim());
    return /:\s*$/.test(l[0] || '') && /^([\d]+[.)]|→|-|•)/.test((l[1] || '').trim());
  });
  if (stmtList.length / all.length > 0.2) {
    add('ERROR', 'statement-list-opener', 'batch', `${stmtList.length}/${all.length} posts open "Statement:" then a list (max 1 in 5)`, '');
  }

  // Thesis concentration by territory. No area may dominate the way deliverability did (71%).
  const terr = all.reduce((a, p) => ((a[p.territory || '?'] = (a[p.territory || '?'] || 0) + 1), a), {});
  for (const [t, n] of Object.entries(terr)) {
    if (n / all.length > 0.25) add('ERROR', 'territory-concentration', 'batch', `territory "${t}" is ${n}/${all.length} (${Math.round(n / all.length * 100)}%) — max 25%`, '');
  }
  for (const t of TERRITORIES) if (!terr[t]) add('WARN', 'territory-gap', 'batch', `territory "${t}" has zero posts`, '');

  // Claim cooldown: the same proof point asserted by two accounts inside 30 days reads as coordinated.
  const byClaim = {};
  for (const p of all) for (const cl of (p.claims || [])) (byClaim[cl] ||= []).push(p);
  for (const [cl, ps] of Object.entries(byClaim)) {
    const s = ps.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    for (let i = 1; i < s.length; i++) {
      const days = (new Date(s[i].date) - new Date(s[i - 1].date)) / 864e5;
      if (days < 30) add('ERROR', 'claim-cooldown', 'batch', `claim "${cl}" reused after ${Math.round(days)}d by ${s[i].channel} (30-day cooldown; previously ${s[i - 1].channel})`, '');
    }
  }

  // Cross-account phrase reuse. Distinct people do not share six-word runs.
  const grams = new Map();
  for (const p of all) {
    const w = words(p.content);
    const seen = new Set();
    for (let i = 0; i + 6 <= w.length; i++) {
      const g = w.slice(i, i + 6).join(' ');
      if (seen.has(g)) continue;
      seen.add(g);
      (grams.get(g) || grams.set(g, []).get(g)).push(p);
    }
  }
  for (const [g, ps] of grams) {
    const accts = [...new Set(ps.map((p) => p.channel))];
    if (accts.length > 1) add('ERROR', 'phrase-reuse', 'batch', `6-gram shared across ${accts.join(' + ')}`, g);
  }
}

/* ── self-test: prove each rule fires, and fires for the right reason ────── */
function selfTest() {
  const base = { channel: 'x-x', date: '2026-01-01T00:00:00.000Z', skeleton: 'teardown', territory: 'copy-messaging' };
  const cases = [
    ['contrast-reframe', "That's not intelligence. It's spray and pray with better grammar."],
    ['contrast-reframe', 'Fragmentation isn\'t just expensive. It\'s fragile.'],
    ['contrast-reframe', 'A database is a photo, not a feed.'],
    ['contrast-reframe', "You didn't save $40. You bought worse data about your pipeline."],
    ['contrast-reframe', 'A row in a database is not a potential buyer. A company that raised a round — that\'s a potential buyer.'],
    ['banned-phrase', 'Unpopular opinion: warmup is overrated.'],
    ['engagement-bait', 'Genuinely curious what the worst routine out there looks like.'],
    ['emoji', 'What did it cost you? \u{1F447}'],
    ['question-opener', 'Do you actually know your bounce rate from last month?'],
    ['em-dash', 'One — two — three.'],
    ['missing-skeleton', 'A clean line.', { skeleton: undefined }],
    ['throat-clear', "Let's talk about deliverability."],
    ['never-publish', 'The platform handles 500,000 emails per month before we throttle.'],
    ['never-publish', 'We run 3 mailboxes per domain as standard.'],
    ['never-publish', 'Our agencies send 500K+ a month through it.'],
    ['never-publish', 'There is a soft cap we do not talk about.'],
  ];
  let pass = 0, fail = 0;
  for (const [rule, content, over] of cases) {
    findings.length = 0;
    checkPost({ ...base, ...(over || {}), content }, 'self-test');
    const hit = findings.some((f) => f.rule === rule);
    if (hit) pass++; else { fail++; console.log(`  FAIL  ${rule.padEnd(20)} did not fire on: ${content.slice(0, 70)}`); }
  }
  // Negative controls: clean copy must stay silent.
  const clean = [
    'SPF authenticates the envelope sender. DMARC checks the header From. Third-party senders break the second while passing the first.',
    'Two open AE roles is an outbound problem today. Fresh funding is a budget cycle. Both age out in about six weeks.',
    'Unlimited seats, unlimited workspaces, unlimited sending. No per-seat tax.',
    'A domain carrying a real brand earns patient, low-volume sending over weeks.',
  ];
  for (const c of clean) {
    findings.length = 0;
    checkPost({ ...base, content: c }, 'self-test');
    if (findings.length) { fail++; console.log(`  FAIL  false positive on clean copy: ${findings.map((f) => f.rule).join(',')}\n        ${c.slice(0, 70)}`); }
    else pass++;
  }
  console.log(`\nself-test: ${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
}

/* ── main ────────────────────────────────────────────────────────────────── */
const args = process.argv.slice(2);
if (args.includes('--self-test')) selfTest();
if (!args.length) { console.error('usage: lint-posts.mjs <week-dir>... | --self-test'); process.exit(1); }

const all = [];
for (const dir of args) {
  const f = resolve(dir, 'posts.json');
  if (!existsSync(f)) { console.error(`no posts.json in ${dir}`); process.exit(1); }
  const posts = JSON.parse(readFileSync(f, 'utf8'));
  posts.forEach((p, i) => { p._where = `${dir.replace(/\/$/, '').split('/').pop()}#${i} ${p.channel}`; all.push(p); });
}

for (const p of all) checkPost(p, p._where);
const byAcct = all.reduce((a, p) => ((a[p.channel] ||= []).push(p), a), {});
for (const [k, ps] of Object.entries(byAcct)) checkAccount(k, ps);
checkBatch(all);

const errors = findings.filter((f) => f.level === 'ERROR');
const warns = findings.filter((f) => f.level === 'WARN');
const byRule = findings.reduce((a, f) => ((a[f.rule] ||= []).push(f), a), {});

console.log(`\nlint-posts — ${all.length} posts across ${Object.keys(byAcct).length} accounts\n`);
for (const [rule, fs_] of Object.entries(byRule).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${fs_[0].level === 'ERROR' ? 'ERROR' : 'warn '} ${rule}  (${fs_.length})`);
  for (const f of fs_.slice(0, 8)) console.log(`        ${f.where}: ${f.msg}${f.quote ? `\n          > ${f.quote}` : ''}`);
  if (fs_.length > 8) console.log(`        ... ${fs_.length - 8} more`);
  console.log();
}
console.log(`${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
