# ============================================================
# test-urls.ps1 — Automated URL tester for TimeGovern
# Checks all calculator pages for HTTP 200 responses
# Usage: .\test-urls.ps1
# ============================================================

$ErrorActionPreference = "Continue"
$baseUrl = "http://localhost:5173"

Write-Host ""
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host "  TIMEGOVERN AUTOMATED TEST SUITE" -ForegroundColor Cyan
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host ""

# ---- Step 1: Check Vite is running ----
Write-Host "[1/4] Checking Vite server..." -ForegroundColor Yellow
$viteUp = $false
try {
    $r = Invoke-WebRequest -Uri $baseUrl -TimeoutSec 3 -UseBasicParsing -ErrorAction Stop
    if ($r.StatusCode -eq 200) {
        $viteUp = $true
        Write-Host "  OK  Vite running at $baseUrl" -ForegroundColor Green
    }
} catch {
    Write-Host "  FAIL  Vite NOT running at $baseUrl" -ForegroundColor Red
    Write-Host "  Run: npm run dev in another terminal first" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# ---- Step 2: Test all URLs ----
Write-Host ""
Write-Host "[2/4] Testing URLs..." -ForegroundColor Yellow
Write-Host ""

# Group URLs by feature
$testGroups = @{
    "Home Equity (NEW)" = @(
        "/mortgage/home-equity",
        "/mortgage/australia/home-equity",
        "/mortgage/usa/home-equity",
        "/mortgage/uk/home-equity",
        "/mortgage/canada/home-equity",
        "/mortgage/india/home-equity",
        "/mortgage/singapore/home-equity",
        "/mortgage/malaysia/home-equity",
        "/mortgage/japan/home-equity",
        "/mortgage/indonesia/home-equity",
        "/mortgage/pakistan/home-equity",
        "/mortgage/france/home-equity",
        "/mortgage/germany/home-equity",
        "/mortgage/spain/home-equity",
        "/mortgage/italy/home-equity",
        "/mortgage/netherlands/home-equity",
        "/mortgage/ireland/home-equity",
        "/mortgage/portugal/home-equity",
        "/mortgage/belgium/home-equity",
        "/mortgage/austria/home-equity",
        "/mortgage/norway/home-equity",
        "/mortgage/poland/home-equity",
        "/mortgage/switzerland/home-equity",
        "/mortgage/sweden/home-equity",
        "/mortgage/denmark/home-equity"
    )
    "Sell vs Refinance" = @(
        "/mortgage/sell-vs-refinance",
        "/mortgage/australia/sell-vs-refinance",
        "/mortgage/usa/sell-vs-refinance",
        "/mortgage/uk/sell-vs-refinance",
        "/mortgage/germany/sell-vs-refinance",
        "/mortgage/singapore/sell-vs-refinance"
    )
    "First Home Buyer" = @(
        "/mortgage/first-home-buyer",
        "/mortgage/australia/first-home-buyer",
        "/mortgage/usa/first-home-buyer",
        "/mortgage/uk/first-home-buyer",
        "/mortgage/canada/first-home-buyer",
        "/mortgage/india/first-home-buyer",
        "/mortgage/singapore/first-home-buyer",
        "/mortgage/germany/first-home-buyer",
        "/mortgage/pakistan/first-home-buyer"
    )
    "Rental Yield" = @(
        "/mortgage/rental-yield",
        "/mortgage/australia/rental-yield",
        "/mortgage/usa/rental-yield",
        "/mortgage/germany/rental-yield",
        "/mortgage/japan/rental-yield"
    )
    "Country Hubs" = @(
        "/mortgage",
        "/mortgage/australia",
        "/mortgage/usa",
        "/mortgage/uk",
        "/mortgage/canada",
        "/mortgage/india",
        "/mortgage/singapore",
        "/mortgage/malaysia",
        "/mortgage/japan",
        "/mortgage/germany",
        "/mortgage/france",
        "/mortgage/spain",
        "/mortgage/italy",
        "/mortgage/netherlands",
        "/mortgage/ireland",
        "/mortgage/portugal",
        "/mortgage/belgium",
        "/mortgage/austria",
        "/mortgage/norway",
        "/mortgage/poland",
        "/mortgage/switzerland",
        "/mortgage/sweden",
        "/mortgage/denmark",
        "/mortgage/indonesia",
        "/mortgage/pakistan",
        "/mortgage/europe",
        "/mortgage/asia-pacific"
    )
}

$totalPass = 0
$totalFail = 0
$allFailedUrls = @()

foreach ($groupName in $testGroups.Keys) {
    Write-Host "  $groupName" -ForegroundColor Cyan
    $urls = $testGroups[$groupName]
    $groupPass = 0
    $groupFail = 0
    $failedHere = @()

    foreach ($url in $urls) {
        try {
            $full = $baseUrl + $url
            $r = Invoke-WebRequest -Uri $full -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
            if ($r.StatusCode -eq 200) {
                $groupPass++
                $totalPass++
            } else {
                Write-Host "    $($r.StatusCode)  $url" -ForegroundColor Yellow
                $groupFail++
                $totalFail++
                $failedHere += $url
            }
        } catch {
            Write-Host "    ERR  $url" -ForegroundColor Red
            $groupFail++
            $totalFail++
            $failedHere += $url
        }
    }

    if ($groupFail -eq 0) {
        Write-Host "    OK  $groupPass / $($urls.Count) passed" -ForegroundColor Green
    } else {
        Write-Host "    $groupPass / $($urls.Count) passed, $groupFail failed" -ForegroundColor Red
        $allFailedUrls += $failedHere
    }
    Write-Host ""
}

# ---- Step 3: Check file integrity ----
Write-Host "[3/4] Checking files..." -ForegroundColor Yellow
$files = @(
    "src\components\mortgage\HomeEquityCalculator.jsx",
    "src\pages\mortgage\HomeEquityPage.jsx",
    "src\pages\mortgage\CountryHomeEquityPage.jsx",
    "src\components\mortgage\SellVsRefinanceCalculator.jsx",
    "src\pages\mortgage\SellVsRefinancePage.jsx",
    "src\pages\mortgage\CountrySellVsRefinancePage.jsx",
    "src\components\mortgage\FirstHomeBuyerCalculator.jsx",
    "src\pages\mortgage\CountryFirstHomeBuyerPage.jsx"
)

foreach ($f in $files) {
    if (Test-Path $f) {
        $size = (Get-Item $f).Length
        Write-Host "  OK    $($f.Split('\')[-1])  ($size bytes)" -ForegroundColor Green
    } else {
        Write-Host "  MISS  $f" -ForegroundColor Red
    }
}

# ---- Step 4: Check routes in App.jsx ----
Write-Host ""
Write-Host "[4/4] Checking routes in App.jsx..." -ForegroundColor Yellow
$app = [System.IO.File]::ReadAllText((Resolve-Path "src\App.jsx").Path)
$routes = @(
    "/mortgage/home-equity",
    "/mortgage/:country/home-equity",
    "/mortgage/sell-vs-refinance",
    "/mortgage/:country/sell-vs-refinance",
    "/mortgage/first-home-buyer",
    "/mortgage/:country/first-home-buyer",
    "/mortgage/rental-yield",
    "/mortgage/:country/rental-yield"
)
foreach ($route in $routes) {
    if ($app -match [regex]::Escape($route)) {
        Write-Host "  OK    $route" -ForegroundColor Green
    } else {
        Write-Host "  MISS  $route" -ForegroundColor Red
    }
}

# ---- Summary ----
Write-Host ""
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host "  SUMMARY" -ForegroundColor Cyan
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host "  PASS: $totalPass" -ForegroundColor Green
Write-Host "  FAIL: $totalFail" -ForegroundColor $(if ($totalFail -eq 0) { "Green" } else { "Red" })

if ($totalFail -eq 0) {
    Write-Host ""
    Write-Host "  ✅ ALL TESTS PASSED" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "  Failed URLs:" -ForegroundColor Red
    $allFailedUrls | ForEach-Object { Write-Host "    - $_" -ForegroundColor Red }
}

Write-Host ""
Write-Host "=============================================================" -ForegroundColor Cyan