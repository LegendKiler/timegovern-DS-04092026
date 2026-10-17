// World forest area by year - source: World Bank AG.LND.FRST.K2 (WLD aggregate)
// Metric: total global forest area, in square kilometers.
// Generated: 2026-10-17

export const WORLD_FOREST_BY_YEAR = [
  { year: 1992, value: 41527889.362 },
  { year: 1993, value: 41699049.233 },
  { year: 1994, value: 41622314.101 },
  { year: 1995, value: 41545578.973 },
  { year: 1996, value: 41468843.845 },
  { year: 1997, value: 41392108.713 },
  { year: 1998, value: 41315373.583 },
  { year: 1999, value: 41238638.452 },
  { year: 2000, value: 41169443.323 },
  { year: 2001, value: 41119046.544 },
  { year: 2002, value: 41068649.765 },
  { year: 2003, value: 41018252.988 },
  { year: 2004, value: 40967856.21 },
  { year: 2005, value: 40917459.432 },
  { year: 2006, value: 40900646.653 },
  { year: 2007, value: 40850703.875 },
  { year: 2008, value: 40800761.098 },
  { year: 2009, value: 40750818.318 },
  { year: 2010, value: 40700875.54 },
  { year: 2011, value: 40657762.905 },
  { year: 2012, value: 40883530.207 },
  { year: 2013, value: 40838658.292 },
  { year: 2014, value: 40793786.376 },
  { year: 2015, value: 40748916.46 },
  { year: 2016, value: 40716294.888 },
  { year: 2017, value: 40647880.559 },
  { year: 2018, value: 40599561.342 },
  { year: 2019, value: 40548712.6 },
  { year: 2020, value: 40499597.5 },
  { year: 2021, value: 40449371.337 },
  { year: 2022, value: 40399893.994 },
  { year: 2023, value: 40349918.555 },
];

export function getForestForYear(year) {
  const y = parseInt(year, 10);
  if (!Number.isFinite(y)) return null;
  return WORLD_FOREST_BY_YEAR.find(r => r.year === y) || null;
}
