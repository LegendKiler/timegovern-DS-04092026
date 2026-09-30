import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from '../context/AuthContext'
import { downloadFlightVoucher } from './FlightBookingPdf'
import { Plane, PlaneTakeoff, PlaneLanding, Calendar, Search, Loader2, AlertCircle, ExternalLink, Heart, CheckCircle2, TrendingDown, Award, DollarSign, TrendingUp, Clock, Globe } from "lucide-react"

const POPULAR = [
  { from: 'SYD', to: 'MEL', label: 'Sydney-Melbourne' },
  { from: 'SYD', to: 'LHR', label: 'Sydney-London' },
  { from: 'MEL', to: 'DXB', label: 'Melbourne-Dubai' },
  { from: 'SYD', to: 'LAX', label: 'Sydney-LA' },
  { from: 'LHR', to: 'JFK', label: 'London-NY' },
  { from: 'DXB', to: 'BOM', label: 'Dubai-Mumbai' },
  { from: 'SIN', to: 'NRT', label: 'Singapore-Tokyo' },
]

function tier(price, all) {
  if (!price || !all.length) return { label: 'Standard', gradient: 'from-slate-500 to-slate-600', Icon: DollarSign }
  const s = [...all].sort((a, b) => a - b)
  const p25 = s[Math.floor(s.length * 0.25)]
  const p50 = s[Math.floor(s.length * 0.5)]
  const p75 = s[Math.floor(s.length * 0.75)]
  if (price <= p25) return { label: 'Cheapest', gradient: 'from-emerald-500 to-teal-500', Icon: TrendingDown }
  if (price <= p50) return { label: 'Great Value', gradient: 'from-cyan-500 to-blue-500', Icon: Award }
  if (price <= p75) return { label: 'Premium', gradient: 'from-amber-500 to-orange-500', Icon: DollarSign }
  return { label: 'Business', gradient: 'from-rose-500 to-pink-500', Icon: TrendingUp }
}

export default function FlightBooking() {
  const { user, saveBooking } = useAuth()
  const token = import.meta.env.VITE_TRAVELPAYOUTS_TOKEN || ''
  const nextMonth = new Date(); nextMonth.setDate(nextMonth.getDate() + 30)

  const [form, setForm] = useState({
    origin: 'SYD', destination: 'MEL',
    departDate: nextMonth.toISOString().split('T')[0],
    returnDate: '', tripType: 'oneway'
  })
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [savedId, setSavedId] = useState(null)
  const [downloading, setDownloading] = useState(null)

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const search = async () => {
    if (!form.origin || !form.destination) return setError('Enter both airports')
    if (form.origin === form.destination) return setError('Origin and destination must differ')
    if (!token) return setError('Missing VITE_TRAVELPAYOUTS_TOKEN in .env')

    setLoading(true); setError(''); setFlights([])
    try {
      const params = new URLSearchParams({
        origin: form.origin, destination: form.destination,
        depart_date: form.departDate.slice(0, 7),
        currency: 'aud', token, limit: 30,
      })
      const res = await fetch('/api/flights/v1/prices/cheap?' + params)
      if (!res.ok) throw new Error('Server ' + res.status)
      const data = await res.json()

      const routeData = data?.data?.[form.destination] || {}
      const results = Object.values(routeData).map(f => ({
        price: f.price, currency: data.currency || 'AUD',
        airline: f.airline, flight_number: f.flight_number,
        departure_at: f.departure_at, return_at: f.return_at,
        transfers: f.transfers, origin: form.origin, destination: form.destination,
        link: 'https://www.aviasales.com' + (f.link || ''),
      }))

      if (!results.length) setError('No flights found. Try a different month.')
      else setFlights(results)
    } catch (e) {
      setError(e.message || 'Search failed')
    } finally { setLoading(false) }
  }

  const save = async (f) => {
    if (!user) return alert('Please sign in to save')
    const key = f.airline + f.flight_number + f.departure_at
    const { error } = await saveBooking({
      type: 'flight', provider: f.airline,
      title: f.origin + ' to ' + f.destination,
      location: f.origin + ' to ' + f.destination,
      startDate: f.departure_at, endDate: f.return_at || f.departure_at,
      price: f.price, currency: f.currency,
      reference: f.flight_number, rawData: f,
    })
    if (error) alert(error.message)
    else { setSavedId(key); setTimeout(() => setSavedId(null), 2500) }
  }


  const handleDownloadPdf = async (f) => {
    const key = f.airline + f.flight_number + f.departure_at
    setDownloading(key)
    try { await downloadFlightVoucher(f, form) }
    catch (e) { alert('Could not generate PDF: ' + e.message) }
    finally { setDownloading(null) }
  }
  const prices = flights.map(f => f.price)
  const rows = flights.map(f => ({ ...f, _t: tier(f.price, prices) })).sort((a, b) => a.price - b.price)

  return (
    <div className="w-full">
      <div className="rounded-2xl mb-6 shadow-2xl bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 p-6 md:p-10 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-white/10 rounded-2xl border border-white/20"><Plane className="h-7 w-7 text-cyan-300" /></div>
          <div>
            <h1 className="text-2xl md:text-4xl font-black">Book Your Flight</h1>
            <p className="text-cyan-200 text-xs md:text-sm">Real prices - 700+ airlines - Worldwide</p>
          </div>
        </div>
      </div>

      <Card className="mb-6 border-0 shadow-xl bg-card/95">
        <CardContent className="p-5 md:p-6">
          <div className="flex gap-2 mb-4">
            <button onClick={() => upd('tripType', 'oneway')} className={'px-4 py-2 rounded-full text-sm font-semibold ' + (form.tripType === 'oneway' ? 'bg-blue-600 text-white' : 'bg-muted')}>One Way</button>
            <button onClick={() => upd('tripType', 'return')} className={'px-4 py-2 rounded-full text-sm font-semibold ' + (form.tripType === 'return' ? 'bg-blue-600 text-white' : 'bg-muted')}>Return</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-sm font-semibold mb-1.5 flex items-center gap-1.5"><PlaneTakeoff className="h-4 w-4 text-primary" /> From</label>
              <Input value={form.origin} onChange={e => upd('origin', e.target.value.toUpperCase().slice(0, 3))} maxLength={3} placeholder="SYD" className="h-11 uppercase font-mono text-lg" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1.5 flex items-center gap-1.5"><PlaneLanding className="h-4 w-4 text-primary" /> To</label>
              <Input value={form.destination} onChange={e => upd('destination', e.target.value.toUpperCase().slice(0, 3))} maxLength={3} placeholder="MEL" className="h-11 uppercase font-mono text-lg" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1.5 flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" /> Depart</label>
              <Input type="date" onClick={(e) => e.target.showPicker?.()} value={form.departDate} onChange={e => upd('departDate', e.target.value)} className="h-11" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1.5 flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" /> Return</label>
              <Input type="date" onClick={(e) => e.target.showPicker?.()} value={form.returnDate} onChange={e => upd('returnDate', e.target.value)} className="h-11" disabled={form.tripType === 'oneway'} />
            </div>
          </div>

          <Button onClick={search} disabled={loading} className="w-full md:w-auto bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 text-white h-12 px-10 font-semibold text-base">
            {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Search className="h-5 w-5 mr-2" />}
            {loading ? 'Searching...' : 'Search Flights'}
          </Button>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs text-muted-foreground self-center">Popular:</span>
            {POPULAR.map(r => (
              <button key={r.label} onClick={() => { upd('origin', r.from); upd('destination', r.to) }} className="text-xs bg-muted hover:bg-primary hover:text-white px-3 py-1 rounded-full">
                {r.label}
              </button>
            ))}
          </div>

          {error && (
            <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}
        </CardContent>
      </Card>

      {rows.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {rows.map((f, i) => {
            const t = f._t
            const g = t.gradient
            const TIcon = t.Icon
            const key = f.airline + f.flight_number + f.departure_at
            const dt = f.departure_at ? new Date(f.departure_at) : null
            return (
              <Card key={i} className="overflow-hidden border shadow-md hover:shadow-2xl transition bg-card flex flex-col">
                <div className={'h-1.5 bg-gradient-to-r ' + g}></div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={'p-3 rounded-xl bg-gradient-to-br ' + g + ' shadow-lg'}>
                        <Plane className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{f.origin} to {f.destination}</div>
                        <div className="text-sm text-muted-foreground">{f.airline} {f.flight_number}</div>
                      </div>
                    </div>
                    <div className={'px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1 bg-gradient-to-r ' + g}>
                      <TIcon className="h-3 w-3" /> {t.label}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    {dt && <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-muted-foreground" />{dt.toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' })}</div>}
                    <div className="flex items-center gap-2"><Globe className="h-3.5 w-3.5 text-muted-foreground" />{f.transfers === 0 ? 'Direct' : f.transfers + ' stop' + (f.transfers > 1 ? 's' : '')}</div>
                  </div>

                  <div className="bg-muted/40 border rounded-xl p-4 mb-4 mt-auto">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold mb-1">From</div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-bold text-muted-foreground">{f.currency}</span>
                      <span className="text-3xl font-black tabular-nums">{f.price?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a href={f.link} target="_blank" rel="noopener noreferrer" className="col-span-2">
                      <Button className={'w-full bg-gradient-to-r ' + g + ' text-white font-semibold h-11'}>
                        <ExternalLink className="h-4 w-4 mr-2" /> Book on Aviasales
                      </Button>
                    </a>
                    <Button variant="outline" onClick={() => save(f)} className="h-10">
                      {savedId === key ? <><CheckCircle2 className="h-4 w-4 mr-1.5 text-emerald-500" />Saved</> : <><Heart className="h-4 w-4 mr-1.5" />Save</>}
                    </Button>
                    <Button variant="outline" onClick={() => handleDownloadPdf(f)} disabled={downloading === (f.airline + f.flight_number + f.departure_at)} className="h-10">
                      PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {!loading && flights.length === 0 && !error && (
        <Card className="border-dashed border-2">
          <CardContent className="p-12 text-center">
            <div className="inline-flex p-5 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 mb-5 shadow-lg">
              <Plane className="h-14 w-14 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Ready for takeoff?</h3>
            <p className="text-muted-foreground mb-5">Enter two IATA codes to compare live prices.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}