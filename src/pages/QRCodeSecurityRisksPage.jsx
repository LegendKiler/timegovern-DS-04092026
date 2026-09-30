import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Shield, ArrowRight, BookOpen, QrCode, AlertTriangle, Smartphone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Can a QR code give my phone a virus?', a: 'No - a QR code is just data, not code. It cannot execute anything by itself. However, it can direct you to a site that downloads something harmful if you then install it. The QR code is not the threat; the destination is.' },
  { q: 'What is quishing?', a: 'QR code phishing. Attackers replace legitimate QR codes with malicious ones (or send QR codes in emails) that direct victims to fake login pages. It bypasses email filters because the malicious URL is inside the image.' },
  { q: 'How do I check a QR code before opening?', a: 'Your phone shows the URL before you tap. Always read it. Check the domain - is it the exact site you expect, or a lookalike? If anything looks off, do not proceed.' },
  { q: 'Are QR codes on restaurant tables safe?', a: 'Usually yes. Stickers placed on top of legitimate QR codes are the risk - if you see a sticker over a printed code, be suspicious. Menu QR codes generally just open a web menu.' },
  { q: 'Should I use a third-party QR scanner app?', a: 'No. Your phone camera already scans QR codes natively. Third-party scanner apps often inject ads, track you, and some have been caught serving malicious redirects.' },
  { q: 'Are payment QR codes safe?', a: 'Payment QRs (Alipay, WeChat Pay, UPI, etc.) are generally safe because they route through verified apps. But if you receive a QR code from someone you do not know asking for payment, treat it as you would any other payment request - verify the recipient.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'QR Code Security Risks: What You Need to Know', description: 'QR codes can be used for phishing and other attacks. Learn the real risks and how to scan safely.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/qr-code-security-risks' }

export default function QRCodeSecurityRisksPage() {
  useEffect(() => {
    document.title = 'QR Code Security Risks: What You Need to Know | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'QR codes can be used for phishing and other attacks. Learn the real risks - quishing, malicious stickers, fake apps - and how to scan safely.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / QR Code Security Risks
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full mb-4">
            <Shield className="h-3.5 w-3.5 text-purple-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Security - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            QR Code Security Risks
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            QR codes hide their destination until scanned. That is exactly why attackers love them. Here is what to watch for.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The fundamental problem</h2>
          <p className="text-muted-foreground">A QR code is a short string of data wrapped in a scannable square. When you see a QR code, you have no idea whether it points to a legitimate restaurant menu or a phishing page that looks like your bank login.</p>
          <p className="text-muted-foreground">Traditional phishing relies on links - which users can (usually) recognise as suspicious. QR codes bypass that layer of suspicion. The URL is invisible until you scan.</p>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 my-6 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <strong className="text-amber-700 dark:text-amber-400">Key point:</strong> A QR code cannot harm your phone by itself. It is just data. The risk is entirely in what it points to and what you do next.
            </div>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">The main attack types</h2>

          <h3 className="text-xl font-black mt-6 mb-2">1. Quishing (QR code phishing)</h3>
          <p className="text-muted-foreground">An attacker sends a QR code in an email, or places a malicious one in public. Scanning directs you to a fake login page - the same as classic phishing, but bypassing email filters because the URL is hidden inside an image.</p>
          <p className="text-muted-foreground">Common targets: Microsoft 365, banking, delivery services, tax authorities.</p>

          <h3 className="text-xl font-black mt-6 mb-2">2. Malicious stickers</h3>
          <p className="text-muted-foreground">Attackers print QR code stickers and place them over legitimate codes - on parking meters, restaurant tables, event posters. Scanning goes to their malicious page instead of the intended one.</p>
          <p className="text-muted-foreground">If a QR code looks like a sticker over another surface, treat it with suspicion.</p>

          <h3 className="text-xl font-black mt-6 mb-2">3. Fake QR scanner apps</h3>
          <p className="text-muted-foreground">The app stores contain many fake "QR scanner" apps that inject ads, track you, and some have served malicious redirects. You do not need any of them - your phone camera scans QR codes natively.</p>

          <h3 className="text-xl font-black mt-6 mb-2">4. Payment redirection</h3>
          <p className="text-muted-foreground">In markets using QR payments (Alipay, WeChat Pay, UPI), attackers have replaced merchant QR codes with their own - redirecting payments to the attacker's account. Merchants lose revenue; customers lose payment.</p>

          <h3 className="text-xl font-black mt-6 mb-2">5. Tracking</h3>
          <p class="text-muted-foreground">This is not an attack per se, but worth knowing: dynamic QR codes (from commercial services) can track when, where, and on what device you scanned. Static QR codes (like ours) cannot.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">How to scan safely</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong>Use your phone's built-in camera.</strong> iOS and Android both scan QR codes without an app. Do not install third-party scanners.</li>
            <li><strong>Preview the URL before tapping.</strong> Your phone shows the destination first. Read it carefully - check the domain, not just the site name.</li>
            <li><strong>Look for lookalike domains.</strong> <span className="font-mono bg-muted px-2 py-1 rounded text-xs">paypa1.com</span> (with a 1) is not PayPal. <span className="font-mono bg-muted px-2 py-1 rounded text-xs">google-secure-login.com</span> is not Google.</li>
            <li><strong>Be suspicious of stickers.</strong> If a QR code is a sticker placed on top of another surface, avoid it.</li>
            <li><strong>Never enter credentials on a page reached via QR code.</strong> If a QR code opens a login page, close it. Log in by navigating to the site directly.</li>
            <li><strong>Never approve a payment you did not initiate.</strong> If a QR code triggers a payment request, cancel and verify through the merchant directly.</li>
            <li><strong>Check the source.</strong> Is the QR code from a legitimate business you trust? If not, do not scan.</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">How businesses should use QR codes</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Print them, do not stick them.</strong> Printed QR codes are much harder to replace than stickers.</li>
            <li><strong>Add your brand near the code.</strong> A logo, domain, or short URL next to the code signals legitimacy.</li>
            <li><strong>Use static QR codes for permanent placements.</strong> They cannot be tampered with server-side.</li>
            <li><strong>Never use a QR code to request login credentials.</strong> There is no legitimate reason for this pattern.</li>
            <li><strong>Educate staff.</strong> Anyone placing QR codes in public should know the tampering risks.</li>
          </ul>

          <h2 class="text-2xl font-black mt-8 mb-3">The bottom line</h2>
          <p className="text-muted-foreground">QR codes are safe when used properly. The real risks are phishing (quishing), malicious stickers, and fake apps. Use your phone's native camera, always preview the URL, and never enter credentials on a page you reached via a QR code.</p>
          <p className="text-muted-foreground">Use our <Link to="/qr-code-generator" className="text-primary font-bold hover:underline">QR Code Generator</Link> to create static QR codes that never expire and cannot be tampered with server-side.</p>
        </div>

        <div className="my-8">
          <Link to="/qr-code-generator" className="block rounded-2xl border-2 border-purple-500/30 bg-purple-500/5 hover:border-purple-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-md"><QrCode className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-purple-500 transition-colors">Create a safe static QR code</h3>
                <p className="text-sm text-muted-foreground">Free, offline, no expiry, no tracking.</p>
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
            <Link to="/blog/how-to-create-qr-code" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Smartphone className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Create a QR Code</h3>
              <p className="text-xs text-muted-foreground">Best practices for print.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'QR Code Security Risks'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only. Report suspicious QR codes to the relevant authority.
        </div>
      </div>
    </>
  )
}