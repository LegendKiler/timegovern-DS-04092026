# check-all.ps1 - wrapper
# Runs Vite build FIRST. If it fails, the health check aborts with a clear error.
# Delegates to check-all-core.ps1 for the route/post counting.

Write-Host ""
Write-Host "--- VITE BUILD GUARD ---" -ForegroundColor Cyan
Remove-Item "node_modules\.vite" -Recurse -Force -ErrorAction SilentlyContinue
$viteOut = & npx vite build --mode development 2>&1 | Out-String

if ($viteOut -notmatch 'built in') {
  Write-Host ""
  Write-Host "*** VITE BUILD FAILED - HEALTH CHECK ABORTED ***" -ForegroundColor Red
  Write-Host ""
  $viteOut -split "`n" | Where-Object { $_ -match 'error|ERROR|is not exported|already been declared|Transform failed|RollupError' } | Select-Object -First 5 | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
  Write-Host ""
  Write-Host "  Fix the build error, then re-run check-all.ps1" -ForegroundColor DarkYellow
  Write-Host ""
  exit 1
}

$time = [regex]::Match($viteOut, 'built in ([\d.]+)s').Groups[1].Value
Write-Host "  [OK] Vite build: $time s" -ForegroundColor Green
Write-Host ""

# Delegate to core
& "$PSScriptRoot\check-all-core.ps1"