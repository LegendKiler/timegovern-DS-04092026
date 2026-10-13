// scripts/generate-energy-data.mjs
// Fetches World Bank energy use per capita (EG.USE.PCAP.KG.OE, kg oil equivalent)
// for every country in countryPopulations.js. Computes total energy as
// perCapita * population / 1e9 to get Mtoe. Writes src/data/countryEnergy.js.

import { writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function decodeEscapes(s) {
  return s.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

const popSrc = readFileSync(join(root, "src/data/countryPopulations.js"), "utf8");
const countryRe = /\{ code:\s*'([^']+)',\s*name:\s*(?:'([^']*)'|"([^"]*)"),\s*region:\s*'([^']+)',\s*population:\s*(\d+)/g;
const countries = [];
let m;
while ((m = countryRe.exec(popSrc)) !== null) {
  countries.push({
    code: m[1],
    name: decodeEscapes(m[2] !== undefined ? m[2] : m[3]),
    region: m[4],
    population: Number(m[5]),
  });
}
console.log("Loaded " + countries.length + " countries");

const INDICATOR = "EG.USE.PCAP.KG.OE";
const BASE = "https://api.worldbank.org/v2";

async function fetchOne(code) {
  const url = BASE + "/country/" + code + "/indicator/" + INDICATOR +
    "?format=json&per_page=30&date=2000:2024";
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    if (!Array.isArray(json) || json.length < 2) return null;
    const rows = (json[1] || []).filter(r => r.value != null);
    if (rows.length === 0) return null;
    rows.sort((a, b) => String(b.date).localeCompare(String(a.date)));
    return { perCapita: Number(rows[0].value), year: parseInt(rows[0].date, 10) };
  } catch {
    return null;
  }
}

const results = [];
const missing = [];
const BATCH = 20;
for (let i = 0; i < countries.length; i += BATCH) {
  const batch = countries.slice(i, i + BATCH);
  const fetched = await Promise.all(batch.map(async (c) => {
    const r = await fetchOne(c.code);
    if (!r) { missing.push(c.code); return null; }
    const totalMtoe = (r.perCapita * c.population) / 1e9;
    return {
      code: c.code,
      name: c.name,
      region: c.region,
      total: totalMtoe,
      perCapita: r.perCapita,
      year: r.year,
    };
  }));
  const ok = fetched.filter(Boolean);
  results.push(...ok);
  console.log("Batch " + (i / BATCH + 1) + ": " + ok.length + "/" + batch.length + "  (total " + results.length + ")");
}

results.sort((a, b) => b.total - a.total);
results.forEach((r, i) => { r.rank = i + 1; });

const totalWorld = results.reduce((s, r) => s + r.total, 0);

const lines = [];
lines.push("// Country energy use snapshots - source: World Bank " + INDICATOR);
lines.push("// Metric: total primary energy use in megatonnes of oil equivalent (Mtoe),");
lines.push("// computed as per-capita (kg oil eq) * population / 1e9.");
lines.push("// Generated: " + new Date().toISOString().slice(0, 10));
lines.push("");
lines.push("export const COUNTRY_ENERGY = [");
for (const r of results) {
  lines.push("  { code: '" + r.code + "', name: " + JSON.stringify(r.name) + ", region: " + JSON.stringify(r.region) + ", value: " + r.total.toFixed(4) + ", perCapita: " + r.perCapita.toFixed(2) + ", year: " + r.year + ", rank: " + r.rank + " },");
}
lines.push("];");
lines.push("");
lines.push("export const TOTAL_WORLD_ENERGY = " + totalWorld.toFixed(4) + ";");
lines.push("");
lines.push("export function getCountryEnergy(code) {");
lines.push("  if (!code) return null;");
lines.push("  const upper = String(code).toUpperCase();");
lines.push("  return COUNTRY_ENERGY.find(c => c.code === upper) || null;");
lines.push("}");
lines.push("");

writeFileSync(join(root, "src/data/countryEnergy.js"), lines.join("\n"), "utf8");
console.log("");
console.log("Wrote " + results.length + " countries to src/data/countryEnergy.js");
console.log("Missing: " + missing.length + "  [" + missing.slice(0, 20).join(",") + (missing.length > 20 ? ",..." : "") + "]");
console.log("Total world energy: " + totalWorld.toFixed(2) + " Mtoe");
console.log("Top 5:");
for (const r of results.slice(0, 5)) {
  console.log("  #" + r.rank + "  " + r.name + "  " + r.total.toFixed(2) + " Mtoe  (" + r.perCapita.toFixed(0) + " kg/person, " + r.year + ")");
}