/**
 * Typed Supabase schema for CoffeeScope.
 *
 * Hand-written to match supabase/migrations/*.sql. If you have the
 * Supabase CLI + a linked project, you can instead generate this file
 * with:
 *
 *   npx supabase gen types typescript --linked > types/database.ts
 *
 * ...and it will be a superset-compatible drop-in replacement.
 */

export type UserRole = "user" | "farmer" | "trader" | "admin";
export type MarketplaceStatus = "active" | "inactive" | "sold_out";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string;
          role: UserRole;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email: string;
          role?: UserRole;
          avatar_url?: string | null;
        };
        Update: Partial<{
          full_name: string | null;
          avatar_url: string | null;
        }>;
        Relationships: [];
      };
      coffee_varieties: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          origin: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          origin?: string | null;
        };
        Update: Partial<{ name: string; description: string | null; origin: string | null }>;
        Relationships: [];
      };
      market_locations: {
        Row: {
          id: string;
          market_name: string;
          city: string;
          state: string | null;
          country: string;
          latitude: number;
          longitude: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          market_name: string;
          city: string;
          state?: string | null;
          country?: string;
          latitude: number;
          longitude: number;
        };
        Update: Partial<{
          market_name: string;
          city: string;
          state: string | null;
          country: string;
          latitude: number;
          longitude: number;
        }>;
        Relationships: [];
      };
      market_prices: {
        Row: {
          id: string;
          variety_id: string;
          market_location_id: string;
          price_per_kg_inr: number;
          price_per_quintal_inr: number;
          change_daily_percent: number | null;
          change_weekly_percent: number | null;
          recorded_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          variety_id: string;
          market_location_id: string;
          price_per_kg_inr: number;
          change_daily_percent?: number | null;
          change_weekly_percent?: number | null;
          recorded_at: string;
        };
        Update: Partial<{
          change_daily_percent: number | null;
          change_weekly_percent: number | null;
        }>;
        Relationships: [
          {
            foreignKeyName: "market_prices_variety_id_fkey";
            columns: ["variety_id"];
            isOneToOne: false;
            referencedRelation: "coffee_varieties";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "market_prices_market_location_id_fkey";
            columns: ["market_location_id"];
            isOneToOne: false;
            referencedRelation: "market_locations";
            referencedColumns: ["id"];
          }
        ];
      };
      weather_records: {
        Row: {
          id: string;
          market_location_id: string;
          temperature: number | null;
          humidity: number | null;
          rainfall: number | null;
          wind_speed: number | null;
          recorded_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          market_location_id: string;
          temperature?: number | null;
          humidity?: number | null;
          rainfall?: number | null;
          wind_speed?: number | null;
          recorded_at: string;
        };
        Update: Partial<{
          temperature: number | null;
          humidity: number | null;
          rainfall: number | null;
          wind_speed: number | null;
        }>;
        Relationships: [
          {
            foreignKeyName: "weather_records_market_location_id_fkey";
            columns: ["market_location_id"];
            isOneToOne: false;
            referencedRelation: "market_locations";
            referencedColumns: ["id"];
          }
        ];
      };
      price_forecasts: {
        Row: {
          id: string;
          variety_id: string;
          market_location_id: string;
          forecast_date: string;
          predicted_price_per_kg_inr: number;
          predicted_price_per_quintal_inr: number;
          confidence: number | null;
          model_version: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          variety_id: string;
          market_location_id: string;
          forecast_date: string;
          predicted_price_per_kg_inr: number;
          confidence?: number | null;
          model_version: string;
        };
        Update: Partial<{ confidence: number | null }>;
        Relationships: [
          {
            foreignKeyName: "price_forecasts_variety_id_fkey";
            columns: ["variety_id"];
            isOneToOne: false;
            referencedRelation: "coffee_varieties";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "price_forecasts_market_location_id_fkey";
            columns: ["market_location_id"];
            isOneToOne: false;
            referencedRelation: "market_locations";
            referencedColumns: ["id"];
          }
        ];
      };
      news: {
        Row: {
          id: string;
          title: string;
          summary: string | null;
          source: string | null;
          url: string | null;
          published_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          summary?: string | null;
          source?: string | null;
          url?: string | null;
          published_at: string;
        };
        Update: Partial<{ title: string; summary: string | null }>;
        Relationships: [];
      };
      marketplace_products: {
        Row: {
          id: string;
          seller_id: string;
          name: string;
          description: string | null;
          price_inr: number;
          quantity: number;
          unit: string;
          image_url: string | null;
          status: MarketplaceStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          seller_id: string;
          name: string;
          description?: string | null;
          price_inr: number;
          quantity: number;
          unit?: string;
          image_url?: string | null;
          status?: MarketplaceStatus;
        };
        Update: Partial<{
          name: string;
          description: string | null;
          price_inr: number;
          quantity: number;
          unit: string;
          image_url: string | null;
          status: MarketplaceStatus;
        }>;
        Relationships: [
          {
            foreignKeyName: "marketplace_products_seller_id_fkey";
            columns: ["seller_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      user_preferences: {
        Row: {
          id: string;
          user_id: string;
          preferred_market: string | null;
          preferred_variety: string | null;
          price_alert_enabled: boolean;
          weather_alert_enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          preferred_market?: string | null;
          preferred_variety?: string | null;
          price_alert_enabled?: boolean;
          weather_alert_enabled?: boolean;
        };
        Update: Partial<{
          preferred_market: string | null;
          preferred_variety: string | null;
          price_alert_enabled: boolean;
          weather_alert_enabled: boolean;
        }>;
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_preferences_preferred_market_fkey";
            columns: ["preferred_market"];
            isOneToOne: false;
            referencedRelation: "market_locations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_preferences_preferred_variety_fkey";
            columns: ["preferred_variety"];
            isOneToOne: false;
            referencedRelation: "coffee_varieties";
            referencedColumns: ["id"];
          }
        ];
      };
      farms: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          country: string;
          region: string | null;
          latitude: number | null;
          longitude: number | null;
          area_hectares: number | null;
          primary_variety_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          country: string;
          region?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          area_hectares?: number | null;
          primary_variety_id?: string | null;
        };
        Update: Partial<{
          name: string;
          country: string;
          region: string | null;
          latitude: number | null;
          longitude: number | null;
          area_hectares: number | null;
          primary_variety_id: string | null;
        }>;
        Relationships: [
          {
            foreignKeyName: "farms_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "farms_primary_variety_id_fkey";
            columns: ["primary_variety_id"];
            isOneToOne: false;
            referencedRelation: "coffee_varieties";
            referencedColumns: ["id"];
          }
        ];
      };
      favorite_markets: {
        Row: {
          id: string;
          user_id: string;
          variety_id: string;
          market_location_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          variety_id: string;
          market_location_id?: string | null;
        };
        Update: Partial<{ market_location_id: string | null }>;
        Relationships: [
          {
            foreignKeyName: "favorite_markets_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "favorite_markets_variety_id_fkey";
            columns: ["variety_id"];
            isOneToOne: false;
            referencedRelation: "coffee_varieties";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "favorite_markets_market_location_id_fkey";
            columns: ["market_location_id"];
            isOneToOne: false;
            referencedRelation: "market_locations";
            referencedColumns: ["id"];
          }
        ];
      };
      alert_rules: {
        Row: {
          id: string;
          user_id: string;
          rule_type: "price" | "weather" | "disease";
          variety_id: string | null;
          market_location_id: string | null;
          condition: Record<string, unknown>;
          channel: "email" | "sms" | "whatsapp" | "push";
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          rule_type: "price" | "weather" | "disease";
          variety_id?: string | null;
          market_location_id?: string | null;
          condition: Record<string, unknown>;
          channel?: "email" | "sms" | "whatsapp" | "push";
          is_active?: boolean;
        };
        Update: Partial<{
          condition: Record<string, unknown>;
          channel: "email" | "sms" | "whatsapp" | "push";
          is_active: boolean;
        }>;
        Relationships: [
          {
            foreignKeyName: "alert_rules_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          alert_rule_id: string | null;
          title: string;
          body: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          alert_rule_id?: string | null;
          title: string;
          body?: string | null;
          is_read?: boolean;
        };
        Update: Partial<{ is_read: boolean }>;
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      saved_predictions: {
        Row: {
          id: string;
          user_id: string;
          forecast_id: string | null;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          forecast_id?: string | null;
          note?: string | null;
        };
        Update: Partial<{ note: string | null }>;
        Relationships: [
          {
            foreignKeyName: "saved_predictions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "saved_predictions_forecast_id_fkey";
            columns: ["forecast_id"];
            isOneToOne: false;
            referencedRelation: "price_forecasts";
            referencedColumns: ["id"];
          }
        ];
      };
      marketplace_messages: {
        Row: {
          id: string;
          listing_id: string;
          sender_id: string;
          recipient_id: string;
          body: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          sender_id: string;
          recipient_id: string;
          body: string;
          is_read?: boolean;
        };
        Update: Partial<{ is_read: boolean }>;
        Relationships: [
          {
            foreignKeyName: "marketplace_messages_listing_id_fkey";
            columns: ["listing_id"];
            isOneToOne: false;
            referencedRelation: "marketplace_products";
            referencedColumns: ["id"];
          }
        ];
      };
      disease_analysis_history: {
        Row: {
          id: string;
          user_id: string;
          farm_id: string | null;
          image_url: string | null;
          disease_name: string | null;
          confidence: number | null;
          model_version: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          farm_id?: string | null;
          image_url?: string | null;
          disease_name?: string | null;
          confidence?: number | null;
          model_version?: string | null;
        };
        Update: Partial<{ disease_name: string | null; confidence: number | null }>;
        Relationships: [
          {
            foreignKeyName: "disease_analysis_history_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
        };
        Update: Partial<{ message: string }>;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
        };
        Update: Partial<{ email: string }>;
        Relationships: [];
      };
      marketplace_favorites: {
        Row: {
          id: string;
          user_id: string;
          listing_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          listing_id: string;
        };
        Update: Partial<{ listing_id: string }>;
        Relationships: [
          {
            foreignKeyName: "marketplace_favorites_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "marketplace_favorites_listing_id_fkey";
            columns: ["listing_id"];
            isOneToOne: false;
            referencedRelation: "marketplace_products";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
