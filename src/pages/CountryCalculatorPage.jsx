import { useEffect } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { Sparkles, ExternalLink, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { COUNTRY_METADATA } from '../data/countryMetadata'
import { setPageMeta } from '../lib/seo'
import AutoLoanCalculator from '../components/calculators/AutoLoanCalculator'
import CreditCardPayoffCalculator from '../components/calculators/CreditCardPayoffCalculator'
import RetirementCalculator from '../components/calculators/RetirementCalculator'
import InvestmentCalculator from '../components/calculators/InvestmentCalculator'
import PregnancyDueDateCalculator from '../components/calculators/PregnancyDueDateCalculator'
import OvulationCalculator from '../components/calculators/OvulationCalculator'
import GradeCalculator from '../components/calculators/GradeCalculator'

const KIND_MAP = {
  'auto-loan-calculator': { Comp: AutoLoanCalculator, title: 'Auto Loan Calculator', desc: 'Estimate monthly car payments, total interest and total cost.', cat: 'FinanceApplication' },
  'credit-card-payoff-calculator': { Comp: CreditCardPayoffCalculator, title: 'Credit Card Payoff Calculator', desc: 'See how long it takes to clear a credit card balance.', cat: 'FinanceApplication' },
  'retirement-calculator': { Comp: RetirementCalculator, title: 'Retirement Calculator', desc: 'Project your retirement nest egg and monthly income.', cat: 'FinanceApplication' },
  'investment-calculator': { Comp: InvestmentCalculator, title: 'Investment Calculator', desc: 'Calculate compound growth on your investments over time.', cat: 'FinanceApplication' },
  'pregnancy-due-date-calculator': { Comp: PregnancyDueDateCalculator, title: 'Pregnancy Due Date Calculator', desc: 'Estimate your due date from your last menstrual period.', cat: 'HealthApplication' },
  'ovulation-calculator': { Comp: OvulationCalculator, title: 'Ovulation Calculator', desc: 'Estimate your ovulation window and most fertile days.', cat: 'HealthApplication' },
  'grade-calculator': { Comp: GradeCalculator, title: 'Grade Calculator', desc: 'Calculate your course grade from weighted scores.', cat: 'EducationalApplication' }
}

const ALLOWED_COUNTRIES = ['AT','BE','CH','DE','DK','ES','FI','FR','GB','GR','IE','IT','NL','NO','PL','PT','RU','SE','CA','MX','US','AR','BR','CL','BD','CN','ID','JP','KR','PH','SG','VN','TR','EG','NG','ZA','AU','NZ','PK','IN','AE','SA','TH','MY','IL']

export default function CountryCalculatorPage({ kind }) {
  const { code } = useParams()
  const navigate = useNavigate()
  const entry = KIND_MAP[kind]
  const cc = (code || '').toUpperCase()
  const meta = COUNTRY_METADATA[cc]
  const allowed = ALLOWED_COUNTRIES.indexOf(cc) !== -1

  useEffect(() => {
    if (!entry || !meta || !allowed) return
    const title = entry.title + ' for ' + meta.name + ' | TimeGovern'
    document.title = title
    const desc = entry.desc + ' Free online tool for ' + meta.name + '.'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', desc)
    setPageMeta()
    window.scrollTo(0, 0)
  }, [kind, cc])

  if (!entry) return <Navigate to="/" replace />
  if (!meta || !allowed) return <Navigate to={'/' + kind} replace />

  const Comp = entry.Comp
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: entry.title + ' - ' + meta.name,
    description: entry.desc,
    applicationCategory: entry.cat,
    operatingSystem: 'Web',
    url: 'https://timegovern.com/' + kind + '/' + cc.toLowerCase(),
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' },
      { '@type': 'ListItem', position: 2, name: entry.title, item: 'https://timegovern.com/' + kind },
      { '@type': 'ListItem', position: 3, name: meta.name, item: 'https://timegovern.com/' + kind + '/' + cc.toLowerCase() }
    ]
  }
  const sym = meta.currencySymbol && meta.currencySymbol !== meta.currency ? meta.currencySymbol + ' ' : (meta.currency || '') + ' '

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="container mx-auto p-4 max-w-4xl space-y-6">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-white/70" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Localized - Free - No signup</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">{entry.title}</h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              {entry.desc} Use the country selector to set your local currency.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link to={'/' + kind} className="hover:underline">{entry.title}</Link>
          <span>/</span>
          <span className="font-semibold text-foreground">{meta.name}</span>
        </div>

        <Comp initialCountryCode={cc} onCountryChange={(c) => navigate('/' + kind + '/' + c.toLowerCase(), { replace: true })} />

        <Card>
          <CardContent className="p-6 space-y-3">
            <h2 className="text-xl font-black tracking-tight">Local context: {meta.name}</h2>
            <p className="text-sm text-muted-foreground">
              Region: {meta.region || 'N/A'} - Currency: {meta.currency || 'N/A'}{meta.currencySymbol && meta.currencySymbol !== meta.currency ? ' (' + meta.currencySymbol + ')' : ''}
            </p>
            {(meta.healthAuthorityName || meta.educationAuthorityName) && (
              <div className="space-y-2 pt-2 border-t border-border">
                {meta.healthAuthorityName && meta.healthAuthorityUrl && (
                  <a href={meta.healthAuthorityUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:underline">
                    <ExternalLink className="h-4 w-4" />
                    <span><strong>Health authority:</strong> {meta.healthAuthorityName}</span>
                  </a>
                )}
                {meta.educationAuthorityName && meta.educationAuthorityUrl && (
                  <a href={meta.educationAuthorityUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:underline">
                    <ExternalLink className="h-4 w-4" />
                    <span><strong>Education authority:</strong> {meta.educationAuthorityName}</span>
                  </a>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-3">
          <Link to={'/' + kind} className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
            <h3 className="font-bold mb-1 text-sm flex items-center gap-2">Global {entry.title} <ArrowRight className="h-3.5 w-3.5" /></h3>
            <p className="text-xs text-muted-foreground">Change country from inside the tool</p>
          </Link>
          <Link to="/calculators" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
            <h3 className="font-bold mb-1 text-sm flex items-center gap-2">All Calculators <ArrowRight className="h-3.5 w-3.5" /></h3>
            <p className="text-xs text-muted-foreground">Browse the full directory</p>
          </Link>
        </div>
      </div>
    </>
  )
}
