"use client";

import {
  FlaskConical,
  Leaf,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import {
  getBatchStatusLabel,
  getCoaStatusLabel,
  hasBatchSpecificCoa,
  isAvailableNow,
  isSoldOut,
} from "@/lib/products/status";
import type { Product } from "@/lib/products/types";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const inStock = isAvailableNow(product);
  const soldOut = isSoldOut(product);

  return (
    <div className="seed-card rounded-seed p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-clay">
            Stock
          </p>
          <p className="mt-1 font-bold text-forest-900">
            {inStock
              ? `${product.inventory} available for order request`
              : soldOut
                ? "Sold out"
                : "Coming soon"}
          </p>
        </div>
        <div className="flex items-center rounded-full border border-forest-900/15 bg-cream-50">
          <button
            aria-label="Decrease quantity"
            className="focus-ring rounded-full p-3"
            disabled={!inStock}
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            type="button"
          >
            <Minus aria-hidden className="size-4" />
          </button>
          <span className="w-10 text-center font-black">{quantity}</span>
          <button
            aria-label="Increase quantity"
            className="focus-ring rounded-full p-3"
            disabled={!inStock}
            onClick={() =>
              setQuantity((current) => Math.min(product.inventory, current + 1))
            }
            type="button"
          >
            <Plus aria-hidden className="size-4" />
          </button>
        </div>
      </div>
      <Button
        className="mt-5 w-full"
        data-testid="start-order-review"
        disabled={!inStock}
        onClick={() => addItem(product, quantity)}
        size="lg"
      >
        <ShoppingBag aria-hidden className="size-5" />
        {inStock ? "Start Order Review" : soldOut ? "Sold Out" : "Coming Soon"}
      </Button>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <TrustItem icon={ShieldCheck} text="Secure order request" />
        <TrustItem
          icon={FlaskConical}
          text={
            hasBatchSpecificCoa(product)
              ? "Lab result available"
              : "COA pending in vault"
          }
        />
        <TrustItem icon={Leaf} text="Hemp-derived" />
        <TrustItem icon={Sparkles} text="Effects vary by person" />
      </div>
      <div className="mt-4 grid gap-2 text-xs font-bold text-forest-900/70 sm:grid-cols-2">
        <span className="rounded-2xl border border-forest-900/10 bg-white/55 px-3 py-2">
          COA: {getCoaStatusLabel(product)}
        </span>
        <span className="rounded-2xl border border-forest-900/10 bg-white/55 px-3 py-2">
          Batch: {getBatchStatusLabel(product)}
        </span>
      </div>
      <p className="mt-4 text-xs font-semibold leading-5 text-forest-900/62">
        Orders are reviewed by our team before fulfillment. You&apos;ll receive
        an email to confirm and complete your order.
      </p>
    </div>
  );
}

function TrustItem({
  icon: Icon,
  text,
}: {
  icon: LucideIcon;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-2xl border border-forest-900/10 bg-white/55 px-3 py-2 text-xs font-black text-forest-900/70">
      <Icon aria-hidden className="size-4 text-clay" />
      {text}
    </span>
  );
}
