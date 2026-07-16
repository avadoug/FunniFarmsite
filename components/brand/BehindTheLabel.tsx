import {
  CalendarClock,
  FileText,
  FlaskConical,
  ListChecks,
  PackageCheck,
  Scale,
  ShieldCheck,
  Wheat,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const labelItems: Array<{
  icon: LucideIcon;
  title: string;
  text: string;
}> = [
  {
    icon: Scale,
    title: "Serving size",
    text: "Look for the listed serving and count before comparing products.",
  },
  {
    icon: FlaskConical,
    title: "Cannabinoid amount",
    text: "CBG, CBGA, CBD, and THC details should come from labels or COAs.",
  },
  {
    icon: FileText,
    title: "Batch / lot number",
    text: "Batch IDs help connect a product to the right record.",
  },
  {
    icon: ListChecks,
    title: "Ingredients",
    text: "Ingredient and allergen details should be easy to find.",
  },
  {
    icon: ShieldCheck,
    title: "Warnings",
    text: "Adult-use, storage, and responsible-use notes belong in plain view.",
  },
  {
    icon: PackageCheck,
    title: "COA link",
    text: "A COA should match the product, batch, and test date where applicable.",
  },
  {
    icon: CalendarClock,
    title: "Best by date",
    text: "Freshness details should be added before full live ordering.",
  },
  {
    icon: Wheat,
    title: "Farm context",
    text: "Real product photos and farm notes help customers understand what they are buying.",
  },
];

export function BehindTheLabel() {
  return (
    <section aria-labelledby="behind-the-label">
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
          Behind the Label
        </p>
        <h2
          className="mt-2 font-display text-3xl font-black text-forest-900 md:text-5xl"
          id="behind-the-label"
        >
          The small details are the trust details.
        </h2>
        <p className="mt-3 leading-7 text-forest-900/72">
          A good hemp label helps customers compare products clearly. The site
          is built to surface these details as final product records and COAs
          are added.
        </p>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {labelItems.map((item) => (
          <article
            className="seed-card rounded-seed p-5 transition hover:-translate-y-0.5 hover:shadow-farm"
            key={item.title}
          >
            <item.icon aria-hidden className="size-6 text-forest-700" />
            <h3 className="mt-4 font-display text-2xl font-black text-forest-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-forest-900/68">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
