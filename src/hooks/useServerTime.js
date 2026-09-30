import { useState, useEffect, useRef } from 'react'

// Fetches true UTC time from WorldTimeAPI and computes drift vs device clock.
// Falls back gracefully to device clock if the API is unreachable or offline.
// Refresh cadence: every 10 minutes. Drift stored to the millisecond.

const API_URL = 'https://worldtimeapi.org/api/timezone/Etc/UTC'
const REFRESH_MS = 10 * 60 * 1000

export function useServerTime() {
  const [driftMs, setDriftMs] = useState(0)
  const [status, setStatus] = useState('initialising')
  const [lastSync, setLastSync] = useState(null)
  const mounted = useRef(true)

  const fetchTime = async () => {
    try {
      const t0 = Date.now()
      const res = await fetch(API_URL, { cache: 'no-store' })
      const t1 = Date.now()
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const data = await res.json()
      if (!data.utc_datetime) throw new Error('Missing utc_datetime')
      const serverMs = new Date(data.utc_datetime).getTime()
      const rtt = t1 - t0
      const adjusted = serverMs + rtt / 2
      const drift = adjusted - t1
      if (mounted.current) {
        setDriftMs(drift)
        setStatus('synced')
        setLastSync(new Date())
      }
    } catch (err) {
      if (mounted.current) {
        setStatus('offline')
      }
    }
  }

  useEffect(() => {
    mounted.current = true
    fetchTime()
    const t = setInterval(fetchTime, REFRESH_MS)
    return () => {
      mounted.current = false
      clearInterval(t)
    }
  }, [])

  const now = () => new Date(Date.now() + driftMs)

  return { driftMs, status, lastSync, now, refresh: fetchTime }
}

export function describeDrift(ms) {
  const abs = Math.abs(ms)
  if (abs < 500) return 'In sync'
  if (abs < 1000) return 'Off by about ' + Math.round(abs) + 'ms'
  const sec = Math.round(abs / 1000)
  if (sec < 60) return 'Off by about ' + sec + 's'
  const min = Math.round(sec / 60)
  return 'Off by about ' + min + ' min'
}