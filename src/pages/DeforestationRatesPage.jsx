import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How much forest is lost each year?", a: "About 10 million hectares of net forest loss per year. Gross loss is higher; net loss accounts for regrowth." },
  { q: "Which country loses the most forest?", a: "Brazil, with about 1.5 million hectares of primary forest lost per year, followed by the DRC and Indonesia." },
  { q: "Is deforestation reversible?", a: "Yes - forests regenerate over decades if left alone. Primary forest takes centuries to reform and has biodiversity that secondary forest cannot fully replace." },
  { q: "What drives deforestation?", a: "Beef, soy, palm oil, and timber are the leading commodities behind tropical forest loss. Smallholder agriculture and fires also contribute." },
  { q: "Where does the data come from?", a: "FAO Global Forest Resources Assessment 2020." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "Deforestation Rates Explained: 10 Million Hectares Per Year", datePublished: '2026-10-06', dateModified: '2026-10-06', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/deforestation-rates-explained' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Deforestation Rates", item: 'https://timegovern.com/blog/deforestation-rates-explained' }] }

export default function DeforestationRatesPage() {
  useEffect(() => {
    document.title = 'Deforestation Rates Explained: 10 Million Hectares Per Year | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "The world loses about 10 million hectares of forest per year. Here is where it is happening and why it matters.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Deforestation Rates</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-indigo-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">World Data</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Deforestation Rates Explained: 10 Million Hectares Per Year</h1>
        <p className="text-lg text-muted-foreground mb-4">The world loses about 10 million hectares of forest per year. Here is where it is happening and why it matters.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 6 October 2026</span><span>&middot;</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="Deforestation Rates" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The rate</h2>
          <p>The world loses about 10 million hectares of net forest cover per year - an area roughly the size of Iceland. That equals roughly 0.32 hectares per second, or 27,400 hectares per day. The figures come from the FAO Global Forest Resources Assessment.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Where forests are disappearing</h2>
          <p>Tropical regions account for more than 90% of net forest loss. Brazil, the Democratic Republic of the Congo, and Indonesia together account for about half of all primary forest loss. Temperate and boreal forests are roughly stable, with regrowth offsetting harvest.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Why it matters</h2>
          <p>Forests absorb about 2 billion tonnes of CO2 per year - roughly 5% of annual emissions. When forests are cleared, that carbon is released and the sink is lost. Deforestation also drives biodiversity loss, soil erosion, and disruption of regional rainfall patterns.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The good news</h2>
          <p>Net forest loss has fallen from 16 million hectares per year in the 1990s to about 10 million in 2015-2020. Reforestation in China, India, and Europe has offset losses elsewhere. Vietnam and South Korea have reversed deforestation entirely by combining policy, enforcement, and agricultural intensification.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related live counters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/forest-loss-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Forest Loss Clock</div><div className="text-xs text-muted-foreground">Live forest loss counter</div></Link>
          <Link to="/co2-emissions-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">CO2 Emissions Clock</div><div className="text-xs text-muted-foreground">Live emissions counter</div></Link>
          <Link to="/water-used-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Water Used Clock</div><div className="text-xs text-muted-foreground">Freshwater used today</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/forest-loss-clock" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">See the live counter <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
