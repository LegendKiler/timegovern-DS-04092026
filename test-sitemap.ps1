# ============================================================
# test-sitemap.ps1
# ============================================================

$projectRoot = "C:\Users\Superman\Documents\timegovern_Superman_2026-09-04_1530"
$sitemapPath = Join-Path $projectRoot "public\sitemap.xml"
$baseUrl = "http://localhost:5173"
$domainInSitemap = "https://timegovern.com"

Write-Host ""
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host "  SITEMAP TEST" -ForegroundColor Cyan
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host ""

try {
    Invoke-WebRequest -Uri $baseUrl -TimeoutSec 3 -UseBasicParsing -ErrorAction Stop | Out-Null
    Write-Host "  Vite running at $baseUrl" -ForegroundColor Green
} catch {
    Write-Host "  Vite NOT running. Start: npm run dev" -ForegroundColor Red
    exit 1
}

Write-Host "  Looking for sitemap at: $sitemapPath" -ForegroundColor Gray

if (-not (Test-Path $sitemapPath)) {
    Write-Host "  Sitemap not found at: $sitemapPath" -ForegroundColor Red
    exit 1
}

$xml = [System.IO.File]::ReadAllText($sitemapPath)
$matches = [regex]::Matches($xml, '<loc>([^<]+)</loc>')

if ($matches.Count -eq 0) {
    Write-Host "  No URLs found in sitemap" -ForegroundColor Red
    exit 1
}

Write-Host "  Found $($matches.Count) URLs in sitemap" -ForegroundColor Cyan
Write-Host ""

$pass = 0
$fail = 0
$failed = @()
$i = 0

foreach ($m in $matches) {
    $i++
    $fullUrl = $m.Groups[1].Value
    $path = $fullUrl -replace [regex]::Escape($domainInSitemap), ""
    if ([string]::IsNullOrWhiteSpace($path)) { $path = "/" }
    $localUrl = $baseUrl + $path
    try {
        $r = Invoke-WebRequest -Uri $localUrl -TimeoutSec 8 -UseBasicParsing -ErrorAction Stop
        if ($r.StatusCode -eq 200) {
            $pass++
            if ($i % 25 -eq 0) {
                Write-Host "  Progress: $i / $($matches.Count)" -ForegroundColor DarkGray
            }
        } else {
            Write-Host "  [$($r.StatusCode)]  $path" -ForegroundColor Yellow
            $fail++
            $failed += "$path [$($r.StatusCode)]"
        }
    } catch {
        Write-Host "  [ERR]  $path" -ForegroundColor Red
        $fail++
        $failed += "$path [ERR]"
    }
}

Write-Host ""
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host "  SUMMARY" -ForegroundColor Cyan
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host "  Sitemap URLs:  $($matches.Count)" -ForegroundColor Gray
Write-Host "  PASS:          $pass" -ForegroundColor Green
if ($fail -eq 0) {
    Write-Host "  FAIL:          $fail" -ForegroundColor Green
} else {
    Write-Host "  FAIL:          $fail" -ForegroundColor Red
}

if ($fail -eq 0) {
    Write-Host ""
    Write-Host "  ALL SITEMAP URLS RETURN 200" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "  Failed URLs:" -ForegroundColor Red
    $failed | ForEach-Object { Write-Host "    - $_" -ForegroundColor Red }
}

Write-Host ""
Write-Host "=============================================================" -ForegroundColor Cyan