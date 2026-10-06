import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How much plastic is produced each year?", a: "About 410 million tonnes, which is roughly 1.1 million tonnes per day or 13 tonnes per second." },
  { q: "How much plastic is recycled?", a: "Globally about 9% of plastic ever produced has been recycled. The rest is landfilled, incinerated, or leaked into the environment." },
  { q: "Which country produces the most plastic?", a: "China, with about 30% of global production, followed by the EU, the US, and the rest of Asia." },
  { q: "How much plastic is in the ocean?", a: "About 11 million tonnes leak into the ocean every year. Estimates suggest 75-199 million tonnes are currently in the ocean, most as microplastics." },
  { q: "Where does the data come from?", a: "OECD Global Plastics Outlook 2024." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "How Much Plastic Is Produced Every Day? 1.1 Million Tonnes", datePublished: '2026-10-06', dateModified: '2026-10-06', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/how-much-plastic-produced-daily' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Plastic Production", item: 'https://timegovern.com/blog/how-much-plastic-produced-daily' }] }

export default function HowMuchPlasticProducedPage() {
  useEffect(() => {
    document.title = 'How Much Plastic Is Produced Every Day? 1.1 Million Tonnes | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "The world produces 1.1 million tonnes of plastic every day. Here is where it comes from, where it goes, and what is being done.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Plastic Production</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-indigo-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">World Data</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">How Much Plastic Is Produced Every Day? 1.1 Million Tonnes</h1>
        <p className="text-lg text-muted-foreground mb-4">The world produces 1.1 million tonnes of plastic every day. Here is where it comes from, where it goes, and what is being done.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 6 October 2026</span><span>&middot;</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="Plastic Production" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The daily number</h2>
          <p>About 1.1 million tonnes of plastic are produced every day worldwide - roughly 13 tonnes per second, or 410 million tonnes per year. That is more than the combined weight of every human on Earth.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Where plastic comes from</h2>
          <p>About 90% of plastic is made from fossil fuels - oil, gas, and coal. Production has grown from 2 million tonnes per year in 1950 to over 400 million today, a growth rate that outpaces almost every other material in human history.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Where it goes</h2>
          <p>Only 9% of all plastic ever produced has been recycled. About 12% has been incinerated, and the remaining 79% has accumulated in landfills or the natural environment. Roughly 11 million tonnes leak into the ocean every year.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">What is being done</h2>
          <p>In 2022, 175 countries agreed to negotiate a Global Plastics Treaty - the first legally binding international agreement on plastic pollution. Negotiations continue, with debates over production caps, chemical recycling, and extended producer responsibility. Meanwhile, over 60 countries have banned single-use plastic bags.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related live counters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/plastic-produced-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Plastic Produced Clock</div><div className="text-xs text-muted-foreground">Live plastic counter</div></Link>
          <Link to="/co2-emissions-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">CO2 Emissions Clock</div><div className="text-xs text-muted-foreground">Live emissions counter</div></Link>
          <Link to="/water-used-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Water Used Clock</div><div className="text-xs text-muted-foreground">Freshwater used today</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/plastic-produced-clock" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">See the live counter <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
