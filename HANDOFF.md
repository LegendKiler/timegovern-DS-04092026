# TimeGovern — HANDOFF

## Current state
- HEAD: (updated on each push)
- Branch: main, remote: LegendKiler/timegovern-DS-04092026

## GEO-1 status: DONE
- Worker /api/geo: live, tested
- src/hooks/useGeo.js: sessionStorage cache + browser tz fallback
- WorldClockPinned: auto-defaults primary city to geo timezone (one-time, respects localStorage override)
- Header: NO geo chip (competitor analysis: timeanddate/WTB/time.is all use location to set home city, not header display)

## Competitor research summary
- timeanddate.com: 5.25M ranked keywords, location -> home city
- worldtimebuddy.com: auto-detect home location
- time.is: 7M locations, location shown in page body
- 24timezones.com: 63M/mo, DR 77

## Next priorities
1. Programmatic city pages (/time-in/[city]) with WebApplication + FAQPage schema
2. Sitemap + canonical URLs
3. Deploy worker + CF route config

## Rules
- Backup before every write, to _backups/GEO-1_2026-09-30_1900/
- One script per step: backup -> patch -> verify -> commit -> push
- No `exit` in scripts (keeps shell open)
- ASCII-only strings in PowerShell patch scripts (avoid `''` and emoji)