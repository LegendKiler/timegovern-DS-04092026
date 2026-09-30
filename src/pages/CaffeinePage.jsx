import { useEffect } from 'react'
import { setPageMeta } from '../lib/seo'
import { Link } from 'react-router-dom'
import { Coffee, Sparkles, BookOpen, Clock, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import CaffeineCalculator from '../components/CaffeineCalculator'

const FAQ = [
  { q: 'How long does caffeine stay in your system?', a: 'Caffeine has an average half-life of about 5 hours in healthy adults. Five hours after a coffee, about half the caffeine is still in your bloodstream. After 10 hours, 25% remains. Full elimination typically takes 8 to 10 half-lives - around 40 to 50 hours.' },
  { q: 'When should I stop drinking coffee to sleep well?', a: 'Most sleep experts recommend stopping caffeine 6 to 8 hours before bed. For a stronger buffer, stop 10 hours before. Our last-call calculator gives you the exact time based on your dose, half-life sensitivity, and bedtime.' },
  { q: 'How much caffeine is in a cup of coffee?', a: 'A 240ml cup of brewed coffee contains roughly 95mg of caffeine. An espresso shot has about 63mg, a latte 63 to 75mg, black tea 47mg, and a 355ml can of cola 34mg. Energy drinks range from 80 to 160mg.' },
  { q: 'Does caffeine affect sleep quality?', a: 'Yes. Caffeine blocks adenosine, the chemical that makes you feel sleepy. Even caffeine consumed 6 hours before bed has been shown to reduce total sleep by more than an hour and cut deep slow-wave sleep by up to 20%.' },
  { q: 'What is a caffeine half-life?', a: 'A half-life is the time it takes your body to eliminate half of a substance. For caffeine that is about 5 hours in most adults, 3 hours in fast metabolisers and smokers, and up to 7 hours in slow metabolisers, pregnant women, or those on certain medications.' },
  { q: 'Is my data private?', a: 'Yes, completely. All calculations run in your browser. We never see, store, or share your caffeine or sleep data. There is no signup and no tracking.' },
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
  name: 'Caffeine & Sleep Calculator',
  description: 'Free caffeine calculator. Find out how long caffeine stays in your system, when to stop drinking coffee before bed, and how much is still in your blood at bedtime. 100% private. No signup.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  url: 'https://timegovern.com/caffeine-calculator',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    '24-hour caffeine decay curve',
    'Personalised last-call time',
    'Caffeine half-life sensitivity',
    'Sleep impact estimate',
    '100% private - no data leaves the device',
  ],
}

export default function CaffeinePage() {
  useEffect(() => {
    document.title = 'Caffeine Calculator - When to Stop Coffee Before Bed | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free caffeine calculator. See exactly how much caffeine is in your system at bedtime and the latest time you can drink coffee. 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Free - Private - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Coffee className="h-10 w-10 md:h-14 md:w-14 text-amber-300" />
              Caffeine &amp; Sleep
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Find out exactly when to stop drinking coffee so caffeine does not wreck your sleep tonight.
            </p>
          </div>
        </div>

        <CaffeineCalculator />

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

                <div className="space-y-3">
          <h2 className="text-2xl font-black tracking-tight">Related reading</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/blog/caffeine-half-life" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <Zap className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">Caffeine Half-Life Explained</h3>
              <p className="text-xs text-muted-foreground">How long caffeine really stays in your system.</p>
            </Link>
            <Link to="/blog/when-to-stop-drinking-coffee" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <Clock className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">When to Stop Drinking Coffee</h3>
              <p className="text-xs text-muted-foreground">Find your personal cut-off time for better sleep.</p>
            </Link>
            <Link to="/blog/caffeine-in-common-drinks" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">Caffeine in Common Drinks</h3>
              <p className="text-xs text-muted-foreground">Exact mg for coffee, tea, soda, and energy drinks.</p>
            </Link>
          </div>
        </div>
<div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 mb-4 flex items-center justify-between gap-3"><div className="text-sm"><strong>Looking for more?</strong> See all tools in this category.</div><Link to="/sleep-tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:underline shrink-0">View all</Link></div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> This tool is for informational
          purposes only and is not a substitute for professional medical advice. Caffeine metabolism varies. If you are
          pregnant, taking medication, or have a heart condition, please consult a healthcare professional.
        </div>
      </div>
    </>
  )
}