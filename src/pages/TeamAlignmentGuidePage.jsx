import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, ArrowRight, BookOpen, Calculator, Clock, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How do you align a globally distributed team?', a: 'Use three tools: a Team Alignment view for each proposed meeting time, a shared calendar with local time zones, and async-first workflows for everything that does not strictly need live conversation.' },
  { q: 'What is the ideal number of hours of overlap for a global team?', a: 'Aim for at least 3 to 4 hours of natural overlap per day for synchronous collaboration. Below that, the team must lean heavily on asynchronous communication.' },
  { q: 'How do you handle a team that spans US, Europe, and Asia?', a: 'No single meeting time works. Rotate the awkward slot across regions on a monthly or quarterly schedule. Use the Meeting Planner to test each rotation.' },
  { q: 'What tools help with global team coordination?', a: 'A live world clock, a meeting planner with overlap scoring, a team alignment view for verification, and a shared calendar system that respects local time zones.' },
  { q: 'How often should you review team scheduling?', a: 'Review at least twice per year around daylight saving transitions, plus anytime the team composition changes.' },
  { q: 'Is async-first realistic for every team?', a: 'No. Product, engineering, and support can often work async-first. Sales, customer success, and executive teams still need synchronous windows. Adapt to the work.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Team Alignment Guide for Global Teams', description: 'Complete guide for globally distributed teams.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/team-alignment-guide' }

export default function TeamAlignmentGuidePage() {
  useEffect(() => {
    document.title = 'Team Alignment Guide for Global Teams | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Team Alignment Guide for Global Teams - practical guide with tools and strategies.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Team Alignment Guide for Global Teams
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full mb-4">
            <Users className="h-3.5 w-3.5 text-purple-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Global teams - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Team Alignment Guide for Global Teams
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The complete playbook for managing distributed teams across time zones.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The core challenge</h2>
          <p className="text-muted-foreground">Globally distributed teams sacrifice two things to gain around-the-clock coverage: real-time collaboration and casual interaction. Managing that trade-off well is the entire job of distributed team operations.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The three-tier framework</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Available (9am to 6pm local):</strong> full participation expected. Schedule your key recurring meetings here.</li>
            <li><strong>Shoulder (7-9am or 6-9pm local):</strong> acceptable for occasional calls or one-offs. Not for weekly recurring.</li>
            <li><strong>Sleeping (9pm to 7am local):</strong> do not schedule live meetings. Use async communication only.</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">Use the Team Alignment tool</h2>
          <p className="text-muted-foreground">The free <Link to="/team-alignment" className="text-primary font-bold hover:underline">Team Alignment tool</Link> shows, for any UTC hour, where every selected city falls. Pick your meeting time, scan the groups, and see exactly who is Available, on Shoulder, or Sleeping.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Async-first practices</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Default to written communication (docs, threads, recorded video).</li>
            <li>Reserve live meetings for discussion, decisions, or relationship-building.</li>
            <li>Record every synchronous meeting for those who cannot attend.</li>
            <li>Summarise decisions in writing immediately after each live call.</li>
            <li>Use a shared status doc so people can catch up without waiting.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Rotation is the answer</h2>
          <p className="text-muted-foreground">If your team truly spans the globe, no fixed schedule works fairly. Rotate the inconvenient slot. This quarter Europe takes the 6am call; next quarter Asia-Pacific does. Fairness beats optimisation in distributed teams.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Review cadence</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Every daylight saving transition (usually March and October or November, depending on region).</li>
            <li>Any time team composition changes.</li>
            <li>Quarterly check-in on meeting load distribution.</li>
            <li>Twice yearly team survey to catch quiet dissatisfaction.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Try the tools</h2>
          <p className="text-muted-foreground">Start with the <Link to="/team-alignment" className="text-primary font-bold hover:underline">Team Alignment tool</Link> for verification, then the <Link to="/meeting-planner" className="text-primary font-bold hover:underline">Meeting Planner</Link> for planning the whole month.</p>
        </div>

        <div className="my-8">
          <Link to="/team-alignment" className="block rounded-2xl border-2 border-purple-500/30 bg-purple-500/5 hover:border-purple-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-md"><Users className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-purple-500 transition-colors">Try Team Alignment</h3>
                <p className="text-sm text-muted-foreground">Verify any meeting time across up to 12 cities.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/remote-team-time-zones" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Continue reading</h3>
              <p className="text-xs text-muted-foreground">Next in the series.</p>
            </Link>
            <Link to="/blog/distributed-team-meetings" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title='Team Alignment Guide for Global Teams' />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}