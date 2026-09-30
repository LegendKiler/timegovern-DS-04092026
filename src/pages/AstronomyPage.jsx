import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sun, Moon, Sparkles, ArrowRight, ExternalLink, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { ASTRO_CITIES } from '../data/astroCities'

const FAQ = [
  { q: 'What is the difference between sunrise and civil twilight?', a: 'Sunrise is when the top of the sun appears above the horizon. Civil twilight is the period when the sun is between 0 and 6 degrees below the horizon - bright enough to see without artificial light.' },
  { q: 'What are the three twilight phases?', a: 'Civil twilight (sun 0 to -6 degrees), nautical twilight (-6 to -12 degrees, horizon visible at sea), and astronomical twilight (-12 to -18 degrees, sky still not fully dark).' },
  { q: 'How accurate are these calculations?', a: 'We use the NOAA solar position algorithm, accurate to within about one minute for most latitudes. Atmospheric refraction is included in the sunrise/sunset calculation.' },
  { q: 'Why does day length change through the year?', a: 'Earth axial tilt of 23.4 degrees means different latitudes receive different amounts of sunlight throughout the year. This causes the seasonal variation in day length.' },
  { q: 'What is the golden hour?', a: 'Golden hour is the period shortly after sunrise or before sunset when sunlight is soft and warm. It generally occurs when the sun is between -4 and +6 degrees altitude.' },
  { q: 'Do the same times apply everywhere in a timezone?', a: 'No. Sunrise and sunset vary by longitude within a timezone. The times shown are for the exact latitude and longitude of each city.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

export default function AstronomyPage() {
  useEffect(() => {
    document.title = 'Sun and Moon - Sunrise, Sunset, Twilight, Moon Phase | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Sunrise, sunset, twilight, golden hour, moon phase, and moonrise for 45 world ASTRO_CITIES. Accurate NOAA solar calculations.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">45 ASTRO_CITIES - NOAA algorithm</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight">Sun &amp; Moon</h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Sunrise, sunset, all three twilight phases, golden hour, moon phase, and next new and full moon - for 45 ASTRO_CITIES worldwide.
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Explore</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/sun" className="block rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5 hover:border-amber-500 p-6 transition-all group">
              <Sun className="h-10 w-10 text-amber-500 mb-3" />
              <h3 className="text-2xl font-black mb-2 group-hover:text-amber-500 transition-colors">Sun</h3>
              <p className="text-sm text-muted-foreground mb-4">Sunrise, sunset, solar noon, day length, and all three twilight phases.</p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-500">Open Sun <ArrowRight className="h-4 w-4" /></span>
            </Link>
            <Link to="/moon" className="block rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 hover:border-indigo-500 p-6 transition-all group">
              <Moon className="h-10 w-10 text-indigo-500 mb-3" />
              <h3 className="text-2xl font-black mb-2 group-hover:text-indigo-500 transition-colors">Moon</h3>
              <p className="text-sm text-muted-foreground mb-4">Current phase, illumination, moon age, and next new and full moon dates.</p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-indigo-500">Open Moon <ArrowRight className="h-4 w-4" /></span>
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">ASTRO_CITIES</h2>
          <Card className="border-border">
            <CardContent className="p-5">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {ASTRO_CITIES.map((c) => (
                  <div key={c.slug} className="rounded-lg border border-border/50 bg-card p-2.5">
                    <div className="text-sm font-bold mb-1">{c.name}</div>
                    <div className="flex gap-2 text-[10px]">
                      <Link to={'/sun/' + c.slug} className="text-amber-500 hover:underline font-bold">Sun</Link>
                      <Link to={'/moon/' + c.slug} className="text-indigo-500 hover:underline font-bold">Moon</Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1">World Clock</h3>
              <p className="text-xs text-muted-foreground">Live time in 45 ASTRO_CITIES.</p>
            </Link>
            <Link to="/calendar" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Calendar</h3>
              <p className="text-xs text-muted-foreground">Months, weeks, and leap years.</p>
            </Link>
            <Link to="/country-codes" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">Country Codes</h3>
              <p className="text-xs text-muted-foreground">118 countries with full data.</p>
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Official sources</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="https://gml.noaa.gov/grad/solcalc/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">NOAA Solar Calculator</h3>
              <p className="text-xs text-muted-foreground">The algorithm we use.</p>
            </a>
            <a href="https://www.timeanddate.com/astronomy/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">Astronomy Reference</h3>
              <p className="text-xs text-muted-foreground">Sun and moon data reference.</p>
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title="Sun and Moon - TimeGovern" />
        </div>
      </div>
    </>
  )
}