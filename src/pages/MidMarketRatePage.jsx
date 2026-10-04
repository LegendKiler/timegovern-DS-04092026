import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, AlertCircle, Lightbulb, Calculator, BookOpen } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the mid-market exchange rate?', a: 'The mid-market rate is the midpoint between the buy and sell price of two currencies on the global forex market. It is the fairest single reference rate, and the one used by Google, XE, and financial news sites.' },
  { q: 'Is the mid-market rate the same as the interbank rate?', a: 'Yes. Mid-market rate and interbank rate mean the same thing. Both refer to the midpoint between the bid and ask on the wholesale forex market.' },
  { q: 'Why can I not get the mid-market rate?', a: 'You can get very close. Wise and some other services give you the mid-market rate plus a small transparent fee. Banks and traditional brokers usually hide their markup inside the rate itself.' },
  { q: 'How is the mid-market rate calculated?', a: 'It is the average of the current bid (what buyers will pay) and ask (what sellers want) prices across the largest foreign exchange markets. It updates continuously during trading hours.' },
  { q: 'What is a spread in currency exchange?', a: 'The spread is the gap between the mid-market rate and the rate you actually receive. A 3% spread on a $1,000 transfer costs $30, even if no explicit fee is charged.' },
  { q: 'Where can I find the mid-market rate?', a: 'Google Finance, XE, Reuters, and Bloomberg all show it. TimeGovern shows it on the currency converter and every currency pair page.' },
  { q: 'Do exchange rates change on weekends?', a: 'The forex market closes Friday evening and reopens Sunday evening (UK time). Any conversion during that window uses the Friday close plus an additional margin banks add to cover Monday gaps.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

const ARTICLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Mid-Market Exchange Rates Explained',
  datePublished: '2026-10-04',
  dateModified: '2026-10-04',
  author: { '@type': 'Organization', name: 'TimeGovern' },
  publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } },
  image: 'https://timegovern.com/icon-512.png',
  mainEntityOfPage: 'https://timegovern.com/blog/mid-market-exchange-rate',
}

const DEFINED_TERM_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Mid-Market Exchange Rate',
  description: 'The midpoint between the bid and ask price of two currencies on the wholesale foreign exchange market.',
  inDefinedTermSet: 'https://timegovern.com/blog/mid-market-exchange-rate',
}

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' },
    { '@type': 'ListItem', position: 3, name: 'Mid-Market Exchange Rates Explained', item: 'https://timegovern.com/blog/mid-market-exchange-rate' },
  ],
}

const PAIR_LINKS = [
  { slug: 'usd-to-eur', label: 'USD to EUR' },
  { slug: 'usd-to-gbp', label: 'USD to GBP' },
  { slug: 'eur-to-gbp', label: 'EUR to GBP' },
  { slug: 'usd-to-inr', label: 'USD to INR' },
]

const RELATED = [
  { to: '/blog/how-to-convert-currency', title: 'How to Convert Currency: The Complete Guide', desc: 'Three methods and 7 tips for getting the best rate.' },
  { to: '/blog/best-currency-converter-tools', title: 'Best Currency Converter Tools Compared', desc: 'Wise vs XE vs Google vs Revolut vs OFX.' },
  { to: '/currency-converter', title: 'Free Currency Converter', desc: '166 currencies, live mid-market rates.' },
]

export default function MidMarketRatePage() {
  useEffect(() => {
    document.title = 'Mid-Market Exchange Rates Explained (2026) | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'What the mid-market rate is, how it differs from buy/sell rates, why banks add a spread, and how to find the fair rate for any currency pair.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(DEFINED_TERM_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-1">/</span>
        <Link to="/blog" className="hover:underline">Blog</Link>
        <span className="mx-1">/</span>
        <span>Mid-Market Exchange Rates</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-emerald-500 mb-3">
          <BookOpen className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Explainer</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Mid-Market Exchange Rates Explained</h1>
        <p className="text-lg text-muted-foreground mb-4">
          The single most important number in currency exchange — what it is, why it matters, and how to find it.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Updated 4 October 2026</span>
          <span>·</span>
          <span>6 min read</span>
        </div>
      </header>

      <ShareButtons title="Mid-Market Exchange Rates Explained" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <p>
            Every currency conversion happens at two rates: the <strong>mid-market rate</strong> that you see on financial news sites, and the <strong>actual rate</strong> the bank or exchange service gives you. The difference between the two is where almost all the money disappears.
          </p>
          <p>
            Understanding the mid-market rate lets you calculate, in seconds, exactly how much a currency service is charging you — even when the service claims "zero commission."
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">What the mid-market rate is</h2>
          <p>
            The mid-market rate (also called the <strong>interbank rate</strong>) is the midpoint between the buy and sell price of two currencies on the global forex market. If banks are buying USD at 0.9100 EUR and selling at 0.9110 EUR, the mid-market rate is 0.9105 EUR.
          </p>
          <p>
            It updates continuously during trading hours (Sunday evening to Friday evening, UK time) as buyers and sellers adjust their orders. It is the fairest single reference rate — nobody actually gets it exactly, including central banks, but it is the honest benchmark.
          </p>
          <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/20 my-4">
            <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong>Quick rule:</strong> if a service quotes you a rate that is more than 1% off the mid-market rate, you are paying that gap as a hidden fee.
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Mid-market vs buy and sell rates</h2>
          <p>
            Banks and exchange services publish two rates for every currency pair:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground my-3">
            <li><strong>Buy rate (bid):</strong> the rate at which they will buy the foreign currency from you. Always worse for you.</li>
            <li><strong>Sell rate (ask):</strong> the rate at which they will sell the foreign currency to you. Also always worse for you.</li>
            <li><strong>Mid-market:</strong> the midpoint between bid and ask — the fair number nobody offers directly.</li>
          </ul>
          <p>
            The wider the gap between bid and ask, the more the service makes on every transaction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The spread — where the money actually goes</h2>
          <p>
            The <strong>spread</strong> is the difference between the mid-market rate and the rate you actually receive. It is expressed as a percentage of the amount converted.
          </p>
          <div className="overflow-x-auto border border-border rounded-lg my-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 border-b">
                <tr>
                  <th className="text-left p-3 font-semibold">Service</th>
                  <th className="text-left p-3 font-semibold">Typical spread</th>
                  <th className="text-left p-3 font-semibold">Cost on 1,000 USD</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-3 font-semibold">Wise</td><td className="p-3 tabular-nums">0.35-0.7%</td><td className="p-3 tabular-nums">$3.50 - $7.00</td></tr>
                <tr className="border-b"><td className="p-3 font-semibold">OFX</td><td className="p-3 tabular-nums">0.1-0.5%</td><td className="p-3 tabular-nums">$1.00 - $5.00</td></tr>
                <tr className="border-b"><td className="p-3 font-semibold">Bank transfer</td><td className="p-3 tabular-nums">2-4%</td><td className="p-3 tabular-nums">$20 - $40</td></tr>
                <tr className="border-b"><td className="p-3 font-semibold">Credit card abroad</td><td className="p-3 tabular-nums">0-3%</td><td className="p-3 tabular-nums">$0 - $30</td></tr>
                <tr className="border-b"><td className="p-3 font-semibold">Currency exchange counter</td><td className="p-3 tabular-nums">2-5%</td><td className="p-3 tabular-nums">$20 - $50</td></tr>
                <tr><td className="p-3 font-semibold">Airport kiosk</td><td className="p-3 tabular-nums">7-15%</td><td className="p-3 tabular-nums">$70 - $150</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Worked example</h2>
          <p>
            Suppose you want to convert 1,000 USD to EUR. The mid-market rate is 1 USD = 0.92 EUR.
          </p>
          <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/20 my-4">
            <Calculator className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm font-mono space-y-1">
              <div>Mid-market result: 1,000 × 0.92 = 920 EUR</div>
              <div>Bank quotes 0.89: 1,000 × 0.89 = 890 EUR</div>
              <div>Hidden cost: 920 - 890 = <strong>30 EUR (3.2%)</strong></div>
            </div>
          </div>
          <p>
            Even if the bank says "no commission," that 30 EUR is gone. The spread is the fee.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">How to find the mid-market rate</h2>
          <p>
            The most reliable public sources for the mid-market rate are:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground my-3">
            <li>Google Finance — search "1 USD to EUR" and the number Google shows is the mid-market rate</li>
            <li>XE.com — the long-standing benchmark, updated continuously</li>
            <li>Reuters and Bloomberg — the institutional-grade sources</li>
            <li><Link to="/currency-converter" className="text-emerald-600 font-semibold hover:underline">TimeGovern currency converter</Link> — free, no signup, 166 currencies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Why it matters for real transfers</h2>
          <p>
            On a $100 holiday exchange, a 3% spread costs $3 — annoying but not life-changing. On a $50,000 property deposit, it is $1,500. On a monthly $5,000 remittance, it is $150 every month, or $1,800 a year.
          </p>
          <div className="flex items-start gap-3 p-4 border border-amber-500/30 rounded-lg bg-amber-500/5 my-4">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong>Red flag:</strong> Any service advertising &quot;0% commission&quot; or &quot;no fees&quot; is making its money through the spread. Compare the final amount you receive, not the advertised fee.
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Popular pairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
            {PAIR_LINKS.map((p) => (
              <Link key={p.slug} to={'/currency/' + p.slug} className="border border-border rounded-lg p-3 text-sm font-semibold hover:bg-muted/20 transition text-center">
                {p.label}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">
            {FAQ.map((f) => (
              <details key={f.q} className="border border-border rounded-lg p-4">
                <summary className="font-semibold cursor-pointer text-sm">{f.q}</summary>
                <p className="text-muted-foreground mt-2 text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {RELATED.map((r) => (
            <Link key={r.to} to={r.to} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition">
              <div className="font-semibold text-sm mb-1">{r.title}</div>
              <div className="text-xs text-muted-foreground">{r.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 text-center">
        <Link to="/currency-converter" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">
          Check the mid-market rate now <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}