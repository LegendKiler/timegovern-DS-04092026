import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Scale, Sparkles, BookOpen, Activity, Heart, ArrowRight, Calculator } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import IdealWeightCalculator from '../components/IdealWeightCalculator'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is my ideal weight?', a: 'There is no single "ideal" weight. This calculator shows four clinical formulas plus a healthy BMI range. In practice, any weight within the BMI 18.5-24.9 range for your height is considered healthy.' },
  { q: 'Which formula is most accurate?', a: 'The Devine formula (1974) is the most widely used, especially for medical drug dosing. But all four formulas give estimates within 3-5 kg of each other. The healthy BMI range is a broader and more useful target.' },
  { q: 'Do these formulas work for everyone?', a: 'No. They assume average builds. Very muscular people, athletes, and people with very small or large frames will get less accurate results. Use the range, not the exact number.' },
  { q: 'What is a healthy BMI?', a: 'The World Health Organization defines a healthy BMI as 18.5-24.9. Below 18.5 is underweight; 25-29.9 is overweight; 30+ is obese. Different thresholds apply for people of Asian descent (23+ is overweight).' },
  { q: 'Should I aim for my ideal weight?', a: 'Not necessarily. Overall health depends on body fat percentage, waist circumference, fitness, and metabolic markers - not just weight. A healthy waist-to-height ratio (below 0.5) is often a better goal than a specific weight.' },
  { q: 'Is this medical advice?', a: 'No. This calculator is for informational purposes only. Individual healthy weight ranges vary based on medical conditions, medications, muscle mass, and body composition. Consult a healthcare professional for personalised guidance.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Ideal Weight Calculator', description: 'Free ideal weight calculator using 4 clinical formulas (Devine, Robinson, Miller, Hamwi) plus healthy BMI range.', applicationCategory: 'HealthApplication', operatingSystem: 'Web', url: 'https://timegovern.com/ideal-weight-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function IdealWeightPage() {
  useEffect(() => {
    document.title = 'Ideal Weight Calculator - 4 Clinical Formulas | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free ideal weight calculator. Devine, Robinson, Miller, and Hamwi formulas plus healthy BMI range - by height and gender.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-orange-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Free - 4 formulas - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Scale className="h-10 w-10 md:h-14 md:w-14 text-amber-300" />
              Ideal Weight
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Four clinical formulas plus your healthy BMI range - based on height and gender.
            </p>
          </div>
        </div>

        <IdealWeightCalculator />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Ideal Weight" inputs={{ gender: 'male', height: 175 }} results={{ calculated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this calculator shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Scale className="h-5 w-5 text-amber-500 mb-2" /><h3 className="font-bold mb-1 text-sm">4 clinical formulas</h3><p className="text-xs text-muted-foreground">Devine, Robinson, Miller, and Hamwi - each from peer-reviewed research.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Activity className="h-5 w-5 text-orange-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Healthy BMI range</h3><p className="text-xs text-muted-foreground">The wider target range based on WHO guidelines - more useful than a single number.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Heart className="h-5 w-5 text-rose-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Metric and imperial</h3><p className="text-xs text-muted-foreground">Switch between kg/cm and lbs/ft-in instantly.</p></CardContent></Card>
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
            <Link to="/bmi-calculator" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors">
              <Activity className="h-5 w-5 text-amber-500 mb-2" />
              <h3 className="font-bold mb-1">BMI Calculator</h3>
              <p className="text-xs text-muted-foreground">Check your current BMI.</p>
            </Link>
            <Link to="/body-fat-calculator" className="block rounded-xl border border-border bg-card hover:border-orange-400 p-5 transition-colors">
              <Heart className="h-5 w-5 text-orange-500 mb-2" />
              <h3 className="font-bold mb-1">Body Fat Calculator</h3>
              <p className="text-xs text-muted-foreground">Percentage vs BMI.</p>
            </Link>
            <Link to="/calorie-calculator" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Calculator className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Calorie / TDEE</h3>
              <p className="text-xs text-muted-foreground">Daily calorie needs.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Ideal Weight Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> For informational purposes only. Individual healthy weight ranges vary. Consult a healthcare professional for personalised guidance.
        </div>
      </div>
    </>
  )
}