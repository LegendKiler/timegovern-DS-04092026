import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, ArrowRight, BookOpen, Calculator, Flag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the current tax-free allowance in Canada?', a: 'The basic personal amount is set annually by the Canada Revenue Agency. Income below this threshold pays no federal income tax.' },
  { q: 'What is the top marginal tax rate?', a: 'The top federal rate applies only to income above the highest bracket threshold - not your entire income.' },
  { q: 'How are CPP and EI calculated?', a: 'CPP is 5.95% on pensionable earnings between \,500 and \,300. EI is 1.66% on insurable earnings up to \,700.' },
  { q: 'Does this include provincial tax?', a: 'You can enter your provincial rate separately for a more accurate estimate. Provincial rates vary from 0% in some provinces to over 25% in others.' },
  { q: 'Is this tax advice?', a: 'No. For informational purposes only. Consult a licensed accountant in Canada for personal decisions.' },
  { q: 'How accurate is this calculator?', a: 'It uses official federal tax brackets for the current year. Results are estimates and depend on individual circumstances.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Canada CPP and EI Explained', description: 'Complete guide to Canada taxation and take-home pay with official rates.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/canada-cpp-ei' }

export default function CanadaCPPEIPage() {
  useEffect(() => {
    document.title = 'Canada CPP and EI Explained | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Canada CPP and EI Explained - full breakdown with official rates and worked examples.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Canada
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mb-4">
            <Flag className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Tax - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Canada CPP and EI Explained
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Complete breakdown of Canada salary taxation with official rates and worked examples.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">How the system works</h2>
          <p className="text-muted-foreground">Canada has a two-tier tax system: federal brackets plus provincial or territorial brackets. Each tier has its own progressive brackets, and the totals are added together. CPP and EI apply on top.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Key features</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Federal progressive brackets plus provincial/territorial brackets</li>
            <li>Basic personal amount reducing taxable income</li>
            <li>CPP (Canada Pension Plan) contributions on employment income</li>
            <li>EI (Employment Insurance) premiums</li>
            <li>Pre-tax deductions (RRSP, health plans) reduce taxable income</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Worked example</h2>
          <p className="text-muted-foreground">For a typical salary: after the federal allowance, CPP, EI, and provincial tax, the take-home amount is calculated by our free <Link to="/salary" className="text-primary font-bold hover:underline">Canada salary calculator</Link>. Enter any income to see exact figures instantly.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Tips for Canada taxpayers</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>File your tax return every year - many people get refunds.</li>
            <li>Track deductible expenses throughout the year.</li>
            <li>Consider RRSP contributions to reduce taxable income.</li>
            <li>Check provincial-specific tax credits - they vary widely.</li>
          </ol>
        </div>

        <div className="my-8">
          <Link to="/salary" className="block rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-emerald-500 transition-colors">Open the Canada salary calculator</h3>
                <p className="text-sm text-muted-foreground">Free, instant, no signup.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/canada-income-tax-brackets" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Canada - continue reading</h3>
              <p className="text-xs text-muted-foreground">Next guide in the series.</p>
            </Link>
            <Link to="/blog/canada-take-home-pay" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Canada - deep dive</h3>
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title='Canada CPP and EI Explained' />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only. Not tax advice.
        </div>
      </div>
    </>
  )
}