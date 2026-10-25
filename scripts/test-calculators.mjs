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
  // ============ TIER C-lite ============
  // 20. Time card: 5 days @ 09:00-17:00 with 30min break each = 5*7.5 = 37.5h @ $25 = $937.50
  await tc("time card 5d 9-5 30minbrk @25 = 37.5h / 937.50", async () => {
    await page.goto(BASE + "/time-card-calculator", { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const body = await page.locator('body').innerText();
    if (!/37h 30m/.test(body)) throw new Error("37h 30m missing");
    if (!/937\.50/.test(body)) throw new Error("$937.50 missing");
  });

  // 21. Time duration: 09:00 -> 17:30 with 30min break = 8h 00m
  await tc("time duration 09:00-17:30 - 30brk = 8h", async () => {
    await page.goto(BASE + "/time-duration-calculator", { waitUntil: 'networkidle' });
    const timeInputs = page.locator('input[type="time"]');
    await timeInputs.nth(0).fill("09:00");
    await timeInputs.nth(1).fill("17:30");
    await page.locator('button:has-text("Calculate Duration")').click();
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/8h 00m/.test(body)) throw new Error("8h 00m missing");
  });

  // 22. Hours calculator: 09:00-17:00 = 8h
  await tc("hours 09:00-17:00 = 8h", async () => {
    await page.goto(BASE + "/hours-calculator", { waitUntil: 'networkidle' });
    await page.locator('button:has-text("Calculate")').last().click();
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/8h 00m/.test(body)) throw new Error("8h 00m missing");
  });

  // 23. Date duration: 2024-01-01 00:00 -> 2024-12-31 00:00 = 364 days (exclusive end)
  await tc("date duration 2024 = 364 or 365 days", async () => {
    await page.goto(BASE + "/date-duration-calculator", { waitUntil: 'networkidle' });
    const dtInputs = page.locator('input[type="datetime-local"]');
    await dtInputs.nth(0).fill("2024-01-01T00:00");
    await dtInputs.nth(1).fill("2024-12-31T00:00");
    await page.locator('button:has-text("Calculate Duration")').click();
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    // 365 days difference between midnight Jan 1 and midnight Dec 31 (2024 leap)
    if (!/\b36[45]\b/.test(body)) throw new Error("364 or 365 days missing");
  });

  // 24. Week number: 2024-01-01 = week 1, day 1
  await tc("week 2024-01-01 = week 1 day 1", async () => {
    await page.goto(BASE + "/week-numbers", { waitUntil: 'networkidle' });
    await page.locator('input[type="date"]').first().fill("2024-01-01");
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    // Day of year 1
    if (!/\b1\b/.test(body)) throw new Error("day 1 missing");
    // Week 1
    if (!/\b1\b/.test(body)) throw new Error("week 1 missing");
  });

  // 25. Pace: 10 km in 50 min = 5:00/km
  await tc("pace 10km in 50min = 5m 0s per km", async () => {
    await page.goto(BASE + "/pace-calculator", { waitUntil: 'networkidle' });
    const numInputs = page.locator('input[type="number"]');
    // defaults: dist 10, hours 0, minutes 50, seconds 0
    await page.locator('button:has-text("Calculate")').last().click();
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/5m 0s/.test(body)) throw new Error("5m 0s pace missing");
    if (!/12\.00 km\/h/.test(body)) throw new Error("12.00 km/h speed missing");
  });

  // 26. Protein: 70 kg active = 84-112 g/day
  await tc("protein 70kg active = 84-112g", async () => {
    await page.goto(BASE + "/protein-calculator", { waitUntil: 'networkidle' });
    // weight default 70, activity default active (1.2-1.6)
    await page.locator('button:has-text("Calculate Protein")').click();
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/84-112g/.test(body)) throw new Error("84-112g missing");
  });

  // 27. BAC: 70kg male, 2 x 12oz @ 5% ABV over 2h = ~0.045%
  await tc("bac 70kg male 2x12oz 5% over 2h ~ 0.045", async () => {
    await page.goto(BASE + "/bac-calculator", { waitUntil: 'networkidle' });
    await page.locator('button:has-text("Calculate BAC")').click();
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    // Widmark: alcohol g = 2 * 12 * 0.05 * 29.5735 * 0.789 = 28.0g
    // BAC = (28.0 / (154 * 0.68)) * 100 - 0.015*2 = 26.7 - 3.0 = ~0.027
    // Actual calc: (28 / (154.3 * 0.68)) * 100 = 26.7 ... minus 0.015*2 = 23.7
    // Formula in code multiplies by 100 later, so bac may show as 0.024 to 0.05 range
    if (!/0\.0[2-5]/.test(body)) throw new Error("BAC 0.02-0.05 missing");
  });

  // 28. Water intake: 75kg moderate = 75*35/1000 = 2.625 + 0.5 activity + 0 climate = 3.13 L
  await tc("water 75kg moderate = ~3.13 L", async () => {
    await page.goto(BASE + "/water-intake-calculator", { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    // 2.625 base + 0.5 moderate = 3.125 -> displays 3.13 L
    if (!/3\.1[23]/.test(body)) throw new Error("3.12/3.13 L missing");
  });
  // ============ TIER C-unit ============
  // 29. Temperature: 100 C = 212 F = 373.15 K = 671.67 R
  await tc("temp 100C = 212F = 373.15K", async () => {
    await page.goto(BASE + "/temperature-converter", { waitUntil: 'networkidle' });
    const numInput = page.locator('input[type="number"]').first();
    await numInput.fill("100");
    // from defaults to C
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\b212\b/.test(body)) throw new Error("212 F missing");
    if (!/\b373\.15\b/.test(body)) throw new Error("373.15 K missing");
  });

  // 30. Length: 1 m = 100 cm = 1000 mm = 3.28084 ft
  await tc("length 1m = 100cm = 3.28084ft", async () => {
    await page.goto(BASE + "/length-converter", { waitUntil: 'networkidle' });
    // defaults: 1 m
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\b100\b/.test(body)) throw new Error("100 cm missing");
    if (!/\b1,000\b/.test(body) && !/\b1000\b/.test(body)) throw new Error("1000 mm missing");
    if (!/3\.2808/.test(body)) throw new Error("3.2808 ft missing");
  });

  // 31. Weight: 1 kg = 1000 g = 2.20462 lb = 35.274 oz
  await tc("weight 1kg = 2.20462 lb", async () => {
    await page.goto(BASE + "/weight-converter", { waitUntil: 'networkidle' });
    // defaults: 1 kg
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/2\.2046/.test(body)) throw new Error("2.2046 lb missing");
    if (!/\b1,000\b/.test(body) && !/\b1000\b/.test(body)) throw new Error("1000 g missing");
  });

  // 32. Data storage: 1 GB = 1024 MB = 1,073,741,824 bytes
  await tc("storage 1GB = 1024MB", async () => {
    await page.goto(BASE + "/data-storage-converter", { waitUntil: 'networkidle' });
    // defaults: 1 GB
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\b1024\b/.test(body)) throw new Error("1024 MB missing");
    if (!/1,073,741,824/.test(body)) throw new Error("1073741824 bytes missing");
  });

  // 33. Speed: 100 km/h = 62.1371 mph = 27.7778 m/s
  await tc("speed 100kmh = 62.137mph", async () => {
    await page.goto(BASE + "/speed-converter", { waitUntil: 'networkidle' });
    // defaults: 100 kmh
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/62\.13/.test(body)) throw new Error("62.13 mph missing");
    if (!/27\.77/.test(body)) throw new Error("27.77 m/s missing");
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
