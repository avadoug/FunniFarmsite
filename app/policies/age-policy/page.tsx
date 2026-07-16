import type { Metadata } from "next";
import { PolicyPage } from "@/components/layout/PolicyPage";
import { getPolicy } from "@/lib/policies/content";

export const metadata: Metadata = {
  title: "Age Verification Policy",
  description:
    "The Funni Farm age verification policy for adult hemp-derived product purchases and adult signature requirements.",
};

export default function AgePolicyPage() {
  return <PolicyPage policy={getPolicy("age-policy")!} />;
}
