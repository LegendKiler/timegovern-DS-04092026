import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Droplets, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { COUNTRY_WATER, TOTAL_WORLD_WATER } from '../data/countryWater'
import { REGION_ORDER } from '../data/countryCodes'

const FAQ = [
  { q: 'How many countries are listed?', a: 'This page lists all ' + COUNTRY_WATER.length + ' countries with freshwater withdrawal data from the World Bank. Each links to a dedicated page with live data, historical trend, and world rank.' },
  { q: 'What is total global freshwater withdrawal?', a: 'The sum across all countries on this page is approximately ' + TOTAL_WORLD_WATER.toFixed(0) + ' billion cubic meters per year.' },
  { q: 'Which country withdraws the most freshwater?', a: 'India and China lead global freshwater withdrawals, each above 500 billion cubic meters per year, followed by the United States.' },
  { q: 'What does the year next to each country mean?', a: 'The World Bank reports freshwater withdrawal data with a lag of several years. Each country shows its most recent available year.' },
  { q: 'Where does the data come from?', a: 'World Bank indicator ER.H2O.FWTL.K3, which compiles national water withdrawal statistics reported to AQUASTAT and other sources.' },
]
const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Water Use by Country', description: 'Freshwater withdrawals of every country, ranked, with live data and historical trends.', url: 'https://timegovern.com/water' }

export default function WaterByCountryPage() {
  const byRegion = useMemo(() => {
    const out = {}
    for (const c of COUNTRY_WATER) { if (!out[c.region]) out[c.region] = []; out[c.region].push(c) }
    return out
  }, [])
  const orderedRegions = useMemo(() => {
    const known = REGION_ORDER.filter(r => byRegion[r] && byRegion[r].length > 0)
    const extras = Object.keys(byRegion).filter(r => !known.includes(r))
    return [...known, ...extras]
  }, [byRegion])

  useEffect(() => {
    document.title = 'Water Use by Country - All ' + COUNTRY_WATER.length + ' Countries Ranked | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Freshwater withdrawals of every country, ranked and grouped by region. Live data, world rank, and historical trends. Source: World Bank / AQUASTAT.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-blue-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-sky-200">{COUNTRY_WATER.length} countries</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Droplets className="h-10 w-10 md:h-14 md:w-14 text-sky-300" />
              Water Use by Country
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Every country ranked by annual freshwater withdrawals, grouped by region. Click any to see live data, world rank, and historical trend.
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Global total: <span className="font-bold text-foreground tabular-nums">{TOTAL_WORLD_WATER.toFixed(0)} billion m3</span> per year across all listed countries
        </div>

        {orderedRegions.map(region => (
          <div key={region}>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">{region}</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {byRegion[region].map(c => (
                <Link key={c.code} to={'/water/' + c.code.toLowerCase()} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card hover:border-sky-400 p-3 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-black text-muted-foreground tabular-nums shrink-0 w-8">#{c.rank}</span>
                    <span className="font-semibold text-sm truncate">{c.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums shrink-0">{c.value.toFixed(1)} bn m3 <span className="text-muted-foreground/60">({c.year})</span></span>
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Water Use by Country'} />
        </div>
      </div>
    </>
  )
}
