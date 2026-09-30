import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {CalendarClock, Sparkles, BookOpen, Clock, Zap, Gift, ArrowRight} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import CountdownTimer from '../components/CountdownTimer'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a countdown timer?', a: 'A countdown timer shows the exact time remaining until a future event - days, hours, minutes, and seconds, ticking live. Unlike a stopwatch (which counts up), a countdown counts down to a specific date and time.' },
  { q: 'Can I have multiple countdowns at once?', a: 'Yes. TimeGovern lets you track up to 5 countdowns at the same time. They are sorted by nearest deadline, and each one updates live.' },
  { q: 'Does it work on mobile?', a: 'Yes. The countdown timer works on any device with a modern browser - phones, tablets, laptops, desktops. No app install required.' },
  { q: 'Will I get notified when the countdown hits zero?', a: 'Yes - if you enable notifications. Click "Enable notifications" and allow the browser prompt. You will also hear a sound alert if sound is turned on.' },
  { q: 'Is my countdown saved if I close the browser?', a: 'Yes. Your countdowns are saved to your browser storage and persist across sessions on the same device. No account required, no data leaves your device.' },
  { q: 'Can I share my countdown with someone else?', a: 'You can share the page link via the share buttons. For a specific countdown, others can add the same event by clicking the preset (New Year, Christmas) or entering the same date.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Countdown Timer', description: 'Free online countdown timer. Track multiple events live - days, hours, minutes, seconds. No signup, 100% private.', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: 'https://timegovern.com/countdown-timer', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['Up to 5 countdowns', 'Live tick every second', 'New Year & Christmas presets', 'Sound + browser notifications', 'No signup, 100% private'] }

export default function CountdownPage() {
  useEffect(() => {
    document.title = 'Countdown Timer - Track Days, Hours, Minutes Live | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free online countdown timer. Track multiple events live with days, hours, minutes, and seconds. No signup, works offline, 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-purple-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-purple-200">Free - Private - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <CalendarClock className="h-10 w-10 md:h-14 md:w-14 text-purple-300" />
              Countdown Timer
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Track up to 5 events live. Days, hours, minutes, seconds - ticking every second until the moment arrives.
            </p>
          </div>
        </div>

        <CountdownTimer />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Countdown Timer" inputs={{ maxItems: 5 }} results={{ tracking: 'live' }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What people count down to</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Gift className="h-5 w-5 text-purple-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Holidays & events</h3><p className="text-xs text-muted-foreground">Christmas, New Year, birthdays, weddings, product launches.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Zap className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Deadlines</h3><p className="text-xs text-muted-foreground">Project due dates, exam dates, tax deadlines, contract endings.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Clock className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Personal goals</h3><p className="text-xs text-muted-foreground">Trips, marathons, sobriety milestones, savings targets.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use the countdown timer</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Enter a name for your event (e.g. "Holiday", "Launch day").</li>
            <li>Pick the target date and time.</li>
            <li>Click Add - your countdown starts immediately.</li>
            <li>Add more events (up to 5) - they sort by nearest deadline.</li>
            <li>Enable notifications to get alerted when the timer hits zero.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 mb-5 flex items-center justify-between gap-3"><div className="text-sm"><strong>Looking for more?</strong> See all tools in this category.</div><Link to="/time-tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:underline shrink-0">View all <ArrowRight className="h-3 w-3" /></Link></div>

        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/pomodoro-timer" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Pomodoro Timer</h3>
              <p className="text-xs text-muted-foreground">Focus in 25-minute sprints with automatic breaks.</p>
            </Link>
            <Link to="/time-zone-converter" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1">Time Zone Converter</h3>
              <p className="text-xs text-muted-foreground">Compare times across cities worldwide.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Countdown Timer'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> This tool is for informational purposes only. Your countdowns are saved on your device only - no signup, no tracking, no data collection.
        </div>
      </div>
    </>
  )
}