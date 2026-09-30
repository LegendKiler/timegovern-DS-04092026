import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Scale, ArrowRight, BookOpen, Clock, Moon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Does lack of sleep cause weight gain?', a: 'Yes. Sleep debt disrupts ghrelin (hunger) and leptin (satiety) hormones, raises cortisol, and reduces insulin sensitivity. Sleeping under 6 hours consistently is linked to significantly higher rates of obesity.' },
  { q: 'How does sleep loss affect hunger hormones?', a: 'After just two nights of short sleep, ghrelin rises about 15% and leptin drops about 15%. This makes you hungrier, especially for high-calorie carbs.' },
  { q: 'Can you lose weight by sleeping more?', a: 'Yes - for some people. When sleep-deprived dieters get adequate sleep, a higher proportion of weight loss comes from fat rather than muscle.' },
  { q: 'Does sleep debt cause belly fat?', a: 'Chronic sleep restriction is associated with increased visceral fat - the dangerous fat around organs. Even short-term restriction shows measurable fat accumulation.' },
  { q: 'How much sleep do I need for weight management?', a: 'Aim for 7-9 hours nightly for adults. Below 7 hours, hormonal changes start favoring weight gain.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Sleep Debt and Weight Gain: The Hidden Connection', description: 'How sleep debt disrupts hunger hormones, raises cortisol, and drives fat storage.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

export default function SleepDebtAndWeightGainPage() {
  useEffect(() => {
    document.title = 'Sleep Debt and Weight Gain: The Hidden Link | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How sleep debt disrupts hunger hormones, raises cortisol, and drives fat storage - plus how to fix it.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Scale className="h-3.5 w-3.5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">Sleep and Metabolism</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">Sleep Debt and Weight Gain: The Hidden Connection</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">Missing sleep does more than make you tired - it rewires the hormones that control hunger and fat storage.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>If you are eating well and exercising but not losing weight, chronic sleep debt may be the missing piece. Research shows sleep loss changes the hormones that control appetite, cravings, and where your body stores fat.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">The hunger hormone seesaw</h2>
          <p>Two hormones regulate appetite: ghrelin (tells you to eat) and leptin (tells you to stop). After just two nights of sleeping 4-5 hours, ghrelin rises about 15% and leptin drops about 15%. That swing makes you significantly hungrier - especially for high-sugar, high-carb foods - and less satisfied after meals.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Cortisol and belly fat</h2>
          <p>Sleep debt raises cortisol - the primary stress hormone. Elevated cortisol tells the body to store energy, particularly as visceral fat around the abdomen. This is the most metabolically dangerous type of fat, linked to heart disease and Type 2 diabetes.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Insulin resistance</h2>
          <p>After just four nights of 4.5 hours sleep, healthy young adults show a 40% reduction in insulin sensitivity. In practical terms, the same meal causes a bigger blood sugar spike and a bigger insulin response - the body shifts into fat-storage mode.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">What to do about it</h2>
          <ul className="list-disc pl-6 space-y-2"><li>Target 7-9 hours - below 7 hours, hormonal changes favor weight gain</li><li>Consistent sleep and wake times - anchor your circadian rhythm</li><li>No screens 1 hour before bed - blue light delays melatonin</li><li>Cool, dark bedroom - 18 degrees C is ideal</li><li>Fix any sleep debt first - then weight changes become easier</li></ul>
          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Moon className="h-10 w-10 text-indigo-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">Check your sleep debt</h3><p className="text-sm text-muted-foreground">See how much sleep you owe - and the recovery plan to pay it back.</p></div><Link to="/sleep-debt-calculator" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0">Calculate <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/what-is-sleep-debt" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1">What Is Sleep Debt?</h3><p className="text-xs text-muted-foreground">The complete science behind sleep debt.</p></Link><Link to="/blog/how-much-sleep-do-you-need" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors"><Clock className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1">How Much Sleep Do You Need?</h3><p className="text-xs text-muted-foreground">Sleep needs by age and how to find your number.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Sleep Debt and Weight Gain'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> This article is for informational purposes only. If you experience ongoing sleep problems or unexplained weight changes, speak to a healthcare professional.</div>
        </div>
      </article>
    </>
  )
}