import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { COUNTRY_ENERGY, TOTAL_WORLD_ENERGY } from '../data/countryEnergy'
import { REGION_ORDER } from '../data/countryCodes'

const FAQ = [
  { q: 'How many countries are listed?', a: 'This page lists all ' + COUNTRY_ENERGY.length + ' countries with energy use data from the World Bank. Each links to a dedicated page with live data, per-capita rate, and world rank.' },
  { q: 'What is the total world energy use?', a: 'The sum of all countries on this page is approximately ' + TOTAL_WORLD_ENERGY.toFixed(0) + ' Mtoe (megatonnes of oil equivalent) per year. This excludes traditional biomass not tracked in commercial energy statistics.' },
  { q: 'Which country uses the most energy?', a: 'China, at approximately 4,152 Mtoe per year, followed by the United States at 2,194 Mtoe and India at 1,127 Mtoe.' },
  { q: 'What does Mtoe mean?', a: 'Mtoe is megatonnes of oil equivalent - a standard unit for comparing energy from different sources (oil, gas, coal, nuclear, renewables) on a common scale. One Mtoe equals about 41.87 petajoules.' },
  { q: 'Where does the data come from?', a: 'World Bank indicator EG.USE.PCAP.KG.OE, based on IEA energy balances. Total energy is computed as per-capita energy use times population.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Energy Use by Country', description: 'Energy consumption of every country, ranked, with per-capita rates and historical trends.', url: 'https://timegovern.com/energy' }

export default function EnergyByCountryPage() {
  const byRegion = useMemo(() => {
    const out = {}
    for (const c of COUNTRY_ENERGY) {
      if (!out[c.region]) out[c.region] = []
      out[c.region].push(c)
    }
    return out
  }, [])

  const orderedRegions = useMemo(() => {
    const known = REGION_ORDER.filter(r => byRegion[r] && byRegion[r].length > 0)
    const extras = Object.keys(byRegion).filter(r => !known.includes(r))
    return [...known, ...extras]
  }, [byRegion])

  useEffect(() => {
    document.title = 'Energy Use by Country - All ' + COUNTRY_ENERGY.length + ' Countries Ranked | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Primary energy consumption of every country, ranked and grouped by region. Total Mtoe, per-capita rates, and history. Source: World Bank / IEA.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-orange-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">{COUNTRY_ENERGY.length} countries</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Zap className="h-10 w-10 md:h-14 md:w-14 text-amber-300" />
              Energy Use by Country
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Every country ranked by annual primary energy consumption, grouped by region. Total Mtoe, per-capita rate, and historical trend.
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Global total: <span className="font-bold text-foreground tabular-nums">{TOTAL_WORLD_ENERGY.toFixed(0)} Mtoe</span> per year across all listed countries
        </div>

        {orderedRegions.map(region => (
          <div key={region}>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">{region}</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {byRegion[region].map(c => (
                <Link key={c.code} to={'/energy/' + c.code.toLowerCase()} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card hover:border-amber-400 p-3 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-black text-muted-foreground tabular-nums shrink-0 w-8">#{c.rank}</span>
                    <span className="font-semibold text-sm truncate">{c.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums shrink-0">{c.value.toFixed(1)} Mtoe <span className="text-muted-foreground/60">({c.year})</span></span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Energy Use by Country'} />
        </div>
      </div>
    </>
  )
}