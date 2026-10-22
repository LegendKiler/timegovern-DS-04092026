import fs from 'fs';

const SALARY_COUNTRIES = ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'IN', 'JP', 'BR', 'MX', 'ZA', 'NG', 'KE', 'PK', 'BD', 'SG', 'NL', 'NZ', 'QA', 'SA', 'AE'];

async function generate() {
  console.log('Fetching complete data from mledoze/countries...');
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
    const name = c.name.common;
    
    // Dial Code
    let dialCode = '';
    if (c.idd && c.idd.root) {
      dialCode = c.idd.root;
      // If there's exactly one suffix, append it. Otherwise, just use root.
      if (c.idd.suffixes && c.idd.suffixes.length === 1) {
        dialCode += c.idd.suffixes[0];
      }
    }
    
    // Population
    const population = c.population ? c.population.toLocaleString('en-US') : 'N/A';
    
    // Area
    const area = c.area ? c.area.toLocaleString('en-US') + ' KM²' : 'N/A';
    
    // Languages
    let languages = 'N/A';
    if (c.languages && Object.keys(c.languages).length > 0) {
      languages = Object.values(c.languages).join(', ');
    }
    
    // Currency
    let currency = 'N/A';
    if (c.currencies) {
      const currKey = Object.keys(c.currencies)[0];
      if (currKey) currency = c.currencies[currKey].name + ' (' + currKey + ')';
    }
    
    // Capital
    const capital = (c.capital && c.capital.length > 0) ? c.capital[0] : 'N/A';
    
    // Timezone
    const timezone = (c.timezones && c.timezones.length > 0) ? c.timezones[0] : 'UTC';
    
    // Lat/Lng
    const lat = (c.latlng && c.latlng.length === 2) ? Math.round(c.latlng[0] * 100) / 100 : 0;
    const lng = (c.latlng && c.latlng.length === 2) ? Math.round(c.latlng[1] * 100) / 100 : 0;
    
    // Region
    const region = c.region || 'Other';
    
    // Salary Support (Direct ISO2 match)
    const hasSalary = SALARY_COUNTRIES.includes(iso2);

    profiles[code] = {
      name,
      iso2,
      dialCode,
      capital,
      population,
      area,
      currency,
      languages,
      timezone,
      lat,
      lng,
      region,
      hasSalary
    };
  }
  
  const output = '// Auto-generated with full stats embedded\n// Run: node scripts/generate-all-country-data.mjs\n\nexport const COUNTRY_PROFILES = ' + JSON.stringify(profiles, null, 2) + ';\n\nexport const getAllCountries = () => Object.values(COUNTRY_PROFILES);\nexport const getCountryProfile = (code) => COUNTRY_PROFILES[code.toLowerCase()];\n';
  
  fs.writeFileSync('src/data/countryProfiles.js', output);
  console.log('Generated ' + Object.keys(profiles).length + ' profiles.');
  
  console.log('\n--- Verification (Canada) ---');
  const ca = profiles['ca'];
  if (ca) {
    console.log(`Name: ${ca.name}`);
    console.log(`Dial: ${ca.dialCode}`);
    console.log(`Area: ${ca.area}`);
    console.log(`Pop:  ${ca.population}`);
    console.log(`Lang: ${ca.languages}`);
    console.log(`Sal:  ${ca.hasSalary}`);
  }
}
generate();