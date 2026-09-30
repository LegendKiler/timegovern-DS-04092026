import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid3x3, ArrowRight, BookOpen, Globe, Users, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a meeting heatmap?', a: 'A meeting heatmap is a visual grid that shows, for every hour of the day, whether each city on your team is in work time, shoulder time, or sleep time. Darker greens mean more cities are available.' },
  { q: 'How do I read the overlap score row?', a: 'The bottom row shows the combined availability score for each UTC hour. Higher numbers mean more cities are in work hours at that time. Look for peaks in the score row.' },
  { q: 'What is a day boundary marker?', a: 'A white outline around a heatmap cell indicates that the local time in that city has crossed midnight. This is where the calendar date changes, which matters when you schedule across distant time zones.' },
  { q: 'How do I export and share the heatmap?', a: 'Click the Export PNG button to download the current heatmap as an image. You can then share it via Slack, email, or paste it into a meeting invite.' },
  { q: 'How many cities can I fit in one view?', a: 'Up to 12 cities fit comfortably in the grid. Beyond that, the visual becomes unreadable. For larger teams, break them into smaller groups.' },
  { q: 'What duration should I pick?', a: 'Most recurring team meetings are 30 minutes or 1 hour. Use the duration selector to find the best window for the length you actually need.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Best Time for Meetings Across Multiple Cities', description: 'Complete guide to reading and using meeting heatmaps.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/best-time-meeting-multiple-cities' }

export default function BestTimeMultipleCitiesPage() {
  useEffect(() => {
    document.title = 'Best Time for Meetings Across Multiple Cities | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Best Time for Meetings Across Multiple Cities - complete guide with practical tools.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Best Time for Meetings Across Multiple Cities
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full mb-4">
            <Grid3x3 className="h-3.5 w-3.5 text-sky-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">Heatmaps - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Best Time for Meetings Across Multiple Cities
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            A practical guide to interpreting and sharing meeting heatmaps for global teams.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">Why visualise with a heatmap</h2>
          <p className="text-muted-foreground">A list of local times is hard to compare at a glance. A heatmap turns the whole 24-hour window into a colour grid, so your eye can find the best overlap column instantly. For teams across three or more time zones, this makes the difference between guessing and knowing.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The three colours</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Green:</strong> work hours (9am to 6pm local). Full availability.</li>
            <li><strong>Amber:</strong> shoulder hours (7-9am or 6-9pm local). Possible but not ideal.</li>
            <li><strong>Red:</strong> sleep hours (outside those windows). Do not schedule live meetings here.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Use the Extended Heatmap</h2>
          <p className="text-muted-foreground">The <Link to="/meeting-heatmap" className="text-primary font-bold hover:underline">Extended Meeting Heatmap</Link> adds day-boundary markers, an hourly breakdown table, a duration selector, and PNG export on top of the standard view.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Finding the best column</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Look at the Overlap score row at the bottom of the grid.</li>
            <li>Find the highest peak - that is the best single hour.</li>
            <li>Check the day-boundary markers - avoid columns where more than one city has just crossed midnight.</li>
            <li>Use the duration selector to see if a longer continuous window scores higher than a single peak.</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">Sharing the heatmap</h2>
          <p className="text-muted-foreground">Click Export PNG to save the current view as an image. Paste it into your team channel or attach it to a meeting invite. For recurring meetings, export once a quarter when DST changes shift the optimal window.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Common mistakes</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Ignoring day boundaries and scheduling calls at 11pm one day that is really the next morning elsewhere.</li>
            <li>Optimising for the majority and ignoring the one city that always takes the 6am slot.</li>
            <li>Not reviewing after DST transitions - the optimal hour can shift by 60 minutes twice a year.</li>
            <li>Forgetting that working hours are a cultural default, not universal (Spain, for example, runs later).</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Try it</h2>
          <p className="text-muted-foreground">Open the <Link to="/meeting-heatmap" className="text-primary font-bold hover:underline">Extended Heatmap</Link> and export your team configuration as a PNG for reference.</p>
        </div>

        <div className="my-8">
          <Link to="/meeting-heatmap" className="block rounded-2xl border-2 border-sky-500/30 bg-sky-500/5 hover:border-sky-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 shadow-md"><Grid3x3 className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-sky-500 transition-colors">Try the Extended Heatmap</h3>
                <p className="text-sm text-muted-foreground">Day markers, exports, and duration selection.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-sky-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/how-to-read-meeting-heatmap" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Continue reading</h3>
              <p className="text-xs text-muted-foreground">Next in the series.</p>
            </Link>
            <Link to="/blog/meeting-export-tips" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Clock className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Deep dive</h3>
              <p className="text-xs text-muted-foreground">Full breakdown.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title='Best Time for Meetings Across Multiple Cities' />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}