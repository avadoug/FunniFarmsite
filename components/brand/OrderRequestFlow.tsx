import {
  CheckCircle2,
  ClipboardCheck,
  MailCheck,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const flowSteps: Array<{
  icon: LucideIcon;
  title: string;
  text: string;
}> = [
  {
    icon: ShoppingBag,
    title: "Choose products",
    text: "Add available farm shelf items to your order request basket.",
  },
  {
    icon: ClipboardCheck,
    title: "Submit request",
    text: "Checkout sends customer details without collecting card numbers.",
  },
  {
    icon: ShieldCheck,
    title: "Farm review",
    text: "The farm checks availability, age, shipping, and product status.",
  },
  {
    icon: MailCheck,
    title: "Payment options",
    text: "Cash App, PayPal, or other options are emailed after review.",
  },
  {
    icon: PackageCheck,
    title: "Finalized order",
    text: "The order ships only after review, payment, and confirmation.",
  },
];

const reassurance = [
  "No card is charged on the website.",
  "Your cart creates a request, not an automatic purchase.",
  "Orders may be declined if shipping restrictions apply.",
];

export function OrderRequestFlow({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[2rem] border shadow-farm",
        dark
          ? "border-cream-50/12 bg-forest-900 text-cream-50"
          : "border-forest-900/12 bg-cream-50 text-forest-900",
        className,
      )}
    >
      <div className="p-6 md:p-8">
        <div className="max-w-3xl">
          <p
            className={cn(
              "text-xs font-black uppercase tracking-[0.22em]",
              dark ? "text-harvest-300" : "text-clay",
            )}
          >
            How your farm order request works
          </p>
          <h2 className="mt-3 font-display text-3xl font-black md:text-5xl">
            A careful review before payment.
          </h2>
          <p
            className={cn(
              "mt-3 max-w-2xl leading-7",
              dark ? "text-cream-100/74" : "text-forest-900/72",
            )}
          >
            The Funni Farm uses manual order review so customers can shop
            clearly while the farm confirms availability, shipping eligibility,
            age requirements, and product status before payment.
          </p>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-5">
          {flowSteps.map((step, index) => (
            <article
              className={cn(
                "relative rounded-seed border p-4 transition hover:-translate-y-0.5",
                dark
                  ? "dark-readable-card"
                  : "border-forest-900/10 bg-white/55",
              )}
              key={step.title}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full",
                    dark ? "bg-harvest-300 text-forest-900" : "bg-forest-700 text-cream-50",
                  )}
                >
                  <step.icon aria-hidden className="size-5" />
                </span>
                <span
                  className={cn(
                    "font-display text-3xl font-black",
                    dark ? "text-cream-50/18" : "text-forest-900/16",
                  )}
                >
                  {index + 1}
                </span>
              </div>
              <h3
                className={cn(
                  "mt-4 font-display text-xl font-black leading-tight",
                  dark ? "text-harvest-300" : "text-forest-900",
                )}
              >
                {step.title}
              </h3>
              <p
                className={cn(
                  "mt-2 text-sm font-semibold leading-6",
                  dark ? "text-cream-100/72" : "text-forest-900/66",
                )}
              >
                {step.text}
              </p>
            </article>
          ))}
        </div>

        <div
          className={cn(
            "mt-6 flex flex-col gap-3 rounded-seed border p-4 text-sm font-bold leading-6 md:flex-row md:items-center md:justify-between",
            dark
              ? "border-harvest-300/20 bg-harvest-300/10 text-cream-100/80"
              : "border-harvest-700/25 bg-harvest-300/28 text-forest-900/72",
          )}
        >
          {reassurance.map((item) => (
            <p className="flex items-start gap-2" key={item}>
              <CheckCircle2
                aria-hidden
                className={cn(
                  "mt-1 size-4 shrink-0",
                  dark ? "text-harvest-300" : "text-forest-700",
                )}
              />
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
