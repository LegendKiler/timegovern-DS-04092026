import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// ============================================================
// PART 1: BY-YEAR METRICS (5) - hub + detail each
// ============================================================
const byYear = [
  {
    slug: "gdp-by-year", hubComp: "WorldGdpByYearPage", detailComp: "WorldGdpYearPage",
    dataFile: "worldGdpByYear", dataExport: "WORLD_GDP_BY_YEAR", getter: "getGdpForYear",
    label: "World GDP", labelLong: "World GDP by Year",
    icon: "DollarSign",
    color: { grad: "from-emerald-950 via-teal-950 to-slate-950", primary: "emerald-300", link: "emerald", accent: "emerald-500", alert: "emerald" },
    unitLong: "USD (trillions)", unitShort: "T",
    valueShort: "v => '$' + (v / 1000).toFixed(1) + 'T'",
    valueLong: "v => '$' + (v / 1000).toFixed(2) + 'T'",
    yoyDelta: "g => (g >= 0 ? '+' : '') + g.toFixed(0) + 'B'",
    sourceIndicator: "NY.GDP.MKTP.CD",
    faq: [
      ["How far back does the data go?", "World Bank GDP data for the World aggregate starts in 1960. This page shows every year through the latest available."],
      ["What is the unit?", "Current US dollars, converted to trillions (1 trillion = 1000 billion) for readability. Not adjusted for inflation."],
      ["Why did GDP drop in some years?", "Global GDP fell sharply in 2009 (financial crisis) and 2020 (COVID pandemic), then rebounded. Nominal USD values also swing with exchange rates."],
      ["Where does the data come from?", "World Bank indicator NY.GDP.MKTP.CD (GDP, current US$), World aggregate."],
    ],
  },
  {
    slug: "deaths-by-year", hubComp: "WorldDeathsByYearPage", detailComp: "WorldDeathsYearPage",
    dataFile: "worldDeathsByYear", dataExport: "WORLD_DEATHS_BY_YEAR", getter: "getDeathsForYear",
    label: "World Deaths", labelLong: "World Deaths by Year",
    icon: "Heart",
    color: { grad: "from-slate-950 via-gray-950 to-black", primary: "slate-300", link: "slate", accent: "slate-500", alert: "slate" },
    unitLong: "deaths per year (persons)", unitShort: "deaths",
    valueShort: "v => (v / 1e6).toFixed(1) + 'M'",
    valueLong: "v => v.toLocaleString()",
    yoyDelta: "g => (g >= 0 ? '+' : '') + Math.round(g).toLocaleString()",
    sourceIndicator: "SP.POP.TOTL x SP.DYN.CDRT.IN",
    faq: [
      ["How are annual deaths calculated?", "World population each year multiplied by that year's crude death rate (per 1000). Formula: deaths = population x (death rate / 1000)."],
      ["Why did deaths spike in 2020-2021?", "The COVID-19 pandemic drove an estimated 5-6 million excess deaths globally, visible in the 2020-2021 data."],
      ["Where does the data come from?", "Derived from World Bank SP.POP.TOTL (population) and SP.DYN.CDRT.IN (crude death rate), World aggregates."],
    ],
  },
  {
    slug: "life-expectancy-by-year", hubComp: "WorldLifeExpectancyByYearPage", detailComp: "WorldLifeExpectancyYearPage",
    dataFile: "worldLifeExpectancyByYear", dataExport: "WORLD_LIFE_EXPECTANCY_BY_YEAR", getter: "getLifeExpectancyForYear",
    label: "World Life Expectancy", labelLong: "World Life Expectancy by Year",
    icon: "HeartPulse",
    color: { grad: "from-violet-950 via-purple-950 to-slate-950", primary: "violet-300", link: "violet", accent: "violet-500", alert: "violet" },
    unitLong: "years", unitShort: "yrs",
    valueShort: "v => v.toFixed(1) + ' yrs'",
    valueLong: "v => v.toFixed(2) + ' years'",
    yoyDelta: "g => (g >= 0 ? '+' : '') + g.toFixed(2) + ' yrs'",
    sourceIndicator: "SP.DYN.LE00.IN",
    faq: [
      ["How far back does the data go?", "World Bank life expectancy data for the World aggregate starts in 1960. This page shows every year through the latest available."],
      ["What is life expectancy at birth?", "The number of years a newborn would live if current age-specific mortality rates stayed constant through its lifetime."],
      ["Why did life expectancy dip in 2020?", "COVID-19 caused a measurable drop in 2020 and 2021 in most countries. The global average has been recovering since."],
      ["Where does the data come from?", "World Bank indicator SP.DYN.LE00.IN, World aggregate. Compiles UN World Population Prospects."],
    ],
  },
  {
    slug: "forest-by-year", hubComp: "WorldForestByYearPage", detailComp: "WorldForestYearPage",
    dataFile: "worldForestByYear", dataExport: "WORLD_FOREST_BY_YEAR", getter: "getForestForYear",
    label: "World Forest Area", labelLong: "World Forest Area by Year",
    icon: "Trees",
    color: { grad: "from-green-950 via-emerald-950 to-slate-950", primary: "green-300", link: "green", accent: "green-500", alert: "green" },
    unitLong: "million square kilometers", unitShort: "M km2",
    valueShort: "v => (v / 1e6).toFixed(1) + 'M km2'",
    valueLong: "v => (v / 1e6).toFixed(2) + ' million km2'",
    yoyDelta: "g => (g >= 0 ? '+' : '') + (g / 1e3).toFixed(0) + 'k km2'",
    sourceIndicator: "AG.LND.FRST.K2",
    faq: [
      ["How far back does the data go?", "World Bank forest data starts in 1992. This page shows every year through the latest available."],
      ["Is global forest area shrinking?", "Yes, slowly. The world loses roughly 40-50 thousand square kilometers of net forest per year, mostly in the tropics, despite gains in some temperate regions."],
      ["What counts as forest?", "Land spanning more than 0.5 hectares with trees taller than 5 meters and canopy cover above 10 percent. Excludes tree crops and urban parks."],
      ["Where does the data come from?", "World Bank indicator AG.LND.FRST.K2, World aggregate. Compiles FAO Global Forest Resources Assessment."],
    ],
  },
  {
    slug: "renewable-energy-by-year", hubComp: "WorldRenewableByYearPage", detailComp: "WorldRenewableYearPage",
    dataFile: "worldRenewableByYear", dataExport: "WORLD_RENEWABLE_BY_YEAR", getter: "getRenewableForYear",
    label: "World Renewable Energy", labelLong: "World Renewable Energy Share by Year",
    icon: "Leaf",
    color: { grad: "from-lime-950 via-green-950 to-slate-950", primary: "lime-300", link: "lime", accent: "lime-500", alert: "lime" },
    unitLong: "% of total energy", unitShort: "%",
    valueShort: "v => v.toFixed(1) + '%'",
    valueLong: "v => v.toFixed(2) + '%'",
    yoyDelta: "g => (g >= 0 ? '+' : '') + g.toFixed(2) + ' pts'",
    sourceIndicator: "EG.FEC.RNEW.ZS",
    faq: [
      ["What is this metric?", "Renewable energy consumption (including hydro, solar, wind, biomass, geothermal) as a percentage of total final energy consumption."],
      ["Why does the data stop at 2020?", "The World Bank compiles this indicator from IEA data with a multi-year lag. Newer years appear as the IEA publishes them."],
      ["Is the world on track for renewable targets?", "As of 2020 the share is around 20%. For climate targets, most scenarios require tripling this by 2050 - a pace the world has not yet achieved."],
      ["Where does the data come from?", "World Bank indicator EG.FEC.RNEW.ZS, World aggregate. Compiles IEA World Energy Balances."],
    ],
  },
];

// ---------- hub page template ----------
function hubPage(m) {
  const faqLines = m.faq.map(f => `  { q: ${JSON.stringify(f[0])}, a: ${JSON.stringify(f[1])} },`).join("\n");
  return `import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ${m.icon}, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { ${m.dataExport} } from '../data/${m.dataFile}'

const FAQ = [
${faqLines}
]
const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: ${JSON.stringify(m.labelLong)}, url: 'https://timegovern.com/${m.slug}' }

export default function ${m.hubComp}() {
  useEffect(() => {
    document.title = ${JSON.stringify(m.labelLong)} + ' (' + ${m.dataExport}[0].year + '-' + ${m.dataExport}[${m.dataExport}.length-1].year + ') | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', ${JSON.stringify(m.labelLong + ' historical data. Source: World Bank.')})
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])
  const reversed = [...${m.dataExport}].reverse()
  const min = ${m.dataExport}[0], max = ${m.dataExport}[${m.dataExport}.length-1]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br ${m.color.grad}" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-${m.color.primary}" />
              <span className="text-xs font-bold uppercase tracking-widest text-${m.color.badge || m.color.primary}">{${m.dataExport}.length} years</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <${m.icon} className="h-10 w-10 md:h-14 md:w-14 text-${m.color.primary}" />
              ${m.labelLong}
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Historical data for every year from {min.year} to {max.year}. Click any year for detail.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {reversed.map(r => (
            <Link key={r.year} to={'/${m.slug}/' + r.year} className="rounded-xl border border-border bg-card hover:border-${m.color.link}-400 p-3 transition-colors">
              <div className="text-xs text-muted-foreground tabular-nums">{r.year}</div>
              <div className="font-black tabular-nums text-lg">{(${m.valueShort})(r.value)}</div>
            </Link>
          ))}
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : ${JSON.stringify(m.labelLong)}} />
        </div>
      </div>
    </>
  )
}
`;
}

// ---------- detail page template ----------
function detailPage(m) {
  const faqLines = m.faq.map(f => `  { q: ${JSON.stringify(f[0])}, a: ${JSON.stringify(f[1])} },`).join("\n");
  return `import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ${m.icon}, ArrowLeft, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import TrendChart from '../components/worldometers/TrendChart'
import { setPageMeta } from '../lib/seo'
import { ${m.dataExport}, ${m.getter} } from '../data/${m.dataFile}'

export default function ${m.detailComp}() {
  const { year } = useParams()
  const data = useMemo(() => ${m.getter}(year), [year])
  const derived = useMemo(() => {
    if (!data) return null
    const idx = ${m.dataExport}.findIndex(r => r.year === data.year)
    const prev = idx > 0 ? ${m.dataExport}[idx-1] : null
    const next = idx < ${m.dataExport}.length-1 ? ${m.dataExport}[idx+1] : null
    const latest = ${m.dataExport}[${m.dataExport}.length-1]
    const yoy = prev ? ((data.value - prev.value) / prev.value) * 100 : null
    const growth = prev ? data.value - prev.value : null
    const shareOfLatest = latest.year !== data.year ? (data.value / latest.value) * 100 : 100
    return { prev, next, latest, yoy, growth, shareOfLatest }
  }, [data])
  const nearby = useMemo(() => {
    if (!data) return []
    const start = Math.max(${m.dataExport}[0].year, data.year - 10)
    const end = Math.min(${m.dataExport}[${m.dataExport}.length-1].year, data.year + 10)
    return ${m.dataExport}.filter(r => r.year >= start && r.year <= end)
  }, [data])
  useEffect(() => {
    if (!data) return
    document.title = ${JSON.stringify(m.label)} + ' in ' + data.year + ' | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', ${JSON.stringify(m.label + ' in ')} + data.year + ' was approximately ' + (${m.valueLong})(data.value) + '. Source: World Bank.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [data, derived])
  if (!data) return <Navigate to="/${m.slug}" replace />
  const FAQ = [
${faqLines}
  ]
  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/${m.slug}" className="hover:underline">${m.label}</Link>
          <span className="mx-1">/</span>
          <span>{data.year}</span>
        </nav>
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br ${m.color.grad}" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 flex items-center gap-4">
              <${m.icon} className="h-10 w-10 md:h-12 md:w-12 text-${m.color.primary}" />
              ${m.label} in {data.year}
            </h1>
            <div className="text-center mt-8">
              <div className="text-5xl md:text-7xl font-black tabular-nums tracking-tight">{(${m.valueShort})(data.value)}</div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-2">${m.unitLong}</div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          <Card><CardContent className="p-5 text-center">
            <div className="text-xs text-muted-foreground mb-1">Year-over-year change</div>
            <div className="text-2xl font-black tabular-nums">{derived.yoy != null ? (derived.yoy >= 0 ? '+' : '') + derived.yoy.toFixed(2) + '%' : 'n/a'}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            <div className="text-xs text-muted-foreground mb-1">Absolute change</div>
            <div className="text-2xl font-black tabular-nums">{derived.growth != null ? (${m.yoyDelta})(derived.growth) : 'n/a'}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            <div className="text-xs text-muted-foreground mb-1">Share of {derived.latest.year}</div>
            <div className="text-2xl font-black tabular-nums">{derived.shareOfLatest.toFixed(1)}%</div>
          </CardContent></Card>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">${m.label} around {data.year}</h2>
          <TrendChart history={nearby} projection={[]} height={320} />
        </div>
        <div className="flex justify-between items-center gap-3">
          {derived.prev ? <Link to={'/${m.slug}/' + derived.prev.year} className="inline-flex items-center gap-2 text-sm font-semibold text-${m.color.link}-600 dark:text-${m.color.link}-400 hover:underline"><ArrowLeft className="h-4 w-4" />{derived.prev.year}</Link> : <span />}
          {derived.next ? <Link to={'/${m.slug}/' + derived.next.year} className="inline-flex items-center gap-2 text-sm font-semibold text-${m.color.link}-600 dark:text-${m.color.link}-400 hover:underline">{derived.next.year}<ArrowRight className="h-4 w-4" /></Link> : <span />}
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground">
          Source: <a href="https://data.worldbank.org/indicator/${m.sourceIndicator}" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">World Bank ${m.sourceIndicator} ({data.year})</a>
        </div>
        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : ${JSON.stringify(m.label)} + ' in ' + data.year} />
        </div>
      </div>
    </>
  )
}
`;
}

for (const m of byYear) {
  writeFileSync(join(root, `src/pages/${m.hubComp}.jsx`), hubPage(m), "utf8");
  writeFileSync(join(root, `src/pages/${m.detailComp}.jsx`), detailPage(m), "utf8");
  console.log("  " + m.hubComp + " + " + m.detailComp);
}

// ============================================================
// PART 2: COUNTRY METRICS (2) - hub + detail + hook each
// ============================================================
const countryMetrics = [
  {
    slug: "gdp", listComp: "GdpByCountryPage", detailComp: "CountryGdpPage", hookName: "useCountryGdp",
    dataFile: "countryGdp", dataExport: "COUNTRY_GDP", totalExport: "TOTAL_WORLD_GDP", getter: "getCountryGdp",
    fetchFn: "fetchCountryGdp", historyFn: "fetchCountryGdpHistory",
    cacheKey: "gdp", cacheHistKey: "gdphist",
    label: "GDP", labelLong: "GDP by Country", nounForPage: "GDP",
    icon: "DollarSign", color: { grad: "from-emerald-950 via-teal-950 to-slate-950", primary: "emerald-300", link: "emerald", accent: "emerald-500" },
    unitShort: "bn USD", indicator: "NY.GDP.MKTP.CD",
    valueList: "v => '$' + v.toFixed(1) + 'B'",
    valueHero: "v => '$' + v.toFixed(2) + 'B'",
    valueFull: "v => '$' + (v * 1e9).toLocaleString('en-US')",
    listLabel: "Total world GDP", listTotal: "TOTAL_WORLD_GDP", listFormat: "(TOTAL_WORLD_GDP / 1000).toFixed(2) + ' trillion USD'",
    totalLabel: "World GDP", badgeWord: "countries",
    rankWord: "GDP", shareName: "GDP",
    perCapitaLabel: "GDP per capita",
    faq_hub: [
      ["How many countries are listed?", "All {N} countries with World Bank GDP data."],
      ["What is total global GDP?", "Approximately {T} trillion USD per year across all listed countries."],
      ["Which country has the largest GDP?", "The United States leads at ~$29 trillion, followed by China at ~$19 trillion, then Germany, Japan, and India."],
      ["What units are used?", "Billions of current US dollars, per the World Bank NY.GDP.MKTP.CD indicator. Not adjusted for inflation or purchasing power."],
    ],
    faq_detail: [
      ["What is the GDP of {COUNTRY}?", "Approximately ${value} billion USD, as of {YEAR}. Source: World Bank."],
      ["What is the world GDP rank of {COUNTRY}?", "Rank #{rank} out of {N} countries tracked."],
      ["What share of world GDP is {COUNTRY}?", "{share}% of the world total."],
    ],
  },
  {
    slug: "life-expectancy", listComp: "LifeExpectancyByCountryPage", detailComp: "CountryLifeExpectancyPage", hookName: "useCountryLifeExpectancy",
    dataFile: "countryLifeExpectancy", dataExport: "COUNTRY_LIFE_EXPECTANCY", totalExport: null, getter: "getCountryLifeExpectancy",
    fetchFn: "fetchCountryLifeExpectancy", historyFn: "fetchCountryLifeExpectancyHistory",
    cacheKey: "le", cacheHistKey: "lehist",
    label: "Life Expectancy", labelLong: "Life Expectancy by Country", nounForPage: "Life Expectancy",
    icon: "HeartPulse", color: { grad: "from-violet-950 via-purple-950 to-slate-950", primary: "violet-300", link: "violet", accent: "violet-500" },
    unitShort: "years", indicator: "SP.DYN.LE00.IN",
    valueList: "v => v.toFixed(1) + ' yrs'",
    valueHero: "v => v.toFixed(2) + ' yrs'",
    valueFull: "v => v.toFixed(2) + ' years'",
    listLabel: null, listTotal: null, listFormat: null,
    totalLabel: null, badgeWord: "countries",
    rankWord: "life expectancy", shareName: "life expectancy",
    perCapitaLabel: null,
    faq_hub: [
      ["How many countries are listed?", "All {N} countries with World Bank life expectancy data."],
      ["Which country has the highest life expectancy?", "Monaco leads at ~86.5 years, followed by San Marino, Hong Kong, Kuwait, and Switzerland."],
      ["What is life expectancy at birth?", "The number of years a newborn would live if current age-specific mortality rates stayed constant."],
      ["Where does the data come from?", "World Bank indicator SP.DYN.LE00.IN, which compiles UN World Population Prospects."],
    ],
    faq_detail: [
      ["What is the life expectancy in {COUNTRY}?", "Approximately {value} years, as of {YEAR}. Source: World Bank."],
      ["What is the world rank of {COUNTRY} for life expectancy?", "Rank #{rank} out of {N} countries tracked."],
      ["Where does the data come from?", "World Bank indicator SP.DYN.LE00.IN, compiling UN World Population Prospects."],
    ],
  },
];

// ---------- hook template ----------
function hookFile(m) {
  return `import { useEffect, useState, useMemo } from 'react'
import { ${m.getter}, ${m.dataExport} } from '../data/${m.dataFile}'
import { ${m.fetchFn}, ${m.historyFn}, getCacheStatus } from '../lib/worldData'

export function ${m.hookName}(code) {
  const bundled = useMemo(() => code ? ${m.getter}(code) : null, [code])
  const [live, setLive] = useState(null)
  const [status, setStatus] = useState('bundled')
  const [history, setHistory] = useState(null)
  const [historyStatus, setHistoryStatus] = useState('bundled')
  useEffect(() => {
    if (!code || !bundled) return
    let cancelled = false
    setStatus('loading')
    ${m.fetchFn}(code).then(result => {
      if (cancelled) return
      if (result && result.year >= bundled.year) { setLive(result); setStatus(result.source) }
      else setStatus('bundled')
    }).catch(() => { if (!cancelled) setStatus('bundled') })
    return () => { cancelled = true }
  }, [code, bundled])
  useEffect(() => {
    if (!code || !bundled) return
    let cancelled = false
    setHistoryStatus('loading')
    ${m.historyFn}(code).then(result => {
      if (cancelled) return
      if (result && result.points && result.points.length > 5) { setHistory(result.points); setHistoryStatus(result.source) }
      else setHistoryStatus('none')
    }).catch(() => { if (!cancelled) setHistoryStatus('none') })
    return () => { cancelled = true }
  }, [code, bundled])
  const merged = useMemo(() => {
    if (!bundled) return null
    if (live && live.year >= bundled.year) return { ...bundled, value: live.value, year: live.year, freshness: status }
    return { ...bundled, freshness: 'bundled' }
  }, [bundled, live, status])
  const cacheStatus = useMemo(() => code ? getCacheStatus('${m.cacheKey}_' + String(code).toUpperCase()) : null, [code, status])
  return { country: merged, status, cacheStatus, history, historyStatus, total: ${m.dataExport}.length }
}
`;
}

// ---------- country hub page ----------
function countryHubPage(m) {
  const faqLines = m.faq_hub.map(([q, a]) => `  { q: ${JSON.stringify(q)}, a: ${JSON.stringify(a).replace("{N}", m.dataExport + ".length").replace("{T}", m.totalExport ? "(TOTAL_WORLD_GDP/1000).toFixed(2)" : "''")} },`).join("\n");
  const totalLine = m.totalExport ? `export const ${m.listTotal} = ${m.totalExport}` : "";
  const totalDisplay = m.listTotal ? `\n        <div className="text-center text-xs text-muted-foreground">\n          Global total: <span className="font-bold text-foreground tabular-nums">{${m.listFormat}}</span>\n        </div>\n        ` : "";
  return `import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ${m.icon}, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { ${m.dataExport}${m.totalExport ? ", " + m.totalExport : ""} } from '../data/${m.dataFile}'
import { REGION_ORDER } from '../data/countryCodes'

const FAQ = [
${faqLines}
]
const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

export default function ${m.listComp}() {
  const byRegion = useMemo(() => {
    const out = {}
    for (const c of ${m.dataExport}) { if (!out[c.region]) out[c.region] = []; out[c.region].push(c) }
    return out
  }, [])
  const orderedRegions = useMemo(() => {
    const known = REGION_ORDER.filter(r => byRegion[r] && byRegion[r].length > 0)
    const extras = Object.keys(byRegion).filter(r => !known.includes(r))
    return [...known, ...extras]
  }, [byRegion])
  useEffect(() => {
    document.title = ${JSON.stringify(m.labelLong)} + ' - All ' + ${m.dataExport}.length + ' Countries Ranked | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', ${JSON.stringify(m.labelLong + " ranked by country. Source: World Bank.")})
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br ${m.color.grad}" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-${m.color.primary}" />
              <span className="text-xs font-bold uppercase tracking-widest text-${m.color.primary}">{${m.dataExport}.length} countries</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <${m.icon} className="h-10 w-10 md:h-14 md:w-14 text-${m.color.primary}" />
              ${m.labelLong}
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Every country ranked by ${m.label.toLowerCase()}, grouped by region.
            </p>
          </div>
        </div>${totalDisplay}
        {orderedRegions.map(region => (
          <div key={region}>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">{region}</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {byRegion[region].map(c => (
                <Link key={c.code} to={'/${m.slug}/' + c.code.toLowerCase()} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card hover:border-${m.color.link}-400 p-3 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-black text-muted-foreground tabular-nums shrink-0 w-8">#{c.rank}</span>
                    <span className="font-semibold text-sm truncate">{c.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums shrink-0">{(${m.valueList})(c.value)} <span className="text-muted-foreground/60">({c.year})</span></span>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : ${JSON.stringify(m.labelLong)}} />
        </div>
      </div>
    </>
  )
}
`;
}

// ---------- country detail page ----------
function countryDetailPage(m) {
  return `import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ${m.icon}, Sparkles, ArrowRight, Activity, BookOpen, RefreshCw, Database, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import TrendChart from '../components/worldometers/TrendChart'
import { setPageMeta } from '../lib/seo'
import { ${m.dataExport}${m.totalExport ? ", " + m.totalExport : ""} } from '../data/${m.dataFile}'
import { ${m.hookName} } from '../hooks/${m.hookName}'

export default function ${m.detailComp}() {
  const { code } = useParams()
  const { country, status, cacheStatus, history, historyStatus } = ${m.hookName}(code)
  const derived = useMemo(() => {
    if (!country) return null
    ${m.totalExport ? `return { worldShare: (country.value / ${m.totalExport}) * 100 }` : `return { worldShare: null }`}
  }, [country])
  const peers = useMemo(() => {
    if (!country) return []
    return ${m.dataExport}.filter(c => c.region === country.region && c.code !== country.code).slice(0, 6)
  }, [country])
  useEffect(() => {
    if (!country) return
    document.title = country.name + ' ${m.label} - Live Data & Trend | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Live ${m.label.toLowerCase()} for ' + country.name + '. Source: World Bank.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [country])
  if (!country) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <Card><CardContent className="p-8 text-center space-y-4">
          <AlertCircle className="h-10 w-10 text-amber-500 mx-auto" />
          <h1 className="text-2xl font-black">${m.label} data not available</h1>
          <p className="text-sm text-muted-foreground">The World Bank does not report ${m.label.toLowerCase()} for this country.</p>
          <Link to="/${m.slug}" className="inline-flex items-center gap-2 font-semibold text-${m.color.link}-600 dark:text-${m.color.link}-400 hover:underline">
            View all countries <ArrowRight className="h-4 w-4" />
          </Link>
        </CardContent></Card>
      </div>
    )
  }
  const freshnessLabel = { live: 'Live from World Bank', cache: 'Fresh from cache (24h)', loading: 'Updating...', bundled: 'Snapshot: ' + country.year }[status] || 'Snapshot: ' + country.year
  const freshnessIcon = (status === 'live' || status === 'cache') ? RefreshCw : Database
  const historyLabel = { live: 'History: live from World Bank', cache: 'History: cached', none: 'History: unavailable' }[historyStatus] || ''
  return (
    <>
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/${m.slug}" className="hover:underline">${m.label}</Link>
          <span className="mx-1">/</span>
          <span>{country.name}</span>
        </nav>
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br ${m.color.grad}" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-${m.color.primary}" />
              <span className="text-xs font-bold uppercase tracking-widest text-${m.color.primary}">{country.region}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 flex items-center gap-4">
              <${m.icon} className="h-10 w-10 md:h-12 md:w-12 text-${m.color.primary}" />
              {country.name} ${m.label}
            </h1>
            <div className="text-white/60 text-sm mb-8">Rank #{country.rank} in the world by ${m.label.toLowerCase()}</div>
            <div className="text-center">
              <div className="text-5xl md:text-7xl font-black tabular-nums tracking-tight">{(${m.valueHero})(country.value)}</div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-2">${m.unitShort} ({country.year})</div>
              <div className="inline-flex items-center gap-1.5 text-[11px] text-white/50 mt-3">
                {(() => { const I = freshnessIcon; return <I className="h-3 w-3" /> })()}
                <span>{freshnessLabel}</span>
              </div>
            </div>
          </div>
        </div>
        ${m.totalExport ? `<div className="grid md:grid-cols-2 gap-3">
          <Card><CardContent className="p-5 text-center">
            <Activity className="h-5 w-5 text-${m.color.accent} mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Full amount</div>
            <div className="text-2xl font-black tabular-nums">{(${m.valueFull})(country.value)}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            <BookOpen className="h-5 w-5 text-${m.color.accent} mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">World share</div>
            <div className="text-2xl font-black tabular-nums">{derived.worldShare.toFixed(2)}%</div>
          </CardContent></Card>
        </div>` : ``}
        {history && history.length > 5 && (
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">${m.label} history (to {history[history.length - 1].year})</h2>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{historyLabel}</span>
            </div>
            <TrendChart history={history} projection={[]} height={320} />
          </div>
        )}
        {historyStatus === 'loading' && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">Loading history...</div>
        )}
        <div className="text-center text-xs text-muted-foreground">
          Source: <a href="https://data.worldbank.org/indicator/${m.indicator}" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">World Bank ${m.indicator} ({country.year})</a>
          {cacheStatus && (<span className="ml-2">&middot; cached {Math.round(cacheStatus.ageMs / 60000)} min ago</span>)}
        </div>
        {peers.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Nearby {country.region}</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {peers.map((p) => (
                <Link key={p.code} to={'/${m.slug}/' + p.code.toLowerCase()} className="block rounded-xl border border-border bg-card hover:border-${m.color.link}-400 p-4 transition-colors">
                  <BookOpen className="h-4 w-4 text-${m.color.accent} mb-2" />
                  <h3 className="font-bold mb-1 text-sm">{p.name}</h3>
                  <p className="text-xs text-muted-foreground tabular-nums">{(${m.valueList})(p.value)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : country.name + ' ${m.label}'} />
        </div>
      </div>
    </>
  )
}
`;
}

for (const m of countryMetrics) {
  writeFileSync(join(root, `src/hooks/${m.hookName}.js`), hookFile(m), "utf8");
  writeFileSync(join(root, `src/pages/${m.listComp}.jsx`), countryHubPage(m), "utf8");
  writeFileSync(join(root, `src/pages/${m.detailComp}.jsx`), countryDetailPage(m), "utf8");
  console.log("  " + m.hookName + " + " + m.listComp + " + " + m.detailComp);
}

console.log("\nGenerated 14 UI files successfully");
