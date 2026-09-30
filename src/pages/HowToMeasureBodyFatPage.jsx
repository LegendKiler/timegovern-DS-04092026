import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Ruler, ArrowRight, BookOpen, Activity, Calculator, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the most accurate way to measure body fat?', a: 'DEXA scanning is the gold standard, accurate to within 1-2%. But it requires a clinical appointment. The US Navy tape method is 3-4% accurate, which is close enough for tracking progress.' },
  { q: 'Can I measure body fat at home?', a: 'Yes. The US Navy method needs only a tape measure. Smart scales use bioelectrical impedance but are affected by hydration - results vary 5-8% depending on the time of day.' },
  { q: 'How accurate are smart scales?', a: 'Within about ±5-8% of DEXA. They measure bioelectrical impedance - the resistance of your body to a small current. Hydration, food, and time of day affect the reading significantly. Use them for trends, not absolute numbers.' },
  { q: 'Should I measure body fat on an empty stomach?', a: 'Yes. Measure in the morning, after using the bathroom, before eating or drinking. Same conditions each time gives the most consistent trend data.' },
  { q: 'How often should I measure?', a: 'Every 2-4 weeks. Daily changes are mostly water and food. Monthly averages show real trends.' },
  { q: 'What if my waist measurement does not match the formula?', a: 'The US Navy formula assumes standard body proportions. Very muscular or very lean people may see off results. For those cases, use DEXA or calipers for more accuracy.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Measure Body Fat: Every Method Compared', description: 'DEXA, hydrostatic, calipers, smart scales, and the US Navy tape method - which is most accurate and which to use.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-to-measure-body-fat' }

export default function HowToMeasureBodyFatPage() {
  useEffect(() => {
    document.title = 'How to Measure Body Fat: Every Method Compared | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How to measure body fat - DEXA, hydrostatic, calipers, smart scales, and the US Navy tape method. Accuracy, cost, and when to use each.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How to Measure Body Fat
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full mb-4">
            <Ruler className="h-3.5 w-3.5 text-rose-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">Health - 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How to Measure Body Fat
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Five methods, five different accuracy levels, wildly different prices. Here is what actually works.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">Why body fat is better than weight</h2>
          <p className="text-muted-foreground">Two people can weigh exactly the same and look completely different. Body fat percentage tells you what that weight is made of - muscle, bone, water, or fat. It is the number that actually reflects health and physique.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Method 1: DEXA scan (gold standard)</h2>
          <p className="text-muted-foreground"><strong>Accuracy:</strong> ±1-2%. <strong>Cost:</strong> $50-150. <strong>Time:</strong> 15 minutes.</p>
          <p className="text-muted-foreground">Dual-energy X-ray absorptiometry. Passes two low-dose X-rays through the body to map fat, muscle, and bone. It also shows fat distribution (visceral vs subcutaneous) which is health-critical.</p>
          <p className="text-muted-foreground">Downside: requires a clinical appointment. Best used 2-3 times per year, or quarterly for detailed tracking.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Method 2: Hydrostatic weighing (underwater)</h2>
          <p className="text-muted-foreground"><strong>Accuracy:</strong> ±2-3%. <strong>Cost:</strong> $40-100. <strong>Time:</strong> 30 minutes.</p>
          <p className="text-muted-foreground">You are submerged in a tank and weighed underwater. Fat floats, muscle sinks. The difference reveals body density, which converts to body fat.</p>
          <p className="text-muted-foreground">Downside: uncomfortable, requires a facility with a tank. Rarely used now that DEXA is more accessible.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Method 3: Skin calipers (skinfold)</h2>
          <p className="text-muted-foreground"><strong>Accuracy:</strong> ±3-4% with an experienced tester. <strong>Cost:</strong> $10-30 for the calipers. <strong>Time:</strong> 5 minutes.</p>
          <p className="text-muted-foreground">Calipers pinch the skin at specific body sites. Formulas convert skinfold thickness to body fat.</p>
          <p className="text-muted-foreground">Downside: accuracy depends heavily on the tester's skill. Self-measurement is often inaccurate. Not consistent across different testers.</p>

          <h2 class="text-2xl font-black mt-8 mb-3">Method 4: Smart scale (bioelectrical impedance)</h2>
          <p className="text-muted-foreground"><strong>Accuracy:</strong> ±5-8%. <strong>Cost:</strong> $30-200. <strong>Time:</strong> Seconds.</p>
          <p className="text-muted-foreground">Sends a small current through your feet (or hands + feet). Fat resists the current more than muscle, so resistance indicates body fat percentage.</p>
          <p className="text-muted-foreground">Downside: hydration state changes the reading significantly. Same person can vary 5-8% between morning and evening. Use it for trends only, always at the same time of day.</p>

          <h2 class="text-2xl font-black mt-8 mb-3">Method 5: US Navy tape method (recommended for most)</h2>
          <p className="text-muted-foreground"><strong>Accuracy:</strong> ±3-4%. <strong>Cost:</strong> Free. <strong>Time:</strong> 2 minutes.</p>
          <p class="text-muted-foreground">Takes three circumference measurements - neck, waist, and (for women) hip - and applies a logarithm formula developed by the US Navy in 1984.</p>
          <p class="text-muted-foreground"><strong>Pros:</strong> free, consistent, no equipment beyond a tape measure, good accuracy.</p>
          <p class="text-muted-foreground"><strong>Cons:</strong> assumes standard proportions. Very lean or very muscular people see off results.</p>
          <p className="text-muted-foreground">Use our <Link to="/body-fat-calculator" className="text-primary font-bold hover:underline">Body Fat Calculator</Link> - it uses the US Navy method.</p>

          <h2 class="text-2xl font-black mt-8 mb-3">Comparison table</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-black">Method</th>
                  <th className="p-3 text-right font-black">Accuracy</th>
                  <th className="p-3 text-right font-black">Cost</th>
                  <th className="p-3 text-left font-black">Best for</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">DEXA</td><td className="p-3 text-right">±1-2%</td><td className="p-3 text-right">$50-150</td><td className="p-3">Quarterly clinical assessment</td></tr>
                <tr className="border-t border-border"><td className="p-3">Hydrostatic</td><td className="p-3 text-right">±2-3%</td><td className="p-3 text-right">$40-100</td><td className="p-3">One-time reference</td></tr>
                <tr className="border-t border-border"><td className="p-3">Calipers</td><td className="p-3 text-right">±3-4%</td><td className="p-3 text-right">$10-30</td><td className="p-3">Trained tester only</td></tr>
                <tr className="border-t border-border"><td className="p-3">Smart scale</td><td className="p-3 text-right">±5-8%</td><td className="p-3 text-right">$30-200</td><td className="p-3">Daily trend tracking</td></tr>
                <tr className="border-t border-border"><td className="p-3">US Navy tape</td><td className="p-3 text-right">±3-4%</td><td className="p-3 text-right">Free</td><td className="p-3">Monthly tracking (recommended)</td></tr>
              </tbody>
            </table>
          </div>

          <h2 class="text-2xl font-black mt-8 mb-3">How to measure with tape (US Navy)</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Neck:</strong> narrowest point just below the larynx. Tape slopes slightly downward in front.</li>
            <li><strong>Waist (men):</strong> at the navel, arms relaxed at your sides.</li>
            <li><strong>Waist (women):</strong> at the narrowest point of the torso - usually above the navel.</li>
            <li><strong>Hip (women):</strong> at the widest point of the buttocks.</li>
            <li>Measure twice, use the average. Same time of day, same conditions, every time.</li>
          </ol>

          <h2 class="text-2xl font-black mt-8 mb-3">Sources</h2>
          <p className="text-muted-foreground">Hodgdon JA, Beckett MB. "Prediction of percent body fat for US Navy men and women from body circumferences and height." Naval Health Research Center, 1984. US Navy OPNAVINST 6110.1 series.</p>
        </div>

        <div className="my-8">
          <Link to="/body-fat-calculator" className="block rounded-2xl border-2 border-rose-500/30 bg-rose-500/5 hover:border-rose-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-rose-500 transition-colors">Calculate your body fat</h3>
                <p className="text-sm text-muted-foreground">US Navy method - free, no equipment.</p>
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
            <Link to="/blog/body-fat-percentage-chart" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Activity className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Body Fat Percentage Chart</h3>
              <p className="text-xs text-muted-foreground">What is healthy for your age and gender.</p>
            </Link>
            <Link to="/blog/bmi-vs-body-fat" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Heart className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">BMI vs Body Fat</h3>
              <p className="text-xs text-muted-foreground">Which metric actually matters?</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How to Measure Body Fat'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only. Clinical decisions should use DEXA or professional assessment.
        </div>
      </div>
    </>
  )
}