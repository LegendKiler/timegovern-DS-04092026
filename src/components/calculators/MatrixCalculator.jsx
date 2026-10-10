import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Grid3X3 } from "lucide-react"

const fmt = (n) => (typeof n === 'number' && isFinite(n)) ? (Math.abs(n) < 1e-9 ? '0' : n.toFixed(4).replace(/\.?0+$/, '')) : '—'

export default function MatrixCalculator() {
  const [op, setOp] = useState('det')
  const [a, setA] = useState('1'); const [b, setB] = useState('2')
  const [c, setC] = useState('3'); const [d, setD] = useState('4')
  const [e, setE] = useState('5'); const [f, setF] = useState('6')
  const [g, setG] = useState('7'); const [h, setH] = useState('8')

  const result = useMemo(() => {
    const A = parseFloat(a), B = parseFloat(b), C = parseFloat(c), D = parseFloat(d)
    const E = parseFloat(e), F = parseFloat(f), G = parseFloat(g), H = parseFloat(h)
    if ([A, B, C, D].some(isNaN)) return { err: 'Enter all 4 values for matrix A' }

    if (op === 'det') {
      const det = A * D - B * C
      return { det, singular: Math.abs(det) < 1e-12 }
    }
    if (op === 'inv') {
      const det = A * D - B * C
      if (Math.abs(det) < 1e-12) return { err: 'Matrix is singular — inverse does not exist (determinant is 0)' }
      return { inv: { a: D / det, b: -B / det, c: -C / det, d: A / det }, det }
    }
    if (op === 'trans') {
      return { trans: { a: A, b: C, c: B, d: D } }
    }
    if (op === 'mult') {
      if ([E, F, G, H].some(isNaN)) return { err: 'Enter all 4 values for matrix B' }
      return {
        mult: {
          a: A * E + B * G, b: A * F + B * H,
          c: C * E + D * G, d: C * F + D * H
        }
      }
    }
    return { err: 'Unknown operation' }
  }, [op, a, b, c, d, e, f, g, h])

  function MatrixGrid({ vals, onChange, label }) {
    return (
      <div>
        <div className="text-sm font-semibold mb-1.5">{label}</div>
        <div className="grid grid-cols-2 gap-2">
          {vals.map((v, i) => (
            <Input key={i} type="number" value={v.val} onChange={ev => onChange(i, ev.target.value)} className="h-10 text-center font-mono" />
          ))}
        </div>
      </div>
    )
  }

  const A_vals = [{ val: a }, { val: b }, { val: c }, { val: d }]
  const B_vals = [{ val: e }, { val: f }, { val: g }, { val: h }]

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-slate-600 to-gray-800 shadow-md">
            <Grid3X3 className="h-4 w-4 text-white" />
          </div>
          2x2 Matrix Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Operation</label>
          <select value={op} onChange={e => setOp(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            <option value="det">Determinant</option>
            <option value="inv">Inverse</option>
            <option value="trans">Transpose</option>
            <option value="mult">Multiply A x B</option>
          </select>
        </div>
        <MatrixGrid label="Matrix A" vals={A_vals} onChange={(i, v) => [setA, setB, setC, setD][i](v)} />
        {op === 'mult' && <MatrixGrid label="Matrix B" vals={B_vals} onChange={(i, v) => [setE, setF, setG, setH][i](v)} />}

        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-slate-600/10 to-gray-800/10 rounded-xl p-4 border border-slate-500/20 space-y-2">
            {op === 'det' && (
              <div className="text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Determinant</div>
                <div className="text-3xl font-black text-slate-700 dark:text-slate-300 tabular-nums">{fmt(result.det)}</div>
                {result.singular && <div className="text-xs text-amber-600 mt-1">Singular matrix (no inverse)</div>}
              </div>
            )}
            {op === 'inv' && (
              <>
                <div className="text-xs text-muted-foreground text-center">Inverse</div>
                <div className="grid grid-cols-2 gap-2 text-center font-mono">
                  <div className="text-lg font-bold">{fmt(result.inv.a)}</div>
                  <div className="text-lg font-bold">{fmt(result.inv.b)}</div>
                  <div className="text-lg font-bold">{fmt(result.inv.c)}</div>
                  <div className="text-lg font-bold">{fmt(result.inv.d)}</div>
                </div>
                <div className="text-xs text-muted-foreground text-center pt-2 border-t border-slate-500/20">det = {fmt(result.det)}</div>
              </>
            )}
            {op === 'trans' && (
              <>
                <div className="text-xs text-muted-foreground text-center">Transpose</div>
                <div className="grid grid-cols-2 gap-2 text-center font-mono">
                  <div className="text-lg font-bold">{fmt(result.trans.a)}</div>
                  <div className="text-lg font-bold">{fmt(result.trans.b)}</div>
                  <div className="text-lg font-bold">{fmt(result.trans.c)}</div>
                  <div className="text-lg font-bold">{fmt(result.trans.d)}</div>
                </div>
              </>
            )}
            {op === 'mult' && (
              <>
                <div className="text-xs text-muted-foreground text-center">A x B</div>
                <div className="grid grid-cols-2 gap-2 text-center font-mono">
                  <div className="text-lg font-bold">{fmt(result.mult.a)}</div>
                  <div className="text-lg font-bold">{fmt(result.mult.b)}</div>
                  <div className="text-lg font-bold">{fmt(result.mult.c)}</div>
                  <div className="text-lg font-bold">{fmt(result.mult.d)}</div>
                </div>
              </>
            )}
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          det = ad - bc. Inverse = (1/det) x [d, -b; -c, a]. Only non-singular matrices have inverses.
        </div>
      </CardContent>
    </Card>
  )
}