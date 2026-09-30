import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Coffee, ArrowRight, Clock, BookOpen, Zap, Sun } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the best time to drink coffee?', a: 'Most sleep scientists recommend waiting 60-90 minutes after waking before your first coffee. This lets your natural cortisol peak pass, so caffeine has a stronger effect later.' },
  { q: 'Why should I wait before drinking coffee?', a: 'Cortisol naturally peaks 30-45 minutes after waking. Drinking coffee during this peak blunts caffeine effectiveness and builds tolerance faster.' },
  { q: 'Is 2 PM too late for coffee?', a: 'If you go to bed at 10-11 PM, 2 PM is roughly 8-9 hours before bedtime - a reasonable cut-off. Slow metabolisers should stop earlier.' },
  { q: 'Does coffee actually wake you up?', a: 'Yes. Caffeine blocks adenosine, the chemical that builds up in your brain all day to make you sleepy. It does not create energy - it hides the feeling of tiredness.' },
  { q: 'Should I drink coffee before a nap?', a: 'Yes - a coffee nap works. Drink coffee, then nap 20 minutes. Caffeine takes about 20-30 minutes to kick in, so you wake up as it starts working.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Best Time to Drink Coffee (Not When You Wake Up)', description: 'Science-backed timing for coffee: wait 60-90 minutes after waking, stop 8-10 hours before bed, and try the coffee nap.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

export default function BestTimeToDrinkCoffeePage() {
  useEffect(() => {
    document.title = 'Best Time to Drink Coffee: Not When You Wake | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Science-backed timing for coffee: wait 60-90 minutes after waking, stop 8-10 hours before bed, and try the coffee nap.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Zap className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Caffeine Timing</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">Best Time to Drink Coffee (Not When You Wake Up)</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">The instinct to grab coffee immediately after waking is wrong. Here is the science of when to drink it.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>Most people drink coffee within 20 minutes of waking. According to sleep researcher Dr Michael Breus and cortisol-timing research, that is the worst time of day for it. The best time is 60-90 minutes later.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">The cortisol peak</h2>
          <p>Cortisol - your natural alertness hormone - spikes 30-45 minutes after waking. This is called the Cortisol Awakening Response. During that window, you already feel as alert as caffeine would make you. Drinking coffee during the peak blunts caffeine effectiveness and builds tolerance faster - so you need more coffee for the same effect.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">The 60-90 minute rule</h2>
          <p>Wait 60-90 minutes after waking before your first coffee. By then, natural cortisol has dropped and caffeine will have a genuinely noticeable effect. You get more benefit from less caffeine, and you build tolerance more slowly.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Second window: early afternoon</h2>
          <p>There is a second natural dip in alertness around 1-2 PM. This is the optimal second coffee window - if you drink a second cup at all. Any later than 2 PM risks caffeine still circulating at bedtime.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">The coffee nap</h2>
          <p>Counterintuitive but effective: drink coffee, then nap for 20 minutes. Caffeine takes 20-30 minutes to peak in your bloodstream. You wake up right as it kicks in, and the brief sleep has cleared adenosine. Combined effect: sharper than either alone.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">When to stop</h2>
          <p>Caffeine has a 5-hour half-life. To have under 30mg at bedtime, stop 8-10 hours before sleep. For a 10-11 PM bedtime, that means no coffee after 1-2 PM. See the caffeine calculator for your exact cut-off based on your dose and metabolism.</p>
          <Card className="bg-amber-500/5 border-amber-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Coffee className="h-10 w-10 text-amber-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">Get your personal coffee cut-off</h3><p className="text-sm text-muted-foreground">Enter your drink, dose, and bedtime - see exactly how much caffeine is left at bedtime.</p></div><Link to="/caffeine-calculator" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-colors shrink-0">Calculate <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/caffeine-half-life" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors"><Clock className="h-5 w-5 text-amber-500 mb-2" /><h3 className="font-bold mb-1">Caffeine Half-Life Explained</h3><p className="text-xs text-muted-foreground">How long caffeine stays in your system.</p></Link><Link to="/blog/when-to-stop-drinking-coffee" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-amber-500 mb-2" /><h3 className="font-bold mb-1">When to Stop Drinking Coffee</h3><p className="text-xs text-muted-foreground">Find your personal cut-off time.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Best Time to Drink Coffee'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> This article is for informational purposes only. If you have a heart condition or take regular medication, consult a healthcare professional before adjusting caffeine intake.</div>
        </div>
      </article>
    </>
  )
}