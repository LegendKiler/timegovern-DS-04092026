import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Grid3X3 } from "lucide-react"

function factorize(n) {
  const factors = []
  let x = n
  let d = 2
  while (d * d <= x) {
    while (x % d === 0) { factors.push(d); x = x / d }
    d = d === 2 ? 3 : d + 2
  }
  if (x > 1) factors.push(x)
  return factors
}

function allDivisors(n) {
  const divs = []
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      divs.push(i)
      if (i !== n / i) divs.push(n / i)
    }
  }
  return divs.sort((a, b) => a - b)
}

export default function PrimeFactorizationCalculator() {
  const [input, setInput] = useState('360')

  const result = useMemo(() => {
    const n = parseInt(input, 10)
    if (isNaN(n) || !Number.isInteger(n)) return { err: 'Enter a whole number' }
    if (n < 2) return { err: 'Enter an integer >= 2' }
    if (n > 1e12) return { err: 'Number too large (max 1 trillion)' }
    const factors = factorize(n)
    const counts = {}
    for (const p of factors) counts[p] = (counts[p] || 0) + 1
    const factorStr = Object.keys(counts).map(p => {
      const cnt = counts[p]
      return cnt === 1 ? p : p + '^' + cnt
    }).join(' x ')
    const divisors = allDivisors(n)
    const isPrime = factors.length === 1 && factors[0] === n
    return { factors, factorStr, divisors, isPrime, n }
  }, [input])

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-md">
            <Grid3X3 className="h-4 w-4 text-white" />
          </div>
          Prime Factorization Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div><label className="text-sm font-semibold mb-1.5 block">Number</label><Input type="number" value={input} onChange={e => setInput(e.target.value)} className="h-11" /></div>
        {result.err ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center text-sm text-amber-600">{result.err}</div>
        ) : (
          <div className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-xl p-4 border border-violet-500/20 space-y-3">
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Prime factorization</div>
              <div className="text-2xl font-black text-violet-600 tabular-nums break-all">{result.factorStr}</div>
            </div>
            <div className="text-center pt-2 border-t border-violet-500/20">
              <div className="text-xs text-muted-foreground mb-1">{result.isPrime ? 'Prime number' : 'Composite number'}</div>
              <div className="text-sm font-bold">{result.divisors.length} total divisors</div>
            </div>
            {result.divisors.length <= 30 && (
              <div className="text-xs text-center text-muted-foreground pt-2 border-t border-violet-500/20 break-all">
                Divisors: {result.divisors.join(', ')}
              </div>
            )}
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center">
          Prime factorization breaks a number into its prime factors. Every integer greater than 1 has a unique prime factorization (Fundamental Theorem of Arithmetic).
        </div>
      </CardContent>
    </Card>
  )
}