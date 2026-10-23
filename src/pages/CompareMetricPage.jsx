import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeftRight, Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { METRICS, getCountriesInRegion } from '../lib/regionCompare'
import { REGION_ORDER_LIST } from '../lib/regionCompare'

export default function CompareMetricPage() {
  const { metric } = useParams()
  const m = METRICS[metric]
  const navigate = useNavigate()
  const [a, setA] = useState('')
  const [b, setB] = useState('')

  const sorted = useMemo(() => {
    if (!m) return []
    return [...m.data].sort((x, y) => (y[m.valueField] || 0) - (x[m.valueField] || 0))
  }, [m])

  useEffect(() => {
    if (!m) return
    document.title = 'Compare ' + m.label + ' Between Countries | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Compare ' + m.label.toLowerCase() + ' between any two countries. Side-by-side view with world rank and totals.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [m])

  if (!m) return <Navigate to="/compare" replace />

  const goCompare = () => {
    if (a && b && a !== b) navigate('/compare/' + m.slug + '/' + a.toLowerCase() + '-vs-' + b.toLowerCase())
  }

  const allCountries = REGION_ORDER_LIST.flatMap(r => getCountriesInRegion(r).map(c => ({ ...c }))).sort((x, y) => x.name.localeCompare(y.name))

  return (
    <>
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/compare" className="hover:underline">Compare</Link>
          <span className="mx-1">/</span>
          <span>{m.label}</span>
        </nav>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-950 via-red-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-orange-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-orange-200">{m.label}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <ArrowLeftRight className="h-10 w-10 md:h-12 md:w-12 text-orange-300" />
              Compare {m.label}
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Pick two countries to compare their {m.label.toLowerCase()} side-by-side.
            </p>
          </div>
        </div>

        <Card><CardContent className="p-5 space-y-3">
          <div className="text-sm font-bold">Select two countries</div>
          <div className="grid md:grid-cols-2 gap-2">
            <select value={a} onChange={e => setA(e.target.value)} className="rounded-lg border border-border bg-background p-2 text-sm">
              <option value="">Country A</option>
              {allCountries.map(c => <option key={'a-' + c.code} value={c.code}>{c.name}</option>)}
            </select>
            <select value={b} onChange={e => setB(e.target.value)} className="rounded-lg border border-border bg-background p-2 text-sm">
              <option value="">Country B</option>
              {allCountries.map(c => <option key={'b-' + c.code} value={c.code}>{c.name}</option>)}
            </select>
          </div>
          <button onClick={goCompare} disabled={!a || !b || a === b} className="w-full rounded-lg bg-orange-600 hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-2 text-sm">
            Compare
          </button>
        </CardContent></Card>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">Top 20 by {m.label}</h2>
          <div className="space-y-1">
            {sorted.slice(0, 20).map((d, i) => (
              <div key={d.code} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3 text-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-black text-muted-foreground tabular-nums w-6">#{i + 1}</span>
                  <Link to={m.countryRoute(d.code)} className="font-semibold truncate hover:underline">{d.name}</Link>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums shrink-0">{m.formatShort(d[m.valueField] || 0)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Compare ' + m.label} />
        </div>
      </div>
    </>
  )
}
