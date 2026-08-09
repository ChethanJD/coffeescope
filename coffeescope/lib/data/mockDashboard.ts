export interface DashboardUser {
  name: string;
  email: string;
  initials: string;
  role: string;
  memberSince: string;
  plan: "Free" | "Pro" | "Enterprise";
}

export const DASHBOARD_USER: DashboardUser = {
  name: "Arjun Rao",
  email: "arjun.rao@example.com",
  initials: "AR",
  role: "Exporter",
  memberSince: "March 2025",
  plan: "Pro",
};

export interface SavedFarm {
  id: string;
  name: string;
  location: string;
  areaHectares: number;
  variety: string;
  lastHarvestYield: string;
  status: "Healthy" | "Watch" | "At Risk";
}

export const SAVED_FARMS: SavedFarm[] = [
  { id: "f1", name: "Hillcrest Estate", location: "Chikmagalur, India", areaHectares: 42, variety: "Arabica", lastHarvestYield: "1.8 t/ha", status: "Healthy" },
  { id: "f2", name: "Rio Verde Fazenda", location: "Minas Gerais, Brazil", areaHectares: 118, variety: "Arabica", lastHarvestYield: "2.4 t/ha", status: "Watch" },
  { id: "f3", name: "Cao Nguyen Plot 4", location: "Dak Lak, Vietnam", areaHectares: 30, variety: "Robusta", lastHarvestYield: "3.1 t/ha", status: "At Risk" },
];

export interface FavoriteMarket {
  id: string;
  variety: string;
  price: number;
  changePct: number;
}

export const FAVORITE_MARKETS: FavoriteMarket[] = [
  { id: "m1", variety: "Arabica (ICE)", price: 580.4, changePct: 1.82 },
  { id: "m2", variety: "Robusta (LIFFE)", price: 312.75, changePct: -0.94 },
  { id: "m3", variety: "Colombia Excelso", price: 609.6, changePct: 2.15 },
];

export interface NotificationChannel {
  id: "email" | "push" | "sms" | "whatsapp";
  label: string;
  description: string;
  enabled: boolean;
}

export const NOTIFICATION_CHANNELS: NotificationChannel[] = [
  { id: "email", label: "Email", description: "Daily digests and important alerts", enabled: true },
  { id: "push", label: "Push", description: "Real-time browser and mobile push", enabled: true },
  { id: "sms", label: "SMS", description: "Critical price and weather alerts only", enabled: false },
  { id: "whatsapp", label: "WhatsApp", description: "Farm-specific weather and disease warnings", enabled: true },
];

export interface DashboardNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  channel: "Price" | "Weather" | "News" | "System";
}

export const NOTIFICATIONS: DashboardNotification[] = [
  { id: "n1", title: "Price alert triggered", message: "Arabica crossed ₹590/kg on your watchlist.", time: "12m ago", read: false, channel: "Price" },
  { id: "n2", title: "Storm warning", message: "Chikmagalur forecast shows a storm system Wednesday.", time: "1h ago", read: false, channel: "Weather" },
  { id: "n3", title: "New prediction available", message: "Your 7-day AI forecast has been updated.", time: "3h ago", read: true, channel: "System" },
  { id: "n4", title: "Market news", message: "EU deforestation compliance deadline article published.", time: "1d ago", read: true, channel: "News" },
];

export interface PredictionRecord {
  id: string;
  date: string;
  horizon: string;
  predicted: number;
  actual: number | null;
  accuracy: number | null;
}

export const PREDICTION_HISTORY: PredictionRecord[] = [
  { id: "p1", date: "Jul 17", horizon: "Tomorrow", predicted: 588.6, actual: 584.0, accuracy: 96 },
  { id: "p2", date: "Jul 16", horizon: "Tomorrow", predicted: 575.2, actual: 580.4, accuracy: 94 },
  { id: "p3", date: "Jul 11", horizon: "Next Week", predicted: 561.0, actual: 568.1, accuracy: 91 },
  { id: "p4", date: "Jul 10", horizon: "Tomorrow", predicted: 554.6, actual: 553.3, accuracy: 98 },
  { id: "p5", date: "Jun 20", horizon: "Next Month", predicted: 537.0, actual: null, accuracy: null },
];

export interface AlertRule {
  id: string;
  label: string;
  condition: string;
  channel: "Email" | "Push" | "SMS" | "WhatsApp";
  active: boolean;
}

export const ALERT_RULES: AlertRule[] = [
  { id: "a1", label: "Arabica price spike", condition: "Price rises above ₹600/kg", channel: "Push", active: true },
  { id: "a2", label: "Robusta price drop", condition: "Price falls below ₹300/kg", channel: "Email", active: true },
  { id: "a3", label: "Hillcrest storm warning", condition: "Rain probability above 70%", channel: "WhatsApp", active: false },
  { id: "a4", label: "Weekly forecast digest", condition: "Every Monday, 8:00 AM", channel: "Email", active: true },
];
