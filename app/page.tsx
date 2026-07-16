import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  FlaskConical,
  Heart,
  HelpCircle,
  Mail,
  PackageCheck,
  SearchCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  SunMedium,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TrustBar } from "@/components/brand/TrustBar";
import { CbgProductFinderQuiz } from "@/components/home/CbgProductFinderQuiz";
import { ProductCard } from "@/components/product/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { farmImages } from "@/lib/brand/farmImages";
import { getProducts } from "@/lib/products/repository";
import {
  getBatchStatusLabel,
  getCoaStatusLabel,
  hasBatchSpecificCoa,
  requiresCoa,
} from "@/lib/products/status";
import type { Product } from "@/lib/products/types";

const bestSellerSlugs = [
  "funni-farm-cbg-gummies",
  "funni-farm-cbg-oil",
  "mega-cbg-gummy-bear",
  "funni-farm-cbg-capsules",
  "hemp-seed-pack",
];

const heroProducts = [
  {
    label: "CBG Gummies Mixed Fruit Flavors",
    image: "/images/products/funni-farm-cbg-gummies-front-logo.webp",
    note: "Label-backed serving notes",
  },
  {
    label: "CBG Oil Tincture",
    image: "/images/products/funni-farm-cbg-oil-tincture.jpg",
    note: "Bottle format, clear routine",
  },
  {
    label: "CBG Capsules",
    image: "/images/products/funni-farm-cbg-capsules-bowl-card.webp",
    note: "Measured, no-fuss format",
  },
];

const heroTrust = [
  { icon: FlaskConical, label: "COA visibility" },
  { icon: ShieldCheck, label: "THC compliance review" },
  { icon: ClipboardCheck, label: "Manual order review" },
];

const cbgFacts = [
  {
    icon: Sprout,
    title: "The mother cannabinoid",
    text: "CBG is often called the mother cannabinoid because it is a precursor the hemp plant uses to create other cannabinoids.",
  },
  {
    icon: SunMedium,
    title: "Non-intoxicating",
    text: "CBG is commonly positioned as a non-intoxicating cannabinoid. Always review the label and COA before use.",
  },
  {
    icon: SearchCheck,
    title: "Chosen for clarity",
    text: "Many shoppers choose CBG when they want clear, functional cannabinoid support without heavy fog or hype.",
  },
  {
    icon: Heart,
    title: "Personal response varies",
    text: "Body chemistry, serving size, product type, timing, and experience can all affect how hemp products feel.",
  },
];

const cannabinoidComparison = [
  {
    name: "CBG",
    role: "Often called a precursor cannabinoid",
    feel: "Commonly chosen for clear, functional routines",
    note: "Non-intoxicating; effects vary by person",
  },
  {
    name: "CBD",
    role: "Well-known non-intoxicating cannabinoid",
    feel: "Often chosen for everyday balance routines",
    note: "Response varies; not medical advice",
  },
  {
    name: "THC",
    role: "Intoxicating cannabinoid in higher amounts",
    feel: "Can produce a high depending on amount and product",
    note: "Funni Farm CBG products are positioned for hemp compliance review",
  },
];

const orderSteps = [
  {
    icon: ShoppingBag,
    title: "Choose Your Products",
    text: "Browse best sellers, compare formats, or use the product finder.",
  },
  {
    icon: ClipboardCheck,
    title: "Review Your Order",
    text: "Check cart quantities, shipping details, and adult-use notes.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Check",
    text: "The farm reviews age requirements, COA status, shipping rules, and availability.",
  },
  {
    icon: Truck,
    title: "Packed With Care",
    text: "Approved requests receive next-step payment and fulfillment instructions.",
  },
];

const trustPillars = [
  {
    icon: FlaskConical,
    title: "Batch-tested products",
    text: "Hemp products that require transparency should be connected to current Certificates of Analysis before live fulfillment.",
  },
  {
    icon: CheckCircle2,
    title: "Potency verified",
    text: "CBG, CBGA, CBD, Delta-9 THC, and total THC values should be checked against the matching batch record.",
  },
  {
    icon: ShieldCheck,
    title: "THC compliance checked",
    text: "Compliance review focuses on current labels, destination rules, cannabinoid records, and age requirements.",
  },
  {
    icon: PackageCheck,
    title: "Clean-label review",
    text: "Ingredients, allergens, storage, serving language, and product warnings are kept visible for customer clarity.",
  },
];

const useGuides = [
  {
    title: "Tinctures",
    text: "Use only as directed on the final bottle label. Many people like tinctures for flexible, measured routines.",
  },
  {
    title: "Gummies",
    text: "Start with the labeled serving. Give edibles time before considering more, and keep them secured from children.",
  },
  {
    title: "Flower",
    text: "Review the COA, batch ID, and destination restrictions. Flower may have extra shipping and compliance review.",
  },
  {
    title: "Capsules",
    text: "Capsules are a simple measured format. Confirm serving details and ingredients on the final label.",
  },
  {
    title: "Topicals",
    text: "Use on skin only if the label supports that use. Avoid broken skin and review ingredients for sensitivities.",
  },
];

const buyerGuidePaths = [
  {
    icon: Sparkles,
    label: "First-time CBG",
    title: "Start familiar",
    text: "Gummies are a simple first stop because the format is easy to understand and serving notes are visible.",
    href: "/product/funni-farm-cbg-gummies",
    cta: "View gummies",
  },
  {
    icon: SunMedium,
    label: "Daytime option",
    title: "Keep it functional",
    text: "Tinctures and capsules are commonly chosen by shoppers who want a measured routine they can review by label.",
    href: "/product-finder",
    cta: "Compare formats",
  },
  {
    icon: SearchCheck,
    label: "Stronger option",
    title: "Review serving carefully",
    text: "Larger-format products need extra label attention. Start low and follow the final product directions.",
    href: "/product/mega-cbg-gummy-bear",
    cta: "View stronger option",
  },
  {
    icon: Heart,
    label: "Targeted format",
    title: "Topicals are category-first",
    text: "If you prefer a topical-style product, check category availability or contact the farm before ordering.",
    href: "/shop?category=Topicals",
    cta: "Check topicals",
  },
  {
    icon: FlaskConical,
    label: "No-THC preference",
    title: "Verify by COA",
    text: "No product should be treated as THC-free unless the matching lab record supports that exact claim.",
    href: "/lab-results",
    cta: "View COAs",
  },
] as const;

// Demo content until verified customer reviews are imported.
const reviewThemes = [
  {
    tag: "Clear-headed",
    text: "CBG without the fog machine. Product copy should stay focused on functional routines, not promises.",
  },
  {
    tag: "Daytime-friendly",
    text: "Clean plant support for people with things to do, with effects that may differ from person to person.",
  },
  {
    tag: "Smooth",
    text: "No mystery oil. No cartoon claims. Just batch-tested CBG with a clear purpose.",
  },
];

const homepageFaqs = [
  {
    question: "What is CBG?",
    answer:
      "CBG is a naturally occurring cannabinoid in hemp. It is often called the mother cannabinoid because the plant uses CBGA as a precursor to several other cannabinoids.",
  },
  {
    question: "Will CBG get me high?",
    answer:
      "CBG is commonly positioned as non-intoxicating. Product effects can still vary by person, serving size, product type, and individual body chemistry.",
  },
  {
    question: "How is CBG different from CBD?",
    answer:
      "CBG and CBD are both non-intoxicating cannabinoids found in hemp, but they appear in the plant differently and are often chosen for different routine preferences.",
  },
  {
    question: "How much CBG should I take?",
    answer:
      "Use only as directed on the product label. Start low, pay attention to how your body responds, and increase gradually only if needed.",
  },
  {
    question: "Are your products lab tested?",
    answer:
      "Products that require batch transparency should have matching lab records. Available COAs and pending statuses are shown on the Lab Results page.",
  },
  {
    question: "Is this legal in my state?",
    answer:
      "Hemp product rules vary by state and product type. The farm reviews destination eligibility before fulfillment, and customers are responsible for local compliance.",
  },
];

export default async function HomePage() {
  const products = await getProducts();
  const bestSellers = orderProducts(products, bestSellerSlugs);
  const labProducts = products
    .filter((product) => product.isActive && requiresCoa(product))
    .slice(0, 6);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-forest-900/10 bg-cream-50">
        <div className="absolute inset-0">
          <Image
            alt={farmImages.hersheyFenceWide.alt}
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            src={farmImages.hersheyFenceWide.src}
          />
          <div className="absolute inset-0 bg-cream-50/88 md:bg-cream-50/72" />
          <div className="absolute inset-0 bg-gradient-to-b from-cream-50/96 via-cream-50/66 to-cream-50 lg:bg-gradient-to-r lg:from-cream-50/96 lg:via-cream-50/78 lg:to-forest-900/24" />
        </div>

        <div className="relative mx-auto grid min-h-[720px] max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:px-8">
          <div className="hero-copy-panel flex flex-col justify-center self-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-clay">
              Premium craft CBG from a real family farm
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-black leading-[0.95] text-forest-900 sm:text-6xl lg:text-7xl">
              Clean CBG for Clearer Days.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-forest-900/78">
              Funnifarms crafts CBG products for people who want plant-based
              support without heavy fog, hype, or mystery ingredients.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/shop" size="lg">
                <ShoppingBag aria-hidden className="size-5" />
                Shop CBG Products
              </ButtonLink>
              <ButtonLink href="#what-is-cbg" size="lg" variant="secondary">
                <Sparkles aria-hidden className="size-5" />
                Learn About CBG
              </ButtonLink>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroTrust.map((item) => (
                <TrustChip icon={item.icon} key={item.label} label={item.label} />
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="glass-card w-full rounded-[2rem] p-4 md:p-5">
              <div className="grid gap-3 md:grid-cols-[1fr_.68fr]">
                <div className="relative min-h-[19rem] overflow-hidden rounded-[1.5rem] bg-forest-900">
                  <Image
                    alt={farmImages.hempFieldSun.alt}
                    className="object-cover"
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    src={farmImages.hempFieldSun.src}
                  />
                  <div className="absolute inset-0 image-scrim-strong" />
                  <div className="image-copy-panel text-shadow-readable absolute inset-x-4 bottom-4 p-4 text-cream-50">
                    <Badge tone="gold">Farm-tech wellness</Badge>
                    <p className="mt-3 font-display text-3xl font-black leading-tight">
                      Every batch should earn its place.
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-cream-100/78">
                      Clear labels, careful order review, and visible lab status
                      keep the plant story honest.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3">
                  {heroProducts.map((item) => (
                    <article
                      className="glass-card grid grid-cols-[5.5rem_1fr] gap-3 rounded-seed p-3"
                      key={item.label}
                    >
                      <div className="relative aspect-square rounded-xl bg-cream-100">
                        <Image
                          alt={item.label}
                          className="object-contain p-2"
                          fill
                          sizes="96px"
                          src={item.image}
                        />
                      </div>
                      <div className="min-w-0 self-center">
                        <p className="text-sm font-black text-forest-900">
                          {item.label}
                        </p>
                        <p className="mt-1 text-xs font-bold leading-5 text-forest-900/62">
                          {item.note}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <TrustBar />
      </section>

      <CbgEducationSection />

      <section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        id="best-sellers"
      >
        <SectionIntro
          eyebrow="Shop the farm shelf"
          title="CBG without the guesswork."
          text="Compare format, strength notes, COA visibility, THC compliance notes, and order-readiness before anything goes in your cart."
        />
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <NewToCbgGuide />

      <CbgProductFinderQuiz products={products} />

      <TrustTestingSection />

      <BatchTransparencyPreview products={labProducts} />

      <HowToUseSection />

      <OrderingSection />

      <ReviewThemesSection />

      <HomeFaqSection />

      <section className="mx-auto max-w-7xl px-4 pb-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-forest-900/12 bg-forest-900 text-cream-50 shadow-farm lg:grid-cols-[.85fr_1.15fr]">
          <div className="relative min-h-[22rem]">
            <Image
              alt={farmImages.hempFieldSun.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              src={farmImages.hempFieldSun.src}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-900/55 to-transparent" />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-harvest-300">
              Have questions before you order?
            </p>
            <h2 className="mt-3 font-display text-4xl font-black">
              Let&apos;s make CBG shopping simple.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-cream-100/76">
              Learn what CBG is, review lab results, or contact the farm before
              you submit an order request.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/learn/what-is-cbg" variant="secondary">
                Learn About CBG
              </ButtonLink>
              <ButtonLink
                className="border-cream-50/30 text-cream-50 hover:bg-cream-50/10"
                href="/contact"
                variant="ghost"
              >
                <Mail aria-hidden className="size-5" />
                Contact the Farm
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CbgEducationSection() {
  return (
    <section
      aria-labelledby="what-is-cbg-title"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
      id="what-is-cbg"
    >
      <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
            What is CBG?
          </p>
          <h2
            className="mt-2 font-display text-3xl font-black leading-tight text-forest-900 md:text-5xl"
            id="what-is-cbg-title"
          >
            Meet the cannabinoid for functional balance.
          </h2>
          <p className="mt-4 leading-7 text-forest-900/72">
            CBG is one of the many cannabinoids found in hemp. The short version:
            it is non-intoxicating, plant-derived, and often chosen by people
            who want cannabinoid support that still feels clear and usable.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/learn/what-is-cbg" variant="secondary">
              Read the CBG guide
            </ButtonLink>
            <ButtonLink href="/lab-results" variant="ghost">
              View Lab Results
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {cbgFacts.map((fact) => (
            <article
              className="seed-card rounded-seed p-5"
              key={fact.title}
            >
              <fact.icon aria-hidden className="size-7 text-forest-700" />
              <h3 className="mt-3 font-display text-2xl font-black text-forest-900">
                {fact.title}
              </h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-forest-900/70">
                {fact.text}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-seed border border-forest-900/12 bg-cream-50 shadow-soft">
        <div className="border-b border-forest-900/10 p-5">
          <h3 className="font-display text-3xl font-black text-forest-900">
            CBG vs CBD vs THC
          </h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-forest-900/70">
            A plain-English comparison for shopping context. It is educational,
            not medical guidance.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[740px] text-left text-sm">
            <thead className="bg-forest-700 text-cream-50">
              <tr>
                <Th>Cannabinoid</Th>
                <Th>Plant role</Th>
                <Th>Commonly chosen for</Th>
                <Th>Important note</Th>
              </tr>
            </thead>
            <tbody>
              {cannabinoidComparison.map((row) => (
                <tr
                  className="border-b border-forest-900/10 last:border-b-0"
                  key={row.name}
                >
                  <Td>
                    <span className="font-display text-2xl font-black text-forest-900">
                      {row.name}
                    </span>
                  </Td>
                  <Td>{row.role}</Td>
                  <Td>{row.feel}</Td>
                  <Td>{row.note}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function TrustTestingSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-forest-900/12 bg-forest-900 p-6 text-cream-50 shadow-farm md:p-8">
        <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-harvest-300">
              Lab testing and trust
            </p>
            <h2 className="mt-3 font-display text-4xl font-black leading-tight md:text-5xl">
              No mystery oil. No cartoon claims.
            </h2>
            <p className="mt-4 leading-7 text-cream-100/76">
              Trust starts with the paperwork matching the product in your hand.
              Funnifarms keeps COA status, batch details, and adult-use notes
              visible so customers can shop with fewer question marks.
            </p>
            <ButtonLink className="mt-6" href="/lab-results" variant="secondary">
              <FileText aria-hidden className="size-5" />
              View Lab Results
            </ButtonLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {trustPillars.map((pillar) => (
              <article
                className="dark-readable-card rounded-seed p-5"
                key={pillar.title}
              >
                <pillar.icon aria-hidden className="size-7 text-harvest-300" />
                <h3 className="mt-3 font-display text-2xl font-black text-harvest-300">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-cream-100/72">
                  {pillar.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewToCbgGuide() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
            New to CBG? Start here
          </p>
          <h2 className="mt-2 font-display text-3xl font-black leading-tight text-forest-900 md:text-5xl">
            Choose by routine, not by hype.
          </h2>
          <p className="mt-4 leading-7 text-forest-900/72">
            The best starting point depends on format preference, timing, lab
            visibility, and how comfortable you are reading labels. This guide
            keeps the decision practical and non-medical.
          </p>
          <p className="mt-4 rounded-seed border border-forest-900/12 bg-cream-50 p-4 text-sm font-black leading-6 text-forest-900/72 shadow-soft">
            Start low, listen closely, and let the plant do what it does.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {buyerGuidePaths.map((path) => (
            <article
              className="seed-card rounded-seed p-5"
              key={path.label}
            >
              <div className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-harvest-300/55 text-forest-900">
                  <path.icon aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-clay">
                    {path.label}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-black text-forest-900">
                    {path.title}
                  </h3>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-forest-900/70">
                {path.text}
              </p>
              <ButtonLink className="mt-4" href={path.href} size="sm" variant="ghost">
                {path.cta}
                <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BatchTransparencyPreview({ products }: { products: Product[] }) {
  return (
    <section
      aria-labelledby="batch-transparency-title"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      id="batch-transparency"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
            Batch transparency
          </p>
          <h2
            className="mt-2 font-display text-3xl font-black text-forest-900 md:text-5xl"
            id="batch-transparency-title"
          >
            Public batch status, not fine print.
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-forest-900/72">
            COAs will appear here and on the Lab Results page as batch records
            are completed. Pending rows are intentionally visible so customers
            know what still needs review.
          </p>
        </div>
        <ButtonLink href="/lab-results" variant="ghost">
          Full lab index
          <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
      </div>

      {products.length > 0 ? (
        <>
          <div className="mt-7 grid gap-3 md:hidden">
            {products.map((product) => {
              const hasCoa = hasBatchSpecificCoa(product);

              return (
                <article className="glass-card rounded-seed p-4" key={product.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-black leading-tight text-forest-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-clay">
                        {product.category}
                      </p>
                    </div>
                    <Badge tone={hasCoa ? "green" : "gold"}>
                      {getCoaStatusLabel(product)}
                    </Badge>
                  </div>
                  <dl className="mt-4 grid gap-3 text-sm">
                    <BatchMobileDetail
                      label="Batch ID"
                      value={getBatchStatusLabel(product)}
                    />
                    <BatchMobileDetail
                      label="Test date"
                      value={getTestDate(product)}
                    />
                    <BatchMobileDetail
                      label="CBG potency"
                      value={getCbgPotency(product)}
                    />
                    <BatchMobileDetail
                      label="THC level"
                      value={getThcLevel(product)}
                    />
                  </dl>
                  <ButtonLink
                    className="mt-4 w-full"
                    href={
                      hasCoa
                        ? product.coaUrl
                        : `/lab-results#product-${product.slug}`
                    }
                    size="sm"
                    variant={hasCoa ? "secondary" : "ghost"}
                  >
                    {hasCoa ? "Open COA" : "View status"}
                  </ButtonLink>
                </article>
              );
            })}
          </div>

          <div className="mt-7 hidden overflow-hidden rounded-seed border border-forest-900/12 bg-cream-50 shadow-soft md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] text-left text-sm">
                <thead className="bg-forest-700 text-cream-50">
                  <tr>
                    <Th>Product</Th>
                    <Th>Batch ID</Th>
                    <Th>Test date</Th>
                    <Th>CBG potency</Th>
                    <Th>THC level</Th>
                    <Th>Status</Th>
                    <Th>COA link</Th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      className="border-b border-forest-900/10 last:border-b-0"
                      key={product.id}
                    >
                      <Td>
                        <span className="font-black text-forest-900">
                          {product.name}
                        </span>
                        <span className="mt-1 block text-xs font-bold text-forest-900/56">
                          {product.category}
                        </span>
                      </Td>
                      <Td>{getBatchStatusLabel(product)}</Td>
                      <Td>{getTestDate(product)}</Td>
                      <Td>{getCbgPotency(product)}</Td>
                      <Td>{getThcLevel(product)}</Td>
                      <Td>
                        <Badge tone={hasBatchSpecificCoa(product) ? "green" : "gold"}>
                          {getCoaStatusLabel(product)}
                        </Badge>
                      </Td>
                      <Td>
                        <ButtonLink
                          href={
                            hasBatchSpecificCoa(product)
                              ? product.coaUrl
                              : `/lab-results#product-${product.slug}`
                          }
                          size="sm"
                          variant={hasBatchSpecificCoa(product) ? "secondary" : "ghost"}
                        >
                          {hasBatchSpecificCoa(product) ? "Open COA" : "View status"}
                        </ButtonLink>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-7 rounded-seed border border-dashed border-forest-900/20 bg-cream-50 p-6 text-sm font-semibold leading-6 text-forest-900/72">
          Batch COAs will appear here once product records are ready.
        </div>
      )}
    </section>
  );
}

function BatchMobileDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-forest-900/10 bg-cream-50/80 p-3">
      <dt className="text-xs font-black uppercase tracking-[0.14em] text-forest-900/68">
        {label}
      </dt>
      <dd className="mt-1 font-bold text-forest-900">{value}</dd>
    </div>
  );
}

function HowToUseSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionIntro
        eyebrow="How to use CBG"
        title="Start low, listen closely."
        text="Use product labels as the source of truth. Hemp routines are personal, and effects vary by person."
      />
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {useGuides.map((guide) => (
          <article
            className="seed-card rounded-seed p-5"
            key={guide.title}
          >
            <h3 className="font-display text-2xl font-black text-forest-900">
              {guide.title}
            </h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-forest-900/70">
              {guide.text}
            </p>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-3xl rounded-seed border border-forest-900/12 bg-cream-50 p-4 text-center text-sm font-black leading-6 text-forest-900/72 shadow-soft">
        Start low, pay attention to how your body responds, and increase
        gradually only if needed.
      </p>
    </section>
  );
}

function OrderingSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
            How ordering works
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-forest-900">
            A careful order request, not a black box checkout.
          </h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {orderSteps.map((step, index) => (
            <article
              className="grid grid-cols-[auto_1fr] gap-3 border-forest-900/10 md:border-r md:pr-4 md:last:border-r-0"
              key={step.title}
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-forest-700 font-display text-xl font-black text-cream-50">
                {index + 1}
              </span>
              <div>
                <step.icon aria-hidden className="mb-2 size-6 text-clay" />
                <h3 className="text-sm font-black uppercase text-forest-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs font-semibold leading-5 text-forest-900/68">
                  {step.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewThemesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionIntro
        eyebrow="Customer clarity"
        title="The experience should feel honest before it feels loud."
        text="These demo review cards reflect the kind of compliant feedback language to collect from verified customers after launch."
      />
      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {reviewThemes.map((review) => (
          <article
            className="rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft"
            key={review.tag}
          >
            <div className="flex gap-1 text-harvest-500" aria-hidden>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star className="size-4 fill-current" key={index} />
              ))}
            </div>
            <Badge className="mt-4" tone="cream">
              {review.tag}
            </Badge>
            <p className="mt-3 text-sm font-semibold leading-6 text-forest-900/72">
              {review.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HomeFaqSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionIntro
        eyebrow="FAQ"
        title="Plain answers, careful claims."
        text="Quick guidance for CBG shoppers who want the useful version, not the hype version."
      />
      <div className="mt-7 space-y-3">
        {homepageFaqs.map((item) => (
          <details
            className="group rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft"
            key={item.question}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-black text-forest-900">
              <span className="flex items-center gap-3">
                <HelpCircle aria-hidden className="size-5 shrink-0 text-clay" />
                {item.question}
              </span>
              <span className="text-2xl text-clay transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm font-semibold leading-6 text-forest-900/70">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
      <div className="mt-7 flex justify-center">
        <ButtonLink href="/faq" variant="secondary">
          View full FAQ
        </ButtonLink>
      </div>
    </section>
  );
}

function TrustChip({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-forest-900/12 bg-cream-50/82 px-3 py-2 text-sm font-black text-forest-900 shadow-soft backdrop-blur">
      <Icon aria-hidden className="size-4 text-clay" />
      <span>{label}</span>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  text,
  title,
}: {
  eyebrow: string;
  text: string;
  title: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-black text-forest-900 md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 leading-7 text-forest-900/72">{text}</p>
    </div>
  );
}

function orderProducts(products: Product[], slugs: string[]) {
  const bySlug = new Map(products.map((product) => [product.slug, product]));

  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((product): product is Product => Boolean(product));
}

function getTestDate(product: Product) {
  if (product.slug === "cbg-hemp-flower") return "11/10/2022";
  if (hasBatchSpecificCoa(product)) return "See COA";
  return "Pending current batch";
}

function getCbgPotency(product: Product) {
  if (product.slug === "funni-farm-cbg-gummies") {
    return "2-3 mg CBG per gummy; 100-150 mg total per bag";
  }

  if (product.slug === "cbg-hemp-flower") {
    return "CBGA 9.268%; CBG 0.201% on tested sample";
  }

  return product.cannabinoidInfo || "Pending final label or COA";
}

function getThcLevel(product: Product) {
  if (product.slug === "cbg-hemp-flower") {
    return "Total THC 0.113%; Delta-9 THC 0.019%";
  }

  if (hasBatchSpecificCoa(product)) return "See COA";
  return "Pending current batch COA";
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-4 text-xs font-black uppercase tracking-[0.12em]">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="align-top px-4 py-5 font-semibold leading-6 text-forest-900/72">
      {children}
    </td>
  );
}
