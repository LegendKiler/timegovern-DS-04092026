import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight, BookOpen, Calculator, Heart, Scale, AlertTriangle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Is BMI still useful?', a: 'Yes for population-level health screening - it is cheap, quick, and correlates with disease risk across large groups. For individual assessment, body fat percentage and waist circumference are much better.' },
  { q: 'Why is BMI misleading for athletes?', a: 'Muscle is denser than fat. A muscular athlete can weigh the same as an obese person but have half the body fat. BMI cannot distinguish muscle from fat.' },
  { q: 'Does BMI work for everyone?', a: 'No. It overestimates risk for muscular people and people of African descent, and underestimates risk for people of Asian descent (who carry more visceral fat at the same BMI).' },
  { q: 'Which should I track?', a: 'Track both. BMI is useful as a quick population-standard metric. Body fat percentage and waist circumference give you the individual picture. Together they tell the real story.' },
  { q: 'Can I have a normal BMI and be unhealthy?', a: 'Yes - "normal weight obesity" exists. You can have a normal BMI but high body fat and low muscle mass, which carries metabolic risk similar to clinical obesity.' },
  { q: 'What about waist-to-height ratio?', a: 'Increasingly considered the best simple metric. Keep your waist less than half your height. It predicts metabolic risk better than BMI in most studies.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'BMI vs Body Fat: Which Matters More?', description: 'BMI vs body fat percentage compared - what each measures, why they disagree, and which one you should actually track.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/bmi-vs-body-fat' }

export default function BMIVsBodyFatPage() {
  useEffect(() => {
    document.title = 'BMI vs Body Fat: Which Matters More? | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'BMI vs body fat percentage compared - what each measures, when they disagree, and which metric you should actually track for health.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / BMI vs Body Fat
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full mb-4">
            <Scale className="h-3.5 w-3.5 text-rose-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">Health - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            BMI vs Body Fat
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            One is 200 years old and still used everywhere. The other is more accurate but harder to measure. Here is which to trust.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">What each metric measures</h2>
          <p className="text-muted-foreground"><strong>BMI (Body Mass Index):</strong> weight in kg divided by height in metres squared. Simple ratio. Cannot distinguish muscle from fat.</p>
          <p className="text-muted-foreground"><strong>Body fat percentage:</strong> what fraction of your total weight is fat. Tells you the composition, not just the total.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The famous cases where BMI fails</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>The bodybuilder:</strong> 100 kg, 180 cm = BMI 30.9 = "obese" by BMI. Actual body fat: 8%. BMI does not know the 100 kg is mostly muscle.</li>
            <li><strong>The skinny fat office worker:</strong> 75 kg, 180 cm = BMI 23.1 = "normal" by BMI. Actual body fat: 28%. BMI does not flag the low muscle mass and high fat.</li>
            <li><strong>The Asian adult:</strong> BMI 24 = "normal". But at the same BMI, people of Asian descent carry 3-5% more visceral fat, with higher metabolic risk.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">BMI: still useful for populations</h2>
          <p className="text-muted-foreground">Despite its flaws, BMI is a good screening tool at population scale. It is:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Free and fast</li>
            <li>Requires only height and weight</li>
            <li>Correlates with disease risk across millions of people</li>
            <li>Standardised internationally</li>
          </ul>
          <p className="text-muted-foreground">Public health agencies use it because they need a cheap metric that works at scale. For a single person, it is a first pass, not the answer.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Body fat: better for individuals</h2>
          <p className="text-muted-foreground">For your own health tracking, body fat percentage is far more informative. It tells you:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Whether weight changes are fat or muscle</li>
            <li>Your true risk level for metabolic disease</li>
            <li>Whether your training is working</li>
            <li>How you actually look vs how you weigh</li>
          </ul>
          <p className="text-muted-foreground">Use our <Link to="/body-fat-calculator" className="text-primary font-bold hover:underline">Body Fat Calculator</Link> (US Navy method) to get your number.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Waist circumference: the underrated metric</h2>
          <p className="text-muted-foreground">Increasingly, waist circumference - or better, waist-to-height ratio - is considered the best simple indicator of metabolic health. The rule:</p>
          <p className="text-muted-foreground text-base"><strong>Keep your waist less than half your height.</strong></p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>180 cm tall → waist under 90 cm</li>
            <li>170 cm tall → waist under 85 cm</li>
            <li>160 cm tall → waist under 80 cm</li>
          </ul>
          <p className="text-muted-foreground">Waist-to-height ratio predicts heart disease and diabetes risk better than BMI in most studies. And it takes 30 seconds with a tape measure.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Side-by-side comparison</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-black">Metric</th>
                  <th className="p-3 text-left font-black">Best for</th>
                  <th className="p-3 text-left font-black">Weakness</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3 font-bold">BMI</td><td className="p-3">Population screening</td><td className="p-3">Ignores muscle vs fat</td></tr>
                <tr className="border-t border-border"><td className="p-3 font-bold">Body fat %</td><td className="p-3">Individual tracking</td><td className="p-3">Needs measurement</td></tr>
                <tr className="border-t border-border"><td className="p-3 font-bold">Waist circumf.</td><td className="p-3">Metabolic risk</td><td className="p-3">Height/gender dependent</td></tr>
                <tr className="border-t border-border"><td className="p-3 font-bold">Waist-to-height</td><td className="p-3">Best simple metric</td><td className="p-3">Not widely known yet</td></tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 my-6 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <strong className="text-amber-700 dark:text-amber-400">Key insight:</strong> A normal BMI with high body fat ("normal weight obesity") carries metabolic risk similar to clinical obesity. Never rely on BMI alone.
            </div>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">What to track</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Body fat percentage</strong> - monthly, using a consistent method</li>
            <li><strong>Waist circumference</strong> - monthly, same time of day</li>
            <li><strong>Weight</strong> - weekly average, not daily</li>
            <li><strong>BMI</strong> - once or twice a year for a general reference</li>
            <li><strong>Progress photos</strong> - monthly, same lighting/pose</li>
          </ol>
          <p className="text-muted-foreground">The combination gives you the real picture. No single number ever does.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Sources</h2>
          <p className="text-muted-foreground">WHO Expert Consultation on BMI in Asian populations, 2004. Ashwell M, et al. "Waist-to-height ratio is a better screening tool than waist circumference and BMI." Obes Rev, 2012. NICE guideline on obesity identification and classification, 2022.</p>
        </div>

        <div className="my-8">
          <Link to="/body-fat-calculator" className="block rounded-2xl border-2 border-rose-500/30 bg-rose-500/5 hover:border-rose-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-rose-500 transition-colors">Calculate your body fat</h3>
                <p className="text-sm text-muted-foreground">Better than BMI for individual tracking.</p>
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
            <Link to="/blog/body-fat-percentage-chart" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Heart className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Body Fat Percentage Chart</h3>
              <p className="text-xs text-muted-foreground">Healthy ranges by gender and age.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'BMI vs Body Fat'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> For informational purposes only. Consult a healthcare professional for personalised assessment.
        </div>
      </div>
    </>
  )
}