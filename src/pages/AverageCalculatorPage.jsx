import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Sparkles, BookOpen, Calculator, Percent, Sigma, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import AverageCalculator from '../components/AverageCalculator'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the difference between mean, median, and mode?', a: 'Mean is the arithmetic average (sum divided by count). Median is the middle value when sorted. Mode is the most frequently occurring value. All three measure "central tendency" but in different ways.' },
  { q: 'When should I use median instead of mean?', a: 'Use median when the data has outliers or is skewed. Example: average income is often skewed by billionaires; median income tells a truer story for the typical person.' },
  { q: 'What if there is no mode?', a: 'If every value appears exactly once, there is no mode. The calculator shows "None" in that case.' },
  { q: 'Can there be multiple modes?', a: 'Yes. If two or more values tie for highest frequency, the data set is "bimodal" or "multimodal" and the calculator lists all of them.' },
  { q: 'What is a weighted average?', a: 'An average where each value is multiplied by a weight before summing. Example: course grade where exams are worth 60% and homework 40%. Our calculator computes the simple mean.' },
  { q: 'What is the difference between average and mean?', a: 'In everyday usage, "average" usually means the arithmetic mean. Strictly, "average" is a category that includes mean, median, and mode.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Average Calculator', description: 'Free average calculator. Compute mean, median, mode, sum, range, and other summary statistics from any data set.', applicationCategory: 'UtilityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/average-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function AverageCalculatorPage() {
  useEffect(() => {
    document.title = 'Average Calculator - Mean, Median, Mode | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free average calculator. Paste any data set - get mean, median, mode, sum, range, and more. Instant, no signup.'
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
              <BarChart3 className="h-10 w-10 md:h-14 md:w-14 text-indigo-300" />
              Average Calculator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Paste any list of numbers. Get mean, median, mode, sum, range, and more - instantly.
            </p>
          </div>
        </div>

        <AverageCalculator />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Average" inputs={{ dataType: 'statistics' }} results={{ calculated: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this calculator shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><BarChart3 className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Mean, median, mode</h3><p className="text-xs text-muted-foreground">All three central tendency measures calculated together.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Percent className="h-5 w-5 text-purple-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Summary stats</h3><p className="text-xs text-muted-foreground">Count, sum, min, max, and range in a single view.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Sigma className="h-5 w-5 text-rose-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Multi-modal support</h3><p className="text-xs text-muted-foreground">Handles bimodal and multimodal data sets.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Paste your numbers - separated by commas, spaces, or newlines.</li>
            <li>The calculator auto-detects and counts valid entries.</li>
            <li>Read mean, median, mode, and other stats instantly.</li>
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
            <Link to="/standard-deviation-calculator" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Sigma className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Standard Deviation</h3>
              <p className="text-xs text-muted-foreground">Spread of any data set.</p>
            </Link>
            <Link to="/percentage-calculator" className="block rounded-xl border border-border bg-card hover:border-purple-400 p-5 transition-colors">
              <Percent className="h-5 w-5 text-purple-500 mb-2" />
              <h3 className="font-bold mb-1">Percentage Calculator</h3>
              <p className="text-xs text-muted-foreground">Percent of, increase, decrease.</p>
            </Link>
            <Link to="/math-tools" className="block rounded-xl border border-border bg-card hover:border-rose-400 p-5 transition-colors">
              <BarChart3 className="h-5 w-5 text-rose-500 mb-2" />
              <h3 className="font-bold mb-1">All Math Tools</h3>
              <p className="text-xs text-muted-foreground">Every math calculator.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Average Calculator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}