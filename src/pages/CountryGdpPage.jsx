import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DollarSign, Sparkles, ArrowRight, Activity, BookOpen, RefreshCw, Database, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import TrendChart from '../components/worldometers/TrendChart'
import { setPageMeta } from '../lib/seo'
import { COUNTRY_GDP, TOTAL_WORLD_GDP } from '../data/countryGdp'
import { useCountryGdp } from '../hooks/useCountryGdp'

export default function CountryGdpPage() {
  const { code } = useParams()
  const { country, status, cacheStatus, history, historyStatus } = useCountryGdp(code)
  const derived = useMemo(() => {
    if (!country) return null
    return { worldShare: (country.value / TOTAL_WORLD_GDP) * 100 }
  }, [country])
  const peers = useMemo(() => {
    if (!country) return []
    return COUNTRY_GDP.filter(c => c.region === country.region && c.code !== country.code).slice(0, 6)
  }, [country])
  useEffect(() => {
    if (!country) return
    document.title = country.name + ' GDP - Live Data & Trend | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Live gdp for ' + country.name + '. Source: World Bank.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [country])
  if (!country) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <Card><CardContent className="p-8 text-center space-y-4">
          <AlertCircle className="h-10 w-10 text-amber-500 mx-auto" />
          <h1 className="text-2xl font-black">GDP data not available</h1>
          <p className="text-sm text-muted-foreground">The World Bank does not report gdp for this country.</p>
          <Link to="/gdp" className="inline-flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
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
          <Link to="/gdp" className="hover:underline">GDP</Link>
          <span className="mx-1">/</span>
          <span>{country.name}</span>
        </nav>
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">{country.region}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 flex items-center gap-4">
              <DollarSign className="h-10 w-10 md:h-12 md:w-12 text-emerald-300" />
              {country.name} GDP
            </h1>
            <div className="text-white/60 text-sm mb-8">Rank #{country.rank} in the world by gdp</div>
            <div className="text-center">
              <div className="text-5xl md:text-7xl font-black tabular-nums tracking-tight">{(v => '$' + v.toFixed(2) + 'B')(country.value)}</div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-2">bn USD ({country.year})</div>
              <div className="inline-flex items-center gap-1.5 text-[11px] text-white/50 mt-3">
                {(() => { const I = freshnessIcon; return <I className="h-3 w-3" /> })()}
                <span>{freshnessLabel}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <Card><CardContent className="p-5 text-center">
            <Activity className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Full amount</div>
            <div className="text-2xl font-black tabular-nums">{(v => '$' + (v * 1e9).toLocaleString('en-US'))(country.value)}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            <BookOpen className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">World share</div>
            <div className="text-2xl font-black tabular-nums">{derived.worldShare.toFixed(2)}%</div>
          </CardContent></Card>
        </div>
        {history && history.length > 5 && (
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">GDP history (to {history[history.length - 1].year})</h2>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{historyLabel}</span>
            </div>
            <TrendChart history={history} projection={[]} height={320} />
          </div>
        )}
        {historyStatus === 'loading' && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">Loading history...</div>
        )}
        <div className="text-center text-xs text-muted-foreground">
          Source: <a href="https://data.worldbank.org/indicator/NY.GDP.MKTP.CD" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">World Bank NY.GDP.MKTP.CD ({country.year})</a>
          {cacheStatus && (<span className="ml-2">&middot; cached {Math.round(cacheStatus.ageMs / 60000)} min ago</span>)}
        </div>
        {peers.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Nearby {country.region}</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {peers.map((p) => (
                <Link key={p.code} to={'/gdp/' + p.code.toLowerCase()} className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-4 transition-colors">
                  <BookOpen className="h-4 w-4 text-emerald-500 mb-2" />
                  <h3 className="font-bold mb-1 text-sm">{p.name}</h3>
                  <p className="text-xs text-muted-foreground tabular-nums">{(v => '$' + v.toFixed(1) + 'B')(p.value)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : country.name + ' GDP'} />
        </div>
      </div>
    </>
  )
}
