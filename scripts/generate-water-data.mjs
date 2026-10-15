// scripts/generate-water-data.mjs
// One-shot generator: World Bank ER.H2O.FWTL.K3 (freshwater withdrawals, bn m3)
// for every country in countryPopulations.js. Most recent year per country.
import { writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function decodeEscapes(s) {
  return s.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
}
const popSrc = readFileSync(join(root, "src/data/countryPopulations.js"), "utf8");
const countryRe = /\{ code:\s*'([^']+)',\s*name:\s*(?:'([^']*)'|"([^"]*)"),\s*region:\s*'([^']+)'/g;
const countries = [];
let m;
while ((m = countryRe.exec(popSrc)) !== null) {
  countries.push({ code: m[1], name: decodeEscapes(m[2] !== undefined ? m[2] : m[3]), region: m[4] });
}
console.log("Loaded " + countries.length + " countries from countryPopulations.js");

const INDICATOR = "ER.H2O.FWTL.K3";
const BASE = "https://api.worldbank.org/v2";

async function fetchOne(code) {
  const url = BASE + "/country/" + code + "/indicator/" + INDICATOR + "?format=json&per_page=60&date=1970:2024";
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    if (!Array.isArray(json) || json.length < 2) return null;
    const rows = (json[1] || []).filter(r => r.value != null);
    if (rows.length === 0) return null;
    rows.sort((a, b) => String(b.date).localeCompare(String(a.date)));
    return { value: Number(rows[0].value), year: parseInt(rows[0].date, 10) };
  } catch { return null; }
}

const results = [];
const missing = [];
const BATCH = 20;
for (let i = 0; i < countries.length; i += BATCH) {
  const batch = countries.slice(i, i + BATCH);
  const fetched = await Promise.all(batch.map(async (c) => {
    const r = await fetchOne(c.code);
    if (!r) { missing.push(c.code); return null; }
    return { code: c.code, name: c.name, region: c.region, value: r.value, year: r.year };
  }));
  const ok = fetched.filter(Boolean);
  results.push(...ok);
  console.log("Batch " + (i / BATCH + 1) + ": " + ok.length + "/" + batch.length + "  (total " + results.length + ")");
}

results.sort((a, b) => b.value - a.value);
results.forEach((r, i) => { r.rank = i + 1; });
const total = results.reduce((s, r) => s + r.value, 0);

const lines = [];
lines.push("// Country freshwater withdrawal snapshots - source: World Bank " + INDICATOR);
lines.push("// Metric: total annual freshwater withdrawals, in billion cubic meters (bn m3).");
lines.push("// Each country shows its most recent available year (data lags several years per country).");
lines.push("// Generated: " + new Date().toISOString().slice(0, 10));
lines.push("");
lines.push("export const COUNTRY_WATER = [");
for (const r of results) {
  lines.push("  { code: '" + r.code + "', name: " + JSON.stringify(r.name) + ", region: " + JSON.stringify(r.region) + ", value: " + r.value + ", year: " + r.year + ", rank: " + r.rank + " },");
}
lines.push("];");
lines.push("");
lines.push("export const TOTAL_WORLD_WATER = " + total + ";");
lines.push("");
lines.push("export function getCountryWater(code) {");
lines.push("  if (!code) return null;");
lines.push("  const upper = String(code).toUpperCase();");
lines.push("  return COUNTRY_WATER.find(c => c.code === upper) || null;");
lines.push("}");
lines.push("");
writeFileSync(join(root, "src/data/countryWater.js"), lines.join("\n"), "utf8");
console.log("");
console.log("Wrote " + results.length + " countries to src/data/countryWater.js");
console.log("Missing: " + missing.length + "  [" + missing.slice(0, 20).join(",") + (missing.length > 20 ? ",..." : "") + "]");
console.log("Total world: " + total.toFixed(2) + " bn m3");
console.log("Top 5:");
for (const r of results.slice(0, 5)) {
  console.log("  #" + r.rank + "  " + r.name + "  " + r.value.toFixed(2) + " bn m3 (" + r.year + ")");
}
