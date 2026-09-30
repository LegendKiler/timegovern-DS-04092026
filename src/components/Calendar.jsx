import { useState, useEffect } from 'react'
import { Calendar as CalendarUI } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Holidays from 'date-holidays'

export default function Calendar() {
  const [date, setDate] = useState(new Date())
  const [holidays, setHolidays] = useState({})
  const [country, setCountry] = useState('US')

  useEffect(() => {
    const hd = new Holidays(country)
    const year = new Date().getFullYear()
    const holidays = hd.getHolidays(year)
    const holidayMap = {}
    holidays.forEach(hol => {
      holidayMap[hol.date] = hol.name
    })
    setHolidays(holidayMap)
  }, [country])

  return (
    <Card>
      <CardHeader><CardTitle>Calendar</CardTitle></CardHeader>
      <CardContent>
        <div className="mb-4">
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full p-2 border rounded">
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="NZ">New Zealand</option>
          </select>
        </div>
        <CalendarUI
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          modifiers={{
            holiday: Object.keys(holidays),
            weekend: [0, 6] // Sunday, Saturday
          }}
          modifiersClassNames={{
            holiday: 'bg-yellow-200 text-yellow-900 font-bold',
            weekend: 'bg-blue-100 text-blue-900'
          }}
        />
        {date && holidays[date.toISOString().split('T')[0]] && (
          <div className="mt-4 p-3 bg-yellow-50 rounded">
            <p className="font-semibold">{holidays[date.toISOString().split('T')[0]]}</p>
            <p className="text-sm text-muted-foreground">Holiday</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
