-- TheNeuralNetwork — Phase 1 schema (user data only).
-- Run this in the Supabase SQL editor after creating your project.
-- Course/lesson CONTENT lives as MDX in the repo; this stores only per-user data.

-- ---------------------------------------------------------------------------
-- profiles: one row per auth user, auto-created on sign up via trigger below.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are viewable by owner" on public.profiles;
create policy "profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles are editable by owner" on public.profiles;
create policy "profiles are editable by owner"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-insert a profile whenever a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- enrollments: which courses a user has joined. course_slug matches MDX content.
-- ---------------------------------------------------------------------------
create table if not exists public.enrollments (
  user_id uuid not null references auth.users (id) on delete cascade,
  course_slug text not null,
  enrolled_at timestamptz not null default now(),
  primary key (user_id, course_slug)
);

alter table public.enrollments enable row level security;

drop policy if exists "enrollments owned by user" on public.enrollments;
create policy "enrollments owned by user"
  on public.enrollments for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- lesson_progress: per-lesson status + last saved code for resuming.
-- ---------------------------------------------------------------------------
create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_slug text not null,
  status text not null default 'in_progress'
    check (status in ('in_progress', 'completed')),
  last_code text,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_slug)
);

alter table public.lesson_progress enable row level security;

drop policy if exists "progress owned by user" on public.lesson_progress;
create policy "progress owned by user"
  on public.lesson_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
