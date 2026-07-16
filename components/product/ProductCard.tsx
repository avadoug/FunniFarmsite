"use client";

import Link from "next/link";
import { Eye, FileText, Heart, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ProductFeelProfile } from "./ProductFeelProfile";
import { ProductImage } from "./ProductImage";
import { ProductQuickView } from "./ProductQuickView";
import { ProductPrice, SoldOutStamp } from "./ProductPrice";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/lib/products/types";
import { getProductReviewCount } from "@/lib/products/reviews";
import {
  getProductStatusBadges,
  hasBatchSpecificCoa,
  isAvailableNow,
  isSoldOut,
} from "@/lib/products/status";
import { cn } from "@/lib/utils/cn";

const WISHLIST_KEY = "funni-farm-wishlist";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [favorite, setFavorite] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const inStock = isAvailableNow(product);
  const soldOut = isSoldOut(product);
  const statusBadges = getProductStatusBadges(product);
  const reviewCount = getProductReviewCount(product);

  useEffect(() => {
    const saved = window.localStorage.getItem(WISHLIST_KEY);
    const ids = saved ? (JSON.parse(saved) as string[]) : [];
    setFavorite(ids.includes(product.id));
  }, [product.id]);

  function toggleFavorite() {
    const saved = window.localStorage.getItem(WISHLIST_KEY);
    const ids = saved ? (JSON.parse(saved) as string[]) : [];
    const next = ids.includes(product.id)
      ? ids.filter((id) => id !== product.id)
      : [...ids, product.id];

    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    setFavorite(next.includes(product.id));
  }

  return (
    <>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-seed border border-forest-900/12 bg-cream-50 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-farm">
        <div className="relative aspect-[1.02] overflow-hidden bg-white">
          <Link href={`/product/${product.slug}`} tabIndex={-1}>
            <ProductImage
              alt={product.name}
              className="object-contain p-5 transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              src={product.image}
            />
          </Link>
          <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-2">
            {statusBadges.slice(0, 2).map((badge) => (
              <Badge key={badge.label} tone={badge.tone}>
                {badge.label}
              </Badge>
            ))}
          </div>
          <div className="absolute right-3 top-3 z-20 flex gap-2">
            <button
              aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}
              className={cn(
                "focus-ring flex size-10 items-center justify-center rounded-full border border-forest-900/10 bg-cream-50/90 text-forest-900 shadow-soft backdrop-blur hover:bg-cream-50",
                favorite && "text-clay",
              )}
              onClick={toggleFavorite}
              type="button"
            >
              <Heart
                aria-hidden
                className={cn("size-5", favorite && "fill-current")}
              />
            </button>
            <button
              aria-label={`Quick view ${product.name}`}
              className="focus-ring flex size-10 items-center justify-center rounded-full border border-forest-900/10 bg-cream-50/90 text-forest-900 shadow-soft backdrop-blur hover:bg-cream-50"
              onClick={() => setQuickViewOpen(true)}
              type="button"
            >
              <Eye aria-hidden className="size-5" />
            </button>
          </div>
          {soldOut && (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-cream-50/12 backdrop-blur-[1px]">
              <SoldOutStamp size="lg" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <Link
            className="font-display text-xl font-black leading-tight text-forest-900 hover:text-clay"
            href={`/product/${product.slug}`}
          >
            {product.name}
          </Link>
          <p className="mt-1 text-sm font-bold text-forest-900/58">
            {getFormatLabel(product)}
          </p>
          <p className="mt-3 flex-1 text-sm leading-6 text-forest-900/68">
            {product.shortDescription}
          </p>
          <div className="mt-4 grid gap-2 rounded-2xl border border-forest-900/10 bg-white/55 p-3">
            <SpecLine label="CBG strength" value={getStrengthNote(product)} />
            <SpecLine label="THC note" value={getThcNote(product)} />
          </div>
          <ProductFeelProfile
            className="mt-3 bg-white/45"
            compact
            product={product}
          />
          <div className="mt-4 flex items-center gap-2 text-xs font-black text-forest-900">
            <span className="flex text-harvest-500" aria-hidden>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star className="size-3.5 fill-current" key={index} />
              ))}
            </span>
            <span>({reviewCount})</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone="green">Non-Intoxicating</Badge>
            {getBestForTags(product).map((tag) => (
              <Badge key={tag} tone="cream">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-clay">
                From
              </p>
              <ProductPrice product={product} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <ButtonLink
                href={`/product/${product.slug}`}
                size="sm"
                variant="ghost"
              >
                Details
              </ButtonLink>
              <ButtonLink
                href={getLabHref(product)}
                size="sm"
                variant="ghost"
              >
                <FileText aria-hidden className="size-4" />
                Lab
              </ButtonLink>
            </div>
            <Button
              aria-label={
                inStock
                  ? `Start order review for ${product.name}`
                  : soldOut
                    ? `${product.name} is sold out`
                    : `${product.name} is coming soon`
              }
              disabled={!inStock}
              onClick={() => addItem(product)}
              className="mt-2 w-full"
              size="sm"
              variant={inStock ? "primary" : "ghost"}
            >
              <ShoppingBag aria-hidden className="size-5" />
              {inStock ? "Start Order" : soldOut ? "Sold Out" : "Soon"}
            </Button>
          </div>
        </div>
      </article>
      {quickViewOpen && (
        <ProductQuickView
          onClose={() => setQuickViewOpen(false)}
          product={product}
        />
      )}
    </>
  );
}

function getFormatLabel(product: Product) {
  if (product.packSize) return product.packSize;
  if (product.category === "CBG Gummies") return "CBG per gummy";
  if (product.category === "Capsules") return "CBG per capsule";
  if (product.category === "CBG Oils") return "CBG per bottle";
  if (product.category === "Seeds") return "Farm packet";
  return product.category;
}

function SpecLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-clay">
        {label}
      </p>
      <p className="mt-0.5 text-xs font-bold leading-5 text-forest-900/70">
        {value}
      </p>
    </div>
  );
}

function getStrengthNote(product: Product) {
  if (product.slug === "funni-farm-cbg-gummies") {
    return "2-3 mg CBG per gummy";
  }

  if (product.slug === "cbg-hemp-flower") {
    return "CBGA 9.268%; CBG 0.201% sample";
  }

  if (product.category === "Capsules") {
    return "Measured capsule format";
  }

  if (product.category === "CBG Oils") {
    return "Bottle strength pending final label";
  }

  if (product.category === "Seeds") {
    return "No cannabinoid serving claims";
  }

  return product.cannabinoidInfo || "Review label before use";
}

function getThcNote(product: Product) {
  if (product.category === "Seeds") {
    return "Seed legality varies by location";
  }

  if (product.slug === "cbg-hemp-flower") {
    return "Delta-9 THC 0.019% sample";
  }

  return "THC compliance reviewed before fulfillment";
}

function getBestForTags(product: Product) {
  if (product.slug === "mega-cbg-gummy-bear") {
    return ["Strongest option"];
  }

  if (product.category === "CBG Gummies") {
    return ["First-time CBG", "Easy format"];
  }

  if (product.category === "CBG Oils") {
    return ["Flexible routine"];
  }

  if (product.category === "Capsules") {
    return ["Measured"];
  }

  if (product.category === "Hemp Flower") {
    return ["Plant-forward"];
  }

  if (product.category === "Seeds") {
    return ["Pantry seed"];
  }

  return ["Farm shelf"];
}

function getLabHref(product: Product) {
  return hasBatchSpecificCoa(product)
    ? product.coaUrl
    : `/lab-results#product-${product.slug}`;
}
