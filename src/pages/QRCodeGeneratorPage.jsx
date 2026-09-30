import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { QrCode, Sparkles, BookOpen, Key, Shield, Smartphone, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import QRCodeGenerator from '../components/QRCodeGenerator'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is a QR code?', a: 'A QR (Quick Response) code is a 2D barcode that stores data - URLs, text, WiFi credentials, contact info - which any modern smartphone camera can scan instantly.' },
  { q: 'Are QR codes free to create?', a: 'Yes, basic QR codes are free and never expire. Many "QR code services" charge for tracking, custom branding, or dynamic redirects - but a static QR code is free forever.' },
  { q: 'Do my QR codes expire?', a: 'Not from this tool. Static QR codes encode data directly, so they work as long as the data is valid. Some commercial services use "dynamic" QR codes that route through their servers - those can expire.' },
  { q: 'Are QR codes safe to scan?', a: 'Generally yes, but always preview the URL your phone shows before tapping. Malicious QR codes can direct you to phishing sites or trigger unwanted actions. Use your phone camera (not third-party apps) and check the destination.' },
  { q: 'How much data can a QR code hold?', a: 'Up to 4,296 alphanumeric characters or 2,953 bytes. For URLs and contact info, this is effectively unlimited. Very long data makes the QR code denser and harder to scan.' },
  { q: 'What is error correction level?', a: 'Error correction lets QR codes still scan when partially damaged. Levels go L (7%), M (15%), Q (25%), H (30%). Higher = more robust but denser. M is standard and what we use.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'QR Code Generator', description: 'Free QR code generator for URLs, text, WiFi, email, phone, and SMS. Download as PNG instantly.', applicationCategory: 'UtilityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/qr-code-generator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function QRCodeGeneratorPage() {
  useEffect(() => {
    document.title = 'QR Code Generator - Free & Offline | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free QR code generator for URLs, text, WiFi, email, phone, and SMS. Download PNG instantly. Runs entirely in your browser, no signup.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-4xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-fuchsia-950 to-slate-950" />
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="h-3.5 w-3.5 text-purple-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-purple-200">Free - Offline - No signup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <QrCode className="h-10 w-10 md:h-14 md:w-14 text-purple-300" />
              QR Code Generator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Generate QR codes for URLs, WiFi, email, phone, and SMS. Download as PNG instantly.
            </p>
          </div>
        </div>

        <QRCodeGenerator />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What you can create</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><QrCode className="h-5 w-5 text-purple-500 mb-2" /><h3 className="font-bold mb-1 text-sm">6 QR code types</h3><p className="text-xs text-muted-foreground">URL, text, WiFi, email, phone, SMS - each with a custom form.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Smartphone className="h-5 w-5 text-fuchsia-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Instant download</h3><p className="text-xs text-muted-foreground">Save as PNG at any size from 128px to 512px. No watermarks, no expiry.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Shield className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">100% offline</h3><p className="text-xs text-muted-foreground">Generated entirely in your browser. No data ever leaves your device.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Pick a QR code type - URL, WiFi, email, phone, SMS, or plain text.</li>
            <li>Fill in the fields. For WiFi, enter the network name and password.</li>
            <li>Adjust the size slider - 256px is a good default.</li>
            <li>Scan the preview with your phone to test it works.</li>
            <li>Click Download PNG to save the QR code for print or digital use.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">Related tools</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/password-generator" className="block rounded-xl border border-border bg-card hover:border-purple-400 p-5 transition-colors">
              <Key className="h-5 w-5 text-purple-500 mb-2" />
              <h3 className="font-bold mb-1">Password Generator</h3>
              <p className="text-xs text-muted-foreground">Strong random passwords.</p>
            </Link>
            <Link to="/developer-tools" className="block rounded-xl border border-border bg-card hover:border-fuchsia-400 p-5 transition-colors">
              <QrCode className="h-5 w-5 text-fuchsia-500 mb-2" />
              <h3 className="font-bold mb-1">All Developer Tools</h3>
              <p className="text-xs text-muted-foreground">Passwords, QR codes, and more.</p>
            </Link>
            <Link to="/blog/what-is-qr-code" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">What Is a QR Code?</h3>
              <p className="text-xs text-muted-foreground">The complete beginner's guide.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'QR Code Generator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Always preview URLs before opening scanned QR codes. Never scan QR codes from untrusted sources.
        </div>
      </div>
    </>
  )
}