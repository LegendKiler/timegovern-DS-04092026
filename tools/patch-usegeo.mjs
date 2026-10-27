import fs from 'node:fs';
import path from 'node:path';

const APPLY = process.argv.includes('--apply');
const FILE = path.join(process.cwd(), 'src', 'hooks', 'useGeo.js');
if (!fs.existsSync(FILE)) { console.error('RESULT: FAIL — ' + FILE + ' not found'); process.exit(1); }

const src = fs.readFileSync(FILE, 'utf8');
const eol = src.includes('\r\n') ? '\r\n' : '\n';
const L = src.split(/\r?\n/);

function assertLine(n, expected, label) {
  const actual = L[n - 1];
  if (actual !== expected) {
    console.error('ANCHOR FAIL at ' + label + ' L' + n);
    console.error('  expected: ' + JSON.stringify(expected));
    console.error('  actual:   ' + JSON.stringify(actual));
    process.exit(1);
  }
}
assertLine(61, '    const fallbackTz = browserTimezone();', 'fallbackTz');
assertLine(65, "        const res = await fetch('/api/geo', { headers: { accept: 'application/json' } });", 'fetch call');

const insert = [
  '',
  '    // Local dev (localhost / 127.0.0.1): Cloudflare Pages Functions do not run',
  '    // under `vite preview` or plain `vite dev`, so /api/country 404s there.',
  '    // Skip the fetch and go straight to the browser-timezone fallback.',
  "    const isLocal = typeof window !== 'undefined'",
  "      && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');",
  '    if (isLocal) {',
  "      const value = { country: null, region: null, city: null, timezone: fallbackTz, source: 'local-dev' };",
  '      writeCache(value);',
  '      setGeo(value);',
  '      setLoading(false);',
  '      return;',
  '    }',
];

const NEW_FETCH = "        const res = await fetch('/api/country', { headers: { accept: 'application/json' } });";
const newLines = [];
for (let i = 0; i < L.length; i++) {
  const n = i + 1;
  if (n === 65) { newLines.push(NEW_FETCH); continue; }
  newLines.push(L[i]);
  if (n === 61) for (const s of insert) newLines.push(s);
}

const out = newLines.join(eol);

// Post-condition asserts
const checks = [
  ['no /api/geo remains', !out.includes("'/api/geo'")],
  ['/api/country present', out.includes("'/api/country'")],
  ['isLocal guard present', out.includes('const isLocal =')],
  ["source: 'local-dev' present", out.includes("source: 'local-dev'")],
];
let ok = true;
for (const [label, pass] of checks) { console.log((pass ? 'PASS ' : 'FAIL ') + label); if (!pass) ok = false; }
if (!ok) { console.error('RESULT: FAIL — post-condition checks failed, not writing'); process.exit(1); }

console.log('\n--- changed regions ---');
out.split(/\r?\n/).forEach((l, i) => {
  if (i >= 56 && i <= 78) console.log(String(i + 1).padStart(4) + '| ' + l);
});

if (!APPLY) {
  console.log('\nDRY RUN. Re-run with --apply to write.');
  console.log('RESULT: DRY_OK');
} else {
  fs.writeFileSync(FILE, out);
  console.log('\nWROTE ' + path.relative(process.cwd(), FILE));
  console.log('RESULT: APPLIED');
}
