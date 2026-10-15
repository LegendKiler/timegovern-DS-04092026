import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const co2Mod = await import(pathToFileURL(join(root, "src/data/countryCo2.js")).href);
const energyMod = await import(pathToFileURL(join(root, "src/data/countryEnergy.js")).href);

function getList(mod) {
  let best = [];
  for (const k of Object.keys(mod)) {
    const v = mod[k];
    if (Array.isArray(v) && v.length > best.length) best = v;
  }
  return best;
}

function regen(xmlPath, list, prefix) {
  const xml = readFileSync(xmlPath, "utf8");
  const openIdx = xml.indexOf("<url>");
  const closeIdx = xml.lastIndexOf("</urlset>");
  if (openIdx === -1) { console.log("SKIP: " + xmlPath); return; }
  const head = xml.slice(0, openIdx);
  const tail = xml.slice(closeIdx);
  const sampleLoc = xml.match(/<loc>([^<]+)<\/loc>/);
  const origin = new URL(sampleLoc[1]).origin;
  const lines = ["  <url><loc>" + origin + prefix + "</loc></url>"];
  for (const c of list) {
    lines.push("  <url><loc>" + origin + prefix + "/" + c.code.toLowerCase() + "</loc></url>");
  }
  writeFileSync(xmlPath, head + lines.join("\n") + "\n" + tail, "utf8");
  console.log(xmlPath.replace(/.*[\\\/]/, "") + ": " + (list.length + 1) + " URLs  (" + origin + prefix + ")");
}

regen(join(root, "public/sitemap-co2.xml"), getList(co2Mod), "/co2-emissions");
regen(join(root, "public/sitemap-energy.xml"), getList(energyMod), "/energy");
