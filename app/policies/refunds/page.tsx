import type { Metadata } from "next";
import { PolicyPage } from "@/components/layout/PolicyPage";
import { getPolicy } from "@/lib/policies/content";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "The Funni Farm refund policy for hemp-derived products, merchandise returns, damaged orders, shipping compliance, and age requirements.",
};

export default function RefundsPage() {
  return <PolicyPage policy={getPolicy("refunds")!} />;
}
