import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Globe, MapPin, Phone, Zap, ShieldCheck, DollarSign, Users, Landmark, Languages, Calculator, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { getCountryProfile, getAllCountries } from '../data/countryProfiles'
import { setPageMeta } from '../lib/seo'

export default function CountryProfilePage() {
  const { code } = useParams()
  const country = getCountryProfile(code)
  
  // Get neighboring countries for the "More Countries" section
  const allCountries = getAllCountries()
  const sameRegion = allCountries.filter(c => c.iso2 !== country?.iso2).slice(0, 8)

  useEffect(() => {
    if (country) {
      document.title = `${country.name} Country Code ${country.dialCode} | Area Codes & Stats | TimeGovern`
      const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
      meta.content = `How to call ${country.name}. Find the ${country.name} country code ${country.dialCode}, city area codes, time zone, and key statistics.`
      if (!meta.parentNode) document.head.appendChild(meta)
      setPageMeta()
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

  return (
    <div className="container mx-auto p-4 max-w-6xl space-y-12 py-8">
      
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
                  <Landmark className="h-4 w-4 text-slate-400 mt-0.5" />
                  <div><div className="font-semibold text-slate-900 dark:text-white">Capital</div><div className="text-slate-600 dark:text-slate-400">{country.capital}</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-4 w-4 text-slate-400 mt-0.5" />
                  <div><div className="font-semibold text-slate-900 dark:text-white">Population</div><div className="text-slate-600 dark:text-slate-400">{country.population}</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="h-4 w-4 text-slate-400 mt-0.5" />
                  <div><div className="font-semibold text-slate-900 dark:text-white">Currency</div><div className="text-slate-600 dark:text-slate-400">{country.currency}</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <Languages className="h-4 w-4 text-slate-400 mt-0.5" />
                  <div><div className="font-semibold text-slate-900 dark:text-white">Languages</div><div className="text-slate-600 dark:text-slate-400">{country.languages}</div></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT MAIN AREA */}
        <div className="lg:col-span-8 space-y-8">
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
        </div>
      </div>

      {/* EXPLORE TOOLS SECTION */}
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-4">Explore {country.name} tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to={`/salary`} className="block group">
            <Card className="h-full group-hover:border-emerald-400 transition">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950 rounded-lg"><Calculator className="h-6 w-6 text-emerald-600 dark:text-emerald-400" /></div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Salary Calculators</div>
                  <div className="text-xs text-slate-500">Calculate take-home pay.</div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to={`/time-in/${country.cityForTime}`} className="block group">
            <Card className="h-full group-hover:border-blue-400 transition">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg"><Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" /></div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">World Clock</div>
                  <div className="text-xs text-slate-500">Live time in {country.capital}.</div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={`/time-zone-converter`} className="block group">
            <Card className="h-full group-hover:border-purple-400 transition">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-lg"><Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" /></div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Time Zone Converter</div>
                  <div className="text-xs text-slate-500">Convert {country.name} time.</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* MORE COUNTRIES SECTION */}
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-4">More countries</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sameRegion.map((c) => (
            <Link key={c.iso2} to={`/country/${c.iso2.toLowerCase()}`} className="block group">
              <Card className="group-hover:border-blue-400 transition">
                <CardContent className="p-4">
                  <div className="font-bold text-lg text-slate-900 dark:text-white">{c.iso2}</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300">{c.name}</div>
                  <div className="text-xs text-slate-500 mt-1">{c.dialCode}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* OFFICIAL SOURCES */}
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
        </div>
      </div>

    </div>
  )
}