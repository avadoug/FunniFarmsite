import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-5xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-[260px_1fr] lg:px-8">
      <div className="relative aspect-square overflow-hidden rounded-full border border-forest-900/12 bg-cream-50 shadow-farm">
        <Image
          alt="The Funni Farm logo"
          className="object-cover"
          fill
          sizes="260px"
          src="/brand/funni-farm-official-logo.png"
        />
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
          404
        </p>
        <h1 className="mt-3 font-display text-5xl font-black text-forest-900">
          That row is not planted yet.
        </h1>
        <p className="mt-4 max-w-xl leading-7 text-forest-900/70">
          The page you are looking for is missing, moved, or still waiting on a
          future Funni Farm batch.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/shop">Shop Products</ButtonLink>
          <ButtonLink href="/" variant="ghost">
            Home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
