import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { formatDate, formatTime, getWeekNumber, getUTCOffset, getDSTStatus, getDayOfYear } from '../utils/dateHelpers'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Sun, Moon } from "lucide-react"
import SunCalc from 'suncalc'

export default function Clocks() {
  const { location, settings } = useUser()
  const [timeZone, setTimeZone] = useState('UTC')
  const [now, setNow] = useState(new Date())
  const [timeZones, setTimeZones] = useState([])
  const [isDay, setIsDay] = useState(true)

  useEffect(() => {
    setTimeZones(Intl.supportedValuesOf('timeZone'))
    if (location?.timezone) setTimeZone(location.timezone)
  }, [location])

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      const times = SunCalc.getTimes(now, location.latitude, location.longitude)
      setIsDay(now > times.sunrise && now < times.sunset)
    } else {
      const hours = now.getHours()
      setIsDay(hours >= 6 && hours < 18)
    }
  }, [now, location])

  const updateAnalogHands = () => {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }).formatToParts(now)
    const h = parseInt(parts.find(p => p.type === 'hour').value) % 12
    const m = parseInt(parts.find(p => p.type === 'minute').value)
    const s = parseInt(parts.find(p => p.type === 'second').value)
    const secDeg = (s / 60) * 360
    const minDeg = ((m + s / 60) / 60) * 360
    const hourDeg = ((h + m / 60 + s / 3600) / 12) * 360
    return { secDeg, minDeg, hourDeg }
  }

  const { secDeg, minDeg, hourDeg } = updateAnalogHands()

  const timeFormat = settings?.timeFormat === '12h' ? true : false

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-border shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" /> Local Time
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* Day/Night indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 text-sm">
          {isDay ? <Sun className="text-yellow-500" /> : <Moon className="text-blue-500" />}
        </div>

        {/* Analog clock with glow */}
        <div className="relative h-52 w-52 mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-primary/50 shadow-[0_0_40px_rgba(59,130,246,0.4)]"></div>
          {/* Outer ring ticks */}
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground"
              style={{ transform: `rotate(${i * 6}deg) translateY(-96px)`, opacity: i % 5 === 0 ? 1 : 0.3 }}
            />
          ))}
          {/* Hour markers */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
              style={{ transform: `rotate(${i * 30}deg) translateY(-86px)` }}
            />
          ))}
          {/* Hands */}
          <div className="absolute left-1/2 top-1/2 origin-bottom -translate-x-1/2 -translate-y-full" style={{ transform: `rotate(${hourDeg}deg)`, height: '3rem', width: '5px', background: 'hsl(var(--foreground))', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}></div>
          <div className="absolute left-1/2 top-1/2 origin-bottom -translate-x-1/2 -translate-y-full" style={{ transform: `rotate(${minDeg}deg)`, height: '4.5rem', width: '3px', background: 'hsl(var(--primary))', boxShadow: '0 0 10px rgba(59,130,246,0.6)' }}></div>
          <div className="absolute left-1/2 top-1/2 origin-bottom -translate-x-1/2 -translate-y-full" style={{ transform: `rotate(${secDeg}deg)`, height: '5rem', width: '1.5px', background: 'hsl(var(--destructive))', boxShadow: '0 0 10px rgba(239,68,68,0.8)' }}></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20"></div>
        </div>

        {/* Digital clock */}
        <div className="font-mono text-5xl md:text-6xl font-bold tracking-tight text-center">
          {formatTime(now, timeZone, timeFormat)}
        </div>
        <div className="mt-2 text-muted-foreground">{formatDate(now, timeZone)}</div>

        {/* Timezone select */}
        <div className="mt-6 w-full max-w-xs">
          <Select value={timeZone} onValueChange={setTimeZone}>
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              {timeZones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Additional info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6 text-sm text-muted-foreground w-full">
          <span className="bg-muted/50 rounded p-2 text-center">Day: {getDayOfYear(now)}</span>
          <span className="bg-muted/50 rounded p-2 text-center">Week: {getWeekNumber(now)}</span>
          <span className="bg-muted/50 rounded p-2 text-center">UTC: {getUTCOffset(timeZone)}</span>
          <span className="bg-muted/50 rounded p-2 text-center">DST: {getDSTStatus(timeZone)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
