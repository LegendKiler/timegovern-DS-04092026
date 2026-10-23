import { useEffect, useState, useMemo } from 'react'
import { getCountryWater, COUNTRY_WATER } from '../data/countryWater'
import { fetchCountryWater, fetchCountryWaterHistory, getCacheStatus } from '../lib/worldData'

export function useCountryWater(code) {
  const bundled = useMemo(() => code ? getCountryWater(code) : null, [code])
  const [live, setLive] = useState(null)
  const [status, setStatus] = useState('bundled')
  const [history, setHistory] = useState(null)
  const [historyStatus, setHistoryStatus] = useState('bundled')

  useEffect(() => {
    if (!code || !bundled) return
    let cancelled = false
    setStatus('loading')
    fetchCountryWater(code)
      .then(result => {
        if (cancelled) return
        if (result && result.year >= bundled.year) { setLive({ ...result, _code: code.toUpperCase() }); setStatus(result.source) }
        else setStatus('bundled')
      })
      .catch(() => { if (!cancelled) setStatus('bundled') })
    return () => { cancelled = true }
  }, [code, bundled])

  useEffect(() => {
    if (!code || !bundled) return
    let cancelled = false
    setHistory(null); setHistoryStatus('loading')
    fetchCountryWaterHistory(code)
      .then(result => {
        if (cancelled) return
        if (result && result.points && result.points.length > 5) { setHistory(result.points); setHistoryStatus(result.source) }
        else setHistoryStatus('none')
      })
      .catch(() => { if (!cancelled) setHistoryStatus('none') })
    return () => { cancelled = true }
  }, [code, bundled])

  const merged = useMemo(() => {
    if (!bundled) return null
    if (live && live._code === bundled.code && live.year >= bundled.year) return { ...bundled, value: live.value, year: live.year, freshness: status }
    return { ...bundled, freshness: 'bundled' }
  }, [bundled, live, status])

  const cacheStatus = useMemo(() => code ? getCacheStatus('water_' + String(code).toUpperCase()) : null, [code, status])

  return { country: merged, status, cacheStatus, history, historyStatus, total: COUNTRY_WATER.length }
}
