import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Download, ExternalLink, CheckCircle2, Clock, Globe, MapPin, RefreshCw } from "lucide-react"

export default function FlightToCalendar({ flightData }) {
  const [eventTitle, setEventTitle] = useState(
    flightData ? (flightData.callsign + ' Flight') : 'My Flight'
  )
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [duration, setDuration] = useState('120')
  const [timeZone, setTimeZone] = useState('')
  const [downloaded, setDownloaded] = useState(false)
  const [userTimeZone, setUserTimeZone] = useState('')

  // On mount: auto-fill with user's local date/time + detect timezone
  useEffect(() => {
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const hh = String(now.getHours()).padStart(2, '0')
    const min = String(now.getMinutes()).padStart(2, '0')

    setEventDate(yyyy + '-' + mm + '-' + dd)
    setEventTime(hh + ':' + min)

    const detectedTz = Intl.DateTimeFormat().resolvedOptions().timeZone
    setTimeZone(detectedTz)
    setUserTimeZone(detectedTz)
  }, [])

  // Reset to now (used when user wants to reset)
  const resetToNow = () => {
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const hh = String(now.getHours()).padStart(2, '0')
    const min = String(now.getMinutes()).padStart(2, '0')
    setEventDate(yyyy + '-' + mm + '-' + dd)
    setEventTime(hh + ':' + min)
  }

  // Common flight durations
  const setDurationPreset = (mins) => setDuration(String(mins))

  // Get a friendly timezone name
  const getFriendlyTz = () => {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        timeZoneName: 'long'
      }).formatToParts(new Date())
      const tzName = parts.find(p => p.type === 'timeZoneName')
      return tzName ? tzName.value : timeZone
    } catch {
      return timeZone
    }
  }

  const generateIcs = () => {
    const title = eventTitle || 'Flight'
    const dt = eventDate && eventTime ? new Date(eventDate + 'T' + eventTime) : new Date()
    const dtEnd = new Date(dt.getTime() + parseInt(duration) * 60 * 1000)

    const formatIcsDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    const desc = flightData
      ? 'Flight tracked on TimeGovern\\n' +
        'Callsign: ' + flightData.callsign + '\\n' +
        'Registration: ' + flightData.registration + '\\n' +
        'Aircraft: ' + flightData.type + '\\n' +
        'Position at time of booking: ' + flightData.latitude + ', ' + flightData.longitude
      : 'Flight tracked on TimeGovern'

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TimeGovern//Flight Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:' + Date.now() + '@timegovern.com',
      'DTSTAMP:' + formatIcsDate(new Date()),
      'DTSTART:' + formatIcsDate(dt),
      'DTEND:' + formatIcsDate(dtEnd),
      'SUMMARY:' + title,
      'DESCRIPTION:' + desc,
      'LOCATION:' + (flightData ? flightData.latitude + ',' + flightData.longitude : 'In flight'),
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT2H',
      'ACTION:DISPLAY',
      'DESCRIPTION:Flight reminder - 2 hours to departure',
      'END:VALARM',
      'BEGIN:VALARM',
      'TRIGGER:-PT30M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Flight reminder - 30 minutes',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = title.replace(/\s+/g, '-') + '.ics'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setDownloaded(true)
  }

  const addToGoogleCalendar = () => {
    const title = encodeURIComponent(eventTitle || 'Flight')
    const dt = eventDate && eventTime ? new Date(eventDate + 'T' + eventTime) : new Date()
    const dtEnd = new Date(dt.getTime() + parseInt(duration) * 60 * 1000)
    const formatG = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const url = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      '&text=' + title +
      '&dates=' + formatG(dt) + '/' + formatG(dtEnd) +
      '&details=' + encodeURIComponent('Flight tracked on TimeGovern' + (flightData ? ' - ' + flightData.callsign : '')) +
      '&location=' + encodeURIComponent(flightData ? flightData.callsign : 'In flight')
    window.open(url, '_blank')
  }

  return (
    <Card className="mt-6 bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-border shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" /> Add Flight to Calendar
        </CardTitle>
        <CardDescription>Download .ics file or add directly to Google Calendar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* Timezone indicator */}
        {userTimeZone && (
          <div className="flex items-center gap-2 text-xs bg-blue-50 text-blue-700 p-2 rounded">
            <MapPin className="h-3 w-3" />
            <span>Your timezone: <strong>{userTimeZone}</strong> ({getFriendlyTz()})</span>
          </div>
        )}

        <div>
          <label className="text-sm font-medium mb-1 block">Event Title</label>
          <Input value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Flight name" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium mb-1 block">Date</label>
            <Input
              type="date" onClick={(e) => e.target.showPicker?.()}
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <p className="text-[10px] text-muted-foreground mt-1">Click to open calendar picker</p>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Time</label>
            <Input
              type="time" onClick={(e) => e.target.showPicker?.()}
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
            <p className="text-[10px] text-muted-foreground mt-1">Click to open time picker</p>
          </div>
        </div>

        <button
          onClick={resetToNow}
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          <RefreshCw className="h-3 w-3" /> Reset to now ({new Date().toLocaleTimeString()})
        </button>

        <div>
          <label className="text-sm font-medium mb-1 block">Duration (minutes)</label>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="120"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            <button onClick={() => setDurationPreset(60)} className="text-xs bg-muted px-2 py-1 rounded hover:bg-muted/70">1h</button>
            <button onClick={() => setDurationPreset(120)} className="text-xs bg-muted px-2 py-1 rounded hover:bg-muted/70">2h</button>
            <button onClick={() => setDurationPreset(180)} className="text-xs bg-muted px-2 py-1 rounded hover:bg-muted/70">3h</button>
            <button onClick={() => setDurationPreset(360)} className="text-xs bg-muted px-2 py-1 rounded hover:bg-muted/70">6h</button>
            <button onClick={() => setDurationPreset(720)} className="text-xs bg-muted px-2 py-1 rounded hover:bg-muted/70">12h</button>
            <button onClick={() => setDurationPreset(840)} className="text-xs bg-muted px-2 py-1 rounded hover:bg-muted/70">14h (long-haul)</button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block flex items-center gap-2">
            <Globe className="h-3 w-3" /> Timezone
          </label>
          <select
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-background text-foreground text-sm"
          >
            <option value={userTimeZone}>{userTimeZone} (your local)</option>
            <option value="UTC">UTC (Coordinated Universal Time)</option>
            <option value="Australia/Melbourne">Australia/Melbourne (AEST/AEDT)</option>
            <option value="Australia/Sydney">Australia/Sydney (AEST/AEDT)</option>
            <option value="Australia/Perth">Australia/Perth (AWST)</option>
            <option value="America/New_York">America/New_York (EST/EDT)</option>
            <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</option>
            <option value="Europe/London">Europe/London (GMT/BST)</option>
            <option value="Europe/Paris">Europe/Paris (CET/CEST)</option>
            <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
            <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
            <option value="Asia/Dubai">Asia/Dubai (GST)</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button onClick={generateIcs} className="flex-1">
            {downloaded ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />}
            {downloaded ? 'Downloaded!' : 'Download .ics'}
          </Button>
          <Button variant="outline" onClick={addToGoogleCalendar} className="flex-1">
            <ExternalLink className="mr-2 h-4 w-4" /> Add to Google Calendar
          </Button>
        </div>

        <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded">
          <p className="flex items-center gap-1 mb-1"><Clock className="h-3 w-3" /> <strong>Sync options:</strong></p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li><strong>Free:</strong> Download .ics and import manually</li>
            <li><strong>Pro:</strong> Direct Google / Apple / Outlook sync</li>
            <li><strong>Premium:</strong> Real-time push updates</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}