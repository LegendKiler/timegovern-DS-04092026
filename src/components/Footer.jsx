import { Link } from 'react-router-dom'
import { Mail, Github, Youtube, Twitter, Shield, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import Logo from './Logo'

const COLUMNS = [
  {
    title: 'Sleep',
    links: [
      { to: '/sleep-tools', label: 'All Sleep Tools' },
      { to: '/sleep-debt-calculator', label: 'Sleep Debt Calculator' },
      { to: '/sleep-timer', label: 'Sleep Timer' },
      { to: '/caffeine-calculator', label: 'Caffeine Calculator' },
      { to: '/chronotype-quiz', label: 'Chronotype Quiz' },
    ],
  },
  {
    title: 'Time',
    links: [
      { to: '/time-tools', label: 'All Time Tools' },
      { to: '/time-zone-converter', label: 'Time Zone Converter' },
      { to: '/world-clock', label: 'World Clock' },
      { to: '/countdown-timer', label: 'Countdown Timer' },
      { to: '/pomodoro-timer', label: 'Pomodoro Timer' },
    ],
  },
  {
    title: 'Health & Productivity',
    links: [
      { to: '/health-tools', label: 'All Health Tools' },
      { to: '/bmi-calculator', label: 'BMI Calculator' },
      { to: '/age-calculator', label: 'Age Calculator' },
      { to: '/productivity-tools', label: 'Productivity Tools' },
      { to: '/word-counter', label: 'Word Counter' },
    ],
  },
  {
    title: 'More Tools',
    links: [
      { to: '/calculators', label: 'All Calculators' },
      { to: '/utility-tools', label: 'Utility Tools' },
      { to: '/unit-converter', label: 'Unit Converter' },
      { to: '/random-number-generator', label: 'Random Number' },
      { to: '/finance-tools', label: 'Finance Tools' },
      { to: '/math-tools', label: 'Math Tools' },
      { to: '/developer-tools', label: 'Developer Tools' },
      { to: '/lifestyle-tools', label: 'Lifestyle Tools' },
      { to: '/blog', label: 'Blog & Guides' },
    ],
  },
]

const LEGAL = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/support', label: 'Support' },
  { to: '/sitemap', label: 'Sitemap' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const year = new Date().getFullYear()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setSubscribed(true)
  }

  return (
    <footer className="border-t border-border bg-card mt-16">
      {/* Newsletter strip */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-black mb-1">New tools every week</h3>
              <p className="text-sm text-muted-foreground">Get notified when we add new calculators. No spam, unsubscribe anytime.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5" /> Subscribed. Thanks!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-full md:w-64"
                />
                <button type="submit" className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <Logo size={32} />
              <span className="text-lg font-black tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">time</span>
                <span className="text-foreground">govern</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Free sleep, time, health, and productivity tools. No signup, 100% private, works offline.
            </p>
            <div className="flex gap-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="mailto:hello@timegovern.com" aria-label="Email" className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-black uppercase tracking-widest text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {LEGAL.map((l) => (
                <Link key={l.to} to={l.to} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>&copy; {year} TimeGovern. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}