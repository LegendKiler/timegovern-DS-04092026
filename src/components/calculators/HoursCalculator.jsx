import { useState, useEffect } from 'react'
import { useCalculation } from '../../context/CalculationContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Plus, Trash2 } from "lucide-react"

export default function HoursCalculator() {
  const [rows, setRows] = useState([{ start: '09:00', end: '17:00' }])
  const [result, setResult] = useState(null)
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    registerCalculation({
      type: 'hours',
      countrySlug: null,
      title: 'Hours Calculator',
      inputs: { rows_count: rows.length },
      results: result || {},
    })
  }, [rows, result, registerCalculation])

  const addRow = () => setRows([...rows, { start: '09:00', end: '17:00' }])
  const removeRow = (i) => setRows(rows.filter((_, idx) => idx !== i))
  const updateRow = (i, k, v) => setRows(rows.map((r, idx) => idx === i ? { ...r, [k]: v } : r))

  const calc = () => {
    let totalMin = 0
    for (const r of rows) {
      if (!r.start || !r.end) continue
      const [sh, sm] = r.start.split(':').map(Number)
      const [eh, em] = r.end.split(':').map(Number)
      let s = sh * 60 + sm
      let e = eh * 60 + em
      if (e < s) e += 1440
      totalMin += e - s
    }
    const hours = Math.floor(totalMin / 60)
    const mins = totalMin % 60
    setResult({ hours, mins, totalMin, decimal: (totalMin / 60).toFixed(2) })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-lime-500 to-green-500 shadow-md">
            <Calculator className="h-4 w-4 text-white" />
          </div>
          Hours Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {rows.map((r, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Input type="time" value={r.start} onClick={(e) => e.target.showPicker?.()} onChange={(e) => updateRow(i, 'start', e.target.value)} className="h-10 flex-1" />
              <span className="text-muted-foreground text-xs">to</span>
              <Input type="time" value={r.end} onClick={(e) => e.target.showPicker?.()} onChange={(e) => updateRow(i, 'end', e.target.value)} className="h-10 flex-1" />
              {rows.length > 1 && (
                <button onClick={() => removeRow(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button onClick={addRow} variant="outline" className="h-10 flex-1"><Plus className="h-4 w-4 mr-1.5" /> Add row</Button>
          <Button onClick={calc} className="h-10 flex-1 bg-gradient-to-r from-lime-500 to-green-500 text-white">Calculate</Button>
        </div>

        {result && (
          <div className="space-y-3 pt-1">
            <div className="bg-gradient-to-br from-lime-500/10 to-green-500/10 rounded-xl p-4 text-center border border-lime-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total</div>
              <div className="text-4xl font-black text-lime-700 tabular-nums">{result.hours}<span className="text-lg">h</span> {String(result.mins).padStart(2, '0')}<span className="text-lg">m</span></div>
              <div className="text-xs text-muted-foreground mt-1">{result.decimal} decimal hours · {result.totalMin} min</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}