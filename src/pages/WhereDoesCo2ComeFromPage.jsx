import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "What is the largest source of CO2?", a: "Electricity and heat generation, at about 30% of global greenhouse gas emissions. Coal-fired power plants are the single largest contributor." },
  { q: "How much comes from transport?", a: "About 16% of global emissions. Road vehicles account for three-quarters of that, aviation and shipping for the rest." },
  { q: "What about agriculture?", a: "Agriculture, forestry, and land use account for about 18-20% of global greenhouse gas emissions, including methane from livestock and deforestation." },
  { q: "Is cement a big source?", a: "Cement production alone accounts for about 8% of global CO2 emissions - more than aviation." },
  { q: "Where does the data come from?", a: "Our World in Data, based on the Global Carbon Project and Climate Watch." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "Where Does CO2 Come From? Global Emission Sources Explained", datePublished: '2026-10-06', dateModified: '2026-10-06', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/where-does-co2-come-from' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Where CO2 Comes From", item: 'https://timegovern.com/blog/where-does-co2-come-from' }] }

export default function WhereDoesCo2ComeFromPage() {
  useEffect(() => {
    document.title = 'Where Does CO2 Come From? Global Emission Sources Explained | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "A sector-by-sector breakdown of global CO2 emissions: electricity, transport, industry, buildings, and agriculture.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Where CO2 Comes From</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-indigo-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">World Data</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Where Does CO2 Come From? Global Emission Sources Explained</h1>
        <p className="text-lg text-muted-foreground mb-4">A sector-by-sector breakdown of global CO2 emissions: electricity, transport, industry, buildings, and agriculture.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 6 October 2026</span><span>&middot;</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="Where CO2 Comes From" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The five sectors</h2>
          <p>About 73% of global greenhouse gas emissions come from energy use: electricity and heat generation (30%), transport (16%), manufacturing and construction (12%), buildings (6%), and other fuel combustion (9%). The remaining 27% comes from agriculture, forestry, land use, and industrial processes like cement.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Electricity and heat</h2>
          <p>Coal-fired power plants are the single largest source. Coal produces more CO2 per unit of electricity than any other fossil fuel. Despite rapid renewable buildout, coal still supplies about 36% of global electricity, and global coal emissions hit a record high in 2023.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Transport</h2>
          <p>Road vehicles account for three-quarters of transport emissions. Aviation and shipping together account for about 20%. Electric vehicles are growing fast but still represent less than 3% of the global car fleet.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The accounting problem</h2>
          <p>Emissions are counted where they are produced, not where the products are consumed. This means China is credited with emissions from goods shipped to the US and Europe. Consumption-based accounting shifts about 10% of global emissions from producing to consuming countries.</p>
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
          <Link to="/renewable-energy-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Renewable Energy Clock</div><div className="text-xs text-muted-foreground">Renewable energy today</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/co2-emissions-clock" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">See the live counter <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
