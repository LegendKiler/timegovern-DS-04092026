import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Flame, ArrowRight, BookOpen, Calculator, Heart, Activity } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What does TDEE stand for?', a: 'Total Daily Energy Expenditure. It is the total number of calories your body burns in 24 hours, including BMR, physical activity, and the thermic effect of food.' },
  { q: 'What is the difference between BMR and TDEE?', a: 'BMR (Basal Metabolic Rate) is what you burn at complete rest. TDEE is what you burn including all activity. TDEE is always higher than BMR - usually 1.2x to 1.9x depending on activity level.' },
  { q: 'How do I calculate my TDEE?', a: 'Calculate BMR first (using the Mifflin-St Jeor equation), then multiply by an activity factor (1.2 sedentary to 1.9 extremely active). Our calculator does this automatically.' },
  { q: 'What is the thermic effect of food?', a: 'The energy your body uses to digest and absorb food. It is about 10% of your total calorie intake and is already factored into the activity multipliers used by most TDEE calculators.' },
  { q: 'Does TDEE change over time?', a: 'Yes. It drops as you age (about 1-2% per decade after 30), rises with muscle mass, and temporarily drops during prolonged calorie restriction (metabolic adaptation).' },
  { q: 'How accurate is TDEE?', a: 'For most people, within 5-10% of actual. Individual variation comes from genetics, muscle mass, and gut microbiome. Treat the number as a starting point and adjust based on real-world results.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'What Is TDEE? The Complete Guide', description: 'Total Daily Energy Expenditure explained - what it is, how it is calculated, and why it matters for weight management.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/what-is-tdee' }

export default function WhatIsTDEEPage() {
  useEffect(() => {
    document.title = 'What Is TDEE? The Complete Guide | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'What is TDEE? Total Daily Energy Expenditure explained - how it is calculated, why it matters, and how to use it for weight loss or muscle gain.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / What Is TDEE?
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mb-4">
            <Flame className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Health - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            What Is TDEE?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            TDEE is the single most useful number for managing your weight. Here is what it actually means and how to use it.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The one-sentence definition</h2>
          <p className="text-muted-foreground">TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in 24 hours - including everything from breathing to exercise.</p>
          <p className="text-muted-foreground">If you eat exactly your TDEE every day, your weight stays the same. Eat less, you lose. Eat more, you gain.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The four components of TDEE</h2>
          <p className="text-muted-foreground">Your daily burn comes from four sources:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>BMR (Basal Metabolic Rate)</strong> - 60-70% of TDEE. What you burn at complete rest.</li>
            <li><strong>TEF (Thermic Effect of Food)</strong> - about 10%. Energy used digesting what you eat.</li>
            <li><strong>NEAT (Non-Exercise Activity Thermogenesis)</strong> - 15-30%. Everything from fidgeting to walking around.</li>
            <li><strong>EAT (Exercise Activity Thermogenesis)</strong> - 5-15%. Deliberate exercise.</li>
          </ul>
          <p className="text-muted-foreground">Notice the surprise: exercise is the smallest slice. Most of your daily burn comes from just being alive (BMR) and moving around doing normal things (NEAT).</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The formula</h2>
          <p className="text-muted-foreground">Modern TDEE calculators use the Mifflin-St Jeor equation to estimate BMR, then multiply by an activity factor:</p>
          <p className="text-muted-foreground font-mono bg-muted p-4 rounded-lg text-sm">
            Men:   BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5<br/>
            Women: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161<br/><br/>
            TDEE = BMR × activity factor
          </p>
          <p className="text-muted-foreground">Activity factors range from 1.2 (sedentary) to 1.9 (physical job + twice-daily training). Our <Link to="/calorie-calculator" className="text-primary font-bold hover:underline">Calorie Calculator</Link> does all of this instantly.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Activity factors explained</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-black">Level</th>
                  <th className="p-3 text-left font-black">Description</th>
                  <th className="p-3 text-right font-black">Multiplier</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">Sedentary</td><td className="p-3">Desk job, little/no exercise</td><td className="p-3 text-right">1.2</td></tr>
                <tr className="border-t border-border"><td className="p-3">Lightly active</td><td className="p-3">1-3 days/week exercise</td><td className="p-3 text-right">1.375</td></tr>
                <tr className="border-t border-border"><td className="p-3">Moderately active</td><td className="p-3">3-5 days/week exercise</td><td className="p-3 text-right">1.55</td></tr>
                <tr className="border-t border-border"><td className="p-3">Very active</td><td className="p-3">6-7 days/week exercise</td><td className="p-3 text-right">1.725</td></tr>
                <tr className="border-t border-border"><td className="p-3">Extremely active</td><td className="p-3">Physical job + 2x training/day</td><td className="p-3 text-right">1.9</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground">Most people overestimate their activity level. If you sit at a desk 8 hours a day and exercise 3 times a week, you are "lightly active" (1.375), not "very active". Be honest - it matters by several hundred calories per day.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">How to use TDEE for goals</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Maintain weight:</strong> Eat exactly your TDEE.</li>
            <li><strong>Lose ~0.5 kg/week:</strong> Eat 500 kcal below TDEE.</li>
            <li><strong>Lose ~0.25 kg/week (easier):</strong> Eat 250 kcal below TDEE.</li>
            <li><strong>Lean muscle gain:</strong> Eat 300-500 kcal above TDEE.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Why TDEE is not perfect</h2>
          <p className="text-muted-foreground">TDEE calculations are estimates, not measurements. Individual variation is real:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Genetics</strong> - some people burn 200+ calories/day more than others at the same size.</li>
            <li><strong>Muscle mass</strong> - muscle burns more than fat, so a muscular person has a higher TDEE.</li>
            <li><strong>Metabolic adaptation</strong> - after weeks of dieting, your body drops TDEE to defend its weight.</li>
            <li><strong>Gut microbiome</strong> - affects how many calories you absorb from food.</li>
            <li><strong>Accuracy of food tracking</strong> - most people under-report by 20-30%.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The practical approach</h2>
          <p className="text-muted-foreground">Use TDEE as a starting point, not a fixed truth. Weigh yourself daily (same time, same conditions) and average weekly. If weight is not moving toward your goal over 2-3 weeks, adjust by 100-200 calories and re-test.</p>
          <p className="text-muted-foreground">That real-world feedback loop matters more than any formula. TDEE tells you where to start; results tell you where to go.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Sources</h2>
          <p className="text-muted-foreground">The Mifflin-St Jeor equation (1990) is the modern clinical standard, recommended by the Academy of Nutrition and Dietetics. Equivalent formulas are used by the <a href="https://www.nhs.uk/live-well/healthy-weight/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">NHS</a> (UK) and the <a href="https://www.cdc.gov/healthyweight/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">CDC</a> (US).</p>
        </div>

        <div className="my-8">
          <Link to="/calorie-calculator" className="block rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-emerald-500 transition-colors">Calculate your TDEE</h3>
                <p className="text-sm text-muted-foreground">Free, instant, uses Mifflin-St Jeor.</p>
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
            <Link to="/blog/how-many-calories-to-lose-weight" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How Many Calories to Lose Weight?</h3>
              <p className="text-xs text-muted-foreground">Deficit guidance and safe rates.</p>
            </Link>
            <Link to="/blog/bmr-formula-explained" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Heart className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">BMR Formula Explained</h3>
              <p className="text-xs text-muted-foreground">Mifflin-St Jeor vs Harris-Benedict.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'What Is TDEE?'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> For informational purposes only. Consult a healthcare professional before major dietary changes.
        </div>
      </div>
    </>
  )
}