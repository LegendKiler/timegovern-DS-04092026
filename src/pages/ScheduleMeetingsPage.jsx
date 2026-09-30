import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ArrowRight, Globe, BookOpen, Users, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How do I schedule a meeting across time zones?', a: 'First, list all attendee cities and their time zones. Then use a time zone converter to find an hour that lands within 9 AM - 6 PM for as many people as possible. Rotate the "inconvenient" slot fairly across meetings if no slot works for everyone.' },
  { q: 'What is the best time for a global team meeting?', a: 'The most common solution is to anchor the meeting to one "hub" time zone - usually where most attendees are - and accept that remote attendees on other continents will join either early morning or late evening. Rotate the anchor if possible.' },
  { q: 'How many hours apart are New York and London?', a: 'New York is 5 hours behind London in winter (November to March) and 4 hours behind during the US-UK DST overlap in spring and autumn. The exact gap varies because the two countries switch daylight saving on different dates.' },
  { q: 'How do I avoid scheduling during someone\u2019s night?', a: 'Use a time zone converter that shows working hours per zone. Aim for 9 AM - 6 PM in each attendee\u2019s local time. If that is impossible, move the meeting to a rotating slot so the same person is not always inconvenienced.' },
  { q: 'What is a "golden hour" for global meetings?', a: 'A golden hour is an overlapping window where most attendees are within working hours. For EU + US East Coast, it is typically 2-4 PM London time. For US + Asia-Pacific, it is usually early morning US (late evening Asia) - which is why those two regions rarely find a truly convenient overlap.' },
  { q: 'Can I schedule a meeting without knowing everyone\u2019s time zone?', a: 'Yes, but it is risky. The safest approach is to send a calendar invite with a time zone-aware tool (Google Calendar, Outlook) - it shows each recipient their local time automatically. Never send a meeting time without a time zone reference.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Schedule Meetings Across Time Zones', description: 'A practical guide to scheduling global meetings - finding overlap windows, avoiding night-time calls, and rotating inconvenient slots fairly.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

export default function ScheduleMeetingsPage() {
  useEffect(() => {
    document.title = 'How to Schedule Meetings Across Time Zones | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'A practical guide to scheduling global meetings - finding overlap windows, avoiding night-time calls, and rotating inconvenient slots fairly across time zones.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-sky-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Users className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-sky-200">Remote Work Guide</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">How to Schedule Meetings Across Time Zones</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">Scheduling a global meeting is not just math - it is fairness. Here is a practical framework that works for real teams.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>Global scheduling is one of the most consistently underestimated parts of remote work. The math is simple, but the human side is not: someone always has to wake up early or stay up late. The goal is not to eliminate that - it is to share it fairly.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Step 1: List cities and time zones</h2>
          <p>Before anything else, list every attendee\u2019s city and current offset from UTC. Do not rely on memory - offsets change twice a year with daylight saving, and the two countries you care about may not switch on the same weekend.</p>
          <p>If someone says "I\u2019m on London time", verify. London is UTC+0 in winter and UTC+1 in summer. The other person may not know which one applies to your meeting date.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Step 2: Find the overlap window</h2>
          <p>Overlay working hours for each city - typically 9 AM to 6 PM local - and look for a shared window. Common overlap patterns:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>US East + UK</strong> - 2-4 PM London (9-11 AM New York)</li>
            <li><strong>US East + EU West</strong> - 3-5 PM Paris (9-11 AM New York)</li>
            <li><strong>UK + India</strong> - 1:30-6 PM London (7-11:30 PM Mumbai)</li>
            <li><strong>US West + Australia</strong> - typically impossible without someone joining before 6 AM or after 10 PM</li>
            <li><strong>US + Japan</strong> - early morning US (late evening Japan) or very early morning Japan (afternoon US)</li>
          </ul>
          <h2 className="text-2xl font-black tracking-tight mt-8">Step 3: Rotate the inconvenience</h2>
          <p>If a recurring meeting cannot fit everyone, rotate the awkward slot. One meeting is early for Europe, the next is late for the US, the one after is inconvenient for Asia. Nobody should always be the one waking at 5 AM.</p>
          <p>Teams that do not rotate end up with the same people silently burning out - or leaving. Scheduling fairness is a retention issue, not a courtesy.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Step 4: Send time zone-aware invites</h2>
          <p>Never send a meeting time by chat or email in plain text. Send a calendar invite through a time zone-aware tool (Google Calendar, Microsoft Outlook, Apple Calendar). These show each recipient their own local time and adjust automatically if the time zone rules change before the meeting.</p>
          <p>If you must use text, always include the time zone reference explicitly: "3 PM London time (10 AM New York)." The parenthetical saves confusion.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Step 5: Use the right tools</h2>
          <p>Two tools are enough to handle almost any scheduling problem:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>A world clock</strong> - to see the current time in all attendee cities at a glance</li>
            <li><strong>A time zone converter</strong> - to test specific proposed times</li>
          </ul>
          <p>Both are available on TimeGovern for free, no signup required.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Common mistakes</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Forgetting that daylight saving changes on different dates in different countries</li>
            <li>Assuming the meeting time is the same for everyone (it never is)</li>
            <li>Never rotating the inconvenient slot</li>
            <li>Scheduling a meeting without knowing who is on holiday</li>
            <li>Using "GMT" and "UTC" as if they are always interchangeable (they are, but only for the UK in winter)</li>
          </ul>
          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Clock className="h-10 w-10 text-indigo-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">Convert times across any city</h3><p className="text-sm text-muted-foreground">Free time zone converter - test any proposed meeting time instantly.</p></div><Link to="/time-zone-converter" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0">Open Converter <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/why-different-countries-have-different-times" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors"><Globe className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1">Why Different Times?</h3><p className="text-xs text-muted-foreground">The history and science of time zones.</p></Link><Link to="/blog/best-pomodoro-apps" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors"><Globe className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1">Best Pomodoro Apps</h3><p className="text-xs text-muted-foreground">Six productivity apps compared.</p></Link><Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1">World Clock</h3><p className="text-xs text-muted-foreground">Live time in 136 cities.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Scheduling Across Time Zones'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Note:</strong> This article is for informational purposes only. Time zone rules and DST dates change occasionally - always verify for critical scheduling.</div>
        </div>
      </article>
    </>
  )
}