import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Square } from "lucide-react"

const SHAPES = [
  { id: 'rectangle', name: 'Rectangle', fields: [
    { key: 'w', label: 'Width', default: '5' },
    { key: 'h', label: 'Height', default: '3' }
  ]},
  { id: 'square', name: 'Square', fields: [
    { key: 's', label: 'Side', default: '4' }
  ]},
  { id: 'circle', name: 'Circle', fields: [
    { key: 'r', label: 'Radius', default: '3' }
  ]},
  { id: 'triangle', name: 'Triangle (base x height)', fields: [
    { key: 'b', label: 'Base', default: '6' },
    { key: 'h', label: 'Height', default: '4' }
  ]},
  { id: 'trapezoid', name: 'Trapezoid', fields: [
    { key: 'a', label: 'Parallel side a', default: '6' },
    { key: 'b', label: 'Parallel side b', default: '4' },
    { key: 'h', label: 'Height', default: '3' }
  ]},
  { id: 'parallelogram', name: 'Parallelogram', fields: [
    { key: 'b', label: 'Base', default: '5' },
    { key: 'h', label: 'Height', default: '4' }
  ]}
]

const UNITS = [
  { id: 'm', name: 'Meters (m)' },
  { id: 'cm', name: 'Centimeters (cm)' },
  { id: 'ft', name: 'Feet (ft)' },
  { id: 'in', name: 'Inches (in)' },
  { id: 'yd', name: 'Yards (yd)' }
]

function computeArea(id, vals) {
  const v = {}
  for (const k in vals) {
    v[k] = parseFloat(vals[k])
    if (isNaN(v[k])) return null
  }
  switch (id) {
    case 'rectangle': return v.w * v.h
    case 'square': return v.s * v.s
    case 'circle': return Math.PI * v.r * v.r
    case 'triangle': return 0.5 * v.b * v.h
    case 'trapezoid': return 0.5 * (v.a + v.b) * v.h
    case 'parallelogram': return v.b * v.h
    default: return null
  }
}

export default function AreaCalculator() {
  const [shapeId, setShapeId] = useState('rectangle')
  const [unit, setUnit] = useState('m')
  const shape = SHAPES.find(s => s.id === shapeId)
  const [vals, setVals] = useState(() => {
    const o = {}
    for (const f of SHAPES[0].fields) { o[f.key] = f.default }
    return o
  })

  function changeShape(id) {
    const s = SHAPES.find(x => x.id === id)
    const o = {}
    for (const f of s.fields) { o[f.key] = f.default }
    setShapeId(id)
    setVals(o)
  }

  const area = useMemo(() => computeArea(shapeId, vals), [shapeId, vals])
  const unitSq = unit + '\u00B2'

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md">
            <Square className="h-4 w-4 text-white" />
          </div>
          Area Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Shape</label>
          <select value={shapeId} onChange={e => changeShape(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            {SHAPES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Unit</label>
          <select value={unit} onChange={e => setUnit(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            {UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {shape.fields.map(f => (
            <div key={f.key}>
              <label className="text-sm font-semibold mb-1.5 block">{f.label}</label>
              <Input type="number" value={vals[f.key]} onChange={e => setVals({ ...vals, [f.key]: e.target.value })} className="h-11" />
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-xl p-4 text-center border border-emerald-500/20">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Area</div>
          <div className="text-3xl font-black text-emerald-600 tabular-nums">
            {area === null ? '\u2014' : area.toLocaleString('en-US', { maximumFractionDigits: 4 })}
          </div>
          {area !== null && <div className="text-xs text-muted-foreground mt-1">{unitSq}</div>}
        </div>
        <div className="text-xs text-muted-foreground text-center">
          Area formulas: rectangle w x h, square s^2, circle pi x r^2, triangle 0.5 x b x h, trapezoid 0.5 x (a + b) x h, parallelogram b x h.
        </div>
      </CardContent>
    </Card>
  )
}