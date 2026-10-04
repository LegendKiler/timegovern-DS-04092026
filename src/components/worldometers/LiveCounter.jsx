import { useState, useEffect, useRef } from 'react'

function computeValue(metric, now) {
  let base = metric.baseValue
  let baseTs = metric.baseTimestamp
  if (metric.resetDaily) {
    const d = new Date(now)
    baseTs = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0)
    base = 0
  }
  const elapsedSec = (now - baseTs) / 1000
  return base + elapsedSec * metric.ratePerSecond
}

function formatValue(v, format) {
  if (format === 'compact') {
    return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(v)
  }
  if (format === 'decimal2') return v.toFixed(2)
  return Math.floor(v).toLocaleString('en-US')
}

export default function LiveCounter({ metric, size = 'lg', showRate = true }) {
  const [value, setValue] = useState(() => computeValue(metric, Date.now()))
  const rafRef = useRef(null)
  const lastRef = useRef(0)

  useEffect(() => {
    const tick = (ts) => {
      if (!document.hidden && ts - lastRef.current > 80) {
        setValue(computeValue(metric, Date.now()))
        lastRef.current = ts
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [metric])

  const sizeClasses = size === 'lg'
    ? 'text-5xl md:text-7xl'
    : size === 'md'
    ? 'text-3xl md:text-4xl'
    : 'text-2xl md:text-3xl'

  return (
    <div className="text-center">
      <div className={'font-black tabular-nums tracking-tight ' + sizeClasses}>
        {formatValue(value, metric.format)}
      </div>
      <div className="text-xs uppercase tracking-widest text-white/60 mt-2">{metric.unit}</div>
      {showRate && (
        <div className="text-xs text-white/50 mt-1">
          {metric.ratePerSecond.toLocaleString('en-US')} per second
        </div>
      )}
    </div>
  )
}