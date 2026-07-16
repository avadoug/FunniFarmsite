"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ProductImage } from "./ProductImage";
import { SoldOutStamp } from "./ProductPrice";

export function ProductGallery({
  images,
  name,
  soldOut = false,
}: {
  images: string[];
  name: string;
  soldOut?: boolean;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex] ?? images[0];
  const hasMultipleImages = images.length > 1;

  function showPrevious() {
    setSelectedIndex((current) => (current - 1 + images.length) % images.length);
  }

  function showNext() {
    setSelectedIndex((current) => (current + 1) % images.length);
  }

  if (!selected) return null;

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[1.4rem] border border-forest-900/10 bg-white shadow-soft">
        <ProductImage
          alt={name}
          className="object-contain p-5"
          priority
          sizes="(min-width: 1024px) 48vw, 100vw"
          src={selected}
        />
        {soldOut && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-cream-50/12 backdrop-blur-[1px]">
            <SoldOutStamp size="xl" />
          </div>
        )}
        {hasMultipleImages && (
          <>
            <button
              aria-label={`Show previous ${name} image`}
              className="focus-ring absolute left-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-forest-900/10 bg-cream-50/90 text-forest-900 shadow-soft backdrop-blur transition hover:bg-cream-50"
              onClick={showPrevious}
              type="button"
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button
              aria-label={`Show next ${name} image`}
              className="focus-ring absolute right-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-forest-900/10 bg-cream-50/90 text-forest-900 shadow-soft backdrop-blur transition hover:bg-cream-50"
              onClick={showNext}
              type="button"
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </>
        )}
      </div>
      {hasMultipleImages && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              aria-label={`Show ${name} image ${index + 1}`}
              className={cn(
                "focus-ring relative aspect-square overflow-hidden rounded-2xl border bg-cream-100",
                selectedIndex === index
                  ? "border-forest-900 shadow-soft"
                  : "border-forest-900/10",
              )}
              key={`${image}-${index}`}
              onClick={() => setSelectedIndex(index)}
              type="button"
            >
              <ProductImage
                alt=""
                className="object-contain p-2"
                sizes="120px"
                src={image}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
