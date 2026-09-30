import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar, Download, ExternalLink, Apple, Mail } from "lucide-react"
import { createEvent } from 'ics'

export default function CalendarExport({ title, description, location, startDate, endDate }) {
  const [open, setOpen] = useState(false)
  const start = new Date(startDate)
  const end = new Date(endDate)

  const eventData = {
    title, description: description || '', location: location || '',
    start: [start.getFullYear(), start.getMonth() + 1, start.getDate(), start.getHours(), start.getMinutes()],
    end: [end.getFullYear(), end.getMonth() + 1, end.getDate(), end.getHours(), end.getMinutes()],
    startInputType: 'local', startOutputType: 'utc',
    endInputType: 'local', endOutputType: 'utc',
  }

  const downloadIcs = () => {
    createEvent(eventData, (error, value) => {
      if (error) { alert('Could not create ICS: ' + error); return }
      const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = title.replace(/\s+/g, '-') + '.ics'
      document.body.appendChild(a); a.click(); document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setOpen(false)
    })
  }

  const addToGoogle = () => {
    const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=' +
      encodeURIComponent(title) + '&dates=' + fmt(start) + '/' + fmt(end) +
      '&details=' + encodeURIComponent(description || '') +
      '&location=' + encodeURIComponent(location || ''), '_blank')
    setOpen(false)
  }

  const addToOutlook = () => {
    window.open('https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent' +
      '&subject=' + encodeURIComponent(title) +
      '&startdt=' + start.toISOString() +
      '&enddt=' + end.toISOString() +
      '&body=' + encodeURIComponent(description || '') +
      '&location=' + encodeURIComponent(location || ''), '_blank')
    setOpen(false)
  }

  return (
    <div className="relative inline-block w-full">
      <Button variant="outline" size="sm" onClick={() => setOpen(!open)} className="h-9 w-full">
        <Calendar className="h-3.5 w-3.5 mr-1.5" /> Add to Calendar
      </Button>
      {open && (
        <div className="absolute top-full mt-2 right-0 bg-card border border-border rounded-lg shadow-2xl p-2 w-56 z-50">
          <button onClick={addToGoogle} className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-muted text-sm text-left">
            <ExternalLink className="h-4 w-4 text-blue-500" /> Google Calendar
          </button>
          <button onClick={addToOutlook} className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-muted text-sm text-left">
            <Mail className="h-4 w-4 text-blue-600" /> Outlook
          </button>
          <button onClick={downloadIcs} className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-muted text-sm text-left">
            <Apple className="h-4 w-4" /> Apple Calendar (.ics)
          </button>
          <button onClick={downloadIcs} className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-muted text-sm text-left">
            <Download className="h-4 w-4" /> Download .ics
          </button>
        </div>
      )}
    </div>
  )
}