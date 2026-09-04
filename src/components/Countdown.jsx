import { useEffect, useState } from 'react'

export default function Countdown() {
  const [target, setTarget] = useState('')
  const [remaining, setRemaining] = useState(null)

  const startCountdown = () => {
    if (!target) return
    const end = new Date(target)
    const update = () => {
      const diff = end - new Date()
      if (diff <= 0) {
        setRemaining(null)
        clearInterval(interval)
        alert('Countdown finished!')
        return
      }
      const days = Math.floor(diff / (1000*60*60*24))
      const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60))
      const mins = Math.floor((diff % (1000*60*60)) / (1000*60))
      const secs = Math.floor((diff % (1000*60)) / 1000)
      setRemaining({ days, hours, mins, secs })
    }
    const interval = setInterval(update, 1000)
    update()
  }

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">Countdown</h2>
      <div className="flex gap-2">
        <input type="datetime-local" className="border rounded p-2 flex-1" value={target} onChange={e => setTarget(e.target.value)} />
        <button onClick={startCountdown} className="bg-blue-500 text-white px-4 py-2 rounded">Start</button>
      </div>
      {remaining && (
        <div className="mt-4 font-mono text-lg">
          {remaining.days}d {remaining.hours}h {remaining.mins}m {remaining.secs}s
        </div>
      )}
    </div>
  )
}