export interface DistrictData {
  id: string;
  name: string;
  coffeeType: string;
  productionTons: number;
  priceInrKg: number;
  weather: { tempC: number; condition: string };
  harvestPrediction: string;
}

export interface StateData {
  id: string;
  name: string;
  districts: DistrictData[];
}

export const INDIA_STATES: StateData[] = [
  {
    id: "karnataka",
    name: "Karnataka",
    districts: [
      {
        id: "kodagu",
        name: "Kodagu (Coorg)",
        coffeeType: "Arabica & Robusta",
        productionTons: 105000,
        priceInrKg: 340,
        weather: { tempC: 22, condition: "Misty, light showers" },
        harvestPrediction: "Backing harvest strong this year — post-monsoon flowering was even across estates.",
      },
      {
        id: "chikmagaluru",
        name: "Chikmagaluru",
        coffeeType: "Arabica",
        productionTons: 78000,
        priceInrKg: 355,
        weather: { tempC: 24, condition: "Pre-monsoon heat" },
        harvestPrediction: "Watching monsoon timing closely — shade cover holding up well so far.",
      },
      {
        id: "hassan",
        name: "Hassan",
        coffeeType: "Arabica & Robusta",
        productionTons: 42000,
        priceInrKg: 330,
        weather: { tempC: 25, condition: "Partly cloudy" },
        harvestPrediction: "Normal cycle expected — Sakleshpur belt reporting healthy berry set.",
      },
    ],
  },
  {
    id: "kerala",
    name: "Kerala",
    districts: [
      {
        id: "wayanad",
        name: "Wayanad",
        coffeeType: "Robusta",
        productionTons: 61000,
        priceInrKg: 285,
        weather: { tempC: 23, condition: "Humid, scattered showers" },
        harvestPrediction: "Robusta yields tracking above last season on the back of good early rains.",
      },
      {
        id: "idukki",
        name: "Idukki",
        coffeeType: "Arabica & Robusta",
        productionTons: 28000,
        priceInrKg: 310,
        weather: { tempC: 20, condition: "Cool, high-altitude mist" },
        harvestPrediction: "High-elevation blocks maturing slowly — good sign for cup quality.",
      },
    ],
  },
];
