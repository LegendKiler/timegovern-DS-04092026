import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { downloadCarVoucher } from './CarBookingPdf'
import CalendarExport from './CalendarExport'
import { useAuth } from '../context/AuthContext'
import { useUser } from '../context/UserContext'
import { getDefaultCityForCountry, getAirportsForCountry, countryFlag } from '../data/airports'
import { Car, MapPin, Calendar, Users, Search, Loader2, AlertCircle, ExternalLink, Download, Fuel, Gauge, Users2, Briefcase, Snowflake, CheckCircle2, Sparkles, Zap, Star, ChevronDown, Plane, Building2, TrendingDown, TrendingUp, DollarSign, Award, Heart } from 'lucide-react'

// ============================================================
// LOCATION DATABASE (unchanged)
// ============================================================
const WORLD_LOCATIONS = [
  { name: 'Mumbai', country: 'India', type: 'city', flag: 'ðŸ‡®ðŸ‡³' },
  { name: 'Delhi', country: 'India', type: 'city', flag: 'ðŸ‡®ðŸ‡³' },
  { name: 'Bangalore', country: 'India', type: 'city', flag: 'ðŸ‡®ðŸ‡³' },
  { name: 'Chennai', country: 'India', type: 'city', flag: 'ðŸ‡®ðŸ‡³' },
  { name: 'Kolkata', country: 'India', type: 'city', flag: 'ðŸ‡®ðŸ‡³' },
  { name: 'Hyderabad', country: 'India', type: 'city', flag: 'ðŸ‡®ðŸ‡³' },
  { name: 'Goa', country: 'India', type: 'city', flag: 'ðŸ‡®ðŸ‡³' },
  { name: 'Karachi', country: 'Pakistan', type: 'city', flag: 'ðŸ‡µðŸ‡°' },
  { name: 'Lahore', country: 'Pakistan', type: 'city', flag: 'ðŸ‡µðŸ‡°' },
  { name: 'Islamabad', country: 'Pakistan', type: 'city', flag: 'ðŸ‡µðŸ‡°' },
  { name: 'Dhaka', country: 'Bangladesh', type: 'city', flag: 'ðŸ‡§ðŸ‡©' },
  { name: 'Colombo', country: 'Sri Lanka', type: 'city', flag: 'ðŸ‡±ðŸ‡°' },
  { name: 'Kathmandu', country: 'Nepal', type: 'city', flag: 'ðŸ‡³ðŸ‡µ' },
  { name: 'Male', country: 'Maldives', type: 'city', flag: 'ðŸ‡²ðŸ‡»' },
  { name: 'Cape Town', country: 'South Africa', type: 'city', flag: 'ðŸ‡¿ðŸ‡¦' },
  { name: 'Johannesburg', country: 'South Africa', type: 'city', flag: 'ðŸ‡¿ðŸ‡¦' },
  { name: 'Durban', country: 'South Africa', type: 'city', flag: 'ðŸ‡¿ðŸ‡¦' },
  { name: 'Cairo', country: 'Egypt', type: 'city', flag: 'ðŸ‡ªðŸ‡¬' },
  { name: 'Alexandria', country: 'Egypt', type: 'city', flag: 'ðŸ‡ªðŸ‡¬' },
  { name: 'Sharm El Sheikh', country: 'Egypt', type: 'city', flag: 'ðŸ‡ªðŸ‡¬' },
  { name: 'Marrakech', country: 'Morocco', type: 'city', flag: 'ðŸ‡²ðŸ‡¦' },
  { name: 'Casablanca', country: 'Morocco', type: 'city', flag: 'ðŸ‡²ðŸ‡¦' },
  { name: 'Nairobi', country: 'Kenya', type: 'city', flag: 'ðŸ‡°ðŸ‡ª' },
  { name: 'Lagos', country: 'Nigeria', type: 'city', flag: 'ðŸ‡³ðŸ‡¬' },
  { name: 'Accra', country: 'Ghana', type: 'city', flag: 'ðŸ‡¬ðŸ‡­' },
  { name: 'Addis Ababa', country: 'Ethiopia', type: 'city', flag: 'ðŸ‡ªðŸ‡¹' },
  { name: 'Zanzibar', country: 'Tanzania', type: 'city', flag: 'ðŸ‡¹ðŸ‡¿' },
  { name: 'Mauritius', country: 'Mauritius', type: 'city', flag: 'ðŸ‡²ðŸ‡º' },
  { name: 'Windhoek', country: 'Namibia', type: 'city', flag: 'ðŸ‡³ðŸ‡¦' },
  { name: 'Gaborone', country: 'Botswana', type: 'city', flag: 'ðŸ‡§ðŸ‡¼' },
  { name: 'Dubai', country: 'UAE', type: 'city', flag: 'ðŸ‡¦ðŸ‡ª' },
  { name: 'Abu Dhabi', country: 'UAE', type: 'city', flag: 'ðŸ‡¦ðŸ‡ª' },
  { name: 'Sharjah', country: 'UAE', type: 'city', flag: 'ðŸ‡¦ðŸ‡ª' },
  { name: 'Doha', country: 'Qatar', type: 'city', flag: 'ðŸ‡¶ðŸ‡¦' },
  { name: 'Riyadh', country: 'Saudi Arabia', type: 'city', flag: 'ðŸ‡¸ðŸ‡¦' },
  { name: 'Jeddah', country: 'Saudi Arabia', type: 'city', flag: 'ðŸ‡¸ðŸ‡¦' },
  { name: 'Kuwait City', country: 'Kuwait', type: 'city', flag: 'ðŸ‡°ðŸ‡¼' },
  { name: 'Manama', country: 'Bahrain', type: 'city', flag: 'ðŸ‡§ðŸ‡­' },
  { name: 'Muscat', country: 'Oman', type: 'city', flag: 'ðŸ‡´ðŸ‡²' },
  { name: 'Amman', country: 'Jordan', type: 'city', flag: 'ðŸ‡¯ðŸ‡´' },
  { name: 'Beirut', country: 'Lebanon', type: 'city', flag: 'ðŸ‡±ðŸ‡§' },
  { name: 'Tel Aviv', country: 'Israel', type: 'city', flag: 'ðŸ‡®ðŸ‡±' },
  { name: 'Istanbul', country: 'Turkey', type: 'city', flag: 'ðŸ‡¹ðŸ‡·' },
  { name: 'Antalya', country: 'Turkey', type: 'city', flag: 'ðŸ‡¹ðŸ‡·' },
  { name: 'Sydney', country: 'Australia', type: 'city', flag: 'ðŸ‡¦ðŸ‡º' },
  { name: 'Melbourne', country: 'Australia', type: 'city', flag: 'ðŸ‡¦ðŸ‡º' },
  { name: 'Brisbane', country: 'Australia', type: 'city', flag: 'ðŸ‡¦ðŸ‡º' },
  { name: 'Perth', country: 'Australia', type: 'city', flag: 'ðŸ‡¦ðŸ‡º' },
  { name: 'Adelaide', country: 'Australia', type: 'city', flag: 'ðŸ‡¦ðŸ‡º' },
  { name: 'Gold Coast', country: 'Australia', type: 'city', flag: 'ðŸ‡¦ðŸ‡º' },
  { name: 'Cairns', country: 'Australia', type: 'city', flag: 'ðŸ‡¦ðŸ‡º' },
  { name: 'Auckland', country: 'New Zealand', type: 'city', flag: 'ðŸ‡³ðŸ‡¿' },
  { name: 'Christchurch', country: 'New Zealand', type: 'city', flag: 'ðŸ‡³ðŸ‡¿' },
  { name: 'Queenstown', country: 'New Zealand', type: 'city', flag: 'ðŸ‡³ðŸ‡¿' },
  { name: 'New York', country: 'USA', type: 'city', flag: 'ðŸ‡ºðŸ‡¸' },
  { name: 'Los Angeles', country: 'USA', type: 'city', flag: 'ðŸ‡ºðŸ‡¸' },
  { name: 'San Francisco', country: 'USA', type: 'city', flag: 'ðŸ‡ºðŸ‡¸' },
  { name: 'Miami', country: 'USA', type: 'city', flag: 'ðŸ‡ºðŸ‡¸' },
  { name: 'Las Vegas', country: 'USA', type: 'city', flag: 'ðŸ‡ºðŸ‡¸' },
  { name: 'Chicago', country: 'USA', type: 'city', flag: 'ðŸ‡ºðŸ‡¸' },
  { name: 'Orlando', country: 'USA', type: 'city', flag: 'ðŸ‡ºðŸ‡¸' },
  { name: 'Honolulu', country: 'USA', type: 'city', flag: 'ðŸ‡ºðŸ‡¸' },
  { name: 'London', country: 'UK', type: 'city', flag: 'ðŸ‡¬ðŸ‡§' },
  { name: 'Manchester', country: 'UK', type: 'city', flag: 'ðŸ‡¬ðŸ‡§' },
  { name: 'Edinburgh', country: 'UK', type: 'city', flag: 'ðŸ‡¬ðŸ‡§' },
  { name: 'Dublin', country: 'Ireland', type: 'city', flag: 'ðŸ‡®ðŸ‡ª' },
  { name: 'Paris', country: 'France', type: 'city', flag: 'ðŸ‡«ðŸ‡·' },
  { name: 'Nice', country: 'France', type: 'city', flag: 'ðŸ‡«ðŸ‡·' },
  { name: 'Munich', country: 'Germany', type: 'city', flag: 'ðŸ‡©ðŸ‡ª' },
  { name: 'Berlin', country: 'Germany', type: 'city', flag: 'ðŸ‡©ðŸ‡ª' },
  { name: 'Frankfurt', country: 'Germany', type: 'city', flag: 'ðŸ‡©ðŸ‡ª' },
  { name: 'Rome', country: 'Italy', type: 'city', flag: 'ðŸ‡®ðŸ‡¹' },
  { name: 'Milan', country: 'Italy', type: 'city', flag: 'ðŸ‡®ðŸ‡¹' },
  { name: 'Venice', country: 'Italy', type: 'city', flag: 'ðŸ‡®ðŸ‡¹' },
  { name: 'Barcelona', country: 'Spain', type: 'city', flag: 'ðŸ‡ªðŸ‡¸' },
  { name: 'Madrid', country: 'Spain', type: 'city', flag: 'ðŸ‡ªðŸ‡¸' },
  { name: 'Amsterdam', country: 'Netherlands', type: 'city', flag: 'ðŸ‡³ðŸ‡±' },
  { name: 'Zurich', country: 'Switzerland', type: 'city', flag: 'ðŸ‡¨ðŸ‡­' },
  { name: 'Vienna', country: 'Austria', type: 'city', flag: 'ðŸ‡¦ðŸ‡¹' },
  { name: 'Lisbon', country: 'Portugal', type: 'city', flag: 'ðŸ‡µðŸ‡¹' },
  { name: 'Athens', country: 'Greece', type: 'city', flag: 'ðŸ‡¬ðŸ‡·' },
  { name: 'Prague', country: 'Czech Republic', type: 'city', flag: 'ðŸ‡¨ðŸ‡¿' },
  { name: 'Copenhagen', country: 'Denmark', type: 'city', flag: 'ðŸ‡©ðŸ‡°' },
  { name: 'Stockholm', country: 'Sweden', type: 'city', flag: 'ðŸ‡¸ðŸ‡ª' },
  { name: 'Oslo', country: 'Norway', type: 'city', flag: 'ðŸ‡³ðŸ‡´' },
  { name: 'Tokyo', country: 'Japan', type: 'city', flag: 'ðŸ‡¯ðŸ‡µ' },
  { name: 'Osaka', country: 'Japan', type: 'city', flag: 'ðŸ‡¯ðŸ‡µ' },
  { name: 'Seoul', country: 'South Korea', type: 'city', flag: 'ðŸ‡°ðŸ‡·' },
  { name: 'Beijing', country: 'China', type: 'city', flag: 'ðŸ‡¨ðŸ‡³' },
  { name: 'Shanghai', country: 'China', type: 'city', flag: 'ðŸ‡¨ðŸ‡³' },
  { name: 'Hong Kong', country: 'China', type: 'city', flag: 'ðŸ‡­ðŸ‡°' },
  { name: 'Singapore', country: 'Singapore', type: 'city', flag: 'ðŸ‡¸ðŸ‡¬' },
  { name: 'Bangkok', country: 'Thailand', type: 'city', flag: 'ðŸ‡¹ðŸ‡­' },
  { name: 'Phuket', country: 'Thailand', type: 'city', flag: 'ðŸ‡¹ðŸ‡­' },
  { name: 'Kuala Lumpur', country: 'Malaysia', type: 'city', flag: 'ðŸ‡²ðŸ‡¾' },
  { name: 'Bali', country: 'Indonesia', type: 'city', flag: 'ðŸ‡®ðŸ‡©' },
  { name: 'Jakarta', country: 'Indonesia', type: 'city', flag: 'ðŸ‡®ðŸ‡©' },
  { name: 'Manila', country: 'Philippines', type: 'city', flag: 'ðŸ‡µðŸ‡­' },
  { name: 'Ho Chi Minh City', country: 'Vietnam', type: 'city', flag: 'ðŸ‡»ðŸ‡³' },
  { name: 'Hanoi', country: 'Vietnam', type: 'city', flag: 'ðŸ‡»ðŸ‡³' },
  { name: 'Toronto', country: 'Canada', type: 'city', flag: 'ðŸ‡¨ðŸ‡¦' },
  { name: 'Vancouver', country: 'Canada', type: 'city', flag: 'ðŸ‡¨ðŸ‡¦' },
  { name: 'Montreal', country: 'Canada', type: 'city', flag: 'ðŸ‡¨ðŸ‡¦' },
  { name: 'Mexico City', country: 'Mexico', type: 'city', flag: 'ðŸ‡²ðŸ‡½' },
  { name: 'Cancun', country: 'Mexico', type: 'city', flag: 'ðŸ‡²ðŸ‡½' },
  { name: 'Sao Paulo', country: 'Brazil', type: 'city', flag: 'ðŸ‡§ðŸ‡·' },
  { name: 'Rio de Janeiro', country: 'Brazil', type: 'city', flag: 'ðŸ‡§ðŸ‡·' },
  { name: 'Buenos Aires', country: 'Argentina', type: 'city', flag: 'ðŸ‡¦ðŸ‡·' },
  { name: 'Santiago', country: 'Chile', type: 'city', flag: 'ðŸ‡¨ðŸ‡±' },
  { name: 'Lima', country: 'Peru', type: 'city', flag: 'ðŸ‡µðŸ‡ª' },
]

// ============================================================
// PRICE TIER COLOR SYSTEM
// ============================================================
function getPriceTier(price, allPrices) {
  if (!price || allPrices.length === 0) return {
    tier: 'standard', label: 'Standard', gradient: 'from-slate-500 to-slate-600',
    icon: DollarSign, badge: 'bg-slate-100 text-slate-700 border-slate-200',
  }
  const sorted = [...allPrices].sort((a, b) => a - b)
  const p25 = sorted[Math.floor(sorted.length * 0.25)] || 0
  const p50 = sorted[Math.floor(sorted.length * 0.5)] || 0
  const p75 = sorted[Math.floor(sorted.length * 0.75)] || 0
  if (price <= p25) return { tier: 'budget', label: 'Budget Pick', gradient: 'from-emerald-500 to-teal-500', icon: TrendingDown, badge: 'bg-emerald-500 text-white' }
  if (price <= p50) return { tier: 'good', label: 'Great Value', gradient: 'from-cyan-500 to-blue-500', icon: Award, badge: 'bg-cyan-500 text-white' }
  if (price <= p75) return { tier: 'premium', label: 'Premium', gradient: 'from-amber-500 to-orange-500', icon: DollarSign, badge: 'bg-amber-500 text-white' }
  return { tier: 'luxury', label: 'Luxury', gradient: 'from-rose-500 to-pink-500', icon: TrendingUp, badge: 'bg-rose-500 text-white' }
}

async function parseSSE(response) {
  const text = await response.text()
  if (text.trim().startsWith('{') && !text.includes('\ndata: ')) return JSON.parse(text)
  const lines = text.split('\n')
  let lastData = null
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const payload = line.slice(6).trim()
      if (payload && payload !== '[DONE]') { try { lastData = JSON.parse(payload) } catch {} }
    }
  }
  if (lastData) return lastData
  throw new Error('Invalid response format')
}

// Format number with thousands separator
const fmtNum = (n) => n?.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'

export default function CarBooking() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [downloading, setDownloading] = useState(null)
  const [savedId, setSavedId] = useState(null)
  const [locationQuery, setLocationQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [priceFilter, setPriceFilter] = useState('all')
  const suggestionsRef = useRef(null)
  const { user, saveBooking } = useAuth()
  const { location: userLocation } = useUser()

  const today = new Date()
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date(today); nextWeek.setDate(nextWeek.getDate() + 7)

  const [form, setForm] = useState({
    location: 'Sydney',
    pickupDate: tomorrow.toISOString().split('T')[0],
    dropoffDate: nextWeek.toISOString().split('T')[0],
    pickupTime: '10:00', dropoffTime: '10:00',
    age: 30, currency: 'AUD',
  })

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  // Auto-detect country
  useEffect(() => {
    if (!userLocation?.country_code) return
    const airports = getAirportsForCountry(userLocation.country_code)
    if (airports.length > 0 && form.location === 'Sydney') {
      updateForm('location', airports[0].city)
      setLocationQuery(airports[0].city)
    }
    const curMap = { 'AU': 'AUD', 'NZ': 'NZD', 'US': 'USD', 'GB': 'GBP', 'CA': 'CAD', 'IN': 'INR', 'PK': 'PKR', 'AE': 'AED', 'SA': 'SAR', 'JP': 'JPY', 'SG': 'SGD', 'ZA': 'ZAR', 'FR': 'EUR', 'DE': 'EUR', 'IT': 'EUR', 'ES': 'EUR' }
    if (curMap[userLocation.country_code]) updateForm('currency', curMap[userLocation.country_code])
  }, [userLocation?.country_code])

  const filteredLocations = locationQuery.length > 0
    ? WORLD_LOCATIONS.filter(l => l.name.toLowerCase().includes(locationQuery.toLowerCase()) || l.country.toLowerCase().includes(locationQuery.toLowerCase())).slice(0, 10)
    : WORLD_LOCATIONS.slice(0, 10)

  useEffect(() => {
    const handleClick = (e) => { if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) setShowSuggestions(false) }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selectLocation = (loc) => {
    updateForm('location', loc.name); setLocationQuery(loc.name); setShowSuggestions(false)
  }

  const searchCars = async () => {
    if (!form.location) return setError('Please enter a pickup location')
    if (!form.pickupDate || !form.dropoffDate) return setError('Please select pickup and dropoff dates')
    if (new Date(form.dropoffDate) <= new Date(form.pickupDate)) return setError('Dropoff date must be after pickup date')
    setLoading(true); setError(''); setCars([]); setPriceFilter('all')
    try {
      const response = await fetch('/api/octotrip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json, text/event-stream' },
        body: JSON.stringify({
          jsonrpc: '2.0', id: Date.now(), method: 'tools/call',
          params: { name: 'search', arguments: {
            location: form.location, pickup_date: form.pickupDate, dropoff_date: form.dropoffDate,
            pickup_time: form.pickupTime, dropoff_time: form.dropoffTime,
            age: parseInt(form.age), currency: form.currency, language: 'en',
          }},
        }),
      })
      if (!response.ok) throw new Error('Server returned ' + response.status)
      const data = await parseSSE(response)
      if (data.error) throw new Error(data.error.message || 'Search failed')
      let payload = data
      if (data?.result?.content?.[0]?.text) { try { payload = JSON.parse(data.result.content[0].text) } catch { payload = data.result } }
      const results = payload.results || payload.cars || []
      if (results.length === 0) setError('No cars available at "' + form.location + '" for those dates.')
      else setCars(results)
    } catch (err) {
      setError(err.message || 'Search failed. Please try again.')
    } finally { setLoading(false) }
  }

  const handleSaveBooking = async (car) => {
    if (!user) { alert('Please sign in to save bookings'); return }
    const { error } = await saveBooking({
      type: 'car', provider: car.vendor, title: car.name, location: form.location,
      startDate: new Date(form.pickupDate + 'T' + form.pickupTime).toISOString(),
      endDate: new Date(form.dropoffDate + 'T' + form.dropoffTime).toISOString(),
      price: car.price, currency: car.currency || form.currency,
      reference: 'CAR-' + Date.now().toString(36).toUpperCase().slice(-6),
      rawData: { ...car, rentalForm: form },
    })
    if (error) alert('Could not save: ' + error.message)
    else { setSavedId(car.sipp + car.vendor); setTimeout(() => setSavedId(null), 2500) }
  }

  const handleDownloadVoucher = async (car) => {
    setDownloading(car.sipp + car.vendor)
    try { await downloadCarVoucher(car, form) }
    catch (err) { alert('Could not generate voucher: ' + err.message) }
    finally { setDownloading(null) }
  }

  const allPrices = cars.map(c => c.price).filter(p => typeof p === 'number')
  const carsWithTiers = cars.map(c => ({ ...c, _tier: getPriceTier(c.price, allPrices) }))
  const presentTiers = ['all', ...new Set(carsWithTiers.map(c => c._tier.tier))]
  const categories = ['all', ...new Set(cars.map(c => c.category).filter(Boolean))]
  const filteredCars = carsWithTiers
    .filter(c => selectedCategory === 'all' || c.category === selectedCategory)
    .filter(c => priceFilter === 'all' || c._tier.tier === priceFilter)
  const tierOrder = { budget: 0, good: 1, premium: 2, luxury: 3, standard: 4 }
  filteredCars.sort((a, b) => tierOrder[a._tier.tier] - tierOrder[b._tier.tier])

  return (
    <div className="w-full">
      {/* ==================== HERO ==================== */}
      <div className="relative overflow-hidden rounded-2xl mb-6 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59,130,246,0.4) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168,85,247,0.4) 0%, transparent 50%)' }}></div>
        <div className="relative z-10 p-6 md:p-10 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Car className="h-7 w-7 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight">Find Your Ride</h1>
              <p className="text-cyan-200 text-xs md:text-sm font-medium">Worldwide car rental comparison</p>
            </div>
          </div>
          <p className="text-white/80 max-w-2xl mt-2 text-xs md:text-sm">
            Real-time prices from trusted vendors in 150+ countries. Colour-coded tiers help you spot the best deal.
          </p>
        </div>
      </div>

      {/* ==================== SEARCH FORM ==================== */}
      <Card className="mb-6 border-0 shadow-xl bg-card/95 backdrop-blur overflow-visible">
        <CardContent className="p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="lg:col-span-2 relative" ref={suggestionsRef}>
              <label className="text-sm font-semibold mb-1.5 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" /> Pickup Location
              </label>
              <div className="relative">
                <Input
                  value={locationQuery || form.location}
                  onChange={(e) => { setLocationQuery(e.target.value); setShowSuggestions(true); updateForm('location', e.target.value) }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder={userLocation?.country_code ? countryFlag(userLocation.country_code) + ' ' + (userLocation.country_name || 'Detected') : 'Search worldwide...'}
                  className="h-11 pr-10"
                />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
              {showSuggestions && filteredLocations.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                  {filteredLocations.map((loc, i) => (
                    <button key={i} onClick={() => selectLocation(loc)} className="w-full text-left px-3 py-2.5 hover:bg-muted transition-colors flex items-center gap-3 border-b border-border last:border-0">
                      <span className="text-xl">{loc.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm flex items-center gap-1.5">
                          {loc.type === 'airport' ? <Plane className="h-3 w-3 text-primary" /> : <Building2 className="h-3 w-3 text-muted-foreground" />}
                          {loc.name}
                        </div>
                        <div className="text-xs text-muted-foreground">{loc.country}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="text-sm font-semibold mb-1.5 flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" /> Pickup</label>
              <Input type="date" onClick={(e) => e.target.showPicker?.()} value={form.pickupDate} onChange={(e) => updateForm('pickupDate', e.target.value)} className="h-11" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1.5 flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" /> Dropoff</label>
              <Input type="date" onClick={(e) => e.target.showPicker?.()} value={form.dropoffDate} onChange={(e) => updateForm('dropoffDate', e.target.value)} className="h-11" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1.5">Pickup Time</label>
              <Input type="time" onClick={(e) => e.target.showPicker?.()} value={form.pickupTime} onChange={(e) => updateForm('pickupTime', e.target.value)} className="h-11" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1.5">Dropoff Time</label>
              <Input type="time" onClick={(e) => e.target.showPicker?.()} value={form.dropoffTime} onChange={(e) => updateForm('dropoffTime', e.target.value)} className="h-11" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1.5 flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" /> Age</label>
              <Input type="number" min="18" max="99" value={form.age} onChange={(e) => updateForm('age', e.target.value)} className="h-11" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1.5">Currency</label>
              <select value={form.currency} onChange={(e) => updateForm('currency', e.target.value)} className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground">
                <option value="AUD">AUD $</option><option value="USD">USD $</option><option value="EUR">EUR €</option>
                <option value="GBP">GBP £</option><option value="NZD">NZD $</option><option value="JPY">JPY ¥</option>
                <option value="SGD">SGD $</option><option value="AED">AED Ø¯.Ø¥</option><option value="INR">INR ₹</option>
                <option value="PKR">PKR â‚¨</option><option value="ZAR">ZAR R</option><option value="CAD">CAD $</option>
              </select>
            </div>
          </div>

          <Button onClick={searchCars} disabled={loading} className="w-full md:w-auto bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 hover:opacity-90 text-white h-12 px-10 shadow-lg font-semibold text-base">
            {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Search className="h-5 w-5 mr-2" />}
            {loading ? 'Searching...' : 'Search Cars'}
          </Button>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs text-muted-foreground self-center">Popular:</span>
            {['Sydney', 'London', 'Tokyo', 'Dubai', 'Mumbai', 'New York', 'Istanbul'].map(city => (
              <button key={city} onClick={() => { updateForm('location', city); setLocationQuery(city) }} className="text-xs bg-muted hover:bg-primary hover:text-white px-3 py-1 rounded-full transition-colors">{city}</button>
            ))}
          </div>

          {error && (
            <div className="mt-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm border border-red-200 dark:border-red-900">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ==================== FILTERS ==================== */}
      {cars.length > 0 && (
        <div className="space-y-3 mb-5">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={'px-4 py-2 rounded-full text-sm font-medium transition-all ' + (selectedCategory === cat ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' : 'bg-muted hover:bg-muted/70')}>
                {cat === 'all' ? 'All Cars' : cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-muted-foreground font-medium">Price tier:</span>
            {presentTiers.map(tier => {
              const config = {
                all: { label: 'All Prices', color: 'bg-slate-600', icon: DollarSign },
                budget: { label: 'Budget', color: 'bg-emerald-500', icon: TrendingDown },
                good: { label: 'Great Value', color: 'bg-cyan-500', icon: Award },
                premium: { label: 'Premium', color: 'bg-amber-500', icon: DollarSign },
                luxury: { label: 'Luxury', color: 'bg-rose-500', icon: TrendingUp },
                standard: { label: 'Standard', color: 'bg-slate-500', icon: DollarSign },
              }[tier]
              const Icon = config.icon
              return (
                <button key={tier} onClick={() => setPriceFilter(tier)}
                  className={'px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ' + (priceFilter === tier ? config.color + ' text-white shadow-md' : 'bg-muted hover:bg-muted/70')}>
                  <Icon className="h-3 w-3" /> {config.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ==================== RESULTS ==================== */}
      {filteredCars.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCars.map((car, idx) => {
            const tier = car._tier
            const gradient = tier.gradient
            const TierIcon = tier.icon
            const rentalDays = car.rental_days || 4
            return (
              <Card key={idx} className="overflow-hidden border border-border shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group bg-card flex flex-col">
                {/* --- Image Section --- */}
                <div className="relative overflow-hidden bg-muted">
                  {car.image_url ? (
                    <img
                      src={car.image_url}
                      alt={car.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.onerror = null; e.target.src = ''; e.target.style.display = 'none' }}
                    />
                  ) : null}
                  {!car.image_url && (
                    <div className={'w-full h-48 bg-gradient-to-br ' + gradient + ' flex items-center justify-center text-white'}>
                      <Car className="h-20 w-20 opacity-70" />
                    </div>
                  )}

                  {/* Tier ribbon — clean, top-right */}
                  <div className={'absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 shadow-lg bg-gradient-to-r ' + gradient}>
                    <TierIcon className="h-3.5 w-3.5" />
                    {tier.label}
                  </div>

                  {/* Category — top-left */}
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {car.category || 'Vehicle'}
                  </div>

                  {/* Free cancel — bottom-left of image */}
                  {car.free_cancellation && (
                    <div className="absolute bottom-3 left-3 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <CheckCircle2 className="h-3 w-3" /> Free cancellation
                    </div>
                  )}
                </div>

                {/* --- Content Section --- */}
                <CardContent className="p-5 flex-1 flex flex-col">
                  {/* Title + Vendor */}
                  <div className="mb-4">
                    <h3 className="font-bold text-lg leading-snug mb-1 line-clamp-2" title={car.name}>
                      {car.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground font-medium">{car.vendor}</p>
                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-full">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400">4.5</span>
                      </div>
                    </div>
                  </div>

                  {/* Specs — 3 clean tiles */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col items-center justify-center bg-muted/50 rounded-xl py-3 border border-border">
                      <Users2 className="h-5 w-5 text-primary mb-1" />
                      <span className="text-sm font-bold">{car.passengers || 5}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Seats</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-muted/50 rounded-xl py-3 border border-border">
                      <Briefcase className="h-5 w-5 text-primary mb-1" />
                      <span className="text-sm font-bold">{car.bags || 2}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Bags</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-muted/50 rounded-xl py-3 border border-border">
                      <Gauge className="h-5 w-5 text-primary mb-1" />
                      <span className="text-sm font-bold capitalize">{car.transmission?.slice(0, 4) || 'Auto'}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Gear</span>
                    </div>
                  </div>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {car.air_con && (
                      <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-[11px] font-medium px-2 py-1 rounded-md">
                        <Snowflake className="h-3 w-3" /> A/C
                      </span>
                    )}
                    <span className="flex items-center gap-1 bg-muted text-muted-foreground text-[11px] font-medium px-2 py-1 rounded-md">
                      <Fuel className="h-3 w-3" /> {car.fuel_policy || 'Full-Full'}
                    </span>
                    {car.mileage === 'Unlimited' && (
                      <span className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium px-2 py-1 rounded-md">
                        â™¾ï¸ Unlimited km
                      </span>
                    )}
                  </div>

                  {/* Price block — clear hierarchy */}
                  <div className="mt-auto">
                    <div className="bg-muted/40 border border-border rounded-xl p-4 mb-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">
                            Total · {rentalDays} days
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs font-bold text-muted-foreground">{car.currency || 'AUD'}</span>
                            <span className="text-2xl font-black text-foreground tabular-nums">
                              {fmtNum(car.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {car.price_per_day && (
                        <div className="mt-2 pt-2 border-t border-border text-[11px] text-muted-foreground flex items-center justify-between">
                          <span>Equivalent per day</span>
                          <span className="font-semibold text-foreground">
                            {car.currency || 'AUD'} {fmtNum(car.price_per_day)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <a href={car.booking_url} target="_blank" rel="noopener noreferrer" className="col-span-2">
                        <Button className={'w-full bg-gradient-to-r ' + gradient + ' hover:opacity-90 text-white font-semibold h-11'}>
                          <ExternalLink className="h-4 w-4 mr-2" /> Book Now
                        </Button>
                      </a>
                      <Button
                        variant="outline"
                        onClick={() => handleSaveBooking(car)}
                        className="h-10"
                        title="Save to my account"
                      >
                        {savedId === car.sipp + car.vendor ? (
                          <><CheckCircle2 className="h-4 w-4 mr-1.5 text-emerald-500" /> Saved</>
                        ) : (
                          <><Heart className="h-4 w-4 mr-1.5" /> Save</>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDownloadVoucher(car)}
                        disabled={downloading === car.sipp + car.vendor}
                        className="h-10"
                        title="Download PDF voucher"
                      >
                        {downloading === car.sipp + car.vendor ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <><Download className="h-4 w-4 mr-1.5" /> PDF</>
                        )}
                      </Button>
                      <div className="col-span-2">
                        <CalendarExport
                          title={car.name + ' - ' + car.vendor}
                          description={'Rental at ' + form.location + ' · ' + car.category}
                          location={form.location}
                          startDate={new Date(form.pickupDate + 'T' + form.pickupTime).toISOString()}
                          endDate={new Date(form.dropoffDate + 'T' + form.dropoffTime).toISOString()}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && cars.length === 0 && !error && (
        <Card className="border-dashed border-2 border-border bg-gradient-to-br from-muted/30 to-muted/10">
          <CardContent className="p-12 text-center">
            <div className="inline-flex p-5 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 mb-5 shadow-lg">
              <Car className="h-14 w-14 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Ready to hit the road?</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-5">
              Compare cars worldwide — colour-coded prices help you spot the best deal instantly.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="text-xs bg-emerald-500 text-white px-3 py-1.5 rounded-full font-semibold">Budget</span>
              <span className="text-xs bg-cyan-500 text-white px-3 py-1.5 rounded-full font-semibold">Great Value</span>
              <span className="text-xs bg-amber-500 text-white px-3 py-1.5 rounded-full font-semibold">Premium</span>
              <span className="text-xs bg-rose-500 text-white px-3 py-1.5 rounded-full font-semibold">Luxury</span>
            </div>
          </CardContent>
        </Card>
      )}

      {cars.length > 0 && (
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Results powered by <a href="https://octotrip.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OctoTrip</a>. Tier colours are relative to each search.</p>
        </div>
      )}
    </div>
  )
}