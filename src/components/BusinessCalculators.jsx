import { useState } from 'react'
import { addBusinessDays, isWeekend, differenceInBusinessDays } from 'date-fns'
import { isHoliday } from '../utils/holidays'

export default function BusinessCalculators() {
  const [region, setRegion] = useState('US')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [days, setDays] = useState(null)
  const [startProj, setStartProj] = useState('')
  const [numDays, setNumDays] = useState(10)
  const [projEnd, setProjEnd] = useState('')

  const countBusiness = () => {
    if (!start || !end) return
    const s = new Date(start)
    const e = new Date(end)
    let count = 0
    let current = new Date(s)
    while (current <= e) {
      if (!isWeekend(current) && !isHoliday(current.toISOString().split('T')[0], region)) count++
      current.setDate(current.getDate() + 1)
    }
    setDays(count)
  }

  const projectDeadline = () => {
    if (!startProj) return
    const s = new Date(startProj)
    let count = 0
    let current = new Date(s)
    while (count < numDays) {
      current.setDate(current.getDate() + 1)
      if (!isWeekend(current) && !isHoliday(current.toISOString().split('T')[0], region)) count++
    }
    setProjEnd(current.toISOString().split('T')[0])
  }

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">Business Tools</h2>
      <div className="mb-2">
        <label className="block text-sm">Region</label>
        <select value={region} onChange={e => setRegion(e.target.value)} className="w-full border rounded p-2">
          <option>US</option>
          <option>UK</option>
          <option>AU</option>
          <option>NZ</option>
        </select>
      </div>
      <div className="mb-2">
        <p className="font-medium">Working Day Counter</p>
        <div className="flex gap-2">
          <input type="date" className="border rounded p-2" value={start} onChange={e => setStart(e.target.value)} />
          <input type="date" className="border rounded p-2" value={end} onChange={e => setEnd(e.target.value)} />
        </div>
        <button onClick={countBusiness} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Count</button>
        {days !== null && <p className="mt-2">Business days: {days}</p>}
      </div>
      <div className="mt-4">
        <p className="font-medium">Deadline Projector</p>
        <div className="flex gap-2">
          <input type="date" className="border rounded p-2" value={startProj} onChange={e => setStartProj(e.target.value)} />
          <input type="number" className="border rounded p-2" value={numDays} onChange={e => setNumDays(parseInt(e.target.value))} />
        </div>
        <button onClick={projectDeadline} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Project</button>
        {projEnd && <p className="mt-2">Projected end: {projEnd}</p>}
      </div>
    </div>
  )
}