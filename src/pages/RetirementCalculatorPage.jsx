import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import RetirementCalculator from '../components/calculators/RetirementCalculator'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "What return rate should I use?", a: "Historically, a diversified global equity portfolio has returned about 7% per year after inflation. Use 5-7% for a conservative estimate, or 8-10% for a more aggressive assumption." },
  { q: "What is the 4% withdrawal rule?", a: "A rule of thumb from the Trinity Study: withdrawing 4% of your portfolio in year one and adjusting for inflation gives a high chance of lasting 30+ years. Some researchers suggest 3.5% for longer retirements." },
  { q: "Does this include Social Security or pensions?", a: "No. This calculator estimates your own savings and investments only. Add expected Social Security, state pension, or employer pension on top of the monthly income shown." },
  { q: "What about inflation?", a: "The calculator shows nominal future value. To get real (inflation-adjusted) value, use a return rate net of inflation - e.g. 4-5% instead of 7%." },
  { q: "How does the country selector affect the result?", a: "It changes the currency symbol used for display. Contribution limits and tax treatment differ by country - those are not modeled yet." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Retirement Calculator', description: 'Estimate your nest egg at retirement and the monthly income it can support. All 204 countries with automatic currency.', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: 'https://timegovern.com/retirement-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function RetirementCalculatorPage() {
  useEffect(() => {
    document.title = 'Retirement Calculator - Free | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "Estimate your nest egg at retirement and the monthly income it can support. All 204 countries with automatic currency.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br emerald-950 via-teal-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-white/70" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Free - All countries - No signup</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Retirement Calculator</h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">Estimate your nest egg at retirement and the monthly income it can support. All 204 countries with automatic currency.</p>
          </div>
        </div>

        <RetirementCalculator />

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
            <Link to="/investment-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Investment Calculator</h3><p className="text-xs text-muted-foreground">Future value of contributions</p></Link>
            <Link to="/compound-interest-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Compound Interest</h3><p className="text-xs text-muted-foreground">Growth over time</p></Link>
            <Link to="/inflation-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Inflation Calculator</h3><p className="text-xs text-muted-foreground">Purchasing power over time</p></Link>
            <Link to="/finance-tools" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">All Finance Tools</h3><p className="text-xs text-muted-foreground">Full directory</p></Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Retirement Calculator'} />
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
