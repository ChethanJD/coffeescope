export type ConditionType =
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "rain"
  | "storm"
  | "mist";

export interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: ConditionType;
  rainChance: number;
}

export interface LocationWeather {
  id: string;
  name: string;
  region: string;
  state?: string;
  district?: string;
  pincode?: string;
  current: {
    tempC: number;
    condition: ConditionType;
    humidity: number;
    windKmh: number;
    rainMm: number;
    feelsLikeC: number;
  };
  forecast: ForecastDay[];
  aiRecommendation: string;
}

export const WEATHER_LOCATIONS: LocationWeather[] = [
  // --- India: Karnataka, Kodagu district ---
  {
    id: "somvarpet",
    name: "Somvarpet",
    region: "Kodagu, Karnataka",
    state: "Karnataka",
    district: "Kodagu",
    pincode: "571236",
    current: { tempC: 21, condition: "partly-cloudy", humidity: 68, windKmh: 10, rainMm: 2.4, feelsLikeC: 21 },
    forecast: [
      { day: "Mon", high: 24, low: 15, condition: "partly-cloudy", rainChance: 30 },
      { day: "Tue", high: 23, low: 15, condition: "rain", rainChance: 60 },
      { day: "Wed", high: 22, low: 14, condition: "cloudy", rainChance: 40 },
      { day: "Thu", high: 24, low: 15, condition: "sunny", rainChance: 10 },
      { day: "Fri", high: 23, low: 14, condition: "partly-cloudy", rainChance: 25 },
    ],
    aiRecommendation:
      "Light showers through midweek are good for berry development. Hold off on fertilizer application until the ground dries after Tuesday's rain.",
  },
  {
    id: "madikeri",
    name: "Madikeri",
    region: "Kodagu, Karnataka",
    state: "Karnataka",
    district: "Kodagu",
    pincode: "571201",
    current: { tempC: 19, condition: "mist", humidity: 78, windKmh: 8, rainMm: 3.1, feelsLikeC: 18 },
    forecast: [
      { day: "Mon", high: 22, low: 14, condition: "mist", rainChance: 45 },
      { day: "Tue", high: 21, low: 13, condition: "rain", rainChance: 65 },
      { day: "Wed", high: 21, low: 13, condition: "cloudy", rainChance: 50 },
      { day: "Thu", high: 23, low: 14, condition: "partly-cloudy", rainChance: 20 },
      { day: "Fri", high: 22, low: 14, condition: "mist", rainChance: 35 },
    ],
    aiRecommendation:
      "High elevation mist is slowing cherry ripening slightly — good for cup quality, but monitor for fungal risk given sustained humidity.",
  },
  {
    id: "virajpet",
    name: "Virajpet",
    region: "Kodagu, Karnataka",
    state: "Karnataka",
    district: "Kodagu",
    pincode: "571218",
    current: { tempC: 23, condition: "sunny", humidity: 60, windKmh: 11, rainMm: 0, feelsLikeC: 23 },
    forecast: [
      { day: "Mon", high: 26, low: 16, condition: "sunny", rainChance: 5 },
      { day: "Tue", high: 25, low: 16, condition: "partly-cloudy", rainChance: 20 },
      { day: "Wed", high: 24, low: 15, condition: "cloudy", rainChance: 35 },
      { day: "Thu", high: 25, low: 16, condition: "sunny", rainChance: 10 },
      { day: "Fri", high: 26, low: 16, condition: "sunny", rainChance: 5 },
    ],
    aiRecommendation:
      "Dry, sunny stretch ahead — good window for weeding and mulching before the next rain system arrives late in the week.",
  },
  // --- India: Karnataka, Chikmagalur district ---
  {
    id: "chikmagalur-taluk",
    name: "Chikmagalur",
    region: "Chikmagalur, Karnataka",
    state: "Karnataka",
    district: "Chikmagalur",
    pincode: "577101",
    current: { tempC: 25, condition: "cloudy", humidity: 58, windKmh: 13, rainMm: 0, feelsLikeC: 26 },
    forecast: [
      { day: "Mon", high: 29, low: 20, condition: "cloudy", rainChance: 20 },
      { day: "Tue", high: 30, low: 21, condition: "partly-cloudy", rainChance: 15 },
      { day: "Wed", high: 28, low: 20, condition: "storm", rainChance: 55 },
      { day: "Thu", high: 27, low: 19, condition: "rain", rainChance: 70 },
      { day: "Fri", high: 28, low: 20, condition: "partly-cloudy", rainChance: 30 },
    ],
    aiRecommendation:
      "Pre-monsoon heat building ahead of midweek storms — check shade netting and drainage channels before Wednesday.",
  },
  {
    id: "mudigere",
    name: "Mudigere",
    region: "Chikmagalur, Karnataka",
    state: "Karnataka",
    district: "Chikmagalur",
    pincode: "577132",
    current: { tempC: 22, condition: "partly-cloudy", humidity: 64, windKmh: 9, rainMm: 1.2, feelsLikeC: 22 },
    forecast: [
      { day: "Mon", high: 25, low: 17, condition: "partly-cloudy", rainChance: 30 },
      { day: "Tue", high: 24, low: 17, condition: "rain", rainChance: 55 },
      { day: "Wed", high: 23, low: 16, condition: "cloudy", rainChance: 40 },
      { day: "Thu", high: 25, low: 17, condition: "sunny", rainChance: 15 },
      { day: "Fri", high: 24, low: 16, condition: "partly-cloudy", rainChance: 25 },
    ],
    aiRecommendation:
      "Consistent light rain is supporting healthy flowering this week — no irrigation needed through Friday.",
  },
  {
    id: "koppa",
    name: "Koppa",
    region: "Chikmagalur, Karnataka",
    state: "Karnataka",
    district: "Chikmagalur",
    pincode: "577126",
    current: { tempC: 23, condition: "rain", humidity: 74, windKmh: 10, rainMm: 5.2, feelsLikeC: 23 },
    forecast: [
      { day: "Mon", high: 25, low: 18, condition: "rain", rainChance: 70 },
      { day: "Tue", high: 24, low: 17, condition: "storm", rainChance: 80 },
      { day: "Wed", high: 24, low: 17, condition: "rain", rainChance: 60 },
      { day: "Thu", high: 26, low: 18, condition: "partly-cloudy", rainChance: 35 },
      { day: "Fri", high: 27, low: 19, condition: "sunny", rainChance: 15 },
    ],
    aiRecommendation:
      "Heavy rain risk midweek — ensure field drainage is clear to avoid waterlogging around young plants.",
  },
  // --- India: Karnataka, Hassan district ---
  {
    id: "sakleshpur",
    name: "Sakleshpur",
    region: "Hassan, Karnataka",
    state: "Karnataka",
    district: "Hassan",
    pincode: "573134",
    current: { tempC: 22, condition: "partly-cloudy", humidity: 63, windKmh: 12, rainMm: 0.8, feelsLikeC: 22 },
    forecast: [
      { day: "Mon", high: 25, low: 17, condition: "partly-cloudy", rainChance: 25 },
      { day: "Tue", high: 24, low: 16, condition: "cloudy", rainChance: 35 },
      { day: "Wed", high: 25, low: 17, condition: "sunny", rainChance: 10 },
      { day: "Thu", high: 26, low: 17, condition: "sunny", rainChance: 5 },
      { day: "Fri", high: 25, low: 17, condition: "partly-cloudy", rainChance: 20 },
    ],
    aiRecommendation:
      "Stable, mild week ahead — a good window for pruning and canopy management before the next rain cycle.",
  },
  {
    id: "belur",
    name: "Belur",
    region: "Hassan, Karnataka",
    state: "Karnataka",
    district: "Hassan",
    pincode: "573115",
    current: { tempC: 27, condition: "sunny", humidity: 50, windKmh: 14, rainMm: 0, feelsLikeC: 28 },
    forecast: [
      { day: "Mon", high: 31, low: 20, condition: "sunny", rainChance: 5 },
      { day: "Tue", high: 32, low: 21, condition: "sunny", rainChance: 5 },
      { day: "Wed", high: 30, low: 20, condition: "partly-cloudy", rainChance: 20 },
      { day: "Thu", high: 29, low: 19, condition: "cloudy", rainChance: 30 },
      { day: "Fri", high: 30, low: 20, condition: "sunny", rainChance: 10 },
    ],
    aiRecommendation:
      "Warm, dry conditions — monitor soil moisture and irrigate young plants if topsoil dries out by Wednesday.",
  },
  // --- India: Kerala, Wayanad district ---
  {
    id: "sulthan-bathery",
    name: "Sulthan Bathery",
    region: "Wayanad, Kerala",
    state: "Kerala",
    district: "Wayanad",
    pincode: "673592",
    current: { tempC: 24, condition: "rain", humidity: 82, windKmh: 9, rainMm: 6.8, feelsLikeC: 25 },
    forecast: [
      { day: "Mon", high: 28, low: 22, condition: "rain", rainChance: 75 },
      { day: "Tue", high: 27, low: 22, condition: "storm", rainChance: 85 },
      { day: "Wed", high: 27, low: 21, condition: "rain", rainChance: 65 },
      { day: "Thu", high: 28, low: 22, condition: "partly-cloudy", rainChance: 40 },
      { day: "Fri", high: 29, low: 23, condition: "sunny", rainChance: 15 },
    ],
    aiRecommendation:
      "Sustained rain raises fungal risk for Robusta blocks — ensure fermentation and drying areas stay covered through midweek.",
  },
  {
    id: "mananthavady",
    name: "Mananthavady",
    region: "Wayanad, Kerala",
    state: "Kerala",
    district: "Wayanad",
    pincode: "670645",
    current: { tempC: 23, condition: "cloudy", humidity: 76, windKmh: 8, rainMm: 2.1, feelsLikeC: 23 },
    forecast: [
      { day: "Mon", high: 27, low: 21, condition: "cloudy", rainChance: 45 },
      { day: "Tue", high: 26, low: 20, condition: "rain", rainChance: 60 },
      { day: "Wed", high: 26, low: 20, condition: "partly-cloudy", rainChance: 30 },
      { day: "Thu", high: 27, low: 21, condition: "sunny", rainChance: 15 },
      { day: "Fri", high: 28, low: 21, condition: "sunny", rainChance: 10 },
    ],
    aiRecommendation:
      "Humidity easing toward the weekend — a reasonable window to resume any pending harvest activity from Thursday.",
  },
  // --- India: Kerala, Idukki district ---
  {
    id: "munnar",
    name: "Munnar",
    region: "Idukki, Kerala",
    state: "Kerala",
    district: "Idukki",
    pincode: "685612",
    current: { tempC: 17, condition: "mist", humidity: 80, windKmh: 7, rainMm: 1.5, feelsLikeC: 16 },
    forecast: [
      { day: "Mon", high: 20, low: 12, condition: "mist", rainChance: 40 },
      { day: "Tue", high: 19, low: 11, condition: "rain", rainChance: 55 },
      { day: "Wed", high: 20, low: 12, condition: "cloudy", rainChance: 35 },
      { day: "Thu", high: 21, low: 12, condition: "partly-cloudy", rainChance: 20 },
      { day: "Fri", high: 20, low: 12, condition: "mist", rainChance: 30 },
    ],
    aiRecommendation:
      "Cool, misty high-altitude conditions are ideal for slow cherry maturation — no action needed this week.",
  },
  // --- India: Tamil Nadu, Nilgiris district ---
  {
    id: "kotagiri",
    name: "Kotagiri",
    region: "Nilgiris, Tamil Nadu",
    state: "Tamil Nadu",
    district: "Nilgiris",
    pincode: "643217",
    current: { tempC: 18, condition: "partly-cloudy", humidity: 70, windKmh: 12, rainMm: 0.5, feelsLikeC: 18 },
    forecast: [
      { day: "Mon", high: 21, low: 13, condition: "partly-cloudy", rainChance: 25 },
      { day: "Tue", high: 20, low: 12, condition: "cloudy", rainChance: 35 },
      { day: "Wed", high: 21, low: 13, condition: "sunny", rainChance: 15 },
      { day: "Thu", high: 22, low: 13, condition: "sunny", rainChance: 10 },
      { day: "Fri", high: 21, low: 13, condition: "partly-cloudy", rainChance: 20 },
    ],
    aiRecommendation:
      "Mild, stable weather — a good week for canopy pruning ahead of the next flowering cycle.",
  },
  // --- India: Andhra Pradesh, Visakhapatnam district ---
  {
    id: "araku-valley",
    name: "Araku Valley",
    region: "Visakhapatnam, Andhra Pradesh",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    pincode: "531149",
    current: { tempC: 20, condition: "cloudy", humidity: 72, windKmh: 10, rainMm: 1.8, feelsLikeC: 20 },
    forecast: [
      { day: "Mon", high: 23, low: 14, condition: "cloudy", rainChance: 35 },
      { day: "Tue", high: 22, low: 13, condition: "rain", rainChance: 50 },
      { day: "Wed", high: 23, low: 14, condition: "partly-cloudy", rainChance: 25 },
      { day: "Thu", high: 24, low: 14, condition: "sunny", rainChance: 10 },
      { day: "Fri", high: 23, low: 14, condition: "cloudy", rainChance: 30 },
    ],
    aiRecommendation:
      "Organic tribal-grown plots are showing healthy growth this season — light midweek rain should support bean filling.",
  },
  // --- International origins ---
  {
    id: "minas-gerais",
    name: "Minas Gerais",
    region: "Brazil",
    current: { tempC: 24, condition: "partly-cloudy", humidity: 58, windKmh: 12, rainMm: 0, feelsLikeC: 25 },
    forecast: [
      { day: "Mon", high: 26, low: 16, condition: "sunny", rainChance: 5 },
      { day: "Tue", high: 25, low: 17, condition: "partly-cloudy", rainChance: 15 },
      { day: "Wed", high: 23, low: 16, condition: "cloudy", rainChance: 30 },
      { day: "Thu", high: 22, low: 15, condition: "rain", rainChance: 70 },
      { day: "Fri", high: 24, low: 16, condition: "partly-cloudy", rainChance: 20 },
    ],
    aiRecommendation:
      "Dry conditions through Wednesday are ideal for sun-drying cherries. Cover drying beds ahead of Thursday's rain.",
  },
  {
    id: "dak-lak",
    name: "Dak Lak",
    region: "Vietnam",
    current: { tempC: 27, condition: "rain", humidity: 84, windKmh: 9, rainMm: 6.5, feelsLikeC: 29 },
    forecast: [
      { day: "Mon", high: 29, low: 23, condition: "rain", rainChance: 80 },
      { day: "Tue", high: 28, low: 23, condition: "storm", rainChance: 90 },
      { day: "Wed", high: 27, low: 22, condition: "rain", rainChance: 65 },
      { day: "Thu", high: 29, low: 23, condition: "partly-cloudy", rainChance: 35 },
      { day: "Fri", high: 30, low: 24, condition: "sunny", rainChance: 10 },
    ],
    aiRecommendation:
      "High humidity and sustained rain raise fungal risk. Delay harvest where possible and ensure fermentation tanks are covered.",
  },
  {
    id: "huila",
    name: "Huila",
    region: "Colombia",
    current: { tempC: 18, condition: "mist", humidity: 76, windKmh: 6, rainMm: 1.2, feelsLikeC: 17 },
    forecast: [
      { day: "Mon", high: 21, low: 14, condition: "mist", rainChance: 40 },
      { day: "Tue", high: 20, low: 13, condition: "cloudy", rainChance: 45 },
      { day: "Wed", high: 22, low: 14, condition: "partly-cloudy", rainChance: 25 },
      { day: "Thu", high: 21, low: 13, condition: "rain", rainChance: 55 },
      { day: "Fri", high: 20, low: 14, condition: "cloudy", rainChance: 40 },
    ],
    aiRecommendation:
      "Cool, misty mornings are favorable for slow cherry maturation — good for cup quality. No irrigation needed this week.",
  },
  {
    id: "sidama",
    name: "Sidama",
    region: "Ethiopia",
    current: { tempC: 21, condition: "sunny", humidity: 45, windKmh: 8, rainMm: 0, feelsLikeC: 21 },
    forecast: [
      { day: "Mon", high: 24, low: 12, condition: "sunny", rainChance: 0 },
      { day: "Tue", high: 25, low: 13, condition: "sunny", rainChance: 5 },
      { day: "Wed", high: 24, low: 13, condition: "partly-cloudy", rainChance: 10 },
      { day: "Thu", high: 23, low: 12, condition: "sunny", rainChance: 0 },
      { day: "Fri", high: 24, low: 13, condition: "sunny", rainChance: 5 },
    ],
    aiRecommendation:
      "Clear, dry skies all week — excellent window for raised-bed drying. Rotate beds daily for even moisture loss.",
  },
  {
    id: "chikmagalur",
    name: "Chikmagalur",
    region: "India",
    current: { tempC: 29, condition: "cloudy", humidity: 62, windKmh: 14, rainMm: 0, feelsLikeC: 31 },
    forecast: [
      { day: "Mon", high: 31, low: 22, condition: "cloudy", rainChance: 20 },
      { day: "Tue", high: 32, low: 23, condition: "partly-cloudy", rainChance: 15 },
      { day: "Wed", high: 30, low: 22, condition: "storm", rainChance: 60 },
      { day: "Thu", high: 29, low: 21, condition: "rain", rainChance: 75 },
      { day: "Fri", high: 30, low: 22, condition: "partly-cloudy", rainChance: 30 },
    ],
    aiRecommendation:
      "Pre-monsoon heat building — ensure shade cover is intact before Wednesday's storm system arrives.",
  },
];
