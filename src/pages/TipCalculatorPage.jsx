import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Coffee, Sparkles, BookOpen, Users, Globe, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import TipCalculator from '../components/TipCalculator'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How much should I tip at a restaurant?', a: 'It depends on the country. In the US, 18-20% is standard for table service. In Canada, 15-20%. In the UK and Europe, 10-15% (or 5-10% in most EU countries). In Australia, New Zealand, and Japan, tipping is not expected at all.' },
  { q: 'Should I tip on the pre-tax or post-tax amount?', a: 'Pre-tax is technically correct. Tipping on the pre-tax bill avoids tipping on government tax. In practice, most people tip on the total for simplicity - the difference is small.' },
  { q: 'How do I split a bill fairly?', a: 'For equal shares, divide the total (bill + tip) by the number of people. For unequal shares (different meals), each person pays their meal cost plus a proportional share of the tip and any shared items.' },
  { q: 'Is it rude to tip in Japan?', a: 'Yes. Japanese culture considers tipping rude - it implies the service was not already compensated properly. Do not leave cash on the table. If you want to show appreciation, a small gift is more appropriate.' },
  { q: 'Should I tip on takeout?', a: 'In the US, 10% is common for takeout, more if the order was complex. In other countries, tipping on takeout is unusual. Use the country preset to see the local norm.' },
  { q: 'What about tipping on delivery?', a: 'In the US: 10-15%, more for difficult weather or large orders. In Australia and Europe: usually nothing, though delivery apps may prompt you. Again, follow local norms.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Tip Calculator', description: 'Free tip calculator with country presets and bill splitting. Calculate tips, totals, and per-person amounts instantly.', applicationCategory: 'UtilityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/tip-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function TipCalculatorPage() {
  useEffect(() => {
    document.title = 'Tip Calculator - Free, Country-Aware | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free tip calculator with country presets (US, UK, EU, AU, JP) and bill splitting. Calculate tips, totals, and per-person amounts instantly.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-pink-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-rose-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-rose-200">Free - Country-aware - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Coffee className="h-10 w-10 md:h-14 md:w-14 text-rose-300" />
              Tip Calculator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Calculate tips and split bills - with country-aware presets so you know what is normal where you are.
            </p>
          </div>
        </div>

        <TipCalculator />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this calculator does</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Coffee className="h-5 w-5 text-rose-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Tip and total</h3><p className="text-xs text-muted-foreground">Instant tip amount and total bill from any percentage.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Users className="h-5 w-5 text-pink-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Bill splitting</h3><p className="text-xs text-muted-foreground">Split between any number of people and see what each pays.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Globe className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Country presets</h3><p className="text-xs text-muted-foreground">US, UK, EU, Australia, Japan and more - with local tipping norms explained.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Enter the bill amount - the pre-tip total.</li>
            <li>Pick your country to auto-set the standard tip percentage.</li>
            <li>Adjust the tip with the slider or quick buttons (10/15/18/20/25%).</li>
            <li>Set the number of people to split the bill.</li>
            <li>Copy the results to share with the group.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/lifestyle-tools" className="block rounded-xl border border-border bg-card hover:border-rose-400 p-5 transition-colors">
              <Coffee className="h-5 w-5 text-rose-500 mb-2" />
              <h3 className="font-bold mb-1">All Lifestyle Tools</h3>
              <p className="text-xs text-muted-foreground">Tips, splits, and more.</p>
            </Link>
            <Link to="/unit-converter" className="block rounded-xl border border-border bg-card hover:border-pink-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-pink-500 mb-2" />
              <h3 className="font-bold mb-1">Unit Converter</h3>
              <p className="text-xs text-muted-foreground">Currency-adjacent conversions.</p>
            </Link>
            <Link to="/blog/how-much-to-tip" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">How Much to Tip?</h3>
              <p className="text-xs text-muted-foreground">The complete guide.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Tip Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Tipping norms vary widely. These presets are typical guidelines, not rules. When in doubt, follow local custom or ask your server.
        </div>
      </div>
    </>
  )
}