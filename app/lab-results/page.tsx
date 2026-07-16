import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  FileText,
  FlaskConical,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { FarmNote } from "@/components/brand/FarmNote";
import { JackFrostCoaFeature } from "@/components/coa/JackFrostCoaFeature";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBar } from "@/components/brand/TrustBar";
import { farmImages } from "@/lib/brand/farmImages";
import { productLabelFacts } from "@/lib/products/labelFacts";
import { getProducts } from "@/lib/products/repository";
import {
  getBatchStatusLabel,
  getCoaStatusLabel,
  hasBatchSpecificCoa,
  requiresCoa,
} from "@/lib/products/status";
import type { Product } from "@/lib/products/types";

export const metadata: Metadata = {
  title: "Lab Results and COA Status",
  description:
    "The Funni Farm lab results index with product batch numbers, cannabinoid summaries, COA availability, and plain-English COA reading guidance.",
};

const coaReadingSteps = [
  {
    title: "Match the product",
    text: "Start by checking the product name, sample name, and batch number. The COA should connect to the product being reviewed.",
  },
  {
    title: "Check the date and lab",
    text: "Look for the tested date, report date, lab name, and method. Current batches should use current records.",
  },
  {
    title: "Review cannabinoid results",
    text: "Read the cannabinoid table for CBG, CBGA, CBD, total THC, Delta-9 THC, and any other reported cannabinoids.",
  },
  {
    title: "Use it for transparency",
    text: "A COA helps customers review product details and hemp compliance information. It is not medical advice or a promise of effects.",
  },
];

export default async function LabResultsPage() {
  const products = await getProducts();
  const labProducts = products.filter(
    (product) => product.isActive && requiresCoa(product),
  );
  const gummyFacts = productLabelFacts["funni-farm-cbg-gummies"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="COA / lab testing" title="Lab Results">
        <p>
          Lab transparency is part of the Funni Farm promise. Each product
          should be batch-tested, batch-labeled, and linked to a Certificate of
          Analysis so customers can review cannabinoid content, federal hemp
          compliance details, and safety testing status before use.
        </p>
      </SectionHeading>

      <div className="mt-7">
        <TrustBar compact />
      </div>

      <section className="mt-8 grid overflow-hidden rounded-[2rem] border border-forest-900/12 bg-cream-50 shadow-farm lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative min-h-[18rem]">
          <Image
            alt={farmImages.batchTransparencyLogo.alt}
            className="object-contain p-8"
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            src={farmImages.batchTransparencyLogo.src}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900/46 via-transparent to-transparent" />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
            Batch transparency
          </p>
          <h2 className="mt-3 font-display text-3xl font-black text-forest-900">
            Every real batch needs a matching record.
          </h2>
          <p className="mt-3 leading-7 text-forest-900/72">
            Product photos, labels, batch numbers, and COA links should all tell
            the same story. This page is the public place for customers to
            review that information, including the extracted CBG Gummies label
            facts and the Jack Frost cbg_001 COA breakdown below.
          </p>
        </div>
      </section>

      <CoaStatusSummary products={labProducts} />

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <FarmNote
          eyebrow="COA honesty matters"
          title="Tested samples are not forever promises."
          tone="lab"
        >
          A COA applies to the tested sample, date, method, and batch shown on
          that report. Future batches should receive their own records before
          being represented as lab-supported.
        </FarmNote>
        <FarmNote
          eyebrow="Lab note"
          title="Look for the batch match first."
          tone="good"
        >
          When reviewing a COA, match the product name, batch or lot number,
          lab name, and test date before looking at cannabinoid percentages.
        </FarmNote>
      </div>

      <section className="mt-8 rounded-seed border border-forest-900/12 bg-forest-900 p-6 text-cream-50 shadow-farm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div>
            <FlaskConical aria-hidden className="size-9 text-harvest-300" />
            <h2 className="mt-4 font-display text-4xl font-black">
              How to read lab results
            </h2>
            <p className="mt-3 leading-7 text-cream-100/76">
              A Certificate of Analysis, or COA, is a lab report tied to a
              sample or batch. It helps customers review what was tested, when
              it was tested, and what cannabinoid information was reported.
              <span className="mt-3 block text-sm font-bold text-cream-100/70">
                <abbr
                  className="cursor-help underline decoration-harvest-300/50 underline-offset-4"
                  title="Not Detected: the analyte was not reported above the lab's detection limit."
                >
                  ND
                </abbr>{" "}
                means not detected above the lab&apos;s limit.{" "}
                <abbr
                  className="cursor-help underline decoration-harvest-300/50 underline-offset-4"
                  title="Total THC is a calculated hemp-compliance value based on reported THC and THCA values."
                >
                  Total THC
                </abbr>{" "}
                is a compliance-focused calculation, not a promise of product
                experience.
              </span>
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {coaReadingSteps.map((step) => (
              <article
                className="dark-readable-card rounded-seed p-5"
                key={step.title}
              >
                <SearchCheck
                  aria-hidden
                  className="size-5 text-harvest-300"
                />
                <h3 className="mt-3 font-display text-2xl font-black text-harvest-300">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-cream-100/72">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mt-8 grid overflow-hidden rounded-[2rem] border border-forest-900/12 bg-cream-50 shadow-farm lg:grid-cols-[.8fr_1.2fr]"
        id="funni-farm-cbg-gummies-label"
      >
        <div className="relative min-h-[22rem] bg-cream-100">
          <Image
            alt={farmImages.cbgGummiesFrontLogo.alt}
            className="object-cover object-top"
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            src={farmImages.cbgGummiesFrontLogo.src}
          />
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            <Badge tone="green">Label data added</Badge>
            <Badge tone="gold">COA Pending</Badge>
            <Badge tone="cream">Adult use</Badge>
          </div>
          <h2 className="mt-4 font-display text-3xl font-black text-forest-900 md:text-4xl">
            CBG Gummies label facts are now structured.
          </h2>
          <p className="mt-3 leading-7 text-forest-900/72">
            The supplied label has been converted into product page details for
            serving size, CBG amount, count, net weight, ingredients,
            allergens, nutrition, storage, and suggested adult use. The current
            batch COA should be connected before this listing is opened for live
            ordering.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gummyFacts.callouts.slice(0, 6).map((callout) => (
              <div
                className="rounded-2xl border border-forest-900/10 bg-white/55 p-4"
                key={callout.label}
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-clay">
                  {callout.label}
                </p>
                <p className="mt-1 font-display text-2xl font-black text-forest-900">
                  {callout.value}
                </p>
              </div>
            ))}
          </div>
          <Link
            className="focus-ring mt-6 inline-flex rounded-full font-black text-clay underline decoration-clay/40 underline-offset-4 hover:text-forest-900"
            href="/product/funni-farm-cbg-gummies"
          >
            View CBG Gummies product page
          </Link>
        </div>
      </section>

      <JackFrostCoaFeature />

      <div className="mt-8 rounded-seed border border-forest-900/12 bg-forest-900 p-5 text-cream-50 shadow-farm">
        <div className="flex items-start gap-3">
          <FlaskConical
            aria-hidden
            className="mt-1 size-6 shrink-0 text-harvest-300"
          />
          <p className="text-sm leading-6 text-cream-100/78">
            COA files must match product names, batch numbers, and labels. The
            Jack Frost cbg_001 data below is from a plant/biomass cannabinoid
            compliance report and should not be treated as a guarantee of future
            batches, effects, or finished-product cannabinoid profile.
          </p>
        </div>
      </div>

      <section className="mt-8" aria-labelledby="product-lab-index">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-clay">
              Active product index
            </p>
            <h2
              className="mt-2 font-display text-3xl font-black text-forest-900"
              id="product-lab-index"
            >
              Product COA status
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-forest-900/72">
              Showing active products that should carry batch transparency for
              adult hemp ordering.
            </p>
          </div>
          <Link
            className="focus-ring inline-flex rounded-full bg-harvest-300 px-4 py-2.5 text-sm font-black text-forest-900 hover:bg-harvest-100"
            href="/shop"
          >
            Shop Products
          </Link>
        </div>

        {labProducts.length > 0 ? (
          <>
            <div className="mt-6 grid gap-4 lg:hidden">
              {labProducts.map((product) => (
                <ProductLabCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-6 hidden overflow-hidden rounded-seed border border-forest-900/12 bg-cream-50 shadow-soft lg:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-forest-700 text-cream-50">
                  <tr>
                    <Th>Product</Th>
                    <Th>Batch Number</Th>
                    <Th>Cannabinoid Info</Th>
                    <Th>Status</Th>
                    <Th>COA Link</Th>
                    <Th>Warnings</Th>
                  </tr>
                </thead>
                <tbody>
                  {labProducts.map((product) => (
                    <ProductLabRow key={product.id} product={product} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="mt-6 rounded-seed border border-dashed border-forest-900/20 bg-cream-50 p-6 text-forest-900/72">
            No active products currently require COA status review.
          </div>
        )}
      </section>

      <section className="mt-8 rounded-seed border border-forest-900/12 bg-cream-50 p-6 shadow-soft md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <ShieldCheck aria-hidden className="size-8 text-forest-700" />
          <div>
            <h2 className="font-display text-3xl font-black text-forest-900">
              Lab transparency note
            </h2>
            <p className="mt-3 leading-7 text-forest-900/72">
              COA links should match product name, batch number, tested date,
              and current label information. Generic links should be replaced
              with batch-specific COA files or dedicated lab-result anchors
              before live ordering.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductLabRow({ product }: { product: Product }) {
  const warnings = getLabWarnings(product);

  return (
    <tr
      className="scroll-mt-28 border-b border-forest-900/10 last:border-b-0"
      id={`product-${product.slug}`}
    >
      <Td>
        <ProductName product={product} />
      </Td>
      <Td>{getBatchStatusLabel(product)}</Td>
      <Td>{product.cannabinoidInfo || "Cannabinoid summary not listed."}</Td>
      <Td>
        <LabStatus product={product} />
      </Td>
      <Td>
        <CoaLink product={product} />
      </Td>
      <Td>
        <Warnings warnings={warnings} />
      </Td>
    </tr>
  );
}

function CoaStatusSummary({ products }: { products: Product[] }) {
  const available = products.filter(hasBatchSpecificCoa).length;
  const pending = products.filter(
    (product) => requiresCoa(product) && !hasBatchSpecificCoa(product),
  ).length;
  const batchPending = products.filter(
    (product) => requiresCoa(product) && !product.batchNumber,
  ).length;

  const cards = [
    ["COA Available", available, "Products with a linked batch-specific COA."],
    ["COA Pending", pending, "Products waiting on current batch paperwork."],
    ["Batch Pending", batchPending, "Products missing a public batch ID."],
  ] as const;

  return (
    <section
      aria-label="COA status summary"
      className="mt-8 grid gap-4 md:grid-cols-3"
    >
      {cards.map(([label, count, text]) => (
        <article
          className="seed-card rounded-seed p-5"
          key={label}
        >
          <p className="text-xs font-black uppercase tracking-[0.18em] text-clay">
            {label}
          </p>
          <p className="mt-3 font-display text-5xl font-black text-forest-900">
            {count}
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-forest-900/68">
            {text}
          </p>
        </article>
      ))}
    </section>
  );
}

function ProductLabCard({ product }: { product: Product }) {
  const warnings = getLabWarnings(product);

  return (
    <article
      className="scroll-mt-28 rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft"
      id={`product-${product.slug}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <ProductName product={product} />
        <LabStatus product={product} />
      </div>
      <div className="mt-4 grid gap-3">
        <MobileField label="Batch Number">
          {getBatchStatusLabel(product)}
        </MobileField>
        <MobileField label="Cannabinoid Info">
          {product.cannabinoidInfo || "Cannabinoid summary not listed."}
        </MobileField>
        <MobileField label="COA Link">
          <CoaLink product={product} />
        </MobileField>
        <MobileField label="Warnings">
          <Warnings warnings={warnings} />
        </MobileField>
      </div>
    </article>
  );
}

function ProductName({ product }: { product: Product }) {
  return (
    <div>
      <Link
        className="focus-ring inline-flex rounded text-base font-black text-forest-900 hover:text-clay"
        href={`/product/${product.slug}`}
      >
        {product.name}
      </Link>
      <div className="mt-2 flex flex-wrap gap-2">
        <Badge tone="purple">{product.category}</Badge>
        {hasBatchSpecificCoa(product) ? (
          <Badge tone="green">COA Available</Badge>
        ) : (
          <Badge tone="gold">COA Pending</Badge>
        )}
      </div>
    </div>
  );
}

function LabStatus({ product }: { product: Product }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-2 text-xs font-black uppercase tracking-[0.08em] ${
        hasBatchSpecificCoa(product)
          ? "border-forest-700/20 bg-forest-700 text-cream-50"
          : "border-forest-900/10 bg-cream-100 text-forest-900"
      }`}
    >
      <CheckCircle2 aria-hidden className="size-4" />
      {getCoaStatusLabel(product)}
    </span>
  );
}

function CoaLink({ product }: { product: Product }) {
  if (!product.coaUrl) {
    return <span className="font-bold text-clay">COA Pending</span>;
  }

  if (!hasBatchSpecificCoa(product)) {
    return <span className="font-bold text-clay">COA Pending</span>;
  }

  return (
    <Link
      className="focus-ring inline-flex items-center gap-2 rounded-full font-black text-clay underline decoration-clay/40 underline-offset-4 hover:text-forest-900"
      href={product.coaUrl}
    >
      <FileText aria-hidden className="size-4" />
      Open COA
      <ExternalLink aria-hidden className="size-3" />
    </Link>
  );
}

function Warnings({ warnings }: { warnings: string[] }) {
  if (warnings.length === 0) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-forest-50 px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-forest-900">
        <CheckCircle2 aria-hidden className="size-4" />
        Ready status clear
      </span>
    );
  }

  return (
    <ul className="space-y-2">
      {warnings.map((warning) => (
        <li
          className="flex gap-2 rounded-2xl border border-clay/20 bg-clay/10 p-3 text-xs font-bold leading-5 text-forest-900"
          key={warning}
        >
          <AlertTriangle
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-clay"
          />
          <span>{warning}</span>
        </li>
      ))}
    </ul>
  );
}

function MobileField({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-forest-900/10 bg-white/55 p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-clay">
        {label}
      </p>
      <div className="mt-2 text-sm leading-6 text-forest-900/74">
        {children}
      </div>
    </div>
  );
}

function getLabWarnings(product: Product) {
  const warnings: string[] = [];

  if (product.labTested && !hasBatchSpecificCoa(product)) {
    warnings.push(
      "Product record claims lab testing, but a batch-specific COA link is missing.",
    );
  }

  if (requiresCoa(product) && !hasBatchSpecificCoa(product)) {
    warnings.push("COA should be linked before this product is opened for live ordering.");
  }

  if (requiresCoa(product) && !product.batchNumber) {
    warnings.push("Batch number should be added before live ordering.");
  } else if (isPlaceholderText(product.batchNumber)) {
    warnings.push(
      "Batch number appears to need review before live ordering.",
    );
  }

  return warnings;
}

function isPlaceholderText(value: string) {
  return /placeholder|pending/i.test(value);
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-4 text-xs font-black uppercase tracking-[0.14em]">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="align-top px-4 py-5 leading-6 text-forest-900/72">{children}</td>;
}
