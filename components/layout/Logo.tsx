import Image from "next/image";
import Link from "next/link";
import { businessInfo } from "@/lib/brand/businessInfo";
import { cn } from "@/lib/utils/cn";

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      aria-label="The Funni Farm home"
      className={cn("focus-ring inline-flex items-center gap-3 rounded-full", className)}
      href="/"
    >
      <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-forest-900 bg-cream-50 shadow-soft">
        <Image
          alt=""
          className="object-cover"
          fill
          priority
          sizes="56px"
          src="/brand/funni-farm-official-logo.png"
        />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-xl font-black text-forest-900">
            The Funni Farm
          </span>
          <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-clay">
            {businessInfo.establishedShort}
          </span>
        </span>
      )}
    </Link>
  );
}
