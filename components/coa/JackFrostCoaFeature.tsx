import Link from "next/link";
import {
  BadgeCheck,
  BookOpen,
  Microscope,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { jackFrostCoa } from "@/lib/coa/jackFrostCbg001";

type ResultTone = (typeof jackFrostCoa.resultCards)[number]["tone"];

const toneClasses: Record<ResultTone, string> = {
  cream: "bg-cream-50",
  gold: "bg-harvest-300",
  green: "bg-forest-700 text-cream-50",
};

export function JackFrostCoaFeature() {
  return (
    <section
      className="mt-10 scroll-mt-28"
      id={jackFrostCoa.id}
      aria-labelledby="jack-frost-coa-heading"
    >
      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div>
          <div className="rounded-[1.4rem] border border-forest-900/12 bg-cream-50 p-6 shadow-farm md:p-8">
            <ShieldCheck aria-hidden className="size-9 text-forest-700" />
            <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-clay">
              Address privacy
            </p>
            <h3 className="mt-2 font-display text-3xl font-black text-forest-900">
              Extracted COA data, not the private-address image.
            </h3>
            <p className="mt-3 leading-7 text-forest-900/72">
              {jackFrostCoa.image.caption} The lab values below are preserved
              for customer transparency without publishing the farm&apos;s exact
              street address.
            </p>
            <dl className="mt-5 grid gap-3">
              <Meta label="Farm location" value={jackFrostCoa.clientAddress} />
              <Meta label="Lab" value={jackFrostCoa.lab} />
              <Meta label="Sample ID" value={jackFrostCoa.sampleId} />
            </dl>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-forest-900/12 bg-forest-700 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cream-50 shadow-soft">
            <BadgeCheck aria-hidden className="size-4 text-harvest-300" />
            Lab Verified
          </div>
          <h2
            className="mt-5 font-display text-4xl font-black leading-tight text-forest-900 md:text-5xl"
            id="jack-frost-coa-heading"
          >
            Jack Frost CBG COA Breakdown
          </h2>
          <p className="mt-4 text-lg leading-8 text-forest-900/76">
            Here&apos;s the lab report behind {jackFrostCoa.sampleName}. This
            COA shows a hemp-compliance-focused plant/biomass sample with a
            standout CBGA signal, useful for CBG-rich education and
            transparency.
          </p>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <Meta label="Lab" value={jackFrostCoa.lab} />
            <Meta label="Sample ID" value={jackFrostCoa.sampleId} />
            <Meta label="Sample Type" value={jackFrostCoa.sampleType} />
            <Meta label="Date Tested" value={jackFrostCoa.dateTestedLabel} />
            <Meta label="Method" value={jackFrostCoa.method} />
            <Meta label="Status" value={jackFrostCoa.status} />
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#jack-frost-breakdown" variant="secondary">
              Read COA Breakdown
            </ButtonLink>
            <ButtonLink href="#cannabinoid-glossary" variant="ghost">
              What Do These Numbers Mean?
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {jackFrostCoa.resultCards.map((card) => (
          <article
            className={`rounded-seed border border-forest-900/12 p-5 shadow-soft ${toneClasses[card.tone]}`}
            key={card.label}
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] opacity-75">
              {card.label}
            </p>
            <p className="mt-3 font-display text-4xl font-black">
              {card.value}
            </p>
            <p className="mt-3 text-sm leading-6 opacity-80">
              {card.meaning}
            </p>
          </article>
        ))}
      </div>

      <div
        className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr]"
        id="jack-frost-breakdown"
      >
        <section className="seed-card rounded-seed p-6 md:p-8">
          <div className="flex items-center gap-3">
            <BookOpen aria-hidden className="size-7 text-forest-700" />
            <h3 className="font-display text-3xl font-black text-forest-900">
              What This Means
            </h3>
          </div>
          <div className="mt-5 space-y-4 leading-7 text-forest-900/74">
            <p>
              This COA confirms that the sample was tested by{" "}
              {jackFrostCoa.lab}. The report is for a plant/biomass sample, not
              a guarantee of final cured consumer flower potency.
            </p>
            <p>
              Total THC and Delta-9 THC were both very low on this report. The
              standout number is CBGA at 9.268%, which makes this sample more
              interesting from a CBG and cannabinoid-development perspective
              than broad potency marketing.
            </p>
            <p>
              CBGA is often discussed as a precursor cannabinoid because it can
              convert enzymatically into other cannabinoid acid forms in the
              plant. The COA helps show real testing and transparency instead of
              vague claims.
            </p>
          </div>
        </section>

        <aside className="rounded-seed border border-harvest-700/35 bg-harvest-300 p-6 text-forest-900 shadow-farm md:p-8">
          <Sparkles aria-hidden className="size-8" />
          <h3 className="mt-4 font-display text-3xl font-black">
            Why This Is Interesting
          </h3>
          <p className="mt-4 leading-7 text-forest-900/78">
            The headline here is not THC. The headline is CBGA. Jack Frost
            cbg_001 shows a CBGA-heavy profile in this tested biomass sample,
            which makes the plant more interesting for cannabinoid education,
            CBG direction, and breeding transparency.
          </p>
        </aside>
      </div>

      <section className="mt-8 rounded-seed border border-forest-900/12 bg-forest-900 p-6 text-cream-50 shadow-farm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <ShieldCheck
            aria-hidden
            className="size-8 shrink-0 text-harvest-300"
          />
          <div>
            <h3 className="font-display text-3xl font-black">
              Compliance-Safe Note
            </h3>
            <p className="mt-3 leading-7 text-cream-100/78">
              COA shown for transparency and educational purposes. Results apply
              only to the tested sample and date listed on the report. This is
              not medical advice and should not be interpreted as a guarantee of
              future batches, effects, or finished-product cannabinoid profile.
            </p>
          </div>
        </div>
      </section>

      <section
        className="mt-8 scroll-mt-28"
        id="cannabinoid-glossary"
        aria-labelledby="glossary-heading"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
              Plain-English lab terms
            </p>
            <h3
              className="mt-2 font-display text-3xl font-black text-forest-900"
              id="glossary-heading"
            >
              Cannabinoid Mini-Glossary
            </h3>
          </div>
          <Link
            className="focus-ring inline-flex rounded-full text-sm font-black text-clay underline decoration-clay/35 underline-offset-4 hover:text-forest-900"
            href={`#${jackFrostCoa.id}`}
          >
            Back to COA
          </Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {jackFrostCoa.glossary.map((item) => (
            <details
              className="rounded-2xl border border-forest-900/10 bg-cream-50 p-4 shadow-soft"
              key={item.term}
            >
              <summary className="cursor-pointer font-black text-forest-900">
                {item.term}
              </summary>
              <p className="mt-3 text-sm leading-6 text-forest-900/70">
                {item.definition}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center gap-3">
          <Microscope aria-hidden className="size-7 text-forest-700" />
          <h3 className="font-display text-3xl font-black text-forest-900">
            Detailed Results
          </h3>
        </div>
        <div className="mt-5 hidden overflow-hidden rounded-seed border border-forest-900/12 bg-cream-50 shadow-soft md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-forest-700 text-cream-50">
              <tr>
                <Th>Cannabinoid</Th>
                <Th>Result</Th>
                <Th>What It Means</Th>
              </tr>
            </thead>
            <tbody>
              {jackFrostCoa.cannabinoids.map((item) => {
                const isHighlighted = "highlight" in item && item.highlight;

                return (
                  <tr
                    className={
                      isHighlighted
                        ? "border-b border-forest-900/10 bg-harvest-300/24"
                        : "border-b border-forest-900/10 last:border-b-0"
                    }
                    key={item.name}
                  >
                    <Td>
                      <span className="font-black text-forest-900">
                        {item.name}
                      </span>
                    </Td>
                    <Td>
                      <span className="font-black text-forest-900">
                        {item.value}
                      </span>
                    </Td>
                    <Td>{item.note}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-5 grid gap-3 md:hidden">
          {jackFrostCoa.cannabinoids.map((item) => {
            const isHighlighted = "highlight" in item && item.highlight;

            return (
              <article
                className={`rounded-2xl border border-forest-900/12 p-4 shadow-soft ${
                  isHighlighted ? "bg-harvest-300/30" : "bg-cream-50"
                }`}
                key={item.name}
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-black text-forest-900">{item.name}</h4>
                  <p className="font-black text-clay">{item.value}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-forest-900/70">
                  {item.note}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-forest-900/10 bg-cream-50 p-4 shadow-soft">
      <dt className="text-xs font-black uppercase tracking-[0.16em] text-clay">
        {label}
      </dt>
      <dd className="mt-1 font-black text-forest-900">{value}</dd>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-4 text-xs font-black uppercase tracking-[0.14em]">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="align-top px-4 py-4 leading-6 text-forest-900/72">
      {children}
    </td>
  );
}
