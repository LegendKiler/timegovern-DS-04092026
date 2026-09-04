import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns'

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const firstDay = startOfMonth(currentMonth).getDay()

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 border rounded">â€¹</button>
        <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth} className="p-2 border rounded">â€º</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="font-bold">{d}</div>)}
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`}></div>)}
        {days.map(day => (
          <div key={day.toISOString()} className={`p-2 rounded ${isSameDay(day, new Date()) ? 'bg-blue-500 text-white' : ''}`}>
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  )
}