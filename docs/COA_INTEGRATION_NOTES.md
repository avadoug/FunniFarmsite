# COA Integration Notes

## Current COA

- Sample: Jack Frost cbg_001
- Lab: New Bloom Labs
- Sample ID: 11-10-2022-26986
- Sample type: Plant, Biomass
- Date tested: 11/10/2022
- Report created: 11/15/2022
- Expiration listed on report: 11/15/2023
- Status: Complete

## Where It Lives

- Structured data: `lib/coa/jackFrostCbg001.ts`
- Full COA feature: `components/coa/JackFrostCoaFeature.tsx`
- Public COA image handling: original COA image is withheld from the live site
  because it includes private street-address details. The extracted lab data is
  shown instead.

## Where It Appears

- Full breakdown: `/lab-results#jack-frost-cbg-001`
- Homepage trust teaser: links to the COA breakdown.
- CBG education page: links to the COA as a real example.
- Jack Frost CBG Hemp Flower product page: links to the COA breakdown.
- Lab Results table: uses the real Jack Frost COA values instead of placeholders.

## How To Add Future COAs

1. Redact private addresses or sensitive details before adding COA images to
   `public/images/coa/`.
2. Create a new data file in `lib/coa/` using the same shape as `jackFrostCbg001.ts`.
3. Add result cards for the most customer-relevant values.
4. Add detailed cannabinoid rows with short, plain-English notes.
5. Add glossary terms only when new terms need explanation.
6. Render the new data through a reusable COA feature component or make a variant if the report type differs.
7. Link the relevant product `coaUrl` to the section anchor.

## Assumptions From The Uploaded Image

- The COA is treated as a plant/biomass compliance-style cannabinoid report, not a final finished-product cannabinoid profile.
- The uploaded image shows cannabinoid results but does not show a full contaminant safety panel.
- The uploaded image included private address details, so the public site uses
  extracted COA data instead of the original image.
- Results are presented for education and transparency only.
- Results apply only to the tested sample and test date.

## Compliance Copy To Preserve

COA shown for transparency and educational purposes. Results apply only to the tested sample and date listed on the report. This is not medical advice and should not be interpreted as a guarantee of future batches, effects, or finished product cannabinoid profile.
