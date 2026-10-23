import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const origin = "https://timegovern.com";

async function writeList(xmlName, items, hubPath) {
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
  lines.push("  <url><loc>" + origin + hubPath + "</loc></url>");
  for (const it of items) lines.push("  <url><loc>" + origin + hubPath + "/" + it + "</loc></url>");
  lines.push("</urlset>");
  writeFileSync(join(root, "public/" + xmlName), lines.join("\n") + "\n", "utf8");
  console.log(xmlName + ": " + (items.length + 1) + " URLs");
}

async function writeYear(xmlName, dataFile, exportName, hubPath) {
  const mod = await import(pathToFileURL(join(root, dataFile)).href);
  const list = mod[exportName];
  await writeList(xmlName, list.map(r => String(r.year)), hubPath);
}

async function writeCountry(xmlName, dataFile, exportName, hubPath) {
  const mod = await import(pathToFileURL(join(root, dataFile)).href);
  const list = mod[exportName];
  await writeList(xmlName, list.map(c => c.code.toLowerCase()), hubPath);
}

await writeCountry("sitemap-gdp.xml", "src/data/countryGdp.js", "COUNTRY_GDP", "/gdp");
await writeCountry("sitemap-life-expectancy.xml", "src/data/countryLifeExpectancy.js", "COUNTRY_LIFE_EXPECTANCY", "/life-expectancy");
await writeYear("sitemap-gdp-by-year.xml", "src/data/worldGdpByYear.js", "WORLD_GDP_BY_YEAR", "/gdp-by-year");
await writeYear("sitemap-deaths-by-year.xml", "src/data/worldDeathsByYear.js", "WORLD_DEATHS_BY_YEAR", "/deaths-by-year");
await writeYear("sitemap-life-expectancy-by-year.xml", "src/data/worldLifeExpectancyByYear.js", "WORLD_LIFE_EXPECTANCY_BY_YEAR", "/life-expectancy-by-year");
await writeYear("sitemap-forest-by-year.xml", "src/data/worldForestByYear.js", "WORLD_FOREST_BY_YEAR", "/forest-by-year");
await writeYear("sitemap-renewable-by-year.xml", "src/data/worldRenewableByYear.js", "WORLD_RENEWABLE_BY_YEAR", "/renewable-energy-by-year");
