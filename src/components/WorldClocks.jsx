import { useEffect, useState } from 'react'
import { format } from 'date-fns-tz'

const cities = [
  { name: 'New York', tz: 'America/New_York', flag: 'ðŸ‡ºðŸ‡¸' },
  { name: 'London', tz: 'Europe/London', flag: 'ðŸ‡¬ðŸ‡§' },
  { name: 'Tokyo', tz: 'Asia/Tokyo', flag: 'ðŸ‡¯ðŸ‡µ' },
  { name: 'Sydney', tz: 'Australia/Sydney', flag: 'ðŸ‡¦ðŸ‡º' },
  { name: 'Dubai', tz: 'Asia/Dubai', flag: 'ðŸ‡¦ðŸ‡ª' },
  { name: 'Paris', tz: 'Europe/Paris', flag: 'ðŸ‡«ðŸ‡·' },
]

export default function WorldClocks() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000) // update every minute
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">World Clocks</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cities.map(city => (
          <div key={city.tz} className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-center">
            <div>{city.flag} {city.name}</div>
            <div className="font-mono">{format(now, 'HH:mm', { timeZone: city.tz })}</div>
          </div>
        ))}
      </div>
    </div>
  )
}