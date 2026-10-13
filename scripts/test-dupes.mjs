// scripts/test-dupes.mjs
// Duplicate audit + inventory. Catches:
//   - Duplicate <Route path=...> in App.jsx
//   - Duplicate <loc> URLs across all sitemaps
//   - Duplicate hrefs in searchIndex.js
//   - Duplicate lazy imports / component names in App.jsx
//   - Pages on disk never imported by App.jsx (orphans)
//   - Reports existing pages matching F1/F2 patterns (country / historical / by-year)

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const read = (p) => readFileSync(join(root, p), "utf8");

let issues = 0;
function section(title) { console.log("\n=== " + title + " ==="); }
function bad(msg) { console.log("  X " + msg); issues++; }
function ok(msg) { console.log("  OK " + msg); }

const appSrc = read("src/App.jsx");
const pagesDir = join(root, "src/pages");
const allPages = readdirSync(pagesDir).filter(f => f.endsWith(".jsx"));

// ---------- 1. Duplicate route paths ----------
section("1. Duplicate route paths in App.jsx");
const routeCount = {};
for (const m of appSrc.matchAll(/<Route\s+path=["']([^"']+)["']/g)) {
  const path = m[1];
  routeCount[path] = (routeCount[path] || 0) + 1;
}
const dupRoutes = Object.entries(routeCount).filter(([, n]) => n > 1);
if (dupRoutes.length === 0) ok("no duplicate route paths (" + Object.keys(routeCount).length + " unique)");
else for (const [p, n] of dupRoutes) bad("route '" + p + "' declared " + n + " times");

// ---------- 2. Duplicate lazy imports / component names ----------
section("2. Duplicate component declarations in App.jsx");
const compCount = {};
for (const m of appSrc.matchAll(/^const\s+(\w+)\s*=\s*lazy\(/gm)) {
  compCount[m[1]] = (compCount[m[1]] || 0) + 1;
}
const dupComps = Object.entries(compCount).filter(([, n]) => n > 1);
if (dupComps.length === 0) ok("no duplicate lazy component names (" + Object.keys(compCount).length + " declared)");
else for (const [c, n] of dupComps) bad("component '" + c + "' declared " + n + " times");

// ---------- 3. Duplicate sitemap URLs ----------
section("3. Duplicate <loc> URLs across all sitemaps");
const sitemapDir = join(root, "public");
const sitemaps = readdirSync(sitemapDir).filter(f => /^sitemap-.*\.xml$/.test(f) && f !== "sitemap-index.xml");
const urlMap = {};
for (const sm of sitemaps) {
  const content = readFileSync(join(sitemapDir, sm), "utf8");
  for (const m of content.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const u = m[1];
    if (!urlMap[u]) urlMap[u] = [];
    urlMap[u].push(sm);
  }
}
const dupUrls = Object.entries(urlMap).filter(([, files]) => files.length > 1);
if (dupUrls.length === 0) ok("no duplicate URLs across " + sitemaps.length + " sitemaps (" + Object.keys(urlMap).length + " unique)");
else {
  const shown = dupUrls.slice(0, 15);
  for (const [u, files] of shown) bad(u + "  [" + files.join(", ") + "]");
  if (dupUrls.length > 15) console.log("  ... and " + (dupUrls.length - 15) + " more");
}

// ---------- 4. Duplicate searchIndex hrefs ----------
section("4. Duplicate hrefs in searchIndex.js");
const siSrc = read("src/data/searchIndex.js");
const siHrefs = {};
for (const m of siSrc.matchAll(/href:\s*["']([^"']+)["']/g)) {
  siHrefs[m[1]] = (siHrefs[m[1]] || 0) + 1;
}
const dupSI = Object.entries(siHrefs).filter(([, n]) => n > 1);
if (dupSI.length === 0) ok("no duplicate hrefs (" + Object.keys(siHrefs).length + " unique)");
else for (const [h, n] of dupSI) bad(h + "  (" + n + " entries)");

// ---------- 5. Duplicate worldRates keys ----------
section("5. Duplicate WORLD_RATES keys");
const wrSrc = read("src/data/worldRates.js");
const wrBlock = wrSrc.slice(wrSrc.indexOf("export const WORLD_RATES = {"), wrSrc.indexOf("export const CATEGORY_ORDER"));
const wrKeys = {};
for (const m of wrBlock.matchAll(/(?:\n  |,\s{2})([a-zA-Z][a-zA-Z0-9]*):\s*\{/g)) {
  wrKeys[m[1]] = (wrKeys[m[1]] || 0) + 1;
}
const dupWR = Object.entries(wrKeys).filter(([, n]) => n > 1);
if (dupWR.length === 0) ok("no duplicate worldRates keys (" + Object.keys(wrKeys).length + " unique)");
else for (const [k, n] of dupWR) bad(k + "  (" + n + " entries)");

// ---------- 6. Orphan pages on disk ----------
section("6. Orphan pages (on disk but not imported by App.jsx)");
const imported = new Set();
for (const m of appSrc.matchAll(/import\(['"]\.\/pages\/(\w+)['"]\)/g)) imported.add(m[1] + ".jsx");
// Known dormant pages - files exist but intentionally not wired yet.
// Remove from this list once wired, or delete the files.
const KNOWN_DORMANT = new Set([
  "IrelandTakeHomePayPage.jsx",
  "IrelandTaxBracketsPage.jsx",
  "IrelandUSCPRSIPage.jsx",
  "SalaryHub.jsx",
  "SalaryUSAPage.jsx",
  "UKNationalInsurancePage.jsx",
  "UKTakeHomePayPage.jsx",
  "UKTaxBracketsPage.jsx",
]);
const orphans = allPages.filter(f => !imported.has(f) && !KNOWN_DORMANT.has(f));
const dormant = allPages.filter(f => !imported.has(f) && KNOWN_DORMANT.has(f));
if (dormant.length > 0) console.log("  INFO " + dormant.length + " known dormant page(s) not wired: " + dormant.join(", "));
if (orphans.length === 0) ok("no unexpected orphan pages (" + allPages.length + " pages total)");
else for (const o of orphans.slice(0, 20)) bad(o);

// ---------- 7. INVENTORY: pages by F1/F2 patterns ----------
section("7. Inventory - pages relevant to F1 (per-country) and F2 (by-year)");

console.log("\n  --- F1 collision risk: existing per-country / by-country pages ---");
const countryPages = allPages.filter(f => /country|countrypage|per-country/i.test(f));
for (const f of countryPages) console.log("    " + f);
if (countryPages.length === 0) console.log("    (none)");

console.log("\n  --- F1 collision risk: existing CO2 / energy / water pages ---");
const envPages = allPages.filter(f => /co2|emission|energy|water/i.test(f));
for (const f of envPages) console.log("    " + f);
if (envPages.length === 0) console.log("    (none)");

console.log("\n  --- F2 collision risk: existing historical / by-year / by-decade pages ---");
const yearPages = allPages.filter(f => /historical|byyear|by-year|year/i.test(f));
for (const f of yearPages) console.log("    " + f);
if (yearPages.length === 0) console.log("    (none)");

// ---------- Summary ----------
console.log("");
console.log("===============================================");
if (issues === 0) {
  console.log("  DUPLICATE AUDIT: PASS - no duplicates found");
  process.exitCode = 0;
} else {
  console.log("  DUPLICATE AUDIT: " + issues + " issue(s) found");
  process.exitCode = 1;
}
console.log("===============================================");