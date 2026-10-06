import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How much energy does the world use per year?", a: "About 630 exajoules, or roughly 20,000 gigajoules per second. One exajoule is about 278 billion kilowatt-hours." },
  { q: "What is primary energy?", a: "Energy in its raw form before conversion - coal, oil, gas, nuclear, hydro, wind, solar. Roughly two-thirds of primary energy is lost as waste heat during conversion to useful work." },
  { q: "Which country uses the most energy?", a: "China, with about 160 exajoules per year, followed by the US at 95, India at 35, and Russia at 30." },
  { q: "Is energy use still growing?", a: "Yes - roughly 1-2% per year globally. Growth is fastest in Asia and Africa; energy use is roughly flat or declining in Europe and Japan." },
  { q: "Where does the data come from?", a: "IEA World Energy Outlook 2024." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "Global Energy Use Explained: 630 Exajoules Per Year", datePublished: '2026-10-06', dateModified: '2026-10-06', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/global-energy-use-explained' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Global Energy Use", item: 'https://timegovern.com/blog/global-energy-use-explained' }] }

export default function GlobalEnergyUsePage() {
  useEffect(() => {
    document.title = 'Global Energy Use Explained: 630 Exajoules Per Year | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "The world consumes 630 exajoules of primary energy per year. Here is where it comes from and how fast it is changing.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Global Energy Use</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-indigo-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">World Data</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Global Energy Use Explained: 630 Exajoules Per Year</h1>
        <p className="text-lg text-muted-foreground mb-4">The world consumes 630 exajoules of primary energy per year. Here is where it comes from and how fast it is changing.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 6 October 2026</span><span>&middot;</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="Global Energy Use" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The headline number</h2>
          <p>The world consumes about 630 exajoules of primary energy per year. That is 20,000 gigajoules per second, or roughly what 175 billion people would use at average European rates. Primary energy is the raw energy content of fuels before conversion, measured in joules so different sources can be compared.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Where the energy comes from</h2>
          <p>Fossil fuels still supply about 80% of global primary energy. Oil is the largest single source (30%), followed by coal (26%) and natural gas (23%). Nuclear is 5%, hydro 7%, and all other renewables (wind, solar, biomass, geothermal) together make up the remaining 9%.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The energy transition</h2>
          <p>Solar and wind added more than 500 GW in 2024 alone - more than any energy source in history. But total energy demand is also growing, so the fossil share is falling slowly. Electricity generation is decarbonizing much faster than transport, heating, or industry.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Why energy use keeps growing</h2>
          <p>Energy demand grows as populations grow, as incomes rise, and as more of the world moves into air-conditioned homes, drives cars, and uses electricity for everything. Efficiency improvements reduce energy per unit of GDP, but total GDP grows faster. Global energy use has risen every decade since the Industrial Revolution.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related live counters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/energy-use-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Energy Use Clock</div><div className="text-xs text-muted-foreground">Live energy counter</div></Link>
          <Link to="/renewable-energy-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Renewable Energy Clock</div><div className="text-xs text-muted-foreground">Renewable energy today</div></Link>
          <Link to="/co2-emissions-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">CO2 Emissions Clock</div><div className="text-xs text-muted-foreground">Live emissions counter</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/energy-use-clock" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">See the live counter <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
