"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ProductImage } from "@/components/product/ProductImage";
import { formatMoney } from "@/lib/utils/format";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const {
    closeCart,
    isOpen,
    items,
    itemCount,
    removeItem,
    subtotal,
    updateQuantity,
  } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-ink/55 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />
      <aside
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-full max-w-md flex-col border-l border-forest-900/15 bg-cream-50 shadow-farm transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-forest-900/10 p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-clay">
              The Funni Farm
            </p>
            <h2 className="font-display text-2xl font-black text-forest-900">
              Cart ({itemCount})
            </h2>
          </div>
          <Button aria-label="Close cart" onClick={closeCart} size="icon" variant="ghost">
            <X aria-hidden className="size-5" />
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-forest-700 text-cream-50">
              <ShoppingBag aria-hidden className="size-8" />
            </div>
            <h3 className="font-display text-2xl font-black text-forest-900">
              Your cart is emptier than a dry tray.
            </h3>
            <p className="mt-2 text-sm leading-6 text-forest-900/70">
              Add a CBG product to start a farm-reviewed order request. No
              payment is collected until the order is reviewed.
            </p>
            <ButtonLink className="mt-6" href="/shop" onClick={closeCart}>
              Shop Products
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {items.map((item) => (
                <div
                  className="grid grid-cols-[76px_1fr] gap-4 rounded-2xl border border-forest-900/10 bg-white/45 p-3"
                  key={item.product.id}
                >
                  <Link
                    className="relative aspect-square overflow-hidden rounded-xl border border-forest-900/10 bg-cream-100"
                    href={`/product/${item.product.slug}`}
                    onClick={closeCart}
                  >
                    <ProductImage
                      alt={item.product.name}
                      className="object-cover"
                      sizes="76px"
                      src={item.product.image}
                    />
                  </Link>
                  <div className="min-w-0">
                    <div className="flex gap-2">
                      <div className="min-w-0 flex-1">
                        <Link
                          className="font-bold text-forest-900 hover:text-clay"
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-forest-900/55">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        aria-label={`Remove ${item.product.name}`}
                        className="focus-ring rounded-full p-2 text-forest-900/60 hover:bg-clay/10 hover:text-clay"
                        onClick={() => removeItem(item.product.id)}
                        type="button"
                      >
                        <Trash2 aria-hidden className="size-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-forest-900/15 bg-cream-50">
                        <button
                          aria-label={`Decrease ${item.product.name} quantity`}
                          className="focus-ring rounded-full p-2"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          type="button"
                        >
                          <Minus aria-hidden className="size-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-black">
                          {item.quantity}
                        </span>
                        <button
                          aria-label={`Increase ${item.product.name} quantity`}
                          className="focus-ring rounded-full p-2"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          type="button"
                        >
                          <Plus aria-hidden className="size-4" />
                        </button>
                      </div>
                      <p className="font-black text-forest-900">
                        {formatMoney(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-forest-900/10 bg-cream-100/70 p-5">
              <div className="flex items-center justify-between text-lg font-black text-forest-900">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-forest-900/65">
                Taxes, shipping, restrictions, and payment instructions are
                reviewed after you send the order request.
              </p>
              <div className="mt-4 grid gap-3">
                <ButtonLink href="/checkout" onClick={closeCart} size="lg">
                  Submit Order Request
                </ButtonLink>
                <ButtonLink
                  href="/cart"
                  onClick={closeCart}
                  size="lg"
                  variant="ghost"
                >
                  Edit Cart
                </ButtonLink>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
