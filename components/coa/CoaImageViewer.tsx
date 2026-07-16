"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type CoaImageViewerProps = {
  alt: string;
  caption: string;
  fullSrc: string;
  previewSrc: string;
};

export function CoaImageViewer({
  alt,
  caption,
  fullSrc,
  previewSrc,
}: CoaImageViewerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <figure className="rounded-[1.4rem] border border-forest-900/12 bg-cream-50 p-3 shadow-farm">
        <button
          aria-label="Open full COA image"
          className="focus-ring group relative block aspect-[3/4] w-full overflow-hidden rounded-[1rem] bg-cream-100"
          onClick={() => setOpen(true)}
          type="button"
        >
          <Image
            alt={alt}
            className="object-cover object-top transition duration-500 group-hover:scale-[1.025]"
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            src={previewSrc}
          />
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-cream-50/30 bg-forest-900/88 px-4 py-2 text-sm font-black text-cream-50 shadow-soft backdrop-blur">
            <Maximize2 aria-hidden className="size-4" />
            View Full COA
          </span>
        </button>
        <figcaption className="mt-3 text-sm leading-6 text-forest-900/70">
          {caption}
        </figcaption>
      </figure>

      {open && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[90] bg-ink/86 p-4 backdrop-blur"
          role="dialog"
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            <div className="mb-3 flex items-center justify-between gap-4 rounded-2xl border border-cream-50/15 bg-forest-900 px-4 py-3 text-cream-50 shadow-soft">
              <p className="text-sm font-bold leading-6">{caption}</p>
              <Button
                aria-label="Close full COA image"
                onClick={() => setOpen(false)}
                size="icon"
                variant="secondary"
              >
                <X aria-hidden className="size-5" />
              </Button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto rounded-2xl bg-cream-50 p-3">
              <div className="relative mx-auto aspect-[3/4] min-h-[72vh] w-full max-w-4xl">
                <Image
                  alt={alt}
                  className="object-contain object-top"
                  fill
                  sizes="100vw"
                  src={fullSrc}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
