import { useEffect, useState } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { setPageMeta } from '../lib/seo'

const WIDGETS = [
  {
    id: 'digital',
    title: 'Digital Clock',
    desc: 'Live time in any timezone, 12h or 24h format.',
    src: '/embed/digital?tz=Australia/Sydney&format=24h&theme=dark',
    params: 'tz, format (12h|24h), seconds (on|off), date (on|off), theme (dark|light)',
    size: '360 × 200',
  },
  {
    id: 'clock',
    title: 'Analog Clock',
    desc: 'Classic analog face, custom size and accent colour.',
    src: '/embed/clock?tz=America/New_York&size=200&theme=dark',
    params: 'tz, size (px), accent (#hex), theme',
    size: '280 × 280',
  },
  {
    id: 'world-clock',
    title: 'World Clock',
    desc: 'Multiple cities at once, side by side.',
    src: '/embed/world-clock?cities=Sydney,London,NewYork,Tokyo&format=24h&theme=dark',
    params: 'cities (comma list), format, seconds, date, theme',
    size: '520 × 240',
  },
  {
    id: 'timezone',
    title: 'Time Zone Converter',
    desc: 'Convert a time between two zones with DST awareness.',
    src: '/embed/timezone?from=Sydney&to=London&format=24h&theme=dark',
    params: 'from, to, format, theme',
    size: '400 × 260',
  },
  {
    id: 'currency',
    title: 'Currency Converter',
    desc: 'Interactive mini-converter with 166 currencies, live rates.',
    src: '/embed/currency?from=USD&to=EUR&amount=100&theme=dark',
    params: 'from, to, amount, accent, theme',
    size: '400 × 380',
  },
  {
    id: 'weather',
    title: 'Weather',
    desc: 'Current conditions and forecast for any city.',
    src: '/embed/weather?city=Sydney&theme=dark',
    params: 'city, lat, lon, theme',
    size: '360 × 240',
  },
  {
    id: 'countdown',
    title: 'Countdown',
    desc: 'Count down to any date — product launches, holidays, exams.',
    src: '/embed/countdown?target=2027-01-01T00:00:00&label=New%20Year&theme=dark',
    params: 'target (ISO), label, theme',
    size: '360 × 200',
  },
  {
    id: 'days-until',
    title: 'Days Until',
    desc: 'Show how many days remain until an event.',
    src: '/embed/days-until?target=2027-01-01&event=New%20Year&emoji=%F0%9F%8E%89&theme=dark',
    params: 'target, event, emoji, theme',
    size: '300 × 160',
  },
  {
    id: 'moon',
    title: 'Moon Phase',
    desc: 'Current lunar phase, illustrated.',
    src: '/embed/moon?theme=dark',
    params: 'theme',
    size: '260 × 260',
  },
]

const FAQ = [
  { q: 'Are these widgets free?', a: 'Yes. All widgets are free, no signup, no API key required. Just copy the iframe code into your website.' },
  { q: 'Do I need to credit TimeGovern?', a: 'No. Attribution is optional and appreciated. Free embeds may show a small "Powered by" badge in the corner.' },
  { q: 'Will the widgets slow down my site?', a: 'No. Each widget is a single iframe served from a fast CDN, cached at the edge. Widgets load in under 200 KB and never block your page.' },
  { q: 'Do the widgets work on mobile?', a: 'Yes. Every widget is responsive and adapts from 320px phone widths up to full-width desktops. Tested on iOS Safari, Android Chrome, and all major desktop browsers.' },
  { q: 'Can I customise the colours?', a: 'Yes. Every widget accepts a theme=dark or theme=light parameter. Most widgets also accept an accent=#hex parameter to match your brand colours.' },
  { q: 'Do the widgets work inside WordPress, Shopify, Squarespace?', a: 'Yes. Anywhere you can paste HTML, you can embed a TimeGovern widget. Works with WordPress custom HTML blocks, Shopify Liquid, Wix, Webflow, Ghost, and plain HTML.' },
  { q: 'Do widgets hurt my SEO?', a: 'No. iframe content is attributed to the source (TimeGovern), not to your site, so it neither helps nor harms your SEO. It is a neutral enhancement.' },
  { q: 'Can I use these widgets in paid ads or landing pages?', a: 'Yes. The widgets are fully compatible with Google Ads, Facebook Ads, and any ad platform.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TimeGovern Free Widgets',
  url: 'https://timegovern.com/embed-docs',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  description: 'Free embeddable widgets: clocks, currency converter, weather, countdowns, moon phase.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' },
    { '@type': 'ListItem', position: 2, name: 'Embeddable Widgets', item: 'https://timegovern.com/embed-docs' },
  ],
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1 px-2 py-1 rounded border border-border text-xs font-semibold hover:bg-muted"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export default function EmbedDocsPage() {
  useEffect(() => {
    document.title = 'Free Embeddable Widgets — Clocks, Currency, Weather for Your Website | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Free embeddable widgets for any website: world clocks, currency converter, weather, countdowns, moon phase. Copy-paste iframe code, no signup. Works on WordPress, Shopify, Wix, and plain HTML.')
    setPageMeta()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Embeddable Widgets</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Nine free widgets for your website — world clocks, currency converter, weather, countdowns, and moon phases.
          Copy the iframe code, paste on any site. No signup, no API key, no rate limits.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {WIDGETS.map((w) => {
          const iframeCode = `<iframe\n  src="https://timegovern.com${w.src}"\n  width="100%"\n  height="360"\n  frameborder="0"\n  style="border-radius: 12px; max-width: 520px;"\n  title="${w.title}"\n  loading="lazy"\n></iframe>`
          return (
            <Card key={w.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="font-bold text-lg">{w.title}</h2>
                    <p className="text-sm text-muted-foreground">{w.desc}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{w.size}</span>
                </div>

                <div className="my-3 border border-border rounded-lg overflow-hidden bg-muted/20">
                  <iframe
                    src={w.src}
                    width="100%"
                    height="300"
                    frameBorder="0"
                    title={w.title + ' preview'}
                    loading="lazy"
                    style={{ display: 'block' }}
                  />
                </div>

                <details className="text-xs">
                  <summary className="cursor-pointer font-semibold mb-2">Embed code</summary>
                  <div className="relative">
                    <pre className="bg-muted/30 border border-border rounded p-3 overflow-x-auto whitespace-pre text-[11px] leading-relaxed">{iframeCode}</pre>
                    <div className="mt-2 flex justify-end"><CopyButton text={iframeCode} /></div>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    <span className="font-semibold">Params:</span> {w.params}
                  </p>
                </details>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">How to embed</h2>
        <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
          <li>Pick a widget above and click <strong>Embed code</strong> to expand the iframe snippet.</li>
          <li>Click <strong>Copy</strong> — the code is now on your clipboard.</li>
          <li>Paste into your website's HTML where you want the widget to appear.</li>
          <li>Optional: change the <code>src</code> query parameters (city, timezone, theme, etc.) to customise.</li>
        </ol>

        <div className="mt-6 p-4 border border-border rounded-lg bg-muted/20 text-sm">
          <h3 className="font-bold mb-2">Works with:</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {['WordPress', 'Shopify', 'Wix', 'Squarespace', 'Webflow', 'Ghost', 'Notion', 'Plain HTML', 'React', 'Vue'].map((x) => (
              <span key={x} className="px-2 py-1 rounded bg-background border border-border">{x}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
        <div className="space-y-2">
          {FAQ.map((f) => (
            <details key={f.q} className="border border-border rounded-lg p-3">
              <summary className="font-semibold cursor-pointer text-sm">{f.q}</summary>
              <p className="text-muted-foreground mt-2 text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="text-center border-t border-border pt-8">
        <h2 className="text-xl font-bold mb-2">Need something more custom?</h2>
        <p className="text-sm text-muted-foreground mb-4">
          All widgets accept <code>accent=#hex</code> to match your brand. More customisation coming soon.
        </p>
        <a href="https://timegovern.com/contact" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">
          Contact us <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </section>
    </div>
  )
}