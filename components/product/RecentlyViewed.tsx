"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/products/types";

const RECENT_KEY = "funni-farm-recent-products";

export function RecentlyViewed({
  currentId,
  products,
}: {
  currentId: string;
  products: Product[];
}) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(RECENT_KEY);
    const previous = saved ? (JSON.parse(saved) as string[]) : [];
    const next = [currentId, ...previous.filter((id) => id !== currentId)].slice(
      0,
      6,
    );
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    setIds(next);
  }, [currentId]);

  const recentProducts = useMemo(
    () =>
      ids
        .filter((id) => id !== currentId)
        .map((id) => products.find((product) => product.id === id))
        .filter((product): product is Product => Boolean(product))
        .slice(0, 4),
    [currentId, ids, products],
  );

  if (recentProducts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-3xl font-black text-forest-900">
        Recently Viewed
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {recentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
