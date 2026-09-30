import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Building2, CheckCircle2 } from "lucide-react"
import { useCalculation } from '../../context/CalculationContext'

// Simplified bracket tables per state (2026-27 indicative)
const STATES = {
  NSW: { name: 'New South Wales', brackets: [[0,18000,0.0125],[18000,38000,0.015],[38000,103000,0.0175],[103000,387000,0.035],[387000,1300000,0.045],[1300000,3000000,0.055],[3000000,Infinity,0.07]], fhbExempt: 800000, fhbConcession: 1000000, foreign: 0.09 },
  VIC: { name: 'Victoria', brackets: [[0,25000,0.014],[25000,130000,0.024],[130000,960000,0.06],[960000,2000000,0.055],[2000000,Infinity,0.065]], fhbExempt: 600000, fhbConcession: 750000, foreign: 0.08 },
  QLD: { name: 'Queensland', brackets: [[0,5000,0],[5000,75000,0.015],[75000,540000,0.035],[540000,1000000,0.045],[1000000,Infinity,0.0575]], fhbExempt: 700000, fhbConcession: 800000, foreign: 0.08 },
  WA: { name: 'Western Australia', brackets: [[0,120000,0.019],[120000,150000,0.0285],[150000,360000,0.038],[360000,725000,0.0475],[725000,Infinity,0.0515]], fhbExempt: 500000, fhbConcession: 600000, foreign: 0.07 },
  SA: { name: 'South Australia', brackets: [[0,12000,0.01],[12000,30000,0.02],[30000,50000,0.03],[50000,100000,0.035],[100000,200000,0.04],[200000,300000,0.045],[300000,500000,0.05],[500000,Infinity,0.055]], fhbExempt: 0, fhbConcession: 0, foreign: 0.07 },
  TAS: { name: 'Tasmania', brackets: [[0,3000,0],[3000,25000,0.015],[25000,75000,0.0225],[75000,200000,0.035],[200000,375000,0.04],[375000,725000,0.0425],[725000,Infinity,0.045]], fhbExempt: 750000, fhbConcession: 750000, foreign: 0 },
  ACT: { name: 'ACT', brackets: [[0,200000,0.004],[200000,300000,0.014],[300000,500000,0.024],[500000,750000,0.033],[750000,1000000,0.043],[1000000,1455000,0.0545],[1455000,Infinity,0.0675]], fhbExempt: 1020000, fhbConcession: 1020000, foreign: 0 },
  NT: { name: 'Northern Territory', brackets: [[0,525000,0.0495],[525000,Infinity,0.0495]], fhbExempt: 0, fhbConcession: 0, foreign: 0 },
}

function calcDuty(state, price) {
  const s = STATES[state]
  let duty = 0
  for (const [min, max, rate] of s.brackets) {
    if (price > min) duty += (Math.min(price, max) - min) * rate
  }
  return duty
}

export default function StampDuty() {
  const [state, setState] = useState('NSW')
  const [price, setPrice] = useState('800000')
  const [fhb, setFhb] = useState(false)
  const [foreign, setForeign] = useState(false)

  const calc = useMemo(() => {
    const P = parseFloat(price) || 0
    const s = STATES[state]
    const baseDuty = calcDuty(state, P)
    let duty = baseDuty
    let fhbSaving = 0
    let eligible = 'none'

    if (fhb) {
      if (s.fhbExempt > 0 && P <= s.fhbExempt) { fhbSaving = baseDuty; duty = 0; eligible = 'exempt' }
      else if (s.fhbConcession > 0 && P <= s.fhbConcession) { const discount = (s.fhbConcession - P) / (s.fhbConcession - s.fhbExempt) * baseDuty; fhbSaving = discount; duty = baseDuty - discount; eligible = 'concession' }
    }

    const foreignSurcharge = foreign ? P * s.foreign : 0
    const total = duty + foreignSurcharge

    return { duty, baseDuty, fhbSaving, foreignSurcharge, total, effectiveRate: P > 0 ? (total / P) * 100 : 0, eligible }
  }, [state, price, fhb, foreign])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()


  // Push current calculation to context so SaveCalculation can capture it
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    if (!calc) return
    const inputsMap = { state, price, fhb, foreign }
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
      countrySlug: 'australia',
      title: 'Australian Stamp Duty',
      inputs: inputsMap,
      results: resultsMap,
    })
  }, [state, price, fhb, foreign, calc, registerCalculation])

  return (
    <Card className="border-2 shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          Stamp Duty Calculator — All 8 States
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold mb-1.5 block">State / Territory</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
              {Object.entries(STATES).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Property price</label>
            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" />
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input type="checkbox" checked={fhb} onChange={(e) => setFhb(e.target.checked)} className="h-4 w-4 accent-emerald-500" />
            First home buyer
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input type="checkbox" checked={foreign} onChange={(e) => setForeign(e.target.checked)} className="h-4 w-4 accent-orange-500" />
            Foreign buyer
          </label>
        </div>

        {calc && (
          <div className="space-y-3">
            <div className="rounded-xl p-5 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-2 border-orange-500/30">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Total stamp duty payable</div>
              <div className="text-4xl md:text-5xl font-black text-orange-600 tabular-nums">{fmt(calc.total)}</div>
              <div className="text-xs text-muted-foreground mt-2">Effective rate: {calc.effectiveRate.toFixed(2)}%</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl p-3 bg-muted/40 border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Base duty</div>
                <div className="font-bold tabular-nums">{fmt(calc.baseDuty)}</div>
              </div>
              {calc.fhbSaving > 0 && (
                <div className="rounded-xl p-3 bg-emerald-500/10 border border-emerald-500/30">
                  <div className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> FHB {calc.eligible}</div>
                  <div className="font-bold tabular-nums text-emerald-600">âˆ’{fmt(calc.fhbSaving)}</div>
                </div>
              )}
              {calc.foreignSurcharge > 0 && (
                <div className="rounded-xl p-3 bg-red-500/10 border border-red-500/30">
                  <div className="text-[10px] text-red-600 uppercase tracking-widest font-bold mb-1">Foreign surcharge</div>
                  <div className="font-bold tabular-nums text-red-600">+{fmt(calc.foreignSurcharge)}</div>
                </div>
              )}
            </div>

            {fhb && calc.eligible === 'none' && (
              <div className="rounded-lg p-3 bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-400">
                Property price exceeds {state} first-home-buyer thresholds. No exemption/concession applies.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}