import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight, BookOpen, Calculator, FlaskConical, Activity } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is BMR?', a: 'Basal Metabolic Rate - the number of calories your body burns at complete rest to maintain vital functions like breathing, circulation, and cell repair. Typically 60-70% of your total daily calorie burn.' },
  { q: 'What is the Mifflin-St Jeor equation?', a: 'A formula published in 1990 for estimating BMR. It is more accurate than the older Harris-Benedict formula and is the current clinical standard.' },
  { q: 'Why is Mifflin-St Jeor preferred over Harris-Benedict?', a: 'Harris-Benedict was based on a 1919 population that was leaner and more active. It overestimates BMR by about 5% in modern populations. Mifflin-St Jeor was derived from modern data and is more accurate.' },
  { q: 'Does BMR decrease with age?', a: 'Yes, by about 1-2% per decade after age 30, mostly due to loss of muscle mass. Resistance training slows this decline by preserving muscle.' },
  { q: 'Does muscle mass affect BMR?', a: 'Yes. Muscle is metabolically active tissue and burns more calories at rest than fat. A muscular person can have a BMR 200+ kcal/day higher than someone the same weight with more body fat.' },
  { q: 'Can I increase my BMR?', a: 'Modestly. Building muscle, eating enough protein, sleeping well, and avoiding prolonged crash diets all help. Genetic and age-related factors cannot be changed.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'BMR Formula Explained: Mifflin-St Jeor vs Harris-Benedict', description: 'The science behind BMR formulas - how Mifflin-St Jeor and Harris-Benedict work, which is more accurate, and why it matters.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/bmr-formula-explained' }

export default function BMRFormulaExplainedPage() {
  useEffect(() => {
    document.title = 'BMR Formula Explained: Mifflin-St Jeor vs Harris-Benedict | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'BMR formulas explained - Mifflin-St Jeor vs Harris-Benedict. Learn which is more accurate, the equations, and how BMR is used in TDEE.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / BMR Formula Explained
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mb-4">
            <FlaskConical className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Science - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            BMR Formula Explained
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Two formulas dominate BMR calculation. One is outdated. Here is which to use and why.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">What BMR actually measures</h2>
          <p className="text-muted-foreground">BMR (Basal Metabolic Rate) is the number of calories your body uses per day to maintain itself at complete rest - no movement, no digestion, no thermoregulation. Just the baseline cost of being alive.</p>
          <p className="text-muted-foreground">Strictly, BMR is measured in a laboratory after an overnight fast, in a thermally neutral environment, lying still. In practice, "BMR" is used loosely in fitness contexts to mean resting metabolic rate (RMR). The two differ by about 10%.</p>
          <p className="text-muted-foreground">BMR is important because it is the largest component of your total daily energy expenditure (TDEE) - typically 60-70%.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The Mifflin-St Jeor equation (modern standard)</h2>
          <p className="text-muted-foreground">Published by Mifflin and St Jeor in 1990. Recommended by the Academy of Nutrition and Dietetics.</p>
          <p className="text-muted-foreground font-mono bg-muted p-4 rounded-lg text-sm">
            Men:   BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5<br/>
            Women: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161
          </p>
          <p className="text-muted-foreground"><strong>Worked example</strong> - 30-year-old male, 75 kg, 175 cm:</p>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-xs">
            BMR = 10(75) + 6.25(175) − 5(30) + 5 = 750 + 1093.75 − 150 + 5 = 1,698.75 kcal
          </p>

          <h2 className="text-2xl font-black mt-8 mb-3">The Harris-Benedict equation (revised, 1984)</h2>
          <p className="text-muted-foreground">The classic formula, originally published in 1919 and revised in 1984. It was the standard for most of the 20th century.</p>
          <p className="text-muted-foreground font-mono bg-muted p-4 rounded-lg text-sm">
            Men:   BMR = 88.362 + 13.397 × weight(kg) + 4.799 × height(cm) − 5.677 × age<br/>
            Women: BMR = 447.593 + 9.247 × weight(kg) + 3.098 × height(cm) − 4.330 × age
          </p>
          <p className="text-muted-foreground">Same example - 30-year-old male, 75 kg, 175 cm:</p>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-xs">
            BMR = 88.362 + 1004.775 + 839.825 − 170.31 = 1,762.65 kcal
          </p>

          <h2 className="text-2xl font-black mt-8 mb-3">Which is more accurate?</h2>
          <p className="text-muted-foreground">Mifflin-St Jeor is more accurate for modern populations. Studies show Harris-Benedict overestimates BMR by about 5% because:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>The 1919 population was leaner and more active.</li>
            <li>Modern populations have higher average body fat percentages.</li>
            <li>Harris-Benedict-derived estimates are systematically high by 5-15% in most validation studies.</li>
          </ul>
          <p className="text-muted-foreground">For the worked example above, the difference is roughly 64 kcal/day - about 6 kg of body weight over a year. Not trivial.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">What about the Katch-McArdle formula?</h2>
          <p className="text-muted-foreground">For people who know their body fat percentage, the Katch-McArdle formula is more accurate because it uses lean body mass instead of total weight:</p>
          <p className="text-muted-foreground font-mono bg-muted p-4 rounded-lg text-sm">
            BMR = 370 + 21.6 × lean body mass (kg)
          </p>
          <p className="text-muted-foreground">Lean body mass = total weight × (1 − body fat %). This is the best choice if you have a reliable body fat measurement. For everyone else, Mifflin-St Jeor is the practical default.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Why it does not matter that much</h2>
          <p className="text-muted-foreground">All formulas give estimates. Individual variation between formulas is 50-200 kcal/day, which is smaller than the error from a single bad food-tracking day.</p>
          <p className="text-muted-foreground">The formula gets you close. Real-world results over 2-3 weeks tell you whether you are actually at the right intake. Adjust 100-200 kcal and re-test if needed.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">How BMR feeds into TDEE</h2>
          <p className="text-muted-foreground">BMR alone is not enough for planning. You need TDEE, which is BMR multiplied by an activity factor (1.2 to 1.9 depending on how active you are). That is what you actually eat against.</p>
          <p className="text-muted-foreground">Use our <Link to="/calorie-calculator" className="text-primary font-bold hover:underline">Calorie Calculator</Link> to get both numbers instantly - it applies Mifflin-St Jeor, then converts to TDEE and goal-based targets.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Sources</h2>
          <p className="text-muted-foreground">Mifflin MD, St Jeor ST, et al. "A new predictive equation for resting energy expenditure in healthy individuals." Am J Clin Nutr. 1990. Harris JA, Benedict FG. "A Biometric Study of Basal Metabolism in Man." Carnegie Institution of Washington, 1919.</p>
        </div>

        <div className="my-8">
          <Link to="/calorie-calculator" className="block rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-emerald-500 transition-colors">Calculate your BMR + TDEE</h3>
                <p className="text-sm text-muted-foreground">Uses Mifflin-St Jeor. Free, instant.</p>
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
            <Link to="/blog/how-many-calories-to-lose-weight" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Activity className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How Many Calories to Lose Weight?</h3>
              <p className="text-xs text-muted-foreground">Deficit guidance and safe rates.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'BMR Formula Explained'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only. Consult a healthcare professional for personalised guidance.
        </div>
      </div>
    </>
  )
}