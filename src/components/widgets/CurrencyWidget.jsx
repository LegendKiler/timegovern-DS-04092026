import { useEffect, useMemo, useState } from 'react'
import useIframeSize from '../../hooks/useIframeSize'
import { CURRENCIES, CURRENCY_REGION_ORDER, getCurrency, formatCurrencyAmount } from '../../data/currencies'

function groupByRegion() {
  const groups = {}
  for (const c of CURRENCIES) {
    if (!groups[c.region]) groups[c.region] = []
    groups[c.region].push(c)
  }
  return CURRENCY_REGION_ORDER
    .filter((r) => groups[r])
    .map((r) => ({ region: r, currencies: groups[r].slice().sort((a, b) => a.code.localeCompare(b.code)) }))
}

function CompactPicker({ value, onChange, disabled, isDark }) {
  const groups = useMemo(groupByRegion, [])
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      aria-label="Currency"
      style={{
        height: 44,
        padding: '0 8px',
        borderRadius: 8,
        border: '1px solid ' + (isDark ? '#334155' : '#cbd5e1'),
        background: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f1f5f9' : '#0f172a',
        fontSize: 14,
        fontWeight: 700,
        cursor: disabled ? 'wait' : 'pointer',
        appearance: 'none',
        WebkitAppearance: 'none',
        minWidth: 88,
        fontFamily: 'inherit',
      }}
    >
      {groups.map((g) => (
        <optgroup key={g.region} label={g.region}>
          {g.currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.code}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}

export default function CurrencyWidget({
  from: initialFrom = 'USD',
  to: initialTo = 'EUR',
  amount: initialAmount = 100,
  accent,
  theme = 'dark',
}) {
  const { size } = useIframeSize()
  const [from, setFrom] = useState(initialFrom)
  const [to, setTo] = useState(initialTo)
  const [amount, setAmount] = useState(String(initialAmount))
  const [rate, setRate] = useState(null)
  const [rateDate, setRateDate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(`https://open.er-api.com/v6/latest/${from}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || d.result === 'error') return
        setRate(d.rates?.[to] ?? null)
        setRateDate(d.time_last_update_utc || null)
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [from, to])

  const fromMeta = getCurrency(from)
  const toMeta = getCurrency(to)
  const numericAmount = parseFloat(amount || 0)
  const converted = rate ? numericAmount * rate : null

  const isDark = theme !== 'light'
  const border = isDark ? '#334155' : '#e2e8f0'
  const cardBg = isDark ? '#1e293b' : '#ffffff'
  const innerBg = isDark ? '#0f172a' : '#f8fafc'
  const text = isDark ? '#f1f5f9' : '#0f172a'
  const muted = isDark ? '#94a3b8' : '#64748b'
  const accentColor = accent || '#10b981'

  const isTiny = size === 'xs'
  const isNarrow = size === 'xs' || size === 'sm'

  const swap = () => { setFrom(to); setTo(from) }

  const inputBase = {
    width: '100%',
    height: 44,
    padding: '0 12px',
    fontSize: 16,
    fontWeight: 600,
    background: innerBg,
    border: '1px solid ' + border,
    borderRadius: 8,
    color: text,
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: isNarrow ? '100%' : 480,
        padding: isTiny ? 12 : 16,
        background: cardBg,
        border: '1px solid ' + border,
        borderRadius: 16,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: text,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontSize: 10, letterSpacing: '0.08em', color: muted, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase' }}>
        Currency Converter
      </div>

      <label style={{ display: 'block', fontSize: 11, color: muted, marginBottom: 4 }}>Amount</label>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          aria-label="Amount"
          style={{ ...inputBase, flex: 1, minWidth: 0 }}
        />
        <CompactPicker value={from} onChange={setFrom} disabled={loading} isDark={isDark} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
        <button
          type="button"
          onClick={swap}
          aria-label="Swap currencies"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid ' + border,
            background: cardBg,
            color: text,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            padding: 0,
            lineHeight: 1,
          }}
        >
          ⇄
        </button>
      </div>

      <label style={{ display: 'block', fontSize: 11, color: muted, marginBottom: 4 }}>Converted to</label>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <div
          style={{
            ...inputBase,
            flex: 1,
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            color: accentColor,
            fontWeight: 800,
            fontSize: isTiny ? 14 : 16,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {converted !== null ? formatCurrencyAmount(converted, to) : loading ? '…' : '—'}
        </div>
        <CompactPicker value={to} onChange={setTo} disabled={loading} isDark={isDark} />
      </div>

      <div style={{ fontSize: 11, color: muted, lineHeight: 1.5 }}>
        {rate ? (
          <>
            1 {from} = {rate.toFixed(4)} {to}
            {!isNarrow && fromMeta && toMeta && (
              <> · {fromMeta.name} → {toMeta.name}</>
            )}
          </>
        ) : loading ? 'Loading rate…' : 'Rate unavailable'}
      </div>

      {rateDate && !isTiny && (
        <div style={{ fontSize: 10, color: muted, marginTop: 6 }}>
          Rates as of {rateDate}
        </div>
      )}
    </div>
  )
}