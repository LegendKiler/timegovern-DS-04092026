import { useState, useEffect } from 'react'
import { useCalculation } from '../../context/CalculationContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tag } from "lucide-react"

export default function DiscountCalculator() {
  const [price, setPrice] = useState('100')
  const [discount, setDiscount] = useState('20')
  const [extraDiscount, setExtraDiscount] = useState('')
  const [tax, setTax] = useState('')
  const [result, setResult] = useState(null)
  const { registerCalculation } = useCalculation()

  useEffect(() => {
    registerCalculation({
      type: 'discount',
      countrySlug: null,
      title: 'Discount',
      inputs: { price, discount, extraDiscount, tax },
      results: result || {},
    })
  }, [price, discount, extraDiscount, tax, result, registerCalculation])

  const calc = () => {
    const p = parseFloat(price)
    const d = parseFloat(discount)
    const e = parseFloat(extraDiscount)
    const t = parseFloat(tax)
    if (isNaN(p) || isNaN(d)) return
    let afterFirst = p * (1 - d / 100)
    let afterExtra = !isNaN(e) && e > 0 ? afterFirst * (1 - e / 100) : afterFirst
    const taxAmt = !isNaN(t) && t > 0 ? afterExtra * t / 100 : 0
    const total = afterExtra + taxAmt
    const savings = p - afterExtra
    const effectiveDiscount = (savings / p) * 100
    setResult({ price: p, finalPrice: afterExtra, taxAmt, total, savings, effectiveDiscount })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-red-500 shadow-md">
            <Tag className="h-4 w-4 text-white" />
          </div>
          Discount Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Original Price</label>
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="h-11" />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Discount (%)</label>
          <Input type="number" step="0.1" value={discount} onChange={(e) => setDiscount(e.target.value)} className="h-11" />
        </div>
        <details className="text-sm">
          <summary className="cursor-pointer font-semibold">Extra discount or tax (optional)</summary>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="text-xs mb-1 block">Extra discount %</label>
              <Input type="number" step="0.1" value={extraDiscount} onChange={(e) => setExtraDiscount(e.target.value)} className="h-10" />
            </div>
            <div>
              <label className="text-xs mb-1 block">Tax %</label>
              <Input type="number" step="0.1" value={tax} onChange={(e) => setTax(e.target.value)} className="h-10" />
            </div>
          </div>
        </details>
        <Button onClick={calc} className="w-full h-11 bg-gradient-to-r from-amber-500 to-red-500 text-white">Calculate</Button>

        {result && (
          <div className="space-y-2">
            <div className="bg-gradient-to-br from-amber-500/10 to-red-500/10 rounded-xl p-4 text-center border border-amber-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Final Price</div>
              <div className="text-3xl font-black text-amber-600 tabular-nums">{result.total.toFixed(2)}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">You save</div><div className="font-bold text-emerald-600 tabular-nums">{result.savings.toFixed(2)}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Effective discount</div><div className="font-bold tabular-nums">{result.effectiveDiscount.toFixed(1)}%</div></div>
              <div className="bg-muted/50 p-3 rounded-lg text-center"><div className="text-xs text-muted-foreground">Tax added</div><div className="font-bold tabular-nums">{result.taxAmt.toFixed(2)}</div></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}