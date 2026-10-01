Set-Location "C:\Users\Superman\Documents\timegovern_Superman_2026-09-04_1530"
Write-Host "=== Testing all /time-in/:city routes against http://localhost:4173 ==="
$cRaw = Get-Content 'src\data\cities.js' -Raw
$slugs = [regex]::Matches($cRaw, "'([^']+)':\s*\{ name: '([^']+)'") | ForEach-Object { $_.Groups[1].Value }
Write-Host "Found $($slugs.Count) cities`n"
$ok=0; $bad=0
foreach ($s in $slugs) {
  try {
    $r = Invoke-WebRequest -Uri "http://localhost:4173/time-in/$s" -UseBasicParsing -TimeoutSec 5
    if ($r.StatusCode -eq 200) { Write-Host "  [OK]   /time-in/$s"; $ok++ }
    else { Write-Host "  [FAIL] /time-in/$s -> $($r.StatusCode)"; $bad++ }
  } catch {
    Write-Host "  [FAIL] /time-in/$s -> $($_.Exception.Message)"; $bad++
  }
}
Write-Host "`nPassed: $ok / $($slugs.Count)"
Write-Host "NOTE: 200 = SPA shell served. Real render check = open in browser." 