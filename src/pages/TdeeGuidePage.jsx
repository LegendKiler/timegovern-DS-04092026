import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "What is TDEE in one sentence?", a: "TDEE is the total calories you burn per day, including everything from breathing at rest to exercise and digestion." },
  { q: "Is TDEE the same as maintenance calories?", a: "Yes. Eating at your TDEE means maintaining weight. Eating below it loses weight, above it gains weight." },
  { q: "Should I recalculate TDEE as I lose weight?", a: "Yes - every 4-6 kg (10-15 lbs) of weight change. Lighter bodies burn fewer calories at the same activity level." },
  { q: "Why does my TDEE change day to day?", a: "NEAT is the most variable component. You burn significantly more on days you walk 15,000 steps than on days you walk 3,000. The calculator gives your average." },
  { q: "Can TDEE predict exact weight loss?", a: "Predicts direction reliably, timing approximately. Water retention, glycogen shifts, and hormonal cycles mean the scale moves unevenly even when the underlying math is correct." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "TDEE Guide: Total Daily Energy Expenditure Explained", datePublished: '2026-10-04', dateModified: '2026-10-04', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/tdee-guide' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "TDEE Guide", item: 'https://timegovern.com/blog/tdee-guide' }] }

export default function TdeeGuidePage() {
  useEffect(() => {
    document.title = 'TDEE Guide: Total Daily Energy Expenditure Explained | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "What TDEE is, how it differs from BMR, how the activity multipliers work, and how to use TDEE to lose, maintain, or gain weight.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>TDEE Guide</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-orange-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">Guide</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">TDEE Guide: Total Daily Energy Expenditure Explained</h1>
        <p className="text-lg text-muted-foreground mb-4">What TDEE is, how it differs from BMR, how the activity multipliers work, and how to use TDEE to lose, maintain, or gain weight.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 4 October 2026</span><span>&middot;</span><span>6 min read</span></div>
      </header>

      <ShareButtons title="TDEE Guide" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">What TDEE is</h2>
          <p>Total Daily Energy Expenditure is the total number of calories you burn in a day. It is the sum of four components:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>BMR (60-70%): calories burned at complete rest</li>
            <li>TEF (10%): energy used to digest food</li>
            <li>EAT (5-15%): calories from intentional exercise</li>
            <li>NEAT (15-30%): everything else - walking, fidgeting, chores</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">BMR vs TDEE</h2>
          <p>BMR is the floor - the calories you would burn lying still for 24 hours. TDEE is your actual daily burn including everything you do. TDEE is always higher than BMR, typically by 20-90% depending on activity.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Activity multipliers</h2>
          <p>The multiplier you pick scales BMR up to TDEE. Pick honestly - most people overestimate.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>1.2 - Sedentary: desk job, no exercise</li>
            <li>1.375 - Light: 1-3 workouts/week</li>
            <li>1.55 - Moderate: 3-5 workouts/week</li>
            <li>1.725 - High: 6-7 workouts/week or physical job</li>
            <li>1.9 - Athlete: 2x/day training or elite athlete</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Using TDEE for weight goals</h2>
          <p>TDEE is your maintenance number - eat this to stay the same. Adjust from there:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Cut (moderate): TDEE - 20% - sustainable fat loss</li>
            <li>Cut (aggressive): TDEE - 25% - faster but harder to stick to</li>
            <li>Maintain: TDEE - stay the same weight</li>
            <li>Bulk (lean): TDEE + 10% - muscle gain with minimal fat</li>
            <li>Bulk (aggressive): TDEE + 15-20% - faster gains, more fat</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">How accurate is TDEE?</h2>
          <p>Within 5-10% for most adults. Individual metabolism varies. Use the number as a starting point, then track weight for 2-3 weeks. If you are not losing or gaining as expected, adjust by 100-200 kcal and re-measure.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/tdee-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">TDEE Calculator</div><div className="text-xs text-muted-foreground">Total daily energy</div></Link>
          <Link to="/macro-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Macro Calculator</div><div className="text-xs text-muted-foreground">Protein, fat, carbs</div></Link>
          <Link to="/calorie-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Calorie Calculator</div><div className="text-xs text-muted-foreground">Daily calorie needs</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/tdee-calculator" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Try the calculator <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
