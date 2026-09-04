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