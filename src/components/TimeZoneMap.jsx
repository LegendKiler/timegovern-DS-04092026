import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"

// Use a reliable CDN source for world map data
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

const cityMarkers = [
  { name: "New York", tz: "America/New_York", coordinates: [-74.006, 40.7128] },
  { name: "London", tz: "Europe/London", coordinates: [-0.1276, 51.5072] },
  { name: "Tokyo", tz: "Asia/Tokyo", coordinates: [139.6917, 35.6895] },
  { name: "Sydney", tz: "Australia/Sydney", coordinates: [151.2093, -33.8688] },
  { name: "Dubai", tz: "Asia/Dubai", coordinates: [55.2708, 25.2048] },
  { name: "Paris", tz: "Europe/Paris", coordinates: [2.3522, 48.8566] },
]

export default function TimeZoneMap() {
  const [hoveredCity, setHoveredCity] = useState(null)

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" /> Interactive World Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ComposableMap projectionConfig={{ scale: 140 }} className="w-full h-auto">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="hsl(var(--muted))"
                  stroke="hsl(var(--border))"
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "hsl(var(--primary))", outline: "none" },
                    pressed: { fill: "hsl(var(--primary))" },
                  }}
                />
              ))
            }
          </Geographies>
          {cityMarkers.map((city) => (
            <Marker key={city.name} coordinates={city.coordinates}>
              <circle
                r={5}
                fill="hsl(var(--primary))"
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
                style={{ cursor: 'pointer' }}
              />
              {hoveredCity?.name === city.name && (
                <g>
                  <circle r={10} fill="none" stroke="hsl(var(--primary))" strokeWidth={2} opacity={0.6} />
                  <rect x={20} y={-20} width={130} height={30} rx={5} fill="rgba(0,0,0,0.8)" />
                  <text x={25} y={0} fill="white" fontSize={12}>
                    {city.name}: {new Date().toLocaleTimeString('en-US', { timeZone: city.tz, hour: '2-digit', minute: '2-digit', hour12: false })}
                  </text>
                </g>
              )}
            </Marker>
          ))}
        </ComposableMap>
      </CardContent>
    </Card>
  )
}
