param([string]$Mode='preview', [int]$Port=4173)
$ErrorActionPreference='Continue'
$pass=0; $fail=0

function OK($m){$script:pass++; Write-Host "  [PASS] $m" -ForegroundColor Green}
function NO($m){$script:fail++; Write-Host "  [FAIL] $m" -ForegroundColor Red}
function IN($m){Write-Host "  $m" -ForegroundColor Gray}

Write-Host "`n=== 1 / BUILD ===" -ForegroundColor Cyan
if($Mode -ne 'static'){
  $o = & npx vite build --mode development 2>&1
  if($o -match 'built in'){OK "Build OK"} else {NO "Build failed"; $o|Select-Object -Last 10|%{IN $_}; exit 1}
}

Write-Host "`n=== 2 / DIST FILES ===" -ForegroundColor Cyan
foreach($f in 'dist\index.html','dist\sitemap.xml','dist\robots.txt','dist\api\countries.json','dist\api\countries.csv'){
  if(Test-Path $f){OK "$f"} else {NO "$f missing"}
}
$js = (Get-ChildItem 'dist\assets' -Filter '*.js' -ErrorAction SilentlyContinue).Count
$css = (Get-ChildItem 'dist\assets' -Filter '*.css' -ErrorAction SilentlyContinue).Count
OK "$js JS chunks, $css CSS files"

Write-Host "`n=== 3 / DATA ===" -ForegroundColor Cyan
$sm = [IO.File]::ReadAllText((Resolve-Path 'dist\sitemap.xml').Path)
$u = ([regex]::Matches($sm,'<url>')).Count
$cu = ([regex]::Matches($sm,'/country-codes/[a-z]{2}<')).Count
OK "Sitemap: $u URLs ($cu country URLs)"
$j = [IO.File]::ReadAllText((Resolve-Path 'dist\api\countries.json').Path) | ConvertFrom-Json
OK "API JSON: $($j.countries.Count) countries"

Write-Host "`n=== 4 / HTTP ===" -ForegroundColor Cyan
$base = if($Mode -eq 'dev'){'http://localhost:5173'} else {"http://localhost:$Port"}
$proc=$null
if($Mode -eq 'preview'){
  IN "Starting preview on port $Port..."
  $lf = "preview-test.log"
  Remove-Item $lf -Force -ErrorAction SilentlyContinue
  $proc = Start-Process cmd.exe -ArgumentList "/c npx vite preview --port $Port --strictPort > $lf 2>&1" -PassThru -WindowStyle Hidden
  for($i=0; $i -lt 20; $i++){
    Start-Sleep 1
    try{Invoke-WebRequest "$base/" -UseBasicParsing -TimeoutSec 2|Out-Null; break}catch{}
  }
}

$urls = '/','/country-codes','/country-codes/us','/country-codes/jp','/country-codes/gb','/country-codes/au','/api-docs','/salary','/salary/usa','/salary/uk','/salary/de','/salary/jp','/mortgage','/world-clock','/time-zone-converter','/meeting-planner','/blog','/sitemap','/api/countries.json','/api/countries.csv','/sitemap.xml','/robots.txt'
foreach($u in $urls){
  try{
    $r = Invoke-WebRequest "$base$u" -UseBasicParsing -TimeoutSec 10
    if($r.StatusCode -eq 200){OK $u} else {NO "$u returned $($r.StatusCode)"}
  }catch{NO "$u - $($_.Exception.Message)"}
}

if($proc){taskkill /F /T /PID $proc.Id 2>$null | Out-Null}

Write-Host "`n=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "  Mode: $Mode" -ForegroundColor Gray
Write-Host "  PASS: $pass   FAIL: $fail" -ForegroundColor $(if($fail -eq 0){'Green'} else {'Red'})
if($fail -eq 0){Write-Host "  *** ALL TESTS PASSED ***" -ForegroundColor Green; exit 0}
else {Write-Host "  *** $fail FAILURES ***" -ForegroundColor Red; exit 1}