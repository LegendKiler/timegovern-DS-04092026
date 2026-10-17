import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

async function fetchAll(indicator) {
  const url = "https://api.worldbank.org/v2/country/WLD/indicator/" + indicator + "?format=json&per_page=200&date=1960:2024";
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP " + res.status + " for " + indicator);
  const json = await res.json();
  if (!Array.isArray(json) || json.length < 2) throw new Error("no rows for " + indicator);
  return (json[1] || []).filter(r => r.value != null)
    .map(r => ({ year: parseInt(r.date, 10), value: Number(r.value) }))
    .sort((a, b) => a.year - b.year);
}

const pop  = await fetchAll("SP.POP.TOTL");
const rate = await fetchAll("SP.DYN.CBRT.IN");
const rateByYear = {};
for (const r of rate) rateByYear[r.year] = r.value;

const rows = [];
for (const p of pop) {
  const rt = rateByYear[p.year];
  if (rt == null) continue;
  rows.push({ year: p.year, value: Math.round(p.value * rt / 1000) });
}
if (rows.length < 5) { console.error("only " + rows.length + " rows - aborting"); process.exit(1); }

const lines = [];
lines.push("// World births by year - derived from World Bank SP.POP.TOTL x SP.DYN.CBRT.IN (WLD aggregate)");
lines.push("// Metric: estimated total live births per calendar year (persons).");
lines.push("// Generated: " + new Date().toISOString().slice(0, 10));
lines.push("");
lines.push("export const WORLD_BIRTHS_BY_YEAR = [");
for (const r of rows) lines.push("  { year: " + r.year + ", value: " + r.value + " },");
lines.push("];");
lines.push("");
lines.push("export function getBirthsForYear(year) {");
lines.push("  const y = parseInt(year, 10);");
lines.push("  if (!Number.isFinite(y)) return null;");
lines.push("  return WORLD_BIRTHS_BY_YEAR.find(r => r.year === y) || null;");
lines.push("}");
lines.push("");
writeFileSync(join(root, "src/data/worldBirthsByYear.js"), lines.join("\n"), "utf8");
console.log("Wrote " + rows.length + " years  (" + rows[0].year + "-" + rows[rows.length-1].year + ")");
console.log("Latest: " + rows[rows.length-1].value.toLocaleString() + " births (" + rows[rows.length-1].year + ")");
