-- Automatically create a public.profiles row whenever a new user signs up
-- via Supabase Auth. Role always defaults to 'user' — it is never read
-- from client-supplied signup metadata, so a client can never grant
-- itself 'admin' or 'trader' at signup time.

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email,
    'user'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
