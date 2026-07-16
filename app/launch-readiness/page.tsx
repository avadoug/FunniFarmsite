import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Database,
  MailCheck,
  PackageSearch,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  auditProductsForLaunch,
  globalLaunchNeeds,
  type ProductReadinessReport,
} from "@/lib/launch/readiness";
import { getProducts } from "@/lib/products/repository";
import {
  getBatchStatusLabel,
  getCoaStatusLabel,
  getProductStatusBadges,
} from "@/lib/products/status";
import { formatMoney } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Launch Readiness Checklist",
  description:
    "Internal Funni Farm launch readiness checklist for products, operations, compliance, and missing business information.",
  robots: {
    follow: false,
    index: false,
  },
};

export default async function LaunchReadinessPage() {
  const products = await getProducts({ includeInactive: true });
  const reports = auditProductsForLaunch(products);
  const readyReports = reports.filter((report) => report.status === "ready");
  const notReadyReports = reports.filter(
    (report) => report.status === "not-ready",
  );
  const activeNotReadyReports = notReadyReports.filter(
    (report) => report.product.isActive,
  );
  const neededFromFunniFarm = getNeededFromFunniFarm(reports);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_.82fr] lg:items-start">
        <SectionHeading
          eyebrow="Internal launch checklist"
          title="Funni Farm Launch Readiness"
        >
          <p>
            This page audits the current storefront data and marks each product
            as ready or not ready for live sales. It is intentionally noindexed
            and is not linked from the customer navigation.
          </p>
        </SectionHeading>

        <div className="rounded-seed border border-forest-900/12 bg-forest-900 p-5 text-cream-50 shadow-farm">
          <ShieldCheck aria-hidden className="size-7 text-harvest-300" />
          <h2 className="mt-3 font-display text-3xl font-black">
            Overall status: not ready for live orders
          </h2>
          <p className="mt-3 text-sm leading-6 text-cream-100/76">
            The site can deploy as a Vercel demo, but live ordering should wait
            until product data, COAs, email handling, shipping rules, policies,
            and admin/database operations are finished.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge tone="gold">{products.length} products audited</Badge>
            <Badge tone="green">{readyReports.length} ready</Badge>
            <span className="inline-flex items-center rounded-full border border-clay/30 bg-clay px-2.5 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-cream-50">
              {notReadyReports.length} not ready
            </span>
          </div>
        </div>
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={PackageSearch}
          label="Product catalog"
          value={`${readyReports.length}/${products.length}`}
          text="Products ready for live sales based on current catalog data."
        />
        <MetricCard
          icon={AlertTriangle}
          label="Active blockers"
          value={String(activeNotReadyReports.length)}
          text="Active products still visible in the catalog with unresolved launch gaps."
        />
        <MetricCard
          icon={MailCheck}
          label="Order email"
          value="Needed"
          text="Configure production order request email before accepting live orders."
        />
        <MetricCard
          icon={Database}
          label="Admin database"
          value="Needed"
          text="Local JSON writes are development scaffolding only."
        />
      </section>

      <section className="mt-12 rounded-seed border border-harvest-700/30 bg-harvest-300 p-6 text-forest-900 shadow-soft md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em]">
              Needed from Funni Farm
            </p>
            <h2 className="mt-2 font-display text-4xl font-black">
              Information still required before launch
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-forest-900/76">
              These are the missing business, product, compliance, and
              operations details that keep the current storefront from being
              fully live-order ready.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {neededFromFunniFarm.map((item) => (
            <div
              className="rounded-2xl border border-forest-900/10 bg-cream-50/80 p-4 text-sm font-bold leading-6"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-clay">
              Product readiness
            </p>
            <h2 className="mt-2 font-display text-4xl font-black text-forest-900">
              Ready / Not Ready by Product
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-forest-900/68">
            A product is marked ready only when it has final photos, final label
            data, current batch details, product-specific COA support, inventory,
            and final shipping/compliance language.
          </p>
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-2">
          {reports.map((report) => (
            <ProductReadinessCard key={report.product.id} report={report} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          eyebrow="Operations checklist"
          title="Sitewide launch requirements"
        >
          <p>
            Product pages are only one part of launch readiness. These global
            items need to be completed before the storefront accepts real order
            requests.
          </p>
        </SectionHeading>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {globalLaunchNeeds.map((group) => (
            <article
              className="seed-card rounded-seed p-5"
              key={group.title}
            >
              <ClipboardList aria-hidden className="size-7 text-forest-700" />
              <h3 className="mt-4 font-display text-2xl font-black text-forest-900">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-forest-900/72">
                {group.items.map((item) => (
                  <li className="flex gap-2" key={item}>
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  text,
  value,
}: {
  icon: typeof PackageSearch;
  label: string;
  text: string;
  value: string;
}) {
  return (
    <article className="seed-card rounded-seed p-5">
      <Icon aria-hidden className="size-7 text-forest-700" />
      <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-clay">
        {label}
      </p>
      <p className="mt-2 font-display text-4xl font-black text-forest-900">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-forest-900/68">{text}</p>
    </article>
  );
}

function ProductReadinessCard({
  report,
}: {
  report: ProductReadinessReport;
}) {
  const { product } = report;
  const ready = report.status === "ready";

  return (
    <article className="seed-card rounded-seed p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {ready ? (
              <Badge tone="green">
                <CheckCircle2 aria-hidden className="mr-1 size-4" />
                Ready
              </Badge>
            ) : (
              <span className="inline-flex items-center rounded-full border border-clay/30 bg-clay px-2.5 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-cream-50">
                <XCircle aria-hidden className="mr-1 size-4" />
                Not Ready
              </span>
            )}
            <Badge tone="cream">{product.category}</Badge>
            {product.isActive ? (
              <Badge tone="gold">Active</Badge>
            ) : (
              <Badge tone="dark">Inactive</Badge>
            )}
          </div>
          <h3 className="mt-3 font-display text-3xl font-black text-forest-900">
            {product.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-forest-900/70">
            {product.shortDescription}
          </p>
        </div>
        <div className="shrink-0 rounded-2xl border border-forest-900/10 bg-cream-100 px-4 py-3 text-right">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-clay">
            Score
          </p>
          <p className="font-display text-3xl font-black text-forest-900">
            {report.score}%
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
        <Fact label="Price" value={formatMoney(product.price)} />
        <Fact label="Inventory" value={String(product.inventory)} />
        <Fact label="Batch" value={getBatchStatusLabel(product)} />
        <Fact label="COA" value={getCoaStatusLabel(product)} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {getProductStatusBadges(product).map((badge) => (
          <Badge key={badge.label} tone={badge.tone}>
            {badge.label}
          </Badge>
        ))}
      </div>

      {report.blockers.length > 0 ? (
        <div className="mt-5 rounded-2xl border border-clay/20 bg-clay/8 p-4">
          <p className="font-black text-clay">Why it is not ready</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-forest-900/72">
            {report.blockers.map((blocker) => (
              <li className="flex gap-2" key={blocker}>
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
                <span>{blocker}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-forest-700/15 bg-forest-700/8 p-4 text-sm font-bold leading-6 text-forest-900/72">
          This product has no automated launch blockers. Still confirm final
          legal, label, COA, and shipping review before accepting orders.
        </div>
      )}

      <div className="mt-5 rounded-2xl border border-forest-900/10 bg-white/55 p-4">
        <p className="font-black text-forest-900">
          Needed from Funni Farm
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-forest-900/72">
          {report.neededFromFunniFarm.map((item) => (
            <li className="flex gap-2" key={item}>
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-harvest-700" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {report.notes.length > 0 ? (
        <div className="mt-4 text-sm leading-6 text-forest-900/62">
          {report.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          className="focus-ring inline-flex rounded-full font-black text-clay underline decoration-clay/35 underline-offset-4 hover:text-forest-900"
          href={`/product/${product.slug}`}
        >
          View product page
        </Link>
      </div>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-forest-900/10 bg-white/55 p-3">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-clay">
        {label}
      </p>
      <p className="mt-1 font-bold text-forest-900">{value}</p>
    </div>
  );
}

function getNeededFromFunniFarm(reports: ProductReadinessReport[]) {
  const items = new Set<string>();

  reports.forEach((report) => {
    report.neededFromFunniFarm.forEach((item) => items.add(item));
  });

  [
    "Final live website domain.",
    "Production order email setup and tested order-request delivery.",
    "Production contact form handling.",
    "Real database and proper admin authentication.",
    "Legal shipping states by product type.",
    "Final legal/compliance review for policies, product copy, labels, checkout, and payment flow.",
  ].forEach((item) => items.add(item));

  return Array.from(items).sort((left, right) => left.localeCompare(right));
}
