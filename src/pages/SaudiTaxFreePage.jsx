import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, ArrowRight, BookOpen, Calculator, Flag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Does Saudi Arabia have income tax?', a: 'No. Saudi Arabia does not levy personal income tax on salaries. This makes take-home pay approximately equal to gross salary for most employees.' },
  { q: 'What deductions apply to Saudi Arabia salaries?', a: 'For most expat employees, no mandatory deductions apply. National citizens may pay social insurance contributions through GOSI or equivalent schemes.' },
  { q: 'How much can I save working in Saudi Arabia?', a: 'Because take-home is close to gross, expats typically save significantly compared to home countries with high tax rates. Actual savings depend on lifestyle and rent costs.' },
  { q: 'Is this tax advice?', a: 'No. For informational purposes only. Consult a licensed accountant in Saudi Arabia for personal decisions.' },
  { q: 'Do I need to file a tax return?', a: 'For employees, usually not - tax is withheld at source or not applicable. Business owners and freelancers may have different obligations.' },
  { q: 'How accurate is this calculator?', a: 'It uses current official contribution rates. Results are estimates and depend on individual circumstances.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Saudi Arabia Salary Calculator: 0% Income Tax', description: 'Complete guide to Saudi Arabia salary and take-home pay.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/saudi-arabia-0-percent-income-tax' }

export default function SaudiTaxFreePage() {
  useEffect(() => {
    document.title = 'Saudi Arabia Salary Calculator: 0% Income Tax | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Saudi Arabia Salary Calculator: 0% Income Tax - complete guide with official rates.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Saudi Arabia
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mb-4">
            <Flag className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Tax - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Saudi Arabia Salary Calculator: 0% Income Tax
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Complete breakdown of Saudi Arabia salary taxation and take-home pay.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The headline fact</h2>
          <p className="text-muted-foreground">Saudi Arabia does not levy personal income tax. This is one of the main reasons expats move there. Take-home pay is effectively your gross salary minus any social contributions that apply.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">What you keep</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>No personal income tax on salaries</li>
            <li>Social contributions only apply to national citizens (not most expats)</li>
            <li>No capital gains tax on personal investments</li>
            <li>No inheritance tax</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">What to watch</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Cost of living - especially rent in major cities</li>
            <li>VAT (5-10% depending on country)</li>
            <li>Corporate tax if self-employed</li>
            <li>Home country tax obligations (US citizens, for example)</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Try the calculator</h2>
          <p className="text-muted-foreground">Our free <Link to="/salary" className="text-primary font-bold hover:underline">Saudi Arabia salary calculator</Link> shows your exact take-home, effective tax rate, and monthly figures.</p>
        </div>

        <div className="my-8">
          <Link to="/salary" className="block rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-emerald-500 transition-colors">Open the Saudi Arabia salary calculator</h3>
                <p className="text-sm text-muted-foreground">Free, instant, no signup.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/saudi-arabia-take-home-pay" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Saudi Arabia - continue reading</h3>
              <p className="text-xs text-muted-foreground">Next guide in the series.</p>
            </Link>
            <Link to="/blog/saudi-arabia-gosi" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Saudi Arabia - deep dive</h3>
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title='Saudi Arabia Salary Calculator: 0% Income Tax' />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only. Not tax advice.
        </div>
      </div>
    </>
  )
}