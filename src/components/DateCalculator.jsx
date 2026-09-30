import { useState } from 'react'
import { differenceInDays, differenceInWeeks, differenceInMonths } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
    <Card>
      <CardHeader><CardTitle>Date Calculator</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <Input type="date" onClick={(e) => e.target.showPicker?.()} value={start} onChange={e => setStart(e.target.value)} />
          <Input type="date" onClick={(e) => e.target.showPicker?.()} value={end} onChange={e => setEnd(e.target.value)} />
        </div>
        <Button onClick={calculate} className="mt-4 w-full">Calculate</Button>
        {result && (
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded bg-muted p-2"><div className="text-2xl font-bold">{result.days}</div><div className="text-sm">Days</div></div>
            <div className="rounded bg-muted p-2"><div className="text-2xl font-bold">{result.weeks}</div><div className="text-sm">Weeks</div></div>
            <div className="rounded bg-muted p-2"><div className="text-2xl font-bold">{result.months}</div><div className="text-sm">Months</div></div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}