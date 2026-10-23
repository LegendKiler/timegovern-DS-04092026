// scripts/crawl-all-routes.mjs
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
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
    if (p.endsWith('.pdf') || p.endsWith('.xml') || p.endsWith('.txt')) continue;
    routes.push(p);
  }
  return [...new Set(routes)];
}

async function waitForServer(url, maxMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    try { const r = await fetch(url); if (r.ok) return true; } catch {}
    await new Promise(r => setTimeout(r, 500));
  }
  return false;
}

// Only consider errors from OUR origin or generic pageerrors
function isOurOrigin(url) {
  try { return new URL(url).origin === BASE; } catch { return false; }
}
const IGNORE_HOSTS = ['ipapi.co','open-meteo.com','restcountries.com','exchangerate.host','ipify.org','nominatim.','worldtimeapi.org','mapbox.com','openstreetmap.org','unpkg.com','cdn.','fonts.g','googletag','doubleclick'];

async function main() {
  console.log("=== Discovering routes ===");
  const routes = discoverRoutes();
  console.log("Found " + routes.length + " routes");

  const cases = [];
  const skipped = [];
  for (const r of routes) {
    const url = substitute(r);
    if (url === null) { skipped.push(r); continue; }
    cases.push({ route: r, url });
  }
  console.log("Testable: " + cases.length + "  Skipped: " + skipped.length);

  const server = spawn("npx.cmd", ["vite", "preview", "--port", String(PORT)],
    { stdio: "pipe", shell: true, cwd: ROOT });
  if (!(await waitForServer(BASE))) { server.kill(); throw new Error("server did not start"); }
  console.log("Server ready\n");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Track failed requests with URLs
  let failedRequests = [];
  let pageErrors = [];
  let badResponses = [];
  page.on('requestfailed', req => {
    const url = req.url();
    const reason = req.failure()?.errorText || 'unknown';
    failedRequests.push({ url, reason });
  });
  page.on('response', resp => {
    if (resp.status() >= 400) badResponses.push({ url: resp.url(), status: resp.status() });
  });
  page.on('pageerror', err => pageErrors.push(err.message));

  function resetTrackers() {
    failedRequests = [];
    pageErrors = [];
    badResponses = [];
  }

  function classifyIssue(list) {
    // Filter: our-origin failures + non-ignored status errors
    const ourFailures = list.failedRequests.filter(f => isOurOrigin(f.url));
    const ourBad = list.badResponses.filter(b => isOurOrigin(b.url) && !b.url.includes('/api/'));
    const realPageErrs = list.pageErrors.filter(e => {
      if (!e) return false;
      // Skip noise that isn't a real crash
      if (e.includes('ResizeObserver')) return false;
      if (e.includes('Download the React DevTools')) return false;
      return true;
    });
    return { ourFailures, ourBad, realPageErrs };
  }

  const results = { pass: [], fail: [] };

  for (let i = 0; i < cases.length; i++) {
    const { url } = cases[i];
    resetTrackers();

    try {
      await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 25000 });
      await page.waitForTimeout(1500);

      const body = await page.innerText('body').catch(() => '');
      const h1 = await page.$('h1');
      const h1Text = h1 ? (await h1.innerText().catch(() => '')).trim() : '';

      const { ourFailures, ourBad, realPageErrs } = classifyIssue({ failedRequests, badResponses, pageErrors });
      const stuck = /(Loading\.\.\.|Updating\.\.\.)/.test(body) && body.length < 5000;
      const blank = body.trim().length < 100;

      const reasons = [];
      if (realPageErrs.length > 0) reasons.push('JS crash: ' + realPageErrs[0].slice(0, 100));
      if (ourFailures.length > 0) reasons.push('asset fail: ' + ourFailures[0].url + ' (' + ourFailures[0].reason + ')');
      if (ourBad.length > 0) reasons.push('HTTP ' + ourBad[0].status + ' on ' + ourBad[0].url);
      if (!h1Text) reasons.push('no h1');
      if (stuck) reasons.push('stuck loading');
      if (blank) reasons.push('blank body');

      if (reasons.length > 0) {
        console.log("[" + (i + 1) + "/" + cases.length + "] FAIL " + url + " :: " + reasons[0]);
        results.fail.push({ url, reasons });
      } else {
        console.log("[" + (i + 1) + "/" + cases.length + "] PASS " + url);
        results.pass.push(url);
      }
    } catch (e) {
      console.log("[" + (i + 1) + "/" + cases.length + "] FAIL " + url + " :: " + e.message.slice(0, 100));
      results.fail.push({ url, reasons: ['timeout/crash: ' + e.message.slice(0, 100)] });
    }
  }

  await browser.close();
  server.kill();

  const stamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 15);
  mkdirSync(join(ROOT, "backups"), { recursive: true });
  const reportPath = join(ROOT, "backups", "route-crawl-" + stamp + ".txt");

  const lines = [];
  lines.push("Route crawl " + new Date().toISOString());
  lines.push("Total routes: " + routes.length);
  lines.push("Tested: " + cases.length + "  Skipped: " + skipped.length);
  lines.push("PASS: " + results.pass.length + "  FAIL: " + results.fail.length);
  lines.push("");
  lines.push("=== FAILURES ===");
  for (const f of results.fail) {
    lines.push("  " + f.url);
    for (const r of f.reasons) lines.push("      - " + r);
  }
  lines.push("");
  lines.push("=== SKIPPED ===");
  for (const s of skipped) lines.push("  " + s);

  writeFileSync(reportPath, lines.join("\n"), "utf8");

  console.log("\n\n=== RESULT ===");
  console.log("PASS: " + results.pass.length);
  console.log("FAIL: " + results.fail.length);
  console.log("SKIPPED: " + skipped.length);
  console.log("");
  if (results.fail.length > 0) {
    console.log("--- Real failures ---");
    for (const f of results.fail) {
      console.log("\n" + f.url);
      for (const r of f.reasons) console.log("  - " + r);
    }
  } else {
    console.log("All routes render cleanly.");
  }
  console.log("\nReport: " + reportPath);
}

main().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
