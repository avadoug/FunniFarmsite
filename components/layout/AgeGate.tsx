"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "funni-farm-age-confirmed";

export function AgeGate() {
  const [status, setStatus] = useState<"checking" | "confirmed" | "blocked">(
    "checking",
  );

  useEffect(() => {
    const confirmed = window.localStorage.getItem(STORAGE_KEY);
    setStatus(confirmed === "yes" ? "confirmed" : "blocked");
  }, []);

  if (status === "checking" || status === "confirmed") return null;

  return (
    <div
      aria-labelledby="age-gate-title"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
      role="dialog"
    >
      <div className="paper-texture relative max-w-lg overflow-hidden rounded-[1.5rem] border border-harvest-300 bg-cream-50 p-6 shadow-farm md:p-8">
        <div className="relative z-10">
          <div className="mx-auto mb-4 flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-forest-900 bg-cream-50 shadow-soft">
            <Image
              alt="The Funni Farm"
              height={96}
              priority
              src="/brand/funni-farm-official-logo.png"
              width={96}
            />
          </div>
          <p className="text-center text-xs font-black uppercase tracking-[0.22em] text-clay">
            Adult hemp wellness
          </p>
          <h2
            className="mt-3 text-center font-display text-3xl font-black text-forest-900"
            id="age-gate-title"
          >
            Please Confirm Your Age
          </h2>
          <p className="mt-4 text-center leading-7 text-forest-900/78">
            This site contains non-intoxicating hemp and CBG product listings
            intended for adults. Please confirm you are at least 21 years old,
            or the minimum legal age in your location.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button
              onClick={() => {
                window.localStorage.setItem(STORAGE_KEY, "yes");
                setStatus("confirmed");
              }}
              size="lg"
            >
              I am 21+
            </Button>
            <Button
              onClick={() => {
                window.location.href = "https://www.google.com";
              }}
              size="lg"
              variant="ghost"
            >
              I am not
            </Button>
          </div>
          <p className="mt-4 text-center text-xs font-semibold leading-5 text-forest-900/72">
            Products are not intended to diagnose, treat, cure, or prevent any
            disease. Review product details, ingredients, and lab results before
            use.
          </p>
        </div>
      </div>
    </div>
  );
}
