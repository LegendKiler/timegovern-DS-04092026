import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Percent, Copy, Check, ArrowRight } from 'lucide-react'

const gcd = (a, b) => {
  a = Math.abs(Math.round(a)); b = Math.abs(Math.round(b))
  while (b) { [a, b] = [b, a % b] }
  return a || 1
}

const simplifyRatio = (a, b) => {
  const g = gcd(a, b)
  return [a / g, b / g]
}

export default function RatioCalculator() {
  const [mode, setMode] = useState('simplify')
  const [a, setA] = useState(15)
  const [b, setB] = useState(25)
  const [c, setC] = useState(6)
  const [d, setD] = useState('')
  const [copied, setCopied] = useState(false)

  const [simpA, simpB] = simplifyRatio(a, b)

  // Solve for missing value in A:B = C:D → D = B×C/A
  let solvedD = null
  if (mode === 'solve' && a !== 0) {
    solvedD = Number(((b * c) / a).toFixed(6))
  }

  // A:B as a decimal ratio
  const decimal = b !== 0 ? (a / b).toFixed(6).replace(/\.?0+$/, '') : ''
  const percentA = (a + b) !== 0 ? ((a / (a + b)) * 100).toFixed(2) : ''
  const percentB = (a + b) !== 0 ? ((b / (a + b)) * 100).toFixed(2) : ''

  const copyResults = () => {
    let text = ''
    if (mode === 'simplify') {
      text = `${a} : ${b} simplifies to ${simpA} : ${simpB}\nDecimal: ${decimal}\nAs percentages: ${percentA}% : ${percentB}%`
    } else {
      text = `${a} : ${b} = ${c} : ${solvedD}`
    }
    navigator.clipboard.writeText(text)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const modes = [
    { key: 'simplify', label: 'Simplify ratio' },
    { key: 'solve',    label: 'Solve proportion (A:B = C:?)' },
  ]

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md">
            <Percent className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black">Ratio Calculator</h2>
            <p className="text-xs text-muted-foreground">Simplify ratios and solve proportions</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {modes.map((m) => (
            <button key={m.key} onClick={() => setMode(m.key)} className={'flex-1 py-2 rounded-lg text-sm font-bold transition ' + (mode === m.key ? 'bg-indigo-500 text-white' : 'bg-muted hover:bg-muted/70')}>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'simplify' ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <Input type="number" value={a} onChange={(e) => setA(Number(e.target.value) || 0)} className="text-center text-lg font-black" />
              <span className="text-2xl font-black text-muted-foreground">:</span>
              <Input type="number" value={b} onChange={(e) => setB(Number(e.target.value) || 0)} className="text-center text-lg font-black" />
            </div>

            <div className="rounded-xl border-2 border-indigo-500/30 bg-indigo-500/5 p-6 mb-4 text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Simplified</div>
              <div className="text-4xl md:text-5xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums mb-2">
                {simpA} <span className="text-muted-foreground">:</span> {simpB}
              </div>
              <div className="text-sm text-muted-foreground">Decimal: <strong>{decimal}</strong></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-xl border border-border p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">First as % of total</div>
                <div className="text-lg font-black tabular-nums">{percentA}%</div>
              </div>
              <div className="rounded-xl border border-border p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Second as % of total</div>
                <div className="text-lg font-black tabular-nums">{percentB}%</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <label className="text-xs font-bold mb-1.5 block">First ratio: A</label>
                <Input type="number" value={a} onChange={(e) => setA(Number(e.target.value) || 0)} className="text-center" />
              </div>
              <div>
                <label className="text-xs font-bold mb-1.5 block">First ratio: B</label>
                <Input type="number" value={b} onChange={(e) => setB(Number(e.target.value) || 0)} className="text-center" />
              </div>
              <div>
                <label className="text-xs font-bold mb-1.5 block">Second ratio: C</label>
                <Input type="number" value={c} onChange={(e) => setC(Number(e.target.value) || 0)} className="text-center" />
              </div>
              <div>
                <label className="text-xs font-bold mb-1.5 block text-muted-foreground">Second ratio: ? (solved)</label>
                <div className="h-10 flex items-center justify-center rounded-md border-2 border-indigo-500/50 bg-indigo-500/10 text-lg font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {solvedD !== null ? solvedD : '—'}
                </div>
              </div>
            </div>

            <div className="rounded-xl border-2 border-indigo-500/30 bg-indigo-500/5 p-6 mb-4 text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Solved proportion</div>
              <div className="text-3xl md:text-4xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums break-all">
                {a} : {b} = {c} : {solvedD !== null ? solvedD : '?'}
              </div>
            </div>
          </>
        )}

        <Button onClick={copyResults} variant="outline" className="w-full">
          {copied ? <><Check className="h-4 w-4 mr-2" /> Copied</> : <><Copy className="h-4 w-4 mr-2" /> Copy results</>}
        </Button>
      </CardContent>
    </Card>
  )
}