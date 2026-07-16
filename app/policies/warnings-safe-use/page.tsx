import type { Metadata } from "next";
import { PolicyPage } from "@/components/layout/PolicyPage";
import { getPolicy } from "@/lib/policies/content";

export const metadata: Metadata = {
  title: "Product Warnings & Safe Use",
  description:
    "Product warnings and safe-use guidance for The Funni Farm hemp-derived products, including serving, storage, allergens, and adult-use reminders.",
};

export default function WarningsSafeUsePage() {
  return <PolicyPage policy={getPolicy("warnings-safe-use")!} />;
}
