import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Clock, Timer, Sparkles, BookOpen, Zap, Brain, Coffee, ArrowRight} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import PomodoroTimer from '../components/PomodoroTimer'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the Pomodoro Technique?', a: 'The Pomodoro Technique is a time-management method developed by Francesco Cirillo in the late 1980s. You work in focused 25-minute intervals (called pomodoros), then take a 5-minute break. After four pomodoros, you take a longer 15-30 minute break.' },
  { q: 'Why is it called Pomodoro?', a: 'Pomodoro is Italian for tomato. Cirillo named the technique after the tomato-shaped kitchen timer he used as a university student to track his study sessions.' },
  { q: 'How long should a Pomodoro be?', a: 'The classic length is 25 minutes, but you can adjust it. Deep-work tasks may suit 50-minute sessions, while quick tasks suit 15-minute sprints. What matters is that the timer is short enough to stay focused and long enough to make real progress.' },
  { q: 'Does the Pomodoro Technique really work?', a: 'Yes. Research on time-boxing and attention shows that working in defined sprints reduces procrastination, limits task-switching, and improves focus. The scheduled breaks also prevent mental fatigue from degrading performance across the day.' },
  { q: 'Can I use Pomodoro for any task?', a: 'It works best for tasks that require sustained focus - writing, coding, studying, design work. It is less useful for meetings, reactive support work, or tasks that need continuous interruption-free time longer than 50 minutes.' },
  { q: 'Is my data private?', a: 'Yes. The timer runs entirely in your browser. Your settings and session count are saved on your device only. No signup, no tracking, no data collection.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Pomodoro Timer', description: 'Free online Pomodoro timer. Focus in 25-minute sprints with automatic breaks, sound alerts, and session tracking. No signup, 100% private.', applicationCategory: 'ProductivityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/pomodoro-timer', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['Classic 25/5 Pomodoro', 'Custom durations', 'Auto-advance breaks', 'Sound + browser notifications', 'Session counter', 'No signup, 100% private'] }

export default function PomodoroPage() {
  useEffect(() => {
    document.title = 'Pomodoro Timer - Focus 25 Minutes, Break 5 | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free online Pomodoro timer. Focus in 25-minute sprints with automatic breaks, sound alerts, and session tracking. No signup, 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Free - Private - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Timer className="h-10 w-10 md:h-14 md:w-14 text-indigo-300" />
              Pomodoro Timer
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Focus for 25 minutes. Break for 5. Repeat. The proven technique for deep work, reduced procrastination, and sustainable attention.
            </p>
          </div>
        </div>

        <PomodoroTimer />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Pomodoro Session" inputs={{ preset: 'classic', work: 25, short: 5, long: 15, cycles: 4 }} results={{ technique: 'Pomodoro', sessionLength: '25 min' }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Why Pomodoro works</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Zap className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Beat procrastination</h3><p className="text-xs text-muted-foreground">Committing to 25 minutes is far easier than committing to a full task. Starting is the hard part.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Brain className="h-5 w-5 text-purple-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Protect focus</h3><p className="text-xs text-muted-foreground">Short sprints reduce context switching and defend against the urge to multitask.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Coffee className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Sustainable energy</h3><p className="text-xs text-muted-foreground">Scheduled breaks prevent mental fatigue - you end the day with energy left, not burned out.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use the Pomodoro Technique</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Pick one task you want to work on - write it down.</li>
            <li>Set the timer to 25 minutes and work on that task only.</li>
            <li>When the timer rings, take a 5-minute break. Stand up, stretch, look away from screens.</li>
            <li>After 4 pomodoros, take a longer 15-30 minute break.</li>
            <li>Track how many pomodoros a task takes. You will learn how long your real work takes.</li>
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
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 mb-5 flex items-center justify-between gap-3"><div className="text-sm"><strong>Looking for more?</strong> See all tools in this category.</div><Link to="/productivity-tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:underline shrink-0">View all <ArrowRight className="h-3 w-3" /></Link></div>

        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/time-zone-converter" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1">Time Zone Converter</h3>
              <p className="text-xs text-muted-foreground">Compare times across cities worldwide.</p>
            </Link>
            <Link to="/sleep-debt-calculator" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Sleep Debt Calculator</h3>
              <p className="text-xs text-muted-foreground">Find out how much sleep you owe - and how to recover.</p>
            </Link>
          </div>
        </div>

                <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Learn the Pomodoro Technique</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/blog/what-is-pomodoro-technique" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">What Is the Pomodoro Technique?</h3><p className="text-xs text-muted-foreground">Complete guide for beginners.</p></Link>
            <Link to="/blog/why-25-minutes-pomodoro" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors"><Clock className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Why 25 Minutes?</h3><p className="text-xs text-muted-foreground">The science behind the length.</p></Link>
            <Link to="/blog/best-pomodoro-apps" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Best Pomodoro Apps</h3><p className="text-xs text-muted-foreground">Six apps compared for 2026.</p></Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Pomodoro Timer'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Your settings and session count are saved on your device only. No signup, no tracking, no data leaves your browser.
        </div>
      </div>
    </>
  )
}