import { useParams, useSearchParams } from 'react-router-dom'
import AnalogClockWidget from '../components/widgets/AnalogClockWidget'
import MultiCityWorldClockWidget from '../components/widgets/MultiCityWorldClockWidget'
import TimeZoneConverterWidget from '../components/widgets/TimeZoneConverterWidget'
import DigitalClockWidget from '../components/widgets/DigitalClockWidget'
import CountdownWidget from '../components/widgets/CountdownWidget'
import WeatherWidget from '../components/widgets/WeatherWidget'
import DaysUntilWidget from '../components/widgets/DaysUntilWidget'
import MoonPhaseWidget from '../components/widgets/MoonPhaseWidget'

export default function EmbedPage() {
  const { type } = useParams()
  const [params] = useSearchParams()

  const accent = params.get('accent') || undefined
  const theme = params.get('theme') || 'dark'
  const tz = params.get('tz') || undefined
  const city = params.get('city') || undefined

  // Branding control: 'branded' = 1 means show "Powered by" (free users)
  const branded = params.get('branded') === '1'

  const shared = { accent, theme, tz, city }

  const widget = (() => {
    switch (type) {
      case 'clock':
        return <AnalogClockWidget {...shared} size={parseInt(params.get('size') || '200')} />
      case 'digital':
        return <DigitalClockWidget {...shared} format={params.get('format') || '24h'} showSeconds={params.get('seconds') !== 'off'} showDate={params.get('date') !== 'off'} />
      case 'countdown':
        return <CountdownWidget accent={accent} theme={theme} target={params.get('target') || '2027-01-01T00:00:00'} label={params.get('label') || 'New Year 2027'} />
      case 'weather':
        return <WeatherWidget accent={accent} theme={theme} city={city || 'Sydney'} lat={parseFloat(params.get('lat') || '-33.8688')} lon={parseFloat(params.get('lon') || '151.2093')} />
      case 'days-until':
        return <DaysUntilWidget accent={accent} theme={theme} target={params.get('target') || '2027-01-01'} event={params.get('event') || 'New Year'} emoji={params.get('emoji') || '🎉'} />
      case 'moon':
        return <MoonPhaseWidget accent={accent} theme={theme} />
      case 'timezone':
        return <TimeZoneConverterWidget accent={accent} theme={theme} from={params.get('from') || 'Sydney'} to={params.get('to') || 'London'} format={params.get('format') || '24h'} />
      case 'world-clock':
        return <MultiCityWorldClockWidget accent={accent} theme={theme} cities={params.get('cities') || 'Sydney,London,NewYork,Tokyo,Dubai'} format={params.get('format') || '24h'} showSeconds={params.get('seconds') !== 'off'} showDate={params.get('date') !== 'off'} />
      default:
        return <div style={{ padding: 20, fontFamily: 'system-ui', color: '#666' }}>Widget type not found</div>
    }
  })()

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      margin: 0,
      padding: 0,
      position: 'relative',
    }}>
      <div>{widget}</div>

      {/* Attribution badge — only for Free users' embeds */}
      {branded && (
        <a
          href="https://timegovern.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            marginTop: 8,
            fontSize: 10,
            fontWeight: 600,
            color: theme === 'dark' ? '#94a3b8' : '#64748b',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            opacity: 0.85,
          }}
        >
          <span style={{ fontSize: 11 }}>⚡</span> Powered by <strong style={{ fontWeight: 800 }}>timegovern.com</strong>
        </a>
      )}
    </div>
  )
}