# Supabase Order Storage

The checkout API can store sanitized order requests in Supabase before the
customer is redirected to the confirmation page.

## 1. Create the orders table

Run `supabase/orders.sql` in the Supabase SQL editor.

The table has Row Level Security enabled and intentionally creates no public
`anon` or `authenticated` policies. Order writes are server-only.

## 2. Add Vercel environment variables

Use the Supabase project URL, not the Postgres connection string:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...
SUPABASE_ORDERS_TABLE=orders
```

Older Supabase projects can use the legacy server key instead:

```env
SUPABASE_SERVICE_ROLE_KEY=...
```

Never add `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` to a
`NEXT_PUBLIC_*` variable. These keys bypass Row Level Security and must only be
available to server-side code.

## 3. Optional email notification

If `RESEND_API_KEY` and `FUNNI_FARM_ORDER_EMAIL` are configured, checkout stores
the order and sends the existing order-request email. If email is not
configured but Supabase is configured, the order is still stored for farm
review in Supabase.
