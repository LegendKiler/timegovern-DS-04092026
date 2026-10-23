import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeftRight, Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { METRICS, getCountryRow, getCountryMetric } from '../lib/regionCompare'

export default function ComparePairPage() {
  const { metric, pair } = useParams()
  const m = METRICS[metric]

  const parsed = useMemo(() => {
    if (!pair) return null
    const parts = pair.split('-vs-')
    if (parts.length !== 2) return null
    const [aCode, bCode] = parts
    const aRow = getCountryRow(aCode)
    const bRow = getCountryRow(bCode)
    if (!aRow || !bRow) return null
    return { a: aRow, b: bRow }
  }, [pair])

  useEffect(() => {
    if (!m || !parsed) return
    document.title = parsed.a.name + ' vs ' + parsed.b.name + ' - ' + m.label + ' Comparison | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Compare ' + parsed.a.name + ' and ' + parsed.b.name + ' by ' + m.label.toLowerCase() + '. All metrics side-by-side with world rank.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [m, parsed])

  if (!m) return <Navigate to="/compare" replace />
  if (!parsed) return <Navigate to={'/compare/' + m.slug} replace />

  const rows = Object.values(METRICS).map(mx => {
    const aVal = getCountryMetric(parsed.a.code, mx.slug)
    const bVal = getCountryMetric(parsed.b.code, mx.slug)
    return {
      metric: mx,
      a: aVal ? aVal[mx.valueField] : null,
      b: bVal ? bVal[mx.valueField] : null,
      aRank: aVal ? aVal.rank : null,
      bRank: bVal ? bVal.rank : null,
    }
  })

  return (
    <>
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/compare" className="hover:underline">Compare</Link>
          <span className="mx-1">/</span>
          <Link to={'/compare/' + m.slug} className="hover:underline">{m.label}</Link>
          <span className="mx-1">/</span>
          <span>{parsed.a.name} vs {parsed.b.name}</span>
        </nav>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-950 via-red-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <ArrowLeftRight className="h-10 w-10 md:h-12 md:w-12 text-orange-300" />
              {parsed.a.name} vs {parsed.b.name}
            </h1>
            <p className="text-white/70 text-base md:text-lg">
              Side-by-side comparison across {Object.keys(METRICS).length} metrics.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {rows.map(r => {
            const aWins = r.a != null && r.b != null && r.a > r.b
            const bWins = r.a != null && r.b != null && r.b > r.a
            return (
              <Card key={r.metric.slug}><CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-2 font-bold uppercase tracking-wide">{r.metric.label}</div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className={aWins ? 'font-black text-lg tabular-nums' : 'text-lg tabular-nums'}>
                    {r.a != null ? r.metric.formatShort(r.a) : 'n/a'}
                    <div className="text-[11px] text-muted-foreground mt-1">{r.aRank ? '#' + r.aRank : ''}</div>
                  </div>
                  <div className={bWins ? 'font-black text-lg tabular-nums' : 'text-lg tabular-nums'}>
                    {r.b != null ? r.metric.formatShort(r.b) : 'n/a'}
                    <div className="text-[11px] text-muted-foreground mt-1">{r.bRank ? '#' + r.bRank : ''}</div>
                  </div>
                </div>
              </CardContent></Card>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link to={'/compare/' + m.slug} className="text-center text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline">
            Different metric
          </Link>
          <Link to="/compare" className="text-center text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline">
            Different countries
          </Link>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : parsed.a.name + ' vs ' + parsed.b.name} />
        </div>
      </div>
    </>
  )
}
