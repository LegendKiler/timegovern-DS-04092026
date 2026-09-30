import { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoonStar } from "lucide-react"
import SunCalc from 'suncalc'

export default function MoonPhaseCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [moonPhases, setMoonPhases] = useState({})

  useEffect(() => {
    const days = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    })
    const phases = {}
    days.forEach(day => {
      const moon = SunCalc.getMoonIllumination(day)
      phases[format(day, 'yyyy-MM-dd')] = moon.phase
    })
    setMoonPhases(phases)
  }, [currentMonth])

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const firstDay = startOfMonth(currentMonth).getDay()

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))

  const phaseLabel = (phase) => {
    if (phase < 0.03 || phase > 0.97) return '🌑'
    if (phase < 0.22) return '🌒'
    if (phase < 0.28) return '🌓'
    if (phase < 0.47) return '🌔'
    if (phase < 0.53) return '🌕'
    if (phase < 0.72) return '🌖'
    if (phase < 0.78) return '🌗'
    return '🌘'
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MoonStar className="h-5 w-5" /> Moon Phase Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="px-3 py-1 border rounded">‹</button>
          <h3 className="font-semibold">{format(currentMonth, 'MMMM yyyy')}</h3>
          <button onClick={nextMonth} className="px-3 py-1 border rounded">›</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="font-bold">{d}</div>)}
          {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`}></div>)}
          {days.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd')
            const phase = moonPhases[dateStr]
            return (
              <div key={day.toISOString()} className="p-2 border rounded text-center">
                <div>{format(day, 'd')}</div>
                {phase !== undefined && <div className="text-lg">{phaseLabel(phase)}</div>}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
