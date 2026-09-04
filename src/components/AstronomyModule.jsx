import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import SunCalc from 'suncalc'

export default function AstronomyModule() {
  const { location } = useUser()
  const [times, setTimes] = useState(null)
  const [eclipses, setEclipses] = useState([])

  useEffect(() => {
    if (!location?.latitude) return
    const lat = location.latitude
    const lng = location.longitude

    const now = new Date()
    const times = SunCalc.getTimes(now, lat, lng)
    setTimes({
      sunrise: times.sunrise,
      sunset: times.sunset,
      dawn: times.dawn,
      dusk: times.dusk,
      nauticalDawn: times.nauticalDawn,
      nauticalDusk: times.nauticalDusk,
      astroDawn: times.nightEnd,
      astroDusk: times.night,
    })

    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=1')
      .then(res => res.json())
      .then(data => setEclipses(data))
      .catch(() => {})
  }, [location])

  if (!times) return <div className="card p-6">Loading astronomy data...</div>

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">Astronomy</h2>
      <div className="space-y-2 text-sm">
        <div>Sunrise: {times.sunrise.toLocaleTimeString()}</div>
        <div>Sunset: {times.sunset.toLocaleTimeString()}</div>
        <div>Civil Dawn: {times.dawn.toLocaleTimeString()}</div>
        <div>Civil Dusk: {times.dusk.toLocaleTimeString()}</div>
        <div>Nautical Dawn: {times.nauticalDawn.toLocaleTimeString()}</div>
        <div>Nautical Dusk: {times.nauticalDusk.toLocaleTimeString()}</div>
        <div>Astro Dawn: {times.astroDawn.toLocaleTimeString()}</div>
        <div>Astro Dusk: {times.astroDusk.toLocaleTimeString()}</div>
      </div>
      {eclipses.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Eclipse Info</h3>
          <p>{eclipses[0].title}</p>
        </div>
      )}
    </div>
  )
}