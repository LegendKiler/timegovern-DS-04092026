import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Sparkles, ArrowRight, Cake, Moon, Clock, BookOpen, Heart, Flame, Droplets, Scale, Utensils, Beef, Timer, Wine } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const TOOLS = [
  { to: '/ideal-weight-calculator', name: 'Ideal Weight Calculator', desc: '4 clinical formulas plus healthy BMI range.', icon: Scale, color: 'amber' },
  { to: '/body-fat-calculator', name: 'Body Fat Calculator', desc: 'US Navy method - neck, waist, and hip measurements.', icon: Activity, color: 'rose' },
  { to: '/water-intake-calculator', name: 'Water Intake Calculator', desc: 'Personalised daily hydration target based on weight and activity.', icon: Droplets, color: 'sky' },
  { to: '/calorie-calculator', name: 'Calorie & TDEE Calculator', desc: 'Daily calories for losing, maintaining, or gaining weight.', icon: Flame, color: 'emerald' },
  { to: '/bmi-calculator', name: 'BMI Calculator', desc: 'Check your body mass index in metric or imperial units with healthy weight range.', icon: Activity, color: 'rose' },
  { to: '/age-calculator', name: 'Age Calculator', desc: 'Find your exact age in years, months, days - plus heartbeats, minutes alive, and more.', icon: Cake, color: 'pink' },
  { to: '/sleep-debt-calculator', name: 'Sleep Debt Calculator', desc: 'Find out exactly how much sleep you owe your body and get a recovery plan.', icon: Moon, color: 'indigo' },
  { to: '/sleep-timer', name: 'Sleep Timer', desc: 'Best times to fall asleep or wake up based on 90-minute sleep cycles.', icon: Clock, color: 'purple' },
  { to: '/macro-calculator', name: 'Macro Calculator', desc: 'Daily protein, fat, and carb targets for cutting, maintaining, or bulking.', icon: Utensils, color: 'violet' },
  { to: '/tdee-calculator', name: 'TDEE Calculator', desc: 'Total Daily Energy Expenditure - calories you burn including activity.', icon: Flame, color: 'orange' },
  { to: '/protein-calculator', name: 'Protein Calculator', desc: 'Daily protein target based on body weight, activity, and goal.', icon: Beef, color: 'rose' },
  { to: '/pace-calculator', name: 'Pace Calculator', desc: 'Solve for pace, time, or distance - runs, rides, any endurance sport.', icon: Timer, color: 'sky' },
  { to: '/bac-calculator', name: 'BAC Calculator', desc: 'Estimate blood alcohol content with the Widmark formula. Educational only.', icon: Wine, color: 'purple' },
]

const ARTICLES = [
  { to: '/blog/what-is-sleep-debt', name: 'What Is Sleep Debt?' },
  { to: '/blog/how-much-sleep-do-you-need', name: 'How Much Sleep Do You Need?' },
  { to: '/blog/sleep-debt-and-weight-gain', name: 'Sleep Debt and Weight Gain' },
  { to: '/blog/sleep-hygiene-tips', name: 'Sleep Hygiene: 12 Rules' },
]

const FAQ = [
  { q: 'What health tools does TimeGovern offer?', a: 'TimeGovern has 13 free health-related tools including BMI, calorie, macro, TDEE, protein, pace, BAC, body fat, water intake, ideal weight, age, sleep debt, and sleep timer. All run in your browser with no signup.' },
  { q: 'Are these health tools accurate?', a: 'The calculations use standard, published formulas - BMI uses the WHO formula, age uses exact calendar arithmetic, sleep debt uses the cumulative shortfall method, and the sleep timer uses 90-minute sleep cycles. They are screening tools, not medical devices.' },
  { q: 'Should I rely on these tools for medical decisions?', a: 'No. They are for informational purposes only and are not a substitute for professional medical advice. Always speak to a healthcare professional about health concerns.' },
  { q: 'Is my health data private?', a: 'Yes, completely. All calculations happen in your browser. Your weight, height, birth date, and sleep data are never sent to a server or stored anywhere except your device.' },
  { q: 'Do I need an account?', a: 'No. You can use every tool without signing up. If you want to save calculations across sessions, you can create a free account - but it is entirely optional.' },
  { q: 'Are the tools suitable for children?', a: 'BMI uses different percentile-based calculations for people under 18. The Age Calculator works for any age. Sleep tools are designed for adults. For children, please consult a paediatrician.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Health & Wellness Tools', description: 'Free health and wellness tools - BMI, calorie, macro, TDEE, protein, pace, BAC, and more.', url: 'https://timegovern.com/health-tools' }

export default function HealthToolsHub() {
  useEffect(() => {
    document.title = 'Health & Wellness Tools - Free & Private | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free health and wellness tools - BMI Calculator, Age Calculator, Sleep Debt Calculator, and Sleep Timer. All in one place, no signup, 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-pink-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-rose-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-rose-200">13 tools - Free - Private</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Activity className="h-10 w-10 md:h-14 md:w-14 text-rose-300" />
              Health Tools
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Understand your body - BMI, age, and sleep health. Four free tools, no signup, all private.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">The four health tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {TOOLS.map((t) => {
              const Icon = t.icon
              return (
                <Link key={t.to} to={t.to} className={'block rounded-xl border border-border bg-card hover:border-rose-400 p-5 transition-colors'}>
                  <div className="flex items-start gap-3">
                    <div className={'p-2.5 rounded-xl bg-' + t.color + '-500/10 border border-' + t.color + '-500/30 shrink-0'}>
                      <Icon className={'h-5 w-5 text-' + t.color + '-500'} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black mb-1 text-sm">{t.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{t.desc}</p>
                      <div className="text-[11px] font-bold text-rose-500 inline-flex items-center gap-1">Open tool <ArrowRight className="h-3 w-3" /></div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Why health tools work best together</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Weight, age, and sleep are connected. Chronic sleep debt affects metabolism and weight. BMI is only one part of the health picture, and its meaning changes with age. Used together, these tools give you a fuller view than any single metric.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related articles</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {ARTICLES.map((a) => (
              <Link key={a.to} to={a.to} className="block rounded-xl border border-border bg-card hover:border-rose-400 p-4 transition-colors">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-rose-500 shrink-0" />
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Health Tools'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> These tools are for informational purposes only and are not a substitute for professional medical advice. Speak to a healthcare professional about health concerns.
        </div>
      </div>
    </>
  )
}