import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, Sparkles, BookOpen, Flag, Calculator, ArrowRight, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import SalaryCalculatorGeneric from '../components/SalaryCalculatorGeneric'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How is US take-home pay calculated?', a: 'Gross salary minus federal income tax (2025 brackets), FICA (Social Security 6.2% up to $168,600 + Medicare 1.45%), state income tax (varies), and any pre-tax deductions like 401k or health insurance.' },
  { q: 'What are the 2025 federal tax brackets?', a: 'For single filers: 10% up to $11,600; 12% to $47,150; 22% to $100,525; 24% to $191,950; 32% to $243,725; 35% to $609,350; 37% above. Married filing jointly uses roughly doubled thresholds.' },
  { q: 'What is FICA?', a: 'FICA combines Social Security (6.2% up to $168,600 in 2025) and Medicare (1.45% on all income). High earners pay an additional 0.9% Medicare tax above $200,000.' },
  { q: 'What is the standard deduction?', a: 'For 2025: $14,600 for single filers, $29,200 for married filing jointly. This reduces your taxable income before brackets are applied.' },
  { q: 'Which states have no income tax?', a: 'Nine states: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. Enter 0% for those states.' },
  { q: 'Is this tax advice?', a: 'No. This is an estimate for informational purposes only. Actual take-home pay depends on many factors - consult a licensed tax professional for personal advice.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'US Salary Calculator', description: 'Free US salary calculator with 2025 federal tax brackets, FICA, state tax, and take-home pay.', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: 'https://timegovern.com/salary/usa', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function SalaryUSAPage() {
  useEffect(() => {
    document.title = 'US Salary Calculator 2025 - Take-Home Pay | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free US salary calculator with 2025 federal tax brackets, FICA, state tax, and take-home pay. Instant, accurate, no signup.'
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
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">2025 - Free - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <DollarSign className="h-10 w-10 md:h-14 md:w-14 text-emerald-300" />
              US Salary Calculator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Take-home pay after federal tax, FICA, state tax, and pre-tax deductions.
            </p>
          </div>
        </div>

        <SalaryCalculatorGeneric countryCode="usa" />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this calculator shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Flag className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">2025 tax brackets</h3><p className="text-xs text-muted-foreground">Real federal brackets for single and married filing jointly.</p></CardContent></Card>
            <Card><CardContent className="p-5"><DollarSign className="h-5 w-5 text-teal-500 mb-2" /><h3 className="font-bold mb-1 text-sm">FICA included</h3><p className="text-xs text-muted-foreground">Social Security, Medicare, and additional Medicare for high earners.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Calculator className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Effective tax rate</h3><p className="text-xs text-muted-foreground">Real % of income paid in tax - not just your marginal bracket.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Official sources</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="https://www.irs.gov/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">IRS</h3>
              <p className="text-xs text-muted-foreground">Official tax brackets and forms.</p>
            </a>
            <a href="https://www.ssa.gov/oact/cola/cbb.html" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-teal-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-teal-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">SSA contribution base</h3>
              <p className="text-xs text-muted-foreground">Social Security wage cap.</p>
            </a>
          </div>
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
            <Link to="/salary" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <Flag className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">All Countries</h3>
              <p className="text-xs text-muted-foreground">20+ salary calculators.</p>
            </Link>
            <Link to="/mortgage/usa" className="block rounded-xl border border-border bg-card hover:border-teal-400 p-5 transition-colors">
              <Calculator className="h-5 w-5 text-teal-500 mb-2" />
              <h3 className="font-bold mb-1">USA Mortgage</h3>
              <p className="text-xs text-muted-foreground">FHA, VA, PMI, amortization.</p>
            </Link>
            <Link to="/blog/how-tax-brackets-work" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">How Tax Brackets Work</h3>
              <p className="text-xs text-muted-foreground">Marginal vs effective rate.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'US Salary Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Disclaimer:</strong> For informational purposes only. Not tax or financial advice. Consult a licensed tax professional for personal decisions.
        </div>
      </div>
    </>
  )
}