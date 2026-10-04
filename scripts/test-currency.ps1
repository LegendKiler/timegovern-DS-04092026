# scripts/test-currency.ps1
# Automated test for TimeGovern currency feature
$ErrorActionPreference = 'Continue'
Set-Location (Split-Path $PSScriptRoot -Parent)

$pass = 0; $fail = 0; $lines = @()

function Check($name, $cond, $detail) {
  $script:lines += "  [$([int]$cond)] $name - $detail"
  if ($cond) { $script:pass++ } else { $script:fail++ }
}

Write-Host "=== TIMEGOVERN CURRENCY TESTS ===" -ForegroundColor Cyan

# 1. currencies.js
$currPath = (Resolve-Path "src\data\currencies.js").Path
$currRaw  = [System.IO.File]::ReadAllText($currPath)
$codes = [regex]::Matches($currRaw, 'code:\s*"([A-Z]{3})"') | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Check "currencies.js exists" (Test-Path $currPath) "$($codes.Count) codes"
Check "has 166 currencies" ($codes.Count -eq 166) "got $($codes.Count)"
Check "has POPULAR_CURRENCIES" ($currRaw -match 'POPULAR_CURRENCIES') ""
Check "has PAIR_PAGE_CURRENCIES" ($currRaw -match 'PAIR_PAGE_CURRENCIES') ""
Check "has getCurrency helper" ($currRaw -match 'export function getCurrency') ""
Check "has formatCurrencyAmount" ($currRaw -match 'export function formatCurrencyAmount') ""

# 2. App.jsx routes
$appRaw = [System.IO.File]::ReadAllText((Resolve-Path "src\App.jsx").Path)
Check "App.jsx lazy CurrencyConverterPage" ($appRaw -match "CurrencyConverterPage = lazy") ""
Check "App.jsx lazy CurrencyPairPage" ($appRaw -match "CurrencyPairPage = lazy") ""
Check "App.jsx route /currency-converter" ($appRaw -match 'path="/currency-converter"') ""
Check "App.jsx route /currency/:pair" ($appRaw -match 'path="/currency/:pair"') ""

# 3. Page files
$ccPage = (Resolve-Path "src\pages\CurrencyConverterPage.jsx").Path
$cpPage = (Resolve-Path "src\pages\CurrencyPairPage.jsx").Path
$ccRaw = [System.IO.File]::ReadAllText($ccPage)
$cpRaw = [System.IO.File]::ReadAllText($cpPage)
Check "CurrencyConverterPage exists" (Test-Path $ccPage) ""
Check "CurrencyPairPage exists" (Test-Path $cpPage) ""
Check "CC has FAQ_SCHEMA" ($ccRaw -match 'FAQPage') ""
Check "CC has APP_SCHEMA" ($ccRaw -match 'WebApplication') ""
Check "CC has BreadcrumbList" ($ccRaw -match 'BreadcrumbList') ""
Check "Pair has FAQ_SCHEMA" ($cpRaw -match 'FAQPage') ""
Check "Pair has APP_SCHEMA" ($cpRaw -match 'WebApplication') ""
Check "Pair has parsePair function" ($cpRaw -match 'function parsePair') ""

# 4. Live component
$livePath = (Resolve-Path "src\components\live\CurrencyConverter.jsx").Path
$liveRaw = [System.IO.File]::ReadAllText($livePath)
Check "live imports currencies.js" ($liveRaw -match "../../data/currencies") ""
Check "live uses optgroup" ($liveRaw -match 'optgroup') ""
Check "live no hardcoded 20-array" (-not ($liveRaw -match "'USD','EUR','GBP'")) ""

# 5. Widget
$wPath = (Resolve-Path "src\components\widgets\CurrencyWidget.jsx").Path
$embedRaw = [System.IO.File]::ReadAllText((Resolve-Path "src\pages\EmbedPage.jsx").Path)
Check "CurrencyWidget exists" (Test-Path $wPath) ""
Check "EmbedPage imports CurrencyWidget" ($embedRaw -match 'CurrencyWidget') ""
Check "EmbedPage has case 'currency'" ($embedRaw -match "case 'currency'") ""

# 6. Sitemaps
$smIdx = [System.IO.File]::ReadAllText((Resolve-Path "public\sitemap-index.xml").Path)
$smCurPath = (Resolve-Path "public\sitemap-currency.xml").Path
$smCur = [System.IO.File]::ReadAllText($smCurPath)
$urlCount = ([regex]::Matches($smCur, '<loc>')).Count
Check "sitemap-index references sitemap-currency" ($smIdx -match 'sitemap-currency') ""
Check "sitemap-currency.xml exists" (Test-Path $smCurPath) "$urlCount URLs"
Check "sitemap-currency has 381 URLs" ($urlCount -eq 381) "got $urlCount"
Check "sitemap-currency has /currency-converter" ($smCur -match '/currency-converter<') ""
Check "sitemap-currency has /currency/usd-to-eur" ($smCur -match '/currency/usd-to-eur<') ""

# 7. Build output
$distIndex = Join-Path (Get-Location) 'dist\index.html'
Check "dist/index.html exists" (Test-Path $distIndex) ""
$distAssets = Get-ChildItem (Join-Path (Get-Location) 'dist\assets') -ErrorAction SilentlyContinue
Check "dist has CurrencyConverterPage chunk" (($distAssets | Where-Object { $_.Name -match 'CurrencyConverterPage' }).Count -gt 0) ""
Check "dist has CurrencyPairPage chunk" (($distAssets | Where-Object { $_.Name -match 'CurrencyPairPage' }).Count -gt 0) ""

# 8. Build sanity via Node
Write-Host "`n  Running Node parse check..." -ForegroundColor DarkGray
$nodeOut = node -e "import('./src/data/currencies.js').then(m=>{console.log('OK', m.CURRENCIES.length, m.POPULAR_CURRENCIES.length, m.PAIR_PAGE_CURRENCIES.length)}).catch(e=>{console.error('FAIL', e.message);process.exit(1)})" 2>&1
Check "Node parses currencies.js" ($nodeOut -match '^OK 166') "$nodeOut"

# Print all
$lines | ForEach-Object { Write-Host $_ }

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host " STATUS BLOCK - Currency Tests" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "  Pass: $pass" -ForegroundColor Green
Write-Host "  Fail: $fail" -ForegroundColor $(if ($fail -eq 0) { 'Green' } else { 'Red' })
Write-Host "  Total: $($pass + $fail)"
Write-Host "===========================================" -ForegroundColor Cyan