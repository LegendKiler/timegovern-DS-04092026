import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Calculator as CalcIcon, Copy, Check } from 'lucide-react'

const SAFE_EVAL = (expr, angleMode) => {
  let e = expr
    .replace(/\^/g, '**')
    .replace(/π/g, 'Math.PI')
    .replace(/\be\b/g, 'Math.E')
    .replace(/sin\(/g, angleMode === 'deg' ? 'Math.sin((Math.PI/180)*' : 'Math.sin(')
    .replace(/cos\(/g, angleMode === 'deg' ? 'Math.cos((Math.PI/180)*' : 'Math.cos(')
    .replace(/tan\(/g, angleMode === 'deg' ? 'Math.tan((Math.PI/180)*' : 'Math.tan(')
    .replace(/asin\(/g, angleMode === 'deg' ? '(180/Math.PI)*Math.asin(' : 'Math.asin(')
    .replace(/acos\(/g, angleMode === 'deg' ? '(180/Math.PI)*Math.acos(' : 'Math.acos(')
    .replace(/atan\(/g, angleMode === 'deg' ? '(180/Math.PI)*Math.atan(' : 'Math.atan(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/√\(/g, 'Math.sqrt(')
    .replace(/sqrt\(/g, 'Math.sqrt(')
    .replace(/abs\(/g, 'Math.abs(')
    .replace(/exp\(/g, 'Math.exp(')
  return Function('"use strict"; return (' + e + ')')()
}

const BUTTONS = [
  ['sin', 'cos', 'tan', 'ln'],
  ['asin', 'acos', 'atan', 'log'],
  ['√', '^', '(', ')'],
  ['7', '8', '9', '÷'],
  ['4', '5', '6', '×'],
  ['1', '2', '3', '−'],
  ['0', '.', 'π', '+'],
  ['e', 'C', '⌫', '='],
]

export default function ScientificCalculator() {
  const [expr, setExpr] = useState('')
  const [angleMode, setAngleMode] = useState('deg')
  const [history, setHistory] = useState([])
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const display = expr || '0'

  const append = (token) => {
    setError('')
    if (token === '=') return calculate()
    if (token === 'C') { setExpr(''); setError(''); return }
    if (token === '⌫') { setExpr(expr.slice(0, -1)); return }
    let t = token
    if (token === '÷') t = '/'
    if (token === '×') t = '*'
    if (token === '−') t = '-'
    if (token === '√') t = 'sqrt'
    setExpr(expr + t)
  }

  const calculate = () => {
    if (!expr.trim()) return
    try {
      const result = SAFE_EVAL(expr, angleMode)
      if (typeof result !== 'number' || !isFinite(result)) throw new Error('Invalid result')
      const rounded = Number(result.toFixed(10))
      setHistory([{ expr, result: rounded }, ...history].slice(0, 5))
      setExpr(String(rounded))
      setError('')
    } catch (e) {
      setError('Invalid expression')
    }
  }

  const copyResult = () => {
    if (!expr) return
    navigator.clipboard.writeText(expr)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  const keyStyle = (key) => {
    if (key === '=') return 'bg-indigo-500 text-white hover:bg-indigo-600'
    if (key === 'C') return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/20'
    if (key === '⌫') return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
    if ('0123456789.'.includes(key)) return 'bg-card border border-border hover:border-indigo-400'
    if (key === '÷' || key === '×' || key === '−' || key === '+') return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/20'
    return 'bg-muted hover:bg-muted/70 text-sm'
  }

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md">
              <CalcIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black">Scientific Calculator</h2>
              <p className="text-xs text-muted-foreground">Trig, log, exponential functions</p>
            </div>
          </div>
          <div className="flex gap-1 rounded-lg bg-muted p-1">
            <button onClick={() => setAngleMode('deg')} className={'px-3 py-1 text-xs font-bold rounded transition ' + (angleMode === 'deg' ? 'bg-background shadow' : 'text-muted-foreground')}>DEG</button>
            <button onClick={() => setAngleMode('rad')} className={'px-3 py-1 text-xs font-bold rounded transition ' + (angleMode === 'rad' ? 'bg-background shadow' : 'text-muted-foreground')}>RAD</button>
          </div>
        </div>

        <div className={'rounded-xl border-2 p-4 mb-4 ' + (error ? 'border-rose-500/50 bg-rose-500/5' : 'border-indigo-500/30 bg-indigo-500/5')}>
          <div className="text-3xl md:text-4xl font-black font-mono break-all min-h-[3rem] tabular-nums">{display}</div>
          {error && <div className="text-xs text-rose-600 dark:text-rose-400 mt-2">{error}</div>}
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {BUTTONS.flat().map((key, i) => (
            <button key={i} onClick={() => append(key)} className={'py-3 rounded-lg font-black text-base transition-all ' + keyStyle(key)}>{key}</button>
          ))}
        </div>

        <button onClick={copyResult} className="w-full py-2 rounded-lg bg-muted hover:bg-muted/70 text-sm font-bold flex items-center justify-center gap-2 transition">
          {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy expression</>}
        </button>

        {history.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Recent calculations</div>
            <div className="space-y-1">
              {history.map((h, i) => (
                <button key={i} onClick={() => setExpr(String(h.result))} className="w-full text-left text-sm font-mono hover:text-primary transition-colors">
                  {h.expr} <span className="text-muted-foreground">=</span> {h.result}
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}