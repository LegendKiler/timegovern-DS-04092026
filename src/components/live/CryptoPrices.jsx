import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FreshnessBadge from './FreshnessBadge'
import { Button } from "@/components/ui/button"
import { Bitcoin, RefreshCw, TrendingUp, TrendingDown, Loader2 } from "lucide-react"

const COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
]

function fmt(n) {
  if (!n && n !== 0) return '—'
  if (n >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 0 })
  if (n >= 1) return n.toLocaleString('en-US', { maximumFractionDigits: 2 })
  return n.toFixed(6)
}

export default function CryptoPrices() {
  const [prices, setPrices] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updated, setUpdated] = useState(null)

  const fetchPrices = async () => {
    setLoading(true); setError('')
    try {
      const ids = COINS.map(c => c.id).join(',')
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + ids + '&vs_currencies=usd&include_24hr_change=true')
      if (!res.ok) throw new Error('Server ' + res.status)
      const data = await res.json()
      setPrices(data)
      setUpdated(new Date())
    } catch (e) {
      setError(e.message || 'Failed to load prices')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrices()
    const id = setInterval(fetchPrices, 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Bitcoin className="h-5 w-5 text-orange-500" /> Crypto Prices <FreshnessBadge status="live" />
          </span>
          <Button variant="ghost" size="sm" onClick={fetchPrices} disabled={loading}>
            <RefreshCw className={'h-4 w-4 ' + (loading ? 'animate-spin' : '')} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 p-2 rounded mb-3">{error}</div>}

        {loading && !prices && (
          <div className="flex items-center justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-orange-500" /></div>
        )}

        {prices && (
          <div className="space-y-1.5 max-h-96 overflow-y-auto">
            {COINS.map(coin => {
              const p = prices[coin.id]
              if (!p) return null
              const change = p.usd_24h_change || 0
              const up = change >= 0
              return (
                <div key={coin.id} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white text-xs font-bold">
                      {coin.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{coin.symbol}</div>
                      <div className="text-xs text-muted-foreground">{coin.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm tabular-nums">${fmt(p.usd)}</div>
                    <div className={'text-xs flex items-center justify-end gap-1 ' + (up ? 'text-emerald-600' : 'text-red-500')}>
                      {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {change.toFixed(2)}%
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {updated && <p className="text-xs text-muted-foreground text-center mt-3">Updated {updated.toLocaleTimeString()} · Refreshes every 60s</p>}
      </CardContent>
    </Card>
  )
}