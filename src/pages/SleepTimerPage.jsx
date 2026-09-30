import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Moon, Sparkles, BookOpen, Clock, Sun, Zap, Coffee, ArrowRight} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import SleepTimer from '../components/SleepTimer'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a sleep cycle calculator?', a: 'A sleep cycle calculator works out the best times to fall asleep or wake up based on 90-minute sleep cycles. Waking up at the end of a cycle (instead of the middle of deep sleep) helps you feel more refreshed, even with the same total sleep time.' },
  { q: 'How long is one sleep cycle?', a: 'A full sleep cycle lasts about 90 minutes and moves through light sleep, deep sleep, and REM sleep. Most adults complete 4 to 6 cycles per night - so 6 to 9 hours total.' },
  { q: 'Why add 15 minutes for falling asleep?', a: 'On average it takes healthy adults 10 to 20 minutes to fall asleep. Our calculator uses 15 minutes as a standard estimate - if you usually take longer, adjust your bedtime earlier by that difference.' },
  { q: 'What is the best length for a nap?', a: 'Two lengths work best: a 20-minute power nap (quick alertness boost, no grogginess) or a full 90-minute cycle (complete restores focus). Avoid 30-60 minutes - you will wake mid-deep-sleep and feel worse.' },
  { q: 'Is waking up mid-cycle really that bad?', a: 'Yes. Waking during deep sleep causes sleep inertia - a groggy, disoriented feeling that can last 15-30 minutes and impairs cognitive performance. Ending sleep at the boundary of a cycle avoids this entirely.' },
  { q: 'Is my data private?', a: 'Yes. All calculations run in your browser. Your times and preferences are saved only to this device - nothing is sent to any server. No signup, no tracking.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Sleep Timer / Sleep Cycle Calculator', description: 'Free sleep cycle calculator. Find the best times to fall asleep or wake up based on 90-minute cycles, plus nap recommendations. No signup, 100% private.', applicationCategory: 'HealthApplication', operatingSystem: 'Web', url: 'https://timegovern.com/sleep-timer', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['Bedtime calculator (wake-up mode)', 'Wake-time calculator (sleep now)', 'Nap recommendations', '90-minute cycle math', 'No signup, 100% private'] }

export default function SleepTimerPage() {
  useEffect(() => {
    document.title = 'Sleep Timer - Best Times to Fall Asleep & Wake Up | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free sleep cycle calculator. Find the best times to fall asleep or wake up based on 90-minute cycles, plus power nap recommendations. 100% private, no signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Free - Private - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Moon className="h-10 w-10 md:h-14 md:w-14 text-indigo-300" />
              Sleep Timer
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Find the best times to fall asleep or wake up based on 90-minute sleep cycles - plus power nap recommendations.
            </p>
          </div>
        </div>

        <SleepTimer />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Sleep Timer" inputs={{ cycles: 90, fallAsleepMin: 15 }} results={{ calculated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What the sleep timer does</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Sun className="h-5 w-5 text-amber-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Wake-up mode</h3><p className="text-xs text-muted-foreground">Set a wake-up time and get 4-7 ideal bedtimes, each ending a full sleep cycle.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Moon className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Sleep now mode</h3><p className="text-xs text-muted-foreground">If you go to bed now, see the times you should wake up for clean 90-minute cycles.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Zap className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Nap guide</h3><p className="text-xs text-muted-foreground">20-minute power nap, 60-minute long nap, or 90-minute full cycle - with what to expect.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Why sleep cycles matter</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">Sleep is not uniform. Each night you move through 90-minute cycles of light sleep, deep sleep, and REM. Waking mid-cycle (especially during deep sleep) triggers sleep inertia - a groggy, disoriented state that lasts 15-30 minutes and impairs mental performance.</p>
          <p className="text-sm text-muted-foreground leading-relaxed">By timing sleep to end at the boundary of a cycle, you wake up alert instead of foggy. This calculator does that math for you.</p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use the sleep timer</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Pick a mode: Wake-up time, Sleep now, or Nap.</li>
            <li>In Wake-up mode, set your target wake time. The calculator shows 4-7 ideal bedtimes.</li>
            <li>In Sleep now mode, we use your current clock and show your ideal wake times.</li>
            <li>In Nap mode, choose between a power nap, long nap, or full cycle.</li>
            <li>Click Copy to save any result to your clipboard.</li>
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
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 mb-5 flex items-center justify-between gap-3"><div className="text-sm"><strong>Looking for more?</strong> See all tools in this category.</div><Link to="/sleep-tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:underline shrink-0">View all <ArrowRight className="h-3 w-3" /></Link></div>

        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/sleep-debt-calculator" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Sleep Debt Calculator</h3>
              <p className="text-xs text-muted-foreground">Find out how much sleep you owe.</p>
            </Link>
            <Link to="/caffeine-calculator" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <Coffee className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">Caffeine Calculator</h3>
              <p className="text-xs text-muted-foreground">See caffeine levels at bedtime.</p>
            </Link>
            <Link to="/chronotype-quiz" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <Clock className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1">Chronotype Quiz</h3>
              <p className="text-xs text-muted-foreground">Lion, Bear, Wolf, or Dolphin?</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Sleep Timer'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> This tool is for informational purposes only. Sleep needs vary by individual. If you experience chronic sleep problems or extreme fatigue, please speak to a healthcare professional.
        </div>
      </div>
    </>
  )
}