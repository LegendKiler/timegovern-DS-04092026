import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, ArrowRight, BookOpen, Calculator, Scale } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the main difference between simple and compound interest?', a: 'Simple interest is calculated only on the original principal. Compound interest is calculated on principal plus accumulated interest, so it grows exponentially rather than linearly.' },
  { q: 'Which is better for saving?', a: 'Compound interest, always. For any long time horizon, compound interest massively outperforms simple interest. The gap widens with every passing year.' },
  { q: 'Where is simple interest used?', a: 'Simple interest is common in short-term loans, car loans, and some bonds. It is simpler to calculate and easier for borrowers to understand.' },
  { q: 'Where is compound interest used?', a: 'Savings accounts, retirement accounts, credit cards, mortgages, and most investments use compound interest. It is the default in modern finance.' },
  { q: 'How much difference does compounding make over 30 years?', a: 'At 7% annually, $10,000 grows to $31,000 with simple interest and $76,000 with compound interest. That is $45,000 more from the same starting amount.' },
  { q: 'Is compound interest always better?', a: 'For saving, yes. For borrowing, no - compound interest on debt works against you and grows fast. Always prioritise paying off compounding debt.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Compound Interest vs Simple Interest: The Complete Comparison', description: 'The exact difference between simple and compound interest, with real numbers over 10, 20, and 30 years.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/compound-interest-vs-simple-interest' }

export default function CompoundVsSimplePage() {
  useEffect(() => {
    document.title = 'Compound Interest vs Simple Interest: The Complete Comparison | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Simple vs compound interest explained with real numbers. See the exact difference over 10, 20, and 30 years - and why it matters.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Compound vs Simple Interest
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mb-4">
            <Scale className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Finance - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Compound Interest vs Simple Interest
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Same principal. Same rate. Same years. Wildly different outcome. Here is exactly why compound interest wins - and by how much.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The two formulas</h2>
          <p className="text-muted-foreground"><strong>Simple interest:</strong> A = P(1 + rt)</p>
          <p className="text-muted-foreground"><strong>Compound interest:</strong> A = P(1 + r/n)<sup>nt</sup></p>
          <p className="text-muted-foreground">Both have the same inputs. The difference is that compound interest feeds interest back into the calculation, while simple interest pays it out and never reinvests.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The same $10,000 at 7% - compared</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-black">Years</th>
                  <th className="p-3 text-right font-black">Simple</th>
                  <th className="p-3 text-right font-black">Compound</th>
                  <th className="p-3 text-right font-black">Difference</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">10</td><td className="p-3 text-right">$17,000</td><td className="p-3 text-right">$19,672</td><td className="p-3 text-right font-bold text-emerald-600">+$2,672</td></tr>
                <tr className="border-t border-border"><td className="p-3">20</td><td className="p-3 text-right">$24,000</td><td className="p-3 text-right">$38,697</td><td className="p-3 text-right font-bold text-emerald-600">+$14,697</td></tr>
                <tr className="border-t border-border"><td className="p-3">30</td><td className="p-3 text-right">$31,000</td><td className="p-3 text-right">$76,123</td><td className="p-3 text-right font-bold text-emerald-600">+$45,123</td></tr>
                <tr className="border-t border-border"><td className="p-3">40</td><td className="p-3 text-right">$38,000</td><td className="p-3 text-right">$149,745</td><td className="p-3 text-right font-bold text-emerald-600">+$111,745</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground">Look at the shape. The gap between simple and compound interest widens dramatically over time. Over 40 years, compound interest returns <strong>4x the starting principal</strong> more than simple interest.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Why compounding frequency matters</h2>
          <p className="text-muted-foreground">Compound interest is not one thing - it depends on how often interest is added back. Same $10,000 at 7% over 30 years:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Annually:</strong> $76,123</li>
            <li><strong>Monthly:</strong> $80,917</li>
            <li><strong>Daily:</strong> $81,586</li>
            <li><strong>Continuously:</strong> $81,646 (theoretical maximum)</li>
          </ul>
          <p className="text-muted-foreground">More frequent compounding is better, but with diminishing returns. Monthly compounding captures roughly 96% of the continuous-compounding maximum. Annual captures about 93%.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Where each type shows up in real life</h2>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <Card>
              <CardContent className="p-5">
                <h3 className="font-black mb-3 text-base text-emerald-600">Simple interest</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                  <li>Car loans</li>
                  <li>Most personal loans</li>
                  <li>Some bonds</li>
                  <li>Short-term notes</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h3 className="font-black mb-3 text-base text-indigo-600">Compound interest</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                  <li>Savings accounts</li>
                  <li>Retirement accounts</li>
                  <li>Credit card debt</li>
                  <li>Mortgages</li>
                  <li>Most investments</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">The takeaway</h2>
          <p className="text-muted-foreground">For saving and investing, compound interest is always better. For borrowing, compound interest always works against you - which is why paying off credit card debt (typically 20%+ APR, compounding daily) should always be the first financial priority.</p>
          <p className="text-muted-foreground">Use our <Link to="/compound-interest-calculator" className="text-primary font-bold hover:underline">Compound Interest Calculator</Link> to see what your own numbers look like over any time horizon.</p>
        </div>

        <div className="my-8">
          <Link to="/compound-interest-calculator" className="block rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-emerald-500 transition-colors">Run the numbers yourself</h3>
                <p className="text-sm text-muted-foreground">Free compound interest calculator - instant results.</p>
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

        <div>
          <h2 className="text-2xl font-black mb-5">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/what-is-compound-interest" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">What Is Compound Interest?</h3>
              <p className="text-xs text-muted-foreground">The complete beginner's guide.</p>
            </Link>
            <Link to="/blog/how-to-calculate-compound-interest" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Calculator className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Calculate Compound Interest</h3>
              <p className="text-xs text-muted-foreground">Step-by-step with real examples.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Compound vs Simple Interest'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Disclaimer:</strong> For informational purposes only. Not financial advice.
        </div>
      </div>
    </>
  )
}