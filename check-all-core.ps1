# TimeGovern - Comprehensive Health Check
$ErrorActionPreference = "Continue"
$root = (Get-Location).Path

function OK   { param($m) Write-Host "  [OK]   $m" -ForegroundColor Green }
function WARN { param($m) Write-Host "  [WARN] $m" -ForegroundColor Yellow }
function FAIL { param($m) Write-Host "  [FAIL] $m" -ForegroundColor Red }
function Info { param($m) Write-Host "         $m" -ForegroundColor DarkGray }

$issues = @()
$warnings = @()

Write-Host ""
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host "  TIMEGOVERN HEALTH CHECK" -ForegroundColor Cyan
Write-Host ("  " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss")) -ForegroundColor DarkCyan
Write-Host ("=" * 60) -ForegroundColor Cyan

# ============ 1) ROUTES ============
Write-Host ""
Write-Host "1) ROUTES (App.jsx)" -ForegroundColor Yellow

$appPath = Join-Path $root "src\App.jsx"
$routes = @()
$imports = @{}
$componentFiles = @{}

if (-not (Test-Path $appPath)) {
    FAIL "src\App.jsx not found"
    $issues += "App.jsx missing"
} else {
    $app = [System.IO.File]::ReadAllText($appPath)
    [regex]::Matches($app, "import\s+(\w+)\s+from\s+'([^']+)'") | ForEach-Object {
        $imports[$_.Groups[1].Value] = $_.Groups[2].Value
    }
        # Also match lazy-loaded imports: const X = lazy(() => import('...'))
        [regex]::Matches($app, "const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\(['""]([^'""]+)['""]\)\)") | ForEach-Object {
            $imports[$_.Groups[1].Value] = $_.Groups[2].Value
        }
    [regex]::Matches($app, '<Route\s+path="([^"]+)"\s+element=\{<(\w+)') | ForEach-Object {
        $routes += [pscustomobject]@{ Path = $_.Groups[1].Value; Comp = $_.Groups[2].Value }
    }
    Write-Host "  Total routes: $($routes.Count)" -ForegroundColor Gray
    Write-Host ""
    foreach ($r in $routes) {
        $src = $imports[$r.Comp]
        $fileExists = $false
        $resolvedPath = $null
        if ($src) {
            if ($src -like "@/*") { $rel = "src\" + $src.Substring(2) }
            elseif ($src -like "./*") { $rel = "src\" + ($src -replace '^\./', '') }
            elseif ($src -like "../*") { $rel = "src\" + ($src -replace '^\.\./', '') }
            else { $rel = $src }
            foreach ($ext in @("", ".jsx", ".js", ".tsx", ".ts")) {
                $cand = Join-Path $root ($rel + $ext)
                if (Test-Path $cand) { $fileExists = $true; $resolvedPath = $cand; break }
            }
        }
        if (-not $fileExists) {
            FAIL ("{0,-48} -> {1}" -f $r.Path, $r.Comp)
            $issues += "Route $($r.Path) file missing"
        } else {
            OK ("{0,-48} -> {1}" -f $r.Path, $r.Comp)
            $componentFiles[$r.Comp] = $resolvedPath
        }
    }
    $ob = ([regex]::Matches($app, "\{")).Count
    $cb = ([regex]::Matches($app, "\}")).Count
    Write-Host ""
    if ($ob -eq $cb) { OK "App.jsx braces: $ob / $cb" }
    else { FAIL "App.jsx braces: $ob / $cb"; $issues += "App.jsx brace mismatch" }
}

# ============ 2) NAV LINKS ============
Write-Host ""
Write-Host "2) NAV LINKS (Header.jsx)" -ForegroundColor Yellow

$headerPath = Join-Path $root "src\components\Header.jsx"
$navLinks = @()

if (-not (Test-Path $headerPath)) {
    WARN "Header.jsx not found"
    $warnings += "Header.jsx missing"
} else {
    $header = [System.IO.File]::ReadAllText($headerPath)
    [regex]::Matches($header, '<Link\s+to="([^"]+)"') | ForEach-Object {
        $navLinks += $_.Groups[1].Value
    }
    $navLinks = $navLinks | Select-Object -Unique
    Write-Host "  Total nav links: $($navLinks.Count)" -ForegroundColor Gray
    Write-Host ""
    $routePaths = $routes | ForEach-Object { $_.Path }
    foreach ($l in $navLinks) {
        if ($routePaths -contains $l) { OK $l }
        else { WARN "$l (no matching route)"; $warnings += "Nav $l no route" }
    }
    $ob = ([regex]::Matches($header, "\{")).Count
    $cb = ([regex]::Matches($header, "\}")).Count
    Write-Host ""
    if ($ob -eq $cb) { OK "Header.jsx braces: $ob / $cb" }
    else { FAIL "Header.jsx braces: $ob / $cb"; $issues += "Header brace mismatch" }
}

# ============ 3) SITEMAP.XML ============
Write-Host ""
Write-Host "3) SITEMAP.XML" -ForegroundColor Yellow

$smPath = Join-Path $root "public\sitemap.xml"
if (-not (Test-Path $smPath)) {
    FAIL "sitemap.xml missing"
    $issues += "sitemap.xml missing"
} else {
    $sm = [System.IO.File]::ReadAllText($smPath)
    $smUrls = @()
    [regex]::Matches($sm, '<loc>([^<]+)</loc>') | ForEach-Object {
        $smUrls += ($_.Groups[1].Value -replace '^https?://[^/]+', '')
    }
    $urlOpen  = ([regex]::Matches($sm, '<url>')).Count
    $urlClose = ([regex]::Matches($sm, '</url>')).Count
    $setOpen  = ([regex]::Matches($sm, '<urlset')).Count
    $setClose = ([regex]::Matches($sm, '</urlset>')).Count
    Write-Host "  URLs: $($smUrls.Count) | <url> $urlOpen / </url> $urlClose | urlset $setOpen / $setClose" -ForegroundColor Gray
    if ($urlOpen -eq $urlClose -and $setOpen -eq $setClose) { OK "XML well-formed" }
    else { FAIL "XML tags unbalanced"; $issues += "sitemap malformed" }
    $missing = @()
    foreach ($r in $routes) {
        if ($r.Path -match ':' -or $r.Path -eq '/' -or $r.Path -match '^/embed') { continue }
        if ($r.Path -match '^(/auth|/reset|/my-|/settings|/compare-)') { continue }
        if ($smUrls -notcontains $r.Path) { $missing += $r.Path }
    }
    Write-Host ""
    if ($missing.Count -eq 0) { OK "All routes present in sitemap" }
    else {
        WARN "$($missing.Count) route(s) missing from sitemap:"
        foreach ($m in $missing) { Info $m }
        $warnings += "$($missing.Count) routes missing from sitemap"
    }
}

# ============ 4) SITEMAP.JSX ============
Write-Host ""
Write-Host "4) SiteMap.jsx" -ForegroundColor Yellow

$jsxPath = Join-Path $root "src\pages\SiteMap.jsx"
if (-not (Test-Path $jsxPath)) {
    WARN "SiteMap.jsx not found"
    $warnings += "SiteMap.jsx missing"
} else {
    $jsx = [System.IO.File]::ReadAllText($jsxPath)
    $entries = @()
    [regex]::Matches($jsx, '\{\s*to:\s*"([^"]+)"') | ForEach-Object {
        $entries += $_.Groups[1].Value
    }
    Write-Host "  Total entries: $($entries.Count)" -ForegroundColor Gray
    Write-Host ""
    $public = @('/news', '/sleep-debt-calculator', '/caffeine-calculator', '/blog/what-is-sleep-debt', '/blog/how-to-recover-from-sleep-debt', '/blog/sleep-debt-by-age')
    $missing = @()
    foreach ($p in $public) {
        if (($routes | Where-Object { $_.Path -eq $p }) -and ($entries -notcontains $p)) { $missing += $p }
    }
    if ($missing.Count -eq 0) { OK "Public routes present in HTML sitemap" }
    else {
        WARN "$($missing.Count) public route(s) missing:"
        foreach ($m in $missing) { Info $m }
        $warnings += "$($missing.Count) routes missing from SiteMap.jsx"
    }
    $ob = ([regex]::Matches($jsx, "\{")).Count
    $cb = ([regex]::Matches($jsx, "\}")).Count
    Write-Host ""
    if ($ob -eq $cb) { OK "SiteMap.jsx braces: $ob / $cb" }
    else { FAIL "SiteMap.jsx braces: $ob / $cb"; $issues += "SiteMap brace mismatch" }
}

# ============ 5) WORKER ============
Write-Host ""
Write-Host "5) WORKER (timegovern-news)" -ForegroundColor Yellow

$workerUrl = "https://timegovern-news.nadeem101.workers.dev"
try {
    $r = Invoke-WebRequest -Uri "$workerUrl/?category=general&limit=1&skipScrape=1" -TimeoutSec 20 -UseBasicParsing -ErrorAction Stop
    $json = $r.Content | ConvertFrom-Json
    if ($json.articles -and $json.articles.Count -gt 0) {
        OK "Worker responding: $($json.articles.Count) article(s)"
    } else {
        WARN "Worker responded but 0 articles"
        $warnings += "Worker returned 0 articles"
    }
} catch {
    FAIL "Worker unreachable: $($_.Exception.Message)"
    $issues += "Worker unreachable"
}

# ============ 6) KEY FILES ============
Write-Host ""
Write-Host "6) KEY FILES" -ForegroundColor Yellow

$keyFiles = @(
    "src\App.jsx", "src\main.jsx", "src\components\Header.jsx", "src\components\Footer.jsx",
    "src\components\SleepDebtCalculator.jsx", "src\components\CaffeineCalculator.jsx",
    "src\components\NewsFeed.jsx", "src\pages\HomePage.jsx", "src\pages\NewsPage.jsx",
    "src\pages\SleepDebtPage.jsx", "src\pages\CaffeinePage.jsx", "src\pages\SiteMap.jsx",
    "public\sitemap.xml", "public\robots.txt", "worker.js"
)
foreach ($f in $keyFiles) {
    if (Test-Path (Join-Path $root $f)) { OK $f }
    else { FAIL "$f missing"; $issues += "$f missing" }
}

# ============ 7) BLOG ARTICLES ============
Write-Host ""
Write-Host "7) BLOG ARTICLES" -ForegroundColor Yellow

$blogRoutes = $routes | Where-Object { $_.Path -like '/blog/*' }
Write-Host "  Found $($blogRoutes.Count) blog route(s)" -ForegroundColor Gray
Write-Host ""

foreach ($r in $blogRoutes) {
    $comp = $r.Comp
    $file = $componentFiles[$comp]
    if (-not $file) { FAIL "$($r.Path) - file not resolved"; $issues += "Blog $($r.Path) file missing"; continue }
    $c = [System.IO.File]::ReadAllText($file)
    $hasFaq      = $c -match 'FAQ_SCHEMA'
    $hasArticle  = $c -match 'ARTICLE_SCHEMA'
    $ldCount     = ([regex]::Matches($c, 'application/ld\+json')).Count
    $hasCalcLink = ($c -match 'to="/[a-z0-9\-]+(-calculator|-timer|-generator|-converter|-quiz|-clock|-counter|-countdown|-tracker|-checker|-maker|-planner|-finder|-strip|-heatmap|-alignment)"') -or ($c -match '"/world-clock"') -or ($c -match '"/salary"') -or ($c -match '"/mortgage"') -or ($c -match 'to="/salary/') -or ($c -match 'to="/mortgage/') -or ($c -match 'to="/meeting-hour-strip"') -or ($c -match 'to="/meeting-planner"') -or ($c -match 'to="/team-alignment"') -or ($c -match 'to="/meeting-heatmap"')
    $crossLinks  = ([regex]::Matches($c, 'to="/blog/')).Count

    $stripped = $c -replace '<[^>]+>', ' '
    $stripped = $stripped -replace '[{}()\[\];]', ' '
    $stripped = $stripped -replace 'import[^\r\n]*', ' '
    $stripped = $stripped -replace 'export[^\r\n]*', ' '
    $words = @($stripped -split '\s+' | Where-Object { $_ -match '^[a-zA-Z][a-zA-Z\-]{3,}$' })
    $wordCount = $words.Count

    $problems = @()
    if (-not $hasFaq)      { $problems += "no FAQ_SCHEMA" }
    if (-not $hasArticle)  { $problems += "no ARTICLE_SCHEMA" }
    if ($ldCount -lt 2)    { $problems += "only $ldCount ld+json" }
    if (-not $hasCalcLink) { $problems += "no calculator link" }
    if ($crossLinks -lt 2) { $problems += "only $crossLinks cross-links" }

    if ($problems.Count -eq 0) { OK $r.Path }
    else {
        FAIL $r.Path
        foreach ($p in $problems) { Info "- $p" }
        $issues += "Blog $($r.Path): $($problems -join '; ')"
    }
    Info "FAQ:$hasFaq | Article:$hasArticle | ld+json:$ldCount | Calc:$hasCalcLink | Cross:$crossLinks | Words:~$wordCount"
}

# ============ 8) CALCULATOR PAGES ============
Write-Host ""
Write-Host "8) CALCULATOR PAGES" -ForegroundColor Yellow
Write-Host ""

$calcPaths = @('/sleep-debt-calculator', '/caffeine-calculator')

foreach ($calcPath in $calcPaths) {
    $r = $routes | Where-Object { $_.Path -eq $calcPath } | Select-Object -First 1
    if (-not $r) { FAIL "$calcPath not in routes"; continue }
    $file = $componentFiles[$r.Comp]
    if (-not $file) { FAIL "$calcPath - file not resolved"; continue }
    $c = [System.IO.File]::ReadAllText($file)
    $hasFaq  = $c -match 'FAQ_SCHEMA'
    $hasApp  = $c -match 'APP_SCHEMA'
    $ldCount = ([regex]::Matches($c, 'application/ld\+json')).Count
    $hasBlog = $c -match 'to="/blog/'

    $problems = @()
    if (-not $hasFaq)   { $problems += "no FAQ_SCHEMA" }
    if (-not $hasApp)   { $problems += "no APP_SCHEMA" }
    if ($ldCount -lt 2) { $problems += "only $ldCount ld+json" }

    if ($problems.Count -eq 0) { OK $calcPath }
    else {
        FAIL $calcPath
        foreach ($p in $problems) { Info "- $p" }
        $issues += "Calc $($calcPath): $($problems -join '; ')"
    }
    Info "FAQ:$hasFaq | App:$hasApp | ld+json:$ldCount | Blog:$hasBlog"
    if (-not $hasBlog) { $warnings += "$calcPath has no blog link" }
}

# ============ SUMMARY ============
Write-Host ""
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host "  SUMMARY" -ForegroundColor Cyan
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host ""
Write-Host "  Routes:       $($routes.Count)" -ForegroundColor Gray
Write-Host "  Nav links:    $($navLinks.Count)" -ForegroundColor Gray
Write-Host "  Blog posts:   $($blogRoutes.Count)" -ForegroundColor Gray
Write-Host "  Calculators:  $($calcPaths.Count)" -ForegroundColor Gray
Write-Host "  Issues:       $($issues.Count)" -ForegroundColor $(if ($issues.Count -eq 0) { 'Green' } else { 'Red' })
Write-Host "  Warnings:     $($warnings.Count)" -ForegroundColor $(if ($warnings.Count -eq 0) { 'Green' } else { 'Yellow' })
Write-Host ""
if ($issues.Count -gt 0) {
    Write-Host "  BLOCKING ISSUES:" -ForegroundColor Red
    foreach ($i in $issues) { Write-Host "    - $i" -ForegroundColor Red }
    Write-Host ""
}
if ($warnings.Count -gt 0) {
    Write-Host "  WARNINGS:" -ForegroundColor Yellow
    foreach ($w in $warnings) { Write-Host "    - $w" -ForegroundColor Yellow }
    Write-Host ""
}
if ($issues.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "  *** ALL GOOD ***" -ForegroundColor Green
} elseif ($issues.Count -eq 0) {
    Write-Host "  *** ALL GOOD (with warnings) ***" -ForegroundColor Yellow
} else {
    Write-Host "  *** FIX ISSUES ABOVE ***" -ForegroundColor Red
}
Write-Host ""

