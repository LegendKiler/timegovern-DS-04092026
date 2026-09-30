import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sigma, ArrowRight, BookOpen, Calculator, BarChart3, Percent } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What does standard deviation actually mean?', a: 'It is the average distance of each data point from the mean. A small SD means values cluster close to the average; a large SD means they are spread out.' },
  { q: 'What is a good standard deviation?', a: 'It has no universal answer - it depends on the mean. As a rough rule: SD under 10% of the mean is tight, 10-30% is moderate, above 30% is high variability.' },
  { q: 'Can standard deviation be negative?', a: 'No. SD is the square root of variance, which is always non-negative. The minimum possible value is 0 - which means every value is identical.' },
  { q: 'What is the 68-95-99.7 rule?', a: 'In a normal distribution: 68% of values fall within 1 SD of the mean, 95% within 2 SDs, and 99.7% within 3 SDs. This is called the empirical rule.' },
  { q: 'Standard deviation vs variance - what is the difference?', a: 'Variance is SD squared. Both measure spread, but SD is in the same units as the data (easier to interpret). Variance is used in further calculations.' },
  { q: 'What is the difference between population and sample SD?', a: 'Population SD divides by n (you have all data). Sample SD divides by (n-1), which gives a slightly larger value to correct for the fact that you only have a subset.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'What Is Standard Deviation? A Complete Guide', description: 'Standard deviation explained - what it measures, how to interpret it, and why it matters for statistics.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/what-is-standard-deviation' }

export default function WhatIsStandardDeviationPage() {
  useEffect(() => {
    document.title = 'What Is Standard Deviation? A Complete Guide | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Standard deviation explained - what it measures, how to interpret it, and why it matters for statistics.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / What Is Standard Deviation?
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <Sigma className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Statistics - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            What Is Standard Deviation?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The single most important measure of spread - and how to interpret it in plain English.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The one-sentence definition</h2>
          <p className="text-muted-foreground">Standard deviation (SD) is the average distance of each data point from the mean. It tells you how spread out the numbers are.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">A simple example</h2>
          <p className="text-muted-foreground">Two data sets with the same mean but different SDs:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Set A:</strong> 48, 49, 50, 51, 52 → mean = 50, SD = 1.41 (tight)</li>
            <li><strong>Set B:</strong> 10, 30, 50, 70, 90 → mean = 50, SD = 28.28 (spread out)</li>
          </ul>
          <p className="text-muted-foreground">Both average to 50, but Set A is clustered tightly while Set B is spread across a wide range. SD captures this difference in a single number.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Why SD matters</h2>
          <p className="text-muted-foreground">The mean alone tells you the center, but not the shape. Two stocks can have the same average return, but the one with higher SD is riskier. Two exam scores can share a mean, but the class with higher SD has more variability in ability.</p>
          <p className="text-muted-foreground">SD is used in finance (risk), science (measurement error), quality control (consistency), and sports (consistency of performance).</p>

          <h2 className="text-2xl font-black mt-8 mb-3">How to calculate SD</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Find the mean (average) of all values.</li>
            <li>Subtract the mean from each value, then square the result.</li>
            <li>Sum all squared differences.</li>
            <li>Divide by n (population) or n-1 (sample) to get variance.</li>
            <li>Take the square root → standard deviation.</li>
          </ol>
          <p className="text-muted-foreground">Or use our <Link to="/standard-deviation-calculator" className="text-primary font-bold hover:underline">Standard Deviation Calculator</Link> - paste any data set and get both values instantly.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Population vs sample SD</h2>
          <p className="text-muted-foreground">The only difference is the denominator:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Population SD (σ):</strong> Divide by n. Use when you have data for the whole group.</li>
            <li><strong>Sample SD (s):</strong> Divide by n-1. Use when you have a subset of a larger group.</li>
          </ul>
          <p className="text-muted-foreground">Sample SD is slightly larger to correct for the fact that a sample tends to underestimate true variability. For large samples (n &gt; 30), the two are almost identical.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The 68-95-99.7 rule</h2>
          <p className="text-muted-foreground">In a normal distribution, the SD tells you where the data lies:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>~68% of values fall within 1 SD of the mean</li>
            <li>~95% fall within 2 SDs</li>
            <li>~99.7% fall within 3 SDs</li>
          </ul>
          <p className="text-muted-foreground">So if the mean is 100 and SD is 15 (like IQ scores), about 68% of scores fall between 85 and 115, and 95% between 70 and 130.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Standard deviation vs variance</h2>
          <p className="text-muted-foreground">Variance is SD squared. Both measure spread, but they are used differently:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>SD</strong> is in the same units as the data (easier to interpret).</li>
            <li><strong>Variance</strong> is in squared units (used in more advanced statistics, like ANOVA).</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Interpreting SD in practice</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Finance:</strong> higher SD = higher risk. Compare SDs of two stocks to compare volatility.</li>
            <li><strong>Sports:</strong> SD of scoring measures consistency. Lower SD = more consistent performance.</li>
            <li><strong>Quality control:</strong> SD of product dimensions measures manufacturing precision.</li>
            <li><strong>Education:</strong> SD of test scores reveals the range of student ability.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The bottom line</h2>
          <p className="text-muted-foreground">Standard deviation is the single most useful measure of spread. If the mean tells you where, SD tells you how tightly clustered. Both numbers together describe a data set fully.</p>
        </div>

        <div className="my-8">
          <Link to="/standard-deviation-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Calculate standard deviation</h3>
                <p className="text-sm text-muted-foreground">Paste any data set - instant results.</p>
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
            <Link to="/blog/population-vs-sample-standard-deviation" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BarChart3 className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Population vs Sample SD</h3>
              <p className="text-xs text-muted-foreground">Which one to use when.</p>
            </Link>
            <Link to="/blog/how-to-calculate-variance" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Percent className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Calculate Variance</h3>
              <p className="text-xs text-muted-foreground">Step-by-step.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'What Is Standard Deviation?'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}