import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Divide } from "lucide-react"

function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = b; b = a % b; a = t } return a }
function lcm(a, b) { return Math.abs(a * b) / gcd(a, b) }

export default function GcdLcmCalculator() {
  const [input, setInput] = useState('12, 18, 24')

  const result = useMemo(() => {
    const parts = input.split(/[,\s]+/).filter(Boolean)
    const nums = parts.map(p => parseInt(p, 10))
    if (nums.length < 2) return { err: 'Enter at least 2 numbers, comma-separated' }
    if (nums.some(isNaN)) return { err: 'All values must be whole numbers' }
    if (nums.some(n => n === 0)) return { err: 'Numbers must be non-zero' }
    let g = nums[0], l = nums[0]
    for (let i = 1; i < nums.length; i++) {
      g = gcd(g, nums[i])
      l = lcm(l, nums[i])
    }
    return { g, l, nums }
  }, [input])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md">
            <Divide className="h-4 w-4 text-white" />
          </div>
          GCD / LCM Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div><label className="text-sm font-semibold mb-1.5 block">Numbers (comma-separated)</label><Input value={input} onChange={e => setInput(e.target.value)} placeholder="12, 18, 24" className="h-11 font-mono" /></div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl p-4 border border-cyan-500/20 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">GCD</div>
                <div className="text-3xl font-black text-cyan-600 tabular-nums">{result.g}</div>
                <div className="text-xs text-muted-foreground mt-1">Greatest common divisor</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">LCM</div>
                <div className="text-3xl font-black text-cyan-600 tabular-nums">{result.l}</div>
                <div className="text-xs text-muted-foreground mt-1">Least common multiple</div>
              </div>
            </div>
            <div className="text-xs text-center text-muted-foreground pt-2 border-t border-cyan-500/20">
              Input: {result.nums.join(', ')}
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          GCD is the largest integer that divides all numbers. LCM is the smallest integer divisible by all numbers. Uses the Euclidean algorithm.
        </div>
      </CardContent>
    </Card>
  )
}