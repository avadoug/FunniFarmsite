import { promises as fs } from "fs";
import path from "path";
import { productListSchema, productInputSchema } from "./validation";
import type { Product, ProductInput } from "./types";
import { assertDevelopmentWrite } from "@/lib/runtime/production";
import { writeJsonFile } from "@/lib/utils/json-file";
import { slugify } from "@/lib/utils/slugify";

const DATA_PATH = path.join(process.cwd(), "data", "products.json");

async function readProductFile() {
  const raw = await fs.readFile(DATA_PATH, "utf8");
  return productListSchema.parse(JSON.parse(raw));
}

async function writeProductFile(products: Product[]) {
  assertDevelopmentWrite();

  await writeJsonFile(DATA_PATH, products);
}

export async function getProducts(options: { includeInactive?: boolean } = {}) {
  const products = await readProductFile();
  const filtered = options.includeInactive
    ? products
    : products.filter((product) => product.isActive);

  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getFeaturedProducts(limit = 4) {
  const products = await getProducts();
  return products
    .filter((product) => product.isFeatured)
    .slice(0, limit);
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getRelatedProducts(product: Product, limit = 3) {
  const products = await getProducts();
  return products
    .filter(
      (candidate) =>
        candidate.id !== product.id &&
        (candidate.category === product.category ||
          candidate.tags.some((tag) => product.tags.includes(tag))),
    )
    .slice(0, limit);
}

export function isBundleProduct(product: Product) {
  return product.category === "Bundles";
}

export function getIncludedBundleProducts(bundle: Product, products: Product[]) {
  const identifiers = bundle.bundleItems ?? [];

  return identifiers
    .map((identifier) =>
      products.find(
        (product) => product.slug === identifier || product.id === identifier,
      ),
    )
    .filter((product): product is Product => Boolean(product));
}

export function getBundleSavings(bundle: Product) {
  if (!bundle.compareAtPrice || bundle.compareAtPrice <= bundle.price) {
    return 0;
  }

  return bundle.compareAtPrice - bundle.price;
}

export async function upsertProduct(input: ProductInput) {
  const parsed = productInputSchema.parse(input);
  const products = await readProductFile();
  const now = new Date().toISOString();
  const existingIndex = parsed.id
    ? products.findIndex((product) => product.id === parsed.id)
    : -1;

  const baseSlug = parsed.slug ? slugify(parsed.slug) : slugify(parsed.name);
  const slug = ensureUniqueSlug(
    baseSlug,
    products,
    existingIndex >= 0 ? products[existingIndex].id : undefined,
  );

  const product: Product = {
    ...parsed,
    id: parsed.id ?? `prod_${crypto.randomUUID()}`,
    slug,
    createdAt: existingIndex >= 0 ? products[existingIndex].createdAt : now,
    updatedAt: now,
  };

  if (existingIndex >= 0) {
    products[existingIndex] = product;
  } else {
    products.push(product);
  }

  await writeProductFile(products);
  return product;
}

export async function deleteProduct(id: string) {
  const products = await readProductFile();
  const nextProducts = products.filter((product) => product.id !== id);

  if (nextProducts.length === products.length) {
    return false;
  }

  await writeProductFile(nextProducts);
  return true;
}

function ensureUniqueSlug(slug: string, products: Product[], currentId?: string) {
  let candidate = slug || "product";
  let index = 2;

  while (
    products.some(
      (product) => product.slug === candidate && product.id !== currentId,
    )
  ) {
    candidate = `${slug}-${index}`;
    index += 1;
  }

  return candidate;
}
