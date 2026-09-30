import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Coffee, ArrowRight, Clock, BookOpen, Activity, Sun } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How long does caffeine withdrawal last?', a: 'Peak symptoms occur at 20-48 hours after stopping. Most people feel significantly better by day 5-7. Full resolution typically takes 2-9 days.' },
  { q: 'What are the symptoms of caffeine withdrawal?', a: 'Headache (most common), fatigue, brain fog, irritability, difficulty concentrating, flu-like symptoms, and in some cases nausea.' },
  { q: 'Is caffeine withdrawal real?', a: 'Yes. The DSM-5 recognises Caffeine Withdrawal Syndrome as a real condition. It is not psychological - the brain adapts to adenosine receptor blockade.' },
  { q: 'Should I quit cold turkey or taper?', a: 'Taper. Reduce daily intake by 10-25% every few days. This avoids the worst of the headache and fatigue.' },
  { q: 'How much caffeine causes withdrawal?', a: 'Withdrawal can occur at any regular daily dose, but symptoms are more likely at 100mg+ per day.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Caffeine Withdrawal: Timeline and How to Quit', description: 'A complete timeline of caffeine withdrawal, symptoms by day, and a tapering strategy.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

export default function CaffeineWithdrawalPage() {
  useEffect(() => {
    document.title = 'Caffeine Withdrawal: Timeline and How to Quit | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'A complete timeline of caffeine withdrawal, symptoms by day, and a tapering strategy to avoid the worst of it.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-amber-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Activity className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Caffeine Health</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">Caffeine Withdrawal: Timeline and How to Quit</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">The headaches are real, they peak in 48 hours, and most people feel better by day 5. Here is the full timeline.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>Caffeine withdrawal is recognised in the DSM-5 as a real clinical syndrome. It is not weakness or habit - it is a measurable set of physiological changes when the brain adapts back to normal adenosine signalling.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">The withdrawal timeline</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>6-12 hours</strong> - first signs: mild fatigue, mental fuzziness</li>
            <li><strong>12-24 hours</strong> - headache begins, irritability, low mood</li>
            <li><strong>20-48 hours</strong> - symptoms peak: severe headache, brain fog, fatigue</li>
            <li><strong>Day 3-4</strong> - symptoms start to ease, headache still present</li>
            <li><strong>Day 5-7</strong> - most people feel noticeably better</li>
            <li><strong>Day 8-14</strong> - residual effects fade, sleep quality improves</li>
          </ul>
          <h2 className="text-2xl font-black tracking-tight mt-8">Why it happens</h2>
          <p>Caffeine works by blocking adenosine receptors in the brain. Over weeks of daily use, the brain compensates by growing more adenosine receptors. When caffeine is removed, all those extra receptors are suddenly open to adenosine - which is why you feel more tired, foggy, and headache-prone than before you ever drank coffee.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Tapering strategy</h2>
          <p>Cold turkey works but hurts. A taper is easier on the body:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Week 1</strong> - reduce by 25% (e.g. 4 cups to 3)</li>
            <li><strong>Week 2</strong> - reduce by another 25% (3 to 2)</li>
            <li><strong>Week 3</strong> - reduce by 25% again (2 to 1.5)</li>
            <li><strong>Week 4</strong> - drop to zero or stay at 1 half-cup</li>
          </ul>
          <p>You can also switch to green tea (28mg per cup) partway through - it eases the drop without caffeine-free misery.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Tips that help</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Drink more water - dehydration worsens headaches</li>
            <li>Get 7-9 hours of sleep - your brain is genuinely tired, let it rest</li>
            <li>Take light pain relief for the headache (paracetamol, ibuprofen)</li>
            <li>Do not replace caffeine with energy drinks - same trap</li>
            <li>Expect 3 rough days, then rapid improvement</li>
          </ul>
          <h2 className="text-2xl font-black tracking-tight mt-8">Why it is worth it</h2>
          <p>After 2 weeks caffeine-free, most people report: better sleep quality, more stable daytime energy, lower anxiety, and (surprisingly) feeling as alert as they did on caffeine. The brain recalibrates. You do not lose alertness - you get it back without the cost.</p>
          <Card className="bg-amber-500/5 border-amber-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Coffee className="h-10 w-10 text-amber-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">Track your caffeine intake</h3><p className="text-sm text-muted-foreground">See exactly how much caffeine you are consuming daily - and how it affects your sleep.</p></div><Link to="/caffeine-calculator" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-colors shrink-0">Calculate <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/caffeine-half-life" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors"><Clock className="h-5 w-5 text-amber-500 mb-2" /><h3 className="font-bold mb-1">Caffeine Half-Life Explained</h3><p className="text-xs text-muted-foreground">How long caffeine really stays in your system.</p></Link><Link to="/blog/best-time-to-drink-coffee" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors"><Sun className="h-5 w-5 text-amber-500 mb-2" /><h3 className="font-bold mb-1">Best Time to Drink Coffee</h3><p className="text-xs text-muted-foreground">Why waiting 90 minutes after waking works better.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Caffeine Withdrawal Timeline'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> This article is for informational purposes only. If you experience severe withdrawal symptoms or have a medical condition, consult a healthcare professional.</div>
        </div>
      </article>
    </>
  )
}