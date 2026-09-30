import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function CityAutocomplete() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const allTimezones = Intl.supportedValuesOf('timeZone')
  const filtered = query ? allTimezones.filter(tz => tz.toLowerCase().includes(query.toLowerCase())).slice(0, 10) : []

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><Search className="h-5 w-5" /> Find Time in Any City</CardTitle></CardHeader>
      <CardContent>
        <Input placeholder="Type city or timezone..." value={query} onChange={e => setQuery(e.target.value)} />
        {filtered.length > 0 && (
          <ul className="mt-2 border rounded divide-y">
            {filtered.map(tz => (
              <li key={tz} className="p-2 hover:bg-muted/50 cursor-pointer" onClick={() => { setSelected(tz); setQuery('') }}>
                {tz}
              </li>
            ))}
          </ul>
        )}
        {selected && (
          <div className="mt-4 p-3 bg-muted/30 rounded">
            <p className="font-semibold">{selected}</p>
            <p className="text-sm">Current time: {new Date().toLocaleTimeString('en-US', { timeZone: selected })}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}