import { useState } from 'react'
import { differenceInDays, differenceInWeeks, differenceInMonths } from 'date-fns'

export default function DateCalculator() {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!start || !end) return
    const s = new Date(start)
    const e = new Date(end)
    setResult({
      days: differenceInDays(e, s),
      weeks: differenceInWeeks(e, s),
      months: differenceInMonths(e, s),
    })
  }

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">Date Calculator</h2>
      <div className="grid grid-cols-2 gap-2">
        <input type="date" className="border rounded p-2" value={start} onChange={e => setStart(e.target.value)} />
        <input type="date" className="border rounded p-2" value={end} onChange={e => setEnd(e.target.value)} />
      </div>
      <button onClick={calculate} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Calculate</button>
      {result && (
        <div className="mt-4">
          <p>Days: {result.days}</p>
          <p>Weeks: {result.weeks}</p>
          <p>Months: {result.months}</p>
        </div>
      )}
    </div>
  )
}