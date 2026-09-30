import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function DSTWarning({ timeZone }) {
  const [warning, setWarning] = useState(null)

  useEffect(() => {
    const now = new Date()
    // Simplified DST start/end dates for 2026 (many regions vary, but this is a good approximation)
    const dstStart = new Date('2026-03-08T02:00:00') // US DST start (2nd Sunday March)
    const dstEnd = new Date('2026-11-01T02:00:00')   // US DST end (1st Sunday November)

    // Check if within 7 days before DST transition
    const daysUntilStart = Math.ceil((dstStart - now) / (1000 * 60 * 60 * 24))
    const daysUntilEnd = Math.ceil((dstEnd - now) / (1000 * 60 * 60 * 24))

    if (daysUntilStart > 0 && daysUntilStart <= 7) {
      setWarning(`Daylight Saving Time will begin in ${daysUntilStart} days (clocks move forward).`)
    } else if (daysUntilEnd > 0 && daysUntilEnd <= 7) {
      setWarning(`Daylight Saving Time will end in ${daysUntilEnd} days (clocks move back).`)
    } else {
      setWarning(null)
    }
  }, [timeZone])

  if (!warning) return null

  return (
    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 mt-4">
      <CardContent className="flex items-center gap-2 p-4">
        <AlertTriangle className="h-5 w-5 text-yellow-600" />
        <p className="text-sm text-yellow-800 font-medium">{warning}</p>
      </CardContent>
    </Card>
  )
}
