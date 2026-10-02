# ============================================================
# TimeGovern Holidays - Stage 7 Comprehensive Test
# Verifies src/data/holidaysSupplement.js after 7a + 7b-1..4
# Usage: powershell -ExecutionPolicy Bypass -File scripts\test-holidays.ps1
# ============================================================

Set-Location (Resolve-Path "$PSScriptRoot\..").Path

$supPath = (Resolve-Path "src\data\holidaysSupplement.js").Path
$raw     = [System.IO.File]::ReadAllText($supPath, [System.Text.Encoding]::UTF8)
$lines   = $raw -split "`n"
$bytes   = [System.IO.File]::ReadAllBytes($supPath)

$script:pass = 0
$script:fail = 0
function Check($name, $cond) {
  if ($cond) { Write-Host "  [PASS] $name" -ForegroundColor Green; $script:pass++ }
  else       { Write-Host "  [FAIL] $name" -ForegroundColor Red;   $script:fail++ }
}

# ---------- 1. File integrity ----------
Write-Host "`n=== 1. FILE INTEGRITY ===" -ForegroundColor Cyan
Check "LF line endings (no CRLF)" (-not ($raw -match "`r`n"))
Check "No BOM (first byte = 47)"  ($bytes[0] -eq 47)
Check "Last line is '}'"          ($lines[-1] -eq '}')
Check "Total lines = 770"         ($lines.Count -eq 770)
Check "Has export const SUPPLEMENTAL_HOLIDAYS" ($raw -match "export const SUPPLEMENTAL_HOLIDAYS")

# ---------- 2. Country coverage ----------
Write-Host "`n=== 2. COUNTRY COVERAGE ===" -ForegroundColor Cyan
$expectedCCs = @('PK','IN','AE','SA','TH','MY','IL','LK','NP','KW','QA','OM','JO','LB','MM','LA')
$foundCCs = @()
for ($i = 0; $i -lt $lines.Count; $i++) {
  if ($lines[$i] -match "^\s{2}([A-Z]{2}):\s*\{\s*$") { $foundCCs += $Matches[1] }
}
Check "16 country keys found" ($foundCCs.Count -eq 16)
foreach ($cc in $expectedCCs) { Check "Country $cc present" ($foundCCs -contains $cc) }

# ---------- 3. Parse each country's block ----------
$data = @{}
for ($i = 0; $i -lt $lines.Count; $i++) {
  if ($lines[$i] -match "^\s{2}([A-Z]{2}):\s*\{\s*$") {
    $cc = $Matches[1]
    $blockEnd = $lines.Count - 1
    for ($j = $i+1; $j -lt $lines.Count; $j++) {
      if ($lines[$j] -match "^\s{2}[A-Z]{2}:\s*\{\s*$") { $blockEnd = $j; break }
    }
    $data[$cc] = @{ Start = $i; End = $blockEnd; Years = @{} }
    for ($k = $i; $k -lt $blockEnd; $k++) {
      if ($lines[$k] -match "^\s{6}(\d{4}):\s*\[") {
        $yr = [int]$Matches[1]; $cnt = 0
        for ($m = $k+1; $m -lt $blockEnd; $m++) {
          if ($lines[$m] -match "^\s{8}\{ date:") { $cnt++ }
          elseif ($lines[$m] -match "^\s{6}\]")    { break }
        }
        $data[$cc].Years[$yr] = $cnt
      }
    }
  }
}

# ---------- 4. Year x Country entry counts ----------
Write-Host "`n=== 4. YEAR x COUNTRY ENTRY COUNTS ===" -ForegroundColor Cyan
$expected = @{
  'PK'=@{2026=15;2027=15;2028=15}; 'IN'=@{2026=9;2027=9;2028=9}
  'AE'=@{2026=13;2027=13;2028=13}; 'SA'=@{2026=8;2027=8;2028=8}
  'TH'=@{2026=16;2027=16;2028=16}; 'MY'=@{2026=13;2027=13;2028=13}
  'IL'=@{2026=10;2027=10;2028=10}; 'LK'=@{2026=8;2027=8;2028=8}
  'NP'=@{2026=8;2027=8;2028=8};   'KW'=@{2026=11;2027=11;2028=11}
  'QA'=@{2026=11;2027=11;2028=11};'OM'=@{2026=12;2027=12;2028=12}
  'JO'=@{2026=15;2027=15;2028=15};'LB'=@{2026=20;2027=20;2028=20}
  'MM'=@{2026=15;2027=15;2028=15};'LA'=@{2026=8;2027=8;2028=8}
}
foreach ($cc in $expectedCCs) {
  if (-not $data.ContainsKey($cc)) { Check "$cc block exists" $false; continue }
  foreach ($yr in @(2026,2027,2028)) {
    $exp = $expected[$cc][$yr]
    $act = if ($data[$cc].Years.ContainsKey($yr)) { [int]$data[$cc].Years[$yr] } else { -1 }
    Check "$cc $yr = $exp entries (got $act)" ($act -eq $exp)
  }
}

# ---------- 5. True duplicate detection (same date AND same name) ----------
Write-Host "`n=== 5. NO TRUE DUPLICATE ENTRIES (date+name) ===" -ForegroundColor Cyan
$dupIssues = @()
foreach ($cc in $data.Keys) {
  $b = $data[$cc]
  for ($k = $b.Start; $k -lt $b.End; $k++) {
    if ($lines[$k] -match "^\s{6}(\d{4}):\s*\[") {
      $yr = $Matches[1]; $items = @()
      for ($m = $k+1; $m -lt $b.End; $m++) {
        if ($lines[$m] -match "^\s{8}\{ date: '([\d-]+)', name: (.+?), types:") {
          $items += "$($Matches[1])|$($Matches[2])"
        }
        elseif ($lines[$m] -match "^\s{6}\]") { break }
      }
      $dups = $items | Group-Object | Where-Object { $_.Count -gt 1 }
      foreach ($d in $dups) { $dupIssues += "$cc $yr -> $($d.Name) x$($d.Count)" }
    }
  }
}
Check "No same date+name repeated within country-year" ($dupIssues.Count -eq 0)
$dupIssues | ForEach-Object { Write-Host "     $_" -ForegroundColor Yellow }

# ---------- 5b. Same-date collisions (informational only) ----------
Write-Host "`n=== 5b. SAME-DATE COLLISIONS (informational, no fail) ===" -ForegroundColor Cyan
$collisions = @()
foreach ($cc in $data.Keys) {
  $b = $data[$cc]
  for ($k = $b.Start; $k -lt $b.End; $k++) {
    if ($lines[$k] -match "^\s{6}(\d{4}):\s*\[") {
      $yr = $Matches[1]; $dates = @()
      for ($m = $k+1; $m -lt $b.End; $m++) {
        if ($lines[$m] -match "^\s{8}\{ date: '([\d-]+)'") { $dates += $Matches[1] }
        elseif ($lines[$m] -match "^\s{6}\]") { break }
      }
      $dups = $dates | Group-Object | Where-Object { $_.Count -gt 1 }
      foreach ($d in $dups) { $collisions += "$cc $yr -> $($d.Name) (2 distinct holidays share this date)" }
    }
  }
}
if ($collisions.Count -eq 0) {
  Write-Host "  (none)" -ForegroundColor Green
} else {
  $collisions | ForEach-Object { Write-Host "  [INFO] $_" -ForegroundColor Yellow }
}

# ---------- 6. Date validity ----------
Write-Host "`n=== 6. DATE VALIDITY ===" -ForegroundColor Cyan
$badDates = @()
foreach ($line in $lines) {
  if ($line -match "\{ date: '([\d-]+)'") {
    $d = $Matches[1]
    if ($d -match "^(\d{4})-(\d{2})-(\d{2})$") {
      $mo = [int]$Matches[2]; $dy = [int]$Matches[3]
      if ($mo -lt 1 -or $mo -gt 12 -or $dy -lt 1 -or $dy -gt 31) { $badDates += "range: $d" }
    } else { $badDates += "malformed: $d" }
  }
}
Check "All dates valid (month 01-12, day 01-31)" ($badDates.Count -eq 0)
$badDates | Select-Object -First 5 | ForEach-Object { Write-Host "     $_" -ForegroundColor Yellow }

# ---------- 7. Entry year matches block year ----------
Write-Host "`n=== 7. ENTRY YEAR MATCHES BLOCK YEAR ===" -ForegroundColor Cyan
$mismatch = @()
foreach ($cc in $data.Keys) {
  $b = $data[$cc]
  for ($k = $b.Start; $k -lt $b.End; $k++) {
    if ($lines[$k] -match "^\s{6}(\d{4}):\s*\[") {
      $yr = $Matches[1]
      for ($m = $k+1; $m -lt $b.End; $m++) {
        if ($lines[$m] -match "^\s{8}\{ date: '(\d{4})-\d{2}-\d{2}'") {
          if ($Matches[1] -ne $yr) { $mismatch += "$cc block $yr contains date from $($Matches[1])" }
        }
        elseif ($lines[$m] -match "^\s{6}\]") { break }
      }
    }
  }
}
Check "Every entry's date year = block year" ($mismatch.Count -eq 0)
$mismatch | Select-Object -First 5 | ForEach-Object { Write-Host "     $_" -ForegroundColor Yellow }

# ---------- 8. Spot checks ----------
Write-Host "`n=== 8. SPOT CHECKS (16 sample dates across all patches) ===" -ForegroundColor Cyan
$spots = @(
  @{D="QA 2026 National Day";      P="2026-12-18', name: 'National Day'"},
  @{D="QA 2028 National Sports";   P="2028-02-08', name: 'National Sports Day'"},
  @{D="OM 2027 Renaissance Day";   P="2027-07-23', name: 'Renaissance Day'"},
  @{D="JO 2028 Easter Sunday";     P="2028-04-23', name: 'Easter Sunday'"},
  @{D="LB 2028 Armenian Orthodox"; P="2028-01-06', name: 'Armenian Orthodox Christmas'"},
  @{D="MM 2027 Tazaungmon";        P="2027-11-13', name: 'Tazaungmon Full Moon'"},
  @{D="LA 2028 National Day";      P="2028-12-02', name: 'National Day'"},
  @{D="PK 2028 Eid Fitr D3";       P="2028-02-29', name: 'Eid-ul-Fitr \(Day 3\)'"},
  @{D="AE 2027 Arafat Day";        P="2027-05-16', name: 'Arafat Day'"},
  @{D="SA 2028 Eid Adha D3";       P="2028-05-07', name: 'Eid al-Adha \(Day 3\)'"},
  @{D="TH 2028 Makha Bucha";       P="2028-02-10', name: 'Makha Bucha'"},
  @{D="MY 2028 Deepavali";         P="2028-10-17', name: 'Deepavali'"},
  @{D="IL 2028 Shemini Atzeret";   P="2028-10-12', name: 'Shemini Atzeret'"},
  @{D="LK 2028 Mahasivarathri";    P="2028-02-24', name: 'Mahasivarathri Day'"},
  @{D="NP 2028 Dashain";           P="2028-09-27', name: 'Dashain"},
  @{D="KW 2028 Eid Fitr D3";       P="2028-02-29', name: 'Eid al-Fitr \(Day 3\)'"}
)
foreach ($s in $spots) { Check $s.D ($raw -match $s.P) }

# ---------- 9. Runtime check (optional) ----------
Write-Host "`n=== 9. RUNTIME (skipped if preview off) ===" -ForegroundColor Cyan
$listening = $false
try { $null = Get-NetTCPConnection -LocalPort 4173 -State Listen -ErrorAction Stop; $listening = $true } catch { }
if ($listening) {
  $routes = @('/holidays','/holidays/QA/2026','/holidays/QA/2028','/holidays/OM/2027',
              '/holidays/JO/2028','/holidays/LB/2028','/holidays/MM/2027','/holidays/LA/2028')
  foreach ($r in $routes) {
    try {
      $resp = Invoke-WebRequest "http://localhost:4173$r" -UseBasicParsing -TimeoutSec 5
      Check "GET $r -> 200" ($resp.StatusCode -eq 200)
    } catch { Check "GET $r -> 200" $false }
  }
} else {
  Write-Host "  [SKIP] preview not running on 4173 (start with 'npm run preview' to include)" -ForegroundColor Yellow
}

# ---------- Summary ----------
Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host ("  PASSED : {0}" -f $script:pass) -ForegroundColor Green
Write-Host ("  FAILED : {0}" -f $script:fail) -ForegroundColor $(if ($script:fail -eq 0) { 'Green' } else { 'Red' })
Write-Host "============================================" -ForegroundColor Cyan
if ($script:fail -eq 0) {
  Write-Host "  *** ALL CHECKS PASSED - Stage 7 verified ***" -ForegroundColor Green
} else {
  Write-Host "  *** SOME CHECKS FAILED - review above ***" -ForegroundColor Red
}