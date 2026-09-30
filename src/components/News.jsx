import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Newspaper } from "lucide-react"

const categories = [
  { value: "general", label: "General" },
  { value: "world", label: "World" },
  { value: "business", label: "Business" },
  { value: "technology", label: "Technology" },
  { value: "sports", label: "Sports" },
  { value: "entertainment", label: "Entertainment" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
]

export default function News() {
  const [category, setCategory] = useState('general')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'YOUR_NEWS_API_KEY' // Replace with actual key

  useEffect(() => {
    if (API_KEY === 'YOUR_NEWS_API_KEY') {
      setError('Please set VITE_NEWS_API_KEY in your .env file')
      return
    }
    setLoading(true)
    setError('')
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&pageSize=12&apiKey=${API_KEY}`
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch news')
        return res.json()
      })
      .then(data => {
        setArticles(data.articles || [])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [category])

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5" /> Live News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={category} onValueChange={setCategory}>
          <TabsList className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <TabsTrigger key={cat.value} value={cat.value} className="px-3 py-1 text-xs">
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-4">
            {loading && <p className="text-center">Loading news...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article, idx) => (
                  <a href={article.url} target="_blank" rel="noreferrer" key={idx} className="block border rounded-lg overflow-hidden hover:shadow-lg transition">
                    {article.urlToImage && (
                      <img src={article.urlToImage} alt={article.title} className="w-full h-40 object-cover" />
                    )}
                    <div className="p-3">
                      <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{article.source?.name}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
