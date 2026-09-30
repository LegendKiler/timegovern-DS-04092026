import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Hash, Sparkles, ChevronLeft, ChevronRight, Calendar, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { getISOWeek, getWeeksInYear, getWeekStartDate } from '../lib/calendarUtils'

const FAQ = [
  { q: 'What is the current week number?', a: 'Today falls in ISO week {week} of {year}.' },
  { q: 'What is an ISO week number?', a: 'An ISO week number is a number from 1 to 52 (or 53) that identifies a week within a year. ISO 8601 defines week 1 as the week that contains the first Thursday of the year, or equivalently the week containing January 4.' },
  { q: 'Why do some years have 53 weeks?', a: 'A year has 53 ISO weeks when January 1 is a Thursday, or when it is a leap year and January 1 is a Wednesday. All other years have 52 weeks.' },
  { q: 'Do all countries use ISO week numbers?', a: 'Most of Europe, Asia, and international standards use ISO week numbers. The US, Canada, and a few other countries use a different week-numbering convention where weeks start on Sunday.' },
  { q: 'How do I find the start date of a week?', a: 'ISO week 1 always starts on the Monday of the week containing January 4. Every subsequent week starts 7 days later.' },
  { q: 'What is the difference between week number and week of year?', a: 'They mean the same thing. Week number and week of year both refer to the position of a week within the calendar year, counted from 1.' },
]

export default function WeekNumbersPage() {
  const today = useMemo(() => new Date(), [])
  const [year, setYear] = useState(today.getFullYear())
  const currentWeek = getISOWeek(today)
  const weeksInYear = getWeeksInYear(year)

  const FAQ_FILLED = FAQ.map((f) => ({ q: f.q, a: f.a.replace('{week}', String(currentWeek)).replace('{year}', String(today.getFullYear())) }))
  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_FILLED.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

  useEffect(() => {
    document.title = 'Week Numbers ' + year + ' - ISO Week Number and Dates | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'ISO week numbers for ' + year + ' with start and end dates. Current week is ' + currentWeek + '. Free, printable, no signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [year, currentWeek])

  const weeks = useMemo(() => {
    const list = []
    for (let w = 1; w <= weeksInYear; w++) {
      const start = getWeekStartDate(year, w)
      const end = new Date(start); end.setDate(start.getDate() + 6)
      list.push({ w, start, end })
    }
    return list
  }, [year, weeksInYear])

  const fmt = (d) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(d)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">Current week: {currentWeek} of {today.getFullYear()}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Hash className="h-10 w-10 md:h-14 md:w-14 text-cyan-300" />
              Week Numbers
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              ISO 8601 week numbers for {year} with start and end dates. {weeksInYear} weeks this year.
            </p>
          </div>
        </div>

        <Card className="border-border shadow-xl">
          <CardContent className="p-4 flex items-center justify-center gap-3">
            <button onClick={() => setYear(year - 1)} className="p-2 rounded-lg border border-border hover:border-primary transition-colors" aria-label="Previous year">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="text-2xl font-black tabular-nums min-w-[100px] text-center">{year}</div>
            <button onClick={() => setYear(year + 1)} className="p-2 rounded-lg border border-border hover:border-primary transition-colors" aria-label="Next year">
              <ChevronRight className="h-4 w-4" />
            </button>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-3">
          <Card><CardContent className="p-5">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Weeks in {year}</div>
            <div className="text-3xl font-black tabular-nums">{weeksInYear}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Current week</div>
            <div className="text-3xl font-black tabular-nums">{currentWeek}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Week 1 starts</div>
            <div className="text-base font-black">{fmt(weeks[0].start)}</div>
          </CardContent></Card>
        </div>

        <Card className="border-border shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-black">Week</th>
                  <th className="text-left py-3 px-4 font-black">Start</th>
                  <th className="text-left py-3 px-4 font-black">End</th>
                  <th className="text-left py-3 px-4 font-black hidden md:table-cell">Link</th>
                </tr>
              </thead>
              <tbody>
                {weeks.map(({ w, start, end }) => {
                  const isCurrent = year === today.getFullYear() && w === currentWeek
                  return (
                    <tr key={w} className={'border-b border-border/30 ' + (isCurrent ? 'bg-cyan-500/10' : 'hover:bg-primary/5')}>
                      <td className="py-2.5 px-4 font-black tabular-nums">
                        {w}
                        {isCurrent && <span className="ml-2 text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Current</span>}
                      </td>
                      <td className="py-2.5 px-4 text-muted-foreground">{fmt(start)}</td>
                      <td className="py-2.5 px-4 text-muted-foreground">{fmt(end)}</td>
                      <td className="py-2.5 px-4 hidden md:table-cell">
                        <Link to={'/calendar/' + start.getFullYear() + '/' + String(start.getMonth() + 1).padStart(2, '0')} className="text-xs text-primary hover:underline">
                          View month
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/calendar" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <Calendar className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1">Calendar</h3>
              <p className="text-xs text-muted-foreground">Interactive month view.</p>
            </Link>
            <Link to="/days-between-dates" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Calendar className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Days Between</h3>
              <p className="text-xs text-muted-foreground">Calculate date gaps.</p>
            </Link>
            <Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <Calendar className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">World Clock</h3>
              <p className="text-xs text-muted-foreground">Live time worldwide.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Official sources</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="https://www.iso.org/iso-8601-date-and-time-format.html" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">ISO 8601</h3>
              <p className="text-xs text-muted-foreground">Week numbering standard.</p>
            </a>
            <a href="https://en.wikipedia.org/wiki/ISO_week_date" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">ISO Week Date</h3>
              <p className="text-xs text-muted-foreground">Detailed reference.</p>
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ_FILLED.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Week Numbers'} />
        </div>
      </div>
    </>
  )
}