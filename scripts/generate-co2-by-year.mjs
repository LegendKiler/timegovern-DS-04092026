import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const INDICATOR = "EN.GHG.CO2.MT.CE.AR5";
const url = "https://api.worldbank.org/v2/country/WLD/indicator/" + INDICATOR + "?format=json&per_page=200&date=1960:2024";
const res = await fetch(url);
if (!res.ok) { console.error("HTTP " + res.status); process.exit(1); }
const json = await res.json();
if (!Array.isArray(json) || json.length < 2) { console.error("no rows"); process.exit(1); }
const rows = (json[1] || []).filter(r => r.value != null)
  .map(r => ({ year: parseInt(r.date, 10), value: Number(r.value) }))
  .sort((a, b) => a.year - b.year);
if (rows.length < 5) { console.error("only " + rows.length + " rows - aborting"); process.exit(1); }
const lines = [];
lines.push("// World CO2 emissions by year - source: World Bank " + INDICATOR + " (WLD aggregate)");
lines.push("// Metric: total CO2 emissions, in megatonnes CO2 equivalent (Mt CO2e).");
lines.push("// Generated: " + new Date().toISOString().slice(0, 10));
lines.push("");
lines.push("export const WORLD_CO2_BY_YEAR = [");
for (const r of rows) lines.push("  { year: " + r.year + ", value: " + r.value + " },");
lines.push("];");
lines.push("");
lines.push("export function getCo2ForYear(year) {");
lines.push("  const y = parseInt(year, 10);");
lines.push("  if (!Number.isFinite(y)) return null;");
lines.push("  return WORLD_CO2_BY_YEAR.find(r => r.year === y) || null;");
lines.push("}");
lines.push("");
writeFileSync(join(root, "src/data/worldCo2ByYear.js"), lines.join("\n"), "utf8");
console.log("Wrote " + rows.length + " years  (" + rows[0].year + "-" + rows[rows.length-1].year + ")");
console.log("Latest: " + rows[rows.length-1].value.toFixed(2) + " Mt (" + rows[rows.length-1].year + ")");
