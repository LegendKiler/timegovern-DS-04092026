import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Sparkles, ArrowRight, Timer, Type, Dices, BookOpen, Brain } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const TOOLS = [
  { to: '/pomodoro-timer', name: 'Pomodoro Timer', desc: 'Focus in 25-minute sprints with automatic breaks, sound alerts, and session tracking.', icon: Timer, color: 'indigo' },
  { to: '/word-counter', name: 'Word Counter', desc: 'Live word, character, and reading time count with top keywords for SEO.', icon: Type, color: 'blue' },
  { to: '/random-number-generator', name: 'Random Number Generator', desc: 'Numbers, dice, coin flips, list picker, and shuffle - all cryptographically strong.', icon: Dices, color: 'purple' },
]

const ARTICLES = [
  { to: '/blog/what-is-pomodoro-technique', name: 'What Is the Pomodoro Technique?' },
  { to: '/blog/why-25-minutes-pomodoro', name: 'Why 25 Minutes?' },
  { to: '/blog/best-pomodoro-apps', name: 'Best Pomodoro Apps' },
  { to: '/blog/how-to-stop-procrastinating', name: 'How to Stop Procrastinating' },
  { to: '/blog/best-study-techniques', name: 'Best Study Techniques' },
  { to: '/blog/deep-work-guide', name: 'Deep Work Guide' },
  { to: '/blog/best-productivity-apps', name: 'Best Productivity Apps' },
  { to: '/blog/morning-routine-guide', name: 'Morning Routine Guide' },
]

const FAQ = [
  { q: 'What tools are in the productivity toolkit?', a: 'TimeGovern has three connected productivity tools: a Pomodoro Timer for focused work sessions, a Word Counter for writers and editors, and a Random Number Generator for dice, picks, and shuffles.' },
  { q: 'Which productivity tool should I start with?', a: 'Start with the Pomodoro Timer if you struggle to focus. It is the single highest-value productivity tool most people can add. The Word Counter is essential for anyone writing content.' },
  { q: 'Are these productivity tools free?', a: 'Yes, all three are free with no signup required. They run entirely in your browser - your sessions, text, and results are saved only on your device.' },
  { q: 'Do the tools work on mobile?', a: 'Yes. All three productivity tools are responsive and work on phones, tablets, and desktops. The Pomodoro Timer includes sound and browser notification support.' },
  { q: 'Is my text private in the Word Counter?', a: 'Yes. Your text never leaves your browser. No data is sent to any server, and there is no tracking of what you type.' },
  { q: 'Can I use the Random Number Generator for giveaways?', a: 'Yes. Use the "Pick from list" tab - paste your list of names (one per line), set how many to pick, and get cryptographically random results. Perfect for giveaways and raffles.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Productivity Tools & Timers', description: 'Free productivity tools - Pomodoro Timer, Word Counter, and Random Number Generator.', url: 'https://timegovern.com/productivity-tools' }

export default function ProductivityToolsHub() {
  useEffect(() => {
    document.title = 'Productivity Tools & Timers - Free & Private | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free productivity tools - Pomodoro Timer, Word Counter, and Random Number Generator. All in one place, no signup, 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">3 tools - Free - Private</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Zap className="h-10 w-10 md:h-14 md:w-14 text-emerald-300" />
              Productivity Tools
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Focus deeply, count your words, and randomise fairly - three tools for writers, makers, and focused workers.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">The three productivity tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {TOOLS.map((t) => {
              const Icon = t.icon
              return (
                <Link key={t.to} to={t.to} className={'block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors'}>
                  <div className="flex items-start gap-3">
                    <div className={'p-2.5 rounded-xl bg-' + t.color + '-500/10 border border-' + t.color + '-500/30 shrink-0'}>
                      <Icon className={'h-5 w-5 text-' + t.color + '-500'} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black mb-1 text-sm">{t.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{t.desc}</p>
                      <div className="text-[11px] font-bold text-emerald-500 inline-flex items-center gap-1">Open tool <ArrowRight className="h-3 w-3" /></div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Why these tools work together</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Real productivity is a system, not a single tool. The Pomodoro Timer protects focused work time. The Word Counter helps you track output during writing sprints. The Random Number Generator removes bias when picking tasks, teams, or winners. Used together, they cover the three core needs of modern work: focus, measurement, and fairness.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related articles</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {ARTICLES.map((a) => (
              <Link key={a.to} to={a.to} className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-4 transition-colors">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-emerald-500 shrink-0" />
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Productivity Tools'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> These tools are for informational purposes only. Find the working rhythm and tools that suit you best.
        </div>
      </div>
    </>
  )
}