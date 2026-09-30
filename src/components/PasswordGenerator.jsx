import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Key, Copy, Check, RefreshCw, Eye, EyeOff } from 'lucide-react'

const secureRandom = (max) => {
  const limit = Math.floor(256 / max) * max
  const bytes = new Uint8Array(1)
  while (true) {
    crypto.getRandomValues(bytes)
    if (bytes[0] < limit) return bytes[0] % max
  }
}

const CHARSETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
}

const AMBIGUOUS = /[il1Lo0O]/g

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [useLower, setUseLower] = useState(true)
  const [useUpper, setUseUpper] = useState(true)
  const [useDigits, setUseDigits] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(true)

  const buildCharset = useCallback(() => {
    let chars = ''
    if (useLower) chars += CHARSETS.lowercase
    if (useUpper) chars += CHARSETS.uppercase
    if (useDigits) chars += CHARSETS.digits
    if (useSymbols) chars += CHARSETS.symbols
    if (excludeAmbiguous) chars = chars.replace(AMBIGUOUS, '')
    return chars
  }, [useLower, useUpper, useDigits, useSymbols, excludeAmbiguous])

  const generate = useCallback(() => {
    const charset = buildCharset()
    if (!charset) { setPassword(''); return }
    let out = ''
    for (let i = 0; i < length; i++) out += charset[secureRandom(charset.length)]
    setPassword(out)
    setCopied(false)
  }, [buildCharset, length])

  useEffect(() => { generate() }, [generate])

  const entropy = (() => {
    const charset = buildCharset()
    if (!charset) return 0
    return Math.round(length * Math.log2(charset.length))
  })()

  const strength = entropy < 40 ? { label: 'Weak', color: 'red' }
    : entropy < 60 ? { label: 'Fair', color: 'amber' }
    : entropy < 80 ? { label: 'Strong', color: 'emerald' }
    : { label: 'Very Strong', color: 'emerald' }

  const copy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-md">
            <Key className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black">Password Generator</h2>
            <p className="text-xs text-muted-foreground">Cryptographically strong, runs in your browser</p>
          </div>
        </div>

        <div className="rounded-xl border-2 border-purple-500/30 bg-purple-500/5 p-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 font-mono text-base md:text-lg break-all select-all">
              {visible ? password : '•'.repeat(password.length)}
            </div>
            <Button variant="ghost" size="icon" onClick={() => setVisible(!visible)} aria-label="Toggle visibility">
              {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={generate} aria-label="Regenerate">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <div className={'h-2 w-24 rounded-full bg-' + strength.color + '-500/20 overflow-hidden'}>
                <div className={'h-full bg-' + strength.color + '-500 transition-all'} style={{ width: Math.min(100, entropy) + '%' }}></div>
              </div>
              <span className={'text-xs font-bold text-' + strength.color + '-600 dark:text-' + strength.color + '-400'}>{strength.label}</span>
            </div>
            <span className="text-xs text-muted-foreground">{entropy} bits of entropy</span>
          </div>
        </div>

        <Button onClick={copy} className="w-full mb-6 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:opacity-90">
          {copied ? <><Check className="h-4 w-4 mr-2" /> Copied</> : <><Copy className="h-4 w-4 mr-2" /> Copy password</>}
        </Button>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold">Length</label>
              <span className="text-sm font-black text-purple-500">{length}</span>
            </div>
            <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-purple-500" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 p-3 rounded-lg border border-border cursor-pointer hover:border-purple-400 transition">
              <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} className="accent-purple-500" />
              <span className="text-sm font-semibold">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-2 p-3 rounded-lg border border-border cursor-pointer hover:border-purple-400 transition">
              <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} className="accent-purple-500" />
              <span className="text-sm font-semibold">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-2 p-3 rounded-lg border border-border cursor-pointer hover:border-purple-400 transition">
              <input type="checkbox" checked={useDigits} onChange={(e) => setUseDigits(e.target.checked)} className="accent-purple-500" />
              <span className="text-sm font-semibold">Digits (0-9)</span>
            </label>
            <label className="flex items-center gap-2 p-3 rounded-lg border border-border cursor-pointer hover:border-purple-400 transition">
              <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="accent-purple-500" />
              <span className="text-sm font-semibold">Symbols (!@#$)</span>
            </label>
          </div>

          <label className="flex items-center gap-2 p-3 rounded-lg border border-border cursor-pointer hover:border-purple-400 transition">
            <input type="checkbox" checked={excludeAmbiguous} onChange={(e) => setExcludeAmbiguous(e.target.checked)} className="accent-purple-500" />
            <span className="text-sm font-semibold">Exclude ambiguous characters (i, l, 1, O, 0)</span>
          </label>
        </div>
      </CardContent>
    </Card>
  )
}