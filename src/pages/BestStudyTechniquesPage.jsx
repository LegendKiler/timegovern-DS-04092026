import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Clock, Brain, Zap, Target, Timer } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the most effective study technique?', a: 'Active recall combined with spaced repetition is the most effective approach shown in cognitive science. Instead of re-reading notes, test yourself repeatedly, spacing the tests over days. This beats re-reading, highlighting, and summarising by a wide margin.' },
  { q: 'How long should I study before taking a break?', a: 'Most people focus best in 25-50 minute sessions. The Pomodoro Technique uses 25 minutes with a 5-minute break, then a longer break after four sessions. This aligns with attention research showing focus degrades after 30-40 minutes.' },
  { q: 'Is it better to study in the morning or at night?', a: 'It depends on your chronotype. Lions (early risers) focus best in the morning; Wolves (night owls) peak in the evening. Trying to study against your biology wastes effort. Work with your natural rhythm.' },
  { q: 'Does listening to music help studying?', a: 'For most people, instrumental music at low volume is neutral to mildly helpful. Music with lyrics, or novel music that demands attention, is usually distracting. Silence or ambient sound works best for most learners.' },
  { q: 'How many hours a day should I study?', a: 'Quality beats quantity. Three to four hours of focused, active study is usually more productive than eight hours of passive re-reading. Take real breaks - the brain consolidates learning during rest.' },
  { q: 'What is the Feynman Technique?', a: 'The Feynman Technique is explaining a concept in simple language as if teaching someone else. If you cannot explain it simply, you do not understand it yet. This exposes gaps in your knowledge faster than re-reading.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'The 5 Best Study Techniques for Focused Learning', description: 'Active recall, spaced repetition, the Feynman Technique, interleaving, and Pomodoro - the five evidence-based study techniques that actually work.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

export default function BestStudyTechniquesPage() {
  useEffect(() => {
    document.title = 'The 5 Best Study Techniques for Focused Learning | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Active recall, spaced repetition, the Feynman Technique, interleaving, and Pomodoro - the five evidence-based study techniques that actually work.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-blue-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <BookOpen className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">Learning Science</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">The 5 Best Study Techniques for Focused Learning</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">Most students study wrong. Re-reading and highlighting feel productive but barely work. These five methods do.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>Cognitive science has produced a clear verdict on what works for learning. The techniques below are backed by decades of evidence and consistently outperform the passive methods most students still use.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">1. Active recall</h2>
          <p>Instead of reading your notes, close them and try to recall what you learned. Testing yourself strengthens memory far more than re-reading. Use flashcards, blank-page recall, or past exam questions. This is the single most effective technique in cognitive science.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">2. Spaced repetition</h2>
          <p>Review material at increasing intervals - one day, three days, one week, one month. Each successful recall at a longer gap strengthens the memory. This beats cramming because it fights the forgetting curve and moves knowledge into long-term memory.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">3. The Feynman Technique</h2>
          <p>Explain the concept in plain language, as if teaching someone who has never heard it before. If you cannot explain it simply, you have not understood it yet. This exposes gaps faster than any other technique.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">4. Interleaving</h2>
          <p>Instead of studying one topic for hours, alternate between related topics. Counterintuitive, but interleaving improves retention and transfer. Your brain must distinguish between similar ideas, which strengthens each one.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">5. Pomodoro for study sessions</h2>
          <p>Focus for 25 minutes, break for 5. After four sessions, take a longer break. This uses short, defined sprints to beat procrastination and keeps attention fresh. The scheduled breaks are not optional - they are what make the next session productive.</p>
          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Timer className="h-10 w-10 text-indigo-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">Try a 25-minute study sprint</h3><p className="text-sm text-muted-foreground">Free Pomodoro timer with auto-advance breaks, sound alerts, and session tracking.</p></div><Link to="/pomodoro-timer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0">Start Timer <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/how-to-stop-procrastinating" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors"><Brain className="h-5 w-5 text-cyan-500 mb-2" /><h3 className="font-bold mb-1">How to Stop Procrastinating</h3><p className="text-xs text-muted-foreground">7 science-backed strategies.</p></Link><Link to="/blog/deep-work-guide" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors"><Zap className="h-5 w-5 text-cyan-500 mb-2" /><h3 className="font-bold mb-1">Deep Work Guide</h3><p className="text-xs text-muted-foreground">How to focus in a distracted world.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Best Study Techniques'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Note:</strong> This article is for informational purposes only. Individual learning styles vary - experiment to find what works for you.</div>
        </div>
      </article>
    </>
  )
}