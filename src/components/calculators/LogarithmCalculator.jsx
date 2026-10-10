import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sigma } from "lucide-react"

function fmt(n, d) {
  if (n === null || isNaN(n) || !isFinite(n)) return '\u2014'
  return n.toLocaleString('en-US', { maximumFractionDigits: d || 6 })
}

export default function LogarithmCalculator() {
  const [x, setX] = useState('100')
  const [base, setBase] = useState('10')

  const result = useMemo(() => {
    const X = parseFloat(x), B = parseFloat(base)
    if (isNaN(X)) return { err: 'Enter a number for x' }
    if (X <= 0) return { err: 'x must be positive' }
    if (isNaN(B)) return { err: 'Enter a base' }
    if (B <= 0 || B === 1) return { err: 'Base must be positive and not equal to 1' }
    const logB = Math.log(X) / Math.log(B)
    const lnX = Math.log(X)
    const log10X = Math.log10(X)
    const log2X = Math.log2(X)
    return { logB, lnX, log10X, log2X }
  }, [x, base])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-md">
            <Sigma className="h-4 w-4 text-white" />
          </div>
          Logarithm Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">x (value)</label><Input type="number" value={x} onChange={e => setX(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">base</label><Input type="number" value={base} onChange={e => setBase(e.target.value)} className="h-11" /></div>
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-xl p-4 border border-purple-500/20 space-y-3">
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">log_{base}(x)</div>
              <div className="text-3xl font-black text-purple-600 tabular-nums">{fmt(result.logB)}</div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center pt-2 border-t border-purple-500/20">
              <div><div className="text-xs text-muted-foreground">ln(x)</div><div className="text-base font-bold tabular-nums">{fmt(result.lnX)}</div></div>
              <div><div className="text-xs text-muted-foreground">log10(x)</div><div className="text-base font-bold tabular-nums">{fmt(result.log10X)}</div></div>
              <div><div className="text-xs text-muted-foreground">log2(x)</div><div className="text-base font-bold tabular-nums">{fmt(result.log2X)}</div></div>
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          log_b(x) = ln(x) / ln(b). ln is natural log (base e). log10 is common log. log2 is binary log used in computer science.
        </div>
      </CardContent>
    </Card>
  )
}