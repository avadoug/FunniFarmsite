"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2, SearchCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ProductPrice } from "@/components/product/ProductPrice";
import type { Product } from "@/lib/products/types";
import { cn } from "@/lib/utils/cn";

type AnswerMap = {
  format?: string;
  goal?: string;
  timing?: string;
};

const questions = [
  {
    id: "goal",
    label: "What are you looking for?",
    options: [
      "Focus",
      "Calm",
      "Recovery",
      "Daily balance",
      "First-time CBG",
      "Strongest option",
    ],
  },
  {
    id: "timing",
    label: "When do you plan to use it?",
    options: ["Morning", "Afternoon", "Evening", "As needed"],
  },
  {
    id: "format",
    label: "Preferred format",
    options: ["Tincture", "Gummies", "Flower", "Capsules", "Topical", "Not sure"],
  },
] as const;

export function CbgProductFinderQuiz({ products }: { products: Product[] }) {
  const [answers, setAnswers] = useState<AnswerMap>({
    format: "Not sure",
    goal: "First-time CBG",
    timing: "Morning",
  });

  const recommendation = useMemo(
    () => getRecommendation(products, answers),
    [answers, products],
  );

  function choose(questionId: keyof AnswerMap, option: string) {
    setAnswers((current) => ({ ...current, [questionId]: option }));
  }

  return (
    <section
      aria-labelledby="product-finder-quiz"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      id="product-finder"
    >
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
            Product finder quiz
          </p>
          <h2
            className="mt-2 font-display text-3xl font-black leading-tight text-forest-900 md:text-5xl"
            id="product-finder-quiz"
          >
            Find the CBG format that fits your routine.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-forest-900/72">
            Answer three quick preference questions. The result is shopping
            guidance based on format, timing, availability, and label clarity,
            not medical advice.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="green">Non-intoxicating</Badge>
            <Badge tone="gold">Effects vary</Badge>
            <Badge tone="cream">Order review still applies</Badge>
          </div>
        </div>

        <div className="rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-farm md:p-6">
          <div className="grid gap-5">
            {questions.map((question) => (
              <fieldset key={question.id}>
                <legend className="text-sm font-black text-forest-900">
                  {question.label}
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {question.options.map((option) => {
                    const selected = answers[question.id] === option;

                    return (
                      <Button
                        aria-pressed={selected}
                        className={cn(
                          "min-h-10 px-3 text-sm",
                          selected &&
                            "border-forest-900 bg-forest-700 text-cream-50 hover:bg-forest-900",
                        )}
                        key={option}
                        onClick={() => choose(question.id, option)}
                        type="button"
                        variant={selected ? "primary" : "ghost"}
                      >
                        {selected && <CheckCircle2 aria-hidden className="size-4" />}
                        {option}
                      </Button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="glass-card mt-6 grid gap-5 rounded-seed p-4 md:grid-cols-[9rem_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream-100">
              {recommendation.product ? (
                <Image
                  alt={recommendation.product.name}
                  className="object-contain p-3"
                  fill
                  sizes="144px"
                  src={recommendation.product.image}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-forest-700">
                  <SearchCheck aria-hidden className="size-12" />
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-clay">
                Recommended starting point
              </p>
              <h3 className="mt-2 font-display text-2xl font-black text-forest-900">
                {recommendation.title}
              </h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-forest-900/70">
                {recommendation.reason}
              </p>

              {recommendation.product && (
                <div className="mt-4">
                  <ProductPrice product={recommendation.product} />
                </div>
              )}

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <ButtonLink href={recommendation.href}>
                  {recommendation.cta}
                  <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
                <ButtonLink href="/product-finder" variant="ghost">
                  Compare all formats
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getRecommendation(products: Product[], answers: AnswerMap) {
  const bySlug = new Map(products.map((product) => [product.slug, product]));
  const format = answers.format;
  const goal = answers.goal;

  if (format === "Tincture") {
    return productRecommendation(
      bySlug.get("funni-farm-cbg-oil"),
      "CBG Oil Tincture",
      "A tincture is commonly chosen by people who want a bottle format and flexible label-directed serving.",
    );
  }

  if (format === "Flower") {
    return productRecommendation(
      bySlug.get("cbg-hemp-flower"),
      "Jack Frost CBG Hemp Flower",
      "Flower is the most plant-forward option and has the clearest COA context currently shown on the site.",
    );
  }

  if (format === "Capsules") {
    return productRecommendation(
      bySlug.get("funni-farm-cbg-capsules"),
      "CBG Capsules",
      "Capsules are a measured format for shoppers who prefer a simple routine without gummy texture.",
    );
  }

  if (format === "Topical") {
    return {
      cta: "Browse product categories",
      href: "/shop?category=Topicals",
      product: null,
      reason:
        "Topicals are not currently a primary stocked category here, so the best next step is checking the shop or contacting the farm.",
      title: "Topical CBG category",
    };
  }

  if (goal === "Strongest option") {
    return productRecommendation(
      bySlug.get("mega-cbg-gummy-bear"),
      "Mega CBG Gummy Bear",
      "This larger-format gummy is the strongest-style option in the current catalog. Review serving, label, and order notes carefully.",
    );
  }

  return productRecommendation(
    bySlug.get("funni-farm-cbg-gummies"),
    "CBG Gummies Mixed Fruit Flavors",
    "Gummies are the clearest first stop for many shoppers because the format is familiar and the label facts are easy to compare.",
  );
}

function productRecommendation(
  product: Product | undefined,
  fallbackTitle: string,
  reason: string,
) {
  return {
    cta: product ? "View recommendation" : "Shop CBG products",
    href: product ? `/product/${product.slug}` : "/shop",
    product: product ?? null,
    reason,
    title: product?.name ?? fallbackTitle,
  };
}
