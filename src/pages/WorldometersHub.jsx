import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Globe, Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import LiveCounter from '../components/worldometers/LiveCounter'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { WORLD_RATES, CATEGORY_ORDER, CATEGORY_LABELS } from '../data/worldRates'

const FAQ = [
  { q: 'What are live world counters?', a: 'Live counters display world statistics that change in real time - population, births, deaths, CO2 emissions, energy use, and more. Each counter ticks up based on published annual rates from primary sources like the UN, World Bank, IEA, and UNEP.' },
  { q: 'Where does the data come from?', a: 'Every counter on this page cites a primary source - UN World Population Prospects, Global Carbon Budget, IEA World Energy Outlook, UNEP Food Waste Index. We never invent numbers; we show the source under each counter so you can verify the rate.' },
  { q: 'How accurate are the counters?', a: 'The counters are derived from annual totals divided by the number of seconds in a year. They are accurate to the rate, not to any individual event. Real populations grow in bursts; the counter smooths that out to show an average.' },
  { q: 'How often are the rates updated?', a: 'Rates are refreshed when the underlying source publishes new annual data - typically once per year for population and climate metrics, more often for economic indicators.' },
  { q: 'Is there a per-country breakdown?', a: 'Country-level pages are in development. For now, each counter shows the global total. Population and CO2 pages will have per-country drill-downs added in the next release.' },
  { q: 'Can I embed these counters on my own site?', a: 'Not yet via an official widget, but each counter page is public and shareable. An embed API is planned.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Live World Counters', description: 'Real-time world statistics - population, births, deaths, CO2 emissions, energy use, and food waste.', url: 'https://timegovern.com/worldometers' }

const ALL_METRICS = Object.values(WORLD_RATES)

export default function WorldometersHub() {
  useEffect(() => {
    document.title = 'Live World Counters - Population, Births, Deaths, CO2 | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Live world statistics updated every second - population, births, deaths, CO2 emissions, energy use, and food waste. Sources cited per counter.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Live - Updated Every Second</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Globe className="h-10 w-10 md:h-14 md:w-14 text-indigo-300" />
              Live World Counters
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Real-time statistics for the whole planet - population, births, deaths, CO2, energy, and food waste. Every counter cites its primary source.
            </p>
          </div>
        </div>

        {CATEGORY_ORDER.map((cat) => {
          const metrics = ALL_METRICS.filter((m) => m.category === cat)
          if (metrics.length === 0) return null
          return (
            <div key={cat}>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">{CATEGORY_LABELS[cat]}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {metrics.map((m) => (
                  <Link key={m.key} to={m.route} className="block rounded-2xl border border-border bg-card hover:border-indigo-400 transition-colors overflow-hidden">
                    <div className={'relative bg-gradient-to-br ' + m.gradient + ' p-6 text-white'}>
                      <div className="text-xs uppercase tracking-widest text-white/60 mb-4">{m.shortLabel}</div>
                      <LiveCounter metric={m} size="md" showRate={false} />
                    </div>
                    <div className="p-4 flex items-center justify-between gap-3">
                      <div className="text-xs text-muted-foreground line-clamp-2">{m.description}</div>
                      <ArrowRight className="h-4 w-4 text-indigo-500 shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Live World Counters'} />
        </div>
      </div>
    </>
  )
}