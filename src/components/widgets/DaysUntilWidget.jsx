import { useState, useEffect } from 'react'

export default function DaysUntilWidget({ accent = '#f59e0b', theme = 'dark', target = '2027-01-01', event = 'New Year', emoji = '🎉' }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 60000); return () => clearInterval(id) }, [])

  const targetDate = new Date(target + 'T00:00:00')
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const days = Math.max(0, Math.ceil((targetDate - today) / 86400000))

  const isDark = theme === 'dark'
  const bg = isDark ? '#0f172a' : '#ffffff'
  const fg = isDark ? '#ffffff' : '#1e293b'

  return (
    <div style={{ background: bg, padding: '24px 28px', borderRadius: 12, display: 'inline-block', minWidth: 200, textAlign: 'center', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ fontSize: 36, marginBottom: 6 }}>{emoji}</div>
      <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Days until</div>
      <div style={{ color: accent, fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{event}</div>
      <div style={{ color: fg, fontSize: 56, fontWeight: 900, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{days}</div>
      <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: 11, marginTop: 6 }}>days remaining</div>
    </div>
  )
}