// scripts/test-links.mjs
// Link / feature-connectivity audit.
// 1. Every declared route renders (non-empty body).
// 2. Every internal a[href] on every sampled page resolves to a declared route.
// 3. "Related tools / see also / you might also" containers specifically checked.
// 4. Dead hrefs (#, empty, javascript:) flagged.
// 5. External links counted, not fetched.
// Report -> backups/links-audit-<stamp>.txt
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const ROOT = "C:\\Users\\Superman\\Documents\\timegovern_Superman_2026-09-04_1530";
const PORT = 4174;
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
// Digit-safe param matching (the :c2 fix from test-seo.mjs)
function routeToRegex(pattern) {
  const esc = pattern
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/:[a-zA-Z][a-zA-Z0-9]*/g, '[^/]+');
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

async function main() {
  const findings = [];
  const add = (sev, msg) => findings.push({ sev, msg });

  const routePatterns = discoverRoutes();
  const regexes = routePatterns.map(r => ({ pattern: r, re: routeToRegex(r) }));
  const isDeclared = (path) => {
    const clean = path.split('?')[0].split('#')[0] || '/';
    return regexes.some(r => r.re.test(clean));
  };

  // Sample routes: all of them if <= 40, else evenly spaced sample of 40
  const concrete = routePatterns
    .map(r => ({ route: r, url: substitute(r) }))
    .filter(x => x.url !== null);
  let sample = concrete;
  if (concrete.length > 40) {
    const step = Math.floor(concrete.length / 40);
    sample = concrete.filter((_, i) => i % step === 0).slice(0, 40);
  }
  add("PASS", "Routes declared: " + routePatterns.length + " (sampling " + sample.length + ")");

  const server = spawn("npx.cmd", ["vite", "preview", "--port", String(PORT)],
    { stdio: "pipe", shell: true, cwd: ROOT });
  if (!(await waitForServer(BASE))) { server.kill(); throw new Error("server did not start"); }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const brokenLinks = [];      // internal href with no matching route
  const relatedBroken = [];    // broken links inside "related" containers
  const deadHrefs = [];        // #, empty, javascript:
  const renderFails = [];      // page did not render
  let internalLinksChecked = 0;
  let externalLinksSeen = 0;

  for (let i = 0; i < sample.length; i++) {
    const { url } = sample[i];
    process.stdout.write("[" + (i+1) + "/" + sample.length + "] " + url + " ... ");
    try {
      const resp = await page.goto(BASE + url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(1000);
      const status = resp ? resp.status() : 0;
      const bodyLen = (await page.locator('body').innerText().catch(() => "")).length;
      if (status >= 400 || bodyLen < 40) {
        renderFails.push(url + " (status " + status + ", bodyLen " + bodyLen + ")");
        console.log("RENDER-FAIL");
        continue;
      }

      const links = await page.evaluate(() => {
        const out = [];
        for (const a of document.querySelectorAll('a[href]')) {
          const href = a.getAttribute('href') || '';
          const text = (a.textContent || '').trim().slice(0, 60);
          // Is this link inside a "related / see also / you might also" container?
          let inRelated = false;
          let el = a;
          for (let d = 0; d < 6 && el; d++) {
            const cls = (el.className && typeof el.className === 'string') ? el.className : '';
            const id = el.id || '';
            if (/related|see-also|see also|you-might|you might|more-tools|more tools|similar/i.test(cls + ' ' + id)) { inRelated = true; break; }
            el = el.parentElement;
          }
          out.push({ href, text, inRelated });
        }
        return out;
      });

      for (const l of links) {
        const h = l.href.trim();
        if (!h || h === '#' || h.startsWith('javascript:')) { deadHrefs.push(url + " -> " + (h || '(empty)') + " [" + l.text + "]"); continue; }
        if (/^https?:\/\//i.test(h) || h.startsWith('mailto:') || h.startsWith('tel:')) { externalLinksSeen++; continue; }
        if (h.startsWith('/')) {
          internalLinksChecked++;
          if (!isDeclared(h)) {
            brokenLinks.push(url + " -> " + h + " [" + l.text + "]");
            if (l.inRelated) relatedBroken.push(url + " -> " + h + " [" + l.text + "]");
          }
        }
      }
      console.log("ok (" + links.length + " links)");
    } catch (e) {
      renderFails.push(url + " (exception: " + e.message.slice(0, 60) + ")");
      console.log("EXCEPTION");
    }
  }

  await browser.close();
  server.kill();

  if (renderFails.length) { add("FAIL", renderFails.length + " sampled routes did not render"); renderFails.slice(0, 15).forEach(x => add("  ", "  " + x)); }
  else add("PASS", "All " + sample.length + " sampled routes rendered");

  if (brokenLinks.length) {
    add("FAIL", brokenLinks.length + " internal links point at no declared route");
    brokenLinks.slice(0, 25).forEach(x => add("  ", "  " + x));
  } else add("PASS", "All " + internalLinksChecked + " internal links resolve to declared routes");

  if (relatedBroken.length) {
    add("WARN", relatedBroken.length + " broken links inside 'related tools' sections");
    relatedBroken.slice(0, 15).forEach(x => add("  ", "  " + x));
  } else add("PASS", "No broken links in 'related tools' sections");

  if (deadHrefs.length) {
    add("WARN", deadHrefs.length + " dead hrefs (#, empty, javascript:)");
    deadHrefs.slice(0, 10).forEach(x => add("  ", "  " + x));
  } else add("PASS", "No dead hrefs");

  add("PASS", "External links seen (not fetched): " + externalLinksSeen);

  const stamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 15);
  mkdirSync(join(ROOT, "backups"), { recursive: true });
  const rp = join(ROOT, "backups", "links-audit-" + stamp + ".txt");
  const lines = ["Links audit " + new Date().toISOString()];
  lines.push("Routes declared: " + routePatterns.length + ", sampled: " + sample.length);
  lines.push("Internal links checked: " + internalLinksChecked + ", external: " + externalLinksSeen);
  lines.push("");
  for (const f of findings) lines.push("[" + f.sev + "] " + f.msg);
  writeFileSync(rp, lines.join("\n"), "utf8");

  console.log("\n=== LINKS AUDIT RESULT ===");
  const fails = findings.filter(f => f.sev === "FAIL").length;
  const warns = findings.filter(f => f.sev === "WARN").length;
  const passes = findings.filter(f => f.sev === "PASS").length;
  console.log("PASS: " + passes + "  WARN: " + warns + "  FAIL: " + fails);
  console.log("");
  for (const f of findings) { if (f.sev !== "PASS") console.log("[" + f.sev + "] " + f.msg); }
  console.log("\nReport: " + rp);
}
main().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
