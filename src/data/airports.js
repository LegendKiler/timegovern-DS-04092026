// Curated worldwide airport database (major hubs by country)
// For 85,000+ airports, we'd fetch from OurAirports CDN in production
export const AIRPORTS_BY_COUNTRY = {
  'AU': [
    { iata: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney' },
    { iata: 'MEL', name: 'Melbourne Tullamarine', city: 'Melbourne' },
    { iata: 'BNE', name: 'Brisbane', city: 'Brisbane' },
    { iata: 'PER', name: 'Perth', city: 'Perth' },
    { iata: 'ADL', name: 'Adelaide', city: 'Adelaide' },
    { iata: 'OOL', name: 'Gold Coast', city: 'Gold Coast' },
    { iata: 'CNS', name: 'Cairns', city: 'Cairns' },
    { iata: 'HBA', name: 'Hobart', city: 'Hobart' },
  ],
  'NZ': [
    { iata: 'AKL', name: 'Auckland', city: 'Auckland' },
    { iata: 'CHC', name: 'Christchurch', city: 'Christchurch' },
    { iata: 'WLG', name: 'Wellington', city: 'Wellington' },
    { iata: 'ZQN', name: 'Queenstown', city: 'Queenstown' },
  ],
  'US': [
    { iata: 'JFK', name: 'New York JFK', city: 'New York' },
    { iata: 'LAX', name: 'Los Angeles', city: 'Los Angeles' },
    { iata: 'SFO', name: 'San Francisco', city: 'San Francisco' },
    { iata: 'MIA', name: 'Miami', city: 'Miami' },
    { iata: 'ORD', name: "Chicago O'Hare", city: 'Chicago' },
    { iata: 'LAS', name: 'Las Vegas', city: 'Las Vegas' },
    { iata: 'MCO', name: 'Orlando', city: 'Orlando' },
    { iata: 'SEA', name: 'Seattle', city: 'Seattle' },
    { iata: 'BOS', name: 'Boston', city: 'Boston' },
    { iata: 'HNL', name: 'Honolulu', city: 'Honolulu' },
  ],
  'GB': [
    { iata: 'LHR', name: 'London Heathrow', city: 'London' },
    { iata: 'LGW', name: 'London Gatwick', city: 'London' },
    { iata: 'MAN', name: 'Manchester', city: 'Manchester' },
    { iata: 'EDI', name: 'Edinburgh', city: 'Edinburgh' },
    { iata: 'GLA', name: 'Glasgow', city: 'Glasgow' },
  ],
  'CA': [
    { iata: 'YYZ', name: 'Toronto Pearson', city: 'Toronto' },
    { iata: 'YVR', name: 'Vancouver', city: 'Vancouver' },
    { iata: 'YUL', name: 'Montreal', city: 'Montreal' },
    { iata: 'YYC', name: 'Calgary', city: 'Calgary' },
  ],
  'IN': [
    { iata: 'BOM', name: 'Mumbai Chhatrapati Shivaji', city: 'Mumbai' },
    { iata: 'DEL', name: 'Delhi Indira Gandhi', city: 'Delhi' },
    { iata: 'BLR', name: 'Bangalore Kempegowda', city: 'Bangalore' },
    { iata: 'MAA', name: 'Chennai', city: 'Chennai' },
    { iata: 'CCU', name: 'Kolkata', city: 'Kolkata' },
    { iata: 'HYD', name: 'Hyderabad', city: 'Hyderabad' },
    { iata: 'GOI', name: 'Goa Dabolim', city: 'Goa' },
  ],
  'PK': [
    { iata: 'KHI', name: 'Karachi Jinnah', city: 'Karachi' },
    { iata: 'LHE', name: 'Lahore Allama Iqbal', city: 'Lahore' },
    { iata: 'ISB', name: 'Islamabad', city: 'Islamabad' },
  ],
  'BD': [
    { iata: 'DAC', name: 'Dhaka Hazrat Shahjalal', city: 'Dhaka' },
    { iata: 'CGP', name: 'Chittagong', city: 'Chittagong' },
  ],
  'LK': [
    { iata: 'CMB', name: 'Colombo Bandaranaike', city: 'Colombo' },
  ],
  'NP': [
    { iata: 'KTM', name: 'Kathmandu Tribhuvan', city: 'Kathmandu' },
  ],
  'AE': [
    { iata: 'DXB', name: 'Dubai International', city: 'Dubai' },
    { iata: 'AUH', name: 'Abu Dhabi Zayed', city: 'Abu Dhabi' },
    { iata: 'SHJ', name: 'Sharjah', city: 'Sharjah' },
  ],
  'SA': [
    { iata: 'RUH', name: 'Riyadh King Khalid', city: 'Riyadh' },
    { iata: 'JED', name: 'Jeddah King Abdulaziz', city: 'Jeddah' },
    { iata: 'MED', name: 'Medina', city: 'Medina' },
  ],
  'QA': [
    { iata: 'DOH', name: 'Doha Hamad', city: 'Doha' },
  ],
  'KW': [
    { iata: 'KWI', name: 'Kuwait International', city: 'Kuwait City' },
  ],
  'BH': [
    { iata: 'BAH', name: 'Bahrain International', city: 'Manama' },
  ],
  'OM': [
    { iata: 'MCT', name: 'Muscat International', city: 'Muscat' },
  ],
  'JO': [
    { iata: 'AMM', name: 'Amman Queen Alia', city: 'Amman' },
  ],
  'LB': [
    { iata: 'BEY', name: 'Beirut Rafic Hariri', city: 'Beirut' },
  ],
  'IL': [
    { iata: 'TLV', name: 'Tel Aviv Ben Gurion', city: 'Tel Aviv' },
  ],
  'TR': [
    { iata: 'IST', name: 'Istanbul', city: 'Istanbul' },
    { iata: 'AYT', name: 'Antalya', city: 'Antalya' },
    { iata: 'ESB', name: 'Ankara Esenboga', city: 'Ankara' },
  ],
  'EG': [
    { iata: 'CAI', name: 'Cairo International', city: 'Cairo' },
    { iata: 'HRG', name: 'Hurghada', city: 'Hurghada' },
    { iata: 'SSH', name: 'Sharm El Sheikh', city: 'Sharm El Sheikh' },
  ],
  'ZA': [
    { iata: 'JNB', name: 'Johannesburg OR Tambo', city: 'Johannesburg' },
    { iata: 'CPT', name: 'Cape Town', city: 'Cape Town' },
    { iata: 'DUR', name: 'Durban King Shaka', city: 'Durban' },
  ],
  'KE': [
    { iata: 'NBO', name: 'Nairobi Jomo Kenyatta', city: 'Nairobi' },
    { iata: 'MBA', name: 'Mombasa Moi', city: 'Mombasa' },
  ],
  'NG': [
    { iata: 'LOS', name: 'Lagos Murtala Muhammed', city: 'Lagos' },
    { iata: 'ABV', name: 'Abuja Nnamdi Azikiwe', city: 'Abuja' },
  ],
  'MA': [
    { iata: 'CMN', name: 'Casablanca Mohammed V', city: 'Casablanca' },
    { iata: 'RAK', name: 'Marrakech Menara', city: 'Marrakech' },
  ],
  'FR': [
    { iata: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris' },
    { iata: 'ORY', name: 'Paris Orly', city: 'Paris' },
    { iata: 'NCE', name: "Nice Cote d'Azur", city: 'Nice' },
  ],
  'DE': [
    { iata: 'FRA', name: 'Frankfurt', city: 'Frankfurt' },
    { iata: 'MUC', name: 'Munich', city: 'Munich' },
    { iata: 'BER', name: 'Berlin Brandenburg', city: 'Berlin' },
  ],
  'IT': [
    { iata: 'FCO', name: 'Rome Fiumicino', city: 'Rome' },
    { iata: 'MXP', name: 'Milan Malpensa', city: 'Milan' },
    { iata: 'VCE', name: 'Venice Marco Polo', city: 'Venice' },
  ],
  'ES': [
    { iata: 'MAD', name: 'Madrid Barajas', city: 'Madrid' },
    { iata: 'BCN', name: 'Barcelona El Prat', city: 'Barcelona' },
  ],
  'NL': [
    { iata: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam' },
  ],
  'CH': [
    { iata: 'ZRH', name: 'Zurich', city: 'Zurich' },
    { iata: 'GVA', name: 'Geneva', city: 'Geneva' },
  ],
  'AT': [
    { iata: 'VIE', name: 'Vienna', city: 'Vienna' },
  ],
  'PT': [
    { iata: 'LIS', name: 'Lisbon', city: 'Lisbon' },
  ],
  'GR': [
    { iata: 'ATH', name: 'Athens', city: 'Athens' },
  ],
  'IE': [
    { iata: 'DUB', name: 'Dublin', city: 'Dublin' },
  ],
  'JP': [
    { iata: 'NRT', name: 'Tokyo Narita', city: 'Tokyo' },
    { iata: 'HND', name: 'Tokyo Haneda', city: 'Tokyo' },
    { iata: 'KIX', name: 'Osaka Kansai', city: 'Osaka' },
  ],
  'KR': [
    { iata: 'ICN', name: 'Seoul Incheon', city: 'Seoul' },
    { iata: 'GMP', name: 'Seoul Gimpo', city: 'Seoul' },
  ],
  'CN': [
    { iata: 'PEK', name: 'Beijing Capital', city: 'Beijing' },
    { iata: 'PVG', name: 'Shanghai Pudong', city: 'Shanghai' },
    { iata: 'HKG', name: 'Hong Kong', city: 'Hong Kong' },
  ],
  'SG': [
    { iata: 'SIN', name: 'Singapore Changi', city: 'Singapore' },
  ],
  'TH': [
    { iata: 'BKK', name: 'Bangkok Suvarnabhumi', city: 'Bangkok' },
    { iata: 'HKT', name: 'Phuket', city: 'Phuket' },
  ],
  'MY': [
    { iata: 'KUL', name: 'Kuala Lumpur', city: 'Kuala Lumpur' },
  ],
  'ID': [
    { iata: 'DPS', name: 'Bali Ngurah Rai', city: 'Bali' },
    { iata: 'CGK', name: 'Jakarta Soekarno-Hatta', city: 'Jakarta' },
  ],
  'PH': [
    { iata: 'MNL', name: 'Manila Ninoy Aquino', city: 'Manila' },
  ],
  'VN': [
    { iata: 'SGN', name: 'Ho Chi Minh City', city: 'Ho Chi Minh City' },
    { iata: 'HAN', name: 'Hanoi Noi Bai', city: 'Hanoi' },
  ],
  'MX': [
    { iata: 'MEX', name: 'Mexico City', city: 'Mexico City' },
    { iata: 'CUN', name: 'Cancun', city: 'Cancun' },
  ],
  'BR': [
    { iata: 'GRU', name: 'Sao Paulo Guarulhos', city: 'Sao Paulo' },
    { iata: 'GIG', name: 'Rio de Janeiro', city: 'Rio de Janeiro' },
  ],
  'AR': [
    { iata: 'EZE', name: 'Buenos Aires Ezeiza', city: 'Buenos Aires' },
  ],
  'CL': [
    { iata: 'SCL', name: 'Santiago', city: 'Santiago' },
  ],
  'PE': [
    { iata: 'LIM', name: 'Lima Jorge Chavez', city: 'Lima' },
  ],
  'CO': [
    { iata: 'BOG', name: 'Bogota El Dorado', city: 'Bogota' },
  ],
}

// Country code → flag emoji
export function countryFlag(code) {
  if (!code) return '🌍'
  return code.toUpperCase().replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)))
}

// Get airports for a country code
export function getAirportsForCountry(code) {
  return AIRPORTS_BY_COUNTRY[code?.toUpperCase()] || []
}

// Get default city based on country
export function getDefaultCityForCountry(code) {
  const airports = getAirportsForCountry(code)
  return airports[0]?.city || 'Sydney'
}