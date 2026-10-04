import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Calculator, TrendingUp, AlertCircle, Lightbulb, CheckCircle2, XCircle } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "What is the best way to convert currency?", a: "For amounts under $500, an online multi-currency account usually beats banks by 2-4%. For larger amounts, a specialist FX broker gets closer to the mid-market rate. Never use airport kiosks, which can charge 10% or more." },
  { q: "What is the mid-market rate?", a: "The mid-market rate is the midpoint between the buy and sell prices of two currencies on the global market. It is the fairest benchmark, and banks add a margin on top." },
  { q: "How do I calculate a currency conversion manually?", a: "Multiply the amount by the exchange rate. For example, if 1 USD = 0.92 EUR, then 100 USD = 92 EUR. To go the other way, divide the EUR amount by the rate to get back to USD." },
  { q: "Why do banks charge different exchange rates?", a: "Banks bundle the exchange rate with service fees, marketing, and branch costs. Their rate includes a hidden margin of 2-5% on top of the mid-market rate." },
  { q: "Is it cheaper to exchange currency before I travel or when I arrive?", a: "Before. Ordering cash online in your home country usually gets 2-3% better rates than airport kiosks or hotel desks. An ATM at your destination with a no-FX-fee card is often even cheaper." },
  { q: "Do exchange rates change on weekends?", a: "Yes, and that is a hidden cost. Foreign exchange markets are closed on weekends, so any conversion done Saturday or Sunday uses Friday close plus an extra margin that banks add to protect against Monday gaps." },
  { q: "What is dynamic currency conversion?", a: "When a merchant or ATM offers to charge you in your home currency instead of theirs, that is dynamic currency conversion (DCC). It looks convenient but hides a 3-7% markup. Always choose to be charged in the local currency." },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

const ARTICLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Convert Currency: The Complete Guide',
  datePublished: '2026-10-04',
  dateModified: '2026-10-04',
  author: { '@type': 'Organization', name: 'TimeGovern' },
  publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } },
  image: 'https://timegovern.com/icon-512.png',
  mainEntityOfPage: 'https://timegovern.com/blog/how-to-convert-currency',
}

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' },
    { '@type': 'ListItem', position: 3, name: 'How to Convert Currency', item: 'https://timegovern.com/blog/how-to-convert-currency' },
  ],
}

const METHODS = [
  { name: 'Online multi-currency account', fee: '0.3-0.7%', speed: 'Instant to 1 day', best: 'Everyday amounts up to a few thousand' },
  { name: 'Online FX broker', fee: '0.1-0.5%', speed: '1-2 days', best: 'Large transfers over $10,000' },
  { name: 'Bank transfer', fee: '2-4%', speed: '1-3 days', best: 'Convenience, you already use them' },
  { name: 'Debit or credit card abroad', fee: '0-3%', speed: 'Instant', best: 'Cards with no foreign transaction fee' },
  { name: 'ATM abroad', fee: '1-3%', speed: 'Instant', best: 'Cash needs on the ground' },
  { name: 'Currency exchange counter', fee: '2-5%', speed: 'Instant', best: 'Small amounts in major cities' },
  { name: 'Airport kiosk', fee: '7-15%', speed: 'Instant', best: 'Emergencies only' },
]

const PAIR_LINKS = [
  { slug: 'usd-to-eur', label: 'USD to EUR' },
  { slug: 'usd-to-gbp', label: 'USD to GBP' },
  { slug: 'usd-to-inr', label: 'USD to INR' },
  { slug: 'gbp-to-inr', label: 'GBP to INR' },
  { slug: 'eur-to-gbp', label: 'EUR to GBP' },
  { slug: 'usd-to-pkr', label: 'USD to PKR' },
  { slug: 'aud-to-usd', label: 'AUD to USD' },
  { slug: 'usd-to-jpy', label: 'USD to JPY' },
]

const RELATED = [
  { to: '/blog/public-holidays-2026-comparison', title: 'Public Holidays 2026: UK vs US vs Australia vs Germany', desc: 'Plan travel around the cheapest dates.' },
  { to: '/blog/best-time-to-take-leave-2026', title: 'Best Time to Take Leave in 2026', desc: 'Maximise days off to travel further.' },
  { to: '/blog/sync-team-time-off-time-zones', title: 'Sync Your Team Time Off Across Time Zones', desc: 'For remote teams planning international trips.' },
]

export default function HowToConvertCurrencyPage() {
  useEffect(() => {
    document.title = 'How to Convert Currency: The Complete Guide (2026) | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'The complete guide to currency conversion: three methods, fee comparison table, mid-market rates explained, 7 tips for the best exchange rate, and common mistakes to avoid.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-1">/</span>
        <Link to="/blog" className="hover:underline">Blog</Link>
        <span className="mx-1">/</span>
        <span>How to Convert Currency</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-emerald-500 mb-3">
          <BookOpen className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Guide</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">How to Convert Currency: The Complete Guide</h1>
        <p className="text-lg text-muted-foreground mb-4">
          The three ways to convert currency, the real cost of each, and how to get within 0.5% of the mid-market rate every time.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Updated 4 October 2026</span>
          <span>·</span>
          <span>9 min read</span>
        </div>
      </header>

      <ShareButtons title="How to Convert Currency: The Complete Guide" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">

        <section>
          <p>
            Converting currency looks simple: multiply by the exchange rate. But the gap between the best and worst way to do it is often 5 to 10 percent. On a 5,000 USD transfer, that is up to 500 USD lost to fees and hidden margins.
          </p>
          <p>
            This guide covers the three practical ways to convert currency, a fee comparison table you can reference before any transfer, and the seven habits that separate people who pay almost nothing from those who lose hundreds each year.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Method 1: Use an online converter</h2>
          <p>
            For quick calculations, an online converter gives you the current mid-market rate in seconds. This is the fastest way to know what an amount is actually worth, before any bank or exchange desk adds its cut.
          </p>
          <p>
            Try our free <Link to="/currency-converter" className="text-emerald-600 font-semibold hover:underline">currency converter</Link> — it supports 166 currencies with live rates updated daily.
          </p>
          <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/20 my-4">
            <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong>Tip:</strong> Always check the mid-market rate first. Whatever number a bank or exchange service quotes you, the difference from the mid-market rate is the real fee — even if they claim &quot;zero commission.&quot;
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Method 2: Compare the real cost of each service</h2>
          <p>
            Every currency conversion method has a hidden cost, called the <strong>spread</strong>. It is the gap between the mid-market rate and the rate you actually get. Here is how the major options compare in 2026.
          </p>
          <div className="overflow-x-auto border border-border rounded-lg my-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 border-b">
                <tr>
                  <th className="text-left p-3 font-semibold">Method</th>
                  <th className="text-left p-3 font-semibold">Typical fee</th>
                  <th className="text-left p-3 font-semibold">Speed</th>
                  <th className="text-left p-3 font-semibold">Best for</th>
                </tr>
              </thead>
              <tbody>
                {METHODS.map((m) => (
                  <tr key={m.name} className="border-b last:border-0">
                    <td className="p-3 font-semibold">{m.name}</td>
                    <td className="p-3 tabular-nums">{m.fee}</td>
                    <td className="p-3 text-muted-foreground">{m.speed}</td>
                    <td className="p-3 text-muted-foreground">{m.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The table makes one thing obvious: the cheapest way to convert currency is almost never the airport kiosk or the bank branch. Online services win because they have no branches, no cash handling, and no legacy IT to support.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Method 3: Calculate it manually</h2>
          <p>
            Manual conversion is simple once you know the rate. Use this formula:
          </p>
          <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-muted/20 my-4">
            <Calculator className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            <div className="text-sm font-mono">
              Result = Amount × Rate
            </div>
          </div>
          <p>
            <strong>Example:</strong> You want to convert 250 USD to EUR. If the mid-market rate is 1 USD = 0.92 EUR, then:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>250 × 0.92 = 230 EUR (at the mid-market rate)</li>
            <li>If a bank quotes 1 USD = 0.88 EUR, you get 220 EUR — a 10 EUR loss, equal to 4%.</li>
          </ul>
          <p>
            To convert back, divide instead of multiply. If you have 500 EUR and the rate is 1 EUR = 1.09 USD, then 500 × 1.09 = 545 USD.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Mid-market rate vs the rate you actually get</h2>
          <p>
            The mid-market rate (also called the interbank rate) is the midpoint between the buy and sell prices of two currencies in the global market. It is the fairest single number — nobody gets it exactly, not even central banks, but it is the honest benchmark.
          </p>
          <p>
            The rate you actually get from a bank or service includes a markup. That markup, not the &quot;fee,&quot; is where most of the money disappears. A 3% markup on 1,000 USD costs 30 USD — the same as a claimed 3% &quot;transaction fee.&quot;
          </p>
          <div className="flex items-start gap-3 p-4 border border-amber-500/30 rounded-lg bg-amber-500/5 my-4">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong>Red flag:</strong> Any service advertising &quot;0% commission&quot; is almost certainly making up the cost in the exchange rate. Always compare the final amount you receive, not the advertised fee.
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">7 tips for getting the best rate</h2>
          <div className="space-y-3">
            {[
              'Compare at least three services before any transfer. Even 20 minutes of comparison saves 1-3% every time.',
              'Avoid airport kiosks and hotel desks. Their rates are the worst in the industry, often 7-15% off mid-market.',
              'Use a no-foreign-transaction-fee card abroad. Many cards charge 0% on foreign spending and use the mid-market rate.',
              'Always pay in the local currency when a merchant offers a choice. Dynamic currency conversion adds 3-7%.',
              'Avoid weekend conversions. Markets are closed and banks add extra margin to cover Monday gaps.',
              'For amounts over $10,000, use an FX broker. They get closer to mid-market and handle compliance.',
              'Time large transfers around central bank meetings and economic data releases. Volatility moves rates 0.5-2% in a day.',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Common mistakes to avoid</h2>
          <div className="space-y-3 my-4">
            {[
              'Accepting dynamic currency conversion at ATMs or card terminals',
              'Exchanging currency at the airport &quot;just to be safe&quot;',
              'Assuming &quot;no commission&quot; means &quot;free&quot;',
              'Ignoring the spread because you focused on the headline fee',
              'Transferring large amounts without comparing broker rates',
            ].map((m, i) => (
              <div key={i} className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{m}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Popular currency pairs</h2>
          <p>Jump straight to a live converter for any pair:</p>
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
        <h2 className="text-xl font-bold mb-4">Related articles</h2>
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
          Open the free currency converter <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}