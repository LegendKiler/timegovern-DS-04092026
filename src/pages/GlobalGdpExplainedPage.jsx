import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "What is the current global GDP?", a: "About 110 trillion US dollars per year, growing at 2.5 to 3 per cent annually." },
  { q: "Which country has the largest economy?", a: "The US at about 29 trillion dollars, followed by China at 18 trillion, Germany at 4.7 trillion, and Japan at 4.1 trillion." },
  { q: "What is GDP per capita?", a: "Global GDP per capita is about 13,500 dollars. Luxembourg leads at around 130,000; Burundi trails at 240." },
  { q: "Is global GDP growing faster or slower than population?", a: "Much faster. Population grows at 0.9% per year; GDP grows at 2.5-3%. GDP per capita therefore rises about 1.7% per year." },
  { q: "Where does the data come from?", a: "World Bank World Development Indicators, indicator NY.GDP.MKTP.CD." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "Global GDP Explained: The $110 Trillion World Economy", datePublished: '2026-10-06', dateModified: '2026-10-06', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/global-gdp-explained' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Global GDP Explained", item: 'https://timegovern.com/blog/global-gdp-explained' }] }

export default function GlobalGdpExplainedPage() {
  useEffect(() => {
    document.title = 'Global GDP Explained: The $110 Trillion World Economy | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "The world economy produces $110 trillion per year. Here is what that means, who produces it, and how it grows.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Global GDP Explained</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-indigo-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">World Data</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Global GDP Explained: The $110 Trillion World Economy</h1>
        <p className="text-lg text-muted-foreground mb-4">The world economy produces $110 trillion per year. Here is what that means, who produces it, and how it grows.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 6 October 2026</span><span>&middot;</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="Global GDP Explained" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The headline number</h2>
          <p>Global GDP is about 110 trillion US dollars per year. That is roughly 3.49 million dollars per second. The figure comes from the World Bank World Development Indicators, which compiles national GDP data from every country.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">What GDP measures</h2>
          <p>Gross Domestic Product is the total market value of all finished goods and services produced within a country in a year. It counts household consumption, business investment, government spending, and net exports. It does not count unpaid work, black-market activity, or environmental damage.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The largest economies</h2>
          <p>The United States is the largest at about 29 trillion dollars, followed by China at 18 trillion, Germany at 4.7 trillion, and Japan at 4.1 trillion. On a purchasing power parity basis, China is closer to the US, but nominal GDP remains the standard comparison for financial flows.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">How fast it grows</h2>
          <p>Global GDP grew at about 3.5% per year from 1960 to 2000, slowed to 2.5% per year in the 2010s, and dropped sharply during the 2020 pandemic. The IMF projects long-run global growth of 2.7% per year through 2030.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related live counters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/gdp-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Global GDP Clock</div><div className="text-xs text-muted-foreground">Live GDP counter</div></Link>
          <Link to="/money-spent-online-today" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Money Spent Online</div><div className="text-xs text-muted-foreground">E-commerce today</div></Link>
          <Link to="/world-population-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">World Population Clock</div><div className="text-xs text-muted-foreground">Live global population</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/gdp-clock" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">See the live counter <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
