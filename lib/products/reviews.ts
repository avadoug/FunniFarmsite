import type { Product } from "./types";

const defaultReviewCount = 64;

const productReviewCounts: Record<string, number> = {
  "funni-farm-cbg-capsules": 623,
  "funni-farm-cbg-gummies": 1248,
  "funni-farm-cbg-oil": 1012,
  "hemp-seed-pack": 412,
  "mega-cbg-gummy-bear": 87,
};

export function getProductReviewCount(product: Pick<Product, "slug">) {
  return productReviewCounts[product.slug] ?? defaultReviewCount;
}
