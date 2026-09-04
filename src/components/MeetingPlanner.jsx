import { useState } from 'react'

export default function MeetingPlanner() {
  const [timezones, setTimezones] = useState(['America/New_York', 'Europe/London'])
  const [hours, setHours] = useState(9) // 9 AM

  const addTZ = (tz) => setTimezones([...timezones, tz])
  const removeTZ = (index) => setTimezones(timezones.filter((_, i) => i !== index))

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">Meeting Planner</h2>
      <p className="text-sm mb-2">Select timezones and see overlapping hours.</p>
      <div className="mb-2">
        {timezones.map((tz, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <span>{tz}</span>
            <button onClick={() => removeTZ(i)} className="text-red-500">âœ•</button>
          </div>
        ))}
        <select onChange={(e) => addTZ(e.target.value)} className="border rounded p-1">
          {Intl.supportedValuesOf('timeZone').map(tz => <option key={tz} value={tz}>{tz}</option>)}
        </select>
      </div>
      <p>Working hour input (for demo): {hours}:00</p>
    </div>
  )
}