import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Sparkles, BookOpen, Globe, Users, ArrowRight, CalendarClock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import MeetingHourStrip from '../components/MeetingHourStrip'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a meeting hour strip?', a: 'A visual 24-hour view showing, for each city you select, which hours fall in working time (9-18), shoulder time (7-9 and 18-21), or sleep time. It shows at a glance when a meeting works for everyone.' },
  { q: 'How does the overlap score work?', a: 'Each hour gets a score based on how many selected cities are in work hours (full points), shoulder hours (partial), or sleep hours (penalty). The best window is the UTC hour with the highest total score.' },
  { q: 'How many cities can I compare?', a: 'Between 2 and 6 cities. For larger groups, use the full Meeting Planner (coming soon) which handles more cities with a heatmap view.' },
  { q: 'Does it handle daylight saving time?', a: 'Yes. Everything is computed live in your browser using the IANA time zone database, so DST transitions are handled automatically for every city.' },
  { q: 'Is this private?', a: 'Yes. All computations run in your browser. No data is sent anywhere.' },
  { q: 'What counts as working hours?', a: 'By default, 9am to 6pm local time. Shoulder hours are 7-9am and 6-9pm. Outside those ranges is treated as sleep time. You cannot currently customise these thresholds - email us if you need that.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Meeting Hour Strip', description: 'Visual 24-hour view of working/shoulder/sleep hours for any set of cities. Find the best meeting window instantly.', applicationCategory: 'UtilityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/meeting-hour-strip', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function MeetingHourStripPage() {
  useEffect(() => {
    document.title = 'Meeting Hour Strip - Best Time for Global Calls | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Visual 24-hour view of working hours for any set of cities. Find the best meeting window instantly. Free, private, no signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-sky-200">Free - Private - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Clock className="h-10 w-10 md:h-14 md:w-14 text-sky-300" />
              Meeting Hour Strip
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Pick up to 6 cities and see at a glance which hours work for everyone.
            </p>
          </div>
        </div>

        <MeetingHourStrip />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this tool shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Globe className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1 text-sm">24-hour view</h3><p className="text-xs text-muted-foreground">Every UTC hour of the day, colour-coded for each selected city.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Users className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Best overlap window</h3><p className="text-xs text-muted-foreground">Auto-detects the UTC hour where most cities are in work hours.</p></CardContent></Card>
            <Card><CardContent className="p-5"><CalendarClock className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">DST-aware</h3><p className="text-xs text-muted-foreground">Daylight saving is handled automatically for every city.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Pick 2 to 6 cities from the grid (use the region filter for quick access).</li>
            <li>Each row shows a city's 24-hour view — green is working time, amber is shoulder, red is sleep.</li>
            <li>Look for vertical columns that are mostly green.</li>
            <li>The bottom "Best meeting window" card shows the exact UTC hour with the highest overlap score.</li>
            <li>Convert to local times using the city-by-city breakdown.</li>
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
            <Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Clock className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">World Clock</h3>
              <p className="text-xs text-muted-foreground">Live time in 136 cities.</p>
            </Link>
            <Link to="/time-tools" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <CalendarClock className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">All Time Tools</h3>
              <p className="text-xs text-muted-foreground">Every time calculator.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Meeting Hour Strip'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Working hours are assumed 9am-6pm local. DST is auto-detected. For informational purposes only.
        </div>
      </div>
    </>
  )
}