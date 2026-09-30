import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Trash2, Code2, Loader2, Plus, Crown, Clock, Calendar, Cloud, Moon, Timer, AlertCircle } from 'lucide-react'

const ICONS = { clock: Clock, digital: Clock, countdown: Timer, weather: Cloud, 'days-until': Calendar, moon: Moon }
const GRADIENTS = {
  clock: 'from-blue-500 to-cyan-500',
  digital: 'from-emerald-500 to-teal-500',
  countdown: 'from-purple-500 to-pink-500',
  weather: 'from-cyan-500 to-blue-500',
  'days-until': 'from-amber-500 to-orange-500',
  moon: 'from-indigo-500 to-purple-500',
}

const BASE = typeof window !== 'undefined' ? window.location.origin : 'https://timegovern.com'

function buildEmbedUrl(type, config) {
  const c = config || {}
  const q = new URLSearchParams()
  if (c.theme) q.set('theme', c.theme)
  if (c.accent) q.set('accent', c.accent)
  if (c.tz) q.set('tz', c.tz)
  if (c.city) q.set('city', c.city)
  if (c.target) q.set('target', c.target)
  if (c.label) q.set('label', c.label)
  if (c.event) q.set('event', c.event)
  if (c.emoji) q.set('emoji', c.emoji)
  if (c.format) q.set('format', c.format)
  if (c.lat) q.set('lat', c.lat)
  if (c.lon) q.set('lon', c.lon)
  return BASE + '/embed/' + type + '?' + q.toString()
}

const PRO_WIDGET_TYPES = ['days-until', 'moon']
export default function MyWidgetsPage() {
  const navigate = useNavigate()
  const { user, getWidgets, deleteWidget, premiumTier, widgetLimit } = useAuth()
  const [widgets, setWidgets] = useState([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState(null)
  const [showCodeId, setShowCodeId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) { setLoading(false); return }
    load()
  }, [user])

  const load = async () => {
    setLoading(true)
    const { data, error } = await getWidgets()
    setLoading(false)
    if (error) setError(error.message)
    else setWidgets(data)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this widget?')) return
    const { error } = await deleteWidget(id)
    if (!error) setWidgets(widgets.filter(w => w.id !== id))
  }

  const copy = async (id, code) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {}
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <Card className="text-center p-12 border-0 shadow-2xl bg-gradient-to-br from-primary/10 via-card to-secondary/10">
          <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">Sign in to manage your saved widgets.</p>
          <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-primary to-secondary text-white">Sign In</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">My Widgets</h1>
          <p className="text-sm text-muted-foreground">
            {widgets.length} of {widgetLimit === 999 ? '∞' : widgetLimit} widgets used
            {premiumTier === 'free' && ' · Upgrade to Pro for unlimited'}
          </p>
        </div>
        <Link to="/widgets">
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
            <Plus className="h-4 w-4 mr-2" /> Create new widget
          </Button>
        </Link>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 dark:bg-red-950/30 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm border border-red-200">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
        </div>
      )}

      {!loading && widgets.length === 0 && (
        <Card className="border-dashed border-2">
          <CardContent className="p-16 text-center">
            <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-5 shadow-xl">
              <Code2 className="h-14 w-14 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No widgets yet</h3>
            <p className="text-muted-foreground mb-6">Create your first widget and copy its embed code.</p>
            <Link to="/widgets"><Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white h-11">Browse widgets</Button></Link>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {widgets.map(w => {
          const Icon = ICONS[w.widget_type] || Clock
          const gradient = GRADIENTS[w.widget_type] || 'from-blue-500 to-cyan-500'
          const embedUrl = buildEmbedUrl(w.widget_type, w.config)
          const embedCode = '<iframe src="' + embedUrl + '" width="320" height="240" frameborder="0" style="border-radius:12px;overflow:hidden"></iframe>'

          return (
            <Card key={w.id} className="overflow-hidden border shadow-md hover:shadow-xl transition bg-card">
              <div className={'h-1.5 bg-gradient-to-r ' + gradient}></div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={'p-3 rounded-xl bg-gradient-to-br ' + gradient + ' shadow-lg'}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base leading-tight line-clamp-1 flex items-center gap-1.5">{w.name} {PRO_WIDGET_TYPES.includes(w.widget_type) ? <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-500 to-orange-500 text-white">PRO</span> : <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-gradient-to-r from-emerald-500 to-teal-500 text-white">FREE</span>}</h3>
                      <p className="text-xs text-muted-foreground capitalize">{w.widget_type.replace('-', ' ')}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-muted uppercase">
                    {w.config?.theme || 'dark'}
                  </span>
                </div>

                {/* Live preview link */}
                <a href={embedUrl} target="_blank" rel="noopener noreferrer" className="block mb-4">
                  <div className="bg-muted/30 rounded-lg border border-border p-4 text-center hover:bg-muted/50 transition">
                    <p className="text-xs text-muted-foreground">Click to preview in new tab</p>
                    <p className="text-xs text-primary font-mono mt-1 truncate">{embedUrl.replace(BASE, '')}</p>
                  </div>
                </a>

                <div className="flex gap-2">
                  <Button onClick={() => copy(w.id, embedCode)} variant="outline" className="flex-1 h-10">
                    {copiedId === w.id ? <><Check className="h-4 w-4 mr-1.5 text-emerald-500" /> Copied</> : <><Copy className="h-4 w-4 mr-1.5" /> Copy code</>}
                  </Button>
                  <Button onClick={() => setShowCodeId(showCodeId === w.id ? null : w.id)} variant="outline" className="h-10 px-3">
                    <Code2 className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => handleDelete(w.id)} variant="outline" className="h-10 px-3 text-red-500 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {showCodeId === w.id && (
                  <div className="mt-3 bg-slate-950 text-slate-100 rounded-lg p-3 overflow-x-auto border border-slate-800">
                    <pre className="text-xs whitespace-pre-wrap break-all font-mono">{embedCode}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Upgrade CTA for Free users */}
      {premiumTier === 'free' && widgets.length >= 2 && (
        <Card className="mt-6 border-0 shadow-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10">
          <CardContent className="p-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Crown className="h-8 w-8 text-amber-500" />
              <div>
                <p className="font-bold">You've reached the Free plan limit</p>
                <p className="text-sm text-muted-foreground">Upgrade to Pro for unlimited widgets + custom colors.</p>
              </div>
            </div>
            <Link to="/pricing"><Button className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white h-11">Upgrade to Pro</Button></Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}