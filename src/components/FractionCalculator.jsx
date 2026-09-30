import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Divide, Plus, Minus, X, Copy, Check } from 'lucide-react'

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)
const lcm = (a, b) => Math.abs(a * b) / gcd(a, b)

const simplify = (n, d) => {
  if (d === 0) return { n: 0, d: 0, error: 'Cannot divide by zero' }
  if (d < 0) { n = -n; d = -d }
  const g = gcd(Math.abs(n), Math.abs(d)) || 1
  return { n: n / g, d: d / g, error: null }
}

const toMixed = (n, d) => {
  if (d === 0) return null
  const sign = (n < 0) !== (d < 0) ? -1 : 1
  const absN = Math.abs(n)
  const absD = Math.abs(d)
  const whole = Math.floor(absN / absD)
  const rem = absN % absD
  if (whole === 0) return null
  return { sign, whole, num: rem, den: absD }
}

export default function FractionCalculator() {
  const [n1, setN1] = useState(1)
  const [d1, setD1] = useState(2)
  const [n2, setN2] = useState(1)
  const [d2, setD2] = useState(3)
  const [op, setOp] = useState('add')
  const [copied, setCopied] = useState(false)

  let rn = 0, rd = 1, error = null

  if (d1 === 0 || d2 === 0) {
    error = 'Denominator cannot be zero'
  } else {
    if (op === 'add' || op === 'sub') {
      const common = lcm(d1, d2)
      const a = n1 * (common / d1)
      const b = n2 * (common / d2)
      rn = op === 'add' ? a + b : a - b
      rd = common
    } else if (op === 'mul') {
      rn = n1 * n2
      rd = d1 * d2
    } else if (op === 'div') {
      if (n2 === 0) { error = 'Cannot divide by zero' }
      else { rn = n1 * d2; rd = d1 * n2 }
    }
    if (!error) {
      const s = simplify(rn, rd)
      rn = s.n; rd = s.d; error = s.error
    }
  }

  const decimal = !error && rd !== 0 ? (rn / rd).toFixed(6).replace(/\.?0+$/, '') : ''
  const mixed = !error ? toMixed(rn, rd) : null
  const opSymbol = { add: '+', sub: '−', mul: '×', div: '÷' }[op]

  const copyResults = () => {
    if (error) return
    const text = `${n1}/${d1} ${opSymbol} ${n2}/${d2} = ${rn}/${rd}${decimal ? ' = ' + decimal : ''}`
    navigator.clipboard.writeText(text)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md">
            <Divide className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black">Fraction Calculator</h2>
            <p className="text-xs text-muted-foreground">Add, subtract, multiply, divide - with steps</p>
          </div>
        </div>

        <div className="grid grid-cols-9 gap-2 items-center mb-6">
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <Input type="number" value={n1} onChange={(e) => setN1(Number(e.target.value) || 0)} placeholder="num" className="text-center" />
              <div className="h-px bg-border"></div>
              <Input type="number" value={d1} onChange={(e) => setD1(Number(e.target.value) || 0)} placeholder="den" className="text-center" />
            </div>
          </div>

          <div className="col-span-1 flex flex-col gap-1">
            <button onClick={() => setOp('add')} className={'p-2 rounded-lg transition ' + (op === 'add' ? 'bg-indigo-500 text-white' : 'bg-muted hover:bg-muted/70')}><Plus className="h-4 w-4 mx-auto" /></button>
            <button onClick={() => setOp('sub')} className={'p-2 rounded-lg transition ' + (op === 'sub' ? 'bg-indigo-500 text-white' : 'bg-muted hover:bg-muted/70')}><Minus className="h-4 w-4 mx-auto" /></button>
            <button onClick={() => setOp('mul')} className={'p-2 rounded-lg transition ' + (op === 'mul' ? 'bg-indigo-500 text-white' : 'bg-muted hover:bg-muted/70')}><X className="h-4 w-4 mx-auto" /></button>
            <button onClick={() => setOp('div')} className={'p-2 rounded-lg transition ' + (op === 'div' ? 'bg-indigo-500 text-white' : 'bg-muted hover:bg-muted/70')}><Divide className="h-4 w-4 mx-auto" /></button>
          </div>

          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <Input type="number" value={n2} onChange={(e) => setN2(Number(e.target.value) || 0)} placeholder="num" className="text-center" />
              <div className="h-px bg-border"></div>
              <Input type="number" value={d2} onChange={(e) => setD2(Number(e.target.value) || 0)} placeholder="den" className="text-center" />
            </div>
          </div>

          <div className="col-span-1 text-3xl font-black text-center text-indigo-500">=</div>

          <div className="col-span-3">
            {error ? (
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-3 text-center text-sm text-rose-600 dark:text-rose-400 font-bold">{error}</div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="text-2xl md:text-3xl font-black text-center text-indigo-600 dark:text-indigo-400 tabular-nums">{rn}</div>
                <div className="h-1 bg-indigo-500/30 rounded"></div>
                <div className="text-2xl md:text-3xl font-black text-center text-indigo-600 dark:text-indigo-400 tabular-nums">{rd}</div>
              </div>
            )}
          </div>
        </div>

        {!error && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-xl border border-border p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Decimal</div>
              <div className="text-lg font-black tabular-nums">{decimal}</div>
            </div>
            <div className="rounded-xl border border-border p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Mixed number</div>
              <div className="text-lg font-black tabular-nums">
                {mixed ? (mixed.sign < 0 ? '-' : '') + mixed.whole + ' ' + mixed.num + '/' + mixed.den : (rn === 0 ? '0' : 'proper fraction')}
              </div>
            </div>
          </div>
        )}

        <Button onClick={copyResults} variant="outline" className="w-full">
          {copied ? <><Check className="h-4 w-4 mr-2" /> Copied</> : <><Copy className="h-4 w-4 mr-2" /> Copy result</>}
        </Button>
      </CardContent>
    </Card>
  )
}