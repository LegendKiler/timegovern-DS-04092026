import { useState, useEffect } from 'react'
import { format } from 'date-fns-tz'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchableTimezoneList() {
  const [search, setSearch] = useState('')
  const [timezones, setTimezones] = useState([])
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    setTimezones(Intl.supportedValuesOf('timeZone'))
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const filtered = timezones.filter(tz => tz.toLowerCase().includes(search.toLowerCase()))

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" /> Searchable Timezones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Search timezone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />
        <div className="max-h-60 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.slice(0, 20).map((tz) => (
              <div key={tz} className="flex justify-between items-center py-1 border-b border-muted/30">
                <span>{tz}</span>
                <span className="font-mono text-sm">{format(now, "HH:mm:ss", { timeZone: tz })}</span>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No timezones found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
