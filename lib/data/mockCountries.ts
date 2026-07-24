export interface CountryMarketData {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  coffeeType: string;
  productionTons: number;
  exportsTons: number;
  importsTons: number;
  priceInrKg: number;
  weather: {
    tempC: number;
    condition: string;
  };
  harvestPrediction: string;
}

/**
 * Five major origin countries, matching the brief exactly. In production
 * this is fetched from GET /api/countries (FastAPI), but the map and
 * detail panel only depend on this shape.
 */
export const COUNTRY_MARKET_DATA: CountryMarketData[] = [
  {
    id: "BR",
    name: "Brazil",
    longitude: -51.9253,
    latitude: -14.235,
    coffeeType: "Arabica & Robusta (Conilon)",
    productionTons: 3_120_000,
    exportsTons: 2_400_000,
    importsTons: 12_000,
    priceInrKg: 350,
    weather: { tempC: 24, condition: "Partly cloudy" },
    harvestPrediction: "On track — main harvest peaks late June, yields +4% YoY",
  },
  {
    id: "VN",
    name: "Vietnam",
    longitude: 108.2772,
    latitude: 14.0583,
    coffeeType: "Robusta",
    productionTons: 1_780_000,
    exportsTons: 1_650_000,
    importsTons: 4_500,
    priceInrKg: 210,
    weather: { tempC: 27, condition: "Humid, scattered showers" },
    harvestPrediction: "Delayed 1–2 weeks due to late monsoon onset",
  },
  {
    id: "CO",
    name: "Colombia",
    longitude: -74.2973,
    latitude: 4.5709,
    coffeeType: "Washed Arabica",
    productionTons: 690_000,
    exportsTons: 610_000,
    importsTons: 6_200,
    priceInrKg: 380,
    weather: { tempC: 19, condition: "Cool, high-altitude mist" },
    harvestPrediction: "Mitaca (secondary) harvest strong, +6% vs last cycle",
  },
  {
    id: "ET",
    name: "Ethiopia",
    longitude: 40.4897,
    latitude: 9.145,
    coffeeType: "Heirloom Arabica",
    productionTons: 470_000,
    exportsTons: 280_000,
    importsTons: 900,
    priceInrKg: 430,
    weather: { tempC: 21, condition: "Dry, clear skies" },
    harvestPrediction: "Favorable rains during flowering — yields trending up",
  },
  {
    id: "IN",
    name: "India",
    longitude: 78.9629,
    latitude: 20.5937,
    coffeeType: "Arabica & Robusta",
    productionTons: 348_000,
    exportsTons: 220_000,
    importsTons: 3_100,
    priceInrKg: 318,
    weather: { tempC: 26, condition: "Pre-monsoon heat" },
    harvestPrediction: "Karnataka & Kerala tracking normal, watching monsoon timing",
  },
];
