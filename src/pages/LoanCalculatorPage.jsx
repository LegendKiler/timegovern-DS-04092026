import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, Sparkles, BookOpen, TrendingUp, Home, ArrowRight, Calculator } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import LoanCalculator from '../components/LoanCalculator'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How is a monthly loan payment calculated?', a: 'Monthly payments use the amortisation formula: M = P x [r(1+r)^n] / [(1+r)^n - 1], where P is the principal, r is the monthly interest rate, and n is the total number of monthly payments.' },
  { q: 'What is amortisation?', a: 'Amortisation is the process of paying off a loan through scheduled payments. Early payments are mostly interest; later payments are mostly principal. The shift happens gradually over the loan term.' },
  { q: 'Does a longer loan term mean lower payments?', a: 'Yes, but you pay far more interest overall. A 30-year mortgage has lower monthly payments than a 15-year, but the total interest is roughly double.' },
  { q: 'How much does an extra monthly payment help?', a: 'Significantly. Even $100/month extra on a typical mortgage can save tens of thousands in interest and cut years off the term. Use the extra payment field to see your numbers.' },
  { q: 'What is a good interest rate?', a: 'Rates vary by loan type and economy. Compare against the current average for your loan type (mortgage, auto, personal). A rate below 5% is historically low; above 8% is high.' },
  { q: 'Is this financial advice?', a: 'No. This calculator is for informational and educational purposes only. Consult a licensed financial adviser or mortgage broker for personal decisions.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Personal, Auto & Student Loan Calculator', description: 'Free personal, auto, and student loan calculator with monthly payments, total interest, and extra payment savings.', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: 'https://timegovern.com/loan-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function LoanCalculatorPage() {
  useEffect(() => {
    document.title = 'Personal, Auto & Student Loan Calculator | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free personal, auto, and student loan calculator. See monthly payments, total interest, and extra payment savings. For mortgages, see our 24-country Mortgage section.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-blue-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-200">Free - Private - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <DollarSign className="h-10 w-10 md:h-14 md:w-14 text-blue-300" />
              Personal Loan Calculator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Personal, auto, and student loans - with monthly payments, total interest, and extra payment savings.
            </p>
          </div>
        </div>

        <LoanCalculator />

        <Link to="/mortgage" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-5 transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Looking for a mortgage?</h3>
              <p className="text-sm text-muted-foreground">Home loans need country-specific rules. See our 24-country Mortgage section for country-specific repayment, stamp duty, and first-home-buyer calculators.</p>
            </div>
            <ArrowRight className="h-5 w-5 text-indigo-500 group-hover:translate-x-1 transition-transform shrink-0" />
          </div>
        </Link>

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Loan" inputs={{ amount: 250000, rate: 6.5, years: 30 }} results={{ calculated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this calculator shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><DollarSign className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Monthly payment</h3><p className="text-xs text-muted-foreground">The fixed amount you pay every month for the life of the loan.</p></CardContent></Card>
            <Card><CardContent className="p-5"><TrendingUp className="h-5 w-5 text-amber-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Total interest</h3><p className="text-xs text-muted-foreground">The cost of borrowing - what you pay the lender on top of the principal.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Calculator className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Extra payment savings</h3><p className="text-xs text-muted-foreground">Add extra monthly payments to see how much time and interest you save.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Enter the loan amount - what you are borrowing before interest.</li>
            <li>Enter the annual interest rate (APR) - your lender will quote this.</li>
            <li>Set the loan term in years - 3-6 for auto loans, 5-10 for personal loans, 10-20 for student loans.</li>
            <li>Optionally add an extra monthly payment to see the savings.</li>
            <li>Copy the results to share with a partner or financial adviser.</li>
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
            <Link to="/compound-interest-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <TrendingUp className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">Compound Interest</h3>
              <p className="text-xs text-muted-foreground">See how money grows over time.</p>
            </Link>
            <Link to="/finance-tools" className="block rounded-xl border border-border bg-card hover:border-teal-400 p-5 transition-colors">
              <DollarSign className="h-5 w-5 text-teal-500 mb-2" />
              <h3 className="font-bold mb-1">All Finance Tools</h3>
              <p className="text-xs text-muted-foreground">Loans, interest, and more.</p>
            </Link>
            <Link to="/blog/how-to-calculate-loan-payments" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">How to Calculate Loan Payments</h3>
              <p className="text-xs text-muted-foreground">Step-by-step with examples.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Loan Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Disclaimer:</strong> This calculator is for informational purposes only and is not financial advice. Consult a licensed adviser or mortgage broker.
        </div>
      </div>
    </>
  )
}