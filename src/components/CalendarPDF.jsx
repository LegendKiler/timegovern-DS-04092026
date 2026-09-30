import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { jsPDF } from "jspdf"

export default function CalendarPDF() {
  const [year] = useState(new Date().getFullYear())

  const generatePDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(20)
    doc.text(`Calendar for ${year}`, 105, 20, { align: 'center' })
    doc.setFontSize(12)
    // Simple grid for January as example
    doc.text('January', 14, 40)
    let y = 55
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    days.forEach((d, i) => doc.text(d, 14 + i * 12, y))
    y += 10
    for (let day = 1; day <= 31; day++) {
      const col = (day - 1) % 7
      const row = Math.floor((day - 1) / 7)
      doc.text(day.toString(), 14 + col * 12, y + row * 10)
    }
    doc.save(`calendar-${year}.pdf`)
  }

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><Download className="h-5 w-5" /> Calendar PDF</CardTitle></CardHeader>
      <CardContent>
        <p className="text-sm mb-2">Download a printable calendar with your custom logo (premium).</p>
        <Button onClick={generatePDF}>Download PDF</Button>
      </CardContent>
    </Card>
  )
}
