import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { Save, Check, Loader2, FileText, Crown, Pencil, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '../context/AuthContext'
import { useCalculation } from '../context/CalculationContext'
import { downloadCalculationPdf } from './CalculationPdf'

// ============================================================
// BUILD DEFAULT NAME — Option E
// Format: {Country} {Type} @ {Rate}% — {Amount} · {Date}
// Falls back gracefully if rate/amount are missing
// ============================================================
const TYPE_LABELS = {
  mortgage: 'Mortgage', offset: 'Offset Account', 'stamp-duty': 'Stamp Duty',
  lmi: 'LMI', 'novated-lease': 'Novated Lease', 'extra-repayment': 'Extra Repayment',
  'borrowing-power': 'Borrowing Power', 'interest-only': 'Interest-Only',
  'first-home-guarantee': 'First Home Guarantee', 'split-loan': 'Split Loan',
  refinance: 'Refinance', biweekly: 'Bi-Weekly', fha: 'FHA Loan', va: 'VA Loan',
  pmi: 'PMI', 'property-tax': 'Property Tax', 'rent-vs-buy': 'Rent vs Buy',
  repayment: 'Repayment', overpayment: 'Overpayment', remortgage: 'Remortgage',
  'buy-to-let': 'Buy-to-Let', cmhc: 'CMHC Insurance', 'land-transfer-tax': 'Land Transfer Tax',
  affordability: 'Affordability', renewal: 'Renewal', emi: 'EMI', prepayment: 'Prepayment',
  'balance-transfer': 'Balance Transfer', eligibility: 'Eligibility', 'tax-benefit': 'Tax Benefit',
  calculation: 'Calculation',
}

function findRate(inputs) {
  if (!inputs) return null
  // Try common rate field names in order of preference
  const rateKeys = [
    'interest_rate', 'rate', 'new_rate', 'current_rate',
    'fixed_rate', 'var_rate', 'contract_rate', 'stressRate',
  ]
  for (const key of rateKeys) {
    const v = inputs[key]
    if (typeof v === 'number' && v > 0 && v < 50) return v
    if (typeof v === 'string' && !isNaN(parseFloat(v)) && parseFloat(v) > 0 && parseFloat(v) < 50) {
      return parseFloat(v)
    }
  }
  return null
}

function findAmount(inputs) {
  if (!inputs) return null
  const amountKeys = [
    'loan_amount', 'amount', 'price', 'balance', 'loanAmount',
    'car_price', 'home_price', 'property_price',
  ]
  for (const key of amountKeys) {
    const v = inputs[key]
    if (typeof v === 'number' && v > 0) return v
    if (typeof v === 'string' && !isNaN(parseFloat(v)) && parseFloat(v) > 0) {
      return parseFloat(v)
    }
  }
  return null
}

function findHeadlineResult(results) {
  if (!results) return null
  const resultKeys = [
    'payment', 'monthly_payment', 'emi', 'monthlyPayment',
    'combined_interest', 'total_interest', 'total_interest_paid',
    'total_paid', 'totalPaid', 'total_cost', 'net_cost',
  ]
  for (const key of resultKeys) {
    const v = results[key]
    if (typeof v === 'number' && v > 0) return v
  }
  return null
}

function formatNum(n) {
  if (n === null || n === undefined) return ''
  if (typeof n !== 'number') return String(n)
  // Keep 1 decimal for rate, no decimals for large amounts
  if (n < 100) return n.toFixed(2).replace(/\.?0+$/, '')
  return Math.round(n).toLocaleString()
}

function buildDefaultName(type, countrySlug, inputs, results) {
  const label = TYPE_LABELS[type] || 'Calculation'
  const country = countrySlug
    ? countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)
    : ''

  const rate = findRate(inputs)
  const amount = findAmount(inputs)
  const headline = findHeadlineResult(results)

  const parts = [country, label].filter(Boolean)
  let name = parts.join(' ')

  // Add rate if present: "@ 6.5%"
  if (rate !== null) {
    name += ' @ ' + formatNum(rate) + '%'
  }

  // Add amount or headline result: "— 700,000"
  if (amount !== null) {
    name += ' — ' + formatNum(amount)
  } else if (headline !== null) {
    name += ' — ' + formatNum(headline)
  }

  // Short date: "· 17 Sep"
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-AU', { day: '2-digit', month: 'short' })
  name += ' · ' + dateStr

  return name
}

export default function SaveCalculation({ type: typeProp, countrySlug: slugProp, title: titleProp, inputs: inputsProp, results: resultsProp, showPdf = true }) {
  const { user, saveCalculation, updateCalculation, premiumTier, calcSaveLimit } = useAuth()
  const { currentCalc } = useCalculation()
  const navigate = useNavigate()
  const location = useLocation()

  const type = typeProp || currentCalc?.type || 'calculation'
  const countrySlug = slugProp || currentCalc?.countrySlug
  const inputs = { ...(currentCalc?.inputs || {}), ...(inputsProp || {}) }
  const results = { ...(currentCalc?.results || {}), ...(resultsProp || {}) }

  const [saving, setSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const [savedId, setSavedId] = useState(null)
  const [savedName, setSavedName] = useState('')
  const [showRename, setShowRename] = useState(false)
  const [renameValue, setRenameValue] = useState('')
  const [renaming, setRenaming] = useState(false)
  const [error, setError] = useState('')

  const renameInputRef = useRef(null)
  const autoDismissTimer = useRef(null)

  useEffect(() => {
    return () => { if (autoDismissTimer.current) clearTimeout(autoDismissTimer.current) }
  }, [])

  const finishRename = () => {
    if (autoDismissTimer.current) { clearTimeout(autoDismissTimer.current); autoDismissTimer.current = null }
    setShowRename(false)
  }

  const handleSave = async () => {
    if (!user) { navigate('/auth'); return }
    if (saving || justSaved) return

    setSaving(true); setError('')

    const autoName = titleProp || buildDefaultName(type, countrySlug, inputs, results)
    const payload = {
      type,
      countrySlug,
      title: autoName,
      inputs: { ...inputs, _url: location.pathname, _query: location.search },
      results,
    }

    const { data, error } = await saveCalculation(payload)
    setSaving(false)

    if (error) {
      setError(error.message)
      setTimeout(() => setError(''), 5000)
      return
    }

    setSavedId(data?.id)
    setSavedName(autoName)
    setRenameValue(autoName)
    setJustSaved(true)

    setTimeout(() => {
      setJustSaved(false)
      setShowRename(true)
      setTimeout(() => renameInputRef.current?.focus(), 100)
      autoDismissTimer.current = setTimeout(() => finishRename(), 12000)
    }, 1200)
  }

  const handleSaveRename = async () => {
    const trimmed = renameValue.trim()
    if (!trimmed || trimmed === savedName) { finishRename(); return }
    setRenaming(true)
    const { error } = await updateCalculation(savedId, { title: trimmed })
    setRenaming(false)
    if (error) { setError(error.message); return }
    setSavedName(trimmed)
    finishRename()
  }

  const handleCancelRename = () => {
    setRenameValue(savedName)
    finishRename()
  }

  const handlePdf = async () => {
    const autoName = titleProp || buildDefaultName(type, countrySlug, inputs, results)
    try {
      await downloadCalculationPdf({
        title: savedName || autoName,
        type,
        countrySlug,
        inputs,
        results,
        watermark: premiumTier === 'free',
      })
    } catch (e) {
      alert('Could not generate PDF: ' + e.message)
    }
  }

  const showSavedPill = !showRename && !justSaved && savedName

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={handleSave}
          disabled={saving || justSaved}
          variant="outline"
          className={
            'h-11 gap-2 transition-all ' +
            (justSaved
              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
              : 'border-emerald-500/40 text-emerald-700 dark:text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-400')
          }
        >
          {saving ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
          ) : justSaved ? (
            <><Check className="h-4 w-4" /> Saved!</>
          ) : (
            <><Save className="h-4 w-4" /> Save calculation</>
          )}
        </Button>

        {showPdf && (
          <Button
            onClick={handlePdf}
            variant="outline"
            className="h-11 gap-2 text-foreground hover:text-foreground"
          >
            <FileText className="h-4 w-4" /> Export PDF
          </Button>
        )}
      </div>

      {showRename && (
        <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/30 rounded-xl px-3 py-2 w-full max-w-lg shadow-sm transition-all">
          <Pencil className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          <Input
            ref={renameInputRef}
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveRename()
              if (e.key === 'Escape') handleCancelRename()
            }}
            placeholder="Give this calculation a name"
            className="h-9 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-1 flex-1"
          />
          <button
            onClick={handleSaveRename}
            disabled={renaming || !renameValue.trim()}
            title="Save name (Enter)"
            className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-40 transition-colors"
          >
            {renaming ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={handleCancelRename}
            title="Keep auto-name (Esc)"
            className="p-1.5 rounded-lg bg-muted hover:bg-muted/70 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {showSavedPill && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 rounded-full px-3 py-1">
          <Check className="h-3 w-3" />
          <span className="font-medium truncate max-w-xs" title={savedName}>
            Saved as "{savedName}"
          </span>
          <Link to="/my-calculations" className="ml-1 underline font-semibold hover:text-emerald-700 dark:hover:text-emerald-300">
            View
          </Link>
        </div>
      )}

      {error && (
        <div className="text-xs text-red-500 bg-red-500/10 border border-red-500/30 rounded px-3 py-1.5 max-w-md">
          {error}
        </div>
      )}

      {premiumTier === 'free' && !justSaved && !showRename && !showSavedPill && (
        <div className="text-[10px] text-muted-foreground flex items-center gap-1">
          <Crown className="h-3 w-3 text-amber-500" />
          Free plan: {calcSaveLimit} saves max · <Link to="/pricing" className="underline">Upgrade</Link>
        </div>
      )}
    </div>
  )
}