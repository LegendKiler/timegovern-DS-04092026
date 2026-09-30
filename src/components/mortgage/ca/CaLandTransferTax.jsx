import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Building2, CheckCircle2 } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

const PROVINCES = {
  'ON': { name: 'Ontario', bands: [[0,55000,0.005],[55000,250000,0.01],[250000,400000,0.015],[400000,2000000,0.02],[2000000,Infinity,0.025]], fhbRebate: 4000, torontoExtra: true },
  'BC': { name: 'British Columbia', bands: [[0,200000,0.01],[200000,2000000,0.02],[2000000,3000000,0.03],[3000000,Infinity,0.05]], fhbRebate: 8000, fhbExempt: 500000, fhbTaper: 860000 },
  'QC': { name: 'Quebec', bands: [[0,51700,0.005],[51700,258600,0.01],[258600,517000,0.015],[517000,Infinity,0.02]], fhbRebate: 0 },
  'AB': { name: 'Alberta (title fee)', bands: [[0,Infinity,0.0002]], fhbRebate: 0, flatExtra: 50 },
  'MB': { name: 'Manitoba', bands: [[0,30000,0],[30000,90000,0.005],[90000,150000,0.01],[150000,200000,0.015],[200000,Infinity,0.02]], fhbRebate: 0 },
  'SK': { name: 'Saskatchewan (title fee)', bands: [[0,Infinity,0.003]], fhbRebate: 0, flatExtra: 300 },
  'NS': { name: 'Nova Scotia', bands: [[0,100000,0.015],[100000,200000,0.02],[200000,Infinity,0.025]], fhbRebate: 0 },
  'NB': { name: 'New Brunswick', bands: [[0,100000,0.01],[100000,250000,0.015],[250000,Infinity,0.02]], fhbRebate: 0 },
  'PE': { name: 'Prince Edward Island', bands: [[0,Infinity,0.01]], fhbRebate: 0 },
  'NL': { name: 'Newfoundland & Labrador', bands: [[0,Infinity,0.004]], fhbRebate: 0 },
}

function calcLTT(prov, price, isToronto, firstBuyer) {
  const p = PROVINCES[prov]
  if (!p) return 0
  let base = 0
  for (const [min, max, rate] of p.bands) {
    if (price > min) base += (Math.min(price, max) - min) * rate
  }
  if (p.flatExtra) base += p.flatExtra
  // Toronto municipal LTT
  let torontoTax = 0
  if (isToronto && prov === 'ON') {
    const torontoBands = [[0,55000,0.005],[55000,250000,0.01],[250000,400000,0.015],[400000,2000000,0.02],[2000000,Infinity,0.025]]
    for (const [min, max, rate] of torontoBands) {
      if (price > min) torontoTax += (Math.min(price, max) - min) * rate
    }
    if (firstBuyer) torontoTax = Math.max(0, torontoTax - 4475)
  }
  let total = base + torontoTax
  if (firstBuyer) total = Math.max(0, total - (p.fhbRebate || 0))
  return { base, torontoTax, total }
}

export default function CaLandTransferTax() {
  const [prov, setProv] = useState('ON')
  const [price, setPrice] = useState('600000')
  const [toronto, setToronto] = useState(false)
  const [fhb, setFhb] = useState(false)

  const calc = useMemo(() => {
    const P = parseFloat(price) || 0
    return calcLTT(prov, P, toronto, fhb)
  }, [prov, price, toronto, fhb])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { prov, price, toronto, fhb }
const resultsMap = Object.fromEntries(
      Object.entries(calc).flatMap(([k, v]) => {
        if (typeof v === 'number' || typeof v === 'string') return [[k, v]]
        if (v && typeof v === 'object') {
          return Object.entries(v)
            .filter(([_, vv]) => typeof vv === 'number' || typeof vv === 'string')
            .map(([kk, vv]) => [k + '_' + kk, vv])
        }
        return []
      })
    )
    registerCalculation({
      type: 'land-transfer-tax',
      countrySlug: 'canada',
      title: 'Canadian Land Transfer Tax',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [prov, price, toronto, fhb, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md"><Building2 className="h-4 w-4 text-white" /></div>Canadian Land Transfer Tax Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Province</label>
            <select value={prov} onChange={(e) => setProv(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
              {Object.entries(PROVINCES).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
            </select>
          </div>
          <div><label className="text-sm font-semibold mb-1.5 block">Property price</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
        </div>
        <div className="flex gap-4 flex-wrap">
          {prov === 'ON' && (
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
              <input type="checkbox" checked={toronto} onChange={(e) => setToronto(e.target.checked)} className="h-4 w-4 accent-orange-500" />
              Toronto (adds municipal LTT)
            </label>
          )}
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input type="checkbox" checked={fhb} onChange={(e) => setFhb(e.target.checked)} className="h-4 w-4 accent-emerald-500" />
            First-time buyer
          </label>
        </div>
        {calc && (
          <div className="space-y-3">
            <div className="rounded-xl p-5 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-2 border-orange-500/30">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Total land transfer tax</div>
              <div className="text-4xl md:text-5xl font-black text-orange-600 tabular-nums">{fmt(calc.total)}</div>
              <div className="text-xs text-muted-foreground mt-2">{(calc.total / (parseFloat(price) || 1) * 100).toFixed(2)}% effective rate</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl p-3 bg-muted/40 border border-border"><div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Provincial base</div><div className="font-bold tabular-nums">{fmt(calc.base)}</div></div>
              {calc.torontoTax > 0 && <div className="rounded-xl p-3 bg-orange-500/10 border border-orange-500/30"><div className="text-[10px] text-orange-600 uppercase font-bold mb-1">Toronto municipal</div><div className="font-bold tabular-nums text-orange-600">{fmt(calc.torontoTax)}</div></div>}
            </div>
            {fhb && <div className="rounded-lg p-3 bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0" />First-time buyer rebate applied. Largest rebate: Ontario/Toronto up to $8,475 combined.</div>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}