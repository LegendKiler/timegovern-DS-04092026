import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Globe, ArrowRight, Clock, BookOpen, MapPin, Sun } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Why do different countries have different times?', a: 'Time zones exist because Earth rotates. The sun rises in the east and sets in the west, so noon at one longitude is not noon at another. In 1884, the world agreed to divide the planet into 24 time zones, each roughly 15 degrees of longitude wide - one hour apart.' },
  { q: 'Who invented time zones?', a: 'The modern system was proposed by Canadian railway engineer Sir Sandford Fleming in 1879. It was adopted at the International Meridian Conference in Washington in 1884, with Greenwich in London chosen as the prime meridian.' },
  { q: 'Why are some time zones offset by 30 or 45 minutes?', a: 'Some countries chose half-hour or quarter-hour offsets to better match their solar day - India uses UTC+5:30, Nepal uses UTC+5:45, and parts of Australia use UTC+9:30. These non-standard offsets are a legacy of local decisions.' },
  { q: 'What is UTC?', a: 'UTC stands for Coordinated Universal Time. It is the primary time standard by which the world regulates clocks and time - an atomic-clock based reference that never observes daylight saving. All time zones are defined as an offset from UTC.' },
  { q: 'Why is UTC not GMT?', a: 'GMT (Greenwich Mean Time) is a time zone; UTC is a time standard. GMT is based on astronomical observation at the Greenwich meridian; UTC is based on atomic clocks. In everyday use they are effectively the same, but UTC is the scientific reference.' },
  { q: 'Do all countries use daylight saving time?', a: 'No. About 70 countries observe DST and 130 do not. The United States, most of Europe, and parts of Australia do. China, India, Japan, and most of Africa and Southeast Asia do not.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Why Different Countries Have Different Times', description: 'The history and science of time zones - why Earth rotation forced a global standard, and why some countries use half-hour offsets.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, datePublished: new Date().toISOString().split('T')[0], dateModified: new Date().toISOString().split('T')[0] }

export default function WhyDifferentTimesPage() {
  useEffect(() => {
    document.title = 'Why Different Countries Have Different Times | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'The history and science of time zones - why Earth rotation forced a global standard, and why some countries use half-hour offsets.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <article className="container mx-auto p-4 max-w-3xl space-y-8">
        <header className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-indigo-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <MapPin className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-sky-200">Time Zones</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">Why Different Countries Have Different Times</h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">Time zones are not random. They are a 140-year-old global agreement driven by trains, trade, and the rotation of the Earth.</p>
          </div>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
          <p>Before the 1880s, time was local. Every town set its clocks by the sun - noon was when the sun was highest in that town. This worked when travel was slow. It broke the moment railways arrived.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">The problem: railways</h2>
          <p>A train leaving one town at "noon" would arrive at another town where it was "noon" according to a different solar time - a difference of several minutes per 100 km. Timetables became impossible. In 1876, a train crash in Ireland was partly blamed on a misread of local time.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">The solution: 24 time zones</h2>
          <p>In 1879, Canadian railway engineer <strong>Sir Sandford Fleming</strong> proposed dividing the world into 24 equal time zones - each 15 degrees of longitude wide and one hour apart. The system was adopted at the <strong>International Meridian Conference</strong> in Washington in 1884, with Greenwich in London as the prime meridian (UTC+0).</p>
          <p>By 1929, almost every country had adopted standard time zones. The world finally agreed on what time it was everywhere.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Why some zones are offset by 30 or 45 minutes</h2>
          <p>Not every country follows the strict hour system. A few chose half-hour or quarter-hour offsets to better match their solar day:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>India</strong> - UTC+5:30</li>
            <li><strong>Nepal</strong> - UTC+5:45 (the only quarter-hour offset)</li>
            <li><strong>Adelaide, Australia</strong> - UTC+9:30</li>
            <li><strong>Newfoundland, Canada</strong> - UTC-3:30</li>
            <li><strong>Iran</strong> - UTC+3:30</li>
          </ul>
          <p>These "odd offsets" are a legacy of local decisions made before the modern system settled. Countries occasionally change them, but the changes are rare and usually political.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">What is UTC and why does it matter?</h2>
          <p><strong>UTC</strong> (Coordinated Universal Time) is the world reference standard. It is based on atomic clocks and never observes daylight saving. Every time zone is defined as an offset from UTC - London is UTC+0, New York is UTC-5 (or -4 in summer), Tokyo is UTC+9.</p>
          <p>You may also see <strong>GMT</strong> (Greenwich Mean Time). GMT is a time zone; UTC is a time standard. For everyday purposes they are the same, but UTC is the one scientists and computers use.</p>
          <h2 className="text-2xl font-black tracking-tight mt-8">Daylight saving complicates things</h2>
          <p>About 70 countries observe daylight saving time (DST), shifting their clocks forward by an hour in spring and back in autumn. The others - China, India, Japan, and most of Africa and Southeast Asia - do not.</p>
          <p>This means the gap between two cities is not fixed. London and New York are 5 hours apart in winter and 4 hours apart in summer, because the UK and US switch DST on different dates.</p>
          <Card className="bg-indigo-500/5 border-indigo-500/20 mt-8"><CardContent className="p-6 flex flex-col md:flex-row items-center gap-4"><Globe className="h-10 w-10 text-indigo-500 shrink-0" /><div className="flex-1"><h3 className="font-black text-lg mb-1">See live time in 136 cities</h3><p className="text-sm text-muted-foreground">Free World Clock with day/night indicators, offset badges, and automatic DST - no signup.</p></div><Link to="/world-clock" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold transition-colors shrink-0">Open World Clock <ArrowRight className="h-4 w-4" /></Link></CardContent></Card>
          <h2 className="text-2xl font-black tracking-tight mt-8">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3"><Link to="/blog/how-to-schedule-meetings-across-time-zones" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors"><Clock className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1">Scheduling Across Time Zones</h3><p className="text-xs text-muted-foreground">Practical guide for global teams.</p></Link><Link to="/blog/what-is-pomodoro-technique" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors"><Clock className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1">Pomodoro Technique</h3><p className="text-xs text-muted-foreground">Focus in short sprints with automatic breaks.</p></Link><Link to="/time-zone-converter" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors"><BookOpen className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1">Time Zone Converter</h3><p className="text-xs text-muted-foreground">Convert any time across cities.</p></Link></div>
          <h2 className="text-2xl font-black tracking-tight mt-8">Frequently asked questions</h2>
          <div className="space-y-3">{FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}</div>
          <div className="flex justify-center mt-8"><ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Why Different Times'} /></div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground mt-8"><strong className="text-amber-700 dark:text-amber-400">Note:</strong> This article is for informational purposes only. Time zone rules change occasionally due to political decisions - always verify current rules for critical scheduling.</div>
        </div>
      </article>
    </>
  )
}