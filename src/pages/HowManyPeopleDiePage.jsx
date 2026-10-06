import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How many people die each day?", a: "About 170,000 per day worldwide, which is roughly 1.97 per second." },
  { q: "What is the leading cause of death globally?", a: "Ischaemic heart disease, accounting for about 9 million deaths per year, followed by stroke at 6.5 million." },
  { q: "Are death rates rising?", a: "The crude death rate is falling, from 20 per 1,000 in 1950 to 7.6 today. The absolute number of deaths rises only because the population is larger and older." },
  { q: "What is the global life expectancy?", a: "About 73 years on average. Japan, Switzerland, and Singapore lead at over 83; the Central African Republic, Chad, and Lesotho trail at under 60." },
  { q: "Where does the data come from?", a: "UN World Population Prospects 2024, plus WHO Global Health Estimates for cause-of-death breakdowns." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "How Many People Die Each Day? Global Death Statistics Explained", datePublished: '2026-10-06', dateModified: '2026-10-06', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/how-many-people-die-per-day' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Deaths Per Day", item: 'https://timegovern.com/blog/how-many-people-die-per-day' }] }

export default function HowManyPeopleDiePage() {
  useEffect(() => {
    document.title = 'How Many People Die Each Day? Global Death Statistics Explained | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "About 170,000 people die every day worldwide. Here is what causes most deaths and how the rate has changed over time.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Deaths Per Day</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-indigo-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">World Data</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">How Many People Die Each Day? Global Death Statistics Explained</h1>
        <p className="text-lg text-muted-foreground mb-4">About 170,000 people die every day worldwide. Here is what causes most deaths and how the rate has changed over time.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 6 October 2026</span><span>&middot;</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="Deaths Per Day" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The daily number</h2>
          <p>About 170,000 people die every day worldwide, which is roughly 1.97 per second. The UN estimates 62 million deaths per year for 2024.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">What causes most deaths</h2>
          <p>Ischaemic heart disease and stroke together account for about 27% of all deaths. Lower respiratory infections, COPD, and lung cancer follow. In low-income countries, infectious diseases and neonatal conditions still dominate. In high-income countries, chronic non-communicable diseases do.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Why deaths are rising</h2>
          <p>Absolute deaths are rising because the world population is larger and older than ever. The global average life expectancy is around 73 years, but the population aged 65+ is growing faster than any other group. More old people means more deaths, even as age-specific mortality improves.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The rate is actually falling</h2>
          <p>The crude death rate - deaths per 1,000 people per year - has fallen from 20 in 1950 to about 7.6 today. Improved sanitation, vaccines, antibiotics, and safer childbirth are the main drivers. The absolute number of deaths rises only because the population base is much larger.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related live counters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/deaths-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Deaths Clock</div><div className="text-xs text-muted-foreground">Live deaths counter</div></Link>
          <Link to="/births-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Births Clock</div><div className="text-xs text-muted-foreground">Babies born today</div></Link>
          <Link to="/world-population-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">World Population Clock</div><div className="text-xs text-muted-foreground">Live global population</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/deaths-clock" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">See the live counter <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
