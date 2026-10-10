import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Percent } from "lucide-react"

export default function PercentErrorCalculator() {
  const [exp, setExp] = useState('9.8')
  const [theo, setTheo] = useState('10')

  const result = useMemo(() => {
    const E = parseFloat(exp), T = parseFloat(theo)
    if ([E, T].some(isNaN)) return { err: 'Enter both experimental and theoretical values' }
    if (T === 0) return { err: 'Theoretical value cannot be zero' }
    const err = Math.abs(E - T)
    const pct = (err / Math.abs(T)) * 100
    const signed = ((E - T) / Math.abs(T)) * 100
    return { err, pct, signed }
  }, [exp, theo])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-orange-600 shadow-md">
            <Percent className="h-4 w-4 text-white" />
          </div>
          Percent Error Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">Experimental</label><Input type="number" value={exp} onChange={e => setExp(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">Theoretical</label><Input type="number" value={theo} onChange={e => setTheo(e.target.value)} className="h-11" /></div>
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-rose-500/10 to-orange-600/10 rounded-xl p-4 border border-rose-500/20 space-y-3">
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Percent error</div>
              <div className="text-3xl font-black text-rose-600 tabular-nums">{result.pct.toFixed(4)}%</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center pt-2 border-t border-rose-500/20">
              <div><div className="text-xs text-muted-foreground">Absolute error</div><div className="font-bold tabular-nums">{result.err.toFixed(6)}</div></div>
              <div><div className="text-xs text-muted-foreground">Signed error</div><div className="font-bold tabular-nums">{result.signed.toFixed(4)}%</div></div>
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          Percent error = |experimental - theoretical| / |theoretical| x 100. Signed error is positive when the experimental value is above theoretical.
        </div>
      </CardContent>
    </Card>
  )
}