import type { Metadata } from "next";
import Image from "next/image";
import { FlaskConical, Leaf, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { farmImages } from "@/lib/brand/farmImages";
import { jackFrostCoa } from "@/lib/coa/jackFrostCbg001";

export const metadata: Metadata = {
  title: "What is CBG?",
  description:
    "A plain-English guide to non-intoxicating CBG-rich hemp wellness products and why lab results matter.",
};

export default function CbgPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Plain English hemp education" title="What is CBG?">
        <p>
          CBG stands for cannabigerol. It is one of many cannabinoids that can
          be found in hemp plants. The Funni Farm focuses on non-intoxicating
          CBG-rich products made for adult hemp wellness routines.
        </p>
      </SectionHeading>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.9fr]">
        <div className="seed-card rounded-seed p-6 md:p-8">
          <h2 className="font-display text-3xl font-black text-forest-900">
            CBG in simple terms
          </h2>
          <div className="mt-5 space-y-5 leading-7 text-forest-900/74">
            <p>
              Cannabinoids are naturally occurring compounds associated with hemp
              plants. CBG is sometimes called a “minor cannabinoid” because many
              hemp varieties contain less CBG than CBD.
            </p>
            <p>
              CBG is different from THC. The Funni Farm products are not made
              for intoxication; they are CBG-rich hemp wellness products for
              adults who want clear labels and simple plant-based routines.
            </p>
            <p>
              CBG products can include gummies, oils, capsules, hemp flower, and
              other adult hemp formats. A trustworthy listing should clearly
              show serving information, ingredients, batch numbers, lab results,
              and shipping restrictions.
            </p>
            <p>
              The Funni Farm keeps product details connected to label review,
              current COA review, and applicable legal review.
            </p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="seed-card overflow-hidden rounded-seed">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                alt={farmImages.funniFarmLogo.alt}
                className="object-contain p-8"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                src={farmImages.funniFarmLogo.src}
              />
            </div>
            <div className="p-5">
              <h2 className="font-display text-2xl font-black text-forest-900">
                Start with the label
              </h2>
              <p className="mt-2 text-sm leading-6 text-forest-900/70">
                Clear CBG education works best when it stays connected to real
                hemp plants, real labels, serving details, and real lab
                results.
              </p>
            </div>
          </div>
          <Callout
            icon={Leaf}
            title="How CBG differs"
            text="CBG, CBD, and THC are different cannabinoids. Product labels should explain which cannabinoids are present and in what verified amounts."
          />
          <Callout
            icon={FlaskConical}
            title="Why lab results matter"
            text="COAs help customers review cannabinoid content, batch identity, federal hemp compliance details, and safety testing status."
          />
          <Callout
            icon={ShieldCheck}
            title="No medical claims"
            text="This site uses general wellness language only and avoids promises about diseases, symptoms, or medical conditions."
          />
        </aside>
      </div>

      <section className="mt-10 rounded-seed border border-forest-900/12 bg-forest-900 p-6 text-cream-50 shadow-farm md:p-8">
        <h2 className="font-display text-3xl font-black">
          Product disclaimer
        </h2>
        <p className="mt-3 leading-7 text-cream-100/78">
          Hemp-derived products on this site are non-intoxicating adult wellness
          products. They are not intended to diagnose, treat, cure, or prevent
          any disease. Review product details, ingredients, lab results, and the
          final label before use.
        </p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="seed-card overflow-hidden rounded-seed">
          <div className="relative aspect-[16/9] overflow-hidden">
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
            Why people are interested
          </h2>
          <p className="mt-3 leading-7 text-forest-900/72">
            People often explore CBG because they are curious about hemp-derived
            cannabinoids and non-intoxicating plant-based routines. Product
            pages should stay focused on ingredients, serving format, batch
            details, and verified lab information.
          </p>
          </div>
        </div>
        <div className="seed-card rounded-seed p-6">
          <h2 className="font-display text-3xl font-black text-forest-900">
            A real label example
          </h2>
          <p className="mt-3 leading-7 text-forest-900/72">
            The supplied Funni Farm CBG Gummies label states 2-3 mg CBG per
            gummy, 100-150 mg total CBG per 50-gummy bag, mixed fruit flavor,
            adult-use directions, ingredients, storage instructions, and a COA
            scan area. Customers should still review the current batch COA and
            final label before use.
          </p>
        </div>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/shop?category=CBG%20Gummies" size="lg">
          Shop CBG Products
        </ButtonLink>
        <ButtonLink
          href={`/lab-results#${jackFrostCoa.id}`}
          size="lg"
          variant="secondary"
        >
          Read Jack Frost COA
        </ButtonLink>
        <ButtonLink href="/lab-results" size="lg" variant="ghost">
          View All Lab Testing
        </ButtonLink>
      </div>
    </div>
  );
}

function Callout({
  icon: Icon,
  text,
  title,
}: {
  icon: typeof Leaf;
  text: string;
  title: string;
}) {
  return (
    <div className="rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-soft">
      <Icon aria-hidden className="size-6 text-forest-700" />
      <h3 className="mt-3 font-display text-2xl font-black text-forest-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-forest-900/70">{text}</p>
    </div>
  );
}
