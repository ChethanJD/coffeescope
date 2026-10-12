-- Marketplace listing favorites — distinct from favorite_markets (which
-- tracks a variety/location pair for price watching). This tracks a
-- user bookmarking a specific marketplace_products listing.

create table if not exists public.marketplace_favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  listing_id uuid not null references public.marketplace_products (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, listing_id)
);

create index if not exists marketplace_favorites_user_idx on public.marketplace_favorites (user_id);
create index if not exists marketplace_favorites_listing_idx on public.marketplace_favorites (listing_id);

alter table public.marketplace_favorites enable row level security;

create policy "Users manage their own listing favorites"
  on public.marketplace_favorites for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
