import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CustomAlarms() {
  const [alarmTime, setAlarmTime] = useState('')
  const [alarms, setAlarms] = useState([])
  const [notificationPermission, setNotificationPermission] = useState(null)

  useEffect(() => {
    if (typeof Notification !== 'undefined') setNotificationPermission(Notification.permission)
  }, [])

  const requestPermission = async () => {
    if (typeof Notification !== 'undefined') {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)
    }
  }

  const addAlarm = () => {
    if (!alarmTime) return
    setAlarms([...alarms, { id: Date.now(), time: alarmTime }])
    setAlarmTime('')
  }

  const removeAlarm = (id) => setAlarms(alarms.filter(a => a.id !== id))

  const checkAlarms = () => {
    const now = new Date()
    const nowTime = now.toTimeString().slice(0,5)
    alarms.forEach(alarm => {
      if (alarm.time === nowTime) {
        if (notificationPermission === 'granted') new Notification('Alarm!', { body: `It's ${alarm.time}` })
        else alert(`Alarm! It's ${alarm.time}`)
        removeAlarm(alarm.id)
      }
    })
  }

  useEffect(() => {
    const interval = setInterval(checkAlarms, 1000)
    return () => clearInterval(interval)
  }, [alarms, notificationPermission])

  return (
    <Card>
      <CardHeader><CardTitle>Custom Alarms</CardTitle></CardHeader>
      <CardContent>
        {notificationPermission !== 'granted' && <Button onClick={requestPermission} className="mb-2">Enable Notifications</Button>}
        <div className="flex gap-2 mb-4">
          <Input type="time" onClick={(e) => e.target.showPicker?.()} value={alarmTime} onChange={e => setAlarmTime(e.target.value)} className="flex-1" />
          <Button onClick={addAlarm}>Add</Button>
        </div>
        <div className="space-y-2">
          {alarms.map(alarm => (
            <div key={alarm.id} className="flex justify-between items-center bg-muted/50 rounded px-3 py-2">
              <span className="font-mono">{alarm.time}</span>
              <Button variant="ghost" size="sm" onClick={() => removeAlarm(alarm.id)}>âœ•</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}