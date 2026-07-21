"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Edit3, Plus, Save, Trash2 } from "lucide-react";
import { AdminOrdersPanel } from "./AdminOrdersPanel";
import { Button } from "@/components/ui/Button";
import {
  productBadges,
  productCategories,
  type Product,
  type ProductInput,
} from "@/lib/products/types";
import { slugify } from "@/lib/utils/slugify";
import { formatMoney } from "@/lib/utils/format";

const blankProduct: ProductInput = {
  slug: "",
  name: "",
  category: "Seeds",
  price: 0,
  compareAtPrice: null,
  shortDescription: "",
  fullDescription: "",
  image: "/images/products/funni-farm-hemp-seeds-raw-shelled.webp",
  gallery: [],
  tags: [],
  inventory: 0,
  isActive: true,
  isFeatured: false,
  badge: "",
  weight: "",
  ingredients: "",
  cannabinoidInfo: "",
  strainLineage: "",
  seedType: "",
  packSize: "",
  batchNumber: "",
  coaUrl: "",
  labTested: false,
  hempComplianceNote:
    "Confirm federal hemp compliance with current product records and COA before opening for live ordering.",
  shippingRestrictions:
    "Ships only where hemp-derived products are permitted. Orders are reviewed before payment instructions are sent.",
  ageRestricted: true,
  bundleItems: [],
};

export function AdminProductManager() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [draft, setDraft] = useState<ProductInput>(blankProduct);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const editing = Boolean(draft.id);
  const previewTags = useMemo(() => draft.tags.join(", "), [draft.tags]);
  const previewGallery = useMemo(() => draft.gallery.join("\n"), [draft.gallery]);

  async function loadProducts(nextPassword = password) {
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/products", {
      headers: { "x-admin-password": nextPassword },
    });
    setLoading(false);

    if (!response.ok) {
      setError("Admin password was not accepted.");
      setAuthorized(false);
      return;
    }

    setProducts((await response.json()) as Product[]);
    setAuthorized(true);
    setMessage("Products loaded.");
  }

  async function saveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const productToSave: ProductInput = {
      ...draft,
      slug: draft.slug || slugify(draft.name),
      price: Number(draft.price),
      compareAtPrice:
        draft.compareAtPrice === null || Number(draft.compareAtPrice) <= 0
          ? null
          : Number(draft.compareAtPrice),
      inventory: Number(draft.inventory),
    };

    const response = await fetch("/api/admin/products", {
      body: JSON.stringify(productToSave),
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      method: "POST",
    });

    setLoading(false);

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setError(payload.error ?? "Could not save product.");
      return;
    }

    const saved = (await response.json()) as Product;
    setProducts((current) => {
      const exists = current.some((product) => product.id === saved.id);
      return exists
        ? current.map((product) => (product.id === saved.id ? saved : product))
        : [...current, saved];
    });
    setDraft(saved);
    setMessage(`${saved.name} saved to local JSON.`);
  }

  async function deleteProduct(id: string) {
    if (!window.confirm("Delete this local product?")) return;

    const response = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
      headers: { "x-admin-password": password },
      method: "DELETE",
    });

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setError(payload.error ?? "Could not delete product.");
      return;
    }

    setProducts((current) => current.filter((product) => product.id !== id));
    if (draft.id === id) setDraft(blankProduct);
    setMessage("Product deleted from local JSON.");
  }

  useEffect(() => {
    if (draft.name && !draft.id) {
      setDraft((current) => ({ ...current, slug: slugify(current.name) }));
    }
  }, [draft.id, draft.name]);

  if (!authorized) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="seed-card rounded-seed p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
            Local-only starter admin
          </p>
          <h1 className="mt-3 font-display text-4xl font-black text-forest-900">
            Store Admin
          </h1>
          <p className="mt-3 text-sm leading-6 text-forest-900/70">
            This admin is hidden from public navigation. Use the private
            <code className="mx-1 rounded bg-forest-900/10 px-1.5 py-1 font-black">
              ADMIN_PASSWORD
            </code>
            value from your environment variables to review orders and manage
            the starter catalog.
          </p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              void loadProducts(password);
            }}
          >
            <label className="block">
              <span className="text-sm font-black text-forest-900">
                Admin password
              </span>
              <input
                className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-forest-900/15 bg-white/70 px-4 text-sm font-semibold text-forest-900"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                value={password}
              />
            </label>
            {error && <p className="text-sm font-bold text-clay">{error}</p>}
            <Button disabled={loading} type="submit">
              {loading ? "Checking..." : "Enter Admin"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
            Local JSON catalog
          </p>
          <h1 className="mt-2 font-display text-4xl font-black text-forest-900">
            Store Admin
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-forest-900/70">
            Review order requests, mark manual payments paid or unpaid, and
            prepare products for real photos, COAs, ingredients, and inventory.
          </p>
        </div>
        <Button onClick={() => setDraft(blankProduct)} variant="secondary">
          <Plus aria-hidden className="size-4" />
          New Product
        </Button>
      </div>

      {(message || error) && (
        <div className="mt-6 rounded-2xl border border-forest-900/10 bg-cream-50 p-4 text-sm font-bold text-forest-900">
          {message || error}
        </div>
      )}

      <div className="mt-8">
        <AdminOrdersPanel password={password} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <section className="space-y-3">
          {products.map((product) => (
            <article
              className="seed-card grid grid-cols-[72px_1fr_auto] gap-4 rounded-seed p-3"
              key={product.id}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream-100">
                <Image
                  alt={product.name}
                  className="object-cover"
                  fill
                  sizes="72px"
                  src={product.image}
                />
              </div>
              <div className="min-w-0">
                <h2 className="truncate font-display text-xl font-black text-forest-900">
                  {product.name}
                </h2>
                <p className="text-xs font-black uppercase tracking-[0.12em] text-clay">
                  {product.category} • {formatMoney(product.price)}
                </p>
                <p className="mt-1 text-xs text-forest-900/60">
                  {product.isActive ? "Active" : "Inactive"} • Inventory{" "}
                  {product.inventory}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  aria-label={`Edit ${product.name}`}
                  onClick={() => setDraft(product)}
                  size="icon"
                  variant="ghost"
                >
                  <Edit3 aria-hidden className="size-4" />
                </Button>
                <Button
                  aria-label={`Delete ${product.name}`}
                  onClick={() => void deleteProduct(product.id)}
                  size="icon"
                  variant="danger"
                >
                  <Trash2 aria-hidden className="size-4" />
                </Button>
              </div>
            </article>
          ))}
        </section>

        <form className="seed-card rounded-seed p-5 md:p-6" onSubmit={saveProduct}>
          <h2 className="font-display text-3xl font-black text-forest-900">
            {editing ? "Edit Product" : "Add Product"}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <TextField
              label="Name"
              onChange={(value) =>
                setDraft((current) => ({ ...current, name: value }))
              }
              required
              value={draft.name}
            />
            <TextField
              label="Slug"
              onChange={(value) =>
                setDraft((current) => ({ ...current, slug: value }))
              }
              required
              value={draft.slug}
            />
            <label>
              <span className="text-sm font-black text-forest-900">
                Category
              </span>
              <select
                className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-forest-900/15 bg-white/70 px-4 text-sm font-semibold text-forest-900"
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    category: event.target.value as ProductInput["category"],
                  }))
                }
                value={draft.category}
              >
                {productCategories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="text-sm font-black text-forest-900">Badge</span>
              <select
                className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-forest-900/15 bg-white/70 px-4 text-sm font-semibold text-forest-900"
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    badge: event.target.value as ProductInput["badge"],
                  }))
                }
                value={draft.badge}
              >
                <option value="">No badge</option>
                {productBadges.map((badge) => (
                  <option key={badge}>{badge}</option>
                ))}
              </select>
            </label>
            <NumberField
              label="Price"
              onChange={(value) =>
                setDraft((current) => ({ ...current, price: value }))
              }
              value={draft.price}
            />
            <NumberField
              label="Compare at price"
              onChange={(value) =>
                setDraft((current) => ({ ...current, compareAtPrice: value }))
              }
              value={draft.compareAtPrice ?? 0}
            />
            <NumberField
              label="Inventory"
              onChange={(value) =>
                setDraft((current) => ({ ...current, inventory: value }))
              }
              value={draft.inventory}
            />
            <TextField
              label="Image URL"
              onChange={(value) =>
                setDraft((current) => ({ ...current, image: value }))
              }
              value={draft.image}
            />
            <TextField
              className="sm:col-span-2"
              label="Short description"
              onChange={(value) =>
                setDraft((current) => ({ ...current, shortDescription: value }))
              }
              required
              value={draft.shortDescription}
            />
            <Textarea
              label="Full description"
              onChange={(value) =>
                setDraft((current) => ({ ...current, fullDescription: value }))
              }
              value={draft.fullDescription}
            />
            <Textarea
              label="Details / ingredients"
              onChange={(value) =>
                setDraft((current) => ({ ...current, ingredients: value }))
              }
              value={draft.ingredients}
            />
            <Textarea
              label="Cannabinoid info"
              onChange={(value) =>
                setDraft((current) => ({ ...current, cannabinoidInfo: value }))
              }
              value={draft.cannabinoidInfo}
            />
            <Textarea
              label="Shipping restrictions"
              onChange={(value) =>
                setDraft((current) => ({
                  ...current,
                  shippingRestrictions: value,
                }))
              }
              value={draft.shippingRestrictions}
            />
            <TextField
              label="COA link"
              onChange={(value) =>
                setDraft((current) => ({ ...current, coaUrl: value }))
              }
              value={draft.coaUrl}
            />
            <TextField
              label="Batch number"
              onChange={(value) =>
                setDraft((current) => ({ ...current, batchNumber: value }))
              }
              value={draft.batchNumber}
            />
            <TextField
              label="Weight"
              onChange={(value) =>
                setDraft((current) => ({ ...current, weight: value }))
              }
              value={draft.weight}
            />
            <TextField
              label="Pack size"
              onChange={(value) =>
                setDraft((current) => ({ ...current, packSize: value }))
              }
              value={draft.packSize}
            />
            <TextField
              label="Seed type"
              onChange={(value) =>
                setDraft((current) => ({ ...current, seedType: value }))
              }
              value={draft.seedType}
            />
            <TextField
              label="Strain lineage"
              onChange={(value) =>
                setDraft((current) => ({ ...current, strainLineage: value }))
              }
              value={draft.strainLineage}
            />
            <Textarea
              label="Hemp compliance note"
              onChange={(value) =>
                setDraft((current) => ({
                  ...current,
                  hempComplianceNote: value,
                }))
              }
              value={draft.hempComplianceNote}
            />
            <Textarea
              label="Gallery URLs, one per line"
              onChange={(value) =>
                setDraft((current) => ({
                  ...current,
                  gallery: value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean),
                }))
              }
              value={previewGallery}
            />
            <Textarea
              label="Tags, comma separated"
              onChange={(value) =>
                setDraft((current) => ({
                  ...current,
                  tags: value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                }))
              }
              value={previewTags}
            />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <BooleanField
              checked={draft.isActive}
              label="Active"
              onChange={(value) =>
                setDraft((current) => ({ ...current, isActive: value }))
              }
            />
            <BooleanField
              checked={draft.isFeatured}
              label="Featured"
              onChange={(value) =>
                setDraft((current) => ({ ...current, isFeatured: value }))
              }
            />
            <BooleanField
              checked={draft.labTested}
              label="Lab tested with batch COA"
              onChange={(value) =>
                setDraft((current) => ({ ...current, labTested: value }))
              }
            />
            <BooleanField
              checked={draft.ageRestricted}
              label="Age restricted"
              onChange={(value) =>
                setDraft((current) => ({ ...current, ageRestricted: value }))
              }
            />
          </div>
          <Button className="mt-6" disabled={loading} type="submit">
            <Save aria-hidden className="size-4" />
            {loading ? "Saving..." : "Save Product"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function TextField({
  className,
  label,
  onChange,
  required,
  value,
}: {
  className?: string;
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  value: string;
}) {
  return (
    <label className={className}>
      <span className="text-sm font-black text-forest-900">{label}</span>
      <input
        className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-forest-900/15 bg-white/70 px-4 text-sm font-semibold text-forest-900"
        onChange={(event) => onChange(event.target.value)}
        required={required}
        value={value}
      />
    </label>
  );
}

function NumberField({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <label>
      <span className="text-sm font-black text-forest-900">{label}</span>
      <input
        className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-forest-900/15 bg-white/70 px-4 text-sm font-semibold text-forest-900"
        min="0"
        onChange={(event) => onChange(Number(event.target.value))}
        step="0.01"
        type="number"
        value={value}
      />
    </label>
  );
}

function Textarea({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="sm:col-span-2">
      <span className="text-sm font-black text-forest-900">{label}</span>
      <textarea
        className="focus-ring mt-2 min-h-28 w-full rounded-2xl border border-forest-900/15 bg-white/70 px-4 py-3 text-sm font-semibold text-forest-900"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  );
}

function BooleanField({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 rounded-2xl border border-forest-900/10 bg-white/50 p-3 text-sm font-bold text-forest-900">
      <input
        checked={checked}
        className="size-4 accent-forest-700"
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      {label}
    </label>
  );
}
