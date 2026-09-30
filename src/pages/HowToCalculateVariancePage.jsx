import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Percent, ArrowRight, BookOpen, Calculator, Sigma, BarChart3 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is variance?', a: 'Variance is the average of squared distances from the mean. It is standard deviation squared. Both measure spread, but variance is in squared units.' },
  { q: 'How do I calculate variance?', a: 'Find the mean, subtract it from each value and square the result, then average those squared differences. For a population, divide by N. For a sample, divide by n-1.' },
  { q: 'Why do we square the differences?', a: 'Because positive and negative deviations cancel out if we do not. Squaring makes all deviations positive. It also gives more weight to extreme values.' },
  { q: 'Why take the square root for SD?', a: 'To get back to the original units. Variance is in squared units (e.g. dollars²), which is hard to interpret. SD is in the original units.' },
  { q: 'What does a variance of 0 mean?', a: 'Every value in the data set is identical. There is zero spread.' },
  { q: 'Can variance be negative?', a: 'No. Squared differences are always non-negative, so variance is always ≥ 0.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Calculate Variance (Step-by-Step)', description: 'Variance explained step by step - what it measures, the formulas, and how to calculate it manually or with a calculator.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-to-calculate-variance' }

export default function HowToCalculateVariancePage() {
  useEffect(() => {
    document.title = 'How to Calculate Variance (Step-by-Step) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How to calculate variance step by step - population and sample formulas, worked examples, and the relationship with standard deviation.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How to Calculate Variance
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <Percent className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Statistics - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How to Calculate Variance
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The step between mean and standard deviation - and why the squaring matters.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">What variance measures</h2>
          <p className="text-muted-foreground">Variance is the average of squared distances from the mean. It quantifies how spread out a data set is, but in squared units. (Standard deviation is the square root of variance, giving the same measure in original units.)</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Population variance formula</h2>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-sm">
            σ² = Σ(xᵢ − μ)² / N
          </p>
          <p className="text-muted-foreground">Where N is the total number of values and μ is the population mean.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Sample variance formula</h2>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-sm">
            s² = Σ(xᵢ − x̄)² / (n−1)
          </p>
          <p className="text-muted-foreground">The only difference: divide by n-1 instead of n. Use this when your data is a subset of a larger group.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Worked example</h2>
          <p className="text-muted-foreground">Data set: 4, 8, 6, 5, 3</p>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Mean:</strong> (4 + 8 + 6 + 5 + 3) / 5 = 26/5 = 5.2</li>
            <li><strong>Deviations:</strong> 4−5.2 = −1.2, 8−5.2 = 2.8, 6−5.2 = 0.8, 5−5.2 = −0.2, 3−5.2 = −2.2</li>
            <li><strong>Squared deviations:</strong> 1.44, 7.84, 0.64, 0.04, 4.84</li>
            <li><strong>Sum of squares:</strong> 1.44 + 7.84 + 0.64 + 0.04 + 4.84 = 14.8</li>
            <li><strong>Population variance:</strong> 14.8 / 5 = <strong>2.96</strong></li>
            <li><strong>Sample variance:</strong> 14.8 / 4 = <strong>3.7</strong></li>
            <li><strong>Standard deviation:</strong> √2.96 ≈ 1.72 (population); √3.7 ≈ 1.92 (sample)</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">Why square the differences?</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Positive and negative deviations cancel out if added directly (sum = 0 always).</li>
            <li>Squaring makes every deviation positive, so they can be summed meaningfully.</li>
            <li>Squaring gives more weight to extreme values - useful in finance for risk analysis.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Variance vs standard deviation</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Variance</strong> is in squared units (e.g. $² if the data is dollars).</li>
            <li><strong>SD</strong> is in original units - easier to interpret and communicate.</li>
            <li><strong>Variance</strong> is used in deeper statistical tests (ANOVA, regression, portfolio theory).</li>
            <li><strong>SD</strong> is used in reporting and simple comparisons.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Use a calculator</h2>
          <p className="text-muted-foreground">The <Link to="/standard-deviation-calculator" className="text-primary font-bold hover:underline">Standard Deviation Calculator</Link> shows variance (both population and sample) alongside SD and summary stats. Paste any data set and get all results instantly.</p>
        </div>

        <div className="my-8">
          <Link to="/standard-deviation-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Calculate variance + SD</h3>
                <p className="text-sm text-muted-foreground">Both values, instant results.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-indigo-500 group-hover:translate-x-1 transition-transform" />
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
            <Link to="/blog/what-is-standard-deviation" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">What Is Standard Deviation?</h3>
              <p className="text-xs text-muted-foreground">The complete guide.</p>
            </Link>
            <Link to="/blog/population-vs-sample-standard-deviation" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BarChart3 className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Population vs Sample SD</h3>
              <p className="text-xs text-muted-foreground">Which one to use.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How to Calculate Variance'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}