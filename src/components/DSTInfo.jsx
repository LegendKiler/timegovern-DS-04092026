import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DSTInfo({ timeZone }) {
  const [dstInfo, setDstInfo] = useState(null)

  useEffect(() => {
    const year = new Date().getFullYear()
    const dstStart = new Date(`${year}-03-14T02:00:00`)
    const dstEnd = new Date(`${year}-11-07T02:00:00`)
    setDstInfo({ start: dstStart, end: dstEnd })
  }, [timeZone])

  if (!dstInfo) return null

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle>DST Transitions</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between bg-muted/50 rounded p-2"><span>DST Starts</span><span className="font-semibold">{dstInfo.start.toDateString()}</span></div>
          <div className="flex justify-between bg-muted/50 rounded p-2"><span>DST Ends</span><span className="font-semibold">{dstInfo.end.toDateString()}</span></div>
        </div>
      </CardContent>
    </Card>
  )
}