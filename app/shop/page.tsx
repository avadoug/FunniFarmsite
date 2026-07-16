import type { Metadata } from "next";
import Image from "next/image";
import { ClipboardCheck, IdCard, ShieldCheck } from "lucide-react";
import { ProductFilters } from "@/components/product/ProductFilters";
import { TrustBar } from "@/components/brand/TrustBar";
import { ButtonLink } from "@/components/ui/Button";
import { farmImages } from "@/lib/brand/farmImages";
import { getProducts } from "@/lib/products/repository";
import { productCategories } from "@/lib/products/types";

export const metadata: Metadata = {
  title: "CBG Products",
  description:
    "Shop The Funni Farm non-intoxicating CBG-rich hemp wellness products with clear labels, lab transparency, and manual order review.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const products = await getProducts();
  const params = await searchParams;
  const requestedCategory = params.category
    ? decodeURIComponent(params.category)
    : "All";
  const initialCategory = productCategories.includes(
    requestedCategory as (typeof productCategories)[number],
  ) && requestedCategory !== "Bundles"
    ? requestedCategory
    : "All";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1fr_.55fr] lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
            Shop
          </p>
          <h1 className="mt-3 font-display text-5xl font-black leading-tight text-forest-900">
            CBG Products
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-forest-900/72">
            Explore non-intoxicating, CBG-rich products crafted for adult
            wellness routines with clear labels, farm-grown ingredients, and
            third-party testing where available.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/product-finder" variant="secondary">
              Product Finder
            </ButtonLink>
            <ButtonLink href="/lab-results" variant="ghost">
              View Lab Results
            </ButtonLink>
          </div>
        </div>
        <div className="relative hidden aspect-[16/10] overflow-hidden rounded-seed border border-forest-900/12 bg-cream-50 shadow-soft lg:block">
          <Image
            alt={farmImages.funniFarmLogo.alt}
            className="object-contain p-8"
            fill
            priority
            sizes="360px"
            src={farmImages.funniFarmLogo.src}
          />
        </div>
      </section>

      <div className="mt-7">
        <TrustBar compact />
      </div>

      <section className="mt-8">
        <ProductFilters initialCategory={initialCategory} products={products} />
      </section>

      <section className="mt-12 rounded-seed border border-forest-900/12 bg-cream-50 p-6 shadow-soft">
        <div className="grid gap-6 md:grid-cols-[.8fr_1fr_1fr_1fr] md:items-center">
          <h2 className="font-display text-3xl font-black text-forest-900">
            Shop with Confidence
          </h2>
          <Confidence
            icon={ClipboardCheck}
            title="Every Order is Reviewed"
            text="We personally review each order to confirm accuracy and compliance before fulfillment."
          />
          <Confidence
            icon={IdCard}
            title="Age Verification Required"
            text="You must be 21+ to purchase adult hemp products. Verification may be required."
          />
          <Confidence
            icon={ShieldCheck}
            title="Compliant & Responsible"
            text="We follow applicable federal and state hemp product requirements."
          />
        </div>
      </section>
    </div>
  );
}

function Confidence({
  icon: Icon,
  text,
  title,
}: {
  icon: typeof ClipboardCheck;
  text: string;
  title: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest-700 text-cream-50">
        <Icon aria-hidden className="size-6" />
      </span>
      <div>
        <h3 className="font-black text-forest-900">{title}</h3>
        <p className="mt-1 text-sm font-semibold leading-6 text-forest-900/66">
          {text}
        </p>
      </div>
    </div>
  );
}
