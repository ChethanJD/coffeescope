-- Farms: a user's own growing locations, collected during onboarding.
-- Private to the owner — this is operational farm data, not public
-- market/reference data, so no public read policy (unlike coffee_varieties
-- or market_locations).

create table if not exists public.farms (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  country text not null,
  region text,
  latitude double precision check (latitude is null or latitude between -90 and 90),
  longitude double precision check (longitude is null or longitude between -180 and 180),
  area_hectares numeric(10, 2) check (area_hectares is null or area_hectares > 0),
  primary_variety_id uuid references public.coffee_varieties (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists farms_owner_idx on public.farms (owner_id);

drop trigger if exists set_updated_at on public.farms;
create trigger set_updated_at before update on public.farms
  for each row execute function public.set_updated_at();

alter table public.farms enable row level security;

create policy "Owners manage their own farms"
  on public.farms for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "Admins can view all farms"
  on public.farms for select
  using (public.is_admin());
