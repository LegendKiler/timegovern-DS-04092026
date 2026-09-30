import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function NightSkyViewer() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = 600
    canvas.height = 400

    // Draw dark sky
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, '#0f172a')
    gradient.addColorStop(1, '#1e293b')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 600, 400)

    // Draw random stars
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 600
      const y = Math.random() * 400
      const radius = Math.random() * 1.5
      const opacity = Math.random() * 0.8 + 0.2
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI)
      ctx.fillStyle = `rgba(255,255,255,${opacity})`
      ctx.fill()
    }
  }, [])

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><Star className="h-5 w-5" /> Night Sky Viewer</CardTitle></CardHeader>
      <CardContent>
        <canvas ref={canvasRef} className="w-full rounded-md border" style={{ height: '300px' }} />
        <p className="text-xs text-muted-foreground mt-2">A simple star map (constellations coming soon)</p>
      </CardContent>
    </Card>
  )
}
