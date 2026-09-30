import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Sparkles, BookOpen, DollarSign, Calculator, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import CompoundInterestCalculator from '../components/CompoundInterestCalculator'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is compound interest?', a: 'Compound interest is interest earned on both your original principal and on interest you have already earned. Unlike simple interest, it grows exponentially over time - which is why starting early matters so much.' },
  { q: 'What is the compound interest formula?', a: 'The formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual rate as a decimal, n is the number of compounding periods per year, and t is time in years.' },
  { q: 'How often should interest compound?', a: 'More frequent compounding means slightly higher returns. Monthly compounding is standard for most savings and investment accounts. Daily is slightly better; annually is the least favourable.' },
  { q: 'Does this calculator include monthly contributions?', a: 'Yes. You can set an initial principal and a monthly contribution. The calculator shows the combined future value of both, plus how much was contributed vs earned.' },
  { q: 'What interest rate should I use?', a: 'Use a realistic long-term average. The S&P 500 has returned roughly 7-10% per year on average (inflation-adjusted, about 7%). For savings accounts, use the actual rate offered by your bank.' },
  { q: 'Is this financial advice?', a: 'No. This calculator is for informational and educational purposes only. It is not financial advice. Consult a licensed financial adviser for personal investment decisions.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Compound Interest Calculator', description: 'Free compound interest calculator with monthly contributions. See how your money grows over time.', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: 'https://timegovern.com/compound-interest-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function CompoundInterestPage() {
  useEffect(() => {
    document.title = 'Compound Interest Calculator - Free & Private | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free compound interest calculator with monthly contributions. See how your money grows over time at any rate and frequency. No signup, 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">Free - Private - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <TrendingUp className="h-10 w-10 md:h-14 md:w-14 text-emerald-300" />
              Compound Interest
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              See how your money grows with compound interest and monthly contributions.
            </p>
          </div>
        </div>

        <CompoundInterestCalculator />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Compound Interest" inputs={{ principal: 10000, rate: 7, years: 20 }} results={{ calculated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this calculator shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><TrendingUp className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Final balance</h3><p className="text-xs text-muted-foreground">Your principal plus contributions plus all interest earned, compounded.</p></CardContent></Card>
            <Card><CardContent className="p-5"><DollarSign className="h-5 w-5 text-slate-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Total contributed</h3><p className="text-xs text-muted-foreground">How much money you actually put in - principal plus every monthly deposit.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Calculator className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Interest earned</h3><p className="text-xs text-muted-foreground">The difference - money your money made for you. This is compound interest at work.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Enter your starting amount (what you have invested today).</li>
            <li>Add a monthly contribution - even small amounts compound significantly over decades.</li>
            <li>Enter a realistic annual interest rate (7% is a common long-term stock market average).</li>
            <li>Set your time horizon in years - longer is dramatically better for compounding.</li>
            <li>Pick your compounding frequency - monthly is standard.</li>
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
            <Link to="/loan-calculator" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <DollarSign className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">Loan Calculator</h3>
              <p className="text-xs text-muted-foreground">Monthly payments and total interest.</p>
            </Link>
            <Link to="/finance-tools" className="block rounded-xl border border-border bg-card hover:border-teal-400 p-5 transition-colors">
              <TrendingUp className="h-5 w-5 text-teal-500 mb-2" />
              <h3 className="font-bold mb-1">All Finance Tools</h3>
              <p className="text-xs text-muted-foreground">Compound interest, loans, and more.</p>
            </Link>
            <Link to="/blog/what-is-compound-interest" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">What Is Compound Interest?</h3>
              <p className="text-xs text-muted-foreground">The complete beginner's guide.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Compound Interest Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Disclaimer:</strong> This calculator is for informational purposes only and is not financial advice. Consult a licensed financial adviser for personal investment decisions.
        </div>
      </div>
    </>
  )
}