import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sun, ArrowRight, Clock, BookOpen, Timer, Zap, Target, Coffee } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Why is a morning routine important?', a: 'A morning routine sets the tone for the day. It reduces decision fatigue, protects your focus window, and anchors your circadian rhythm. People with consistent morning routines report higher productivity and lower stress.' },
  { q: 'What time should I wake up?', a: 'Wake at the same time every day, ideally aligned with your chronotype. Lions do well before 6:30 AM, Bears around 7-8 AM, Wolves later. Consistency matters more than an early hour.' },
  { q: 'How long should a morning routine be?', a: 'Sixty to ninety minutes is a good target. If that is too much, start with 20 minutes - wake time, hydration, sunlight, and one focused task. You can expand later.' },
  { q: 'What should I NOT do in the morning?', a: 'Avoid checking email or social media in the first hour. Both flood your brain with other people agendas before you have set your own. Also avoid snoozing - it fragments sleep and makes you groggier.' },
  { q: 'Should I exercise in the morning?', a: 'Morning exercise raises alertness and helps anchor the circadian rhythm. It is not essential - a walk or stretch works. Vigorous workouts are fine if you enjoy them, but do not force what you hate.' },
  { q: 'What if I am not a morning person?', a: 'Adjust the routine to your chronotype. Wolves can do a mid-morning routine instead. The principles - consistent wake time, sunlight, hydration, focused work before email - work at any hour of the day.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Build a Morning Routine That Sticks', description: 'A practical guide to morning routines - what to include, what to skip, and how to build a sustainable one for your chronotype.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

export default function MorningRoutineGuidePage() {
  useEffect(() => {
    document.title = 'How to Build a Morning Routine That Sticks | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'A practical guide to morning routines - what to include, what to skip, and how to build a sustainable one for your chronotype.'
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
              <Sun className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Daily Habits</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">How to Build a Morning Routine That Sticks</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">Most morning routines fail in a week. Here is how to build one that survives real life.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>The best morning routine is not the one you see on YouTube. It is the one you will actually do on a Tuesday when you slept badly and have three meetings. Here is a practical framework.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Step 1: Fix your wake time first</h2>
          <p>Pick a wake time you can hold 7 days a week. Consistency is what anchors the circadian rhythm. An ambitious 5 AM wake that you abandon by Wednesday is worse than a 7 AM wake you keep all week. If you are a Wolf, 7 AM may be your 5 AM - work with your biology, not against it.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Step 2: Hydrate before caffeine</h2>
          <p>A full glass of water before your first coffee. Overnight you lose water, and even mild dehydration impacts alertness. Save the caffeine for 60-90 minutes after waking - your cortisol peaks then and coffee has a stronger effect later.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Step 3: Get sunlight within 30 minutes</h2>
          <p>Ten minutes outdoors, or 20 minutes near an open window. Bright light stops melatonin production, boosts alertness, and sets the circadian clock for the day. This single habit does more for sleep than almost anything else.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Step 4: Move your body</h2>
          <p>Does not have to be a workout. A 10-minute walk, some stretching, a few push-ups. Movement wakes up the nervous system and warms the body. Do it before screens if you can.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Step 5: Do one focused task before email</h2>
          <p>The first hour of the day is your sharpest cognitive window. Use it for one piece of deep work - writing, planning, coding, thinking - before opening email or messages. Anything you do in the first hour sets the tone for the next eight.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Step 6: Skip the snooze</h2>
          <p>Snoozing fragments the last portion of sleep and makes you groggier, not more rested. Put the alarm across the room if needed. When the alarm rings, get up.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Step 7: Keep it short and repeatable</h2>
          <p>The full routine does not need to be more than 45 minutes. Water, sunlight, movement, one focused task. Everything else is optional. Consistency beats complexity.</p>
          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Timer className="h-10 w-10 text-indigo-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">Start your focused hour</h3><p className="text-sm text-muted-foreground">Free Pomodoro timer with auto-advance breaks, sound alerts, and session tracking.</p></div><Link to="/pomodoro-timer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0">Start Timer <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/sleep-hygiene-tips" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-amber-500 mb-2" /><h3 className="font-bold mb-1">Sleep Hygiene Tips</h3><p className="text-xs text-muted-foreground">12 rules for better sleep.</p></Link><Link to="/blog/deep-work-guide" className="block rounded-xl border border-border bg-card hover:border-amber-400 p-5 transition-colors"><Zap className="h-5 w-5 text-amber-500 mb-2" /><h3 className="font-bold mb-1">Deep Work Guide</h3><p className="text-xs text-muted-foreground">How to focus in a distracted world.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Morning Routine Guide'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Note:</strong> This article is for informational purposes only. Work with your chronotype - an early routine is not inherently superior to a later one.</div>
        </div>
      </article>
    </>
  )
}