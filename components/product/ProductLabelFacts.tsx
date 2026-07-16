import Image from "next/image";
import Link from "next/link";
import { FileText, FlaskConical, PackageCheck, ShieldCheck } from "lucide-react";
import type { ProductLabelFacts as ProductLabelFactsType } from "@/lib/products/labelFacts";

export function ProductLabelFacts({
  facts,
}: {
  facts: ProductLabelFactsType;
}) {
  return (
    <section className="mt-14 overflow-hidden rounded-seed border border-forest-900/12 bg-cream-50 shadow-farm">
      <div className="grid lg:grid-cols-[.85fr_1.15fr]">
        <div className="relative min-h-[26rem] bg-cream-100">
          <Image
            alt={facts.imageAlt}
            className="object-cover object-top"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            src={facts.image}
          />
          <div className="absolute inset-0 image-scrim" />
          <div className="image-copy-panel text-shadow-readable absolute inset-x-4 bottom-4 p-4 text-cream-50">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-harvest-300">
              Label photo
            </p>
            <p className="mt-1 text-sm font-bold">
              Ingredients, nutrition, COA scan area, and suggested use captured
              from the supplied label artwork.
            </p>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-forest-900/12 bg-harvest-300 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-forest-900">
            <PackageCheck aria-hidden className="size-4" />
            {facts.eyebrow}
          </div>
          <h2 className="mt-4 font-display text-3xl font-black text-forest-900 md:text-4xl">
            {facts.title}
          </h2>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-clay">
            {facts.brandLine}
          </p>
          <p className="mt-3 leading-7 text-forest-900/72">{facts.summary}</p>

          <div className="relative mt-6 aspect-[16/11] overflow-hidden rounded-[1.35rem] border border-forest-900/12 bg-cream-100 shadow-soft">
            <Image
              alt={facts.logoImageAlt}
              className="object-cover object-top"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={facts.logoImage}
            />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {facts.callouts.map((callout) => (
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

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <LabelPanel icon={FileText} title="Ingredients">
              <ul className="space-y-1">
                {facts.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </LabelPanel>
            <LabelPanel icon={ShieldCheck} title="Suggested Use">
              <ul className="space-y-1">
                {facts.suggestedUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 font-bold">{facts.storage}</p>
            </LabelPanel>
            <LabelPanel icon={FlaskConical} title="Lab Transparency">
              <p>{facts.labTransparency}</p>
              <ul className="mt-3 space-y-1">
                {facts.scanFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link
                className="focus-ring mt-3 inline-flex rounded-full font-black text-forest-900 underline decoration-clay/40 underline-offset-4 hover:text-clay"
                href="/lab-results"
              >
                View lab results
              </Link>
            </LabelPanel>
            <LabelPanel icon={PackageCheck} title="Manufacturer">
              <ul className="space-y-1">
                {facts.manufacturedBy.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-3 font-bold">
                Printed label fields: {facts.batchFields.join(", ")}.
              </p>
            </LabelPanel>
          </div>

          <div className="mt-6 rounded-2xl border border-forest-900/10 bg-white/55 p-5">
            <h3 className="font-display text-2xl font-black text-forest-900">
              Label Brand Badges
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {facts.labelBadges.map((badge) => (
                <span
                  className="rounded-full border border-forest-900/10 bg-cream-50 px-3 py-2 text-xs font-black uppercase tracking-[0.1em] text-forest-900"
                  key={badge}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
            <div className="rounded-2xl border border-forest-900/10 bg-white/55 p-5">
              <h3 className="font-display text-2xl font-black text-forest-900">
                Allergen Notes
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-forest-900/72">
                {facts.allergens.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-forest-900/10 bg-white/55 p-5">
              <h3 className="font-display text-2xl font-black text-forest-900">
                Nutrition Facts
              </h3>
              <div className="mt-3 divide-y divide-forest-900/10 text-sm">
                {facts.nutrition.map((fact) => (
                  <div
                    className="grid grid-cols-[1fr_auto_auto] gap-3 py-2 text-forest-900/76"
                    key={fact.label}
                  >
                    <span className="font-bold">{fact.label}</span>
                    <span>{fact.value}</span>
                    <span className="min-w-8 text-right font-bold">
                      {fact.dailyValue ?? ""}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs font-bold leading-5 text-forest-900/62">
                {facts.nutritionFootnote}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-forest-900/12 bg-forest-900 p-5 text-cream-50">
            <h3 className="font-display text-2xl font-black">
              Adult-use compliance notes
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-cream-100/76">
              {facts.complianceNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <div className="relative mt-5 aspect-[16/3] overflow-hidden rounded-2xl border border-cream-50/12 bg-cream-100">
              <Image
                alt={facts.complianceImageAlt}
                className="object-cover object-top"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                src={facts.complianceImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LabelPanel({
  children,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  icon: typeof FileText;
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-forest-900/10 bg-white/55 p-5">
      <Icon aria-hidden className="size-5 text-forest-700" />
      <h3 className="mt-3 font-display text-2xl font-black text-forest-900">
        {title}
      </h3>
      <div className="mt-2 text-sm leading-6 text-forest-900/72">
        {children}
      </div>
    </div>
  );
}
