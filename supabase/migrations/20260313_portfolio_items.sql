-- Spotless Tinting — portfolio schema
-- Run in Supabase Dashboard → SQL Editor (or via CLI migration).

-- ---------------------------------------------------------------------------
-- 1. portfolio_items
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('tint', 'ppf', 'wrap')),
  before_image_url text,
  after_image_url text,
  description text,
  created_at timestamptz not null default now()
);

create index if not exists portfolio_items_category_idx
  on public.portfolio_items (category);

create index if not exists portfolio_items_created_at_idx
  on public.portfolio_items (created_at desc);

-- ---------------------------------------------------------------------------
-- 2. Row Level Security — public read only
-- ---------------------------------------------------------------------------
alter table public.portfolio_items enable row level security;

drop policy if exists "Public can read portfolio items" on public.portfolio_items;
create policy "Public can read portfolio items"
  on public.portfolio_items
  for select
  to anon, authenticated
  using (true);

-- No INSERT / UPDATE / DELETE policies for anon/authenticated.
-- Admin writes go through /api with the service_role key (bypasses RLS).

-- ---------------------------------------------------------------------------
-- 3. Storage bucket: portfolio-images
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-images',
  'portfolio-images',
  true,
  10485760, -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public read for objects in this bucket
drop policy if exists "Public read portfolio images" on storage.objects;
create policy "Public read portfolio images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'portfolio-images');

-- Authenticated uploads (optional — service_role still bypasses RLS for admin API uploads)
drop policy if exists "Authenticated upload portfolio images" on storage.objects;
create policy "Authenticated upload portfolio images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'portfolio-images');

drop policy if exists "Authenticated update portfolio images" on storage.objects;
create policy "Authenticated update portfolio images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'portfolio-images')
  with check (bucket_id = 'portfolio-images');

drop policy if exists "Authenticated delete portfolio images" on storage.objects;
create policy "Authenticated delete portfolio images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'portfolio-images');
