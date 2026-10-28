import fs from 'node:fs';
import path from 'node:path';
const APPLY = process.argv.includes('--apply');
const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');
const app = fs.readFileSync(path.join(SRC, 'App.jsx'), 'utf8');

const compToRoute = {}, compToFile = {};
app.split(/\r?\n/).forEach(l => {
  const r = l.match(/<Route\s+path=["']([^"']+)["'][^>]*element=\{<(\w+)/);
  if (r) compToRoute[r[2]] = r[1];
  const m = l.match(/const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\(['"]([^'"]+)['"]\)\)/);
  if (m) compToFile[m[1]] = m[2];
});

const files = [];
for (const [comp, route] of Object.entries(compToRoute)) {
  const spec = compToFile[comp];
  if (!spec) continue;
  let full = spec.startsWith('@/') ? path.join(SRC, spec.slice(2)) : path.resolve(path.dirname(path.join(SRC, 'App.jsx')), spec);
  for (const ext of ['', '.jsx', '.tsx', '.js', '.ts']) {
    if (fs.existsSync(full + ext) && fs.statSync(full + ext).isFile()) { full = full + ext; break; }
  }
  if (!fs.existsSync(full)) continue;
  files.push({ comp, route, file: full });
}

const rel = p => path.relative(ROOT, p).replace(/\\/g, '/');
const missing = files.filter(f => !fs.readFileSync(f.file, 'utf8').includes('setPageMeta'));
console.log('Routed components: ' + files.length);
console.log('Missing setPageMeta: ' + missing.length + '\n');

const results = { patched: 0, skipped: 0, failed: 0 };
const skips = [];

for (const { comp, route, file } of missing) {
  const src = fs.readFileSync(file, 'utf8');
  const eol = src.includes('\r\n') ? '\r\n' : '\n';
  const lines = src.split(/\r?\n/);

  const hasImport = /import\s*\{[^}]*\bsetPageMeta\b[^}]*\}\s*from/.test(src);
  const useEffIdx = lines.findIndex(l => /useEffect\s*\(\s*(?:\(\s*\)|\w+)\s*=>\s*\{/.test(l));

  if (useEffIdx === -1) {
    skips.push({ file: rel(file), route, reason: 'no useEffect' });
    results.skipped++; continue;
  }
  const lineAtEff = lines[useEffIdx];
  const afterArrow = lineAtEff.split('=>')[1] || '';
  const afterBrace = afterArrow.split('{').slice(1).join('{');
  if (afterBrace.includes('}')) {
    skips.push({ file: rel(file), route, reason: 'inline useEffect' });
    results.skipped++; continue;
  }

  const fileDir = path.dirname(file);
  let relImport = path.relative(fileDir, path.join(SRC, 'lib', 'seo')).replace(/\\/g, '/');
  if (!relImport.startsWith('.')) relImport = './' + relImport;
  const importLine = "import { setPageMeta } from '" + relImport + "';";

  const newLines = [];
  let importInserted = hasImport;
  let callInserted = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    newLines.push(line);
    if (!importInserted && /^import\s+/.test(line)) {
      const next = lines[i + 1] || '';
      if (!/^import\s+/.test(next)) {
        newLines.push(importLine);
        importInserted = true;
      }
    }
    if (!callInserted && i === useEffIdx) {
      const indent = (line.match(/^(\s*)/)[1] || '') + '  ';
      newLines.push(indent + 'setPageMeta();');
      callInserted = true;
    }
  }

  if (!callInserted) { skips.push({ file: rel(file), route, reason: 'no insert point' }); results.failed++; continue; }

  const result = newLines.join(eol);
  if (!result.includes('setPageMeta()')) { skips.push({ file: rel(file), route, reason: 'post-check' }); results.failed++; continue; }

  if (APPLY) fs.writeFileSync(file, result);
  results.patched++;
}

console.log('Would patch: ' + results.patched);
if (skips.length) {
  console.log('\nSkipped / failed:');
  for (const s of skips) console.log('  ' + s.file + '  [' + s.reason + ']  route=' + s.route);
}
console.log('\n' + (APPLY ? 'RESULT: APPLIED' : 'RESULT: DRY_OK'));
