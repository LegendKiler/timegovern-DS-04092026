import { writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
function decodeEscapes(s) { return s.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16))); }
const popSrc = readFileSync(join(root, "src/data/countryPopulations.js"), "utf8");
const countryRe = /\{ code:\s*'([^']+)',\s*name:\s*(?:'([^']*)'|"([^"]*)"),\s*region:\s*'([^']+)'/g;
const countries = [];
let m;
while ((m = countryRe.exec(popSrc)) !== null) countries.push({ code: m[1], name: decodeEscapes(m[2] !== undefined ? m[2] : m[3]), region: m[4] });
console.log("Loaded " + countries.length + " countries");
const INDICATOR = "NY.GDP.MKTP.CD";
const BASE = "https://api.worldbank.org/v2";
async function fetchOne(code) {
  const url = BASE + "/country/" + code + "/indicator/" + INDICATOR + "?format=json&per_page=60&date=1960:2024";
  try {
    const res = await fetch(url); if (!res.ok) return null;
    const json = await res.json();
    if (!Array.isArray(json) || json.length < 2) return null;
    const rows = (json[1] || []).filter(r => r.value != null);
    if (!rows.length) return null;
    rows.sort((a, b) => String(b.date).localeCompare(String(a.date)));
    return { value: Number(rows[0].value), year: parseInt(rows[0].date, 10) };
  } catch { return null; }
}
const results = [], missing = [], BATCH = 20;
for (let i = 0; i < countries.length; i += BATCH) {
  const batch = countries.slice(i, i + BATCH);
  const fetched = await Promise.all(batch.map(async (c) => {
    const r = await fetchOne(c.code);
    if (!r) { missing.push(c.code); return null; }
    return { code: c.code, name: c.name, region: c.region, value: r.value, year: r.year };
  }));
  const ok = fetched.filter(Boolean);
  results.push(...ok);
  console.log("Batch " + (i/BATCH+1) + ": " + ok.length + "/" + batch.length + "  (total " + results.length + ")");
}
results.sort((a, b) => b.value - a.value);
results.forEach((r, i) => { r.rank = i + 1; });
const total = results.reduce((s, r) => s + r.value, 0);
const lines = [];
lines.push("// Country GDP snapshots - source: World Bank " + INDICATOR);
lines.push("// Metric: GDP current US$, in billions (converted from raw USD).");
lines.push("// Each country shows its most recent available year.");
lines.push("// Generated: " + new Date().toISOString().slice(0, 10));
lines.push("");
lines.push("export const COUNTRY_GDP = [");
for (const r of results) lines.push("  { code: '" + r.code + "', name: " + JSON.stringify(r.name) + ", region: " + JSON.stringify(r.region) + ", value: " + (r.value/1e9) + ", year: " + r.year + ", rank: " + r.rank + " },");
lines.push("];");
lines.push("");
lines.push("export const TOTAL_WORLD_GDP = " + (total/1e9) + ";");
lines.push("");
lines.push("export function getCountryGdp(code) {");
lines.push("  if (!code) return null;");
lines.push("  const upper = String(code).toUpperCase();");
lines.push("  return COUNTRY_GDP.find(c => c.code === upper) || null;");
lines.push("}");
writeFileSync(join(root, "src/data/countryGdp.js"), lines.join("\n") + "\n", "utf8");
console.log("\nWrote " + results.length + " countries to countryGdp.js (billions USD)");
console.log("Missing: " + missing.length);
console.log("World GDP: $" + (total/1e12).toFixed(2) + "T");
console.log("Top 5:");
for (const r of results.slice(0, 5)) console.log("  #" + r.rank + "  " + r.name + "  $" + (r.value/1e9).toFixed(1) + "B (" + r.year + ")");
