// Native-language country names for the highest-value markets.
// Every non-ASCII character is written as a \uXXXX escape sequence so the
// file survives any terminal encoding. JS decodes them at runtime.
//
// Structure: ISO2 -> { native: string in native script, romanized?: transliteration }

export const NATIVE_NAMES = {
  // East Asia
  JP: { native: '\u65e5\u672c', romanized: 'Nihon' },
  KR: { native: '\ub300\ud55c\ubbfc\uad6d', romanized: 'Daehan Minguk' },
  CN: { native: '\u4e2d\u56fd', romanized: 'Zhongguo' },
  TW: { native: '\u81fa\u7063', romanized: 'Taiwan' },
  HK: { native: '\u9999\u6e2f', romanized: 'Hoeng1gong2' },

  // Southeast Asia
  TH: { native: '\u0e1b\u0e23\u0e30\u0e40\u0e17\u0e28\u0e44\u0e17\u0e22', romanized: 'Prathet Thai' },
  VN: { native: 'Vi\u1ec7t Nam' },

  // South Asia
  IN: { native: '\u092d\u093e\u0930\u0924', romanized: 'Bharat' },
  PK: { native: '\u067e\u0627\u06a9\u0633\u062a\u0627\u0646', romanized: 'Pakistan' },
  BD: { native: '\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6', romanized: 'Bangladesh' },
  NP: { native: '\u0928\u0947\u092a\u093e\u0932', romanized: 'Nepal' },

  // Eastern Europe & Central Asia
  RU: { native: '\u0420\u043e\u0441\u0441\u0438\u044f', romanized: 'Rossiya' },
  UA: { native: '\u0423\u043a\u0440\u0430\u0457\u043d\u0430', romanized: 'Ukraina' },

  // Middle East
  AE: { native: '\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a', romanized: 'Al-Imarat' },
  SA: { native: '\u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629', romanized: 'As-Saudiyyah' },
  QA: { native: '\u0642\u0637\u0631', romanized: 'Qatar' },
  KW: { native: '\u0627\u0644\u0643\u0648\u064a\u062a', romanized: 'Al-Kuwayt' },
  IL: { native: '\u05d9\u05e9\u05e8\u05d0\u05dc', romanized: 'Yisra\u0027el' },
  IR: { native: '\u0627\u06cc\u0631\u0627\u0646', romanized: 'Iran' },
  TR: { native: 'T\u00fcrkiye' },

  // North Africa
  EG: { native: '\u0645\u0635\u0631', romanized: 'Misr' },
  MA: { native: '\u0627\u0644\u0645\u063a\u0631\u0628', romanized: 'Al-Maghrib' },
  DZ: { native: '\u0627\u0644\u062c\u0632\u0627\u0626\u0631', romanized: 'Al-Jazair' },
  TN: { native: '\u062a\u0648\u0646\u0633', romanized: 'Tunis' },

  // Western Europe
  DE: { native: 'Deutschland' },
  FR: { native: 'France' },
  IT: { native: 'Italia' },
  ES: { native: 'Espa\u00f1a' },
  PT: { native: 'Portugal' },
  NL: { native: 'Nederland' },
  BE: { native: 'Belgi\u00eb' },
  CH: { native: 'Schweiz' },
  AT: { native: '\u00d6sterreich' },

  // Nordics
  SE: { native: 'Sverige' },
  NO: { native: 'Norge' },
  DK: { native: 'Danmark' },
  FI: { native: 'Suomi' },
  IS: { native: '\u00cdsland' },

  // Central Europe
  PL: { native: 'Polska' },
  CZ: { native: '\u010cesko' },
  SK: { native: 'Slovensko' },
  HU: { native: 'Magyarorsz\u00e1g' },
  RO: { native: 'Rom\u00e2nia' },

  // Southern Europe
  GR: { native: '\u0395\u03bb\u03bb\u03ac\u03b4\u03b1', romanized: 'Ellada' },

  // Latin America
  MX: { native: 'M\u00e9xico' },
  BR: { native: 'Brasil' },
  AR: { native: 'Argentina' },
  CO: { native: 'Colombia' },
  CL: { native: 'Chile' },
  PE: { native: 'Per\u00fa' },
}

export function getNativeName(c2) {
  if (!c2) return null
  return NATIVE_NAMES[c2.toUpperCase()] || null
}