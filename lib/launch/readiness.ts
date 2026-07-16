import type { Product } from "@/lib/products/types";
import { hasBatchSpecificCoa } from "@/lib/products/status";

export type ProductReadinessStatus = "ready" | "not-ready";

export type ProductReadinessReport = {
  product: Product;
  status: ProductReadinessStatus;
  score: number;
  blockers: string[];
  neededFromFunniFarm: string[];
  notes: string[];
};

const unresolvedPattern =
  /\b(placeholder|pending|replace|to be confirmed|needs confirmation|before launch|before live sales|final restricted-state|final .* required|required before fulfillment|required before sales)\b/i;

export function auditProductsForLaunch(
  products: Product[],
): ProductReadinessReport[] {
  return products.map((product) => auditProductForLaunch(product, products));
}

export function auditProductForLaunch(
  product: Product,
  allProducts: Product[],
): ProductReadinessReport {
  const blockers = new Set<string>();
  const needed = new Set<string>();
  const notes = new Set<string>();

  addBaseProductChecks(product, blockers, needed);
  addCategoryChecks(product, allProducts, blockers, needed, notes);
  addTextQualityChecks(product, blockers, needed);

  if (!product.isActive) {
    notes.add("Product is inactive, so it will not appear in the public catalog.");
  }

  if (product.inventory <= 0) {
    blockers.add("Product has no sellable inventory configured.");
    needed.add("Confirm whether this product should stay visible as out of stock or be hidden until inventory exists.");
  }

  const totalChecks = 12;
  const issueCount = Math.min(blockers.size, totalChecks);
  const score = Math.max(0, Math.round(((totalChecks - issueCount) / totalChecks) * 100));

  return {
    product,
    status: blockers.size === 0 ? "ready" : "not-ready",
    score,
    blockers: Array.from(blockers),
    neededFromFunniFarm: Array.from(needed),
    notes: Array.from(notes),
  };
}

export const globalLaunchNeeds = [
  {
    title: "Final domain and SEO settings",
    items: [
      "Confirm the live domain so metadata, sitemap, robots.txt, and Open Graph URLs use the final production URL.",
      "Confirm final page titles and descriptions for the homepage, shop, products, learning pages, and policy center.",
    ],
  },
  {
    title: "Production order email",
    items: [
      "Create or confirm the order inbox that should receive checkout requests.",
      "Configure Resend or another production email service with RESEND_API_KEY, FUNNI_FARM_ORDER_EMAIL, and ORDER_EMAIL_FROM.",
      "Send test orders from Vercel and confirm Funni Farm can reply with Cash App, PayPal, or other approved payment options.",
    ],
  },
  {
    title: "Contact form handling",
    items: [
      "Decide whether to keep the launch contact path as direct email or connect a live form to Resend, SendGrid, Formspree, Supabase, a CRM, or a support inbox.",
      "Confirm where wholesale inquiries, order support, and product questions should be routed.",
    ],
  },
  {
    title: "Database and admin access",
    items: [
      "Replace local JSON writes with Supabase, PostgreSQL, Shopify, or another production data source.",
      "Replace the local admin password guard with proper authenticated admin access.",
      "Set a strong ADMIN_PASSWORD if the current starter admin page remains available during staging.",
    ],
  },
  {
    title: "Shipping and compliance rules",
    items: [
      "Provide the legal shipping state list by product type: gummies, oils, capsules, flower, seeds, topicals, bundles, and merch.",
      "Confirm age limit and whether stronger age verification is required beyond the current age gate.",
      "Confirm federal hemp compliance details for each batch and product format.",
    ],
  },
  {
    title: "Policies and legal review",
    items: [
      "Have all integrated policy PDFs and policy pages reviewed before live sales.",
      "Finish or replace the current Hemp Compliance Policy placeholder.",
      "Confirm Cash App, PayPal, and email-based payment instructions are acceptable for the final product mix.",
    ],
  },
  {
    title: "Launch QA",
    items: [
      "Test checkout, order emails, contact form, cart, product pages, age gate, mobile layout, and out-of-stock behavior on Vercel.",
      "Confirm no active product still contains placeholder, pending, or generic COA language.",
    ],
  },
] as const;

function addBaseProductChecks(
  product: Product,
  blockers: Set<string>,
  needed: Set<string>,
) {
  if (!product.name.trim()) {
    blockers.add("Missing product name.");
    needed.add("Final product name.");
  }

  if (product.price <= 0) {
    blockers.add("Product price is missing or zero.");
    needed.add("Final retail price.");
  }

  if (!product.shortDescription.trim() || hasUnresolvedText(product.shortDescription)) {
    blockers.add("Short description still needs final wording.");
    needed.add("Final short product description.");
  }

  if (!product.fullDescription.trim() || hasUnresolvedText(product.fullDescription)) {
    blockers.add("Full description still contains placeholder or prelaunch language.");
    needed.add("Final label-accurate product description.");
  }

  if (!product.image || product.image.endsWith(".svg")) {
    blockers.add("Primary product image is missing or still using placeholder/SVG artwork.");
    needed.add("Final product photography or final product label artwork.");
  }

  if (product.gallery.length === 0) {
    blockers.add("Product gallery needs at least one supporting image.");
    needed.add("Supporting product photos or label detail images.");
  }

  if (!product.weight.trim() || hasUnresolvedText(product.weight)) {
    blockers.add("Product weight or size is not final.");
    needed.add("Final product weight, bottle size, bag size, or net contents.");
  }

  if (!product.packSize.trim() || hasUnresolvedText(product.packSize)) {
    blockers.add("Pack size or count is not final.");
    needed.add("Final pack size, count, or serving count.");
  }

  if (!product.batchNumber.trim() || hasUnresolvedText(product.batchNumber)) {
    blockers.add("Batch or lot number is missing or placeholder.");
    needed.add("Current batch or lot number from the finished package.");
  }

  if (!product.shippingRestrictions.trim() || hasUnresolvedText(product.shippingRestrictions)) {
    blockers.add("Shipping restrictions still need a final allowed/restricted location review.");
    needed.add("Final legal shipping states and product-specific restrictions.");
  }

  if (!product.hempComplianceNote.trim() || hasUnresolvedText(product.hempComplianceNote)) {
    blockers.add("Hemp compliance note is not final.");
    needed.add("Final federal/state hemp compliance note for this product.");
  }

  if (!product.ageRestricted) {
    blockers.add("Adult-use age restriction is not enabled.");
    needed.add("Final age restriction decision.");
  }
}

function addCategoryChecks(
  product: Product,
  allProducts: Product[],
  blockers: Set<string>,
  needed: Set<string>,
  notes: Set<string>,
) {
  const isConsumable =
    product.category === "CBG Gummies" ||
    product.category === "CBG Oils" ||
    product.category === "Capsules" ||
    product.category === "Hemp Flower" ||
    product.category === "Topicals";
  const isCbgProduct =
    isConsumable ||
    product.tags.some((tag) => tag.toLowerCase().includes("cbg"));

  if (isConsumable && (!product.ingredients.trim() || hasUnresolvedText(product.ingredients))) {
    blockers.add("Ingredients are missing or still placeholder.");
    needed.add("Final ingredient list exactly as it appears on the label.");
  }

  if (isCbgProduct && (!product.cannabinoidInfo.trim() || hasUnresolvedText(product.cannabinoidInfo))) {
    blockers.add("Cannabinoid information is missing or not final.");
    needed.add("Final CBG/CBD amount per serving and total cannabinoid information from label and COA.");
  }

  if (isCbgProduct && !hasBatchSpecificCoa(product)) {
    blockers.add("COA link is generic or missing for this product.");
    needed.add("Product-specific, batch-specific COA PDF or lab-results anchor.");
  }

  if (isCbgProduct && !hasBatchSpecificCoa(product)) {
    blockers.add("COA is not available for this product.");
    needed.add("Current third-party lab result before live ordering.");
  }

  if (product.category === "Hemp Flower") {
    if (!product.strainLineage.trim() || hasUnresolvedText(product.strainLineage)) {
      blockers.add("Flower genetics or lineage details are not final.");
      needed.add("Final strain lineage, batch identity, and flower format details.");
    }
  }

  if (product.category === "Seeds") {
    if (!product.strainLineage.trim() || hasUnresolvedText(product.strainLineage)) {
      blockers.add("Seed lineage is not final.");
      needed.add("Confirmed seed genetics or lineage.");
    }
    if (!product.seedType.trim() || hasUnresolvedText(product.seedType)) {
      blockers.add("Seed type is not final.");
      needed.add("Confirmed seed type: regular, feminized, autoflower, or other accurate designation.");
    }
  }

  if (product.category === "Bundles") {
    if (product.bundleItems.length === 0) {
      blockers.add("Bundle does not list included products.");
      needed.add("Final included product list for the bundle.");
    }

    if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
      blockers.add("Bundle compare-at savings are missing or unclear.");
      needed.add("Final compare-at value and bundle savings.");
    }

    const includedProducts = product.bundleItems
      .map((identifier) =>
        allProducts.find(
          (candidate) =>
            candidate.slug === identifier || candidate.id === identifier,
        ),
      )
      .filter((candidate): candidate is Product => Boolean(candidate));

    if (includedProducts.length !== product.bundleItems.length) {
      blockers.add("One or more bundle items do not match a catalog product.");
      needed.add("Correct bundle item slugs for every included product.");
    }

    const unresolvedIncluded = includedProducts.filter((includedProduct) =>
      hasUnresolvedText(JSON.stringify(includedProduct)),
    );

    if (unresolvedIncluded.length > 0) {
      blockers.add("Bundle includes products that are not launch-ready yet.");
      needed.add(
        `Finalize included product data for: ${unresolvedIncluded
          .map((includedProduct) => includedProduct.name)
          .join(", ")}.`,
      );
    }

    notes.add("Bundles should only be activated after every included product is ready.");
  }
}

function addTextQualityChecks(
  product: Product,
  blockers: Set<string>,
  needed: Set<string>,
) {
  const fieldsToCheck: Array<[string, string]> = [
    ["short description", product.shortDescription],
    ["full description", product.fullDescription],
    ["ingredients", product.ingredients],
    ["cannabinoid info", product.cannabinoidInfo],
    ["batch number", product.batchNumber],
    ["pack size", product.packSize],
    ["weight/size", product.weight],
    ["hemp compliance note", product.hempComplianceNote],
    ["shipping restrictions", product.shippingRestrictions],
  ];

  const unresolvedFields = fieldsToCheck
    .filter(([, value]) => hasUnresolvedText(value))
    .map(([label]) => label);

  if (unresolvedFields.length > 0) {
    blockers.add(`Unresolved placeholder or pending language appears in: ${unresolvedFields.join(", ")}.`);
    needed.add("Replace all placeholder, pending, and prelaunch wording in product fields.");
  }
}

function hasUnresolvedText(value: string) {
  return unresolvedPattern.test(value);
}
