# TimeGovern - Sitemap Auto-Sync
# Reads all routes from App.jsx, adds any missing to sitemap.xml + SiteMap.jsx
$utf8 = New-Object System.Text.UTF8Encoding($false)
$app = [System.IO.File]::ReadAllText((Resolve-Path "src\App.jsx").Path)
$routes = @()
[regex]::Matches($app, '<Route\s+path="([^"]+)"\s+element=\{) | ForEach-Object { $routes += $_.Groups[1].Value }
$routes = $routes | Where-Object { $_ -notmatch ':' -and $_ -ne '/' -and $_ -notmatch '^/embed' -and $_ -notmatch '^(/auth|/reset|/my-|/settings|/compare-)' } | Select-Object -Unique
$today = Get-Date -Format "yyyy-MM-dd"
$addedSm = 0; $addedJsx = 0
$smPath = (Resolve-Path "public\sitemap.xml").Path
$sm = [System.IO.File]::ReadAllText($smPath)
foreach ($r in $routes) { if ($sm -notmatch [regex]::Escape("timegovern.com$r<")) { $entry = "  <url>`r`n    <loc>https://timegovern.com$r</loc>`r`n    <lastmod>$today</lastmod>`r`n    <changefreq>monthly</changefreq>`r`n    <priority>0.6</priority>`r`n  </url>`r`n"; $sm = $sm.Replace("</urlset>", $entry + "</urlset>"); $addedSm++ } }
if ($addedSm -gt 0) { [System.IO.File]::WriteAllText($smPath, $sm, $utf8) }
$jsxPath = (Resolve-Path "src\pages\SiteMap.jsx").Path
$jsx = [System.IO.File]::ReadAllText($jsxPath)
$entries = @(); [regex]::Matches($jsx, '\{\s*to:\s*"([^"]+)"') | ForEach-Object { $entries += $_.Groups[1].Value }
foreach ($r in $routes) { if ($entries -notcontains $r) { $label = ($r -replace '^/', '') -replace '-', ' '; $label = (Get-Culture).TextInfo.ToTitleCase($label); $jsx = $jsx.Replace("const pages = [`r`n", "const pages = [`r`n  { to: `"$r`", label: `"$label`" },`r`n"); $addedJsx++ } }
if ($addedJsx -gt 0) { [System.IO.File]::WriteAllText($jsxPath, $jsx, $utf8) }
Write-Host "  Routes checked: $($routes.Count)"
Write-Host "  Added to sitemap.xml: $addedSm"
Write-Host "  Added to SiteMap.jsx: $addedJsx"