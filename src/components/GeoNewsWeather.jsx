import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { fetchWeather } from '../utils/weatherApi'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GeoNewsWeather() {
  const { location } = useUser()
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [news, setNews] = useState([])

  useEffect(() => {
    if (!location?.latitude) return
    fetchWeather(location.latitude, location.longitude)
      .then(setWeather)
      .catch(() => {})

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const daily = data.daily
        const forecastArray = daily.time.map((date, i) => ({
          date: date,
          max: daily.temperature_2m_max[i],
          min: daily.temperature_2m_min[i],
          code: daily.weathercode[i],
        }))
        setForecast(forecastArray)
      })
      .catch(() => {})

    const key = import.meta.env.VITE_NEWS_API_KEY
    if (key) {
      fetch(`https://newsapi.org/v2/top-headlines?country=${location.country_code?.toLowerCase()}&apiKey=${key}`)
        .then(res => res.json())
        .then(data => setNews(data.articles?.slice(0,5) || []))
        .catch(() => {})
    }
  }, [location])

  if (!location) return <Card><CardContent className="p-6">Loading location...</CardContent></Card>

  return (
    <Card>
      <CardHeader><CardTitle>Local Info</CardTitle></CardHeader>
      <CardContent>
        <p className="mb-2">📍 {location.city}, {location.country_name}</p>
        {weather && <div className="mb-4 p-3 bg-muted/50 rounded"><p>🌡️ {weather.temperature}°C, wind {weather.windspeed} km/h</p></div>}
        {forecast.length > 0 && (
          <div className="mb-4">
            <p className="font-medium mb-2">5-Day Forecast</p>
            <div className="grid grid-cols-5 gap-1 text-center text-xs">
              {forecast.map((day, i) => (
                <div key={i} className="bg-muted/30 rounded p-1">
                  <div className="font-semibold">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div>{day.max}°</div>
                  <div className="text-muted-foreground">{day.min}°</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <h3 className="font-semibold mb-2">News</h3>
        {news.length > 0 ? (
          <ul className="space-y-2">
            {news.map((article, i) => (
              <li key={i}><a href={article.url} target="_blank" rel="noreferrer" className="hover:underline text-sm">{article.title}</a></li>
            ))}
          </ul>
        ) : <p className="text-muted-foreground text-sm">No news available</p>}
      </CardContent>
    </Card>
  )
}