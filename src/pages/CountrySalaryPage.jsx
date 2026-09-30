import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowRight, BookOpen, Calculator, DollarSign, ExternalLink, Flag, Globe, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import SalaryCalculatorGeneric from '../components/SalaryCalculatorGeneric'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { COUNTRIES } from '../data/salaryData'
import { COUNTRIES_DATA } from '../data/countries'

export default function CountrySalaryPage() {
  const { country } = useParams()
  const c = COUNTRIES[country]

  useEffect(() => {
    if (!c) return
    document.title = `${c.name} Salary Calculator ${c.taxYear} - Take-Home Pay | TimeGovern`
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = `Free ${c.name} salary calculator for ${c.taxYear}. See take-home pay after income tax${c.nationalInsurance ? ', National Insurance' : ''}${c.usc ? ', USC' : ''}${c.prsi ? ', PRSI' : ''}, and other deductions.`
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [c])

  if (!c) return <Navigate to="/salary" replace />

  const FAQ = [
    { q: `How is take-home pay calculated in ${c.name}?`, a: `Gross salary minus income tax using ${c.name}'s ${c.taxYear} brackets, plus ${c.nationalInsurance ? 'National Insurance, ' : ''}${c.usc ? 'USC, ' : ''}${c.prsi ? 'PRSI, ' : ''}and any pre-tax deductions like pension contributions.` },
    { q: `What is the tax-free allowance in ${c.name}?`, a: `${c.name}'s ${c.taxYear} tax-free allowance is ${c.symbol}${c.taxFreeAllowance?.toLocaleString()}. Income below this amount is not subject to income tax.` },
    { q: `What is the top tax rate in ${c.name}?`, a: `The highest marginal rate in ${c.name} is ${(Math.max(...c.brackets.map(b => b.rate)) * 100).toFixed(0)}%. This rate applies only to income above the highest bracket threshold.` },
    { q: `Where can I find official ${c.name} tax information?`, a: `The official tax authority is ${c.authority.name}. Visit their site at ${c.authority.url} for the current rates and allowances.` },
    { q: `Is this ${c.name} tax advice?`, a: `No. This calculator provides estimates for informational purposes only and is not tax advice. Consult a licensed accountant in ${c.name} for personal decisions.` },
    { q: `When does the ${c.name} tax year start and end?`, a: `${c.name}'s ${c.taxYear} tax year operates on its national calendar cycle. Verify exact dates with ${c.authority.name}.` },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: `${c.name} Salary Calculator`, description: `Free ${c.name} salary calculator for ${c.taxYear}. Compute take-home pay after income tax, social contributions, and deductions.`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: `https://timegovern.com/salary/${country}`, offers: { '@type': 'Offer', price: '0', priceCurrency: c.currency } }

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
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">{c.taxYear} - Free - No signup</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight flex items-center gap-3">
              <span className="text-4xl md:text-6xl">{c.flag}</span>
              {c.name} Salary Calculator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Take-home pay after income tax{c.nationalInsurance ? ', National Insurance' : ''}{c.usc ? ', USC' : ''}{c.prsi ? ', PRSI' : ''}, and pre-tax deductions.
            </p>
          </div>
        </div>

        <SalaryCalculatorGeneric countryCode={country} />
        <Link to={'/country-codes/' + (COUNTRIES_DATA.find(cc => cc.salarySlug === country)?.c2?.toLowerCase() || country)} className="block rounded-2xl border-2 border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-500 p-5 transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 shadow-md shrink-0">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-lg group-hover:text-cyan-500 transition-colors">Country info for {c.name}</h3>
              <p className="text-sm text-muted-foreground">Country code, dialing code, capital, timezones, and emergency numbers.</p>
            </div>
            <ArrowRight className="h-5 w-5 text-cyan-500 group-hover:translate-x-1 transition-transform shrink-0" />
          </div>
        </Link>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Official sources</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href={c.authority.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">{c.authority.name}</h3>
              <p className="text-xs text-muted-foreground">Official tax authority - current rates and allowances.</p>
            </a>
            <a href={c.pdfUrl} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-teal-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-teal-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">Official PDF / tax tables</h3>
              <p className="text-xs text-muted-foreground">Download the current tax tables and bulletins.</p>
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
            <Link to="/mortgage" className="block rounded-xl border border-border bg-card hover:border-teal-400 p-5 transition-colors">
              <Calculator className="h-5 w-5 text-teal-500 mb-2" />
              <h3 className="font-bold mb-1">Mortgage Calculators</h3>
              <p className="text-xs text-muted-foreground">24 countries covered.</p>
            </Link>
            <Link to="/finance-tools" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <DollarSign className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">All Finance Tools</h3>
              <p className="text-xs text-muted-foreground">Compound interest and loans.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : c.name + ' Salary Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Disclaimer:</strong> For informational purposes only. Not tax or financial advice. Verify with a licensed accountant in {c.name}.
        </div>
      </div>
    </>
  )
}