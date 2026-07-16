import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  ClipboardCheck,
  FileText,
  FlaskConical,
  HeartHandshake,
  Home,
  Mail,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { businessInfo } from "@/lib/brand/businessInfo";
import { farmImages } from "@/lib/brand/farmImages";
import { getProducts } from "@/lib/products/repository";
import {
  getBatchStatusLabel,
  getCoaStatusLabel,
  hasBatchSpecificCoa,
  requiresCoa,
} from "@/lib/products/status";
import type { Product } from "@/lib/products/types";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story of The Funni Farm, a family-owned Tennessee hemp farm focused on CBG education, transparency, quality, and careful order review.",
};

const valueChips = [
  ["Family Owned & Operated", Home],
  ["Tennessee Proud", BadgeCheck],
  ["Animal & Land Stewards", Sprout],
  ["Small Batches, Made with Care", HeartHandshake],
] as const;

const trustIcons = [
  ["ISO Accredited Labs", FlaskConical],
  ["Pesticide Tested", ShieldCheck],
  ["THC Compliant (<0.3%)", BadgeCheck],
  ["Heavy Metal Tested", ClipboardCheck],
  ["Solvent Tested", FileText],
] as const;

const gallery = [
  farmImages.hersheyPasture,
  farmImages.hempFieldSun,
  farmImages.hersheyCloseup,
  farmImages.gummyTraysFull,
  farmImages.hersheyFenceCard,
];

const policies: Array<{
  href: string;
  icon: LucideIcon;
  text: string;
  title: string;
}> = [
  {
    href: "/policies/shipping",
    icon: PackageCheck,
    text: "Fast, reliable US shipping",
    title: "Shipping Policy",
  },
  {
    href: "/policies/refunds",
    icon: HeartHandshake,
    text: "30-day review terms",
    title: "Returns & Refunds",
  },
  {
    href: "/policies/privacy",
    icon: ShieldCheck,
    text: "Your data is protected",
    title: "Privacy Policy",
  },
  {
    href: "/policies/terms",
    icon: FileText,
    text: "Simple, fair, transparent",
    title: "Terms of Service",
  },
  {
    href: "/policies/quality-guarantee",
    icon: BadgeCheck,
    text: "Not happy? We'll make it right",
    title: "Quality Promise",
  },
];

const faqs = [
  [
    "Is CBG legal?",
    "Hemp-derived products are reviewed against applicable federal and state requirements before fulfillment.",
  ],
  [
    "Will CBG make me feel high?",
    "The Funni Farm focuses on non-intoxicating hemp products with clear labels and COA transparency.",
  ],
  [
    "How should I take CBG?",
    "Use only as directed on the final product label and follow age, storage, and safe-use guidance.",
  ],
  [
    "Where are lab results?",
    "Visit the Lab Results page to review current COA status and available batch information.",
  ],
];

export default async function AboutPage() {
  const products = await getProducts();
  const labProducts = products.filter((product) => product.isActive && requiresCoa(product));

  return (
    <div>
      <section className="relative overflow-hidden border-b border-forest-900/10 bg-cream-50">
        <div className="absolute inset-0">
          <Image
            alt={farmImages.hersheyFenceWide.alt}
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src={farmImages.hersheyFenceWide.src}
          />
          <div className="absolute inset-0 image-scrim-strong" />
        </div>
        <div className="relative mx-auto grid min-h-[520px] max-w-7xl gap-8 px-4 py-12 text-cream-50 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8">
          <div className="flex flex-col justify-end">
            <div className="image-copy-panel text-shadow-readable w-fit p-4">
              <p className="font-display text-2xl italic">Hi, I&apos;m Hershey!</p>
            </div>
          </div>
          <div className="image-copy-panel text-shadow-readable flex flex-col justify-center p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-harvest-300">
              Our story. Our values. Our promise.
            </p>
            <h1 className="mt-3 font-display text-5xl font-black leading-tight md:text-6xl">
              From Our Family to Your Family
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-cream-100/84">
              We&apos;re a small Tennessee family farm creating clean, honest
              CBG products you can feel good about reviewing before you order.
            </p>
            <div className="mt-7">
              <ButtonLink href="#farm-gallery" variant="secondary">
                Meet Our Farm
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[.85fr_1fr_.75fr] lg:px-8">
        <div className="relative min-h-[20rem] overflow-hidden rounded-seed border border-forest-900/12 bg-cream-50 shadow-soft">
          <Image
            alt={farmImages.hersheyFenceSun.alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            src={farmImages.hersheyFenceSun.src}
          />
        </div>
        <div className="rounded-seed border border-forest-900/12 bg-cream-50 p-6 shadow-soft">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-clay">
            Our Story
          </p>
          <h2 className="mt-2 font-display text-4xl font-black text-forest-900">
            Roots in Tennessee. Values in Everything We Do.
          </h2>
          <p className="mt-4 leading-7 text-forest-900/72">
            The Funni Farm began as a family dream in October 2012. In 2020,
            the farm moved from livestock roots into hemp wellness while
            carrying forward the same care for land, animals, family, and
            honest work.
          </p>
          <p className="mt-3 leading-7 text-forest-900/72">
            Today, our focus is small-batch quality, plain product information,
            third-party testing where available, and manual order review before
            fulfillment.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {valueChips.map(([label, Icon]) => (
              <div
                className="glass-card flex items-center gap-3 rounded-2xl p-3"
                key={label}
              >
                <Icon aria-hidden className="size-5 text-clay" />
                <span className="text-sm font-black text-forest-900">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-seed border border-forest-900/12 bg-cream-50 p-6 shadow-soft">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-clay">
            What is CBG?
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-forest-900">
            The Gentle Compound from Hemp.
          </h2>
          <p className="mt-4 text-sm font-semibold leading-6 text-forest-900/72">
            CBG is a naturally occurring cannabinoid found in the hemp plant.
            The Funni Farm focuses on non-intoxicating, CBG-rich products with
            clear labels, batch transparency, and third-party testing.
          </p>
          <ul className="mt-5 space-y-2 text-sm font-bold text-forest-900/72">
            <li>✓ Non-intoxicating</li>
            <li>✓ Hemp-derived</li>
            <li>✓ Naturally occurring</li>
          </ul>
        </div>
      </section>

      <section className="border-y border-forest-900/10 bg-cream-100/70 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[.7fr_1.3fr_.55fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-clay">
              Lab Transparency
            </p>
            <h2 className="mt-2 font-display text-4xl font-black text-forest-900">
              Third-Party Tested. Always.
            </h2>
            <p className="mt-3 leading-7 text-forest-900/72">
              We test every batch for purity, potency, and peace of mind as
              records become available.
            </p>
            <div className="mt-5">
              <ButtonLink href="/lab-results">View Lab Process</ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {labProducts.slice(0, 3).map((product) => (
              <BatchCard key={product.id} product={product} />
            ))}
          </div>
          <div className="rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-clay">
              Trace Your Batch
            </p>
            <p className="mt-3 text-sm font-semibold leading-6 text-forest-900/70">
              Enter your batch number from the bottle to view lab results.
            </p>
            <form className="mt-4 grid gap-2">
              <label className="sr-only" htmlFor="batch">
                Batch number
              </label>
              <input
                className="focus-ring min-h-11 rounded-full border border-forest-900/15 bg-white px-4 text-sm font-bold text-forest-900"
                id="batch"
                name="batch"
                placeholder="e.g., GUM-MB"
              />
              <ButtonLink href="/lab-results">Look Up</ButtonLink>
            </form>
          </div>
        </div>
        <div className="mx-auto mt-6 flex max-w-7xl flex-wrap justify-center gap-3 px-4 sm:px-6 lg:px-8">
          {trustIcons.map(([label, Icon]) => (
            <span
              className="inline-flex items-center gap-2 rounded-full border border-forest-900/10 bg-cream-50 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-forest-900 shadow-soft"
              key={label}
            >
              <Icon aria-hidden className="size-4 text-clay" />
              {label}
            </span>
          ))}
        </div>
      </section>

      <section
        className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:grid-cols-[.5fr_1.5fr] lg:px-8"
        id="farm-gallery"
      >
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-clay">
            Life on the Farm
          </p>
          <h2 className="mt-2 font-display text-4xl font-black text-forest-900">
            Where It All Comes From.
          </h2>
          <p className="mt-3 leading-7 text-forest-900/72">
            We&apos;re proud of our little slice of Tennessee and the animals,
            plants, and working days that keep it full of life.
          </p>
          <div className="mt-5">
            <ButtonLink href="/contact" variant="secondary">
              Visit Our Farm
            </ButtonLink>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-5">
          {gallery.map((image) => (
            <div
              className="relative min-h-[12rem] overflow-hidden rounded-seed border border-forest-900/12 bg-cream-50 shadow-soft sm:min-h-0 sm:aspect-[4/5]"
              key={image.src}
            >
              <Image
                alt={image.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 18vw, 50vw"
                src={image.src}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-forest-900/10 bg-cream-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-clay">
            Trust & Policy Center
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-forest-900">
            Your Confidence Matters.
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {policies.map(({ href, icon: Icon, text, title }) => (
              <Link
                className="glass-card rounded-seed p-4 transition hover:-translate-y-1 hover:shadow-farm"
                href={href}
                key={title}
              >
                <Icon aria-hidden className="size-6 text-clay" />
                <h3 className="mt-3 font-black text-forest-900">{title}</h3>
                <p className="mt-1 text-sm font-semibold leading-6 text-forest-900/66">
                  {text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[.45fr_1.55fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-clay">
              Frequently Asked Questions
            </p>
            <h2 className="mt-2 font-display text-3xl font-black text-forest-900">
              We&apos;re Here to Help.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <details
                className="rounded-2xl border border-forest-900/12 bg-cream-50 p-4 shadow-soft"
                key={question}
              >
                <summary className="cursor-pointer font-black text-forest-900">
                  {question}
                </summary>
                <p className="mt-3 text-sm font-semibold leading-6 text-forest-900/70">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-100/80 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_auto_auto_auto_auto] lg:items-center lg:px-8">
          <div>
            <h2 className="font-display text-4xl font-black text-forest-900">
              Have Questions? Let&apos;s Chat.
            </h2>
            <p className="mt-2 leading-7 text-forest-900/70">
              We&apos;re a real family, on a real farm, and we truly care.
            </p>
          </div>
          <ContactPoint icon={Mail} label="Email Us" value={businessInfo.email} />
          <ContactPoint icon={MapPin} label="Visit the Farm" value={businessInfo.addressInline} />
          <ButtonLink href="/contact">Send Us a Message</ButtonLink>
        </div>
      </section>
    </div>
  );
}

function BatchCard({ product }: { product: Product }) {
  const hasCoa = hasBatchSpecificCoa(product);

  return (
    <article className="rounded-seed border border-forest-900/12 bg-cream-50 p-4 shadow-soft">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-clay">
        {getBatchStatusLabel(product)}
      </p>
      <h3 className="mt-2 font-display text-xl font-black text-forest-900">
        {product.name}
      </h3>
      <p className="mt-2 text-sm font-bold text-forest-900/66">
        {getCoaStatusLabel(product)}
      </p>
      <p className="mt-3 font-display text-2xl font-black text-forest-900">
        {product.tags.includes("CBG") ? "CBG" : product.category}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <Link
          className="focus-ring rounded-full text-xs font-black uppercase text-clay underline decoration-clay/35 underline-offset-4"
          href={hasCoa ? product.coaUrl : "/lab-results"}
        >
          View COA PDF
        </Link>
        <span className="inline-flex items-center gap-1 font-black text-forest-700">
          <BadgeCheck aria-hidden className="size-5" />
          {hasCoa ? "Pass" : "Review"}
        </span>
      </div>
    </article>
  );
}

function ContactPoint({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon aria-hidden className="size-6 text-clay" />
      <div>
        <p className="text-xs font-black uppercase tracking-[0.14em] text-forest-900/68">
          {label}
        </p>
        <p className="font-black text-forest-900">{value}</p>
      </div>
    </div>
  );
}
