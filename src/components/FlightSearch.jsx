import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FlightToCalendar from './FlightToCalendar'
import { Search, Plane, MapPin, Navigation, Gauge, Loader2, AlertCircle, Info, Compass, Radio, Globe, Activity, Shield } from "lucide-react"

export default function FlightSearch() {
  const [flightNumber, setFlightNumber] = useState('')
  const [flightData, setFlightData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [recentSearches, setRecentSearches] = useState([])
  const [searchType, setSearchType] = useState('callsign')

  useEffect(() => {
    const saved = localStorage.getItem('flightSearches')
    if (saved) {
      try { setRecentSearches(JSON.parse(saved)) } catch {}
    }
  }, [])

  const searchFlight = async () => {
    const query = flightNumber.trim().toUpperCase().replace(/\s+/g, '')
    if (!query) {
      setError('Please enter a ' + searchType + ' to begin.')
      return
    }

    setLoading(true)
    setError('')
    setFlightData(null)

    try {
      let endpoint = ''
      if (searchType === 'callsign') endpoint = '/api/adsb/v2/callsign/' + query
      else if (searchType === 'hex') endpoint = '/api/adsb/v2/hex/' + query
      else if (searchType === 'registration') endpoint = '/api/adsb/v2/reg/' + query

      const response = await fetch(endpoint)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No aircraft currently broadcasting under "' + query + '". Please verify the ' + searchType + ' or try again shortly.')
        }
        throw new Error('Unable to retrieve flight data. Please try again in a moment.')
      }

      const data = await response.json()
      const aircraft = data.ac || data.aircraft || []

      if (!aircraft || aircraft.length === 0) {
        setError('No aircraft currently broadcasting under "' + query + '". Please verify the ' + searchType + ' or try again shortly.')
        setLoading(false)
        return
      }

      const ac = aircraft[0]

      const flight = {
        hex: ac.hex || 'N/A',
        callsign: (ac.flight || ac.callsign || query).trim(),
        registration: ac.r || ac.reg || 'N/A',
        type: ac.t || 'N/A',
        description: ac.desc || ac.type || 'N/A',
        latitude: ac.lat,
        longitude: ac.lon,
        altitude: ac.alt_baro !== undefined ? ac.alt_baro : (ac.altitude || null),
        altitudeGeometric: ac.alt_geom || null,
        groundSpeed: ac.gs || ac.speed || null,
        trueTrack: ac.track || ac.heading || null,
        verticalRate: ac.baro_rate || ac.vert_rate || null,
        squawk: ac.squawk || 'N/A',
        category: ac.category || 'N/A',
        onGround: ac.alt_baro === 'ground',
        seen: ac.seen || null,
        seenPos: ac.seen_pos || null,
        rssi: ac.rssi || null,
        messages: ac.messages || null,
        emergency: ac.emergency || null,
        navHeading: ac.nav_heading || null,
        navAltitudeMcp: ac.nav_altitude_mcp || null,
        source: 'adsb.lol',
      }

      setFlightData(flight)

      const newSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5)
      setRecentSearches(newSearches)
      localStorage.setItem('flightSearches', JSON.stringify(newSearches))

    } catch (err) {
      setError(err.message || 'Unable to retrieve flight data. Please try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') searchFlight()
  }

  const formatSpeed = (gs) => {
    if (gs === null || gs === undefined) return 'N/A'
    const kmh = (gs * 1.852).toFixed(0)
    return gs + ' kt (' + kmh + ' km/h)'
  }

  const formatAltitude = (alt) => {
    if (alt === null || alt === undefined) return 'N/A'
    if (alt === 'ground') return 'On Ground'
    const meters = (alt * 0.3048).toFixed(0)
    return alt.toLocaleString() + ' ft (' + meters + ' m)'
  }

  const formatCoordinate = (coord, type) => {
    if (coord === null || coord === undefined) return 'N/A'
    const dir = type === 'lat' ? (coord >= 0 ? 'N' : 'S') : (coord >= 0 ? 'E' : 'W')
    return Math.abs(coord).toFixed(4) + '° ' + dir
  }

  const getCompassDirection = (track) => {
    if (track === null || track === undefined) return 'N/A'
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    return dirs[Math.round(track / 45) % 8]
  }

  const openAdsbGlobe = () => {
    if (!flightData) return
    window.open('https://globe.adsb.lol/?icao=' + flightData.hex, '_blank')
  }

  const openAirplanesLive = () => {
    if (!flightData) return
    window.open('https://globe.airplanes.live/?icao=' + flightData.hex, '_blank')
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-border shadow-xl mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Plane className="h-6 w-6" /> Live Flight Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Track aircraft in real time across the globe. Search by callsign, ICAO24 hex, or aircraft registration for instant position, altitude, and speed data.
          </p>
          <div className="bg-blue-50 text-blue-700 p-3 rounded flex items-start gap-2 text-sm mb-4">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">Search by:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li><strong>Callsign:</strong> QFA12, BAW256, UAE368 (full callsign required)</li>
                <li><strong>ICAO24 Hex:</strong> 896448, 4CA87C (6-character hex code)</li>
                <li><strong>Registration:</strong> VH-ZXA, G-XLEB (aircraft tail number)</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-3 py-2 border rounded bg-background text-foreground text-sm"
            >
              <option value="callsign">Callsign</option>
              <option value="hex">ICAO24 Hex</option>
              <option value="registration">Registration</option>
            </select>
            <Input
              placeholder={searchType === 'callsign' ? 'e.g., QFA12' : searchType === 'hex' ? 'e.g., 896448' : 'e.g., VH-ZXA'}
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={searchFlight} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {recentSearches.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-muted-foreground">Recent:</span>
              {recentSearches.map((s) => (
                <button key={s} onClick={() => setFlightNumber(s)} className="text-xs bg-muted px-2 py-1 rounded hover:bg-muted/70">{s}</button>
              ))}
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 text-red-600 p-3 rounded flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}
        </CardContent>
      </Card>

      {flightData && (
        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-primary" /> {flightData.callsign}
                {flightData.registration !== 'N/A' && <span className="text-sm text-muted-foreground">({flightData.registration})</span>}
              </span>
              <span className={'text-xs px-2 py-1 rounded-full font-medium ' + (flightData.onGround ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700')}>
                {flightData.onGround ? 'On Ground' : 'In Flight'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><MapPin className="h-3 w-3" /> Latitude</div>
                <div className="font-mono font-semibold">{formatCoordinate(flightData.latitude, 'lat')}</div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><MapPin className="h-3 w-3" /> Longitude</div>
                <div className="font-mono font-semibold">{formatCoordinate(flightData.longitude, 'lon')}</div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><Gauge className="h-3 w-3" /> Altitude</div>
                <div className="font-mono font-semibold">{formatAltitude(flightData.altitude)}</div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><Navigation className="h-3 w-3" /> Ground Speed</div>
                <div className="font-mono font-semibold">{formatSpeed(flightData.groundSpeed)}</div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><Compass className="h-3 w-3" /> Heading</div>
                <div className="font-mono font-semibold">{flightData.trueTrack !== null && flightData.trueTrack !== undefined ? flightData.trueTrack.toFixed(0) + '° ' + getCompassDirection(flightData.trueTrack) : 'N/A'}</div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><Plane className="h-3 w-3" /> Aircraft</div>
                <div className="font-semibold">{flightData.type} {flightData.description !== 'N/A' ? '- ' + flightData.description : ''}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div>ICAO24: <span className="font-mono">{flightData.hex}</span></div>
              <div>Registration: <span className="font-mono">{flightData.registration}</span></div>
              <div>Squawk: <span className="font-mono">{flightData.squawk}</span></div>
              <div>Vertical Rate: {flightData.verticalRate !== null && flightData.verticalRate !== undefined ? flightData.verticalRate + ' ft/min' : 'N/A'}</div>
              <div>Last Signal: {flightData.seen !== null ? flightData.seen + 's ago' : 'N/A'}</div>
              <div className="flex items-center gap-1"><Radio className="h-3 w-3" /> Signal: {flightData.rssi !== null ? flightData.rssi.toFixed(1) + ' dBFS' : 'N/A'}</div>
              {flightData.emergency && <div className="text-red-600 font-bold">⚠ Emergency: {flightData.emergency}</div>}
            </div>

            {/* EMBEDDED LIVE MAP */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4" /> Live Map View
              </h4>
              <iframe
                src={'https://globe.adsb.lol/?icao=' + flightData.hex + '&hideSideBar&zoom=8'}
                className="w-full rounded-lg border"
                style={{ height: '400px' }}
                title={'Map showing ' + flightData.callsign}
              />
            </div>

            {/* External links */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Button onClick={openAdsbGlobe} className="flex-1">
                <Globe className="mr-2 h-4 w-4" /> Open Full adsb.lol Globe
              </Button>
              <Button variant="outline" onClick={openAirplanesLive} className="flex-1">
                <Globe className="mr-2 h-4 w-4" /> Open in Airplanes.live
              </Button>
            </div>

            {/* FLIGHT TO CALENDAR — integrated here */}
            <FlightToCalendar flightData={flightData} />

            {/* Professional data footer */}
            <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-3 w-3" />
                <span>Data verified by community ADS-B networks</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3" />
                <span>Real-time worldwide coverage</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}