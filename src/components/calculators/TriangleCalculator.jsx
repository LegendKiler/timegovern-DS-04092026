import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Triangle } from "lucide-react"

const DEG = 180 / Math.PI

function fmt(n, d) {
  if (n === null || isNaN(n) || !isFinite(n)) return '\u2014'
  return n.toLocaleString('en-US', { maximumFractionDigits: d || 4 })
}

function solveSSS(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0) return { err: 'Sides must be positive' }
  if (a + b <= c || a + c <= b || b + c <= a) return { err: 'Triangle inequality violated - no such triangle' }
  const A = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * DEG
  const B = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * DEG
  const C = 180 - A - B
  const s = (a + b + c) / 2
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c))
  return { a, b, c, A, B, C, area, perimeter: a + b + c }
}

function solveSAS(a, b, C) {
  if (a <= 0 || b <= 0) return { err: 'Sides must be positive' }
  if (C <= 0 || C >= 180) return { err: 'Angle must be between 0 and 180 degrees' }
  const Crad = C / DEG
  const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(Crad))
  const A = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * DEG
  const B = 180 - A - C
  const area = 0.5 * a * b * Math.sin(Crad)
  return { a, b, c, A, B, C, area, perimeter: a + b + c }
}

function solveRight(a, b) {
  if (a <= 0 || b <= 0) return { err: 'Legs must be positive' }
  const c = Math.sqrt(a * a + b * b)
  const A = Math.atan2(a, b) * DEG
  const B = 90 - A
  const area = 0.5 * a * b
  return { a, b, c, A, B, C: 90, area, perimeter: a + b + c }
}

export default function TriangleCalculator() {
  const [mode, setMode] = useState('sss')
  const [inputs, setInputs] = useState({ a: '3', b: '4', c: '5', C: '60' })

  const result = useMemo(() => {
    const a = parseFloat(inputs.a)
    const b = parseFloat(inputs.b)
    const c = parseFloat(inputs.c)
    const C = parseFloat(inputs.C)
    if (mode === 'sss') return solveSSS(a, b, c)
    if (mode === 'sas') return solveSAS(a, b, C)
    return solveRight(a, b)
  }, [mode, inputs])

  function set(k, v) { setInputs(prev => ({ ...prev, [k]: v })) }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-md">
            <Triangle className="h-4 w-4 text-white" />
          </div>
          Triangle Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Input mode</label>
          <select value={mode} onChange={e => setMode(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            <option value="sss">SSS - three sides</option>
            <option value="sas">SAS - two sides + included angle C</option>
            <option value="right">Right triangle - two legs</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Side a</label>
            <Input type="number" value={inputs.a} onChange={e => set('a', e.target.value)} className="h-11" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Side b</label>
            <Input type="number" value={inputs.b} onChange={e => set('b', e.target.value)} className="h-11" />
          </div>
          {mode === 'sss' && (
            <div className="col-span-2">
              <label className="text-sm font-semibold mb-1.5 block">Side c</label>
              <Input type="number" value={inputs.c} onChange={e => set('c', e.target.value)} className="h-11" />
            </div>
          )}
          {mode === 'sas' && (
            <div className="col-span-2">
              <label className="text-sm font-semibold mb-1.5 block">Included angle C (degrees)</label>
              <Input type="number" value={inputs.C} onChange={e => set('C', e.target.value)} className="h-11" />
            </div>
          )}
        </div>

        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">
            {result.err}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-xl p-4 border border-violet-500/20 space-y-3">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Solved</div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div><div className="text-xs text-muted-foreground">Side c</div><div className="text-lg font-black text-violet-600 tabular-nums">{fmt(result.c)}</div></div>
              <div><div className="text-xs text-muted-foreground">Perimeter</div><div className="text-lg font-black text-violet-600 tabular-nums">{fmt(result.perimeter)}</div></div>
              <div><div className="text-xs text-muted-foreground">Area</div><div className="text-lg font-black text-violet-600 tabular-nums">{fmt(result.area)}</div></div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center pt-2 border-t border-violet-500/20">
              <div><div className="text-xs text-muted-foreground">Angle A</div><div className="text-base font-bold tabular-nums">{fmt(result.A, 2)} deg</div></div>
              <div><div className="text-xs text-muted-foreground">Angle B</div><div className="text-base font-bold tabular-nums">{fmt(result.B, 2)} deg</div></div>
              <div><div className="text-xs text-muted-foreground">Angle C</div><div className="text-base font-bold tabular-nums">{fmt(result.C, 2)} deg</div></div>
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          SSS uses the law of cosines plus Heron formula. SAS uses the law of cosines for the third side, then inverse cosine for the remaining angles. Angles sum to 180 degrees.
        </div>
      </CardContent>
    </Card>
  )
}