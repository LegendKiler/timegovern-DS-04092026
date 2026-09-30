import { useState, useEffect } from 'react'
import { useCalculation } from '../../context/CalculationContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Plus, Trash2 } from "lucide-react"

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function TimeCardCalculator() {
  const [rows, setRows] = useState([
    { day: 'Monday', start: '09:00', end: '17:00', breakMin: '30' },
    { day: 'Tuesday', start: '09:00', end: '17:00', breakMin: '30' },
    { day: 'Wednesday', start: '09:00', end: '17:00', breakMin: '30' },
    { day: 'Thursday', start: '09:00', end: '17:00', breakMin: '30' },
    { day: 'Friday', start: '09:00', end: '17:00', breakMin: '30' },
  ])
  const [rate, setRate] = useState('25')

  const updateRow = (i, k, v) => setRows(rows.map((r, idx) => idx === i ? { ...r, [k]: v } : r))
  const addRow = () => setRows([...rows, { day: 'Monday', start: '09:00', end: '17:00', breakMin: '30' }])
  const removeRow = (i) => setRows(rows.filter((_, idx) => idx !== i))

  const dailyHours = (r) => {
    if (!r.start || !r.end) return 0
    const [sh, sm] = r.start.split(':').map(Number)
    const [eh, em] = r.end.split(':').map(Number)
    let s = sh * 60 + sm, e = eh * 60 + em
    if (e < s) e += 1440
    const breakM = parseInt(r.breakMin) || 0
    return Math.max(0, e - s - breakM) / 60
  }

  const totalHours = rows.reduce((sum, r) => sum + dailyHours(r), 0)
  const totalPay = totalHours * (parseFloat(rate) || 0)
  const fmtH = (n) => Math.floor(n) + 'h ' + String(Math.round((n - Math.floor(n)) * 60)).padStart(2, '0') + 'm'


  const { registerCalculation } = useCalculation()
  useEffect(() => {
    registerCalculation({
      type: 'time-card',
      countrySlug: null,
      title: 'Time Card Calculator',
      inputs: { rows_count: rows.length, rate },
      results: { totalHours, totalPay },
    })
  }, [rows, rate, totalHours, totalPay, registerCalculation])
  return (
    <Card className="border shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md">
            <Clock className="h-4 w-4 text-white" />
          </div>
          Time Card Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2 items-center">
          <label className="text-xs font-semibold whitespace-nowrap">Hourly rate ($)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)}
            className="h-9 px-2 border border-border rounded-lg bg-background text-foreground font-bold text-sm w-24" />
        </div>

        <div className="space-y-2">
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-1.5 items-center">
              <select value={r.day} onChange={(e) => updateRow(i, 'day', e.target.value)}
                className="h-9 px-1.5 border border-border rounded-lg bg-background text-foreground text-xs">
                {DAYS.map(d => <option key={d} value={d}>{d.slice(0, 3)}</option>)}
              </select>
              <input type="time" value={r.start} onClick={(e) => e.target.showPicker?.()} onChange={(e) => updateRow(i, 'start', e.target.value)}
                className="h-9 px-1.5 border border-border rounded-lg bg-background text-foreground text-xs w-24" />
              <input type="time" value={r.end} onClick={(e) => e.target.showPicker?.()} onChange={(e) => updateRow(i, 'end', e.target.value)}
                className="h-9 px-1.5 border border-border rounded-lg bg-background text-foreground text-xs w-24" />
              <input type="number" value={r.breakMin} onChange={(e) => updateRow(i, 'breakMin', e.target.value)}
                className="h-9 px-1.5 border border-border rounded-lg bg-background text-foreground text-xs w-14 text-center" placeholder="brk" />
              <button onClick={() => removeRow(i)} className="p-1.5 text-red-500 hover:bg-red-50 rounded">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        <Button onClick={addRow} variant="outline" className="w-full h-9"><Plus className="h-3.5 w-3.5 mr-1.5" /> Add day</Button>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-3 border border-cyan-500/20 text-center">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Total Hours</div>
            <div className="text-2xl font-black text-cyan-600">{fmtH(totalHours)}</div>
            <div className="text-[10px] text-muted-foreground">{totalHours.toFixed(2)} decimal</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-3 border border-emerald-500/20 text-center">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Estimated Pay</div>
            <div className="text-2xl font-black text-emerald-600">${totalPay.toFixed(2)}</div>
            <div className="text-[10px] text-muted-foreground">at ${rate}/hr</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}