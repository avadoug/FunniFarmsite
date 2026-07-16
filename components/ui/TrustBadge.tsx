import type { LucideIcon } from "lucide-react";

export function TrustBadge({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="seed-card rounded-seed p-4">
      <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-forest-700 text-cream-50">
        <Icon aria-hidden className="size-5" />
      </div>
      <h3 className="font-display text-xl font-black text-forest-900">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-forest-900/72">{text}</p>
    </div>
  );
}
