import { CheckCircle2 } from "lucide-react";

const checklist = [
  "Clear product identity",
  "Batch or testing status",
  "Ingredient transparency",
  "Farm-reviewed order request",
  "Responsible adult-use language",
  "Honest availability",
  "No mystery claims",
];

export function FarmQualityChecklist() {
  return (
    <section
      aria-labelledby="farm-quality-checklist"
      className="rounded-[2rem] border border-forest-900/12 bg-forest-900 p-6 text-cream-50 shadow-farm md:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-harvest-300">
            Farm Quality Checklist
          </p>
          <h2
            className="mt-3 font-display text-3xl font-black md:text-5xl"
            id="farm-quality-checklist"
          >
            What trustworthy hemp shopping should show you.
          </h2>
          <p className="mt-4 leading-7 text-cream-100/74">
            The Funni Farm is designed to put the important information up
            front: what the product is, what is still pending, and how review
            works before payment.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {checklist.map((item) => (
            <div
              className="dark-readable-card flex items-center gap-3 rounded-2xl p-4 text-sm font-black text-cream-100/90"
              key={item}
            >
              <CheckCircle2
                aria-hidden
                className="size-5 shrink-0 text-harvest-300"
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
