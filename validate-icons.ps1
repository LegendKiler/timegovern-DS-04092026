# validate-icons.ps1
# Scans .jsx files for JSX components used but not imported

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$errors = @()
$checked = 0

$ignore = @(
    'Fragment','StrictMode','Suspense','Component','React',
    'div','span','main','nav','header','footer','section','article','aside',
    'button','input','form','label','select','option','textarea',
    'a','p','h1','h2','h3','h4','h5','h6','ul','ol','li','table','thead','tbody','tr','td','th',
    'svg','path','circle','line','polyline','polygon','g','defs','use','rect','text','tspan',
    'iframe','video','audio','canvas','img','br','hr'
)

$files = Get-ChildItem -Path (Join-Path $root "src") -Filter "*.jsx" -Recurse | Where-Object { $_.FullName -notmatch '\\src\\src\\' }

foreach ($file in $files) {
    $checked++
    $content = Get-Content $file.FullName -Raw
    $imported = @()

    # Named imports
    $m1 = [regex]::Matches($content, 'import\s+(?:(\w+)\s*,\s*)?\{([^}]+)\}\s+from')
    foreach ($m in $m1) {
        if ($m.Groups[1].Success) { $imported += $m.Groups[1].Value.Trim() }
        foreach ($id in $m.Groups[2].Value -split ',') {
            $clean = ($id -split '\s+as\s+')[-1].Trim()
            if ($clean) { $imported += $clean }
        }
    }

    # Namespace imports
    $m2 = [regex]::Matches($content, 'import\s+\*\s+as\s+(\w+)\s+from')
    foreach ($m in $m2) { $imported += $m.Groups[1].Value }

    # Default imports
    $m3 = [regex]::Matches($content, 'import\s+(\w+)\s+from')
    foreach ($m in $m3) { $imported += $m.Groups[1].Value }

    # Local defs
    $localDefs = @()
    $localDefs += [regex]::Matches($content, '(?:function|const|let|var|class)\s+([A-Z]\w*)') | ForEach-Object { $_.Groups[1].Value }

    # JSX usages
    $usages = [regex]::Matches($content, '<([A-Z][a-zA-Z0-9_]*)\b') | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique

    foreach ($usage in $usages) {
        if ($ignore -contains $usage) { continue }
        if ($imported -contains $usage) { continue }
        if ($localDefs -contains $usage) { continue }
        $rel = $file.FullName.Replace($root + "\", "")
        $errors += "$rel : <$usage /> used but not imported"
    }
}

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  ICON VALIDATOR - scanned $checked files" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

if ($errors.Count -eq 0) {
    Write-Host "  ALL CLEAR - no missing imports" -ForegroundColor Green
    exit 0
} else {
    Write-Host "  FOUND $($errors.Count) MISSING IMPORTS:" -ForegroundColor Red
    foreach ($err in $errors) {
        Write-Host "    X $err" -ForegroundColor Red
    }
    exit 1
}