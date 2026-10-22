# TimeGovern Supabase Weekly Check with Popup
$ref  = "fqcgsrmnuykyspgrquuj"
$anon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxY2dzcm1udXlreXNwZ3JxdXVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwMzYxMjAsImV4cCI6MjEwNDYxMjEyMH0.gy8PzrqWsW6bnn9StRffTVqwmvcsvNS0dnqK5zp5xyI"
$url  = "https://$ref.supabase.co/rest/v1/keepalive?select=*&limit=1"
$logFile = "$PSScriptRoot\..\supabase-check.log"

$wshell = New-Object -ComObject Wscript.Shell

try {
    $r = Invoke-WebRequest $url -UseBasicParsing -Headers @{ apikey = $anon; Authorization = "Bearer $anon" }
    $msg = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - SUCCESS: Supabase is ACTIVE (Status: $($r.StatusCode))"
    Add-Content -Path $logFile -Value $msg
    # Show success popup
    $wshell.Popup("Good news! Supabase is UP and running.`n`nPing successful.", 0, "TimeGovern: Supabase Check", 64) | Out-Null
} catch {
    $msg = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - FAILED: Supabase might be PAUSED! Error: $($_.Exception.Message)"
    Add-Content -Path $logFile -Value $msg
    # Show error popup
    $wshell.Popup("WARNING: Supabase might be paused or unreachable!`n`nError: $($_.Exception.Message)", 0, "TimeGovern: Supabase Check", 48) | Out-Null
}