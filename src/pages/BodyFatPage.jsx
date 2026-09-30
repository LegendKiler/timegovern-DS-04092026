import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Sparkles, BookOpen, Heart, Ruler, ArrowRight, Calculator } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import BodyFatCalculator from '../components/BodyFatCalculator'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a healthy body fat percentage?', a: 'For men: 14-24% is average, 6-13% is athletic, below 6% is essential only. For women: 21-31% is average, 14-20% is athletic, below 14% is essential only. Athletic ranges are for trained individuals.' },
  { q: 'What is the US Navy method?', a: 'A formula that estimates body fat from circumference measurements (neck, waist, and hip for women) plus height. It is about 3-4% accurate to DEXA scanning - the best you can get without expensive equipment.' },
  { q: 'How accurate is this calculator?', a: 'The US Navy method is accurate to about ±3-4% compared to DEXA (the gold standard). This is close enough for tracking changes over time, but not for clinical decisions.' },
  { q: 'How do I measure my neck and waist?', a: 'Neck: measure at the narrowest point, just below the larynx. Waist (men): measure at the navel. Waist (women): measure at the narrowest point of the torso. Keep the tape snug but not compressing the skin.' },
  { q: 'Is body fat better than BMI?', a: 'Yes for individual assessment. BMI cannot tell muscle from fat - a muscular athlete can have an "obese" BMI. Body fat percentage is a much better picture of health and physique.' },
  { q: 'How often should I measure?', a: 'Every 2-4 weeks. Daily fluctuations from hydration and food make daily tracking noisy. Monthly tracking shows real trends.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Body Fat Calculator', description: 'Free body fat calculator using the US Navy method. Estimate body fat percentage from neck, waist, and height measurements.', applicationCategory: 'HealthApplication', operatingSystem: 'Web', url: 'https://timegovern.com/body-fat-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function BodyFatPage() {
  useEffect(() => {
    document.title = 'Body Fat Calculator - US Navy Method | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free body fat calculator using the US Navy method. Estimate your body fat percentage from neck, waist, and height measurements. No signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-orange-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-rose-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-rose-200">Free - US Navy Method - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Activity className="h-10 w-10 md:h-14 md:w-14 text-rose-300" />
              Body Fat Calculator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Estimate your body fat percentage from simple measurements - accurate to within 3-4% of DEXA scanning.
            </p>
          </div>
        </div>

        <BodyFatCalculator />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Body Fat" inputs={{ method: 'us-navy' }} results={{ calculated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this calculator shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Activity className="h-5 w-5 text-rose-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Body fat percentage</h3><p className="text-xs text-muted-foreground">Your estimated body fat, plus a category (athletic, fitness, average, obese).</p></CardContent></Card>
            <Card><CardContent className="p-5"><Heart className="h-5 w-5 text-orange-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Fat mass & lean mass</h3><p className="text-xs text-muted-foreground">How many kg of your weight is fat vs muscle, bone, and water.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Ruler className="h-5 w-5 text-amber-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Just a tape measure</h3><p className="text-xs text-muted-foreground">Neck, waist, and (for women) hip - no calipers or scans needed.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Measure your neck at the narrowest point (just under the larynx).</li>
            <li>Measure your waist at the navel (men) or narrowest point (women).</li>
            <li>Women: also measure hips at the widest point.</li>
            <li>Enter height and weight with the measurements.</li>
            <li>Track monthly - not daily - to see real trends.</li>
          </ol>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-4">
            <strong className="text-amber-700 dark:text-amber-400">Source:</strong> Uses the US Navy circumference method. Accuracy is approximately ±3-4% vs DEXA scanning. References: Hodgdon & Beckett (1984), US Navy Naval Health Research Center.
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
            <Link to="/calorie-calculator" className="block rounded-xl border border-border bg-card hover:border-rose-400 p-5 transition-colors">
              <Calculator className="h-5 w-5 text-rose-500 mb-2" />
              <h3 className="font-bold mb-1">Calorie / TDEE</h3>
              <p className="text-xs text-muted-foreground">Daily calorie needs.</p>
            </Link>
            <Link to="/bmi-calculator" className="block rounded-xl border border-border bg-card hover:border-orange-400 p-5 transition-colors">
              <Activity className="h-5 w-5 text-orange-500 mb-2" />
              <h3 className="font-bold mb-1">BMI Calculator</h3>
              <p className="text-xs text-muted-foreground">Body mass index comparison.</p>
            </Link>
            <Link to="/blog/how-to-measure-body-fat" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">How to Measure Body Fat</h3>
              <p className="text-xs text-muted-foreground">Every method explained.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Body Fat Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> For informational purposes only. For accurate clinical measurements, consult a healthcare professional using DEXA or hydrostatic weighing.
        </div>
      </div>
    </>
  )
}