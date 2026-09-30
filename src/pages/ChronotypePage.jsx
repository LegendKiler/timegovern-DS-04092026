import { useEffect } from 'react'
import { setPageMeta } from '../lib/seo'
import { Link } from 'react-router-dom'
import {Sun, Sparkles, BookOpen, Zap, Moon, Coffee, ArrowRight} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ChronotypeQuiz from '../components/ChronotypeQuiz'

const FAQ = [
  { q: 'What is a chronotype?', a: 'A chronotype is your body natural preference for sleeping, waking, and being active at certain times of day. It is determined by genetics and your circadian rhythm - not by willpower or habit. The four main chronotypes are Lion (early riser), Bear (solar-aligned), Wolf (night owl), and Dolphin (light sleeper).' },
  { q: 'What are the four chronotypes?', a: 'The four chronotypes popularised by sleep specialist Dr Michael Breus are: Lion (about 15% of people, wakes early, peaks in morning), Bear (about 55%, follows the sun, mid-morning peak), Wolf (about 15%, night owl, evening peak), and Dolphin (about 10%, light sleeper, often anxious about sleep).' },
  { q: 'Can your chronotype change?', a: 'Your core chronotype is largely genetic and stable, but it shifts naturally with age - most people become earlier (more Lion-like) as they age, and later (more Wolf-like) during teenage years. You can also shift it slightly through light exposure, meal timing, and consistent sleep schedules - but you cannot completely override your genetic type.' },
  { q: 'Is it bad to be a night owl?', a: 'No - being a Wolf is not a disorder. The problem is that modern society runs on early schedules that conflict with Wolf biology. This creates what researchers call social jetlag, which is linked to higher rates of chronic sleep debt, mood issues, and metabolic problems. The fix is not to force yourself to become a morning person, but to align your life as much as possible with your natural rhythm.' },
  { q: 'How accurate is this quiz?', a: 'This quiz is based on the Morningness-Eveningness Questionnaire (MEQ) and the chronotype framework developed by Dr Michael Breus. It gives a strong indication of your likely type, but it is not a clinical diagnosis. For medical concerns about sleep, speak to a doctor or sleep specialist.' },
  { q: 'Is my data private?', a: 'Yes, completely. The entire quiz runs in your browser. We never see, store, or share your answers. No signup and no tracking.' },
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
  name: 'Chronotype Quiz',
  description: 'Free 2-minute chronotype quiz. Discover if you are a Lion, Bear, Wolf, or Dolphin - plus a personalised schedule based on your body clock. 100% private.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  url: 'https://timegovern.com/chronotype-quiz',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    '12-question chronotype assessment',
    '4 chronotypes: Lion, Bear, Wolf, Dolphin',
    'Personalised daily schedule',
    'Strength and challenge breakdown',
    '100% private - no data leaves the device',
  ],
}

export default function ChronotypePage() {
  useEffect(() => {
    document.title = 'Chronotype Quiz: Lion, Bear, Wolf or Dolphin? | TimeGovern'
    const meta = document.querySelector('meta[name=\"description\"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free 2-minute chronotype quiz. Discover if you are a Lion, Bear, Wolf, or Dolphin - plus a personalised schedule. No signup, 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Free - Private - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Sun className="h-10 w-10 md:h-14 md:w-14 text-amber-300" />
              Chronotype Quiz
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Discover your natural body clock in 2 minutes. Are you a Lion, Bear, Wolf, or Dolphin?
            </p>
          </div>
        </div>

        <ChronotypeQuiz />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What the four chronotypes mean</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Card><CardContent className="p-5"><h3 className="font-black mb-1 flex items-center gap-2"><Sun className="h-4 w-4 text-amber-500" />Lion - The Early Riser</h3><p className="text-sm text-muted-foreground">Wakes before 6:30 AM, peaks in the morning, sleeps by 10 PM. About 15% of people. Natural leaders and planners.</p></CardContent></Card>
            <Card><CardContent className="p-5"><h3 className="font-black mb-1 flex items-center gap-2"><Zap className="h-4 w-4 text-emerald-500" />Bear - The Solar-Aligned</h3><p className="text-sm text-muted-foreground">Wakes 7-8 AM, peaks mid-morning, sleeps by 11 PM. About 55% of people. Follows the sun - the most common type.</p></CardContent></Card>
            <Card><CardContent className="p-5"><h3 className="font-black mb-1 flex items-center gap-2"><Moon className="h-4 w-4 text-indigo-500" />Wolf - The Night Owl</h3><p className="text-sm text-muted-foreground">Wakes 8-9 AM, peaks in evening, sleeps after midnight. About 15% of people. Creative, innovative, and often sleep-deprived.</p></CardContent></Card>
            <Card><CardContent className="p-5"><h3 className="font-black mb-1 flex items-center gap-2"><Coffee className="h-4 w-4 text-sky-500" />Dolphin - The Light Sleeper</h3><p className="text-sm text-muted-foreground">Wakes 6-7 AM, peaks mid-morning, restless nights. About 10% of people. Highly alert, detail-oriented, often anxious about sleep.</p></CardContent></Card>
          </div>
        </div>

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

        <div>
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 mb-5 flex items-center justify-between gap-3"><div className="text-sm"><strong>Looking for more?</strong> See all tools in this category.</div><Link to="/sleep-tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:underline shrink-0">View all <ArrowRight className="h-3 w-3" /></Link></div>

        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/sleep-debt-calculator" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Sleep Debt Calculator</h3>
              <p className="text-xs text-muted-foreground">Find out how much sleep you owe - and how to recover.</p>
            </Link>
            <Link to="/caffeine-calculator" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <Coffee className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">Caffeine Sleep Calculator</h3>
              <p className="text-xs text-muted-foreground">See how much caffeine is left in your system at bedtime.</p>
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> This tool is for informational purposes only and is not a substitute for professional medical advice. If you experience ongoing sleep problems or extreme fatigue, please speak to a healthcare professional.
        </div>
      </div>
    </>
  )
}
