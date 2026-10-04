import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "What is a good running pace?", a: "Depends on distance. For a 5K, anything under 6:00/km is solid for a recreational runner. For a marathon, anything under 6:00/km is well above average." },
  { q: "How do I convert pace to speed?", a: "Speed (km/h) = 60 / pace (min/km). For example, 5:00/km = 12 km/h." },
  { q: "Does pace change with distance?", a: "Yes. The longer the race, the slower the sustainable pace. Most runners slow 5-10% per doubling of distance, because of glycogen depletion and rising fatigue." },
  { q: "How do I run a negative split?", a: "Start 3-5% slower than your target pace for the first half, then run the second half at or slightly below target. It feels conservative for the first 10 km but pays off in the last third." },
  { q: "Can I use this calculator for cycling?", a: "Yes - pace and speed apply to any distance-based endurance sport. For cycling, note that speed is often more useful than pace because cycling speeds are much higher." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "Pace Guide: How to Calculate Running Pace, Time, and Distance", datePublished: '2026-10-04', dateModified: '2026-10-04', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/pace-guide' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "Pace Guide", item: 'https://timegovern.com/blog/pace-guide' }] }

export default function PaceGuidePage() {
  useEffect(() => {
    document.title = 'Pace Guide: How to Calculate Running Pace, Time, and Distance | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "The pace formula, how to convert pace to speed, typical race paces, negative splits, and how pace changes with distance.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Pace Guide</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-sky-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">Guide</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Pace Guide: How to Calculate Running Pace, Time, and Distance</h1>
        <p className="text-lg text-muted-foreground mb-4">The pace formula, how to convert pace to speed, typical race paces, negative splits, and how pace changes with distance.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 4 October 2026</span><span>&middot;</span><span>5 min read</span></div>
      </header>

      <ShareButtons title="Pace Guide" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Pace in one sentence</h2>
          <p>Pace is the time it takes to cover one unit of distance - usually minutes per kilometer or minutes per mile. It is the inverse of speed: a 5:00/km pace equals 12 km/h.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The three formulas</h2>
          <p>Every pace problem reduces to one of these three.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Pace = Time / Distance</li>
            <li>Time = Pace x Distance</li>
            <li>Distance = Time / Pace</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Converting pace to speed</h2>
          <p>Speed in km/h = 60 / pace (min/km). Speed in mph = 60 / pace (min/mi).</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>5:00/km = 60/5 = 12.0 km/h = 7.46 mph</li>
            <li>6:00/km = 10.0 km/h = 6.21 mph</li>
            <li>4:00/km = 15.0 km/h = 9.32 mph</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Typical race paces</h2>
          <p>What counts as a good pace depends entirely on distance. Reference points for recreational runners:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>5K: 4:30-6:30/km for intermediate runners</li>
            <li>10K: 4:45-6:45/km for intermediate runners</li>
            <li>Half marathon: 5:00-7:00/km</li>
            <li>Marathon: 5:15-7:15/km for recreational finishers</li>
            <li>Sub-3 marathon: 4:16/km - advanced amateur benchmark</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Negative splits</h2>
          <p>A negative split means running the second half faster than the first. It is the signature of elite racing. Run the first half 3-5% slower than target pace, then bring it down. Most personal records come from negative-split races.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/pace-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Pace Calculator</div><div className="text-xs text-muted-foreground">Pace, time, distance</div></Link>
          <Link to="/macro-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Macro Calculator</div><div className="text-xs text-muted-foreground">Protein, fat, carbs</div></Link>
          <Link to="/tdee-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">TDEE Calculator</div><div className="text-xs text-muted-foreground">Total daily energy</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/pace-calculator" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Try the calculator <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
