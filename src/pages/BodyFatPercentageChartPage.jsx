import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight, BookOpen, Calculator, Heart, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a healthy body fat percentage for men?', a: '14-24% is considered average, 6-13% athletic, and above 25% is classified as obese. Essential fat for men is 2-5%, but this is not a sustainable target for most people.' },
  { q: 'What is a healthy body fat percentage for women?', a: '21-31% is average, 14-20% athletic, and above 32% is classified as obese. Women naturally carry more essential fat (10-13%) due to reproductive biology.' },
  { q: 'Does healthy body fat change with age?', a: 'Yes. Body fat naturally increases with age even without weight gain, because muscle mass declines. A 50-year-old with the same lifestyle as a 25-year-old will have a few percent more body fat.' },
  { q: 'Can you be healthy at a higher body fat percentage?', a: 'It depends on fat distribution. "Metabolically healthy obesity" exists but is less common than previously thought. Visceral fat (around organs) is more harmful than subcutaneous fat (under the skin).' },
  { q: 'What body fat percentage shows abs?', a: 'Men typically see visible abs at 10-14%. Women at 18-22%. Below these levels, individual genetics and muscle development matter more than the number.' },
  { q: 'Is it dangerous to have very low body fat?', a: 'Yes. Below essential fat levels (2-5% men, 10-13% women), hormonal function is impaired, testosterone drops, menstrual cycles stop, bone density decreases, and immune function weakens.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Body Fat Percentage Chart: What Is Healthy?', description: 'Body fat percentage ranges by gender and age - what is athletic, healthy, average, and obese, with the science behind the numbers.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/body-fat-percentage-chart' }

export default function BodyFatPercentageChartPage() {
  useEffect(() => {
    document.title = 'Body Fat Percentage Chart: What Is Healthy? | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Body fat percentage chart by gender and age. What is athletic, fitness, average, and obese - with the science behind each range.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Body Fat Percentage Chart
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full mb-4">
            <Activity className="h-3.5 w-3.5 text-rose-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">Health - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Body Fat Percentage Chart
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            What counts as athletic, healthy, average, and obese - by gender and age.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">Body fat ranges for men</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr><th className="p-3 text-left font-black">Category</th><th className="p-3 text-left font-black">Range</th><th className="p-3 text-left font-black">Notes</th></tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">Essential fat</td><td className="p-3">2-5%</td><td className="p-3">Minimum for survival. Not sustainable.</td></tr>
                <tr className="border-t border-border"><td className="p-3">Athletic</td><td className="p-3">6-13%</td><td className="p-3">Competitive athletes. Visible abs.</td></tr>
                <tr className="border-t border-border"><td className="p-3">Fitness</td><td className="p-3">14-17%</td><td className="p-3">Lean and healthy. Some abs visible.</td></tr>
                <tr className="border-t border-border"><td className="p-3">Average</td><td className="p-3">18-24%</td><td className="p-3">Typical healthy adult range.</td></tr>
                <tr className="border-t border-border"><td className="p-3">Obese</td><td className="p-3">25%+</td><td className="p-3">Health risk increases significantly.</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">Body fat ranges for women</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr><th className="p-3 text-left font-black">Category</th><th className="p-3 text-left font-black">Range</th><th className="p-3 text-left font-black">Notes</th></tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">Essential fat</td><td className="p-3">10-13%</td><td className="p-3">Minimum for reproductive health.</td></tr>
                <tr className="border-t border-border"><td className="p-3">Athletic</td><td className="p-3">14-20%</td><td className="p-3">Competitive athletes.</td></tr>
                <tr className="border-t border-border"><td className="p-3">Fitness</td><td className="p-3">21-24%</td><td className="p-3">Lean and healthy.</td></tr>
                <tr className="border-t border-border"><td className="p-3">Average</td><td className="p-3">25-31%</td><td className="p-3">Typical healthy adult range.</td></tr>
                <tr className="border-t border-border"><td className="p-3">Obese</td><td className="p-3">32%+</td><td className="p-3">Health risk increases significantly.</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">Why women have higher essential fat</h2>
          <p className="text-muted-foreground">Women carry 10-13% essential fat - roughly double men's 2-5%. This is biological, not cultural. Essential fat protects reproductive organs, supports hormonal function, and provides energy reserves for pregnancy and lactation.</p>
          <p className="text-muted-foreground">When women drop below essential fat levels, menstrual cycles often stop, bone density declines, and hormonal health is impaired. This is why "getting shredded" for women is not the same as it is for men.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Age changes</h2>
          <p className="text-muted-foreground">Body fat naturally increases with age, even without weight gain. Between age 20 and 60, the average adult loses 10-15% of their muscle mass, and the fat percentage rises as a result. By age 60, "healthy" body fat is typically 3-5% higher than the same person at age 25.</p>
          <p className="text-muted-foreground">Resistance training 3-4x per week is the most effective way to slow or reverse this trend.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Visible abs: what body fat percentage?</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Men:</strong> 10-14% shows abs. Below 10% shows vascularity and muscle definition.</li>
            <li><strong>Women:</strong> 18-22% shows abs. Below 18% shows more definition but risks hormonal issues.</li>
          </ul>
          <p className="text-muted-foreground">Genetics play a big role. Some people show abs at 15%, others need to be at 10%. Do not chase a number - chase how you look and feel.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Fat distribution matters more than total</h2>
          <p className="text-muted-foreground">Not all fat is the same. Subcutaneous fat (under the skin) is largely cosmetic. Visceral fat (around organs) is metabolically harmful, associated with heart disease, diabetes, and inflammation.</p>
          <p className="text-muted-foreground">Waist circumference is the simplest indicator: for men, above 94 cm (37 in) is elevated risk; above 102 cm (40 in) is high risk. For women, above 80 cm (31.5 in) is elevated; above 88 cm (34.5 in) is high.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The bottom line</h2>
          <p className="text-muted-foreground">Use the chart as a guide, not a rule. Individual variation is wide. A body fat percentage that leaves you healthy, energetic, and sleeping well is the right target for you - not a fixed number from any chart.</p>
          <p className="text-muted-foreground">Use our <Link to="/body-fat-calculator" className="text-primary font-bold hover:underline">Body Fat Calculator</Link> to find your number.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Sources</h2>
          <p className="text-muted-foreground">American Council on Exercise (ACE) body fat percentage guidelines. Gallagher D, et al. "Healthy percentage body fat ranges." Am J Clin Nutr, 2000. WHO expert consultation on waist circumference and metabolic risk, 2008.</p>
        </div>

        <div className="my-8">
          <Link to="/body-fat-calculator" className="block rounded-2xl border-2 border-rose-500/30 bg-rose-500/5 hover:border-rose-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-rose-500 transition-colors">Find your body fat percentage</h3>
                <p className="text-sm text-muted-foreground">Free, uses US Navy method.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-rose-500 group-hover:translate-x-1 transition-transform" />
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
            <Link to="/blog/how-to-measure-body-fat" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Measure Body Fat</h3>
              <p className="text-xs text-muted-foreground">Every method compared.</p>
            </Link>
            <Link to="/blog/bmi-vs-body-fat" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Heart className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">BMI vs Body Fat</h3>
              <p className="text-xs text-muted-foreground">Which metric matters more?</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Body Fat Percentage Chart'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> For informational purposes only. Individual healthy ranges vary. Consult a healthcare professional for personalised assessment.
        </div>
      </div>
    </>
  )
}