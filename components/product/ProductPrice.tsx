import type { Product } from "@/lib/products/types";
import { isSoldOut } from "@/lib/products/status";
import { cn } from "@/lib/utils/cn";
import { formatMoney } from "@/lib/utils/format";

type PriceSize = "sm" | "md" | "lg" | "xl";

const priceSizes: Record<PriceSize, string> = {
  sm: "text-sm",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

const stampSizes: Record<PriceSize, string> = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-lg",
  xl: "px-5 py-2.5 text-2xl",
};

export function SoldOutStamp({
  className,
  size = "md",
}: {
  className?: string;
  size?: PriceSize;
}) {
  return (
    <span
      aria-label="Sold out"
      className={cn(
        "inline-flex -rotate-6 select-none items-center justify-center border-2 border-red-700 bg-red-50 font-black uppercase tracking-[0.18em] text-red-700 shadow-[0_8px_0_rgba(185,28,28,0.12)] ring-2 ring-red-700/10",
        stampSizes[size],
        className,
      )}
    >
      SOLD OUT
    </span>
  );
}

export function ProductPrice({
  className,
  compareClassName,
  priceClassName,
  product,
  showCompareAt = true,
  size = "md",
}: {
  className?: string;
  compareClassName?: string;
  priceClassName?: string;
  product: Product;
  showCompareAt?: boolean;
  size?: PriceSize;
}) {
  if (isSoldOut(product)) {
    return <SoldOutStamp className={className} size={size} />;
  }

  if (product.slug === "cbg-hemp-flower") {
    return (
      <span className={cn("inline-flex flex-col gap-1", className)}>
        <span
          className={cn(
            "font-black leading-none text-forest-900",
            priceSizes[size],
            priceClassName,
          )}
        >
          {formatMoney(10)}
          <span className="ml-1 text-xs font-extrabold uppercase tracking-[0.12em] text-forest-900/58">
            per gram
          </span>
        </span>
        <span
          className={cn(
            "font-black leading-none text-forest-900",
            size === "xl" ? "text-2xl" : size === "lg" ? "text-xl" : "text-sm",
            priceClassName,
          )}
        >
          {formatMoney(280)}
          <span className="ml-1 text-xs font-extrabold uppercase tracking-[0.12em] text-forest-900/58">
            per oz
          </span>
        </span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-3", className)}>
      <span
        className={cn(
          "font-black text-forest-900",
          priceSizes[size],
          priceClassName,
        )}
      >
        {formatMoney(product.price)}
      </span>
      {showCompareAt && product.compareAtPrice && (
        <span
          className={cn(
            "font-bold text-forest-900/45 line-through",
            size === "sm" ? "text-xs" : "text-base",
            compareClassName,
          )}
        >
          {formatMoney(product.compareAtPrice)}
        </span>
      )}
    </span>
  );
}
