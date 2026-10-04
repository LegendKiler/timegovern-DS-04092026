import { useState, useRef, useEffect, useMemo } from 'react'
import { CURRENCIES, getCurrency } from '../data/currencies'
import { ChevronDown, Search, X } from 'lucide-react'

export default function SearchableCurrencySelect({ value, onChange, label, disabled = false }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const selected = getCurrency(value)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return CURRENCIES
    return CURRENCIES.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        (c.symbol || '').toLowerCase().includes(q)
    )
  }, [query])

  useEffect(() => {
    function handle(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
      setHighlightedIndex(0)
    }
  }, [open])

  useEffect(() => { setHighlightedIndex(0) }, [query])

  useEffect(() => {
    if (open && listRef.current) {
      const el = listRef.current.children[highlightedIndex]
      if (el) el.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex, open])

  function select(code) {
    onChange(code)
    setOpen(false)
    setQuery('')
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[highlightedIndex]) select(filtered[highlightedIndex].code)
    } else if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {label && <label className="text-xs text-muted-foreground mb-1 block">{label}</label>}
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground font-semibold flex items-center justify-between text-left disabled:opacity-50"
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className="text-base leading-none">{selected?.flag}</span>
          <span className="font-bold">{value}</span>
          <span className="text-muted-foreground font-normal truncate hidden sm:inline">{selected?.name}</span>
        </span>
        <ChevronDown className={'h-4 w-4 opacity-50 flex-shrink-0 transition-transform ' + (open ? 'rotate-180' : '')} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-popover border border-border rounded-lg shadow-xl overflow-hidden">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search currency or country..."
                className="w-full h-9 pl-8 pr-8 text-sm border border-border rounded-md bg-background"
                aria-label="Search currencies"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <ul ref={listRef} role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-muted-foreground">No currencies found</li>
            )}
            {filtered.map((c, i) => (
              <li
                key={c.code}
                role="option"
                aria-selected={c.code === value}
                onClick={() => select(c.code)}
                onMouseEnter={() => setHighlightedIndex(i)}
                className={
                  'px-3 py-2 text-sm cursor-pointer flex items-center gap-2 ' +
                  (i === highlightedIndex ? 'bg-accent text-accent-foreground' : '')
                }
              >
                <span className="text-base leading-none">{c.flag}</span>
                <span className="font-bold w-10">{c.code}</span>
                <span className="text-muted-foreground truncate">{c.name}</span>
                {c.code === value && <span className="ml-auto text-xs text-emerald-600 font-semibold">current</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}