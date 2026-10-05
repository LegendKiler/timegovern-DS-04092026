import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Globe, Sparkles, ArrowRight, Users, TrendingUp, TrendingDown, BookOpen, RefreshCw, Database } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { COUNTRY_POPULATIONS, TOTAL_WORLD_POPULATION } from '../data/countryPopulations'
import { useCountryPopulation } from '../hooks/useCountryPopulation'

export default function CountryPopulationPage() {
  const { code } = useParams()
  const { country, status, cacheStatus } = useCountryPopulation(code)

  const derived = useMemo(() => {
    if (!country) return null
    const worldShare = (country.population / TOTAL_WORLD_POPULATION) * 100
    const doublingYears = country.growthRate > 0.01 ? (70 / country.growthRate).toFixed(1) : null
    const halvingYears = country.growthRate < -0.01 ? (70 / Math.abs(country.growthRate)).toFixed(1) : null
    return { worldShare, doublingYears, halvingYears }
  }, [country])

  const peers = useMemo(() => {
    if (!country) return []
    return COUNTRY_POPULATIONS
      .filter(c => c.region === country.region && c.code !== country.code)
      .slice(0, 6)
  }, [country])

  useEffect(() => {
    if (!country) return
    document.title = country.name + ' Population - Live Counter & Stats | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Live population counter for ' + country.name + ' - current population, world rank, growth rate, and share of world population. Source: World Bank / UN.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [country])

  if (!country) {
    return <Navigate to="/population" replace />
  }

  const freshnessLabel = {
    live:      'Live from World Bank',
    cache:     'Fresh from cache (24h)',
    loading:   'Updating...',
    bundled:   'Snapshot: ' + country.year,
  }[status] || 'Snapshot: ' + country.year

  const freshnessIcon = (status === 'live' || status === 'cache') ? RefreshCw : Database

  const FAQ = [
    { q: 'What is the population of ' + country.name + '?', a: 'The current population is approximately ' + country.population.toLocaleString('en-US') + ' as of ' + country.year + ', according to World Bank data.' },
    { q: 'What is the world population rank of ' + country.name + '?', a: country.name + ' ranks #' + country.rank + ' in the world by population, out of the ' + COUNTRY_POPULATIONS.length + ' countries tracked on this site.' },
    { q: 'How fast is ' + country.name + '\'s population growing?', a: 'The annual growth rate is approximately ' + country.growthRate.toFixed(2) + '% per year. ' + (country.growthRate > 0 ? 'At this rate, the population would double in roughly ' + (70 / country.growthRate).toFixed(0) + ' years.' : 'The population is roughly stable or declining.') },
    { q: 'What share of the world population lives in ' + country.name + '?', a: country.name + ' accounts for approximately ' + derived.worldShare.toFixed(2) + '% of the world population.' },
    { q: 'How fresh is this data?', a: 'The page attempts a live refresh from the World Bank API on every visit, cached for 24 hours. If the API is unreachable, it falls back to a bundled snapshot from ' + country.year + '.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' },
    { '@type': 'ListItem', position: 2, name: 'Population', item: 'https://timegovern.com/population' },
    { '@type': 'ListItem', position: 3, name: country.name, item: 'https://timegovern.com/population/' + country.code.toLowerCase() },
  ] }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/population" className="hover:underline">Population</Link>
          <span className="mx-1">/</span>
          <span>{country.name}</span>
        </nav>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">{country.region}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 flex items-center gap-4">
              <Globe className="h-10 w-10 md:h-12 md:w-12 text-indigo-300" />
              {country.name}
            </h1>
            <div className="text-white/60 text-sm mb-8">Rank #{country.rank} in the world by population</div>
            <div className="text-center">
              <div className="text-5xl md:text-7xl font-black tabular-nums tracking-tight">
                {country.population.toLocaleString('en-US')}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-2">people ({country.year})</div>
              <div className="inline-flex items-center gap-1.5 text-[11px] text-white/50 mt-3">
                {(() => { const I = freshnessIcon; return <I className="h-3 w-3" /> })()}
                <span>{freshnessLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <Card><CardContent className="p-5 text-center">
            <Users className="h-5 w-5 text-blue-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">World share</div>
            <div className="text-2xl font-black tabular-nums">{derived.worldShare.toFixed(2)}%</div>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            {country.growthRate >= 0 ? <TrendingUp className="h-5 w-5 text-emerald-500 mx-auto mb-2" /> : <TrendingDown className="h-5 w-5 text-rose-500 mx-auto mb-2" />}
            <div className="text-xs text-muted-foreground mb-1">Annual growth</div>
            <div className="text-2xl font-black tabular-nums">{country.growthRate.toFixed(2)}%</div>
          </CardContent></Card>
          <Card><CardContent className="p-5 text-center">
            <TrendingUp className="h-5 w-5 text-violet-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">{derived.doublingYears ? 'Doubling time' : derived.halvingYears ? 'Halving time' : 'Change'}</div>
            <div className="text-2xl font-black tabular-nums">
              {derived.doublingYears ? derived.doublingYears + 'y' : derived.halvingYears ? derived.halvingYears + 'y' : 'stable'}
            </div>
          </CardContent></Card>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Source: <a href="https://data.worldbank.org/indicator/SP.POP.TOTL" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">World Bank SP.POP.TOTL ({country.year})</a>
          {cacheStatus && (
            <span className="ml-2">
              &middot; cached {Math.round(cacheStatus.ageMs / 60000)} min ago
            </span>
          )}
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        {peers.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Nearby {country.region}</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {peers.map((p) => (
                <Link key={p.code} to={'/population/' + p.code.toLowerCase()} className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-4 transition-colors">
                  <BookOpen className="h-4 w-4 text-indigo-500 mb-2" />
                  <h3 className="font-bold mb-1 text-sm">{p.name}</h3>
                  <p className="text-xs text-muted-foreground tabular-nums">{p.population.toLocaleString('en-US')}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : country.name + ' Population'} />
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4 text-sm text-center">
          <Link to="/world-population-clock" className="inline-flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            See the world population clock <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}