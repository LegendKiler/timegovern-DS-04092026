// World renewable energy share by year - source: World Bank EG.FEC.RNEW.ZS (WLD aggregate)
// Metric: renewable energy consumption as % of total final energy consumption.
// Generated: 2026-10-17

export const WORLD_RENEWABLE_BY_YEAR = [
  { year: 1990, value: 16.6761728451138 },
  { year: 1991, value: 16.8275092292776 },
  { year: 1992, value: 17.1858871999502 },
  { year: 1993, value: 17.2074395489013 },
  { year: 1994, value: 17.3572712155107 },
  { year: 1995, value: 17.4243468135946 },
  { year: 1996, value: 17.4450890685685 },
  { year: 1997, value: 17.4743432804444 },
  { year: 1998, value: 17.6182879337665 },
  { year: 1999, value: 17.8778259194218 },
  { year: 2000, value: 17.5262813966932 },
  { year: 2001, value: 17.2141012541802 },
  { year: 2002, value: 17.2206557859887 },
  { year: 2003, value: 17.067470633117 },
  { year: 2004, value: 16.7834791518651 },
  { year: 2005, value: 16.6370993331808 },
  { year: 2006, value: 16.7290772224366 },
  { year: 2007, value: 16.5374660334277 },
  { year: 2008, value: 16.6569817886533 },
  { year: 2009, value: 17.0654993607187 },
  { year: 2010, value: 16.7414815095897 },
  { year: 2011, value: 16.6987205578704 },
  { year: 2012, value: 16.8962150785112 },
  { year: 2013, value: 17.1692464159295 },
  { year: 2014, value: 17.3299951573821 },
  { year: 2015, value: 17.4035082673572 },
  { year: 2016, value: 17.6281084915531 },
  { year: 2017, value: 17.8541835016377 },
  { year: 2018, value: 18.1052270747944 },
  { year: 2019, value: 18.5751641385934 },
  { year: 2020, value: 19.7355641050053 },
];

export function getRenewableForYear(year) {
  const y = parseInt(year, 10);
  if (!Number.isFinite(y)) return null;
  return WORLD_RENEWABLE_BY_YEAR.find(r => r.year === y) || null;
}
