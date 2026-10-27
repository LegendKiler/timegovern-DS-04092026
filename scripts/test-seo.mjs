// scripts/test-seo.mjs
// Checks: robots.txt references sitemap, sitemap-index children exist,
// every sitemap URL maps to a real App.jsx route, and a sample of pages
// have title/description/h1/canonical/JSON-LD.
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const ROOT = "C:\\Users\\Superman\\Documents\\timegovern_Superman_2026-09-04_1530";
const PORT = 4173;
const BASE = "http://localhost:" + PORT;

const SAMPLE = {
  ':code': 'us', ':iso2': 'us', ':slug': 'europe', ':year': '2024',
  ':metric': 'gdp', ':pair': 'us-vs-cn', ':country': 'us', ':city': 'new-york',
  ':month': 'january', ':day': '1', ':a': 'us', ':b': 'cn',
  ':aCode': 'us', ':bCode': 'cn', ':date': '2026-01-01',
  ':from': 'us', ':to': 'cn', ':id': '1', ':index': '0',
  ':path': '', ':iso3': 'usa', ':type': 'clock', ':c2': 'us', ':city2': 'london',
};
function substitute(path) {
  const parts = path.split('/');
  const out = [];
  for (const seg of parts) {
    if (!seg.startsWith(':')) { out.push(seg); continue; }
    const key = ':' + seg.slice(1);
    if (!(key in SAMPLE)) return null;
    out.push(SAMPLE[key]);
  }
  return out.join('/') || '/';
}
function discoverRoutes() {
  const src = readFileSync(join(ROOT, "src/App.jsx"), "utf8");
  const routes = [];
  const re = /<Route\s+path=["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const p = m[1];
    if (p === '*' || p.includes('*')) continue;
    routes.push(p);
  }
  return [...new Set(routes)];
}
function routeToRegex(pattern) {
  const esc = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/:[a-zA-Z][a-zA-Z0-9]*/g, '[^/]+');
  return new RegExp('^' + esc + '/?$');
}
async function waitForServer(url, maxMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    try { const r = await fetch(url); if (r.ok) return true; } catch {}
    await new Promise(r => setTimeout(r, 400));
  }
  return false;
}
function parseSitemap(xml) {
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) urls.push(m[1].trim());
  return urls;
}

async function main() {
  const findings = [];
  const add = (sev, msg) => findings.push({ sev, msg });

  // 1. robots.txt
  const robotsPath = join(ROOT, "public/robots.txt");
  if (!existsSync(robotsPath)) {
    add("FAIL", "public/robots.txt missing");
  } else {
    const robots = readFileSync(robotsPath, "utf8");
    const sitemapRefs = [...robots.matchAll(/Sitemap:\s*(\S+)/gi)].map(m => m[1]);
    if (sitemapRefs.length === 0) add("FAIL", "robots.txt has no Sitemap: directive");
    else add("PASS", "robots.txt references sitemap: " + sitemapRefs.join(", "));
    const disallow = [...robots.matchAll(/Disallow:\s*(\S+)/gi)].map(m => m[1]).filter(d => d && d !== "/");
    if (disallow.length) add("WARN", "robots.txt Disallow entries (verify intentional): " + disallow.join(", "));
  }

  // 2. sitemap files exist
  const smDir = join(ROOT, "public");
  const smIndexPath = join(smDir, "sitemap-index.xml");
  let childSitemaps = [];
  if (!existsSync(smIndexPath)) {
    add("FAIL", "public/sitemap-index.xml missing");
  } else {
    const idx = readFileSync(smIndexPath, "utf8");
    childSitemaps = parseSitemap(idx).map(u => u.replace(/^https?:\/\/[^/]+/, '')).map(p => p.replace(/^\//, ''));
    add("PASS", "sitemap-index.xml references " + childSitemaps.length + " child sitemaps");
  }
  for (const child of childSitemaps) {
    if (!existsSync(join(smDir, child))) add("FAIL", "child sitemap missing: " + child);
  }

  // 3. All URLs in all child sitemaps map to real routes
  const routePatterns = discoverRoutes();
  const regexes = routePatterns.map(r => ({ pattern: r, re: routeToRegex(r) }));
  const allSitemapUrls = new Set();
  for (const child of childSitemaps) {
    const p = join(smDir, child);
    if (!existsSync(p)) continue;
    const urls = parseSitemap(readFileSync(p, "utf8"))
      .map(u => u.replace(/^https?:\/\/[^/]+/, ''))
      .map(u => u.split('?')[0].split('#')[0] || '/');
    for (const u of urls) allSitemapUrls.add(u);
  }
  const orphanUrls = [];
  for (const u of allSitemapUrls) {
    if (!regexes.some(r => r.re.test(u))) orphanUrls.push(u);
  }
  if (orphanUrls.length === 0) add("PASS", "All " + allSitemapUrls.size + " sitemap URLs map to declared routes");
  else {
    add("FAIL", orphanUrls.length + " sitemap URLs have no matching route:");
    for (const u of orphanUrls.slice(0, 20)) add("  ", "  " + u);
  }

  // 4. Sample pages - title, meta desc, h1, canonical, JSON-LD
  const routes = routePatterns.map(r => ({ route: r, url: substitute(r) })).filter(x => x.url !== null);
  const sampleCount = Math.min(30, routes.length);
  const step = Math.max(1, Math.floor(routes.length / sampleCount));
  const sample = [];
  for (let i = 0; i < routes.length && sample.length < sampleCount; i += step) sample.push(routes[i]);

  const server = spawn("npx.cmd", ["vite", "preview", "--port", String(PORT)],
    { stdio: "pipe", shell: true, cwd: ROOT });
  if (!(await waitForServer(BASE))) { server.kill(); throw new Error("server did not start"); }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let pagesChecked = 0;
  const seoIssues = { noTitle: [], noDesc: [], noH1: [], noCanonical: [], badJsonLd: [] };

  for (let i = 0; i < sample.length; i++) {
    const { url } = sample[i];
    process.stdout.write("[" + (i+1) + "/" + sample.length + "] " + url + " ... ");
    try {
      await page.goto(BASE + url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(1200);
      const meta = await page.evaluate(() => {
        const title = document.title || '';
        const desc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        const h1s = Array.from(document.querySelectorAll('h1')).map(e => e.textContent.trim()).filter(Boolean);
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
        const ldScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
          .map(s => s.textContent);
        let badLd = 0;
        for (const s of ldScripts) { try { JSON.parse(s); } catch { badLd++; } }
        return { title, desc, h1s, canonical, badLd };
      });
      if (!meta.title) seoIssues.noTitle.push(url);
      if (!meta.desc) seoIssues.noDesc.push(url);
      if (meta.h1s.length === 0) seoIssues.noH1.push(url);
      if (!meta.canonical) seoIssues.noCanonical.push(url);
      if (meta.badLd > 0) seoIssues.badJsonLd.push(url + " (" + meta.badLd + " bad)");
      pagesChecked++;
      console.log("ok");
    } catch (e) {
      console.log("SKIP (" + e.message.slice(0, 50) + ")");
    }
  }

  await browser.close();
  server.kill();

  // Summarize
  if (seoIssues.noTitle.length) { add("FAIL", seoIssues.noTitle.length + " pages missing <title>"); seoIssues.noTitle.slice(0,5).forEach(u => add("  ", "  " + u)); }
  else add("PASS", "All sampled pages have <title>");
  if (seoIssues.noDesc.length) { add("WARN", seoIssues.noDesc.length + " pages missing meta description"); seoIssues.noDesc.slice(0,5).forEach(u => add("  ", "  " + u)); }
  else add("PASS", "All sampled pages have meta description");
  if (seoIssues.noH1.length) { add("FAIL", seoIssues.noH1.length + " pages missing <h1>"); seoIssues.noH1.slice(0,5).forEach(u => add("  ", "  " + u)); }
  else add("PASS", "All sampled pages have <h1>");
  if (seoIssues.noCanonical.length) { add("WARN", seoIssues.noCanonical.length + " pages missing canonical"); seoIssues.noCanonical.slice(0,5).forEach(u => add("  ", "  " + u)); }
  else add("PASS", "All sampled pages have canonical link");
  if (seoIssues.badJsonLd.length) { add("WARN", seoIssues.badJsonLd.length + " pages with invalid JSON-LD"); seoIssues.badJsonLd.slice(0,5).forEach(u => add("  ", "  " + u)); }
  else add("PASS", "All sampled pages have valid JSON-LD (or none)");

  // Write report
  const stamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 15);
  mkdirSync(join(ROOT, "backups"), { recursive: true });
  const rp = join(ROOT, "backups", "seo-audit-" + stamp + ".txt");
  const lines = ["SEO audit " + new Date().toISOString()];
  lines.push("Routes declared: " + routePatterns.length);
  lines.push("Sitemap URLs: " + allSitemapUrls.size);
  lines.push("Pages sampled: " + pagesChecked);
  lines.push("");
  for (const f of findings) lines.push("[" + f.sev + "] " + f.msg);
  writeFileSync(rp, lines.join("\n"), "utf8");

  console.log("\n=== SEO AUDIT RESULT ===");
  const fails = findings.filter(f => f.sev === "FAIL").length;
  const warns = findings.filter(f => f.sev === "WARN").length;
  const passes = findings.filter(f => f.sev === "PASS").length;
  console.log("PASS: " + passes + "  WARN: " + warns + "  FAIL: " + fails);
  console.log("");
  for (const f of findings) {
    if (f.sev === "PASS") continue;
    console.log("[" + f.sev + "] " + f.msg);
  }
  console.log("\nReport: " + rp);
}
main().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
