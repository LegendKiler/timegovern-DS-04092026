import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cloud, CloudSun, Sparkles, ArrowRight, ExternalLink, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { ASTRO_CITIES } from '../data/astroCities'

const FAQ = [
  { q: 'Where does the weather data come from?', a: 'Weather data comes from Open-Meteo, an open-source weather API that aggregates models from national weather services including NOAA, DWD, and MeteoFrance. No API key or tracking required.' },
  { q: 'How often is the weather updated?', a: 'Open-Meteo updates forecasts every hour. Each visit to a city weather page fetches fresh data.' },
  { q: 'Is this a replacement for official weather warnings?', a: 'No. Our pages are informational. For severe weather alerts, always check your national meteorological service or local authorities.' },
  { q: 'How accurate is the forecast?', a: 'Open-Meteo blends multiple national models for accuracy that is comparable to or better than most consumer weather apps, especially for temperature and precipitation probability.' },
  { q: 'Does this work offline?', a: 'Weather requires an internet connection for live data. The static city information (climate, location, hemisphere) is always available.' },
  { q: 'Which cities are covered?', a: 'All cities in our astronomy database, currently around 490 worldwide. See the city grid below.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

export default function WeatherPage() {
  useEffect(() => {
    document.title = 'Weather - Live Conditions for 490 Cities | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Live weather conditions and 7-day forecasts for 490 cities worldwide. Powered by Open-Meteo. No signup, no ads on tool pages.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  // Group cities by region for the grid
  const byRegion = {}
  for (const c of ASTRO_CITIES) {
    if (!byRegion[c.region]) byRegion[c.region] = []
    byRegion[c.region].push(c)
  }
  const regions = Object.keys(byRegion).sort()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-blue-950 to-indigo-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-sky-200">{ASTRO_CITIES.length} cities - Open-Meteo - Live</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <CloudSun className="h-10 w-10 md:h-14 md:w-14 text-sky-300" />
              Weather
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Live conditions and 7-day forecasts for {ASTRO_CITIES.length} cities worldwide. No signup. No ads on tool pages.
            </p>
          </div>
        </div>

        {regions.map((region) => (
          <div key={region}>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">{region}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {byRegion[region].map((c) => (
                <Link key={c.slug} to={'/weather/' + c.slug} className="block rounded-lg border border-border bg-card hover:border-sky-500 p-3 transition-colors group">
                  <div className="text-sm font-bold group-hover:text-sky-500 transition-colors">{c.name}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{c.lat.toFixed(1)}, {c.lng.toFixed(1)}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/sun" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <Cloud className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">Sunrise &amp; Sunset</h3>
              <p className="text-xs text-muted-foreground">Sun times for every city.</p>
            </Link>
            <Link to="/moon" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Cloud className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Moon Phase</h3>
              <p className="text-xs text-muted-foreground">Current phase and moon age.</p>
            </Link>
            <Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1">World Clock</h3>
              <p className="text-xs text-muted-foreground">Live time in every city.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Official sources</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">Open-Meteo</h3>
              <p className="text-xs text-muted-foreground">The open weather API we use.</p>
            </a>
            <a href="https://wmo.int/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">WMO</h3>
              <p className="text-xs text-muted-foreground">World Meteorological Organization.</p>
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title="Weather - TimeGovern" />
        </div>
      </div>
    </>
  )
}