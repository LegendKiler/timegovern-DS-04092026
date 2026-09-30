import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Building2, CheckCircle2 } from "lucide-react"
import { useCalculation } from '../../../context/CalculationContext'

// 2026 UK stamp duty bands
const REGIONS = {
  'England': { name: 'England & Northern Ireland (SDLT)', bands: [[0,250000,0],[250000,925000,0.05],[925000,1500000,0.10],[1500000,Infinity,0.12]], firstBuyerRelief: 425000, surcharge: 0.05, firstBuyerRate: 0 },
  'Scotland': { name: 'Scotland (LBTT)', bands: [[0,145000,0],[145000,250000,0.02],[250000,325000,0.05],[325000,750000,0.10],[750000,Infinity,0.12]], firstBuyerRelief: 175000, surcharge: 0.08, firstBuyerRate: 0 },
  'Wales': { name: 'Wales (LTT)', bands: [[0,225000,0],[225000,400000,0.06],[400000,750000,0.075],[750000,1500000,0.10],[1500000,Infinity,0.12]], firstBuyerRelief: 0, surcharge: 0.04, firstBuyerRate: 0 },
}

function calcDuty(region, price, isAdditional) {
  const r = REGIONS[region]
  let duty = 0
  for (const [min, max, rate] of r.bands) {
    if (price > min) duty += (Math.min(price, max) - min) * rate
  }
  if (isAdditional) duty += price * r.surcharge
  return duty
}

export default function UkStampDuty() {
  const [region, setRegion] = useState('England')
  const [price, setPrice] = useState('350000')
  const [firstBuyer, setFirstBuyer] = useState(false)
  const [additional, setAdditional] = useState(false)

  const calc = useMemo(() => {
    const P = parseFloat(price) || 0
    const r = REGIONS[region]
    let base = calcDuty(region, P, false)
    let duty = calcDuty(region, P, additional)
    let fbrSaving = 0

    if (firstBuyer && region === 'England' && P <= r.firstBuyerRelief && !additional) {
      fbrSaving = base
      duty = 0
    } else if (firstBuyer && region === 'Scotland' && P <= r.firstBuyerRelief && !additional) {
      fbrSaving = base
      duty = 0
    } else if (firstBuyer && region === 'England' && P <= 625000 && !additional) {
      // FBR up to £625k: first £425k at 0%, remainder at 5%
      const relief = Math.min(P, 425000)
      const taxable = Math.max(0, P - relief)
      const withRelief = taxable * 0.05
      fbrSaving = base - withRelief
      duty = withRelief
    }

    return { duty, base, fbrSaving, effectiveRate: P > 0 ? (duty / P) * 100 : 0, region: r.name }
  }, [region, price, firstBuyer, additional])

  const fmt = (n) => '£' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { region, price, firstBuyer, additional }
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
      type: 'stamp-duty',
      countrySlug: 'uk',
      title: 'UK Stamp Duty',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [region, price, firstBuyer, additional, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md"><Building2 className="h-4 w-4 text-white" /></div>UK Stamp Duty Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Region</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
              {Object.entries(REGIONS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
            </select>
          </div>
          <div><label className="text-sm font-semibold mb-1.5 block">Property price</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" /></div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input type="checkbox" checked={firstBuyer} onChange={(e) => setFirstBuyer(e.target.checked)} className="h-4 w-4 accent-emerald-500" />
            First-time buyer
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input type="checkbox" checked={additional} onChange={(e) => setAdditional(e.target.checked)} className="h-4 w-4 accent-orange-500" />
            Additional property (buy-to-let / second home)
          </label>
        </div>

        {calc && (
          <div className="space-y-3">
            <div className="rounded-xl p-5 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-2 border-orange-500/30">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Total stamp duty payable</div>
              <div className="text-4xl md:text-5xl font-black text-orange-600 tabular-nums">{fmt(calc.duty)}</div>
              <div className="text-xs text-muted-foreground mt-2">Effective rate: {calc.effectiveRate.toFixed(2)}% · {calc.region}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl p-3 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Base duty</div>
                <div className="font-bold tabular-nums">{fmt(calc.base)}</div>
              </div>
              {calc.fbrSaving > 0 && (
                <div className="rounded-xl p-3 bg-emerald-500/10 border border-emerald-500/30">
                  <div className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> FHB relief</div>
                  <div className="font-bold tabular-nums text-emerald-600">âˆ’{fmt(calc.fbrSaving)}</div>
                </div>
              )}
              {additional && (
                <div className="rounded-xl p-3 bg-red-500/10 border border-red-500/30">
                  <div className="text-[10px] text-red-600 uppercase tracking-widest font-bold mb-1">Additional property surcharge</div>
                  <div className="font-bold tabular-nums text-red-600">+{fmt((parseFloat(price) || 0) * REGIONS[region].surcharge)}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}