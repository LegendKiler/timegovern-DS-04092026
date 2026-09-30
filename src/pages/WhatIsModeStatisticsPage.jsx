import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, ArrowRight, BookOpen, Calculator, Sigma } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the mode?', a: 'The mode is the value that appears most often in a data set. Example: in (2, 3, 3, 5, 7), the mode is 3.' },
  { q: 'Can there be more than one mode?', a: 'Yes. If two or more values tie for highest frequency, the data is bimodal or multimodal. The calculator lists all of them.' },
  { q: 'What if there is no mode?', a: 'If every value appears exactly once, there is no mode. The calculator shows "None" in that case.' },
  { q: 'When is mode most useful?', a: 'For categorical data (favourite colour, shirt size, zip code). Mean and median cannot be used on non-numeric data, but mode can.' },
  { q: 'How does mode differ from mean and median?', a: 'Mean and median describe numeric centrality. Mode describes frequency - what is most common. All three answer different questions.' },
  { q: 'Can a data set have a mode of 0?', a: 'If 0 appears more often than any other value, then yes. The mode can be any value including 0 or negative numbers.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'What Is Mode in Statistics?', description: 'The mode explained - how to find it, when it is useful, and how it differs from mean and median.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/what-is-mode-statistics' }

export default function WhatIsModeStatisticsPage() {
  useEffect(() => {
    document.title = 'What Is Mode in Statistics? | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'What is mode in statistics? The most frequent value explained - how to find it, when it is useful, and how it differs from mean and median.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / What Is Mode?
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full mb-4">
            <BarChart3 className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Statistics - 4 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            What Is Mode in Statistics?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The forgotten third average - and the only one that works on non-numeric data.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The one-sentence definition</h2>
          <p className="text-muted-foreground">The mode is the value that appears most often in a data set.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Simple example</h2>
          <p className="text-muted-foreground">Data: (2, 3, 3, 5, 7, 3, 8)</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>2 appears once</li>
            <li>3 appears three times ← <strong>mode</strong></li>
            <li>5, 7, and 8 appear once each</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Multiple modes</h2>
          <p className="text-muted-foreground">If two values tie, the data is bimodal. If three or more tie, it is multimodal.</p>
          <p className="text-muted-foreground">Example: (1, 1, 2, 2, 3, 4). Both 1 and 2 appear twice, so the modes are 1 and 2.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">No mode</h2>
          <p className="text-muted-foreground">If every value appears exactly once, there is no mode. Example: (1, 2, 3, 4, 5).</p>

          <h2 className="text-2xl font-black mt-8 mb-3">When mode is useful</h2>
          <p className="text-muted-foreground">Mode is the only measure of central tendency that works on categorical (non-numeric) data:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Favourite colour in a survey → "most popular colour"</li>
            <li>Shirt sizes sold → "most sold size"</li>
            <li>Shoe sizes at a store → "most common size to stock"</li>
            <li>ZIP codes → "most frequent ZIP"</li>
          </ul>
          <p className="text-muted-foreground">You cannot average "blue" and "red". But you can find the most frequent one.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Mode for numeric data</h2>
          <p className="text-muted-foreground">For numeric data, mode is less useful than mean or median, but it still has cases:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Bestselling price point - what price sells most</li>
            <li>Most common test score - what score did most students get</li>
            <li>Most frequent delivery time - what delivery window is most common</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Mean vs Median vs Mode</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Mean:</strong> sum ÷ count. Answers "what would every value be if they were equal?"</li>
            <li><strong>Median:</strong> middle value. Answers "what is the middle of the ordered list?"</li>
            <li><strong>Mode:</strong> most frequent. Answers "what is the most common value?"</li>
          </ul>
          <p className="text-muted-foreground">All three are measures of "central tendency" but they answer different questions.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">A surprise: mode can be non-numeric</h2>
          <p className="text-muted-foreground">This is unique. Mean and median require numbers. Mode works on any category. That is why mode is essential for survey analysis, market research, and any data that is not numerical.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Try it</h2>
          <p className="text-muted-foreground">Our <Link to="/average-calculator" className="text-primary font-bold hover:underline">Average Calculator</Link> computes mode alongside mean and median from any numeric data set.</p>
        </div>

        <div className="my-8">
          <Link to="/average-calculator" className="block rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"><Calculator className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-indigo-500 transition-colors">Find the mode</h3>
                <p className="text-sm text-muted-foreground">Along with mean and median.</p>
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
            <Link to="/blog/mean-vs-median" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Sigma className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Mean vs Median</h3>
              <p className="text-xs text-muted-foreground">Which one to use when.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'What Is Mode in Statistics?'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}