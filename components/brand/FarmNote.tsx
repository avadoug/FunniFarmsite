import type { ReactNode } from "react";
import {
  CheckCircle2,
  ClipboardCheck,
  FlaskConical,
  Leaf,
  PackageCheck,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type FarmNoteTone =
  | "farm"
  | "lab"
  | "cbg"
  | "hershey"
  | "buy"
  | "good";

const toneStyles: Record<
  FarmNoteTone,
  {
    accent: string;
    icon: LucideIcon;
    shell: string;
  }
> = {
  farm: {
    accent: "text-harvest-700",
    icon: Sprout,
    shell: "border-harvest-700/25 bg-harvest-300/35",
  },
  lab: {
    accent: "text-forest-700",
    icon: FlaskConical,
    shell: "border-forest-700/20 bg-forest-50",
  },
  cbg: {
    accent: "text-moss",
    icon: Leaf,
    shell: "border-moss/25 bg-moss/12",
  },
  hershey: {
    accent: "text-berry",
    icon: CheckCircle2,
    shell: "border-berry/20 bg-berry/10",
  },
  buy: {
    accent: "text-clay",
    icon: ClipboardCheck,
    shell: "border-clay/20 bg-clay/10",
  },
  good: {
    accent: "text-forest-700",
    icon: PackageCheck,
    shell: "border-forest-900/12 bg-cream-50",
  },
};

export function FarmNote({
  children,
  className,
  eyebrow,
  title,
  tone = "farm",
}: {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title: string;
  tone?: FarmNoteTone;
}) {
  const config = toneStyles[tone];
  const Icon = config.icon;

  return (
    <aside
      className={cn(
        "rounded-seed border p-5 shadow-soft",
        config.shell,
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-forest-900/10 bg-cream-50 text-forest-900 shadow-soft">
          <Icon aria-hidden className={cn("size-5", config.accent)} />
        </div>
        <div>
          {eyebrow && (
            <p className="text-xs font-black uppercase tracking-[0.18em] text-clay">
              {eyebrow}
            </p>
          )}
          <h3 className="font-display text-2xl font-black leading-tight text-forest-900">
            {title}
          </h3>
          <div className="mt-2 text-sm font-semibold leading-6 text-forest-900/72">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}

export function HersheyNote({
  children,
  className,
  title = "Hershey says",
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <FarmNote
      className={className}
      eyebrow="Farm note"
      title={title}
      tone="hershey"
    >
      {children}
    </FarmNote>
  );
}

export function ComplianceNote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <FarmNote
      className={className}
      eyebrow="Good to know"
      title="Preference guidance, not medical advice"
      tone="good"
    >
      <div className="flex gap-2">
        <ShieldCheck
          aria-hidden
          className="mt-0.5 size-4 shrink-0 text-forest-700"
        />
        <div>{children}</div>
      </div>
    </FarmNote>
  );
}
