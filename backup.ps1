# ============================================================
# backup.ps1 -- Smart TimeGovern backup with rotation + zip
# Usage: .\backup.ps1   OR   npm run backup
# ============================================================

$projectRoot = "C:\Users\Superman\Documents\timegovern_Superman_2026-09-04_1530"
$backupsRoot = Join-Path $projectRoot "_backups"
$maxBackups = 5
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$backupName = "backup_$timestamp"
$backupDir = Join-Path $backupsRoot $backupName
$zipPath = Join-Path $backupsRoot "$backupName.zip"

Write-Host ""
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host "  TIMEGOVERN BACKUP" -ForegroundColor Cyan
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host "  New backup: $backupName" -ForegroundColor Gray
Write-Host "  Keep last:  $maxBackups" -ForegroundColor Gray
Write-Host ""

if (-not (Test-Path $backupsRoot)) {
    New-Item -ItemType Directory -Path $backupsRoot -Force | Out-Null
    Write-Host "[1/5] Created _backups folder" -ForegroundColor Green
} else {
    Write-Host "[1/5] _backups folder exists" -ForegroundColor Gray
}

Write-Host ""
Write-Host "[2/5] Existing backups:" -ForegroundColor Yellow
$existing = Get-ChildItem $backupsRoot -Directory -ErrorAction SilentlyContinue | Sort-Object Name -Descending
if ($existing.Count -eq 0) {
    Write-Host "  (none)" -ForegroundColor DarkGray
} else {
    foreach ($b in $existing) {
        $size = [Math]::Round((Get-ChildItem $b.FullName -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB, 2)
        Write-Host "  $($b.Name)  ($size MB)" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "[3/5] Rotating old backups..." -ForegroundColor Yellow
$existing = Get-ChildItem $backupsRoot -Directory -ErrorAction SilentlyContinue | Sort-Object Name -Descending
if ($existing.Count -ge $maxBackups) {
    $toDelete = $existing | Select-Object -Skip ($maxBackups - 1)
    foreach ($old in $toDelete) {
        Write-Host "  Removing: $($old.Name)" -ForegroundColor Red
        Remove-Item $old.FullName -Recurse -Force -ErrorAction SilentlyContinue
        $oldZip = Join-Path $backupsRoot "$($old.Name).zip"
        if (Test-Path $oldZip) { Remove-Item $oldZip -Force -ErrorAction SilentlyContinue }
    }
} else {
    Write-Host "  Under limit - no rotation needed" -ForegroundColor Gray
}

Write-Host ""
Write-Host "[4/5] Creating backup: $backupName..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

$items = @(
    "src",
    "public",
    "index.html",
    "package.json",
    "package-lock.json",
    "vite.config.js",
    "tailwind.config.js",
    "postcss.config.js",
    "validate-icons.ps1",
    "test-sitemap.ps1",
    "backup.ps1",
    ".gitignore"
)

$copied = 0
foreach ($item in $items) {
    $src = Join-Path $projectRoot $item
    if (Test-Path $src) {
        $dest = Join-Path $backupDir $item
        if (Test-Path $src -PathType Container) {
            Copy-Item $src $dest -Recurse -Force
            $n = (Get-ChildItem $src -Recurse -File -ErrorAction SilentlyContinue).Count
            Write-Host "  OK  $item ($n files)" -ForegroundColor Green
        } else {
            Copy-Item $src $dest -Force
            Write-Host "  OK  $item" -ForegroundColor Green
        }
        $copied++
    }
}

$fileCount = (Get-ChildItem $backupDir -Recurse -File).Count
$sizeMB = [Math]::Round((Get-ChildItem $backupDir -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB, 2)

$manifest = "Backup: $backupName" + [Environment]::NewLine + "Created: " + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + [Environment]::NewLine + "Files: $fileCount" + [Environment]::NewLine + "Size: $sizeMB MB"
[System.IO.File]::WriteAllText((Join-Path $backupDir "_MANIFEST.txt"), $manifest, [System.Text.Encoding]::UTF8)

Write-Host ""
Write-Host "[5/5] Creating ZIP..." -ForegroundColor Yellow
try {
    Compress-Archive -Path "$backupDir\*" -DestinationPath $zipPath -CompressionLevel Optimal -Force
    $zipMB = [Math]::Round((Get-Item $zipPath).Length / 1MB, 2)
    Write-Host "  OK  ZIP: $zipMB MB" -ForegroundColor Green
} catch {
    Write-Host "  WARN: ZIP failed - $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host "  BACKUP COMPLETE" -ForegroundColor Cyan
Write-Host "=============================================================" -ForegroundColor Cyan
Write-Host "  Folder: $backupDir" -ForegroundColor Green
Write-Host "  ZIP:    $zipPath" -ForegroundColor Green
Write-Host "  Files:  $fileCount" -ForegroundColor Gray
Write-Host "  Size:   $sizeMB MB" -ForegroundColor Gray
Write-Host ""

$allBackups = Get-ChildItem $backupsRoot -Directory -ErrorAction SilentlyContinue | Sort-Object Name -Descending
Write-Host "All backups kept ($($allBackups.Count)/$maxBackups):" -ForegroundColor Cyan
foreach ($b in $allBackups) {
    $sz = [Math]::Round((Get-ChildItem $b.FullName -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB, 2)
    Write-Host "  $($b.Name)  ($sz MB)" -ForegroundColor Gray
}

Write-Host ""