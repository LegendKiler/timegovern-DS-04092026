import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "What is the world population right now?", a: "Approximately 8.18 billion as of 2026. The exact figure updates on the live counter linked below." },
  { q: "Will world population ever stop growing?", a: "Yes - UN projections suggest peak population around 10.3 billion in the 2080s, followed by slow decline as fertility rates fall below replacement level in most of the world." },
  { q: "Is the counter accurate?", a: "Accurate to the rate, not to any individual birth or death. It shows a smoothed average based on annual totals, which is the same approach used by every other world population clock." },
  { q: "Where does the data come from?", a: "UN World Population Prospects 2024, published by the UN Department of Economic and Social Affairs." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "World Population Explained: How We Count 8 Billion People", datePublished: '2026-10-06', dateModified: '2026-10-06', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/world-population-explained' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "World Population Explained", item: 'https://timegovern.com/blog/world-population-explained' }] }

export default function WorldPopulationExplainedPage() {
  useEffect(() => {
    document.title = 'World Population Explained: How We Count 8 Billion People | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "How the UN estimates world population, why the counter ticks at 2.2 people per second, and when we will hit 9 billion.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>World Population Explained</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-indigo-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">World Data</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">World Population Explained: How We Count 8 Billion People</h1>
        <p className="text-lg text-muted-foreground mb-4">How the UN estimates world population, why the counter ticks at 2.2 people per second, and when we will hit 9 billion.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 6 October 2026</span><span>&middot;</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="World Population Explained" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">How world population is estimated</h2>
          <p>Nobody counts every person on Earth. Population figures are estimates built from national censuses (every 5-10 years per country), vital registration systems (births and deaths), and mathematical models that fill the gaps. The UN publishes a full revision every two years. The current estimate for 2026 is 8.18 billion.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Why the counter ticks at 2.2 per second</h2>
          <p>The UN estimates about 134 million births and 62 million deaths per year. The net difference - 72 million - divided by the number of seconds in a year gives roughly 2.28 people per second. This is what the counter shows. It is a smoothed average, not a live measurement.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">When we will hit 9 billion</h2>
          <p>Under the UN medium-fertility projection, the world reaches 9 billion around 2037. Growth is slowing fast: annual additions peaked at 92 million in the late 1980s and are projected to fall below 40 million by 2050. Peak population is projected around 10.3 billion in the 2080s.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Where the growth is happening</h2>
          <p>More than half of the increase to 2050 will come from just nine countries: India, Nigeria, Pakistan, the Democratic Republic of the Congo, Ethiopia, Tanzania, Indonesia, Egypt, and the United States. Sub-Saharan Africa accounts for the largest share.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related live counters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/world-population-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">World Population Clock</div><div className="text-xs text-muted-foreground">Live global population</div></Link>
          <Link to="/population" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Population by Country</div><div className="text-xs text-muted-foreground">182 countries ranked</div></Link>
          <Link to="/births-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Births Clock</div><div className="text-xs text-muted-foreground">Babies born today</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/world-population-clock" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">See the live counter <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
