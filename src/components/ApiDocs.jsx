import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code } from "lucide-react"

export default function ApiDocs() {
  const apiExample = `GET https://timegovern.com/api/v1/time?timezone=America/New_York

{
  "timezone": "America/New_York",
  "datetime": "2026-09-06T09:02:33.071Z",
  "utc_offset": "-04:00",
  "day_of_week": "Sunday",
  "day_of_year": 249
}`

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" /> API Documentation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">Access time data programmatically with our simple REST API.</p>
        <pre className="bg-muted/50 p-3 rounded overflow-x-auto text-sm">
          <code>{apiExample}</code>
        </pre>
      </CardContent>
    </Card>
  )
}
