import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Settings, Sparkles, ArrowRight, Ruler, Type, Dices, BookOpen, FlaskConical } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const TOOLS = [
  { to: '/unit-converter', name: 'Unit Converter', desc: 'Convert length, weight, temperature, volume, area, and speed between metric and imperial.', icon: Ruler, color: 'emerald' },
  { to: '/word-counter', name: 'Word Counter', desc: 'Live word, character, and reading time count with top keywords for SEO.', icon: Type, color: 'blue' },
  { to: '/random-number-generator', name: 'Random Number Generator', desc: 'Numbers, dice, coin flips, list picker, and shuffle - cryptographically strong.', icon: Dices, color: 'purple' },
]

const FAQ = [
  { q: 'What are the utility tools?', a: 'TimeGovern has three utility tools that solve common everyday problems: a Unit Converter, a Word Counter, and a Random Number Generator. All run in your browser with no signup.' },
  { q: 'Do these tools work offline?', a: 'Yes. Once the page loads, all three tools run entirely in your browser using JavaScript. No internet connection is required after the initial load.' },
  { q: 'Are these tools accurate?', a: 'Yes. Unit conversions use standard SI and imperial factors. Word counting uses standard whitespace-delimited rules. Random numbers use crypto.getRandomValues() for cryptographically strong randomness.' },
  { q: 'Can I use them for free forever?', a: 'Yes. These tools are completely free with no signup, no ads within the tools, and no usage limits. No tricks.' },
  { q: 'Do they work on mobile?', a: 'Yes. All three utility tools are responsive and work on phones, tablets, laptops, and desktops. Works in any modern browser.' },
  { q: 'Is my data private?', a: 'Completely. Everything runs in your browser - nothing is sent to a server. Your values, text, and results stay on your device only.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const COLLECTION_SCHEMA = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Utility Tools & Converters', description: 'Free utility tools - Unit Converter, Word Counter, and Random Number Generator.', url: 'https://timegovern.com/utility-tools' }

export default function UtilityToolsHub() {
  useEffect(() => {
    document.title = 'Utility Tools & Converters - Free & Private | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free utility tools - Unit Converter, Word Counter, and Random Number Generator. All in one place, no signup, 100% private.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">3 tools - Free - Private</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Settings className="h-10 w-10 md:h-14 md:w-14 text-emerald-300" />
              Utility Tools
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Everyday converters, counters, and randomisers - clean, fast, and free forever.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">The three utility tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {TOOLS.map((t) => {
              const Icon = t.icon
              return (
                <Link key={t.to} to={t.to} className={'block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors'}>
                  <div className="flex items-start gap-3">
                    <div className={'p-2.5 rounded-xl bg-' + t.color + '-500/10 border border-' + t.color + '-500/30 shrink-0'}>
                      <Icon className={'h-5 w-5 text-' + t.color + '-500'} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black mb-1 text-sm">{t.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{t.desc}</p>
                      <div className="text-[11px] font-bold text-emerald-500 inline-flex items-center gap-1">Open tool <ArrowRight className="h-3 w-3" /></div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">When to use each tool</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
            <li><strong>Unit Converter</strong> - when you need to convert between metric and imperial units for recipes, travel, DIY, or study.</li>
            <li><strong>Word Counter</strong> - when you are writing an essay, blog post, tweet, or LinkedIn post and need exact word, character, and reading time counts.</li>
            <li><strong>Random Number Generator</strong> - when you need fair randomisation for giveaways, dice rolls, team selection, or decision making.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Utility Tools'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> These tools are for informational purposes only. Conversion factors are accurate to standard precision.
        </div>
      </div>
    </>
  )
}