import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrendingUp } from "lucide-react"

function fmt(n, d) {
  if (n === null || isNaN(n) || !isFinite(n)) return '\u2014'
  return n.toLocaleString('en-US', { maximumFractionDigits: d || 4 })
}

export default function SlopeCalculator() {
  const [mode, setMode] = useState('two-points')
  const [x1, setX1] = useState('0')
  const [y1, setY1] = useState('0')
  const [x2, setX2] = useState('4')
  const [y2, setY2] = useState('8')
  const [a, setA] = useState('2')
  const [b, setB] = useState('3')
  const [c, setC] = useState('5')

  const result = useMemo(() => {
    if (mode === 'two-points') {
      const X1 = parseFloat(x1), Y1 = parseFloat(y1), X2 = parseFloat(x2), Y2 = parseFloat(y2)
      if ([X1, Y1, X2, Y2].some(isNaN)) return { err: 'Enter all four values' }
      if (X1 === X2) return { err: 'Vertical line - slope is undefined' }
      const m = (Y2 - Y1) / (X2 - X1)
      const bVal = Y1 - m * X1
      const angle = Math.atan(m) * 180 / Math.PI
      const dist = Math.sqrt((X2 - X1) ** 2 + (Y2 - Y1) ** 2)
      return { m, b: bVal, angle, dist }
    } else {
      const A = parseFloat(a), B = parseFloat(b), C = parseFloat(c)
      if ([A, B, C].some(isNaN)) return { err: 'Enter A, B, C' }
      if (B === 0) return { err: 'Horizontal line - slope is 0 (C/A is not y-intercept form)' }
      const m = -A / B
      const bVal = C / B
      return { m, b: bVal, angle: Math.atan(m) * 180 / Math.PI, dist: null }
    }
  }, [mode, x1, y1, x2, y2, a, b, c])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-md">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          Slope Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Input mode</label>
          <select value={mode} onChange={e => setMode(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            <option value="two-points">Two points (x1,y1) and (x2,y2)</option>
            <option value="standard">Standard form Ax + By = C</option>
          </select>
        </div>

        {mode === 'two-points' ? (
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-sm font-semibold mb-1.5 block">x1</label><Input type="number" value={x1} onChange={e => setX1(e.target.value)} className="h-11" /></div>
            <div><label className="text-sm font-semibold mb-1.5 block">y1</label><Input type="number" value={y1} onChange={e => setY1(e.target.value)} className="h-11" /></div>
            <div><label className="text-sm font-semibold mb-1.5 block">x2</label><Input type="number" value={x2} onChange={e => setX2(e.target.value)} className="h-11" /></div>
            <div><label className="text-sm font-semibold mb-1.5 block">y2</label><Input type="number" value={y2} onChange={e => setY2(e.target.value)} className="h-11" /></div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-sm font-semibold mb-1.5 block">A</label><Input type="number" value={a} onChange={e => setA(e.target.value)} className="h-11" /></div>
            <div><label className="text-sm font-semibold mb-1.5 block">B</label><Input type="number" value={b} onChange={e => setB(e.target.value)} className="h-11" /></div>
            <div><label className="text-sm font-semibold mb-1.5 block">C</label><Input type="number" value={c} onChange={e => setC(e.target.value)} className="h-11" /></div>
          </div>
        )}

        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-xl p-4 border border-orange-500/20 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div><div className="text-xs text-muted-foreground">Slope m</div><div className="text-2xl font-black text-orange-600 tabular-nums">{fmt(result.m)}</div></div>
              <div><div className="text-xs text-muted-foreground">y-intercept b</div><div className="text-2xl font-black text-orange-600 tabular-nums">{fmt(result.b)}</div></div>
              <div><div className="text-xs text-muted-foreground">Angle</div><div className="text-base font-bold tabular-nums">{fmt(result.angle, 2)} deg</div></div>
              <div><div className="text-xs text-muted-foreground">Distance</div><div className="text-base font-bold tabular-nums">{fmt(result.dist)}</div></div>
            </div>
            <div className="text-xs text-center text-muted-foreground pt-2 border-t border-orange-500/20">
              Line: y = {fmt(result.m)} x + {fmt(result.b)}
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          Slope m = (y2 - y1) / (x2 - x1). Angle = arctan(m) in degrees. Distance uses the Pythagorean theorem.
        </div>
      </CardContent>
    </Card>
  )
}