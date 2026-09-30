import { Card, CardContent } from "@/components/ui/card"
import { Activity, Globe, Zap, Sparkles } from "lucide-react"
import CurrencyConverter from '../components/live/CurrencyConverter'
import CryptoPrices from '../components/live/CryptoPrices'
import WeatherCard from '../components/live/WeatherCard'
import EarthquakeFeed from '../components/live/EarthquakeFeed'
import AirQualityCard from '../components/live/AirQualityCard'
import IssTracker from '../components/live/IssTracker'

export default function LiveDataPage() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl mb-6 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.5) 0%, transparent 50%)'
        }}></div>
        <div className="relative z-10 p-6 md:p-10 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Activity className="h-7 w-7 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight">Live Data</h1>
              <p className="text-cyan-200 text-xs md:text-sm font-medium">Real-time feeds from around the world</p>
            </div>
          </div>
          <p className="text-white/80 max-w-2xl mt-2 text-xs md:text-sm">
            Currency rates, cryptocurrency prices, weather, air quality, earthquakes, and the ISS position — all updating in real time.
          </p>
          <div className="flex flex-wrap gap-2 mt-5 text-xs md:text-sm">
            <span className="bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium">
              <Zap className="h-3.5 w-3.5" /> Real-time
            </span>
            <span className="bg-blue-500/20 backdrop-blur-md border border-blue-400/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium">
              <Globe className="h-3.5 w-3.5" /> Global
            </span>
            <span className="bg-purple-500/20 backdrop-blur-md border border-purple-400/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium">
              <Sparkles className="h-3.5 w-3.5" /> Free
            </span>
          </div>
        </div>
      </div>

      {/* Row 1: Currency + Crypto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <CurrencyConverter />
        <CryptoPrices />
      </div>

      {/* Row 2: Weather + Air Quality + ISS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <WeatherCard />
        <AirQualityCard />
        <IssTracker />
      </div>

      {/* Row 3: Earthquakes (full width) */}
      <div className="grid grid-cols-1 gap-5">
        <EarthquakeFeed />
      </div>

      {/* Footer note */}
      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>All data provided by free, public APIs: exchangerate-api, CoinGecko, Open-Meteo, USGS, and WhereTheISS.at.</p>
      </div>
    </div>
  )
}