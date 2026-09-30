import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Scale, ArrowRight, BookOpen, Calculator, Activity, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How is ideal weight calculated?', a: 'Four main formulas are used - Devine (1974), Robinson (1983), Miller (1983), and Hamwi (1964). Each uses height and gender to estimate a target weight. The Devine formula is the most widely used in medicine.' },
  { q: 'Is ideal weight the same as a healthy BMI?', a: 'No. Ideal weight formulas give a single number. A healthy BMI gives a range (18.5-24.9). The range is more useful because individual builds vary so much.' },
  { q: 'What if my ideal weight feels too low?', a: 'The formulas assume average builds and may be too low for muscular people or those with larger frames. Focus on the healthy BMI range and how you feel, not the exact formula number.' },
  { q: 'Do these formulas work for children?', a: 'No. They are designed for adults. Children and teens should use age- and sex-specific BMI percentile charts.' },
  { q: 'Should I try to hit my ideal weight?', a: 'Not necessarily. Overall health depends on body fat, waist circumference, fitness, and metabolic markers. Any weight in the healthy BMI range is fine.' },
  { q: 'What is the most accurate formula?', a: 'Devine is most used in medicine. Miller tends to be higher, Robinson slightly lower. All four give estimates within a few kg of each other. The healthy BMI range is broader and safer.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Calculate Your Ideal Weight', description: 'The four clinical formulas for ideal weight explained - Devine, Robinson, Miller, and Hamwi - plus why the healthy BMI range matters more.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-to-calculate-ideal-weight' }

export default function HowToCalculateIdealWeightPage() {
  useEffect(() => {
    document.title = 'How to Calculate Your Ideal Weight | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How to calculate ideal weight using the four clinical formulas - Devine, Robinson, Miller, Hamwi - and why a healthy BMI range is a better target.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How to Calculate Your Ideal Weight
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full mb-4">
            <Scale className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Health - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How to Calculate Your Ideal Weight
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            There are four formulas. They give four different answers. Here is what each one actually measures.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">Why "ideal weight" is a tricky concept</h2>
          <p className="text-muted-foreground">Human bodies do not come in one shape. Two people of the same height can be healthy at weights 15 kg apart - because one is muscular and the other has a smaller frame. Ideal weight formulas simplify this reality into a single number, which is why no single number is truly "ideal" for everyone.</p>
          <p className="text-muted-foreground">That said, the formulas are still useful. They give a reasonable starting point for someone of average build and help doctors calculate drug dosages, anaesthesia, and ventilation settings.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The four clinical formulas</h2>

          <p className="text-muted-foreground"><strong>Devine (1974)</strong> - the most widely used:</p>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-xs">
            Men: 50.0 kg + 2.3 kg per inch over 5 ft<br/>
            Women: 45.5 kg + 2.3 kg per inch over 5 ft
          </p>

          <p className="text-muted-foreground"><strong>Robinson (1983)</strong> - modified for modern populations:</p>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-xs">
            Men: 52.0 kg + 1.9 kg per inch over 5 ft<br/>
            Women: 49.0 kg + 1.7 kg per inch over 5 ft
          </p>

          <p className="text-muted-foreground"><strong>Miller (1983)</strong> - linear approximation:</p>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-xs">
            Men: 56.2 kg + 1.41 kg per inch over 5 ft<br/>
            Women: 53.1 kg + 1.36 kg per inch over 5 ft
          </p>

          <p className="text-muted-foreground"><strong>Hamwi (1964)</strong> - oldest of the four:</p>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-xs">
            Men: 48.0 kg + 2.7 kg per inch over 5 ft<br/>
            Women: 45.5 kg + 2.2 kg per inch over 5 ft
          </p>

          <h2 className="text-2xl font-black mt-8 mb-3">Worked example</h2>
          <p className="text-muted-foreground">A 175 cm (5'9") male:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Devine: 50 + 2.3 × 9 = <strong>70.7 kg</strong></li>
            <li>Robinson: 52 + 1.9 × 9 = <strong>69.1 kg</strong></li>
            <li>Miller: 56.2 + 1.41 × 9 = <strong>68.9 kg</strong></li>
            <li>Hamwi: 48 + 2.7 × 9 = <strong>72.3 kg</strong></li>
            <li>Healthy BMI range: <strong>56.6 - 76.3 kg</strong></li>
          </ul>
          <p className="text-muted-foreground">The formulas cluster around 70 kg, but the BMI range says anything from 57 to 76 kg is healthy. Both are useful - the formulas give a target, the BMI range gives flexibility.</p>
          <p className="text-muted-foreground">Get your numbers with our <Link to="/ideal-weight-calculator" className="text-primary font-bold hover:underline">Ideal Weight Calculator</Link>.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Why the healthy BMI range matters more</h2>
          <p className="text-muted-foreground">Ideal weight formulas assume an average build. They do not account for muscle mass, bone density, or frame size. A 175 cm athlete at 82 kg could have 8% body fat and be perfectly healthy - but the formulas would call them 12 kg overweight.</p>
          <p className="text-muted-foreground">The healthy BMI range (18.5 - 24.9) is broader. Any weight in that range is considered healthy for your height by WHO standards. Most people should aim for a weight somewhere in that range, guided by how they look, feel, and perform.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Better metrics than ideal weight</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Waist-to-height ratio</strong> - keep your waist under half your height. Predicts metabolic risk better than weight.</li>
            <li><strong>Body fat percentage</strong> - tells you the composition, not just the total. Better for athletes and muscular people.</li>
            <li><strong>Waist circumference</strong> - directly measures visceral fat, the most metabolically harmful kind.</li>
            <li><strong>How you feel</strong> - energy levels, sleep quality, fitness, and strength matter more than a number on a scale.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">What to actually do</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Use the calculator to see your formula-based target and healthy BMI range.</li>
            <li>If you are outside the healthy range, aim for it - not for a specific number.</li>
            <li>If you are already in the range, focus on body composition and habits instead.</li>
            <li>Track trends monthly, not daily.</li>
            <li>Talk to a doctor or dietitian if you have specific health goals.</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">Sources</h2>
          <p className="text-muted-foreground">Pai MP, Paloucek FP. "The origin of the ideal body weight equations." Ann Pharmacother, 2000. Peterson CM, et al. "BMI and mortality in adults." N Engl J Med, 2016. WHO Expert Consultation on BMI classification, 1995/2004.</p>
        </div>

        <div className="my-8">
          <Link to="/ideal-weight-calculator" className="block rounded-2xl border-2 border-amber-500/30 bg-amber-500/5 hover:border-amber-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-amber-500 transition-colors">Calculate your ideal weight</h3>
                <p className="text-sm text-muted-foreground">4 formulas + healthy BMI range - free.</p>
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
              <p className="text-xs text-muted-foreground">The full chart and what it means.</p>
            </Link>
            <Link to="/blog/waist-to-height-ratio" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Heart className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Waist-to-Height Ratio</h3>
              <p className="text-xs text-muted-foreground">The metric doctors watch most.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How to Calculate Your Ideal Weight'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> For informational purposes only. Consult a healthcare professional for personalised weight guidance.
        </div>
      </div>
    </>
  )
}