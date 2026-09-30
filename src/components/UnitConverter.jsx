import { useState, useEffect } from 'react'
import { ArrowLeftRight, Ruler, Weight, Thermometer, FlaskConical, Square, Gauge, Copy, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const CATEGORIES = {
  length: { label: 'Length', icon: Ruler, units: { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344, nmi: 1852 } },
  weight: { label: 'Weight', icon: Weight, units: { mg: 0.000001, g: 0.001, kg: 1, t: 1000, oz: 0.0283495, lb: 0.453592, st: 6.35029 } },
  temperature: { label: 'Temperature', icon: Thermometer, special: true, units: ['C', 'F', 'K'] },
  volume: { label: 'Volume', icon: FlaskConical, units: { ml: 0.001, L: 1, m3: 1000, tsp: 0.00492892, tbsp: 0.0147868, cup: 0.236588, pt: 0.473176, qt: 0.946353, gal: 3.78541, floz: 0.0295735 } },
  area: { label: 'Area', icon: Square, units: { m2: 1, km2: 1000000, cm2: 0.0001, ft2: 0.092903, yd2: 0.836127, ac: 4046.86, ha: 10000, mi2: 2589988 } },
  speed: { label: 'Speed', icon: Gauge, units: { ms: 1, kmh: 0.277778, mph: 0.44704, kn: 0.514444, fts: 0.3048 } },
}

const LABELS = {
  mm: 'Millimetres', cm: 'Centimetres', m: 'Metres', km: 'Kilometres',
  in: 'Inches', ft: 'Feet', yd: 'Yards', mi: 'Miles', nmi: 'Nautical miles',
  mg: 'Milligrams', g: 'Grams', kg: 'Kilograms', t: 'Tonnes',
  oz: 'Ounces', lb: 'Pounds', st: 'Stone',
  C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin',
  ml: 'Millilitres', L: 'Litres', m3: 'Cubic metres',
  tsp: 'Teaspoons', tbsp: 'Tablespoons', cup: 'Cups', pt: 'Pints',
  qt: 'Quarts', gal: 'Gallons', floz: 'Fluid ounces',
  m2: 'Square metres', km2: 'Square kilometres', cm2: 'Square centimetres',
  ft2: 'Square feet', yd2: 'Square yards', ac: 'Acres', ha: 'Hectares', mi2: 'Square miles',
  ms: 'Metres per second', kmh: 'Kilometres per hour', mph: 'Miles per hour', kn: 'Knots', fts: 'Feet per second',
}

const STORAGE = 'tg_unit_v1'

function toCelsius(v, u) {
  if (u === 'C') return v
  if (u === 'F') return (v - 32) * 5 / 9
  if (u === 'K') return v - 273.15
  return v
}

function fromCelsius(c, u) {
  if (u === 'C') return c
  if (u === 'F') return c * 9 / 5 + 32
  if (u === 'K') return c + 273.15
  return c
}

function convert(val, from, to, cat) {
  if (cat.special) return fromCelsius(toCelsius(val, from), to)
  const f = cat.units[from]
  const t = cat.units[to]
  if (!f || !t) return 0
  return (val * f) / t
}

function fmt(n) {
  if (!isFinite(n)) return ''
  const abs = Math.abs(n)
  if (abs === 0) return '0'
  if (abs >= 1e9 || abs < 1e-6) return n.toExponential(4)
  return parseFloat(n.toFixed(6)).toString()
}

export default function UnitConverter() {
  const [category, setCategory] = useState('length')
  const [value, setValue] = useState('1')
  const [from, setFrom] = useState('m')
  const [to, setTo] = useState('ft')
  const [copied, setCopied] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE)
      if (raw) {
        const d = JSON.parse(raw)
        if (d.category && CATEGORIES[d.category]) setCategory(d.category)
        if (d.from) setFrom(d.from)
        if (d.to) setTo(d.to)
      }
    } catch (e) {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem(STORAGE, JSON.stringify({ category, from, to })) } catch (e) {}
  }, [category, from, to, hydrated])

  const cat = CATEGORIES[category]
  const unitList = cat.special ? cat.units : Object.keys(cat.units)
  const numVal = parseFloat(value) || 0
  const result = convert(numVal, from, to, cat)

  const switchCategory = (key) => {
    setCategory(key)
    const newCat = CATEGORIES[key]
    const list = newCat.special ? newCat.units : Object.keys(newCat.units)
    setFrom(list[0])
    setTo(list[1] || list[0])
  }

  const swap = () => { setFrom(to); setTo(from) }

  const copyResult = async () => {
    try { await navigator.clipboard.writeText(fmt(result)); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch (e) {}
  }

  const allConversions = unitList.map(u => ({ unit: u, value: convert(numVal, from, u, cat) }))
  const Icon = cat.icon

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-5 md:p-6 space-y-5">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Category</div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {Object.keys(CATEGORIES).map(k => {
                const I = CATEGORIES[k].icon
                const active = category === k
                return (
                  <button key={k} onClick={() => switchCategory(k)} className={'flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl border text-xs font-bold transition-all ' + (active ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-card border-border text-muted-foreground hover:border-indigo-400')}>
                    <I className="h-4 w-4" />
                    {CATEGORIES[k].label}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">From</div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter value" className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-background text-base font-bold tabular-nums" />
              <select value={from} onChange={e => setFrom(e.target.value)} className="sm:w-52 px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-bold">
                {unitList.map(u => (<option key={u} value={u}>{LABELS[u] || u}</option>))}
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button onClick={swap} title="Swap" className="p-3 rounded-xl bg-muted hover:bg-muted/70 text-foreground transition-colors">
              <ArrowLeftRight className="h-5 w-5" />
            </button>
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">To</div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 border-indigo-500/40 bg-indigo-500/5">
                <span className="flex-1 text-base font-black tabular-nums truncate">{fmt(result)}</span>
                <button onClick={copyResult} title="Copy result" className="p-1.5 rounded-lg hover:bg-indigo-500/10 text-muted-foreground hover:text-indigo-500 transition-colors shrink-0">
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <select value={to} onChange={e => setTo(e.target.value)} className="sm:w-52 px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-bold">
                {unitList.map(u => (<option key={u} value={u}>{LABELS[u] || u}</option>))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5" /> {numVal} {LABELS[from]} in all units
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {allConversions.map(({ unit, value: v }) => (
              <div key={unit} className={'flex items-center justify-between gap-2 px-3 py-2 rounded-lg ' + (unit === to ? 'bg-indigo-500/10 border border-indigo-500/30' : 'bg-muted/40')}>
                <span className="text-[11px] font-bold text-muted-foreground truncate">{LABELS[unit] || unit}</span>
                <span className="text-xs font-black tabular-nums text-right truncate">{fmt(v)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}