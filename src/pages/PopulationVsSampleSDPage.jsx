import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, ArrowRight, BookOpen, Calculator, Sigma } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the difference between population and sample SD?', a: 'Population SD divides variance by n; sample SD divides by n-1. The sample formula gives a slightly larger value to correct for the fact that a subset underestimates true variability.' },
  { q: 'Which one should I use?', a: 'Use population SD if you have data for the entire group (e.g. every student in a class). Use sample SD if you have data for a subset of a larger group (e.g. 100 customers out of 10,000).' },
  { q: 'Why does the sample SD use n-1?', a: 'Because using n in a sample underestimates the true population variance. Dividing by n-1 (Bessel\'s correction) makes the sample variance an unbiased estimator.' },
  { q: 'Do they give different answers?', a: 'Yes, but the difference is small for large samples. For n = 30, the sample SD is about 1.7% larger than the population SD. For n = 1000, they are effectively identical.' },
  { q: 'Which symbol is used for each?', a: 'Population SD: σ (sigma). Sample SD: s. Population variance: σ². Sample variance: s².' },
  { q: 'Which one do calculators show?', a: 'Most calculators show both. Our Standard Deviation Calculator shows population SD, sample SD, and both variances at once.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Population vs Sample Standard Deviation: Which to Use', description: 'Population vs sample standard deviation explained - the formulas, when to use each, and why the difference exists.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/population-vs-sample-standard-deviation' }

export default function PopulationVsSampleSDPage() {
  useEffect(() => {
    document.title = 'Population vs Sample Standard Deviation: Which to Use | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Population vs sample standard deviation - the formulas, when to use each, and why the n-1 denominator matters.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Population vs Sample SD
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <BarChart3 className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Statistics - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Population vs Sample Standard Deviation
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            One divides by n. The other divides by n-1. Here is when each is correct.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The formulas</h2>
          <p className="text-muted-foreground"><strong>Population SD (σ):</strong></p>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-sm">
            σ = √( Σ(xᵢ − μ)² / N )
          </p>
          <p className="text-muted-foreground"><strong>Sample SD (s):</strong></p>
          <p className="text-muted-foreground font-mono bg-muted p-3 rounded-lg text-sm">
            s = √( Σ(xᵢ − x̄)² / (n−1) )
          </p>
          <p className="text-muted-foreground">The only difference is the denominator. Population divides by N (total count); sample divides by n-1.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">When to use population SD</h2>
          <p className="text-muted-foreground">Use population SD when you have data for <strong>every member</strong> of the group:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Test scores for an entire class of 25 students</li>
            <li>Monthly revenue for a business - every month is in the data</li>
            <li>Heights of all players on a specific team</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">When to use sample SD</h2>
          <p className="text-muted-foreground">Use sample SD when you have data for <strong>a subset</strong> of a larger group:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Survey responses from 500 of 100,000 customers</li>
            <li>Sample of 100 products from a factory production line</li>
            <li>Measurements from 20 participants in a research study</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Why n-1 instead of n?</h2>
          <p className="text-muted-foreground">A sample tends to be less variable than the population it comes from, because the sample mean sits closer to the sample data than the true population mean does. Using n in the denominator systematically underestimates the true population variance.</p>
          <p className="text-muted-foreground">Dividing by n-1 corrects this bias. The result is called an <strong>unbiased estimator</strong>. This adjustment is known as <strong>Bessel&apos;s correction</strong>.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">How much does it matter?</h2>
          <p className="text-muted-foreground">The difference shrinks as sample size grows:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>n = 5: sample SD is about 12% larger</li>
            <li>n = 10: about 5% larger</li>
            <li>n = 30: about 1.7% larger</li>
            <li>n = 100: about 0.5% larger</li>
            <li>n = 1000: essentially identical</li>
          </ul>
          <p className="text-muted-foreground">For small samples, always use sample SD. For large samples, the choice rarely matters.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Symbols to remember</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>μ (mu) - population mean</li>
            <li>x̄ (x-bar) - sample mean</li>
            <li>σ (sigma) - population SD</li>
            <li>s - sample SD</li>
            <li>σ² - population variance</li>
            <li>s² - sample variance</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Using a calculator</h2>
          <p className="text-muted-foreground">The <Link to="/standard-deviation-calculator" className="text-primary font-bold hover:underline">Standard Deviation Calculator</Link> shows both values at once, so you never have to guess which one to report.</p>
        </div>

        <div className="my-8">
          <Link to="/standard-deviation-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">See both SD values</h3>
                <p className="text-sm text-muted-foreground">Population + sample side by side.</p>
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
            <Link to="/blog/how-to-calculate-variance" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Sigma className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Calculate Variance</h3>
              <p className="text-xs text-muted-foreground">Step-by-step.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Population vs Sample Standard Deviation'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}