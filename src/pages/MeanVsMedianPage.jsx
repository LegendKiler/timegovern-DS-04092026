import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, ArrowRight, BookOpen, Calculator, Sigma } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the difference between mean and median?', a: 'Mean is the arithmetic average (sum/count). Median is the middle value when the data is sorted. The mean is affected by outliers; the median is not.' },
  { q: 'When should I use median instead of mean?', a: 'Use median when data is skewed or has outliers - income, house prices, response times. Use mean when data is evenly distributed.' },
  { q: 'Can mean and median be the same?', a: 'Yes, in symmetric distributions. In a normal distribution, mean = median = mode.' },
  { q: 'Which does the median ignore?', a: 'The median ignores the actual magnitudes of extreme values. Example: (1, 2, 3, 1000, 10000) has median 3, regardless of how large the outliers are.' },
  { q: 'What is better for salary data?', a: 'Median. A single billionaire CEO can double the mean salary of a company but the median tells you what the typical worker actually earns.' },
  { q: 'What is skewed data?', a: 'Data where values cluster on one side. Income data is right-skewed (a few very high earners). Test scores can be left-skewed (a few very low performers).' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Mean vs Median: Which One Should You Use?', description: 'Mean vs median explained - when each is useful, why outliers matter, and how to choose for real data.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/mean-vs-median' }

export default function MeanVsMedianPage() {
  useEffect(() => {
    document.title = 'Mean vs Median: Which One Should You Use? | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Mean vs median explained - when each is useful, why outliers matter, and how to choose for real data.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Mean vs Median
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <BarChart3 className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Statistics - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Mean vs Median
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            One number is being used where the other should be. Here is how to choose.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The two averages</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Mean</strong> - sum divided by count. The arithmetic average.</li>
            <li><strong>Median</strong> - the middle value when data is sorted.</li>
          </ul>
          <p className="text-muted-foreground">Both describe a "typical" value, but they behave very differently with outliers.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The outlier problem</h2>
          <p className="text-muted-foreground">Consider five salaries: $40k, $45k, $50k, $55k, $5,000,000.</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Mean</strong> = $1,038,000 (skewed by the CEO)</li>
            <li><strong>Median</strong> = $50,000 (the true middle salary)</li>
          </ul>
          <p className="text-muted-foreground">The mean tells you nothing about what a typical worker earns. The median does.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">When to use each</h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr><th className="p-3 text-left font-black">Use case</th><th className="p-3 text-left font-black">Best measure</th></tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="p-3">Salary / income</td><td className="p-3 font-bold">Median</td></tr>
                <tr className="border-t border-border"><td className="p-3">House prices</td><td className="p-3 font-bold">Median</td></tr>
                <tr className="border-t border-border"><td className="p-3">Test scores</td><td className="p-3 font-bold">Mean</td></tr>
                <tr className="border-t border-border"><td className="p-3">Response times</td><td className="p-3 font-bold">Median</td></tr>
                <tr className="border-t border-border"><td className="p-3">Symmetric distributions</td><td className="p-3 font-bold">Either (equal)</td></tr>
                <tr className="border-t border-border"><td className="p-3">Skewed data</td><td className="p-3 font-bold">Median</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">Where mean is better</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Every data point matters equally.</li>
            <li>Data is symmetric (bell curve).</li>
            <li>You need to do further math (variance, regression).</li>
            <li>You want the total to be conserved: sum = mean × n.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Where median is better</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Data has outliers or is skewed.</li>
            <li>You want to describe the "typical" case.</li>
            <li>Extreme values should not dominate the picture.</li>
            <li>You want robust statistics - less affected by noise.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Real-world examples</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Median income</strong> - what the typical household earns.</li>
            <li><strong>Median house price</strong> - what a typical house costs (mean is skewed by mansions).</li>
            <li><strong>Mean test score</strong> - what a class averaged (no extreme outliers expected).</li>
            <li><strong>Median response time</strong> - how fast a typical user gets served (a few slow responses would skew mean).</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The bottom line</h2>
          <p className="text-muted-foreground">Use mean when the data is symmetric or every value matters equally. Use median when the data has outliers or is skewed. When in doubt about income, house prices, or response times - always median.</p>
          <p className="text-muted-foreground">Our <Link to="/average-calculator" className="text-primary font-bold hover:underline">Average Calculator</Link> gives you both instantly, so you can compare.</p>
        </div>

        <div className="my-8">
          <Link to="/average-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Compare mean and median</h3>
                <p className="text-sm text-muted-foreground">Any data set - instant results.</p>
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
            <Link to="/blog/how-to-calculate-mean" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Calculate the Mean</h3>
              <p className="text-xs text-muted-foreground">Formula and examples.</p>
            </Link>
            <Link to="/blog/what-is-standard-deviation" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Sigma className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">What Is Standard Deviation?</h3>
              <p className="text-xs text-muted-foreground">Measure of spread.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Mean vs Median'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}