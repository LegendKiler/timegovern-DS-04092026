import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Countdown() {
  const [target, setTarget] = useState('')
  const [remaining, setRemaining] = useState(null)
  const [intervalId, setIntervalId] = useState(null)

  const startCountdown = () => {
    if (!target) return
    if (intervalId) clearInterval(intervalId)
    const end = new Date(target)
    const update = () => {
      const diff = end - new Date()
      if (diff <= 0) {
        setRemaining(null)
        clearInterval(intervalId)
        alert('Countdown finished!')
        return
      }
      const days = Math.floor(diff / (1000*60*60*24))
      const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60))
      const mins = Math.floor((diff % (1000*60*60)) / (1000*60))
      const secs = Math.floor((diff % (1000*60)) / 1000)
      setRemaining({ days, hours, mins, secs })
    }
    const id = setInterval(update, 1000)
    setIntervalId(id)
    update()
  }

  return (
    <Card>
      <CardHeader><CardTitle>Countdown</CardTitle></CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input type="datetime-local" onClick={(e) => e.target.showPicker?.()} value={target} onChange={e => setTarget(e.target.value)} className="flex-1" />
          <Button onClick={startCountdown}>Start</Button>
        </div>
        {remaining && (
          <div className="mt-6 font-mono text-3xl text-center">
            {remaining.days}d {remaining.hours}h {remaining.mins}m {remaining.secs}s
          </div>
        )}
      </CardContent>
    </Card>
  )
}