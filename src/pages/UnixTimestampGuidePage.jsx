import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, AlertCircle, Lightbulb } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a Unix timestamp?', a: 'The number of seconds that have elapsed since 1 January 1970 at 00:00:00 UTC, not counting leap seconds. It is how most computers internally represent a moment in time.' },
  { q: 'Why 1970?', a: 'Unix was developed at Bell Labs in 1969-70. The team needed an arbitrary reference point and picked the start of 1970 because it was the most recent round-year boundary. It stuck as an industry standard.' },
  { q: 'Is a Unix timestamp always in seconds?', a: 'Usually yes. JavaScript and many APIs use milliseconds since epoch instead. Divide by 1,000 to convert ms to standard Unix time.' },
  { q: 'What is the Year 2038 problem?', a: 'Systems that store Unix time as a signed 32-bit integer overflow on 19 January 2038 at 03:14:07 UTC. Modern 64-bit systems are unaffected.' },
  { q: 'Does Unix time use time zones?', a: 'No. A Unix timestamp represents a single moment — the same instant everywhere on Earth. Converting that moment to a readable date is where time zones enter.' },
  { q: 'What is negative Unix time?', a: 'Timestamps before 1 January 1970 are negative. For example, 1 July 1965 is around -142,000,000. Most systems handle this but some legacy systems do not.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'What Is a Unix Timestamp? (And Why 1970?)', datePublished: '2026-10-04', dateModified: '2026-10-04', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/unix-timestamp-guide' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: 'Unix Timestamp Guide', item: 'https://timegovern.com/blog/unix-timestamp-guide' }] }

export default function UnixTimestampGuidePage() {
  useEffect(() => {
    document.title = 'What Is a Unix Timestamp? (And Why 1970?) | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'What a Unix timestamp is, why it starts at 1970, the difference between seconds and milliseconds, and the Year 2038 problem.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>Unix Timestamp Guide</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-slate-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">Explainer</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">What Is a Unix Timestamp? (And Why 1970?)</h1>
        <p className="text-lg text-muted-foreground mb-4">The number your computer uses for every moment — and the countdown that will break in 2038.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 4 October 2026</span><span>·</span><span>6 min read</span></div>
      </header>

      <ShareButtons title="What Is a Unix Timestamp?" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <p>Open your browser console and type <code>Date.now()</code>. You will get a number like <code>1791187200000</code> — a Unix timestamp in milliseconds. Every log line, database record, and API response carries one of these. But what does it actually mean?</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Definition</h2>
          <p>A Unix timestamp (also called epoch time, POSIX time, or Unix time) is the number of <strong>seconds that have elapsed since 1 January 1970 at 00:00:00 UTC</strong>, not counting leap seconds.</p>
          <p>It is one number, no time zone attached, no calendar format. Two people in Tokyo and New York looking at the same Unix timestamp see the same instant, even though their local clocks read different times.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Why 1970?</h2>
          <p>Unix was developed at Bell Labs in 1969-1970. The team needed an arbitrary reference point for its internal clock. They picked the start of 1970 because it was the most recent round-year boundary — close enough to be useful, far enough back to represent any practical date.</p>
          <p>When Unix spread and became the foundation of Linux, macOS, and most servers, the 1970 epoch spread with it. Today, nearly every programming language uses it — JavaScript, Python, Go, Rust, Ruby, and Java all default to the same reference point.</p>
          <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/20 my-4">
            <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm"><strong>Quick fact:</strong> 1 January 1970 is known as &quot;the Unix epoch&quot; — but no Unix system actually ran on that date. It is purely a reference point.</div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Seconds vs milliseconds</h2>
          <p>This is the most common source of bugs:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li><strong>Unix timestamp (standard):</strong> seconds — e.g. <code>1791187200</code></li>
            <li><strong>JavaScript / many APIs:</strong> milliseconds — e.g. <code>1791187200000</code></li>
            <li><strong>Some modern systems:</strong> microseconds or nanoseconds for high-precision timing</li>
          </ul>
          <p>Rule of thumb: if the number has 10 digits, it is seconds. If it has 13 digits, it is milliseconds. Divide by 1,000 to convert ms to s, and multiply to go back.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The Year 2038 problem</h2>
          <p>If Unix time is stored as a signed 32-bit integer, the largest value it can hold is 2,147,483,647. That number corresponds to <strong>19 January 2038 at 03:14:07 UTC</strong> — after which it overflows to a negative number, breaking systems that assume time only moves forward.</p>
          <div className="flex items-start gap-3 p-4 border border-amber-500/30 rounded-lg bg-amber-500/5 my-4">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm"><strong>Status:</strong> Most modern systems use 64-bit integers, which push the overflow date to the year 292 billion. Legacy embedded systems and old software remain at risk. This is the same class of issue as Y2K.</div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Negative Unix time</h2>
          <p>Dates before 1 January 1970 are represented as negative timestamps. For example:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>15 August 1945 → −768,700,800</li>
            <li>1 January 1900 → −2,208,988,800</li>
            <li>20 July 1969 (Moon landing) → −14,179,200</li>
          </ul>
          <p>Modern systems handle negative Unix time, but some legacy APIs and databases reject it. Historical dates are better stored as explicit ISO 8601 strings.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Where Unix timestamps appear</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li><strong>Log files</strong> — every server log line starts with a timestamp</li>
            <li><strong>Database records</strong> — created_at, updated_at columns</li>
            <li><strong>API responses</strong> — JSON timestamps from Stripe, GitHub, AWS</li>
            <li><strong>JWT tokens</strong> — exp (expiry) and iat (issued at) claims</li>
            <li><strong>Cron jobs</strong> — schedule calculations</li>
            <li><strong>Git commits</strong> — author and committer timestamps</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/unix-timestamp-converter" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Unix Timestamp Converter</div><div className="text-xs text-muted-foreground">Timestamp &harr; date</div></Link>
          <Link to="/blog/how-utc-time-works" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">How UTC Time Works</div><div className="text-xs text-muted-foreground">The global standard explained</div></Link>
          <Link to="/time-zone-converter" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Time Zone Converter</div><div className="text-xs text-muted-foreground">DST-aware conversion</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/unix-timestamp-converter" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Open the converter <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}