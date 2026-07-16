-- Secure order storage for The Funni Farm checkout.
-- Run this in the Supabase SQL editor before enabling live order capture.

create table if not exists public.orders (
  id text primary key,
  order_number text not null unique,
  status text not null,
  customer jsonb not null,
  items jsonb not null,
  subtotal numeric(10, 2) not null default 0,
  estimated_shipping numeric(10, 2) not null default 0,
  estimated_tax numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  compliance jsonb not null,
  payment_provider text not null,
  payment_session_id text not null,
  payment_session_url text not null,
  notes text not null default '',
  created_at timestamptz not null,
  updated_at timestamptz not null
);

create index if not exists orders_created_at_idx
  on public.orders (created_at desc);

create index if not exists orders_status_idx
  on public.orders (status);

alter table public.orders enable row level security;

-- No public RLS policies are created on purpose.
-- The storefront writes orders from the server only using SUPABASE_SECRET_KEY
-- or a legacy SUPABASE_SERVICE_ROLE_KEY. Do not expose that key to the browser.
revoke all on table public.orders from anon, authenticated;
