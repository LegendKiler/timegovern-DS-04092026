import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, Car, Calendar, MapPin, Trash2, Download, Loader2, AlertCircle, ExternalLink, Clock, Filter, Award, Hash, Sparkles, TrendingUp } from 'lucide-react'
import { downloadCarVoucher } from '../components/CarBookingPdf'
import { downloadFlightVoucher } from '../components/FlightBookingPdf'

export default function MyBookingsPage() {
  const navigate = useNavigate()
  const { user, getBookings, deleteBooking } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) { setLoading(false); return }
    loadBookings()
  }, [user])

  const loadBookings = async () => {
    setLoading(true)
    const { data, error } = await getBookings()
    setLoading(false)
    if (error) setError(error.message)
    else setBookings(data)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this booking?')) return
    const { error } = await deleteBooking(id)
    if (!error) setBookings(bookings.filter(b => b.id !== id))
  }

  const handleReprint = async (booking) => {
    try {
      if (booking.booking_type === 'car') {
        await downloadCarVoucher(booking.booking_data, booking.booking_data.rentalForm || {})
      } else if (booking.booking_type === 'flight') {
        await downloadFlightVoucher(booking.booking_data, {})
      } else {
        alert('Unknown booking type')
      }
    } catch (err) {
      alert('Could not generate PDF: ' + err.message)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <Card className="text-center p-12 border-0 shadow-2xl bg-gradient-to-br from-primary/10 via-card to-secondary/10">
          <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">You need to be signed in to view your bookings.</p>
          <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-primary to-secondary text-white">Sign In</Button>
        </Card>
      </div>
    )
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.booking_type === filter)
  const flightCount = bookings.filter(b => b.booking_type === 'flight').length
  const carCount = bookings.filter(b => b.booking_type === 'car').length
  const totalSpent = bookings.reduce((sum, b) => sum + (Number(b.total_price) || 0), 0)

  return (
    <div className="container mx-auto p-4 max-w-6xl">

      {/* ============ HERO BANNER ============ */}
      <div className="relative overflow-hidden rounded-2xl mb-6 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="relative z-10 p-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">My Bookings</h1>
              <p className="text-white/80 text-sm md:text-base">All your saved flights and car rentals in one place</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{bookings.length}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/70">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{flightCount}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/70">Flights</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{carCount}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/70">Cars</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ FILTER CHIPS ============ */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={'px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ' + (filter === 'all' ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg' : 'bg-card border border-border hover:bg-muted')}
        >
          <Filter className="h-3.5 w-3.5" /> All Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setFilter('flight')}
          className={'px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ' + (filter === 'flight' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' : 'bg-card border border-border hover:bg-muted')}
        >
          <Plane className="h-3.5 w-3.5" /> Flights ({flightCount})
        </button>
        <button
          onClick={() => setFilter('car')}
          className={'px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ' + (filter === 'car' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' : 'bg-card border border-border hover:bg-muted')}
        >
          <Car className="h-3.5 w-3.5" /> Cars ({carCount})
        </button>
      </div>

      {loading && (
        <div className="text-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-3" />
          <p className="text-muted-foreground">Loading your bookings...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 text-red-600 p-4 rounded-lg border border-red-200 dark:border-red-900 text-sm flex items-center gap-2">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <Card className="border-dashed border-2 border-border bg-gradient-to-br from-muted/30 to-muted/10">
          <CardContent className="p-16 text-center">
            <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 mb-6 shadow-xl">
              <Award className="h-16 w-16 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">Search flights or cars and save them to see them here. Your bookings will be ready to re-print any time.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/flights"><Button variant="outline" className="h-11"><Plane className="h-4 w-4 mr-2" /> Book a Flight</Button></Link>
              <Link to="/"><Button className="h-11 bg-gradient-to-r from-emerald-500 to-teal-500 text-white"><Car className="h-4 w-4 mr-2" /> Search Cars</Button></Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ============ BOOKING CARDS ============ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(booking => {
          const isFlight = booking.booking_type === 'flight'
          const gradient = isFlight ? 'from-blue-500 to-cyan-500' : 'from-emerald-500 to-teal-500'
          const Icon = isFlight ? Plane : Car
          const statusStyle = {
            saved: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
            booked: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
            completed: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
            cancelled: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
          }[booking.status] || 'bg-muted text-muted-foreground'

          return (
            <Card key={booking.id} className="overflow-hidden border border-border shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-card flex flex-col">
              {/* Top gradient bar */}
              <div className={'h-1.5 bg-gradient-to-r ' + gradient}></div>

              <CardContent className="p-5 flex-1 flex flex-col">
                {/* Header: icon + title + status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={'p-3 rounded-xl bg-gradient-to-br ' + gradient + ' shrink-0 shadow-lg'}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-lg leading-snug line-clamp-1" title={booking.title}>
                        {booking.title || 'Booking'}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">{booking.provider || 'Vendor'}</p>
                    </div>
                  </div>
                  <span className={'text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shrink-0 ' + statusStyle}>
                    {booking.status}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  {booking.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-foreground truncate">{booking.location}</span>
                    </div>
                  )}
                  {booking.start_date && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-foreground">
                        {new Date(booking.start_date).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}
                  {booking.reference && (
                    <div className="flex items-center gap-2 text-sm">
                      <Hash className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="font-mono text-xs text-foreground">{booking.reference}</span>
                    </div>
                  )}
                </div>

                {/* Price block */}
                {booking.total_price && (
                  <div className="bg-muted/40 border border-border rounded-xl p-4 mb-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">Total</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-bold text-muted-foreground">{booking.currency || 'AUD'}</span>
                        <span className="text-2xl font-black tabular-nums text-foreground">
                          {Number(booking.total_price).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-auto grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleReprint(booking)}
                    variant="outline"
                    className="col-span-2 h-10 font-semibold"
                  >
                    <Download className="h-4 w-4 mr-2" /> Re-print PDF
                  </Button>
                  {booking.booking_data?.booking_url && (
                    <a href={booking.booking_data.booking_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full h-10">
                        <ExternalLink className="h-4 w-4 mr-2" /> Open
                      </Button>
                    </a>
                  )}
                  <Button
                    onClick={() => handleDelete(booking.id)}
                    variant="outline"
                    className={'h-10 text-red-500 hover:bg-red-50 hover:border-red-300 ' + (booking.booking_data?.booking_url ? '' : 'col-span-1')}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ============ SUMMARY FOOTER ============ */}
      {bookings.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-border rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Booking Summary</p>
                <p className="text-sm text-muted-foreground">You have {bookings.length} bookings saved</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Total Value</p>
                <p className="text-2xl font-black text-primary">
                  AUD {totalSpent.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-500" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}