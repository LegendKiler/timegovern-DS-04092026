import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Box } from "lucide-react"

const SHAPES = [
  { id: 'cube', name: 'Cube', fields: [
    { key: 's', label: 'Side', default: '3' }
  ]},
  { id: 'prism', name: 'Rectangular Prism', fields: [
    { key: 'l', label: 'Length', default: '4' },
    { key: 'w', label: 'Width', default: '3' },
    { key: 'h', label: 'Height', default: '2' }
  ]},
  { id: 'cylinder', name: 'Cylinder', fields: [
    { key: 'r', label: 'Radius', default: '2' },
    { key: 'h', label: 'Height', default: '5' }
  ]},
  { id: 'sphere', name: 'Sphere', fields: [
    { key: 'r', label: 'Radius', default: '3' }
  ]},
  { id: 'cone', name: 'Cone', fields: [
    { key: 'r', label: 'Radius', default: '2' },
    { key: 'h', label: 'Height', default: '4' }
  ]},
  { id: 'pyramid', name: 'Square Pyramid', fields: [
    { key: 's', label: 'Base side', default: '3' },
    { key: 'h', label: 'Height', default: '4' }
  ]}
]

const UNITS = [
  { id: 'm', name: 'Meters (m)' },
  { id: 'cm', name: 'Centimeters (cm)' },
  { id: 'ft', name: 'Feet (ft)' },
  { id: 'in', name: 'Inches (in)' }
]

function computeVolume(id, vals) {
  const v = {}
  for (const k in vals) {
    v[k] = parseFloat(vals[k])
    if (isNaN(v[k])) return null
  }
  switch (id) {
    case 'cube': return v.s * v.s * v.s
    case 'prism': return v.l * v.w * v.h
    case 'cylinder': return Math.PI * v.r * v.r * v.h
    case 'sphere': return (4 / 3) * Math.PI * v.r * v.r * v.r
    case 'cone': return (1 / 3) * Math.PI * v.r * v.r * v.h
    case 'pyramid': return (1 / 3) * v.s * v.s * v.h
    default: return null
  }
}

export default function VolumeCalculator() {
  const [shapeId, setShapeId] = useState('cube')
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

  const vol = useMemo(() => computeVolume(shapeId, vals), [shapeId, vals])
  const unitCubed = unit + '\u00B3'

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
            <Box className="h-4 w-4 text-white" />
          </div>
          Volume Calculator
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
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-xl p-4 text-center border border-blue-500/20">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Volume</div>
          <div className="text-3xl font-black text-blue-600 tabular-nums">
            {vol === null ? '\u2014' : vol.toLocaleString('en-US', { maximumFractionDigits: 4 })}
          </div>
          {vol !== null && <div className="text-xs text-muted-foreground mt-1">{unitCubed}</div>}
        </div>
        <div className="text-xs text-muted-foreground text-center">
          Volume formulas: cube s^3, prism l x w x h, cylinder pi x r^2 x h, sphere (4/3) x pi x r^3, cone (1/3) x pi x r^2 x h, pyramid (1/3) x s^2 x h.
        </div>
      </CardContent>
    </Card>
  )
}