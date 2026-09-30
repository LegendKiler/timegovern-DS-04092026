import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { QrCode, ArrowRight, BookOpen, Smartphone, History, Scan } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What does QR stand for?', a: 'Quick Response. The name reflects the original design goal - a barcode that could be read at high speed for automotive manufacturing.' },
  { q: 'Who invented the QR code?', a: 'Denso Wave, a Japanese automotive component manufacturer, invented QR codes in 1994. The company chose not to exercise the patent, which is why QR codes are free for anyone to use.' },
  { q: 'How much data fits in a QR code?', a: 'Up to 4,296 alphanumeric characters or 2,953 bytes of binary data. That is enough for a full URL, a contact card, a WiFi password, or a short message.' },
  { q: 'Why did QR codes take off in the 2020s?', a: 'Two reasons: modern smartphone cameras added native QR detection (no app needed), and the pandemic pushed restaurants and businesses to contactless menus and check-ins.' },
  { q: 'Do QR codes ever expire?', a: 'Static QR codes (like the ones this tool creates) never expire - the data is encoded directly. Dynamic QR codes from commercial services route through their servers and can expire if you stop paying.' },
  { q: 'Can I create a QR code without an app?', a: 'Yes. Any browser can generate them - no app needed. Our QR Code Generator runs entirely in your browser.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'What Is a QR Code? A Complete Beginner Guide', description: 'The complete guide to QR codes - what they are, how they work, and why they took over the world.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/what-is-qr-code' }

export default function WhatIsQRCodePage() {
  useEffect(() => {
    document.title = 'What Is a QR Code? A Complete Beginner Guide | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'What is a QR code? Learn how QR codes work, where they came from, and why they are everywhere now. Complete beginner guide.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / What Is a QR Code?
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full mb-4">
            <QrCode className="h-3.5 w-3.5 text-purple-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Technology - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            What Is a QR Code?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The square barcode on every menu, poster, and business card has a surprisingly interesting history. Here is the complete guide.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The one-sentence definition</h2>
          <p className="text-muted-foreground">A QR code is a 2D barcode that stores data - URLs, text, WiFi credentials, contact info - which any modern smartphone camera can scan and decode instantly.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">How they actually work</h2>
          <p className="text-muted-foreground">Unlike a traditional barcode (which stores data in one dimension of black bars), a QR code stores data in two dimensions - black and white squares across the whole area. This is why a QR code can hold 100x more data than a standard barcode.</p>
          <p className="text-muted-foreground">Key structural parts:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Three finder patterns</strong> - the squares in three corners. They tell scanners which way is up, even if the code is rotated.</li>
            <li><strong>Data modules</strong> - the grid of black and white squares that encode the actual data.</li>
            <li><strong>Alignment patterns</strong> - smaller squares that help with perspective distortion on large codes.</li>
            <li><strong>Quiet zone</strong> - the white border around the code. Do not crop it off.</li>
            <li><strong>Error correction</strong> - redundant data that lets scanners read the code even if part of it is damaged.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The history</h2>
          <p className="text-muted-foreground">Denso Wave, a Japanese automotive component manufacturer, invented QR codes in 1994. The goal: track car parts through the factory faster than the existing barcode system allowed.</p>
          <p className="text-muted-foreground">Denso Wave chose not to exercise its patent on QR codes, which is why they are free for anyone to use. That single decision set up the explosion that happened 25 years later.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Why they exploded in the 2020s</h2>
          <p className="text-muted-foreground">QR codes existed for decades but were largely ignored outside Japan. Two things changed:</p>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>iPhone and Android added native QR detection.</strong> From iOS 11 (2017) and Android 8 (2017), no app was needed - just point the camera.</li>
            <li><strong>COVID-19 pushed contactless everything.</strong> Restaurants, events, businesses rushed to replace physical menus and check-ins with QR codes.</li>
          </ol>
          <p className="text-muted-foreground">Today, QR codes are used for restaurant menus, event tickets, payment, marketing campaigns, WiFi sharing, contact cards, authentication (2FA), and much more.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Static vs dynamic QR codes</h2>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <Card><CardContent className="p-5">
              <h3 className="font-black mb-3 text-base text-emerald-600">Static QR codes</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                <li>Data encoded directly</li>
                <li>Never expire</li>
                <li>Free forever</li>
                <li>Cannot be changed after creation</li>
                <li>No tracking possible</li>
              </ul>
            </CardContent></Card>
            <Card><CardContent className="p-5">
              <h3 className="font-black mb-3 text-base text-indigo-600">Dynamic QR codes</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                <li>Data stored on the vendor's server</li>
                <li>Can be edited after creation</li>
                <li>Can be disabled by the vendor</li>
                <li>Trackable (scans, locations, times)</li>
                <li>Usually paid subscription</li>
              </ul>
            </CardContent></Card>
          </div>
          <p className="text-muted-foreground">Our <Link to="/qr-code-generator" className="text-primary font-bold hover:underline">QR Code Generator</Link> creates static QR codes - free forever, no expiry, no tracking.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Common QR code uses</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Restaurant menus</strong> - contactless ordering</li>
            <li><strong>Event tickets</strong> - fast, forgery-resistant entry</li>
            <li><strong>WiFi sharing</strong> - guests scan to connect, no typing passwords</li>
            <li><strong>Marketing</strong> - billboards link to landing pages</li>
            <li><strong>Business cards</strong> - scan to save contact info</li>
            <li><strong>Payments</strong> - Alipay, WeChat Pay, UPI</li>
            <li><strong>2FA authentication</strong> - apps like Authy, Google Authenticator</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">A quick safety note</h2>
          <p className="text-muted-foreground">QR codes hide their destination until scanned. This has been exploited for phishing - a malicious QR code in a public place can direct you to a fake login page or trigger unwanted actions.</p>
          <p className="text-muted-foreground">Always preview the URL your phone shows before tapping. Use your phone's built-in camera (not a third-party app). Never scan QR codes from untrusted or obscured sources.</p>
        </div>

        <div className="my-8">
          <Link to="/qr-code-generator" className="block rounded-2xl border-2 border-purple-500/30 bg-purple-500/5 hover:border-purple-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-md"><QrCode className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-purple-500 transition-colors">Create your own QR code</h3>
                <p className="text-sm text-muted-foreground">Free, offline, downloads as PNG. No signup.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (<Card key={i}><CardContent className="p-5"><h3 className="font-bold mb-2">{f.q}</h3><p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p></CardContent></Card>))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black mb-5">Related reading</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link to="/blog/how-to-create-qr-code" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Smartphone className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Create a QR Code</h3>
              <p className="text-xs text-muted-foreground">Step-by-step with best practices.</p>
            </Link>
            <Link to="/blog/qr-code-security-risks" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Scan className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">QR Code Security Risks</h3>
              <p className="text-xs text-muted-foreground">What to watch for before scanning.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'What Is a QR Code?'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}