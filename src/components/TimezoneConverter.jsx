import { useState } from 'react'
import { format } from 'date-fns-tz'

export default function TimezoneConverter() {
  const [fromTZ, setFromTZ] = useState('UTC')
  const [toTZ, setToTZ] = useState('America/New_York')
  const [time, setTime] = useState(new Date())

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">Timezone Converter</h2>
      <div className="mb-2">
        <label>From</label>
        <select value={fromTZ} onChange={e => setFromTZ(e.target.value)} className="w-full border rounded p-2">
          {Intl.supportedValuesOf('timeZone').map(tz => <option key={tz} value={tz}>{tz}</option>)}
        </select>
      </div>
      <div className="mb-2">
        <label>To</label>
        <select value={toTZ} onChange={e => setToTZ(e.target.value)} className="w-full border rounded p-2">
          {Intl.supportedValuesOf('timeZone').map(tz => <option key={tz} value={tz}>{tz}</option>)}
        </select>
      </div>
      <div className="mb-2">
        <label>Time (UTC)</label>
        <input type="datetime-local" value={time.toISOString().slice(0,16)} onChange={e => setTime(new Date(e.target.value))} className="w-full border rounded p-2" />
      </div>
      <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded">
        <p>{format(time, 'yyyy-MM-dd HH:mm', { timeZone: fromTZ })}</p>
        <p>â†’</p>
        <p>{format(time, 'yyyy-MM-dd HH:mm', { timeZone: toTZ })}</p>
      </div>
    </div>
  )
}