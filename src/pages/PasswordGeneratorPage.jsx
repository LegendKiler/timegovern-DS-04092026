import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Key, Sparkles, BookOpen, QrCode, Shield, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import PasswordGenerator from '../components/PasswordGenerator'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Are these passwords actually secure?', a: 'Yes. Passwords are generated using the Web Crypto API (crypto.getRandomValues), which is cryptographically secure. This is the same source of randomness used by banks and encryption systems - far better than Math.random().' },
  { q: 'How long should my password be?', a: 'For most accounts, 16 characters is a strong baseline. For high-value accounts (email, banking, password managers), use 20-24 characters. Length matters more than complexity.' },
  { q: 'What is password entropy?', a: 'Entropy measures how unpredictable a password is, in bits. Each additional bit doubles the number of guesses an attacker needs. 60 bits is strong for most accounts; 80+ bits is extremely strong.' },
  { q: 'Should I use symbols in my password?', a: 'Symbols increase the character pool, which raises entropy for the same length. But a 20-character password without symbols is stronger than a 12-character password with symbols. Length wins.' },
  { q: 'Do you store or log the passwords?', a: 'No. Passwords are generated entirely in your browser and never sent anywhere. There is no server-side processing, no logging, and no tracking.' },
  { q: 'How often should I change my password?', a: 'Modern guidance (NIST, NCSC) says: do not change passwords on a schedule. Change them only if you suspect a breach. Forced rotation leads to weaker, memorable passwords.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Password Generator', description: 'Free cryptographically secure password generator. Custom length, character sets, and entropy display.', applicationCategory: 'SecurityApplication', operatingSystem: 'Web', url: 'https://timegovern.com/password-generator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export default function PasswordGeneratorPage() {
  useEffect(() => {
    document.title = 'Password Generator - Free & Cryptographically Secure | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free cryptographically secure password generator. Custom length, character sets, and live entropy display. Runs entirely in your browser.'
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
              <span className="text-xs font-bold uppercase tracking-widest text-purple-200">Secure - Free - Private</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight flex items-center gap-4">
              <Key className="h-10 w-10 md:h-14 md:w-14 text-purple-300" />
              Password Generator
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
              Generate cryptographically strong passwords. Custom length, character sets, and live entropy display.
            </p>
          </div>
        </div>

        <PasswordGenerator />

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">What makes this generator secure</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Card><CardContent className="p-5"><Shield className="h-5 w-5 text-purple-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Web Crypto API</h3><p className="text-xs text-muted-foreground">Uses crypto.getRandomValues() - the same source used by encryption systems worldwide.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Key className="h-5 w-5 text-fuchsia-500 mb-2" /><h3 className="font-bold mb-1 text-sm">Live entropy display</h3><p className="text-xs text-muted-foreground">See exactly how unpredictable each password is in bits. 60+ is strong; 80+ is excellent.</p></CardContent></Card>
            <Card><CardContent className="p-5"><Clock className="h-5 w-5 text-indigo-500 mb-2" /><h3 className="font-bold mb-1 text-sm">100% offline</h3><p className="text-xs text-muted-foreground">Runs entirely in your browser. Nothing is sent to a server, logged, or stored.</p></CardContent></Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-5">How to use it</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Set the length - 16 is a solid default, 20+ for high-value accounts.</li>
            <li>Choose which character types to include (lowercase, uppercase, digits, symbols).</li>
            <li>Toggle "exclude ambiguous" if you need to type or read the password manually.</li>
            <li>Check the entropy value - aim for 60 bits minimum, 80+ for critical accounts.</li>
            <li>Click Copy and paste into your password manager.</li>
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
            <Link to="/qr-code-generator" className="block rounded-xl border border-border bg-card hover:border-purple-400 p-5 transition-colors">
              <QrCode className="h-5 w-5 text-purple-500 mb-2" />
              <h3 className="font-bold mb-1">QR Code Generator</h3>
              <p className="text-xs text-muted-foreground">URLs, WiFi, contact cards.</p>
            </Link>
            <Link to="/developer-tools" className="block rounded-xl border border-border bg-card hover:border-fuchsia-400 p-5 transition-colors">
              <Key className="h-5 w-5 text-fuchsia-500 mb-2" />
              <h3 className="font-bold mb-1">All Developer Tools</h3>
              <p className="text-xs text-muted-foreground">Passwords, QR codes, and more.</p>
            </Link>
            <Link to="/blog/how-to-create-strong-password" className="block rounded-xl border border-border bg-card hover:border-indigo-400 p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
              <h3 className="font-bold mb-1">How to Create a Strong Password</h3>
              <p className="text-xs text-muted-foreground">The complete guide.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Password Generator'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> Store generated passwords in a reputable password manager. Never reuse passwords across accounts.
        </div>
      </div>
    </>
  )
}