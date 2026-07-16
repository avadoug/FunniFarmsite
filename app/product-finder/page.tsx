import type { Metadata } from "next";
import { FarmNote } from "@/components/brand/FarmNote";
import { ProductFinderGuide } from "@/components/product/ProductFinderGuide";
import { ProductComparison } from "@/components/product/ProductComparison";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBar } from "@/components/brand/TrustBar";
import { getProducts } from "@/lib/products/repository";

export const metadata: Metadata = {
  title: "Find Your Farm Fit",
  description:
    "A practical product guide for comparing The Funni Farm CBG-rich hemp wellness catalog by format, readiness, and label clarity.",
};

export default async function ProductFinderPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Find your fit"
        title="Find Your Farm Fit"
      >
        <p>
          Compare real product formats, photos, availability, COA status, and
          order-review details before you choose what belongs in your cart.
        </p>
      </SectionHeading>

      <div className="mt-7">
        <TrustBar compact />
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        <FarmNote
          eyebrow="Product finder note"
          title="This guide compares products, not health needs."
          tone="good"
        >
          Recommendations are based on product format, label clarity, COA
          status, and availability. Nothing here is medical advice.
        </FarmNote>
        <FarmNote
          eyebrow="Farm note"
          title="The farm still reviews every request."
          tone="buy"
        >
          Product guidance does not guarantee availability or shipping
          eligibility. The manual order request flow confirms those details
          before payment.
        </FarmNote>
      </div>

      <div className="mt-8">
        <ProductFinderGuide products={products} />
      </div>

      <section className="mt-14">
        <ProductComparison products={products} showFinderCta={false} />
      </section>
    </div>
  );
}
