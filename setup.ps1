# timegovern.com project setup - FIXED
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Write-File($path, $content) {
    $dir = Split-Path -Parent $path
    if ([string]::IsNullOrEmpty($dir)) { $dir = "." }
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
    [System.IO.File]::WriteAllText((Join-Path (Get-Location) $path), $content, $utf8NoBom)
}

# Remove stale package-lock.json if present
if (Test-Path .\package-lock.json) { Remove-Item .\package-lock.json -Force }

# ---------- ROOT FILES ----------
Write-File "package.json" @'
{
  "name": "timegovern",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "date-fns": "^3.6.0",
    "date-fns-tz": "^3.1.3",
    "lucide-react": "^0.454.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "suncalc": "^1.9.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "vite": "^5.3.1"
  }
}
'@

Write-File "vite.config.js" @'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
'@

Write-File "tailwind.config.js" @'
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        background: 'var(--bg-base)',
        card: 'var(--bg-card)',
        text: 'var(--text-primary)',
        muted: 'var(--text-muted)',
        border: 'var(--border-light)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        sm: '8px',
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)',
      },
    },
  },
  plugins: [],
}
'@

Write-File "postcss.config.js" @'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
'@

Write-File ".env.example" @'
VITE_NEWS_API_KEY=your_newsapi_key_here
'@

Write-File "index.html" @'
<!DOCTYPE html>
<html lang="en" class="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>timegovern.com – World Clock, Date & Tools</title>
    <meta name="description" content="Your premium portal for world clocks, calendars, astronomy, weather, and business calculators." />
    <meta name="theme-color" content="#2563eb" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
'@

# ---------- PUBLIC ----------
Write-File "public/manifest.json" @'
{
  "name": "timegovern.com",
  "short_name": "timegovern",
  "description": "World clocks, date, astronomy, and business tools.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f4f6f9",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
'@

Write-File "public/sw.js" @'
const CACHE_NAME = 'timegovern-v1';
const urlsToCache = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
'@

# ---------- SRC ----------
Write-File "src/main.jsx" @'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
'@

Write-File "src/App.jsx" @'
import { UserProvider } from './context/UserContext'
import Header from './components/Header'
import Clocks from './components/Clocks'
import WorldClocks from './components/WorldClocks'
import Calendar from './components/Calendar'
import Countdown from './components/Countdown'
import DateCalculator from './components/DateCalculator'
import AstronomyModule from './components/AstronomyModule'
import BusinessCalculators from './components/BusinessCalculators'
import GeoNewsWeather from './components/GeoNewsWeather'
import MeetingPlanner from './components/MeetingPlanner'
import TimezoneConverter from './components/TimezoneConverter'
import AdPlaceholders from './components/AdPlaceholders'

export default function App() {
  return (
    <UserProvider>
      <Header />
      <main className="container mx-auto p-4">
        <AdPlaceholders type="top" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className="space-y-6">
            <AdPlaceholders type="sidebar" />
            <BusinessCalculators />
            <AdPlaceholders type="sidebar" />
          </aside>
          <div className="space-y-6 col-span-1 lg:col-span-1">
            <Clocks />
            <WorldClocks />
            <Calendar />
            <Countdown />
            <DateCalculator />
          </div>
          <aside className="space-y-6">
            <AdPlaceholders type="sidebar" />
            <AstronomyModule />
            <GeoNewsWeather />
            <MeetingPlanner />
            <TimezoneConverter />
          </aside>
        </div>
      </main>
    </UserProvider>
  )
}
'@

Write-File "src/index.css" @'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-base: #f4f6f9;
  --bg-card: #ffffff;
  --text-primary: #1a1a2e;
  --text-muted: #6b7280;
  --border-light: #e5e7eb;
}

.dark {
  --bg-base: #0d1117;
  --bg-card: #161b22;
  --text-primary: #f0f6fc;
  --text-muted: #8b949e;
  --border-light: #30363d;
}

body {
  background-color: var(--bg-base);
  color: var(--text-primary);
  font-family: 'Inter', system-ui, sans-serif;
  transition: background-color 0.3s, color 0.3s;
}
'@

# ---------- CONTEXT & UTILS ----------
Write-File "src/context/UserContext.jsx" @'
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })
  const [location, setLocation] = useState(null)
  const [loadingLocation, setLoadingLocation] = useState(true)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setLocation(data)
        setLoadingLocation(false)
      })
      .catch(() => setLoadingLocation(false))
  }, [])

  return (
    <UserContext.Provider value={{ theme, setTheme, location, loadingLocation }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
'@

Write-File "src/utils/dateHelpers.js" @'
import { format, getWeek, getUTCWeek, getDayOfYear } from 'date-fns'

export function getWeekNumber(date) {
  return getWeek(date, { weekStartsOn: 1 })
}

export function getUTCWeekNumber(date) {
  return getUTCWeek(date)
}

export function getDayOfYear(date) {
  return getDayOfYear(date)
}

export function formatDate(date, timeZone) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatTime(date, timeZone, hour12 = false) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12,
  }).format(date)
}

export function getUTCOffset(timeZone, date = new Date()) {
  const tz = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' })
  const parts = tz.formatToParts(date)
  const offset = parts.find(p => p.type === 'timeZoneName')
  return offset ? offset.value : ''
}

export function getDSTStatus(timeZone, date = new Date()) {
  const jan = new Date(date.getFullYear(), 0, 1)
  const jul = new Date(date.getFullYear(), 6, 1)
  const isDST = (d) => {
    const tz = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' })
    const parts = tz.formatToParts(d)
    const offset = parts.find(p => p.type === 'timeZoneName').value
    return offset === 'GMT+1' || offset === 'GMT-4' // simplistic but works for example
  }
  return isDST(date) ? 'DST' : 'Standard'
}
'@

Write-File "src/utils/weatherApi.js" @'
export async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Weather fetch failed')
  const data = await res.json()
  return data.current_weather
}
'@

Write-File "src/utils/holidays.js" @'
export const holidaySets = {
  US: ['2026-01-01', '2026-07-04', '2026-12-25'],
  UK: ['2026-01-01', '2026-12-25', '2026-12-26'],
  AU: ['2026-01-01', '2026-01-26', '2026-04-10'],
  NZ: ['2026-01-01', '2026-02-06', '2026-04-10'],
}

export function isHoliday(dateStr, region) {
  return holidaySets[region]?.includes(dateStr) || false
}
'@

# ---------- COMPONENTS ----------
Write-File "src/components/Header.jsx" @'
import { useUser } from '../context/UserContext'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex items-center justify-between p-4">
        <a href="/" className="text-2xl font-bold text-primary">
          time<span className="text-blue-600">govern</span>
        </a>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-4">
            <a href="#clocks" className="hover:text-primary">Clocks</a>
            <a href="#calendar" className="hover:text-primary">Calendar</a>
            <a href="#business" className="hover:text-primary">Calculators</a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
'@

Write-File "src/components/ThemeToggle.jsx" @'
import { useUser } from '../context/UserContext'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme } = useUser()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 transition"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
'@

Write-File "src/components/Clocks.jsx" @'
import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { formatDate, formatTime, getWeekNumber, getUTCOffset, getDSTStatus } from '../utils/dateHelpers'

export default function Clocks() {
  const { location } = useUser()
  const [timeZone, setTimeZone] = useState('UTC')
  const [now, setNow] = useState(new Date())
  const [timeZones, setTimeZones] = useState([])

  useEffect(() => {
    setTimeZones(Intl.supportedValuesOf('timeZone'))
    if (location?.timezone) setTimeZone(location.timezone)
  }, [location])

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const updateAnalogHands = () => {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }).formatToParts(now)
    const h = parseInt(parts.find(p => p.type === 'hour').value) % 12
    const m = parseInt(parts.find(p => p.type === 'minute').value)
    const s = parseInt(parts.find(p => p.type === 'second').value)
    const secDeg = (s / 60) * 360
    const minDeg = ((m + s / 60) / 60) * 360
    const hourDeg = ((h + m / 60 + s / 3600) / 12) * 360
    return { secDeg, minDeg, hourDeg }
  }

  const { secDeg, minDeg, hourDeg } = updateAnalogHands()

  return (
    <div className="card bg-card rounded-card p-6 shadow-card" id="clocks">
      <h2 className="text-xl font-semibold mb-4">Local Time</h2>
      <div className="flex flex-col items-center">
        {/* Analog clock */}
        <div className="w-40 h-40 rounded-full border-4 border-gray-400 dark:border-gray-600 relative mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
          </div>
          <div className="absolute left-1/2 top-1/2 origin-bottom transform -translate-x-1/2 -translate-y-full" style={{ transform: `rotate(${hourDeg}deg)`, height: '30px', width: '2px', backgroundColor: 'var(--text-primary)' }}></div>
          <div className="absolute left-1/2 top-1/2 origin-bottom transform -translate-x-1/2 -translate-y-full" style={{ transform: `rotate(${minDeg}deg)`, height: '45px', width: '1px', backgroundColor: 'var(--text-primary)' }}></div>
          <div className="absolute left-1/2 top-1/2 origin-bottom transform -translate-x-1/2 -translate-y-full" style={{ transform: `rotate(${secDeg}deg)`, height: '50px', width: '0.5px', backgroundColor: 'red' }}></div>
        </div>
        {/* Digital clock */}
        <div className="font-mono text-3xl">{formatTime(now, timeZone)}</div>
        <div className="text-gray-500 mt-2">{formatDate(now, timeZone)}</div>
      </div>
      <div className="mt-4">
        <select
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
          className="w-full p-2 border rounded"
          aria-label="Select timezone"
        >
          {timeZones.map(tz => <option key={tz} value={tz}>{tz}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm mt-4">
        <div>Week: {getWeekNumber(now)}</div>
        <div>UTC Offset: {getUTCOffset(timeZone)}</div>
        <div>DST: {getDSTStatus(timeZone)}</div>
      </div>
    </div>
  )
}
'@

Write-File "src/components/WorldClocks.jsx" @'
import { useEffect, useState } from 'react'
import { format } from 'date-fns-tz'

const cities = [
  { name: 'New York', tz: 'America/New_York', flag: '🇺🇸' },
  { name: 'London', tz: 'Europe/London', flag: '🇬🇧' },
  { name: 'Tokyo', tz: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Sydney', tz: 'Australia/Sydney', flag: '🇦🇺' },
  { name: 'Dubai', tz: 'Asia/Dubai', flag: '🇦🇪' },
  { name: 'Paris', tz: 'Europe/Paris', flag: '🇫🇷' },
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
'@

Write-File "src/components/Calendar.jsx" @'
import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns'

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const firstDay = startOfMonth(currentMonth).getDay()

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 border rounded">‹</button>
        <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth} className="p-2 border rounded">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="font-bold">{d}</div>)}
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`}></div>)}
        {days.map(day => (
          <div key={day.toISOString()} className={`p-2 rounded ${isSameDay(day, new Date()) ? 'bg-blue-500 text-white' : ''}`}>
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  )
}
'@

Write-File "src/components/Countdown.jsx" @'
import { useEffect, useState } from 'react'

export default function Countdown() {
  const [target, setTarget] = useState('')
  const [remaining, setRemaining] = useState(null)

  const startCountdown = () => {
    if (!target) return
    const end = new Date(target)
    const update = () => {
      const diff = end - new Date()
      if (diff <= 0) {
        setRemaining(null)
        clearInterval(interval)
        alert('Countdown finished!')
        return
      }
      const days = Math.floor(diff / (1000*60*60*24))
      const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60))
      const mins = Math.floor((diff % (1000*60*60)) / (1000*60))
      const secs = Math.floor((diff % (1000*60)) / 1000)
      setRemaining({ days, hours, mins, secs })
    }
    const interval = setInterval(update, 1000)
    update()
  }

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">Countdown</h2>
      <div className="flex gap-2">
        <input type="datetime-local" className="border rounded p-2 flex-1" value={target} onChange={e => setTarget(e.target.value)} />
        <button onClick={startCountdown} className="bg-blue-500 text-white px-4 py-2 rounded">Start</button>
      </div>
      {remaining && (
        <div className="mt-4 font-mono text-lg">
          {remaining.days}d {remaining.hours}h {remaining.mins}m {remaining.secs}s
        </div>
      )}
    </div>
  )
}
'@

Write-File "src/components/DateCalculator.jsx" @'
import { useState } from 'react'
import { differenceInDays, differenceInWeeks, differenceInMonths } from 'date-fns'

export default function DateCalculator() {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!start || !end) return
    const s = new Date(start)
    const e = new Date(end)
    setResult({
      days: differenceInDays(e, s),
      weeks: differenceInWeeks(e, s),
      months: differenceInMonths(e, s),
    })
  }

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">Date Calculator</h2>
      <div className="grid grid-cols-2 gap-2">
        <input type="date" className="border rounded p-2" value={start} onChange={e => setStart(e.target.value)} />
        <input type="date" className="border rounded p-2" value={end} onChange={e => setEnd(e.target.value)} />
      </div>
      <button onClick={calculate} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Calculate</button>
      {result && (
        <div className="mt-4">
          <p>Days: {result.days}</p>
          <p>Weeks: {result.weeks}</p>
          <p>Months: {result.months}</p>
        </div>
      )}
    </div>
  )
}
'@

Write-File "src/components/AstronomyModule.jsx" @'
import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import SunCalc from 'suncalc'

export default function AstronomyModule() {
  const { location } = useUser()
  const [times, setTimes] = useState(null)
  const [eclipses, setEclipses] = useState([])

  useEffect(() => {
    if (!location?.latitude) return
    const lat = location.latitude
    const lng = location.longitude

    const now = new Date()
    const times = SunCalc.getTimes(now, lat, lng)
    setTimes({
      sunrise: times.sunrise,
      sunset: times.sunset,
      dawn: times.dawn,
      dusk: times.dusk,
      nauticalDawn: times.nauticalDawn,
      nauticalDusk: times.nauticalDusk,
      astroDawn: times.nightEnd,
      astroDusk: times.night,
    })

    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=1')
      .then(res => res.json())
      .then(data => setEclipses(data))
      .catch(() => {})
  }, [location])

  if (!times) return <div className="card p-6">Loading astronomy data...</div>

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">Astronomy</h2>
      <div className="space-y-2 text-sm">
        <div>Sunrise: {times.sunrise.toLocaleTimeString()}</div>
        <div>Sunset: {times.sunset.toLocaleTimeString()}</div>
        <div>Civil Dawn: {times.dawn.toLocaleTimeString()}</div>
        <div>Civil Dusk: {times.dusk.toLocaleTimeString()}</div>
        <div>Nautical Dawn: {times.nauticalDawn.toLocaleTimeString()}</div>
        <div>Nautical Dusk: {times.nauticalDusk.toLocaleTimeString()}</div>
        <div>Astro Dawn: {times.astroDawn.toLocaleTimeString()}</div>
        <div>Astro Dusk: {times.astroDusk.toLocaleTimeString()}</div>
      </div>
      {eclipses.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Eclipse Info</h3>
          <p>{eclipses[0].title}</p>
        </div>
      )}
    </div>
  )
}
'@

Write-File "src/components/BusinessCalculators.jsx" @'
import { useState } from 'react'
import { addBusinessDays, isWeekend, differenceInBusinessDays } from 'date-fns'
import { isHoliday } from '../utils/holidays'

export default function BusinessCalculators() {
  const [region, setRegion] = useState('US')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [days, setDays] = useState(null)
  const [startProj, setStartProj] = useState('')
  const [numDays, setNumDays] = useState(10)
  const [projEnd, setProjEnd] = useState('')

  const countBusiness = () => {
    if (!start || !end) return
    const s = new Date(start)
    const e = new Date(end)
    let count = 0
    let current = new Date(s)
    while (current <= e) {
      if (!isWeekend(current) && !isHoliday(current.toISOString().split('T')[0], region)) count++
      current.setDate(current.getDate() + 1)
    }
    setDays(count)
  }

  const projectDeadline = () => {
    if (!startProj) return
    const s = new Date(startProj)
    let count = 0
    let current = new Date(s)
    while (count < numDays) {
      current.setDate(current.getDate() + 1)
      if (!isWeekend(current) && !isHoliday(current.toISOString().split('T')[0], region)) count++
    }
    setProjEnd(current.toISOString().split('T')[0])
  }

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">Business Tools</h2>
      <div className="mb-2">
        <label className="block text-sm">Region</label>
        <select value={region} onChange={e => setRegion(e.target.value)} className="w-full border rounded p-2">
          <option>US</option>
          <option>UK</option>
          <option>AU</option>
          <option>NZ</option>
        </select>
      </div>
      <div className="mb-2">
        <p className="font-medium">Working Day Counter</p>
        <div className="flex gap-2">
          <input type="date" className="border rounded p-2" value={start} onChange={e => setStart(e.target.value)} />
          <input type="date" className="border rounded p-2" value={end} onChange={e => setEnd(e.target.value)} />
        </div>
        <button onClick={countBusiness} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Count</button>
        {days !== null && <p className="mt-2">Business days: {days}</p>}
      </div>
      <div className="mt-4">
        <p className="font-medium">Deadline Projector</p>
        <div className="flex gap-2">
          <input type="date" className="border rounded p-2" value={startProj} onChange={e => setStartProj(e.target.value)} />
          <input type="number" className="border rounded p-2" value={numDays} onChange={e => setNumDays(parseInt(e.target.value))} />
        </div>
        <button onClick={projectDeadline} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Project</button>
        {projEnd && <p className="mt-2">Projected end: {projEnd}</p>}
      </div>
    </div>
  )
}
'@

Write-File "src/components/GeoNewsWeather.jsx" @'
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
        <p>📍 {location.city}, {location.country_name}</p>
      </div>
      {weather && (
        <div className="mb-4">
          <p>🌡️ {weather.temperature}°C, wind {weather.windspeed} km/h</p>
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
'@

Write-File "src/components/MeetingPlanner.jsx" @'
import { useState } from 'react'

export default function MeetingPlanner() {
  const [timezones, setTimezones] = useState(['America/New_York', 'Europe/London'])
  const [hours, setHours] = useState(9) // 9 AM

  const addTZ = (tz) => setTimezones([...timezones, tz])
  const removeTZ = (index) => setTimezones(timezones.filter((_, i) => i !== index))

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">Meeting Planner</h2>
      <p className="text-sm mb-2">Select timezones and see overlapping hours.</p>
      <div className="mb-2">
        {timezones.map((tz, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <span>{tz}</span>
            <button onClick={() => removeTZ(i)} className="text-red-500">✕</button>
          </div>
        ))}
        <select onChange={(e) => addTZ(e.target.value)} className="border rounded p-1">
          {Intl.supportedValuesOf('timeZone').map(tz => <option key={tz} value={tz}>{tz}</option>)}
        </select>
      </div>
      <p>Working hour input (for demo): {hours}:00</p>
    </div>
  )
}
'@

Write-File "src/components/TimezoneConverter.jsx" @'
import { useState } from 'react'
import { format } from 'date-fns-tz'

export default function TimezoneConverter() {
  const [fromTZ, setFromTZ] = useState('UTC')
  const [toTZ, setToTZ] = useState('America/New_York')
  const [time, setTime] = useState(new Date())

  return (
    <div className="card bg-card rounded-card p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">Timezone Converter</h2>
      <div className="mb-2">
        <label>From</label>
        <select value={fromTZ} onChange={e => setFromTZ(e.target.value)} className="w-full border rounded p-2">
          {Intl.supportedValuesOf('timeZone').map(tz => <option key={tz} value={tz}>{tz}</option>)}
        </select>
      </div>
      <div className="mb-2">
        <label>To</label>
        <select value={toTZ} onChange={e => setToTZ(e.target.value)} className="w-full border rounded p-2">
          {Intl.supportedValuesOf('timeZone').map(tz => <option key={tz} value={tz}>{tz}</option>)}
        </select>
      </div>
      <div className="mb-2">
        <label>Time (UTC)</label>
        <input type="datetime-local" value={time.toISOString().slice(0,16)} onChange={e => setTime(new Date(e.target.value))} className="w-full border rounded p-2" />
      </div>
      <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded">
        <p>{format(time, 'yyyy-MM-dd HH:mm', { timeZone: fromTZ })}</p>
        <p>→</p>
        <p>{format(time, 'yyyy-MM-dd HH:mm', { timeZone: toTZ })}</p>
      </div>
    </div>
  )
}
'@

Write-File "src/components/AdPlaceholders.jsx" @'
export default function AdPlaceholders({ type }) {
  if (type === 'top') {
    return (
      <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 mb-6">
        Advertisement (728x90)
      </div>
    )
  }
  return (
    <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400">
      Advertisement (300x250)
    </div>
  )
}
'@

Write-Host "All files created successfully!" -ForegroundColor Green
Write-Host "Now run 'npm install' and then 'npm run dev'." -ForegroundColor Cyan