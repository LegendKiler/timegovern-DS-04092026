import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ArrowRight, BookOpen, Key, Shield, RefreshCw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'Should I change my password every 90 days?', a: 'No. NIST and NCSC both updated their guidance: do not force rotation on a schedule. It causes people to pick predictable variations (Password1, Password2) which are weaker.' },
  { q: 'When should I change my password?', a: 'When you have evidence of a breach, when you shared it with someone you no longer trust, or when you used it on a device or network you no longer control.' },
  { q: 'What if a site forces me to rotate?', a: 'Follow the requirement, but use a password manager so you generate a completely new random password each time rather than a variation of the old one.' },
  { q: 'How do I know if my password has been breached?', a: 'Check haveibeenpwned.com - it tracks hundreds of known breaches. Also enable breach alerts in your password manager (Bitwarden, 1Password, and others offer this).' },
  { q: 'Should I change my email password more often?', a: 'Not on a schedule, but email is the master key - if there is any sign of compromise, change it immediately and rotate 2FA keys.' },
  { q: 'Does changing my password protect me from phishing?', a: 'No. If your password was phished, changing it helps only if you also stop entering credentials on the fake page. Prefer 2FA and verify URLs.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How Often Should I Change My Password?', description: 'The modern answer to a question everyone gets wrong. NIST and NCSC updated guidance explained.', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern' }, url: 'https://timegovern.com/blog/how-often-change-password' }

export default function HowOftenChangePasswordPage() {
  useEffect(() => {
    document.title = 'How Often Should I Change My Password? | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'NIST and NCSC say: do not change passwords on a schedule. Here is when you actually should - and why the old advice was wrong.'
    if (!meta.parentNode) document.head.appendChild(meta)
    setPageMeta()
  }, [])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />

      <div className="container mx-auto p-4 max-w-3xl space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary">Guides</Link> / How Often Should I Change My Password?
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full mb-4">
            <RefreshCw className="h-3.5 w-3.5 text-purple-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Security - 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            How Often Should I Change My Password?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            If you still think the answer is "every 90 days", you are following outdated advice that the experts no longer recommend.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-black mt-8 mb-3">The short answer</h2>
          <p className="text-muted-foreground text-lg"><strong>Do not change passwords on a schedule. Change them only when you have a reason to.</strong></p>
          <p className="text-muted-foreground">This is not just opinion - it is now the official position of both NIST (US) and NCSC (UK), the two most authoritative standards bodies in cybersecurity.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">Why the old advice was wrong</h2>
          <p className="text-muted-foreground">The "change every 90 days" rule came from 1990s-era IT thinking: if a password is compromised, forced rotation limits how long the attacker has access.</p>
          <p className="text-muted-foreground">In practice, it backfires. Faced with changing a 16-character random password every 90 days, users do one of two things:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li><strong>Increment.</strong> Password1 becomes Password2 becomes Password3.</li>
            <li><strong>Weaken.</strong> They stop using long random passwords and switch to short, memorable, weak ones.</li>
          </ul>
          <p className="text-muted-foreground">Both outcomes make passwords easier to crack. The forced-rotation policy actively harms security.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">What NIST now says</h2>
          <p className="text-muted-foreground">NIST SP 800-63B, the definitive US standard, now states:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Do not require periodic password rotation</li>
            <li>Do not require complexity rules (uppercase + number + symbol)</li>
            <li>Check new passwords against known breach lists</li>
            <li>Allow long passwords (at least 64 characters)</li>
            <li>Require rotation only when there is evidence of compromise</li>
          </ul>
          <p className="text-muted-foreground">NCSC (UK) published the same guidance. This is now global best practice.</p>

          <h2 className="text-2xl font-black mt-8 mb-3">When you SHOULD change your password</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong>The service was breached.</strong> If a site you use announces a breach, change that password immediately.</li>
            <li><strong>Your password appeared in a breach.</strong> Check haveibeenpwned.com or enable breach alerts in your password manager.</li>
            <li><strong>You shared it with someone</strong> you no longer trust (or ever).</li>
            <li><strong>You entered it into a suspicious page.</strong> Even if you caught the phishing mid-entry, change it.</li>
            <li><strong>You used it on a device or network you no longer control.</strong> Public computers, borrowed phones, work devices you have left.</li>
            <li><strong>Your password manager says so.</strong> Bitwarden, 1Password, and others will flag breached passwords and prompt rotation.</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">When you should NOT change it</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>A random schedule (90 days, 6 months, etc.)</li>
            <li>Because a website demands it (unfortunately some still do - comply with a random new one via your manager, never a variation of the old)</li>
            <li>Because you feel like it</li>
            <li>Because "it has been a while"</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">The exception: password manager master password</h2>
          <p className="text-muted-foreground">Your password manager's master password is special. It is the one password you must remember. For it:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Use a long passphrase (5-7 random words)</li>
            <li>Consider rotating every 1-2 years as a precaution</li>
            <li>Enable 2FA on the password manager account itself</li>
            <li>Write it down and store it in a physically secure location as a backup</li>
          </ul>

          <h2 className="text-2xl font-black mt-8 mb-3">What to do instead of rotating</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Use a password manager - unique random password for every account</li>
            <li>Enable 2FA everywhere - preferably apps or hardware keys over SMS</li>
            <li>Enable breach alerts in your password manager</li>
            <li>Check haveibeenpwned.com every 6 months</li>
            <li>Keep your devices and browsers updated</li>
          </ol>

          <h2 className="text-2xl font-black mt-8 mb-3">The bottom line</h2>
          <p className="text-muted-foreground">Changing passwords on a schedule is security theater. It feels safer but measurably weakens passwords because of how humans adapt to the burden.</p>
          <p className="text-muted-foreground">The real protection is: <strong>unique passwords everywhere + 2FA + breach monitoring</strong>. That combination defeats the actual threats - credential stuffing and phishing.</p>
          <p className="text-muted-foreground">If you are not yet using a password manager, that is your first move. Everything else follows from there. Generate strong passwords with our <Link to="/password-generator" className="text-primary font-bold hover:underline">Password Generator</Link>, then save them to a manager.</p>
        </div>

        <div className="my-8">
          <Link to="/password-generator" className="block rounded-2xl border-2 border-purple-500/30 bg-purple-500/5 hover:border-purple-500 p-6 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-md"><Key className="h-6 w-6 text-white" /></div>
              <div className="flex-1">
                <h3 className="font-black text-lg group-hover:text-purple-500 transition-colors">Need a new password?</h3>
                <p className="text-sm text-muted-foreground">Generate a cryptographically strong one instantly.</p>
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
              <p className="text-xs text-muted-foreground">Length, entropy, passphrases.</p>
            </Link>
            <Link to="/blog/password-security-guide" className="block rounded-xl border border-border bg-card hover:border-primary p-5 transition-colors">
              <Shield className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold mb-1">Password Security: The Complete Guide</h3>
              <p className="text-xs text-muted-foreground">Threats and defences explained.</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ShareButtons url={typeof window !== 'undefined' ? window.location.href : ''} title={typeof document !== 'undefined' ? document.title : 'How Often Should I Change My Password?'} />
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          <strong className="text-amber-700 dark:text-amber-400">Note:</strong> For informational purposes only. Follow your organisation's policy where applicable.
        </div>
      </div>
    </>
  )
}