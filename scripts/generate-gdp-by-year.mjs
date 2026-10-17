import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const INDICATOR = "NY.GDP.MKTP.CD";
const url = "https://api.worldbank.org/v2/country/WLD/indicator/" + INDICATOR + "?format=json&per_page=200&date=1960:2024";
const res = await fetch(url); if (!res.ok) { console.error("HTTP " + res.status); process.exit(1); }
const json = await res.json();
if (!Array.isArray(json) || json.length < 2) { console.error("no rows"); process.exit(1); }
const rows = (json[1] || []).filter(r => r.value != null).map(r => ({ year: parseInt(r.date, 10), value: Number(r.value) / 1e9 })).sort((a, b) => a.year - b.year);
if (rows.length < 5) { console.error("only " + rows.length); process.exit(1); }
const lines = [];
lines.push("// World GDP by year - source: World Bank " + INDICATOR + " (WLD aggregate)");
lines.push("// Metric: world GDP, current US$, in billions.");
lines.push("// Generated: " + new Date().toISOString().slice(0, 10));
lines.push("");
lines.push("export const WORLD_GDP_BY_YEAR = [");
for (const r of rows) lines.push("  { year: " + r.year + ", value: " + r.value + " },");
lines.push("];");
lines.push("");
lines.push("export function getGdpForYear(year) {");
lines.push("  const y = parseInt(year, 10);");
lines.push("  if (!Number.isFinite(y)) return null;");
lines.push("  return WORLD_GDP_BY_YEAR.find(r => r.year === y) || null;");
lines.push("}");
writeFileSync(join(root, "src/data/worldGdpByYear.js"), lines.join("\n") + "\n", "utf8");
console.log("GDP: " + rows.length + " years (" + rows[0].year + "-" + rows[rows.length-1].year + "), latest $" + (rows[rows.length-1].value/1000).toFixed(2) + "T");
