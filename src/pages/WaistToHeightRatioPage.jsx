import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Heart, ArrowRight, BookOpen, Calculator, Ruler, Scale, Activity} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is waist-to-height ratio?', a: 'Your waist circumference divided by your height. Keep it below 0.5 - your waist should be less than half your height. It predicts metabolic risk better than BMI in most studies.' },
  { q: 'Why is waist-to-height ratio better than BMI?', a: 'BMI cannot distinguish muscle from fat, and it ignores where fat is stored. Waist-to-height directly reflects abdominal fat - the metabolically harmful kind - relative to your body size.' },
  { q: 'How do I measure my waist correctly?', a: 'Stand relaxed, breathe out normally, measure at the midpoint between your lowest rib and the top of your hip bone. Do not suck in. Keep the tape snug but not compressing.' },
  { q: 'What is a healthy waist-to-height ratio?', a: 'Under 0.5 is healthy. 0.5-0.6 is elevated risk. Above 0.6 is high risk. The rule is simple: keep your waist under half your height.' },
  { q: 'Does it work for children?', a: 'Yes, and it is used more often in paediatric practice than BMI. Different thresholds apply by age - consult a paediatric chart for accuracy.' },
  { q: 'Is waist-to-height ratio used by doctors?', a: 'Increasingly. NICE (UK) now recommends it alongside BMI. Many researchers argue it should replace BMI as the primary screening metric.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Waist-to-Height Ratio: A Better Metric Than BMI', description: 'Why waist-to-height ratio beats BMI for predicting metabolic risk, and how to measure yours correctly.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/waist-to-height-ratio' }

export default function WaistToHeightRatioPage() {
  useEffect(() => {
    document.title = 'Waist-to-Height Ratio: A Better Metric Than BMI | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Waist-to-height ratio explained - why it predicts metabolic risk better than BMI, the 0.5 rule, and how to measure correctly.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Waist-to-Height Ratio
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full mb-4">
            <Ruler className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Health - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Waist-to-Height Ratio
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            One rule. No charts. Predicts health risk better than BMI - and it takes 30 seconds to check.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The rule</h2>
          <p className="text-muted-foreground text-base"><strong>Keep your waist less than half your height.</strong></p>
          <p className="text-muted-foreground">That is the whole metric. It works for every adult, every height, every gender. No tables, no thresholds to memorise.</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>180 cm tall → waist under 90 cm</li>
            <li>170 cm tall → waist under 85 cm</li>
            <li>160 cm tall → waist under 80 cm</li>
            <li>150 cm tall → waist under 75 cm</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Why this beats BMI</h2>
          <p className="text-muted-foreground">BMI is a ratio of weight to height squared. It cannot tell muscle from fat, and it ignores where fat is stored. Waist-to-height ratio fixes both problems:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Muscle-friendly</strong> - a muscular athlete with a normal waist passes easily, even if BMI says "obese".</li>
            <li><strong>Visceral-fat focused</strong> - waist circumference reflects abdominal fat, which is the metabolically harmful kind.</li>
            <li><strong>Height-relative</strong> - tall people get larger allowances, short people tighter ones, correctly.</li>
            <li><strong>Works across populations</strong> - thresholds are the same regardless of ethnicity or gender.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The evidence</h2>
          <p className="text-muted-foreground">A 2012 meta-analysis of 300,000+ adults found waist-to-height ratio predicted heart disease, diabetes, and stroke better than BMI in every ethnic group studied. NICE (UK) now recommends it alongside BMI for obesity screening. Many researchers argue it should replace BMI entirely.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">How to measure correctly</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Stand relaxed - do not suck in your stomach.</li>
            <li>Find the midpoint between your lowest rib and the top of your hip bone.</li>
            <li>Wrap a tape measure around at that point, parallel to the floor.</li>
            <li>Breathe out normally, then measure.</li>
            <li>Tape should be snug but not compressing the skin.</li>
          </ol>
          <p className="text-muted-foreground">Measure at the same time of day (morning is best) and the same conditions. Take it twice and use the average.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Interpreting your number</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr><th className="p-3 text-left font-black">Waist-to-height</th><th className="p-3 text-left font-black">Meaning</th></tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">Under 0.4</td><td className="p-3">Slim</td></tr>
                <tr className="border-t border-border"><td className="p-3">0.4 - 0.49</td><td className="p-3 text-emerald-600 font-bold">Healthy range</td></tr>
                <tr className="border-t border-border"><td className="p-3">0.5 - 0.59</td><td className="p-3 text-amber-600 font-bold">Elevated risk</td></tr>
                <tr className="border-t border-border"><td className="p-3">0.6+</td><td className="p-3 text-rose-600 font-bold">High risk</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">What to do if your ratio is elevated</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Focus on reducing abdominal fat through diet and exercise - not just weight.</li>
            <li>Prioritise resistance training 3-4x per week to build muscle and improve body composition.</li>
            <li>Add aerobic exercise - 150 minutes of moderate activity per week is the standard minimum.</li>
            <li>Track your ratio monthly, not weekly - real change takes time.</li>
            <li>See a doctor if it is above 0.6 for a full metabolic assessment.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The bottom line</h2>
          <p className="text-muted-foreground">Waist-to-height ratio is the single most useful metric for most people. It is free, fast, and more predictive than BMI. Pair it with our <Link to="/bmi-calculator" className="text-primary font-bold hover:underline">BMI Calculator</Link> and <Link to="/body-fat-calculator" className="text-primary font-bold hover:underline">Body Fat Calculator</Link> for the complete picture.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Sources</h2>
          <p className="text-muted-foreground">Ashwell M, Gunn P, Gibson S. "Waist-to-height ratio is a better screening tool than waist circumference and BMI for adult cardiometabolic risk factors." Obes Rev, 2012. NICE guideline NG7 on obesity prevention, updated 2022.</p>
        </div>

        <div className="my-8">
          <Link to="/bmi-calculator" className="block rounded-2xl border-2 border-amber-500/30 bg-amber-500/5 hover:border-amber-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-amber-500 transition-colors">Pair with your BMI</h3>
                <p className="text-sm text-muted-foreground">Free BMI calculator with healthy range.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-amber-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/healthy-bmi-range" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Activity className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Healthy BMI Range by Height</h3>
              <p className="text-xs text-muted-foreground">The complete chart.</p>
            </Link>
            <Link to="/blog/how-to-calculate-ideal-weight" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Scale className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Calculate Ideal Weight</h3>
              <p className="text-xs text-muted-foreground">The 4 clinical formulas.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Waist-to-Height Ratio'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> For informational purposes only. Consult a healthcare professional for personalised assessment.
        </div>
      </div>
    </>
  )
}