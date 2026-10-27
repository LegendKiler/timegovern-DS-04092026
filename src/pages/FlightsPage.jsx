import { useEffect } from "react"

import FlightBooking from '../components/FlightBooking'
import { setPageMeta } from '../lib/seo'

export default function FlightsPage() {
  useEffect(() => { setPageMeta() }, [])
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <FlightBooking />
    </div>
  )
}