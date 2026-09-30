import { useState, useEffect } from 'react'
import { useCalculation } from '../../context/CalculationContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Cake, Calendar, Clock } from "lucide-react"

export default function AgeCalculator() {
  const [dob, setDob] = useState('')
  const [result, setResult] = useState(null)
  const { registerCalculation } = useCalculation()
  useEffect(() => {
    registerCalculation({
      type: 'age',
      countrySlug: null,
      title: 'Age Calculator',
      inputs: { dob },
      results: result || {},
    })
  }, [dob, result, registerCalculation])

  const calc = () => {
    if (!dob) return
    const birth = new Date(dob)
    const now = new Date()
    if (birth > now) { setResult(null); return }

    let years = now.getFullYear() - birth.getFullYear()
    let months = now.getMonth() - birth.getMonth()
    let days = now.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
      days += prevMonth.getDate()
    }
    if (months < 0) { years--; months += 12 }

    const totalDays = Math.floor((now - birth) / 86400000)
    const totalWeeks = Math.floor(totalDays / 7)
    const totalMonths = years * 12 + months
    const totalHours = totalDays * 24
    const totalMinutes = totalHours * 60

    const nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1)
    const daysToBday = Math.ceil((nextBday - now) / 86400000)

    setResult({ years, months, days, totalDays, totalWeeks, totalMonths, totalHours, totalMinutes, daysToBday })
  }

  return (
    <Card className="border shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-md">
            <Cake className="h-4 w-4 text-white" />
          </div>
          Age Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1.5 block">Date of Birth</label>
          <Input type="date" value={dob} onClick={(e) => e.target.showPicker?.()} onChange={(e) => setDob(e.target.value)} className="h-11" />
        </div>
        <Button onClick={calc} className="w-full h-11 bg-gradient-to-r from-pink-500 to-rose-500 text-white">Calculate Age</Button>

        {result && (
          <div className="space-y-3 pt-2">
            <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-xl p-4 text-center border border-pink-500/20">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Your age</div>
              <div className="text-3xl font-black text-pink-600">
                {result.years} <span className="text-lg">years</span> {result.months} <span className="text-lg">mo</span> {result.days} <span className="text-lg">days</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Months</div><div className="font-bold">{result.totalMonths.toLocaleString()}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Weeks</div><div className="font-bold">{result.totalWeeks.toLocaleString()}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Days</div><div className="font-bold">{result.totalDays.toLocaleString()}</div></div>
              <div className="bg-muted/50 p-3 rounded-lg"><div className="text-xs text-muted-foreground">Hours</div><div className="font-bold">{result.totalHours.toLocaleString()}</div></div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground">Next birthday in</div>
              <div className="text-xl font-black text-amber-600">{result.daysToBday} days</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}