/**
 * Approximate public coordinates for each location id in lib/data/mockWeather.ts.
 * These are real, publicly known town/region coordinates — used only to
 * query the live weather provider (services/weather/liveProvider.ts), not
 * presented as authoritative survey data.
 */
export const LOCATION_COORDINATES: Record<string, { lat: number; lon: number }> = {
  somvarpet: { lat: 12.6, lon: 75.85 },
  madikeri: { lat: 12.42, lon: 75.74 },
  virajpet: { lat: 12.2, lon: 75.81 },
  "chikmagalur-taluk": { lat: 13.32, lon: 75.77 },
  mudigere: { lat: 13.13, lon: 75.64 },
  koppa: { lat: 13.53, lon: 75.36 },
  sakleshpur: { lat: 12.94, lon: 75.78 },
  belur: { lat: 13.16, lon: 75.86 },
  "sulthan-bathery": { lat: 11.66, lon: 76.26 },
  mananthavady: { lat: 11.8, lon: 76.0 },
  munnar: { lat: 10.09, lon: 77.06 },
  kotagiri: { lat: 11.42, lon: 76.86 },
  "araku-valley": { lat: 18.33, lon: 82.87 },
  "minas-gerais": { lat: -18.51, lon: -44.55 },
  "dak-lak": { lat: 12.71, lon: 108.24 },
  huila: { lat: 2.54, lon: 76.28 },
  sidama: { lat: 6.85, lon: 38.48 },
  chikmagalur: { lat: 13.32, lon: 75.77 },
};
