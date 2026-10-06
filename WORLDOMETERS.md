# Worldometers Feature — Data Sources & Refresh Guide

This document explains the live-counter feature on TimeGovern: what it shows, where the data comes from, how often it refreshes, and how to update it.

## Live counters (14 total)

| Route | Metric | Rate | Source |
|---|---|---|---|
| `/world-population-clock` | World population | 2.22 / sec | UN World Population Prospects 2024 |
| `/births-clock` | Babies born today | 4.25 / sec | UN WPP 2024 |
| `/deaths-clock` | Deaths today | 1.97 / sec | UN WPP 2024 |
| `/co2-emissions-clock` | CO2 emissions | 1,186 t / sec | Global Carbon Budget 2024 |
| `/energy-use-clock` | Primary energy | 20,000 GJ / sec | IEA World Energy Outlook 2024 |
| `/food-waste-clock` | Food wasted | 33 t / sec | UNEP Food Waste Index 2024 |
| `/forest-loss-clock` | Forest loss | 0.32 ha / sec | FAO Global Forest Resources Assessment 2020 |
| `/plastic-produced-clock` | Plastic production | 13 t / sec | OECD Global Plastics Outlook 2024 |
| `/water-used-clock` | Freshwater withdrawn | 127,000 m³ / sec | FAO AQUASTAT 2024 |
| `/renewable-energy-clock` | Renewable energy | 2,860 GJ / sec | IEA Renewables 2024 |
| `/emails-sent-today` | Emails sent | 4,537,000 / sec | Radicati Group 2024-2028 |
| `/google-searches-today` | Google searches | 98,380 / sec | Internet Live Stats |
| `/gdp-clock` | Global GDP | $3,487,570 / sec | World Bank WDI 2024 |
| `/money-spent-online-today` | E-commerce spending | $199,770 / sec | Statista + UNCTAD 2024 |

Hub: `/worldometers` — lists all counters grouped by category.

## Country population pages (182 countries)

Route: `/population` (index) and `/population/:code` (one per country).

- **Bundled snapshot** in `src/data/countryPopulations.js` (World Bank SP.POP.TOTL, 2024 values)
- **Runtime refresh** via `src/lib/worldData.js` — fetches from World Bank API on each visit, caches for 24 hours in localStorage
- **Graceful fallback** to the bundled snapshot if the API is unreachable
- **Historical chart** (1960–latest) also fetched at runtime with the same cache policy

Cache keys are prefixed `tg_wd_v1_` in localStorage. To clear: `clearWorldDataCache()` exported from `worldData.js`.

## How to refresh the data

### Bundled snapshot (`countryPopulations.js`)

Run the W3 regeneration script (see `_backups/Worldometers_2026-10-04/`) — it queries World Bank for all 204 country codes, recomputes ranks, and rewrites the file. Quarterly is sufficient.

### Rate constants (`worldRates.js`)

These are hardcoded from the sources above. Refresh when a source publishes new annual data:

- **UN WPP** — every 2 years (next: 2026)
- **Global Carbon Budget** — annually (typically in November)
- **IEA WEO / Renewables** — annually (October–November)
- **FAO FRA** — every 5 years (next: 2025)
- **OECD Plastics Outlook** — every 2 years
- **World Bank WDI** — annually (typically in July)
- **Radicati Email Statistics** — annually
- **Internet Live Stats** — continuously updated

Update `ratePerSecond` in `src/data/worldRates.js` and the corresponding page explainer text.

## Key files

| File | Purpose |
|---|---|
| `src/data/worldRates.js` | Rate constants, source citations, historical series for all 14 metrics |
| `src/data/countryPopulations.js` | Bundled 182-country population snapshot |
| `src/lib/worldData.js` | Runtime fetch + localStorage cache + fallback |
| `src/hooks/useCountryPopulation.js` | React hook for country page (live + history) |
| `src/components/worldometers/LiveCounter.jsx` | Animated ticker primitive |
| `src/components/worldometers/TrendChart.jsx` | Recharts wrapper for historical line/area charts |
| `src/components/worldometers/MetricPage.jsx` | Layout wrapper — hero, counter, chart, FAQ, related |
| `src/pages/WorldometersHub.jsx` | The `/worldometers` hub |
| `src/pages/*ClockPage.jsx` | One wrapper per metric — ~30 lines, imports MetricPage |
| `src/pages/CountryPopulationPage.jsx` | Dynamic drill-down (182 URLs from one file) |
| `src/pages/PopulationByCountryPage.jsx` | `/population` index |

## SEO

- All 14 clock pages + `/worldometers` + 182 country pages + 10 blog posts are listed in sitemaps
- Sitemap index: `public/sitemap-index.xml` → 6 children
- JSON-LD on every page: FAQPage, WebApplication, BreadcrumbList
- 10 companion blog posts on `/blog/*` cross-link to their respective counters

## Data honesty

The counters show **smoothed averages** derived from annual totals, not live measurements. Nobody measures world population in real time. This is the same approach used by worldometers.info, the UN, and the US Census Bureau.

See `/blog/world-population-explained` for the full explanation.