import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Droplets, Sparkles, BookOpen, Activity, Heart, Coffee, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import WaterIntakeCalculator from '../components/WaterIntakeCalculator'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How much water should I drink a day?', a: 'It depends on your weight, activity, and climate. The common guideline of 2 litres (8 glasses) is a rough average. Most adults need 2-3 litres (roughly 35 ml per kg of body weight) plus extra for exercise and heat.' },
  { q: 'How is daily water intake calculated?', a: 'The standard formula is 35 ml per kg of body weight. Additional water is added for exercise (roughly 350-700 ml per hour of activity) and hot climates (500-1000 ml per day).' },
  { q: 'Does coffee and tea count as water intake?', a: 'Yes. The diuretic effect of moderate caffeine is mild and does not offset the fluid consumed. Coffee, tea, and other beverages count toward daily hydration. Water is still best, but they are not dehydrating.' },
  { q: 'Does food count toward water intake?', a: 'Yes. About 20-30% of daily water intake comes from food - fruits, vegetables, soups, and other high-water foods. The calculator gives a total target; food provides part of it.' },
  { q: 'Do pregnant women need more water?', a: 'Yes. The European Food Safety Authority recommends an additional 300 ml/day during pregnancy and 700 ml/day during breastfeeding. This calculator adds these automatically.' },
  { q: 'Can I drink too much water?', a: 'Yes, though rare. Hyponatremia (dangerously low sodium) can occur from drinking several litres per hour during extreme exercise. Spread intake across the day and never exceed 1 litre per hour during exercise. This calculator caps at 6 litres.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Water Intake Calculator', description: 'Free water intake calculator. Get your personalised daily hydration target based on weight, activity, and climate.', applicationCategory: 'HealthApplication', operatingSystem: 'Web', url: 'https://timegovern.com/water-intake-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function WaterIntakePage() {
  useEffect(() => {
    document.title = 'Water Intake Calculator - Free & Personalised | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free water intake calculator. Get your personalised daily hydration target based on weight, activity, climate, and pregnancy. No signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-cyan-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-sky-200">Free - Personalised - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Droplets className="h-10 w-10 md:h-14 md:w-14 text-sky-300" />
              Water Intake
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Get your personalised daily water target based on weight, activity, climate, and pregnancy.
            </p>
          </div>
        </div>

        <WaterIntakeCalculator />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Water Intake" inputs={{ weight: 75, activity: 'moderate' }} results={{ calculated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this calculator shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Droplets className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Daily water target</h3><p className="text-xs text-muted-foreground">Your total litres for the day, in multiple formats (L, glasses, bottles, oz).</p></CardContent></Card>
            <Card><CardContent className="p-5"><Activity className="h-5 w-5 text-cyan-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Activity-adjusted</h3><p className="text-xs text-muted-foreground">Extra water added for exercise intensity and duration.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Coffee className="h-5 w-5 text-teal-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Climate-aware</h3><p className="text-xs text-muted-foreground">Hot and very hot climates increase water needs significantly.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Enter your weight in kg or lbs.</li>
            <li>Select your exercise level honestly.</li>
            <li>Choose your climate - hot climates need more water.</li>
            <li>Toggle pregnant or breastfeeding if applicable.</li>
            <li>Use the target as a daily baseline. Spread throughout the day.</li>
          </ol>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-4">
            <strong className="text-amber-700 dark:text-amber-400">Source:</strong> Based on the standard 35 ml/kg guideline, with additions from the European Food Safety Authority (EFSA) recommendations for pregnancy and breastfeeding, and the American College of Sports Medicine guidelines for exercise fluid replacement.
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/calorie-calculator" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <Heart className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1">Calorie / TDEE</h3>
              <p className="text-xs text-muted-foreground">Daily calorie needs.</p>
            </Link>
            <Link to="/health-tools" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <Droplets className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1">All Health Tools</h3>
              <p className="text-xs text-muted-foreground">Calories, water, BMI, and more.</p>
            </Link>
            <Link to="/blog/how-much-water-should-i-drink" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">How Much Water Should I Drink?</h3>
              <p className="text-xs text-muted-foreground">The complete guide.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Water Intake Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> For informational purposes only. Consult a healthcare professional if you have kidney disease, heart failure, or are on fluid-restricted diets.
        </div>
      </div>
    </>
  )
}