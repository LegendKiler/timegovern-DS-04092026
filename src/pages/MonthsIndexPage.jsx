import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Sparkles, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { MONTH_NAMES, MONTH_SLUGS, getDaysInMonth, isLeapYear } from '../lib/calendarUtils'

export default function MonthsIndexPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const leap = isLeapYear(year)

  useEffect(() => {
    document.title = 'Months of the Year ' + year + ' - 12 Months with Days | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'All 12 months of ' + year + ' with number of days, start and end weekdays, and printable calendar links. Free, no signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [year])

  const FAQ = [
    { q: 'How many months are in a year?', a: 'There are 12 months in a year. Each month has between 28 and 31 days.' },
    { q: 'Which month has the fewest days?', a: 'February has 28 days in a common year and 29 in a leap year. Every other month has 30 or 31 days.' },
    { q: 'How many days does each month have?', a: 'January 31, February 28 or 29, March 31, April 30, May 31, June 30, July 31, August 31, September 30, October 31, November 30, December 31.' },
    { q: 'Why do we have 12 months?', a: 'The 12-month calendar originates from the Roman calendar, which was itself based on lunar cycles. The modern Gregorian calendar has 12 months with a total of 365 or 366 days.' },
    { q: 'Is ' + year + ' a leap year?', a: year + ' is ' + (leap ? 'a leap year. February has 29 days this year.' : 'not a leap year. February has 28 days this year.') },
    { q: 'What is the first month of the year?', a: 'January is the first month of the year in the Gregorian calendar.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

  const getDow = (y, m, d) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(y, m - 1, d).getDay()]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">12 months - {leap ? 366 : 365} days in {year}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Calendar className="h-10 w-10 md:h-14 md:w-14 text-cyan-300" />
              Months
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              All 12 months with days, weekday starts, and calendar links.
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {MONTH_NAMES.map((m, i) => {
            const num = i + 1
            const days = getDaysInMonth(year, num)
            return (
              <Link key={m} to={'/calendar/' + year + '/' + MONTH_SLUGS[i]} className="block rounded-2xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-[10px] font-mono font-bold text-muted-foreground">MONTH {String(num).padStart(2, '0')}</div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl font-black mb-2 group-hover:text-cyan-500 transition-colors">{m}</h3>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>{days} days</div>
                  <div>Starts on {getDow(year, num, 1)}</div>
                </div>
              </Link>
            )
          })}
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/calendar" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <Calendar className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1">Full Calendar</h3>
              <p className="text-xs text-muted-foreground">Interactive month view with week numbers.</p>
            </Link>
            <Link to="/week-numbers" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Calendar className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Week Numbers</h3>
              <p className="text-xs text-muted-foreground">ISO weeks with start and end dates.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Official sources</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="https://www.iso.org/iso-8601-date-and-time-format.html" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">ISO 8601</h3>
              <p className="text-xs text-muted-foreground">Date format standard.</p>
            </a>
            <a href="https://www.timeanddate.com/calendar/months/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">Months Reference</h3>
              <p className="text-xs text-muted-foreground">Month history and facts.</p>
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Months'} />
        </div>
      </div>
    </>
  )
}