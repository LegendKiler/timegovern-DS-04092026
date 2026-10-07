# scripts/verify-all.ps1 -- comprehensive feature check + full build.
# Run: .\scripts\verify-all.ps1
# Set $SkipBuild = $true at the top for a fast pass (no 24s build).

$SkipBuild = $false

$pass = 0
$fail = 0
function SayPass($m) { Write-Host "[PASS] $m" -ForegroundColor Green; $script:pass++ }
function SayFail($m) { Write-Host "[FAIL] $m" -ForegroundColor Red;   $script:fail++ }
function SaySection($m) { Write-Host ""; Write-Host ("--- " + $m + " ---") -ForegroundColor Cyan }

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

# ============================================================
SaySection "1. Git state"
# ============================================================
$lines = @(git status --short)
Write-Host ("HEAD: " + (git log --oneline -1))
if ($lines.Count -eq 0) {
  SayPass "working tree clean"
} else {
  Write-Host ("[INFO] " + $lines.Count + " uncommitted file(s) - commit when stage is complete:") -ForegroundColor Yellow
  foreach ($l in $lines) { Write-Host ("       " + $l) -ForegroundColor DarkYellow }
}

# ============================================================
SaySection "2. Key files present"
# ============================================================
$files = @(
  # Core data
  "src\data\countryMetadata.js",
  "src\data\countryCodes.js",
  "src\data\holidaysSupplement.js",
  "src\data\currencies.js",
  "src\data\searchIndex.js",
  "src\data\cities.js",
  # Worldometers
  "src\data\worldRates.js",
  "src\data\countryPopulations.js",
  "src\lib\worldData.js",
  "src\hooks\useCountryPopulation.js",
  "src\components\worldometers\LiveCounter.jsx",
  "src\components\worldometers\TrendChart.jsx",
  "src\components\worldometers\MetricPage.jsx",
  "src\pages\WorldometersHub.jsx",
  "WORLDOMETERS.md",
  # Core app
  "src\App.jsx",
  "src\components\Header.jsx",
  "src\components\calculators\SeoLayout.jsx",
  "src\lib\seo.js",
  # Static
  "public\robots.txt",
  "public\_headers",
  "public\sw.js",
  # Sitemaps
  "public\sitemap-index.xml",
  "public\sitemap-core.xml",
  "public\sitemap-blog.xml",
  "public\sitemap-cities.xml",
  "public\sitemap-holidays.xml",
  "public\sitemap-currency.xml",
  "public\sitemap-population.xml",
  "public\sitemap-calculators.xml",
  "src\pages\CountryCalculatorPage.jsx"
)
$missing = @()
foreach ($f in $files) { if (-not (Test-Path (Join-Path $root $f))) { $missing += $f } }
if ($missing.Count -eq 0) { SayPass ("all " + $files.Count + " key files present") } else { SayFail ("missing: " + ($missing -join ", ")) }

# ============================================================
SaySection "3. countryMetadata.js integrity"
# ============================================================
$metaPath = Join-Path $root "src\data\countryMetadata.js"
$meta = [System.IO.File]::ReadAllText($metaPath)

$n = ([regex]::Matches($meta, "(?m)^  [A-Z]{2}: \{")).Count
if ($n -eq 220) { SayPass ("entries: " + $n) } else { SayFail ("entries: " + $n + " (expected 220)") }

$a = ([regex]::Matches($meta, "(?m)^    currency: null")).Count
if ($a -eq 0) { SayPass "null currencies: 0" } else { SayFail ("null currencies: " + $a) }

$b = ([regex]::Matches($meta, "(?m)^    currencySymbol: null")).Count
if ($b -eq 0) { SayPass "null currencySymbol: 0" } else { SayFail ("null currencySymbol: " + $b) }

$req = @("India","Pakistan","United States","United Kingdom","Germany","Nigeria","Chile")
$miss = @()
foreach ($c in $req) { if (-not $meta.Contains($c)) { $miss += $c } }
if ($miss.Count -eq 0) { SayPass "all 7 named countries present" } else { SayFail ("missing countries: " + ($miss -join ", ")) }

$mh = @()
if (-not $meta.Contains("export function getCountriesByRegion")) { $mh += "getCountriesByRegion" }
if (-not $meta.Contains("export const REGION_ORDER"))         { $mh += "REGION_ORDER" }
if (-not $meta.Contains("export function getCountryMeta"))    { $mh += "getCountryMeta" }
if (-not $meta.Contains("export function getCurrencySymbol")) { $mh += "getCurrencySymbol" }
if ($mh.Count -eq 0) { SayPass "all 4 helper exports present" } else { SayFail ("missing exports: " + ($mh -join ", ")) }

# ============================================================
SaySection "4. Worldometers feature (hub + 14 clocks + population)"
# ============================================================
$app = [System.IO.File]::ReadAllText((Join-Path $root "src\App.jsx"))

$worldRoutes = @(
  "/worldometers",
  "/world-population-clock",
  "/births-clock",
  "/deaths-clock",
  "/co2-emissions-clock",
  "/energy-use-clock",
  "/food-waste-clock",
  "/forest-loss-clock",
  "/plastic-produced-clock",
  "/water-used-clock",
  "/renewable-energy-clock",
  "/emails-sent-today",
  "/google-searches-today",
  "/gdp-clock",
  "/money-spent-online-today",
  "/population",
  "/population/:code"
)
$mw = @()
foreach ($r in $worldRoutes) {
  if (-not $app.Contains('path="' + $r + '"')) { $mw += $r }
}
if ($mw.Count -eq 0) { SayPass ("all " + $worldRoutes.Count + " worldometer routes registered") } else { SayFail ("missing worldometer routes: " + ($mw -join ", ")) }

if ($app.Contains('path="/blog"')) { SayPass "/blog route present" } else { SayFail "/blog route missing" }

# ============================================================
SaySection "5. Calculators (existing 8)"
# ============================================================
$calcRoutes = @(
  "/auto-loan-calculator",
  "/credit-card-payoff-calculator",
  "/retirement-calculator",
  "/investment-calculator",
  "/grade-calculator",
  "/roman-numeral-converter",
  "/pregnancy-due-date-calculator",
  "/ovulation-calculator",
  "/area-calculator",
  "/volume-calculator",
  "/triangle-calculator",
  "/slope-calculator",
  "/quadratic-calculator",
  "/binary-hex-converter",
  "/debt-payoff-calculator",
  "/down-payment-calculator",
  "/amortization-calculator",
  "/cagr-calculator",
  "/auto-loan-calculator/:code",
  "/credit-card-payoff-calculator/:code",
  "/retirement-calculator/:code",
  "/investment-calculator/:code",
  "/pregnancy-due-date-calculator/:code",
  "/ovulation-calculator/:code",
  "/grade-calculator/:code"
)
$mc = @()
foreach ($r in $calcRoutes) {
  if (-not $app.Contains('path="' + $r + '"')) { $mc += $r }
}
if ($mc.Count -eq 0) { SayPass ("all " + $calcRoutes.Count + " calculator routes registered") } else { SayFail ("missing calculator routes: " + ($mc -join ", ")) }

# Component + page files for each calculator
$calcComponents = @(
  "AutoLoanCalculator","CreditCardPayoffCalculator","RetirementCalculator","InvestmentCalculator",
  "GradeCalculator","RomanNumeralCalculator","PregnancyDueDateCalculator","OvulationCalculator",
  "AreaCalculator","VolumeCalculator","TriangleCalculator",
  "SlopeCalculator","QuadraticCalculator","BinaryHexConverter",
  "DebtPayoffCalculator","DownPaymentCalculator","AmortizationCalculator","CAGRCalculator"
)
$missingComp = @()
foreach ($c in $calcComponents) {
  $cp = Join-Path $root ("src\components\calculators\" + $c + ".jsx")
  $pp = Join-Path $root ("src\pages\" + $c + "Page.jsx")
  if (-not (Test-Path $cp)) { $missingComp += ($c + ".jsx") }
  if (-not (Test-Path $pp)) { $missingComp += ($c + "Page.jsx") }
}
if ($missingComp.Count -eq 0) { SayPass "all 16 calculator component+page files present" } else { SayFail ("missing: " + ($missingComp -join ", ")) }

# ============================================================
SaySection "6. Search index coverage"
# ============================================================
$si = [System.IO.File]::ReadAllText((Join-Path $root "src\data\searchIndex.js"))
$mse = @()
foreach ($r in $calcRoutes) {
  if (-not $si.Contains('href: "' + $r + '"')) { $mse += $r }
}
foreach ($r in @("/worldometers","/population")) {
  if (-not $si.Contains('href: "' + $r + '"')) { $mse += $r }
}
if ($mse.Count -eq 0) { SayPass "searchIndex covers all calculators + worldometers hub" } else { SayFail ("searchIndex missing: " + ($mse -join ", ")) }

# ============================================================
SaySection "7. Sitemaps"
# ============================================================
$sitemapIdx = [System.IO.File]::ReadAllText((Join-Path $root "public\sitemap-index.xml"))
$childCount = ([regex]::Matches($sitemapIdx, "<loc>")).Count
if ($childCount -eq 7) { SayPass "sitemap-index: 7 children" } else { SayFail ("sitemap-index: " + $childCount + " children (expected 7)") }

$expect = @{
  "sitemap-core.xml"       = 187
  "sitemap-blog.xml"       = 171
  "sitemap-cities.xml"     = 5498
  "sitemap-holidays.xml"   = 881
  "sitemap-currency.xml"   = 381
  "sitemap-population.xml" = 182,
  "sitemap-calculators.xml" = 315
}
$total = 0
foreach ($k in $expect.Keys) {
  $txt = [System.IO.File]::ReadAllText((Join-Path $root ("public\" + $k)))
  $c = ([regex]::Matches($txt, "<loc>")).Count
  $total = $total + $c
  $min = $expect[$k]
  if ($c -ge $min) { SayPass ($k + ": " + $c + " urls (min " + $min + ")") } else { SayFail ($k + ": " + $c + " urls (min " + $min + ")") }
}
Write-Host ("Total URLs across 6 maps: " + $total)

# ============================================================
SaySection "8. Nav + static"
# ============================================================
$header = [System.IO.File]::ReadAllText((Join-Path $root "src\components\Header.jsx"))
$navChecks = @(
  @{ label = "Worldometers nav link"; needle = "/worldometers" },
  @{ label = "World Population Clock nav link"; needle = "/world-population-clock" }
)
$mn = @()
foreach ($c in $navChecks) { if (-not $header.Contains($c.needle)) { $mn += $c.label } }
if ($mn.Count -eq 0) { SayPass "Header nav has Live dropdown links (worldometers + population clock)" } else { SayFail ("Header missing: " + ($mn -join ", ")) }

$robots = [System.IO.File]::ReadAllText((Join-Path $root "public\robots.txt"))
if ($robots.Contains("sitemap-index.xml")) { SayPass "robots.txt points to sitemap-index.xml" } else { SayFail "robots.txt does not reference sitemap-index.xml" }

# ============================================================
SaySection "9. Full production build"
# ============================================================
if ($SkipBuild) {
  Write-Host "Build skipped ($SkipBuild = true)"
} else {
  Write-Host "Running npm run build (about 24s)..."
  $out = cmd /c "npm run build 2>&1"
  if ($LASTEXITCODE -ne 0) {
    SayFail ("npm run build failed (exit " + $LASTEXITCODE + ")")
    Write-Host $out
  } else {
    SayPass "npm run build passed"
  }
  if (Test-Path (Join-Path $root "dist\index.html")) { SayPass "dist/index.html present" } else { SayFail "dist/index.html missing" }
}

# ============================================================
Write-Host ""
Write-Host ("Summary: " + $pass + " passed, " + $fail + " failed")
if ($fail -gt 0) { Write-Host "STATUS: FAILED" -ForegroundColor Red } else { Write-Host "STATUS: ALL PASS" -ForegroundColor Green }
