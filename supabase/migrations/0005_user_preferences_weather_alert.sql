-- Onboarding collects a separate weather-alert preference alongside the
-- existing price-alert toggle.
alter table public.user_preferences
  add column if not exists weather_alert_enabled boolean not null default false;
