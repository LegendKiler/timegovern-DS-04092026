import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, ArrowRight, Users, Sun, Moon } from 'lucide-react'

const formatTime = (tz, date = new Date()) => {
  return new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(date)
}

const formatFullDate = (tz, date = new Date()) => {
  return new Intl.DateTimeFormat('en-GB', { timeZone: tz, weekday: 'short', day: 'numeric', month: 'short' }).format(date)
}

const getOffsetMinutes = (tz, date = new Date()) => {
  const utcStr = date.toLocaleString('en-US', { timeZone: 'UTC' })
  const tzStr = date.toLocaleString('en-US', { timeZone: tz })
  const utc = new Date(utcStr).getTime()
  const local = new Date(tzStr).getTime()
  return Math.round((local - utc) / 60000)
}

const formatOffset = (minutes) => {
  const sign = minutes >= 0 ? '+' : '-'
  const abs = Math.abs(minutes)
  const h = Math.floor(abs / 60)
  const m = abs % 60
  return m === 0 ? `UTC${sign}${h}` : `UTC${sign}${h}:${String(m).padStart(2, '0')}`
}

const isNight = (tz) => {
  const hour = parseInt(new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', hour12: false }).format(new Date()), 10)
  return hour < 6 || hour >= 20
}

export default function TimeZonePairComparison({ cityA, cityB, tzA, tzB }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const timeA = formatTime(tzA, now)
  const timeB = formatTime(tzB, now)
  const dateA = formatFullDate(tzA, now)
  const dateB = formatFullDate(tzB, now)
  const offA = getOffsetMinutes(tzA, now)
  const offB = getOffsetMinutes(tzB, now)
  const diffMinutes = offB - offA
  const diffHours = (diffMinutes / 60).toFixed(1)

  const diffLabel = diffMinutes === 0
    ? 'Same time'
    : diffMinutes > 0
      ? `${cityB} is ${Math.abs(diffHours)} hours ahead of ${cityA}`
      : `${cityB} is ${Math.abs(diffHours)} hours behind ${cityA}`

  // Best meeting overlap window: find a 1-hour UTC window where both are 8-20 local
  const findBestOverlap = () => {
    for (let utcHour = 0; utcHour < 24; utcHour++) {
      const testDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), utcHour, 0, 0))
      const hourA = parseInt(new Intl.DateTimeFormat('en-GB', { timeZone: tzA, hour: '2-digit', hour12: false }).format(testDate), 10)
      const hourB = parseInt(new Intl.DateTimeFormat('en-GB', { timeZone: tzB, hour: '2-digit', hour12: false }).format(testDate), 10)
      if (hourA >= 8 && hourA <= 20 && hourB >= 8 && hourB <= 20) {
        return {
          aTime: `${String(hourA).padStart(2, '0')}:00`,
          bTime: `${String(hourB).padStart(2, '0')}:00`,
        }
      }
    }
    return null
  }
  const overlap = findBestOverlap()

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {[
        { name: cityA, tz: tzA, time: timeA, date: dateA, offset: offA },
        { name: cityB, tz: tzB, time: timeB, date: dateB, offset: offB },
      ].map((c) => (
        <Card key={c.tz} className="border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-black">{c.name}</h3>
              </div>
              {isNight(c.tz) ? <Moon className="h-4 w-4 text-indigo-500" /> : <Sun className="h-4 w-4 text-amber-500" />}
            </div>
            <div className="text-4xl md:text-5xl font-black tracking-tight tabular-nums mb-2">
              {c.time}
            </div>
            <div className="text-sm text-muted-foreground mb-3">{c.date}</div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold text-primary">
              {formatOffset(c.offset)}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="md:col-span-2">
        <Card className="border-2 border-primary/30 bg-primary/5">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Time difference</div>
                <div className="font-black">{diffLabel}</div>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Offset difference</div>
                <div className="font-black tabular-nums">{diffHours} hours</div>
              </div>
              {overlap && (
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Best meeting window</div>
                  <div className="font-black">{overlap.aTime} in {cityA} = {overlap.bTime} in {cityB}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}