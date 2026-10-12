import type { UserRole, MarketplaceStatus } from "@/types/database";

export interface Profile {
  id: string;
  fullName: string | null;
  email: string;
  role: UserRole;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CoffeeVariety {
  id: string;
  name: string;
  description: string | null;
  origin: string | null;
}

export interface MarketLocation {
  id: string;
  marketName: string;
  city: string;
  state: string | null;
  country: string;
  latitude: number;
  longitude: number;
}

/** An actual recorded market price. Never a prediction — see PriceForecast. */
export interface MarketPrice {
  id: string;
  varietyId: string;
  marketLocationId: string;
  pricePerKgInr: number;
  pricePerQuintalInr: number;
  changeDailyPercent: number | null;
  changeWeeklyPercent: number | null;
  recordedAt: string;
}

export interface WeatherRecord {
  id: string;
  marketLocationId: string;
  temperature: number | null;
  humidity: number | null;
  rainfall: number | null;
  windSpeed: number | null;
  recordedAt: string;
}

/**
 * A model-generated prediction — NEVER an actual market price.
 * Always render with a visible "forecast" / "predicted" label so it
 * can't be mistaken for MarketPrice in the UI.
 */
export interface PriceForecast {
  id: string;
  varietyId: string;
  marketLocationId: string;
  forecastDate: string;
  predictedPricePerKgInr: number;
  predictedPricePerQuintalInr: number;
  confidence: number | null;
  modelVersion: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string | null;
  source: string | null;
  url: string | null;
  publishedAt: string;
}

export interface MarketplaceProduct {
  id: string;
  sellerId: string;
  name: string;
  description: string | null;
  priceInr: number;
  quantity: number;
  unit: string;
  imageUrl: string | null;
  status: MarketplaceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  id: string;
  userId: string;
  preferredMarket: string | null;
  preferredVariety: string | null;
  priceAlertEnabled: boolean;
  weatherAlertEnabled: boolean;
}

/** A user's own growing location, collected during onboarding. */
export interface Farm {
  id: string;
  ownerId: string;
  name: string;
  country: string;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  areaHectares: number | null;
  primaryVarietyId: string | null;
  createdAt: string;
  updatedAt: string;
}

export type AlertRuleType = "price" | "weather" | "disease";
export type AlertChannel = "email" | "sms" | "whatsapp" | "push";

export interface FavoriteMarket {
  id: string;
  userId: string;
  varietyId: string;
  marketLocationId: string | null;
  createdAt: string;
}

/** A user bookmarking a specific marketplace listing — distinct from FavoriteMarket. */
export interface MarketplaceFavorite {
  id: string;
  userId: string;
  listingId: string;
  createdAt: string;
}

export interface AlertRule {
  id: string;
  userId: string;
  ruleType: AlertRuleType;
  varietyId: string | null;
  marketLocationId: string | null;
  /** Shape depends on ruleType — e.g. { operator: "above", value: 600 } for price. */
  condition: Record<string, unknown>;
  channel: AlertChannel;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  alertRuleId: string | null;
  title: string;
  body: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface SavedPrediction {
  id: string;
  userId: string;
  forecastId: string | null;
  note: string | null;
  createdAt: string;
}

export interface MarketplaceMessage {
  id: string;
  listingId: string;
  senderId: string;
  recipientId: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export interface DiseaseAnalysisRecord {
  id: string;
  userId: string;
  farmId: string | null;
  imageUrl: string | null;
  diseaseName: string | null;
  confidence: number | null;
  modelVersion: string | null;
  createdAt: string;
}

/** Distinguishes real vs. unavailable data so the UI can show a clear state. */
export type DataResult<T> =
  | { status: "ok"; data: T; source: "database" }
  | { status: "ok"; data: T; source: "demo" }
  | { status: "empty"; source: "database" | "demo" }
  | { status: "error"; message: string };
