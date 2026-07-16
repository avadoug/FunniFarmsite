import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeTone = "green" | "gold" | "purple" | "dark" | "cream" | "red";

const tones: Record<BadgeTone, string> = {
  green: "border-forest-700/20 bg-forest-700 text-cream-50",
  gold: "border-harvest-700/20 bg-harvest-300 text-forest-900",
  purple: "border-berry/20 bg-berry text-cream-50",
  dark: "border-ink/20 bg-ink text-cream-50",
  cream: "border-forest-700/20 bg-cream-50 text-forest-900",
  red: "border-red-700/20 bg-red-700 text-cream-50",
};

export function Badge({
  className,
  tone = "green",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-extrabold uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
