import { useUser } from '../context/UserContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, DollarSign, Globe } from "lucide-react"

export default function CityDetails() {
  const { location } = useUser()
  if (!location) return <div className="p-4">Loading location...</div>

  const languageMap = {
    'US': 'English',
    'GB': 'English',
    'AU': 'English',
    'NZ': 'English',
    'AE': 'Arabic',
    'FR': 'French',
    'JP': 'Japanese',
    'DE': 'German',
  }

  const country = location.country_code || ''
  const language = languageMap[country] || 'English'
  const currency = location.currency || 'USD'
  const callingCode = location.country_calling_code || '+1'

  return (
    <Card className="mt-4 bg-gradient-to-br from-blue-500/10 to-green-500/10">
      <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> City Details</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted/30 p-2 rounded"><span className="block text-muted-foreground">City</span>{location.city || 'Unknown'}</div>
          <div className="bg-muted/30 p-2 rounded"><span className="block text-muted-foreground">Latitude</span>{location.latitude}</div>
          <div className="bg-muted/30 p-2 rounded"><span className="block text-muted-foreground">Longitude</span>{location.longitude}</div>
          <div className="bg-muted/30 p-2 rounded"><span className="block text-muted-foreground">Timezone</span>{location.timezone}</div>
          <div className="bg-muted/30 p-2 rounded"><span className="block text-muted-foreground">Dialing Code</span>{callingCode}</div>
          <div className="bg-muted/30 p-2 rounded"><span className="block text-muted-foreground">Currency</span>{currency}</div>
          <div className="bg-muted/30 p-2 rounded col-span-2"><span className="block text-muted-foreground">Language</span>{language}</div>
        </div>
      </CardContent>
    </Card>
  )
}
