import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { HeartPulse, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { COUNTRY_LIFE_EXPECTANCY } from '../data/countryLifeExpectancy'
import { REGION_ORDER } from '../data/countryCodes'

const FAQ = [
  { q: "How many countries are listed?", a: "All COUNTRY_LIFE_EXPECTANCY.length countries with World Bank life expectancy data." },
  { q: "Which country has the highest life expectancy?", a: "Monaco leads at ~86.5 years, followed by San Marino, Hong Kong, Kuwait, and Switzerland." },
  { q: "What is life expectancy at birth?", a: "The number of years a newborn would live if current age-specific mortality rates stayed constant." },
  { q: "Where does the data come from?", a: "World Bank indicator SP.DYN.LE00.IN, which compiles UN World Population Prospects." },
]
const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

export default function LifeExpectancyByCountryPage() {
  const byRegion = useMemo(() => {
    const out = {}
    for (const c of COUNTRY_LIFE_EXPECTANCY) { if (!out[c.region]) out[c.region] = []; out[c.region].push(c) }
    return out
  }, [])
  const orderedRegions = useMemo(() => {
    const known = REGION_ORDER.filter(r => byRegion[r] && byRegion[r].length > 0)
    const extras = Object.keys(byRegion).filter(r => !known.includes(r))
    return [...known, ...extras]
  }, [byRegion])
  useEffect(() => {
    document.title = "Life Expectancy by Country" + ' - All ' + COUNTRY_LIFE_EXPECTANCY.length + ' Countries Ranked | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "Life Expectancy by Country ranked by country. Source: World Bank.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-purple-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-violet-300">{COUNTRY_LIFE_EXPECTANCY.length} countries</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <HeartPulse className="h-10 w-10 md:h-14 md:w-14 text-violet-300" />
              Life Expectancy by Country
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Every country ranked by life expectancy, grouped by region.
            </p>
          </div>
        </div>
        {orderedRegions.map(region => (
          <div key={region}>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">{region}</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {byRegion[region].map(c => (
                <Link key={c.code} to={'/life-expectancy/' + c.code.toLowerCase()} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card hover:border-violet-400 p-3 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-black text-muted-foreground tabular-nums shrink-0 w-8">#{c.rank}</span>
                    <span className="font-semibold text-sm truncate">{c.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums shrink-0">{(v => v.toFixed(1) + ' yrs')(c.value)} <span className="text-muted-foreground/60">({c.year})</span></span>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : "Life Expectancy by Country"} />
        </div>
      </div>
    </>
  )
}
