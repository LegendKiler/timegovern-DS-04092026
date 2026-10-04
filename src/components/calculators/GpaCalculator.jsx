import { useState, useEffect } from 'react'
import { useCalculation } from '../../context/CalculationContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GraduationCap, Plus, Trash2 } from "lucide-react"

const GRADES = [
  { label: 'A+', value: 4.0 }, { label: 'A', value: 4.0 }, { label: 'A-', value: 3.7 },
  { label: 'B+', value: 3.3 }, { label: 'B', value: 3.0 }, { label: 'B-', value: 2.7 },
  { label: 'C+', value: 2.3 }, { label: 'C', value: 2.0 }, { label: 'C-', value: 1.7 },
  { label: 'D+', value: 1.3 }, { label: 'D', value: 1.0 }, { label: 'F', value: 0.0 },
]

export default function GpaCalculator() {
  const [rows, setRows] = useState([{ name: '', credits: '', grade: 'A' }])
  const [result, setResult] = useState(null)
  const { registerCalculation } = useCalculation()

  useEffect(() => {
    registerCalculation({
      type: 'gpa',
      countrySlug: null,
      title: 'GPA',
      inputs: { count: rows.length },
      results: result || {},
    })
  }, [rows, result, registerCalculation])

  const updateRow = (i, key, val) => {
    const next = rows.slice()
    next[i] = { ...next[i], [key]: val }
    setRows(next)
  }
  const addRow = () => setRows(rows.concat([{ name: '', credits: '', grade: 'A' }]))
  const removeRow = (i) => setRows(rows.filter((_, idx) => idx !== i))

  const calc = () => {
    const valid = rows.filter(r => r.credits && parseFloat(r.credits) > 0)
    if (valid.length === 0) return
    let totalPoints = 0
    let totalCredits = 0
    for (const r of valid) {
      const credit = parseFloat(r.credits)
      const g = GRADES.find(x => x.label === r.grade)
      const gp = g ? g.value : 0
      totalPoints += credit * gp
      totalCredits += credit
    }
    setResult({ gpa: totalCredits > 0 ? totalPoints / totalCredits : 0, totalCredits, totalPoints, courses: valid.length })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          GPA Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_70px_80px_36px] gap-2 items-center">
              <Input placeholder="Course" value={r.name} onChange={(e) => updateRow(i, 'name', e.target.value)} className="h-10" />
              <Input type="number" placeholder="Cr" value={r.credits} onChange={(e) => updateRow(i, 'credits', e.target.value)} className="h-10" />
              <select value={r.grade} onChange={(e) => updateRow(i, 'grade', e.target.value)} className="h-10 px-2 border border-border rounded-lg bg-background text-foreground text-sm">
                {GRADES.map(g => <option key={g.label} value={g.label}>{g.label}</option>)}
              </select>
              <Button variant="ghost" size="sm" onClick={() => removeRow(i)} disabled={rows.length === 1} className="h-10 w-9 p-0">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" onClick={addRow} className="w-full h-10">
          <Plus className="h-4 w-4 mr-1" /> Add Course
        </Button>
        <Button onClick={calc} className="w-full h-11 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">Calculate GPA</Button>

        {result && (
          <div className="space-y-2">
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-4 text-center border border-blue-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">GPA (4.0 scale)</div>
              <div className="text-4xl font-black text-blue-600 tabular-nums">{result.gpa.toFixed(2)}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Credits</div><div className="font-bold tabular-nums">{result.totalCredits}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Points</div><div className="font-bold tabular-nums">{result.totalPoints.toFixed(1)}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Courses</div><div className="font-bold tabular-nums">{result.courses}</div></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}