import fs from 'node:fs';
import path from 'node:path';
const APPLY = process.argv.includes('--apply');
const DIR = path.join(process.cwd(), 'src', 'pages', 'legal');
let patched = 0, skipped = 0, failed = 0;

for (const f of fs.readdirSync(DIR).filter(x => x.endsWith('.jsx')).sort()) {
  const FILE = path.join(DIR, f);
  const src = fs.readFileSync(FILE, 'utf8');
  if (/<h1\b/i.test(src)) { console.log('SKIP (has h1): ' + f); skipped++; continue; }
  const eol = src.includes('\r\n') ? '\r\n' : '\n';
  const L = src.split(/\r?\n/);
  const openIdx = L.findIndex(l => /<CardTitle\b/.test(l));
  if (openIdx === -1) { console.log('NO CardTitle: ' + f); failed++; continue; }
  const closeIdx = L.findIndex((l, i) => i >= openIdx && /<\/CardTitle>/.test(l));
  if (closeIdx === -1) { console.log('UNCLOSED CardTitle: ' + f); failed++; continue; }
  const newL = L.slice();
  newL[openIdx] = newL[openIdx].replace(/<CardTitle\b/g, '<h1');
  newL[closeIdx] = newL[closeIdx].replace(/<\/CardTitle>/g, '</h1>');
  const text = newL.join(eol);
  const h1Count = (text.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) { console.log('BAD (' + h1Count + ' h1): ' + f); failed++; continue; }
  console.log('OK: ' + f + '  (L' + (openIdx+1) + '-' + (closeIdx+1) + ')');
  if (APPLY) fs.writeFileSync(FILE, text);
  patched++;
}

console.log('\nPatched: ' + patched + '  Skipped: ' + skipped + '  Failed: ' + failed);
console.log(APPLY ? 'RESULT: APPLIED' : 'RESULT: DRY_OK');
