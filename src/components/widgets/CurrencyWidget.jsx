import { useEffect, useState } from 'react'
import { getCurrency, formatCurrencyAmount } from '../../data/currencies'

export default function CurrencyWidget({ from = 'USD', to = 'EUR', amount = 100, accent, theme = 'dark' }) {
  const [rate, setRate] = useState(null)
  const [rateDate, setRateDate] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(`https://open.er-api.com/v6/latest/${from}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || d.result === 'error') return
        setRate(d.rates?.[to] ?? null)
        setRateDate(d.time_last_update_utc || null)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [from, to])

  const fromMeta = getCurrency(from)
  const toMeta = getCurrency(to)
  const numericAmount = parseFloat(amount || 0)
  const result = rate ? numericAmount * rate : null

  const isDark = theme !== 'light'
  const bg = isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-white'
  const text = isDark ? 'text-white' : 'text-slate-900'
  const muted = isDark ? 'text-slate-400' : 'text-slate-500'
  const border = isDark ? 'border-slate-700' : 'border-slate-200'
  const accentColor = accent || '#10b981'

  return (
    <div className={`${bg} ${text} p-6 rounded-2xl border ${border} w-full max-w-sm`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div className={`text-xs uppercase tracking-wide ${muted} mb-3`}>Currency Converter</div>

      <div className="flex items-center gap-2 text-lg font-bold mb-1">
        <span>{fromMeta?.flag}</span>
        <span>{from}</span>
      </div>
      <div className={`text-sm ${muted} mb-3 tabular-nums`}>{numericAmount.toLocaleString()}</div>

      <div className={`text-xs ${muted} mb-2`}>
        {rate ? `1 ${from} = ${rate.toFixed(4)} ${to}` : 'Loading…'}
      </div>

      <div className="flex items-center gap-2 text-lg font-bold">
        <span>{toMeta?.flag}</span>
        <span style={{ color: accentColor }} className="tabular-nums">
          {result !== null ? formatCurrencyAmount(result, to) : '\u2014'}
        </span>
      </div>

      {rateDate && <div className={`text-[10px] ${muted} mt-3`}>Rates as of {rateDate}</div>}
    </div>
  )
}