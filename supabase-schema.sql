-- Run this in your Supabase SQL editor

create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references chat_sessions(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);

-- Row Level Security
alter table chat_sessions enable row level security;
alter table messages enable row level security;

create policy "Users own their sessions"
  on chat_sessions for all
  using (auth.uid() = user_id);

create policy "Users own their messages"
  on messages for all
  using (auth.uid() = user_id);
