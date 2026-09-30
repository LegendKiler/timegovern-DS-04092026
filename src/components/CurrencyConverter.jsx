import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign } from "lucide-react"

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('EUR')
  const [rate, setRate] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => {
    // Use a free API (e.g., exchangerate-api.com or open.er-api.com)
    fetch(`https://open.er-api.com/v6/latest/${from}`)
      .then(res => res.json())
      .then(data => setRate(data.rates[to]))
      .catch(() => {})
  }, [from, to])

  const convert = () => {
    if (rate) setResult(amount * rate)
  }

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5" /> Currency Converter</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="AUD">AUD</SelectItem>
            </SelectContent>
          </Select>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="AUD">AUD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={convert} className="w-full">Convert</Button>
        {result && <p className="text-center font-bold">Result: {result.toFixed(2)}</p>}
      </CardContent>
    </Card>
  )
}