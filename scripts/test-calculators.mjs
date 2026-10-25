import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const ROOT = "C:\\Users\\Superman\\Documents\\timegovern_Superman_2026-09-04_1530";
const PORT = 4173;
const BASE = "http://localhost:" + PORT;

async function waitForServer(url, maxMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    try { const r = await fetch(url); if (r.ok) return true; } catch {}
    await new Promise(r => setTimeout(r, 400));
  }
  return false;
}

async function main() {
  const server = spawn("npx.cmd", ["vite", "preview", "--port", String(PORT)],
    { stdio: "pipe", shell: true, cwd: ROOT });
  if (!(await waitForServer(BASE))) { server.kill(); throw new Error("server did not start"); }
  console.log("Server ready\n");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const failures = [];
  let passed = 0;

  async function tc(name, run) {
    try { await run(); console.log("  PASS " + name); passed++; }
    catch (e) { console.log("  FAIL " + name + " :: " + e.message.slice(0, 200)); failures.push({ name, reason: e.message.slice(0, 200) }); }
  }

  await tc("bmi 70kg/175cm = 22.9", async () => {
    await page.goto(BASE + "/bmi-calculator", { waitUntil: 'networkidle' });
    const inputs = page.locator('input[type="number"]');
    await inputs.nth(0).fill("70");
    await inputs.nth(1).fill("175");
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/22\.9/.test(body)) throw new Error("BMI 22.9 not found");
  });

  await tc("percentage 15% of 200 = 30.00", async () => {
    await page.goto(BASE + "/percentage-calculator", { waitUntil: 'networkidle' });
    const inputs = page.locator('input[type="number"]');
    await inputs.nth(0).fill("15");
    await inputs.nth(1).fill("200");
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/30\.00/.test(body)) throw new Error("30.00 not found");
  });

  await tc("tip $100 @ 20% / 2ppl", async () => {
    await page.goto(BASE + "/tip-calculator", { waitUntil: 'networkidle' });
    const inputs = page.locator('input[type="number"]');
    await inputs.nth(0).fill("100");
    await inputs.nth(1).fill("2");
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\$20\.00/.test(body)) throw new Error("tip $20.00 missing");
    if (!/\$120\.00/.test(body)) throw new Error("total $120.00 missing");
    if (!/\$60\.00/.test(body)) throw new Error("per person $60.00 missing");
  });

  await tc("age 2000-01-01 ~ 26 years", async () => {
    await page.goto(BASE + "/age-calculator", { waitUntil: 'networkidle' });
    await page.locator('input[type="date"]').fill("2000-01-01");
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\b2[56]\b/.test(body)) throw new Error("age 25 or 26 missing");
  });

  await tc("calorie male 30/75/175 mod", async () => {
    await page.goto(BASE + "/calorie-calculator", { waitUntil: 'networkidle' });
    const inputs = page.locator('input[type="number"]');
    await inputs.nth(0).fill("30");
    await inputs.nth(1).fill("75");
    await inputs.nth(2).fill("175");
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/16[89]\d/.test(body)) throw new Error("BMR 169x missing");
    if (!/26[23]\d/.test(body)) throw new Error("TDEE 26[23]x missing");
  });

  await tc("tdee male 30/70/175 mod -> 2555", async () => {
    await page.goto(BASE + "/tdee-calculator", { waitUntil: 'networkidle' });
    const inputs = page.locator('input[type="number"]');
    await inputs.nth(0).fill("30");
    await inputs.nth(1).fill("70");
    await inputs.nth(2).fill("175");
    await page.locator('button:has-text("Calculate TDEE")').click();
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/2[56]\d\d/.test(body)) throw new Error("TDEE 25xx/26xx missing");
  });

  await tc("loan 250k 6.5% 30yr ~ 1580.17", async () => {
    await page.goto(BASE + "/loan-calculator", { waitUntil: 'networkidle' });
    const inputs = page.locator('input[type="number"]');
    await inputs.nth(0).fill("250000");
    await inputs.nth(1).fill("6.5");
    await inputs.nth(2).fill("30");
    await inputs.nth(3).fill("0");
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\$1,58\d\.\d\d/.test(body)) throw new Error("monthly $1580.xx missing");
    if (!/\$31[89],\d\d\d/.test(body)) throw new Error("total interest ~$318k missing");
  });

  await tc("compound 10k+500/mo 7% 20y", async () => {
    await page.goto(BASE + "/compound-interest-calculator", { waitUntil: 'networkidle' });
    const inputs = page.locator('input[type="number"]');
    await inputs.nth(0).fill("10000");
    await inputs.nth(1).fill("500");
    await inputs.nth(2).fill("7");
    await inputs.nth(3).fill("20");
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\$130,000/.test(body)) throw new Error("contributions $130,000 missing");
    if (!/\$3[0-9][0-9],[0-9]\d\d/.test(body)) throw new Error("final balance $3xx,xxx missing");
  });

  await tc("days 2024-01-01 to 2024-12-31 = 365", async () => {
    await page.goto(BASE + "/days-between-dates", { waitUntil: 'networkidle' });
    const dates = page.locator('input[type="date"]');
    await dates.nth(0).fill("2024-01-01");
    await dates.nth(1).fill("2024-12-31");
    await page.locator('button:has-text("Calculate")').click();
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\b365\b/.test(body)) throw new Error("365 missing");
  });

  await browser.close();
  server.kill();

  const stamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 15);
  mkdirSync(join(ROOT, "backups"), { recursive: true });
  const rp = join(ROOT, "backups", "calc-tests-" + stamp + ".txt");
  const lines = ["Calculator tests " + new Date().toISOString(), "PASS: " + passed + "  FAIL: " + failures.length, ""];
  if (failures.length > 0) {
    lines.push("=== FAILURES ===");
    for (const f of failures) lines.push("  " + f.name + "\n    -> " + f.reason);
  }
  writeFileSync(rp, lines.join("\n"), "utf8");

  console.log("\n=== RESULT: " + passed + " passed, " + failures.length + " failed ===");
  if (failures.length > 0) {
    console.log("\n--- Failures ---");
    for (const f of failures) console.log("  " + f.name + "\n    -> " + f.reason);
  }
  console.log("\nReport: " + rp);
  if (failures.length > 0) process.exit(1);
}

main().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
