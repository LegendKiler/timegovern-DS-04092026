import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Flame, Sparkles, BookOpen, Activity, Droplets, Heart, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import CalorieCalculator from '../components/CalorieCalculator'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is TDEE?', a: 'TDEE stands for Total Daily Energy Expenditure - the total number of calories your body burns in a day, including BMR, physical activity, and digestion. Eating at your TDEE maintains weight; eating below loses; eating above gains.' },
  { q: 'What is BMR?', a: 'Basal Metabolic Rate is the number of calories your body burns at complete rest to maintain vital functions - breathing, circulation, cell repair. It typically accounts for 60-70% of your total daily calorie burn.' },
  { q: 'Which formula does this calculator use?', a: 'The Mifflin-St Jeor equation, published in 1990. It is the modern clinical standard - more accurate than the older Harris-Benedict formula and recommended by the Academy of Nutrition and Dietetics.' },
  { q: 'How accurate is TDEE?', a: 'For most people, within 5-10% of actual. Individual variation comes from genetics, muscle mass, gut microbiome, and metabolic adaptation. Treat the number as a starting point and adjust based on real-world results over 2-3 weeks.' },
  { q: 'How many calories should I eat to lose weight?', a: 'A deficit of 500 kcal/day produces about 0.5 kg (1 lb) of fat loss per week. A 250 kcal deficit produces about 0.25 kg/week and is easier to sustain. Do not go below 1,200 kcal (women) or 1,500 kcal (men) without medical supervision.' },
  { q: 'Is this medical advice?', a: 'No. This calculator provides estimates for informational purposes only. Individual calorie needs vary based on medical conditions, medications, and other factors. Consult a registered dietitian or doctor for personalised guidance.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Calorie & TDEE Calculator', description: 'Free TDEE calculator using the Mifflin-St Jeor equation. Calculate BMR, maintenance calories, and cutting/bulking targets.', applicationCategory: 'HealthApplication', operatingSystem: 'Web', url: 'https://timegovern.com/calorie-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function CalorieCalculatorPage() {
  useEffect(() => {
    document.title = 'Calorie & TDEE Calculator - Free & Accurate | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free TDEE calculator using the Mifflin-St Jeor equation. Get your BMR, maintenance calories, and cut/bulk targets in seconds.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">Free - Evidence-based - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Flame className="h-10 w-10 md:h-14 md:w-14 text-emerald-300" />
              Calorie Calculator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Calculate your BMR and TDEE, then get personalised calorie targets for losing fat, maintaining, or building muscle.
            </p>
          </div>
        </div>

        <CalorieCalculator />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Calorie / TDEE" inputs={{ age: 30, gender: 'male', weight: 75 }} results={{ calculated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this calculator shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Heart className="h-5 w-5 text-slate-500 mb-2" /><h3 className="font-bold mb-1 text-sm">BMR</h3><p className="text-xs text-muted-foreground">What your body burns at rest - the foundation of all calorie maths.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Activity className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">TDEE</h3><p className="text-xs text-muted-foreground">Your maintenance calories - what you burn on a typical day.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Flame className="h-5 w-5 text-rose-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Cut / bulk targets</h3><p className="text-xs text-muted-foreground">Pre-calculated calorie targets for fat loss and lean muscle gain.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Choose metric or imperial units.</li>
            <li>Enter gender, age, weight, and height.</li>
            <li>Pick your activity level honestly - most people overestimate this.</li>
            <li>Read your BMR, TDEE, and goal-based targets.</li>
            <li>Use the target matching your goal for 2-3 weeks, then adjust based on results.</li>
          </ol>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-4">
            <strong className="text-amber-700 dark:text-amber-400">Source:</strong> Uses the Mifflin-St Jeor equation (1990), the modern clinical standard. Equivalent to the formulas recommended by the Academy of Nutrition and Dietetics and used by the NHS and CDC.
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
            <Link to="/bmi-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <Activity className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">BMI Calculator</h3>
              <p className="text-xs text-muted-foreground">Body mass index check.</p>
            </Link>
            <Link to="/health-tools" className="block rounded-xl border border-border bg-card hover:border-teal-400 p-5 transition-colors">
              <Heart className="h-5 w-5 text-teal-500 mb-2" />
              <h3 className="font-bold mb-1">All Health Tools</h3>
              <p className="text-xs text-muted-foreground">Calories, BMI, sleep, and more.</p>
            </Link>
            <Link to="/blog/what-is-tdee" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">What Is TDEE?</h3>
              <p className="text-xs text-muted-foreground">The complete guide.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Calorie Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> This calculator provides estimates for informational purposes only and is not medical advice. Consult a registered dietitian or doctor before making significant dietary changes, especially if you have a medical condition.
        </div>
      </div>
    </>
  )
}