// scripts/fix-country-populations.mjs
// Adds missing World Bank countries to countryPopulations.js.
// Preserves all existing entries byte-for-byte - only the rank field changes.
// Creates .bak backup before writing.

import { readFileSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const popPath = join(root, "src/data/countryPopulations.js");

// ---- 1. Read + parse current file ----
const src = readFileSync(popPath, "utf8");
const lines = src.split("\n");
const entryRe = /^(\s*)\{ code:\s*'([^']+)',\s*name:\s*(?:'([^']*)'|"([^"]*)"),\s*region:\s*'([^']+)',\s*population:\s*(\d+),\s*year:\s*(\d+),\s*growthRate:\s*([-\d.]+),\s*rank:\s*\d+\s*\},?\s*$/;

const existing = [];
const nonEntryLineIdxs = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(entryRe);
  if (m) {
    existing.push({
      lineIdx: i,
      originalLine: lines[i],
      code: m[2],
      name: m[3] !== undefined ? m[3] : m[4],
      region: m[5],
      population: Number(m[6]),
      year: Number(m[7]),
      growthRate: Number(m[8]),
    });
  } else {
    nonEntryLineIdxs.push(i);
  }
}
console.log("[PARSE] " + existing.length + " existing entries, " + nonEntryLineIdxs.length + " non-entry lines");
if (existing.length === 0) {
  console.log("[FAIL] No entries parsed. Aborting without writing.");
  process.exit(1);
}

// ---- 2. Fetch WB country list ----
console.log("[FETCH] World Bank country list...");
const wbListRes = await fetch("https://api.worldbank.org/v2/country?format=json&per_page=400");
const wbList = await wbListRes.json();
const realCountries = wbList[1].filter(c => c.region && c.region.id !== "NA" && c.iso2Code);
console.log("[FETCH] " + realCountries.length + " real WB countries");

const existingCodes = new Set(existing.map(e => e.code.toUpperCase()));
const missing = realCountries.filter(c => !existingCodes.has(c.iso2Code.toUpperCase()));
console.log("[DIFF] " + missing.length + " countries to add");

if (missing.length === 0) {
  console.log("[DONE] Nothing to add. Exiting without writing.");
  process.exit(0);
}

// ---- 3. Fetch bulk population + growth ----
console.log("[FETCH] Bulk population SP.POP.TOTL 2022:2024...");
const popRes = await fetch("https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&per_page=2000&date=2022:2024");
const popJson = await popRes.json();
const popByCode = {};
for (const row of popJson[1]) {
  if (row.value == null) continue;
  const code = row.country.id;
  if (!code) continue;
  const year = parseInt(row.date, 10);
  if (!popByCode[code] || year > popByCode[code].year) {
    popByCode[code] = { population: Number(row.value), year };
  }
}
console.log("[FETCH] Population for " + Object.keys(popByCode).length + " codes");

console.log("[FETCH] Bulk growth SP.POP.GROW 2022:2024...");
const growRes = await fetch("https://api.worldbank.org/v2/country/all/indicator/SP.POP.GROW?format=json&per_page=2000&date=2022:2024");
const growJson = await growRes.json();
const growByCode = {};
for (const row of growJson[1]) {
  if (row.value == null) continue;
  const code = row.country.id;
  if (!code) continue;
  const year = parseInt(row.date, 10);
  if (!growByCode[code] || year > growByCode[code].year) {
    growByCode[code] = { rate: Number(row.value), year };
  }
}
console.log("[FETCH] Growth for " + Object.keys(growByCode).length + " codes");

// ---- 4. WB region -> project region mapping ----
function mapRegion(wbRegion) {
  if (!wbRegion) return "Other";
  if (wbRegion.includes("Sub-Saharan Africa")) return "Africa";
  if (wbRegion.includes("Middle East") && wbRegion.includes("North Africa")) return "Middle East";
  if (wbRegion.includes("Europe") || wbRegion.includes("Central Asia")) return "Europe";
  if (wbRegion.includes("East Asia") || wbRegion.includes("Pacific")) return "Asia";
  if (wbRegion.includes("South Asia")) return "Asia";
  if (wbRegion === "North America") return "North America";
  if (wbRegion.includes("Latin America")) return "South America";
  return "Other";
}

// ---- 5. Build new entries ----
function jsStr(s) {
  return "'" + String(s)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/[^\x20-\x7e]/g, (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")) + "'";
}
function cleanName(n) {
  return n
    .replace(/,\s*$/, "")
    .replace(/\s*\(US\)$/, "")
    .replace(/,\s*(RB|Fed\. Rep\.|Arab Rep\.|Dem\. Rep\.|Rep\.|The|People's Rep\.)$/, "")
    .replace(/^Korea,\s*/, "")
    .replace(/^Congo,\s*/, "")
    .replace(/^Iran,\s*/, "")
    .replace(/^Egypt,\s*/, "")
    .replace(/^Yemen,\s*/, "")
    .replace(/^Venezuela,\s*/, "")
    .replace(/^Gambia,\s*/, "")
    .replace(/^Bahamas,\s*/, "")
    .trim();
}

const newEntries = [];
const skipped = [];
for (const c of missing) {
  const code = c.iso2Code.toUpperCase();
  const pop = popByCode[code];
  if (!pop) { skipped.push(code + " " + c.name + " (no pop)"); continue; }
  const grow = growByCode[code];
  const growthRate = grow ? Math.round(grow.rate * 1000) / 1000 : 0;
  newEntries.push({
    code,
    name: cleanName(c.name),
    region: mapRegion(c.region.value),
    population: pop.population,
    year: pop.year,
    growthRate,
    isNew: true,
  });
}
console.log("[BUILD] " + newEntries.length + " new entries");
if (skipped.length > 0) {
  console.log("[SKIP] " + skipped.length + " (no data):");
  for (const s of skipped) console.log("  " + s);
}

// ---- 6. Merge, sort, rank ----
const all = [...existing.map(e => ({ ...e, isNew: false })), ...newEntries];
all.sort((a, b) => b.population - a.population);
all.forEach((e, i) => { e.rank = i + 1; });

// ---- 7. Reconstruct file ----
const firstEntryIdx = existing[0].lineIdx;
const lastEntryIdx = existing[existing.length - 1].lineIdx;
const header = nonEntryLineIdxs.filter(i => i < firstEntryIdx).map(i => lines[i]);
const footer = nonEntryLineIdxs.filter(i => i > lastEntryIdx).map(i => lines[i]);

const rendered = all.map(e => {
  if (e.isNew) {
    return "  { code: " + jsStr(e.code) + ", name: " + jsStr(e.name) + ", region: " + jsStr(e.region) + ", population: " + e.population + ", year: " + e.year + ", growthRate: " + e.growthRate + ", rank: " + e.rank + " },";
  }
  return e.originalLine.replace(/rank:\s*\d+/, "rank: " + e.rank);
});

const newLines = [...header, ...rendered, ...footer];
const newContent = newLines.join("\n");

// ---- 8. Backup + write ----
const bakPath = popPath + ".bak";
if (existsSync(bakPath)) {
  console.log("[INFO] .bak already exists - not overwriting");
} else {
  copyFileSync(popPath, bakPath);
  console.log("[OK] Backup: src/data/countryPopulations.js.bak");
}
writeFileSync(popPath, newContent, "utf8");
console.log("[OK] Wrote " + all.length + " entries");

// ---- 9. Summary ----
console.log("");
console.log("=== SUMMARY ===");
console.log("  Before: " + existing.length);
console.log("  Added:  " + newEntries.length);
console.log("  Total:  " + all.length);
console.log("");
console.log("Top 10:");
for (const e of all.slice(0, 10)) {
  console.log("  #" + e.rank + "  " + e.code + "  " + e.name + "  " + e.population.toLocaleString());
}