export const productCategories = [
  "Seeds",
  "CBG Gummies",
  "CBG Oils",
  "Hemp Flower",
  "Pre-Rolls",
  "Capsules",
  "Topicals",
  "Bundles",
  "Merch",
] as const;

export const productBadges = [
  "New",
  "Staff Pick",
  "Limited Batch",
  "CBG",
  "Non-Intoxicating",
  "Hemp Wellness",
  "Seeds",
  "Gummies",
  "Topical",
  "Flower",
  "Farm-Made",
  "COA Available",
  "COA Pending",
  "Batch Pending",
  "Small Batch",
  "Adult Use",
] as const;

export type ProductCategory = (typeof productCategories)[number];
export type ProductBadge = (typeof productBadges)[number];

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice: number | null;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  tags: string[];
  inventory: number;
  isActive: boolean;
  isFeatured: boolean;
  badge: ProductBadge | "";
  weight: string;
  ingredients: string;
  cannabinoidInfo: string;
  strainLineage: string;
  seedType: string;
  packSize: string;
  batchNumber: string;
  coaUrl: string;
  labTested: boolean;
  hempComplianceNote: string;
  shippingRestrictions: string;
  ageRestricted: boolean;
  bundleItems: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProductInput = Omit<Product, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
};
