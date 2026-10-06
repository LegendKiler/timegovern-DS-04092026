import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import InvestmentCalculator from '../components/calculators/InvestmentCalculator'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How is future value calculated?", a: "FV = P(1+r)^n + PMT * ((1+r)^n - 1) / r, where P is the initial amount, PMT is the monthly contribution, r is the monthly return rate, and n is the number of months." },
  { q: "What is a realistic return rate?", a: "Global equities have returned 7-10% per year nominally over long periods. Bonds return less. A diversified portfolio typically targets 6-8% nominal, or 4-6% after inflation." },
  { q: "Does this account for taxes?", a: "No. Investment returns are shown gross. Real-world returns are reduced by capital gains tax, dividend tax, and fund fees. Reduce the return rate by 1-2% to approximate." },
  { q: "What about inflation?", a: "Future value is in nominal dollars. To see real purchasing power, use a return rate net of expected inflation - e.g. 5% instead of 8% if inflation runs 3%." },
  { q: "Can I model lump-sum vs monthly contributions?", a: "Yes. Set monthly contribution to 0 to model a lump sum, or initial amount to 0 to model pure dollar-cost averaging." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Investment Calculator', description: 'Calculate the future value of an investment with monthly contributions. 204 countries with automatic currency formatting.', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: 'https://timegovern.com/investment-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function InvestmentCalculatorPage() {
  useEffect(() => {
    document.title = 'Investment Calculator - Free | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "Calculate the future value of an investment with monthly contributions. 204 countries with automatic currency formatting.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br violet-950 via-fuchsia-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-white/70" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Free - All countries - No signup</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Investment Calculator</h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">Calculate the future value of an investment with monthly contributions. 204 countries with automatic currency formatting.</p>
          </div>
        </div>

        <InvestmentCalculator />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2 text-sm">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/retirement-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Retirement Calculator</h3><p className="text-xs text-muted-foreground">Long-term planning</p></Link>
            <Link to="/compound-interest-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Compound Interest</h3><p className="text-xs text-muted-foreground">Compounding over time</p></Link>
            <Link to="/roi-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">ROI Calculator</h3><p className="text-xs text-muted-foreground">Return on investment</p></Link>
            <Link to="/finance-tools" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">All Finance Tools</h3><p className="text-xs text-muted-foreground">Full directory</p></Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Investment Calculator'} />
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4 text-sm text-center">
          <Link to="/finance-tools" className="inline-flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            See all finance tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  )
}
