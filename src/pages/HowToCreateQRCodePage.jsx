import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Smartphone, ArrowRight, BookOpen, QrCode, Palette, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How do I make a QR code for free?', a: 'Use any browser-based QR code generator (like ours at timegovern.com/qr-code-generator). No app, no signup, no cost. Downloads immediately as PNG.' },
  { q: 'What size should my QR code be?', a: 'For print: 2cm x 2cm minimum for close scanning, 5-10cm for posters. For distance scanning, size depends on viewing distance - roughly 1cm per metre of distance.' },
  { q: 'Can I put a logo in the middle?', a: 'Yes, if you use a high error correction level (H = 30% damage tolerance). The logo should not exceed ~25% of the QR code area. Our tool uses M by default; for logos, use a specialist generator.' },
  { q: 'Should QR codes have a border?', a: 'Yes - a quiet zone of at least 4 modules of white space around the code. Without it, scanners cannot reliably detect the code edges.' },
  { q: 'Do QR codes work in dark mode?', a: 'Yes, but invert carefully. Dark-on-light always works. Light-on-dark works with most modern scanners but can fail with older devices. Stick with the classic for print.' },
  { q: 'How do I test a QR code?', a: 'Scan it with a phone before publishing. Test the exact version you will print or display. Never assume - a mistyped URL renders the whole QR code useless.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Create a QR Code (Best Practices Guide)', description: 'Step-by-step guide to creating QR codes, with best practices for print, size, error correction, and testing.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-to-create-qr-code' }

export default function HowToCreateQRCodePage() {
  useEffect(() => {
    document.title = 'How to Create a QR Code (Best Practices Guide) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'How to create a QR code for free - step-by-step with best practices for print, size, error correction, and testing.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How to Create a QR Code
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full mb-4">
            <Smartphone className="h-3.5 w-3.5 text-purple-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">How-to - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How to Create a QR Code
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            From simple URL to WiFi sharing - the practical guide with the details most guides skip.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">Step 1: Pick your QR code type</h2>
          <p className="text-muted-foreground">Different data needs different formats:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>URL</strong> - most common. Scans open a web page directly.</li>
            <li><strong>Plain text</strong> - shows a message. Rarely the right choice.</li>
            <li><strong>WiFi</strong> - lets guests connect without typing the password.</li>
            <li><strong>Email</strong> - opens a pre-filled email to a specific address.</li>
            <li><strong>Phone</strong> - prompts to call a number.</li>
            <li><strong>SMS</strong> - opens messages with pre-filled text.</li>
            <li><strong>Contact card (vCard)</strong> - adds contact info to the phone.</li>
          </ul>
          <p className="text-muted-foreground">Our <Link to="/qr-code-generator" className="text-primary font-bold hover:underline">QR Code Generator</Link> supports 6 of these directly.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Step 2: Shorten the data where possible</h2>
          <p className="text-muted-foreground">QR codes with less data are simpler (fewer modules) and scan more reliably. For URLs, use a link shortener:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Long URL: <span className="font-mono bg-muted px-2 py-1 rounded text-xs">https://timegovern.com/blog/what-is-qr-code?utm_source=poster&utm_medium=print</span></li>
            <li>Short URL: <span className="font-mono bg-muted px-2 py-1 rounded text-xs">timegovern.com/qr</span></li>
          </ul>
          <p className="text-muted-foreground">Shorter = simpler grid = more reliable scan. Use a link shortener (TinyURL, Bitly, or your own redirects) if the full URL is long.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Step 3: Choose the right size</h2>
          <p className="text-muted-foreground">Sizing rule of thumb for print:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Business card or flyer</strong> - 2cm x 2cm minimum</li>
            <li><strong>Poster (viewed from 1-2m)</strong> - 5cm x 5cm</li>
            <li><strong>Billboard (viewed from 5m+)</strong> - size roughly 1cm per metre of viewing distance</li>
            <li><strong>Screen display</strong> - at least 200px x 200px</li>
          </ul>
          <p className="text-muted-foreground">Bigger is safer than smaller. If unsure, go up one size.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Step 4: Choose error correction level</h2>
          <p className="text-muted-foreground">QR codes have four error correction levels - L, M, Q, H. Higher levels mean the code can still scan even if damaged, but they also make the code denser (more modules, smaller squares).</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>L (7%)</strong> - minimum redundancy. Rarely used.</li>
            <li><strong>M (15%)</strong> - standard default. Good for most uses.</li>
            <li><strong>Q (25%)</strong> - for environments with potential damage.</li>
            <li><strong>H (30%)</strong> - needed if you add a logo. Also more robust in general.</li>
          </ul>
          <p className="text-muted-foreground">Use M for standard QR codes. Use H if you plan to add a logo or use the code in tough conditions.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Step 5: Add a quiet zone</h2>
          <p className="text-muted-foreground">The quiet zone is the white border around the QR code. It must be at least 4 modules wide. Scanners use it to detect the code edges. Never crop it off when designing.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Step 6: Test it</h2>
          <p className="text-muted-foreground">Before printing or publishing:</p>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Scan with 3 different phones - old and new</li>
            <li>Test at the actual size (or scaled to the actual size)</li>
            <li>Test in the actual lighting conditions</li>
            <li>Test from the actual viewing distance</li>
            <li>Check the destination - make sure it opens the right page</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">Common mistakes</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Too small.</strong> The most common mistake. Go bigger.</li>
            <li><strong>Low contrast.</strong> Black on white is best. Avoid pastel, low-contrast, or light-on-light colour combinations.</li>
            <li><strong>Stretched.</strong> QR codes must stay square. Scaling unequally breaks the geometry.</li>
            <li><strong>Logo covering finder patterns.</strong> Logos go in the middle - never over the three corner squares.</li>
            <li><strong>Typo in the URL.</strong> A mistyped URL renders the QR code useless. Always test.</li>
            <li><strong>No quiet zone.</strong> Cropping the white border makes the QR code hard to detect.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Where to place QR codes</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Business cards and letterheads</li>
            <li>Product packaging</li>
            <li>Restaurant tables (menu access)</li>
            <li>Posters and flyers</li>
            <li>Store windows</li>
            <li>Presentations and slide decks</li>
            <li>Email signatures</li>
            <li>WiFi guest access cards</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The bottom line</h2>
          <p className="text-muted-foreground">Creating a QR code is a 30-second job. Creating a QR code that scans reliably in the real world requires attention to size, error correction, contrast, and testing. Skip the shortcuts - they usually cost more than they save.</p>
        </div>

        <div className="my-8">
          <Link to="/qr-code-generator" className="block rounded-2xl border-2 border-purple-500/30 bg-purple-500/5 hover:border-purple-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-md"><QrCode className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-purple-500 transition-colors">Create a QR code now</h3>
                <p className="text-sm text-muted-foreground">Free, offline, downloads as PNG.</p>
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
            <Link to="/blog/what-is-qr-code" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">What Is a QR Code?</h3>
              <p className="text-xs text-muted-foreground">Complete beginner guide.</p>
            </Link>
            <Link to="/blog/qr-code-security-risks" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Shield className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">QR Code Security Risks</h3>
              <p className="text-xs text-muted-foreground">What to watch for before scanning.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How to Create a QR Code'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only.
        </div>
      </div>
    </>
  )
}