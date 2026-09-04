export const holidaySets = {
  US: ['2026-01-01', '2026-07-04', '2026-12-25'],
  UK: ['2026-01-01', '2026-12-25', '2026-12-26'],
  AU: ['2026-01-01', '2026-01-26', '2026-04-10'],
  NZ: ['2026-01-01', '2026-02-06', '2026-04-10'],
}

export function isHoliday(dateStr, region) {
  return holidaySets[region]?.includes(dateStr) || false
}