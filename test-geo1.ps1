Set-Location "C:\Users\Superman\Documents\timegovern_Superman_2026-09-04_1530"
$pass=0; $fail=0
function T($n,$c){ if($c){$script:pass++;Write-Host "  [PASS] $n"}else{$script:fail++;Write-Host "  [FAIL] $n"} }

Write-Host "=== GEO-1 test suite ==="
$w = Get-Content 'worker.js' -Raw
$g = Get-Content 'src\hooks\useGeo.js' -Raw
$h = Get-Content 'src\components\Header.jsx' -Raw
$p = Get-Content 'src\components\WorldClockPinned.jsx' -Raw

T "1 worker has /api/geo" ($w -match '/api/geo')
T "2 useGeo exports hook" ($g -match 'export function useGeo')
T "3 useGeo caches sessionStorage" ($g -match 'sessionStorage')
T "4 useGeo browser tz fallback" ($g -match 'Intl.DateTimeFormat\(\).resolvedOptions')
T "5 Header has no chip" (-not ($h -match 'countryToFlag'))
T "6 WCP imports useGeo" ($p -match "useGeo.*from '\.\./hooks/useGeo'")
T "7 WCP respects override" ($p -match 'customizedRef\.current\) return')
T "8 WCP matches tz" ($p -match 'CITY_LIST\.find\(c => c\.tz === geo\.timezone\)')

Write-Host "`nPassed: $pass / 8"
if ($fail -eq 0) { Write-Host "ALL PASS" -ForegroundColor Green }