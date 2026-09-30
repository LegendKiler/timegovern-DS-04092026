import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Trash2, AlertCircle, Calculator, Crown, ExternalLink, Home, Landmark, Coins, Clock, FileText, Calendar, Save, Pencil, Check, X, Percent, TrendingUp } from 'lucide-react'

const TYPE_LABELS = {
  mortgage: { label: 'Mortgage', icon: Home, gradient: 'from-emerald-500 to-teal-500' },
  offset: { label: 'Offset', icon: Coins, gradient: 'from-violet-500 to-purple-500' },
  'stamp-duty': { label: 'Stamp Duty', icon: Landmark, gradient: 'from-orange-500 to-amber-500' },
  lmi: { label: 'LMI', icon: Landmark, gradient: 'from-blue-500 to-indigo-500' },
  'novated-lease': { label: 'Novated Lease', icon: Coins, gradient: 'from-cyan-500 to-blue-500' },
  'extra-repayment': { label: 'Extra Repayment', icon: Coins, gradient: 'from-lime-500 to-green-500' },
  'borrowing-power': { label: 'Borrowing Power', icon: Calculator, gradient: 'from-amber-500 to-orange-500' },
  'interest-only': { label: 'Interest-Only', icon: Landmark, gradient: 'from-pink-500 to-rose-500' },
  'first-home-guarantee': { label: 'First Home Guarantee', icon: Home, gradient: 'from-teal-500 to-emerald-500' },
  'split-loan': { label: 'Split Loan', icon: Calculator, gradient: 'from-slate-500 to-slate-700' },
  refinance: { label: 'Refinance', icon: Landmark, gradient: 'from-indigo-500 to-purple-500' },
  biweekly: { label: 'Bi-Weekly', icon: Calendar, gradient: 'from-cyan-500 to-blue-500' },
  fha: { label: 'FHA Loan', icon: Home, gradient: 'from-emerald-500 to-teal-500' },
  va: { label: 'VA Loan', icon: Home, gradient: 'from-blue-700 to-indigo-700' },
  pmi: { label: 'PMI', icon: AlertCircle, gradient: 'from-red-500 to-rose-500' },
  'property-tax': { label: 'Property Tax', icon: Landmark, gradient: 'from-orange-500 to-amber-500' },
  'rent-vs-buy': { label: 'Rent vs Buy', icon: Home, gradient: 'from-purple-500 to-indigo-500' },
  repayment: { label: 'Repayment', icon: Home, gradient: 'from-red-500 to-rose-500' },
  overpayment: { label: 'Overpayment', icon: Coins, gradient: 'from-emerald-500 to-teal-500' },
  remortgage: { label: 'Remortgage', icon: Landmark, gradient: 'from-indigo-500 to-purple-500' },
  'buy-to-let': { label: 'Buy-to-Let', icon: Landmark, gradient: 'from-amber-500 to-orange-500' },
  cmhc: { label: 'CMHC Insurance', icon: Home, gradient: 'from-blue-500 to-indigo-500' },
  'land-transfer-tax': { label: 'Land Transfer Tax', icon: Landmark, gradient: 'from-orange-500 to-amber-500' },
  affordability: { label: 'Affordability', icon: Calculator, gradient: 'from-amber-500 to-orange-500' },
  renewal: { label: 'Renewal', icon: Landmark, gradient: 'from-indigo-500 to-purple-500' },
  emi: { label: 'EMI', icon: Landmark, gradient: 'from-orange-500 to-amber-500' },
  prepayment: { label: 'Prepayment', icon: Coins, gradient: 'from-emerald-500 to-teal-500' },
  'balance-transfer': { label: 'Balance Transfer', icon: Landmark, gradient: 'from-indigo-500 to-purple-500' },
  eligibility: { label: 'Eligibility', icon: Calculator, gradient: 'from-amber-500 to-orange-500' },
  'tax-benefit': { label: 'Tax Benefit', icon: Landmark, gradient: 'from-emerald-500 to-green-500' },
  calculation: { label: 'Calculation', icon: Calculator, gradient: 'from-slate-500 to-slate-700' },
  'time-card': { label: 'Time Card', icon: Clock, gradient: 'from-violet-500 to-purple-500' },
  'days-between': { label: 'Days Between', icon: Calendar, gradient: 'from-blue-500 to-cyan-500' },
  hours: { label: 'Hours', icon: Clock, gradient: 'from-lime-500 to-green-500' },
  percentage: { label: 'Percentage', icon: Percent, gradient: 'from-amber-500 to-orange-500' },

}

function formatValue(val, currency) {
  if (val === null || val === undefined || val === '') return '—'
  if (typeof val === 'number') {
    const rounded = Math.round(val * 100) / 100
    return (currency || '') + rounded.toLocaleString()
  }
  if (Array.isArray(val)) {
    return val.length + ' item' + (val.length !== 1 ? 's' : '')
  }
  if (typeof val === 'object') {
    // Try to serialize simple objects
    try {
      const keys = Object.keys(val)
      if (keys.length === 0) return '—'
      // If object has a displayable property, use it
      return JSON.stringify(val).substring(0, 60)
    } catch {
      return '[complex object]'
    }
  }
  return String(val)
}

function cleanLabel(key) {
  if (key.startsWith('_')) return null
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export default function MyCalculationsPage() {
  const navigate = useNavigate()
  const { user, getCalculations, deleteCalculation, updateCalculation, premiumTier, calcSaveLimit } = useAuth()
  const [calcs, setCalcs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(null)

  // Inline rename state
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [savingName, setSavingName] = useState(false)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    load()
  }, [user])

  const load = async () => {
    setLoading(true)
    const { data, error } = await getCalculations()
    setLoading(false)
    if (error) setError(error.message)
    else setCalcs(data)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this saved calculation?')) return
    setDeleting(id)
    const { error } = await deleteCalculation(id)
    setDeleting(null)
    if (!error) setCalcs(calcs.filter(c => c.id !== id))
  }

  const startRename = (calc) => {
    setEditingId(calc.id)
    setEditValue(calc.title)
  }

  const cancelRename = () => {
    setEditingId(null)
    setEditValue('')
  }

  const saveRename = async (id) => {
    const trimmed = editValue.trim()
    if (!trimmed) { cancelRename(); return }
    setSavingName(true)
    const { error } = await updateCalculation(id, { title: trimmed })
    setSavingName(false)
    if (error) { setError(error.message); return }
    setCalcs(calcs.map(c => c.id === id ? { ...c, title: trimmed } : c))
    setEditingId(null)
    setEditValue('')
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <Card className="text-center p-12 border-0 shadow-2xl bg-gradient-to-br from-primary/10 via-card to-secondary/10">
          <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">Sign in to see your saved calculations.</p>
          <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-primary to-secondary text-white">Sign In</Button>
        </Card>
      </div>
    )
  }

  const types = ['all', ...new Set(calcs.map(c => c.calculator_type))]
  const filtered = filter === 'all' ? calcs : calcs.filter(c => c.calculator_type === filter)

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl mb-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950"></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(16,185,129,0.5) 0%, transparent 50%)' }}></div>
        <div className="relative z-10 p-6 md:p-10 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Save className="h-6 w-6 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight">My Calculations</h1>
              <p className="text-emerald-200 text-xs md:text-sm">
                {calcs.length} of {calcSaveLimit === 999 ? '∞' : calcSaveLimit} saved
                {premiumTier === 'free' && ' · Upgrade for unlimited'}
              </p>
            </div>
          </div>
          <p className="text-xs text-white/60 mt-3 flex items-center gap-1.5">
            <Pencil className="h-3 w-3" /> Click the pencil icon to rename any calculation
          </p>
          <Link to="/compare-calculations" className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition">
            <TrendingUp className="h-3.5 w-3.5" /> Compare calculations side-by-side
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 dark:bg-red-950/30 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm border border-red-200">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}

      {/* Filters */}
      {calcs.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {types.map(t => {
            const meta = TYPE_LABELS[t] || TYPE_LABELS.calculation
            const Icon = meta.icon
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={
                  'px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ' +
                  (filter === t ? 'bg-gradient-to-r ' + meta.gradient + ' text-white shadow-md' : 'bg-muted hover:bg-muted/70')
                }
              >
                <Icon className="h-3.5 w-3.5" />
                {t === 'all' ? 'All' : meta.label}
                <span className="text-xs opacity-70">
                  {t === 'all' ? calcs.length : calcs.filter(c => c.calculator_type === t).length}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {loading && (
        <div className="text-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
        </div>
      )}

      {!loading && calcs.length === 0 && (
        <Card className="border-dashed border-2">
          <CardContent className="p-16 text-center">
            <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 mb-5 shadow-xl">
              <Calculator className="h-14 w-14 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No saved calculations yet</h3>
            <p className="text-muted-foreground mb-6">
              Use any calculator and click "Save calculation" to keep it here.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/mortgage"><Button variant="outline" className="h-11">Mortgage calculators</Button></Link>
              <Link to="/calculators"><Button variant="outline" className="h-11">All calculators</Button></Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(c => {
          const meta = TYPE_LABELS[c.calculator_type] || TYPE_LABELS.calculation
          const Icon = meta.icon
          const isEditing = editingId === c.id

          const inputEntries = Object.entries(c.inputs || {})
            .filter(([k]) => !k.startsWith('_'))
            .slice(0, 3)
          const resultEntries = Object.entries(c.results || {})
            .filter(([k]) => typeof c.results[k] === 'number' || typeof c.results[k] === 'string')
            .slice(0, 3)

          return (
            <Card key={c.id} className="overflow-hidden border shadow-md hover:shadow-xl transition bg-card flex flex-col">
              <div className={'h-1.5 bg-gradient-to-r ' + meta.gradient}></div>
              <CardContent className="p-5 flex-1 flex flex-col">

                {/* Header with inline rename */}
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={'p-3 rounded-xl bg-gradient-to-br ' + meta.gradient + ' shadow-lg shrink-0'}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="h-8 text-sm font-bold"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveRename(c.id)
                              if (e.key === 'Escape') cancelRename()
                            }}
                          />
                          <button
                            onClick={() => saveRename(c.id)}
                            disabled={savingName}
                            className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50"
                          >
                            {savingName ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                          </button>
                          <button onClick={cancelRename} className="p-1.5 rounded-lg bg-muted hover:bg-muted/70">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startRename(c)}
                          className="text-left w-full group/name"
                          title="Click to rename"
                        >
                          <h3 className="font-bold text-base leading-snug line-clamp-2 group-hover/name:text-primary transition-colors flex items-start gap-1.5">
                            <span className="flex-1">{c.title}</span>
                            <Pencil className="h-3 w-3 mt-1 opacity-0 group-hover/name:opacity-60 shrink-0" />
                          </h3>
                          <p className="text-xs text-muted-foreground">{meta.label}{c.country_slug ? ' · ' + c.country_slug : ''}</p>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Inputs */}
                {inputEntries.length > 0 && (
                  <div className="mb-3">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-1.5">Inputs</div>
                    <div className="space-y-1">
                      {inputEntries.map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{cleanLabel(k)}</span>
                          <span className="font-mono font-medium tabular-nums">{formatValue(v)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {resultEntries.length > 0 && (
                  <div className="mb-3 pt-3 border-t border-border">
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-bold mb-1.5">Results</div>
                    <div className="space-y-1">
                      {resultEntries.map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{cleanLabel(k)}</span>
                          <span className="font-mono font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{formatValue(v)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {inputEntries.length === 0 && resultEntries.length === 0 && (
                  <p className="text-xs text-muted-foreground italic mb-3">No data recorded</p>
                )}

                {/* Actions */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(c.created_at).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                  <div className="flex items-center gap-1">
                    {c.inputs?._url && (
                      <Link to={c.inputs._url}>
                        <Button variant="ghost" size="sm" className="text-emerald-600 hover:bg-emerald-50 h-8 gap-1.5">
                          <ExternalLink className="h-3.5 w-3.5" /> Open
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={() => handleDelete(c.id)}
                      disabled={deleting === c.id}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:bg-red-50 h-8"
                    >
                      {deleting === c.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Upgrade CTA */}
      {premiumTier === 'free' && calcs.length >= 5 && (
        <Card className="mt-6 border-0 shadow-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10">
          <CardContent className="p-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Crown className="h-8 w-8 text-amber-500" />
              <div>
                <p className="font-bold">You've reached the Free plan limit</p>
                <p className="text-sm text-muted-foreground">Upgrade to Pro for unlimited saved calculations.</p>
              </div>
            </div>
            <Link to="/pricing"><Button className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white h-11">Upgrade to Pro</Button></Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}