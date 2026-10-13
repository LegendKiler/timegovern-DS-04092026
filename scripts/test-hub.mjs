// scripts/test-hub.mjs
// Focused audit of the /worldometers hub: verifies every WORLD_RATES entry
// will actually appear (category in CATEGORY_ORDER) and every card link
// resolves to a real page file on disk.

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const read = (p) => readFileSync(join(root, p), "utf8");

const wrSrc = read("src/data/worldRates.js");
const appSrc = read("src/App.jsx");

// --- Parse CATEGORY_ORDER ---
const catMatch = wrSrc.match(/export const CATEGORY_ORDER = \[([^\]]+)\]/);
const CATEGORY_ORDER = catMatch
  ? catMatch[1].split(",").map(s => s.trim().replace(/['"]/g, "")).filter(Boolean)
  : [];
console.log("CATEGORY_ORDER:", CATEGORY_ORDER.join(" > "));

// --- Parse WORLD_RATES entries ---
const blockStart = wrSrc.indexOf("export const WORLD_RATES = {");
const blockEnd = wrSrc.indexOf("export const CATEGORY_ORDER");
const block = wrSrc.slice(blockStart, blockEnd);

const entries = [];
const entryRe = /(?:\n  |,\s{2})([a-zA-Z][a-zA-Z0-9]*): \{([\s\S]*?)^  \}(?=,|$)/gm;
let m;
while ((m = entryRe.exec(block)) !== null) {
  const key = m[1];
  const body = m[2];
  const catMatch = body.match(/category:\s*'([^']+)'/);
  const routeMatch = body.match(/route:\s*'([^']+)'/);
  const labelMatch = body.match(/label:\s*'([^']+)'/);
  entries.push({
    key,
    label: labelMatch ? labelMatch[1] : "(no label)",
    category: catMatch ? catMatch[1] : "(no category)",
    route: routeMatch ? routeMatch[1] : "(no route)",
  });
}
console.log("Total WORLD_RATES entries:", entries.length);

// --- Group by category (mimics the hub's rendering logic) ---
const grouped = {};
for (const cat of CATEGORY_ORDER) grouped[cat] = [];
const orphans = [];
for (const e of entries) {
  if (grouped[e.category]) grouped[e.category].push(e);
  else orphans.push(e);
}

console.log("");
console.log("=== Rendered by hub (per category) ===");
let rendered = 0;
for (const cat of CATEGORY_ORDER) {
  if (grouped[cat].length === 0) continue;
  console.log("  " + cat + " (" + grouped[cat].length + ")");
  for (const e of grouped[cat]) {
    console.log("    - " + e.label + "  ->  " + e.route);
    rendered++;
  }
}

console.log("");
console.log("=== Orphans (silently hidden by hub) ===");
if (orphans.length === 0) {
  console.log("  NONE - every entry has a category in CATEGORY_ORDER");
} else {
  for (const o of orphans) {
    console.log("  X " + o.key + "  category='" + o.category + "'  label='" + o.label + "'");
  }
}
console.log("");
console.log("Rendered: " + rendered + " / " + entries.length);

// --- Check every rendered card's route has a page file ---
console.log("");
console.log("=== Route file check (clicking a card must not 404) ===");
const routeToPage = {};
for (const match of appSrc.matchAll(/<Route\s+path=["']([^"']+)["']\s+element=\{<(\w+)/g)) {
  routeToPage[match[1]] = match[2];
}
let missingPages = 0;
for (const e of entries) {
  const comp = routeToPage[e.route];
  if (!comp) {
    console.log("  X " + e.route + "  (no <Route> registered)");
    missingPages++;
    continue;
  }
  // Find the lazy import for this component
  const lazy = appSrc.match(new RegExp("const\\s+" + comp + "\\s*=\\s*lazy\\(\\(\\)\\s*=>\\s*import\\('([^']+)'\\)\\)"));
  if (!lazy) {
    console.log("  X " + e.route + " -> " + comp + "  (component not lazy-imported)");
    missingPages++;
    continue;
  }
  const pageFile = lazy[1].replace("./pages/", "src/pages/") + ".jsx";
  if (!existsSync(join(root, pageFile))) {
    console.log("  X " + e.route + " -> " + pageFile + "  (file missing on disk)");
    missingPages++;
  }
}
if (missingPages === 0) {
  console.log("  ALL " + entries.length + " routes resolve to real page files");
}

// --- Summary ---
console.log("");
const issues = orphans.length + missingPages;
if (issues === 0) {
  console.log("HUB AUDIT: PASS - all " + entries.length + " counters render and every card link resolves");
  process.exitCode = 0;
} else {
  console.log("HUB AUDIT: " + issues + " issue(s) found");
  process.exitCode = 1;
}