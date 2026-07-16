import type { Metadata } from "next";
import Image from "next/image";
import {
  BookOpen,
  FileText,
  FlaskConical,
  Leaf,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { farmImages } from "@/lib/brand/farmImages";

export const metadata: Metadata = {
  title: "What Is CBG?",
  description:
    "Plain-English CBG education from The Funni Farm: what CBG is, how it differs from CBD, COA basics, product formats, and adult-use hemp compliance reminders.",
};

const coaSteps = [
  {
    title: "Match the product and batch",
    text: "Look for the product name, batch number, sample ID, and tested date so you know which item the report belongs to.",
  },
  {
    title: "Review cannabinoid totals",
    text: "Check the listed cannabinoids, including CBG or CBGA when relevant, and confirm hemp-compliance details are shown clearly.",
  },
  {
    title: "Look for the lab and method",
    text: "A useful COA should name the lab, show the test method, and include enough context to understand what was tested.",
  },
  {
    title: "Treat it as transparency",
    text: "A COA helps you review product information. It is not medical advice and does not guarantee how a product will feel for any person.",
  },
];

const formats = [
  {
    icon: Sparkles,
    title: "Gummies",
    text: "A familiar, pre-portioned format for adults who like simple label directions and fruit flavors. Check serving size, ingredients, and allergens.",
  },
  {
    icon: PackageCheck,
    title: "Capsules",
    text: "A low-taste format for adults who prefer a measured capsule routine. Confirm capsule count, ingredients, and per-serving CBG before ordering.",
  },
  {
    icon: FlaskConical,
    title: "Oils",
    text: "A flexible serving format where the label should explain bottle size, carrier oil, serving guidance, and current lab details.",
  },
  {
    icon: Leaf,
    title: "Flower",
    text: "A whole-plant hemp format for adults who want a botanical hemp experience. Flower may have stricter shipping and local compliance review.",
  },
];

const faqs = [
  [
    "Is CBG the same as CBD?",
    "No. CBG and CBD are different cannabinoids found in hemp. Product labels and COAs should show which cannabinoids are present and in what reported amounts.",
  ],
  [
    "Is CBG intoxicating?",
    "CBG itself is not the cannabinoid typically associated with intoxication. The Funni Farm positions its products as non-intoxicating hemp goods, and customers should review COAs and labels before ordering.",
  ],
  [
    "Can CBG products promise results?",
    "No. This site avoids disease, treatment, and guaranteed-effect claims. Product information is for preference, label review, and transparency.",
  ],
  [
    "Where should I start?",
    "Start with the product format you prefer, then review ingredients, serving information, batch details, COA links, and shipping restrictions.",
  ],
];

export default function WhatIsCbgPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Plain English hemp education"
            title="What Is CBG?"
          >
            <p>
              CBG stands for cannabigerol. It is one of many cannabinoids that
              can be found in hemp. The Funni Farm focuses on CBG-rich,
              non-intoxicating hemp products made for adults, with clear labels
              and batch transparency where available.
            </p>
          </SectionHeading>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/shop?category=CBG%20Gummies" size="lg">
              Shop CBG Products
            </ButtonLink>
            <ButtonLink href="/lab-results" size="lg" variant="secondary">
              View Lab Results
            </ButtonLink>
            <ButtonLink href="/faq" size="lg" variant="ghost">
              Read FAQ
            </ButtonLink>
          </div>
        </div>

        <div className="seed-card overflow-hidden rounded-seed">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              alt={farmImages.funniFarmLogo.alt}
              className="object-contain p-8"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={farmImages.funniFarmLogo.src}
            />
          </div>
          <div className="p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-clay">
              Start with the label
            </p>
            <p className="mt-2 text-sm font-bold leading-6 text-forest-900/72">
              Friendly hemp education should stay connected to real product
              details: serving size, ingredients, batch number, COA links, and
              adult-use notes.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        <InfoCard icon={Leaf} title="What CBG is">
          CBG is a naturally occurring hemp cannabinoid. Many hemp varieties
          contain smaller amounts of CBG than CBD, which is why CBG-rich product
          labels and lab reports matter.
        </InfoCard>
        <InfoCard icon={BookOpen} title="How CBG differs from CBD">
          CBG and CBD are different cannabinoids. Neither name alone tells the
          full product story. The best source is the current label and COA for
          the exact batch being sold.
        </InfoCard>
        <InfoCard icon={ShieldCheck} title="Whether CBG is intoxicating">
          CBG is not the cannabinoid typically associated with intoxication. The
          Funni Farm products should be reviewed as non-intoxicating hemp goods
          for adults, with COAs used to verify batch details.
        </InfoCard>
      </section>

      <section className="mt-14 rounded-seed border border-forest-900/12 bg-forest-900 p-6 text-cream-50 shadow-farm md:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-harvest-300">
            COA basics
          </p>
          <h2 className="mt-3 font-display text-4xl font-black">
            How to read a COA without getting lost.
          </h2>
          <p className="mt-3 leading-7 text-cream-100/76">
            A Certificate of Analysis is a lab report. For hemp products, it
            helps customers review cannabinoid content, batch identity, and
            compliance details. It should support transparency, not medical
            promises.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {coaSteps.map((step) => (
            <article
              className="dark-readable-card rounded-seed p-5"
              key={step.title}
            >
              <FileText aria-hidden className="size-6 text-harvest-300" />
              <h3 className="mt-4 font-display text-2xl font-black text-harvest-300">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-cream-100/72">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          eyebrow="Choosing a format"
          title="Gummies, capsules, oils, or flower?"
        >
          <p>
            The right product format is mostly about preference, label clarity,
            taste, serving style, and shipping rules. No format should be
            presented as a medical treatment or guaranteed result.
          </p>
        </SectionHeading>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {formats.map((format) => (
            <InfoCard icon={format.icon} key={format.title} title={format.title}>
              {format.text}
            </InfoCard>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="seed-card rounded-seed p-6 md:p-8">
          <PackageCheck aria-hidden className="size-9 text-moss" />
          <h2 className="mt-4 font-display text-3xl font-black text-forest-900">
            Adult-use and hemp compliance reminder
          </h2>
          <div className="mt-4 space-y-4 leading-7 text-forest-900/72">
            <p>
              The Funni Farm products are intended for adults. Customers should
              review product details, ingredients, serving information, COAs,
              and shipping restrictions before ordering.
            </p>
            <p>
              Hemp laws and product rules can vary by location. Checkout uses a
              manual order request so the farm can review availability, age
              requirements, and shipping before sending payment options.
            </p>
            <p className="font-bold text-forest-900">
              These products are not intended to diagnose, treat, cure, or
              prevent any disease.
            </p>
          </div>
        </div>

        <div className="seed-card overflow-hidden rounded-seed">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              alt={farmImages.gummyTraysGreen.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={farmImages.gummyTraysGreen.src}
            />
          </div>
          <div className="p-6">
            <h2 className="font-display text-3xl font-black text-forest-900">
              Shop with transparency in mind.
            </h2>
            <p className="mt-3 leading-7 text-forest-900/72">
              Before choosing a CBG product, look for clear label language,
              batch notes, COA access, adult-use reminders, and plain product
              descriptions that avoid medical promises.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14" id="faq">
        <div className="seed-card rounded-seed p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-clay">
            FAQ
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-forest-900">
            Quick CBG questions
          </h2>
          <div className="mt-6 space-y-4">
            {faqs.map(([question, answer]) => (
              <details
                className="group rounded-2xl border border-forest-900/10 bg-white/55 p-4"
                key={question}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-forest-900">
                  <span>{question}</span>
                  <span className="text-xl leading-none text-clay transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-forest-900/72">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/shop" size="lg">
          Shop Products
        </ButtonLink>
        <ButtonLink href="/lab-results" size="lg" variant="secondary">
          View Lab Results
        </ButtonLink>
        <ButtonLink href="/faq" size="lg" variant="ghost">
          Visit Full FAQ
        </ButtonLink>
      </div>
    </main>
  );
}

function InfoCard({
  children,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  icon: typeof Leaf;
  title: string;
}) {
  return (
    <article className="seed-card rounded-seed p-5">
      <Icon aria-hidden className="size-6 text-forest-700" />
      <h3 className="mt-4 font-display text-2xl font-black text-forest-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-forest-900/72">{children}</p>
    </article>
  );
}
