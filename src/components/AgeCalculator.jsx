import { useState, useMemo } from 'react'
import { Cake, Calendar, Heart, Star, Clock, Gift, Sparkles, Copy, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate() }

function calcAge(birth, now) {
  const b = new Date(birth)
  if (isNaN(b.getTime())) return null
  if (b > now) return null

  let years = now.getFullYear() - b.getFullYear()
  let months = now.getMonth() - b.getMonth()
  let days = now.getDate() - b.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) { years--; months += 12 }

  const totalMs = now - b
  const totalDays = Math.floor(totalMs / 86400000)
  const totalWeeks = Math.floor(totalDays / 7)
  const totalMonths = years * 12 + months
  const totalHours = Math.floor(totalMs / 3600000)
  const totalMinutes = Math.floor(totalMs / 60000)
  const totalSeconds = Math.floor(totalMs / 1000)

  const nextBirthday = new Date(now.getFullYear(), b.getMonth(), b.getDate())
  if (nextBirthday < now) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
  const daysToBirthday = Math.ceil((nextBirthday - now) / 86400000)

  const dayOfWeekBorn = b.toLocaleDateString('en-GB', { weekday: 'long' })

  return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, totalMinutes, totalSeconds, daysToBirthday, dayOfWeekBorn }
}

function fmt(n) { return n.toLocaleString('en-GB') }

export default function AgeCalculator() {
  const [birth, setBirth] = useState('1990-01-01')
  const [copied, setCopied] = useState(false)
  const now = useMemo(() => new Date(), [])

  const age = useMemo(() => calcAge(birth, now), [birth, now])

  const copyStats = async () => {
    if (!age) return
    const s = 'Age: ' + age.years + ' years, ' + age.months + ' months, ' + age.days + ' days\nTotal days: ' + age.totalDays + '\nTotal weeks: ' + age.totalWeeks + '\nTotal hours: ' + age.totalHours + '\nNext birthday in ' + age.daysToBirthday + ' days'
    try { await navigator.clipboard.writeText(s); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch (e) {}
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-5 md:p-6 space-y-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Cake className="h-3.5 w-3.5" /> Your date of birth
          </div>
          <input type="date" value={birth} onChange={e => setBirth(e.target.value)} max={now.toISOString().split('T')[0]} className="w-full px-3 py-3 rounded-lg border border-border bg-background text-base font-bold" />
          {!age && <div className="text-sm text-red-500">Please enter a valid birth date in the past.</div>}
        </CardContent>
      </Card>

      {age && (
        <>
          <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 to-transparent">
            <CardContent className="p-6 text-center">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">You are</div>
              <div className="text-5xl md:text-6xl font-black tracking-tight">
                {age.years}<span className="text-2xl md:text-3xl font-bold text-muted-foreground"> years</span>
              </div>
              <div className="text-lg md:text-xl font-bold text-muted-foreground mt-1">
                {age.months} months, {age.days} days
              </div>
              <button onClick={copyStats} className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-muted hover:bg-muted/70 text-xs font-bold transition-colors">
                {copied ? <><Check className="h-3.5 w-3.5 text-emerald-500" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy stats</>}
              </button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card><CardContent className="p-4"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> Days</div><div className="text-2xl font-black tabular-nums">{fmt(age.totalDays)}</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> Weeks</div><div className="text-2xl font-black tabular-nums">{fmt(age.totalWeeks)}</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Hours</div><div className="text-2xl font-black tabular-nums">{fmt(age.totalHours)}</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Star className="h-3 w-3" /> Months</div><div className="text-2xl font-black tabular-nums">{fmt(age.totalMonths)}</div></CardContent></Card>
          </div>

          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-5 flex items-center gap-3">
              <Gift className="h-8 w-8 text-amber-500 shrink-0" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Next birthday in</div>
                <div className="text-2xl font-black">{age.daysToBirthday} days</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Fun facts
              </div>
              <div className="text-sm text-muted-foreground">You were born on a <strong className="text-foreground">{age.dayOfWeekBorn}</strong>.</div>
              <div className="text-sm text-muted-foreground">You have lived approximately <strong className="text-foreground">{fmt(age.totalMinutes)}</strong> minutes.</div>
              <div className="text-sm text-muted-foreground">You have breathed for roughly <strong className="text-foreground">{fmt(age.totalHours)}</strong> hours.</div>
              <div className="text-sm text-muted-foreground">Your heart has beaten about <strong className="text-foreground">{fmt(Math.floor(age.totalMinutes * 70))}</strong> times.</div>
            </CardContent>
          </Card>
        </>
      )}

      <div className="rounded-xl bg-muted/40 border border-border p-3 text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
        <Heart className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <span>Your birth date is processed entirely in your browser - no data is sent anywhere. No signup, no tracking, 100% private.</span>
      </div>
    </div>
  )
}