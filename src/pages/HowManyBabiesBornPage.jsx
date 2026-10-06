import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How many babies are born each day?", a: "About 367,000 per day worldwide, which is roughly 4.25 per second." },
  { q: "Which country has the most births?", a: "India, with about 23 million births per year, followed by China at 10 million, Nigeria at 5 million, and Pakistan at 5 million." },
  { q: "What time of day do most babies arrive?", a: "Between 1 AM and 6 AM in most countries. Roughly 60% of unassisted births happen during the night hours." },
  { q: "Are birth rates falling?", a: "Yes. Global births peaked at 141 million per year in 1990 and are projected to fall below 100 million by 2100." },
  { q: "Where does the data come from?", a: "UN World Population Prospects 2024." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "How Many Babies Are Born Each Day? The Full Breakdown", datePublished: '2026-10-06', dateModified: '2026-10-06', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/how-many-babies-born-per-day' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Babies Born Per Day", item: 'https://timegovern.com/blog/how-many-babies-born-per-day' }] }

export default function HowManyBabiesBornPage() {
  useEffect(() => {
    document.title = 'How Many Babies Are Born Each Day? The Full Breakdown | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "About 367,000 babies are born every day worldwide. Here is how that number is calculated and how it has changed over time.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Babies Born Per Day</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-indigo-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">World Data</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">How Many Babies Are Born Each Day? The Full Breakdown</h1>
        <p className="text-lg text-muted-foreground mb-4">About 367,000 babies are born every day worldwide. Here is how that number is calculated and how it has changed over time.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 6 October 2026</span><span>&middot;</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="Babies Born Per Day" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The daily number</h2>
          <p>About 367,000 babies are born every day worldwide, which is roughly 4.25 per second. The UN estimates 134 million births per year for 2024, down from a peak of 141 million in 1990.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">How the number is calculated</h2>
          <p>National birth registries, hospital records, and survey-based estimates are combined by the UN into a single global figure. Most high-income countries have complete birth registration. In low-income countries, surveys such as the Demographic and Health Surveys fill the gaps.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Where the babies are born</h2>
          <p>India alone accounts for about 23 million births per year. China adds 10 million, Nigeria 5 million, Pakistan 5 million, and Indonesia 4.5 million. Together these five countries account for a third of all global births.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Why births are not evenly spread through the day</h2>
          <p>Births peak between 1 AM and 6 AM in most countries - when most spontaneous labour begins. About 60% of unassisted births happen at night. The counter shows the average across a full 24-hour cycle, so it appears to tick at a constant rate.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related live counters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/births-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Births Clock</div><div className="text-xs text-muted-foreground">Live births counter</div></Link>
          <Link to="/world-population-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">World Population Clock</div><div className="text-xs text-muted-foreground">Live global population</div></Link>
          <Link to="/deaths-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Deaths Clock</div><div className="text-xs text-muted-foreground">Deaths today</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/births-clock" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">See the live counter <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
