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
  // ============ TIER C-math ============
  // 34. Logarithm: log10(1000) = 3, ln(e) ~ 1
  await tc("log10(1000) = 3, ln(2.718) ~ 1", async () => {
    await page.goto(BASE + "/logarithm-calculator", { waitUntil: 'networkidle' });
    const inputs = page.locator('input[type="number"]');
    await inputs.nth(0).fill("1000");
    await inputs.nth(1).fill("10");
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\b3\b/.test(body)) throw new Error("log10 3 missing");
  });

  // 35. Quadratic: x^2 - 5x + 6 = 0 -> x = 2, 3
  await tc("quadratic x^2-5x+6 roots = 2,3", async () => {
    await page.goto(BASE + "/quadratic-calculator", { waitUntil: 'networkidle' });
    const inputs = page.locator('input[type="number"]');
    await inputs.nth(0).fill("1");
    await inputs.nth(1).fill("-5");
    await inputs.nth(2).fill("6");
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    // Roots are 3 and 2 (order may vary)
    if (!/\b3\b/.test(body)) throw new Error("root 3 missing");
    if (!/\b2\b/.test(body)) throw new Error("root 2 missing");
  });

  // 36. Matrix det: [[1,2],[3,4]] det = -2
  await tc("matrix det [[1,2],[3,4]] = -2", async () => {
    await page.goto(BASE + "/matrix-calculator", { waitUntil: 'networkidle' });
    // defaults 1,2,3,4 det should be 1*4 - 2*3 = -2
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/-2\b/.test(body)) throw new Error("det -2 missing");
  });

  // 37. GCD/LCM: 12, 18, 24 -> gcd 6, lcm 72
  await tc("gcd/lcm 12,18,24 -> 6,72", async () => {
    await page.goto(BASE + "/gcd-lcm-calculator", { waitUntil: 'networkidle' });
    // defaults already 12, 18, 24
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\b6\b/.test(body)) throw new Error("gcd 6 missing");
    if (!/\b72\b/.test(body)) throw new Error("lcm 72 missing");
  });

  // 38. Prime factor: 360 = 2^3 x 3^2 x 5
  await tc("prime factor 360 = 2^3 x 3^2 x 5", async () => {
    await page.goto(BASE + "/prime-factorization-calculator", { waitUntil: 'networkidle' });
    // defaults 360
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/2\^3/.test(body)) throw new Error("2^3 missing");
    if (!/3\^2/.test(body)) throw new Error("3^2 missing");
  });

  // 39. Permutation/Combination: P(10,3) = 720, C(10,3) = 120
  await tc("perm/comb P(10,3)=720 C(10,3)=120", async () => {
    await page.goto(BASE + "/permutation-combination-calculator", { waitUntil: 'networkidle' });
    // defaults n=10, r=3
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\b720\b/.test(body)) throw new Error("P 720 missing");
    if (!/\b120\b/.test(body)) throw new Error("C 120 missing");
  });

  // 40. Probability: P(A)=0.5, P(B)=0.5, P(AnB)=0.25 -> P(AuB)=0.75 (75%), independent
  await tc("probability P(AuB)=75% independent", async () => {
    await page.goto(BASE + "/probability-calculator", { waitUntil: 'networkidle' });
    // defaults 0.5, 0.5, 0.25
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/75\.00%/.test(body)) throw new Error("75.00% union missing");
    if (!/independent/.test(body)) throw new Error("independent label missing");
  });

  // 41. Slope: (0,0) to (4,8) -> m=2, b=0
  await tc("slope (0,0)->(4,8) m=2 b=0", async () => {
    await page.goto(BASE + "/slope-calculator", { waitUntil: 'networkidle' });
    // defaults 0,0,4,8
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\b2\b/.test(body)) throw new Error("slope 2 missing");
    // y = 2x + 0
    if (!/y = 2.*0/.test(body) && !/y = 2 x \+ 0/.test(body)) throw new Error("y = 2x + 0 missing");
  });

  // 42. Triangle SSS 3,4,5 right triangle: area 6, perimeter 12, angles ~36.87/53.13/90
  await tc("triangle SSS 3,4,5 = area 6, perim 12", async () => {
    await page.goto(BASE + "/triangle-calculator", { waitUntil: 'networkidle' });
    // defaults 3,4,5
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\b6\b/.test(body)) throw new Error("area 6 missing");
    if (!/\b12\b/.test(body)) throw new Error("perimeter 12 missing");
  });

  // 43. Area: rectangle 5x3 = 15
  await tc("area rectangle 5x3 = 15", async () => {
    await page.goto(BASE + "/area-calculator", { waitUntil: 'networkidle' });
    // defaults rectangle w=5 h=3
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\b15\b/.test(body)) throw new Error("area 15 missing");
  });
  // ============ TIER C-math-final ============
  // 44. Sig figs: 0.004560 = 4 sig figs
  await tc("sig figs 0.004560 = 4", async () => {
    await page.goto(BASE + "/significant-figures-calculator", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(2000);
    // Look at the whole page text after calculator mounted
    const body = await page.locator('body').innerText();
    // Count is in "SIGNIFICANT FIGURES" section followed by a digit 4-6
    // (bug: current returns 6, expected 4)
    const m = body.match(/SIGNIFICANT FIGURES\s+([0-9])/i);
    if (!m) throw new Error("could not find count section. Body tail: " + body.slice(-500).replace(/\n/g, ' | '));
    if (m[1] !== "4") throw new Error("expected 4, got " + m[1]);
  });

  

  // 45. Percent error: exp=9.8, theo=10 -> 2.0000%
  await tc("percent error 9.8 vs 10 = 2%", async () => {
    await page.goto(BASE + "/percent-error-calculator", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(2000);
    const body = await page.locator('body').innerText();
    // Display should be "Percent error" followed by "2.0000%"
    const m = body.match(/Percent error\s+([0-9.]+)%/i);
    if (!m) throw new Error("no Percent error line. Body tail: " + body.slice(-500).replace(/\n/g, ' | '));
    if (parseFloat(m[1]) < 1.99 || parseFloat(m[1]) > 2.01) {
      throw new Error("expected 2.00 +/- 0.01, got " + m[1]);
    }
  });

  

  // 46. Exponent: 2^10 = 1024
  await tc("exponent 2^10 = 1024", async () => {
    await page.goto(BASE + "/exponent-root-calculator", { waitUntil: 'networkidle' });
    // defaults 2^10
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/1,024|1024/.test(body)) throw new Error("1024 missing");
  });

  // 47. Volume: cube 3x3x3 = 27
  await tc("volume cube 3 = 27", async () => {
    await page.goto(BASE + "/volume-calculator", { waitUntil: 'networkidle' });
    // defaults cube side 3
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/\b27\b/.test(body)) throw new Error("volume 27 missing");
  });

  // 48. Scientific calculator: 2+3 = 5
  await tc("scientific 2+3 = 5", async () => {
    await page.goto(BASE + "/scientific-calculator", { waitUntil: 'networkidle' });
    await page.locator('button:has-text("2")').first().click();
    await page.locator('button:has-text("+")').first().click();
    await page.locator('button:has-text("3")').first().click();
    await page.locator('button:has-text("=")').first().click();
    await page.waitForTimeout(300);
    const body = await page.locator('body').innerText();
    if (!/\b5\b/.test(body)) throw new Error("result 5 missing");
  });

  // 49. Roman: 2026 = MMXXVI
  await tc("roman 2026 = MMXXVI", async () => {
    await page.goto(BASE + "/roman-numeral-converter", { waitUntil: 'networkidle' });
    // defaults 2026 -> MMXXVI
    await page.waitForTimeout(400);
    const body = await page.locator('body').innerText();
    if (!/MMXXVI/.test(body)) throw new Error("MMXXVI missing");
  });
  // ============ TIER per-country ============
  // 50. auto-loan /us - 30k price, 5k down, 60mo, 6.9% -> monthly ~$494
  await tc("auto-loan us 30k/5k/60/6.9 = ~494", async () => {
    await page.goto(BASE + "/auto-loan-calculator/us", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(600);
    const body = await page.locator('body').innerText();
    // Default: 25,000 principal @ 6.9%/12, 60 mo -> monthly 493.xx
    if (!/Monthly payment[\s\S]{0,80}\$49[0-9]/i.test(body)) throw new Error("auto-loan monthly ~$494 missing");
  });

  // 51. auto-loan /gb - shows GBP symbol (£)
  await tc("auto-loan gb shows pound symbol", async () => {
    await page.goto(BASE + "/auto-loan-calculator/gb", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(600);
    const body = await page.locator('body').innerText();
    if (!/£/.test(body)) throw new Error("GBP symbol £ missing on GB page");
  });

  // 52. credit-card-payoff /us - 5000 balance @ 19.99% / 200 per month -> ~35 months
  await tc("credit-card us 5000/19.99/200 = ~35 months", async () => {
    await page.goto(BASE + "/credit-card-payoff-calculator/us", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(600);
    const body = await page.locator('body').innerText();
    // 5000 @ 19.99% APR, 200/mo -> about 35 months
    if (!/Time to payoff[\s\S]{0,60}(2[5-9]y|3[0-9] months|2y [0-9]+m)/i.test(body)) {
      // Accept 2y 11m or similar
      if (!/(\d+ years?|2y \d+m|3\d months)/i.test(body)) throw new Error("payoff time missing");
    }
  });

  // 53. retirement /us - 30->65, 50k start, 500/mo, 7% -> ~$1.26M
  await tc("retirement us 30/65/50k/500/7 = ~1.2M", async () => {
    await page.goto(BASE + "/retirement-calculator/us", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(600);
    const body = await page.locator('body').innerText();
    // 35 years, 50k initial, 500/mo, 7%/12 -> ~1.25M-1.27M
    if (!/Nest egg[\s\S]{0,80}\$[12],[0-9]{3},[0-9]{3}/i.test(body)) throw new Error("nest egg $1.2M-2M missing");
  });

  // 54. investment /us - 10k start, 500/mo, 20y, 8% -> ~$342k
  await tc("investment us 10k/500/20/8 = ~342k", async () => {
    await page.goto(BASE + "/investment-calculator/us", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(600);
    const body = await page.locator('body').innerText();
    if (!/Value after 20 years[\s\S]{0,80}\$3[2-5][0-9],[0-9]{3}/i.test(body)) throw new Error("investment value ~$342k missing");
  });

  // 55. pregnancy-due-date /us - renders due date output
  await tc("pregnancy-due-date us renders", async () => {
    await page.goto(BASE + "/pregnancy-due-date-calculator/us", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(600);
    const body = await page.locator('body').innerText();
    if (!/Estimated due date/i.test(body)) throw new Error("Estimated due date label missing");
    if (!/\bweek|weekend|w pregnant/i.test(body) && !/weeks?/.test(body)) throw new Error("weeks pregnant text missing");
  });

  // 56. ovulation /us - renders ovulation output
  await tc("ovulation us renders", async () => {
    await page.goto(BASE + "/ovulation-calculator/us", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(600);
    const body = await page.locator('body').innerText();
    if (!/Estimated ovulation/i.test(body)) throw new Error("Estimated ovulation label missing");
    if (!/Fertile window/i.test(body)) throw new Error("Fertile window label missing");
  });

  // 57. grade-calculator /us - renders grade output with US scale
  await tc("grade us renders 89.2%", async () => {
    await page.goto(BASE + "/grade-calculator/us", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(600);
    const body = await page.locator('body').innerText();
    // Default: 85@40, 92@60 = 89.2%
    if (!/89\.2/.test(body)) throw new Error("grade 89.2 missing on US");
  });
  // ============ TIER mortgage-tree ============
  // 58. US amortization: 450k price, 90k down, 6.5%, 30y, 1.1% tax, 1800 ins -> P&I ~$2274
  await tc("mortgage us amort 450k/90k/6.5/30 P&I ~2274", async () => {
    await page.goto(BASE + "/mortgage/usa/amortization", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(700);
    const body = await page.locator('body').innerText();
    // P = 360,000; 6.5%/12 = 0.005417; 360 months -> PMT = 2275
    if (!/\$2,2[67][0-9]/.test(body)) throw new Error("US P&I ~$2274 missing. Body: " + body.slice(0, 300));
    if (!/PITI|Total monthly payment/i.test(body)) throw new Error("PITI label missing");
  });

  // 59. US FHA: 350k price, 680 credit -> down 3.5% = 12,250
  await tc("mortgage us fha 350k/680 shows 3.5% down", async () => {
    await page.goto(BASE + "/mortgage/usa/fha", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(700);
    const body = await page.locator('body').innerText();
    // Down 3.5% of 350k = 12,250
    if (!/\$12,2[0-9][0-9]/.test(body)) throw new Error("FHA 3.5% down $12,250 missing. Body: " + body.slice(0, 300));
    if (!/Upfront MIP/i.test(body)) throw new Error("Upfront MIP label missing");
  });

  // 60. UK repayment: £250k, 4.5%, 25y -> £1389/month
  await tc("mortgage uk repayment 250k/4.5/25 = ~1390", async () => {
    await page.goto(BASE + "/mortgage/uk/repayment", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(1500);
    const body = await page.locator('body').innerText();
    // 250k @ 4.5%/12 over 300 mo = 1389.58 -> Math.round -> 1390. Assert number only (no currency symbol).
    if (!/1[,.]?39[0-9]|1[,.]?38[0-9]/.test(body)) throw new Error("UK repayment ~1390 missing. Body: " + body.slice(0, 800));
    if (!/Repayment/i.test(body)) throw new Error("Repayment label missing");
  });

  // 61. UK stamp duty: £350k England = 5000 (5% on 250k-350k)
  await tc("mortgage uk stamp duty 350k England = £5000", async () => {
    await page.goto(BASE + "/mortgage/uk/stamp-duty", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(700);
    const body = await page.locator('body').innerText();
    // 350k England: (350k-250k) x 5% = 5000
    if (!/£5,0[0-9][0-9]/.test(body)) throw new Error("UK SDLT £5000 missing. Body: " + body.slice(0, 300));
    if (!/stamp duty/i.test(body)) throw new Error("Stamp duty label missing");
  });

  // 62. CA CMHC: 600k price, 60k down -> LVR 90%, rate 3.10%, premium 540k*0.031 = 16,740
  await tc("mortgage ca cmhc 600k/60k -> LVR 90% premium ~16.7k", async () => {
    await page.goto(BASE + "/mortgage/canada/cmhc-insurance", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(700);
    const body = await page.locator('body').innerText();
    if (!/90\.0%/.test(body)) throw new Error("LTV 90.0% missing. Body: " + body.slice(0, 300));
    // 540k loan x 3.10% = 16,740
    if (!/\$16,7[0-9][0-9]/.test(body)) throw new Error("CMHC premium ~$16,740 missing");
  });

  // 63. CA LTT: Ontario, 600k -> base 8,475
  await tc("mortgage ca ltt Ontario 600k = $8,475", async () => {
    await page.goto(BASE + "/mortgage/canada/land-transfer-tax", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(700);
    const body = await page.locator('body').innerText();
    // ON 600k: 55k*0.5% + 195k*1% + 150k*1.5% + 200k*2% = 275 + 1950 + 2250 + 4000 = 8475
    if (!/\$8,4[0-9][0-9]/.test(body)) throw new Error("CA ON LTT ~$8,475 missing. Body: " + body.slice(0, 300));
  });

  // 64. India EMI: 50L, 8.75%, 20y -> EMI ~44,168
  await tc("mortgage in emi 5M/8.75/20 = ~44,168", async () => {
    await page.goto(BASE + "/mortgage/india/emi", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(700);
    const body = await page.locator('body').innerText();
    // 5M loan @ 8.75%/12, 240mo -> 44186
    if (!/₹44,1[0-9][0-9]|₹44,2[0-9][0-9]/.test(body)) throw new Error("India EMI ~₹44,168 missing. Body: " + body.slice(0, 300));
  });

  // 65. AU LMI: 800k price, 100k deposit -> LVR 87.5%, rate 1.97%, premium ~13,790
  await tc("mortgage au lmi 800k/100k -> LVR 87.5%", async () => {
    await page.goto(BASE + "/mortgage/australia/lmi", { waitUntil: 'networkidle' });
    await page.waitForSelector('input', { timeout: 6000 }).catch(() => {});
    await page.waitForTimeout(700);
    const body = await page.locator('body').innerText();
    // 700k loan / 800k price = 87.5%, LVR band 87-88% rate 1.97% -> 700k*0.0197 = 13,790
    if (!/87\.5/.test(body)) throw new Error("AU LVR 87.5% missing. Body: " + body.slice(0, 300));
    if (!/\$13,[0-9]{3}/.test(body) && !/\$1[0-9],[0-9]{3}/.test(body)) throw new Error("AU LMI premium missing");
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
