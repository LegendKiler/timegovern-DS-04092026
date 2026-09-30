import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Key, ArrowRight, BookOpen, Shield, Clock, Copy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What makes a password strong?', a: 'Length is the biggest factor. A 16-character password is roughly 100 trillion times harder to crack than an 8-character one. Length beats complexity every time.' },
  { q: 'Should I use a passphrase instead?', a: 'Yes - a passphrase of 4-6 random words (correct horse battery staple) is both strong and memorable. It is often better than a shorter complex password.' },
  { q: 'How long should my password be?', a: 'For most accounts: 16 characters minimum. For email, banking, and password managers: 20-24 characters. Longer is always better.' },
  { q: 'Should I use a password manager?', a: 'Yes, without exception. A manager lets you use a unique, strong password for every account without memorising any of them. Bitwarden, 1Password, and KeePassXC are all excellent.' },
  { q: 'Are browser-saved passwords safe?', a: 'Reasonably, if your device is secure and protected by a strong login. But dedicated password managers offer more features and better cross-device sync.' },
  { q: 'What is two-factor authentication?', a: 'A second proof of identity (usually a code from an app or hardware key) required in addition to your password. Enable 2FA everywhere it is offered - it is the single most effective account protection.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Create a Strong Password (2026 Guide)', description: 'The definitive guide to creating strong passwords - length, entropy, passphrases, and password managers.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-to-create-strong-password' }

export default function HowToCreateStrongPasswordPage() {
  useEffect(() => {
    document.title = 'How to Create a Strong Password (2026 Guide) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'The definitive guide to creating strong passwords. Learn what actually matters (length), what does not (replacing letters with numbers), and how to use a password manager.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How to Create a Strong Password
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full mb-4">
            <Shield className="h-3.5 w-3.5 text-purple-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Security - 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How to Create a Strong Password
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Forget everything you learned in 2010. Password advice has changed dramatically. Here is what actually works.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The single most important factor: length</h2>
          <p className="text-muted-foreground">Forget complexity. Forget symbols. Forget replacing "a" with "@" and "s" with "$". Modern password cracking uses GPUs capable of billions of guesses per second, and those tricks are in every dictionary.</p>
          <p className="text-muted-foreground">What stops an attacker is <strong>length</strong>. Every extra character multiplies the search space by the size of your character set. Going from 8 to 16 characters makes a password roughly 10 trillion times harder to crack - even with the same character set.</p>
          <p className="text-muted-foreground">The NIST (US National Institute of Standards and Technology) now recommends:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Minimum 8 characters, but <strong>16+ is the new normal</strong></li>
            <li>Do not force complexity rules (they lead to predictable patterns)</li>
            <li>Do not force rotation on a schedule (it causes people to pick weaker passwords)</li>
            <li>Check new passwords against breach databases</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">Understanding entropy (the real metric)</h2>
          <p className="text-muted-foreground">Password strength is measured in <strong>bits of entropy</strong> - a measure of how unpredictable the password is.</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>40 bits</strong> - Weak. Crackable in hours to days.</li>
            <li><strong>60 bits</strong> - Fair. Strong for low-value accounts.</li>
            <li><strong>80 bits</strong> - Strong. Fine for most accounts.</li>
            <li><strong>100+ bits</strong> - Very strong. Appropriate for high-value accounts.</li>
          </ul>
          <p className="text-muted-foreground">Our <Link to="/password-generator" className="text-primary font-bold hover:underline">Password Generator</Link> shows entropy live so you can see the actual strength of your password.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">What about passphrases?</h2>
          <p className="text-muted-foreground">A passphrase is 4-6 random words strung together. Example: <span className="font-mono bg-muted px-2 py-1 rounded">mountain-violet-elephant-porch-tiger</span></p>
          <p className="text-muted-foreground">This has more entropy than a 12-character complex password, and it is far easier to remember and type. For accounts you cannot store in a manager (your computer login, your password manager master password), a passphrase is often the best choice.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The trick that does not actually work</h2>
          <p className="text-muted-foreground">Replacing letters with symbols (P@ssw0rd, Tr0ub4dor&3) does not meaningfully increase security. Cracking tools test these substitutions automatically. A 12-character "complex" password like P@ssw0rd123 is far weaker than a 16-character simple one like purplemonkeydishwasher.</p>
          <p className="text-muted-foreground">Stop doing this. Just use longer passwords.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The one rule you must follow: unique passwords</h2>
          <p className="text-muted-foreground">The single biggest password failure is reuse. When one site gets breached (and thousands do every year), attackers immediately try the same email/password on every other major service. If you reused that password, every account with it is now compromised.</p>
          <p className="text-muted-foreground">The only realistic way to have a unique 20-character password for every account is a <strong>password manager</strong>. There is no alternative at modern scale.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Password managers: which to use</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Bitwarden</strong> - free, open source, excellent. Best value.</li>
            <li><strong>1Password</strong> - best UX, great for families.</li>
            <li><strong>KeePassXC</strong> - fully offline, free, for advanced users.</li>
            <li><strong>ProtonPass</strong> - from the Proton Mail team, strong privacy focus.</li>
          </ul>
          <p className="text-muted-foreground">All four are excellent. Pick one and commit to it.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Two-factor authentication (2FA)</h2>
          <p className="text-muted-foreground">Even the strongest password can be phished. 2FA adds a second proof of identity. Prefer, in order:</p>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Hardware keys</strong> (YubiKey) - phishing-resistant, the gold standard</li>
            <li><strong>Authenticator apps</strong> (not SMS) - TOTP codes</li>
            <li><strong>SMS codes</strong> - better than nothing, but vulnerable to SIM-swap attacks</li>
          </ol>
          <p className="text-muted-foreground">Enable 2FA on every account that offers it. Start with email and banking.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">The checklist</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Use a password manager - this is non-negotiable</li>
            <li>Generate 16-20+ character random passwords for every account</li>
            <li>Never reuse a password, ever</li>
            <li>Enable 2FA (prefer apps or hardware keys over SMS)</li>
            <li>Check your email on <span className="font-mono bg-muted px-2 py-1 rounded text-xs">haveibeenpwned.com</span> to see what has leaked</li>
            <li>Change passwords only when a breach is suspected - not on a schedule</li>
          </ol>
        </div>

        <div className="my-8">
          <Link to="/password-generator" className="block rounded-2xl border-2 border-purple-500/30 bg-purple-500/5 hover:border-purple-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-md"><Key className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-purple-500 transition-colors">Generate a strong password now</h3>
                <p className="text-sm text-muted-foreground">Free, cryptographically secure, 100% private.</p>
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
            <Link to="/blog/password-security-guide" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Password Security: The Complete Guide</h3>
              <p className="text-xs text-muted-foreground">Threats, attacks, and defences.</p>
            </Link>
            <Link to="/blog/how-often-change-password" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Clock className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How Often Should I Change My Password?</h3>
              <p className="text-xs text-muted-foreground">The modern answer will surprise you.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How to Create a Strong Password'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only. Follow your organisation's security policies where applicable.
        </div>
      </div>
    </>
  )
}