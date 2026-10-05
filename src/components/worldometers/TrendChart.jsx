import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

function formatAxis(value) {
  const abs = Math.abs(value)
  if (abs >= 1e12) return (value / 1e12).toFixed(1) + 'T'
  if (abs >= 1e9)  return (value / 1e9).toFixed(1) + 'B'
  if (abs >= 1e6)  return (value / 1e6).toFixed(abs >= 1e8 ? 0 : 1) + 'M'
  if (abs >= 1e3)  return (value / 1e3).toFixed(abs >= 1e5 ? 0 : 1) + 'K'
  return String(value)
}

function formatFull(value) {
  return Number(value).toLocaleString('en-US')
}

export default function TrendChart({ history, projection, height = 340, accent = '#6366f1' }) {
  const data = []
  if (history) history.forEach(h => data.push({ year: h.year, actual: h.value }))
  if (projection) projection.forEach(p => data.push({ year: p.year, projection: p.value }))
  data.sort((a, b) => a.year - b.year)

  if (data.length === 0) return null

  const hasProjection = !!(projection && projection.length > 0)

  return (
    <div className="rounded-2xl border border-border bg-card p-4 md:p-6">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.18)" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} tickMargin={6} />
          <YAxis tickFormatter={formatAxis} tick={{ fontSize: 11 }} width={56} />
          <Tooltip
            formatter={(v) => formatFull(v)}
            labelFormatter={(l) => 'Year ' + l}
            contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: 'hsl(var(--muted-foreground))', fontWeight: 600 }}
          />
          {hasProjection && <Legend wrapperStyle={{ fontSize: 12 }} />}
          <Line
            type="monotone"
            dataKey="actual"
            stroke={accent}
            strokeWidth={2.5}
            dot={false}
            name="Actual"
            connectNulls={false}
          />
          {hasProjection && (
            <Line
              type="monotone"
              dataKey="projection"
              stroke="#a855f7"
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
              name="Projection"
              connectNulls={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}