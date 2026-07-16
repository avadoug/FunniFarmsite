import type { Metadata } from "next";
import Link from "next/link";
import { policies } from "@/lib/policies/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

const groupOrder = [
  "Policy document",
  "Customer guide",
  "Safety policy",
  "Quality policy",
  "Customer trust",
  "Compliance policy",
  "Shopping policy",
  "Customer support",
  "Website policy",
  "Website statement",
  "Business policy",
  "Operations policy",
  "Future feature",
  "Customer promise",
];

const groupedPolicies = Object.entries(
  policies.reduce<Record<string, typeof policies>>((groups, policy) => {
    const group = policy.eyebrow ?? "Policy";
    groups[group] = [...(groups[group] ?? []), policy];
    return groups;
  }, {}),
).sort(([left], [right]) => {
  const leftIndex = groupOrder.indexOf(left);
  const rightIndex = groupOrder.indexOf(right);
  const normalizedLeft = leftIndex === -1 ? groupOrder.length : leftIndex;
  const normalizedRight = rightIndex === -1 ? groupOrder.length : rightIndex;

  return normalizedLeft - normalizedRight || left.localeCompare(right);
});

export const metadata: Metadata = {
  title: "Policies & Customer Guides",
  description:
    "The Funni Farm policy and customer guide center for terms, privacy, shipping, refunds, age verification, safe use, storage, accessibility, wholesale, and quality information.",
};

export default function PoliciesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Policy center" title="Policies & Customer Guides">
        <p>
          Review The Funni Farm policy pages, customer guides, safety notes,
          storage guidance, wholesale rules, quality standards, transparency
          statements, and customer support information. Final policies should be
          reviewed before live sales.
        </p>
      </SectionHeading>

      <div className="mt-8 rounded-seed border-2 border-forest-900/10 bg-cream-100 p-5 shadow-soft">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-clay">
          Customer trust library
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-forest-900/75">
          These pages explain how The Funni Farm handles orders, product
          labeling, batch traceability, responsible marketing, quality concerns,
          storage, support, and website use. They are here to make the buying
          experience clearer before anyone submits an order request.
        </p>
      </div>

      <div className="mt-10 space-y-10">
        {groupedPolicies.map(([group, groupPolicies]) => (
          <section key={group}>
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-forest-900/10 pb-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-clay">
                  {group}
                </p>
                <h2 className="font-display text-3xl font-black text-forest-950">
                  {groupPolicies.length}{" "}
                  {groupPolicies.length === 1 ? "document" : "documents"}
                </h2>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groupPolicies.map((policy) => (
                <Link
                  className="seed-card rounded-seed p-5 transition hover:-translate-y-1 hover:shadow-farm"
                  href={`/policies/${policy.slug}`}
                  key={policy.slug}
                >
                  <h3 className="font-display text-2xl font-black text-forest-900">
                    {policy.title}
                  </h3>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-clay">
                    {policy.eyebrow ?? "Policy"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-forest-900/70">
                    {policy.description}
                  </p>
                  {policy.effectiveDate ? (
                    <p className="mt-4 text-xs font-bold text-forest-900/50">
                      Effective {policy.effectiveDate}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
