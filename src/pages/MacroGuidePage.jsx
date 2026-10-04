import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "Do I have to count every gram?", a: "No. Track for 1-2 weeks to learn portion sizes, then eyeball. Hitting your protein target daily and staying within 100-200 kcal of your calorie target is enough for most people." },
  { q: "What if I prefer a different split?", a: "Use whatever split you can stick to. Total calories and total protein are the two variables that matter most. Fat needs to be at least 0.5 g/kg for hormonal health; carbs can vary widely." },
  { q: "How much protein is too much?", a: "Healthy adults can safely eat up to 2.5 g/kg without kidney problems. Most people do best between 1.6 and 2.2 g/kg for muscle building and 2.0-2.4 g/kg when cutting." },
  { q: "Can I hit macros on a vegan diet?", a: "Yes. Combine plant proteins (rice + beans, hummus + pita) to cover all amino acids, and eat 10-20% more total protein because plant sources are slightly less bioavailable." },
  { q: "How long until I see results?", a: "Give any macro plan 3-4 weeks before judging. Water weight and glycogen shifts can mask fat loss in the first two weeks." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "Macro Guide: How to Calculate Protein, Fat, and Carbs", datePublished: '2026-10-04', dateModified: '2026-10-04', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/macro-guide' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Macro Guide", item: 'https://timegovern.com/blog/macro-guide' }] }

export default function MacroGuidePage() {
  useEffect(() => {
    document.title = 'Macro Guide: How to Calculate Protein, Fat, and Carbs | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "Learn what macronutrients are, how to calculate your personal macro split, and how to track them effectively for cutting, maintaining, or bulking.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Macro Guide</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-violet-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">Guide</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Macro Guide: How to Calculate Protein, Fat, and Carbs</h1>
        <p className="text-lg text-muted-foreground mb-4">Learn what macronutrients are, how to calculate your personal macro split, and how to track them effectively for cutting, maintaining, or bulking.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 4 October 2026</span><span>&middot;</span><span>6 min read</span></div>
      </header>

      <ShareButtons title="Macro Guide" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">What macros are</h2>
          <p>Macronutrients are the three nutrients your body uses for energy: protein, fat, and carbohydrates. Every calorie you eat comes from one of them, plus alcohol.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Protein: 4 kcal/g - builds and repairs muscle</li>
            <li>Fat: 9 kcal/g - hormones, brain, long-term energy</li>
            <li>Carbs: 4 kcal/g - primary fuel for high-intensity work</li>
            <li>Alcohol: 7 kcal/g - no nutritional benefit, still counts</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">How to calculate your macros</h2>
          <p>Macro calculation is a three-step process: find your BMR, multiply by activity to get TDEE, then split calories into macro percentages.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Step 1 - BMR (Mifflin-St Jeor): 10 x weight(kg) + 6.25 x height(cm) - 5 x age - (5 male / -161 female)</li>
            <li>Step 2 - TDEE = BMR x activity multiplier (1.2 to 1.9)</li>
            <li>Step 3 - Apply split: e.g. 30% protein, 25% fat, 45% carbs</li>
            <li>Convert grams: protein g = kcal x %/4, fat g = kcal x %/9, carbs g = kcal x %/4</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Worked example</h2>
          <p>A 30-year-old male, 70 kg, 175 cm, moderate activity, maintenance goal:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>BMR = 10(70) + 6.25(175) - 5(30) + 5 = 1648 kcal</li>
            <li>TDEE = 1648 x 1.55 = 2554 kcal</li>
            <li>30% protein = 766 kcal = 191 g</li>
            <li>25% fat = 639 kcal = 71 g</li>
            <li>45% carbs = 1149 kcal = 287 g</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Choosing your split</h2>
          <p>There is no single best split. What matters most is total calories and total protein. Common options:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Balanced: 30% protein / 25% fat / 45% carbs - default for most people</li>
            <li>High protein / cut: 35% / 25% / 40% - preserves muscle in a deficit</li>
            <li>High carb / athlete: 25% / 20% / 55% - fuels endurance and high-volume training</li>
            <li>Low carb: 30% / 45% / 25% - some people find it easier to control appetite</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Common mistakes</h2>
          <p>The biggest macro mistakes are counting protein and carbs precisely but ignoring fat (easy to under-estimate olive oil, nuts, cheese), not adjusting when weight stalls, and treating a single day of off-plan eating as failure. Weekly averages matter more than daily precision.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/macro-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Macro Calculator</div><div className="text-xs text-muted-foreground">Protein, fat, carbs</div></Link>
          <Link to="/tdee-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">TDEE Calculator</div><div className="text-xs text-muted-foreground">Total daily energy</div></Link>
          <Link to="/protein-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Protein Calculator</div><div className="text-xs text-muted-foreground">Daily protein target</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/macro-calculator" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Try the calculator <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
