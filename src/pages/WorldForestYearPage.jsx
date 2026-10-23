import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Trees, ArrowLeft, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import TrendChart from '../components/worldometers/TrendChart'
import { setPageMeta } from '../lib/seo'
import { WORLD_FOREST_BY_YEAR, getForestForYear } from '../data/worldForestByYear'

export default function WorldForestYearPage() {
  const { year } = useParams()
  const data = useMemo(() => getForestForYear(year), [year])
  const derived = useMemo(() => {
    if (!data) return null
    const idx = WORLD_FOREST_BY_YEAR.findIndex(r => r.year === data.year)
    const prev = idx > 0 ? WORLD_FOREST_BY_YEAR[idx-1] : null
    const next = idx < WORLD_FOREST_BY_YEAR.length-1 ? WORLD_FOREST_BY_YEAR[idx+1] : null
    const latest = WORLD_FOREST_BY_YEAR[WORLD_FOREST_BY_YEAR.length-1]
    const yoy = prev ? ((data.value - prev.value) / prev.value) * 100 : null
    const growth = prev ? data.value - prev.value : null
    const shareOfLatest = latest.year !== data.year ? (data.value / latest.value) * 100 : 100
    return { prev, next, latest, yoy, growth, shareOfLatest }
  }, [data])
  const nearby = useMemo(() => {
    if (!data) return []
    const start = Math.max(WORLD_FOREST_BY_YEAR[0].year, data.year - 10)
    const end = Math.min(WORLD_FOREST_BY_YEAR[WORLD_FOREST_BY_YEAR.length-1].year, data.year + 10)
    return WORLD_FOREST_BY_YEAR.filter(r => r.year >= start && r.year <= end)
  }, [data])
  useEffect(() => {
    if (!data) return
    document.title = "World Forest Area" + ' in ' + data.year + ' | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "World Forest Area in " + data.year + ' was approximately ' + (v => (v / 1e6).toFixed(2) + ' million km2')(data.value) + '. Source: World Bank.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [data, derived])
  if (!data) return <Navigate to="/forest-by-year" replace />
  const FAQ = [
  { q: "How far back does the data go?", a: "World Bank forest data starts in 1992. This page shows every year through the latest available." },
  { q: "Is global forest area shrinking?", a: "Yes, slowly. The world loses roughly 40-50 thousand square kilometers of net forest per year, mostly in the tropics, despite gains in some temperate regions." },
  { q: "What counts as forest?", a: "Land spanning more than 0.5 hectares with trees taller than 5 meters and canopy cover above 10 percent. Excludes tree crops and urban parks." },
  { q: "Where does the data come from?", a: "World Bank indicator AG.LND.FRST.K2, World aggregate. Compiles FAO Global Forest Resources Assessment." },
  ]
  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/forest-by-year" className="hover:underline">World Forest Area</Link>
          <span className="mx-1">/</span>
          <span>{data.year}</span>
        </nav>
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-emerald-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 flex items-center gap-4">
              <Trees className="h-10 w-10 md:h-12 md:w-12 text-green-300" />
              World Forest Area in {data.year}
            </h1>
            <div className="text-center mt-8">
              <div className="text-5xl md:text-7xl font-black tabular-nums tracking-tight">{(v => (v / 1e6).toFixed(1) + 'M km2')(data.value)}</div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-2">million square kilometers</div>
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
            <div className="text-2xl font-black tabular-nums">{derived.growth != null ? (g => (g >= 0 ? '+' : '') + (g / 1e3).toFixed(0) + 'k km2')(derived.growth) : 'n/a'}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            <div className="text-xs text-muted-foreground mb-1">Share of {derived.latest.year}</div>
            <div className="text-2xl font-black tabular-nums">{derived.shareOfLatest.toFixed(1)}%</div>
          </CardContent></Card>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">World Forest Area around {data.year}</h2>
          <TrendChart history={nearby} projection={[]} height={320} />
        </div>
        <div className="flex justify-between items-center gap-3">
          {derived.prev ? <Link to={'/forest-by-year/' + derived.prev.year} className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 hover:underline"><ArrowLeft className="h-4 w-4" />{derived.prev.year}</Link> : <span />}
          {derived.next ? <Link to={'/forest-by-year/' + derived.next.year} className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 hover:underline">{derived.next.year}<ArrowRight className="h-4 w-4" /></Link> : <span />}
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground">
          Source: <a href="https://data.worldbank.org/indicator/AG.LND.FRST.K2" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">World Bank AG.LND.FRST.K2 ({data.year})</a>
        </div>
        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : "World Forest Area" + ' in ' + data.year} />
        </div>
      </div>
    </>
  )
}
