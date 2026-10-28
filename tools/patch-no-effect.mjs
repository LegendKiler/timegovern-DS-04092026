import fs from 'node:fs';
import path from 'node:path';
const APPLY = process.argv.includes('--apply');
const SRC = path.join(process.cwd(), 'src');
const app = fs.readFileSync(path.join(SRC, 'App.jsx'), 'utf8');

const compToFile = {};
app.split(/\r?\n/).forEach(l => {
  const m = l.match(/const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\(['"]([^'"]+)['"]\)\)/);
  if (m) compToFile[m[1]] = m[2];
});
const compToRoute = {};
app.split(/\r?\n/).forEach(l => {
  const r = l.match(/<Route\s+path=["']([^"']+)["'][^>]*element=\{<(\w+)/);
  if (r) compToRoute[r[2]] = r[1];
});

const files = [];
for (const [comp, spec] of Object.entries(compToFile)) {
  const route = compToRoute[comp];
  if (!route) continue;
  let full = spec.startsWith('@/') ? path.join(SRC, spec.slice(2)) : path.resolve(SRC, spec);
  for (const ext of ['', '.jsx', '.tsx', '.js', '.ts']) {
    if (fs.existsSync(full + ext) && fs.statSync(full + ext).isFile()) { full += ext; break; }
  }
  if (!fs.existsSync(full)) continue;
  files.push({ comp, route, file: full });
}

const rel = p => path.relative(process.cwd(), p).replace(/\\/g, '/');
const results = { patched: 0, skipped: 0 };
const skipList = [];

for (const { comp, route, file } of files) {
  const src = fs.readFileSync(file, 'utf8');
  if (src.includes('setPageMeta')) continue;
  if (/useEffect\s*\(/.test(src)) continue;

  const eol = src.includes('\r\n') ? '\r\n' : '\n';
  const lines = src.split(/\r?\n/);

  let fnIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^export default function \w+\s*\(/.test(lines[i])) { fnIdx = i; break; }
  }
  if (fnIdx === -1) { skipList.push({ file: rel(file), reason: 'no default export function' }); results.skipped++; continue; }

  let braceIdx = fnIdx;
  let bracePos = lines[fnIdx].indexOf('{');
  while (bracePos === -1 && braceIdx < lines.length - 1) { braceIdx++; bracePos = lines[braceIdx].indexOf('{'); }
  if (bracePos === -1) { skipList.push({ file: rel(file), reason: 'no body brace' }); results.skipped++; continue; }

  let title = null;
  const h1Match = src.match(/<h1[^>]*>\s*([^<>{][^<]*?)\s*<\/h1>/);
  if (h1Match) title = h1Match[1].trim();
  if (!title) title = comp.replace(/Page$/, '').replace(/([a-z])([A-Z])/g, '$1 $2');
  const fullTitle = title + ' | TimeGovern';

  const newLines = lines.slice();
  newLines.splice(braceIdx + 1, 0,
    '',
    '  useEffect(() => {',
    "    document.title = '" + fullTitle.replace(/'/g, "\\'") + "';",
    '    setPageMeta();',
    '  }, []);'
  );

  const fileDir = path.dirname(file);
  let relSeo = path.relative(fileDir, path.join(SRC, 'lib', 'seo')).replace(/\\/g, '/');
  if (!relSeo.startsWith('.')) relSeo = './' + relSeo;
  const seoImport = "import { setPageMeta } from '" + relSeo + "';";

  let reactIdx = -1;
  for (let i = 0; i < newLines.length; i++) {
    if (/^import\s+.*from\s+['"]react['"]/.test(newLines[i])) { reactIdx = i; break; }
  }

  let finalLines;
  if (reactIdx === -1) {
    finalLines = ["import { useEffect } from 'react';", seoImport, ...newLines];
  } else {
    const reactLine = newLines[reactIdx];
    if (/^import\s+\{[^}]*\}\s*from\s+['"]react['"]/.test(reactLine)) {
      const m = reactLine.match(/\{([^}]*)\}/);
      const names = m[1].split(',').map(s => s.trim()).filter(Boolean);
      if (!names.includes('useEffect')) names.push('useEffect');
      newLines[reactIdx] = "import { " + names.join(', ') + " } from 'react';";
    } else if (/^import\s+React\b/.test(reactLine)) {
      newLines[reactIdx] = reactLine.replace(/^import\s+React\b/, "import React, { useEffect }");
    } else {
      newLines.splice(reactIdx + 1, 0, "import { useEffect } from 'react';");
    }
    let lastImport = reactIdx;
    for (let i = reactIdx + 1; i < newLines.length; i++) {
      if (/^import\s+/.test(newLines[i])) lastImport = i;
      else break;
    }
    finalLines = [...newLines.slice(0, lastImport + 1), seoImport, ...newLines.slice(lastImport + 1)];
  }

  const result = finalLines.join(eol);
  if (!result.includes('setPageMeta') || !result.includes('useEffect')) {
    skipList.push({ file: rel(file), reason: 'post-check' }); results.skipped++; continue;
  }
  if (APPLY) fs.writeFileSync(file, result);
  results.patched++;
}

console.log('Would patch: ' + results.patched + '   Skipped: ' + results.skipped);
if (skipList.length) for (const s of skipList) console.log('  SKIP: ' + s.file + '  [' + s.reason + ']');
console.log(APPLY ? 'RESULT: APPLIED' : 'RESULT: DRY_OK');
