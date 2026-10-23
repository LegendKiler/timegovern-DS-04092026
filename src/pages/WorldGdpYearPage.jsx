import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { DollarSign, ArrowLeft, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import TrendChart from '../components/worldometers/TrendChart'
import { setPageMeta } from '../lib/seo'
import { WORLD_GDP_BY_YEAR, getGdpForYear } from '../data/worldGdpByYear'

export default function WorldGdpYearPage() {
  const { year } = useParams()
  const data = useMemo(() => getGdpForYear(year), [year])
  const derived = useMemo(() => {
    if (!data) return null
    const idx = WORLD_GDP_BY_YEAR.findIndex(r => r.year === data.year)
    const prev = idx > 0 ? WORLD_GDP_BY_YEAR[idx-1] : null
    const next = idx < WORLD_GDP_BY_YEAR.length-1 ? WORLD_GDP_BY_YEAR[idx+1] : null
    const latest = WORLD_GDP_BY_YEAR[WORLD_GDP_BY_YEAR.length-1]
    const yoy = prev ? ((data.value - prev.value) / prev.value) * 100 : null
    const growth = prev ? data.value - prev.value : null
    const shareOfLatest = latest.year !== data.year ? (data.value / latest.value) * 100 : 100
    return { prev, next, latest, yoy, growth, shareOfLatest }
  }, [data])
  const nearby = useMemo(() => {
    if (!data) return []
    const start = Math.max(WORLD_GDP_BY_YEAR[0].year, data.year - 10)
    const end = Math.min(WORLD_GDP_BY_YEAR[WORLD_GDP_BY_YEAR.length-1].year, data.year + 10)
    return WORLD_GDP_BY_YEAR.filter(r => r.year >= start && r.year <= end)
  }, [data])
  useEffect(() => {
    if (!data) return
    document.title = "World GDP" + ' in ' + data.year + ' | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "World GDP in " + data.year + ' was approximately ' + (v => '$' + (v / 1000).toFixed(2) + 'T')(data.value) + '. Source: World Bank.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [data, derived])
  if (!data) return <Navigate to="/gdp-by-year" replace />
  const FAQ = [
  { q: "How far back does the data go?", a: "World Bank GDP data for the World aggregate starts in 1960. This page shows every year through the latest available." },
  { q: "What is the unit?", a: "Current US dollars, converted to trillions (1 trillion = 1000 billion) for readability. Not adjusted for inflation." },
  { q: "Why did GDP drop in some years?", a: "Global GDP fell sharply in 2009 (financial crisis) and 2020 (COVID pandemic), then rebounded. Nominal USD values also swing with exchange rates." },
  { q: "Where does the data come from?", a: "World Bank indicator NY.GDP.MKTP.CD (GDP, current US$), World aggregate." },
  ]
  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/gdp-by-year" className="hover:underline">World GDP</Link>
          <span className="mx-1">/</span>
          <span>{data.year}</span>
        </nav>
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 flex items-center gap-4">
              <DollarSign className="h-10 w-10 md:h-12 md:w-12 text-emerald-300" />
              World GDP in {data.year}
            </h1>
            <div className="text-center mt-8">
              <div className="text-5xl md:text-7xl font-black tabular-nums tracking-tight">{(v => '$' + (v / 1000).toFixed(1) + 'T')(data.value)}</div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-2">USD (trillions)</div>
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
            <div className="text-2xl font-black tabular-nums">{derived.growth != null ? (g => (g >= 0 ? '+' : '') + g.toFixed(0) + 'B')(derived.growth) : 'n/a'}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            <div className="text-xs text-muted-foreground mb-1">Share of {derived.latest.year}</div>
            <div className="text-2xl font-black tabular-nums">{derived.shareOfLatest.toFixed(1)}%</div>
          </CardContent></Card>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">World GDP around {data.year}</h2>
          <TrendChart history={nearby} projection={[]} height={320} />
        </div>
        <div className="flex justify-between items-center gap-3">
          {derived.prev ? <Link to={'/gdp-by-year/' + derived.prev.year} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"><ArrowLeft className="h-4 w-4" />{derived.prev.year}</Link> : <span />}
          {derived.next ? <Link to={'/gdp-by-year/' + derived.next.year} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">{derived.next.year}<ArrowRight className="h-4 w-4" /></Link> : <span />}
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground">
          Source: <a href="https://data.worldbank.org/indicator/NY.GDP.MKTP.CD" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">World Bank NY.GDP.MKTP.CD ({data.year})</a>
        </div>
        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : "World GDP" + ' in ' + data.year} />
        </div>
      </div>
    </>
  )
}
