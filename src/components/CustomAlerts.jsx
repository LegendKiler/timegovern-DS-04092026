import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CalendarHeart } from "lucide-react"

export default function CustomAlerts() {
  const [alerts, setAlerts] = useState([])
  const [name, setName] = useState('')
  const [date, setDate] = useState('')

  const addAlert = () => {
    if (!name || !date) return
    setAlerts([...alerts, { id: Date.now(), name, date }])
    setName(''); setDate('')
  }

  const removeAlert = (id) => setAlerts(alerts.filter(a => a.id !== id))

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><CalendarHeart className="h-5 w-5" /> Custom Alerts</CardTitle></CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input placeholder="Event name" value={name} onChange={e => setName(e.target.value)} />
          <Input type="date" onClick={(e) => e.target.showPicker?.()} value={date} onChange={e => setDate(e.target.value)} />
          <Button onClick={addAlert}>Add</Button>
        </div>
        <div className="space-y-2">
          {alerts.map(alert => (
            <div key={alert.id} className="flex justify-between items-center bg-muted/50 rounded px-3 py-2">
              <span>{alert.name} - {alert.date}</span>
              <Button variant="ghost" size="sm" onClick={() => removeAlert(alert.id)}>âœ•</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}