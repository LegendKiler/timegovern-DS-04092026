import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Code2, Sparkles, Clock, Calendar, Cloud, Moon, Timer, Zap, Crown, Save, Lock, Loader2, Star, Palette, Gift, ShieldCheck, Globe, X, ChevronRight, Layers, Users, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AnalogClockWidget from '../components/widgets/AnalogClockWidget'
import MultiCityWorldClockWidget from '../components/widgets/MultiCityWorldClockWidget'
import TimeZoneConverterWidget from '../components/widgets/TimeZoneConverterWidget'
import DigitalClockWidget from '../components/widgets/DigitalClockWidget'
import CountdownWidget from '../components/widgets/CountdownWidget'
import WeatherWidget from '../components/widgets/WeatherWidget'
import DaysUntilWidget from '../components/widgets/DaysUntilWidget'
import MoonPhaseWidget from '../components/widgets/MoonPhaseWidget'
import InfoTooltip from '../components/widgets/InfoTooltip'

const BASE = typeof window !== 'undefined' ? window.location.origin : 'https://timegovern.com'

const FREE_WIDGETS = [
  { id: 'clock', name: 'Analog Clock', tagline: 'Classic', desc: 'A beautiful analog clock for any timezone. Perfect for blogs, dashboards, and homepages.', icon: Clock, gradient: 'from-blue-500 to-cyan-500', glow: 'shadow-blue-500/20', build: (c) => <AnalogClockWidget accent={c.accent} theme={c.theme} size={140} tz={c.tz} city={c.city} />, defaultConfig: { theme: 'dark', accent: '#3b82f6', tz: 'Australia/Sydney', city: 'Sydney' }, embedPath: (c) => '/embed/clock?theme=' + c.theme + '&accent=' + encodeURIComponent(c.accent) + '&tz=' + encodeURIComponent(c.tz) + '&city=' + encodeURIComponent(c.city), params: 'theme · accent · tz · city · size' },
  { id: 'digital', name: 'Digital Clock', tagline: 'Minimal', desc: 'Crisp digital clock with 12/24-hour format and timezone support.', icon: Clock, gradient: 'from-emerald-500 to-teal-500', glow: 'shadow-emerald-500/20', build: (c) => <DigitalClockWidget accent={c.accent} theme={c.theme} tz={c.tz} city={c.city} format={c.format || '24h'} />, defaultConfig: { theme: 'dark', accent: '#10b981', tz: 'America/New_York', city: 'New York', format: '24h' }, embedPath: (c) => '/embed/digital?theme=' + c.theme + '&accent=' + encodeURIComponent(c.accent) + '&tz=' + encodeURIComponent(c.tz) + '&city=' + encodeURIComponent(c.city) + '&format=' + (c.format || '24h'), params: 'theme · accent · tz · city · format' },
  { id: 'world-clock', name: 'World Clock', tagline: 'Multi-City', desc: 'Show live times for up to 6 cities at once. Ideal for global teams.', icon: Globe, gradient: 'from-sky-500 to-blue-500', glow: 'shadow-sky-500/20', build: (c) => <MultiCityWorldClockWidget accent={c.accent} theme={c.theme} cities={c.cities || 'Sydney,London,New York,Tokyo,Dubai'} />, defaultConfig: { theme: 'dark', accent: '#0ea5e9', cities: 'Sydney,London,New York,Tokyo,Dubai' }, embedPath: (c) => '/embed/world-clock?theme=' + c.theme + '&accent=' + encodeURIComponent(c.accent) + '&cities=' + encodeURIComponent(c.cities || 'Sydney,London,New York,Tokyo,Dubai'), params: 'theme · accent · cities' },
  { id: 'timezone', name: 'Time Zone Converter', tagline: 'Interactive', desc: 'Pick two cities and see live conversion with the exact time difference.', icon: Layers, gradient: 'from-violet-500 to-purple-500', glow: 'shadow-violet-500/20', build: (c) => <TimeZoneConverterWidget accent={c.accent} theme={c.theme} from={c.from || 'Sydney'} to={c.to || 'London'} />, defaultConfig: { theme: 'dark', accent: '#8b5cf6', from: 'Sydney', to: 'London' }, embedPath: (c) => '/embed/timezone?theme=' + c.theme + '&accent=' + encodeURIComponent(c.accent) + '&from=' + encodeURIComponent(c.from || 'Sydney') + '&to=' + encodeURIComponent(c.to || 'London'), params: 'theme · accent · from · to · format' },
  { id: 'countdown', name: 'Countdown Timer', tagline: 'Event', desc: 'Live countdown to any date. Perfect for product launches and sales.', icon: Timer, gradient: 'from-pink-500 to-rose-500', glow: 'shadow-pink-500/20', build: (c) => <CountdownWidget accent={c.accent} theme={c.theme} target={c.target || '2027-01-01T00:00:00'} label={c.label || 'New Year 2027'} />, defaultConfig: { theme: 'dark', accent: '#ec4899', target: '2027-01-01T00:00:00', label: 'New Year 2027' }, embedPath: (c) => '/embed/countdown?theme=' + c.theme + '&accent=' + encodeURIComponent(c.accent) + '&target=' + encodeURIComponent(c.target || '2027-01-01T00:00:00') + '&label=' + encodeURIComponent(c.label || 'New Year 2027'), params: 'theme · accent · target · label' },
  { id: 'weather', name: 'Weather Card', tagline: 'Live', desc: 'Real-time weather for any city. Auto-updates every hour.', icon: Cloud, gradient: 'from-cyan-500 to-sky-500', glow: 'shadow-cyan-500/20', build: (c) => <WeatherWidget accent={c.accent} theme={c.theme} city={c.city} lat={c.lat || -33.8688} lon={c.lon || 151.2093} />, defaultConfig: { theme: 'dark', accent: '#06b6d4', city: 'London', lat: 51.5074, lon: -0.1278 }, embedPath: (c) => '/embed/weather?theme=' + c.theme + '&accent=' + encodeURIComponent(c.accent) + '&city=' + encodeURIComponent(c.city) + '&lat=' + (c.lat || 51.5074) + '&lon=' + (c.lon || -0.1278), params: 'theme · accent · city · lat · lon' },
]

const PRO_WIDGETS = [
  { id: 'days-until', name: 'Days Until', tagline: 'Countdown', desc: 'Days remaining until any event. Beautiful for weddings, holidays, and launches.', icon: Calendar, gradient: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/20', build: (c) => <DaysUntilWidget accent={c.accent} theme={c.theme} target={c.target || '2027-01-01'} event={c.event || 'New Year'} emoji={c.emoji || '🎉'} />, defaultConfig: { theme: 'dark', accent: '#f59e0b', target: '2027-01-01', event: 'New Year', emoji: '🎉' }, embedPath: (c) => '/embed/days-until?theme=' + c.theme + '&accent=' + encodeURIComponent(c.accent) + '&target=' + encodeURIComponent(c.target || '2027-01-01') + '&event=' + encodeURIComponent(c.event || 'New Year') + '&emoji=' + encodeURIComponent(c.emoji || '🎉'), params: 'theme · accent · target · event · emoji' },
  { id: 'moon', name: 'Moon Phase', tagline: 'Astronomy', desc: 'Current moon phase with daily updates. Ideal for wellness and astronomy sites.', icon: Moon, gradient: 'from-indigo-500 to-violet-500', glow: 'shadow-indigo-500/20', build: (c) => <MoonPhaseWidget accent={c.accent} theme={c.theme} />, defaultConfig: { theme: 'dark', accent: '#a78bfa' }, embedPath: (c) => '/embed/moon?theme=' + c.theme + '&accent=' + encodeURIComponent(c.accent), params: 'theme · accent' },
]

function WidgetCard({ widget, isPro, isUserPro }) {
  const [copied, setCopied] = useState(null)
  const [showCode, setShowCode] = useState(false)
  const [config, setConfig] = useState(widget.defaultConfig)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const { user, saveWidget } = useAuth()
  const navigate = useNavigate()
  const Icon = widget.icon

  const locked = isPro && !isUserPro
  const canCustomizeColor = isUserPro

  const basePath = widget.embedPath(config)
  const freeEmbedUrl = BASE + basePath + (basePath.includes('?') ? '&' : '?') + 'branded=1'
  const freeEmbedCode = '<iframe src="' + freeEmbedUrl + '" width="320" height="240" frameborder="0" style="border-radius:12px;overflow:hidden"></iframe>'
  const proEmbedUrl = BASE + basePath
  const proEmbedCode = '<iframe src="' + proEmbedUrl + '" width="320" height="240" frameborder="0" style="border-radius:12px;overflow:hidden"></iframe>'

  const copyCode = async (which) => {
    if (locked) return
    const code = which === 'pro' ? proEmbedCode : freeEmbedCode
    try { await navigator.clipboard.writeText(code); setCopied(which); setTimeout(() => setCopied(null), 2000) } catch {}
  }

  const handleSave = async () => {
    if (locked) return navigate('/pricing')
    if (!user) return navigate('/auth')
    setSaving(true)
    const { error } = await saveWidget({ name: widget.name + ' - ' + (config.city || config.label || config.event || 'Custom'), type: widget.id, config })
    setSaving(false)
    if (error) alert(error.message)
    else { setSaved(true); setTimeout(() => setSaved(false), 2500) }
  }

  const activeIsPro = isUserPro && isPro

  return (
    <div className="group relative">
      {/* Glow effect on hover */}
      <div className={'absolute -inset-0.5 bg-gradient-to-r ' + widget.gradient + ' rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500'}></div>

      <Card className={'relative overflow-hidden rounded-2xl border-2 transition-all duration-300 bg-card h-full flex flex-col ' + (isPro ? 'border-amber-500/30 hover:border-amber-500/60' : 'border-emerald-500/20 hover:border-emerald-500/50')}>

        {/* Top gradient bar */}
        <div className={'h-1.5 bg-gradient-to-r ' + widget.gradient}></div>

        {/* Tier ribbon */}
        <div className={'absolute top-5 right-5 z-10 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl flex items-center gap-1 ' + (isPro ? 'bg-gradient-to-r from-amber-500 to-orange-500 ring-2 ring-amber-300/50' : 'bg-gradient-to-r from-emerald-500 to-teal-500 ring-2 ring-emerald-300/50')}>
          {isPro ? <><Crown className="h-3 w-3" /> Pro</> : <><Gift className="h-3 w-3" /> Free</>}
        </div>

        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <div className={'p-3.5 rounded-2xl bg-gradient-to-br ' + widget.gradient + ' shadow-xl ' + widget.glow + ' shrink-0'}>
              <Icon className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0 pr-20">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">{widget.tagline}</div>
              <h3 className="font-black text-lg leading-tight flex items-center gap-2">
                <span className="truncate">{widget.name}</span>
                <InfoTooltip position="right">
                  <p className="font-bold text-sm mb-2">How to embed</p>
                  <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal list-inside">
                    <li>Click <strong>Copy</strong> below</li>
                    <li>Paste the iframe HTML into your site</li>
                    <li>Customize with URL params: {widget.params}</li>
                  </ol>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                    {isPro && !isUserPro ? 'Locked - upgrade to unlock.' : isPro ? 'Pro embed - no branding.' : 'Free embed - includes small "Powered by timegovern.com" link.'}
                  </p>
                </InfoTooltip>
              </h3>
            </div>
          </div>

          {/* Preview */}
          <div className="relative rounded-2xl mb-5 overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="relative p-8 flex items-center justify-center min-h-[220px]">
              <div className={'scale-90 ' + (locked ? 'blur-md opacity-40 pointer-events-none select-none' : '')}>{widget.build(config)}</div>
              {locked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md rounded-2xl">
                  <div className="p-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-2xl mb-3">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-black mb-3">Unlock with Pro</p>
                  <Link to="/pricing">
                    <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl">
                      <Crown className="h-3.5 w-3.5 mr-1.5" /> Upgrade Now
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{widget.desc}</p>

          {/* Customize controls */}
          <div className="space-y-3 mb-5">
            <div className="flex gap-2">
              <button onClick={() => !locked && setConfig({ ...config, theme: 'light' })} disabled={locked}
                className={'flex-1 px-3 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ' + (config.theme === 'light' ? 'bg-primary text-white border-primary shadow-lg scale-[1.02]' : 'bg-muted border-transparent hover:border-border') + (locked ? ' opacity-50' : '')}>
                ☀️ Light
              </button>
              <button onClick={() => !locked && setConfig({ ...config, theme: 'dark' })} disabled={locked}
                className={'flex-1 px-3 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ' + (config.theme === 'dark' ? 'bg-primary text-white border-primary shadow-lg scale-[1.02]' : 'bg-muted border-transparent hover:border-border') + (locked ? ' opacity-50' : '')}>
                🌙 Dark
              </button>
            </div>

            {canCustomizeColor && !locked ? (
              <div className="flex items-center gap-2 p-2 rounded-xl bg-muted/50 border border-border">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <input type="color" value={config.accent} onChange={(e) => setConfig({ ...config, accent: e.target.value })} className="h-8 w-full rounded-lg cursor-pointer border-0 bg-transparent" />
                <span className="text-[10px] font-mono text-muted-foreground">{config.accent}</span>
              </div>
            ) : (
              <Link to="/pricing" className="flex items-center gap-2 text-xs bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-700 dark:text-amber-400 p-3 rounded-xl border border-amber-500/30 hover:border-amber-500/60 transition-colors">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                <span className="flex-1 font-semibold">Custom colors & no branding on Pro</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="mt-auto space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <Button onClick={() => setShowCode(!showCode)} disabled={locked} variant="outline" className="h-11 border-2">
                <Code2 className="h-4 w-4 mr-1.5" /> <span className="text-xs">Code</span>
              </Button>
              <Button onClick={() => copyCode(activeIsPro ? 'pro' : 'free')} disabled={locked}
                className={'h-11 col-span-2 bg-gradient-to-r ' + widget.gradient + ' hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-shadow' + (locked ? ' opacity-50 cursor-not-allowed' : '')}>
                {copied ? <><Check className="h-4 w-4 mr-1.5" /> Copied!</> : <><Copy className="h-4 w-4 mr-1.5" /> Copy embed</>}
              </Button>
            </div>

            <Button onClick={handleSave} disabled={saving || locked}
              className="w-full h-11 bg-gradient-to-r from-slate-700 to-slate-900 hover:opacity-90 text-white shadow-lg disabled:opacity-50">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : saved ? <Check className="h-4 w-4 mr-2 text-emerald-400" /> : <Save className="h-4 w-4 mr-2" />}
              {saving ? 'Saving...' : saved ? 'Saved to my widgets!' : locked ? 'Upgrade to save' : 'Save to my widgets'}
            </Button>
          </div>

          {showCode && !locked && (
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Gift className="h-3 w-3" /> Free embed
                  </span>
                  <button onClick={() => copyCode('free')} className="text-xs text-primary hover:underline font-semibold">
                    {copied === 'free' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="bg-slate-950 text-emerald-300 rounded-xl p-3 overflow-x-auto border-2 border-slate-800">
                  <pre className="text-xs leading-relaxed whitespace-pre-wrap break-all font-mono">{freeEmbedCode}</pre>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Includes "Powered by timegovern.com" link.</p>
              </div>

              {isUserPro && isPro && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Crown className="h-3 w-3" /> Pro embed (no branding)
                    </span>
                    <button onClick={() => copyCode('pro')} className="text-xs text-primary hover:underline font-semibold">
                      {copied === 'pro' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-slate-950 text-amber-300 rounded-xl p-3 overflow-x-auto border-2 border-amber-900/30">
                    <pre className="text-xs leading-relaxed whitespace-pre-wrap break-all font-mono">{proEmbedCode}</pre>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">No "Powered by" link.</p>
                </div>
              )}

              {!isUserPro && (
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-700 dark:text-amber-400 p-3 rounded-xl text-xs border border-amber-500/30 flex items-center gap-2">
                  <Crown className="h-4 w-4 shrink-0" />
                  <span className="flex-1 font-medium">Upgrade to Pro to remove "Powered by" branding.</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function WidgetsPage() {
  const { user, premiumTier } = useAuth()
  const isUserPro = premiumTier === 'pro' || premiumTier === 'premium'

  return (
    <div className="container mx-auto p-4 max-w-7xl">

      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl mb-10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950"></div>
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(168,85,247,0.6) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99,102,241,0.6) 0%, transparent 50%)' }}></div>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

        <div className="relative z-10 p-8 md:p-14 text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="h-3.5 w-3.5 text-purple-300" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-200">Free Embeddable Widgets</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-[1.05]">
            Beautiful widgets<br />
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">for any website</span>
          </h1>
          <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed mb-8">
            Live clocks, weather, countdowns, and more. Copy one line of HTML and paste it on WordPress, Shopify, Wix, or any site. Free forever.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Gift className="h-4 w-4 text-emerald-300" />
                <span className="text-2xl md:text-3xl font-black">8</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">Widgets</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-amber-300" />
                <span className="text-2xl md:text-3xl font-black">1 line</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">To embed</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-cyan-300" />
                <span className="text-2xl md:text-3xl font-black">Live</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">Updates</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="h-4 w-4 text-purple-300" />
                <span className="text-2xl md:text-3xl font-black">$0</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">Forever</div>
            </div>
          </div>
        </div>
      </div>

      {/* ACCOUNT BANNER */}
      {user ? (
        <Card className="mb-8 border-2 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
          <CardContent className="relative p-5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">Your plan</span>
                  <span className={'text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ' + (isUserPro ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white' : 'bg-muted text-muted-foreground')}>{premiumTier}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {premiumTier === 'free' ? 'Save up to 3 widgets. Upgrade to Pro for unlimited + no branding.' : premiumTier === 'pro' ? 'Unlimited widgets + no branding unlocked.' : 'White-label + custom domain + team seats unlocked.'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/my-widgets"><Button variant="outline" size="sm" className="h-10"><Save className="h-3.5 w-3.5 mr-1.5" /> My Widgets</Button></Link>
              {premiumTier === 'free' && (
                <Link to="/pricing"><Button size="sm" className="h-10 bg-gradient-to-r from-amber-500 to-yellow-400 text-white shadow-lg"><Crown className="h-3.5 w-3.5 mr-1.5" /> Upgrade</Button></Link>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8 border-2 shadow-xl overflow-hidden">
          <CardContent className="p-5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold">Sign in to save your widgets</p>
                <p className="text-xs text-muted-foreground mt-0.5">Free account = 3 saved widgets. Pro = unlimited.</p>
              </div>
            </div>
            <Link to="/auth"><Button className="h-10 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">Sign in free</Button></Link>
          </CardContent>
        </Card>
      )}

      {/* FREE SECTION */}
      <section className="mb-14">
        <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-xl shadow-emerald-500/20">
              <Gift className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">Free Widgets</h2>
              <p className="text-sm text-muted-foreground">Always free — includes a small "Powered by timegovern.com" link.</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/30">{FREE_WIDGETS.length} widgets</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {FREE_WIDGETS.map(w => <WidgetCard key={w.id} widget={w} isPro={false} isUserPro={isUserPro} />)}
        </div>
      </section>

      {/* PRO SECTION */}
      <section className="mb-14">
        <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-xl shadow-amber-500/20">
              <Crown className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-black tracking-tight">Pro Widgets</h2>
                <span className={'text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest text-white ' + (isUserPro ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500')}>
                  {isUserPro ? 'Unlocked' : 'Locked'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{isUserPro ? 'Available on your plan — customize and embed freely.' : 'Unlock with Pro — plus custom colors, no branding, and full analytics.'}</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-full border border-amber-500/30">{PRO_WIDGETS.length} widgets</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PRO_WIDGETS.map(w => <WidgetCard key={w.id} widget={w} isPro={true} isUserPro={isUserPro} />)}
          {!isUserPro && (
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
              <Card className="relative overflow-hidden rounded-2xl border-2 border-amber-500/50 h-full">
                <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
                  <div className="p-5 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-2xl mb-5 relative">
                    <Crown className="h-10 w-10 text-white" strokeWidth={2.5} />
                    <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-20"></div>
                  </div>
                  <h3 className="font-black text-2xl mb-2">Unlock more with Pro</h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-xs">Everything unlocked for $4.99/month. Cancel anytime.</p>
                  <ul className="text-sm space-y-2 mb-6 text-left w-full max-w-xs">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500 shrink-0" /> All 8 widgets unlocked</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500 shrink-0" /> Unlimited saved widgets</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500 shrink-0" /> Custom accent colors</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500 shrink-0" /> Remove "Powered by" branding</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500 shrink-0" /> Full analytics + CSV</li>
                  </ul>
                  <Link to="/pricing" className="w-full max-w-xs">
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:opacity-90 text-white font-bold h-12 shadow-xl">
                      <Crown className="h-4 w-4 mr-2" /> Upgrade to Pro — $4.99/mo
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-3">14-day free trial · Cancel anytime</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="mb-10">
        <Card className="border-2 shadow-xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-amber-500 to-purple-500"></div>
          <CardContent className="p-6 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-xl">
                <ShieldCheck className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-black">Compare plans</h2>
                <p className="text-sm text-muted-foreground">Everything you get — at a glance</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left py-4 px-4 font-bold">Feature</th>
                    <th className="text-center py-4 px-4 font-bold w-28">
                      <div className="flex items-center justify-center gap-1.5"><Gift className="h-3.5 w-3.5 text-emerald-500" /> Free</div>
                    </th>
                    <th className="text-center py-4 px-4 font-bold w-28 bg-amber-500/10">
                      <div className="flex items-center justify-center gap-1.5"><Crown className="h-3.5 w-3.5 text-amber-500" /> Pro</div>
                    </th>
                    <th className="text-center py-4 px-4 font-bold w-28">
                      <div className="flex items-center justify-center gap-1.5"><Star className="h-3.5 w-3.5 text-purple-500" /> Premium</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border/50"><td className="py-3.5 px-4">Widget types</td><td className="text-center font-bold">6</td><td className="text-center font-bold bg-amber-500/5">8</td><td className="text-center font-bold">8+</td></tr>
                  <tr className="border-t border-border/50 bg-muted/20"><td className="py-3.5 px-4">Saved widgets</td><td className="text-center font-bold">3</td><td className="text-center font-bold bg-amber-500/5 text-amber-600">Unlimited</td><td className="text-center font-bold text-purple-600">Unlimited</td></tr>
                  <tr className="border-t border-border/50"><td className="py-3.5 px-4">Monthly views</td><td className="text-center font-bold text-emerald-600">Unlimited</td><td className="text-center font-bold bg-amber-500/5 text-emerald-600">Unlimited</td><td className="text-center font-bold text-emerald-600">Unlimited</td></tr>
                  <tr className="border-t border-border/50 bg-muted/20"><td className="py-3.5 px-4">Light / Dark theme</td><td className="text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td><td className="text-center bg-amber-500/5"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td><td className="text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td></tr>
                  <tr className="border-t border-border/50"><td className="py-3.5 px-4">Custom accent color</td><td className="text-center"><X className="h-4 w-4 text-muted-foreground mx-auto" /></td><td className="text-center bg-amber-500/5"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td><td className="text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td></tr>
                  <tr className="border-t border-border/50 bg-muted/20"><td className="py-3.5 px-4">Remove branding</td><td className="text-center"><X className="h-4 w-4 text-muted-foreground mx-auto" /></td><td className="text-center bg-amber-500/5"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td><td className="text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td></tr>
                  <tr className="border-t border-border/50"><td className="py-3.5 px-4">Add your own logo</td><td className="text-center"><X className="h-4 w-4 text-muted-foreground mx-auto" /></td><td className="text-center bg-amber-500/5"><X className="h-4 w-4 text-muted-foreground mx-auto" /></td><td className="text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td></tr>
                  <tr className="border-t border-border/50 bg-muted/20"><td className="py-3.5 px-4">Full analytics + CSV</td><td className="text-center"><X className="h-4 w-4 text-muted-foreground mx-auto" /></td><td className="text-center bg-amber-500/5"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td><td className="text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td></tr>
                  <tr className="border-t border-border/50"><td className="py-3.5 px-4">Custom domain embed</td><td className="text-center"><X className="h-4 w-4 text-muted-foreground mx-auto" /></td><td className="text-center bg-amber-500/5"><X className="h-4 w-4 text-muted-foreground mx-auto" /></td><td className="text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td></tr>
                  <tr className="border-t border-border/50 bg-muted/20"><td className="py-3.5 px-4">REST API access</td><td className="text-center"><X className="h-4 w-4 text-muted-foreground mx-auto" /></td><td className="text-center bg-amber-500/5"><X className="h-4 w-4 text-muted-foreground mx-auto" /></td><td className="text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td></tr>
                  <tr className="border-t border-border/50"><td className="py-3.5 px-4">Team seats</td><td className="text-center font-bold">1</td><td className="text-center font-bold bg-amber-500/5">1</td><td className="text-center font-bold text-purple-600">5</td></tr>
                  <tr className="border-t-2 border-border bg-gradient-to-r from-muted/50 to-muted/30">
                    <td className="py-4 px-4 font-black text-base">Price</td>
                    <td className="text-center font-black text-base text-emerald-600">$0</td>
                    <td className="text-center font-black text-base bg-amber-500/10 text-amber-600">$4.99/mo</td>
                    <td className="text-center font-black text-base text-purple-600">$9.99/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {!isUserPro && (
              <div className="mt-8 flex justify-center">
                <Link to="/pricing">
                  <Button className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:opacity-90 text-white font-bold h-12 px-10 shadow-xl">
                    <Crown className="h-5 w-5 mr-2" /> View all plans & upgrade
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* HOW TO EMBED */}
      <section>
        <Card className="border-2 shadow-xl overflow-hidden">
          <CardContent className="p-6 md:p-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-xl">
                <Code2 className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-black">How to embed on any website</h2>
                <p className="text-sm text-muted-foreground">Works on WordPress, Shopify, Wix, Squarespace, Webflow, Blogger, and any HTML site.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 mb-10">
              <div className="relative p-6 rounded-2xl border-2 border-border bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-black text-xl flex items-center justify-center mb-4 shadow-xl">1</div>
                <h3 className="font-black text-lg mb-2">Customize</h3>
                <p className="text-sm text-muted-foreground">Pick light/dark theme, custom color (Pro+), and the cities or settings you want.</p>
              </div>
              <div className="relative p-6 rounded-2xl border-2 border-border bg-gradient-to-br from-purple-500/5 to-pink-500/5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white font-black text-xl flex items-center justify-center mb-4 shadow-xl">2</div>
                <h3 className="font-black text-lg mb-2">Copy the code</h3>
                <p className="text-sm text-muted-foreground">Click <strong>Copy embed</strong> to grab the iframe HTML. It works everywhere.</p>
              </div>
              <div className="relative p-6 rounded-2xl border-2 border-border bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-black text-xl flex items-center justify-center mb-4 shadow-xl">3</div>
                <h3 className="font-black text-lg mb-2">Paste anywhere</h3>
                <p className="text-sm text-muted-foreground">In HTML mode, a Custom HTML block, or a code widget on your site builder.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                    <Gift className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-black text-lg text-emerald-700 dark:text-emerald-400">Free embeds</h3>
                </div>
                <ul className="space-y-2.5 text-sm">
                  <li className="flex gap-2 items-start"><Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> <span>6 widget types available</span></li>
                  <li className="flex gap-2 items-start"><Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> <span>Unlimited views</span></li>
                  <li className="flex gap-2 items-start"><Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> <span>Light & dark themes</span></li>
                  <li className="flex gap-2 items-start"><X className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" /> <span className="text-muted-foreground">Small "Powered by timegovern.com" link</span></li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-black text-lg text-amber-700 dark:text-amber-400">Pro embeds ($4.99/mo)</h3>
                </div>
                <ul className="space-y-2.5 text-sm">
                  <li className="flex gap-2 items-start"><Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> <span>No "Powered by" branding</span></li>
                  <li className="flex gap-2 items-start"><Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> <span>Custom accent colors</span></li>
                  <li className="flex gap-2 items-start"><Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> <span>All 8 widgets unlocked</span></li>
                  <li className="flex gap-2 items-start"><Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> <span>Full analytics + CSV export</span></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-5 bg-slate-950 dark:bg-slate-950 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Example — embed a Sydney clock on your blog</p>
                <span className="text-[10px] text-emerald-400 font-mono">HTML</span>
              </div>
              <pre className="text-xs whitespace-pre-wrap break-all font-mono text-emerald-300 leading-relaxed">{'<iframe src="' + BASE + '/embed/clock?theme=dark&tz=Australia/Sydney&city=Sydney&branded=1" width="220" height="240" frameborder="0" style="border-radius:12px;overflow:hidden"></iframe>'}</pre>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-muted/30 border border-border text-center">
                <p className="text-xs font-black mb-0.5">WordPress</p>
                <p className="text-[10px] text-muted-foreground">Custom HTML block</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border text-center">
                <p className="text-xs font-black mb-0.5">Shopify</p>
                <p className="text-[10px] text-muted-foreground">Custom Liquid block</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border text-center">
                <p className="text-xs font-black mb-0.5">Wix / Squarespace</p>
                <p className="text-[10px] text-muted-foreground">Embed element</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border text-center">
                <p className="text-xs font-black mb-0.5">Any HTML site</p>
                <p className="text-[10px] text-muted-foreground">Paste in page</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}