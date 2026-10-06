import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How much CO2 is emitted each second?", a: "About 1,186 tonnes per second, or 37.4 billion tonnes per year." },
  { q: "Which country emits the most CO2?", a: "China, at about 11 billion tonnes per year, followed by the US at 5 billion, India at 3 billion, and the EU at 2.8 billion." },
  { q: "What is a safe level of CO2 emissions?", a: "The IPCC says global CO2 must reach net zero by 2050 to limit warming to 1.5 C. That is a 43% reduction from 2019 levels by 2030." },
  { q: "Are emissions falling?", a: "Not yet. Global emissions hit a record high in 2024. Growth has slowed, but absolute emissions still rise." },
  { q: "Where does the data come from?", a: "Global Carbon Budget 2024, published by the Global Carbon Project." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "CO2 Emissions Per Second: How Fast We Are Warming the Planet", datePublished: '2026-10-06', dateModified: '2026-10-06', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/co2-emissions-per-second' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "CO2 Emissions Per Second", item: 'https://timegovern.com/blog/co2-emissions-per-second' }] }

export default function Co2EmissionsPerSecondPage() {
  useEffect(() => {
    document.title = 'CO2 Emissions Per Second: How Fast We Are Warming the Planet | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "The world emits 1,186 tonnes of CO2 every second. Here is where it comes from and why emissions have not yet peaked.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>CO2 Emissions Per Second</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-indigo-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">World Data</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">CO2 Emissions Per Second: How Fast We Are Warming the Planet</h1>
        <p className="text-lg text-muted-foreground mb-4">The world emits 1,186 tonnes of CO2 every second. Here is where it comes from and why emissions have not yet peaked.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 6 October 2026</span><span>&middot;</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="CO2 Emissions Per Second" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The per-second number</h2>
          <p>About 1,186 tonnes of CO2 are emitted every second worldwide - roughly 37.4 billion tonnes per year. The rate comes from the Global Carbon Budget 2024, the annual peer-reviewed assessment of global emissions.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Where it comes from</h2>
          <p>Coal, oil, and gas account for roughly 90% of global CO2 emissions. Cement production and flaring contribute the rest. Electricity and heat generation is the single largest sector, followed by transport, industry, and buildings.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The largest emitters</h2>
          <p>China emits about 11 billion tonnes per year, followed by the United States at 5 billion, India at 3 billion, and the EU at 2.8 billion. Per capita, the ranking flips: Qatar, Kuwait, and the UAE emit more per person than any major economy.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Why emissions are still rising</h2>
          <p>Global CO2 emissions reached an all-time high in 2024 despite rapid renewable buildout. The annual growth rate has slowed from 3% per year in the 2000s to under 1%, but emissions have not yet peaked. To stay under 1.5 C, emissions must fall 43% below 2019 levels by 2030.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related live counters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/co2-emissions-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">CO2 Emissions Clock</div><div className="text-xs text-muted-foreground">Live emissions counter</div></Link>
          <Link to="/energy-use-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Energy Use Clock</div><div className="text-xs text-muted-foreground">Primary energy today</div></Link>
          <Link to="/forest-loss-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Forest Loss Clock</div><div className="text-xs text-muted-foreground">Forest lost today</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/co2-emissions-clock" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">See the live counter <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
