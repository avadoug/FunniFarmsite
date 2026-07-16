import type { Metadata } from "next";
import { PolicyPage } from "@/components/layout/PolicyPage";
import { getPolicy } from "@/lib/policies/content";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The Funni Farm terms and conditions for website use, product availability, pricing, legal compliance, and Tennessee governing law.",
};

export default function TermsPage() {
  return <PolicyPage policy={getPolicy("terms")!} />;
}
