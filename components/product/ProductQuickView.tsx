"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/components/cart/CartProvider";
import { ProductFeelProfile } from "./ProductFeelProfile";
import { ProductImage } from "./ProductImage";
import { ProductPrice, SoldOutStamp } from "./ProductPrice";
import type { Product } from "@/lib/products/types";
import {
  getBatchStatusLabel,
  getCoaStatusLabel,
  getProductStatusBadges,
  isAvailableNow,
  isSoldOut,
} from "@/lib/products/status";

export function ProductQuickView({
  onClose,
  product,
}: {
  onClose: () => void;
  product: Product;
}) {
  const { addItem } = useCart();
  const inStock = isAvailableNow(product);
  const soldOut = isSoldOut(product);
  const statusBadges = getProductStatusBadges(product);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      aria-labelledby={`quick-view-${product.id}`}
      aria-modal="true"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      role="dialog"
    >
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[1.5rem] border border-harvest-300 bg-cream-50 shadow-farm">
        <div className="flex justify-end p-3">
          <Button aria-label="Close quick view" onClick={onClose} size="icon" variant="ghost">
            <X aria-hidden className="size-5" />
          </Button>
        </div>
        <div className="grid gap-6 px-5 pb-6 md:grid-cols-2 md:px-8 md:pb-8">
          <div className="relative aspect-square overflow-hidden rounded-seed border border-forest-900/10 bg-cream-100">
            <ProductImage
              alt={product.name}
              className="object-cover"
              sizes="(min-width: 768px) 420px, 90vw"
              src={product.image}
            />
            {soldOut && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-cream-50/12 backdrop-blur-[1px]">
                <SoldOutStamp size="xl" />
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {statusBadges.map((badge) => (
                <Badge key={badge.label} tone={badge.tone}>
                  {badge.label}
                </Badge>
              ))}
              <Badge tone="green">Non-Intoxicating</Badge>
              {product.category.includes("CBG") || product.tags.includes("CBG") ? (
                <Badge tone="cream">CBG Rich</Badge>
              ) : null}
              {product.ageRestricted && <Badge tone="dark">Adult Use</Badge>}
            </div>
            <h2
              className="mt-4 font-display text-3xl font-black text-forest-900"
              id={`quick-view-${product.id}`}
            >
              {product.name}
            </h2>
            <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-clay">
              {product.category}
            </p>
            <div className="mt-4">
              <ProductPrice product={product} size="lg" />
            </div>
            <p className="mt-4 leading-7 text-forest-900/72">
              {product.shortDescription}
            </p>
            <ProductFeelProfile className="mt-4" compact product={product} />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <QuickFact label="COA status" value={getCoaStatusLabel(product)} />
              <QuickFact label="Batch" value={getBatchStatusLabel(product)} />
              <QuickFact
                label="Ingredients"
                value={product.ingredients || "Confirmed during order review"}
              />
              <QuickFact
                label="Serving"
                value={product.packSize || "Final label directions apply"}
              />
            </div>
            <p className="mt-4 rounded-2xl border border-forest-900/10 bg-white/45 p-3 text-sm leading-6 text-forest-900/70">
              {product.shippingRestrictions}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button disabled={!inStock} onClick={() => addItem(product)}>
                {inStock
                  ? "Add to Order Request"
                  : soldOut
                    ? "Sold Out"
                    : "Coming Soon"}
              </Button>
              <Link
                className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full border border-forest-700/20 px-4 py-2.5 text-sm font-bold text-forest-900 hover:bg-forest-700/10"
                href={`/product/${product.slug}`}
                onClick={onClose}
              >
                Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-forest-900/10 bg-white/55 p-3">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-clay">
        {label}
      </p>
      <p className="mt-1 line-clamp-3 text-sm font-semibold leading-6 text-forest-900/72">
        {value}
      </p>
    </div>
  );
}
