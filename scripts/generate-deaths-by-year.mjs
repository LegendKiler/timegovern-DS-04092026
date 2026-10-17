import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
async function fetchAll(ind) {
  const url = "https://api.worldbank.org/v2/country/WLD/indicator/" + ind + "?format=json&per_page=200&date=1960:2024";
  const res = await fetch(url); if (!res.ok) throw new Error("HTTP " + res.status);
  const json = await res.json();
  if (!Array.isArray(json) || json.length < 2) throw new Error("no rows");
  return (json[1] || []).filter(r => r.value != null).map(r => ({ year: parseInt(r.date, 10), value: Number(r.value) })).sort((a, b) => a.year - b.year);
}
const pop = await fetchAll("SP.POP.TOTL");
const rate = await fetchAll("SP.DYN.CDRT.IN");
const rateByYear = {}; for (const r of rate) rateByYear[r.year] = r.value;
const rows = [];
for (const p of pop) { const rt = rateByYear[p.year]; if (rt == null) continue; rows.push({ year: p.year, value: Math.round(p.value * rt / 1000) }); }
if (rows.length < 5) { console.error("only " + rows.length); process.exit(1); }
const lines = [];
lines.push("// World deaths by year - derived from SP.POP.TOTL x SP.DYN.CDRT.IN (WLD aggregate)");
lines.push("// Metric: estimated total deaths per calendar year (persons).");
lines.push("// Generated: " + new Date().toISOString().slice(0, 10));
lines.push("");
lines.push("export const WORLD_DEATHS_BY_YEAR = [");
for (const r of rows) lines.push("  { year: " + r.year + ", value: " + r.value + " },");
lines.push("];");
lines.push("");
lines.push("export function getDeathsForYear(year) {");
lines.push("  const y = parseInt(year, 10);");
lines.push("  if (!Number.isFinite(y)) return null;");
lines.push("  return WORLD_DEATHS_BY_YEAR.find(r => r.year === y) || null;");
lines.push("}");
writeFileSync(join(root, "src/data/worldDeathsByYear.js"), lines.join("\n") + "\n", "utf8");
console.log("Deaths: " + rows.length + " years (" + rows[0].year + "-" + rows[rows.length-1].year + "), latest " + rows[rows.length-1].value.toLocaleString());
