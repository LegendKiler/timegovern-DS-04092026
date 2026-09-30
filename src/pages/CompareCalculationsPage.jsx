import { useState, useEffect, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, AlertCircle, Calculator, ArrowLeft, CheckSquare, Square, TrendingUp, TrendingDown } from 'lucide-react'

// Format a value for display in the comparison table
function formatValue(val) {
  if (val === null || val === undefined || val === '') return '-'
  if (typeof val === 'number') {
    const rounded = Math.round(val * 100) / 100
    return rounded.toLocaleString()
  }
  if (Array.isArray(val)) {
    return val.length + ' item' + (val.length !== 1 ? 's' : '')
  }
  if (typeof val === 'object') {
    return '[object]'
  }
  return String(val)
}

// Clean a key for display (loan_amount -> Loan Amount)
function cleanKey(key) {
  if (!key || key.startsWith('_')) return null
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

// Check if a value is numeric for comparison
function isNumeric(val) {
  return typeof val === 'number' && !isNaN(val)
}

export default function CompareCalculationsPage() {
  const navigate = useNavigate()
  const { user, getCalculations } = useAuth()
  const [calcs, setCalcs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedIds, setSelectedIds] = useState([])

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

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id))
    } else {
      if (selectedIds.length >= 4) {
        setError('You can compare up to 4 calculations at once')
        setTimeout(() => setError(''), 3000)
        return
      }
      setSelectedIds([...selectedIds, id])
    }
  }

  // Build the comparison table structure
  const comparison = useMemo(() => {
    const selected = calcs.filter(c => selectedIds.includes(c.id))
    if (selected.length < 2) return null

    // Gather all unique input keys
    const allInputKeys = new Set()
    const allResultKeys = new Set()
    selected.forEach(c => {
      Object.keys(c.inputs || {}).forEach(k => { if (cleanKey(k)) allInputKeys.add(k) })
      Object.keys(c.results || {}).forEach(k => { if (cleanKey(k)) allResultKeys.add(k) })
    })

    return {
      selected,
      inputKeys: Array.from(allInputKeys),
      resultKeys: Array.from(allResultKeys),
    }
  }, [calcs, selectedIds])

  if (!user) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <Card className="text-center p-12 border-0 shadow-2xl bg-gradient-to-br from-primary/10 via-card to-secondary/10">
          <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">Sign in to compare your saved calculations.</p>
          <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-primary to-secondary text-white">Sign In</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl mb-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950"></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(16,185,129,0.5) 0%, transparent 50%)' }}></div>
        <div className="relative z-10 p-6 md:p-10 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <TrendingUp className="h-6 w-6 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight">Compare Calculations</h1>
              <p className="text-emerald-200 text-xs md:text-sm">
                Select 2 to 4 saved calculations to compare side by side
              </p>
            </div>
          </div>
          <Link to="/my-calculations" className="inline-flex items-center gap-2 mt-4 text-xs text-emerald-200 hover:text-white transition">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to My Calculations
          </Link>
        </div>
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

      {!loading && calcs.length === 0 && (
        <Card className="border-dashed border-2">
          <CardContent className="p-16 text-center">
            <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 mb-5 shadow-xl">
              <Calculator className="h-14 w-14 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No saved calculations yet</h3>
            <p className="text-muted-foreground mb-6">Save at least 2 calculations first, then come back here to compare.</p>
            <Link to="/calculators"><Button variant="outline" className="h-11">Go to Calculators</Button></Link>
          </CardContent>
        </Card>
      )}

      {!loading && calcs.length > 0 && (
        <>
          {/* Selection instructions */}
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
              {selectedIds.length === 0 && 'Select 2 to 4 calculations to compare'}
              {selectedIds.length === 1 && 'Select 1 more to start comparing'}
              {selectedIds.length >= 2 && 'Selected ' + selectedIds.length + ' of 4 - comparison below'}
            </div>
            <div className="text-xs text-muted-foreground">
              Click any card to add or remove it from the comparison
            </div>
          </div>

          {/* Selection grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {calcs.map(c => {
              const isSelected = selectedIds.includes(c.id)
              return (
                <button
                  key={c.id}
                  onClick={() => toggleSelect(c.id)}
                  className={'text-left p-4 rounded-xl border-2 transition-all ' +
                    (isSelected
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-lg'
                      : 'border-border bg-card hover:border-emerald-500/50')}
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-1">
                      {isSelected ? (
                        <CheckSquare className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <Square className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm line-clamp-2 mb-1">{c.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {c.calculator_type}
                        {c.country_slug ? ' - ' + c.country_slug : ''}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1">
                        {new Date(c.created_at).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Comparison table */}
          {comparison && (
            <div className="mb-8">
              <h2 className="text-2xl font-black tracking-tight mb-4">Side-by-side comparison</h2>

              <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <table className="w-full">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="text-left p-3 font-bold text-xs uppercase tracking-wider text-muted-foreground sticky left-0 bg-muted/40 backdrop-blur min-w-[140px]">
                        Field
                      </th>
                      {comparison.selected.map((c) => (
                        <th key={c.id} className="text-left p-3 font-bold text-xs uppercase tracking-wider text-muted-foreground min-w-[180px]">
                          <div className="line-clamp-2">{c.title}</div>
                          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                            {c.calculator_type}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Inputs header */}
                    {comparison.inputKeys.length > 0 && (
                      <tr className="bg-blue-500/10">
                        <td colSpan={comparison.selected.length + 1} className="p-2 font-bold text-xs uppercase tracking-widest text-blue-700 dark:text-blue-400">
                          Inputs
                        </td>
                      </tr>
                    )}

                    {comparison.inputKeys.map(key => {
                      const values = comparison.selected.map(c => (c.inputs || {})[key])
                      const numericVals = values.filter(isNumeric)
                      const allSame = values.every(v => String(v) === String(values[0]))
                      const maxVal = numericVals.length > 0 ? Math.max(...numericVals) : null
                      const minVal = numericVals.length > 0 ? Math.min(...numericVals) : null

                      return (
                        <tr key={key} className="border-t border-border/50">
                          <td className="p-3 font-semibold text-xs text-muted-foreground sticky left-0 bg-card">
                            {cleanKey(key)}
                          </td>
                          {values.map((v, i) => {
                            const isMax = numericVals.length >= 2 && isNumeric(v) && v === maxVal && maxVal !== minVal
                            const isMin = numericVals.length >= 2 && isNumeric(v) && v === minVal && maxVal !== minVal
                            return (
                              <td key={i} className="p-3 font-mono text-xs tabular-nums">
                                <span className={
                                  allSame ? 'text-muted-foreground'
                                  : isMax ? 'text-emerald-600 font-bold'
                                  : isMin ? 'text-red-500'
                                  : 'text-foreground'
                                }>
                                  {formatValue(v)}
                                </span>
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}

                    {/* Results header */}
                    {comparison.resultKeys.length > 0 && (
                      <tr className="bg-emerald-500/10">
                        <td colSpan={comparison.selected.length + 1} className="p-2 font-bold text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                          Results
                        </td>
                      </tr>
                    )}

                    {comparison.resultKeys.map(key => {
                      const values = comparison.selected.map(c => (c.results || {})[key])
                      const numericVals = values.filter(isNumeric)
                      const allSame = values.every(v => String(v) === String(values[0]))
                      const maxVal = numericVals.length > 0 ? Math.max(...numericVals) : null
                      const minVal = numericVals.length > 0 ? Math.min(...numericVals) : null

                      return (
                        <tr key={key} className="border-t border-border/50">
                          <td className="p-3 font-semibold text-xs text-muted-foreground sticky left-0 bg-card">
                            {cleanKey(key)}
                          </td>
                          {values.map((v, i) => {
                            const isMax = numericVals.length >= 2 && isNumeric(v) && v === maxVal && maxVal !== minVal
                            const isMin = numericVals.length >= 2 && isNumeric(v) && v === minVal && maxVal !== minVal
                            return (
                              <td key={i} className="p-3 font-mono text-xs tabular-nums">
                                <span className={
                                  allSame ? 'text-muted-foreground'
                                  : isMax ? 'text-emerald-600 font-bold'
                                  : isMin ? 'text-red-500'
                                  : 'text-foreground'
                                }>
                                  {formatValue(v)}
                                </span>
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-xs text-muted-foreground flex items-center gap-4">
                <span className="flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-emerald-600" /> Highest value</span>
                <span className="flex items-center gap-1.5"><TrendingDown className="h-3.5 w-3.5 text-red-500" /> Lowest value</span>
              </div>
            </div>
          )}

          {/* Clear selection */}
          {selectedIds.length > 0 && (
            <div className="text-center mb-8">
              <Button variant="outline" onClick={() => setSelectedIds([])}>
                Clear selection
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}