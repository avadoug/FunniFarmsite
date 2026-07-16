"use client";

import { ChevronDown, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { isAvailableNow } from "@/lib/products/status";
import type { Product } from "@/lib/products/types";
import { cn } from "@/lib/utils/cn";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price Low to High", value: "price-asc" },
  { label: "Price High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
] as const;

const productTypes = ["Gummies", "Softgels", "Tinctures", "Capsules", "Seeds"] as const;
const strengths = ["Low (5-15mg)", "Moderate (16-30mg)", "High (31mg+)"] as const;
const formulations = ["Full Spectrum", "Broad Spectrum", "Isolate"] as const;

export function ProductFilters({
  initialCategory = "All",
  products,
}: {
  initialCategory?: string;
  products: Product[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [productType, setProductType] = useState("All");
  const [strength, setStrength] = useState("All");
  const [formulation, setFormulation] = useState("All");
  const [sort, setSort] = useState<(typeof sortOptions)[number]["value"]>(
    "featured",
  );
  const categoryItems = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          products
            .map((product) => product.category)
            .filter((item) => item !== "Bundles"),
        ),
      ),
    ],
    [products],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products
      .filter((product) =>
        category === "All" ? true : product.category === category,
      )
      .filter((product) => matchesProductType(product, productType))
      .filter((product) => matchesStrength(product, strength))
      .filter((product) => matchesFormulation(product, formulation))
      .filter((product) => {
        if (!query) return true;
        return [
          product.name,
          product.shortDescription,
          product.category,
          product.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "newest") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return (
          Number(b.isFeatured) - Number(a.isFeatured) ||
          Number(isAvailableNow(b)) - Number(isAvailableNow(a))
        );
      });
  }, [category, formulation, productType, products, search, sort, strength]);

  function resetFilters() {
    setSearch("");
    setCategory("All");
    setProductType("All");
    setStrength("All");
    setFormulation("All");
    setSort("featured");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:block">
        <FilterPanel
          category={category}
          categoryItems={categoryItems}
          formulation={formulation}
          productType={productType}
          resetFilters={resetFilters}
          setCategory={setCategory}
          setFormulation={setFormulation}
          setProductType={setProductType}
          setStrength={setStrength}
          strength={strength}
        />
      </aside>

      <div>
        <div className="rounded-seed border border-forest-900/12 bg-cream-50 p-4 shadow-soft">
          <details className="group lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl border border-forest-900/10 bg-white/70 px-4 py-3 font-black text-forest-900">
              <span className="inline-flex items-center gap-2">
                <Filter aria-hidden className="size-4 text-clay" />
                Filter Products
              </span>
              <ChevronDown
                aria-hidden
                className="size-4 transition group-open:rotate-180"
              />
            </summary>
            <div className="mt-4">
              <FilterPanel
                category={category}
                categoryItems={categoryItems}
                formulation={formulation}
                productType={productType}
                resetFilters={resetFilters}
                setCategory={setCategory}
                setFormulation={setFormulation}
                setProductType={setProductType}
                setStrength={setStrength}
                strength={strength}
              />
            </div>
          </details>

          <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <Search
                aria-hidden
                className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-forest-900/50"
              />
              <input
                className="focus-ring min-h-12 w-full rounded-full border border-forest-900/15 bg-white/75 pl-12 pr-4 text-sm font-semibold text-forest-900 placeholder:text-forest-900/45"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search CBG, gummies, oils..."
                value={search}
              />
            </label>
            <label className="relative block">
              <span className="sr-only">Sort products</span>
              <select
                className="focus-ring min-h-12 w-full appearance-none rounded-full border border-forest-900/15 bg-white/75 px-4 pr-10 text-sm font-black text-forest-900"
                onChange={(event) =>
                  setSort(event.target.value as typeof sort)
                }
                value={sort}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sort by: {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-forest-900/50"
              />
            </label>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 text-sm font-bold text-forest-900/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {filtered.length} product{filtered.length === 1 ? "" : "s"}
          </p>
          <p>Orders are reviewed before fulfillment.</p>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-seed border border-dashed border-forest-900/25 bg-cream-50/70 p-10 text-center">
            <h2 className="font-display text-2xl font-black text-forest-900">
              Nothing matched that search.
            </h2>
            <p className="mt-2 text-forest-900/70">
              The farm shelf checked twice. Try clearing a filter or searching
              by format, like gummies, oil, flower, capsules, or seeds.
            </p>
            <button
              className="focus-ring mt-5 rounded-full border border-forest-700/20 px-4 py-2.5 text-sm font-black text-forest-900 hover:bg-forest-700/10"
              onClick={resetFilters}
              type="button"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterPanel({
  category,
  categoryItems,
  formulation,
  productType,
  resetFilters,
  setCategory,
  setFormulation,
  setProductType,
  setStrength,
  strength,
}: {
  category: string;
  categoryItems: readonly string[];
  formulation: string;
  productType: string;
  resetFilters: () => void;
  setCategory: (value: string) => void;
  setFormulation: (value: string) => void;
  setProductType: (value: string) => void;
  setStrength: (value: string) => void;
  strength: string;
}) {
  return (
    <div className="rounded-seed border border-forest-900/12 bg-cream-50 p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-clay">
          Filter Products
        </p>
        <button
          className="focus-ring rounded-full px-2 py-1 text-xs font-black text-forest-900/76 hover:bg-forest-700/10 hover:text-forest-900"
          onClick={resetFilters}
          type="button"
        >
          Reset
        </button>
      </div>
      <FilterGroup
        current={category}
        items={categoryItems}
        onChange={setCategory}
        title="Category"
      />
      <FilterGroup
        current={productType}
        items={["All", ...productTypes]}
        onChange={setProductType}
        title="Product Type"
      />
      <FilterGroup
        current={strength}
        items={["All", ...strengths]}
        onChange={setStrength}
        title="Strength"
      />
      <FilterGroup
        current={formulation}
        items={["All", ...formulations]}
        onChange={setFormulation}
        title="Formulation"
      />
    </div>
  );
}

function FilterGroup({
  current,
  items,
  onChange,
  title,
}: {
  current: string;
  items: readonly string[];
  onChange: (value: string) => void;
  title: string;
}) {
  return (
    <fieldset className="mt-5 border-t border-forest-900/10 pt-4">
      <legend className="text-sm font-black text-forest-900">{title}</legend>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <label
            className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-forest-900/72"
            key={`${title}-${item}`}
          >
            <input
              checked={current === item}
              className={cn(
                "size-4 rounded border-forest-900/20 text-forest-700 accent-forest-700",
              )}
              onChange={() => onChange(item)}
              type="checkbox"
            />
            {item}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function matchesProductType(product: Product, filter: string) {
  if (filter === "All") return true;
  if (filter === "Gummies") return product.category === "CBG Gummies";
  if (filter === "Softgels") return product.name.toLowerCase().includes("softgel");
  if (filter === "Tinctures") return product.category === "CBG Oils";
  if (filter === "Capsules") return product.category === "Capsules";
  if (filter === "Seeds") return product.category === "Seeds";
  return true;
}

function matchesStrength(product: Product, filter: string) {
  if (filter === "All") return true;
  const text = `${product.name} ${product.shortDescription} ${product.fullDescription}`.toLowerCase();

  if (filter.startsWith("Low")) {
    return text.includes("2-3 mg") || product.category === "Seeds";
  }

  if (filter.startsWith("Moderate")) {
    return text.includes("25mg") || text.includes("25 mg") || product.category === "Capsules";
  }

  return product.slug.includes("mega") || product.category === "Hemp Flower";
}

function matchesFormulation(product: Product, filter: string) {
  if (filter === "All") return true;
  if (filter === "Full Spectrum") {
    return product.category === "Hemp Flower";
  }
  if (filter === "Broad Spectrum") {
    return product.tags.includes("CBG") && product.category !== "Hemp Flower";
  }

  return product.name.toLowerCase().includes("isolate");
}
