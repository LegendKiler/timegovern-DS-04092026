import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

export default function PrintableCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const firstDay = startOfMonth(currentMonth).getDay()

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))

  const handlePrint = () => {
    window.print()
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Printer className="h-5 w-5" /> Printable Calendar
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
          {days.map(day => (
            <div key={day.toISOString()} className={`p-2 border rounded ${day.getDate() === new Date().getDate() && day.getMonth() === new Date().getMonth() ? 'bg-primary text-white' : ''}`}>
              {format(day, 'd')}
            </div>
          ))}
        </div>
        <Button onClick={handlePrint} className="mt-4 w-full">Print Calendar</Button>
      </CardContent>
    </Card>
  )
}
