import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ArrowRight, BookOpen, Globe, Zap, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is clock drift?', a: 'Clock drift is the gradual deviation of a computer clock from true time. Quartz oscillators are not perfectly precise, and temperature changes, aging components, and power interruptions all cause drift over days and weeks.' },
  { q: 'How far off does a typical computer clock get?', a: 'Most devices drift 0.5 to 2 seconds per day without sync. Over a month, that is 15 to 60 seconds of error. Modern operating systems resync regularly, but not all devices do.' },
  { q: 'What is UTC and why does it matter?', a: 'UTC is Coordinated Universal Time, the global reference standard. All other time zones are defined as offsets from UTC. Having your device in sync with UTC ensures accurate conversions to every other zone.' },
  { q: 'Why does a few seconds matter for remote work?', a: 'A few seconds rarely matters for casual meetings. It matters for shared timers, countdowns, coordinated releases, live events, and any workflow where two devices must agree on the exact second.' },
  { q: 'Does the WorldTimeAPI sync my device clock?', a: 'No. Our World Clock reads true UTC time from the API and applies a drift correction only within the browser tab. Your operating system clock is unchanged. To fix the device, use your OS time settings.' },
  { q: 'How often is the sync refreshed?', a: 'Every 10 minutes while the page is open. The drift is measured with round-trip latency correction to within about 50 milliseconds in normal network conditions.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How UTC Time Works: The World Standard Clock', description: 'Complete guide to accurate time and clock sync for global teams.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-utc-time-works' }

export default function HowUTCWorksPage() {
  useEffect(() => {
    document.title = 'How UTC Time Works: The World Standard Clock | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How UTC Time Works: The World Standard Clock - full guide with practical tools.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How UTC Time Works: The World Standard Clock
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mb-4">
            <Zap className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Time accuracy - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How UTC Time Works: The World Standard Clock
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            A practical guide for anyone who needs accurate time.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The basics</h2>
          <p className="text-muted-foreground">Every computer has a quartz oscillator for keeping time. These oscillators are cheap, tiny, and remarkably accurate, but they are not perfect. Temperature changes, aging, and quality variation all cause a slow drift from true time. Most devices resync regularly via NTP; some do not.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">What drift looks like in practice</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Well-synced device:</strong> within a few milliseconds of true time.</li>
            <li><strong>Home computer (auto NTP):</strong> within 50 milliseconds.</li>
            <li><strong>Device with NTP disabled:</strong> 0.5 to 2 seconds off after a month.</li>
            <li><strong>Old or cold device:</strong> up to 5-10 seconds off per month.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">When drift matters</h2>
          <p className="text-muted-foreground">For casual meetings, a few seconds is irrelevant. It matters for shared countdowns, coordinated releases, live events, financial trading, and any situation where two devices must agree on the exact second. If you run a remote team with global timers or shared countdowns, drift between devices becomes visible.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Use server-synced time</h2>
          <p className="text-muted-foreground">Our <Link to="/world-clock" className="text-primary font-bold hover:underline">World Clock</Link> fetches true UTC time from a public time API and applies a drift correction so the displayed time is accurate to within about 50 milliseconds. A sync indicator shows the current state.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">How to check your own device</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Open <Link to="/world-clock" className="text-primary font-bold hover:underline">our World Clock</Link>.</li>
            <li>Look for the sync indicator next to the pinned cities header.</li>
            <li>If it says "Synced", your device is close to true UTC.</li>
            <li>If it says "Off by X seconds", your device clock has drifted.</li>
            <li>Fix by enabling automatic time in your operating system settings.</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">Enabling OS time sync</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Windows:</strong> Settings - Time and Language - Date and Time - Set time automatically.</li>
            <li><strong>macOS:</strong> System Settings - General - Date and Time - Set time and date automatically.</li>
            <li><strong>iOS:</strong> Settings - General - Date and Time - Set Automatically.</li>
            <li><strong>Android:</strong> Settings - System - Date and Time - Automatic date and time.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Try the synced clock</h2>
          <p className="text-muted-foreground">Open the <Link to="/world-clock" className="text-primary font-bold hover:underline">World Clock</Link> and see the sync indicator live. It refreshes every 10 minutes with a latency-corrected measurement.</p>
        </div>

        <div className="my-8">
          <Link to="/world-clock" className="block rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"><Zap className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-emerald-500 transition-colors">Open the server-synced World Clock</h3>
                <p className="text-sm text-muted-foreground">Accurate to within 50 milliseconds. Free.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/computer-clock-drift" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Continue reading</h3>
              <p className="text-xs text-muted-foreground">Next in the series.</p>
            </Link>
            <Link to="/blog/accurate-time-remote-work" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Target className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Deep dive</h3>
              <p className="text-xs text-muted-foreground">Full breakdown.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title='How UTC Time Works: The World Standard Clock' />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}