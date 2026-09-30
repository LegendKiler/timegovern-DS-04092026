import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sigma, Sparkles, BookOpen, Calculator, Percent, BarChart3, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import StandardDeviationCalculator from '../components/StandardDeviationCalculator'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is standard deviation?', a: 'A measure of how spread out numbers are from the mean. A low standard deviation means the values cluster near the average; a high standard deviation means they are spread out over a wider range.' },
  { q: 'What is the difference between population and sample standard deviation?', a: 'Population SD divides by n and is used when you have data for the entire group. Sample SD divides by (n-1) and is used when you only have a subset - it is slightly larger to account for uncertainty.' },
  { q: 'When should I use each?', a: 'Use population SD when your data is the complete set (e.g. test scores for an entire class). Use sample SD when your data is a subset of a larger group (e.g. survey results from 100 of 10,000 customers).' },
  { q: 'What is variance?', a: 'Variance is standard deviation squared. It measures the same thing but in squared units. Variance is often used in further statistical tests (like ANOVA) because it has nicer mathematical properties.' },
  { q: 'What is a good standard deviation?', a: 'It depends on context. As a rule of thumb, if the SD is less than 10-15% of the mean, values are tightly clustered. Above 30% suggests high variability.' },
  { q: 'How do I interpret standard deviation?', a: 'In a normal distribution, about 68% of values fall within 1 SD of the mean, 95% within 2 SDs, and 99.7% within 3 SDs. This is called the empirical rule.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Standard Deviation Calculator', description: 'Free standard deviation calculator. Compute population and sample SD, variance, mean, median, and range from any data set.', applicationCategory: 'UtilityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/standard-deviation-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function StandardDeviationPage() {
  useEffect(() => {
    document.title = 'Standard Deviation Calculator - Free & Instant | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free standard deviation calculator. Paste any data set - get population SD, sample SD, variance, mean, median, and range instantly.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Free - Instant - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Sigma className="h-10 w-10 md:h-14 md:w-14 text-indigo-300" />
              Standard Deviation
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Paste any list of numbers. Get population SD, sample SD, variance, mean, median, and more.
            </p>
          </div>
        </div>

        <StandardDeviationCalculator />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Standard Deviation" inputs={{ dataType: 'statistics' }} results={{ calculated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this calculator shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Sigma className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Population + sample SD</h3><p className="text-xs text-muted-foreground">Both versions calculated automatically. Never choose wrong again.</p></CardContent></Card>
            <Card><CardContent className="p-5"><BarChart3 className="h-5 w-5 text-purple-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Summary statistics</h3><p className="text-xs text-muted-foreground">Mean, median, count, sum, min, max, and range - all in one view.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Percent className="h-5 w-5 text-rose-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Variance included</h3><p className="text-xs text-muted-foreground">Get variance (SD squared) for both population and sample cases.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Paste your numbers into the data field - separated by commas, spaces, or newlines.</li>
            <li>The calculator auto-detects and counts valid entries.</li>
            <li>Read the results instantly - no button to press.</li>
            <li>Use population SD if you have all the data; sample SD if you have a subset.</li>
            <li>Copy the results for use in reports or spreadsheets.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/average-calculator" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BarChart3 className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Average Calculator</h3>
              <p className="text-xs text-muted-foreground">Mean, median, mode.</p>
            </Link>
            <Link to="/math-tools" className="block rounded-xl border border-border bg-card hover:border-purple-400 p-5 transition-colors">
              <Sigma className="h-5 w-5 text-purple-500 mb-2" />
              <h3 className="font-bold mb-1">All Math Tools</h3>
              <p className="text-xs text-muted-foreground">Statistics, fractions, percentages.</p>
            </Link>
            <Link to="/blog/what-is-standard-deviation" className="block rounded-xl border border-border bg-card hover:border-rose-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-rose-500 mb-2" />
              <h3 className="font-bold mb-1">What Is Standard Deviation?</h3>
              <p className="text-xs text-muted-foreground">The complete guide.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Standard Deviation Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only. Verify critical statistical calculations independently.
        </div>
      </div>
    </>
  )
}