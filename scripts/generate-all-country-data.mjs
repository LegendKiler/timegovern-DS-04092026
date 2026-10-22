import fs from 'fs';

// Countries with a real salary calculator page (matching salaryData.js keys)
const SALARY_KEYS = {
  'usa': ['US', 'united states'],
  'uk': ['GB', 'united kingdom'],
  'canada': ['CA', 'canada'],
  'australia': ['AU', 'australia'],
  'germany': ['DE', 'germany'],
  'france': ['FR', 'france'],
  'india': ['IN', 'india'],
  'japan': ['JP', 'japan'],
  'brazil': ['BR', 'brazil'],
  'mexico': ['MX', 'mexico'],
  'southafrica': ['ZA', 'south africa'],
  'nigeria': ['NG', 'nigeria'],
  'kenya': ['KE', 'kenya'],
  'pakistan': ['PK', 'pakistan'],
  'bangladesh': ['BD', 'bangladesh'],
  'singapore': ['SG', 'singapore'],
  'netherlands': ['NL', 'netherlands'],
  'newzealand': ['NZ', 'new zealand'],
  'qatar': ['QA', 'qatar'],
  'saudi': ['SA', 'saudi arabia'],
  'uae': ['AE', 'united arab emirates'],
};

async function generate() {
  console.log('Fetching from mledoze/countries...');
  const res = await fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json');
  const data = await res.json();
  
  if (!Array.isArray(data)) {
    console.error('API error:', data);
    process.exit(1);
  }
  
  const profiles = {};
  for (const c of data) {
    if (!c.cca2) continue;
    const code = c.cca2.toLowerCase();
    const iso2 = c.cca2;
    const iso3 = c.cca3;
    const name = c.name.common;
    const nameLower = name.toLowerCase();
    
    // Pre-compute salary support
    let salaryKey = null;
    for (const [key, aliases] of Object.entries(SALARY_KEYS)) {
      if (aliases.some(a => a.toLowerCase() === code || a.toLowerCase() === nameLower)) {
        salaryKey = key;
        break;
      }
    }
    
    // Population (comma-formatted)
    let population = 'N/A';
    if (typeof c.population === 'number' && c.population > 0) {
      population = c.population.toLocaleString('en-US');
    }
    
    // Languages (all joined)
    let languages = 'N/A';
    if (c.languages && Object.keys(c.languages).length > 0) {
      languages = Object.values(c.languages).join(', ');
    }
    
    // Dial code
    let dialCode = '';
    if (c.idd && c.idd.root) {
      const suffix = (c.idd.suffixes && c.idd.suffixes.length > 0) ? c.idd.suffixes[0] : '';
      dialCode = c.idd.root + suffix;
    }
    
    // Capital
    const capital = (c.capital && c.capital.length > 0) ? c.capital[0] : 'N/A';
    
    // Currency
    let currency = 'N/A';
    if (c.currencies) {
      const currKey = Object.keys(c.currencies)[0];
      if (currKey) currency = c.currencies[currKey].name + ' (' + currKey + ')';
    }
    
    // Timezone
    const timezone = (c.timezones && c.timezones.length > 0) ? c.timezones[0] : 'UTC';
    
    // Lat/Lng
    const lat = (c.latlng && c.latlng.length === 2) ? Math.round(c.latlng[0] * 100) / 100 : 0;
    const lng = (c.latlng && c.latlng.length === 2) ? Math.round(c.latlng[1] * 100) / 100 : 0;
    
    // Region
    const region = c.region || 'Other';
    
    // Area
    const area = (typeof c.area === 'number' && c.area > 0) ? c.area.toLocaleString('en-US') + ' KM²' : 'N/A';
    
    // City slug
    const cityForTime = capital.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-');
    
    profiles[code] = {
      name,
      iso2,
      iso3,
      dialCode,
      capital,
      population,
      area,
      currency,
      languages,
      timezone,
      cityForTime,
      lat,
      lng,
      region,
      hasSalary: salaryKey !== null,
      salaryKey: salaryKey,
    };
  }
  
  const output = '// Auto-generated with embedded stats and salary info\n// Run: node scripts/generate-all-country-data.mjs\n\nexport const COUNTRY_PROFILES = ' + JSON.stringify(profiles, null, 2) + ';\n\nexport const getAllCountries = () => Object.values(COUNTRY_PROFILES);\nexport const getCountryProfile = (code) => COUNTRY_PROFILES[code.toLowerCase()];\n';
  
  fs.writeFileSync('src/data/countryProfiles.js', output);
  console.log('Generated ' + Object.keys(profiles).length + ' profiles.');
  
  console.log('\n--- Sample verification ---');
  const samples = ['us', 'gb', 'ca', 'al', 'jp', 'de', 'au'];
  for (const code of samples) {
    const p = profiles[code];
    if (p) {
      console.log(code.toUpperCase() + ': pop=' + p.population + ' | langs=' + p.languages + ' | salary=' + p.hasSalary + (p.salaryKey ? ' (' + p.salaryKey + ')' : ''));
    }
  }
}

generate();