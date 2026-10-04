import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Trophy, CheckCircle2, XCircle, Zap } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const TOOLS = [
  {
    name: 'TimeGovern',
    tagline: 'Free, no signup, 166 currencies',
    fee: 'Free (mid-market)',
    currencies: '166',
    speed: 'Instant',
    bestFor: 'Quick daily conversions, no account',
    verdict: 'The simplest option if you just want to know what an amount is worth. No account required, no rate limits, and mobile-friendly.',
  },
  {
    name: 'Wise',
    tagline: 'Best for actual transfers',
    fee: '0.35-0.7%',
    currencies: '50+',
    speed: 'Instant to 2 days',
    bestFor: 'Sending money abroad regularly',
    verdict: 'The gold standard for transfers under $10,000. Uses the real mid-market rate with a transparent flat fee.',
  },
  {
    name: 'XE',
    tagline: 'The long-standing benchmark',
    fee: '0.5-2%',
    currencies: '130+',
    speed: '1-3 days',
    bestFor: 'Wide currency coverage',
    verdict: 'Great for obscure pairs, but the rates are typically 0.5-1% worse than Wise on the majors.',
  },
  {
    name: 'Google Finance',
    tagline: 'Fast, no fees, no transfers',
    fee: 'Free (mid-market)',
    currencies: '150+',
    speed: 'Instant',
    bestFor: 'Quick reference conversions',
    verdict: 'Shows the mid-market rate, but you cannot actually send money. Ideal as a quick lookup, not for real transfers.',
  },
  {
    name: 'Revolut',
    tagline: 'Best if you already bank with them',
    fee: 'Free up to monthly limit, then 0.5%',
    currencies: '30+',
    speed: 'Instant',
    bestFor: 'Frequent travellers with a Revolut account',
    verdict: 'Excellent for holiday spending. Falls behind Wise for large transfers, and the free tier has weekend surcharges.',
  },
  {
    name: 'OFX',
    tagline: 'Specialist for large transfers',
    fee: '0.1-0.5%',
    currencies: '50+',
    speed: '1-2 days',
    bestFor: 'Transfers over $10,000',
    verdict: 'Strong for property purchases and business payments. Minimum transfer size ($1,000+) makes it overkill for small amounts.',
  },
]

const FAQ = [
  { q: 'What is the best currency converter for free?', a: 'For quick reference conversions, TimeGovern and Google Finance are free with no signup. For actual transfers, Wise charges a small flat fee but still gives the best overall value.' },
  { q: 'Which currency converter has the best rates?', a: 'Wise for actual transfers under $10,000. OFX for large transfers over $10,000. TimeGovern for mid-market reference rates.' },
  { q: 'Is Google Finance or XE more accurate?', a: 'Both show the mid-market rate. Google Finance tends to update more frequently and is faster to load. XE is stronger on obscure pairs.' },
  { q: 'Do I need an account to convert currency?', a: 'For reference conversions, no. TimeGovern, Google Finance, and XE all work without login. For sending money, all services require identity verification.' },
  { q: 'What is the cheapest way to send money internationally?', a: 'For most amounts, Wise. Their 0.35-0.7% fee plus the real mid-market rate beats bank transfers by 2-4%. For amounts over $10,000, an FX broker like OFX is often slightly cheaper.' },
  { q: 'Are currency converters accurate?', a: 'The best ones (TimeGovern, Google, XE, Wise) all show the same mid-market rate within a few basis points. Any service quoting a noticeably different number is adding a hidden spread.' },
  { q: 'Can I use these tools on mobile?', a: 'Yes. TimeGovern is a PWA and installs on iOS and Android. Wise, XE, and Revolut all have native apps. Google Finance works via mobile web.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

const ARTICLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Currency Converter Tools Compared (2026)',
  datePublished: '2026-10-04',
  dateModified: '2026-10-04',
  author: { '@type': 'Organization', name: 'TimeGovern' },
  publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } },
  image: 'https://timegovern.com/icon-512.png',
  mainEntityOfPage: 'https://timegovern.com/blog/best-currency-converter-tools',
}

const ITEMLIST_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Currency Converter Tools 2026',
  itemListElement: TOOLS.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    description: t.tagline,
  })),
}

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' },
    { '@type': 'ListItem', position: 3, name: 'Best Currency Converter Tools', item: 'https://timegovern.com/blog/best-currency-converter-tools' },
  ],
}

const PAIR_LINKS = [
  { slug: 'usd-to-eur', label: 'USD to EUR' },
  { slug: 'usd-to-gbp', label: 'USD to GBP' },
  { slug: 'eur-to-gbp', label: 'EUR to GBP' },
  { slug: 'usd-to-inr', label: 'USD to INR' },
  { slug: 'gbp-to-inr', label: 'GBP to INR' },
]

const RELATED = [
  { to: '/blog/how-to-convert-currency', title: 'How to Convert Currency: The Complete Guide', desc: 'Three methods, fee comparison, and 7 tips for the best rate.' },
  { to: '/blog/mid-market-exchange-rate', title: 'Mid-Market Exchange Rates Explained', desc: 'What the mid-market rate is and why banks add a spread.' },
  { to: '/blog/public-holidays-2026-comparison', title: 'Public Holidays 2026: UK vs US vs AU vs DE', desc: 'Plan travel around the cheapest dates.' },
]

export default function BestCurrencyConverterToolsPage() {
  useEffect(() => {
    document.title = 'Best Currency Converter Tools Compared (2026) | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Wise vs XE vs Google Finance vs Revolut vs OFX vs TimeGovern - side-by-side comparison of fees, currencies, speed, and which wins for each use case.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ITEMLIST_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-1">/</span>
        <Link to="/blog" className="hover:underline">Blog</Link>
        <span className="mx-1">/</span>
        <span>Best Currency Converter Tools</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-emerald-500 mb-3">
          <Trophy className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Comparison</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Best Currency Converter Tools Compared (2026)</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Six tools tested side by side. Fees, currency coverage, speed, and which one wins for each use case.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Updated 4 October 2026</span>
          <span>·</span>
          <span>7 min read</span>
        </div>
      </header>

      <ShareButtons title="Best Currency Converter Tools Compared (2026)" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <p>
            There is no single best currency converter — the right tool depends on what you are doing. For a quick mid-market check, one tool wins. For a $50,000 property transfer, a different one. This comparison cuts through the marketing claims.
          </p>
          <p>
            We ranked six of the most-used tools in 2026 by actual cost, currency coverage, transfer speed, and clarity of pricing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The comparison table</h2>
          <div className="overflow-x-auto border border-border rounded-lg my-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 border-b">
                <tr>
                  <th className="text-left p-3 font-semibold">Tool</th>
                  <th className="text-left p-3 font-semibold">Fee</th>
                  <th className="text-left p-3 font-semibold">Currencies</th>
                  <th className="text-left p-3 font-semibold">Speed</th>
                </tr>
              </thead>
              <tbody>
                {TOOLS.map((t) => (
                  <tr key={t.name} className="border-b last:border-0">
                    <td className="p-3 font-semibold">{t.name}</td>
                    <td className="p-3 tabular-nums">{t.fee}</td>
                    <td className="p-3 tabular-nums">{t.currencies}</td>
                    <td className="p-3 text-muted-foreground">{t.speed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Per-tool breakdown</h2>
          <div className="space-y-4 my-4">
            {TOOLS.map((t, i) => (
              <div key={t.name} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-600">#{i + 1}</span>
                      <h3 className="font-bold text-base">{t.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{t.tagline}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground whitespace-nowrap">{t.currencies} currencies</span>
                </div>
                <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                  <div><span className="text-muted-foreground">Fee:</span> <strong>{t.fee}</strong></div>
                  <div><span className="text-muted-foreground">Speed:</span> <strong>{t.speed}</strong></div>
                </div>
                <p className="text-xs text-muted-foreground mb-2"><strong>Best for:</strong> {t.bestFor}</p>
                <p className="text-sm">{t.verdict}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Which one should you use?</h2>
          <div className="space-y-3 my-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm"><strong>Just checking a rate?</strong> Use TimeGovern — no signup, instant, works offline as a PWA.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm"><strong>Sending $100-$5,000?</strong> Wise is the cheapest option that actually transfers money.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm"><strong>Sending $10,000+?</strong> Compare OFX and Wise side by side — the difference can be hundreds of dollars.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm"><strong>Travelling?</strong> A no-FX-fee card (Revolut, Wise debit, Monzo) beats cash in almost every case.</span>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm"><strong>Avoid:</strong> Airport kiosks and hotel desks. Their rates are 7-15% off mid-market.</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Try it yourself</h2>
          <p>
            The fastest way to see the difference is to check the mid-market rate for yourself, then compare it against what a bank or exchange service quotes you.
          </p>
          <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-muted/20 my-4">
            <Zap className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            <div className="text-sm">
              <Link to="/currency-converter" className="text-emerald-600 font-semibold hover:underline">
                Open the free TimeGovern currency converter
              </Link>
              {' '}— 166 currencies, live mid-market rates, no signup.
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Popular currency pairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-4">
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
          Try the free converter <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}