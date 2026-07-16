"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { OrderRequestFlow } from "@/components/brand/OrderRequestFlow";
import { TrustBar } from "@/components/brand/TrustBar";
import { ProductImage } from "@/components/product/ProductImage";
import { useCart } from "./CartProvider";
import { formatMoney } from "@/lib/utils/format";

export function CartPageClient() {
  const { items, removeItem, subtotal, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-forest-700 text-cream-50">
          <ShoppingBag aria-hidden className="size-9" />
        </div>
        <h1 className="font-display text-4xl font-black text-forest-900">
          Your cart is emptier than a dry tray.
        </h1>
        <p className="mt-3 leading-7 text-forest-900/70">
          Let&apos;s fix that with non-intoxicating CBG products, clear labels,
          and batch transparency you can review before ordering.
        </p>
        <ButtonLink className="mt-6" href="/shop" size="lg">
          Continue Shopping
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-black text-forest-900 md:text-5xl">
        Your Cart
      </h1>
      <p className="mt-3 max-w-3xl leading-7 text-forest-900/70">
        Your basket creates a farm order request. No payment is collected here,
        and product availability is reviewed before payment options are emailed.
      </p>
      <div className="mt-6">
        <TrustBar compact />
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              className="seed-card grid gap-4 rounded-seed p-4 sm:grid-cols-[132px_1fr_auto]"
              key={item.product.id}
            >
              <Link
                className="relative aspect-square overflow-hidden rounded-2xl border border-forest-900/10 bg-cream-100"
                href={`/product/${item.product.slug}`}
              >
                <ProductImage
                  alt={item.product.name}
                  className="object-cover"
                  sizes="132px"
                  src={item.product.image}
                />
              </Link>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-clay">
                  {item.product.category}
                </p>
                <Link
                  className="mt-2 block font-display text-2xl font-black text-forest-900 hover:text-clay"
                  href={`/product/${item.product.slug}`}
                >
                  {item.product.name}
                </Link>
                <p className="mt-2 text-sm leading-6 text-forest-900/65">
                  {formatMoney(item.product.price)} each. Inventory and shipping
                  restrictions are rechecked during order review.
                </p>
                <div className="mt-4 flex w-fit items-center rounded-full border border-forest-900/15 bg-cream-50">
                  <button
                    aria-label={`Decrease ${item.product.name} quantity`}
                    className="focus-ring rounded-full p-3"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    type="button"
                  >
                    <Minus aria-hidden className="size-4" />
                  </button>
                  <span className="w-10 text-center font-black">
                    {item.quantity}
                  </span>
                  <button
                    aria-label={`Increase ${item.product.name} quantity`}
                    className="focus-ring rounded-full p-3"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    type="button"
                  >
                    <Plus aria-hidden className="size-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                <p className="text-xl font-black text-forest-900">
                  {formatMoney(item.product.price * item.quantity)}
                </p>
                <Button
                  aria-label={`Remove ${item.product.name}`}
                  onClick={() => removeItem(item.product.id)}
                  size="icon"
                  variant="ghost"
                >
                  <Trash2 aria-hidden className="size-5" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-seed border border-forest-900/12 bg-forest-900 p-5 text-cream-50 shadow-farm lg:sticky lg:top-24">
          <h2 className="font-display text-3xl font-black">Order Summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <SummaryRow label="Subtotal" value={formatMoney(subtotal)} />
            <SummaryRow label="Estimated shipping" value="Calculated later" />
            <SummaryRow label="Estimated taxes" value="Calculated later" />
          </div>
          <p className="mt-4 text-sm leading-6 text-cream-100/70">
            Taxes, shipping, legal restrictions, and payment instructions are
            confirmed after the order request is reviewed.
          </p>
          <div className="mt-6 grid gap-3">
            <ButtonLink href="/checkout" size="lg" variant="secondary">
              Submit Order Request
            </ButtonLink>
            <ButtonLink href="/shop" size="lg" variant="ghost">
              Continue Shopping
            </ButtonLink>
          </div>
        </aside>
      </div>

      <div className="mt-10">
        <OrderRequestFlow />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-forest-900/10 bg-cream-50/95 p-3 shadow-farm backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-clay">
              Subtotal
            </p>
            <p className="font-black text-forest-900">{formatMoney(subtotal)}</p>
          </div>
          <ButtonLink href="/checkout">Order Request</ButtonLink>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-cream-50/10 pb-3">
      <span className="text-cream-100/70">{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}
