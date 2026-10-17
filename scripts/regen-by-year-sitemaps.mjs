import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const origin = "https://timegovern.com";

async function regen(modPath, exportName, hubPath, xmlName) {
  const mod = await import(pathToFileURL(join(root, modPath)).href);
  const list = mod[exportName];
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
  lines.push("  <url><loc>" + origin + hubPath + "</loc></url>");
  for (const r of list) lines.push("  <url><loc>" + origin + hubPath + "/" + r.year + "</loc></url>");
  lines.push("</urlset>");
  writeFileSync(join(root, "public/" + xmlName), lines.join("\n") + "\n", "utf8");
  console.log(xmlName + ": " + (list.length + 1) + " URLs");
}
await regen("src/data/worldPopulationByYear.js", "WORLD_POPULATION_BY_YEAR", "/world-population-by-year", "sitemap-world-population-by-year.xml");
await regen("src/data/worldCo2ByYear.js", "WORLD_CO2_BY_YEAR", "/co2-by-year", "sitemap-co2-by-year.xml");
await regen("src/data/worldBirthsByYear.js", "WORLD_BIRTHS_BY_YEAR", "/births-by-year", "sitemap-births-by-year.xml");
