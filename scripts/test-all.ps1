# scripts/test-all.ps1 -- ASCII-only. PowerShell 5.1. Run: .\scripts\test-all.ps1
# Do NOT dot-source. Uses exit 0/1. Read-only.

$pass = 0
$fail = 0

function SayPass($m) { Write-Host "[PASS] $m" -ForegroundColor Green; $script:pass++ }
function SayFail($m) { Write-Host "[FAIL] $m" -ForegroundColor Red;   $script:fail++ }

$root = Split-Path -Parent $PSScriptRoot
$metaPath = Join-Path $root "src\data\countryMetadata.js"
$appPath  = Join-Path $root "src\App.jsx"

if (-not (Test-Path $metaPath)) { SayFail "countryMetadata.js not found at $metaPath"; exit 1 }
if (-not (Test-Path $appPath))  { SayFail "App.jsx not found at $appPath";           exit 1 }

$meta = [System.IO.File]::ReadAllText($metaPath)
$app  = [System.IO.File]::ReadAllText($appPath)

# 1. Entry count (top-level keys: two-space indent, 2 upper letters, colon, brace)
$n = ([regex]::Matches($meta, "(?m)^  [A-Z]{2}: \{")).Count
if ($n -eq 220) { SayPass "countryMetadata.js entries: $n" } else { SayFail "countryMetadata.js entries: $n (expected 220)" }

# 2. Null currencies
$a = ([regex]::Matches($meta, "(?m)^    currency: null")).Count
if ($a -eq 0) { SayPass "null currencies: 0" } else { SayFail "null currencies: $a" }

# 3. Null currency symbols
$b = ([regex]::Matches($meta, "(?m)^    currencySymbol: null")).Count
if ($b -eq 0) { SayPass "null currencySymbol: 0" } else { SayFail "null currencySymbol: $b" }

# 4. Named countries present (substring, case-sensitive)
$req = @("India","Pakistan","United States","United Kingdom","Germany","Nigeria","Chile")
$miss = @()
foreach ($c in $req) { if (-not $meta.Contains($c)) { $miss += $c } }
if ($miss.Count -eq 0) { SayPass "all 7 named countries present" } else { SayFail ("missing countries: " + ($miss -join ", ")) }

# 5. Calculator routes registered in App.jsx
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
foreach ($r in $routes) {
  if (-not $app.Contains('path="' + $r + '"')) { $mr += $r }
}
if ($mr.Count -eq 0) { SayPass "all 8 calculator routes registered" } else { SayFail ("missing routes: " + ($mr -join ", ")) }

# 6. Helper exports present
$mh = @()
if (-not $meta.Contains("export function getCountriesByRegion")) { $mh += "getCountriesByRegion" }
if (-not $meta.Contains("export const REGION_ORDER"))         { $mh += "REGION_ORDER" }
if ($mh.Count -eq 0) { SayPass "helpers exported: getCountriesByRegion, REGION_ORDER" } else { SayFail ("missing exports: " + ($mh -join ", ")) }

# Summary
Write-Host ""
Write-Host ("Summary: $pass passed, $fail failed")
if ($fail -gt 0) { exit 1 }
exit 0