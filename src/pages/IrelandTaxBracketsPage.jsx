import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, ArrowRight, BookOpen, Calculator, Flag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the current tax-free allowance?', a: 'The standard allowance is published annually by the national tax authority and updated in our calculator.' },
  { q: 'What is the top tax rate?', a: 'The top marginal rate applies only to income above the highest bracket threshold - not to your entire income.' },
  { q: 'Does this include social contributions?', a: 'Yes - social contributions are calculated separately and shown in the results.' },
  { q: 'Where can I find official rates?', a: 'The official tax authority website is the definitive source. Our calculator links to it directly.' },
  { q: 'Is this tax advice?', a: 'No. For informational purposes only. Consult a licensed accountant for personal decisions.' },
  { q: 'How accurate is this calculator?', a: 'It uses official tax brackets for the current year. Results are estimates and depend on individual circumstances.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Ireland Income Tax Brackets 2025 Explained', description: 'Complete guide to Ireland tax and take-home pay.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/ireland-income-tax-brackets' }

export default function IrelandTaxBracketsPage() {
  useEffect(() => {
    document.title = 'Ireland Income Tax Brackets 2025 Explained | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Ireland Income Tax Brackets 2025 Explained - full breakdown with official rates and worked examples.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Ireland
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mb-4">
            <Flag className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Tax - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Ireland Income Tax Brackets 2025 Explained
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Complete breakdown of Ireland salary taxation with official rates and worked examples.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">How the system works</h2>
          <p className="text-muted-foreground">Ireland uses a progressive income tax system. Each tax bracket applies only to the income within that range - not your entire income. Your marginal rate is the rate on your last dollar; your effective rate is the average.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The brackets</h2>
          <p className="text-muted-foreground">The exact brackets are published annually by the tax authority and used directly in our calculator. See the calculator page for the current year figures.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Worked example</h2>
          <p className="text-muted-foreground">For a €60,000 gross salary: after the standard allowance and social contributions, the take-home amount is calculated automatically. Use our calculator below to see exact figures for your income.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Key points</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Progressive tax brackets - higher rates only apply above thresholds.</li>
            <li>Standard tax-free allowance reduces taxable income before tax applies.</li>
            <li>Social contributions (National Insurance, USC, PRSI) apply separately.</li>
            <li>Pre-tax deductions (pension, health insurance) reduce taxable income.</li>
            <li>Always verify against the official tax authority source.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Try the calculator</h2>
          <p className="text-muted-foreground">Our free Ireland salary calculator uses the official tax brackets for the current year and shows your exact take-home pay, effective tax rate, and monthly breakdown.</p>
        </div>

        <div className="my-8">
          <Link to="/salary" className="block rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-emerald-500 transition-colors">Open the calculator</h3>
                <p className="text-sm text-muted-foreground">Free salary calculators for 20+ countries.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title='Ireland Income Tax Brackets 2025 Explained' />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only. Not tax advice.
        </div>
      </div>
    </>
  )
}