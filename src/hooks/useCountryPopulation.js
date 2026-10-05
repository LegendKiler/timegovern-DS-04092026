import { useEffect, useState, useMemo } from 'react'
import { getCountryPopulation } from '../data/countryPopulations'
import { fetchCountryPopulation, fetchCountryPopulationHistory, getCacheStatus } from '../lib/worldData'

export function useCountryPopulation(code) {
  const bundled = useMemo(() => code ? getCountryPopulation(code) : null, [code])
  const [live, setLive] = useState(null)
  const [status, setStatus] = useState('bundled')
  const [history, setHistory] = useState(null)
  const [historyStatus, setHistoryStatus] = useState('bundled')

  useEffect(() => {
    if (!code || !bundled) return
    let cancelled = false
    setStatus('loading')
    fetchCountryPopulation(code)
      .then(result => {
        if (cancelled) return
        if (result && result.year >= bundled.year) {
          setLive(result)
          setStatus(result.source)
        } else {
          setStatus('bundled')
        }
      })
      .catch(() => { if (!cancelled) setStatus('bundled') })
    return () => { cancelled = true }
  }, [code, bundled])

  useEffect(() => {
    if (!code || !bundled) return
    let cancelled = false
    setHistoryStatus('loading')
    fetchCountryPopulationHistory(code)
      .then(result => {
        if (cancelled) return
        if (result && result.points && result.points.length > 5) {
          setHistory(result.points)
          setHistoryStatus(result.source)
        } else {
          setHistoryStatus('none')
        }
      })
      .catch(() => { if (!cancelled) setHistoryStatus('none') })
    return () => { cancelled = true }
  }, [code, bundled])

  const merged = useMemo(() => {
    if (!bundled) return null
    if (live && live.year >= bundled.year) {
      return { ...bundled, population: live.population, year: live.year, growthRate: live.growthRate, freshness: status }
    }
    return { ...bundled, freshness: 'bundled' }
  }, [bundled, live, status])

  const cacheStatus = useMemo(
    () => code ? getCacheStatus('pop_' + String(code).toUpperCase()) : null,
    [code, status]
  )

  return { country: merged, status, cacheStatus, history, historyStatus }
}