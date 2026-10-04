import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import CurrencyConverter from '../components/live/CurrencyConverter'
import { POPULAR_CURRENCIES, getCurrency } from '../data/currencies'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Is this currency converter free?', a: 'Yes. 100% free, no signup, no rate limits. All 166 world currencies are available.' },
  { q: 'How often are exchange rates updated?', a: 'Rates refresh once daily via open.er-api.com. The exact timestamp is shown below the converter.' },
  { q: 'Do you support cryptocurrency?', a: 'No — this tool covers fiat currencies only. For crypto prices, see our live data page.' },
  { q: 'Which currencies are supported?', a: '166 world currencies including USD, EUR, GBP, JPY, INR, AUD, CAD, CHF, CNY, and 158 more.' },
  { q: 'Are these mid-market or bank rates?', a: 'Mid-market rates (interbank). Banks and exchange services typically add a 1-3% margin.' },
  { q: 'Can I use this on mobile?', a: 'Yes — fully responsive, installable as a PWA, works offline once loaded.' },
  { q: 'How do I embed this on my own site?', a: 'Use our embed widgets at /embed/digital or /embed/clock. Free, no account required.' },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const APP_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Currency Converter',
  url: 'https://timegovern.com/currency-converter',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  description: 'Free currency converter with 166 world currencies. Live mid-market exchange rates updated daily.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' },
    { '@type': 'ListItem', position: 2, name: 'Currency Converter', item: 'https://timegovern.com/currency-converter' },
  ],
}

const TABLE_ROWS = ['EUR','GBP','JPY','AUD','CAD','CHF','CNY','INR','NZD','HKD','SGD','SEK','NOK','DKK','KRW','BRL','MXN','ZAR','AED','SAR','TRY','THB','IDR','PHP','MYR','PKR','BDT','NGN','EGP','VND']

export default function CurrencyConverterPage() {
  const [rates, setRates] = useState(null)
  const [rateDate, setRateDate] = useState(null)

  useEffect(() => {
    document.title = 'Currency Converter - Live Exchange Rates for 166 Currencies | TimeGovern'
    let descEl = document.querySelector('meta[name="description"]')
    if (!descEl) {
      descEl = document.createElement('meta')
      descEl.setAttribute('name', 'description')
      document.head.appendChild(descEl)
    }
    descEl.setAttribute('content', 'Free currency converter for 166 world currencies. Live mid-market exchange rates updated daily. No signup, no rate limits, no tracking.')
    setPageMeta()
  }, [])

  useEffect(() => {
    let cancelled = false
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || d.result === 'error') return
        setRates(d.rates)
        setRateDate(d.time_last_update_utc || null)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const popular = POPULAR_CURRENCIES.filter((c) => c !== 'USD').slice(0, 24)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Currency Converter</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Convert between 166 world currencies using live mid-market exchange rates, updated daily.
          Free, no signup, no rate limits.
        </p>
      </header>

      <div className="max-w-2xl mx-auto mb-10">
        <CurrencyConverter />
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Popular conversions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {popular.map((code) => {
            const c = getCurrency(code)
            const r = rates && rates[code]
            return (
              <div key={code} className="border border-border rounded-lg p-3 text-sm">
                <div className="font-semibold flex items-center gap-1">
                  <span>1 USD</span>
                  <span className="text-muted-foreground">&rarr;</span>
                  <span>{c?.flag} {code}</span>
                </div>
                <div className="text-emerald-600 font-bold tabular-nums mt-1">
                  {r ? r.toFixed(4) : '\u2014'}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">USD exchange rates</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/30">
                  <tr>
                    <th className="text-left p-3 font-semibold">Currency</th>
                    <th className="text-left p-3 font-semibold">Name</th>
                    <th className="text-right p-3 font-semibold">1 USD =</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((code) => {
                    const c = getCurrency(code)
                    const r = rates && rates[code]
                    return (
                      <tr key={code} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="p-3 font-semibold">{c?.flag} {code}</td>
                        <td className="p-3 text-muted-foreground">{c?.name || code}</td>
                        <td className="p-3 text-right tabular-nums">{r ? r.toFixed(4) : '\u2014'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        {rateDate && <p className="text-xs text-muted-foreground text-center mt-2">Rates as of {rateDate}</p>}
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
        <div className="space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="border border-border rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">{f.q}</summary>
              <p className="text-muted-foreground mt-2 text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/holidays" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition">
            <div className="font-semibold">Public Holidays</div>
            <div className="text-sm text-muted-foreground">220 countries, 2026-2028</div>
          </Link>
          <Link to="/world-clock" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition">
            <div className="font-semibold">World Clock</div>
            <div className="text-sm text-muted-foreground">Live time in any city</div>
          </Link>
          <Link to="/time-zone-converter" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition">
            <div className="font-semibold">Time Zone Converter</div>
            <div className="text-sm text-muted-foreground">DST-aware, shareable</div>
          </Link>
        </div>
      </section>
    </div>
  )
}