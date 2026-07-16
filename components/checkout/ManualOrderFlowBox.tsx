import type { ReactNode } from "react";
import { CheckCircle2, MailCheck, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const manualOrderSteps = [
  "Customer submits an order request.",
  "The Funni Farm reviews availability, shipping eligibility, and compliance.",
  "The Funni Farm replies by email with payment options.",
  "Customer pays only after review.",
  "Order ships after confirmation.",
];

const reassuranceItems = [
  "We never ask for raw card numbers by email.",
  "We do not store card details.",
  "Adult hemp products only.",
  "Orders may be declined if shipping restrictions apply.",
];

export function ManualOrderFlowBox({
  className,
}: {
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft md:p-6",
        className,
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest-700 text-cream-50">
              <MailCheck aria-hidden className="size-5" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-clay">
                Friendly farm review
              </p>
              <h2 className="mt-1 font-display text-3xl font-black text-forest-900">
                How manual order requests work
              </h2>
              <p className="mt-2 text-sm leading-6 text-forest-900/70">
                This checkout sends a request first. The Funni Farm reviews the
                order before any payment is requested.
              </p>
            </div>
          </div>
          <ol className="mt-5 grid gap-3">
            {manualOrderSteps.map((step, index) => (
              <li
                className="grid grid-cols-[2rem_1fr] gap-3 rounded-2xl border border-forest-900/10 bg-white/55 p-3 text-sm font-bold leading-6 text-forest-900/78"
                key={step}
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-harvest-300 font-black text-forest-900">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-seed border border-forest-900/10 bg-forest-900 p-5 text-cream-50 lg:w-80">
          <ShieldCheck aria-hidden className="size-7 text-harvest-300" />
          <h3 className="mt-3 font-display text-2xl font-black">
            Payment reassurance
          </h3>
          <ul className="mt-4 space-y-3">
            {reassuranceItems.map((item) => (
              <ReassuranceItem icon={CheckCircle2} key={item}>
                {item}
              </ReassuranceItem>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ReassuranceItem({
  children,
  icon: Icon,
}: {
  children: ReactNode;
  icon: LucideIcon;
}) {
  return (
    <li className="flex gap-2 text-sm font-bold leading-6 text-cream-100/82">
      <Icon aria-hidden className="mt-1 size-4 shrink-0 text-harvest-300" />
      <span>{children}</span>
    </li>
  );
}
