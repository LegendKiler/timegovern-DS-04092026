import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper, TrendingUp, Sparkles } from "lucide-react"
import { useUser } from '../context/UserContext'

export default function PremiumNewsTicker() {
  const { location } = useUser()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [category, setCategory] = useState('general')

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY || ''

  useEffect(() => {
    if (!API_KEY) {
      setError('News API key not set. Please add VITE_NEWS_API_KEY to .env')
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    let url = ''
    if (category === 'ai') {
      url = `https://newsapi.org/v2/everything?q=artificial+intelligence+OR+AI+OR+machine+learning&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`
    } else {
      const country = location?.country_code?.toLowerCase() || 'us'
      url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=20&apiKey=${API_KEY}`
    }
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch news')
        return res.json()
      })
      .then(data => {
        setArticles(data.articles || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [location, category, API_KEY])

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">Loading news...</CardContent>
      </Card>
    )
  }

  const validCategories = ['general', 'business', 'technology', 'sports', 'entertainment', 'health', 'science', 'ai']

  return (
    <Card className="mt-4 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 text-white p-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Newspaper className="h-5 w-5" />
          Live News
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Professional Ticker */}
        <div className="relative bg-slate-900 dark:bg-slate-800 p-3 overflow-hidden">
          {/* Gradient fade overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
          {/* Scrolling content */}
          <div className="animate-ticker-slow whitespace-nowrap">
            {articles.map((article, index) => (
              <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="inline-block mx-6 text-slate-200 hover:text-white hover:underline transition-colors">
                <span className="text-red-400 mr-2">•</span>
                {article.title}
              </a>
            ))}
          </div>
        </div>

        {/* Major Highlights */}
        <div className="p-4">
          <h3 className="flex items-center gap-2 font-semibold mb-2">
            <TrendingUp className="h-4 w-4" /> Major Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {articles.slice(0, 6).map((article, index) => (
              <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="block rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform" />}
                <div className="p-3 bg-muted/30">
                  <h4 className="font-medium line-clamp-2">{article.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{article.source?.name} • {new Date(article.publishedAt).toLocaleTimeString()}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="p-4 pt-0">
          <h3 className="flex items-center gap-2 font-semibold mb-2">
            <Sparkles className="h-4 w-4" /> Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {validCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${category === cat ? 'bg-primary text-white shadow-sm' : 'bg-muted hover:bg-muted/70'}`}
              >
                {cat === 'ai' ? '🤖 AI' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
