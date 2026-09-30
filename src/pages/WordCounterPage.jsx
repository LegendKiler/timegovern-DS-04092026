import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Type, Sparkles, BookOpen, Clock, Mic, BarChart3, Hash, ArrowRight} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import WordCounter from '../components/WordCounter'
import ShareButtons from '../components/ShareButtons'
import SaveCalculation from '../components/SaveCalculation'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How does the word counter work?', a: 'The word counter counts words as you type or paste, updating live. It counts any sequence of characters separated by spaces as a word, so hyphens and slashes count as part of the word.' },
  { q: 'Does it count characters with or without spaces?', a: 'Both. The main character count includes spaces; a smaller count below it shows characters excluding spaces. This is useful for social media limits where spaces may or may not count.' },
  { q: 'How is reading time calculated?', a: 'Reading time uses the standard adult reading speed of 200 words per minute. A 1000-word article reads in about 5 minutes. Speaking time uses 130 words per minute - the typical pace of clear speech.' },
  { q: 'What are top keywords?', a: 'Top keywords are the most frequently used words in your text, with common short words (the, a, an, is, and similar) filtered out. This is useful for SEO - a good article repeats its main keywords naturally.' },
  { q: 'Is my text saved anywhere?', a: 'Your text is saved in your own browser storage so it survives page reloads. It never leaves your device. No signup, no tracking, no data collection.' },
  { q: 'Can I use it for essays or blog posts?', a: 'Yes. The counter handles any length - from a tweet to a 10,000-word essay. It also shows sentences, paragraphs, lines, and reading time, all useful for editing and planning.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Word Counter', description: 'Free online word counter. Count words, characters, sentences, and paragraphs. See reading time, speaking time, and top keywords. No signup, 100% private.', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: 'https://timegovern.com/word-counter', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['Live word and character count', 'Reading and speaking time', 'Sentence and paragraph count', 'Top keywords (SEO)', 'No signup, 100% private'] }

export default function WordCounterPage() {
  useEffect(() => {
    document.title = 'Word Counter - Live Word & Character Count | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free online word counter. Count words, characters, sentences, paragraphs, reading time, and top keywords as you type. No signup, 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-blue-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-200">Free - Private - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Type className="h-10 w-10 md:h-14 md:w-14 text-blue-300" />
              Word Counter
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Count words, characters, sentences, and paragraphs live. Plus reading time, speaking time, and top keywords.
            </p>
          </div>
        </div>

        <WordCounter />

        <div className="flex justify-end">
          <SaveCalculation type="calculation" title="Word Counter" inputs={{ tracked: 'live' }} results={{ hasStats: true }} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What the word counter shows</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Type className="h-5 w-5 text-blue-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Words & characters</h3><p className="text-xs text-muted-foreground">Live word count, character count with and without spaces.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Clock className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Reading & speaking time</h3><p className="text-xs text-muted-foreground">Based on 200 wpm reading and 130 wpm speaking speeds.</p></CardContent></Card>
            <Card><CardContent className="p-5"><BarChart3 className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Top keywords</h3><p className="text-xs text-muted-foreground">Most frequently used words, filtered for common short words.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use the word counter</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Type or paste your text into the box - counts update as you type.</li>
            <li>Check words, characters (with/without spaces), sentences, and paragraphs.</li>
            <li>See estimated reading time and speaking time below.</li>
            <li>View top keywords to check keyword density for SEO.</li>
            <li>Click Copy stats to copy all counts to clipboard, or Clear to start over.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 mb-5 flex items-center justify-between gap-3"><div className="text-sm"><strong>Looking for more?</strong> See all tools in this category.</div><Link to="/productivity-tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:underline shrink-0">View all <ArrowRight className="h-3 w-3" /></Link></div>

        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/unit-converter" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">Unit Converter</h3>
              <p className="text-xs text-muted-foreground">Convert length, weight, and temperature.</p>
            </Link>
            <Link to="/pomodoro-timer" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Pomodoro Timer</h3>
              <p className="text-xs text-muted-foreground">Focus in 25-minute sprints.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Word Counter'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> This tool is for informational purposes only. Your text is saved on your device only - it never leaves your browser. No signup, no tracking.
        </div>
      </div>
    </>
  )
}