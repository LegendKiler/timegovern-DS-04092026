import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Timer, ArrowRight, Clock, BookOpen, Zap, Brain } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the Pomodoro Technique?', a: 'The Pomodoro Technique is a time-management method developed by Francesco Cirillo in the late 1980s. You work in focused 25-minute intervals (called pomodoros), then take a 5-minute break. After four pomodoros, you take a longer 15-30 minute break.' },
  { q: 'Why is it called Pomodoro?', a: 'Pomodoro is Italian for tomato. Cirillo named the technique after the tomato-shaped kitchen timer he used as a university student to track his study sessions.' },
  { q: 'Who invented the Pomodoro Technique?', a: 'Francesco Cirillo invented it in the late 1980s while struggling to focus on university studies. He published it as a formal method in 2006.' },
  { q: 'Do I need a physical timer?', a: 'No. Any timer works - a phone app, a browser tab, or the TimeGovern Pomodoro timer. The physical tomato timer is iconic but not required.' },
  { q: 'What if I get interrupted during a pomodoro?', a: 'Cirillo recommends the "informative, negotiate, call back, schedule" approach. If someone interrupts, note it, agree to follow up later, and resume. If the task cannot wait, abandon the pomodoro and start over - the interrupted session does not count.' },
  { q: 'Is the Pomodoro Technique free?', a: 'Yes. The technique itself is free to learn and use. TimeGovern Pomodoro timer is completely free with no signup.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'What Is the Pomodoro Technique? Complete Guide', description: 'The Pomodoro Technique in plain English - what it is, how it works, why 25 minutes, and how to start today.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

export default function WhatIsPomodoroPage() {
  useEffect(() => {
    document.title = 'What Is the Pomodoro Technique? Complete Guide | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'The Pomodoro Technique in plain English - what it is, how it works, why 25 minutes, and how to start using it today for deep focus.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-purple-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Timer className="h-3.5 w-3.5 text-red-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-red-200">Productivity Method</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">What Is the Pomodoro Technique? Complete Guide</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">A simple 25-minute timer has helped millions of people beat procrastination and get more done. Here is how it works.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>The Pomodoro Technique is one of the most popular productivity methods in the world. It is simple enough to explain in 30 seconds but effective enough to reshape how you work. Here is the complete picture.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">The basic idea</h2>
          <p>Instead of working until you finish (or burn out), you work in short, focused bursts. Each burst is 25 minutes. Between bursts, you take short breaks. The premise is that <strong>short, timed sprints are easier to start and maintain than open-ended work sessions</strong>.</p>
          <p>The cycle is:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Pick one task</li>
            <li>Set a timer for 25 minutes</li>
            <li>Work on that task only - no interruptions, no multitasking</li>
            <li>When the timer rings, take a 5-minute break</li>
            <li>After four pomodoros, take a longer 15-30 minute break</li>
          </ol>
          <h2 className="text-2xl font-black tracking-tight mt-8">Why it works</h2>
          <p>Three things make the Pomodoro Technique effective:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>It lowers the barrier to starting.</strong> Committing to 25 minutes feels manageable; committing to "finish the project" does not.</li>
            <li><strong>It defends focus.</strong> During a pomodoro, you are not allowed to switch tasks. This limits the constant context-switching that fragments modern work.</li>
            <li><strong>It schedules recovery.</strong> Breaks are not optional - they are part of the method. This keeps energy up across the day instead of crashing by 2 PM.</li>
          </ul>
          <h2 className="text-2xl font-black tracking-tight mt-8">The four rules</h2>
          <p>Cirillo outlined four rules that define a true pomodoro:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>A pomodoro is indivisible - you cannot split a 25-minute session into smaller chunks.</li>
            <li>If a pomodoro is interrupted, it does not count. You start a new one.</li>
            <li>If a task takes less than one pomodoro, you can combine small tasks in one session.</li>
            <li>If a task takes more than 5-7 pomodoros, break it into smaller sub-tasks.</li>
          </ol>
          <h2 className="text-2xl font-black tracking-tight mt-8">Common mistakes</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Skipping breaks. The breaks are not optional - they are what make the next pomodoro productive.</li>
            <li>Using the 25 minutes to check email or messages. A pomodoro is a single-task session.</li>
            <li>Trying to make the timer longer to "get more done". Longer sessions degrade focus; stick with the format until you are experienced.</li>
            <li>Ignoring the tracking. Writing down which pomodoros you completed helps you estimate future work accurately.</li>
          </ul>
          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Timer className="h-10 w-10 text-indigo-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">Start a pomodoro right now</h3><p className="text-sm text-muted-foreground">Free timer with auto-advance breaks, sound alerts, and session tracking. No signup.</p></div><Link to="/pomodoro-timer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0">Open Timer <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/why-25-minutes-pomodoro" className="block rounded-xl border border-border bg-card hover:border-red-400 p-5 transition-colors"><Clock className="h-5 w-5 text-red-500 mb-2" /><h3 className="font-bold mb-1">Why 25 Minutes?</h3><p className="text-xs text-muted-foreground">The science behind the Pomodoro length.</p></Link><Link to="/blog/best-pomodoro-apps" className="block rounded-xl border border-border bg-card hover:border-red-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-red-500 mb-2" /><h3 className="font-bold mb-1">Best Pomodoro Apps</h3><p className="text-xs text-muted-foreground">Compared and ranked for 2026.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Pomodoro Technique Guide'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Note:</strong> This article is for informational purposes only. Productivity methods work differently for different people - try it for a week and see how it fits your workflow.</div>
        </div>
      </article>
    </>
  )
}