import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Zap } from "lucide-react"

const fmt = (n) => (typeof n === 'number' && isFinite(n)) ? n.toLocaleString('en-US', { maximumFractionDigits: 8 }) : '—'

export default function ExponentRootCalculator() {
  const [mode, setMode] = useState('power')
  const [x, setX] = useState('2')
  const [y, setY] = useState('10')

  const result = useMemo(() => {
    const X = parseFloat(x), Y = parseFloat(y)
    if (mode === 'power') {
      if ([X, Y].some(isNaN)) return { err: 'Enter base and exponent' }
      const r = Math.pow(X, Y)
      return { value: r, label: X + '^' + Y }
    }
    if (mode === 'root') {
      if ([X, Y].some(isNaN)) return { err: 'Enter radicand and index' }
      if (Y === 0) return { err: 'Index cannot be zero' }
      if (X < 0 && Y % 2 === 0) return { err: 'Even root of a negative number is not real' }
      const r = X < 0 ? -Math.pow(-X, 1 / Y) : Math.pow(X, 1 / Y)
      return { value: r, label: Y + 'th root of ' + X }
    }
    if (mode === 'sqrt') {
      if (isNaN(X)) return { err: 'Enter a number' }
      if (X < 0) return { err: 'Square root of a negative is not real' }
      return { value: Math.sqrt(X), label: 'sqrt(' + X + ')' }
    }
    if (mode === 'cbrt') {
      if (isNaN(X)) return { err: 'Enter a number' }
      return { value: Math.cbrt(X), label: 'cbrt(' + X + ')' }
    }
    if (mode === 'exp') {
      if (isNaN(X)) return { err: 'Enter an exponent' }
      return { value: Math.exp(X), label: 'e^' + X }
    }
    return { err: 'Unknown mode' }
  }, [mode, x, y])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 shadow-md">
            <Zap className="h-4 w-4 text-white" />
          </div>
          Exponent & Root Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Operation</label>
          <select value={mode} onChange={e => setMode(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background">
            <option value="power">Power (x^y)</option>
            <option value="root">Nth root</option>
            <option value="sqrt">Square root</option>
            <option value="cbrt">Cube root</option>
            <option value="exp">Natural exponent (e^x)</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">{mode === 'power' ? 'Base' : mode === 'root' ? 'Radicand' : 'x'}</label><Input type="number" value={x} onChange={e => setX(e.target.value)} className="h-11" /></div>
          {(mode === 'power' || mode === 'root') && (
            <div><label className="text-sm font-semibold mb-1.5 block">{mode === 'power' ? 'Exponent' : 'Index'}</label><Input type="number" value={y} onChange={e => setY(e.target.value)} className="h-11" /></div>
          )}
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-amber-500/10 to-red-600/10 rounded-xl p-4 border border-amber-500/20 text-center">
            <div className="text-xs text-muted-foreground mb-1 font-mono">{result.label}</div>
            <div className="text-3xl font-black text-amber-600 tabular-nums break-all">{fmt(result.value)}</div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          x^(m/n) is the nth root of x^m. Negative bases have real odd roots but no real even roots. e is approximately 2.71828.
        </div>
      </CardContent>
    </Card>
  )
}