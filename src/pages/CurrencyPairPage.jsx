import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getCurrency, formatCurrencyAmount, PAIR_PAGE_CURRENCIES } from '../data/currencies'
import { setPageMeta } from '../lib/seo'

const PRESETS = [1, 5, 10, 25, 50, 100, 500, 1000, 5000]

function parsePair(slug) {
  if (!slug || typeof slug !== 'string') return null
  const m = slug.toLowerCase().match(/^([a-z]{3})-to-([a-z]{3})$/)
  if (!m) return null
  const from = m[1].toUpperCase()
  const to = m[2].toUpperCase()
  if (from === to) return null
  return { from, to }
}

export default function CurrencyPairPage() {
  const { pair } = useParams()
  const parsed = parsePair(pair)

  const [rates, setRates] = useState(null)
  const [rateDate, setRateDate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [amount, setAmount] = useState('100')

  const fromMeta = parsed ? getCurrency(parsed.from) : null
  const toMeta = parsed ? getCurrency(parsed.to) : null

  useEffect(() => {
    if (!parsed || !fromMeta || !toMeta) return
    document.title = `${parsed.from} to ${parsed.to} - Convert ${fromMeta.name} to ${toMeta.name} | TimeGovern`
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', `Convert ${fromMeta.name} (${parsed.from}) to ${toMeta.name} (${parsed.to}) with live mid-market rates. 1 ${parsed.from} to ${parsed.to} converter, updated daily. Free, no signup.`)
    setPageMeta()
  }, [pair])

  useEffect(() => {
    if (!parsed || !fromMeta || !toMeta) { setLoading(false); return }
    let cancelled = false
    setLoading(true)
    fetch(`https://open.er-api.com/v6/latest/${parsed.from}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || d.result === 'error') return
        setRates(d.rates)
        setRateDate(d.time_last_update_utc || null)
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [pair])

  if (!parsed || !fromMeta || !toMeta) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">Currency pair not found</h1>
        <p className="text-muted-foreground mb-6">
          We could not find a currency pair matching that URL. Try the format /currency/usd-to-eur.
        </p>
        <Link to="/currency-converter" className="text-emerald-600 font-semibold hover:underline">
          Open the currency converter &rarr;
        </Link>
      </div>
    )
  }

  const rate = rates && rates[parsed.to] ? rates[parsed.to] : null
  const numericAmount = parseFloat(amount || 0)
  const converted = rate ? numericAmount * rate : null

  const FAQ = [
    { q: `How much is 1 ${parsed.from} in ${parsed.to}?`, a: rate ? `1 ${parsed.from} = ${rate.toFixed(4)} ${parsed.to} at the current mid-market rate (updated daily).` : `Live rate is loading. Refresh or scroll for the latest value.` },
    { q: `How do I convert ${fromMeta.name} to ${toMeta.name}?`, a: `Multiply the amount in ${parsed.from} by the current exchange rate. Our converter above does this automatically using live mid-market rates.` },
    { q: `Are these rates updated live?`, a: `Rates refresh once per day via open.er-api.com. The timestamp below the converter shows when the last update occurred.` },
    { q: `Is this ${parsed.from} to ${parsed.to} converter free?`, a: `Yes — 100% free, no signup, no rate limits. You can convert any amount as often as you like.` },
    { q: `What is the difference between mid-market and bank rates?`, a: `Mid-market (interbank) is the midpoint between buy and sell prices you see on financial sites. Banks and money transfer services typically add a 1-3% margin on top.` },
    { q: `Where is ${fromMeta.name} used?`, a: `${fromMeta.name} (${parsed.from}) is the official currency of ${fromMeta.country}.` },
    { q: `Where is ${toMeta.name} used?`, a: `${toMeta.name} (${parsed.to}) is the official currency of ${toMeta.country}.` },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

  const APP_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${parsed.from} to ${parsed.to} Converter`,
    url: `https://timegovern.com/currency/${parsed.from.toLowerCase()}-to-${parsed.to.toLowerCase()}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    description: `Free ${fromMeta.name} to ${toMeta.name} converter with live mid-market rates.`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: parsed.to },
  }

  const BREADCRUMB_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' },
      { '@type': 'ListItem', position: 2, name: 'Currency Converter', item: 'https://timegovern.com/currency-converter' },
      { '@type': 'ListItem', position: 3, name: `${parsed.from} to ${parsed.to}`, item: `https://timegovern.com/currency/${parsed.from.toLowerCase()}-to-${parsed.to.toLowerCase()}` },
    ],
  }

  const reverseSlug = `${parsed.to.toLowerCase()}-to-${parsed.from.toLowerCase()}`
  const otherPairs = PAIR_PAGE_CURRENCIES.filter((c) => c !== parsed.from && c !== parsed.to).slice(0, 12)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {fromMeta.flag} {parsed.from} to {toMeta.flag} {parsed.to}
        </h1>
        <p className="text-muted-foreground">
          Convert {fromMeta.name} to {toMeta.name} at live mid-market rates, updated daily.
        </p>
      </header>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            {loading ? (
              <div className="text-muted-foreground py-8">Loading live rate…</div>
            ) : (
              <>
                <div className="text-sm text-muted-foreground mb-1">1 {parsed.from} equals</div>
                <div className="text-4xl md:text-5xl font-black text-emerald-600 tabular-nums">
                  {rate ? rate.toFixed(4) : '\u2014'} <span className="text-2xl text-muted-foreground">{parsed.to}</span>
                </div>
                {rateDate && <div className="text-xs text-muted-foreground mt-2">Rates as of {rateDate}</div>}
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end mt-6">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Amount in {parsed.from}</label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-11 text-lg font-semibold" />
            </div>
            <div className="text-center text-2xl text-muted-foreground hidden sm:block pb-2">&rarr;</div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Result in {parsed.to}</label>
              <div className="h-11 flex items-center px-3 border border-border rounded-lg bg-muted/20 font-bold text-emerald-600 tabular-nums">
                {converted !== null ? formatCurrencyAmount(converted, parsed.to) : '\u2014'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Common {parsed.from} to {parsed.to} conversions</h2>
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b">
              <tr>
                <th className="text-left p-3 font-semibold">{parsed.from}</th>
                <th className="text-right p-3 font-semibold">{parsed.to}</th>
              </tr>
            </thead>
            <tbody>
              {PRESETS.map((n) => (
                <tr key={n} className="border-b last:border-0">
                  <td className="p-3">{n.toLocaleString()} {parsed.from}</td>
                  <td className="p-3 text-right tabular-nums font-semibold text-emerald-600">
                    {rate ? (n * rate).toLocaleString('en-US', { maximumFractionDigits: 2 }) : '\u2014'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">About this pair</h2>
        <div className="prose prose-sm text-muted-foreground max-w-none space-y-2">
          <p>
            {fromMeta.name} ({parsed.from}) is the currency of {fromMeta.country}. {toMeta.name} ({parsed.to}) is the currency of {toMeta.country}.
          </p>
          <p>
            Use this page to convert any amount from {parsed.from} to {parsed.to} with live mid-market rates.
            For other currencies, see the full <Link to="/currency-converter" className="text-emerald-600 hover:underline">currency converter</Link>.
          </p>
          <p>
            <Link to={`/currency/${reverseSlug}`} className="text-emerald-600 hover:underline">
              Convert {parsed.to} to {parsed.from} instead &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Frequently asked questions</h2>
        <div className="space-y-2">
          {FAQ.map((f) => (
            <details key={f.q} className="border border-border rounded-lg p-3">
              <summary className="font-semibold cursor-pointer text-sm">{f.q}</summary>
              <p className="text-muted-foreground mt-2 text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Other {parsed.from} pairs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {otherPairs.map((c) => {
            const meta = getCurrency(c)
            return (
              <Link key={c} to={`/currency/${parsed.from.toLowerCase()}-to-${c.toLowerCase()}`} className="border border-border rounded-lg p-3 text-sm hover:bg-muted/20 transition">
                <div className="font-semibold">{parsed.from} &rarr; {c}</div>
                <div className="text-xs text-muted-foreground">{meta?.name || c}</div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}