import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "What is the best protein source?", a: "For bioavailability and leucine content, whey, eggs, dairy, and lean meat are hard to beat. Soy is the best plant source. Whole foods beat powders for satiety, but powders are convenient for hitting targets." },
  { q: "Do I need protein immediately after training?", a: "No. The 30-minute anabolic window is largely a myth. Any protein within a few hours of training works. Pre-sleep casein is one of the few timing strategies with strong evidence." },
  { q: "Is 2 g/kg too much protein?", a: "No. That is within the evidence-based range for active adults trying to build or preserve muscle. Going higher offers little additional benefit." },
  { q: "How much protein for weight loss?", a: "Target 2.0-2.4 g/kg of body weight (or of lean mass) when cutting. Higher protein preserves muscle, increases satiety, and has a higher thermic effect than carbs or fat." },
  { q: "Can vegans get enough protein?", a: "Yes - eat 10-20% more total protein, combine complementary sources (legumes + grains), and prioritise soy, seitan, and protein-rich plant foods." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "Protein Guide: How Much Do You Actually Need?", datePublished: '2026-10-04', dateModified: '2026-10-04', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/protein-guide' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Protein Guide", item: 'https://timegovern.com/blog/protein-guide' }] }

export default function ProteinGuidePage() {
  useEffect(() => {
    document.title = 'Protein Guide: How Much Do You Actually Need? | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "Daily protein targets by activity level, per-meal distribution, plant vs animal protein, and how much is too much.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Protein Guide</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-rose-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">Guide</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Protein Guide: How Much Do You Actually Need?</h1>
        <p className="text-lg text-muted-foreground mb-4">Daily protein targets by activity level, per-meal distribution, plant vs animal protein, and how much is too much.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 4 October 2026</span><span>&middot;</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="Protein Guide" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">How much protein you need</h2>
          <p>The RDA of 0.8 g/kg is the minimum to prevent deficiency, not the optimal for health or performance. For most active adults, the right target is 1.6-2.2 g/kg.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Sedentary adult: 0.8-1.0 g/kg</li>
            <li>Recreational exerciser: 1.2-1.6 g/kg</li>
            <li>Strength training: 1.6-2.2 g/kg</li>
            <li>Cutting (preserve muscle): 2.0-2.4 g/kg</li>
            <li>Endurance athlete: 1.2-1.4 g/kg</li>
            <li>Older adult (60+): 1.0-1.2 g/kg</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Per-meal distribution</h2>
          <p>Your body can use 25-40 g of protein per meal efficiently for muscle building. Spreading total daily protein across 3-4 meals of 25-40 g each may maximise muscle protein synthesis. A single 100 g bolus is not wasted, but the anabolic response plateaus.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Plant vs animal protein</h2>
          <p>Animal proteins (meat, dairy, eggs) are complete and highly bioavailable. Most plant proteins are lower in one or more essential amino acids - but combining them across the day (rice + beans, hummus + wholewheat) covers the full profile.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Plant-based eaters: aim 10-20% higher total protein</li>
            <li>Soy, quinoa, hemp, and buckwheat are complete on their own</li>
            <li>Leucine (the key muscle-building amino acid) is lower in plant sources</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Does protein timing matter?</h2>
          <p>Total daily protein matters most. The "anabolic window" is much wider than the 30-minute myth - within a few hours of training is fine. The pre-sleep casein dose (30-40 g) is one of the few timing effects that consistently shows up in research for muscle building.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Can you eat too much protein?</h2>
          <p>Healthy adults can safely eat up to 2.5 g/kg with no kidney damage. Very high intakes (3+ g/kg) may cause digestive discomfort, displace other nutrients, and are unnecessary for any performance goal.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/protein-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Protein Calculator</div><div className="text-xs text-muted-foreground">Daily protein target</div></Link>
          <Link to="/macro-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Macro Calculator</div><div className="text-xs text-muted-foreground">Protein, fat, carbs</div></Link>
          <Link to="/tdee-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">TDEE Calculator</div><div className="text-xs text-muted-foreground">Total daily energy</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/protein-calculator" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Try the calculator <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
