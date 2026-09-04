import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { fetchWeather } from '../utils/weatherApi'

export default function GeoNewsWeather() {
  const { location } = useUser()
  const [weather, setWeather] = useState(null)
  const [news, setNews] = useState([])

  useEffect(() => {
    if (!location?.latitude) return
    fetchWeather(location.latitude, location.longitude)
      .then(setWeather)
      .catch(() => {})

    const key = import.meta.env.VITE_NEWS_API_KEY
    if (key) {
      fetch(`https://newsapi.org/v2/top-headlines?country=${location.country_code?.toLowerCase()}&apiKey=${key}`)
        .then(res => res.json())
        .then(data => setNews(data.articles?.slice(0,5) || []))
        .catch(() => {})
    }
  }, [location])

  if (!location) return <div className="card p-6">Loading location...</div>

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">Local Info</h2>
      <div className="mb-2">
        <p>ðŸ“ {location.city}, {location.country_name}</p>
      </div>
      {weather && (
        <div className="mb-4">
          <p>ðŸŒ¡ï¸ {weather.temperature}Â°C, wind {weather.windspeed} km/h</p>
        </div>
      )}
      <h3 className="font-semibold mb-2">News</h3>
      {news.length > 0 ? (
        <ul className="space-y-2">
          {news.map((article, i) => (
            <li key={i}>
              <a href={article.url} target="_blank" rel="noreferrer" className="hover:underline">{article.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No news available (check API key)</p>
      )}
    </div>
  )
}