import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How much food is wasted each year?", a: "About 1.05 billion tonnes at the retail and consumer level, plus roughly 1.3 billion tonnes lost on farms and in transit. Combined, about one-third of all food produced." },
  { q: "What is the difference between food loss and food waste?", a: "Food loss happens between harvest and retail - on farms, in storage, in transit. Food waste happens at retail, food service, and household level." },
  { q: "Which country wastes the most food?", a: "China, India, and Nigeria waste the most in absolute terms. Per capita, the US, Australia, and parts of Europe lead household food waste." },
  { q: "How can I reduce food waste?", a: "Plan meals, shop with a list, store food correctly, use leftovers, and trust your senses over date labels. Household-level changes account for 60% of the total." },
  { q: "Where does the data come from?", a: "UNEP Food Waste Index Report 2024, published by the UN Environment Programme." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "Food Waste and Climate Change: The 8% Problem", datePublished: '2026-10-06', dateModified: '2026-10-06', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/food-waste-climate-impact' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Food Waste and Climate", item: 'https://timegovern.com/blog/food-waste-climate-impact' }] }

export default function FoodWasteClimatePage() {
  useEffect(() => {
    document.title = 'Food Waste and Climate Change: The 8% Problem | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "Food waste generates 8-10% of global greenhouse gas emissions. Here is why it matters and how to reduce it.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Food Waste and Climate</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-indigo-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">World Data</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Food Waste and Climate Change: The 8% Problem</h1>
        <p className="text-lg text-muted-foreground mb-4">Food waste generates 8-10% of global greenhouse gas emissions. Here is why it matters and how to reduce it.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 6 October 2026</span><span>&middot;</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="Food Waste and Climate" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The climate impact</h2>
          <p>Food waste generates 8-10% of global greenhouse gas emissions - roughly four times the emissions of the entire aviation industry. If food waste were a country, it would be the third-largest emitter after China and the United States.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">How much is wasted</h2>
          <p>About 1.05 billion tonnes of food is wasted every year at the household, retail, and food-service levels. Combined with food lost on farms and during transport, roughly one-third of all food produced for human consumption is never eaten.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Where it happens</h2>
          <p>Households are the largest source, accounting for 60% of total food waste. Food service - restaurants, canteens, hotels - is 28%, and retail is 12%. The pattern is similar across income levels: food waste is a rich-country and poor-country problem alike.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Why reducing waste is hard</h2>
          <p>Food waste is distributed across billions of households and businesses, so there is no single point of intervention. Cheap food makes waste feel harmless. Confusing date labels lead consumers to discard safe food. And the infrastructure to redistribute surplus food is underfunded almost everywhere.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related live counters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/food-waste-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Food Waste Clock</div><div className="text-xs text-muted-foreground">Live food waste counter</div></Link>
          <Link to="/co2-emissions-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">CO2 Emissions Clock</div><div className="text-xs text-muted-foreground">Live emissions counter</div></Link>
          <Link to="/water-used-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Water Used Clock</div><div className="text-xs text-muted-foreground">Freshwater used today</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/food-waste-clock" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">See the live counter <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
