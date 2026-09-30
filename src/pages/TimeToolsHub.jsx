import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Globe, Sparkles, ArrowRight, Clock, CalendarClock, BookOpen, MapPin, Calendar, Timer, Users, Grid3x3 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const TOOLS = [
  { to: '/time-zone-converter', name: 'Time Zone Converter', desc: 'Compare times across cities worldwide with offset badges and DST handling.', icon: Globe, color: 'sky' },
  { to: '/world-clock', name: 'World Clock', desc: 'Live time in up to 8 cities from 136 worldwide, with day/night indicators.', icon: MapPin, color: 'indigo' },
  { to: '/countdown-timer', name: 'Countdown Timer', desc: 'Track up to 5 countdowns to any event with days, hours, minutes, seconds.', icon: CalendarClock, color: 'purple' },
  { to: '/team-alignment', name: 'Team Alignment', desc: 'Local time and work/sleep status for your team cities.', icon: Users, color: 'purple' },
  { to: '/meeting-heatmap', name: 'Extended Meeting Heatmap', desc: 'Day boundaries, PNG export, duration selector.', icon: Grid3x3, color: 'sky' },
  { to: '/meeting-planner', name: 'Meeting Planner', desc: '24-hour heatmap with scoring for up to 12 cities.', icon: CalendarClock, color: 'indigo' },
  { to: '/meeting-hour-strip', name: 'Meeting Hour Strip', desc: '24-hour view of work, shoulder, and sleep hours for up to 6 cities.', icon: Users, color: 'sky' },
  { to: '/days-between-dates', name: 'Days Between Dates', desc: 'Calculate the exact number of days between any two dates.', icon: Calendar, color: 'emerald' },
  { to: '/hours-calculator', name: 'Hours Calculator', desc: 'Add, subtract, and convert hours and minutes for any period.', icon: Clock, color: 'amber' },
  { to: '/time-card-calculator', name: 'Time Card Calculator', desc: 'Calculate work hours and weekly pay from clock-in and clock-out times.', icon: Timer, color: 'rose' },
]

const ARTICLES = [
  { to: '/blog/why-different-countries-have-different-times', name: 'Why Different Countries Have Different Times' },
  { to: '/blog/how-to-schedule-meetings-across-time-zones', name: 'How to Schedule Meetings Across Time Zones' },
]

const FAQ = [
  { q: 'What tools are in the time toolkit?', a: 'TimeGovern has three connected time tools: a Time Zone Converter, a World Clock with 136 cities, and a Countdown Timer for tracking events. All free, no signup.' },
  { q: 'Do these tools handle daylight saving time?', a: 'Yes. All three tools use the IANA time zone database, so daylight saving transitions are handled automatically for every city. You never need to adjust manually.' },
  { q: 'How many cities can I track in the World Clock?', a: 'You can display up to 8 cities at once in the World Clock, chosen from a library of 136 major cities across 8 regions - Oceania, Asia, Middle East, Europe, Africa, North America, South America, and UTC.' },
  { q: 'How many countdowns can I track?', a: 'Up to 5 simultaneous countdowns in the Countdown Timer. Each one updates live and can trigger a sound or browser notification when it hits zero.' },
  { q: 'Are the time tools free?', a: 'Yes, all time tools are free with no signup. They run entirely in your browser - your city list and countdowns are saved to your device only.' },
  { q: 'Can I use them offline?', a: 'Once loaded, yes. All three tools run client-side using your device clock and the built-in time zone database. No internet connection required after the page loads.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Time Zone & World Clock Tools', description: 'Free time zone tools - converter, world clock, and countdown timer.', url: 'https://timegovern.com/time-tools' }

export default function TimeToolsHub() {
  useEffect(() => {
    document.title = 'Time Zone & World Clock Tools - Free & Private | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free time zone tools - Time Zone Converter, World Clock with 136 cities, and Countdown Timer. All in one place, no signup, 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-sky-200">3 tools - Free - Private</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Globe className="h-10 w-10 md:h-14 md:w-14 text-sky-300" />
              Time Tools
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Compare times across cities, track live clocks worldwide, and count down to any event.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">The three time tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {TOOLS.map((t) => {
              const Icon = t.icon
              return (
                <Link key={t.to} to={t.to} className={'block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors'}>
                  <div className="flex items-start gap-3">
                    <div className={'p-2.5 rounded-xl bg-' + t.color + '-500/10 border border-' + t.color + '-500/30 shrink-0'}>
                      <Icon className={'h-5 w-5 text-' + t.color + '-500'} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black mb-1 text-sm">{t.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{t.desc}</p>
                      <div className="text-[11px] font-bold text-sky-500 inline-flex items-center gap-1">Open tool <ArrowRight className="h-3 w-3" /></div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Why these time tools work together</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Global work means thinking in multiple time zones at once. The Time Zone Converter helps you test specific moments. The World Clock keeps constant visibility on where your team is. The Countdown Timer tracks what is coming up next. Together they replace scattered browser tabs and phone apps.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related articles</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {ARTICLES.map((a) => (
              <Link key={a.to} to={a.to} className="block rounded-xl border border-border bg-card hover:border-sky-400 p-4 transition-colors">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-sky-500 shrink-0" />
                  <span className="text-sm font-bold">{a.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Time Tools'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Time zone rules change occasionally due to political decisions. Always verify current rules for critical scheduling.
        </div>
      </div>
    </>
  )
}