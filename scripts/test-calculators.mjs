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

  // ============ TIER B ============
  // 10. Sales tax: $100 @ 7.25% add = total 107.25, tax 7.25
  await tc("sales tax 100 @ 7.25% add", async () => {
    await page.goto(BASE + "/sales-tax-calculator", { waitUntil: 'networkidle' });
    const inputs = page.locator('input[type="number"]');
    await inputs.nth(0).fill("100");
    await inputs.nth(1).fill("7.25");
    await page.locator('button:has-text("Calculate")').click();
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/107\.25/.test(body)) throw new Error("total 107.25 missing");
    if (!/7\.25/.test(body)) throw new Error("tax 7.25 missing");
  });

  // 11. Discount: $100 @ 20% = 80, save 20, effective 20%
  await tc("discount $100 @ 20%", async () => {
    await page.goto(BASE + "/discount-calculator", { waitUntil: 'networkidle' });
    const inputs = page.locator('input[type="number"]');
    await inputs.nth(0).fill("100");
    await inputs.nth(1).fill("20");
    await page.locator('button:has-text("Calculate")').click();
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/80\.00/.test(body)) throw new Error("final 80.00 missing");
    if (!/20\.00/.test(body)) throw new Error("savings 20.00 missing");
  });

  // 12. ROI: 10k -> 15k = +50%
  await tc("roi 10k -> 15k = 50%", async () => {
    await page.goto(BASE + "/roi-calculator", { waitUntil: 'networkidle' });
    const inputs = page.locator('input[type="number"]');
    await inputs.nth(0).fill("10000");
    await inputs.nth(1).fill("15000");
    await page.locator('button:has-text("Calculate ROI")').click();
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\+?50\.00%/.test(body)) throw new Error("+50.00% missing");
  });

  // 13. Simple interest: 10k @ 5% for 3yr = 1500 interest, 11500 total
  await tc("simple interest 10k 5% 3yr", async () => {
    await page.goto(BASE + "/simple-interest-calculator", { waitUntil: 'networkidle' });
    const inputs = page.locator('input[type="number"]');
    await inputs.nth(0).fill("10000");
    await inputs.nth(1).fill("5");
    await inputs.nth(2).fill("3");
    await page.locator('button:has-text("Calculate")').click();
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/11500\.00/.test(body)) throw new Error("total 11500.00 missing");
    if (!/1500\.00/.test(body)) throw new Error("interest 1500.00 missing");
  });

  // 14. Inflation - requires World Bank API; skip math assert, just check page loads (crawl covers this)
  //     Real math is hard to verify without knowing WB's exact CPI values, which vary yearly.
  console.log("  SKIP inflation (external API-dependent, math varies by year)");

  // 15. GPA: two 4-credit A courses = 4.0
  await tc("gpa 2x4cr A = 4.0", async () => {
    await page.goto(BASE + "/gpa-calculator", { waitUntil: 'networkidle' });
    // Fill first row credits
    const numInputs = page.locator('input[type="number"]');
    await numInputs.nth(0).fill("4");
    // Add row
    await page.locator('button:has-text("Add Course")').click();
    await numInputs.nth(1).fill("4");
    await page.locator('button:has-text("Calculate GPA")').click();
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/4\.00/.test(body)) throw new Error("GPA 4.00 missing");
  });

  // 16. Grade: 85 weighted 40 + 92 weighted 60 = (85*40 + 92*60)/100 = 89.2%
  await tc("grade 85@40 + 92@60 = 89.2%", async () => {
    await page.goto(BASE + "/grade-calculator", { waitUntil: 'networkidle' });
    const numInputs = page.locator('input[type="number"]');
    // Defaults: 85@40, 92@60 - should already show 89.2
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/89\.2/.test(body)) throw new Error("89.2% missing");
  });

  // 17. Fraction: 1/2 + 1/3 = 5/6
  await tc("fraction 1/2 + 1/3 = 5/6", async () => {
    await page.goto(BASE + "/fraction-calculator", { waitUntil: 'networkidle' });
    const numInputs = page.locator('input[type="number"]');
    // defaults 1/2 + 1/3 already
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\b5\b/.test(body)) throw new Error("5 missing");
    if (!/\b6\b/.test(body)) throw new Error("6 missing");
    // decimal 0.833...
    if (!/0\.8333/.test(body)) throw new Error("0.8333 missing");
  });

  // 18. Std deviation: [2,4,4,4,5,5,7,9] = population SD 2.0
  await tc("std dev [2,4,4,4,5,5,7,9] popSD = 2", async () => {
    await page.goto(BASE + "/standard-deviation-calculator", { waitUntil: 'networkidle' });
    const textarea = page.locator('textarea').first();
    await textarea.fill("2,4,4,4,5,5,7,9");
    await page.waitForTimeout(500);
    const body = await page.locator('body').innerText();
    // Population SD = 2 exactly (classic example)
    if (!/\b2\b/.test(body)) throw new Error("population SD 2 missing");
  });

  // 19. Average: [2,4,4,4,5,5,7,9] mean=5, median=4.5
  await tc("average [2,4,4,4,5,5,7,9] mean=5 median=4.5", async () => {
    await page.goto(BASE + "/average-calculator", { waitUntil: 'networkidle' });
    const textarea = page.locator('textarea').first();
    await textarea.fill("2,4,4,4,5,5,7,9");
    await page.waitForTimeout(500);
    const body = await page.locator('body').innerText();
    if (!/\b5\b/.test(body)) throw new Error("mean 5 missing");
    if (!/4\.5/.test(body)) throw new Error("median 4.5 missing");
    if (!/\b4\b/.test(body)) throw new Error("mode 4 missing");
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
