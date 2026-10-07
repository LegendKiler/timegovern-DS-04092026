# scripts/check-full-build.ps1 -- read-only state check + full build.
# Run: .\scripts\check-full-build.ps1

$pass = 0
$fail = 0
function SayPass($m) { Write-Host "[PASS] $m" -ForegroundColor Green; $script:pass++ }
function SayFail($m) { Write-Host "[FAIL] $m" -ForegroundColor Red;   $script:fail++ }

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

# 1. Git state (allow our own untracked scripts)
$lines = @(git status --short)
$unexpected = @()
foreach ($l in $lines) {
  if ($l -notmatch "test-all\.ps1" -and $l -notmatch "check-full-build\.ps1") { $unexpected += $l }
}
if ($unexpected.Count -eq 0) { SayPass "working tree: only our untracked scripts" } else { SayFail ("unexpected changes: " + ($unexpected -join " | ")) }

$head = (git log --oneline -1)
SayPass ("HEAD: " + $head)

# 2. Key files from last session
$files = @(
  "src\data\countryMetadata.js",
  "src\data\worldRates.js",
  "src\data\countryPopulations.js",
  "src\lib\worldData.js",
  "src\hooks\useCountryPopulation.js",
  "src\components\worldometers\LiveCounter.jsx",
  "src\components\worldometers\TrendChart.jsx",
  "src\components\worldometers\MetricPage.jsx",
  "src\pages\WorldometersHub.jsx",
  "src\components\calculators\AutoLoanCalculator.jsx",
  "src\components\calculators\CreditCardPayoffCalculator.jsx",
  "src\components\calculators\RetirementCalculator.jsx",
  "src\components\calculators\InvestmentCalculator.jsx",
  "src\components\calculators\GradeCalculator.jsx",
  "src\components\calculators\RomanNumeralCalculator.jsx",
  "src\components\calculators\PregnancyDueDateCalculator.jsx",
  "src\components\calculators\OvulationCalculator.jsx",
  "WORLDOMETERS.md"
)
$missing = @()
foreach ($f in $files) { if (-not (Test-Path (Join-Path $root $f))) { $missing += $f } }
if ($missing.Count -eq 0) { SayPass ("all " + $files.Count + " key files present") } else { SayFail ("missing: " + ($missing -join ", ")) }

# 3. New calculator routes registered in App.jsx
$appPath = Join-Path $root "src\App.jsx"
$app = [System.IO.File]::ReadAllText($appPath)
$routes = @(
  "/auto-loan-calculator",
  "/credit-card-payoff-calculator",
  "/retirement-calculator",
  "/investment-calculator",
  "/grade-calculator",
  "/roman-numeral-converter",
  "/pregnancy-due-date-calculator",
  "/ovulation-calculator"
)
$mr = @()
foreach ($r in $routes) { if (-not $app.Contains('path="' + $r + '"')) { $mr += $r } }
if ($mr.Count -eq 0) { SayPass "all 8 new calculator routes registered" } else { SayFail ("missing routes: " + ($mr -join ", ")) }

# 4. Full build (this is the real thing, ~24s)
Write-Host ""
Write-Host "Running npm run build (about 24s)..."
$out = cmd /c "npm run build 2>&1"
if ($LASTEXITCODE -ne 0) {
  SayFail ("npm run build failed (exit " + $LASTEXITCODE + ")")
  Write-Host $out
} else {
  SayPass "npm run build passed"
}

# 5. dist artifacts
$distIndex = Join-Path $root "dist\index.html"
if (Test-Path $distIndex) { SayPass "dist/index.html present" } else { SayFail "dist/index.html missing after build" }

# Summary
Write-Host ""
Write-Host ("Summary: " + $pass + " passed, " + $fail + " failed")
if ($fail -gt 0) { Write-Host "STATUS: FAILED" -ForegroundColor Red } else { Write-Host "STATUS: ALL PASS" -ForegroundColor Green }
