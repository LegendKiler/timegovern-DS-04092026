import { useUser } from '../context/UserContext'
import { useAuth } from '../context/AuthContext'
import { Button } from "@/components/ui/button"
import { Moon, Sun, User, LogOut, Crown, Settings, LayoutDashboard, Calendar, Plane, Code2, Calculator, ChevronDown, Menu, X, Globe } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import Logo from './Logo'

const NAV = [
  {
    label: 'Time',
    items: [
      { to: '/world-clock', label: 'World Clock', desc: '656 cities, live' },
      { to: '/time-zone-converter', label: 'Time Zone Converter', desc: 'Compare any two cities' },
      { to: '/meeting-planner', label: 'Meeting Planner', desc: 'Global team scheduling' },
      { to: '/meeting-heatmap', label: 'Meeting Heatmap', desc: 'Best overlap hours' },
      { to: '/countdown-timer', label: 'Countdown Timer', desc: 'Track any event' },
      { to: '/time-tools', label: 'All Time Tools', desc: 'Full directory' },
    ],
  },
  {
    label: 'Weather',
    items: [
      { to: '/weather', label: 'Weather Hub', desc: '656 cities worldwide' },
      { to: '/astronomy', label: 'Sun & Moon', desc: 'Astronomy tools' },
      { to: '/weather/tokyo/climate', label: 'Climate', desc: '30-year monthly normals' },
      { to: '/weather/tokyo/air', label: 'Air Quality', desc: 'Live AQI and PM2.5' },
      { to: '/weather/tokyo/hourly', label: 'Hourly Forecast', desc: 'Next 48 hours' },
      { to: '/weather/tokyo/historic', label: 'Past Weather', desc: 'Last 30 days' },
    ],
  },
  {
    label: 'Calendar',
    items: [
      { to: '/calendar', label: 'Calendar', desc: 'Interactive month view' },
      { to: '/week-numbers', label: 'Week Numbers', desc: 'ISO 8601 weeks' },
      { to: '/months', label: 'Months', desc: 'All 12 months' },
      { to: '/holidays', label: 'Public Holidays', desc: '204 countries' },
      { to: '/days-between-dates', label: 'Days Between Dates', desc: 'Any date difference' },
    ],
  },
  {
    label: 'Countries',
    items: [
      { to: '/country-codes', label: 'Country Codes', desc: '118 countries, full data' },
      { to: '/live-data', label: 'Live Data', desc: 'Real-time feeds' },
      { to: '/api-docs', label: 'Country Data API', desc: 'Free JSON and CSV' },
      { to: '/widgets', label: 'Widgets', desc: 'Embeddable tools' },
    ],
  },
  {
    label: 'Live',
    items: [
      { to: '/worldometers', label: 'Live World Counters', desc: 'Population, births, deaths' },
      { to: '/world-population-clock', label: 'Population Clock', desc: 'Live global population' },
      { to: '/births-clock', label: 'Births Clock', desc: 'Babies born today' },
      { to: '/deaths-clock', label: 'Deaths Clock', desc: 'Deaths today' },
      { to: '/co2-emissions-clock', label: 'CO2 Emissions', desc: 'Global emissions today' },
      { to: '/energy-use-clock', label: 'Energy Use', desc: 'Primary energy today' },
      { to: '/food-waste-clock', label: 'Food Waste', desc: 'Food wasted today' },
      { to: '/forest-loss-clock', label: 'Forest Loss', desc: 'Forest lost today' },
      { to: '/plastic-produced-clock', label: 'Plastic Produced', desc: 'Plastic produced today' },
      { to: '/water-used-clock', label: 'Water Used', desc: 'Freshwater used today' },
      { to: '/renewable-energy-clock', label: 'Renewable Energy', desc: 'Renewable energy today' },
      { to: '/emails-sent-today', label: 'Emails Sent', desc: 'Emails sent today' },
      { to: '/google-searches-today', label: 'Google Searches', desc: 'Searches today' },
      { to: '/gdp-clock', label: 'Global GDP', desc: 'Global GDP today' },
      { to: '/money-spent-online-today', label: 'Money Spent Online', desc: 'E-commerce today' },
    ],
  },
  {
    label: 'Money',
    items: [
      { to: '/salary', label: 'Salary Calculators', desc: '21 countries' },
      { to: '/mortgage', label: 'Mortgage Calculators', desc: '24 countries' },
      { to: '/finance-tools', label: 'Finance Tools', desc: 'Interest, loans' },
      { to: '/calculators', label: 'All Calculators', desc: 'Full directory' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { to: '/timers', label: 'Timers', desc: 'Pomodoro, countdown' },
      { to: '/sleep-tools', label: 'Sleep Tools', desc: 'Sleep debt, cycles' },
      { to: '/health-tools', label: 'Health Tools', desc: 'BMI, calories' },
      { to: '/productivity-tools', label: 'Productivity', desc: 'Focus, word counter' },
      { to: '/utility-tools', label: 'Utility', desc: 'Units, conversions' },
      { to: '/developer-tools', label: 'Developer', desc: 'QR, passwords, hashes' },
    ],
  },
  {
    label: 'Travel',
    items: [
      { to: '/flights', label: 'Flights', desc: 'Search any route' },
      { to: '/cars', label: 'Car Rental', desc: 'Book rental cars' },
      { to: '/my-bookings', label: 'My Bookings', desc: 'Saved flights and cars' },
      { to: '/flight-map', label: 'Flight Map', desc: 'Live flight tracker' },
    ],
  },
]

export default function Header() {
  const { theme, toggleTheme } = useUser()
  const { user, signOut, premiumTier, loading, profile, updateProfile } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [openDropdown, setOpenDropdown] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  if (pathname.startsWith('/embed/')) return null
  const isDark = theme === 'dark'

  const handleLogout = async () => {
    await signOut()
    setMenuOpen(false)
    setMobileOpen(false)
    navigate('/')
  }

  const handleThemeToggle = async () => {
    toggleTheme()
    if (user) {
      const newTheme = isDark ? 'light' : 'dark'
      await updateProfile({ theme: newTheme })
    }
  }

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User'
  const avatarUrl = profile?.avatar_url
  const initial = (displayName || 'U').charAt(0).toUpperCase()

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <Logo size={36} />
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">time</span>
              <span className="text-foreground">govern</span>
            </span>
            <span className="hidden sm:flex text-[9px] font-bold uppercase tracking-[0.15em] text-amber-500 items-center gap-1 mt-0.5">
              Fast answers for money, time &amp; code
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {NAV.map((group) => (
            <div key={group.label} className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
                className={'px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted hover:text-primary transition-colors flex items-center gap-1 ' + (openDropdown === group.label ? 'bg-muted text-primary' : '')}
                aria-expanded={openDropdown === group.label}
                aria-haspopup="true"
              >
                {group.label}
                <ChevronDown className={'h-3.5 w-3.5 transition-transform ' + (openDropdown === group.label ? 'rotate-180' : '')} />
              </button>
              {openDropdown === group.label && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} aria-hidden="true"></div>
                  <div className="absolute top-full left-0 mt-2 w-72 rounded-xl border border-border bg-card shadow-2xl z-50 py-2 overflow-hidden">
                    {group.items.map((item) => (
                      <Link
                        key={item.to + item.label}
                        to={item.to}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2.5 hover:bg-muted transition-colors"
                      >
                        <div className="text-sm font-semibold">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
          <Link to="/news" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted hover:text-primary transition-colors">News</Link>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          {loading ? (
            <div className="w-24 h-9 bg-muted animate-pulse rounded-lg"></div>
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-full bg-muted hover:bg-muted/70 transition-colors"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                    {initial}
                  </div>
                )}
                <span className="text-sm font-medium hidden sm:inline max-w-[120px] truncate">{displayName}</span>
                {premiumTier !== 'free' && <Crown className="h-3 w-3 text-amber-500 shrink-0" />}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={displayName} className="w-12 h-12 rounded-full object-cover border-2 border-background shadow" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-lg font-bold shadow">
                          {initial}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{displayName}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className={'text-[10px] font-bold px-2 py-1 rounded-full ' + (premiumTier === 'free' ? 'bg-muted text-muted-foreground' : 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white')}>
                        {premiumTier.toUpperCase()} PLAN
                      </span>
                    </div>
                  </div>

                  <div className="p-1">
                    <Link to="/my-bookings" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors">
                      <Calendar className="h-4 w-4" /> My Bookings
                    </Link>
                    <Link to="/my-calculations" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors">
                      <Calculator className="h-4 w-4" /> My Calculations
                    </Link>
                    <Link to="/my-widgets" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors">
                      <Code2 className="h-4 w-4" /> My Widgets
                    </Link>
                    <Link to="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors">
                      <Settings className="h-4 w-4" /> Account Settings
                    </Link>
                    <Link to="/pricing" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors">
                      <Crown className="h-4 w-4 text-amber-500" /> Upgrade Plan
                    </Link>
                    <Link to="/flights" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors">
                      <Plane className="h-4 w-4" /> Book a Flight
                    </Link>
                    <Link to="/flight-map" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors">
                      <LayoutDashboard className="h-4 w-4" /> Live Flight Map
                    </Link>
                  </div>

                  <div className="p-1 border-t border-border">
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-sm text-red-500 transition-colors">
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
                <User className="h-4 w-4 mr-2" /> <span className="hidden sm:inline">Login / Sign Up</span><span className="sm:hidden">Login</span>
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" onClick={handleThemeToggle} aria-label="Toggle theme">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" className="lg:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-5">
            {NAV.map((group) => (
              <div key={group.label}>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">{group.label}</div>
                <div className="grid grid-cols-2 gap-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.to + item.label}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Other</div>
              <div className="grid grid-cols-2 gap-1">
                <Link to="/news" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">News</Link>
                <Link to="/pricing" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">Pricing</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}