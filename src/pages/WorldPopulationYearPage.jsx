import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Users, ArrowLeft, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import TrendChart from '../components/worldometers/TrendChart'
import { setPageMeta } from '../lib/seo'
import { WORLD_POPULATION_BY_YEAR, getPopulationForYear } from '../data/worldPopulationByYear'

export default function WorldPopulationYearPage() {
  const { year } = useParams()
  const data = useMemo(() => getPopulationForYear(year), [year])

  const derived = useMemo(() => {
    if (!data) return null
    const idx = WORLD_POPULATION_BY_YEAR.findIndex(r => r.year === data.year)
    const prev = idx > 0 ? WORLD_POPULATION_BY_YEAR[idx-1] : null
    const next = idx < WORLD_POPULATION_BY_YEAR.length-1 ? WORLD_POPULATION_BY_YEAR[idx+1] : null
    const latest = WORLD_POPULATION_BY_YEAR[WORLD_POPULATION_BY_YEAR.length-1]
    const yoy = prev ? ((data.value - prev.value) / prev.value) * 100 : null
    const growth = prev ? data.value - prev.value : null
    const shareOfLatest = latest.year !== data.year ? (data.value / latest.value) * 100 : 100
    return { prev, next, latest, yoy, growth, shareOfLatest }
  }, [data])

  const nearby = useMemo(() => {
    if (!data) return []
    const start = Math.max(WORLD_POPULATION_BY_YEAR[0].year, data.year - 15)
    const end = Math.min(WORLD_POPULATION_BY_YEAR[WORLD_POPULATION_BY_YEAR.length-1].year, data.year + 15)
    return WORLD_POPULATION_BY_YEAR.filter(r => r.year >= start && r.year <= end)
  }, [data])

  useEffect(() => {
    if (!data) return
    document.title = 'World Population in ' + data.year + ' | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'World population in ' + data.year + ' was approximately ' + (data.value / 1e9).toFixed(2) + ' billion people. Growth rate, historical chart, and comparison to ' + derived.latest.year + '.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [data, derived])

  if (!data) return <Navigate to="/world-population-by-year" replace />

  const FAQ = [
    { q: 'What was the world population in ' + data.year + '?', a: 'Approximately ' + data.value.toLocaleString() + ' people, or ' + (data.value / 1e9).toFixed(2) + ' billion. This is ' + derived.shareOfLatest.toFixed(1) + '% of the ' + derived.latest.year + ' total of ' + (derived.latest.value / 1e9).toFixed(2) + ' billion.' },
    derived.growth != null ? { q: 'How much did the world population grow in ' + data.year + '?', a: 'It grew by approximately ' + Math.round(derived.growth).toLocaleString() + ' people, a year-over-year increase of ' + derived.yoy.toFixed(2) + '%.' } : { q: 'What was the year-over-year change?', a: 'No prior-year data is available for comparison.' },
    { q: 'Where does the data come from?', a: 'World Bank indicator SP.POP.TOTL, compiling UN World Population Prospects. Values are mid-year estimates.' },
  ]
  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' },
    { '@type': 'ListItem', position: 2, name: 'World Population by Year', item: 'https://timegovern.com/world-population-by-year' },
    { '@type': 'ListItem', position: 3, name: String(data.year), item: 'https://timegovern.com/world-population-by-year/' + data.year },
  ] }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/world-population-by-year" className="hover:underline">World Population by Year</Link>
          <span className="mx-1">/</span>
          <span>{data.year}</span>
        </nav>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-purple-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 flex items-center gap-4">
              <Users className="h-10 w-10 md:h-12 md:w-12 text-violet-300" />
              World Population in {data.year}
            </h1>
            <div className="text-center mt-8">
              <div className="text-5xl md:text-7xl font-black tabular-nums tracking-tight">{(data.value / 1e9).toFixed(2)}B</div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-2">people ({data.value.toLocaleString()})</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <Card><CardContent className="p-5 text-center">
            <div className="text-xs text-muted-foreground mb-1">Year-over-year growth</div>
            <div className="text-2xl font-black tabular-nums">{derived.yoy != null ? '+' + derived.yoy.toFixed(2) + '%' : 'n/a'}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            <div className="text-xs text-muted-foreground mb-1">People added</div>
            <div className="text-2xl font-black tabular-nums">{derived.growth != null ? '+' + Math.round(derived.growth).toLocaleString() : 'n/a'}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            <div className="text-xs text-muted-foreground mb-1">Share of {derived.latest.year}</div>
            <div className="text-2xl font-black tabular-nums">{derived.shareOfLatest.toFixed(1)}%</div>
          </CardContent></Card>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">World population around {data.year}</h2>
          <TrendChart history={nearby} projection={[]} height={320} />
        </div>

        <div className="flex justify-between items-center gap-3">
          {derived.prev ? <Link to={'/world-population-by-year/' + derived.prev.year} className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline"><ArrowLeft className="h-4 w-4" />{derived.prev.year}</Link> : <span />}
          {derived.next ? <Link to={'/world-population-by-year/' + derived.next.year} className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline">{derived.next.year}<ArrowRight className="h-4 w-4" /></Link> : <span />}
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Source: <a href="https://data.worldbank.org/indicator/SP.POP.TOTL" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">World Bank SP.POP.TOTL ({data.year})</a>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'World Population in ' + data.year} />
        </div>
      </div>
    </>
  )
}
