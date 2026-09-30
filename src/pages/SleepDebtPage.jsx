import { useEffect } from 'react'
import { setPageMeta } from '../lib/seo'
import { Link } from 'react-router-dom'
import { Moon, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import SleepDebtCalculator from '../components/SleepDebtCalculator'

const FAQ = [
  { q: 'What is sleep debt?', a: 'Sleep debt is the cumulative difference between the amount of sleep you need and the amount you actually get. If you need 8 hours a night but sleep 6.5, you accumulate 1.5 hours of debt each night.' },
  { q: 'How is sleep debt calculated?', a: 'We subtract your actual sleep (including naps) from your nightly sleep need for each night in your tracking window. Surplus sleep does not cancel out debt - only nights that fall short count.' },
  { q: 'Can you repay sleep debt?', a: 'Yes. Research shows recovery sleep - going to bed earlier and adding 1 to 1.5 hours per night - can restore alertness and performance. Full recovery from chronic debt may take a few weeks.' },
  { q: 'How much sleep do adults need?', a: 'The National Sleep Foundation recommends 7 to 9 hours for adults 18-64, 7 to 8 hours for adults 65 and older, and 8 to 10 hours for teens 14-17.' },
  { q: 'Does napping help repay sleep debt?', a: 'Yes - short naps (20-30 minutes) count toward your 24-hour sleep total. Log your naps and the calculator will include them.' },
  { q: 'Is my data private?', a: 'Yes, completely. All calculations run in your browser. We never see, store, or share your sleep data. There is no signup and no tracking.' },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const APP_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Sleep Debt Calculator',
  description: 'Free sleep debt calculator. Log your last 7 nights and see exactly how much sleep you owe - plus a personalized recovery plan. 100% private. No signup.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  url: 'https://timegovern.com/sleep-debt-calculator',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Calculate sleep debt over 7, 10 or 14 nights',
    'Nap-aware calculations',
    'Age-specific sleep need guidance',
    'Personalized recovery plan',
    '100% private - no data leaves the device',
  ],
}

export default function SleepDebtPage() {
  useEffect(() => {
    document.title = 'Sleep Debt Calculator - How Much Sleep Do You Owe? | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free sleep debt calculator. Log your last 7 nights and see exactly how much sleep you owe - plus a personalized recovery plan. 100% private. No signup.'
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
              <Moon className="h-10 w-10 md:h-14 md:w-14 text-indigo-300" />
              Sleep Debt Calculator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Find out exactly how much sleep you owe your body - and get a realistic recovery plan to feel restored.
            </p>
          </div>
        </div>

        <SleepDebtCalculator />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <h3 className="font-bold mb-2">{f.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-5 flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1">
            <h3 className="font-bold mb-1">Learn the science behind sleep debt</h3>
            <p className="text-sm text-muted-foreground">
              Read our full guide on what sleep debt is, how it accumulates, and how to recover.
            </p>
          </div>
          <Link
            to="/blog/what-is-sleep-debt"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0"
          >
            Read article
          </Link>
        </div>

      <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 mb-4 flex items-center justify-between gap-3"><div className="text-sm"><strong>Looking for more?</strong> See all tools in this category.</div><Link to="/sleep-tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:underline shrink-0">View all</Link></div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> This tool is for informational purposes only and is not a substitute for professional medical advice. If you experience ongoing sleep problems or extreme fatigue, please speak to a healthcare professional.
        </div>
      </div>
    </>
  )
}