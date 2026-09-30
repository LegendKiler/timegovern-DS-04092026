import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Flame, ArrowRight, BookOpen, Calculator, AlertTriangle, Activity } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How many calories should I eat to lose 1 lb per week?', a: 'A deficit of 500 kcal/day produces approximately 1 lb (0.45 kg) of fat loss per week, because 1 lb of fat contains roughly 3,500 kcal. This is a well-established rule of thumb.' },
  { q: 'Is a 500 calorie deficit safe?', a: 'For most people, yes. But the safe minimum intake is generally considered 1,200 kcal/day for women and 1,500 kcal/day for men. Below that, nutrient deficiencies and metabolic issues become likely.' },
  { q: 'Why have I stopped losing weight on the same deficit?', a: 'Metabolic adaptation. As you lose weight, TDEE drops because there is less tissue to maintain. You need to recalculate your TDEE every 4-6 kg lost and adjust.' },
  { q: 'Should I eat back my exercise calories?', a: 'Generally no - your activity multiplier already accounts for exercise. Only add back significant extra activity (e.g. a 3-hour hike) beyond your typical routine.' },
  { q: 'How much protein should I eat in a deficit?', a: 'Aim for 1.6-2.2 g of protein per kg of body weight. High protein preserves muscle during weight loss and increases satiety, making the deficit easier to sustain.' },
  { q: 'What is the fastest safe rate of weight loss?', a: 'About 1% of body weight per week. Faster than that tends to lose muscle, cause fatigue, and trigger metabolic adaptation. Slower is generally better for long-term success.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How Many Calories to Lose Weight? The Complete Guide', description: 'How many calories you should eat to lose weight safely - deficit sizes, protein targets, and metabolic adaptation explained.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-many-calories-to-lose-weight' }

export default function HowManyCaloriesToLoseWeightPage() {
  useEffect(() => {
    document.title = 'How Many Calories to Lose Weight? Complete Guide | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How many calories should you eat to lose weight? Deficit sizes, safe minimums, protein targets, and how to beat metabolic adaptation.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How Many Calories to Lose Weight?
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mb-4">
            <Flame className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Health - 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How Many Calories to Lose Weight?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The honest answer, with the numbers, the caveats, and the reason most diets fail.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The rule of 3,500</h2>
          <p className="text-muted-foreground">One pound of body fat contains roughly 3,500 calories. That gives the classic rule:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>500 kcal deficit/day</strong> → 1 lb (0.45 kg) loss/week</li>
            <li><strong>1,000 kcal deficit/day</strong> → 2 lb (0.9 kg) loss/week</li>
            <li><strong>250 kcal deficit/day</strong> → 0.5 lb loss/week</li>
          </ul>
          <p className="text-muted-foreground">This is a simplification - fat loss is not perfectly linear, and metabolic adaptation reduces the deficit over time - but it is a useful starting point.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The safe range</h2>
          <p className="text-muted-foreground">Standard guidelines:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Safe minimum intake:</strong> 1,200 kcal (women) / 1,500 kcal (men)</li>
            <li><strong>Maximum deficit:</strong> 500-750 kcal/day for most people</li>
            <li><strong>Fastest safe rate:</strong> About 1% of body weight per week</li>
          </ul>
          <p className="text-muted-foreground">Below these minimums, you risk nutrient deficiencies, loss of muscle mass, hormonal disruption, gallstones, and metabolic adaptation that makes long-term loss harder.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Why 500 kcal is a good default</h2>
          <p className="text-muted-foreground">A 500 kcal/day deficit produces visible, motivating results (about 0.5 kg/week) without being so aggressive that hunger, fatigue, or muscle loss become problems. It is the sweet spot most people can actually sustain for 12-24 weeks.</p>
          <p className="text-muted-foreground">Smaller deficits (250 kcal) are even easier to sustain and produce similar total loss over a longer period. The best deficit is the one you can keep doing.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">How to calculate your deficit</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Calculate your TDEE (total daily energy expenditure).</li>
            <li>Subtract 500 kcal for ~0.5 kg/week loss, or 250 for ~0.25 kg/week.</li>
            <li>Never go below the safe minimums (1,200 / 1,500 kcal).</li>
            <li>Track food accurately for at least 2 weeks to see real results.</li>
            <li>Recalculate TDEE every 4-6 kg of body weight lost.</li>
          </ol>
          <p className="text-muted-foreground">Use our <Link to="/calorie-calculator" className="text-primary font-bold hover:underline">Calorie Calculator</Link> for the numbers.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The macronutrient question</h2>
          <p className="text-muted-foreground">For fat loss, total calories matter more than macros. But macros affect satiety, muscle retention, and how you feel:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Protein:</strong> 1.6-2.2 g per kg bodyweight. Higher protein preserves muscle and reduces hunger.</li>
            <li><strong>Fat:</strong> 0.6-1.0 g per kg. Essential for hormones; do not go too low.</li>
            <li><strong>Carbs:</strong> Fill remaining calories. Higher carbs support intense training.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Metabolic adaptation (why diets stall)</h2>
          <p className="text-muted-foreground">As you lose weight, your TDEE drops for two reasons:</p>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Less mass to maintain.</strong> A smaller body burns fewer calories.</li>
            <li><strong>Metabolic adaptation.</strong> Your body reduces NEAT (fidgeting, movement) and hormonal output to defend its weight.</li>
          </ol>
          <p className="text-muted-foreground">This is why a 500 kcal deficit sometimes stops working after a few months. The fix is not "eat less" - it is recalculate, then take a maintenance break (1-2 weeks at your new TDEE) to reset.</p>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 my-6 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <strong className="text-amber-700 dark:text-amber-400">Warning:</strong> Do not crash diet. Very low calorie intakes (below 1,200 kcal) cause muscle loss, gallstones, hormonal disruption, and higher risk of binge-eating relapse.
            </div>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">The practical plan</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Calculate TDEE.</li>
            <li>Choose a deficit - 500 kcal is a good default.</li>
            <li>Prioritise protein at 1.6-2.2 g/kg.</li>
            <li>Weight train 3-4 times/week to preserve muscle.</li>
            <li>Sleep 7-9 hours. Poor sleep increases hunger hormones.</li>
            <li>Track weekly average weight, not daily.</li>
            <li>Every 4-6 kg lost, recalculate TDEE and consider a 1-week maintenance break.</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">Sources</h2>
          <p className="text-muted-foreground">Guidelines on safe rate of weight loss from the <a href="https://www.cdc.gov/healthyweight/losing_weight/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">CDC</a> (US) and the <a href="https://www.nhs.uk/live-well/healthy-weight/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">NHS</a> (UK). Protein recommendations from the International Society of Sports Nutrition.</p>
        </div>

        <div className="my-8">
          <Link to="/calorie-calculator" className="block rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-emerald-500 transition-colors">Calculate your deficit</h3>
                <p className="text-sm text-muted-foreground">Free TDEE calculator with cut/bulk targets.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
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
            <Link to="/blog/what-is-tdee" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">What Is TDEE?</h3>
              <p className="text-xs text-muted-foreground">The complete guide to daily energy expenditure.</p>
            </Link>
            <Link to="/blog/bmr-formula-explained" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Activity className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">BMR Formula Explained</h3>
              <p className="text-xs text-muted-foreground">The science behind the calculation.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How Many Calories to Lose Weight?'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> For informational purposes only. Consult a doctor or dietitian before starting a significant calorie restriction, especially with any medical condition.
        </div>
      </div>
    </>
  )
}