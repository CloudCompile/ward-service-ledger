create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);
create table public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create table public.service_entries (
  id uuid primary key default gen_random_uuid(),
  entity_name text not null,
  group_id uuid references public.groups(id) on delete set null,
  hours numeric(8,2) not null check (hours > 0 and hours <= 10000),
  description text not null,
  service_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
alter table public.groups enable row level security;
alter table public.service_entries enable row level security;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$ select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin') $$;
create policy "public may submit" on public.service_entries for insert with check (true);
create policy "admins manage entries" on public.service_entries for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage groups" on public.groups for all using (public.is_admin()) with check (public.is_admin());
create policy "admins read profiles" on public.profiles for select using (public.is_admin() or id = auth.uid());
create or replace view public.public_service_totals as select coalesce(sum(hours), 0) as total_hours, count(*) as entry_count from public.service_entries;
create or replace function public.get_public_service_totals()
returns json language sql security definer set search_path = public
as $$ select json_build_object('total_hours', coalesce(sum(hours), 0)) from public.service_entries $$;
revoke all on function public.get_public_service_totals() from public;
grant execute on function public.get_public_service_totals() to anon, authenticated;
