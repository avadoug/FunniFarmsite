"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/shop", label: "Shop" },
  { href: "/product-finder", label: "Product Finder" },
  { href: "/about", label: "Our Story" },
  { href: "/learn", label: "Learn" },
  { href: "/lab-results", label: "Lab Results" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-forest-900/10 bg-cream-50/92 shadow-[0_8px_24px_rgba(38,53,31,0.08)] backdrop-blur-xl">
      <div className="hidden bg-forest-700 px-4 py-1.5 text-center text-[0.72rem] font-black uppercase tracking-[0.18em] text-cream-50 sm:block">
        Farm grown. Small batch. Third-party tested.
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              className="focus-ring rounded-full px-4 py-2 text-sm font-extrabold text-forest-900 hover:bg-forest-700/10"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            aria-label="Search products"
            className="focus-ring hidden size-10 items-center justify-center rounded-full border border-forest-900/15 bg-cream-100 text-forest-900 hover:bg-forest-700 hover:text-cream-50 sm:flex"
            href="/shop"
          >
            <Search aria-hidden className="size-5" />
          </Link>
          <Link
            aria-label="Account"
            className="focus-ring hidden size-10 items-center justify-center rounded-full border border-forest-900/15 bg-cream-100 text-forest-900 hover:bg-forest-700 hover:text-cream-50 sm:flex"
            href="/checkout"
          >
            <UserRound aria-hidden className="size-5" />
          </Link>
          <Button
            aria-label={`Open cart with ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            onClick={openCart}
            size="icon"
            variant="primary"
          >
            <ShoppingBag aria-hidden className="size-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-harvest-300 text-[11px] font-black text-forest-900">
                {itemCount}
              </span>
            )}
          </Button>
          <Button
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="lg:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            size="icon"
            variant="ghost"
          >
            {menuOpen ? (
              <X aria-hidden className="size-5" />
            ) : (
              <Menu aria-hidden className="size-5" />
            )}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-forest-900/10 bg-cream-50 px-4 py-3 lg:hidden",
          !menuOpen && "hidden",
        )}
      >
        <nav aria-label="Mobile primary" className="mx-auto grid max-w-7xl gap-2">
          {navItems.map((item) => (
            <Link
              className="focus-ring rounded-2xl px-3 py-3 text-sm font-black text-forest-900 hover:bg-forest-700/10"
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
