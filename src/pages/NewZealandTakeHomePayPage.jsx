import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, ArrowRight, BookOpen, Calculator, Flag, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the current tax-free threshold in New Zealand?', a: 'The tax-free threshold is set by the national tax authority each year. Income below this amount pays no income tax. See the calculator for the current figure.' },
  { q: 'What is the top marginal tax rate?', a: 'The top rate applies only to income above the highest bracket threshold - not your entire income.' },
  { q: 'How are social contributions calculated?', a: 'Social contributions are separate from income tax and applied at country-specific rates.' },
  { q: 'Where can I find official rates?', a: 'The national tax authority is the definitive source. Our calculator links to it directly.' },
  { q: 'Is this tax advice?', a: 'No. For informational purposes only. Consult a licensed accountant in New Zealand for personal decisions.' },
  { q: 'How accurate is this calculator?', a: 'It uses official tax brackets for the current year. Results are estimates and depend on individual circumstances.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'New Zealand Take-Home Pay: Gross vs Net Salary', description: 'Complete guide to New Zealand taxation and take-home pay with official rates.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/new-zealand-take-home-pay' }

export default function NewZealandTakeHomePayPage() {
  useEffect(() => {
    document.title = 'New Zealand Take-Home Pay: Gross vs Net Salary | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'New Zealand Take-Home Pay: Gross vs Net Salary - full breakdown with official rates and worked examples.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / New Zealand
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mb-4">
            <Flag className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Tax - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            New Zealand Take-Home Pay: Gross vs Net Salary
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Complete breakdown of New Zealand salary taxation with official rates and worked examples.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">How the system works</h2>
          <p className="text-muted-foreground">New Zealand uses a progressive income tax system. Each bracket applies only to the income within that range - not your entire income. Your marginal rate is the rate on your last dollar; your effective rate is the average across all income.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Key features</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Progressive tax brackets with multiple marginal rates</li>
            <li>Standard tax-free threshold reducing taxable income</li>
            <li>Social contributions calculated separately from income tax</li>
            <li>Pre-tax deductions (retirement, health) reduce taxable income</li>
            <li>Always verify against the official tax authority source</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Worked example</h2>
          <p className="text-muted-foreground">For a typical salary: after the standard allowance and social contributions, take-home pay is calculated automatically by our free <Link to="/salary" className="text-primary font-bold hover:underline">New Zealand salary calculator</Link>. Enter any income to see exact figures instantly.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Tips for New Zealand taxpayers</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Always file your annual tax return - many people get refunds.</li>
            <li>Track deductible expenses throughout the year.</li>
            <li>Consider pre-tax contributions to reduce taxable income.</li>
            <li>Verify rates annually - tax law changes.</li>
          </ol>
        </div>

        <div className="my-8">
          <Link to="/salary" className="block rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-emerald-500 transition-colors">Open the New Zealand salary calculator</h3>
                <p className="text-sm text-muted-foreground">Free, instant, no signup.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/new-zealand-income-tax-brackets" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">New Zealand - continue reading</h3>
              <p className="text-xs text-muted-foreground">Next guide in the series.</p>
            </Link>
            <Link to="/blog/new-zealand-acc-levy" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">New Zealand - deep dive</h3>
              <p className="text-xs text-muted-foreground">Full breakdown.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title='New Zealand Take-Home Pay: Gross vs Net Salary' />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only. Not tax advice.
        </div>
      </div>
    </>
  )
}