# TimeGovern — Project Handoff

Paste this file at the top of a new chat to bring the assistant up to speed.

## Current state
- Local path: C:\Users\Superman\Documents\timegovern_Superman_2026-09-04_1530
- Routes: 303
- Blog posts: 137
- Sitemap URLs: ~5,730
- Cities: 656
- Climate JSON files: 655
- Vite build: green (12-25s dev mode)
- Icon validator: ALL CLEAR
- Health check: runs Vite first, then counts routes
- Deployed: NO

## Live vs local
- timegovern.com: 1 SPA page with 13 query-string URLs (Google sees 1 URL)
- Local project: 303 real routes, ~5,730 sitemap URLs, zero deployed

## Pillar status
| Pillar | Status |
|---|---|
| world-clock | DONE |
| calendar | DONE (CAL-1) |
| astronomy | DONE (sun + moon for 656 cities) |
| weather | DONE (WX-1 through CLIM-5) |
| timers | DONE |
| live-data | DONE |
| widgets | DONE (118 embed cards) |
| services | Placeholder (directory of tools) |
| news | DONE |
| calculators | DONE (21 salary + 55 mortgage) |
| country-codes | DONE (118 pages + API + embeds) |
| company | DONE |
| flights | EXISTS (flights + flight-map) |
| car-rental | NOW WIRED (was orphaned CarBooking.jsx, now /cars) |

## Weather pillar detail
- /weather — hub with 656 cities
- /weather/:city — live conditions, 7-day forecast
- /weather/:city/climate — 30-year normals (static JSON from NASA POWER)
- /weather/:city/air — live AQI (Open-Meteo CAMS)
- /weather/:city/hourly — 48-hour forecast
- /weather/:city/historic — past 30 days + comparison to normals
- /weather/:city/vs/:city2 — 435 city-vs-city comparisons (30 hubs)
- 45 component weather pages (WeatherNav tabs, injected into 5 page types)

## Navigation (NAV-1, just completed)
- Header.jsx: 7 nav groups (Time, Weather, Calendar, Countries, Money, Tools, Travel), 34 links
- HomePage.jsx: 12 category cards (was 6)
- CarsPage.jsx: NEW — wraps CarBooking component, /cars route wired

## Recent stages
- CC-1 to CC-5: country codes (table, 118 pages, API, native names, 118 embeds)
- CAL-1: calendar pillar
- AST-1, AST-2, AST-3: astronomy from 45 → 656 cities
- WX-1: weather hub + city weather
- CLIM-1: climate pages (655 static JSON files)
- CLIM-2: air quality pages
- CLIM-3: hourly forecast pages
- CLIM-4: historic weather pages
- CLIM-5: city-vs-city comparisons
- NAV-1: header nav, homepage categories, car booking wiring

## Known gotchas (learned the hard way)
1. .NET [System.IO.File]::ReadAllText uses C:\Windows\system32 as CWD. Always use (Resolve-Path ...).Path
2. PowerShell .Replace() silently does nothing if anchor text doesn't match exactly
3. Never overwrite existing files without checking contents first
4. check-all.ps1 runs Vite first (patched). If it says VITE BUILD FAILED, fix that before anything else
5. icon auto-scan script was too aggressive — pulled "Icon", "Router", "Contact", "View" from .d.ts. Reverted. Only real additions: Grid3x3, Calendar
6. Open-Meteo archive API has tight daily quota — use NASA POWER instead for climate normals
7. validate-icons.ps1 can miss duplicate imports and non-existent lucide exports

## Workflow per stage
1. Backup to _backups/
2. Read files first (dump structure before patching)
3. Write files
4. Wire route in App.jsx
5. Sitemap + SiteMap.jsx
6. Verify (existence + content)
7. validate-icons.ps1 + check-all.ps1 (runs Vite guard)

## Remaining queued work
1. GEO-1: IP-based country detection (Cloudflare Pages Function + useGeo React hook)
2. CRON: daily sitemap lastmod updater (GitHub Actions)
3. CITIES-5K: expand beyond 656 → 5,000 cities (GeoNames cities5000)
4. Deploy to Cloudflare Pages
5. Search Console + Bing Webmaster submission
6. Ad monetization (AdSense first, Ezoic second, Mediavine Journey at 1K sessions)
7. Ad placement: blog + calculator results only (NOT tool pages)

## Pending decisions
- Weather API commercial use: Open-Meteo free tier is non-commercial only. If running ads, either upgrade to Standard (~$29/mo) or switch to MET Norway (free, commercial OK). NASA POWER climate data is fine for commercial use.
- Real /services page offering (or keep as directory)
- When to expand cities

## File map (key files)
- src/App.jsx — all routes
- src/components/Header.jsx — top nav (7 groups)
- src/pages/HomePage.jsx — homepage with 12 categories
- src/components/CarBooking.jsx — car rental booking component (39KB)
- src/pages/CarsPage.jsx — /cars wrapper
- src/components/FlightBooking.jsx — flight booking
- src/pages/MyBookingsPage.jsx — shows both flight and car bookings
- src/data/countries.js — 118 countries
- src/data/astroCities.js — 656 cities with fact, climate, hemisphere
- src/data/weatherHubs.js — 30 hubs for city-vs-city
- src/lib/astronomyUtils.js — NOAA solar + moon
- src/lib/calendarUtils.js — ISO week math
- src/lib/weatherUtils.js — Open-Meteo client
- public/api/countries.json — country API
- public/api/climate/*.json — 655 climate files
- public/embed/country/*.html — 118 embed cards
- public/sitemap.xml — ~5,730 URLs
- scripts/fetch-climate.mjs — NASA POWER fetcher
- scripts/build-api.mjs, scripts/build-embeds.mjs
- check-all.ps1 — Vite guard + route count
- check-all-core.ps1 — original logic
- validate-icons.ps1 — icon import checker
- HANDOFF.md — this file

## Standing rule for assistant
At end of every response, state estimated context usage:
- ~XX% full — status
- Recommend new chat at >80%