import { CheckCircle2, HelpCircle } from "lucide-react";

const mythRealityItems = [
  {
    myth: "CBG is just CBD with a different name.",
    reality:
      "CBG is a different cannabinoid found in hemp. Product experiences vary, so The Funni Farm keeps the language focused on labels, COAs, and preference.",
  },
  {
    myth: "A lab result guarantees every future batch.",
    reality:
      "A COA applies to the tested sample, date, and batch. Future batches need their own records.",
  },
  {
    myth: "Non-intoxicating means no responsibility needed.",
    reality:
      "Adult customers should still read labels, review local laws, follow product directions, and keep products stored responsibly.",
  },
];

export function MythRealityGrid() {
  return (
    <section aria-labelledby="cbg-myth-reality">
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
          CBG Myth vs Reality
        </p>
        <h2
          className="mt-2 font-display text-3xl font-black text-forest-900 md:text-5xl"
          id="cbg-myth-reality"
        >
          Clear answers beat hemp hype.
        </h2>
        <p className="mt-3 leading-7 text-forest-900/72">
          These quick cards help set expectations without overpromising or
          turning education into medical advice.
        </p>
      </div>
      <div className="mt-7 grid gap-5 lg:grid-cols-3">
        {mythRealityItems.map((item) => (
          <article
            className="seed-card rounded-seed p-5"
            key={item.myth}
          >
            <div className="rounded-2xl border border-clay/20 bg-clay/10 p-4">
              <HelpCircle aria-hidden className="size-5 text-clay" />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-clay">
                Myth
              </p>
              <h3 className="mt-1 font-display text-2xl font-black leading-tight text-forest-900">
                {item.myth}
              </h3>
            </div>
            <div className="mt-4 rounded-2xl border border-forest-700/15 bg-forest-50 p-4">
              <CheckCircle2 aria-hidden className="size-5 text-forest-700" />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-forest-700">
                Reality
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-forest-900/72">
                {item.reality}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
