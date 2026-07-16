# The Funni Farm Storefront

A simple, polished Next.js e-commerce starter for The Funni Farm: non-intoxicating CBG-rich hemp wellness products, seeds, gummies, oils, flower, capsules, topicals, bundles, merch, and future farm products.

This first version is built for real browsing and safe order requests. It does **not** collect or store raw credit-card numbers.

## Launch Readiness Priorities

This project is a strong demo/storefront foundation, but it is not ready for real launch until the customer trust and operations layer is complete.

Do these first:

1. Rotate any exposed secrets and change the admin password.
2. Add real product photos.
3. Add real COAs, batch numbers, cannabinoid amounts, and CBG/CBD mg per serving.
4. Finalize product descriptions, prices, ingredients, inventory, and serving language.
5. Confirm legal shipping states and product-specific shipping restrictions.
6. Connect production order request emails and contact form handling.
7. Review integrated policy PDFs and finish the remaining hemp compliance policy.
8. Connect a real database for production products, orders, contacts, and admin changes.
9. Replace the local-only admin guard with proper authentication.
10. Complete legal, hemp compliance, payment-method, and policy review.

Do not launch assuming contact form leads are being saved unless the contact form is wired to Resend, SendGrid, Formspree, Supabase, a CRM, or another production backend. Do not launch assuming order requests are being emailed unless the order email environment variables are configured and tested.

The site should help customers quickly understand what they are buying: real product photos, clear ingredients, serving amounts, cannabinoid amounts, batch numbers, COA links, shipping restrictions, adult-use language, and a simple manual-payment explanation.

## Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Local JSON product data
- Local-only JSON mock order/contact storage for development
- Manual order email flow for Cash App, PayPal, or other approved non-card payment instructions

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Main Folders

- `app/` - routes, pages, API routes, metadata, sitemap, robots
- `components/` - layout, product, cart, forms, and UI components
- `lib/products/` - product types, validation, and JSON repository
- `lib/email/order-request.ts` - server-side order request email sender
- `lib/payments/provider.ts` - optional future payment provider abstraction
- `lib/orders/` - mock order types and local-only JSON storage
- `data/products.json` - starter product catalog
- `public/brand/` - Funni Farm logo, hero art, and brand assets
- `public/policies/` - deployable PDF policies and customer guides
- `public/products/` - product support artwork and legacy generated assets
- `docs/BRAND.md` - visual brand guide
- `docs/BRAND_LANGUAGE.md` - approved language, banned phrases, and SEO guardrails
- `docs/CONTENT_COMPLIANCE_CHECKLIST.md` - product-page compliance checklist
- `TODO.md` - replacement and launch checklist

## Products

Starter products live in `data/products.json` and include the full requested schema:

- `id`
- `slug`
- `name`
- `category`
- `price`
- `compareAtPrice`
- `shortDescription`
- `fullDescription`
- `image`
- `gallery`
- `tags`
- `inventory`
- `isActive`
- `isFeatured`
- `badge`
- `weight`
- `ingredients`
- `cannabinoidInfo`
- `strainLineage`
- `seedType`
- `packSize`
- `batchNumber`
- `coaUrl`
- `labTested`
- `hempComplianceNote`
- `shippingRestrictions`
- `ageRestricted`
- `createdAt`
- `updatedAt`

The starter admin exists at `/admin`, is hidden from public navigation, and is
redirect-blocked in production unless `ENABLE_ADMIN=true` is explicitly set.

Set a private `ADMIN_PASSWORD` in `.env.local` for local admin access. There is
no public default admin password. Before launch, rotate any exposed secrets and
replace this local-only guard with proper authenticated admin access.

## Cart

The cart uses localStorage for the first version. Customers can:

- Add products
- Open the cart drawer
- Edit quantities
- Remove items
- Visit `/cart`
- Continue to checkout

Checkout re-prices products on the server from `data/products.json`, so the API does not trust client-submitted prices.

## Manual Order Request Checkout

The checkout form collects customer/shipping information and compliance confirmations only. It does not ask for card numbers, Cash App handles, PayPal login information, or bank details.

Flow:

1. Customer submits `/checkout`
2. `app/api/checkout/route.ts` validates the cart/customer data
3. If `RESEND_API_KEY` and `FUNNI_FARM_ORDER_EMAIL` are configured, `lib/email/order-request.ts` emails the order request to The Funni Farm
4. The customer is redirected to `/order-confirmation?order=...`
5. The Funni Farm reviews availability, shipping, age/compliance details, and then replies to the customer with Cash App, PayPal, or other approved non-card payment options

In local development without Resend configured, checkout creates a development-only order in `data/orders.local.json` so the flow can still be tested.

On Vercel/production without order email configured, checkout submission returns:

```text
Order email is not configured yet. Add RESEND_API_KEY and FUNNI_FARM_ORDER_EMAIL before using this feature live.
```

This keeps the public storefront browsable without relying on serverless file writes.

## Manual Payment Setup

The current intended payment flow is manual payment-by-reply:

1. Configure a Resend account and verified sender domain/address.
2. Set `RESEND_API_KEY`, `FUNNI_FARM_ORDER_EMAIL`, and `ORDER_EMAIL_FROM`.
3. Test checkout locally and on Vercel.
4. When an order email arrives, review inventory, shipping restrictions, age/compliance details, and product notes.
5. Reply privately to the customer with Cash App, PayPal, or other approved non-card payment options.
6. Do not publish payment handles publicly unless The Funni Farm intentionally wants that.
7. Do not request or store raw credit-card numbers by email, form, notes, logs, or database fields.
8. Confirm Cash App, PayPal, and any other payment method policies for hemp/CBG products before using them live.

## Optional Future Hosted Processor

If the business later chooses a hosted hemp-friendly processor, do not assume standard Stripe will support hemp/CBG products. Possible paths may include Square CBD program, Bankful, PaymentCloud, a Shopify-compatible hemp processor, or another approved provider.

Get merchant approval first, confirm requirements, add provider credentials server-side only, create hosted sessions server-side, verify webhooks, and never store raw card numbers.

## Compliance Warnings

This project includes policy drafts and placeholders, not legal advice.

Before launch:

- Review all integrated policies, customer guides, and PDF documents.
- Finish the hemp compliance policy for the confirmed product mix.
- Add real COA PDFs and batch numbers.
- Confirm federal hemp compliance.
- Confirm allowed shipping states.
- Confirm age limit and age-verification needs.
- Review product labels, ingredients, serving sizes, and cannabinoid amounts.
- Remove or rewrite any customer testimonials that imply medical claims.
- Get legal/compliance review.
- Get payment-method policy review for Cash App, PayPal, email, and any future processor.

Products are not intended to diagnose, treat, cure, or prevent disease.

## Contact and Newsletter Forms

The public contact page currently routes customers to direct email and does not
collect form submissions. The newsletter signup is disabled until an email
provider is connected.

Do **not** assume contact leads or newsletter signups are being saved or
delivered in production until a real backend is connected and tested.

The local contact API route remains for future development. On
Vercel/production, contact submission returns:

```text
Production database is not configured yet. Connect Supabase or another database before using this feature live.
```

Wire it to one of these before launch:

- Resend
- SendGrid
- Formspree
- Supabase
- A CRM/helpdesk

## Database Upgrade Path

The local JSON repository is intentionally simple for version one.

Upgrade options:

- Supabase/PostgreSQL for products, orders, customers, and admin auth
- SQLite for a small self-hosted deployment
- Sanity for editorial product content
- Shopify or another commerce backend for inventory, tax, shipping, and checkout

## Deploying Free on Vercel

This project can deploy on Vercel Free/Hobby as a public demo storefront.

Before pushing, run:

```bash
npm run deployment-audit
npm run build
```

Both commands should pass locally before Vercel builds the repo.

1. Push the project root to GitHub. The project root is the folder containing `package.json`, `app/`, `components/`, `lib/`, `data/`, `public/`, `vercel.json`, and `.vercelignore`.
2. Do not upload `node_modules`, `.next`, `.env`, local logs, local order/contact JSON files, or `tsconfig.tsbuildinfo`.
3. In Vercel, choose **Add New Project** and import the GitHub repo.
4. Select the **Next.js** framework preset.
5. Leave the output directory blank/default.
6. Set the install command to `npm install`.
7. Set the build command to `npm run build`.
8. Add environment variables using `.env.example` as the placeholder template.
9. Deploy.

If Vercel reports `Module not found: Can't resolve '@/lib/utils/cn'` or `@/lib/utils/format`, the deployed GitHub repo is missing current source files or Vercel is building the wrong root folder/old commit. Confirm these files exist in GitHub:

- `lib/utils/cn.ts`
- `lib/utils/format.ts`
- `scripts/verify-required-files.mjs`
- `scripts/deployment-audit.mjs`
- `vercel.json`
- `.vercelignore`

If this local folder is not already a real Git repo, initialize and push it from the project root:

```bash
git init
git add .
git commit -m "Prepare Funni Farm for Vercel"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

Storefront browsing, product pages, cart UI, policy pages, CBG education, lab results, and static catalog pages work as a public demo.

For live order requests on Vercel, configure:

- `RESEND_API_KEY`
- `FUNNI_FARM_ORDER_EMAIL`
- `ORDER_EMAIL_FROM`

If these are missing, checkout intentionally fails gracefully in production:

```text
Order email is not configured yet. Add RESEND_API_KEY and FUNNI_FARM_ORDER_EMAIL before using this feature live.
```

Admin saves/deletes and local contact submissions intentionally fail gracefully
in production until a real database is connected:

```text
Production database is not configured yet. Connect Supabase or another database before using this feature live.
```

Do not rely on local JSON writes on Vercel serverless functions. Keep local JSON writes as development scaffolding only, then connect Supabase, PostgreSQL, Shopify, or another production database before live order/customer operations.

## Useful Commands

```bash
npm run dev
npm run deployment-audit
npm run build
npm run typecheck
npm run lint
```
