import { useEffect, useState, useMemo } from 'react'
import { getCountryGdp, COUNTRY_GDP } from '../data/countryGdp'
import { fetchCountryGdp, fetchCountryGdpHistory, getCacheStatus } from '../lib/worldData'

export function useCountryGdp(code) {
  const bundled = useMemo(() => code ? getCountryGdp(code) : null, [code])
  const [live, setLive] = useState(null)
  const [status, setStatus] = useState('bundled')
  const [history, setHistory] = useState(null)
  const [historyStatus, setHistoryStatus] = useState('bundled')
  useEffect(() => {
    if (!code || !bundled) return
    let cancelled = false
    setStatus('loading')
    fetchCountryGdp(code).then(result => {
      if (cancelled) return
      if (result && result.year >= bundled.year) { setLive({ ...result, _code: code.toUpperCase() }); setStatus(result.source) }
      else setStatus('bundled')
    }).catch(() => { if (!cancelled) setStatus('bundled') })
    return () => { cancelled = true }
  }, [code, bundled])
  useEffect(() => {
    if (!code || !bundled) return
    let cancelled = false
    setHistory(null); setHistoryStatus('loading')
    fetchCountryGdpHistory(code).then(result => {
      if (cancelled) return
      if (result && result.points && result.points.length > 5) { setHistory(result.points); setHistoryStatus(result.source) }
      else setHistoryStatus('none')
    }).catch(() => { if (!cancelled) setHistoryStatus('none') })
    return () => { cancelled = true }
  }, [code, bundled])
  const merged = useMemo(() => {
    if (!bundled) return null
    if (live && live._code === bundled.code && live.year >= bundled.year) return { ...bundled, value: live.value, year: live.year, freshness: status }
    return { ...bundled, freshness: 'bundled' }
  }, [bundled, live, status])
  const cacheStatus = useMemo(() => code ? getCacheStatus('gdp_' + String(code).toUpperCase()) : null, [code, status])
  return { country: merged, status, cacheStatus, history, historyStatus, total: COUNTRY_GDP.length }
}
