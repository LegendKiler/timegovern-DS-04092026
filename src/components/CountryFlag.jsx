// Renders country flag as SVG (works on Windows/Mac/Linux/mobile)
// Uses flagcdn.com — free, no API key, globally cached
const SLUG_TO_ISO = {
  australia: 'au', usa: 'us', uk: 'gb', canada: 'ca', india: 'in',
  singapore: 'sg', malaysia: 'my', japan: 'jp', indonesia: 'id', pakistan: 'pk',
  france: 'fr', germany: 'de', spain: 'es', italy: 'it', netherlands: 'nl',
  switzerland: 'ch', sweden: 'se', ireland: 'ie', portugal: 'pt', poland: 'pl',
  belgium: 'be', austria: 'at', denmark: 'dk', norway: 'no',
  'new-zealand': 'nz',
}

export default function CountryFlag({ country, size = 'md', className = '' }) {
  if (!country) return null
  const iso = SLUG_TO_ISO[country.toLowerCase()]
  if (!iso) return null

  const sizes = { sm: 'w-5 h-4', md: 'w-8 h-6', lg: 'w-12 h-9', xl: 'w-16 h-12' }
  const sizeClass = sizes[size] || sizes.md

  return (
    <img
      src={'https://flagcdn.com/' + iso + '.svg'}
      alt={country + ' flag'}
      className={sizeClass + ' rounded-sm shadow-sm object-cover ' + className}
      loading="lazy"
      onError={(e) => { e.target.style.display = 'none' }}
    />
  )
}