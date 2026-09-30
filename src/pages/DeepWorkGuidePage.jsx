import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Zap, ArrowRight, Clock, BookOpen, Brain, Timer, Target, Coffee } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is deep work?', a: 'Deep work is a term popularised by Cal Newport. It means focused, distraction-free work on a cognitively demanding task. It is the opposite of shallow work - emails, meetings, and messages - which fragments attention without producing much value.' },
  { q: 'How long can you do deep work?', a: 'Most people can sustain 2 to 4 hours of real deep work per day. Beginners should start with 1 hour. The capacity grows with practice, just like a muscle. Do not try to jump to 6-hour sessions on day one.' },
  { q: 'What is the difference between deep work and flow?', a: 'Flow is the psychological state of complete absorption in a task. Deep work is the practice of scheduling and protecting the conditions that make flow more likely. You cannot force flow, but you can create the environment for it.' },
  { q: 'Do I need total silence for deep work?', a: 'No. Consistency matters more than silence. Some people do deep work in cafes. What matters is that your environment does not require attention. Noise-cancelling headphones, instrumental music, or a closed door all work.' },
  { q: 'How do I deal with interruptions during deep work?', a: 'Schedule deep work blocks where interruptions are least likely - early morning, or a defined period when teammates know not to disturb you. Keep a notepad nearby to capture stray thoughts that would otherwise pull you off-task.' },
  { q: 'Can I do deep work from home?', a: 'Yes, and often better than in an office. The absence of meetings and colleague interruptions makes home or a library ideal. The key is a defined workspace, a scheduled block, and the discipline to close the door on distractions.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Deep Work: How to Focus in a Distracted World', description: 'A practical guide to deep work - what it is, why it matters, and how to build a daily practice that produces real output.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

export default function DeepWorkGuidePage() {
  useEffect(() => {
    document.title = 'Deep Work: How to Focus in a Distracted World | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'A practical guide to deep work - what it is, why it matters, and how to build a daily practice that produces real output.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Zap className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Deep Work</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">Deep Work: How to Focus in a Distracted World</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">Most of the modern workday is spent on shallow tasks. Here is how to reclaim hours of real, focused output.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>Cal Newport coined the term "deep work" in his 2016 book of the same name. It refers to the ability to focus without distraction on a cognitively demanding task. In a world built around notifications and meetings, deep work has become rare - and therefore more valuable.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Why deep work matters</h2>
          <p>Two things are true at the same time: (1) deep work produces more value per hour than shallow work, and (2) the modern work environment is hostile to it. This creates an opportunity. If you can consistently produce 2-4 hours of deep work per day, you will outproduce most of your peers who spend their days in reactive mode.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Deep work vs shallow work</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Deep work:</strong> writing, coding, design, strategy, complex analysis, learning</li>
            <li><strong>Shallow work:</strong> email, meetings, slack, status updates, administrative tasks</li>
          </ul>
          <p>Both are necessary, but only one produces what Newport calls "high-value output." Most knowledge workers spend less than 2 hours of a 9-hour day on deep work.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">The 4 rules of deep work</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Work deeply.</strong> Schedule deep work blocks in your calendar and treat them as non-negotiable.</li>
            <li><strong>Embrace boredom.</strong> Do not reach for your phone the moment you feel a lull. Train your brain to tolerate stillness.</li>
            <li><strong>Quit social media (selectively).</strong> Not all apps - but the ones that add no value to your actual goals.</li>
            <li><strong>Drain the shallows.</strong> Ruthlessly cut shallow tasks. Say no to meetings without agendas. Batch email into two windows per day.</li>
          </ol>
          <h2 className="text-2xl font-black tracking-tight mt-8">How to start a deep work practice</h2>
          <p>Start small. Schedule one 90-minute deep work block per day. Turn off notifications. Close every tab except the one you need. Keep a notepad nearby for stray thoughts. Do not check email until after the block. Repeat daily for a week - the capacity grows.</p>
          <p>Pair the session with a timer. The Pomodoro Technique is a simple entry point - 25-minute focused sprints. Once that feels easy, stretch the block to 50 or 90 minutes.</p>
          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Timer className="h-10 w-10 text-indigo-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">Run a deep work session</h3><p className="text-sm text-muted-foreground">Free Pomodoro timer with auto-advance breaks, sound alerts, and session tracking.</p></div><Link to="/pomodoro-timer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0">Start Now <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/how-to-stop-procrastinating" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors"><Brain className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1">How to Stop Procrastinating</h3><p className="text-xs text-muted-foreground">7 science-backed strategies.</p></Link><Link to="/blog/best-study-techniques" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1">Best Study Techniques</h3><p className="text-xs text-muted-foreground">Evidence-based methods for focused learning.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Deep Work Guide'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Note:</strong> This article is for informational purposes only. Deep work is a practice - start with small, sustainable sessions before scaling up.</div>
        </div>
      </article>
    </>
  )
}