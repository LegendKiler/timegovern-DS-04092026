import fs from 'fs';

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
  console.log('Fetching from dr5hn/countries-states-cities-database...');
  const res = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/countries.json');
  const data = await res.json();
  
  if (!Array.isArray(data)) {
    console.error('API error:', data);
    process.exit(1);
  }

  const profiles = {};
  for (const c of data) {
    if (!c.iso2) continue;
    const code = c.iso2.toLowerCase();
    const iso2 = c.iso2;
    const iso3 = c.iso3 || '';
    const name = c.name;
    const nameLower = name.toLowerCase();
    
    let salaryKey = null;
    for (const [key, aliases] of Object.entries(SALARY_KEYS)) {
      if (aliases.some(a => a.toLowerCase() === code || a.toLowerCase() === nameLower)) {
        salaryKey = key;
        break;
      }
    }
    
    const population = c.population ? c.population.toLocaleString('en-US') : 'N/A';
    
    let languages = 'N/A';
    try {
      const langs = JSON.parse(c.languages);
      if (Array.isArray(langs) && langs.length > 0) {
        languages = langs.map(l => l.name).join(', ');
      }
    } catch(e) {}
    
    const dialCode = c.phone_code ? '+' + c.phone_code : '';
    const capital = c.capital || 'N/A';
    const currency = c.currency ? c.currency_name + ' (' + c.currency + ')' : 'N/A';
    
    let timezone = 'UTC';
    try {
      const tz = JSON.parse(c.timezones);
      if (Array.isArray(tz) && tz.length > 0) timezone = tz[0].zoneName;
    } catch(e) {}

    const lat = c.latitude ? parseFloat(c.latitude) : 0;
    const lng = c.longitude ? parseFloat(c.longitude) : 0;
    const region = c.region || 'Other';
    const area = 'N/A'; // dr5hn dataset doesn't have area
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
  const samples = ['us', 'gb', 'ca', 'al', 'jp'];
  for (const code of samples) {
    const p = profiles[code];
    if (p) {
      console.log(code.toUpperCase() + ': pop=' + p.population + ' | langs=' + p.languages + ' | salary=' + p.hasSalary + (p.salaryKey ? ' (' + p.salaryKey + ')' : ''));
    }
  }
}
generate();