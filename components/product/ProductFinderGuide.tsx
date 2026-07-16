import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  FlaskConical,
  Leaf,
  PackageCheck,
  SearchCheck,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ProductPrice, SoldOutStamp } from "./ProductPrice";
import {
  getCoaStatusLabel,
  getProductStatusBadges,
  hasBatchSpecificCoa,
  isAvailableNow,
  isSoldOut,
} from "@/lib/products/status";
import type { Product } from "@/lib/products/types";

type ProductPath = {
  companion?: Product;
  details: string[];
  eyebrow: string;
  fit: string;
  icon: LucideIcon;
  product: Product;
  title: string;
};

export function ProductFinderGuide({ products }: { products: Product[] }) {
  const paths = buildProductPaths(products);
  const decisions = buildDecisionRows(products);
  const availableCount = products.filter(isAvailableNow).length;
  const coaCount = products.filter(hasBatchSpecificCoa).length;

  return (
    <div className="space-y-12">
      <section className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-seed border border-forest-900/12 bg-forest-900 p-6 text-cream-50 shadow-farm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-harvest-300">
            Product Finder
          </p>
          <h2 className="mt-3 font-display text-4xl font-black leading-tight md:text-5xl">
            Pick by format, label clarity, and order readiness.
          </h2>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-cream-100/78">
            Use this guide to compare what each product actually is, what it is
            best suited for, and what still needs review before fulfillment.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <StatCard label="Available now" value={availableCount.toString()} />
            <StatCard label="COA-linked" value={coaCount.toString()} />
            <StatCard label="Manual review" value="Every order" />
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#format-guide" variant="secondary">
              Compare Formats
            </ButtonLink>
            <ButtonLink href="/shop" variant="dark">
              Browse Shop
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-harvest-300 text-forest-900">
              <SearchCheck aria-hidden className="size-5" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-clay">
                Start here
              </p>
              <h3 className="font-display text-2xl font-black text-forest-900">
                Common ways people decide
              </h3>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {decisions.map((decision) => (
              <Link
                className="focus-ring glass-card group grid gap-3 rounded-2xl p-4 transition hover:border-forest-700/35 hover:bg-cream-50/96 sm:grid-cols-[1fr_auto] sm:items-center"
                href={decision.href}
                key={decision.need}
              >
                <div>
                  <p className="font-black text-forest-900">{decision.need}</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-forest-900/65">
                    {decision.answer}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-black text-clay group-hover:text-forest-900">
                  View
                  <ArrowRight aria-hidden className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="format-guide-title" id="format-guide">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
              Format guide
            </p>
            <h2
              className="mt-2 font-display text-3xl font-black text-forest-900 md:text-5xl"
              id="format-guide-title"
            >
              Choose the product type that makes sense.
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-forest-900/72">
              Each card points to a real product page with photos, label notes,
              availability, shipping review, and COA status where available.
            </p>
          </div>
          <ButtonLink href="/lab-results" variant="ghost">
            View Lab Status
          </ButtonLink>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {paths.map((path) => (
            <ProductPathCard key={path.title} path={path} />
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <ReadinessCard
          icon={ClipboardCheck}
          title="Order Review"
          text="Availability, shipping rules, age requirements, and final product records are checked before payment instructions are sent."
        />
        <ReadinessCard
          icon={FlaskConical}
          title="Lab Status"
          text="Products that require COAs show whether a matching batch record is available or still pending."
        />
        <ReadinessCard
          icon={ShieldCheck}
          title="Responsible Language"
          text="Product guidance is about format and shopping preference only, not medical advice or health promises."
        />
      </section>
    </div>
  );
}

function ProductPathCard({ path }: { path: ProductPath }) {
  const Icon = path.icon;
  const statusBadges = getProductStatusBadges(path.product).slice(0, 2);
  const soldOut = isSoldOut(path.product);

  return (
    <article className="seed-card flex h-full flex-col overflow-hidden rounded-seed">
      <div className="relative aspect-[4/3] border-b border-forest-900/10 bg-white">
        <Image
          alt={path.product.name}
          className="object-contain p-4"
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={path.product.image}
        />
        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-2">
          {statusBadges.map((badge) => (
            <Badge key={badge.label} tone={badge.tone}>
              {badge.label}
            </Badge>
          ))}
        </div>
        {soldOut && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-cream-50/12 backdrop-blur-[1px]">
            <SoldOutStamp size="lg" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-forest-900/10 bg-harvest-300/45 text-forest-900">
            <Icon aria-hidden className="size-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-clay">
              {path.eyebrow}
            </p>
            <h3 className="mt-1 font-display text-2xl font-black leading-tight text-forest-900">
              {path.title}
            </h3>
          </div>
        </div>

        <p className="mt-4 text-sm font-semibold leading-6 text-forest-900/70">
          {path.fit}
        </p>

        <ul className="mt-4 space-y-2 text-sm font-semibold leading-6 text-forest-900/68">
          {path.details.map((detail) => (
            <li className="flex gap-2" key={detail}>
              <PackageCheck
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-forest-700"
              />
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        {path.companion && (
          <Link
            className="focus-ring mt-4 grid grid-cols-[64px_1fr] gap-3 rounded-2xl border border-forest-900/10 bg-white/55 p-3 transition hover:border-forest-700/35"
            href={`/product/${path.companion.slug}`}
          >
            <span className="relative aspect-square overflow-hidden rounded-xl bg-cream-100">
              <Image
                alt={path.companion.name}
                className="object-contain p-1.5"
                fill
                sizes="64px"
                src={path.companion.image}
              />
            </span>
            <span>
              <span className="block text-xs font-black uppercase tracking-[0.14em] text-clay">
                Also compare
              </span>
              <span className="mt-1 block text-sm font-black leading-5 text-forest-900">
                {path.companion.name}
              </span>
            </span>
          </Link>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-forest-900/10 pt-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-clay">
              {soldOut ? "Status" : "From"}
            </p>
            <ProductPrice product={path.product} />
          </div>
          <ButtonLink href={`/product/${path.product.slug}`} size="sm">
            View Details
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cream-50/18 bg-cream-50/14 p-4 shadow-[inset_0_1px_0_rgba(255,250,240,0.08)]">
      <p className="font-display text-3xl font-black text-harvest-300">
        {value}
      </p>
      <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-cream-100/70">
        {label}
      </p>
    </div>
  );
}

function ReadinessCard({
  icon: Icon,
  text,
  title,
}: {
  icon: LucideIcon;
  text: string;
  title: string;
}) {
  return (
    <article className="rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft">
      <Icon aria-hidden className="size-7 text-forest-700" />
      <h3 className="mt-3 font-display text-2xl font-black text-forest-900">
        {title}
      </h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-forest-900/70">
        {text}
      </p>
    </article>
  );
}

function buildProductPaths(products: Product[]): ProductPath[] {
  const gummies = findBySlug(products, "funni-farm-cbg-gummies");
  const mega = findBySlug(products, "mega-cbg-gummy-bear");
  const oil = findBySlug(products, "funni-farm-cbg-oil");
  const capsules =
    findBySlug(products, "funni-farm-cbg-capsules") ??
    products.find((product) => product.category === "Capsules");
  const flower =
    findBySlug(products, "cbg-hemp-flower") ??
    products.find((product) => product.category === "Hemp Flower");
  const seeds =
    findBySlug(products, "hemp-seed-pack") ??
    products.find((product) => product.category === "Seeds");

  return [
    gummies && {
      companion: mega,
      details: [
        "Familiar edible format",
        "Label-backed serving details",
        "Small-batch gummy photos and compliance notes",
      ],
      eyebrow: "Gummies",
      fit: "Best when someone wants the easiest product type to understand and compare.",
      icon: Leaf,
      product: gummies,
      title: "Start with gummies",
    },
    oil && {
      details: [
        "Bottle/dropper format",
        "Flexible routine once final label directions are confirmed",
        "Real tincture photo on the product page",
      ],
      eyebrow: "Oil tincture",
      fit: "Best for shoppers who want a bottle format and are comfortable checking label directions.",
      icon: Sprout,
      product: oil,
      title: "Choose a tincture",
    },
    capsules && {
      details: [
        "Measured capsule format",
        "Good for people who dislike gummy texture",
        "Final label and batch records reviewed before fulfillment",
      ],
      eyebrow: "Capsules",
      fit: "Best for a simple, measured product format without an edible gummy style.",
      icon: PackageCheck,
      product: capsules,
      title: "Keep it measured",
    },
    flower && {
      details: [
        "Plant-forward hemp listing",
        `${getCoaStatusLabel(flower)} status`,
        "Extra shipping and compliance review",
      ],
      eyebrow: "Hemp flower",
      fit: "Best for shoppers who specifically want a plant-forward hemp flower product.",
      icon: FlaskConical,
      product: flower,
      title: "Review the lab-linked flower",
    },
    seeds && {
      details: [
        "Pantry seed product",
        "No consumable cannabinoid claims",
        "Seed legality and shipping are reviewed",
      ],
      eyebrow: "Seeds",
      fit: "Best when the shopper wants hemp seeds rather than a CBG serving product.",
      icon: Sprout,
      product: seeds,
      title: "Shop the seed option",
    },
  ].filter((path): path is ProductPath => Boolean(path));
}

function buildDecisionRows(products: Product[]) {
  const gummies = findBySlug(products, "funni-farm-cbg-gummies");
  const oil = findBySlug(products, "funni-farm-cbg-oil");
  const flower = findBySlug(products, "cbg-hemp-flower");

  return [
    gummies && {
      answer: `${gummies.name} is the clearest edible starting point.`,
      href: `/product/${gummies.slug}`,
      need: "I want the easiest format to understand",
    },
    oil && {
      answer: `${oil.name} is the bottle/dropper option with the real product photo.`,
      href: `/product/${oil.slug}`,
      need: "I want a tincture bottle",
    },
    flower && {
      answer: `${flower.name} has the strongest lab-record context on the site.`,
      href: `/product/${flower.slug}`,
      need: "I care most about lab details",
    },
  ].filter(
    (decision): decision is { answer: string; href: string; need: string } =>
      Boolean(decision),
  );
}

function findBySlug(products: Product[], slug: string) {
  return products.find((product) => product.slug === slug);
}
