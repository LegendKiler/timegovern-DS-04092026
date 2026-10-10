import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sigma } from "lucide-react"

function factorial(n) {
  if (n < 0) return NaN
  if (n === 0 || n === 1) return 1
  if (n > 170) return Infinity
  let r = 1
  for (let i = 2; i <= n; i++) r *= i
  return r
}

function nPr(n, r) {
  if (r > n || r < 0) return 0
  return factorial(n) / factorial(n - r)
}

function nCr(n, r) {
  if (r > n || r < 0) return 0
  return factorial(n) / (factorial(r) * factorial(n - r))
}

const fmt = (n) => {
  if (!isFinite(n)) return '∞'
  if (n > 1e15) return n.toExponential(4)
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

export default function PermutationCombinationCalculator() {
  const [n, setN] = useState('10')
  const [r, setR] = useState('3')

  const result = useMemo(() => {
    const N = parseInt(n, 10), R = parseInt(r, 10)
    if ([N, R].some(isNaN)) return { err: 'Enter whole numbers for n and r' }
    if (N < 0 || R < 0) return { err: 'n and r must be non-negative' }
    if (R > N) return { err: 'r cannot exceed n' }
    return { nPr: nPr(N, R), nCr: nCr(N, R), factN: factorial(N), factR: factorial(R), N, R }
  }, [n, r])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 shadow-md">
            <Sigma className="h-4 w-4 text-white" />
          </div>
          Permutation & Combination
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">n (total items)</label><Input type="number" value={n} onChange={e => setN(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">r (chosen items)</label><Input type="number" value={r} onChange={e => setR(e.target.value)} className="h-11" /></div>
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-700/10 rounded-xl p-4 border border-blue-500/20 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">P(n,r)</div>
                <div className="text-2xl font-black text-blue-600 tabular-nums break-all">{fmt(result.nPr)}</div>
                <div className="text-xs text-muted-foreground mt-1">Order matters</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">C(n,r)</div>
                <div className="text-2xl font-black text-blue-600 tabular-nums break-all">{fmt(result.nCr)}</div>
                <div className="text-xs text-muted-foreground mt-1">Order doesn't matter</div>
              </div>
            </div>
            <div className="text-xs text-center text-muted-foreground pt-2 border-t border-blue-500/20">
              n! = {fmt(result.factN)} · r! = {fmt(result.factR)}
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          P(n,r) = n! / (n-r)! — number of ordered selections. C(n,r) = n! / (r!(n-r)!) — number of unordered selections, also written nCr or "n choose r".
        </div>
      </CardContent>
    </Card>
  )
}