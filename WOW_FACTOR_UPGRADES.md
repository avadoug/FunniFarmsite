# Funni Farm Wow-Factor Upgrades

This file documents the production-polish features added to make The Funni Farm feel warmer, clearer, more trustworthy, and more memorable while keeping the site compliance-safe.

## Features Added

- Premium homepage trust sections, including a stronger hero treatment, trust bar, Farm Notes, Featured Farm Picks, order-request flow, product comparison, Behind the Label, Farm Quality Checklist, and CBG Myth vs Reality.
- Improved Product Finder with quiz progress, selected-answer polish, preference explanation, top-match comparison, and no-medical-advice messaging.
- Compare the Farm Shelf product comparison table with desktop table and mobile cards.
- Tested, Not Guessed lab transparency upgrades with COA summary cards, honesty notes, ND and Total THC tooltips, and clearer batch-specific language.
- Hershey mascot touchpoints through Hershey Notes, footer cameo, and order-review microcopy.
- Reusable Farm Note callouts for lab, CBG, buying, Hershey, and general customer guidance.
- Product cards now show a best-for mini-label, hover depth, quick view, availability status, and COA status.
- Product quick view now includes COA status, batch status, ingredients, serving notes, Escape-key close support, and compliance badges.
- Cart, checkout, and order confirmation now reinforce the manual order request flow and no-card-storage reassurance.
- Learn page upgraded with Myth vs Reality, Behind the Label, Farm Quality Checklist, and a small “Terp nerd mode” detail section.
- Contact page now clearly explains that direct email and phone are the reliable launch contact paths until a backend is wired.

## Components Created

- `components/brand/FarmNote.tsx`
- `components/brand/TrustBar.tsx`
- `components/brand/OrderRequestFlow.tsx`
- `components/brand/FarmQualityChecklist.tsx`
- `components/brand/BehindTheLabel.tsx`
- `components/home/FeaturedFarmPicks.tsx`
- `components/learn/MythRealityGrid.tsx`
- `components/product/ProductComparison.tsx`

## Design System Choices

- Continued using the existing cream, forest, harvest, clay, berry, and moss palette.
- Added subtle `float-soft`, `trust-glow`, `soft-reveal`, and `farm-sheen` CSS utilities.
- All motion respects `prefers-reduced-motion`.
- Kept rounded farm cards, soft shadows, paper texture, and high-contrast CTA buttons.
- Used short, compliance-safe microcopy instead of hype language.

## How To Edit Homepage Sections

- Homepage sections live in `app/page.tsx`.
- Product-driven homepage modules read from `data/products.json`.
- Use `FeaturedFarmPicks`, `ProductComparison`, `TrustBar`, `OrderRequestFlow`, `BehindTheLabel`, `FarmQualityChecklist`, and `MythRealityGrid` to add or reorder trust and education blocks.

## How To Add Future Products

- Add or edit products in `data/products.json` during development or through the local admin.
- Required live-readiness fields for hemp products include:
  - `batchNumber`
  - `coaUrl`
  - `ingredients`
  - `cannabinoidInfo`
  - `packSize`
  - `shippingRestrictions`
  - `ageRestricted`
  - `inventory`
- Products that require COAs remain effectively Coming Soon until batch-specific COA and batch number are present.

## How To Add Future COAs

- Add COA PDFs or images to `public/lab-results` or a public file path.
- Set the product `coaUrl` to the exact batch-specific COA page, anchor, or PDF path.
- Set `batchNumber` to the product’s matching lot or batch.
- Only set `labTested` to `true` when the COA is real, current, and batch-specific.
- Update `app/lab-results/page.tsx` with any customer-friendly breakdowns for important COAs.

## How To Add Learning Cards

- The Learn hub is in `app/learn/page.tsx`.
- The detailed CBG guide is in `app/learn/what-is-cbg/page.tsx`.
- Reuse `FarmNote`, `MythRealityGrid`, and `BehindTheLabel` for additional education.
- Keep language focused on preference, label review, COA review, and responsible adult use.

## How To Update Hershey And Farm Notes

- Hershey/farm image references live in `lib/brand/farmImages.ts`.
- Reuse `HersheyNote` from `components/brand/FarmNote.tsx` for tasteful mascot callouts.
- Keep Hershey charming and farm-rooted, not childish.

## Performance Notes

- No heavy animation library was added.
- Motion is CSS-only and reduced-motion safe.
- Existing Next.js `Image` optimization remains in use.
- New sections reuse existing product data and do not introduce network calls.

## Future Upgrades Recommended

- Wire real contact and order email delivery with Resend, SendGrid, Formspree, Supabase, or a CRM.
- Add real batch COA PDFs for each live consumable product.
- Add final product photos, prices, ingredients, serving sizes, and best-by data.
- Add production database and real authenticated admin.
- Add optional search analytics or lightweight event tracking after privacy review.
- Add schema markup for products and FAQ only after all product data is final and legally reviewed.
