import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Moon, Sparkles, ArrowRight, Coffee, Clock, Brain, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const TOOLS = [
  { to: '/sleep-debt-calculator', name: 'Sleep Debt Calculator', desc: 'Find out exactly how much sleep you owe and get a personalised recovery plan.', icon: Moon, color: 'indigo' },
  { to: '/sleep-timer', name: 'Sleep Timer', desc: 'Best times to fall asleep or wake up based on 90-minute sleep cycles.', icon: Clock, color: 'purple' },
  { to: '/caffeine-calculator', name: 'Caffeine Calculator', desc: 'See how much caffeine is left in your system at bedtime.', icon: Coffee, color: 'amber' },
  { to: '/chronotype-quiz', name: 'Chronotype Quiz', desc: 'Are you a Lion, Bear, Wolf, or Dolphin? Discover your natural body clock.', icon: Brain, color: 'sky' },
]

const ARTICLES = [
  { to: '/blog/what-is-sleep-debt', name: 'What Is Sleep Debt?' },
  { to: '/blog/how-much-sleep-do-you-need', name: 'How Much Sleep Do You Need?' },
  { to: '/blog/how-to-recover-from-sleep-debt', name: 'How to Recover from Sleep Debt' },
  { to: '/blog/sleep-debt-by-age', name: 'Sleep Debt by Age' },
  { to: '/blog/sleep-debt-and-weight-gain', name: 'Sleep Debt and Weight Gain' },
  { to: '/blog/sleep-hygiene-tips', name: 'Sleep Hygiene: 12 Rules' },
  { to: '/blog/caffeine-half-life', name: 'Caffeine Half-Life' },
  { to: '/blog/when-to-stop-drinking-coffee', name: 'When to Stop Drinking Coffee' },
]

const FAQ = [
  { q: 'What tools are in the sleep toolkit?', a: 'TimeGovern has four connected sleep tools: a Sleep Debt Calculator, a Sleep Timer for cycle-based bedtimes, a Caffeine Calculator for tracking caffeine levels at bedtime, and a Chronotype Quiz to discover your natural rhythm.' },
  { q: 'Are these sleep tools really free?', a: 'Yes, all sleep tools are completely free with no signup required. They run entirely in your browser - your data never leaves your device.' },
  { q: 'Which sleep tool should I start with?', a: 'Start with the Sleep Debt Calculator if you feel tired often, or the Sleep Timer if you want to optimise your wake-up time. The Chronotype Quiz is great if you are unsure whether you are a morning or evening person.' },
  { q: 'Do I need to create an account?', a: 'No. You can use every tool without signing up. If you create a free account, you can save your calculations across sessions - but it is optional.' },
  { q: 'Is my sleep data private?', a: 'Completely. All calculations happen in your browser. We never see, store, or share your sleep data. No tracking, no analytics on personal information.' },
  { q: 'Is this medical advice?', a: 'No. These tools are for informational purposes only and are not a substitute for professional medical advice. If you have chronic sleep problems, please speak to a healthcare professional.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Sleep Tools & Calculators', description: 'Free sleep tools and calculators - sleep debt, sleep timer, caffeine timing, and chronotype quiz.', url: 'https://timegovern.com/sleep-tools' }

export default function SleepToolsHub() {
  useEffect(() => {
    document.title = 'Sleep Tools & Calculators - Free & Private | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free sleep tools and calculators - Sleep Debt, Sleep Timer, Caffeine Calculator, and Chronotype Quiz. All in one place, no signup, 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">4 tools - Free - Private</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Moon className="h-10 w-10 md:h-14 md:w-14 text-indigo-300" />
              Sleep Tools
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Four connected tools to understand your sleep - debt, timing, caffeine, and chronotype. All free, no signup.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">The four sleep tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {TOOLS.map((t) => {
              const Icon = t.icon
              return (
                <Link key={t.to} to={t.to} className={'block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors'}>
                  <div className="flex items-start gap-3">
                    <div className={'p-2.5 rounded-xl bg-' + t.color + '-500/10 border border-' + t.color + '-500/30 shrink-0'}>
                      <Icon className={'h-5 w-5 text-' + t.color + '-500'} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black mb-1 text-sm">{t.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{t.desc}</p>
                      <div className="text-[11px] font-bold text-indigo-500 inline-flex items-center gap-1">Open tool <ArrowRight className="h-3 w-3" /></div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Why sleep tools work best together</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sleep is a system. Sleep debt tells you how much you owe. The sleep timer tells you when to go to bed and wake up. The caffeine calculator tells you when to stop drinking coffee. The chronotype quiz tells you your natural rhythm. Used together, they give you a complete picture of your sleep - and specific, actionable steps.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related articles</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {ARTICLES.map((a) => (
              <Link key={a.to} to={a.to} className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-4 transition-colors">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-500 shrink-0" />
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Sleep Tools'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> These tools are for informational purposes only and are not a substitute for professional medical advice. Speak to a healthcare professional about ongoing sleep issues.
        </div>
      </div>
    </>
  )
}