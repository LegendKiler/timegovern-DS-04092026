import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Calendar, Sparkles, ChevronLeft, ChevronRight, Printer, Hash, Clock, ArrowRight, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'
import { MONTH_NAMES, MONTH_SLUGS, DAY_NAMES, buildMonthGrid, getISOWeek, getDaysInMonth, getDayOfYear, getMonthFromSlug, getOrdinal, formatDateLong } from '../lib/calendarUtils'

export default function CalendarMonthPage() {
  const { year: yearParam, month: monthSlug } = useParams()
  const year = parseInt(yearParam, 10)
  const month = getMonthFromSlug(monthSlug)
  const valid = !isNaN(year) && year >= 1900 && year <= 2200 && month >= 1 && month <= 12

  const cells = useMemo(() => valid ? buildMonthGrid(year, month) : [], [year, month, valid])

  useEffect(() => {
    if (!valid) return
    const mName = MONTH_NAMES[month - 1]
    document.title = mName + ' ' + year + ' Calendar - Week Numbers, Printable PDF | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = mName + ' ' + year + ' calendar - full month view with ISO week numbers, day of year, printable PDF, and navigation. Free, no signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [year, month, valid])

  if (!valid) return <Navigate to="/calendar" replace />

  const mName = MONTH_NAMES[month - 1]
  const daysInMonth = getDaysInMonth(year, month)
  const firstWeekday = DAY_NAMES[new Date(year, month - 1, 1).getDay()]
  const lastWeekday = DAY_NAMES[new Date(year, month - 1, daysInMonth).getDay()]

  const prevMonth = month === 1 ? { y: year - 1, m: 12 } : { y: year, m: month - 1 }
  const nextMonth = month === 12 ? { y: year + 1, m: 1 } : { y: year, m: month + 1 }

  const FAQ = [
    { q: 'How many days does ' + mName + ' ' + year + ' have?', a: mName + ' ' + year + ' has ' + daysInMonth + ' days.' },
    { q: 'What day does ' + mName + ' ' + year + ' start on?', a: mName + ' 1, ' + year + ' falls on a ' + firstWeekday + '.' },
    { q: 'What day does ' + mName + ' ' + year + ' end on?', a: 'The last day of ' + mName + ' ' + year + ' is ' + lastWeekday + '.' },
    { q: 'How do I print ' + mName + ' ' + year + '?', a: 'Click the Print / PDF button at the top. Your browser print dialog opens and you can choose Save as PDF.' },
    { q: 'What ISO weeks fall in ' + mName + ' ' + year + '?', a: 'See the week numbers on the left edge of the calendar grid. Each row shows the ISO week number for that week.' },
    { q: 'Is ' + mName + ' ' + year + ' the same in every country?', a: 'The dates are the same everywhere. Only the convention for which day starts the week differs - Monday in most of the world, Sunday in the US.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const BREADCRUMB = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Calendar', item: 'https://timegovern.com/calendar' }, { '@type': 'ListItem', position: 2, name: mName + ' ' + year, item: 'https://timegovern.com/calendar/' + year + '/' + MONTH_SLUGS[month - 1] } ] }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />

      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <div className="text-sm text-muted-foreground">
          <Link to="/calendar" className="hover:text-primary">Calendar</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-bold">{mName} {year}</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">{daysInMonth} days - starts {firstWeekday}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Calendar className="h-10 w-10 md:h-14 md:w-14 text-cyan-300" />
              {mName} {year}
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Full month view with ISO week numbers and printable PDF export.
            </p>
          </div>
        </div>

        <Card className="border-border shadow-xl">
          <CardContent className="p-4 flex items-center justify-between gap-3 flex-wrap">
            <Link to={'/calendar/' + prevMonth.y + '/' + MONTH_SLUGS[prevMonth.m - 1]} className="inline-flex items-center gap-1 text-sm font-bold hover:text-primary">
              <ChevronLeft className="h-4 w-4" /> {MONTH_NAMES[prevMonth.m - 1]}
            </Link>
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition">
              <Printer className="h-3.5 w-3.5" /> Print / PDF
            </button>
            <Link to={'/calendar/' + nextMonth.y + '/' + MONTH_SLUGS[nextMonth.m - 1]} className="inline-flex items-center gap-1 text-sm font-bold hover:text-primary">
              {MONTH_NAMES[nextMonth.m - 1]} <ChevronRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border shadow-xl overflow-hidden">
          <div className="grid grid-cols-7 border-b border-border bg-muted/40">
            {DAY_NAMES.map((d) => (
              <div key={d} className="py-3 text-center text-xs font-black uppercase tracking-wider text-muted-foreground">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              const cellDate = day ? new Date(year, month - 1, day) : null
              const cellWeek = cellDate ? getISOWeek(cellDate) : null
              return (
                <div key={i} className={'aspect-square border-b border-r border-border/40 p-2 flex flex-col ' + (day ? 'hover:bg-primary/5' : 'bg-muted/20')}>
                  {day && (
                    <>
                      <div className="text-sm font-black">{day}</div>
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

        <div className="grid md:grid-cols-3 gap-3">
          <Card><CardContent className="p-5">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Days in month</div>
            <div className="text-3xl font-black tabular-nums">{daysInMonth}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">First day</div>
            <div className="text-xl font-black">{firstWeekday}</div>
          </CardContent></Card>
          <Card><CardContent className="p-5">
            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Last day</div>
            <div className="text-xl font-black">{lastWeekday}</div>
          </CardContent></Card>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Days in {mName} {year}</h2>
          <Card className="border-border">
            <CardContent className="p-5">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                  const dow = DAY_NAMES[new Date(year, month - 1, d).getDay()]
                  const doy = getDayOfYear(year, month, d)
                  const wk = getISOWeek(new Date(year, month - 1, d))
                  return (
                    <div key={d} className="rounded-lg border border-border/50 bg-card p-2.5 text-xs">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="font-black">{mName.slice(0, 3)} {d}</span>
                        <span className="text-[10px] text-muted-foreground">{dow}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono">Day {doy} - Week {wk}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">More months</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {MONTH_NAMES.map((m, i) => (
              <Link key={m} to={'/calendar/' + year + '/' + MONTH_SLUGS[i]} className={'block rounded-xl border bg-card p-3 transition-colors ' + (i + 1 === month ? 'border-cyan-500 bg-cyan-500/5' : 'border-border hover:border-cyan-400')}>
                <div className="font-bold text-sm">{m}</div>
                <div className="text-[10px] text-muted-foreground">{getDaysInMonth(year, i + 1)} days</div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/week-numbers" className="block rounded-xl border border-border bg-card hover:border-cyan-400 p-5 transition-colors">
              <Hash className="h-5 w-5 text-cyan-500 mb-2" />
              <h3 className="font-bold mb-1">Week Numbers</h3>
              <p className="text-xs text-muted-foreground">All ISO weeks with dates.</p>
            </Link>
            <Link to="/calendar" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <Calendar className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">Full Calendar</h3>
              <p className="text-xs text-muted-foreground">Interactive year view.</p>
            </Link>
            <Link to="/days-between-dates" className="block rounded-xl border border-border bg-card hover:border-emerald-400 p-5 transition-colors">
              <Clock className="h-5 w-5 text-emerald-500 mb-2" />
              <h3 className="font-bold mb-1">Days Between</h3>
              <p className="text-xs text-muted-foreground">Any date difference.</p>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : mName + ' ' + year} />
        </div>
      </div>
    </>
  )
}