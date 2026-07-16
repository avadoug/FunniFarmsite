import type { Product } from "@/lib/products/types";
import { cn } from "@/lib/utils/cn";

type FeelMetric = {
  label: "Clarity" | "Calm" | "Body Comfort" | "Daytime Use" | "Strength";
  value: 1 | 2 | 3 | 4 | 5;
};

export function ProductFeelProfile({
  className,
  compact = false,
  product,
}: {
  className?: string;
  compact?: boolean;
  product: Product;
}) {
  const profile = getFeelProfile(product);

  return (
    <div
      className={cn(
        "rounded-2xl border border-forest-900/10 bg-white/55 p-3",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-clay">
            Feel profile
          </p>
          {!compact && (
            <p className="mt-1 text-xs font-semibold leading-5 text-forest-900/62">
              Preference cues only. Effects vary by person.
            </p>
          )}
        </div>
      </div>
      <div className={cn("mt-3 grid gap-2", compact ? "gap-1.5" : "gap-2.5")}>
        {profile.map((metric) => (
          <div
            className={cn(
              "grid items-center gap-2",
              compact ? "grid-cols-[5.75rem_1fr]" : "grid-cols-[7rem_1fr]",
            )}
            key={metric.label}
          >
            <span className="text-xs font-black text-forest-900/68">
              {metric.label}
            </span>
            <span
              aria-label={`${metric.label}: ${metric.value} out of 5 preference dots`}
              className="grid grid-cols-5 gap-1"
              role="img"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  className={cn(
                    "h-2 rounded-full",
                    index < metric.value
                      ? "bg-forest-700"
                      : "bg-forest-900/12",
                  )}
                  key={index}
                />
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function getFeelProfile(product: Product): FeelMetric[] {
  if (product.slug === "mega-cbg-gummy-bear") {
    return buildProfile(3, 3, 3, 2, 5);
  }

  if (product.category === "CBG Gummies") {
    return buildProfile(4, 3, 2, 4, 2);
  }

  if (product.category === "CBG Oils") {
    return buildProfile(4, 3, 3, 4, 3);
  }

  if (product.category === "Capsules") {
    return buildProfile(4, 3, 2, 5, 3);
  }

  if (product.category === "Hemp Flower") {
    return buildProfile(4, 2, 3, 3, 4);
  }

  if (product.category === "Topicals") {
    return buildProfile(1, 2, 4, 4, 2);
  }

  return buildProfile(2, 2, 1, 3, 1);
}

function buildProfile(
  clarity: FeelMetric["value"],
  calm: FeelMetric["value"],
  bodyComfort: FeelMetric["value"],
  daytimeUse: FeelMetric["value"],
  strength: FeelMetric["value"],
): FeelMetric[] {
  return [
    { label: "Clarity", value: clarity },
    { label: "Calm", value: calm },
    { label: "Body Comfort", value: bodyComfort },
    { label: "Daytime Use", value: daytimeUse },
    { label: "Strength", value: strength },
  ];
}
