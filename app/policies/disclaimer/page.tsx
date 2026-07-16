import type { Metadata } from "next";
import { PolicyPage } from "@/components/layout/PolicyPage";
import { getPolicy } from "@/lib/policies/content";

export const metadata: Metadata = {
  title: "FDA Disclaimer",
  description:
    "The Funni Farm FDA disclaimer and product-use notice for hemp-derived products.",
};

export default function DisclaimerPage() {
  return <PolicyPage policy={getPolicy("disclaimer")!} />;
}
