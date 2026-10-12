-- Engagement tables: alerts/notifications, favorite markets, saved
-- predictions, marketplace messaging, disease analysis history, and
-- public contact/newsletter capture. Builds on farms (0004) and the
-- weather_alert_enabled preference (0005).

-- ---------------------------------------------------------------------------
-- favorite_markets — a user can favorite more than one variety/location pair
-- ---------------------------------------------------------------------------
create table if not exists public.favorite_markets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  variety_id uuid not null references public.coffee_varieties (id) on delete cascade,
  market_location_id uuid references public.market_locations (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, variety_id, market_location_id)
);

create index if not exists favorite_markets_user_idx on public.favorite_markets (user_id);

-- ---------------------------------------------------------------------------
-- alert_rules — user-defined price/weather/disease alert conditions
-- ---------------------------------------------------------------------------
create table if not exists public.alert_rules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  rule_type text not null check (rule_type in ('price', 'weather', 'disease')),
  variety_id uuid references public.coffee_varieties (id) on delete cascade,
  market_location_id uuid references public.market_locations (id) on delete cascade,
  -- e.g. { "operator": "above", "value": 600 } for price;
  -- { "metric": "rain_probability", "operator": "above", "value": 70 } for weather
  condition jsonb not null,
  channel text not null default 'email' check (channel in ('email', 'sms', 'whatsapp', 'push')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists alert_rules_user_idx on public.alert_rules (user_id);

drop trigger if exists set_updated_at on public.alert_rules;
create trigger set_updated_at before update on public.alert_rules
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- notifications — actual notification instances delivered to a user
-- (distinct from alert_rules, which are the conditions that generate them)
-- ---------------------------------------------------------------------------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  alert_rule_id uuid references public.alert_rules (id) on delete set null,
  title text not null,
  body text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- saved_predictions — a forecast a user has bookmarked for later reference
-- ---------------------------------------------------------------------------
create table if not exists public.saved_predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  forecast_id uuid references public.price_forecasts (id) on delete cascade,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists saved_predictions_user_idx on public.saved_predictions (user_id);

-- ---------------------------------------------------------------------------
-- marketplace_messages — buyer/seller messaging on a listing
-- ---------------------------------------------------------------------------
create table if not exists public.marketplace_messages (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.marketplace_products (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  recipient_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists marketplace_messages_listing_idx on public.marketplace_messages (listing_id);
create index if not exists marketplace_messages_participants_idx
  on public.marketplace_messages (sender_id, recipient_id);

-- ---------------------------------------------------------------------------
-- disease_analysis_history — past disease-detection submissions
-- ---------------------------------------------------------------------------
create table if not exists public.disease_analysis_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  farm_id uuid references public.farms (id) on delete set null,
  image_url text,
  disease_name text,
  confidence numeric(5, 2),
  model_version text,
  created_at timestamptz not null default now()
);

create index if not exists disease_history_user_idx
  on public.disease_analysis_history (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- contact_messages — public contact form submissions (no auth required)
-- ---------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- newsletter_subscribers — public newsletter signups (no auth required)
-- ---------------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.favorite_markets enable row level security;
create policy "Users manage their own favorite markets"
  on public.favorite_markets for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.alert_rules enable row level security;
create policy "Users manage their own alert rules"
  on public.alert_rules for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.notifications enable row level security;
create policy "Users read their own notifications"
  on public.notifications for select using (auth.uid() = user_id);
create policy "Users mark their own notifications read"
  on public.notifications for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- Inserts come from trusted server-side jobs (service-role) evaluating
-- alert_rules against new data, never directly from a client.

alter table public.saved_predictions enable row level security;
create policy "Users manage their own saved predictions"
  on public.saved_predictions for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.marketplace_messages enable row level security;
create policy "Participants can read their own messages"
  on public.marketplace_messages for select
  using (auth.uid() = sender_id or auth.uid() = recipient_id);
create policy "Users send messages as themselves"
  on public.marketplace_messages for insert
  with check (auth.uid() = sender_id);
create policy "Recipients can mark messages read"
  on public.marketplace_messages for update
  using (auth.uid() = recipient_id)
  with check (auth.uid() = recipient_id);

alter table public.disease_analysis_history enable row level security;
create policy "Users manage their own disease history"
  on public.disease_analysis_history for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- contact_messages / newsletter_subscribers: anyone (including anonymous
-- visitors) can submit, nobody can read back via the client — only admins
-- (or a service-role job, e.g. email forwarding) can read these.
alter table public.contact_messages enable row level security;
create policy "Anyone can submit a contact message"
  on public.contact_messages for insert with check (true);
create policy "Admins can read contact messages"
  on public.contact_messages for select using (public.is_admin());

alter table public.newsletter_subscribers enable row level security;
create policy "Anyone can subscribe to the newsletter"
  on public.newsletter_subscribers for insert with check (true);
create policy "Admins can read newsletter subscribers"
  on public.newsletter_subscribers for select using (public.is_admin());
