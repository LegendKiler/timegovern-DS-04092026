import { useEffect, useState } from 'react'

export default function Logo({ size = 32 }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = time.getHours() % 12
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const secDeg = (seconds / 60) * 360
  const minDeg = ((minutes + seconds / 60) / 60) * 360
  const hourDeg = ((hours + minutes / 60 + seconds / 3600) / 12) * 360

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="shrink-0"
      style={{ filter: 'drop-shadow(0 2px 8px rgba(37,99,235,0.35))' }}
    >
      <defs>
        <linearGradient id="logoRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <linearGradient id="logoInner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>

      {/* Outer ring — gradient stroke */}
      <circle cx="50" cy="50" r="46" fill="url(#logoInner)" stroke="url(#logoRing)" strokeWidth="4" />

      {/* 12 hour tick marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30) * (Math.PI / 180)
        const x1 = 50 + Math.sin(angle) * 38
        const y1 = 50 - Math.cos(angle) * 38
        const x2 = 50 + Math.sin(angle) * 42
        const y2 = 50 - Math.cos(angle) * 42
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffffff" strokeWidth={i % 3 === 0 ? 2.5 : 1} strokeLinecap="round" opacity={i % 3 === 0 ? 0.95 : 0.5} />
        )
      })}

      {/* Hour hand */}
      <line
        x1="50" y1="50" x2="50" y2="30"
        stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round"
        transform={`rotate(${hourDeg} 50 50)`}
      />

      {/* Minute hand */}
      <line
        x1="50" y1="50" x2="50" y2="22"
        stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"
        transform={`rotate(${minDeg} 50 50)`}
      />

      {/* Second hand — teal accent */}
      <line
        x1="50" y1="55" x2="50" y2="16"
        stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round"
        transform={`rotate(${secDeg} 50 50)`}
      />

      {/* Center dot */}
      <circle cx="50" cy="50" r="3.5" fill="#5eead4" />
      <circle cx="50" cy="50" r="1.5" fill="#ffffff" />
    </svg>
  )
}