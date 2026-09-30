import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid3x3, Sparkles, BookOpen, Globe, Users, ArrowRight, Clock, Download } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import MeetingHeatmapExtended from '../components/MeetingHeatmapExtended'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is an extended meeting heatmap?', a: 'It is a full 24-hour visual grid showing, for every city on your team, whether each hour is work time, shoulder time, or sleep time. It also shows the aggregate overlap score for each hour and highlights day-boundary shifts.' },
  { q: 'What does the day boundary marker mean?', a: 'A white outline around a cell indicates that the local hour in that city has just wrapped to 00:00, meaning the calendar day has changed. This helps you avoid accidentally scheduling a call at 11pm Monday in one city that is really 8am Tuesday in another.' },
  { q: 'How does the duration selector work?', a: 'Choose 30 min, 1h, 1.5h, or 2h. The tool scans every 24-hour window of that length and finds the one with the highest combined overlap score across all selected cities.' },
  { q: 'Can I export the heatmap as an image?', a: 'Yes. Click the Export PNG button to download the current heatmap as a PNG image. The export includes all city rows, the UTC hour labels, the overlap score bar, and a timestamp.' },
  { q: 'How many cities can I compare?', a: 'Between 2 and 12 cities. For more, you would need a spreadsheet. For simpler 2-city comparisons, use the Time Zone Converter.' },
  { q: 'Is my data stored?', a: 'No. Everything runs in your browser. The heatmap, scoring, and PNG export all happen locally. Nothing is uploaded to a server.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Extended Meeting Heatmap', description: 'Full 24-hour heatmap with day-boundary markers, hourly breakdown table, duration selector, and PNG export for up to 12 cities.', applicationCategory: 'UtilityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/meeting-heatmap', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function MeetingHeatmapPage() {
  useEffect(() => {
    document.title = 'Extended Meeting Heatmap - Exportable 24h Grid | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Extended meeting heatmap with day-boundary markers, hourly breakdown table, duration selector, and PNG export. Free, up to 12 cities.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-6xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-sky-200">Free - Exportable - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Grid3x3 className="h-10 w-10 md:h-14 md:w-14 text-sky-300" />
              Extended Meeting Heatmap
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Full 24-hour grid with day-boundary markers, hourly breakdown, duration selector, and PNG export.
            </p>
          </div>
        </div>

        <MeetingHeatmapExtended />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What this tool adds</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Grid3x3 className="h-5 w-5 text-sky-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Day boundaries</h3><p className="text-xs text-muted-foreground">White outlines mark where each city crosses midnight, so you never mix up days.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Download className="h-5 w-5 text-emerald-500 mb-2" /><h3 className="font-bold mb-1 text-sm">PNG export</h3><p className="text-xs text-muted-foreground">Download the full heatmap as an image for Slack, email, or docs.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Clock className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Duration selector</h3><p className="text-xs text-muted-foreground">Find the best 30-minute, 1-hour, or 2-hour window, not just single hours.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/meeting-planner" className="block rounded-xl border border-border bg-card hover:border-sky-400 p-5 transition-colors">
              <Users className="h-5 w-5 text-sky-500 mb-2" />
              <h3 className="font-bold mb-1">Meeting Planner</h3>
              <p className="text-xs text-muted-foreground">Simple 24h heatmap with scenarios.</p>
            </Link>
            <Link to="/team-alignment" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Clock className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Team Alignment</h3>
              <p className="text-xs text-muted-foreground">Work/sleep status per city.</p>
            </Link>
            <Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <Globe className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">World Clock</h3>
              <p className="text-xs text-muted-foreground">Live time in 12 pinned cities.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Extended Meeting Heatmap'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Working hours assumed 9am-6pm local. For informational purposes only.
        </div>
      </div>
    </>
  )
}