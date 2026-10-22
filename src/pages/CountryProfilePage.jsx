import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Globe, MapPin, Phone, DollarSign, Users, Landmark, Languages, Calculator, ExternalLink, Compass, Sun } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { getCountryProfile, getAllCountries } from '../data/countryProfiles'
import { setPageMeta } from '../lib/seo'

export default function CountryProfilePage() {
  const { code } = useParams()
  const country = getCountryProfile(code)
  
  const [currentTime, setCurrentTime] = useState('')
  const [liveData, setLiveData] = useState({ population: null, languages: null })

  const allCountries = getAllCountries()
  const sameRegion = allCountries
    .filter(c => c.region === country?.region && c.iso2 !== country?.iso2)
    .slice(0, 8)

  useEffect(() => {
    if (country) {
      document.title = `${country.name} Country Code ${country.dialCode} | Area Codes & Stats | TimeGovern`
      const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
      meta.content = `How to call ${country.name}. Find the ${country.name} country code ${country.dialCode}, city area codes, time zone, and key statistics.`
      if (!meta.parentNode) document.head.appendChild(meta)
      setPageMeta()

      const updateTime = () => {
        try {
          const timeStr = new Date().toLocaleString('en-US', {
            timeZone: country.timezone,
            weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: true
          })
          setCurrentTime(timeStr)
        } catch (e) {
          setCurrentTime('Time unavailable')
        }
      }
      updateTime()
      const interval = setInterval(updateTime, 60000)

      // LIVE API FETCH for real-time population/languages
      const fetchLive = async () => {
        try {
          let res = await fetch(`https://restcountries.com/v3.1/alpha/${country.iso2}?fields=population,languages`)
          let data = await res.json()
          if (data && data[0]) {
            setLiveData({
              population: data[0].population ? data[0].population.toLocaleString('en-US') : null,
              languages: data[0].languages ? Object.values(data[0].languages).join(', ') : null
            })
          }
        } catch (err) {
          console.log('Live API failed, keeping static data')
        }
      }
      fetchLive()

      return () => clearInterval(interval)
    }
  }, [country])

  if (!country) {
    return (
      <div className="container mx-auto p-10 text-center space-y-4">
        <h1 className="text-2xl font-bold">Country not found</h1>
        <p className="text-slate-500">Could not find data for code: {code}</p>
        <Link to="/country-codes" className="text-blue-500 hover:underline">Go back to all country codes</Link>
      </div>
    )
  }

  const population = liveData.population || country.population || 'N/A'
  const languages = liveData.languages || country.languages || 'N/A'
  const isoLower = country.iso2.toLowerCase()

  return (
    <div className="container mx-auto p-4 max-w-6xl space-y-12 py-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <Link to="/country-codes" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Directory
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
            {country.name} Country Code <span className="text-blue-600 dark:text-blue-400">{country.dialCode}</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center shadow-md min-w-[80px]">
            <div className="text-2xl font-bold">{country.dialCode || 'N/A'}</div>
            <div className="text-[10px] font-semibold tracking-wider uppercase">Dialing</div>
          </div>
          <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-center shadow-md min-w-[80px]">
            <div className="text-2xl font-bold">{country.iso2}</div>
            <div className="text-[10px] font-semibold tracking-wider uppercase">ISO 2</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardContent className="p-5 space-y-4">
              <h3 className="font-bold text-lg border-b pb-2 text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" /> Statistics
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Compass className="h-4 w-4 text-slate-400 mt-0.5" />
                  <div><div className="font-semibold text-slate-900 dark:text-white">Lat / Lng</div><div className="text-slate-600 dark:text-slate-400">{country.lat} / {country.lng}</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <Landmark className="h-4 w-4 text-slate-400 mt-0.5" />
                  <div><div className="font-semibold text-slate-900 dark:text-white">Capital</div><div className="text-slate-600 dark:text-slate-400">{country.capital}</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-4 w-4 text-slate-400 mt-0.5" />
                  <div><div className="font-semibold text-slate-900 dark:text-white">Population</div><div className="text-slate-600 dark:text-slate-400">{population}</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                  <div><div className="font-semibold text-slate-900 dark:text-white">Area</div><div className="text-slate-600 dark:text-slate-400">{country.area}</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="h-4 w-4 text-slate-400 mt-0.5" />
                  <div><div className="font-semibold text-slate-900 dark:text-white">Currency</div><div className="text-slate-600 dark:text-slate-400">{country.currency}</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <Languages className="h-4 w-4 text-slate-400 mt-0.5" />
                  <div><div className="font-semibold text-slate-900 dark:text-white">Languages</div><div className="text-slate-600 dark:text-slate-400">{languages}</div></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border-blue-100 dark:border-slate-700">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Local Time</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">{currentTime || 'Loading...'}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{country.timezone}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 border-amber-100 dark:border-slate-700">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-full">
                  <Sun className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Weather</div>
                  <Link to={`/weather`} className="text-lg font-bold text-slate-900 dark:text-white hover:underline">
                    View Forecast
                  </Link>
                  <div className="text-xs text-slate-500 dark:text-slate-400">in {country.capital}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Phone className="h-5 w-5 text-emerald-500" /> How to Call {country.name}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                To call {country.name} from another country, dial your international access code, then <strong>{country.dialCode || 'N/A'}</strong>, followed by the area code and local number.
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm">
                [Intl Access Code] + <strong className="text-blue-600 dark:text-blue-400">{country.dialCode || 'N/A'}</strong> + [Area Code] + [Local Number]
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-4">Explore {country.name} tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {country.hasSalary && (
            <Link to={`/salary/${isoLower}`} className="block group">
              <Card className="h-full group-hover:border-emerald-400 transition">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                    <Calculator className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Salary Calculator</div>
                    <div className="text-xs text-slate-500">Calculate take-home pay.</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}

          <Link to={`/time-zone-converter`} className="block group">
            <Card className="h-full group-hover:border-purple-400 transition">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Time Zone Converter</div>
                  <div className="text-xs text-slate-500">Convert {country.name} time.</div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={`/world-clock/country/${isoLower}`} className="block group">
            <Card className="h-full group-hover:border-blue-400 transition">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">World Clock</div>
                  <div className="text-xs text-slate-500">Live time worldwide.</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {sameRegion.length > 0 && (
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-4">More {country.region} countries</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sameRegion.map((c) => (
              <Link key={c.iso2} to={`/country/${c.iso2.toLowerCase()}`} className="block group">
                <Card className="group-hover:border-blue-400 transition">
                  <CardContent className="p-4">
                    <div className="font-bold text-lg text-slate-900 dark:text-white">{c.iso2}</div>
                    <div className="font-semibold text-slate-700 dark:text-slate-300">{c.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{c.iso2} - {c.dialCode || 'N/A'}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-4">Official sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="https://www.iso.org/iso-3166-country-codes.html" target="_blank" rel="noreferrer" className="block group">
            <Card className="h-full group-hover:border-slate-400 transition">
              <CardContent className="p-5 flex items-start gap-4">
                <ExternalLink className="h-5 w-5 text-slate-400" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">ISO 3166</div>
                  <div className="text-xs text-slate-500">Official country code standard.</div>
                </div>
              </CardContent>
            </Card>
          </a>
          <a href="https://www.itu.int/en/ITU-T/inr/Pages/default.aspx" target="_blank" rel="noreferrer" className="block group">
            <Card className="h-full group-hover:border-slate-400 transition">
              <CardContent className="p-5 flex items-start gap-4">
                <ExternalLink className="h-5 w-5 text-slate-400" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">ITU</div>
                  <div className="text-xs text-slate-500">International dialing codes authority.</div>
                </div>
              </CardContent>
            </Card>
          </a>
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noreferrer" className="block group">
            <Card className="h-full group-hover:border-slate-400 transition">
              <CardContent className="p-5 flex items-start gap-4">
                <ExternalLink className="h-5 w-5 text-slate-400" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">IANA Time Zones</div>
                  <div className="text-xs text-slate-500">Timezone database used globally.</div>
                </div>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>
    </div>
  )
}