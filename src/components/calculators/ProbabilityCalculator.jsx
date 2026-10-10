import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dices } from "lucide-react"

export default function ProbabilityCalculator() {
  const [pA, setPA] = useState('0.5')
  const [pB, setPB] = useState('0.5')
  const [pAB, setPAB] = useState('0.25')

  const result = useMemo(() => {
    const A = parseFloat(pA), B = parseFloat(pB), AB = parseFloat(pAB)
    if ([A, B, AB].some(isNaN)) return { err: 'Enter probabilities for A, B, and A∩B' }
    if (A < 0 || A > 1 || B < 0 || B > 1 || AB < 0 || AB > 1) return { err: 'Probabilities must be between 0 and 1' }
    if (AB > A || AB > B) return { err: 'P(A∩B) cannot exceed P(A) or P(B)' }
    const union = A + B - AB
    const notA = 1 - A
    const aGivenB = B > 0 ? AB / B : NaN
    const bGivenA = A > 0 ? AB / A : NaN
    const independent = Math.abs(AB - A * B) < 1e-9
    return { union, notA, aGivenB, bGivenA, independent }
  }, [pA, pB, pAB])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-md">
            <Dices className="h-4 w-4 text-white" />
          </div>
          Probability Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div><label className="text-sm font-semibold mb-1.5 block">P(A)</label><Input type="number" step="0.01" value={pA} onChange={e => setPA(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">P(B)</label><Input type="number" step="0.01" value={pB} onChange={e => setPB(e.target.value)} className="h-11" /></div>
          <div><label className="text-sm font-semibold mb-1.5 block">P(A∩B)</label><Input type="number" step="0.01" value={pAB} onChange={e => setPAB(e.target.value)} className="h-11" /></div>
        </div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-pink-500/10 to-rose-600/10 rounded-xl p-4 border border-pink-500/20 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div><div className="text-xs text-muted-foreground">P(A ∪ B)</div><div className="text-xl font-black text-pink-600 tabular-nums">{(result.union * 100).toFixed(2)}%</div></div>
              <div><div className="text-xs text-muted-foreground">P(not A)</div><div className="text-xl font-black text-pink-600 tabular-nums">{(result.notA * 100).toFixed(2)}%</div></div>
              <div><div className="text-xs text-muted-foreground">P(A | B)</div><div className="text-lg font-bold tabular-nums">{isNaN(result.aGivenB) ? '—' : (result.aGivenB * 100).toFixed(2) + '%'}</div></div>
              <div><div className="text-xs text-muted-foreground">P(B | A)</div><div className="text-lg font-bold tabular-nums">{isNaN(result.bGivenA) ? '—' : (result.bGivenA * 100).toFixed(2) + '%'}</div></div>
            </div>
            <div className="text-xs text-center pt-2 border-t border-pink-500/20">
              A and B are {result.independent ? 'independent' : 'not independent'} (P(A) x P(B) = {((parseFloat(pA) * parseFloat(pB)) * 100).toFixed(2)}%)
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          P(A ∪ B) = P(A) + P(B) − P(A∩B). P(A | B) = P(A∩B) / P(B). A and B are independent when P(A∩B) = P(A) x P(B).
        </div>
      </CardContent>
    </Card>
  )
}