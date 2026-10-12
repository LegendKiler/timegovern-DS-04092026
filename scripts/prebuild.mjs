// scripts/prebuild.mjs
// Node port of validate-icons.ps1
// Scans .jsx files for JSX components used but not imported.
// Exits 1 on failure so Cloudflare Pages aborts the build.

import { readdirSync, readFileSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, "..");
const srcDir = join(root, "src");

const IGNORE = new Set([
  "Fragment","StrictMode","Suspense","Component","React",
  "div","span","main","nav","header","footer","section","article","aside",
  "button","input","form","label","select","option","textarea",
  "a","p","h1","h2","h3","h4","h5","h6","ul","ol","li",
  "table","thead","tbody","tr","td","th",
  "svg","path","circle","line","polyline","polygon","g","defs","use","rect","text","tspan",
  "iframe","video","audio","canvas","img","br","hr",
]);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
    } else if (entry.isFile() && entry.name.endsWith(".jsx")) {
      const normalized = full.replace(/\\/g, "/");
      if (normalized.includes("/src/src/")) continue;
      out.push(full);
    }
  }
  return out;
}

const files = walk(srcDir);
const errors = [];
let checked = 0;

for (const file of files) {
  checked++;
  const content = readFileSync(file, "utf8");
  const imported = new Set();

  // Named imports: import Foo, { Bar, Baz as Qux } from
  for (const m of content.matchAll(/import\s+(?:(\w+)\s*,\s*)?\{([^}]+)\}\s+from/g)) {
    if (m[1]) imported.add(m[1].trim());
    for (const part of m[2].split(",")) {
      const clean = part.split(/\s+as\s+/).pop().trim();
      if (clean) imported.add(clean);
    }
  }

  // Namespace: import * as Foo from
  for (const m of content.matchAll(/import\s+\*\s+as\s+(\w+)\s+from/g)) {
    imported.add(m[1]);
  }

  // Default: import Foo from
  for (const m of content.matchAll(/import\s+(\w+)\s+from/g)) {
    imported.add(m[1]);
  }

  // Local defs: function Foo / const Foo / let Foo / var Foo / class Foo
  const localDefs = new Set();
  for (const m of content.matchAll(/(?:function|const|let|var|class)\s+([A-Z]\w*)/g)) {
    localDefs.add(m[1]);
  }

  // JSX usages: <CapitalComponent
  const usages = new Set();
  for (const m of content.matchAll(/<([A-Z][a-zA-Z0-9_]*)\b/g)) {
    usages.add(m[1]);
  }

  for (const usage of usages) {
    if (IGNORE.has(usage)) continue;
    if (imported.has(usage)) continue;
    if (localDefs.has(usage)) continue;
    const rel = relative(root, file);
    errors.push(rel + " : <" + usage + " /> used but not imported");
  }
}

console.log("");
console.log("===============================================");
console.log("  ICON VALIDATOR - scanned " + checked + " files");
console.log("===============================================");
console.log("");

if (errors.length === 0) {
  console.log("  ALL CLEAR - no missing imports");
  process.exit(0);
} else {
  console.log("  FOUND " + errors.length + " MISSING IMPORTS:");
  for (const err of errors) console.log("    X " + err);
  process.exit(1);
}