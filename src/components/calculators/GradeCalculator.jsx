import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GraduationCap } from "lucide-react"
import { COUNTRY_METADATA, getCountriesByRegion, REGION_ORDER } from '../../data/countryMetadata'

const SCALE_BY_COUNTRY = {
  US: 'us4', CA: 'us4', GB: 'ukClass', IE: 'ukClass', AU: 'ukClass', NZ: 'ukClass',
  DE: 'germany', AT: 'germany', CH: 'germany', NL: 'germany',
  IN: 'india', PK: 'india', BD: 'india', LK: 'india',
  FR: 'france', BE: 'france',
  CN: 'percent100', JP: 'percent100', KR: 'percent100', SG: 'percent100', HK: 'percent100', TW: 'percent100'
}

function toUs4(pct) {
  if (pct >= 93) return { value: 4.0, letter: 'A' }
  if (pct >= 90) return { value: 3.7, letter: 'A-' }
  if (pct >= 87) return { value: 3.3, letter: 'B+' }
  if (pct >= 83) return { value: 3.0, letter: 'B' }
  if (pct >= 80) return { value: 2.7, letter: 'B-' }
  if (pct >= 77) return { value: 2.3, letter: 'C+' }
  if (pct >= 73) return { value: 2.0, letter: 'C' }
  if (pct >= 70) return { value: 1.7, letter: 'C-' }
  if (pct >= 67) return { value: 1.3, letter: 'D+' }
  if (pct >= 63) return { value: 1.0, letter: 'D' }
  if (pct >= 60) return { value: 0.7, letter: 'D-' }
  return { value: 0, letter: 'F' }
}

function toUkClass(pct) {
  if (pct >= 70) return { value: 'First', letter: '1st' }
  if (pct >= 60) return { value: '2:1', letter: 'Upper second' }
  if (pct >= 50) return { value: '2:2', letter: 'Lower second' }
  if (pct >= 40) return { value: 'Third', letter: '3rd' }
  return { value: 'Fail', letter: 'F' }
}

function toGermany(pct) {
  if (pct >= 95) return { value: 1.0, letter: 'sehr gut' }
  if (pct >= 90) return { value: 1.3, letter: 'sehr gut' }
  if (pct >= 85) return { value: 1.7, letter: 'gut' }
  if (pct >= 80) return { value: 2.0, letter: 'gut' }
  if (pct >= 75) return { value: 2.3, letter: 'gut' }
  if (pct >= 70) return { value: 2.7, letter: 'befriedigend' }
  if (pct >= 65) return { value: 3.0, letter: 'befriedigend' }
  if (pct >= 60) return { value: 3.3, letter: 'befriedigend' }
  if (pct >= 55) return { value: 3.7, letter: 'ausreichend' }
  if (pct >= 50) return { value: 4.0, letter: 'ausreichend' }
  return { value: 5.0, letter: 'nicht bestanden' }
}

function toIndia(pct) {
  if (pct >= 90) return { value: 'O', letter: 'Outstanding' }
  if (pct >= 80) return { value: 'A+', letter: 'Excellent' }
  if (pct >= 70) return { value: 'A', letter: 'Very good' }
  if (pct >= 60) return { value: 'B+', letter: 'Good' }
  if (pct >= 50) return { value: 'B', letter: 'Above average' }
  if (pct >= 40) return { value: 'C', letter: 'Pass' }
  return { value: 'F', letter: 'Fail' }
}

function toFrance(pct) {
  const note = Math.round(pct / 5)
  if (note >= 16) return { value: note + '/20', letter: 'Tres bien' }
  if (note >= 14) return { value: note + '/20', letter: 'Bien' }
  if (note >= 12) return { value: note + '/20', letter: 'Assez bien' }
  if (note >= 10) return { value: note + '/20', letter: 'Passable' }
  return { value: note + '/20', letter: 'Insuffisant' }
}

function scaleLabel(key) {
  return { us4: 'US 4.0 GPA', ukClass: 'UK class', germany: 'German 1-6', india: 'India grade', france: 'France 0-20', percent100: 'Percentage' }[key] || 'Percentage'
}

function interpret(pct, scaleKey) {
  if (scaleKey === 'us4') return toUs4(pct)
  if (scaleKey === 'ukClass') return toUkClass(pct)
  if (scaleKey === 'germany') return toGermany(pct)
  if (scaleKey === 'india') return toIndia(pct)
  if (scaleKey === 'france') return toFrance(pct)
  return { value: pct.toFixed(1) + '%', letter: pct >= 60 ? 'Pass' : 'Fail' }
}

export default function GradeCalculator({ initialCountryCode }) {
  const [countryCode, setCountryCode] = useState(initialCountryCode || 'US')
  const [grades, setGrades] = useState([
    { grade: '85', weight: '40' },
    { grade: '92', weight: '60' }
  ])
  const [mode, setMode] = useState('weighted')

  const byRegion = useMemo(() => getCountriesByRegion(), [])

  const addRow = () => setGrades([...grades, { grade: '', weight: '' }])
  const removeRow = (idx) => setGrades(grades.filter((_, i) => i !== idx))
  const updateRow = (idx, field, val) => {
    const next = [...grades]
    next[idx] = { ...next[idx], [field]: val }
    setGrades(next)
  }

  const calc = useMemo(() => {
    let totalWeight = 0
    let weightedSum = 0
    let simpleSum = 0
    let count = 0
    for (const g of grades) {
      const pct = parseFloat(g.grade)
      const w = parseFloat(g.weight)
      if (isNaN(pct)) continue
      if (mode === 'weighted' && !isNaN(w) && w > 0) {
        weightedSum += pct * w
        totalWeight += w
      }
      simpleSum += pct
      count++
    }
    const average = mode === 'weighted' && totalWeight > 0 ? weightedSum / totalWeight : (count > 0 ? simpleSum / count : 0)
    const scaleKey = SCALE_BY_COUNTRY[countryCode] || 'percent100'
    const interpreted = interpret(average, scaleKey)
    return { average, scaleKey, interpreted, count }
  }, [grades, mode, countryCode])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-md">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          Grade Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Country (grading scale)</label>
          <select value={countryCode} onChange={e => setCountryCode(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            {REGION_ORDER.map(r => byRegion[r] && byRegion[r].length > 0 && (<optgroup key={r} label={r}>{byRegion[r].map(c => <option key={c.code} value={c.code}>{c.name} — {scaleLabel(SCALE_BY_COUNTRY[c.code] || 'percent100')}</option>)}</optgroup>))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Calculation mode</label>
          <select value={mode} onChange={e => setMode(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            <option value="weighted">Weighted average</option>
            <option value="simple">Simple average</option>
          </select>
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-[1fr_1fr_auto] gap-2 text-xs text-muted-foreground font-semibold">
            <div>Grade (%)</div><div>Weight (%)</div><div></div>
          </div>
          {grades.map((g, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <Input type="number" value={g.grade} onChange={e => updateRow(i, 'grade', e.target.value)} placeholder="85" className="h-10" />
              <Input type="number" value={g.weight} onChange={e => updateRow(i, 'weight', e.target.value)} placeholder={mode === 'weighted' ? '40' : '-'} disabled={mode === 'simple'} className="h-10" />
              <button onClick={() => removeRow(i)} className="h-10 w-10 rounded-lg border border-border hover:bg-muted/50 flex items-center justify-center text-muted-foreground" aria-label="Remove">×</button>
            </div>
          ))}
          <button onClick={addRow} className="w-full h-10 rounded-lg border border-dashed border-border hover:bg-muted/30 text-sm font-semibold text-muted-foreground">
            + Add grade
          </button>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-4 text-center border border-amber-500/20">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Result ({scaleLabel(calc.scaleKey)})</div>
          <div className="text-3xl font-black text-amber-600 tabular-nums">{calc.interpreted.value}</div>
          <div className="text-xs text-muted-foreground mt-1">{calc.interpreted.letter} · {calc.average.toFixed(2)}%</div>
        </div>
      </CardContent>
    </Card>
  )
}