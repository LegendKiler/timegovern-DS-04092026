import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cloud, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { WORLD_CO2_BY_YEAR } from '../data/worldCo2ByYear'

const FAQ = [
  { q: 'How far back does the data go?', a: 'This page lists World Bank world CO2 emissions figures for every available year through 2024.' },
  { q: 'What are the units?', a: 'Megatonnes of CO2 equivalent (Mt CO2e), from the World Bank AR5 series which compiles national greenhouse gas inventories reported to UNFCCC.' },
  { q: 'Why do emissions vary year to year?', a: 'Global CO2 emissions track economic activity - they dipped sharply in 2009 (financial crisis) and 2020 (pandemic), then rebounded.' },
  { q: 'Where does the data come from?', a: 'World Bank indicator EN.GHG.CO2.MT.CE.AR5, World aggregate.' },
]
const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'World CO2 Emissions by Year', description: 'Historical global CO2 emissions by year.', url: 'https://timegovern.com/co2-by-year' }

export default function Co2ByYearPage() {
  useEffect(() => {
    document.title = 'World CO2 Emissions by Year (' + WORLD_CO2_BY_YEAR[0].year + '-' + WORLD_CO2_BY_YEAR[WORLD_CO2_BY_YEAR.length-1].year + ') | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Historical global CO2 emissions for every year from ' + WORLD_CO2_BY_YEAR[0].year + ' to ' + WORLD_CO2_BY_YEAR[WORLD_CO2_BY_YEAR.length-1].year + '. Source: World Bank / UNFCCC.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  const reversed = [...WORLD_CO2_BY_YEAR].reverse()
  const min = WORLD_CO2_BY_YEAR[0], max = WORLD_CO2_BY_YEAR[WORLD_CO2_BY_YEAR.length-1]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">{WORLD_CO2_BY_YEAR.length} years</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Cloud className="h-10 w-10 md:h-14 md:w-14 text-emerald-300" />
              World CO2 Emissions by Year
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Global CO2 emissions for every year from {min.year} to {max.year}. Click any year for detail, growth, and chart.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {reversed.map(r => (
            <Link key={r.year} to={'/co2-by-year/' + r.year} className="rounded-xl border border-border bg-card hover:border-emerald-400 p-3 transition-colors">
              <div className="text-xs text-muted-foreground tabular-nums">{r.year}</div>
              <div className="font-black tabular-nums text-lg">{(r.value / 1000).toFixed(1)} Gt</div>
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'World CO2 Emissions by Year'} />
        </div>
      </div>
    </>
  )
}
