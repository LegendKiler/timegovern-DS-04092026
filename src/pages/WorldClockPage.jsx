import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Sparkles, BookOpen, Globe, Users, ArrowRight, Sun, Moon, MapPin, CalendarClock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import WorldClockPinned from '../components/WorldClockPinned'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a world clock?', a: 'A world clock shows the current time in multiple cities at once. Each city shows its live local time, date, and UTC offset, so you can see at a glance what time it is wherever your contacts are.' },
  { q: 'How many cities can I pin?', a: 'The free tier allows up to 12 pinned cities. A supporter tier with 50 cities is coming soon. Pins are saved to your browser automatically.' },
  { q: 'Are the clocks accurate?', a: 'Yes. The clocks use your browser Intl API with the IANA time zone database, the same source used by operating systems worldwide. They also automatically handle daylight saving time.' },
  { q: 'Do the clocks update live?', a: 'Yes. Every clock refreshes every second, so you always see the current time.' },
  { q: 'Is my city selection saved?', a: 'Yes. Your pinned cities are stored in your browser local storage. They persist across sessions on the same device. No account required.' },
  { q: 'Can I see day and night in each city?', a: 'Yes. Each pinned card shows a sun or moon icon based on whether it is daytime (06:00-20:00 local) or nighttime in that city.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'World Clock', description: 'Free world clock with up to 12 pinned cities, live time, day/night indicators, and UTC offsets.', applicationCategory: 'UtilityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/world-clock', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function WorldClockPage() {
  useEffect(() => {
    document.title = 'World Clock - Live Time in Any City | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free world clock with up to 12 pinned cities. Live time, day/night indicators, and UTC offsets. No signup, 100 percent private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">Free - Up to 12 cities - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Clock className="h-10 w-10 md:h-14 md:w-14 text-cyan-300" />
              World Clock
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Pin up to 12 cities and see their live local time, date, and UTC offset at a glance.
            </p>
          </div>
        </div>

        <WorldClockPinned />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this tool shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><MapPin className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Up to 12 cities</h3><p className="text-xs text-muted-foreground">Pin 12 cities free. Supporter tier of 50 cities coming soon.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Sun className="h-5 w-5 text-amber-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Day and night</h3><p className="text-xs text-muted-foreground">Sun and moon icons show whether each city is in daytime or nighttime.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Globe className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">UTC offsets</h3><p className="text-xs text-muted-foreground">Each card shows the exact current offset like UTC+05:30 for India.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Click Add city to open the picker.</li>
            <li>Search by name or filter by region (North America, Europe, Asia, and more).</li>
            <li>Click any city to pin it. Click again to remove.</li>
            <li>Your pins are saved automatically in your browser.</li>
            <li>Use the region filter to quickly find the cities you care about.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/time-zone-converter" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1">Time Zone Converter</h3>
              <p className="text-xs text-muted-foreground">Any two cities, any time.</p>
            </Link>
            <Link to="/meeting-planner" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <CalendarClock className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Meeting Planner</h3>
              <p className="text-xs text-muted-foreground">24-hour heatmap for up to 12 cities.</p>
            </Link>
            <Link to="/team-alignment" className="block rounded-xl border border-border bg-card hover:border-purple-400 p-5 transition-colors">
              <Users className="h-5 w-5 text-purple-500 mb-2" />
              <h3 className="font-bold mb-1">Team Alignment</h3>
              <p className="text-xs text-muted-foreground">See where your team is in their day.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'World Clock'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Times are computed in your browser. No data sent to any server. For informational purposes only.
        </div>
      </div>
    </>
  )
}