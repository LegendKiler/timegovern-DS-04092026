import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import AutoLoanCalculator from '../components/calculators/AutoLoanCalculator'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: "How is the monthly payment calculated?", a: "Standard amortization formula: M = P * r * (1+r)^n / ((1+r)^n - 1), where P is the loan amount, r is the monthly interest rate, and n is the number of months." },
  { q: "What is a good interest rate?", a: "Rates vary hugely by country and credit score. In the US, new car loans range from 3-15% depending on credit; used car loans run higher. Enter your actual quoted rate for an accurate result." },
  { q: "Does this include insurance or registration?", a: "No. This calculator covers only the loan itself. Add insurance, registration, taxes, and any dealer fees separately." },
  { q: "Should I choose a longer or shorter term?", a: "Longer terms lower the monthly payment but increase total interest. Shorter terms cost more per month but save money overall. Try both to see the trade-off." },
  { q: "What about trade-in value?", a: "Subtract your trade-in value from the vehicle price along with any down payment. Enter the net amount as your effective down payment." }
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Auto Loan Calculator', description: 'Calculate monthly car loan payments, total interest, and total cost. Supports 204 countries with automatic currency.', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: 'https://timegovern.com/auto-loan-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function AutoLoanCalculatorPage() {
  useEffect(() => {
    document.title = 'Auto Loan Calculator - Free | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', "Calculate monthly car loan payments, total interest, and total cost. Supports 204 countries with automatic currency.")
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br blue-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-white/70" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Free - All countries - No signup</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Auto Loan Calculator</h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">Calculate monthly car loan payments, total interest, and total cost. Supports 204 countries with automatic currency.</p>
          </div>
        </div>

        <AutoLoanCalculator />

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
            <Link to="/loan-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Loan Calculator</h3><p className="text-xs text-muted-foreground">Any-purpose loan amortization</p></Link>
            <Link to="/compound-interest-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Compound Interest</h3><p className="text-xs text-muted-foreground">Long-term growth calculator</p></Link>
            <Link to="/investment-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">Investment Calculator</h3><p className="text-xs text-muted-foreground">Future value of investments</p></Link>
            <Link to="/finance-tools" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors"><h3 className="font-bold mb-1 text-sm">All Finance Tools</h3><p className="text-xs text-muted-foreground">Full directory</p></Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Auto Loan Calculator'} />
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
