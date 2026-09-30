import { useState, useEffect } from 'react'
import { ExternalLink, Clock, Loader2, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const WORKER_URL = 'https://timegovern-news.nadeem101.workers.dev'

const CATEGORIES = [
  { id: 'general', label: 'General' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'sports', label: 'Sports' },
  { id: 'health', label: 'Health' },
  { id: 'science', label: 'Science' },
  { id: 'entertainment', label: 'Entertainment' },
]

const CACHE_PREFIX = 'tg_news_v12_202609231944'
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

function decodeEntities(text) {
  if (!text) return text
  let s = text
    // Double-encoded entities first
    .replace(/&amp;#8217;/g, "'")
    .replace(/&amp;#8216;/g, "'")
    .replace(/&amp;#8220;/g, '"')
    .replace(/&amp;#8221;/g, '"')
    .replace(/&amp;#8212;/g, '—')
    .replace(/&amp;#8211;/g, '–')
    .replace(/&amp;#8230;/g, '...')
    .replace(/&amp;#39;/g, "'")
    .replace(/&amp;#34;/g, '"')
    .replace(/&amp;amp;/g, '&')
    .replace(/&amp;quot;/g, '"')
    .replace(/&amp;nbsp;/g, ' ')
    // Single-encoded numeric
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8212;/g, '—')
    .replace(/&#8211;/g, '–')
    .replace(/&#8230;/g, '...')
    .replace(/&#39;/g, "'")
    .replace(/&#34;/g, '"')
    // Named
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
  // Strip any remaining HTML tags
  s = s.replace(/<[^>]*>/g, '')
  // Cleanup
  return s.replace(/\s+/g, ' ').trim()
}

function getCached(cat) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + cat)
    if (!raw) return null
    const { ts, data } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL_MS) return null
    return data
  } catch { return null }
}

function setCached(cat, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + cat, JSON.stringify({ ts: Date.now(), data }))
  } catch {}
}

function timeAgo(iso) {
  if (!iso) return ''
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago'
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
  return Math.floor(diff / 86400) + 'd ago'
}

export default function NewsFeed() {
  const [category, setCategory] = useState('general')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    const cached = getCached(category)
    if (cached && cached.length > 0) {
      setArticles(cached)
      setLoading(false)
      setError('')
      return
    }
    setLoading(true)
    setError('')
    const url = WORKER_URL + '?category=' + category + '&limit=12'
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.json()
      })
      .then(json => {
        if (cancelled) return
        const list = json.articles || []
        setCached(category, list)
        setArticles(list)
        setLoading(false)
      })
      .catch(e => {
        if (cancelled) return
        setError(e.message)
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [category])

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={
              'px-4 py-2 rounded-full text-sm font-bold transition-all ' +
              (category === c.id
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-card border border-border text-muted-foreground hover:border-emerald-500 hover:text-foreground')
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-700 dark:text-amber-400">
            <strong>Could not load news:</strong> {error}
          </div>
        </div>
      )}

      {/* Loading skeletons */}
      {loading && articles.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden border border-border animate-pulse">
              <div className="aspect-video bg-muted" />
              <CardContent className="p-4 space-y-2">
                <div className="h-3 bg-muted rounded w-1/3" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Articles */}
      {!loading && articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a, i) => (
            <a
              key={i}
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="overflow-hidden border border-border hover:border-emerald-500 hover:shadow-xl transition-all h-full flex flex-col bg-card">
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <img
                    src={a.image && a.image.startsWith("/img") ? WORKER_URL + a.image : a.image}
                    alt={decodeEntities(a.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      const parent = e.target.parentElement
                      if (parent) parent.style.background = 'linear-gradient(135deg, #10b981, #0891b2)'
                    }}
                  />
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-bold mb-2">
                    <span className="text-emerald-600 dark:text-emerald-400">{a.source}</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" /> {timeAgo(a.pubDate)}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm leading-snug mb-2 group-hover:text-emerald-600 transition-colors line-clamp-3">
                    {decodeEntities(a.title)}
                  </h3>
                  {a.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                      {decodeEntities(a.description)}
                    </p>
                  )}
                  <div className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    Read full story <ExternalLink className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && articles.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3" />
          No articles found. Try another category.
        </div>
      )}
    </div>
  )
}