import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Globe, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { COUNTRY_POPULATIONS, TOTAL_WORLD_POPULATION } from '../data/countryPopulations'
import { REGION_ORDER } from '../data/countryCodes'

const FAQ = [
  { q: 'How many countries are listed?', a: 'This page lists all ' + COUNTRY_POPULATIONS.length + ' countries with population data from the World Bank. Each links to a dedicated country population page with live counter, world rank, and growth rate.' },
  { q: 'What is the total world population?', a: 'The sum of all countries on this page is approximately ' + (TOTAL_WORLD_POPULATION / 1e9).toFixed(2) + ' billion people. This excludes small territories not tracked by the World Bank.' },
  { q: 'Which is the most populous country?', a: 'India, with approximately 1.44 billion people. China follows closely at around 1.41 billion.' },
  { q: 'Which countries are growing fastest?', a: 'Most of the fastest-growing countries by rate are in Sub-Saharan Africa, including Niger, Angola, and the Democratic Republic of the Congo.' },
  { q: 'Where does the data come from?', a: 'World Bank SP.POP.TOTL indicator, built on UN World Population Prospects. The data updates annually.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Population by Country', description: 'Population of every country, ranked, with live counters and growth rates.', url: 'https://timegovern.com/population' }

export default function PopulationByCountryPage() {
  const byRegion = useMemo(() => {
    const out = {}
    for (const c of COUNTRY_POPULATIONS) {
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
    document.title = 'Population by Country - All 204 Countries Ranked | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Population of every country, ranked and grouped by region. Live counters, world rank, and growth rates. Source: World Bank / UN.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">{COUNTRY_POPULATIONS.length} countries</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Globe className="h-10 w-10 md:h-14 md:w-14 text-indigo-300" />
              Population by Country
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Every country ranked by population, grouped by region. Click any to see its live counter, world rank, and growth rate.
            </p>
          </div>
        </div>

        {orderedRegions.map(region => (
          <div key={region}>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">{region}</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {byRegion[region].map(c => (
                <Link key={c.code} to={'/population/' + c.code.toLowerCase()} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card hover:border-indigo-400 p-3 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-black text-muted-foreground tabular-nums shrink-0 w-8">#{c.rank}</span>
                    <span className="font-semibold text-sm truncate">{c.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums shrink-0">{c.population.toLocaleString('en-US')}</span>
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Population by Country'} />
        </div>
      </div>
    </>
  )
}