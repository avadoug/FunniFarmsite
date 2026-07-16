import Link from "next/link";
import type { Policy } from "@/lib/policies/content";

export function PolicyPage({ policy }: { policy: Policy }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Link
        className="focus-ring inline-flex rounded-full text-sm font-black text-clay hover:text-forest-900"
        href="/policies"
      >
        Back to policies
      </Link>
      <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-clay">
        {policy.eyebrow ??
          (policy.isPlaceholder === false ? "Policy document" : "Draft policy")}
      </p>
      <h1 className="mt-3 font-display text-4xl font-black text-forest-900 md:text-5xl">
        {policy.title}
      </h1>
      {policy.effectiveDate ? (
        <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-forest-900/55">
          Effective Date: {policy.effectiveDate}
        </p>
      ) : null}
      <p className="mt-4 text-lg leading-8 text-forest-900/70">
        {policy.description}
      </p>
      <div className="mt-8 rounded-seed border border-clay/25 bg-clay/10 p-4 text-sm font-bold leading-6 text-clay">
        {policy.notice ??
          "This policy content is provided for customer information and should be reviewed by qualified counsel before live ordering."}
      </div>
      {policy.pdfUrl ? (
        <Link
          className="focus-ring mt-5 inline-flex rounded-full bg-forest-900 px-5 py-3 text-sm font-black text-cream-50 shadow-soft hover:bg-clay"
          href={policy.pdfUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          View PDF Policy
        </Link>
      ) : null}
      <div className="mt-8 space-y-5">
        {policy.sections.map((section) => (
          <section className="seed-card rounded-seed p-5" key={section.title}>
            <h2 className="font-display text-2xl font-black text-forest-900">
              {section.title}
            </h2>
            <p className="mt-2 whitespace-pre-line leading-7 text-forest-900/72">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
