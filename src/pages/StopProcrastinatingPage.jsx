import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Timer, ArrowRight, Clock, BookOpen, Zap, Brain, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the main cause of procrastination?', a: 'Procrastination is not laziness. Research shows it is primarily an emotion-regulation problem. We avoid tasks that make us feel anxious, bored, overwhelmed, or insecure, and we seek short-term mood repair from distractions.' },
  { q: 'How can I stop procrastinating quickly?', a: 'The fastest method is the two-minute rule - commit to doing the task for just two minutes. Starting is the hardest part, and once you begin, momentum usually carries you forward. Pair this with the Pomodoro Technique for longer tasks.' },
  { q: 'Why does procrastination feel good at first?', a: 'When you avoid a stressful task, your brain gets a small dopamine hit from relief. This creates a reward loop - the more you avoid, the more your brain learns that avoidance brings relief. Breaking the loop requires action despite the feeling.' },
  { q: 'Is procrastination a mental health issue?', a: 'Chronic procrastination is linked to higher rates of anxiety, depression, and low self-esteem, but it is not a diagnosis on its own. If procrastination is significantly impacting your life, speak to a mental health professional.' },
  { q: 'How long should a focus session be?', a: 'For most people, 25 minutes works best - long enough to make progress, short enough that starting feels manageable. Longer tasks may suit 50-minute deep-work sessions. The key is to commit to the timebox regardless of how you feel.' },
  { q: 'Does music help with procrastination?', a: 'It depends. Instrumental music at low volume helps some people enter focus. Lyrics or novel music can be distracting. For most people, silence or ambient sound works better than anything with words.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Stop Procrastinating: 7 Science-Backed Strategies', description: 'Procrastination is an emotion problem, not a laziness problem. Here are 7 evidence-based strategies to start tasks you have been avoiding.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

export default function StopProcrastinatingPage() {
  useEffect(() => {
    document.title = 'How to Stop Procrastinating: 7 Science-Backed Strategies | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Procrastination is an emotion problem, not a laziness problem. Here are 7 evidence-based strategies to start tasks you have been avoiding.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-purple-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Brain className="h-3.5 w-3.5 text-rose-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-rose-200">Productivity Science</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">How to Stop Procrastinating: 7 Science-Backed Strategies</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">Procrastination is not a time-management problem. It is an emotion problem. Fix the emotion, and the action follows.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>If you have tried planners, apps, and discipline and still procrastinate, the problem is not your system. It is the emotion attached to the task. Procrastination research from Dr Tim Pychyl and others shows that we avoid tasks that make us feel anxious, bored, or insecure - and we distract ourselves to feel better in the moment.</p>
          <p>The strategies below work because they address the emotion, not the calendar.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">1. The two-minute rule</h2>
          <p>Commit to doing the task for two minutes. Not finishing it - just starting it. The hardest part of any task is the threshold of beginning. Once you start, momentum usually takes over. Most two-minute starts turn into 20-minute work sessions.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">2. Use a timer</h2>
          <p>Open-ended tasks feel infinite. A timer converts them into short, defined sprints. The Pomodoro Technique uses 25-minute focus sessions with 5-minute breaks. Suddenly the task has an end date - and the brain accepts it.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">3. Break the task into tiny pieces</h2>
          <p>If the task on your list feels overwhelming, it is too big. Write the next physical action. Not "write the report" but "open a document and write the title." Small actions are impossible to procrastinate on.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">4. Remove the friction</h2>
          <p>Every click between you and the task adds a chance to bail. Open the document the night before. Leave the running shoes by the door. Delete the social app from your phone during work hours. Reduce the number of decisions required to start.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">5. Accept the feeling, then act anyway</h2>
          <p>Procrastination is a mood-repair mechanism. Trying to feel motivated before starting is backwards - action creates motivation, not the other way around. Commit to starting while you still feel resistance. The emotion fades; the work stays.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">6. Use the if-then plan</h2>
          <p>Pre-decide what you will do when the trigger hits. "If I feel the urge to check my phone during a focus session, then I will put it in another room." Implementation intentions like this double or triple follow-through rates in research.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">7. Forgive yourself for past procrastination</h2>
          <p>This one sounds soft but is backed by strong research. Students who forgave themselves for procrastinating on a first exam procrastinated less on the next one. Guilt fuels avoidance. Self-compassion breaks the loop.</p>
          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Timer className="h-10 w-10 text-indigo-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">Start a 25-minute focus session</h3><p className="text-sm text-muted-foreground">Free Pomodoro timer with auto-advance breaks, sound alerts, and session tracking. No signup.</p></div><Link to="/pomodoro-timer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0">Start Timer <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/deep-work-guide" className="block rounded-xl border border-border bg-card hover:border-rose-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-rose-500 mb-2" /><h3 className="font-bold mb-1">Deep Work Guide</h3><p className="text-xs text-muted-foreground">How to focus in a distracted world.</p></Link><Link to="/blog/best-study-techniques" className="block rounded-xl border border-border bg-card hover:border-rose-400 p-5 transition-colors"><Clock className="h-5 w-5 text-rose-500 mb-2" /><h3 className="font-bold mb-1">Best Study Techniques</h3><p className="text-xs text-muted-foreground">Evidence-based methods for focused learning.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Stop Procrastinating'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Note:</strong> This article is for informational purposes only. If procrastination significantly impacts your daily life, consider speaking with a mental health professional.</div>
        </div>
      </article>
    </>
  )
}