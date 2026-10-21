import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Globe, MapPin, Phone, Zap, ShieldCheck, DollarSign, Users, Landmark, Languages, Compass, Sun } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { getCountryProfile } from '../data/countryProfiles'
import { setPageMeta } from '../lib/seo'

export default function CountryProfilePage() {
  const { code } = useParams()
  const country = getCountryProfile(code)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    if (country) {
      document.title = `${country.name} Country Code ${country.dialCode} | Area Codes & Stats | TimeGovern`
      const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
      meta.content = `How to call ${country.name}. Find the ${country.name} country code ${country.dialCode}, city area codes, time zone, and key statistics.`
      if (!meta.parentNode) document.head.appendChild(meta)
      setPageMeta()

      // Live Clock Update
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
      return () => clearInterval(interval)
    }
  }, [country])

  if (!country) {
    return (
      <div className="container mx-auto p-10 text-center space-y-4">
        <h1 className="text-2xl font-bold">Country not found</h1>
        <Link to="/country-codes" className="text-blue-500 hover:underline">Go back to all country codes</Link>
      </div>
    )
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Country',
    name: country.name,
    alternateName: country.iso2,
    description: `Country code ${country.dialCode} for ${country.name}. Capital: ${country.capital}.`
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      
      <div className="container mx-auto p-4 max-w-6xl space-y-8 py-8">
        
        {/* HEADER */}
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
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center shadow-md">
              <div className="text-2xl font-bold">{country.dialCode}</div>
              <div className="text-[10px] font-semibold tracking-wider uppercase">Dialing</div>
            </div>
            <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-center shadow-md">
              <div className="text-2xl font-bold">{country.iso2}</div>
              <div className="text-[10px] font-semibold tracking-wider uppercase">ISO 2</div>
            </div>
            <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-center shadow-md">
              <div className="text-2xl font-bold">{country.iso3}</div>
              <div className="text-[10px] font-semibold tracking-wider uppercase">ISO 3</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR (Stats) */}
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
                    <div><div className="font-semibold text-slate-900 dark:text-white">Population</div><div className="text-slate-600 dark:text-slate-400">{country.population}</div></div>
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
                    <div><div className="font-semibold text-slate-900 dark:text-white">Languages</div><div className="text-slate-600 dark:text-slate-400">{country.languages}</div></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-4 w-4 text-slate-400 mt-0.5" />
                    <div><div className="font-semibold text-slate-900 dark:text-white">Electricity</div><div className="text-slate-600 dark:text-slate-400">{country.plugTypes?.join(', ') || 'N/A'}</div></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white">Need to schedule a call?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Use our live tools to find the best time to talk to someone in {country.name}.</p>
              <Link to="/time-zone-converter" className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition">
                Open Time Zone Converter
              </Link>
            </div>
          </div>

          {/* RIGHT MAIN AREA (Time, Weather, Codes) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* LIVE TIME & WEATHER WIDGETS */}
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
                    <Link to={`/weather/${country.cityForTime}`} className="text-lg font-bold text-slate-900 dark:text-white hover:underline">
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
                  To call {country.name} from another country, dial your international access code, then <strong>{country.dialCode}</strong>, followed by the area code and local number.
                </p>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm">
                  [Intl Access Code] + <strong className="text-blue-600 dark:text-blue-400">{country.dialCode}</strong> + [Area Code] + [Local Number]
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-0 overflow-hidden">
                <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{country.name} City Codes</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Dialing codes for major cities</p>
                  </div>
                  <MapPin className="h-5 w-5 text-slate-400" />
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {country.cityCodes && country.cityCodes.length > 0 ? (
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-400">City</th>
                          <th className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-400 text-right">Dialing Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        {country.cityCodes.map((cc, i) => (
                          <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-4 py-2 font-medium text-slate-900 dark:text-white">{cc.city}</td>
                            <td className="px-4 py-2 text-right font-mono text-emerald-600 dark:text-emerald-400">{cc.code}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-6 text-center text-slate-500 text-sm">
                      City-level dialing codes for {country.name} are being updated.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </>
  )
}