import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, Plane, Search, Radio, AlertCircle } from "lucide-react"

export default function FlightMap() {
  const [icao, setIcao] = useState('')
  const [mapUrl, setMapUrl] = useState('https://globe.adsb.lol/?hideSideBar&zoom=4')

  const searchByIcao = () => {
    const query = icao.trim().toLowerCase()
    if (!query) return
    setMapUrl('https://globe.adsb.lol/?icao=' + query + '&hideSideBar&zoom=8')
  }

  const setView = (type) => {
    if (type === 'world') setMapUrl('https://globe.adsb.lol/?hideSideBar&zoom=3')
    else if (type === 'australia') setMapUrl('https://globe.adsb.lol/?hideSideBar&lat=-25.27&lon=133.77&zoom=5')
    else if (type === 'europe') setMapUrl('https://globe.adsb.lol/?hideSideBar&lat=50&lon=10&zoom=5')
    else if (type === 'usa') setMapUrl('https://globe.adsb.lol/?hideSideBar&lat=39&lon=-98&zoom=5')
    else if (type === 'asia') setMapUrl('https://globe.adsb.lol/?hideSideBar&lat=25&lon=110&zoom=4')
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Card className="mb-4 bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-border shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Globe className="h-6 w-6" /> Live World Flight Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Watch aircraft move in real time across the world. Filter by region or jump to a specific aircraft by its ICAO24 hex code.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <Input
              placeholder="ICAO24 hex (e.g., 896448)"
              value={icao}
              onChange={(e) => setIcao(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchByIcao()}
              className="flex-1"
            />
            <Button onClick={searchByIcao}>
              <Search className="mr-2 h-4 w-4" /> Find Aircraft
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setView('world')}>🌍 World</Button>
            <Button variant="outline" size="sm" onClick={() => setView('australia')}>🇦🇺 Australia</Button>
            <Button variant="outline" size="sm" onClick={() => setView('europe')}>🇪🇺 Europe</Button>
            <Button variant="outline" size="sm" onClick={() => setView('usa')}>🇺🇸 USA</Button>
            <Button variant="outline" size="sm" onClick={() => setView('asia')}>🌏 Asia</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <iframe
            src={mapUrl}
            className="w-full border-0"
            style={{ height: '650px' }}
            title="Live aircraft map"
            allow="fullscreen"
          />
        </CardContent>
      </Card>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/80">
          <CardContent className="p-4 flex items-start gap-3">
            <Plane className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Real-time positions</p>
              <p className="text-xs text-muted-foreground">Aircraft positions update every few seconds from the community ADS-B network.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/80">
          <CardContent className="p-4 flex items-start gap-3">
            <Radio className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Worldwide coverage</p>
              <p className="text-xs text-muted-foreground">Millions of aircraft transmissions received daily across 250+ countries.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/80">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Coverage varies</p>
              <p className="text-xs text-muted-foreground">Some regions may show fewer aircraft depending on receiver density.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}