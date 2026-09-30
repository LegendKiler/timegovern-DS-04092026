import { useState, useEffect } from 'react'

export default function CountdownWidget({ accent = '#8b5cf6', theme = 'dark', target = '2027-01-01T00:00:00', label = 'New Year 2027' }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id) }, [])

  const diff = Math.max(0, new Date(target).getTime() - now)
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  const secs = Math.floor((diff % 60000) / 1000)

  const isDark = theme === 'dark'
  const bg = isDark ? '#0f172a' : '#ffffff'
  const fg = isDark ? '#ffffff' : '#1e293b'
  const muted = isDark ? '#475569' : '#e2e8f0'

  const cells = [[days, 'Days'], [hours, 'Hours'], [mins, 'Min'], [secs, 'Sec']]

  return (
    <div style={{ background: bg, padding: '20px 24px', borderRadius: 12, display: 'inline-block', textAlign: 'center', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ color: accent, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>{label}</div>
      <div style={{ display: 'flex', gap: 8 }}>
        {cells.map(([val, lab], i) => (
          <div key={i} style={{ background: muted, borderRadius: 8, padding: '10px 12px', minWidth: 56 }}>
            <div style={{ color: fg, fontSize: 26, fontWeight: 800, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{val}</div>
            <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: 10, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 4 }}>{lab}</div>
          </div>
        ))}
      </div>
    </div>
  )
}