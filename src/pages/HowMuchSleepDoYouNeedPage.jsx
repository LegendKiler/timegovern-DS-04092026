import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Moon, ArrowRight, Clock, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How much sleep do I need?', a: 'The National Sleep Foundation recommends 7-9 hours for adults 18-64, 7-8 for 65+, 8-10 for teens.' },
  { q: 'Is 6 hours of sleep enough?', a: 'For most adults, no. Only a small genetic minority thrive on 6 hours. Most who feel fine on 6 are chronically sleep-deprived.' },
  { q: 'Can I train myself to need less sleep?', a: 'No. You can build tolerance to feeling tired, but your brain and body still need the same amount.' },
  { q: 'How do I know if I am getting enough sleep?', a: 'Wake without an alarm at roughly the same time daily, feel alert within 30 minutes, and stay awake through meetings.' },
  { q: 'Do sleep needs change with age?', a: 'Yes, slightly. Total need decreases a bit across the lifespan but never below 7 hours for healthy adults.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How Much Sleep Do You Really Need?', description: 'A complete guide to nightly sleep needs by age, how to know if you are getting enough, and why 6 hours is not enough for most adults.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

export default function HowMuchSleepDoYouNeedPage() {
  useEffect(() => {
    document.title = 'How Much Sleep Do You Really Need? | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'A complete guide to nightly sleep needs by age, how to know if you are getting enough, and why 6 hours is not enough for most adults.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Moon className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Sleep Science</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">How Much Sleep Do You Really Need?</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">The answer is not a single number - it depends on age, genetics, and health.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>Sleep need is one of the most misunderstood numbers in health. Everyone has heard 8 hours, but the real answer is a range - and your personal target sits somewhere inside it.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Sleep need by age</h2>
          <p>The National Sleep Foundation publishes recommendations based on decades of research:</p>
          <div className="overflow-x-auto"><table className="w-full text-sm border border-border rounded-xl"><thead className="bg-muted/40"><tr><th className="text-left p-3 font-bold">Age</th><th className="text-left p-3 font-bold">Recommended</th></tr></thead><tbody>
            <tr className="border-t border-border"><td className="p-3">Teens (14-17)</td><td className="p-3">8-10 hours</td></tr>
            <tr className="border-t border-border"><td className="p-3">Young adults (18-25)</td><td className="p-3">7-9 hours</td></tr>
            <tr className="border-t border-border"><td className="p-3">Adults (26-64)</td><td className="p-3">7-9 hours</td></tr>
            <tr className="border-t border-border"><td className="p-3">Older adults (65+)</td><td className="p-3">7-8 hours</td></tr>
          </tbody></table></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Why 6 hours is not enough</h2>
          <p>About 1 in 100 people carry a rare gene variant that allows them to function on 6 hours. Everyone else who thinks they need only 6 hours is almost certainly running a chronic sleep deficit. The dangerous part: after weeks of restriction, the subjective feeling of tiredness fades - but cognitive performance keeps declining.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Signs you are not getting enough</h2>
          <ul className="list-disc pl-6 space-y-2"><li>You need an alarm clock to wake up - and hit snooze</li><li>You fall asleep within 5 minutes of lying down</li><li>You feel groggy more than 30 minutes after waking</li><li>You rely on caffeine to get through the afternoon</li><li>You sleep in heavily on weekends (social jetlag)</li></ul>
          <h2 className="text-2xl font-black tracking-tight mt-8">How to find your personal number</h2>
          <p>Go to bed at the same time each night for two weeks and wake up naturally - no alarm. Note how many hours you sleep on the final 3 nights. That average is close to your true sleep need. Most adults land between 7.5 and 8.5 hours.</p>
          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Moon className="h-10 w-10 text-indigo-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">Check your sleep debt</h3><p className="text-sm text-muted-foreground">Log your last 7 nights and see exactly how much sleep you owe your body.</p></div><Link to="/sleep-debt-calculator" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0">Calculate <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/what-is-sleep-debt" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1">What Is Sleep Debt?</h3><p className="text-xs text-muted-foreground">The science behind sleep debt and how it accumulates.</p></Link><Link to="/blog/sleep-debt-by-age" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors"><Clock className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1">Sleep Debt by Age</h3><p className="text-xs text-muted-foreground">How sleep needs change across the lifespan.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How Much Sleep'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Medical disclaimer:</strong> This article is for informational purposes only. If you experience ongoing sleep problems or extreme fatigue, speak to a healthcare professional.</div>
        </div>
      </article>
    </>
  )
}