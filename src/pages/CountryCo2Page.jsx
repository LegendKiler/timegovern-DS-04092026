import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Cloud, Sparkles, ArrowRight, Activity, TrendingUp, TrendingDown, BookOpen, RefreshCw, Database, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import TrendChart from '../components/worldometers/TrendChart'
import { setPageMeta } from '../lib/seo'
import { COUNTRY_CO2, TOTAL_WORLD_CO2 } from '../data/countryCo2'
import { COUNTRY_POPULATIONS } from '../data/countryPopulations'
import { useCountryCo2 } from '../hooks/useCountryCo2'

function formatTonnes(mt) {
  return (mt * 1e6).toLocaleString('en-US')
}

export default function CountryCo2Page() {
  const { code } = useParams()
  const { country, status, cacheStatus, history, historyStatus } = useCountryCo2(code)

  const popMatch = useMemo(() => {
    if (!code) return null
    const upper = String(code).toUpperCase()
    return COUNTRY_POPULATIONS.find(c => c.code === upper) || null
  }, [code])

  const derived = useMemo(() => {
    if (!country) return null
    const worldShare = (country.value / TOTAL_WORLD_CO2) * 100
    const perCapita = popMatch && popMatch.population > 0
      ? (country.value * 1e6) / popMatch.population
      : null
    return { worldShare, perCapita }
  }, [country, popMatch])

  const peers = useMemo(() => {
    if (!country) return []
    return COUNTRY_CO2
      .filter(c => c.region === country.region && c.code !== country.code)
      .slice(0, 6)
  }, [country])

  useEffect(() => {
    if (!country) return
    document.title = country.name + ' CO2 Emissions - Live Data & Trend | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Live CO2 emissions for ' + country.name + ' - current emissions, world rank, per-capita rate, and historical trend. Source: World Bank / UNFCCC.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [country])

  if (!country) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <Card><CardContent className="p-8 text-center space-y-4">
          <AlertCircle className="h-10 w-10 text-amber-500 mx-auto" />
          <h1 className="text-2xl font-black">CO2 data not available</h1>
          <p className="text-sm text-muted-foreground">
            The World Bank does not report CO2 emissions for this country. Not all countries submit national greenhouse gas inventories to the UNFCCC.
          </p>
          <Link to="/co2-emissions" className="inline-flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
            View all countries with CO2 data <ArrowRight className="h-4 w-4" />
          </Link>
        </CardContent></Card>
      </div>
    )
  }

  const freshnessLabel = {
    live:    'Live from World Bank',
    cache:   'Fresh from cache (24h)',
    loading: 'Updating...',
    bundled: 'Snapshot: ' + country.year,
  }[status] || 'Snapshot: ' + country.year

  const freshnessIcon = (status === 'live' || status === 'cache') ? RefreshCw : Database

  const historyLabel = {
    live:  'History: live from World Bank',
    cache: 'History: cached',
    none:  'History: unavailable',
  }[historyStatus] || ''

  const FAQ = [
    { q: 'What are the CO2 emissions of ' + country.name + '?', a: 'The most recent reported CO2 emissions are approximately ' + country.value.toFixed(2) + ' Mt CO2e per year, as of ' + country.year + ', according to World Bank data.' },
    { q: 'What is the world CO2 rank of ' + country.name + '?', a: country.name + ' ranks #' + country.rank + ' in the world by total CO2 emissions, out of the ' + COUNTRY_CO2.length + ' countries tracked on this site.' },
    derived.perCapita ? { q: 'What are the per-capita CO2 emissions of ' + country.name + '?', a: 'Approximately ' + derived.perCapita.toFixed(2) + ' tonnes of CO2e per person per year. The world average is around 4.3 tonnes per person.' } : { q: 'Are per-capita emissions available?', a: 'Per-capita emissions could not be calculated because population data for this country is not available on this site.' },
    { q: 'What share of world CO2 does ' + country.name + ' emit?', a: country.name + ' accounts for approximately ' + derived.worldShare.toFixed(2) + '% of the world total across all countries tracked here.' },
    { q: 'How far back does the history go?', a: 'The World Bank CO2 series used here starts in 2000. The chart below shows every year through the latest available data for this country.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' },
    { '@type': 'ListItem', position: 2, name: 'CO2 Emissions', item: 'https://timegovern.com/co2-emissions' },
    { '@type': 'ListItem', position: 3, name: country.name, item: 'https://timegovern.com/co2-emissions/' + country.code.toLowerCase() },
  ] }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/co2-emissions" className="hover:underline">CO2 Emissions</Link>
          <span className="mx-1">/</span>
          <span>{country.name}</span>
        </nav>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">{country.region}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 flex items-center gap-4">
              <Cloud className="h-10 w-10 md:h-12 md:w-12 text-emerald-300" />
              {country.name} CO2 Emissions
            </h1>
            <div className="text-white/60 text-sm mb-8">Rank #{country.rank} in the world by total CO2 emissions</div>
            <div className="text-center">
              <div className="text-5xl md:text-7xl font-black tabular-nums tracking-tight">
                {country.value.toFixed(2)}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-2">Mt CO2e ({country.year})</div>
              <div className="inline-flex items-center gap-1.5 text-[11px] text-white/50 mt-3">
                {(() => { const I = freshnessIcon; return <I className="h-3 w-3" /> })()}
                <span>{freshnessLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <Card><CardContent className="p-5 text-center">
            <Activity className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Total tonnes</div>
            <div className="text-2xl font-black tabular-nums">{formatTonnes(country.value)}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            {derived.perCapita != null ? <TrendingUp className="h-5 w-5 text-teal-500 mx-auto mb-2" /> : <TrendingDown className="h-5 w-5 text-slate-500 mx-auto mb-2" />}
            <div className="text-xs text-muted-foreground mb-1">Per capita (t CO2e)</div>
            <div className="text-2xl font-black tabular-nums">{derived.perCapita != null ? derived.perCapita.toFixed(2) : 'n/a'}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            <TrendingUp className="h-5 w-5 text-violet-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">World share</div>
            <div className="text-2xl font-black tabular-nums">{derived.worldShare.toFixed(2)}%</div>
          </CardContent></Card>
        </div>

        {history && history.length > 5 && (
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">CO2 emissions history (2000-{history[history.length - 1].year})</h2>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{historyLabel}</span>
            </div>
            <TrendChart history={history} projection={[]} height={320} />
          </div>
        )}

        {historyStatus === 'loading' && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Loading history...
          </div>
        )}

        <div className="text-center text-xs text-muted-foreground">
          Source: <a href="https://data.worldbank.org/indicator/EN.GHG.CO2.MT.CE.AR5" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">World Bank EN.GHG.CO2.MT.CE.AR5 ({country.year})</a>
          {cacheStatus && (
            <span className="ml-2">
              &middot; cached {Math.round(cacheStatus.ageMs / 60000)} min ago
            </span>
          )}
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        {peers.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Nearby {country.region}</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {peers.map((p) => (
                <Link key={p.code} to={'/co2-emissions/' + p.code.toLowerCase()} className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-4 transition-colors">
                  <BookOpen className="h-4 w-4 text-emerald-500 mb-2" />
                  <h3 className="font-bold mb-1 text-sm">{p.name}</h3>
                  <p className="text-xs text-muted-foreground tabular-nums">{p.value.toFixed(2)} Mt</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : country.name + ' CO2 Emissions'} />
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-center">
          <Link to="/co2-emissions-clock" className="inline-flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
            See the global CO2 emissions clock <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}