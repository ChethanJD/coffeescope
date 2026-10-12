-- CoffeeScope initial schema
-- Canonical currency: INR only. No USD/EUR conversions are stored.
-- price_per_quintal_inr is always price_per_kg_inr * 100 (1 quintal = 100kg).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create type public.user_role as enum ('user', 'farmer', 'trader', 'admin');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text not null,
  role public.user_role not null default 'user',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles (role);

-- ---------------------------------------------------------------------------
-- coffee_varieties
-- ---------------------------------------------------------------------------
create table public.coffee_varieties (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  origin text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- market_locations
-- ---------------------------------------------------------------------------
create table public.market_locations (
  id uuid primary key default gen_random_uuid(),
  market_name text not null,
  city text not null,
  state text,
  country text not null default 'India',
  latitude double precision not null,
  longitude double precision not null,
  created_at timestamptz not null default now(),
  unique (market_name, city, country)
);

create index market_locations_country_idx on public.market_locations (country);

-- ---------------------------------------------------------------------------
-- market_prices  (historical price records — append-only)
-- ---------------------------------------------------------------------------
create table public.market_prices (
  id uuid primary key default gen_random_uuid(),
  variety_id uuid not null references public.coffee_varieties (id) on delete restrict,
  market_location_id uuid not null references public.market_locations (id) on delete restrict,
  price_per_kg_inr numeric(10, 2) not null check (price_per_kg_inr > 0),
  price_per_quintal_inr numeric(12, 2) generated always as (price_per_kg_inr * 100) stored,
  change_daily_percent numeric(6, 3),
  change_weekly_percent numeric(6, 3),
  recorded_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (variety_id, market_location_id, recorded_at)
);

create index market_prices_recorded_at_idx on public.market_prices (recorded_at desc);
create index market_prices_variety_location_idx
  on public.market_prices (variety_id, market_location_id, recorded_at desc);

-- ---------------------------------------------------------------------------
-- weather_records
-- ---------------------------------------------------------------------------
create table public.weather_records (
  id uuid primary key default gen_random_uuid(),
  market_location_id uuid not null references public.market_locations (id) on delete cascade,
  temperature numeric(5, 2),
  humidity numeric(5, 2),
  rainfall numeric(6, 2),
  wind_speed numeric(5, 2),
  recorded_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (market_location_id, recorded_at)
);

create index weather_records_location_recorded_idx
  on public.weather_records (market_location_id, recorded_at desc);

-- ---------------------------------------------------------------------------
-- price_forecasts  (clearly distinct from actual market_prices)
-- ---------------------------------------------------------------------------
create table public.price_forecasts (
  id uuid primary key default gen_random_uuid(),
  variety_id uuid not null references public.coffee_varieties (id) on delete restrict,
  market_location_id uuid not null references public.market_locations (id) on delete restrict,
  forecast_date date not null,
  predicted_price_per_kg_inr numeric(10, 2) not null check (predicted_price_per_kg_inr > 0),
  predicted_price_per_quintal_inr numeric(12, 2)
    generated always as (predicted_price_per_kg_inr * 100) stored,
  confidence numeric(4, 3) check (confidence >= 0 and confidence <= 1),
  model_version text not null,
  created_at timestamptz not null default now(),
  unique (variety_id, market_location_id, forecast_date, model_version)
);

create index price_forecasts_date_idx on public.price_forecasts (forecast_date desc);

-- ---------------------------------------------------------------------------
-- news
-- ---------------------------------------------------------------------------
create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  source text,
  url text,
  published_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index news_published_at_idx on public.news (published_at desc);

-- ---------------------------------------------------------------------------
-- marketplace_products
-- ---------------------------------------------------------------------------
create type public.marketplace_status as enum ('active', 'inactive', 'sold_out');

create table public.marketplace_products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  description text,
  price_inr numeric(10, 2) not null check (price_inr > 0),
  quantity numeric(10, 2) not null check (quantity >= 0),
  unit text not null default 'kg',
  image_url text,
  status public.marketplace_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index marketplace_products_seller_idx on public.marketplace_products (seller_id);
create index marketplace_products_status_idx on public.marketplace_products (status);

-- ---------------------------------------------------------------------------
-- user_preferences
-- ---------------------------------------------------------------------------
create table public.user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  preferred_market uuid references public.market_locations (id) on delete set null,
  preferred_variety uuid references public.coffee_varieties (id) on delete set null,
  price_alert_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at trigger helper (reused across tables that track updates)
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger set_marketplace_products_updated_at
  before update on public.marketplace_products
  for each row execute function public.set_updated_at();

create trigger set_user_preferences_updated_at
  before update on public.user_preferences
  for each row execute function public.set_updated_at();
