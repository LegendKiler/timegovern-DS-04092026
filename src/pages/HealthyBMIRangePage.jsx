import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight, BookOpen, Calculator, Heart, Scale } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a healthy BMI?', a: 'The WHO defines a healthy BMI as 18.5 to 24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese. These thresholds apply to adults of European descent.' },
  { q: 'Does the healthy BMI range change by height?', a: 'The range is the same BMI values (18.5-24.9) but the corresponding weight range changes with height. Taller people have a higher healthy weight range than shorter people at the same BMI.' },
  { q: 'Is BMI accurate for everyone?', a: 'No. It overestimates risk for very muscular people, and underestimates risk for people of Asian descent. Use it as a starting point, not the final word.' },
  { q: 'What is the healthy BMI for people of Asian descent?', a: 'WHO recommends lower thresholds for Asian populations: 18.5-22.9 is healthy, 23-27.5 is overweight, 27.5+ is obese. This is because Asian populations carry more visceral fat at the same BMI.' },
  { q: 'Should I aim for the middle of the BMI range?', a: 'Not necessarily. The whole 18.5-24.9 range is associated with low health risk. Some studies suggest the healthiest point is around BMI 22-23, but individual variation is wide.' },
  { q: 'Is BMI useful for older adults?', a: 'With caution. Slightly higher BMI (25-27) may be protective in adults over 65 because muscle mass tends to decline with age. Do not use BMI alone for older populations.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Healthy BMI Range by Height: The Complete Chart', description: 'The complete healthy BMI range chart by height - what counts as underweight, healthy, overweight, and obese.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/healthy-bmi-range' }

export default function HealthyBMIRangePage() {
  useEffect(() => {
    document.title = 'Healthy BMI Range by Height: Complete Chart | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Healthy BMI range by height - the complete chart. What counts as underweight, healthy, overweight, and obese for every height.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Healthy BMI Range
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full mb-4">
            <Activity className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Health - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Healthy BMI Range by Height
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The complete chart - what a healthy weight looks like at every height.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The BMI categories</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr><th className="p-3 text-left font-black">Category</th><th className="p-3 text-left font-black">BMI Range</th></tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">Underweight</td><td className="p-3">Below 18.5</td></tr>
                <tr className="border-t border-border"><td className="p-3 font-bold text-emerald-600">Healthy</td><td className="p-3 font-bold text-emerald-600">18.5 - 24.9</td></tr>
                <tr className="border-t border-border"><td className="p-3">Overweight</td><td className="p-3">25.0 - 29.9</td></tr>
                <tr className="border-t border-border"><td className="p-3">Obese Class I</td><td className="p-3">30.0 - 34.9</td></tr>
                <tr className="border-t border-border"><td className="p-3">Obese Class II</td><td className="p-3">35.0 - 39.9</td></tr>
                <tr className="border-t border-border"><td className="p-3">Obese Class III</td><td className="p-3">40.0+</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">Healthy weight by height (men)</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr><th className="p-3 text-left font-black">Height</th><th className="p-3 text-right font-black">Healthy weight range</th></tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">160 cm (5'3")</td><td className="p-3 text-right">47.4 - 63.7 kg</td></tr>
                <tr className="border-t border-border"><td className="p-3">165 cm (5'5")</td><td className="p-3 text-right">50.4 - 67.8 kg</td></tr>
                <tr className="border-t border-border"><td className="p-3">170 cm (5'7")</td><td className="p-3 text-right">53.5 - 72.0 kg</td></tr>
                <tr className="border-t border-border"><td className="p-3">175 cm (5'9")</td><td className="p-3 text-right">56.7 - 76.3 kg</td></tr>
                <tr className="border-t border-border"><td className="p-3">180 cm (5'11")</td><td className="p-3 text-right">59.9 - 80.7 kg</td></tr>
                <tr className="border-t border-border"><td className="p-3">185 cm (6'1")</td><td className="p-3 text-right">63.3 - 85.2 kg</td></tr>
                <tr className="border-t border-border"><td className="p-3">190 cm (6'3")</td><td className="p-3 text-right">66.8 - 89.9 kg</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">Healthy weight by height (women)</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr><th className="p-3 text-left font-black">Height</th><th className="p-3 text-right font-black">Healthy weight range</th></tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">150 cm (4'11")</td><td className="p-3 text-right">41.6 - 56.0 kg</td></tr>
                <tr className="border-t border-border"><td className="p-3">155 cm (5'1")</td><td className="p-3 text-right">44.4 - 59.8 kg</td></tr>
                <tr className="border-t border-border"><td className="p-3">160 cm (5'3")</td><td className="p-3 text-right">47.4 - 63.7 kg</td></tr>
                <tr className="border-t border-border"><td className="p-3">165 cm (5'5")</td><td className="p-3 text-right">50.4 - 67.8 kg</td></tr>
                <tr className="border-t border-border"><td className="p-3">170 cm (5'7")</td><td className="p-3 text-right">53.5 - 72.0 kg</td></tr>
                <tr className="border-t border-border"><td className="p-3">175 cm (5'9")</td><td className="p-3 text-right">56.7 - 76.3 kg</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground">Note: the healthy weight range is identical for men and women at the same height, because BMI does not account for gender. In practice, women tend to have more body fat at the same BMI than men.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Where BMI breaks down</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Athletes and bodybuilders</strong> - high muscle mass pushes BMI into "overweight" or "obese" range, but body fat is low.</li>
            <li><strong>People of Asian descent</strong> - WHO recommends lower thresholds (healthy = 18.5-22.9).</li>
            <li><strong>Older adults</strong> - a slightly higher BMI (25-27) may be protective over 65.</li>
            <li><strong>Pregnant women</strong> - BMI does not apply during pregnancy.</li>
            <li><strong>Children and teens</strong> - different percentile charts are used by age and sex.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Better metrics to pair with BMI</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Body fat percentage</strong> - tells you composition, not just total.</li>
            <li><strong>Waist circumference</strong> - directly reflects visceral fat.</li>
            <li><strong>Waist-to-height ratio</strong> - keep your waist under half your height.</li>
          </ul>
          <p className="text-muted-foreground">Use our <Link to="/bmi-calculator" className="text-primary font-bold hover:underline">BMI Calculator</Link> for your number, or the <Link to="/ideal-weight-calculator" className="text-primary font-bold hover:underline">Ideal Weight Calculator</Link> for the full healthy range.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Sources</h2>
          <p className="text-muted-foreground">WHO. "Body mass index classification." 1995, revised 2004. WHO Expert Consultation. "Appropriate body-mass index for Asian populations." Lancet, 2004.</p>
        </div>

        <div className="my-8">
          <Link to="/bmi-calculator" className="block rounded-2xl border-2 border-amber-500/30 bg-amber-500/5 hover:border-amber-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-amber-500 transition-colors">Check your BMI</h3>
                <p className="text-sm text-muted-foreground">Free, instant, with healthy range.</p>
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
            <Link to="/blog/how-to-calculate-ideal-weight" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Scale className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Calculate Your Ideal Weight</h3>
              <p className="text-xs text-muted-foreground">The 4 clinical formulas explained.</p>
            </Link>
            <Link to="/blog/waist-to-height-ratio" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Heart className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Waist-to-Height Ratio</h3>
              <p className="text-xs text-muted-foreground">A better metric than BMI.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Healthy BMI Range'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> For informational purposes only. Consult a healthcare professional for personalised guidance.
        </div>
      </div>
    </>
  )
}