// Supplemental public-holiday data for countries NOT covered by Nager.Date.
// Curated 2026-10-01. Fixed-date national holidays are accurate; lunar/religious
// holidays are approximate and should be confirmed locally before relying on them.
//
// Structure:
//   { CC: { name, region, note?, years: { YYYY: [ {date, name, types} ] } } }
// types: 'Public' | 'Bank' | 'Observance' | 'Optional'

export const SUPPLEMENTAL_HOLIDAYS = {
  PK: {
    name: 'Pakistan', region: 'Asia',
    note: 'Islamic holidays follow the lunar calendar and may shift by 1 day.',
    years: {
      2026: [
        { date: '2026-02-05', name: 'Kashmir Solidarity Day', types: ['Public'] },
        { date: '2026-03-20', name: 'Eid-ul-Fitr (Day 1)', types: ['Public'] },
        { date: '2026-03-21', name: 'Eid-ul-Fitr (Day 2)', types: ['Public'] },
        { date: '2026-03-22', name: 'Eid-ul-Fitr (Day 3)', types: ['Public'] },
        { date: '2026-03-23', name: 'Pakistan Day', types: ['Public'] },
        { date: '2026-05-01', name: 'Labour Day', types: ['Public'] },
        { date: '2026-05-27', name: 'Eid-ul-Adha (Day 1)', types: ['Public'] },
        { date: '2026-05-28', name: 'Eid-ul-Adha (Day 2)', types: ['Public'] },
        { date: '2026-05-29', name: 'Eid-ul-Adha (Day 3)', types: ['Public'] },
        { date: '2026-06-26', name: 'Ashura (Day 1)', types: ['Public'] },
        { date: '2026-06-27', name: 'Ashura (Day 2)', types: ['Public'] },
        { date: '2026-08-14', name: 'Independence Day', types: ['Public'] },
        { date: '2026-08-26', name: 'Eid Milad-un-Nabi', types: ['Public'] },
        { date: '2026-11-09', name: 'Iqbal Day', types: ['Public'] },
        { date: '2026-12-25', name: 'Quaid-e-Azam Day', types: ['Public'] },
      ]
    }
  },
  IN: {
    name: 'India', region: 'Asia',
    note: 'India has many state-level holidays; only nationwide ones are listed.',
    years: {
      2026: [
        { date: '2026-01-26', name: 'Republic Day', types: ['Public'] },
        { date: '2026-03-04', name: 'Holi', types: ['Public'] },
        { date: '2026-03-21', name: 'Eid-ul-Fitr', types: ['Public'] },
        { date: '2026-04-03', name: 'Good Friday', types: ['Public'] },
        { date: '2026-05-01', name: 'Labour Day', types: ['Observance'] },
        { date: '2026-08-15', name: 'Independence Day', types: ['Public'] },
        { date: '2026-10-02', name: 'Gandhi Jayanti', types: ['Public'] },
        { date: '2026-11-08', name: 'Diwali', types: ['Public'] },
        { date: '2026-12-25', name: 'Christmas Day', types: ['Public'] },
      ]
    }
  },
  AE: {
    name: 'United Arab Emirates', region: 'Middle East',
    years: {
      2026: [
        { date: '2026-01-01', name: "New Year's Day", types: ['Public'] },
        { date: '2026-03-20', name: 'Eid al-Fitr (Day 1)', types: ['Public'] },
        { date: '2026-03-21', name: 'Eid al-Fitr (Day 2)', types: ['Public'] },
        { date: '2026-03-22', name: 'Eid al-Fitr (Day 3)', types: ['Public'] },
        { date: '2026-05-27', name: 'Arafat Day', types: ['Public'] },
        { date: '2026-05-28', name: 'Eid al-Adha (Day 1)', types: ['Public'] },
        { date: '2026-05-29', name: 'Eid al-Adha (Day 2)', types: ['Public'] },
        { date: '2026-05-30', name: 'Eid al-Adha (Day 3)', types: ['Public'] },
        { date: '2026-06-17', name: 'Islamic New Year', types: ['Public'] },
        { date: '2026-08-26', name: "Prophet Muhammad's Birthday", types: ['Public'] },
        { date: '2026-11-30', name: 'Commemoration Day', types: ['Public'] },
        { date: '2026-12-01', name: 'National Day (Day 1)', types: ['Public'] },
        { date: '2026-12-02', name: 'National Day (Day 2)', types: ['Public'] },
      ]
    }
  },
  SA: {
    name: 'Saudi Arabia', region: 'Middle East',
    years: {
      2026: [
        { date: '2026-02-22', name: 'Founding Day', types: ['Public'] },
        { date: '2026-03-20', name: 'Eid al-Fitr (Day 1)', types: ['Public'] },
        { date: '2026-03-21', name: 'Eid al-Fitr (Day 2)', types: ['Public'] },
        { date: '2026-03-22', name: 'Eid al-Fitr (Day 3)', types: ['Public'] },
        { date: '2026-05-28', name: 'Eid al-Adha (Day 1)', types: ['Public'] },
        { date: '2026-05-29', name: 'Eid al-Adha (Day 2)', types: ['Public'] },
        { date: '2026-05-30', name: 'Eid al-Adha (Day 3)', types: ['Public'] },
        { date: '2026-09-23', name: 'National Day', types: ['Public'] },
      ]
    }
  },
  TH: {
    name: 'Thailand', region: 'Asia',
    years: {
      2026: [
        { date: '2026-01-01', name: "New Year's Day", types: ['Public'] },
        { date: '2026-03-03', name: 'Makha Bucha', types: ['Public'] },
        { date: '2026-04-06', name: 'Chakri Memorial Day', types: ['Public'] },
        { date: '2026-04-13', name: 'Songkran (Day 1)', types: ['Public'] },
        { date: '2026-04-14', name: 'Songkran (Day 2)', types: ['Public'] },
        { date: '2026-04-15', name: 'Songkran (Day 3)', types: ['Public'] },
        { date: '2026-05-01', name: 'Labour Day', types: ['Public'] },
        { date: '2026-05-04', name: 'Coronation Day', types: ['Public'] },
        { date: '2026-06-01', name: 'Visakha Bucha', types: ['Public'] },
        { date: '2026-07-28', name: "King's Birthday", types: ['Public'] },
        { date: '2026-08-12', name: "Queen Mother's Birthday", types: ['Public'] },
        { date: '2026-10-13', name: 'Bhumibol Memorial Day', types: ['Public'] },
        { date: '2026-10-23', name: 'Chulalongkorn Day', types: ['Public'] },
        { date: '2026-12-05', name: "Father's Day", types: ['Public'] },
        { date: '2026-12-10', name: 'Constitution Day', types: ['Public'] },
        { date: '2026-12-31', name: "New Year's Eve", types: ['Public'] },
      ]
    }
  },
  MY: {
    name: 'Malaysia', region: 'Asia',
    years: {
      2026: [
        { date: '2026-01-01', name: "New Year's Day", types: ['Public'] },
        { date: '2026-02-01', name: 'Federal Territory Day', types: ['Public'] },
        { date: '2026-03-20', name: 'Eid al-Fitr (Day 1)', types: ['Public'] },
        { date: '2026-03-21', name: 'Eid al-Fitr (Day 2)', types: ['Public'] },
        { date: '2026-05-01', name: 'Labour Day', types: ['Public'] },
        { date: '2026-05-28', name: 'Eid al-Adha (Day 1)', types: ['Public'] },
        { date: '2026-05-29', name: 'Eid al-Adha (Day 2)', types: ['Public'] },
        { date: '2026-06-01', name: 'Wesak Day', types: ['Public'] },
        { date: '2026-06-02', name: "Agong's Birthday", types: ['Public'] },
        { date: '2026-08-31', name: 'Merdeka Day', types: ['Public'] },
        { date: '2026-09-16', name: 'Malaysia Day', types: ['Public'] },
        { date: '2026-11-08', name: 'Deepavali', types: ['Public'] },
        { date: '2026-12-25', name: 'Christmas Day', types: ['Public'] },
      ]
    }
  },
  IL: {
    name: 'Israel', region: 'Middle East',
    note: 'Israeli holidays follow the Hebrew calendar; Gregorian dates are approximate.',
    years: {
      2026: [
        { date: '2026-03-03', name: 'Purim', types: ['Public'] },
        { date: '2026-04-02', name: 'Passover (Day 1)', types: ['Public'] },
        { date: '2026-04-08', name: 'Passover (Day 7)', types: ['Public'] },
        { date: '2026-04-22', name: 'Yom HaAtzmaut', types: ['Public'] },
        { date: '2026-05-22', name: 'Shavuot', types: ['Public'] },
        { date: '2026-09-12', name: 'Rosh Hashanah (Day 1)', types: ['Public'] },
        { date: '2026-09-13', name: 'Rosh Hashanah (Day 2)', types: ['Public'] },
        { date: '2026-09-21', name: 'Yom Kippur', types: ['Public'] },
        { date: '2026-09-26', name: 'Sukkot (Day 1)', types: ['Public'] },
        { date: '2026-10-03', name: 'Shemini Atzeret', types: ['Public'] },
      ]
    }
  },
  LK: {
    name: 'Sri Lanka', region: 'Asia',
    years: {
      2026: [
        { date: '2026-01-01', name: "New Year's Day", types: ['Public'] },
        { date: '2026-01-15', name: 'Tamil Thai Pongal Day', types: ['Public'] },
        { date: '2026-02-04', name: 'National Day', types: ['Public'] },
        { date: '2026-03-03', name: 'Mahasivarathri Day', types: ['Public'] },
        { date: '2026-04-13', name: 'Day prior to Sinhala & Tamil New Year', types: ['Public'] },
        { date: '2026-04-14', name: 'Sinhala & Tamil New Year', types: ['Public'] },
        { date: '2026-05-01', name: 'May Day', types: ['Public'] },
        { date: '2026-12-25', name: 'Christmas Day', types: ['Public'] },
      ]
    }
  },
  NP: {
    name: 'Nepal', region: 'Asia',
    years: {
      2026: [
        { date: '2026-01-01', name: "New Year's Day", types: ['Public'] },
        { date: '2026-01-14', name: 'Maghe Sankranti', types: ['Public'] },
        { date: '2026-03-08', name: "International Women's Day", types: ['Public'] },
        { date: '2026-04-14', name: 'Nepali New Year', types: ['Public'] },
        { date: '2026-05-01', name: 'Labour Day', types: ['Public'] },
        { date: '2026-09-19', name: 'Constitution Day', types: ['Public'] },
        { date: '2026-10-20', name: 'Dashain (Vijaya Dashami)', types: ['Public'] },
        { date: '2026-11-08', name: 'Tihar (Laxmi Puja)', types: ['Public'] },
      ]
    }
  },
  KW: {
    name: 'Kuwait', region: 'Middle East',
    years: {
      2026: [
        { date: '2026-01-01', name: "New Year's Day", types: ['Public'] },
        { date: '2026-02-25', name: 'National Day', types: ['Public'] },
        { date: '2026-02-26', name: 'Liberation Day', types: ['Public'] },
        { date: '2026-03-20', name: 'Eid al-Fitr (Day 1)', types: ['Public'] },
        { date: '2026-03-21', name: 'Eid al-Fitr (Day 2)', types: ['Public'] },
        { date: '2026-03-22', name: 'Eid al-Fitr (Day 3)', types: ['Public'] },
        { date: '2026-05-28', name: 'Eid al-Adha (Day 1)', types: ['Public'] },
        { date: '2026-05-29', name: 'Eid al-Adha (Day 2)', types: ['Public'] },
        { date: '2026-05-30', name: 'Eid al-Adha (Day 3)', types: ['Public'] },
        { date: '2026-06-17', name: 'Islamic New Year', types: ['Public'] },
        { date: '2026-08-26', name: "Prophet Muhammad's Birthday", types: ['Public'] },
      ]
    }
  },
}