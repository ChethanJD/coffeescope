-- Private storage bucket for disease-detection photo uploads.
-- Not public — access is only via short-lived signed URLs generated
-- server-side/client-side for the owning user, never a public URL.

insert into storage.buckets (id, name, public)
values ('disease-images', 'disease-images', false)
on conflict (id) do nothing;

-- Users may only manage objects under a path prefixed with their own
-- user id (disease-images/{user_id}/...), enforced via the folder name.
create policy "Users upload their own disease images"
  on storage.objects for insert
  with check (
    bucket_id = 'disease-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users read their own disease images"
  on storage.objects for select
  using (
    bucket_id = 'disease-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users delete their own disease images"
  on storage.objects for delete
  using (
    bucket_id = 'disease-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
