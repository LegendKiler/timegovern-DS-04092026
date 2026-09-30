import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CalendarClock, Sparkles, BookOpen, Globe, Users, ArrowRight, Clock, Trophy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import MeetingPlanner from '../components/MeetingPlanner'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What does the Meeting Planner do?', a: 'It shows a 24-hour heatmap for any set of 2 to 12 cities. Every UTC hour is scored based on how many of the selected cities fall in work, shoulder, or sleep hours. The best and worst windows are highlighted automatically.' },
  { q: 'How is the overlap score calculated?', a: 'Each hour gets points based on the local time in every selected city. Work hours give full points, shoulder hours give partial points, and sleep hours subtract points. The result is normalised to a 0-100 scale.' },
  { q: 'What are the quick scenarios?', a: 'Four presets: US + Europe, Europe + Asia, US + Asia, and a full Global set (US, Europe, and APAC). Click a scenario to instantly load that city combination.' },
  { q: 'Can I save my selection?', a: 'Your selection is stored in the browser for the current session. For permanent saved presets, use the World Clock supporter tier (coming soon) or bookmark the page after selection.' },
  { q: 'Does it handle daylight saving time?', a: 'Yes. All calculations use the browser Intl API with the IANA time zone database, so daylight saving transitions are automatically accounted for.' },
  { q: 'Is this tool free?', a: 'Yes, completely free with no signup. All calculations run in the browser. No data is ever sent to a server.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Global Meeting Planner', description: 'Free global meeting planner with 24-hour heatmap, scoring, and best window detection for up to 12 cities.', applicationCategory: 'UtilityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/meeting-planner', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function MeetingPlannerPage() {
  useEffect(() => {
    document.title = 'Global Meeting Planner - 24h Heatmap for Any Cities | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free global meeting planner with 24-hour heatmap and scoring. Find the best time for calls across up to 12 cities. No signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-sky-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-sky-200">Free - Up to 12 cities - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <CalendarClock className="h-10 w-10 md:h-14 md:w-14 text-sky-300" />
              Global Meeting Planner
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              A 24-hour heatmap and scoring system for scheduling across up to 12 cities. Find the best window in one glance.
            </p>
          </div>
        </div>

        <MeetingPlanner />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this tool shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Globe className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1 text-sm">24-hour heatmap</h3><p className="text-xs text-muted-foreground">Every UTC hour, every selected city, colour-coded by category.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Trophy className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Best + worst windows</h3><p className="text-xs text-muted-foreground">Automatically highlights the optimal and worst meeting hours.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Users className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Up to 12 cities</h3><p className="text-xs text-muted-foreground">Handles everything from 2 to 12 cities in a single view.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Click a quick scenario to load a preset (US+Europe, Europe+Asia, US+Asia, or Global).</li>
            <li>Or pick 2 to 12 cities manually from the grid. Use region filters for quick access.</li>
            <li>Read the heatmap — green means work hours, amber is shoulder, red is sleep.</li>
            <li>Look at the "Overlap score" row — the brightest hour is the best window.</li>
            <li>Best and worst windows are displayed as cards below the heatmap.</li>
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
            <Link to="/meeting-hour-strip" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <Clock className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1">Meeting Hour Strip</h3>
              <p className="text-xs text-muted-foreground">Simpler 2-6 city view.</p>
            </Link>
            <Link to="/time-zone-converter" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Time Zone Converter</h3>
              <p className="text-xs text-muted-foreground">Any two cities, any time.</p>
            </Link>
            <Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <CalendarClock className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">World Clock</h3>
              <p className="text-xs text-muted-foreground">Live time in 136 cities.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Global Meeting Planner'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Working hours are assumed 9am-6pm local. DST is auto-detected. For informational purposes only.
        </div>
      </div>
    </>
  )
}