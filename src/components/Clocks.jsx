import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { formatDate, formatTime, getWeekNumber, getUTCOffset, getDSTStatus } from '../utils/dateHelpers'

export default function Clocks() {
  const { location } = useUser()
  const [timeZone, setTimeZone] = useState('UTC')
  const [now, setNow] = useState(new Date())
  const [timeZones, setTimeZones] = useState([])

  useEffect(() => {
    setTimeZones(Intl.supportedValuesOf('timeZone'))
    if (location?.timezone) setTimeZone(location.timezone)
  }, [location])

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const updateAnalogHands = () => {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }).formatToParts(now)
    const h = parseInt(parts.find(p => p.type === 'hour').value) % 12
    const m = parseInt(parts.find(p => p.type === 'minute').value)
    const s = parseInt(parts.find(p => p.type === 'second').value)
    const secDeg = (s / 60) * 360
    const minDeg = ((m + s / 60) / 60) * 360
    const hourDeg = ((h + m / 60 + s / 3600) / 12) * 360
    return { secDeg, minDeg, hourDeg }
  }

  const { secDeg, minDeg, hourDeg } = updateAnalogHands()

  return (
    <div className="card bg-card rounded-card p-6 shadow-card" id="clocks">
      <h2 className="text-xl font-semibold mb-4">Local Time</h2>
      <div className="flex flex-col items-center">
        {/* Analog clock */}
        <div className="w-40 h-40 rounded-full border-4 border-gray-400 dark:border-gray-600 relative mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
          </div>
          <div className="absolute left-1/2 top-1/2 origin-bottom transform -translate-x-1/2 -translate-y-full" style={{ transform: `rotate(${hourDeg}deg)`, height: '30px', width: '2px', backgroundColor: 'var(--text-primary)' }}></div>
          <div className="absolute left-1/2 top-1/2 origin-bottom transform -translate-x-1/2 -translate-y-full" style={{ transform: `rotate(${minDeg}deg)`, height: '45px', width: '1px', backgroundColor: 'var(--text-primary)' }}></div>
          <div className="absolute left-1/2 top-1/2 origin-bottom transform -translate-x-1/2 -translate-y-full" style={{ transform: `rotate(${secDeg}deg)`, height: '50px', width: '0.5px', backgroundColor: 'red' }}></div>
        </div>
        {/* Digital clock */}
        <div className="font-mono text-3xl">{formatTime(now, timeZone)}</div>
        <div className="text-gray-500 mt-2">{formatDate(now, timeZone)}</div>
      </div>
      <div className="mt-4">
        <select
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
          className="w-full p-2 border rounded"
          aria-label="Select timezone"
        >
          {timeZones.map(tz => <option key={tz} value={tz}>{tz}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm mt-4">
        <div>Week: {getWeekNumber(now)}</div>
        <div>UTC Offset: {getUTCOffset(timeZone)}</div>
        <div>DST: {getDSTStatus(timeZone)}</div>
      </div>
    </div>
  )
}