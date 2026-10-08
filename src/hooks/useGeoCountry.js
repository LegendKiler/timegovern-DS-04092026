import { useEffect, useState } from 'react'

let cached = null
let inFlight = null

export function useGeoCountry() {
  const [country, setCountry] = useState(cached)

  useEffect(() => {
    if (cached) { setCountry(cached); return }
    if (!inFlight) {
      inFlight = fetch('/api/country')
        .then(r => r.ok ? r.json() : null)
        .then(d => {
          cached = (d && d.country) ? String(d.country).toUpperCase() : null
          return cached
        })
        .catch(() => { cached = null; return null })
    }
    inFlight.then(c => setCountry(c))
  }, [])

  return country
}