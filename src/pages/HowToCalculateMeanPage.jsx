import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, ArrowRight, BookOpen, Calculator, Sigma } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How do I calculate the mean?', a: 'Add all values together, then divide by how many values there are. Example: (4+8+6+5+3)/5 = 5.2.' },
  { q: 'What is the difference between mean and average?', a: 'In everyday usage, they mean the same thing. Strictly, "average" is a category that includes mean, median, and mode.' },
  { q: 'When is the mean misleading?', a: 'When the data has outliers or is skewed. Example: one billionaire raises the average income of a whole city, but does not change the median.' },
  { q: 'How is the mean written mathematically?', a: 'As x̄ (x-bar), or as the Greek letter μ (mu) for a population mean. The formula is x̄ = Σx / n.' },
  { q: 'Can the mean be negative?', a: 'Yes. If the sum of your values is negative, the mean is negative. Example: (-3, -5, -7) has mean -5.' },
  { q: 'What is a weighted mean?', a: 'An average where each value is multiplied by a weight. Example: final grade = 0.6 × exam + 0.4 × homework.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Calculate the Mean (Average)', description: 'The mean explained - formula, worked examples, when to use it, and when the median is a better choice.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-to-calculate-mean' }

export default function HowToCalculateMeanPage() {
  useEffect(() => {
    document.title = 'How to Calculate the Mean (Average) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How to calculate the mean - formula, worked examples, when to use it, and when median is better.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How to Calculate the Mean
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <BarChart3 className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Math - 4 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How to Calculate the Mean
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The most common statistic - and the one people misuse most often.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The formula</h2>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-center">
            x̄ = Σx / n
          </p>
          <p className="text-muted-foreground">Where Σx is the sum of all values and n is how many values there are.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Worked example</h2>
          <p className="text-muted-foreground">Data: 4, 8, 6, 5, 3</p>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Add them: 4 + 8 + 6 + 5 + 3 = 26</li>
            <li>Count them: 5</li>
            <li>Divide: 26 / 5 = <strong>5.2</strong></li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">When the mean is useful</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Data is evenly distributed (no extreme outliers).</li>
            <li>You want a single number that "represents" the group.</li>
            <li>You need to do further math (variance, regression, etc.).</li>
            <li>All values matter equally and should be counted.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">When the mean misleads</h2>
          <p className="text-muted-foreground">The mean is very sensitive to outliers. Example:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Salaries in a team: $40k, $45k, $50k, $55k, $5,000,000 (CEO)</li>
            <li>Mean = $1,038,000</li>
            <li>But nobody on the team earns anywhere near that. The median ($50k) is the more useful number.</li>
          </ul>
          <p className="text-muted-foreground">This is why income reports use median, not mean.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Mean vs median vs mode</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Mean:</strong> arithmetic average. Sensitive to outliers.</li>
            <li><strong>Median:</strong> middle value when sorted. Resistant to outliers.</li>
            <li><strong>Mode:</strong> most frequent value. Useful for categorical data.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Weighted mean</h2>
          <p className="text-muted-foreground">When values have different importance, use a weighted mean:</p>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-center text-sm">
            x̄ = Σ(wᵢ × xᵢ) / Σwᵢ
          </p>
          <p className="text-muted-foreground">Example: final grade = (60% × exam score) + (40% × homework). If exam = 80 and homework = 90, weighted mean = 84.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Mean in different contexts</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Physics:</strong> average velocity = total distance / total time.</li>
            <li><strong>Finance:</strong> average return over a period (arithmetic mean).</li>
            <li><strong>Sports:</strong> batting average, points per game.</li>
            <li><strong>Education:</strong> GPA is a weighted mean of course grades.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Try it</h2>
          <p className="text-muted-foreground">Our <Link to="/average-calculator" className="text-primary font-bold hover:underline">Average Calculator</Link> computes mean, median, and mode together - instant, no signup.</p>
        </div>

        <div className="my-8">
          <Link to="/average-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Calculate the mean</h3>
                <p className="text-sm text-muted-foreground">Any data set - instant mean, median, mode.</p>
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
            <Link to="/blog/mean-vs-median" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Mean vs Median</h3>
              <p className="text-xs text-muted-foreground">Which one to use when.</p>
            </Link>
            <Link to="/blog/what-is-standard-deviation" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Sigma className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">What Is Standard Deviation?</h3>
              <p className="text-xs text-muted-foreground">The measure of spread.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How to Calculate the Mean'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}