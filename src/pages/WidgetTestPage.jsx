import { useEffect, useState } from 'react'
import { setPageMeta } from '../lib/seo'
import CurrencyWidget from '../components/widgets/CurrencyWidget'

const SIZES = [
  { label: 'XS — iPhone SE portrait', width: 320 },
  { label: 'SM — iPhone standard', width: 375 },
  { label: 'Embed standard', width: 400 },
  { label: 'MD — Tablet portrait', width: 520 },
  { label: 'LG — Desktop sidebar', width: 720 },
  { label: 'Full width', width: 1024 },
]

export default function WidgetTestPage() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.title = 'Widget Test Lab — Adaptive Embed Preview | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Preview the currency embed widget across every device width — laptops, tablets, phones, and embedded iframes.')
    setPageMeta()
  }, [])

  const isDark = theme === 'dark'
  const frameBg = isDark ? '#0f172a' : '#f1f5f9'
  const frameBorder = isDark ? '#334155' : '#cbd5e1'
  const labelColor = isDark ? '#94a3b8' : '#64748b'

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Widget Test Lab</h1>
        <p className="text-muted-foreground mb-4">
          Preview the currency embed widget across every device width. Each block below simulates an iframe at that exact width.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setTheme('dark')}
            className={'px-4 py-2 rounded-lg border font-semibold ' + (isDark ? 'bg-primary text-primary-foreground border-transparent' : 'border-border')}
          >
            Dark
          </button>
          <button
            onClick={() => setTheme('light')}
            className={'px-4 py-2 rounded-lg border font-semibold ' + (!isDark ? 'bg-primary text-primary-foreground border-transparent' : 'border-border')}
          >
            Light
          </button>
        </div>
      </header>

      <div className="space-y-8">
        {SIZES.map((s) => (
          <section key={s.label}>
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="text-lg font-bold">{s.label}</h2>
              <span className="text-sm text-muted-foreground">{s.width}px wide</span>
            </div>
            <div
              style={{
                width: s.width,
                maxWidth: '100%',
                padding: 20,
                background: frameBg,
                borderRadius: 12,
                border: '1px dashed ' + frameBorder,
                boxSizing: 'border-box',
              }}
            >
              <div style={{ fontSize: 10, color: labelColor, marginBottom: 8, fontFamily: 'monospace' }}>
                &lt;iframe width="{s.width}"&gt;
              </div>
              <CurrencyWidget from="USD" to="EUR" amount={100} theme={theme} />
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12 p-6 border border-border rounded-xl bg-muted/20">
        <h2 className="text-lg font-bold mb-2">How to embed</h2>
        <p className="text-sm text-muted-foreground mb-3">Copy this snippet into your own HTML:</p>
        <pre className="text-xs bg-background border border-border rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`<iframe
  src="https://timegovern.com/embed/currency?from=USD&to=EUR&amount=100&theme=dark"
  width="100%"
  height="380"
  frameborder="0"
  style="border-radius: 16px; max-width: 480px;"
  title="Currency Converter"
></iframe>`}
        </pre>
      </section>
    </div>
  )
}