import fs from 'node:fs';
import path from 'node:path';
const APPLY = process.argv.includes('--apply');
const FILE = path.join(process.cwd(), 'src', 'pages', 'SiteMap.jsx');
const src = fs.readFileSync(FILE, 'utf8');
const eol = src.includes('\r\n') ? '\r\n' : '\n';
const L = src.split(/\r?\n/);

// Explicit plan ? real route + real title from Phase 9/8. null = delete line.
const PLAN = [
  { line: 5540, oldTo: '/legal/a-dv-er-ti-si-ng-po-li-cy',     to: '/advertising',       label: 'Advertising Policy' },
  { line: 5541, oldTo: '/legal/a-fr-ic-ap-ri-va-cy',           to: null,                 reason: 'AfricaPrivacy orphan ? no route' },
  { line: 5542, oldTo: '/s-et-ti-ng-s',                        to: '/privacy-settings',  label: 'Privacy Settings' },
  { line: 5543, oldTo: '/t-im-ec-ar-dc-al-cu-la-to-r',         to: null,                 reason: 'duplicate' },
  { line: 5544, oldTo: '/t-im-er-s',                           to: null,                 reason: 'duplicate' },
  { line: 5545, oldTo: '/legal/c-hi-na-ai-ad-de-nd-um',        to: '/ai-china',          label: 'China AI Addendum' },
  { line: 5546, oldTo: '/legal/d-is-cl-ai-me-r',               to: '/disclaimer',        label: 'Disclaimer' },
  { line: 5547, oldTo: '/legal/e-ua-ia-dd-en-du-m',            to: '/ai-eu',             label: 'EU AI Act Addendum' },
  { line: 5548, oldTo: '/legal/a-si-ap-ac-if-ic-pr-iv-ac-y',   to: null,                 reason: 'AsiaPacificPrivacy orphan ? no route' },
  { line: 5549, oldTo: '/legal/a-us-tr-al-ia-ad-de-nd-um',     to: '/australia-privacy', label: 'Australia Privacy Addendum (Privacy Act 1988)' },
  { line: 5550, oldTo: '/legal/a-us-tr-al-ia-ai-ad-de-nd-um',  to: '/ai-australia',      label: 'Australia AI Addendum' },
];

let fail = false;
for (const p of PLAN) {
  const line = L[p.line - 1] || '';
  if (!line.includes('"' + p.oldTo + '"')) {
    console.error('ANCHOR FAIL L' + p.line + ' ? expected "' + p.oldTo + '"');
    console.error('  actual: ' + JSON.stringify(line));
    fail = true;
  }
}
if (fail) { console.error('RESULT: FAIL ? anchors moved, not patching'); process.exit(1); }

const newL = [];
let replaced = 0, deleted = 0;
for (let i = 0; i < L.length; i++) {
  const n = i + 1;
  const plan = PLAN.find(p => p.line === n);
  if (!plan) { newL.push(L[i]); continue; }
  if (plan.to === null) {
    console.log('DELETE L' + n + ' (' + plan.reason + ')');
    deleted++; continue;
  }
  const newLine = '  { to: "' + plan.to + '", label: "' + plan.label + '" },';
  console.log('REPLACE L' + n + ':  ' + plan.to);
  newL.push(newLine);
  replaced++;
}
const out = newL.join(eol);

console.log('\nReplaced: ' + replaced + '  Deleted: ' + deleted);
console.log('Line count: ' + L.length + ' ? ' + newL.length);

console.log('\n--- resulting block (' + (5555 - deleted) + ' context) ---');
newL.forEach((l, i) => {
  const n = i + 1;
  if (n >= 5535 && n <= 5550) console.log(String(n).padStart(5) + '| ' + l);
});

if (!APPLY) { console.log('\nDRY RUN. Re-run with --apply.'); console.log('RESULT: DRY_OK'); }
else { fs.writeFileSync(FILE, out); console.log('\nWROTE ' + FILE); console.log('RESULT: APPLIED'); }
