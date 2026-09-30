import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Lock } from "lucide-react"
import { jsPDF } from "jspdf"
import { useUser } from '../context/UserContext'

export default function MultiMonthCalendarPDF() {
  const { premium } = useUser()
  const [months, setMonths] = useState(6)
  const [logoText, setLogoText] = useState('')

  const generatePDF = () => {
    if (!premium) {
      alert('This is a premium feature. Please upgrade to access multi-month PDF downloads.')
      return
    }
    const doc = new jsPDF()
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()

    for (let m = 0; m < months; m++) {
      const year = currentYear + Math.floor((currentMonth + m) / 12)
      const month = (currentMonth + m) % 12
      const monthName = new Date(year, month, 1).toLocaleString('en-US', { month: 'long' })
      if (m > 0) doc.addPage()
      doc.setFontSize(20)
      doc.text(`${monthName} ${year}`, 105, 20, { align: 'center' })
      if (logoText) {
        doc.setFontSize(12)
        doc.text(logoText, 105, 30, { align: 'center' })
      }
      doc.setFontSize(10)
      const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      days.forEach((d, i) => doc.text(d, 20 + i * 15, 45))
      const firstDay = new Date(year, month, 1).getDay()
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      let y = 55
      for (let day = 1; day <= daysInMonth; day++) {
        const col = (firstDay + day - 1) % 7
        if (day > 1 && col === 0) y += 15
        doc.text(day.toString(), 20 + col * 15, y)
      }
    }
    doc.save(`calendar-${months}-months.pdf`)
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" /> Multi-Month Calendar PDF
          {!premium && <Lock className="h-4 w-4 text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Generate a PDF calendar for 1-12 months. Premium users can add a custom logo or text.
        </p>
        <div className="flex gap-2">
          <Select value={months} onValueChange={(val) => setMonths(parseInt(val))}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 6, 9, 12].map(n => (
                <SelectItem key={n} value={n}>{n} months</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {premium && (
            <Input
              placeholder="Logo/Company name (optional)"
              value={logoText}
              onChange={(e) => setLogoText(e.target.value)}
              className="flex-1"
            />
          )}
        </div>
        <Button onClick={generatePDF} className="w-full">
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </CardContent>
    </Card>
  )
}
