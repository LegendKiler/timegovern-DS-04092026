// scripts/test-spa.mjs
// Headless browser test suite for TimeGovern SPA.
// Runs `vite preview` on port 4173, drives Chromium, checks page content
// AND navigation behavior (URL + h1 + numeric value must all change).
// Exit code 0 = all pass, 1 = failures.

import { spawn } from "node:child_process";
import { chromium } from "playwright";

const PORT = 4173;
const BASE = "http://localhost:" + PORT;
const server = spawn("npx.cmd", ["vite", "preview", "--port", String(PORT)], {
  stdio: "pipe",
  shell: true,
  cwd: process.cwd(),
});

let passed = 0, failed = 0;
const failures = [];
function pass(name) { console.log("  PASS " + name); passed++; }
function fail(name, reason) { console.log("  FAIL " + name + " :: " + reason); failures.push({ name, reason }); failed++; }

async function waitForServer(url, maxMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    try {
      const r = await fetch(url);
      if (r.ok) return true;
    } catch {}
    await new Promise(r => setTimeout(r, 400));
  }
  return false;
}

// Smoke: page loads, h1 appears, required text present
async function smoke(page, path, requires) {
  const name = "smoke " + path;
  try {
    const resp = await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 20000 });
    if (!resp || !resp.ok()) throw new Error("HTTP " + (resp ? resp.status() : "no response"));
    await page.waitForSelector("h1", { timeout: 10000 });
    const body = await page.innerText("body");
    for (const req of requires) {
      if (!body.includes(req)) throw new Error("missing text: " + JSON.stringify(req));
    }
    // Assert no stuck "Updating..." after networkidle + 1.5s grace
    await page.waitForTimeout(1500);
    const bodyAfter = await page.innerText("body");
    if (bodyAfter.includes("Updating...")) throw new Error("stuck 'Updating...' after load");
    pass(name);
  } catch (e) { fail(name, e.message); }
}

// Navigation: click a link, verify URL + h1 + numeric value ALL change
// Extracts the primary numeric value by looking for the biggest tabular-nums div
async function getHeroValue(page) {
  return await page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll("div"));
    const nums = candidates
      .map(el => {
        if (el.children.length > 0) return null;
        const t = (el.textContent || "").trim();
        if (/^[\$+\-]?[0-9]/.test(t) && t.length < 30) {
          const sz = parseFloat(getComputedStyle(el).fontSize) || 0;
          return { text: t, sz };
        }
        return null;
      })
      .filter(Boolean)
      .sort((a, b) => b.sz - a.sz);
    return nums.length ? nums[0].text : null;
  });
}

async function navTest(page, fromPath, clickSelector, expectUrlFragment, expectH1Contains) {
  const name = "nav " + fromPath + " -> " + expectUrlFragment;
  try {
    await page.goto(BASE + fromPath, { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForSelector("h1", { timeout: 10000 });
    await page.waitForTimeout(800);

    const oldH1 = (await page.textContent("h1")) || "";
    const oldVal = await getHeroValue(page);

    await page.click(clickSelector, { timeout: 5000 });
    await page.waitForURL("**" + expectUrlFragment + "*", { timeout: 10000 });

    await page.waitForFunction(
      (expected) => {
        const h = document.querySelector("h1");
        return h && h.textContent && h.textContent.includes(expected);
      },
      expectH1Contains,
      { timeout: 10000 }
    );

    // BUG DETECTOR: after h1 changes, wait up to 6s for value to also change
    if (oldVal) {
      await page.waitForFunction(
        (old) => {
          const candidates = Array.from(document.querySelectorAll("div"));
          const nums = candidates
            .map(el => {
              if (el.children.length > 0) return null;
              const t = (el.textContent || "").trim();
              if (/^[\$+\-]?[0-9]/.test(t) && t.length < 30) {
                const sz = parseFloat(getComputedStyle(el).fontSize) || 0;
                return { text: t, sz };
              }
              return null;
            })
            .filter(Boolean)
            .sort((a, b) => b.sz - a.sz);
          return nums.length > 0 && nums[0].text !== old;
        },
        oldVal,
        { timeout: 6000 }
      );
    }

    // Wait for 'Updating...' to settle (WB API latency varies)
    await page.waitForFunction(
      () => !document.body.innerText.includes("Updating..."),
      { timeout: 15000 }
    );

    pass(name + "  (" + oldVal + " -> " + (await getHeroValue(page)) + ")");
  } catch (e) { fail(name, e.message); }
}

async function main() {
  console.log("Waiting for preview server on " + BASE + " ...");
  if (!(await waitForServer(BASE))) { throw new Error("server did not start"); }
  console.log("Server ready.\n");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log("=== Smoke tests ===");
  await smoke(page, "/gdp", ["GDP", "United States"]);
  await smoke(page, "/gdp/us", ["United States", "GDP"]);
  await smoke(page, "/gdp/pk", ["Pakistan"]);
  await smoke(page, "/life-expectancy", ["Life Expectancy", "Monaco"]);
  await smoke(page, "/life-expectancy/uy", ["Uruguay"]);
  await smoke(page, "/life-expectancy/pe", ["Peru"]);
  await smoke(page, "/gdp-by-year", ["2024"]);
  await smoke(page, "/gdp-by-year/1960", ["1960"]);
  await smoke(page, "/deaths-by-year", ["World Deaths"]);
  await smoke(page, "/deaths-by-year/2020", ["2020"]);
  await smoke(page, "/life-expectancy-by-year", ["1960"]);
  await smoke(page, "/life-expectancy-by-year/1960", ["1960"]);
  await smoke(page, "/forest-by-year", ["Forest"]);
  await smoke(page, "/forest-by-year/2023", ["2023"]);
  await smoke(page, "/renewable-energy-by-year", ["Renewable"]);
  await smoke(page, "/water", ["Water"]);
  await smoke(page, "/water/in", ["India"]);
  await smoke(page, "/co2-emissions", ["CO2"]);
  await smoke(page, "/energy", ["Energy"]);
  await smoke(page, "/marriages-today", ["Marriages"]);
  await smoke(page, "/divorces-today", ["Divorces"]);
  await smoke(page, "/cars-produced-today", ["Cars"]);
  await smoke(page, "/flights-today", ["Flights"]);
  await smoke(page, "/suicides-today", ["Suicides"]);
  await smoke(page, "/cancer-deaths-today", ["Cancer"]);
  await smoke(page, "/diabetes-deaths-today", ["Diabetes"]);
  await smoke(page, "/plastic-bottles-produced-today", ["Plastic Bottles"]);
  await smoke(page, "/region", ["World Regions"]);
  await smoke(page, "/region/europe", ["Europe"]);
  await smoke(page, "/region/asia", ["Asia"]);
  await smoke(page, "/compare", ["Compare Countries"]);
  await smoke(page, "/compare/gdp", ["GDP"]);
  await smoke(page, "/compare/gdp/us-vs-cn", ["United States vs China"]);

  console.log("\n=== Navigation tests (the reported bug class) ===");
  // Reported bug: life-expectancy uy -> click Peru -> value must change
  await navTest(page, "/life-expectancy/uy", 'a[href="/life-expectancy/pe"]', "/life-expectancy/pe", "Peru");
  // Same class on other country pages
  await navTest(page, "/gdp/us", 'a[href="/gdp/ca"]', "/gdp/ca", "Canada");
  await navTest(page, "/water/in", 'a[href="/water/cn"]', "/water/cn", "China");
  await navTest(page, "/co2-emissions/cn", 'a[href="/co2-emissions/in"]', "/co2-emissions/in", "India");
  await navTest(page, "/energy/cn", 'a[href="/energy/in"]', "/energy/in", "India");

  await browser.close();

  console.log("\n=== RESULT: " + passed + " passed, " + failed + " failed ===");
  if (failed > 0) {
    console.log("\nFailures:");
    for (const f of failures) console.log("  - " + f.name + " :: " + f.reason);
    process.exit(1);
  }
}

main().catch(async (e) => {
  console.error("FATAL:", e.message);
  try { server.kill(); } catch {}
  process.exit(1);
}).finally(() => {
  try { server.kill(); } catch {}
  setTimeout(() => process.exit(0), 500);
});
