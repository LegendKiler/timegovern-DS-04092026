import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Timer, ArrowRight, Clock, BookOpen, Brain, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Why exactly 25 minutes?', a: 'The 25-minute length is short enough to feel non-threatening (so you start), long enough to reach a state of focus, and short enough to avoid mental fatigue. Longer sessions tend to degrade in quality after 30-40 minutes without a break.' },
  { q: 'Is 25 minutes scientifically proven?', a: 'The specific 25-minute number is empirical rather than derived from a formula, but it aligns with research on attention span, ultradian rhythms (90-minute cycles), and the Pomodoro inventor\u2019s own study observations.' },
  { q: 'Can I use a different length?', a: 'Yes. Many people use 50-minute deep-work sessions with 10-minute breaks, or 15-minute sprints for high-frequency tasks. The best length is the one that keeps you focused and productive.' },
  { q: 'Why 5-minute breaks?', a: 'Short breaks are long enough to stand up, stretch, hydrate, and reset attention - but short enough that you do not lose momentum. Longer breaks risk pulling you into a different activity and making restarting harder.' },
  { q: 'Why a long break after 4 pomodoros?', a: 'Research on ultradian rhythms shows that focused cognitive work benefits from a longer recovery roughly every 90-120 minutes. Four 25-minute pomodoros plus short breaks adds up to about that window.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Why 25 Minutes? The Science Behind Pomodoro', description: 'Why the Pomodoro Technique uses 25-minute focus sessions, 5-minute breaks, and a long break after 4 pomodoros.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

export default function Why25MinutesPage() {
  useEffect(() => {
    document.title = 'Why 25 Minutes? The Science Behind Pomodoro | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Why the Pomodoro Technique uses 25-minute focus sessions, 5-minute breaks, and a long break after 4 pomodoros - the science of attention spans explained.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-orange-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Brain className="h-3.5 w-3.5 text-red-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-red-200">Attention Science</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">Why 25 Minutes? The Science Behind Pomodoro</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">The timer is not a random number. Here is what attention research says about 25, 5, and 4.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>Francesco Cirillo did not pick 25 minutes from a textbook. He picked it because his kitchen timer broke and 25 was the closest setting on the new one. Yet the number turned out to align remarkably well with attention research.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Why 25 minutes for focus</h2>
          <p>Three principles support the 25-minute length:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Low activation energy.</strong> Committing to 25 minutes feels achievable even when motivation is low. The brain resists indefinite effort but accepts short, defined bursts.</li>
            <li><strong>Long enough to enter flow.</strong> Research on cognitive load suggests it takes 10-15 minutes to fully engage with a complex task. 25 minutes gives you 10-15 minutes of deep work.</li>
            <li><strong>Short enough to avoid fatigue.</strong> Focused attention starts to degrade after 30-40 minutes without a break. 25 minutes keeps you inside the productive zone.</li>
          </ul>
          <h2 className="text-2xl font-black tracking-tight mt-8">Why 5-minute breaks work</h2>
          <p>Attention is not infinite - it is a resource that depletes with use. Short breaks restore it. 5 minutes is enough to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Stand up and move (blood flow matters)</li>
            <li>Look at something far away (reduces eye strain)</li>
            <li>Hydrate or grab a snack</li>
            <li>Let the brain briefly process what you just worked on</li>
          </ul>
          <p>5 minutes is <em>not</em> enough time to check email or scroll social media - which is exactly the point. Those activities pull you into a new context that makes returning to work harder.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Why a longer break after 4 pomodoros</h2>
          <p>The human body runs on ultradian rhythms - natural cycles of about 90 minutes of alertness followed by a dip. Four 25-minute pomodoros plus three 5-minute breaks adds up to about 115 minutes of work, which lands close to that natural cycle. A 15-30 minute break after four sessions lets the body and brain fully reset before the next cycle.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Can you use different lengths?</h2>
          <p>Absolutely. The classic 25/5 is a starting point, not a rule. Common variations:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>50/10 (deep work)</strong> - for programming, writing, or complex analysis</li>
            <li><strong>15/3 (sprint)</strong> - for high-frequency tasks, admin, or clearing backlog</li>
            <li><strong>90/20 (ultradian)</strong> - matches the natural attention cycle but is harder to sustain</li>
          </ul>
          <p>What matters is not the exact number - it is the practice of working in defined sprints, taking recovery breaks, and tracking your output.</p>
          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Timer className="h-10 w-10 text-indigo-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">Try 25/5 for yourself</h3><p className="text-sm text-muted-foreground">Free Pomodoro timer with presets for 25/5, 50/10, and 15/3 - plus custom durations.</p></div><Link to="/pomodoro-timer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0">Start Timer <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/what-is-pomodoro-technique" className="block rounded-xl border border-border bg-card hover:border-red-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-red-500 mb-2" /><h3 className="font-bold mb-1">What Is the Pomodoro Technique?</h3><p className="text-xs text-muted-foreground">Complete guide for beginners.</p></Link><Link to="/blog/best-pomodoro-apps" className="block rounded-xl border border-border bg-card hover:border-red-400 p-5 transition-colors"><Clock className="h-5 w-5 text-red-500 mb-2" /><h3 className="font-bold mb-1">Best Pomodoro Apps</h3><p className="text-xs text-muted-foreground">Compared and ranked for 2026.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Why 25 Minutes Pomodoro'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Note:</strong> This article is for informational purposes only. Attention science continues to evolve - find the working rhythm that suits you best.</div>
        </div>
      </article>
    </>
  )
}