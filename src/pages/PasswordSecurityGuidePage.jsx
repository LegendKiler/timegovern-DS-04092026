import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Shield, ArrowRight, BookOpen, Key, Lock, AlertTriangle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'What is the biggest password threat?', a: 'Phishing. Not cracking. Most breaches start with a user entering credentials on a fake login page. Technical strength matters less than vigilance against phishing.' },
  { q: 'What is credential stuffing?', a: 'Using leaked email/password pairs from one breach to log into other sites. This is why reuse is catastrophic - one leak exposes every account with the same password.' },
  { q: 'What is a brute force attack?', a: 'Trying every possible combination. Length is the only real defence - a 16-character password takes centuries to brute force at current speeds.' },
  { q: 'What is a dictionary attack?', a: 'Trying common words and known passwords. Using any real word, name, or phrase pattern makes you vulnerable. Random is safer.' },
  { q: 'Is SMS 2FA safe?', a: 'Better than nothing, but vulnerable to SIM-swap attacks. Authenticator apps and hardware keys are much stronger. Prefer them where possible.' },
  { q: 'What should I do if a service I use is breached?', a: 'Change that password immediately. If you reused it anywhere else, change those too. Enable 2FA. Check the breach notification for what data was exposed.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Password Security: The Complete Guide', description: 'Everything you need to know about password security - threats, attacks, defences, and best practices.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/password-security-guide' }

export default function PasswordSecurityGuidePage() {
  useEffect(() => {
    document.title = 'Password Security: The Complete Guide | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'The complete guide to password security. Learn the real threats - phishing, credential stuffing, brute force - and the defences that actually work.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / Password Security: The Complete Guide
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full mb-4">
            <Lock className="h-3.5 w-3.5 text-purple-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Security - 8 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Password Security: The Complete Guide
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Understanding the threats tells you which defences matter. Most of what people worry about is not the real risk.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The three real threats</h2>

          <h3 className="text-xl font-black mt-6 mb-2">1. Phishing (the biggest one)</h3>
          <p className="text-muted-foreground">An attacker sends an email that looks legitimate, directing you to a fake login page. You enter your password - and it is captured. No amount of password strength protects against this.</p>
          <p className="text-muted-foreground">Defence: verify URLs before entering credentials. Use a password manager - it will not autofill on a lookalike domain. Prefer phishing-resistant 2FA (hardware keys).</p>

          <h3 className="text-xl font-black mt-6 mb-2">2. Credential stuffing (the multiplier)</h3>
          <p className="text-muted-foreground">Breaches happen constantly. When they do, leaked email/password pairs are tested automatically against hundreds of other services. If you reused that password, every account becomes compromised within minutes.</p>
          <p className="text-muted-foreground">Defence: never reuse passwords. This alone neutralises credential stuffing.</p>

          <h3 className="text-xl font-black mt-6 mb-2">3. Brute force and dictionary attacks</h3>
          <p className="text-muted-foreground">Direct attacks on your password itself. Brute force tries every combination; dictionary attacks try common words and patterns.</p>
          <p className="text-muted-foreground">Defence: length. A random 16-character password is effectively uncrackable. A password containing dictionary words is vulnerable regardless of length complexity.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Common myths</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Myth: complex passwords are stronger.</strong> Reality: length beats complexity. A 16-character lowercase password beats an 8-character mixed one.</li>
            <li><strong>Myth: change passwords every 90 days.</strong> Reality: NIST and NCSC both now advise against forced rotation. It leads to weaker passwords.</li>
            <li><strong>Myth: password strength meters on websites are reliable.</strong> Reality: many just check for symbols and length, ignoring the actual pattern. Entropy is the real metric.</li>
            <li><strong>Myth: a VPN protects your passwords.</strong> Reality: a VPN encrypts your traffic but does not protect against phishing or a compromised site.</li>
            <li><strong>Myth: incognito mode is secure.</strong> Reality: it just does not save local history. It offers no security against attackers.</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The defence stack</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong>Password manager</strong> - unique, random 16-24 character passwords everywhere. Non-negotiable.</li>
            <li><strong>Two-factor authentication</strong> - prefer apps or hardware keys. Enable on email and banking first.</li>
            <li><strong>Phishing awareness</strong> - verify URLs before entering credentials. Never click login links in emails.</li>
            <li><strong>Breach monitoring</strong> - check <span className="font-mono bg-muted px-2 py-1 rounded text-xs">haveibeenpwned.com</span> periodically.</li>
            <li><strong>Device security</strong> - OS updates, disk encryption, strong device login. If the device is compromised, passwords do not help.</li>
          </ol>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 my-6 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <strong className="text-amber-700 dark:text-amber-400">Critical warning:</strong> Never enter your main email password into any site you did not navigate to directly. Email is the master key - a compromised email means every password reset for every service is at risk.
            </div>
          </div>

          <h2 className="text-2xl font-black mt-8 mb-3">What to do this week</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Install a password manager (Bitwarden is free and excellent).</li>
            <li>Change your email password to a fresh 24-character random one - store it in the manager.</li>
            <li>Enable 2FA on email, banking, and your password manager itself.</li>
            <li>Use the manager to generate unique passwords for your top 10 accounts (start with banking, email, social, work).</li>
            <li>Check <span className="font-mono bg-muted px-2 py-1 rounded text-xs">haveibeenpwned.com</span> for your email - change passwords for any breached services.</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">Enterprise vs personal</h2>
          <p className="text-muted-foreground">For teams and organisations, add: SSO (single sign-on), hardware security keys for admins, password manager business plans with shared vaults, and security awareness training (especially phishing simulations).</p>
        </div>

        <div className="my-8">
          <Link to="/password-generator" className="block rounded-2xl border-2 border-purple-500/30 bg-purple-500/5 hover:border-purple-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-md"><Key className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-purple-500 transition-colors">Generate a secure password</h3>
                <p className="text-sm text-muted-foreground">Free, cryptographically strong, private.</p>
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
            <Link to="/blog/how-to-create-strong-password" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <BookOpen className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How to Create a Strong Password</h3>
              <p className="text-xs text-muted-foreground">Length, entropy, and passphrases.</p>
            </Link>
            <Link to="/blog/how-often-change-password" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Key className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">How Often Should I Change My Password?</h3>
              <p className="text-xs text-muted-foreground">The modern NIST guidance.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'Password Security: The Complete Guide'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only. Consult your organisation's security policy where applicable.
        </div>
      </div>
    </>
  )
}