import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How accurate is a BAC calculator?", a: "The Widmark formula has a standard error of ±0.02%. Individual variation is large - food, hydration, liver health, and genetics all shift the result. Never use it to decide if you can drive." },
  { q: "What is the legal limit?", a: "0.08% in the US, England, Wales, and most of Canada. 0.05% in Scotland, Germany, France, and much of Europe. 0.02% in Sweden, Norway, and Japan." },
  { q: "How fast does BAC drop?", a: "About 0.015% per hour for the average adult. Nothing speeds this up - coffee, cold showers, food, and sleep do not reduce BAC." },
  { q: "Does weight affect BAC?", a: "Yes. Heavier people reach lower BAC for the same drinks because they have more blood volume. Women generally reach higher BAC for the same drinks due to lower body water fraction." },
  { q: "What is one standard drink?", a: "In the US, one standard drink contains 14 grams of pure alcohol - roughly 12 oz beer at 5%, 5 oz wine at 12%, or 1.5 oz spirits at 40%." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: "BAC Guide: Blood Alcohol Content Explained", datePublished: '2026-10-04', dateModified: '2026-10-04', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/bac-guide' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: "BAC Guide", item: 'https://timegovern.com/blog/bac-guide' }] }

export default function BacGuidePage() {
  useEffect(() => {
    document.title = 'BAC Guide: Blood Alcohol Content Explained | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "What BAC is, the Widmark formula, legal limits by country, the sobering myths, and how to stay safe.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>BAC Guide</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-purple-500 mb-3"><BookOpen className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">Guide</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">BAC Guide: Blood Alcohol Content Explained</h1>
        <p className="text-lg text-muted-foreground mb-4">What BAC is, the Widmark formula, legal limits by country, the sobering myths, and how to stay safe.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 4 October 2026</span><span>&middot;</span><span>6 min read</span></div>
      </header>

      <ShareButtons title="BAC Guide" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">What BAC is</h2>
          <p>Blood Alcohol Content is the mass of alcohol per unit volume of blood, expressed as a percentage. 0.08% means 0.08 grams of pure alcohol per 100 mL of blood. It is measured by breath, blood, or urine test and rises and falls in a predictable curve.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The Widmark formula</h2>
          <p>The most widely used estimate is the Widmark formula: BAC = (A x 5.14 / (W x r)) - 0.015 x H, where A is grams of alcohol consumed, W is body weight in pounds, r is a sex-specific constant, and H is hours since the first drink.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>r = 0.68 for men</li>
            <li>r = 0.55 for women</li>
            <li>0.015 = average elimination rate per hour</li>
            <li>1 standard US drink = 14 g pure alcohol</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Legal limits around the world</h2>
          <p>The legal driving limit varies by country. Even within a country it can vary by region.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>0.08%: US, England, Wales, most Canadian provinces</li>
            <li>0.05%: Scotland, Germany, France, Italy, Spain, Australia</li>
            <li>0.02%: Sweden, Norway, Poland, Japan</li>
            <li>0.00%: Zero-tolerance countries (some EU states for novice drivers)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Sobering myths</h2>
          <p>Nothing speeds up alcohol elimination. The liver processes roughly 0.015% BAC per hour, and that rate cannot be increased.</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Coffee: does not lower BAC - it only masks drowsiness</li>
            <li>Cold shower: does not lower BAC</li>
            <li>Food: slows absorption if eaten before, does not reduce BAC after</li>
            <li>Sleep: helps you feel better, does not accelerate elimination</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Safety</h2>
          <p>Never use any calculator to decide whether it is safe to drive. If you have been drinking, do not drive. Arrange a taxi, ride-share, designated driver, or stay where you are. The estimate is a population average - individual BAC varies widely based on food, hydration, liver health, genetics, and medication.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/bac-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">BAC Calculator</div><div className="text-xs text-muted-foreground">Blood alcohol estimate</div></Link>
          <Link to="/bmi-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">BMI Calculator</div><div className="text-xs text-muted-foreground">Body Mass Index</div></Link>
          <Link to="/calorie-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Calorie Calculator</div><div className="text-xs text-muted-foreground">Daily calorie needs</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/bac-calculator" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Try the calculator <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}
