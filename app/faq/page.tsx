import type { Metadata } from "next";
import Link from "next/link";
import { FileText, HelpCircle, Mail, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { funniFarmFaqs } from "@/lib/content/faq";
import { businessInfo } from "@/lib/brand/businessInfo";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions for The Funni Farm, including lab testing, COAs, shipping, returns, storage, FDA disclaimer, and contact information.",
};

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Customer questions" title="Funni Farm FAQ">
        <p>
          Quick, plain-English answers for adult hemp customers. Product pages,
          labels, COAs, and order review should always be checked before
          purchase.
        </p>
      </SectionHeading>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="seed-card rounded-seed p-5">
          <ShieldCheck aria-hidden className="size-7 text-moss" />
          <h2 className="mt-3 font-display text-2xl font-black text-forest-900">
            Lab transparency
          </h2>
          <p className="mt-2 text-sm leading-6 text-forest-900/72">
            COAs are available when applicable and should match product batch
            or lot details.
          </p>
        </div>
        <div className="seed-card rounded-seed p-5">
          <FileText aria-hidden className="size-7 text-clay" />
          <h2 className="mt-3 font-display text-2xl font-black text-forest-900">
            PDF available
          </h2>
          <p className="mt-2 text-sm leading-6 text-forest-900/72">
            The supplied FAQ PDF is available for customers who want the
            document version.
          </p>
        </div>
        <div className="seed-card rounded-seed p-5">
          <Mail aria-hidden className="size-7 text-harvest-700" />
          <h2 className="mt-3 font-display text-2xl font-black text-forest-900">
            Ask the farm
          </h2>
          <p className="mt-2 text-sm leading-6 text-forest-900/72">
            Contact The Funni Farm for product, batch, storage, or order
            questions.
          </p>
        </div>
      </div>

      <section className="mt-10 space-y-4">
        {funniFarmFaqs.map((item) => (
          <details
            className="seed-card rounded-seed p-5"
            key={item.question}
          >
            <summary className="flex cursor-pointer items-center gap-3 font-display text-2xl font-black text-forest-900">
              <HelpCircle aria-hidden className="size-6 shrink-0 text-clay" />
              <span>{item.question}</span>
            </summary>
            <p className="mt-3 leading-7 text-forest-900/72">{item.answer}</p>
          </details>
        ))}
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink
          href="/policies/the-funni-farm-faq.pdf"
          rel="noopener noreferrer"
          target="_blank"
        >
          View FAQ PDF
        </ButtonLink>
        <ButtonLink href="/lab-results" variant="secondary">
          View Lab Results
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Contact The Farm
        </ButtonLink>
      </div>

      <p className="mt-8 rounded-seed border border-forest-900/10 bg-white/55 p-4 text-sm leading-6 text-forest-900/72">
        The Funni Farm can be reached at{" "}
        <Link
          className="font-black text-clay underline decoration-clay/35 underline-offset-4"
          href={businessInfo.emailHref}
        >
          {businessInfo.email}
        </Link>{" "}
        or{" "}
        <Link
          className="font-black text-clay underline decoration-clay/35 underline-offset-4"
          href={businessInfo.phoneHref}
        >
          {businessInfo.phone}
        </Link>
        .
      </p>
    </main>
  );
}
