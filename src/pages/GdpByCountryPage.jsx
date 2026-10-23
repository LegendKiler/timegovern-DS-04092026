import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { COUNTRY_GDP, TOTAL_WORLD_GDP } from '../data/countryGdp'
import { REGION_ORDER } from '../data/countryCodes'

const FAQ = [
  { q: "How many countries are listed?", a: "All COUNTRY_GDP.length countries with World Bank GDP data." },
  { q: "What is total global GDP?", a: "Approximately (TOTAL_WORLD_GDP/1000).toFixed(2) trillion USD per year across all listed countries." },
  { q: "Which country has the largest GDP?", a: "The United States leads at ~$29 trillion, followed by China at ~$19 trillion, then Germany, Japan, and India." },
  { q: "What units are used?", a: "Billions of current US dollars, per the World Bank NY.GDP.MKTP.CD indicator. Not adjusted for inflation or purchasing power." },
]
const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

export default function GdpByCountryPage() {
  const byRegion = useMemo(() => {
    const out = {}
    for (const c of COUNTRY_GDP) { if (!out[c.region]) out[c.region] = []; out[c.region].push(c) }
    return out
  }, [])
  const orderedRegions = useMemo(() => {
    const known = REGION_ORDER.filter(r => byRegion[r] && byRegion[r].length > 0)
    const extras = Object.keys(byRegion).filter(r => !known.includes(r))
    return [...known, ...extras]
  }, [byRegion])
  useEffect(() => {
    document.title = "GDP by Country" + ' - All ' + COUNTRY_GDP.length + ' Countries Ranked | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "GDP by Country ranked by country. Source: World Bank.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">{COUNTRY_GDP.length} countries</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <DollarSign className="h-10 w-10 md:h-14 md:w-14 text-emerald-300" />
              GDP by Country
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Every country ranked by gdp, grouped by region.
            </p>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground">
          Global total: <span className="font-bold text-foreground tabular-nums">{(TOTAL_WORLD_GDP / 1000).toFixed(2) + ' trillion USD'}</span>
        </div>
        
        {orderedRegions.map(region => (
          <div key={region}>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">{region}</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {byRegion[region].map(c => (
                <Link key={c.code} to={'/gdp/' + c.code.toLowerCase()} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card hover:border-emerald-400 p-3 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-black text-muted-foreground tabular-nums shrink-0 w-8">#{c.rank}</span>
                    <span className="font-semibold text-sm truncate">{c.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums shrink-0">{(v => '$' + v.toFixed(1) + 'B')(c.value)} <span className="text-muted-foreground/60">({c.year})</span></span>
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : "GDP by Country"} />
        </div>
      </div>
    </>
  )
}
