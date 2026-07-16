import { z } from "zod";
import { productBadges, productCategories } from "./types";

const productCategorySchema = z.preprocess((value) => {
  if (typeof value === "string" && value.trim().toLowerCase() === "bundle") {
    return "Bundles";
  }

  return value;
}, z.enum(productCategories));

export const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  category: productCategorySchema,
  price: z.coerce.number().min(0),
  compareAtPrice: z.coerce.number().min(0).nullable(),
  shortDescription: z.string().min(1),
  fullDescription: z.string().min(1),
  image: z.string().min(1),
  gallery: z.array(z.string()),
  tags: z.array(z.string()),
  inventory: z.coerce.number().int().min(0),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  badge: z.union([z.enum(productBadges), z.literal("")]),
  weight: z.string(),
  ingredients: z.string(),
  cannabinoidInfo: z.string(),
  strainLineage: z.string(),
  seedType: z.string(),
  packSize: z.string(),
  batchNumber: z.string(),
  coaUrl: z.string(),
  labTested: z.boolean(),
  hempComplianceNote: z.string(),
  shippingRestrictions: z.string(),
  ageRestricted: z.boolean(),
  bundleItems: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const productInputSchema = productSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    id: z.string().optional(),
  });

export const productListSchema = z.array(productSchema);
