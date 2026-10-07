import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FunctionSquare } from "lucide-react"

function fmt(n, d) {
  if (n === null || isNaN(n) || !isFinite(n)) return '\u2014'
  return n.toLocaleString('en-US', { maximumFractionDigits: d || 4 })
}

export default function QuadraticCalculator() {
  const [a, setA] = useState('1')
  const [b, setB] = useState('-5')
  const [c, setC] = useState('6')

  const result = useMemo(() => {
    const A = parseFloat(a), B = parseFloat(b), C = parseFloat(c)
    if ([A, B, C].some(isNaN)) return { err: 'Enter A, B, C' }
    if (A === 0) return { err: 'A cannot be 0 (not quadratic, linear)' }
    const disc = B * B - 4 * A * C
    const vertexX = -B / (2 * A)
    const vertexY = A * vertexX * vertexX + B * vertexX + C
    if (disc > 0) {
      const r1 = (-B + Math.sqrt(disc)) / (2 * A)
      const r2 = (-B - Math.sqrt(disc)) / (2 * A)
      return { disc, r1, r2, vertexX, vertexY, type: 'two-real' }
    } else if (disc === 0) {
      const r = -B / (2 * A)
      return { disc, r1: r, r2: r, vertexX, vertexY, type: 'one-real' }
    } else {
      const re = -B / (2 * A)
      const im = Math.sqrt(-disc) / (2 * A)
      return { disc, re, im, vertexX, vertexY, type: 'complex' }
    }
  }, [a, b, c])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md">
            <FunctionSquare className="h-4 w-4 text-white" />
          </div>
          Quadratic Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center text-sm text-muted-foreground">Solve Ax^2 + Bx + C = 0</div>
        <div className="grid grid-cols-3 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">A</label><Input type="number" value={a} onChange={e => setA(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">B</label><Input type="number" value={b} onChange={e => setB(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">C</label><Input type="number" value={c} onChange={e => setC(e.target.value)} className="h-11" /></div>
        </div>

        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl p-4 border border-cyan-500/20 space-y-3">
            <div className="text-xs text-muted-foreground uppercase tracking-wide text-center">Roots</div>
            {result.type === 'two-real' && (
              <div className="grid grid-cols-2 gap-3 text-center">
                <div><div className="text-xs text-muted-foreground">x1</div><div className="text-2xl font-black text-cyan-600 tabular-nums">{fmt(result.r1)}</div></div>
                <div><div className="text-xs text-muted-foreground">x2</div><div className="text-2xl font-black text-cyan-600 tabular-nums">{fmt(result.r2)}</div></div>
              </div>
            )}
            {result.type === 'one-real' && (
              <div className="text-center"><div className="text-xs text-muted-foreground">double root x</div><div className="text-2xl font-black text-cyan-600 tabular-nums">{fmt(result.r1)}</div></div>
            )}
            {result.type === 'complex' && (
              <div className="text-center text-sm">
                <div className="text-cyan-600 font-bold tabular-nums">x = {fmt(result.re)} + {fmt(result.im)}i</div>
                <div className="text-cyan-600 font-bold tabular-nums">x = {fmt(result.re)} - {fmt(result.im)}i</div>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-cyan-500/20">
              <div><div className="text-xs text-muted-foreground">Discriminant</div><div className="text-sm font-bold tabular-nums">{fmt(result.disc)}</div></div>
              <div><div className="text-xs text-muted-foreground">Vertex x</div><div className="text-sm font-bold tabular-nums">{fmt(result.vertexX)}</div></div>
              <div><div className="text-xs text-muted-foreground">Vertex y</div><div className="text-sm font-bold tabular-nums">{fmt(result.vertexY)}</div></div>
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          Discriminant = B^2 - 4AC. Positive: two real roots. Zero: one double root. Negative: two complex roots. Vertex x = -B / (2A).
        </div>
      </CardContent>
    </Card>
  )
}