import {
  ClipboardCheck,
  FlaskConical,
  Leaf,
  Sprout,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const trustItems: Array<{
  icon: LucideIcon;
  label: string;
  text: string;
}> = [
  {
    icon: FlaskConical,
    label: "Lab Tested",
    text: "Third Party Verified",
  },
  {
    icon: Leaf,
    label: "Non-Intoxicating",
    text: "0.3% THC or Less",
  },
  {
    icon: Sprout,
    label: "Family Crafted in Tennessee",
    text: "Small Farm, Big Heart",
  },
  {
    icon: ClipboardCheck,
    label: "Transparent Labels",
    text: "No Secrets, Just Quality",
  },
];

export function TrustBar({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <section
      aria-label="Customer trust details"
      className={cn(
        "rounded-seed border border-forest-900/12 bg-cream-50 p-3 shadow-soft",
        className,
      )}
    >
      <div
        className={cn(
          "grid gap-2",
          compact ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 xl:grid-cols-4",
        )}
      >
        {trustItems.map((item) => (
          <div
            className="glass-card group rounded-[1rem] p-4 transition hover:-translate-y-0.5 hover:bg-cream-50/96 hover:shadow-soft"
            key={item.label}
            title={item.text}
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest-700 text-cream-50 shadow-soft">
                <item.icon aria-hidden className="size-5" />
              </span>
              <div>
                <p className="text-sm font-black uppercase leading-5 text-forest-900">
                  {item.label}
                </p>
                <p className="text-xs font-semibold leading-5 text-forest-900/64">
                  {item.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
