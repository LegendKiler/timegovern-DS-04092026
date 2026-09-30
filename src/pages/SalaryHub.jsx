import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, Sparkles, ArrowRight, Flag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { COUNTRIES } from '../data/salaryData'

const DESC = {
  uk: 'Income Tax bands, National Insurance, personal allowance',
  ireland: 'Standard rate, USC, PRSI, tax credits',
  de: 'Einkommensteuer brackets, social contributions',
  fr: 'Barème progressif, cotisations sociales',
  nl: 'Box 1 brackets, 30% ruling for expats',
}

const FAQ = [
  { q: 'What does a salary calculator do?', a: 'It converts your gross salary into take-home pay after income tax, social security contributions, and other deductions specific to your country. It shows the real amount that lands in your bank account.' },
  { q: 'Which countries are supported?', a: 'We currently support multiple countries across Europe, North America, and beyond. Each uses country-specific tax brackets, allowances, and contribution rates.' },
  { q: 'Is the calculator up to date?', a: 'Tax brackets are updated for the current tax year. However, tax law changes frequently - always verify with an official source (HMRC, Revenue, BMF, DGFiP, Belastingdienst) before making decisions.' },
  { q: 'Are state or regional taxes included?', a: 'For countries with regional variations (e.g. US states, Canadian provinces), you can enter the regional rate. For countries with unified national systems, only national-level tax is calculated.' },
  { q: 'Are pre-tax deductions included?', a: 'Yes. You can enter annual pre-tax contributions (pension, health insurance, retirement accounts) and the calculator will deduct them before calculating tax.' },
  { q: 'Is this financial advice?', a: 'No. This calculator is for informational purposes only. For personal financial decisions, consult a licensed accountant or financial adviser in your jurisdiction.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Salary Calculators by Country', description: 'Free salary calculators for multiple countries - take-home pay after tax and social contributions.', url: 'https://timegovern.com/salary' }

export default function SalaryHub() {
  useEffect(() => {
    document.title = 'Salary Calculators by Country - Take-Home Pay | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free salary calculators for multiple countries. Take-home pay after income tax, social contributions, and deductions.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])

  const countryEntries = Object.entries(COUNTRIES)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">{countryEntries.length} countries - Free - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <DollarSign className="h-10 w-10 md:h-14 md:w-14 text-emerald-300" />
              Salary Calculators
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Take-home pay after income tax, social contributions, and deductions - by country.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Choose your country</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {countryEntries.map(([code, c]) => (
              <Link key={code} to={`/salary/${code}`} className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors group">
                <div className="flex items-start gap-3">
                  <div className="text-3xl shrink-0">{c.flag}</div>
                  <div className="flex-1">
                    <h3 className="font-black mb-1 group-hover:text-emerald-500 transition-colors">{c.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{DESC[code] || `${c.region} - ${c.taxYear} tax year`}</p>
                    <div className="text-[11px] font-bold text-emerald-500 inline-flex items-center gap-1">Calculate take-home <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" /></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What each calculator shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Flag className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Country tax brackets</h3><p className="text-xs text-muted-foreground">Real official tax brackets - not a flat estimate.</p></CardContent></Card>
            <Card><CardContent className="p-5"><DollarSign className="h-5 w-5 text-teal-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Take-home pay</h3><p className="text-xs text-muted-foreground">Net annual and monthly after all deductions.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Sparkles className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Official source links</h3><p className="text-xs text-muted-foreground">Direct links to the tax authority and PDF tables.</p></CardContent></Card>
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
            <Link to="/mortgage" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <DollarSign className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">Mortgage Calculators</h3>
              <p className="text-xs text-muted-foreground">24 countries covered.</p>
            </Link>
            <Link to="/finance-tools" className="block rounded-xl border border-border bg-card hover:border-teal-400 p-5 transition-colors">
              <Sparkles className="h-5 w-5 text-teal-500 mb-2" />
              <h3 className="font-bold mb-1">Finance Tools</h3>
              <p className="text-xs text-muted-foreground">Compound interest and loans.</p>
            </Link>
            <Link to="/blog/how-tax-brackets-work" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Flag className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">How Tax Brackets Work</h3>
              <p className="text-xs text-muted-foreground">Marginal vs effective rate.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Salary Calculators'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Disclaimer:</strong> For informational purposes only. Not tax or financial advice.
        </div>
      </div>
    </>
  )
}