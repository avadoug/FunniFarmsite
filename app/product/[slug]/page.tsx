import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CheckCircle2,
  ClipboardCheck,
  FileText,
  FlaskConical,
  IdCard,
  Leaf,
  PackageCheck,
  QrCode,
  ShieldCheck,
  Sprout,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFeelProfile } from "@/components/product/ProductFeelProfile";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { ProductStickyCartBar } from "@/components/product/ProductStickyCartBar";
import { TrustBar } from "@/components/brand/TrustBar";
import {
  getBatchStatusLabel,
  getCoaStatusLabel,
  hasBatchSpecificCoa,
  isSoldOut,
} from "@/lib/products/status";
import type { Product } from "@/lib/products/types";
import { getProductReviewCount } from "@/lib/products/reviews";
import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "@/lib/products/repository";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thefunnifarm.com";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | CBG-Rich Hemp Wellness`,
    description: `${product.shortDescription} Batch details, ingredients, COA links where available, and adult-use hemp product notes from The Funni Farm.`,
    openGraph: {
      title: `${product.name} | The Funni Farm`,
      description: `${product.shortDescription} CBG-rich adult hemp wellness from The Funni Farm.`,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) redirect("/shop");

  const relatedProducts = await getRelatedProducts(product, 4);
  const allProducts = await getProducts();
  const gallery = [product.image, ...product.gallery].filter(
    (image, index, all) => all.indexOf(image) === index,
  );
  const faqs = getProductFaqs(product);
  const hasCoa = hasBatchSpecificCoa(product);
  const soldOut = isSoldOut(product);

  return (
    <div className="pb-24 md:pb-0">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getProductJsonLd(product)),
          }}
        />
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap gap-2 text-sm font-bold text-forest-900/58"
        >
          <Link className="hover:text-clay" href="/">
            Home
          </Link>
          <span>/</span>
          <Link className="hover:text-clay" href="/shop">
            Shop
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <section className="mt-5 grid gap-8 rounded-[2rem] border border-forest-900/12 bg-cream-50 p-4 shadow-farm md:p-6 lg:grid-cols-[1fr_.95fr] lg:p-8">
          <ProductGallery images={gallery} name={product.name} soldOut={soldOut} />

          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              <Badge tone="green">Non-Intoxicating</Badge>
              <Badge tone="cream">
                {product.category === "Seeds" ? "Hemp Seeds" : "THC Compliance Review"}
              </Badge>
              {product.badge && <Badge tone="gold">{product.badge}</Badge>}
            </div>
            <h1 className="mt-4 font-display text-4xl font-black leading-tight text-forest-900 md:text-5xl">
              {product.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="flex text-harvest-500" aria-hidden>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star className="size-4 fill-current" key={index} />
                ))}
              </span>
              <span className="text-sm font-black text-forest-900/64">
                ({getProductReviewCount(product)} reviews)
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              <ProductPrice product={product} size="xl" />
            </div>
            <p className="mt-5 text-base font-semibold leading-8 text-forest-900/74">
              {product.fullDescription}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Benefit icon={Leaf} label="Non-Intoxicating" />
              <Benefit icon={ShieldCheck} label="THC Review" />
              <Benefit icon={Sprout} label="Farm Grown" />
              <Benefit icon={FlaskConical} label="Lab Status Visible" />
            </div>

            <ProductFeelProfile className="mt-6" product={product} />

            <div className="mt-6">
              <ProductPurchasePanel product={product} />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <InfoPanel icon={FileText} title="Product Details">
            <ul className="space-y-2">
              <DetailItem text={getServingInfo(product)} />
              <DetailItem text={product.packSize || "Pack size confirmed during order review."} />
              <DetailItem text={getCoaStatusLabel(product)} />
              <DetailItem text={getBatchStatusLabel(product)} />
            </ul>
          </InfoPanel>
          <InfoPanel icon={PackageCheck} title="Ingredients">
            <p>
              {product.ingredients ||
                "Ingredients are confirmed against the final product label during order review."}
            </p>
          </InfoPanel>
          <InfoPanel icon={ClipboardCheck} title="Serving Information">
            <p>
              Use only as directed on the final product label. Start with the
              smallest suggested serving and keep products out of reach of
              children and pets.
            </p>
          </InfoPanel>
        </section>

        <section className="mt-5 grid gap-5 rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft lg:grid-cols-[.8fr_1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-clay">
              Batch ID
            </p>
            <p className="mt-2 font-display text-2xl font-black text-forest-900">
              {getBatchStatusLabel(product)}
            </p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-clay">
              Lab Tested for Purity & Potency
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-forest-900/70">
              Scan or view the Certificate of Analysis for this product where a
              current batch record is available.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <div className="flex size-20 items-center justify-center rounded-xl border border-forest-900/12 bg-white text-forest-900">
              <QrCode aria-hidden className="size-11" />
            </div>
            {hasCoa ? (
              <ButtonLink href={product.coaUrl} variant="secondary">
                View COA
              </ButtonLink>
            ) : (
              <ButtonLink href="/lab-results" variant="ghost">
                View Lab Status
              </ButtonLink>
            )}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_.8fr]">
          <div>
            <h2 className="font-display text-3xl font-black text-forest-900">
              You May Also Like
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>

          <div className="rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-clay">
              FAQ
            </p>
            <div className="mt-4 space-y-3">
              {faqs.map(([question, answer]) => (
                <details
                  className="glass-card group rounded-2xl p-4"
                  key={question}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-black text-forest-900">
                    <span>{question}</span>
                    <span className="text-xl text-clay transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm font-semibold leading-6 text-forest-900/70">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <TrustBar compact />
        </section>

        <RecentlyViewed currentId={product.id} products={allProducts} />

        <section className="mt-8 rounded-seed border border-forest-900/12 bg-forest-900 p-6 text-cream-50 shadow-farm">
          <div className="grid gap-5 md:grid-cols-3">
            <Confidence
              icon={ClipboardCheck}
              title="Every Order is Reviewed"
              text="The farm checks availability, age requirements, shipping rules, and product records."
            />
            <Confidence
              icon={IdCard}
              title="Age Verification Required"
              text="Adult hemp products may require age confirmation before fulfillment."
            />
            <Confidence
              icon={ShieldCheck}
              title="Compliant & Responsible"
              text="The site uses careful hemp language and avoids medical promises."
            />
          </div>
        </section>

        <section className="mt-8 rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft">
          <div className="flex gap-3">
            <ShieldCheck
              aria-hidden
              className="mt-1 size-6 shrink-0 text-forest-700"
            />
            <div>
              <h2 className="font-display text-2xl font-black text-forest-900">
                Responsible hemp disclaimer
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-forest-900/70">
                These products are not intended to diagnose, treat, cure, or
                prevent any disease. Effects vary by person. Consult a
                qualified professional before use if pregnant, nursing, taking
                medication, or managing a medical condition. Keep out of reach
                of children. Use only as directed.
              </p>
            </div>
          </div>
        </section>
      </main>

      <ProductStickyCartBar product={product} />
    </div>
  );
}

function Benefit({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="glass-card rounded-2xl p-3 text-center">
      <Icon aria-hidden className="mx-auto size-6 text-forest-700" />
      <p className="mt-2 text-xs font-black leading-4 text-forest-900">
        {label}
      </p>
    </div>
  );
}

function InfoPanel({
  children,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <article className="rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft">
      <Icon aria-hidden className="size-6 text-forest-700" />
      <h2 className="mt-3 font-display text-2xl font-black text-forest-900">
        {title}
      </h2>
      <div className="mt-3 text-sm font-semibold leading-6 text-forest-900/70">
        {children}
      </div>
    </article>
  );
}

function DetailItem({ text }: { text: string }) {
  return (
    <li className="flex gap-2">
      <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-forest-700" />
      <span>{text}</span>
    </li>
  );
}

function Confidence({
  icon: Icon,
  text,
  title,
}: {
  icon: LucideIcon;
  text: string;
  title: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon aria-hidden className="mt-1 size-7 shrink-0 text-harvest-300" />
      <div>
        <h3 className="font-display text-2xl font-black text-harvest-300">
          {title}
        </h3>
        <p className="mt-1 text-sm font-semibold leading-6 text-cream-100/74">
          {text}
        </p>
      </div>
    </div>
  );
}

function getServingInfo(product: Product) {
  if (product.slug === "funni-farm-cbg-gummies") {
    return "2-3 mg CBG per gummy; 50 gummies per bag.";
  }

  if (product.category === "Capsules") {
    return "Measured capsule format; serving details confirmed on final label.";
  }

  if (product.category === "CBG Oils") {
    return "Measured bottle format; serving details confirmed on final label.";
  }

  if (product.category === "Seeds") {
    return "Pantry seed product; no cannabinoid serving claims.";
  }

  return product.packSize || "Serving details confirmed during order review.";
}

function getProductJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    brand: {
      "@type": "Brand",
      name: "The Funni Farm",
    },
    category: product.category,
    description: product.shortDescription,
    image: product.image.startsWith("http")
      ? product.image
      : `${siteUrl}${product.image}`,
    name: product.name,
    offers: {
      "@type": "Offer",
      availability:
        product.isActive && product.inventory > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      price: product.price,
      priceCurrency: "USD",
      url: `${siteUrl}/product/${product.slug}`,
    },
    sku: product.id,
  };
}

function getProductFaqs(product: Product): Array<[string, string]> {
  return [
    [
      "Will CBG make me feel high?",
      "The Funni Farm positions these products as non-intoxicating hemp products. Review the label, batch notes, and available COA before ordering.",
    ],
    [
      "How is CBG different from CBD?",
      "CBG and CBD are both naturally occurring cannabinoids found in hemp. This site explains them in plain language without medical claims.",
    ],
    [
      "How should I take this product?",
      "Use only as directed on the final product label and follow any age, storage, and safe-use guidance.",
    ],
    [
      "Where can I find the COA?",
      hasBatchSpecificCoa(product)
        ? "Use the COA button on this page or visit Lab Results for the matching batch information."
        : "Visit Lab Results to review current COA status. Batch records are also reviewed before fulfillment.",
    ],
    [
      "How does order review work?",
      "Checkout submits an order request. The farm reviews availability, age requirements, shipping rules, and product records before sending payment instructions.",
    ],
  ];
}
