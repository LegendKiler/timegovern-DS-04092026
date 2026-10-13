import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Zap, Sparkles, ArrowRight, Activity, TrendingUp, BookOpen, RefreshCw, Database, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import TrendChart from '../components/worldometers/TrendChart'
import { setPageMeta } from '../lib/seo'
import { COUNTRY_ENERGY, TOTAL_WORLD_ENERGY } from '../data/countryEnergy'
import { useCountryEnergy } from '../hooks/useCountryEnergy'

export default function CountryEnergyPage() {
  const { code } = useParams()
  const { country, status, cacheStatus, history, historyStatus } = useCountryEnergy(code)

  const derived = useMemo(() => {
    if (!country) return null
    const worldShare = (country.value / TOTAL_WORLD_ENERGY) * 100
    const barrelsPerDay = (country.value * 1e6 * 1000) / 365 / 7.33
    return { worldShare, barrelsPerDay }
  }, [country])

  const peers = useMemo(() => {
    if (!country) return []
    return COUNTRY_ENERGY
      .filter(c => c.region === country.region && c.code !== country.code)
      .slice(0, 6)
  }, [country])

  useEffect(() => {
    if (!country) return
    document.title = country.name + ' Energy Use - Live Data & Trend | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Live energy use for ' + country.name + ' - total primary energy, per-capita rate, world rank, and historical trend. Source: World Bank / IEA.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [country])

  if (!country) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <Card><CardContent className="p-8 text-center space-y-4">
          <AlertCircle className="h-10 w-10 text-amber-500 mx-auto" />
          <h1 className="text-2xl font-black">Energy data not available</h1>
          <p className="text-sm text-muted-foreground">
            The World Bank does not report energy use for this country. Coverage is more limited than population or CO2 because not all countries submit annual energy balances to the IEA.
          </p>
          <Link to="/energy" className="inline-flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400 hover:underline">
            View all countries with energy data <ArrowRight className="h-4 w-4" />
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
    { q: 'How much energy does ' + country.name + ' use?', a: 'Approximately ' + country.value.toFixed(2) + ' Mtoe per year, as of ' + country.year + ', according to World Bank / IEA data.' },
    { q: 'What is the world energy rank of ' + country.name + '?', a: country.name + ' ranks #' + country.rank + ' in the world by total primary energy use, out of the ' + COUNTRY_ENERGY.length + ' countries tracked on this site.' },
    { q: 'What is the per-capita energy use of ' + country.name + '?', a: 'Approximately ' + country.perCapita.toFixed(0) + ' kg of oil equivalent per person per year. The world average is around 1,700 kg per person.' },
    { q: 'What share of world energy does ' + country.name + ' use?', a: country.name + ' accounts for approximately ' + derived.worldShare.toFixed(2) + '% of the world total across all countries tracked here.' },
    { q: 'How far back does the history go?', a: 'The World Bank energy series used here starts in 2000. The chart below shows every year through the latest available data for this country.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' },
    { '@type': 'ListItem', position: 2, name: 'Energy', item: 'https://timegovern.com/energy' },
    { '@type': 'ListItem', position: 3, name: country.name, item: 'https://timegovern.com/energy/' + country.code.toLowerCase() },
  ] }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/energy" className="hover:underline">Energy</Link>
          <span className="mx-1">/</span>
          <span>{country.name}</span>
        </nav>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-orange-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">{country.region}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 flex items-center gap-4">
              <Zap className="h-10 w-10 md:h-12 md:w-12 text-amber-300" />
              {country.name} Energy Use
            </h1>
            <div className="text-white/60 text-sm mb-8">Rank #{country.rank} in the world by primary energy consumption</div>
            <div className="text-center">
              <div className="text-5xl md:text-7xl font-black tabular-nums tracking-tight">
                {country.value.toFixed(2)}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-2">Mtoe ({country.year})</div>
              <div className="inline-flex items-center gap-1.5 text-[11px] text-white/50 mt-3">
                {(() => { const I = freshnessIcon; return <I className="h-3 w-3" /> })()}
                <span>{freshnessLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <Card><CardContent className="p-5 text-center">
            <Activity className="h-5 w-5 text-amber-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Oil equivalent</div>
            <div className="text-2xl font-black tabular-nums">{Math.round(derived.barrelsPerDay / 1000).toLocaleString('en-US')}k bbl/d</div>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            <TrendingUp className="h-5 w-5 text-orange-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Per capita (kg oe)</div>
            <div className="text-2xl font-black tabular-nums">{country.perCapita.toFixed(0)}</div>
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
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">Energy use history (2000-{history[history.length - 1].year})</h2>
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
          Source: <a href="https://data.worldbank.org/indicator/EG.USE.PCAP.KG.OE" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">World Bank EG.USE.PCAP.KG.OE ({country.year})</a>
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
                <Link key={p.code} to={'/energy/' + p.code.toLowerCase()} className="block rounded-xl border border-border bg-card hover:border-amber-400 p-4 transition-colors">
                  <BookOpen className="h-4 w-4 text-amber-500 mb-2" />
                  <h3 className="font-bold mb-1 text-sm">{p.name}</h3>
                  <p className="text-xs text-muted-foreground tabular-nums">{p.value.toFixed(1)} Mtoe</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : country.name + ' Energy Use'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-center">
          <Link to="/energy-use-clock" className="inline-flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400 hover:underline">
            See the global energy use clock <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}