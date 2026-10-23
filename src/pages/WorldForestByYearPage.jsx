import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trees, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { WORLD_FOREST_BY_YEAR } from '../data/worldForestByYear'

const FAQ = [
  { q: "How far back does the data go?", a: "World Bank forest data starts in 1992. This page shows every year through the latest available." },
  { q: "Is global forest area shrinking?", a: "Yes, slowly. The world loses roughly 40-50 thousand square kilometers of net forest per year, mostly in the tropics, despite gains in some temperate regions." },
  { q: "What counts as forest?", a: "Land spanning more than 0.5 hectares with trees taller than 5 meters and canopy cover above 10 percent. Excludes tree crops and urban parks." },
  { q: "Where does the data come from?", a: "World Bank indicator AG.LND.FRST.K2, World aggregate. Compiles FAO Global Forest Resources Assessment." },
]
const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: "World Forest Area by Year", url: 'https://timegovern.com/forest-by-year' }

export default function WorldForestByYearPage() {
  useEffect(() => {
    document.title = "World Forest Area by Year" + ' (' + WORLD_FOREST_BY_YEAR[0].year + '-' + WORLD_FOREST_BY_YEAR[WORLD_FOREST_BY_YEAR.length-1].year + ') | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "World Forest Area by Year historical data. Source: World Bank.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])
  const reversed = [...WORLD_FOREST_BY_YEAR].reverse()
  const min = WORLD_FOREST_BY_YEAR[0], max = WORLD_FOREST_BY_YEAR[WORLD_FOREST_BY_YEAR.length-1]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-emerald-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-green-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-green-300">{WORLD_FOREST_BY_YEAR.length} years</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Trees className="h-10 w-10 md:h-14 md:w-14 text-green-300" />
              World Forest Area by Year
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Historical data for every year from {min.year} to {max.year}. Click any year for detail.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {reversed.map(r => (
            <Link key={r.year} to={'/forest-by-year/' + r.year} className="rounded-xl border border-border bg-card hover:border-green-400 p-3 transition-colors">
              <div className="text-xs text-muted-foreground tabular-nums">{r.year}</div>
              <div className="font-black tabular-nums text-lg">{(v => (v / 1e6).toFixed(1) + 'M km2')(r.value)}</div>
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : "World Forest Area by Year"} />
        </div>
      </div>
    </>
  )
}
