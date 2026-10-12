-- Row Level Security for CoffeeScope.
--
-- Principles:
--   * Public reference/market data (varieties, locations, prices, weather,
--     forecasts, news) is readable by anyone, writable only by admins.
--   * profiles / user_preferences are private to their owner (+ admin).
--   * marketplace_products are publicly readable when active; sellers
--     manage only their own rows; admins manage all.
--   * All writes to historical market/weather/forecast data require the
--     service-role key (used by trusted ingestion jobs), never a
--     client session — so RLS on those tables has no client INSERT policy.

-- Helper: is the current user an admin? Reads role from profiles, not
-- from the JWT/client, so a client can never self-assign admin.
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql stable security definer set search_path = public;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

create policy "Profiles are readable by owner or admin"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Admins can manage all profiles"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

-- A user could otherwise UPDATE their own row and set role = 'admin'
-- (the policy above only checks ownership, not which columns changed).
-- Block that at the trigger level instead of via a self-referencing RLS
-- check, which would recurse back into this same policy.
create or replace function public.prevent_self_role_escalation()
returns trigger as $$
begin
  if new.role <> old.role and not public.is_admin() then
    raise exception 'Only admins can change a profile role';
  end if;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger prevent_self_role_escalation
  before update on public.profiles
  for each row execute function public.prevent_self_role_escalation();

-- ---------------------------------------------------------------------------
-- coffee_varieties / market_locations — public read, admin write
-- ---------------------------------------------------------------------------
alter table public.coffee_varieties enable row level security;
alter table public.market_locations enable row level security;

create policy "Coffee varieties are publicly readable"
  on public.coffee_varieties for select using (true);
create policy "Admins manage coffee varieties"
  on public.coffee_varieties for all using (public.is_admin()) with check (public.is_admin());

create policy "Market locations are publicly readable"
  on public.market_locations for select using (true);
create policy "Admins manage market locations"
  on public.market_locations for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- market_prices — public read, no client writes (service-role/ingestion
-- only), admins may correct/manage via service-role tooling
-- ---------------------------------------------------------------------------
alter table public.market_prices enable row level security;

create policy "Market prices are publicly readable"
  on public.market_prices for select using (true);
create policy "Admins manage market prices"
  on public.market_prices for all using (public.is_admin()) with check (public.is_admin());
-- No insert/update/delete policy for regular users: historical records
-- can only be written via the service-role key or by an admin above.

-- ---------------------------------------------------------------------------
-- weather_records — same pattern as market_prices
-- ---------------------------------------------------------------------------
alter table public.weather_records enable row level security;

create policy "Weather records are publicly readable"
  on public.weather_records for select using (true);
create policy "Admins manage weather records"
  on public.weather_records for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- price_forecasts — same pattern
-- ---------------------------------------------------------------------------
alter table public.price_forecasts enable row level security;

create policy "Price forecasts are publicly readable"
  on public.price_forecasts for select using (true);
create policy "Admins manage price forecasts"
  on public.price_forecasts for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- news — public read, admin write
-- ---------------------------------------------------------------------------
alter table public.news enable row level security;

create policy "News is publicly readable"
  on public.news for select using (true);
create policy "Admins manage news"
  on public.news for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- marketplace_products — public read (active only), seller manages own,
-- admin manages all
-- ---------------------------------------------------------------------------
alter table public.marketplace_products enable row level security;

create policy "Active marketplace listings are publicly readable"
  on public.marketplace_products for select
  using (status = 'active' or seller_id = auth.uid() or public.is_admin());

create policy "Sellers can insert their own listings"
  on public.marketplace_products for insert
  with check (seller_id = auth.uid());

create policy "Sellers can update their own listings"
  on public.marketplace_products for update
  using (seller_id = auth.uid())
  with check (seller_id = auth.uid());

create policy "Sellers can delete their own listings"
  on public.marketplace_products for delete
  using (seller_id = auth.uid());

create policy "Admins manage all marketplace listings"
  on public.marketplace_products for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- user_preferences — private to owner (+ admin)
-- ---------------------------------------------------------------------------
alter table public.user_preferences enable row level security;

create policy "Users manage their own preferences"
  on public.user_preferences for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Admins can view all preferences"
  on public.user_preferences for select
  using (public.is_admin());
