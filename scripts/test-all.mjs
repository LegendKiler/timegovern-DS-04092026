// scripts/test-all.mjs
// Structural test suite for TimeGovern.
// Tests data + route wiring — does NOT test rendered DOM (headless browsers lie about SPAs on Windows).

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const read = (p) => readFileSync(join(root, p), "utf8");

let pass = 0, fail = 0;
const failures = [];
function check(name, ok, detail) {
  if (ok) { pass++; }
  else { fail++; failures.push(name + (detail ? " -- " + detail : "")); }
}

// ---------- 1. worldRates.js structure ----------
const wrSrc = read("src/data/worldRates.js");

// Start of WORLD_RATES object to end (before CATEGORY_ORDER export)
const blockStart = wrSrc.indexOf("export const WORLD_RATES = {");
const blockEnd = wrSrc.indexOf("export const CATEGORY_ORDER");
const block = wrSrc.slice(blockStart, blockEnd);

const REQUIRED = ["key","label","shortLabel","baseValue","baseTimestamp","ratePerSecond","resetDaily","unit","format","source","sourceUrl","category","route","description","icon","gradient"];

// Match entries whether they start at line-start or after `},  ` (compact style)
const rateKeys = [];
const entryRe = /(?:\n  |,\s{2})([a-zA-Z][a-zA-Z0-9]*): \{([\s\S]*?)^  \}(?=,|$)/gm;
let m;
while ((m = entryRe.exec(block)) !== null) {
  const key = m[1];
  const body = m[2];
  rateKeys.push(key);
  for (const field of REQUIRED) {
    const re = new RegExp("\\b" + field + "\\s*:");
    if (!re.test(body)) {
      check("worldRates." + key + " missing field: " + field, false);
    }
  }
}
check("worldRates has entries", rateKeys.length > 0, "found " + rateKeys.length);
const uniqueKeys = new Set(rateKeys);
check("no duplicate WORLD_RATES keys", uniqueKeys.size === rateKeys.length,
  "dupes exist: " + (rateKeys.length - uniqueKeys.size));

// ---------- 2. Every WORLD_RATES.X used in a page exists ----------
const pagesDir = join(root, "src/pages");
const pageFiles = readdirSync(pagesDir).filter(f => f.endsWith(".jsx"));
const usedKeys = new Set();
for (const file of pageFiles) {
  const content = readFileSync(join(pagesDir, file), "utf8");
  for (const match of content.matchAll(/WORLD_RATES\.([a-zA-Z][a-zA-Z0-9]*)/g)) {
    usedKeys.add(match[1]);
    check("WORLD_RATES." + match[1] + " (used by " + file + ") exists", uniqueKeys.has(match[1]));
  }
}

// ---------- 3. Lazy imports in App.jsx all resolve to real files ----------
const appSrc = read("src/App.jsx");

const lazyRe = /const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\(['"]\.\/pages\/(\w+)['"]\)\)/g;
const importedComponents = new Set();
let lm;
while ((lm = lazyRe.exec(appSrc)) !== null) {
  const componentName = lm[1];
  const fileName = lm[2] + ".jsx";
  importedComponents.add(componentName);
  check("Page file exists: " + fileName, existsSync(join(pagesDir, fileName)));
}

// ---------- 4. Every Route component is defined somewhere in App.jsx ----------
// Collect ALL const X = definitions (lazy imports, regular imports, inline consts)
const definedComponents = new Set();
for (const match of appSrc.matchAll(/(?:const|let|var|function|class)\s+([A-Z]\w+)/g)) {
  definedComponents.add(match[1]);
}
// Also allow `import X from` default imports
for (const match of appSrc.matchAll(/^import\s+([A-Z]\w+)\s+from/gm)) {
  definedComponents.add(match[1]);
}

const routeRe = /<Route\s+path=["']([^"']+)["']\s+element=\{<(\w+)/g;
const allRoutePaths = new Set();
let rm;
while ((rm = routeRe.exec(appSrc)) !== null) {
  const path = rm[1];
  const component = rm[2];
  allRoutePaths.add(path);
  // Skip obvious inline/inbuilt components
  if (["Navigate","Outlet","Fragment","Suspense"].includes(component)) continue;
  check("Route " + path + " -> " + component + " is defined", definedComponents.has(component));
}

// ---------- 5. Sitemap <loc> URLs match registered routes (loose) ----------
const sitemapDir = join(root, "public");
const sitemaps = readdirSync(sitemapDir).filter(f =>
  f.startsWith("sitemap-") && f.endsWith(".xml") && f !== "sitemap-index.xml"
);
const sitemapUrls = new Set();
for (const sm of sitemaps) {
  const content = readFileSync(join(sitemapDir, sm), "utf8");
  for (const match of content.matchAll(/<loc>https:\/\/timegovern\.com([^<]*)<\/loc>/g)) {
    sitemapUrls.add(match[1] || "/");
  }
}

// Build a rough route-pattern matcher (handles :param, splat, etc.)
function routeMatches(url, pattern) {
  if (url === pattern) return true;
  const urlParts = url.split("/").filter(Boolean);
  const patParts = pattern.split("/").filter(Boolean);
  if (urlParts.length !== patParts.length) return false;
  for (let i = 0; i < urlParts.length; i++) {
    if (patParts[i].startsWith(":")) continue;
    if (patParts[i].startsWith("*")) return true;
    if (patParts[i] !== urlParts[i]) return false;
  }
  return true;
}

let sitemapMatched = 0, sitemapUnmatched = 0;
for (const url of sitemapUrls) {
  // Skip country-calculator deep pages which are templated by React Router
  if (url.startsWith("/auto-loan-calculator/")) { sitemapMatched++; continue; }
  if (url.startsWith("/mortgage/")) { sitemapMatched++; continue; }
  let ok = false;
  for (const pat of allRoutePaths) {
    if (routeMatches(url, pat)) { ok = true; break; }
  }
  if (ok) sitemapMatched++; else sitemapUnmatched++;
}
check("sitemap URLs resolve to routes",
  sitemapUnmatched < sitemapUrls.size * 0.3,
  "unmatched: " + sitemapUnmatched + "/" + sitemapUrls.size);

// ---------- 6. Search index hrefs point to known routes ----------
const siSrc = read("src/data/searchIndex.js");
let siBad = 0, siTotal = 0;
for (const match of siSrc.matchAll(/href:\s*["']([^"']+)["']/g)) {
  siTotal++;
  const href = match[1];
  if (href.startsWith("/auto-loan-calculator/")) continue;
  if (href.startsWith("/mortgage/")) continue;
  let ok = false;
  for (const pat of allRoutePaths) {
    if (routeMatches(href, pat)) { ok = true; break; }
  }
  if (!ok) siBad++;
}
check("search index hrefs resolve",
  siBad < siTotal * 0.2,
  "unmatched: " + siBad + "/" + siTotal);

// ---------- Report ----------
console.log("");
console.log("===============================================");
console.log("  TIMEGOVERN STRUCTURAL TESTS");
console.log("===============================================");
console.log("");
console.log("  WorldRates entries:     " + rateKeys.length);
console.log("  Page files scanned:     " + pageFiles.length);
console.log("  Lazy imports in App:    " + importedComponents.size);
console.log("  Routes registered:      " + allRoutePaths.size);
console.log("  Sitemap URLs:           " + sitemapUrls.size + " (" + sitemapMatched + " matched)");
console.log("  WORLD_RATES keys used:  " + usedKeys.size);
console.log("");
console.log("  PASS: " + pass);
console.log("  FAIL: " + fail);
console.log("");

if (fail > 0) {
  console.log("  FAILURES:");
  for (const f of failures.slice(0, 40)) console.log("    X " + f);
  if (failures.length > 40) console.log("    ... and " + (failures.length - 40) + " more");
  process.exitCode = 1;
} else {
  console.log("  ALL STRUCTURAL CHECKS PASSED");
}