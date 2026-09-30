import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Sparkles, ChevronLeft, ChevronRight, Clock, Printer, Hash, ArrowRight, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { MONTH_NAMES, MONTH_SLUGS, DAY_NAMES, buildMonthGrid, getISOWeek, getWeeksInYear, isLeapYear, getDaysInMonth, getOrdinal, formatDateLong } from '../lib/calendarUtils'

const FAQ = [
  { q: 'What week number is it right now?', a: 'Today is in ISO week {week} of {year}. ISO weeks start on Monday, and week 1 is the week containing January 4.' },
  { q: 'How many weeks are in a year?', a: 'Most years have 52 ISO weeks. Years with 53 weeks are those where January 1 is a Thursday, or a leap year where January 1 is a Wednesday. {year} has {weeks} weeks.' },
  { q: 'Is {year} a leap year?', a: '{year} is {leap}. Leap years have 366 days, adding February 29.' },
  { q: 'What is a calendar week?', a: 'A calendar week is a seven-day period. In ISO 8601 and most of the world, weeks start on Monday. In the US and a few other countries, weeks start on Sunday.' },
  { q: 'How do I get a PDF of this calendar?', a: 'Click the Print button above. Your browser print dialog opens, and you can choose "Save as PDF" as the destination. No account or signup needed.' },
  { q: 'What is day of year?', a: 'Day of year is a number from 1 to 365 (or 366 in a leap year) that counts days from January 1. Today is day {doy} of {year}.' },
]

export default function CalendarPage() {
  const today = useMemo(() => new Date(), [])
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)

  const cells = useMemo(() => buildMonthGrid(year, month), [year, month])
  const daysInMonth = getDaysInMonth(year, month)
  const weeksInYear = getWeeksInYear(year)
  const currentWeek = getISOWeek(today)
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000)
  const leap = isLeapYear(year)

  const FAQ_FILLED = FAQ.map((f) => ({
    q: f.q,
    a: f.a.replace('{week}', String(currentWeek)).replace('{year}', String(today.getFullYear())).replace('{weeks}', String(getWeeksInYear(today.getFullYear()))).replace('{leap}', isLeapYear(today.getFullYear()) ? 'a leap year (366 days)' : 'not a leap year (365 days)').replace('{doy}', String(dayOfYear)),
  }))

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_FILLED.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

  useEffect(() => {
    document.title = 'Calendar ' + today.getFullYear() + ' - Months, Week Numbers & Printable | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Interactive calendar with ISO week numbers, month navigation, day of year, leap year info, and printable views. Free, no signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [today])

  const prevMonth = () => { if (month === 1) { setMonth(12); setYear(year - 1) } else setMonth(month - 1) }
  const nextMonth = () => { if (month === 12) { setMonth(1); setYear(year + 1) } else setMonth(month + 1) }
  const goToday = () => { setYear(today.getFullYear()); setMonth(today.getMonth() + 1) }

  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth() + 1

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">Today is week {currentWeek} of {today.getFullYear()}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Calendar className="h-10 w-10 md:h-14 md:w-14 text-cyan-300" />
              Calendar
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Month view, ISO week numbers, day of year, leap year info, and printable PDF export.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">Today: {formatDateLong(today)}</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">Day {dayOfYear} of {today.getFullYear()}</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">Week {currentWeek}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <Card className="border-border shadow-xl">
          <CardContent className="p-4 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-2 rounded-lg border border-border hover:border-primary transition-colors" aria-label="Previous month">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="min-w-[180px] text-center">
                <div className="text-xl font-black">{MONTH_NAMES[month - 1]} {year}</div>
                <div className="text-xs text-muted-foreground">{daysInMonth} days - starts {DAY_NAMES[new Date(year, month - 1, 1).getDay()]}</div>
              </div>
              <button onClick={nextMonth} className="p-2 rounded-lg border border-border hover:border-primary transition-colors" aria-label="Next month">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              {!isCurrentMonth && (
                <button onClick={goToday} className="px-3 py-2 rounded-lg border border-border text-xs font-bold hover:border-primary transition-colors">
                  Today
                </button>
              )}
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition">
                <Printer className="h-3.5 w-3.5" />
                Print / PDF
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Calendar grid */}
        <Card className="border-border shadow-xl overflow-hidden">
          <div className="grid grid-cols-7 border-b border-border bg-muted/40">
            {DAY_NAMES.map((d) => (
              <div key={d} className="py-3 text-center text-xs font-black uppercase tracking-wider text-muted-foreground">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              const isToday = isCurrentMonth && day === today.getDate()
              const cellDate = day ? new Date(year, month - 1, day) : null
              const cellWeek = cellDate ? getISOWeek(cellDate) : null
              return (
                <div key={i} className={'aspect-square border-b border-r border-border/40 p-1.5 flex flex-col ' + (day ? 'hover:bg-primary/5' : 'bg-muted/20') + (isToday ? ' bg-primary/10' : '')}>
                  {day && (
                    <>
                      <div className={'text-sm font-black ' + (isToday ? 'text-primary' : '')}>{day}</div>
                      {i % 7 === 0 && cellWeek && (
                        <div className="mt-auto text-[9px] font-mono text-muted-foreground">w{cellWeek}</div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        {/* Year facts */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">{year} at a glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card><CardContent className="p-4">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Days in year</div>
              <div className="text-2xl font-black tabular-nums">{leap ? 366 : 365}</div>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">ISO weeks</div>
              <div className="text-2xl font-black tabular-nums">{weeksInYear}</div>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Leap year</div>
              <div className="text-2xl font-black">{leap ? 'Yes' : 'No'}</div>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Today</div>
              <div className="text-sm font-black">{formatDateLong(today)}</div>
            </CardContent></Card>
          </div>
        </div>

        {/* Months grid for the year */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Months of {year}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {MONTH_NAMES.map((m, i) => (
              <Link key={m} to={'/calendar/' + year + '/' + MONTH_SLUGS[i]} className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-4 transition-colors group">
                <div className="text-[10px] font-mono text-muted-foreground mb-1">{String(i + 1).padStart(2, '0')}</div>
                <div className="font-black mb-1 group-hover:text-cyan-500 transition-colors">{m}</div>
                <div className="text-[10px] text-muted-foreground">{getDaysInMonth(year, i + 1)} days</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Related tools */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/week-numbers" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <Hash className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1">Week Numbers</h3>
              <p className="text-xs text-muted-foreground">All ISO weeks with start and end dates.</p>
            </Link>
            <Link to="/world-clock" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Clock className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">World Clock</h3>
              <p className="text-xs text-muted-foreground">Live time in cities worldwide.</p>
            </Link>
            <Link to="/days-between-dates" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <Calendar className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">Days Between Dates</h3>
              <p className="text-xs text-muted-foreground">Calculate any date difference.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Official sources</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="https://www.iso.org/iso-8601-date-and-time-format.html" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">ISO 8601</h3>
              <p className="text-xs text-muted-foreground">Date and time format standard.</p>
            </a>
            <a href="https://www.timeanddate.com/calendar/" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <ExternalLink className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1 text-sm">Calendar Reference</h3>
              <p className="text-xs text-muted-foreground">Historical and future calendars.</p>
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
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Calendar'} />
        </div>
      </div>
    </>
  )
}