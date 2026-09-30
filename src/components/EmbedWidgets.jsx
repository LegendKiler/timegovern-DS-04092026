import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from 'react'

export default function EmbedWidgets() {
  const [copied, setCopied] = useState(false)
  const widgetCode = `<!-- Embed a World Clock Widget -->\n<iframe src="https://timegovern.com/widget/clock" width="300" height="200" frameborder="0" style="border:0;"></iframe>`

  const copyCode = async () => {
    await navigator.clipboard.writeText(widgetCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader><CardTitle>Embeddable Widget</CardTitle></CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">Copy this code to embed a live clock on your website.</p>
        <pre className="bg-muted/50 rounded p-3 overflow-x-auto text-sm"><code>{widgetCode}</code></pre>
        <Button onClick={copyCode} className="mt-3">{copied ? 'Copied!' : 'Copy Code'}</Button>
      </CardContent>
    </Card>
  )
}